import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './utils/connectDB.js';
import authRoutes from './routes/auth.routes.js'
import blogRoutes from './routes/blog.routes.js'
import 'dotenv/config'
const PORT=process.env.port || 8080
const app = express();
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); //for form-urlencoded bodies


app.use(cookieParser());


//routes
app.use("/api/auth",authRoutes);
app.use("/api/blog",blogRoutes)


//server
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is listening on port ${PORT}`)
    })
})
