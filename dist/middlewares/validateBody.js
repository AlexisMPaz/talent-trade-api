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
exports.middlewareBody = void 0;
const InternalServerError_1 = require("../utils/errors/InternalServerError");
const middlewareBody = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield schema.parse(req.body);
        if (result)
            return next();
    }
    catch (error) {
        if (error instanceof Error) {
            return next(error);
        }
        return next(new InternalServerError_1.InternalServerError());
    }
});
exports.middlewareBody = middlewareBody;
