"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserRating = exports.UserEmailSchema = exports.ResetPasswordSchema = exports.UserUpdateSchema = void 0;
const zod_1 = require("zod");
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&(),.?":{}|<>])[A-Za-z\d!@#$%^&(),.?":{}|<>]+$/;
const objectIdRegex = /^[a-f\d]{24}$/i;
const CategoryAndSpecialtyIdSchema = zod_1.z.object({
    categoryId: zod_1.z
        .string({
        required_error: "El id de la categoría es requerido",
        invalid_type_error: "Tipo de dato string",
    })
        .regex(objectIdRegex, { message: "ObjectId inválido" }),
    specialtyId: zod_1.z
        .string({
        required_error: "El id de la especialidad es requerido",
        invalid_type_error: "Tipo de dato string",
    })
        .regex(objectIdRegex, { message: "ObjectId inválido" }),
});
exports.UserUpdateSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        invalid_type_error: "El nombre debe ser un string",
        required_error: "El nombre es requerido",
    })
        .min(2, { message: "Minimo 2 caracteres" }),
    banner: zod_1.z
        .string({ invalid_type_error: "The banner must be a string" })
        .optional()
        .default("/banner/banner1.jpg"),
    aboutme: zod_1.z
        .string({ invalid_type_error: "La descripcion debe ser un string" })
        .max(255, { message: "Maximo 255 caracteres" })
        .optional()
        .default(""),
    phoneNumber: zod_1.z
        .string({
        invalid_type_error: "El numero telefonico debe ser un string",
        required_error: "El numero telefonico es requerido",
    })
        .optional()
        .default(""),
    specialties: zod_1.z.array(CategoryAndSpecialtyIdSchema).default([]),
    interests: zod_1.z.array(CategoryAndSpecialtyIdSchema).default([]),
});
exports.ResetPasswordSchema = zod_1.z
    .object({
    password: zod_1.z
        .string({
        required_error: "La contraseña es requerida",
        invalid_type_error: "Tipo de dato string",
    })
        .min(8, { message: "La contraseña debe contener 8 caracteres minimo" })
        .regex(passwordRegex, {
        message: "La contraseña debe contener una mayuscula, un numero y un caracter especial",
    }),
    repassword: zod_1.z.string(),
})
    .refine((data) => data.password === data.repassword, {
    message: "Las contraseñas no coinciden",
    path: ["repassword"],
});
exports.UserEmailSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: "El email es requerido",
        invalid_type_error: "Tipo de dato string",
    })
        .email({ message: "Email no valido" }),
});
exports.UpdateUserRating = zod_1.z.object({
    comment: zod_1.z
        .string({ invalid_type_error: "the 'comment' must be of type string" })
        .max(255, { message: "maximum length is 255 characters" })
        .optional(),
    rating: zod_1.z.union([
        zod_1.z.literal(1),
        zod_1.z.literal(2),
        zod_1.z.literal(3),
        zod_1.z.literal(4),
        zod_1.z.literal(5),
    ]),
});
// Esquema para verificar los ids de categoría y especialidad
