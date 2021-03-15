const express = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer');
const { store } = require('../controllers/imagesController');
const checkIfIsPartner = require('../middlewares/isPartner');
const loginRequired = require('../middlewares/loginRequired');

const router = express.Router();

router.post('/', multer(multerConfig).single('file'), store);
router.get('/test', loginRequired, checkIfIsPartner, (req, res) => {
  res.json({ message: 'Hey Partner' });
});

module.exports = router;
