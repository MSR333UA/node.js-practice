class NodejsError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
class ValidationError extends NodejsError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends NodejsError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorizedError extends NodejsError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  NodejsError,
  ValidationError,
  WrongParametersError,
  NotAuthorizedError,
};
