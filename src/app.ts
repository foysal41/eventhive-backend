import express, { type Request, type Response } from 'express'

const app = express()

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))




app.use("/", async(req:Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "This is HOME Route"
    })
})


export default app