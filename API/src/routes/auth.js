const express = require('express');
const authMiddleware = require('../../src/middleware/authMiddleware.js');
const {registration, login} = require("../controllers/AuthController");
const {getUsers, userRole, removeUser} = require("../controllers/UserController");

const router = express.Router();

router.post('/api/registration', registration);
router.post('/api/login', login);
router.get('/api/users', authMiddleware, getUsers);
router.put('/api/user-role', authMiddleware, userRole);
router.delete('/api/user-remove/:id', authMiddleware, removeUser);

module.exports = router;
