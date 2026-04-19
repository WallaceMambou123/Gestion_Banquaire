"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const client_module_1 = require("./client/client.module");
const compte_module_1 = require("./compte/compte.module");
const transaction_module_1 = require("./transaction/transaction.module");
const client_entity_1 = require("./client/entities/client.entity");
const compte_entity_1 = require("./compte/entities/compte.entity");
const transaction_entity_1 = require("./transaction/entities/transaction.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'Mambou2025!',
                database: 'banque',
                entities: [client_entity_1.Client, compte_entity_1.Compte, transaction_entity_1.Transaction],
                synchronize: true,
            }),
            client_module_1.ClientModule,
            compte_module_1.CompteModule,
            transaction_module_1.TransactionModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map