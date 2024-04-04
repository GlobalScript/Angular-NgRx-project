const express = require('express');
const auth = require('./auth');
const product = require('./product');
const cart = require('./cart');


const router = express.Router();

router.use('/', auth);
router.use('/', product);
router.use('/', cart);

module.exports = router;
