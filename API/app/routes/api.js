const express = require('express');
const {
  getAllProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getProdByName
} = require( '../../app/controllers/ProductController.js');
const {
  getCart,
  allCart,
  addFirstCart,
  addNextCart,
  deleteCart
} = require( '../../app/controllers/CartController.js');
const {registration, login} = require('../../app/controllers/AuthController.js');
const { getUsers, userRole, removeUser } = require('../../app/controllers/UserController.js');
const authMiddleware = require('../../app/middleware/authMiddleware.js');

const router = express.Router();

router.post('/api/registration', registration);
router.post('/api/login', login);
router.get('/api/users', authMiddleware, getUsers);
router.put('/api/user-role', authMiddleware, userRole);
router.delete('/api/user-remove/:id', authMiddleware, removeUser);

router.post('/api/create-product', authMiddleware, addProduct);
router.get('/api/all-products', getAllProducts);
router.get('/api/product/:id', getProduct);
router.get('/api/product-search/:name', getProdByName);
router.delete('/api/delete-product/:id', authMiddleware, deleteProduct);
router.put('/api/update-product/:id', authMiddleware, updateProduct);

router.get('/api/all-cart', authMiddleware, allCart);
router.get('/api/get-cart/:id', getCart )
router.post('/api/add-first-cart', addFirstCart);
router.put('/api/add-cart', addNextCart);
router.delete('/api/delete-cart/:id', authMiddleware, deleteCart);

module.exports = router;