const { User } = require('../models');

module.exports = {

    newFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: {
                friends: req.params.friendId
            }, },
            { new: true }
        )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with this ID.' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: {
                friends: req.params.friendId
            }},
            { new: true }
        )
        .then((user) => 
          !user
            ? res.status(404).json({ message: 'No user with this ID.' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    }
};