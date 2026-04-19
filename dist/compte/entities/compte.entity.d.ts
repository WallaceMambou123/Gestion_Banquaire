import { Client } from '../../client/entities/client.entity';
import { Transaction } from '../../transaction/entities/transaction.entity';
export declare class Compte {
    id: number;
    numeroCompte: string;
    solde: number;
    dateOuverture: Date;
    typeCompte: string;
    client: Client;
    transactions: Transaction[];
    crediter(montant: number): void;
    debiter(montant: number): void;
}
