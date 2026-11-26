import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";


const signup  = async(req: Request, res: Response) => {
    try{
        const result = await AuthService.signup(req.body)
        sendResponse(res, {statusCode: 201, success: true, message: "User registered successfully", data: result.rows[0]} )
    }catch(error: any) {
        sendResponse(res, {statusCode: 400, success: false, message: error.message})
    }

}


export const AuthController = {
    signup,
}