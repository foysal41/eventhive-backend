

import fs from 'fs'
import type {NextFunction, Request, Response } from "express";

const logger = async(req: Request, res: Response, next: NextFunction)=> {
     const log = `\n Method : ${req.method} | URL : ${req.url} | Date: ${new Date().toLocaleDateString("en-GB")} | Time: ${new Date().toLocaleTimeString("en-US", { hour12: true })}\n`;

    fs.appendFile("logger.txt" , log, (err) => {
        console.log(err)
    })

    next()
}

export default logger