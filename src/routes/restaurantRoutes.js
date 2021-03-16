const express = require('express');
const { store } = require('../controllers/restaurantController');
const checkIfIsPartner = require('../middlewares/isPartner');
const loginRequired = require('../middlewares/loginRequired');

const router = express.Router();

router.post('/register_restaurant', loginRequired, checkIfIsPartner, store);

module.exports = router;
