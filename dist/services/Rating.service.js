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
exports.RatingService = void 0;
const BadRequestError_1 = require("../utils/errors/BadRequestError");
class RatingService {
    constructor(ratingRepository) {
        this.ratingRepository = ratingRepository;
    }
    create(rating) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newRating = yield this.ratingRepository.create(rating);
                return {
                    status: "success",
                    payload: newRating,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ratings = yield this.ratingRepository.find();
                return {
                    status: "success",
                    payload: ratings,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    findFeaturedRatings() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const featuredRatings = yield this.ratingRepository.findFeaturedRatings();
                return {
                    status: "success",
                    payload: featuredRatings,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rating = yield this.ratingRepository.findById(id);
                return {
                    status: "success",
                    payload: rating,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rating = yield this.ratingRepository.findByUserId(id);
                return {
                    status: "success",
                    payload: rating,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateComment(userId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rating = yield this.ratingRepository.findByUserId(userId);
                if (!rating) {
                    throw new BadRequestError_1.BadRequestError("The user has not rated.");
                }
                const updatedRating = yield this.ratingRepository.updateComment(userId, comment);
                return {
                    status: "success",
                    payload: updatedRating,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateFeaturedRatings(ratingIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ratings = yield Promise.all(ratingIds.map((id) => __awaiter(this, void 0, void 0, function* () {
                    const rating = yield this.ratingRepository.findById(id);
                    if (rating) {
                        return rating;
                    }
                })));
                if (ratings.length !== 5) {
                    throw new BadRequestError_1.BadRequestError("You must assign five valid Ids.");
                }
                const newFeaturedratings = yield this.ratingRepository.updateFeaturedRatings(ratingIds);
                return {
                    status: "success",
                    payload: newFeaturedratings,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedRating = yield this.ratingRepository.deleteById(id);
                return {
                    status: "success",
                    payload: deletedRating,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedRating = yield this.ratingRepository.deleteByUserId(userId);
                return {
                    status: "success",
                    payload: deletedRating,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.RatingService = RatingService;
