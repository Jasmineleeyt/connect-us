const { User, Thought } = require('../models');

module.exports = {

    // Get all users
    async getUsers(req, res) {
        try {
            const users  = await User.find();
            res.json((users));
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // Get a user 
    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId})
            .select('-__v')
            .populate('thoughts')
            .populate('friends')

            if (!user) {
                return res.status(404).json({ message: 'Unable to find the user with the id provided.'})
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // Create a user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);            
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    

}