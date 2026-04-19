import { Repository, DataSource } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { Compte } from '../compte/entities/compte.entity';
import { DepotDto, RetraitDto, VirementDto } from './dto/transaction.dto';
export declare class TransactionService {
    private readonly transactionRepository;
    private readonly compteRepository;
    private readonly dataSource;
    constructor(transactionRepository: Repository<Transaction>, compteRepository: Repository<Compte>, dataSource: DataSource);
    deposer(dto: DepotDto): Promise<void>;
    retirer(dto: RetraitDto): Promise<void>;
    virement(dto: VirementDto): Promise<void>;
    historique(compteId: number): Promise<Transaction[]>;
    private trouverCompte;
    private enregistrerTransaction;
    private validerMontant;
}
