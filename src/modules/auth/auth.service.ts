import { AuthInterface } from "./auth.interface";
import { AuthRepository } from "./auth.repository";



const signup = async(payload: AuthInterface) => {
    const {name, email, password, role} = payload
    console.log(payload)


    const result = await AuthRepository.createUser({
        name,
        email,
        password,
        role:role||"attendee"
    })

    return result;

}


export const AuthService  = {
    signup
}

