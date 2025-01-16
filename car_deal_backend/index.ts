import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectToDb } from './config/dbConnection'
import { authRouter } from './routes/authRoutes'
import { contactRouter } from './routes/contactsRoutes'
import { orderRouter } from './routes/orderRoutes'
import { cartRouter } from './routes/cartRoutes'
import { carRouter } from './routes/carRoutes'
import { subscriptionRouter } from './routes/subscriptionRoutes'
import { authMiddleware } from './middlewares/authMiddleware'

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

// Parse json request data
app.use(express.json())

// endpoints
app.get('/',(req: Request, res: Response)=>{
    res.send("home page")
})

app.use('/api/auth', authRouter)
app.use('/api', contactRouter)
app.use('/api', orderRouter)
//@ts-ignore
app.use('/api', cartRouter)
app.use('/api', carRouter)
app.use('/api', subscriptionRouter)
// Start server
app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`);
})