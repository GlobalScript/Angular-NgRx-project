const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const {allCart, getCart, addFirstCart, addNextCart, deleteCart} = require("../controllers/CartController");


const router = express.Router();

router.get('/api/all-cart', authMiddleware, allCart);
router.get('/api/get-cart/:id', getCart )
router.post('/api/add-first-cart', addFirstCart);
router.put('/api/add-cart', addNextCart);
router.delete('/api/delete-cart/:id', authMiddleware, deleteCart);

module.exports = router;
