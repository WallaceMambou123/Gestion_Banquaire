// ============================================================
// FICHIER: client/client.module.ts  (Module Client)
// ============================================================
// Le MODULE regroupe tout ce qui concerne les clients :
//   - Le Controller (routes HTTP)
//   - Le Service (logique métier)
//   - L'Entité (table MySQL)
//
// C'est comme un "package" Java mais en plus explicite :
// tu déclares exactement ce que contient ce module.
//
// Sans module, NestJS ne saurait pas que ClientController
// et ClientService existent !

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { Client } from './entities/client.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Client]) dit à TypeORM :
    // "Dans ce module, j'ai besoin de travailler avec la table Client"
    // Cela permet d'utiliser @InjectRepository(Client) dans le service
    TypeOrmModule.forFeature([Client]),
  ],
  controllers: [ClientController], // Les controllers du module
  providers: [ClientService],       // Les services du module
  exports: [ClientService],         // On exporte le service pour que d'autres modules puissent l'utiliser
})
export class ClientModule {}
