class status {
    constructor() { }
    ok() {
        return {
            "status_code": "200",
            "message": "Success"
        };
    }
    unauthorized() {
        return {
            "status_code": "401",
            "message": "Unauthorized"
        };
    }
    forbidden() {
        return {
            "status_code": "403",
            "message": "Forbidden"
        };
    }
    created() {
        return {
            "status_code": "201",
            "message": "Created / Added"
        };
    }
    duplicateRecord() {
        return {
            "status_code": "409",
            "message": "Duplicate Record"
        };
    }
    userNotValid() {
        return {
            "status_code": "1013",
            "message": "User Not Valid"
        };
    }
    badRequest() {
        return {
            "status_code": "400",
            "message": "Bad Request"
        };
    }
    expectationFailed() {
        return {
            "status_code": "417",
            "message": "Expectation Failed"
        };
    }
    internalservererror() {
        return {
            "status_code": "500",
            "message": "Internal server error"
        };
    }

    disconnected() {
        return {
            "status_code": "500",
            "message": "Disconnected"
        };
    }

    nodatafound() {
        return {
            "status_code": "404",
            "message": "No data found"
        }
    }

    notAccepted() {
        return {
            "status_code": "406",
            "message": "not accepted"
        }
    }
}

module.exports = new status();