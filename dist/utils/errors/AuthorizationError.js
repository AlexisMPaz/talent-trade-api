"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationError = void 0;
const CustomError_1 = require("./CustomError");
class AuthorizationError extends CustomError_1.CustomError {
    constructor(message) {
        super(message);
        this.message = message;
        this.StatusCode = 403;
        Object.setPrototypeOf(this, AuthorizationError.prototype);
    }
    serialize() {
        return { status: "error", payload: this.message };
    }
}
exports.AuthorizationError = AuthorizationError;
