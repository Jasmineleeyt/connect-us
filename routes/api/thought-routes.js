const router = require('express').Router();

const {
    readThoughts,
    readAThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');


// api/thoughts - get all thoughts and add a thought
router.route('/').get(readThoughts).post(createThought);

// api/thoughts/:thoughtId - get, update, and delete a thought using the thoughtId
router.route('/:thoughtId').get(readAThought).put(updateThought).delete(deleteThought);

// api/thoughts/:thoughtId/reactions - add an reaction to a thought
router.route('/:thoughtId/reactions').post(createReaction);

// api/thoughts/:thoughtId/reactions/:reactionId - delete a reaction to a thought by reactionId and thoughtId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;