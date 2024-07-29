"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
const CustomError_1 = require("./CustomError");
class InternalServerError extends CustomError_1.CustomError {
    constructor() {
        super("Internal server error.");
        this.StatusCode = 500;
        Object.setPrototypeOf(this, InternalServerError.prototype);
    }
    serialize() {
        return { status: "error", payload: "Internal server error." };
    }
}
exports.InternalServerError = InternalServerError;
