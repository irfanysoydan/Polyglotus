const HttpStatusCodes = require("http-status-codes");
const { ErrorResponse } = require("./error.js");
class ServiceResponse {
  constructor(data, statusCode, error = null, isSuccessful = null) {
    if (data) this.data = data;
    this.statusCode = statusCode ?? HttpStatusCodes.OK;
    this.isSuccessful = isSuccessful ?? true;
    if (error) this.error = error;
  }
  static success(statusCode = HttpStatusCodes.OK) {
    return new ServiceResponse(null, statusCode);
  }
  static successWithData(data, statusCode = HttpStatusCodes.OK) {
    return new ServiceResponse(data, statusCode);
  }
  static fail(statusCode = HttpStatusCodes.OK, path, errors) {
    return new ServiceResponse(null, statusCode, new ErrorResponse(errors,  path), false);
  }
}

module.exports = { ServiceResponse };
