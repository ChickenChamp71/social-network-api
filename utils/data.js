const { Types } = require('mongoose');
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

async function getRandomUser() {
    const users = await User.find();
    const length = users.length;
    const random = Math.floor(Math.random() * length);
    const randomUser = users[random].username;

    return randomUser;
}

async function getRandomReaction() {
    const reactions = ['Happy', 'Sad', 'Mad'];

    const num = Math.floor(Math.random() * (reactions.length )+ 1);

    var returnReact = [];

    for (let i = 0; i < num; i++) {
        const reactType = Math.floor(Math.random() * reactions.length);
        const username = await getRandomUser();
        returnReact.push({
            reactionBody: reactions[reactType],
            username: username
        })
    }
    return returnReact;
}

function getRandomEmail() {
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    const charLength = char.length;
    var random = '';
    for (let i = 0; i < 5; i++) {
        random += char.charAt(Math.floor(Math.random() * charLength))
    }
    if (random.length === 5) {
        const email = random + '@' + random + '.com';
        return email;
    }
}

function getRandomUsername() {
    const char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    const charLength = char.length;
    let result = '';
    for (let i = 0; i < 10; i++) {
        result += char.charAt(Math.floor(Math.random() * charLength));
    }
    
    return result;
}

module.exports = { getRandomThought, getRandomReaction, getRandomUser, getRandomUsername, getRandomEmail };