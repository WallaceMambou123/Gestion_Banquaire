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
exports.CompteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const compte_entity_1 = require("./entities/compte.entity");
const client_service_1 = require("../client/client.service");
let CompteService = class CompteService {
    constructor(compteRepository, clientService) {
        this.compteRepository = compteRepository;
        this.clientService = clientService;
    }
    async ouvrirCompte(dto) {
        const client = await this.clientService.trouverParId(dto.clientId);
        const compte = this.compteRepository.create({
            numeroCompte: this.genererNumeroCompte(),
            typeCompte: dto.typeCompte.toUpperCase(),
            solde: dto.soldeInitial ?? 0,
            dateOuverture: new Date(),
            client: client,
        });
        return await this.compteRepository.save(compte);
    }
    async listerComptesDuClient(clientId) {
        return await this.compteRepository.find({
            where: { client: { id: clientId } },
        });
    }
    async consulterSolde(compteId) {
        const compte = await this.trouverCompteParId(compteId);
        return Number(compte.solde);
    }
    async trouverCompteParId(compteId) {
        const compte = await this.compteRepository.findOne({
            where: { id: compteId },
        });
        if (!compte) {
            throw new common_1.NotFoundException(`Compte avec l'ID ${compteId} non trouvé`);
        }
        return compte;
    }
    genererNumeroCompte() {
        return 'FR76' + Date.now();
    }
};
exports.CompteService = CompteService;
exports.CompteService = CompteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(compte_entity_1.Compte)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        client_service_1.ClientService])
], CompteService);
//# sourceMappingURL=compte.service.js.map