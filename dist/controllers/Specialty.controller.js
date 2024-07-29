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
exports.SpecialtyController = void 0;
const InternalServerError_1 = require("../utils/errors/InternalServerError");
class SpecialtyController {
    constructor(specialtyService) {
        this.find = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.specialtyService.find();
                res.send(result);
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.specialtyService = specialtyService;
    }
}
exports.SpecialtyController = SpecialtyController;
