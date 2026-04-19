import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
export declare class ClientService {
    private readonly clientRepository;
    constructor(clientRepository: Repository<Client>);
    creerClient(dto: CreateClientDto): Promise<Client>;
    listerTousLesClients(): Promise<Client[]>;
    trouverParId(id: number): Promise<Client>;
    supprimerClient(id: number): Promise<void>;
}
