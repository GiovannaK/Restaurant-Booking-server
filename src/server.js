import express from 'express';
import {connectDB} from '../config/database.js';
import { config } from 'dotenv';

config();

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server is running on port ${PORT}`)
);

