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

};