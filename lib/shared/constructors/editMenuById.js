"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var editMenuInSession = function (ctx, menuText, keyboard) {
    return ctx.telegram.editMessageText(ctx.session.chatId, ctx.session.menuId, ctx.session.menuId.toString(), menuText, keyboard);
};
exports.default = editMenuInSession;
