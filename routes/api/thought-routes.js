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


// api/thoughts
router.route('/').get(readThoughts).post(createThought);

// api/thoughts/:thoughtId
router.route('/:thoughtId').get(readAThought).put(updateThought).delete(deleteThought);

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);

// api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;