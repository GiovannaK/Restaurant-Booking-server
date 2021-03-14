const express = require('express');
const multer = require('multer');
const multerConfig = require('../config/multer');

const router = express.Router();

router.post('/', multer(multerConfig).single('file'), (req, res) => {
  console.log(req.file)
});

module.exports = router;
