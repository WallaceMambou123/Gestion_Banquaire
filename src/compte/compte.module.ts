// ============================================================
// FICHIER: compte/compte.module.ts  (Module Compte)
// ============================================================
// Regroupe tout ce qui concerne les comptes bancaires.
// Il importe ClientModule pour pouvoir utiliser ClientService
// (vérifier qu'un client existe avant d'ouvrir un compte).

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompteController } from './compte.controller';
import { CompteService } from './compte.service';
import { Compte } from './entities/compte.entity';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Compte]),
    ClientModule, // On importe ClientModule pour accéder à ClientService
  ],
  controllers: [CompteController],
  providers: [CompteService],
  exports: [CompteService], // On exporte pour que TransactionModule puisse l'utiliser
})
export class CompteModule {}
