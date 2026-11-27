import { Response } from "express";

type TResponse<T> = {
    status_code: number,
    success: boolean,
    message: string,
    data?: T,
    error?: any;
}

const sendResponse = <T>(res:Response, payload: TResponse<T>) => {
    res.status(payload.status_code).json({
        success: payload.success,
        message: payload.message,
        data: payload.data !== undefined ? payload.data: null,
        error: payload.error
    })
}

export default sendResponse