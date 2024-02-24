const { User, Thought } = require('../models');

module.exports = {

    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find()
              .select('-__v')
              .populate('thoughts')
              .populate('friends')
            
            res.json((users));
        } catch (err) {
            res.status(500).json(err);
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
                return res.status(404).json({ message: 'Unable to find the user with the ID provided.'})
            }
            res.json((user));
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);            
        } catch (err) {
            res.status(500).json(err);
            console.log(err)
        }
    },
    
    // Update a user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true } 
            )
            if (!user) {
                return res.status(404).json({ message: 'Unable to find the user with the ID provided.'})
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete an user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'Unable to find the user with the ID provided.' });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts }})
            res.json({ message: 'User and their thought(s) are deleted.'});
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    // Add a friend
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId }},
                { runValidators: true, new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'Unable to find the user with the ID provided.' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a friend
    async deleteFriend(req, res){
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }},
                { new: true }
            )
            if (!user) {
                return res.status(404).json({ message: 'Unable to find the user with the ID provided.' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};