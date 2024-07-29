"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRatingSchema = exports.RatingIdsSchema = void 0;
const zod_1 = require("zod");
const regexObjectId = /^[0-9a-fA-F]{24}$/;
exports.RatingIdsSchema = zod_1.z
    .array(zod_1.z
    .string({ invalid_type_error: "El id debe ser un string" })
    .regex(regexObjectId, { message: "Id invalido" }))
    .length(5, { message: "El array debe tener exactamente 5 Ids válidos." });
exports.CreateRatingSchema = zod_1.z.object({
    comment: zod_1.z
        .string({
        required_error: "El comentario es requerido.",
        invalid_type_error: "Tipo de dato string",
    })
        .max(120, { message: "El comentario debe contener 120 caracteres máximo" }),
});
