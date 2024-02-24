const router = require('express').Router();

const {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/user-controller');

// api/users -  get all users and create a user
router.route('/').get(getUsers).post(createUser);

// api/users/:userId route - get, update, and delete user using the userId
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);

// api/users/:userId/friends/:friendId - add and delete friend to a user by friendId and userId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;