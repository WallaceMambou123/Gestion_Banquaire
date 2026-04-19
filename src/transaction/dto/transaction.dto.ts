// ============================================================
// FICHIER: transaction/dto/transaction.dto.ts
// ============================================================
// DTOs pour les 3 opérations bancaires :
//   1. DepotDto  → Déposer de l'argent  (DepotRequest.java)
//   2. RetraitDto → Retirer de l'argent (RetraitRequest.java)
//   3. VirementDto → Virer de l'argent  (VirementRequest.java)
//
// Ces DTOs sont les "formulaires" que l'utilisateur remplit
// quand il veut faire une opération bancaire.

import { IsNumber, IsString, IsOptional, Min, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

// -------------------------------------------------------
// DTO 1 : Dépôt d'argent
// -------------------------------------------------------
// L'utilisateur envoie :
// {
//   "compteId": 1,
//   "montant": 500,
//   "libelle": "salaire du mois"
// }
export class DepotDto {

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  compteId: number; // Sur quel compte on dépose l'argent

  @IsNumber()
  @Min(0.01, { message: 'Le montant doit être supérieur à zéro' })
  @Type(() => Number)
  montant: number; // Combien on dépose

  @IsString()
  @IsOptional()
  libelle?: string; // Description (facultative)
}

// -------------------------------------------------------
// DTO 2 : Retrait d'argent
// -------------------------------------------------------
// L'utilisateur envoie :
// {
//   "compteId": 1,
//   "montant": 100,
//   "libelle": "courses"
// }
export class RetraitDto {

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  compteId: number; // De quel compte on retire l'argent

  @IsNumber()
  @Min(0.01, { message: 'Le montant doit être supérieur à zéro' })
  @Type(() => Number)
  montant: number; // Combien on retire

  @IsString()
  @IsOptional()
  libelle?: string;
}

// -------------------------------------------------------
// DTO 3 : Virement entre deux comptes
// -------------------------------------------------------
// L'utilisateur envoie :
// {
//   "source": 1,
//   "destination": 2,
//   "montant": 200,
//   "libelle": "remboursement"
// }
export class VirementDto {

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  source: number; // ID du compte qui envoie l'argent

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  destination: number; // ID du compte qui reçoit l'argent

  @IsNumber()
  @Min(0.01)
  @Type(() => Number)
  montant: number; // Combien on vire

  @IsString()
  @IsOptional()
  libelle?: string;
}
