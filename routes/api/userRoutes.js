const router = require('express').Router();
const {
    getUsers,
    createUser,
    getSingleUser,
    deleteUser,
    updateUser
} = require('../../controllers/userController.js');
const {
    newFriend,
    deleteFriend
} = require('../../controllers/friendController');

router.route('/:userId/friends/:friendId').post(newFriend).delete(deleteFriend);

router
    .route('/:userId')
    .get(getSingleUser)
    .delete(deleteUser)
    .put(updateUser)

router.route('/').get(getUsers).post(createUser);



module.exports = router;