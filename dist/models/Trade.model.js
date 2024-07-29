"use strict";
/** @format */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importStar(require("mongoose"));
const User_model_1 = __importDefault(require("./User.model"));
const ChatRoom_1 = __importDefault(require("./ChatRoom"));
const tradeStatus = {
    accepted: "ACCEPTED",
    pending: "PENDING",
    finished: "FINISHED",
};
const TradeSchema = new mongoose_1.Schema({
    members: {
        type: {
            memberOne: {
                id: {
                    type: mongoose_1.Types.ObjectId,
                    ref: "User",
                },
                specialty: {
                    type: mongoose_1.Types.ObjectId,
                    ref: "Specialty",
                },
                hasRated: {
                    type: Boolean,
                    default: false,
                },
            },
            memberTwo: {
                id: {
                    type: mongoose_1.Types.ObjectId,
                    ref: "User",
                },
                specialty: {
                    type: mongoose_1.Types.ObjectId,
                    ref: "Specialty",
                },
                hasRated: {
                    type: Boolean,
                    default: false,
                },
            },
        },
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    expiresAt: {
        type: Date,
        default: null,
    },
    status: {
        type: String,
        enum: ["ACCEPTED", "PENDING", "FINISHED"],
        default: "PENDING",
    },
    chatRoom: {
        type: mongoose_1.Types.ObjectId,
        ref: "Chat",
        default: null,
    },
});
TradeSchema.pre("deleteOne", { document: true, query: false }, function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const trade = yield Trade.findOne({ id: this.id });
            const [memberOne, memberTwo] = yield Promise.all([
                User_model_1.default.findById(trade.members.memberOne),
                User_model_1.default.findById(trade.members.memberTwo),
            ]);
            memberOne.trades = memberOne.trades.filter((trade) => (trade === null || trade === void 0 ? void 0 : trade.toString()) !== this.id.toString());
            memberTwo.trades = memberTwo.trades.filter((trade) => (trade === null || trade === void 0 ? void 0 : trade.toString()) !== this.id.toString());
            yield Promise.allSettled([memberOne.save(), memberTwo.save()]);
            next();
        }
        catch (error) {
            console.log("error borrando el proyecto y sus derivados.");
            next();
        }
    });
});
TradeSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const trade = this;
            const chat = new ChatRoom_1.default({
                userOne: trade.members.memberOne.id,
                userTwo: trade.members.memberTwo.id,
                tradeId: trade.id,
            });
            const [userOne, userTwo] = yield Promise.all([
                User_model_1.default.findById(trade.members.memberOne.id),
                User_model_1.default.findById(trade.members.memberTwo.id),
            ]);
            userOne.chatRoom.push(chat.id);
            userTwo.chatRoom.push(chat.id);
            userOne.trades.push(trade.id);
            userTwo.trades.push(trade.id);
            this.chatRoom = chat.id;
            yield Promise.all([chat.save(), userOne === null || userOne === void 0 ? void 0 : userOne.save(), userTwo === null || userTwo === void 0 ? void 0 : userTwo.save()]);
            next();
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error(String(error));
        }
    });
});
const Trade = mongoose_1.default.model("Trade", TradeSchema);
exports.default = Trade;
