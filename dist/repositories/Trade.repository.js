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
exports.TradeRepository = void 0;
const mongoose_1 = require("mongoose");
const Trade_model_1 = __importDefault(require("../models/Trade.model"));
class TradeRepository {
    constructor(TradeModel = Trade_model_1.default) {
        this.TradeModel = TradeModel;
    }
    create(trade) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newTrade = new this.TradeModel(trade);
                return yield newTrade.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trades = yield this.TradeModel.find({
                    $or: [{ "members.memberOne.id": id }, { "members.memberTwo.id": id }],
                })
                    .populate({ path: "members.memberOne.id", select: "name email avatar" })
                    .populate({
                    path: "members.memberTwo.id",
                    select: "name email avatar",
                });
                return trades;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findTradesByIdTwoMembers(userOne, userTwo, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trades = yield this.TradeModel.find({
                    $and: [
                        {
                            $or: [
                                {
                                    "members.memberOne.id": userOne,
                                    "members.memberTwo.id": userTwo,
                                },
                                {
                                    "members.memberOne.id": userTwo,
                                    "members.memberTwo.id": userOne,
                                },
                            ],
                        },
                        { status: status },
                    ],
                }).select("members duration status expiresAt chatRoom");
                return trades;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findTradesById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trades = yield this.TradeModel.find({
                    $or: [
                        { "members.memberOne.id": userId },
                        { "members.memberTwo.id": userId },
                    ],
                }).select("members duration status expiresAt chatRoom");
                return trades;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findOnePending(userId, tradeId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trade = yield this.TradeModel.findOne({
                    _id: tradeId,
                    $or: [
                        { "members.memberTwo.id": userId, status: status },
                        { "members.memberOne.id": userId, status: status },
                    ],
                })
                    .populate({
                    path: "members.memberOne.id",
                    select: "name avatar email", // Selecciona los campos que quieres incluir
                })
                    .populate({
                    path: "members.memberOne.specialty",
                    select: "name", // Selecciona los campos que quieres incluir
                })
                    .populate({
                    path: "members.memberTwo.id",
                    select: "name avatar email", // Selecciona los campos que quieres incluir
                })
                    .populate({
                    path: "members.memberTwo.specialty",
                    select: "name", // Selecciona los campos que quieres incluir
                });
                return trade;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findOnePendingNoPopulate(userId, tradeId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trade = yield this.TradeModel.findOne({
                    _id: tradeId,
                    $or: [
                        { "members.memberTwo.id": userId, status: status },
                        { "members.memberOne.id": userId, status: status },
                    ],
                });
                return trade;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findOne(userId, tradeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trade = yield this.TradeModel.findOne({
                    _id: tradeId,
                    $or: [
                        { "members.memberOne.id": userId },
                        { "members.memberTwo.id": userId },
                    ],
                })
                    .populate({
                    path: "members.memberOne.id",
                    select: "name avatar email", // Selecciona los campos que quieres incluir
                })
                    .populate({
                    path: "members.memberOne.specialty",
                    select: "name", // Selecciona los campos que quieres incluir
                })
                    .populate({
                    path: "members.memberTwo.id",
                    select: "name avatar email", // Selecciona los campos que quieres incluir
                })
                    .populate({
                    path: "members.memberTwo.specialty",
                    select: "name", // Selecciona los campos que quieres incluir
                });
                return trade;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findOneNoPopulated(userId, tradeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trade = yield this.TradeModel.findOne({
                    _id: tradeId,
                    $or: [
                        { "members.memberOne.id": userId },
                        { "members.memberTwo.id": userId },
                    ],
                });
                return trade;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findTradesByIdPopulated(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userObjectId = new mongoose_1.Types.ObjectId(userId);
                return yield this.TradeModel.find({
                    $or: [
                        { "members.memberOne.id": userObjectId },
                        { "members.memberTwo.id": userObjectId },
                    ],
                })
                    .populate({
                    path: "members.memberOne.id",
                    select: "name email avatar",
                })
                    .populate({
                    path: "members.memberTwo.id",
                    select: "name email avatar",
                })
                    .populate("members.memberOne.specialty")
                    .populate("members.memberTwo.specialty");
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateAccepted(id, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trade = yield this.TradeModel.findByIdAndUpdate(id, {
                    expiresAt: date,
                    status: "ACCEPTED",
                });
                return trade;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateFinished(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trade = yield this.TradeModel.findByIdAndUpdate(id, {
                    status: "FINISHED",
                });
                return trade;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.TradeRepository = TradeRepository;
