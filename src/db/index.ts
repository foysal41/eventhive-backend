import { Pool } from "pg";
import config from "../config";


export const pool = new Pool({
    connectionString:config.connection_string,
})

export const initDB = async():Promise<void> => {
    try{
        (await pool.query(
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
            
            `,
        ),
          await pool.query(`
            CREATE TABLE IF NOT EXISTS events (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                category VARCHAR(50) NOT NULL,
                date VARCHAR(100) NOT NULL,
                location VARCHAR(255) NOT NULL,
                total_seats INT NOT NULL CHECK (total_seats > 0),
                available_seats INT NOT NULL CHECK (available_seats >= 0),
                price VARCHAR(100) NOT NULL, 
                organizer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            )
            `
        )
        );

        console.log("Database is connected")
    }catch(error) {
        console.log(error)
    }
}