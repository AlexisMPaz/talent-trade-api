"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidateAdmin = exports.authValidatePassportGoogle = exports.authValidatePassportOptional = exports.authValidatePassport = void 0;
const User_repository_1 = require("../repositories/User.repository");
const passport_1 = __importDefault(require("passport"));
const AuthenticationError_1 = require("../utils/errors/AuthenticationError");
const AuthorizationError_1 = require("../utils/errors/AuthorizationError");
const InternalServerError_1 = require("../utils/errors/InternalServerError");
const userRepository = new User_repository_1.UserRepository();
const authValidatePassport = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("jwt", (error, user, info) => {
        try {
            if (error) {
                return next(new AuthenticationError_1.AuthenticationError("There was an error in passport."));
            }
            if (!user) {
                return next(new AuthenticationError_1.AuthenticationError("Failed to authenticate the user."));
            }
            req.user = user;
            return next();
        }
        catch (error) {
            if (error instanceof Error) {
                return next(error);
            }
            return next(new InternalServerError_1.InternalServerError());
        }
    })(req, res, next);
});
exports.authValidatePassport = authValidatePassport;
const authValidatePassportOptional = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("jwt", (error, user, info) => {
        try {
            if (error || !user) {
                return next();
            }
            req.user = user;
            return next();
        }
        catch (error) {
            if (error instanceof Error) {
                return next(error);
            }
            return next(new InternalServerError_1.InternalServerError());
        }
    })(req, res, next);
});
exports.authValidatePassportOptional = authValidatePassportOptional;
const authValidatePassportGoogle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("gmail", (error, user, info) => {
        try {
            if (error || !user) {
                return next();
            }
            req.user = user;
            return next();
        }
        catch (error) {
            if (error instanceof Error) {
                return next(error);
            }
            return next(new InternalServerError_1.InternalServerError());
        }
    })(req, res, next);
});
exports.authValidatePassportGoogle = authValidatePassportGoogle;
const authValidateAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return next(new AuthenticationError_1.AuthenticationError("Failed to authenticate the user."));
        }
        if (req.user.role !== "admin") {
            return next(new AuthorizationError_1.AuthorizationError("You do not have sufficient permissions."));
        }
        return next();
    }
    catch (error) {
        if (error instanceof Error) {
            return next(error);
        }
        return next(new InternalServerError_1.InternalServerError());
    }
});
exports.authValidateAdmin = authValidateAdmin;
