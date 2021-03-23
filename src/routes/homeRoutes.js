const express = require('express');
const {
  index, search, show, showReview,
} = require('../controllers/homeController');

const router = express.Router();

router.get('/search', search);
router.get('/', index);
router.get('/:id', show);
router.get('/reviews/:restaurantId', showReview);

module.exports = router;
