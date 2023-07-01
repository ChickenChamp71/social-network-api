const { User } = require('../models');

function getRandomThought() {
    let result = '';
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    const charLength = char.length;
    for (let i = 0; i < 20; i++) {
        result += char.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
};

async function getRandomUser(usernames) {
    const length = usernames.length;
    const random = Math.floor(Math.random() * length);
    const user = await User.findOne({username: usernames[random]})

    return user;
}

function getRandomReaction() {
    const reactions = ['Happy', 'Sad', 'Mad'];

    const num = Math.floor(Math.random() * 4);

    const returnReact = [];

    for (let i = 0; i < num; i++) {
        const reactType = Math.floor(Math.random() * reactions.length);
        returnReact.push(reactions[reactType]);
        
    }
    return returnReact;
}

function getRandomUsername() {
    let result = [];
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    const charLength = char.length;
    for (let i = 0; i < 10; i++) {
        result += char.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
}

module.exports = { getRandomThought, getRandomReaction, getRandomUser, getRandomUsername };