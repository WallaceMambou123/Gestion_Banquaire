// ============================================================
// FICHIER: compte/compte.controller.ts  (Contrôleur Compte)
// ============================================================
// Équivalent de ton CompteController.java.
//
// ROUTES disponibles :
//   POST   /api/comptes                    → Ouvrir un compte
//   GET    /api/comptes/client/:clientId   → Lister les comptes d'un client
//   GET    /api/comptes/:compteId/solde    → Consulter le solde d'un compte

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CompteService } from './compte.service';
import { CreateCompteDto } from './dto/create-compte.dto';

@Controller('api/comptes')
export class CompteController {

  constructor(private readonly compteService: CompteService) {}

  // -------------------------------------------------------
  // POST /api/comptes → Ouvrir un compte
  // Équivalent de : @PostMapping + ouvrir() en Java
  // -------------------------------------------------------
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async ouvrir(@Body() createCompteDto: CreateCompteDto) {
    return await this.compteService.ouvrirCompte(createCompteDto);
  }

  // -------------------------------------------------------
  // GET /api/comptes/client/:clientId → Comptes d'un client
  // Équivalent de : @GetMapping("/client/{client_id}") en Java
  // -------------------------------------------------------
  @Get('client/:clientId')
  async duClient(@Param('clientId', ParseIntPipe) clientId: number) {
    return await this.compteService.listerComptesDuClient(clientId);
  }

  // -------------------------------------------------------
  // GET /api/comptes/:compteId/solde → Solde d'un compte
  // Équivalent de : @GetMapping("/{compteId}/solde") en Java
  // -------------------------------------------------------
  @Get(':compteId/solde')
  async solde(@Param('compteId', ParseIntPipe) compteId: number) {
    const solde = await this.compteService.consulterSolde(compteId);
    // On retourne un objet JSON propre avec le solde
    return { compteId, solde };
  }
}
