"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = void 0;
const CustomError_1 = require("./CustomError");
class AuthenticationError extends CustomError_1.CustomError {
    constructor(message) {
        super(message);
        this.message = message;
        this.StatusCode = 401;
        Object.setPrototypeOf(this, AuthenticationError.prototype);
    }
    serialize() {
        return { status: "error", payload: this.message };
    }
}
exports.AuthenticationError = AuthenticationError;
