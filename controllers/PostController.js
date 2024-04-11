const { Post } = require('../models');

const PostController = {
    createPost: async (req, res) => {
        try {
            const newPost = await Post.create({
                ...req.body,
                userId: req.session.userId, // Esto asume que estás manejando sesiones
            });
            res.json(newPost);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getAllPosts: async (req, res) => {
        try {
            const posts = await Post.findAll();
            res.json(posts);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    deletePost: async (req, res) => {
        try {
            const deletedPost = await Post.destroy({
                where: { id: req.params.id }
            });
            if (!deletedPost) {
                res.status(404).json({ error: 'Post not found' });
                return;
            }
            res.json(deletedPost);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = PostController;
