// ============================================================
// FICHIER: compte/entities/compte.entity.ts  (Entité Compte)
// ============================================================
// Correspond à ta classe Compte.java avec @Entity.
// Représente la table "comptes" dans MySQL.
//
// Un compte appartient à UN seul client (@ManyToOne)
// Un compte peut avoir PLUSIEURS transactions (@OneToMany)

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { Transaction } from '../../transaction/entities/transaction.entity';

@Entity('comptes')
export class Compte {

  @PrimaryGeneratedColumn()
  id: number;

  // Numéro de compte unique (comme "FR76...")
  // unique: true → deux comptes ne peuvent pas avoir le même numéro
  @Column({ nullable: false, length: 34, unique: true, name: 'numero_compte' })
  numeroCompte: string;

  // Le solde (l'argent disponible sur le compte)
  // type: 'decimal' = virgule flottante précise (comme BigDecimal en Java)
  // precision: 15, scale: 2 → max 15 chiffres dont 2 après la virgule
  // default: '0' → au départ le solde est 0
  @Column({ nullable: false, type: 'decimal', precision: 15, scale: 2, default: '0' })
  solde: number;

  // Date d'ouverture du compte (juste le jour, pas l'heure)
  // type: 'date' = LocalDate en Java
  @Column({ nullable: false, name: 'date_ouvreture', type: 'date' })
  dateOuverture: Date;

  // Type du compte : "COURANT", "EPARGNE", etc.
  @Column({ nullable: false, name: 'type_compte' })
  typeCompte: string;

  // @ManyToOne = PLUSIEURS comptes appartiennent à UN seul client
  // C'est la même relation qu'en Java : @ManyToOne + @JoinColumn
  // onDelete: 'CASCADE' → si le client est supprimé, ses comptes aussi
  @ManyToOne(() => Client, (client) => client.comptes, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: false, // On ne charge pas le client automatiquement (FetchType.LAZY)
  })
  @JoinColumn({ name: 'client_id' }) // Nom de la colonne de clé étrangère dans MySQL
  client: Client;

  // @OneToMany = UN compte peut avoir PLUSIEURS transactions
  @OneToMany(() => Transaction, (transaction) => transaction.compte, {
    cascade: true,
    eager: false,
  })
  transactions: Transaction[];

  // -------------------------------------------------------
  // MÉTHODES MÉTIER (comme dans ton Compte.java)
  // -------------------------------------------------------

  // Ajouter de l'argent sur le compte
  crediter(montant: number): void {
    this.solde = Number(this.solde) + Number(montant);
  }

  // Retirer de l'argent du compte (avec vérification du solde)
  debiter(montant: number): void {
    if (Number(this.solde) < Number(montant)) {
      throw new Error('Solde insuffisant');
    }
    this.solde = Number(this.solde) - Number(montant);
  }
}
