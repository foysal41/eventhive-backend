import jwt from "jsonwebtoken";
import { AppError } from "../../utils/AppError";
import { AuthInterface } from "./auth.interface";
import { AuthRepository } from "./auth.repository";
import bcrypt from "bcrypt";
import config from "../../config";



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



const login = async(payload: AuthInterface) => {
    const {email, password} = payload;
    
    const errors  : {field: string; message: string}[] = [];

    if(!email || typeof email !== "string" || !email.includes("@")){
        errors.push({field: "email" , message: "Valid email is required"})
    }
    if(!password || typeof password !== "string" ){
        errors.push({field: "password" , message: "Password is required"})
    }

    if (errors.length > 0) {
    throw new AppError(400, "Validation Error", errors);
    }
   


    const user = await AuthRepository.findUserByEmail(email.trim());
  
    if(!user){
        throw new AppError(401, "Invalid email")
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if(!isPasswordMatch){
        throw new AppError(401, "Invalid password")
    }




    const jwtPayload = {
        id: user.id,
        role: user.role
    }

    const token = jwt.sign(jwtPayload, config.jwt_secret, {expiresIn: config.jwt_expire_in as any}) 
    return {
        token,
        user: {
            id: user.id,
            name: user.name, 
            email: user.email, 
            role: user.role,
        }
    }
    


}

export const AuthService  = {
    signup,
    login
}

