const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const {
    addProduct,
    getAllProducts,
    getProduct,
    getProdByName,
    deleteProduct,
    updateProduct
} = require("../controllers/ProductController");


const router = express.Router();

router.post('/api/create-product', authMiddleware, addProduct);
router.get('/api/all-products', getAllProducts);
router.get('/api/product/:id', getProduct);
router.get('/api/product-search/:name', getProdByName);
router.delete('/api/delete-product/:id', authMiddleware, deleteProduct);
router.put('/api/update-product/:id', authMiddleware, updateProduct);

module.exports = router;
