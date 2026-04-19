// ============================================================
// FICHIER: client/entities/client.entity.ts  (Entité Client)
// ============================================================
// Une ENTITÉ représente une TABLE dans la base de données.
// C'est l'équivalent de ta classe Client.java avec @Entity.
//
// Chaque propriété de la classe = une COLONNE dans la table MySQL.
//
// En Java tu avais : @Entity, @Table, @Column, @Id, @OneToMany
// En NestJS/TypeORM : @Entity(), @Column(), @PrimaryGeneratedColumn(), @OneToMany()
// → Même idée, syntaxe différente !

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Compte } from '../../compte/entities/compte.entity';

// @Entity() dit à TypeORM : "Cette classe correspond à une table MySQL"
// Le nom de la table sera 'clients' (automatiquement en minuscule + pluriel)
@Entity('clients')
export class Client {

  // @PrimaryGeneratedColumn() = @Id + @GeneratedValue en Java
  // → NestJS créera automatiquement un ID unique qui s'incrémente (1, 2, 3...)
  @PrimaryGeneratedColumn({ name: 'client_id' })
  id: number;

  // @Column() = @Column en Java
  // nullable: false → le champ est obligatoire (ne peut pas être vide)
  // length: 100 → maximum 100 caractères
  @Column({ nullable: false, length: 100 })
  name: string;

  @Column({ nullable: false, length: 100 })
  prenom: string;

  @Column({ nullable: false, length: 100 })
  email: string;

  @Column({ nullable: false, length: 100 })
  telephone: string;

  // @OneToMany = UN client peut avoir PLUSIEURS comptes
  // C'est la même relation qu'en Java : @OneToMany(mappedBy = "client")
  // () => Compte  →  indique la classe liée
  // (compte) => compte.client  →  indique le champ inverse dans Compte
  // eager: false  →  on ne charge pas les comptes automatiquement (comme FetchType.LAZY)
  @OneToMany(() => Compte, (compte) => compte.client, {
    cascade: true,  // Si on supprime un client, ses comptes sont supprimés aussi (CascadeType.ALL)
    eager: false,
  })
  comptes: Compte[];
}
