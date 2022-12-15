class ErrorResponse {
  constructor(errors,  path) {
    this.errors = errors ?? [];
    this.path = path ?? "/api";
  }
}

module.exports = { ErrorResponse };
