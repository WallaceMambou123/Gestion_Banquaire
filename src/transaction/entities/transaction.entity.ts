// ============================================================
// FICHIER: transaction/entities/transaction.entity.ts
// ============================================================
// Correspond à ta classe Transaction.java avec @Entity.
// Représente la table "transactions" dans MySQL.
//
// Chaque transaction est liée à UN seul compte (@ManyToOne).

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Compte } from '../../compte/entities/compte.entity';

@Entity('transactions')
export class Transaction {

  @PrimaryGeneratedColumn()
  id: number;

  // Le montant de l'opération
  @Column({ nullable: false, type: 'decimal', precision: 15, scale: 2 })
  montant: number;

  // La date et l'heure de la transaction
  // @CreateDateColumn() = LocalDateTime.now() automatique en Java
  // Il remplit automatiquement ce champ à la création de la transaction
  @CreateDateColumn({ name: 'date_transaction' })
  dateTransaction: Date;

  // Le type : "CREDIT", "DEBIT", "VIREMENT_EMIS", "VIREMENT_RECU"
  @Column({ nullable: false, name: 'type_transaction', length: 20 })
  typeTransaction: string;

  // Une description de l'opération (ex: "dépôt" ou "retrait essence")
  @Column({ nullable: true, length: 255 })
  description: string;

  // @ManyToOne = PLUSIEURS transactions appartiennent à UN compte
  // C'est la même relation @ManyToOne qu'en Java
  @ManyToOne(() => Compte, (compte) => compte.transactions, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'compte_id' })
  compte: Compte;
}
