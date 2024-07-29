"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeSchema = void 0;
const zod_1 = require("zod");
const regexObjectId = /^[0-9a-fA-F]{24}$/;
const durationEnum = zod_1.z.union([zod_1.z.literal(1), zod_1.z.literal(3), zod_1.z.literal(7)], {
    message: "Duracion incorrecta",
});
exports.TradeSchema = zod_1.z.object({
    members: zod_1.z.object({
        memberOne: zod_1.z.object({
            id: zod_1.z
                .string({ invalid_type_error: "El id debe ser un string" })
                .regex(regexObjectId, { message: "Id invalido" }),
            specialty: zod_1.z
                .string({ invalid_type_error: "Tipo de dato incorrecto" })
                .regex(regexObjectId, { message: "Specialty invalido" }),
        }),
        memberTwo: zod_1.z.object({
            id: zod_1.z
                .string({ invalid_type_error: "El id debe ser un string" })
                .regex(regexObjectId, { message: "Id invalido" }),
            specialty: zod_1.z
                .string({ invalid_type_error: "Tipo de dato incorrecto" })
                .regex(regexObjectId, { message: "Specialty invalido" }),
        }),
    }),
    duration: durationEnum,
});
