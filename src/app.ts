import express, { type Request, type Response } from 'express'
import { AuthRouter } from './modules/auth/auth.route';

const app = express()

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))

app.use("/api/v1/auth" , AuthRouter)


app.use("/", async(req:Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "This is HOME Route"
    })
})


export default app