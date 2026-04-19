// ============================================================
// FICHIER: client/dto/create-client.dto.ts
// ============================================================
//
// 🎯 C'EST QUOI UN DTO ? (Data Transfer Object)
// -----------------------------------------------
// DTO = "Objet de Transfert de Données"
//
// Imagine que tu es à la banque et tu remplis un FORMULAIRE
// pour créer ton compte. Ce formulaire, c'est un DTO !
//
// Le DTO définit EXACTEMENT quelles données l'utilisateur
// doit envoyer dans sa requête HTTP (via Postman par exemple).
//
// SANS DTO → L'utilisateur peut envoyer n'importe quoi,
//            même des données incorrectes ou dangereuses.
//
// AVEC DTO → On vérifie que les données sont correctes
//            AVANT de les envoyer au service.
//
// En Java tu avais : CompteRequest.java avec @NotNull, @NotBlank
// En NestJS c'est pareil, mais avec des décorateurs de class-validator !
//
// Le voyage d'une donnée :
// [Utilisateur] → [Controller] → [DTO (validation)] → [Service] → [Base de données]
//
// Si les données ne respectent pas les règles du DTO, NestJS
// renvoie automatiquement une erreur 400 (Bad Request) !

import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class CreateClientDto {

  // @IsString() → ce champ doit être du texte
  // @IsNotEmpty() → ce champ ne peut pas être vide
  // @Length(2, 100) → entre 2 et 100 caractères
  @IsString({ message: 'Le nom doit être du texte' })
  @IsNotEmpty({ message: 'Le nom est obligatoire' })
  @Length(2, 100, { message: 'Le nom doit avoir entre 2 et 100 caractères' })
  name: string;

  @IsString({ message: 'Le prénom doit être du texte' })
  @IsNotEmpty({ message: 'Le prénom est obligatoire' })
  @Length(2, 100)
  prenom: string;

  // @IsEmail() → vérifie que c'est un email valide (ex: "jean@gmail.com")
  @IsEmail({}, { message: "L'email n'est pas valide" })
  @IsNotEmpty({ message: "L'email est obligatoire" })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Le téléphone est obligatoire' })
  telephone: string;
}
