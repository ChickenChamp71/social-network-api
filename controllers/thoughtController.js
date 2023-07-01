const { Thought, Reaction } = require('../models');

module.exports = {

  getThoughts(req, res) {
    Thought.find()
      .populate('reactions')
      .then((thoughts) => {
        thoughts.forEach((thought) => thought.populate('reactionCount'))
        res.json(thoughts))
      }
    }
      .catch((err) => res.status(500).json(err));
  },
  
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate('reactions')
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.ThoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : Reaction.deleteMany({ _id: { $in: thought.reactions } })
      )
      .then(() => res.json({ message: 'Thought and reactions deleted' }))
      .catch((err) => res.status(500).json(err));
  },
  
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};