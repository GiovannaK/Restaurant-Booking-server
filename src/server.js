/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const connectDB = require('./config/database');
const sessionRoutes = require('./routes/sessionRoutes');
const userRoutes = require('./routes/userRoutes');
const imagesRouter = require('./routes/imagesRouter');
const restaurantRoutes = require('./routes/restaurantRoutes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();

app.use('/session', sessionRoutes);
app.use('/user', userRoutes);
app.use('/restaurant', restaurantRoutes);
app.use('/images', imagesRouter);
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server is running on port ${PORT}`),
);
