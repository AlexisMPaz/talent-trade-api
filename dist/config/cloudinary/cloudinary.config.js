"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
exports.cloudinary = cloudinary_1.default;
const env_config_1 = require("../envs/env.config");
cloudinary_1.default.v2.config({
    cloud_name: env_config_1.envs.CLOUDINARY_NAME,
    api_key: env_config_1.envs.CLOUDINARY_KEY,
    api_secret: env_config_1.envs.CLOUDINARY_SECRET,
});
//!configuracion para subir imagenes
// const uploadResult: CloudinaryResponse = await new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.v2.uploader.upload_stream(
//       {
//         upload_preset: 'tatrade_profile',
//         public_id: `${photo.originalname}`,
//         use_filename: true,
//         overwrite: true,
//         transformation: [
//           { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },
//           { radius: 'max' },
//         ],
//       },
//       (error, result: UploadApiResponse | undefined) => {
//         if (error) return reject(error);
//         resolve(result as unknown as CloudinaryResponse);
//       },
//     );
//     uploadStream.end(photo.buffer);
//   });
