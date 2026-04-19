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
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const transaction_service_1 = require("./transaction.service");
const transaction_dto_1 = require("./dto/transaction.dto");
let TransactionController = class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    async depot(depotDto) {
        await this.transactionService.deposer(depotDto);
        return { message: 'Dépôt effectué avec succès' };
    }
    async retrait(retraitDto) {
        await this.transactionService.retirer(retraitDto);
        return { message: 'Retrait effectué avec succès' };
    }
    async virement(virementDto) {
        await this.transactionService.virement(virementDto);
        return { message: 'Virement effectué avec succès' };
    }
    async releve(compteId) {
        return await this.transactionService.historique(compteId);
    }
};
exports.TransactionController = TransactionController;
__decorate([
    (0, common_1.Post)('depot'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transaction_dto_1.DepotDto]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "depot", null);
__decorate([
    (0, common_1.Post)('retrait'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transaction_dto_1.RetraitDto]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "retrait", null);
__decorate([
    (0, common_1.Post)('virement'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transaction_dto_1.VirementDto]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "virement", null);
__decorate([
    (0, common_1.Get)('releve/:compteId'),
    __param(0, (0, common_1.Param)('compteId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "releve", null);
exports.TransactionController = TransactionController = __decorate([
    (0, common_1.Controller)('api/operations'),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionController);
//# sourceMappingURL=transaction.controller.js.map