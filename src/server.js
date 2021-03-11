import express from 'express';
import {connectDB} from '../config/database.js';
import { config } from 'dotenv';
import sessionRoutes from '../src/routes/sessionRoutes.js';

config();

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

connectDB();

app.use('/session', sessionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server is running on port ${PORT}`)
);

