const { Thought } = require('../models');

module.exports = {

    newReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: {
                reactions: req.body
            }},
            { new: true }
        )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this ID.' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: {
                reactions: req.params.reactionId
            }},
            { new: true }
        )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this ID.' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err))
    }
};