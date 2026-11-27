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

const find_user_by_email = async(email:string) => {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1` , [email]);
    return result.rows[0] || null;
}



export const AuthRepository = {
    createUser,
    find_user_by_email
}