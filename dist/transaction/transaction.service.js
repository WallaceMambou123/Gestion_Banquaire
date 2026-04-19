"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_entity_1 = require("./entities/transaction.entity");
const compte_entity_1 = require("../compte/entities/compte.entity");
let TransactionService = class TransactionService {
    constructor(transactionRepository, compteRepository, dataSource) {
        this.transactionRepository = transactionRepository;
        this.compteRepository = compteRepository;
        this.dataSource = dataSource;
    }
    async deposer(dto) {
        this.validerMontant(dto.montant);
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const compte = await this.trouverCompte(dto.compteId, queryRunner);
            compte.crediter(dto.montant);
            await queryRunner.manager.save(compte_entity_1.Compte, compte);
            await this.enregistrerTransaction(queryRunner, compte, dto.montant, 'CREDIT', (dto.libelle || 'Dépôt') + ' (dépôt)');
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async retirer(dto) {
        this.validerMontant(dto.montant);
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const compte = await this.trouverCompte(dto.compteId, queryRunner);
            if (Number(compte.solde) < Number(dto.montant)) {
                throw new common_1.BadRequestException('Solde insuffisant pour effectuer ce retrait');
            }
            compte.debiter(dto.montant);
            await queryRunner.manager.save(compte_entity_1.Compte, compte);
            await this.enregistrerTransaction(queryRunner, compte, dto.montant, 'DEBIT', (dto.libelle || 'Retrait') + ' (retrait)');
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async virement(dto) {
        if (dto.source === dto.destination) {
            throw new common_1.BadRequestException('Impossible de virer sur le même compte');
        }
        this.validerMontant(dto.montant);
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const compteSource = await this.trouverCompte(dto.source, queryRunner);
            const compteDestination = await this.trouverCompte(dto.destination, queryRunner);
            if (Number(compteSource.solde) < Number(dto.montant)) {
                throw new common_1.BadRequestException('Solde insuffisant pour effectuer ce virement');
            }
            compteSource.debiter(dto.montant);
            compteDestination.crediter(dto.montant);
            await queryRunner.manager.save(compte_entity_1.Compte, compteSource);
            await queryRunner.manager.save(compte_entity_1.Compte, compteDestination);
            await this.enregistrerTransaction(queryRunner, compteSource, dto.montant, 'VIREMENT_EMIS', (dto.libelle || 'Virement') + ' vers compte ' + compteDestination.numeroCompte);
            await this.enregistrerTransaction(queryRunner, compteDestination, dto.montant, 'VIREMENT_RECU', (dto.libelle || 'Virement') + ' depuis compte ' + compteSource.numeroCompte);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async historique(compteId) {
        const compteExiste = await this.compteRepository.findOne({
            where: { id: compteId },
        });
        if (!compteExiste) {
            throw new common_1.NotFoundException(`Compte ${compteId} non trouvé`);
        }
        return await this.transactionRepository.find({
            where: { compte: { id: compteId } },
            order: { dateTransaction: 'DESC' },
        });
    }
    async trouverCompte(compteId, queryRunner) {
        const compte = await queryRunner.manager.findOne(compte_entity_1.Compte, {
            where: { id: compteId },
        });
        if (!compte) {
            throw new common_1.NotFoundException(`Compte ${compteId} non trouvé`);
        }
        return compte;
    }
    async enregistrerTransaction(queryRunner, compte, montant, type, description) {
        const transaction = this.transactionRepository.create({
            montant,
            typeTransaction: type,
            description,
            compte,
        });
        await queryRunner.manager.save(transaction_entity_1.Transaction, transaction);
    }
    validerMontant(montant) {
        if (!montant || Number(montant) <= 0) {
            throw new common_1.BadRequestException('Le montant doit être un nombre positif');
        }
    }
};
exports.TransactionService = TransactionService;
exports.TransactionService = TransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __param(1, (0, typeorm_1.InjectRepository)(compte_entity_1.Compte)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], TransactionService);
//# sourceMappingURL=transaction.service.js.map