const express = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer');
const { upload } = require('../controllers/imagesController');
const { store } = require('../controllers/restaurantController');
const checkIfIsPartner = require('../middlewares/isPartner');
const loginRequired = require('../middlewares/loginRequired');

const router = express.Router();

router.post('/upload/:restaurantId', multer(multerConfig).single('file'), upload);
router.post('/register_restaurant', loginRequired, checkIfIsPartner, store);
router.get('/test', loginRequired, checkIfIsPartner, (req, res) => {
  res.json({ message: 'Hey Partner' });
});

module.exports = router;
