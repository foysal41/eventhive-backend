import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";



const globalErrorHandler = (error: any, _req: Request, res: Response, _next: NextFunction) => {

    let statusCode = error.statusCode || 500;
    let message = error.message || "Internal Server Error";
    let errors = error.errors || undefined;

    if(error?.code === "23505") {
        statusCode = 409;
        message= "Email already register";
    }

    if(error?.code === "22P02") {
        statusCode = 400;
        message= "Invalid ID format";
    }

    if (statusCode === 500 && !(error instanceof AppError) ) {
        message = "Internal Server Error";
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(errors && {error}),
    })
}


export default globalErrorHandler;