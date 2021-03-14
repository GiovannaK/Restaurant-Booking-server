const express = require('express');
const connectDB = require('./config/database');
const dotenv = require('dotenv').config();
const sessionRoutes = require('./routes/sessionRoutes');
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const path = require('path');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

connectDB();

app.use('/session', sessionRoutes);
app.use('/user', userRoutes);
app.use('/restaurant', restaurantRoutes);
app.use('/files', express.static(path.resolve(__dirname, '..', "temp", "uploads")));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server is running on port ${PORT}`)
);

