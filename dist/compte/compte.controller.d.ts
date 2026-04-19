import { CompteService } from './compte.service';
import { CreateCompteDto } from './dto/create-compte.dto';
export declare class CompteController {
    private readonly compteService;
    constructor(compteService: CompteService);
    ouvrir(createCompteDto: CreateCompteDto): Promise<import("./entities/compte.entity").Compte>;
    duClient(clientId: number): Promise<import("./entities/compte.entity").Compte[]>;
    solde(compteId: number): Promise<{
        compteId: number;
        solde: number;
    }>;
}
