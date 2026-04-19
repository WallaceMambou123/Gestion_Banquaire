import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    creer(createClientDto: CreateClientDto): Promise<import("./entities/client.entity").Client>;
    lister(): Promise<import("./entities/client.entity").Client[]>;
    trouver(id: number): Promise<import("./entities/client.entity").Client>;
    supprimer(id: number): Promise<void>;
}
