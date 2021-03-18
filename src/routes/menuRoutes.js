const express = require('express');
const checkIfIsPartner = require('../middlewares/isPartner');
const loginRequired = require('../middlewares/loginRequired');
const { store } = require('../controllers/menuController');

const router = express.Router();

router.post('/:restaurantId', loginRequired, checkIfIsPartner, store);

module.exports = router;
