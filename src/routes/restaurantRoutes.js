const express = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer');
const { store } = require('../controllers/imagesController');

const router = express.Router();

router.post('/', multer(multerConfig).single('file'), store);

module.exports = router;
