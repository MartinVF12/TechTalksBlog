const { User } = require('../models');

const UserController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const deletedUser = await User.destroy({
                where: { id: req.params.id }
            });
            if (!deletedUser) {
                res.status(404).json({ error: 'User not found' });
                return;
            }
            res.json(deletedUser);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = UserController;
