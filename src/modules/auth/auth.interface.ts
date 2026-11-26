export type AuthInterface = {
    name?: string,
    email: string, 
    password: string,
    role?: 'attendee' | 'organizer';
}