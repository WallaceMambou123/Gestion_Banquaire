// ============================================================
// FICHIER: client/client.controller.ts  (Contrôleur Client)
// ============================================================
// Le CONTROLLER reçoit les requêtes HTTP et appelle le Service.
// C'est l'équivalent de ton ClientController.java.
//
// Son rôle :
//  1. Recevoir la requête HTTP (GET, POST, DELETE...)
//  2. Extraire les données (body, paramètres d'URL...)
//  3. Appeler le bon service
//  4. Retourner la réponse
//
// Le controller ne fait PAS de logique métier, il délègue au service.
//
// ROUTES disponibles (comme dans @RequestMapping en Java) :
//   POST   /api/clients         → Créer un client
//   GET    /api/clients         → Lister tous les clients
//   GET    /api/clients/:id     → Trouver un client par ID
//   DELETE /api/clients/:id     → Supprimer un client

import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';

// @Controller('api/clients') = @RequestMapping("/api/clients") en Java
// Toutes les routes de ce controller commencent par "/api/clients"
@Controller('api/clients')
export class ClientController {

  constructor(
    // Injection du service (comme @RequiredArgsConstructor en Java)
    private readonly clientService: ClientService,
  ) {}

  // -------------------------------------------------------
  // POST /api/clients → Créer un client
  // Équivalent de : @PostMapping + creer() en Java
  // -------------------------------------------------------
  // @Post() = @PostMapping en Java
  // @Body() = @RequestBody en Java → lit le corps JSON de la requête
  // @HttpCode(201) = @ResponseStatus(HttpStatus.CREATED) en Java
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async creer(@Body() createClientDto: CreateClientDto) {
    // Le DTO a déjà été validé par le ValidationPipe (dans main.ts)
    // Si les données sont invalides, NestJS a déjà renvoyé une erreur 400
    return await this.clientService.creerClient(createClientDto);
  }

  // -------------------------------------------------------
  // GET /api/clients → Lister tous les clients
  // Équivalent de : @GetMapping + lister() en Java
  // -------------------------------------------------------
  @Get()
  async lister() {
    return await this.clientService.listerTousLesClients();
  }

  // -------------------------------------------------------
  // GET /api/clients/:id → Trouver un client par ID
  // Équivalent de : @GetMapping("/{id}") + trouver() en Java
  // -------------------------------------------------------
  // @Param('id') = @PathVariable Long id en Java
  // ParseIntPipe = convertit "1" (texte dans l'URL) en 1 (nombre)
  @Get(':id')
  async trouver(@Param('id', ParseIntPipe) id: number) {
    return await this.clientService.trouverParId(id);
  }

  // -------------------------------------------------------
  // DELETE /api/clients/:id → Supprimer un client
  // Équivalent de : @DeleteMapping("/{id}") + supprimer() en Java
  // -------------------------------------------------------
  // @HttpCode(204) = @ResponseStatus(HttpStatus.NO_CONTENT) en Java
  // → Répond avec un code 204 (succès, pas de contenu à renvoyer)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async supprimer(@Param('id', ParseIntPipe) id: number) {
    await this.clientService.supprimerClient(id);
  }
}
