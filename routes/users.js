const { celebrate, Joi } = require('celebrate');
const userRouter = require('express').Router();
const {
  getUsers,
  getOneUser,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const { URL_REGEX } = require('../utils/constants');

userRouter.get('/me', getCurrentUser);

userRouter.get('/:userId', getOneUser);

userRouter.get('/', getUsers);

userRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile,
);

userRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().pattern(URL_REGEX),
    }),
  }),
  updateAvatar,
);

module.exports = userRouter;
