import { Compte } from '../../compte/entities/compte.entity';
export declare class Transaction {
    id: number;
    montant: number;
    dateTransaction: Date;
    typeTransaction: string;
    description: string;
    compte: Compte;
}
