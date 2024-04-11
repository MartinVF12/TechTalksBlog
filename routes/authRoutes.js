const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

// Nota: Estas rutas se acceden con el prefijo '/users' definido en routes/index.js

// Ruta para servir la página de inicio de sesión (GET)
router.get('/login', (req, res) => {
    console.log('Accediendo a la ruta /login');
    res.render('login');
});

// Ruta para el registro de usuarios (POST)
router.post('/register', AuthController.register);

// Ruta para el inicio de sesión de usuarios (POST)
router.post('/login', (req, res) => {
    console.log("Datos recibidos en /login:", req.body);
    AuthController.login(req, res);
});

// Ruta para el cierre de sesión de usuarios (POST)
router.post('/logout', AuthController.logout);

module.exports = router;
