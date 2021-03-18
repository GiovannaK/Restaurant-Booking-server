const express = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer');
const { upload, index, deleteImage } = require('../controllers/imagesController');
const checkIfIsPartner = require('../middlewares/isPartner');
const loginRequired = require('../middlewares/loginRequired');

const router = express.Router();

router.post('/upload/:restaurantId', loginRequired, checkIfIsPartner, multer(multerConfig).single('file'), upload);
router.get('/:restaurantId', loginRequired, checkIfIsPartner, index);
router.delete('/:id', loginRequired, checkIfIsPartner, deleteImage);
module.exports = router;
