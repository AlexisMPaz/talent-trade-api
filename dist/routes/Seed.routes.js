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
const express_1 = require("express");
const categorias_1 = require("../seed/categorias");
const Specialty_model_1 = __importDefault(require("../models/Specialty.model"));
const users_1 = require("../seed/users");
const User_model_1 = __importDefault(require("../models/User.model"));
const routerSeed = (0, express_1.Router)();
routerSeed.get("/seed", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, categorias_1.addCategories)(categorias_1.categories);
        res.send({ message: result });
    }
    catch (error) {
        console.log(error);
    }
}));
routerSeed.get("/seed/specialties", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, categorias_1.addSpecialties)(categorias_1.specialties);
        res.send({ message: result });
    }
    catch (error) {
        console.log(error);
    }
}));
routerSeed.get("/seed/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const specialties = yield Specialty_model_1.default.find();
        const specialtiesFiltered = specialties.map((specialty) => {
            const { _id, categoryId } = specialty;
            return {
                specialtyId: _id,
                categoryId,
            };
        });
        let usersHashed = yield (0, users_1.hashAllPasswords)(users_1.users);
        usersHashed = (0, users_1.assignSpecialtiesAndInterests)(usersHashed, specialtiesFiltered);
        const user = yield User_model_1.default.create(usersHashed);
        res.status(201).json({
            status: "success",
            results: user.length,
            users: user,
        });
    }
    catch (error) { }
}));
exports.default = routerSeed;
