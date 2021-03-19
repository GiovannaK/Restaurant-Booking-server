const express = require('express');
const { store, update } = require('../controllers/bookingController.js');

const loginRequired = require('../middlewares/loginRequired');

const router = express.Router();

router.post('/:restaurantId', loginRequired, store);
router.put('/:id', loginRequired, update);

module.exports = router;
