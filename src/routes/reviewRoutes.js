const express = require('express');
const { store } = require('../controllers/reviewController');

const loginRequired = require('../middlewares/loginRequired');

const router = express.Router();

router.post('/:bookingId', loginRequired, store);

module.exports = router;
