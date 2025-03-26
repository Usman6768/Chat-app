import express from 'express';
import dotenv from 'dotenv';

import {connectDB} from "./lib/db.js"
import authRoutes from "./routes/auth.route.js"

dotenv.config();
const app = express();

app.use(express.json()) // we write this middleware because we have to take data from user in controllers like (req.body) and this will allow us to extract the json data from req.body

const PORT = process.env.PORT;

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    connectDB();
})