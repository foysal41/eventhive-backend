import { pool } from "../../db";
import { AppError } from "../../utils/AppError";
import { i_event } from "./event.interface";




const create_event_into_db = async(payload:i_event ): Promise<i_event>=>{
     const {title, description, category, date , location, total_seats, available_seats , price, organizer_id} = payload

    if(!title || !date || !location || !total_seats){
        throw new AppError(400, "Title, Date, Location, and total_seats are required")
    }

    if(total_seats <= 0){
        throw new AppError(400, "Total seats must be grater than 0")
    }

    const query = `
    INSERT INTO events (title, description, category, date, location, total_seats, available_seats, price, organizer_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8 , $9)
    RETURNING *;
  `;

  const values = [title.trim() , description || null, category, date, location.trim(), total_seats, available_seats ?? total_seats, price, organizer_id];

  const result = await pool.query(query, values);
  return result.rows[0]


}



export const event_service = {
    create_event_into_db,
}