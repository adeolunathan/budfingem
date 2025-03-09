"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/db.ts
const pg_1 = require("pg");
const config_1 = __importDefault(require("./config/config"));
const pool = new pg_1.Pool({
    host: config_1.default.dbHost,
    port: config_1.default.dbPort,
    user: config_1.default.dbUser,
    password: config_1.default.dbPassword,
    database: config_1.default.dbName,
});
exports.default = {
    query: (text, params) => pool.query(text, params),
};
//# sourceMappingURL=db.js.map