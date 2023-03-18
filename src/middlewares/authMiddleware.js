const JsonWebToken = require('jsonwebtoken');
const {NotAuthorizedError} = require('../helpers/errors');

const authMiddleware = (req, res, next) => {
  try {
    const {authorization} = req.headers;
    if (!authorization) {
      next(
          new NotAuthorizedError(
              'Please provide a token in request authorization header'
          )
      );
    }

    const [, token] = req.headers['authorization'].split(' ');
    if (!token) next(new NotAuthorizedError('Please provide a token'));

    const user = JsonWebToken.decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(new NotAuthorizedError('Invalid token'));
  }
};

module.exports = {
  authMiddleware,
};
