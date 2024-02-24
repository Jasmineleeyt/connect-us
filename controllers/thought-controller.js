const { User, Thought } = require('../models');

module.exports = {
    
    // Get all thoughts
    async readThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get one thought
    async readAThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');
            
            if (!thought) {
                return res.status(404).json({ message: 'Unable to find the thought with the ID provided.'});
            } 
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a thought
    async createThought(req, res ) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { thoughts: thought.id } },
                { new: true }
            ) 
            if (!user) {
                return res.status(404).json({ message: 'Unable to find the user with the ID provided.'})
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    },

    // Update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            )
            if (!thought) {
                return res.status(404).json({ message: 'Unable to find thought with the ID provided.'});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'Unable to find thought with the ID provided.'});
            }
            res.json({ message: "Successfully deleted the thought."});
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create reaction
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            )
            if (!thought) {
                return res.status(404).json({ message: 'Unable to find thought with the ID provided.'});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            )
            if (!thought) {
                return res.status(404).json({ message: 'Unable to find thought with the ID provided.'});
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};