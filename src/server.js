/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const adminBroExpress = require('@admin-bro/express');
const connectDB = require('./config/database');
const homeRoutes = require('./routes/homeRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const userRoutes = require('./routes/userRoutes');
const imagesRouter = require('./routes/imagesRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const menuRoutes = require('./routes/menuRoutes');
const restaurantCategoriesRoutes = require('./routes/restaurantCategoriesRoutes');
const menuCategoryRoutes = require('./routes/menuCategoriesRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const restaurantBookingsRoutes = require('./routes/restaurantBookingsRoutes');
const specialDateRoutes = require('./routes/specialDateRoutes');
const adminBroOptions = require('./modules/adminBro');
const { loginAdmin } = require('./controllers/sessionController');

const app = express();

// connect database

connectDB();

// adminBro

const router = adminBroExpress.buildAuthenticatedRouter(adminBroOptions,
  {
    authenticate: loginAdmin,
    cookiePassword: `${process.env.COOKIE_PASSWORD}`,
  });
app.use(adminBroOptions.options.rootPath, router);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/special_dates', specialDateRoutes);
app.use('/', homeRoutes);
app.use('/session', sessionRoutes);
app.use('/user', userRoutes);
app.use('/restaurant', restaurantRoutes);
app.use('/images', imagesRouter);
app.use('/menu', menuRoutes);
app.use('/restaurant_categories', restaurantCategoriesRoutes);
app.use('/menu_categories', menuCategoryRoutes);
app.use('/booking', bookingRoutes);
app.use('/restaurant_bookings', restaurantBookingsRoutes);
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server is running on port ${PORT}`),
);
