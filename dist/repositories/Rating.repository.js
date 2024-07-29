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
exports.RatingRepository = void 0;
const Rating_model_1 = __importDefault(require("../models/Rating.model"));
class RatingRepository {
    constructor(RatingModel = Rating_model_1.default) {
        this.RatingModel = RatingModel;
    }
    create(rating) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newRating = yield this.RatingModel.create(rating);
                return newRating;
            }
            catch (error) {
                throw error;
            }
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ratings = yield this.RatingModel.find();
                return ratings;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findFeaturedRatings() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ratings = yield this.RatingModel.findOne({ status: true });
                return ratings;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rating = yield this.RatingModel.findById(id);
                return rating;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rating = yield this.RatingModel.findOne({ userId: id });
                return rating;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateComment(id, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rating = yield this.RatingModel.findOneAndUpdate({ userId: id }, { comment }, { new: true });
                return rating;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateFeaturedRatings(ratingIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.RatingModel.updateMany({}, { $set: { status: false } }, { new: true });
                if (ratingIds.length > 0) {
                    yield this.RatingModel.updateMany({ _id: { $in: ratingIds } }, { $set: { status: true } });
                }
                const updatedRatings = yield this.RatingModel.find({
                    _id: { $in: ratingIds },
                });
                return updatedRatings;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rating = yield this.RatingModel.findByIdAndDelete(id);
                return rating;
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteByUserId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rating = yield this.RatingModel.deleteOne({ userId: id });
                return rating;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.RatingRepository = RatingRepository;
