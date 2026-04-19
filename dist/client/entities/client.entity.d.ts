import { Compte } from '../../compte/entities/compte.entity';
export declare class Client {
    id: number;
    name: string;
    prenom: string;
    email: string;
    telephone: string;
    comptes: Compte[];
}
