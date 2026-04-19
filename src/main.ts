// ============================================================
// FICHIER: main.ts  (Point d'entrée de toute l'application)
// ============================================================
// C'est ici que l'application démarre, comme la méthode main()
// dans ta classe BanqueApplication.java

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // Ignore les champs inconnus envoyés par l'utilisateur
      forbidNonWhitelisted: false, // N'envoie pas d'erreur pour les champs inconnus
      transform: true,       // Convertit automatiquement les types (ex: "1" → 1)
    }),
  );

  // Configuration Swagger
  const config = new DocumentBuilder()
    .setTitle('API Gestion Bancaire')
    .setDescription('API de gestion bancaire - Opérations clients, comptes et transactions')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // L'application écoute sur le port 3000
  // → Tu accéderas à l'API via: http://localhost:3000
  await app.listen(3000);
  console.log('✅ Serveur bancaire démarré sur http://localhost:3000');
}

bootstrap();
