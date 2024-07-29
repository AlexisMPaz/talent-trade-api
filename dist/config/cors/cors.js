"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsConfig = void 0;
const env_config_1 = require("../envs/env.config");
const whiteList = [env_config_1.envs.FRONTEND_URL]; // Agrega aquí todas las URLs necesarias
// const whiteList: (string | undefined)[] = [];
exports.corsConfig = {
    origin: function (origin, callback) {
        if (process.argv[2] === "--api") {
            whiteList.push(undefined);
        }
        if (!origin || whiteList.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Error de cors"));
        }
    },
    credentials: true,
};
