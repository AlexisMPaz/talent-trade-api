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
exports.initializePassport = void 0;
const passport_1 = __importDefault(require("passport"));
const jwt_strategy_1 = __importDefault(require("./strategies/jwt.strategy"));
const gmail_startegy_1 = __importDefault(require("./strategies/gmail.startegy"));
const User_model_1 = __importDefault(require("../../models/User.model"));
const User_repository_1 = require("../../repositories/User.repository");
const userRepo = new User_repository_1.UserRepository();
const initializePassport = () => {
    passport_1.default.use("jwt", jwt_strategy_1.default);
    passport_1.default.use("gmail", gmail_startegy_1.default);
    passport_1.default.serializeUser((user, done) => {
        done(null, user.id.toString());
    });
    passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User_model_1.default.findById(id)
                .populate({
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
            })
                .populate({
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
            })
                .populate({
                path: "userRatings",
                populate: {
                    path: "userId",
                    select: "name avatar",
                },
            });
            done(null, user);
        }
        catch (err) {
            done(err);
        }
    }));
};
exports.initializePassport = initializePassport;
