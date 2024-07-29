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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
class UserRepository {
    constructor(UserModel = User_model_1.default) {
        this.UserModel = UserModel;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.UserModel.create(data);
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    find(query, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.UserModel.paginate(query, options);
            }
            catch (error) {
                throw error;
            }
        });
    }
    findOnePopulated(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.UserModel.findById(id)
                    .select("_id name email aboutme role phoneNumber specialties interests userRatings trades contacts avatar banner")
                    .populate({
                    path: "trades",
                    populate: [
                        {
                            path: "members.memberOne.id",
                            model: "User",
                            select: "name email _id",
                        },
                        {
                            path: "members.memberTwo.id",
                            model: "User",
                            select: "name email _id",
                        },
                        {
                            path: "members.memberOne.specialty",
                            model: "Specialty",
                            select: "name",
                            populate: [
                                { path: "categoryId", model: "Category", select: "name" },
                            ],
                        },
                        {
                            path: "members.memberTwo.specialty",
                            model: "Specialty",
                            select: "name",
                            populate: [
                                { path: "categoryId", model: "Category", select: "name" },
                            ],
                        },
                    ],
                })
                    .populate("specialties")
                    .populate("contacts")
                    .lean();
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.UserModel.findById(id);
                if (!result) {
                    throw new Error("Usuario no encontrado");
                }
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.UserModel.findOne({ email }).select("_id provider role name email password avatar banner specialties interests aboutme phoneNumber userRatings trades contacts");
            }
            catch (error) {
                throw error;
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.UserModel.findByIdAndUpdate(id, data, { new: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateTrades(id, tradeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.UserModel.findById(id);
                if (!user)
                    return null;
                user.trades.push(tradeId);
                return yield user.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateByEmail(email, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.UserModel.findOneAndUpdate({ email }, data, {
                    new: true,
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateRating(data) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.UserModel.findByIdAndDelete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // método para agregar especialidad
    addSpecialty(docId, specialtyId, categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // método de Mongoose para ACTUALIZAR un usuario, devuelva el usuario en sí o nulo
                // await this.UserModel.findByIdAndUpdate(docId, {specialties: [specialtyId, categoryId]});
                const userUpdated = yield this.UserModel.findByIdAndUpdate(docId, {
                    $push: {
                        specialties: { categoryId, specialtyId },
                    },
                }, { new: true });
                return userUpdated;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserRepository = UserRepository;
