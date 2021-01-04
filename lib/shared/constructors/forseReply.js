"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forseReply = function (ctx, text) {
    return ctx.reply(text, {
        reply_markup: {
            force_reply: true
        },
    });
};
exports.default = forseReply;
