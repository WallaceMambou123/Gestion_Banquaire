// ============================================================
// FICHIER: compte/compte.service.ts  (Service Compte)
// ============================================================
// Équivalent de ton CompteService.java.
// Gère toute la logique métier liée aux comptes bancaires.

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compte } from './entities/compte.entity';
import { CreateCompteDto } from './dto/create-compte.dto';
import { ClientService } from '../client/client.service';

@Injectable()
export class CompteService {

  constructor(
    @InjectRepository(Compte)
    private readonly compteRepository: Repository<Compte>,

    // On injecte ClientService pour pouvoir vérifier que le client existe
    // (comme dans CompteService.java qui utilisait clientRepository)
    private readonly clientService: ClientService,
  ) {}

  // -------------------------------------------------------
  // OUVRIR UN COMPTE
  // Équivalent de : ouvrirCompte() dans CompteService.java
  // -------------------------------------------------------
  async ouvrirCompte(dto: CreateCompteDto): Promise<Compte> {
    // On vérifie que le client existe (lève 404 si introuvable)
    const client = await this.clientService.trouverParId(dto.clientId);

    // On crée l'objet Compte avec les données du DTO
    const compte = this.compteRepository.create({
      numeroCompte: this.genererNumeroCompte(), // Génère "FR76..." unique
      typeCompte: dto.typeCompte.toUpperCase(), // On force les majuscules
      solde: dto.soldeInitial ?? 0,            // ?? = "si null ou undefined, utilise 0"
      dateOuverture: new Date(),               // La date d'aujourd'hui
      client: client,                          // Le client propriétaire du compte
    });

    // INSERT INTO comptes...
    return await this.compteRepository.save(compte);
  }

  // -------------------------------------------------------
  // LISTER LES COMPTES D'UN CLIENT
  // Équivalent de : listerComptesDuClient() dans CompteService.java
  // -------------------------------------------------------
  async listerComptesDuClient(clientId: number): Promise<Compte[]> {
    // SELECT * FROM comptes WHERE client_id = ?
    return await this.compteRepository.find({
      where: { client: { id: clientId } },
    });
  }

  // -------------------------------------------------------
  // CONSULTER LE SOLDE D'UN COMPTE
  // Équivalent de : consulterSolde() dans CompteService.java
  // -------------------------------------------------------
  async consulterSolde(compteId: number): Promise<number> {
    const compte = await this.trouverCompteParId(compteId);
    return Number(compte.solde);
  }

  // -------------------------------------------------------
  // TROUVER UN COMPTE PAR SON ID (méthode interne)
  // Équivalent de : trouverCompteParId() dans CompteService.java
  // -------------------------------------------------------
  async trouverCompteParId(compteId: number): Promise<Compte> {
    const compte = await this.compteRepository.findOne({
      where: { id: compteId },
    });

    if (!compte) {
      throw new NotFoundException(`Compte avec l'ID ${compteId} non trouvé`);
    }

    return compte;
  }

  // -------------------------------------------------------
  // Générer un numéro de compte unique
  // Équivalent de : genererNumeroCompte() dans CompteService.java
  // -------------------------------------------------------
  private genererNumeroCompte(): string {
    // Date.now() donne un nombre en millisecondes depuis 1970
    // comme System.nanoTime() en Java → garantit l'unicité
    return 'FR76' + Date.now();
  }
}
