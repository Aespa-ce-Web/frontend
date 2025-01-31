export interface Ressource {
    id: number;
    nom: string;
    type: "human" | "machine";
    competences: string[];
}