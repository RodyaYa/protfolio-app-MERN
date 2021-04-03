module.exports = class ErrorHandler extends Error {
  constructor(message, code, errors = []) {
    super(message);
    this.status = code;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
};
