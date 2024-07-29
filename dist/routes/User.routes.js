"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateParamObjectId_1 = require("../middlewares/validateParamObjectId");
const validateBody_1 = require("../middlewares/validateBody");
const auth_schema_1 = require("../utils/schema/auth.schema");
const User_controller_1 = require("../controllers/User.controller");
const user_schema_1 = require("../utils/schema/user.schema");
const User_repository_1 = require("../repositories/User.repository");
const User_service_1 = require("../services/User.service");
const authValidate_1 = require("../middlewares/authValidate");
const Trade_repository_1 = require("../repositories/Trade.repository");
const verifyCategoryAndSpecialty_1 = require("../middlewares/verifyCategoryAndSpecialty");
const validate_multer_1 = require("../middlewares/validate.multer");
const userRepository = new User_repository_1.UserRepository();
const tradeRepository = new Trade_repository_1.TradeRepository();
const userService = new User_service_1.UserService(userRepository, tradeRepository);
const userController = new User_controller_1.UserController(userService);
const routerUser = (0, express_1.Router)();
// Already documented
routerUser.post("/user", (0, validateBody_1.middlewareBody)(auth_schema_1.RegisterSchema), userController.createUser);
// Already documented
routerUser.get("/user/confirm-email/:token", userController.confirmRegister);
// Already documented
routerUser.post("/user/reset-password", (0, validateBody_1.middlewareBody)(user_schema_1.UserEmailSchema), userController.sendResetPasswordToken);
// Already documented
routerUser.put("/user/reset-password/:token", (0, validateBody_1.middlewareBody)(user_schema_1.ResetPasswordSchema), userController.resetPassword);
// TODO: endpoint for showing all potential users
routerUser.get("/user/potential-trades/:categoryId?", authValidate_1.authValidatePassport, userController.getPotentialPairings);
// Already documented
routerUser.get("/user/:categoryId?", userController.getUsers);
// ! Middleware general
routerUser.param("userId", (0, validateParamObjectId_1.middlewareParamsObjectId)("userId"));
routerUser.param("tradeId", (0, validateParamObjectId_1.middlewareParamsObjectId)("tradeId"));
// TODO: document endpoint for getting a single user
routerUser.get("/user/details/:userId", authValidate_1.authValidatePassportOptional, userController.getUser);
// TODO: document endpoint for user update. Be dead specific about it and include examples
routerUser.put("/user/", authValidate_1.authValidatePassport, (0, verifyCategoryAndSpecialty_1.verifyCategoryAndSpecialty)("specialties"), (0, verifyCategoryAndSpecialty_1.verifyCategoryAndSpecialty)("interests"), (0, validateBody_1.middlewareBody)(user_schema_1.UserUpdateSchema), userController.updateUser);
// Already documented
routerUser.delete("/user/:userId", userController.delete);
// TODO: document this endpoint for photo update
routerUser.put("/user/profile-photo", authValidate_1.authValidatePassport, validate_multer_1.upload.single("profile-pick"), userController.updatePick);
routerUser.put("/user/:userId/update-rating/:tradeId", authValidate_1.authValidatePassport, (0, validateBody_1.middlewareBody)(user_schema_1.UpdateUserRating), userController.updateUserRating);
exports.default = routerUser;
