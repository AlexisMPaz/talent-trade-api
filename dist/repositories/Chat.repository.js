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
exports.ChatRepository = void 0;
class ChatRepository {
    constructor(messageModel, chatModel) {
        this.messageModel = messageModel;
        this.chatModel = chatModel;
    }
    findMessages(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.messageModel
                    .find({ chatRoomId: id })
                    .populate({ path: "senderId", select: "name avatar" })
                    .populate({ path: "receiverId", select: "name avatar" });
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findMessage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.messageModel
                    .findById(id)
                    .populate({ path: "senderId", select: "name avatar" })
                    .populate({ path: "receiverId", select: "name avatar" });
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    createMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newMessage = new this.messageModel(message);
                yield newMessage.save();
                const populatedMessage = yield this.findMessage(newMessage.id);
                return populatedMessage;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findChatRoom(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.chatModel.findById(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ChatRepository = ChatRepository;
