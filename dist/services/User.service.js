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
exports.UserService = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_config_1 = require("../utils/bcrypt/bcrypt.config");
const jwt_config_1 = require("../utils/jwt/jwt.config");
const registerEmail_1 = require("../email/registerEmail");
const cloudinary_config_1 = require("../config/cloudinary/cloudinary.config");
const AuthenticationError_1 = require("../utils/errors/AuthenticationError");
const BadRequestError_1 = require("../utils/errors/BadRequestError");
const AuthorizationError_1 = require("../utils/errors/AuthorizationError");
class UserService {
    constructor(userRepository, tradeRepository) {
        this.userRepository = userRepository;
        this.tradeRepository = tradeRepository;
    }
    // ta ok.👍
    verifyEmail(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield this.userRepository.findByEmail(user.email);
                if (userFound) {
                    throw new AuthorizationError_1.AuthorizationError("The email is already registered.");
                }
                const token = (0, jwt_config_1.generateJWTRegister)(user);
                const data = {
                    name: user.name,
                    email: user.email,
                    token: token,
                };
                registerEmail_1.Emails.sendConfirmationEmail(data);
                return {
                    status: "success",
                    payload: "Para terminar tu registro verifica tu email.",
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    create(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = (0, jwt_config_1.dataRegisterJwt)(token);
                const userFound = yield this.userRepository.findByEmail(user.email);
                if (userFound) {
                    throw new AuthorizationError_1.AuthorizationError("The email is already registered.");
                }
                user.password = yield (0, bcrypt_config_1.hashPassword)(user.password);
                const newUser = yield this.userRepository.create(user);
                const jwt = (0, jwt_config_1.generateJWT)({ id: newUser._id });
                const populatedUser = yield newUser.populate([
                    {
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
                    },
                    {
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
                    },
                    {
                        path: "userRatings",
                        populate: {
                            path: "userId",
                            select: "name avatar",
                        },
                    },
                ]);
                return {
                    status: "success",
                    payload: populatedUser,
                    token: jwt,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    resetEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield this.userRepository.findByEmail(email);
                if (!userFound) {
                    throw new AuthorizationError_1.AuthorizationError("The email is not registered.");
                }
                const token = (0, jwt_config_1.generateJWTEmail)({ email });
                const data = {
                    name: userFound.name,
                    email: userFound.email,
                    token: token,
                };
                registerEmail_1.Emails.sendResetPasswordEmail(data);
                return {
                    status: "success",
                    payload: "Para continuar el reset verifica tu email.",
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    updatePassword(_a) {
        return __awaiter(this, arguments, void 0, function* ({ token, password, }) {
            try {
                const { email } = (0, jwt_config_1.dataEmailJwt)(token);
                const hashedPassword = yield (0, bcrypt_config_1.hashPassword)(password);
                const updatedUser = yield this.userRepository.updateByEmail(email, {
                    password: hashedPassword,
                });
                return {
                    status: "success",
                    payload: updatedUser,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    // ta ok.👍
    find(categoryId, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                page: page ? +page : 1,
                limit: 10,
                select: "name avatar aboutme specialties interests userRatings",
                populate: [
                    {
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
                    },
                    {
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
                    },
                    {
                        path: "userRatings",
                        populate: {
                            path: "userId",
                            select: "name avatar",
                        },
                    },
                ],
            };
            let query = {};
            if (categoryId) {
                query = {
                    specialties: {
                        $elemMatch: { categoryId: new mongoose_1.Types.ObjectId(categoryId) },
                    },
                };
            }
            try {
                const users = yield this.userRepository.find(query, options);
                return {
                    status: "success",
                    payload: users,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    // ta ok.👍
    findById(user, searchedUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFind = yield this.userRepository.findOnePopulated(searchedUserId);
                if (!userFind) {
                    throw new AuthenticationError_1.AuthenticationError("The user does not exist.");
                }
                let userFilterData = {
                    id: userFind.id,
                    avatar: userFind.avatar,
                    banner: userFind.banner,
                    name: userFind.name,
                    aboutme: userFind.aboutme,
                    specialties: userFind.specialties,
                    interests: userFind.interests,
                    userRatings: userFind.userRatings,
                    trades: null,
                    phoneNumber: null,
                    email: null,
                    isOwnProfile: false, // Nuevo campo para indicar si es el perfil propio
                };
                if (user) {
                    if (user._id.toString() === userFind._id.toString()) {
                        userFilterData.trades = userFind.trades;
                        userFilterData.phoneNumber = userFind.phoneNumber;
                        userFilterData.email = userFind.email;
                        userFilterData.isOwnProfile = true; // Actualizar el campo si es el perfil propio
                    }
                    else {
                        const result = userFind.contacts.findIndex((contact) => (contact === null || contact === void 0 ? void 0 : contact.toString()) === user.id.toString());
                        if (result !== -1) {
                            userFilterData.phoneNumber = userFind.phoneNumber;
                            userFilterData.email = userFind.email;
                        }
                    }
                }
                return {
                    status: "success",
                    payload: userFilterData,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByEmail(user, searchedUserEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFind = yield this.userRepository.findByEmail(searchedUserEmail);
                if (!userFind) {
                    throw new AuthenticationError_1.AuthenticationError("The email is not registered.");
                }
                let userFilterData = {
                    name: userFind.name,
                    aboutme: userFind.aboutme,
                    specialties: userFind.specialties,
                    interests: userFind.interests,
                    userRatings: userFind.userRatings,
                    trades: userFind.trades,
                    phoneNumber: null,
                };
                if (user) {
                    const result = userFind.contacts.findIndex((contact) => (contact === null || contact === void 0 ? void 0 : contact.toString()) === user.id.toString());
                    if (result !== -1) {
                        userFilterData.phoneNumber = userFind.phoneNumber;
                    }
                }
                return {
                    status: "success",
                    payload: userFilterData,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    // ta ok.👍
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.update(id, data);
                if (user) {
                    return {
                        status: "success",
                        payload: user,
                    };
                }
                else {
                    throw new AuthenticationError_1.AuthenticationError("The user does not exist.");
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    // ta ok.👍
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.delete(id);
                if (!user) {
                    throw new AuthenticationError_1.AuthenticationError("The user does not exist.");
                }
                return {
                    status: "success",
                    payload: user,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateRating(data, user, userTwoId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFound = yield this.userRepository.findOne(userTwoId);
                // if user not found
                if (!userFound) {
                    throw new AuthenticationError_1.AuthenticationError("The user does not exist.");
                }
                const tradeFound = yield this.tradeRepository.findOneNoPopulated(user._id, data.tradeId);
                // if trade not found
                if (!tradeFound) {
                    throw new BadRequestError_1.BadRequestError("The trade does not exist.");
                }
                // if the user already has a rating
                if (userFound.userRatings.length > 0) {
                    const findIndex = userFound.userRatings.findIndex((rating) => rating.tradeId === data.tradeId);
                    if (findIndex !== -1) {
                        throw new AuthorizationError_1.AuthorizationError("You have already rated this trade.");
                    }
                }
                // if the trade is not yet finished
                if (tradeFound.status !== "FINISHED") {
                    throw new AuthorizationError_1.AuthorizationError("The trade has not yet finished.");
                }
                //check that the user who sent the comment has not done it before.
                const isUserMemberOne = tradeFound.members.memberOne.id.toString() === user._id.toString();
                const isUserMemberTwo = tradeFound.members.memberTwo.id.toString() === user._id.toString();
                if ((!isUserMemberOne && !isUserMemberTwo) ||
                    (isUserMemberOne && tradeFound.members.memberOne.hasRated) ||
                    (isUserMemberTwo && tradeFound.members.memberTwo.hasRated)) {
                    throw new BadRequestError_1.BadRequestError("You have already rated this trade.");
                }
                userFound.userRatings.push(data);
                if (isUserMemberOne) {
                    tradeFound.members.memberOne.hasRated = true;
                }
                else if (isUserMemberTwo) {
                    tradeFound.members.memberTwo.hasRated = true;
                }
                const [resultUser, resultTrade] = yield Promise.all([
                    userFound.save(),
                    tradeFound.save(),
                ]);
                return {
                    status: "success",
                    payload: "Rating updated",
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    updatePick(user, photo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uploadResult = yield new Promise((resolve, reject) => {
                    const uploadStream = cloudinary_config_1.cloudinary.v2.uploader.upload_stream({
                        upload_preset: "tatrade_profile",
                        public_id: `${user.email}`,
                        use_filename: true,
                        overwrite: true,
                        transformation: [
                            { width: 250, height: 250, gravity: "faces", crop: "thumb" },
                            { radius: "max" },
                        ],
                    }, (error, result) => {
                        if (error)
                            return reject(error);
                        resolve(result);
                    });
                    uploadStream.end(photo.buffer);
                });
                user.avatar = uploadResult.url;
                yield user.save();
                return { status: "success", payload: user };
            }
            catch (error) {
                throw error;
            }
        });
    }
    // async getSuggestions(user: IUser) {
    //   const interests: specialty[] = user.interests;
    //   const interestsIds: Types.ObjectId[] = interests.map(
    //     (interest) => interest.specialtyId
    //   );
    //   const specialties: specialty[] = user.specialties;
    //   const specialtiesIds: Types.ObjectId[] = specialties.map(
    //     (specialty) => specialty.specialtyId
    //   );
    //   try {
    //     const recommendations = await this.userRepository.findSuggestions(
    //       interestsIds,
    //       specialtiesIds
    //     );
    //     if (recommendations) {
    //       return {
    //         status: "success",
    //         numberOfRecommendations: recommendations.length,
    //         payload: recommendations,
    //       };
    //     }
    //   } catch (error) {
    //     throw error;
    //   }
    // }
    getSuggestions(categoryId, page, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                page: page ? +page : 1,
                limit: 10,
                select: "name avatar aboutme specialties interests userRatings",
                populate: [
                    {
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
                    },
                    {
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
                    },
                    {
                        path: "userRatings",
                        populate: {
                            path: "userId",
                            select: "name avatar",
                        },
                    },
                ],
            };
            const interests = user.interests;
            const interestsIds = interests.map((interest) => interest.specialtyId);
            const specialties = user.specialties;
            const specialtiesIds = specialties.map((specialty) => specialty.specialtyId);
            let query = {
                specialties: {
                    $elemMatch: {
                        specialtyId: { $in: interestsIds },
                    },
                },
                interests: {
                    $elemMatch: { specialtyId: { $in: specialtiesIds } },
                },
            };
            if (categoryId) {
                query.specialties.$elemMatch.categoryId = new mongoose_1.Types.ObjectId(categoryId);
            }
            try {
                const users = yield this.userRepository.find(query, options);
                return {
                    status: "success",
                    payload: users,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserService = UserService;
