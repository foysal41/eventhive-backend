import { Pool } from "pg";
import config from "../config";


export const pool = new Pool({
    connectionString:config.connection_string,
})

export const initDB = async():Promise<void> => {
    try{
        await pool.query(
            `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role VARCHAR(20) NOT NULL DEFAULT 'attendee' CHECK (role IN ('attendee', 'organizer')),
                
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

            )
            
            `
        )

        console.log("Database is connected")
    }catch(error) {
        console.log(error)
    }
}