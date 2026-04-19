import { TransactionService } from './transaction.service';
import { DepotDto, RetraitDto, VirementDto } from './dto/transaction.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    depot(depotDto: DepotDto): Promise<{
        message: string;
    }>;
    retrait(retraitDto: RetraitDto): Promise<{
        message: string;
    }>;
    virement(virementDto: VirementDto): Promise<{
        message: string;
    }>;
    releve(compteId: number): Promise<import("./entities/transaction.entity").Transaction[]>;
}
