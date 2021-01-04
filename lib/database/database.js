"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
var mongoose_1 = __importDefault(require("mongoose"));
var logger_1 = __importDefault(require("../utils/logger"));
dotenv_1.config();
var uri = process.env.CONNECTION_STRING || '';
var connectToDb = function () { return mongoose_1.default.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(function () { return logger_1.default.green(1, 'MongoDB', 'Connected'); })
    .catch(function (error) { return logger_1.default.error(2, 'MongoDB Connected', error); }); };
exports.default = connectToDb;
