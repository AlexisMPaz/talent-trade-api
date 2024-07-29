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
exports.verifyCategoryAndSpecialty = void 0;
const Specialty_model_1 = __importDefault(require("../models/Specialty.model"));
const BadRequestError_1 = require("../utils/errors/BadRequestError");
const InternalServerError_1 = require("../utils/errors/InternalServerError");
const verifyCategoryAndSpecialty = (specialtiesOrInterests) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    let checkSpecialtiesOrInterests = [];
    if (specialtiesOrInterests === "specialties") {
        checkSpecialtiesOrInterests = req.body.specialties;
    }
    else if (specialtiesOrInterests === "interests") {
        checkSpecialtiesOrInterests = req.body.interests;
    }
    const uniqueArray = checkSpecialtiesOrInterests.reduce((accumulator, current) => {
        const exists = accumulator.some((item) => item.categoryId === current.categoryId &&
            item.specialtyId === current.specialtyId);
        if (!exists) {
            accumulator.push(current);
        }
        return accumulator;
    }, []);
    if (specialtiesOrInterests === "specialties") {
        if (uniqueArray.length === 0) {
            req.body.specialties = uniqueArray;
            return next();
        }
    }
    else if (specialtiesOrInterests === "interests") {
        if (uniqueArray.length === 0) {
            req.body.interests = uniqueArray;
            return next();
        }
    }
    const arrayPromise = uniqueArray.map((array) => {
        return Specialty_model_1.default.find({
            _id: array.specialtyId,
            categoryId: array.categoryId,
        });
    });
    try {
        const response = yield Promise.all(arrayPromise);
        const hasError = response.some((resp) => resp.length === 0);
        if (hasError) {
            return next(new BadRequestError_1.BadRequestError("There was an error with the received categories/specialties."));
        }
        return next();
    }
    catch (error) {
        if (error instanceof Error) {
            return next(error);
        }
        return next(new InternalServerError_1.InternalServerError());
    }
});
exports.verifyCategoryAndSpecialty = verifyCategoryAndSpecialty;
