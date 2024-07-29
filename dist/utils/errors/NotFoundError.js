"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const CustomError_1 = require("./CustomError");
class NotFoundError extends CustomError_1.CustomError {
    constructor() {
        super("Resource not found.");
        this.StatusCode = 404;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serialize() {
        return { status: "error", payload: "Resource not found." };
    }
}
exports.NotFoundError = NotFoundError;
