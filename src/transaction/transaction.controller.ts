// ============================================================
// FICHIER: transaction/transaction.controller.ts
// ============================================================
// Équivalent de ton TransactionController.java.
//
// ROUTES disponibles :
//   POST  /api/operations/depot           → Déposer de l'argent
//   POST  /api/operations/retrait         → Retirer de l'argent
//   POST  /api/operations/virement        → Faire un virement
//   GET   /api/operations/releve/:compteId → Historique des transactions

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
import { TransactionService } from './transaction.service';
import { DepotDto, RetraitDto, VirementDto } from './dto/transaction.dto';

@Controller('api/operations')
export class TransactionController {

  constructor(private readonly transactionService: TransactionService) {}

  // -------------------------------------------------------
  // POST /api/operations/depot → Déposer de l'argent
  // Équivalent de : @PostMapping("/depot") + depot() en Java
  // -------------------------------------------------------
  // L'utilisateur envoie (dans le corps de la requête) :
  // { "compteId": 1, "montant": 500, "libelle": "salaire" }
  @Post('depot')
  @HttpCode(HttpStatus.CREATED)
  async depot(@Body() depotDto: DepotDto) {
    await this.transactionService.deposer(depotDto);
    // On retourne un message de confirmation (Java renvoyait void)
    return { message: 'Dépôt effectué avec succès' };
  }

  // -------------------------------------------------------
  // POST /api/operations/retrait → Retirer de l'argent
  // Équivalent de : @PostMapping("/retrait") + retrait() en Java
  // -------------------------------------------------------
  @Post('retrait')
  @HttpCode(HttpStatus.CREATED)
  async retrait(@Body() retraitDto: RetraitDto) {
    await this.transactionService.retirer(retraitDto);
    return { message: 'Retrait effectué avec succès' };
  }

  // -------------------------------------------------------
  // POST /api/operations/virement → Faire un virement
  // Équivalent de : @PostMapping("/virement") + virement() en Java
  // -------------------------------------------------------
  @Post('virement')
  @HttpCode(HttpStatus.CREATED)
  async virement(@Body() virementDto: VirementDto) {
    await this.transactionService.virement(virementDto);
    return { message: 'Virement effectué avec succès' };
  }

  // -------------------------------------------------------
  // GET /api/operations/releve/:compteId → Historique
  // Équivalent de : @GetMapping("/releve/{compteId}") en Java
  // -------------------------------------------------------
  @Get('releve/:compteId')
  async releve(@Param('compteId', ParseIntPipe) compteId: number) {
    return await this.transactionService.historique(compteId);
  }
}
