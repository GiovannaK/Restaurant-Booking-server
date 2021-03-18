/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const adminBroExpress = require('@admin-bro/express');
const connectDB = require('./config/database');
const sessionRoutes = require('./routes/sessionRoutes');
const userRoutes = require('./routes/userRoutes');
const imagesRouter = require('./routes/imagesRouter');
const restaurantRoutes = require('./routes/restaurantRoutes');
const adminBroOptions = require('./modules/adminBro');
const { loginAdmin } = require('./controllers/sessionController');

const app = express();

connectDB();

const router = adminBroExpress.buildAuthenticatedRouter(adminBroOptions,
  {
    authenticate: loginAdmin,
    cookiePassword: 'e4aa5940c9b674e6d4232cb3f09704451d08b15d2bd0d0d1c2d2a8291b3a01a7d62d0e661479d588ce7c9b8495e5c9c987a9279971a02194d3d5c5d4bb983879',
  });
app.use(adminBroOptions.options.rootPath, router);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
