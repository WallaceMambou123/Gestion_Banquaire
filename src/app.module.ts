// ============================================================
// FICHIER: app.module.ts  (Module principal / racine)
// ============================================================
// En NestJS, un "Module" regroupe des fonctionnalités ensemble.
// C'est comme un package Java : il organise le code.
//
// AppModule = le module principal qui importe tous les autres.
// C'est lui qui démarre tout, comme @SpringBootApplication en Java.

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// On importe les 3 modules métier de l'application
import { ClientModule } from './client/client.module';
import { CompteModule } from './compte/compte.module';
import { TransactionModule } from './transaction/transaction.module';

// On importe les entités (tables de la base de données)
import { Client } from './client/entities/client.entity';
import { Compte } from './compte/entities/compte.entity';
import { Transaction } from './transaction/entities/transaction.entity';

@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',       // Adresse du serveur MySQL
      port: 5432,              // Port MySQL par défaut
      username: 'postgres',      // Ton nom d'utilisateur MySQL (comme dans application.properties)
      password: 'Mambou2025!', // Ton mot de passe MySQL
      database: 'banque',      // Nom de la base de données
      entities: [Client, Compte, Transaction], // Les tables qu'on gère
      synchronize: true,       // Crée/met à jour les tables automatiquement (comme ddl-auto=update)
      
    }),

    // On inclut les 3 modules fonctionnels
    ClientModule,
    CompteModule,
    TransactionModule,
  ],
})
export class AppModule {}
