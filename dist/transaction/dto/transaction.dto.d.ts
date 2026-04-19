export declare class DepotDto {
    compteId: number;
    montant: number;
    libelle?: string;
}
export declare class RetraitDto {
    compteId: number;
    montant: number;
    libelle?: string;
}
export declare class VirementDto {
    source: number;
    destination: number;
    montant: number;
    libelle?: string;
}
