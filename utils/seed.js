const connection = require('../config/connection');
const { User, Thought } = require('../models');
const {
    getRandomEmail,
    getRandomReaction,
    getRandomThought,
    getRandomUser,
    getRandomUsername
} = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});

    await Thought.deleteMany({});

    for (let i = 0; i < 20; i++) {
        const username = getRandomUsername();
        const email = getRandomEmail();

        await User.create({
            username,
            email
        });
    }

    for (let i = 0; i < 20; i++) {
        const username = await getRandomUser();
        const friend = await getRandomUser();

        const user = await User.findOne({ username: username });

        const friendId = (await User.findOne({ username: friend }))._id;

        if (username !== friend && !user.friends.includes(friendId)) {
            await User.findOneAndUpdate(
                { username: username },
                { $push: {
                    friends: friendId
                }}
            )
        }
    }

    for (let i = 0; i < 20; i++) {
        const thoughtText = getRandomThought();
        const username = await getRandomUser();
        const reactions = await getRandomReaction();

        const thought = await Thought.create({
            thoughtText,
            username,
            reactions
        })

        await User.findOneAndUpdate(
            { username: username },
            { $push: { thoughts: thought._id }}
        )
    };

    console.log('Seeded');
    process.exit(0);
})