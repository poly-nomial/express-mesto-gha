const userRouter = require('express').Router();
const {
  getUsers,
  getOneUser,
  createUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

userRouter.get('/', getUsers);

userRouter.get('/:userId', getOneUser);

userRouter.post('/', createUser);

userRouter.patch('/me', updateProfile);

userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;
