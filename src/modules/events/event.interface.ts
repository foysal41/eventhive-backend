export interface i_event {
    id?: number;
    title: string;
    description?: string;
    category: string;
    date: string;
    location: string;
    total_seats: number;
    available_seats?: number;
    price: string;
    organizer_id : number;
    created_at?: Date;
    updated_at?: Date;
}