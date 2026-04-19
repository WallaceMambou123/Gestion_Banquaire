// ============================================================
// FICHIER: client/client.service.ts  (Service Client)
// ============================================================
// Le SERVICE contient toute la LOGIQUE MÉTIER.
// C'est l'équivalent de ton ClientService.java.
//
// Organisation en NestJS (même logique qu'en Java Spring) :
//
//   Controller (reçoit la requête HTTP)
//       ↓
//   Service (fait le travail : créer, chercher, supprimer...)
//       ↓
//   Repository/TypeORM (parle à la base de données)
//
// Le service NE connaît PAS HTTP. Il fait juste son travail
// métier (créer un client, le trouver, etc.)

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';

// @Injectable() = @Service en Java
// Cela permet à NestJS d'injecter ce service dans d'autres classes
// (comme @RequiredArgsConstructor + @Autowired en Java Spring)
@Injectable()
export class ClientService {

  constructor(
    // @InjectRepository(Client) = l'équivalent de @Autowired ClientRepository en Java
    // TypeORM nous donne un objet "Repository" qui sait faire
    // findAll(), findOne(), save(), delete(), etc.
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  // -------------------------------------------------------
  // CRÉER UN CLIENT
  // Équivalent de : creerClient() dans ClientService.java
  // -------------------------------------------------------
  async creerClient(dto: CreateClientDto): Promise<Client> {
    // On crée un nouvel objet Client avec les données du DTO
    // C'est comme : Client client = new Client(); client.setName(...);
    const client = this.clientRepository.create({
      name: dto.name,
      prenom: dto.prenom,
      email: dto.email,
      telephone: dto.telephone,
    });

    // On sauvegarde dans la base de données (INSERT INTO clients...)
    // C'est comme : clientRepository.save(client) en Java
    return await this.clientRepository.save(client);
  }

  // -------------------------------------------------------
  // LISTER TOUS LES CLIENTS
  // Équivalent de : listerTousLesClients() dans ClientService.java
  // -------------------------------------------------------
  async listerTousLesClients(): Promise<Client[]> {
    // find() sans paramètre = SELECT * FROM clients
    return await this.clientRepository.find();
  }

  // -------------------------------------------------------
  // TROUVER UN CLIENT PAR SON ID
  // Équivalent de : trouverParId() dans ClientService.java
  // -------------------------------------------------------
  async trouverParId(id: number): Promise<Client> {
    // findOne() = SELECT * FROM clients WHERE client_id = ?
    const client = await this.clientRepository.findOne({ where: { id } });

    // Si le client n'existe pas, on lève une erreur 404 (Not Found)
    // C'est l'équivalent de : throw new EntityNotFoundException(...) en Java
    // NestJS transforme NotFoundException en réponse HTTP 404 automatiquement
    if (!client) {
      throw new NotFoundException(`Client avec l'ID ${id} non trouvé`);
    }

    return client;
  }

  // -------------------------------------------------------
  // SUPPRIMER UN CLIENT
  // Équivalent de : supprimerClient() dans ClientService.java
  // -------------------------------------------------------
  async supprimerClient(id: number): Promise<void> {
    // On vérifie d'abord que le client existe
    await this.trouverParId(id); // Lève une erreur 404 si introuvable

    // delete() = DELETE FROM clients WHERE client_id = ?
    await this.clientRepository.delete(id);
  }
}
