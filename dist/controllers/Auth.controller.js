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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const InternalServerError_1 = require("../utils/errors/InternalServerError");
const AuthorizationError_1 = require("../utils/errors/AuthorizationError");
class AuthController {
    constructor(authService) {
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const result = yield this.authService.login(data);
                console.log(result);
                if (result.status !== "success") {
                    res.status(400).send(result);
                }
                else {
                    res.cookie("token", result.token, {
                        httpOnly: false,
                        maxAge: 1000 * 60 * 60 * 24,
                        sameSite: "none",
                        secure: true,
                    });
                    res.status(200).send({
                        status: "success",
                        payload: result.payload,
                    });
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("token", {
                    domain: "talent-trade-api.vercel.app",
                    path: "/",
                });
                res.status(200).send({
                    status: "success",
                    payload: "Logout success.",
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.user = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            try {
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
                res.status(200).send({
                    status: "success",
                    payload: populatedUser,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.google = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            try {
                if (!user || user.provider !== "google") {
                    throw new AuthorizationError_1.AuthorizationError("Error with google user");
                }
                const result = yield this.authService.loginGoogle(user.email);
                res.cookie("token", result.token, {
                    httpOnly: false,
                    maxAge: 1000 * 60 * 60 * 24,
                    sameSite: "none",
                    secure: true,
                });
                res.send({
                    status: "success",
                    payload: result.payload,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.authService = authService;
    }
}
exports.AuthController = AuthController;
