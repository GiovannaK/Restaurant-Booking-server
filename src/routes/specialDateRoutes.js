const express = require('express');
const { index } = require('../controllers/specialDatesController');

const router = express.Router();

router.get('/', index);

module.exports = router;
