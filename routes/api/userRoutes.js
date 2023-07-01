const router = require('express').Router();
const {
    getUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController.js');

router.route('/').get(getUsers).post(createUser);

router
    .route('/:UserId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;