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
exports.RatingController = void 0;
const InternalServerError_1 = require("../utils/errors/InternalServerError");
class RatingController {
    constructor(ratingService) {
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { comment } = req.body;
            const user = req.user;
            try {
                const result = yield this.ratingService.create({
                    userId: user === null || user === void 0 ? void 0 : user.id,
                    comment,
                });
                res.send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.find = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.ratingService.find();
                res.send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.findFeaturedRatings = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.ratingService.findFeaturedRatings();
                res.send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.findById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { ratingId } = req.params;
            try {
                const result = yield this.ratingService.findById(ratingId);
                res.send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.findByUserId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const result = yield this.ratingService.findByUserId(userId);
                res.send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.updateComment = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const { comment } = req.body;
            try {
                const result = yield this.ratingService.updateComment(user === null || user === void 0 ? void 0 : user.id, comment);
                res.send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.updateFeaturedRatings = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { ratingIds } = req.body;
            try {
                const result = yield this.ratingService.updateFeaturedRatings(ratingIds);
                res.send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.deleteById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { ratingId } = req.params;
            try {
                const result = yield this.ratingService.deleteById(ratingId);
                res.send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.deleteByUserId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const result = yield this.ratingService.deleteByUserId(userId);
                res.send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.ratingService = ratingService;
    }
}
exports.RatingController = RatingController;
