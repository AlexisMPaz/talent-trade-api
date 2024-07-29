"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessageSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.CreateMessageSchema = zod_1.z.object({
    senderId: zod_1.z
        .string({
        required_error: "senderId must be required",
        invalid_type_error: "must be of type string",
    })
        .refine((value) => mongoose_1.Types.ObjectId.isValid(value), {
        message: "Invalid ObjectId",
    }),
    receiverId: zod_1.z
        .string({
        required_error: "receiveId must be required",
        invalid_type_error: "must be of type string",
    })
        .refine((value) => mongoose_1.Types.ObjectId.isValid(value), {
        message: "Invalid ObjectId",
    }),
    message: zod_1.z.string({
        required_error: "Message must be required",
        invalid_type_error: "must be of type string",
    }),
    chatRoomId: zod_1.z
        .string({
        required_error: "chatRoom must be required",
        invalid_type_error: "must be of type string",
    })
        .refine((value) => mongoose_1.Types.ObjectId.isValid(value), {
        message: "Invalid ObjectId",
    }),
});
