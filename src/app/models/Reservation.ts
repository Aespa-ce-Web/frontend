export interface Reservation {
    title: string;
    ressource_id: number;
    start_date: Date;
    end_date: Date;
    isAbsence: boolean;
}