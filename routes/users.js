const { celebrate, Joi } = require("celebrate");
const userRouter = require("express").Router();
const {
  getUsers,
  getOneUser,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

userRouter.get("/", getUsers);

userRouter.get("/:userId", getOneUser);

userRouter.get("/me", getCurrentUser);

userRouter.patch(
  "/me",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateProfile
);

userRouter.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string(),
    }),
  }),
  updateAvatar
);

module.exports = userRouter;
