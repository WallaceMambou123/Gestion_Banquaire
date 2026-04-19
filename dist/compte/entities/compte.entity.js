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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compte = void 0;
const typeorm_1 = require("typeorm");
const client_entity_1 = require("../../client/entities/client.entity");
const transaction_entity_1 = require("../../transaction/entities/transaction.entity");
let Compte = class Compte {
    crediter(montant) {
        this.solde = Number(this.solde) + Number(montant);
    }
    debiter(montant) {
        if (Number(this.solde) < Number(montant)) {
            throw new Error('Solde insuffisant');
        }
        this.solde = Number(this.solde) - Number(montant);
    }
};
exports.Compte = Compte;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Compte.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, length: 34, unique: true, name: 'numero_compte' }),
    __metadata("design:type", String)
], Compte.prototype, "numeroCompte", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'decimal', precision: 15, scale: 2, default: '0' }),
    __metadata("design:type", Number)
], Compte.prototype, "solde", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, name: 'date_ouvreture', type: 'date' }),
    __metadata("design:type", Date)
], Compte.prototype, "dateOuverture", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, name: 'type_compte' }),
    __metadata("design:type", String)
], Compte.prototype, "typeCompte", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client, (client) => client.comptes, {
        nullable: false,
        onDelete: 'CASCADE',
        eager: false,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'client_id' }),
    __metadata("design:type", client_entity_1.Client)
], Compte.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transaction_entity_1.Transaction, (transaction) => transaction.compte, {
        cascade: true,
        eager: false,
    }),
    __metadata("design:type", Array)
], Compte.prototype, "transactions", void 0);
exports.Compte = Compte = __decorate([
    (0, typeorm_1.Entity)('comptes')
], Compte);
//# sourceMappingURL=compte.entity.js.map