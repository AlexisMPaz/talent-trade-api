"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateBody_1 = require("../middlewares/validateBody");
const auth_schema_1 = require("../utils/schema/auth.schema");
const User_repository_1 = require("../repositories/User.repository");
const Auth_service_1 = require("../services/Auth.service");
const Auth_controller_1 = require("../controllers/Auth.controller");
const authValidate_1 = require("../middlewares/authValidate");
const authValidate_2 = require("../middlewares/authValidate");
const routerAuth = (0, express_1.Router)();
const userRepository = new User_repository_1.UserRepository();
const authService = new Auth_service_1.AuthService(userRepository);
const authController = new Auth_controller_1.AuthController(authService);
// Already documented
routerAuth.post("/auth/login", (0, validateBody_1.middlewareBody)(auth_schema_1.LoginSchema), authController.login);
// TODO: Google authentication
routerAuth.post("/auth/google", authValidate_1.authValidatePassportGoogle, authController.google);
// Already documented
routerAuth.get("/auth/logout", authController.logout);
// Already documented
routerAuth.get("/auth/user", authValidate_2.authValidatePassport, authController.user);
exports.default = routerAuth;
