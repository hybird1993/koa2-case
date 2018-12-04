const ApiErrorNames = require('./ApiErrorNames');

class ApiError extends Error {
    constructor(error_name) {
        super();
        const error_info = ApiErrorNames.getErrorInfo(error_name);
        this.name = error_name;
        this.code = error_info.code;
        this.msg = error_info.msg;
        this.desc = error_info.desc;
        this.status = error_info.status;
    }
}

module.exports = ApiError;