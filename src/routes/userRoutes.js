const express = require('express');
const { show, update } = require('../controllers/userController.js');

const loginRequired = require('../middlewares/loginRequired');

const router = express.Router();

router.get('/profile', loginRequired, show);
router.put('/profile', loginRequired, update);

module.exports = router;
