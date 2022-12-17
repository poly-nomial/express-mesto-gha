const SERVER_ERROR = 500;
const INPUT_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const AUTHORIZATION_ERROR = 401;
const CONFLICT_ERROR = 409;
const URL_REGEX = /^https?:\/\/(www\.)?[\w\-._~:/?#[\]@!$&'()*+,;=]+$/;

module.exports = {
  SERVER_ERROR,
  INPUT_ERROR,
  NOT_FOUND_ERROR,
  AUTHORIZATION_ERROR,
  CONFLICT_ERROR,
  URL_REGEX,
};
