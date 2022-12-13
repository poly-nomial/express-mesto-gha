const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  SERVER_ERROR,
  INPUT_ERROR,
  NOT_FOUND_ERROR,
  AUTHORIZATION_ERROR,
} = require("../utils/constants");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(() =>
      res.status(SERVER_ERROR).send({ message: "На сервере произошла ошибка" })
    );
};

module.exports.getOneUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user === null) {
        res.status(NOT_FOUND_ERROR).send({ message: "Пользователь не найден" });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(INPUT_ERROR)
          .send({ message: "Переданы некорректные данные" });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "На сервере произошла ошибка" });
      }
    });
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_ERROR).send({ message: "Пользователь не найден" });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch(() => {
      res.status(SERVER_ERROR).send({ message: "На сервере произошла ошибка" });
    });
};

module.exports.createUser = (req, res) => {
  if (!validator.isEmail(req.body.email)) {
    res.status(INPUT_ERROR).send({
      message: "Переданы некорректные данные при создании пользователя",
    });
  } else {
    if (req.body.avatar && !validator.isURL(req.body.avatar)) {
      req.body.avatar = undefined;
    }
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) =>
        User.create({
          name: req.body.name,
          about: req.body.about,
          avatar: req.body.avatar,
          email: req.body.email,
          password: hash,
        })
      )
      .then((user) => res.status(200).send({ data: user }))
      .catch((err) => {
        if (err.name === "ValidationError") {
          res.status(INPUT_ERROR).send({
            message: "Переданы некорректные данные при создании пользователя",
          });
        } else {
          res
            .status(SERVER_ERROR)
            .send({ message: "На сервере произошла ошибка" });
        }
      });
  }
};

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_ERROR).send({ message: "Пользователь не найден" });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(INPUT_ERROR).send({
          message: "Переданы некорректные данные при обновлении профиля",
        });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "На сервере произошла ошибка" });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_ERROR).send({ message: "Пользователь не найден" });
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(INPUT_ERROR).send({
          message: "Переданы некорректные данные при обновлении аватара",
        });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "На сервере произошла ошибка" });
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, "my-secret-friend", {
        expiresIn: "7d",
      });
      res.cookie("token", token, { maxAge: 3600000, httpOnly: true }).end();
    })
    .catch((err) => {
      res.status(AUTHORIZATION_ERROR).send({ message: err.message });
    });
};
