class status {
  constructor() {}
  ok() {
    return {
      status_code: "200",
      msg: "Ok",
    };
  }
  unauthorized() {
    return {
      status_code: "401",
      msg: "Unauthorized",
    };
  }
  forbidden() {
    return {
      status_code: "403",
      msg: "Forbidden",
    };
  }
  created() {
    return {
      status_code: "201",
      msg: "Created",
    };
  }
  duplicateRecord() {
    return {
      status_code: "409",
      msg: "Duplicate Record",
    };
  }
  userNotValid() {
    return {
      status_code: "1013",
      msg: "User Not Valid",
    };
  }
  badRequest() {
    return {
      status_code: "400",
      msg: "Bad Request",
    };
  }
  expectationFailed() {
    return {
      status_code: "417",
      msg: "Expectation Failed",
    };
  }
  internalservererror() {
    return {
      status_code: "500",
      msg: "Internal server error",
    };
  }

  disconnected() {
    return {
      status_code: "500",
      msg: "Disconnected",
    };
  }

  nodatafound() {
    return {
      status_code: "404",
      msg: "No data found",
    };
  }
}

module.exports = new status();
