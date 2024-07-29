"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_routes_1 = __importDefault(require("./Auth.routes"));
const Seed_routes_1 = __importDefault(require("./Seed.routes"));
const Trade_routes_1 = __importDefault(require("./Trade.routes"));
const User_routes_1 = __importDefault(require("./User.routes"));
const Rating_routes_1 = __importDefault(require("./Rating.routes"));
const Chat_routes_1 = __importDefault(require("./Chat.routes"));
const NotFoundError_1 = require("../utils/errors/NotFoundError");
const errorHandler_1 = require("../middlewares/errorHandler");
const Specialty_routes_1 = require("./Specialty.routes");
const router = (0, express_1.Router)();
router.use("/api", User_routes_1.default);
router.use("/api", Auth_routes_1.default);
router.use("/api", Trade_routes_1.default);
router.use("/api", Rating_routes_1.default);
router.use("/api", Chat_routes_1.default);
router.use("/api", Specialty_routes_1.routerSpecialty);
router.use("/", Seed_routes_1.default);
//404
router.use((req, res, next) => {
    next(new NotFoundError_1.NotFoundError());
});
//Manejo de Errores
router.use(errorHandler_1.errorHandler);
exports.default = router;
