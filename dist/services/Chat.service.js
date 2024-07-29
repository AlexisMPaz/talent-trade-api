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
exports.ChatService = void 0;
const BadRequestError_1 = require("../utils/errors/BadRequestError");
const DatabaseError_1 = require("../utils/errors/DatabaseError");
class ChatService {
    constructor(chatRepository, userRepository) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
    }
    createMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [chatRoom, receiver] = yield Promise.all([
                    this.userRepository.findOne(message.receiverId),
                    this.chatRepository.findChatRoom(message.chatRoomId),
                ]);
                if (!chatRoom || !receiver) {
                    throw new BadRequestError_1.BadRequestError("The information provided is incorrect.");
                }
                const newMessage = yield this.chatRepository.createMessage(message);
                if (!newMessage) {
                    throw new DatabaseError_1.DatabaseError();
                }
                return {
                    status: "sucess",
                    payload: newMessage,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    findMessages(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chatRoom = yield this.chatRepository.findChatRoom(id);
                if (!chatRoom) {
                    throw new BadRequestError_1.BadRequestError("The chat room does not exist.");
                }
                const messages = yield this.chatRepository.findMessages(id);
                return {
                    status: "sucess",
                    payload: messages,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ChatService = ChatService;
