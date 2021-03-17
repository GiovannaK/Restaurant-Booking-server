const express = require('express');
const {
  store, index, update, deleteRestaurant,
} = require('../controllers/restaurantController');
const checkIfIsPartner = require('../middlewares/isPartner');
const loginRequired = require('../middlewares/loginRequired');

const router = express.Router();

router.post('/register_restaurant', loginRequired, checkIfIsPartner, store);
router.get('/', loginRequired, checkIfIsPartner, index);
router.put('/:id', loginRequired, checkIfIsPartner, update);
router.delete('/:id', loginRequired, checkIfIsPartner, deleteRestaurant);

module.exports = router;
