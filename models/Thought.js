const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            validate: {
                validator: function(value) {
                  return /^[A-Z]{3}-[0-9]{3}$/.test(value);
                },
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function (timestamp) {
                return timestamp.toLocaleString();
            }
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
        },
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;   