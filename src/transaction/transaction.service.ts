// ============================================================
// FICHIER: transaction/transaction.service.ts  (Service Transaction)
// ============================================================
// Équivalent de ton TransactionService.java.
// Gère les 3 opérations bancaires : dépôt, retrait, virement.
//
// C'est le service le plus important : il manipule l'argent !
// En Java tu avais @Transactional pour garantir que si une
// opération échoue à mi-chemin, tout est annulé.
// En NestJS, on utilise les DataSource transactions de TypeORM.

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { Compte } from '../compte/entities/compte.entity';
import { DepotDto, RetraitDto, VirementDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService {

  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,

    @InjectRepository(Compte)
    private readonly compteRepository: Repository<Compte>,

    // DataSource permet de faire des transactions SQL sécurisées
    // (comme @Transactional en Java Spring)
    // Si une étape échoue, TOUT est annulé (rollback)
    private readonly dataSource: DataSource,
  ) {}

  // -------------------------------------------------------
  // DÉPOSER DE L'ARGENT
  // Équivalent de : deposer() dans TransactionService.java
  // -------------------------------------------------------
  async deposer(dto: DepotDto): Promise<void> {
    this.validerMontant(dto.montant);

    // queryRunner = le gestionnaire de transaction SQL
    // C'est comme @Transactional en Java : garantit que tout réussit ou tout échoue
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction(); // Début de la transaction SQL

    try {
      // On récupère le compte depuis la base de données
      const compte = await this.trouverCompte(dto.compteId, queryRunner);

      // On crédite le compte (ajoute l'argent)
      compte.crediter(dto.montant);
      await queryRunner.manager.save(Compte, compte); // UPDATE comptes SET solde = ?

      // On enregistre la transaction dans l'historique
      await this.enregistrerTransaction(
        queryRunner,
        compte,
        dto.montant,
        'CREDIT',
        (dto.libelle || 'Dépôt') + ' (dépôt)',
      );

      await queryRunner.commitTransaction(); // ✅ Tout s'est bien passé : on valide
    } catch (error) {
      await queryRunner.rollbackTransaction(); // ❌ Erreur : on annule tout
      throw error;
    } finally {
      await queryRunner.release(); // On libère la connexion dans tous les cas
    }
  }

  // -------------------------------------------------------
  // RETIRER DE L'ARGENT
  // Équivalent de : retirer() dans TransactionService.java
  // -------------------------------------------------------
  async retirer(dto: RetraitDto): Promise<void> {
    this.validerMontant(dto.montant);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const compte = await this.trouverCompte(dto.compteId, queryRunner);

      // Vérification du solde (comme en Java)
      if (Number(compte.solde) < Number(dto.montant)) {
        throw new BadRequestException('Solde insuffisant pour effectuer ce retrait');
      }

      compte.debiter(dto.montant);
      await queryRunner.manager.save(Compte, compte);

      await this.enregistrerTransaction(
        queryRunner,
        compte,
        dto.montant,
        'DEBIT',
        (dto.libelle || 'Retrait') + ' (retrait)',
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // -------------------------------------------------------
  // VIREMENT ENTRE DEUX COMPTES
  // Équivalent de : virement() dans TransactionService.java
  // -------------------------------------------------------
  async virement(dto: VirementDto): Promise<void> {
    // On ne peut pas virer sur le même compte
    if (dto.source === dto.destination) {
      throw new BadRequestException('Impossible de virer sur le même compte');
    }

    this.validerMontant(dto.montant);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // On charge les deux comptes
      const compteSource = await this.trouverCompte(dto.source, queryRunner);
      const compteDestination = await this.trouverCompte(dto.destination, queryRunner);

      // Vérification du solde du compte source
      if (Number(compteSource.solde) < Number(dto.montant)) {
        throw new BadRequestException('Solde insuffisant pour effectuer ce virement');
      }

      // On débite la source et on crédite la destination
      compteSource.debiter(dto.montant);
      compteDestination.crediter(dto.montant);

      // On sauvegarde les deux comptes modifiés
      await queryRunner.manager.save(Compte, compteSource);
      await queryRunner.manager.save(Compte, compteDestination);

      // On crée 2 lignes dans l'historique (une pour chaque compte)
      // → comme en Java : une transaction VIREMENT_EMIS + une VIREMENT_RECU
      await this.enregistrerTransaction(
        queryRunner,
        compteSource,
        dto.montant,
        'VIREMENT_EMIS',
        (dto.libelle || 'Virement') + ' vers compte ' + compteDestination.numeroCompte,
      );

      await this.enregistrerTransaction(
        queryRunner,
        compteDestination,
        dto.montant,
        'VIREMENT_RECU',
        (dto.libelle || 'Virement') + ' depuis compte ' + compteSource.numeroCompte,
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // -------------------------------------------------------
  // HISTORIQUE DES TRANSACTIONS D'UN COMPTE
  // Équivalent de : historique() dans TransactionService.java
  // -------------------------------------------------------
  async historique(compteId: number): Promise<Transaction[]> {
    // On vérifie que le compte existe
    const compteExiste = await this.compteRepository.findOne({
      where: { id: compteId },
    });

    if (!compteExiste) {
      throw new NotFoundException(`Compte ${compteId} non trouvé`);
    }

    // On retourne les transactions triées par date décroissante
    // (les plus récentes en premier)
    // Équivalent de : findByCompteIdOrderByDateTransactionDesc() en Java
    return await this.transactionRepository.find({
      where: { compte: { id: compteId } },
      order: { dateTransaction: 'DESC' },
    });
  }

  // -------------------------------------------------------
  // MÉTHODES PRIVÉES (internes au service)
  // -------------------------------------------------------

  // Trouver un compte dans une transaction SQL en cours
  private async trouverCompte(compteId: number, queryRunner: any): Promise<Compte> {
    const compte = await queryRunner.manager.findOne(Compte, {
      where: { id: compteId },
    });

    if (!compte) {
      throw new NotFoundException(`Compte ${compteId} non trouvé`);
    }

    return compte;
  }

  // Enregistrer une ligne dans l'historique des transactions
  private async enregistrerTransaction(
    queryRunner: any,
    compte: Compte,
    montant: number,
    type: string,
    description: string,
  ): Promise<void> {
    const transaction = this.transactionRepository.create({
      montant,
      typeTransaction: type,
      description,
      compte,
    });
    await queryRunner.manager.save(Transaction, transaction);
  }

  // Valider que le montant est positif
  // Équivalent de : valideMontant() dans TransactionService.java
  private validerMontant(montant: number): void {
    if (!montant || Number(montant) <= 0) {
      throw new BadRequestException('Le montant doit être un nombre positif');
    }
  }
}
