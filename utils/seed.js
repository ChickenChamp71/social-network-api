(async () => {
    const connection = require('../config/connection');
    const { getRandomThought, getRandomUser, getRandomReaction, getRandomUsername } = require('./data');
    const { Thought, User } = require('../models');

    try {
        connection.on('error', (err) => err);

        connection.once('open', async () => {

            Thought.deleteMany({});

            User.deleteMany({});

            const thoughts = [];

            const users = [];

            const usernames = [];

            async function randomUserSet() {
                for (let i = 0; i < 20; i++) {
                    const username = getRandomUsername();
                    usernames.push(username);
                    const password = 'password';

                    users.push({
                        username,
                        password
                    })
                }

                for (let i = 0; i < users.length; i++) {
                    const friends = getRandomUser(usernames.filter(username => username !== users[i].username));

                    users[i].friends = friends;
                }
            }

            await randomUserSet();
            
            await User.collection.insertMany(users);

            for (let i = 0; i < 20; i++) {
                const thought = getRandomThought();
                const reactions = getRandomReaction();
                const user = getRandomUser(usernames);

                thoughts.push({
                    thought,
                    user,
                    reactions
                });
            }

            await Thought.collection.insertMany(thoughts);

            process.exit(0);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
