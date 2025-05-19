import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser"
import cors from 'cors'

import {connectDB} from "./lib/db.js"

import path from 'path'

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { app,server } from './lib/socket.js';


dotenv.config();
const PORT = process.env.PORT;
const __dirname = path.resolve()

app.use(express.json()) // we write this middleware because we have to take data from user in controllers like (req.body) and this will allow us to extract the json data from req.body
app.use(cookieParser()) // we use this middleware to parse the cookies sent by the client to the server
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // we write this to allow the server to send cookies to the client
}))


app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connectDB();
})