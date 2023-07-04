const router = require('express').Router();
const {
    getThoughts,
    createThought,
    getSingleThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController.js');
const {
    newReaction,
    deleteReaction
} = require('../../controllers/reactionController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId/reactions')
    .post(newReaction)

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;