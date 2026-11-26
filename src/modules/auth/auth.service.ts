import { AppError } from "../../utils/AppError";
import { AuthInterface } from "./auth.interface";
import { AuthRepository } from "./auth.repository";
import bcrypt from "bcrypt";



const signup = async(payload: AuthInterface) => {
    const {name, email, password, role} = payload
    // console.log(payload)

    const errors: { field: string; message: string }[] = [];
    

    if(!name || typeof name !== "string" || !name.trim()){
        errors.push({field: "name" , message: "Name is required"})
    }

    if(!email || typeof email !== "string" || !email.includes("@")){
        errors.push({field: "email" , message: "Valid email is required"})
    }

    if(!password || typeof password !== "string" || password.length < 6){
        errors.push({field: "password" , message: "Password must be 6 charecter"})
    }

    if(role && role !== "attendee" && role !== "organizer"){
        errors.push({field: "role" , message: "Role should be attendee or Organizer"})
    }

    if (errors.length > 0) {
    throw new AppError(400, "Validation Error", errors);
    }
   


    const existingUser = await AuthRepository.findUserByEmail(email.trim());
    if(existingUser){
        throw new AppError(409, "Email Already registered")
    }

    const hashedPassword = await bcrypt.hash(password, 10)
   

    const result = await AuthRepository.createUser({
        name: name!.trim(),
        email: email!.trim(), 
        password: hashedPassword,
        role: role || 'attendee'
    })

    return result;

}


export const AuthService  = {
    signup
}

