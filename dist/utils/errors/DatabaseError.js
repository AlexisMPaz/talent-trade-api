"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = void 0;
const CustomError_1 = require("./CustomError");
class DatabaseError extends CustomError_1.CustomError {
    constructor() {
        super("Database has Crashed.");
        this.StatusCode = 500;
        Object.setPrototypeOf(this, DatabaseError.prototype);
    }
    serialize() {
        return { status: "error", payload: "Database has Crashed." };
    }
}
exports.DatabaseError = DatabaseError;
