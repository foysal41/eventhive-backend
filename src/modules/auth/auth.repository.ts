import { create } from "domain";
import { pool } from "../../db";
import { AuthInterface } from "./auth.interface";



const createUser = async(payload:AuthInterface )=> {
    const {name, email, password, role} = payload;
    
    const result = await pool.query(
        `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, COALESCE($4, 'attendee')) RETURNING *` , [name, email, password, role],
    )

    delete result.rows[0].password
    return result;
}



export const AuthRepository = {
    createUser,
}