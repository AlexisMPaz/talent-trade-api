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
exports.TradeService = void 0;
const BadRequestError_1 = require("../utils/errors/BadRequestError");
class TradeService {
    constructor(tradeRepository, userRepository) {
        (this.tradeRepository = tradeRepository),
            (this.userRepository = userRepository);
    }
    //ta ok👍
    create(trade, userOne) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // TODO: verificar que la especialidad del miembro que propone el trade coincida con el interés del que recibe la propuesta del trade
                // y viceversa.
                if (userOne.specialties.length === 0) {
                    throw new BadRequestError_1.BadRequestError("You cannot create a trade without specialties in your profile.");
                }
                const userTwo = yield this.userRepository.findOne(trade.members.memberTwo.id);
                if (!userTwo) {
                    throw new BadRequestError_1.BadRequestError("The user does not exist.");
                }
                const trades = yield this.tradeRepository.findTradesByIdTwoMembers(userOne._id, trade.members.memberTwo.id, "PENDING");
                if ((trades === null || trades === void 0 ? void 0 : trades.length) > 0) {
                    throw new BadRequestError_1.BadRequestError("You already have a pending trade with this user");
                }
                // chequear que los intereses sean correspondientes
                const findIndexOneSpecialty = userOne.specialties.findIndex((specialty) => specialty.specialtyId._id.toString() ===
                    trade.members.memberOne.specialty.toString());
                // const findIndexOneInterest = userOne.interests.findIndex(
                //   (interest) =>
                //     interest.specialtyId._id.toString() ===
                //     trade.members.memberTwo.specialty.toString()
                // );
                if (findIndexOneSpecialty === -1) {
                    throw new BadRequestError_1.BadRequestError("The interests do not match the specialties.");
                }
                //user two's specialty has to be compatible with member two's specialty
                const findIndexTwoSpecialty = userTwo.specialties.findIndex((specialty) => specialty.specialtyId.toString() ===
                    trade.members.memberTwo.specialty.toString());
                // user two's interest has to be compatible with user two's expertise
                const findIndexTwoInterest = userTwo.interests.findIndex((interest) => interest.specialtyId.toString() ===
                    trade.members.memberOne.specialty.toString());
                if (findIndexTwoSpecialty === -1 || findIndexTwoInterest === -1) {
                    throw new BadRequestError_1.BadRequestError("The interests do not match the specialties.");
                }
                const newTrade = yield this.tradeRepository.create(trade);
                userOne.trades.push(newTrade.id);
                userTwo.trades.push(newTrade.id);
                const [uno, dos] = yield Promise.allSettled([
                    userTwo.save(),
                    userOne.save(),
                ]);
                return {
                    status: "success",
                    payload: newTrade,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    // trae todos los trades, chequea que no haya trades vencidos. en caso de haber los actualiza y los devuelve al front.
    //ta ok👍
    findTrades(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trades = yield this.tradeRepository.findTradesByIdPopulated(userId);
                if (!trades) {
                    return { status: "error", payload: "No hay trades" };
                }
                const updateTrade = trades.map((trade) => {
                    if (trade.status === "ACCEPTED" && trade.expiresAt < new Date()) {
                        trade.status = "FINISHED";
                        return trade.save();
                    }
                    else if (trade) {
                        return trade;
                    }
                });
                const update = yield Promise.all(updateTrade);
                return { status: "success", payload: update };
            }
            catch (error) {
                throw error;
            }
        });
    }
    findOne(user, tradeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trade = yield this.tradeRepository.findOne(user._id, tradeId);
                if (!trade) {
                    throw new BadRequestError_1.BadRequestError("The trade does not exist.");
                }
                return {
                    status: "success",
                    payload: trade,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    //ta ok👍
    updateAccepted(user, tradeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tradeFound = yield this.tradeRepository.findOnePendingNoPopulate(user._id, tradeId, "PENDING");
                if (!tradeFound) {
                    throw new BadRequestError_1.BadRequestError("The trade does not exist.");
                }
                if (tradeFound.members.memberOne.id.toString() === user._id.toString()) {
                    throw new BadRequestError_1.BadRequestError("You cannot accept a trade that you created yourself.");
                }
                const trade = yield this.tradeRepository.findOnePending(user._id, tradeId, "PENDING");
                const duration = trade.duration;
                trade.expiresAt = new Date(new Date().getTime() + duration);
                trade.status = "ACCEPTED";
                yield trade.save();
                return { status: "success", payload: trade };
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteTrade(user, tradeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const trade = yield this.tradeRepository.find(user._id);
                if (trade.length === 0) {
                    throw new BadRequestError_1.BadRequestError("The trade does not exist.");
                }
                const tradeDelete = trade.filter((tr) => tr.id.toString() === tradeId.toString());
                if (tradeDelete[0].status === "PENDING") {
                    yield tradeDelete[0].deleteOne();
                    return { status: "success", payload: tradeDelete[0] };
                }
                throw new BadRequestError_1.BadRequestError(`No trade with ID ${tradeId} found in pending status.`);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.TradeService = TradeService;
