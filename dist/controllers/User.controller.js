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
exports.UserController = void 0;
const InternalServerError_1 = require("../utils/errors/InternalServerError");
const BadRequestError_1 = require("../utils/errors/BadRequestError");
class UserController {
    constructor(userService) {
        this.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userService.verifyEmail(req.body);
                res.send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.confirmRegister = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            try {
                const result = yield this.userService.create(token);
                res.cookie("jwt", result.token, {
                    httpOnly: false,
                    maxAge: 1000 * 60 * 60 * 24,
                    sameSite: "none",
                    secure: true,
                });
                res.send({
                    status: result.status,
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
        this.sendResetPasswordToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                const result = yield this.userService.resetEmail(email);
                res.send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.resetPassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            const { password } = req.body;
            try {
                const result = yield this.userService.updatePassword({ token, password });
                res.send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.getUsers = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { categoryId = null } = req.params;
            let page = typeof req.query.page === "string" ? req.query.page : null;
            if (page && isNaN(+page)) {
                page = null;
            }
            try {
                const result = yield this.userService.find(categoryId, page);
                result.status == "success"
                    ? res.send(result)
                    : res.status(500).send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.getUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            const user = req.user;
            try {
                const result = yield this.userService.findById(user, userId);
                result.status == "success";
                res.send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        // Nombre descripcion numero
        this.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const result = yield this.userService.update(req.user._id, data);
                res.send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.updateUserRating = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { userId: userTwoId, tradeId } = req.params;
            const { comment = "", rating, } = req.body;
            const user = req.user;
            const userId = user._id;
            try {
                const result = yield this.userService.updateRating({ userId, tradeId, comment, rating }, user, userTwoId);
                res.send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const result = yield this.userService.delete(userId);
                res.send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.updatePick = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const photo = req.file;
            try {
                if (!photo || photo === undefined) {
                    throw new BadRequestError_1.BadRequestError("photo upload is required");
                }
                const { status, payload } = yield this.userService.updatePick(req.user, photo);
                res.send({ status, payload: payload });
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        // getPotentialPairings = async (
        //   req: Request,
        //   res: Response,
        //   next: NextFunction
        // ) => {
        //   try {
        //     const user = req.user as IUser;
        //     const result = await this.userService.getSuggestions(user);
        //     result!.status === "success"
        //       ? res.status(200).send(result)
        //       : res.status(500).send(result);
        //   } catch (error) {
        //     if (error instanceof Error) {
        //       return next(error);
        //     }
        //     return next(new InternalServerError());
        //   }
        // };
        this.getPotentialPairings = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { categoryId = null } = req.params;
            let page = typeof req.query.page === "string" ? req.query.page : null;
            // Our service needs information about the user
            const user = req.user;
            if (page && isNaN(+page)) {
                page = null;
            }
            try {
                const result = yield this.userService.getSuggestions(categoryId, page, user);
                result.status == "success"
                    ? res.send(result)
                    : res.status(500).send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.userService = userService;
    }
}
exports.UserController = UserController;
