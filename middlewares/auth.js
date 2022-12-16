const jwt = require('jsonwebtoken');
const { AUTHORIZATION_ERROR } = require('../utils/constants');
const AuthorizationError = require('../errors/AuthorizationError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    next(new AuthorizationError('Необходима авторизация'));
  }

  let payload;

  try {
    payload = jwt.verify(token, 'my-secret-friend');
  } catch (err) {
    next(new AuthorizationError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
