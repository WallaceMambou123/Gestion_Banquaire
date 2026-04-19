// ============================================================
// FICHIER: transaction/transaction.module.ts  (Module Transaction)
// ============================================================
// Regroupe tout ce qui concerne les opérations bancaires.
// Il a besoin d'accéder à la table Compte (pour débiter/créditer),
// donc on importe CompteModule.

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Transaction } from './entities/transaction.entity';
import { Compte } from '../compte/entities/compte.entity';

@Module({
  imports: [
    // On a besoin d'accéder aux tables Transaction ET Compte
    TypeOrmModule.forFeature([Transaction, Compte]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
