const express = require('express');
const CommentController = require('../controllers/CommentController');

const router = express.Router();

// Ruta para crear un comentario
router.post('/', CommentController.createComment);

// Ruta para obtener todos los comentarios
router.get('/', CommentController.getAllComments);

// Ruta para eliminar un comentario
router.delete('/:id', CommentController.deleteComment);

module.exports = router;
