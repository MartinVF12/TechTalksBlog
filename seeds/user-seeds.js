const { User } = require('../models');

const userData = [
    {
        username: 'janedoe',
        email: 'janedoe@example.com',
        password: 'password123'
    },
    {
        username: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password123'
    }
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;
