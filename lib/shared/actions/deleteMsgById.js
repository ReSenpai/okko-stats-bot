"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("../../utils/logger"));
var deleteMsgById = function (ctx, id) {
    ctx.deleteMessage(id).then(function () {
        logger_1.default.debug(2, 'Delete msg', id || '');
    }).catch(function (error) {
        logger_1.default.error(2, 'Delete msg', error.code);
    });
};
exports.default = deleteMsgById;
