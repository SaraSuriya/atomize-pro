"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database = `${process.env.PSQL_DATABASE}`;
const username = `${process.env.PSQL_USER}`;
const password = `${process.env.PASSWORD}`;
exports.sequelize = new sequelize_1.Sequelize(database, username, password, {
    host: "localhost",
    dialect: "postgres",
    logging: false,
});
//# sourceMappingURL=index.js.map