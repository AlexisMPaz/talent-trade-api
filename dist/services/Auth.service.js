"use strict";
/** @format */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_config_1 = require("../utils/bcrypt/bcrypt.config");
const jwt_config_1 = require("../utils/jwt/jwt.config");
const BadRequestError_1 = require("../utils/errors/BadRequestError");
const AuthenticationError_1 = require("../utils/errors/AuthenticationError");
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findByEmail(data.email);
                if (!user || user.provider !== "local") {
                    throw new AuthenticationError_1.AuthenticationError("The user does not exist.");
                }
                const isValid = yield (0, bcrypt_config_1.comparePassword)(data.password, user.password);
                if (!isValid) {
                    throw new BadRequestError_1.BadRequestError("The password is incorrect.");
                }
                const populatedUser = yield user.populate([
                    {
                        path: "specialties",
                        populate: [
                            {
                                path: "categoryId",
                                select: "name",
                                model: "Category",
                            },
                            {
                                path: "specialtyId",
                                select: "name",
                                model: "Specialty",
                            },
                        ],
                    },
                    {
                        path: "interests",
                        populate: [
                            {
                                path: "categoryId",
                                select: "name",
                                model: "Category",
                            },
                            {
                                path: "specialtyId",
                                select: "name",
                                model: "Specialty",
                            },
                        ],
                    },
                    {
                        path: "userRatings",
                        populate: {
                            path: "userId",
                            select: "name avatar",
                        },
                    },
                ]);
                const token = (0, jwt_config_1.generateJWT)({ id: user.id });
                return {
                    status: "success",
                    payload: populatedUser,
                    token: token,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    loginGoogle(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findByEmail(email);
                if (!user || user.provider !== "google") {
                    throw new AuthenticationError_1.AuthenticationError("The user does not exist.");
                }
                const populatedUser = yield user.populate([
                    {
                        path: "specialties",
                        populate: [
                            {
                                path: "categoryId",
                                select: "name",
                                model: "Category",
                            },
                            {
                                path: "specialtyId",
                                select: "name",
                                model: "Specialty",
                            },
                        ],
                    },
                    {
                        path: "interests",
                        populate: [
                            {
                                path: "categoryId",
                                select: "name",
                                model: "Category",
                            },
                            {
                                path: "specialtyId",
                                select: "name",
                                model: "Specialty",
                            },
                        ],
                    },
                    {
                        path: "userRatings",
                        populate: {
                            path: "userId",
                            select: "name avatar",
                        },
                    },
                ]);
                const token = (0, jwt_config_1.generateJWT)({ id: user.id });
                return {
                    status: "success",
                    payload: populatedUser,
                    token: token,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.AuthService = AuthService;
