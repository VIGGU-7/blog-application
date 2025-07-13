import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './utils/connectDB.js';
import authRoutes from './routes/auth.routes.js'
import 'dotenv/config'
const PORT=process.env.port || 8080
const app = express();
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded())
app.use(cookieParser());


//routes
app.use("/api/auth",authRoutes);



//server
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is listening on port ${PORT}`)
    })
})
