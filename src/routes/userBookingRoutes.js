const express = require('express');
const { index, show } = require('../controllers/userBooking');

const loginRequired = require('../middlewares/loginRequired');

const router = express.Router();

router.get('/', loginRequired, index);
router.get('/:id', loginRequired, show);

module.exports = router;
