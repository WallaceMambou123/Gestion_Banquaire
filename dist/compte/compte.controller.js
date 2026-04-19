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
exports.CompteController = void 0;
const common_1 = require("@nestjs/common");
const compte_service_1 = require("./compte.service");
const create_compte_dto_1 = require("./dto/create-compte.dto");
let CompteController = class CompteController {
    constructor(compteService) {
        this.compteService = compteService;
    }
    async ouvrir(createCompteDto) {
        return await this.compteService.ouvrirCompte(createCompteDto);
    }
    async duClient(clientId) {
        return await this.compteService.listerComptesDuClient(clientId);
    }
    async solde(compteId) {
        const solde = await this.compteService.consulterSolde(compteId);
        return { compteId, solde };
    }
};
exports.CompteController = CompteController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_compte_dto_1.CreateCompteDto]),
    __metadata("design:returntype", Promise)
], CompteController.prototype, "ouvrir", null);
__decorate([
    (0, common_1.Get)('client/:clientId'),
    __param(0, (0, common_1.Param)('clientId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CompteController.prototype, "duClient", null);
__decorate([
    (0, common_1.Get)(':compteId/solde'),
    __param(0, (0, common_1.Param)('compteId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CompteController.prototype, "solde", null);
exports.CompteController = CompteController = __decorate([
    (0, common_1.Controller)('api/comptes'),
    __metadata("design:paramtypes", [compte_service_1.CompteService])
], CompteController);
//# sourceMappingURL=compte.controller.js.map