// ============================================================
// FICHIER: compte/dto/create-compte.dto.ts
// ============================================================
// DTO pour ouvrir un compte bancaire.
// Correspond à ton CompteRequest.java en Java.
//
// Rappel : Le DTO = le formulaire que l'utilisateur remplit.
// Ici, pour ouvrir un compte, l'utilisateur doit fournir :
//   - L'identifiant du client (clientId)
//   - Le type de compte (typeCompte)
//   - Le solde initial (optionnel)

import { IsNumber, IsString, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCompteDto {

  // @IsNumber() → doit être un nombre
  // @Min(1) → l'ID doit être au minimum 1 (pas 0 ni négatif)
  // @Type(() => Number) → convertit automatiquement "1" (texte) en 1 (nombre)
  @IsNumber({}, { message: "L'ID du client doit être un nombre" })
  @Min(1, { message: "L'ID du client doit être supérieur à zéro" })
  @Type(() => Number)
  clientId: number;

  @IsString()
  @IsNotEmpty({ message: 'Le type de compte est obligatoire (ex: COURANT, EPARGNE)' })
  typeCompte: string;

  // @IsOptional() → ce champ n'est PAS obligatoire
  // Si l'utilisateur ne l'envoie pas, le solde sera 0
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  soldeInitial?: number;
}
