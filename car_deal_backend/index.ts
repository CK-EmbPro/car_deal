import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectToDb } from './config/dbConnection'

// Load environment variables
dotenv.config()

// Init the express app
const app:Express = express()

// Get the server port
const port = process.env.PORT

// Enable cross origin requests
app.use(cors({
    origin: "*"
}))

// Establish connection to mongoatlas]
connectToDb()

// endpoints
app.get('/',(req: Request, res: Response)=>{
    res.send("home page")
})

// Start server
app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`);
})