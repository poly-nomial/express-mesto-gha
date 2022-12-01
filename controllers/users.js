const User = require("../models/user.js");

const SERVER_ERROR = 500;
const INPUT_ERROR = 400;
const NOT_FOUND_ERROR = 404;

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
      } else if (user !== null) {
        res.status(200).send({ data: user });
      } else {
        return;
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

module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.errors.name || err.errors.about || err.errors.avatar) {
        res.status(INPUT_ERROR).send({
          message: "Переданы некорректные данные при создании пользователя",
        });
      } else {
        res
          .status(SERVER_ERROR)
          .send({ message: "На сервере произошла ошибка" });
      }
    });
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
      if (err.errors.name || err.errors.about || err.errors.avatar) {
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
      if (err.errors.name || err.errors.about || err.errors.avatar) {
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
