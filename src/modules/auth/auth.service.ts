import { AuthInterface } from "./auth.interface";



const signup = async(payload: AuthInterface) => {
    const {name, email, password, role} = payload
    console.log(payload)

}


export const AuthService  = {
    signup
}

