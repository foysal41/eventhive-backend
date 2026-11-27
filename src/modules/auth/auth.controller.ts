import { Request, Response, NextFunction } from 'express';
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";


const signup  = async(req: Request, res: Response , next: NextFunction ) => {
    try{
        const result = await AuthService.signup(req.body)
        sendResponse(res, {statusCode: 201, success: true, message: "User registered successfully", data: result.rows[0]} )
    }catch(error: any) {
        next(error)
    }

}

const login = async(req: Request, res: Response , next: NextFunction) => {
    try{
        const result = await AuthService.login(req.body)
        sendResponse(res, {statusCode: 201, success: true, message: "User Login successfully", data: result} )
    }catch(error: any) {
        next(error)
    }
}


export const AuthController = {
    signup,
    login
}