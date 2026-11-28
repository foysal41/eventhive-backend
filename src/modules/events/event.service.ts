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


const get_all_event_from_db = async(search?:string) : Promise<i_event[]> => {
   
    const result = await pool.query(`
        SELECT * FROM events 
        WHERE title ILIKE $1 OR description ILIKE $1 
        ORDER By created_at DESC;`, 
        [`%${search || ""}%`]);

    return result.rows;
}


const get_single_event_from_db = async(id: number): Promise<i_event[]> => {
    const result = await pool.query(`SELECT * FROM events WHERE id = $1` , [id]);
    if(!result.rows[0]){
        throw new AppError(404, "Event not Found")
    }
    return result.rows[0]
}


const update_event_in_db = async(id: number, organizer_id: number, payload: Partial<i_event>) : Promise<i_event> => {
    const existing_event = await pool.query(`SELECT * FROM events WHERE id = $1` , [id]);
    if(!existing_event.rows[0]){
        throw new AppError(404, "Event not found")
    }

    if(existing_event.rows[0].organizer_id !== organizer_id ){
        throw new AppError(404, "You can not update others event")
    }

    

    const {title, description, category, date, location, total_seats,  available_seats, price, } = payload

    const tickets_sold = existing_event.rows[0].total_seats - existing_event.rows[0].available_seats;

    if (total_seats !== undefined && (total_seats <= 0 || total_seats < tickets_sold)) {
    throw new AppError(400, "Total seats must be greater then 0");
    }

    const query = `
        UPDATE events SET 
        title = COALESCE($1, title), 
        description = COALESCE($2, description),
        category =COALESCE($3, category),
        date =COALESCE($4, date),
        location =COALESCE($5, location),
        total_seats =COALESCE($6, total_seats),
        available_seats = COALESCE($7, available_seats),
        price = COALESCE($8, price),
        updated_at = NOW()

        WHERE id = $9
        RETURNING *;

    `

    const values = [
        title ?? null, description ?? null, category ?? null, date ?? null, location ?? null, total_seats ?? null, available_seats ?? null, price ?? null, id
    ]


    const result  = await pool.query(query, values)
    return result.rows[0]
}


const delete_event_from_db = async(id: number)=> {

    const result = await pool.query(`DELETE FROM events WHERE id = $1`, [id]);
    return result.rows[0];
}   




export const event_service = {
    create_event_into_db,
    get_all_event_from_db,
    get_single_event_from_db,
    update_event_in_db,
    delete_event_from_db
}