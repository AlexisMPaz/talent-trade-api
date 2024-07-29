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
const passport_google_oauth2_1 = require("passport-google-oauth2");
const env_config_1 = require("../../envs/env.config");
const User_model_1 = __importDefault(require("../../../models/User.model"));
const bcrypt_config_1 = require("../../../utils/bcrypt/bcrypt.config");
const serverUrl = env_config_1.envs.SERVER_URL;
const options = {
    clientID: env_config_1.envs.GOOGLE_CLIENT_ID,
    clientSecret: env_config_1.envs.GOOGLE_CLIENT_SECRET,
    callbackURL: `${serverUrl}${env_config_1.envs.GOOGLE_CALLBACK_URL}`,
    proxy: true,
};
// google strategy
const strategyGmail = new passport_google_oauth2_1.Strategy(options, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_model_1.default.findOne({ email: profile.email });
        if (user) {
            return done(null, user);
        }
        const passwordHashed = (0, bcrypt_config_1.hashPassword)(profile.id);
        const newUser = yield User_model_1.default.create({
            name: profile.displayName,
            provider: "google",
            email: profile.email,
            password: passwordHashed,
            avatar: profile.picture,
        });
        return done(null, newUser);
    }
    catch (err) {
        console.log(err);
    }
}));
exports.default = strategyGmail;
