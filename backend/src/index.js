import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser"
import cors from 'cors'

import {connectDB} from "./lib/db.js"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"


dotenv.config();
const app = express();

app.use(express.json()) // we write this middleware because we have to take data from user in controllers like (req.body) and this will allow us to extract the json data from req.body
app.use(cookieParser()) // we use this middleware to parse the cookies sent by the client to the server
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // we write this to allow the server to send cookies to the client
}))

const PORT = process.env.PORT;

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connectDB();
})