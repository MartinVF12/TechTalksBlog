const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

// Obtener todos los usuarios
router.get('/', UserController.getAllUsers);

// Eliminar un usuario
router.delete('/:id', UserController.deleteUser);

module.exports = router;
