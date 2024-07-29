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
exports.TradeController = void 0;
const InternalServerError_1 = require("../utils/errors/InternalServerError");
class TradeController {
    constructor(tradeService) {
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            // desestructurar de una
            let { members, duration } = req.body;
            duration = duration * 24 * 60 * 60 * 1000;
            try {
                const result = yield this.tradeService.create({ members, duration }, req.user);
                res.send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.updateAccepted = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { tradeId } = req.params;
            const user = req.user;
            try {
                const result = yield this.tradeService.updateAccepted(user, tradeId);
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
            const { tradeId } = req.params;
            const user = req.user;
            try {
                const result = yield this.tradeService.deleteTrade(user, tradeId);
                res.send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.findOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { tradeId } = req.params;
            const user = req.user;
            try {
                const result = yield this.tradeService.findOne(user, tradeId);
                res.send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.findTrades = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            try {
                const result = yield this.tradeService.findTrades(user._id);
                res.send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.tradeService = tradeService;
    }
}
exports.TradeController = TradeController;
