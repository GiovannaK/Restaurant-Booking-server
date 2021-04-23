/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv').config();
const socketio = require('socket.io');
const http = require('http');
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
const userBookingRoutes = require('./routes/userBookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const adminBroOptions = require('./modules/adminBro');
const { loginAdmin } = require('./controllers/sessionController');

const app = express();
const server = http.Server(app);
const io = socketio(server);

const router = adminBroExpress.buildAuthenticatedRouter(adminBroOptions,
  {
    authenticate: loginAdmin,
    cookiePassword: `${process.env.COOKIE_PASSWORD}`,
  });
app.use(adminBroOptions.options.rootPath, router);

app.use(express.urlencoded());
app.use(express.json());

const corsOptions = {
  origin: `${process.env.BASE_URL}`,
  methods: 'GET, PUT, DELETE, POST',
};

app.use(cors(corsOptions));

connectDB();

const connectedUsers = {};

io.on('connection', (socket) => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use('/user_bookings', userBookingRoutes);
app.use('/special_dates', specialDateRoutes);
app.use('/session', sessionRoutes);
app.use('/user', userRoutes);
app.use('/restaurant', restaurantRoutes);
app.use('/images', imagesRouter);
app.use('/menu', menuRoutes);
app.use('/restaurant_categories', restaurantCategoriesRoutes);
app.use('/menu_categories', menuCategoryRoutes);
app.use('/booking', bookingRoutes);
app.use('/restaurant_bookings', restaurantBookingsRoutes);
app.use('/review', reviewRoutes);
app.use('/', homeRoutes);
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')));

const PORT = process.env.PORT || 5000;

server.listen(
  PORT,
  console.log(`Server is running on port ${PORT}`),
);
