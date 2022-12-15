const jwt = require("jsonwebtoken");
const { AUTHORIZATION_ERROR } = require("../utils/constants");

module.exports = (req, res, next) => {
  const { token } = req.cookies.token;

  if (!token) {
    return res
      .status(AUTHORIZATION_ERROR)
      .send({ message: "Необходима авторизация" });
  }

  let payload;

  try {
    payload = jwt.verify(token, "my-secret-friend");
  } catch (err) {
    return res
      .status(AUTHORIZATION_ERROR)
      .send({ message: "Необходима авторизация" });
  }

  req.user = payload;

  next();
};
