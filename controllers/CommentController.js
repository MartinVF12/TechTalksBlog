const { Comment } = require('../models');

const CommentController = {
    createComment: async (req, res) => {
        try {
            const newComment = await Comment.create({
                ...req.body,
                userId: req.session.userId, // Esto asume que estás manejando sesiones
            });
            res.json(newComment);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getAllComments: async (req, res) => {
        try {
            const comments = await Comment.findAll();
            res.json(comments);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    deleteComment: async (req, res) => {
        try {
            const deletedComment = await Comment.destroy({
                where: { id: req.params.id }
            });
            if (!deletedComment) {
                res.status(404).json({ error: 'Comment not found' });
                return;
            }
            res.json(deletedComment);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = CommentController;
