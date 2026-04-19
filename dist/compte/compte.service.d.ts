import { Repository } from 'typeorm';
import { Compte } from './entities/compte.entity';
import { CreateCompteDto } from './dto/create-compte.dto';
import { ClientService } from '../client/client.service';
export declare class CompteService {
    private readonly compteRepository;
    private readonly clientService;
    constructor(compteRepository: Repository<Compte>, clientService: ClientService);
    ouvrirCompte(dto: CreateCompteDto): Promise<Compte>;
    listerComptesDuClient(clientId: number): Promise<Compte[]>;
    consulterSolde(compteId: number): Promise<number>;
    trouverCompteParId(compteId: number): Promise<Compte>;
    private genererNumeroCompte;
}
