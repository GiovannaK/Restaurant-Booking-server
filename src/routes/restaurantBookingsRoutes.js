const express = require('express');
const checkIfIsPartner = require('../middlewares/isPartner');
const loginRequired = require('../middlewares/loginRequired');
const {
  index, approval, reject,
} = require('../controllers/restaurantBookingsController');

const router = express.Router();

router.get('/:restaurantId', loginRequired, checkIfIsPartner, index);
router.post('/approvals/:id', loginRequired, checkIfIsPartner, approval);
router.post('/rejects/:id', loginRequired, checkIfIsPartner, reject);

module.exports = router;
