"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerSpecialty = void 0;
const express_1 = require("express");
const Specialty_controller_1 = require("../controllers/Specialty.controller");
const Specialty_service_1 = require("../services/Specialty.service");
const Specialty_repository_1 = require("../repositories/Specialty.repository");
const Specialty_model_1 = __importDefault(require("../models/Specialty.model"));
const Category_model_1 = __importDefault(require("../models/Category.model"));
const specialtyRepository = new Specialty_repository_1.SpecialtyRepository(Specialty_model_1.default, Category_model_1.default);
const specialtyService = new Specialty_service_1.SpecialtyService(specialtyRepository);
const specialtyController = new Specialty_controller_1.SpecialtyController(specialtyService);
const routerSpecialty = (0, express_1.Router)();
exports.routerSpecialty = routerSpecialty;
routerSpecialty.get("/specialties", specialtyController.find);
