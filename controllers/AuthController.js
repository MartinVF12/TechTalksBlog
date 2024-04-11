const bcrypt = require('bcrypt');
const { User } = require('../models');

const AuthController = {
    // Función para el registro de usuarios
    async register(req, res) {
        try {
            // Obtener los datos del cuerpo de la solicitud
            const { username, email, password } = req.body;

            // Verificar si el usuario ya existe en la base de datos
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'El usuario ya existe' });
            }

            // Hash de la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear el nuevo usuario en la base de datos
            const newUser = await User.create({ username, email, password: hashedPassword });

            // Enviar una respuesta de éxito
            res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al registrar el usuario' });
        }
    },

    // Función para el inicio de sesión de usuarios
    async login(req, res) {
        console.log("Intentando iniciar sesión con:", req.body.email);
        try {
            // Obtener los datos del cuerpo de la solicitud
            const { email, password } = req.body;

            // Buscar el usuario por su dirección de correo electrónico
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'Credenciales inválidas' });
            }

            // Verificar la contraseña
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            // Enviar una respuesta de éxito con los datos del usuario
            res.status(200).json({ message: 'Inicio de sesión exitoso', user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al iniciar sesión' });
        }
    },

    // Función para el cierre de sesión de usuarios
    logout(req, res) {
        try {
            // Eliminar la sesión
            req.session.destroy();

            // Enviar una respuesta de éxito
            res.status(200).json({ message: 'Cierre de sesión exitoso' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al cerrar sesión' });
        }
    }
};

module.exports = AuthController;
