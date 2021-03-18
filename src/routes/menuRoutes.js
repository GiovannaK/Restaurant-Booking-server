const express = require('express');
const checkIfIsPartner = require('../middlewares/isPartner');
const loginRequired = require('../middlewares/loginRequired');
const {
  store, index, show, update, menuDelete,
} = require('../controllers/menuController');

const router = express.Router();

router.post('/:restaurantId', loginRequired, checkIfIsPartner, store);
router.get('/:restaurantId', loginRequired, checkIfIsPartner, index);
router.get('/show/:id', loginRequired, checkIfIsPartner, show);
router.put('/:id', loginRequired, checkIfIsPartner, update);
router.delete('/:id', loginRequired, checkIfIsPartner, menuDelete);

module.exports = router;
