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
exports.ChatController = void 0;
const InternalServerError_1 = require("../utils/errors/InternalServerError");
class ChatController {
    constructor(chatService) {
        this.createMessage = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const message = req.body;
            try {
                const { status, payload } = yield this.chatService.createMessage(message);
                res.send({ status, payload });
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.findMessages = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { chatRoomId } = req.params;
            try {
                const { status, payload } = yield this.chatService.findMessages(chatRoomId);
                res.send({ status, payload });
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(error);
                }
                return next(new InternalServerError_1.InternalServerError());
            }
        });
        this.chatService = chatService;
    }
}
exports.ChatController = ChatController;
