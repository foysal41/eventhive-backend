import express, { type Request, type Response } from 'express'
import { AuthRouter } from './modules/auth/auth.route';
import globalErrorHandler from './middlewares/globalErrorHandler';
import fs from "fs"

const app = express()

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))

app.use((req, res, next)=> {
    const log = `\n Method : ${req.method} | URL : ${req.url} | Date: ${new Date().toLocaleDateString("en-GB")} | Time: ${new Date().toLocaleTimeString("en-US", { hour12: true })}\n`;

    fs.appendFile("logger.txt" , log, (err) => {
        console.log(err)
    })

    next()
})

app.use("/api/v1/auth" , AuthRouter)


app.use("/", async(req:Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "This is HOME Route"
    })
})

app.use(globalErrorHandler);
export default app