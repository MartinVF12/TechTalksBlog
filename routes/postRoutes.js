const express = require('express');
const PostController = require('../controllers/PostController');

const router = express.Router();

// Ruta para crear un post
router.post('/', PostController.createPost);

// Ruta para obtener todos los posts
router.get('/', PostController.getAllPosts);

// Ruta para eliminar un post
router.delete('/:id', PostController.deletePost);

module.exports = router;
