import { TelegrafContext } from "telegraf/typings/context";
import { ExtraEditMessage } from "telegraf/typings/telegram-types";

const editMenuInSession = (ctx: TelegrafContext, menuText: string, keyboard: ExtraEditMessage) => {
    console.log(ctx.session);
    return ctx.telegram.editMessageText(
        ctx.session.chatId, 
        ctx.session.menuId, 
        ctx.session.menuId.toString(),
        menuText,
        keyboard
    );
}

export default editMenuInSession;