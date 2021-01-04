"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var telegraf_session_local_1 = __importDefault(require("telegraf-session-local"));
var config = {
    database: 'sessions.json'
};
var session = function () { return new telegraf_session_local_1.default(config).middleware(); };
exports.default = session;
