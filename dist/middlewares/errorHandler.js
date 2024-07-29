"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const CustomError_1 = require("../utils/errors/CustomError");
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
const errorHandler = (error, req, res, next) => {
    if (error instanceof CustomError_1.CustomError) {
        return res.status(error.StatusCode).json(error.serialize());
    }
    if (error instanceof zod_1.ZodError) {
        const zodErrorMessage = error.message || "Validation Error";
        const zodErrors = error.errors.length > 0 ? error.errors : [{ message: zodErrorMessage }];
        return res.status(400).json({
            status: "error",
            payload: zodErrorMessage,
            errors: zodErrors,
        });
    }
    if (error instanceof mongoose_1.MongooseError) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                status: "error",
                payload: "Validation error in database",
                errors: error.errors,
            });
        }
        else if (error.name === "CastError") {
            return res.status(400).json({
                status: "error",
                payload: "Invalid data type",
                error: error,
            });
        }
        else {
            return res.status(500).json({
                status: "error",
                payload: error.message || "Database error occurred",
                error: error,
            });
        }
    }
    const genericErrorMessage = error.message || "Internal Server Error";
    console.log(error.stack);
    return res
        .status(500)
        .json({ status: "error", payload: genericErrorMessage });
};
exports.errorHandler = errorHandler;
/**
 * catch (error) {
        if (error instanceof ZodError) {
            const errorDetails = error.errors.map((err) => ({
                path: err.path.join("."),
                error: err.message,
            }));
            return res.status(400).json(errorDetails);
        } else if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        }
    }
 */
