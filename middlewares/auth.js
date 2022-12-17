const jwt = require("jsonwebtoken");
const AuthorizationError = require("../errors/AuthorizationError");
const { AUTHORIZATION_ERROR } = require("../utils/constants");

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res
      .status(AUTHORIZATION_ERROR)
      .send({ message: "Необходима авторизация" });
  }

  let payload;

  try {
    payload = jwt.verify(token, "my-secret-friend");
  } catch (err) {
    next(new AuthorizationError("Необходима авторизация"));
  }

  req.user = payload;

  next();
};

module.exports = auth;
