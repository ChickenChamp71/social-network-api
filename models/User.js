const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            max_length: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max_length: 50,
            match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please enter a valid email address'],
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
    },
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const pass = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(this.password, pass);
            this.password = hashedPass;
        } catch (err) {
            return next(err);
        }
    }
    next();
});

const User = model('User', userSchema);

module.exports = User;