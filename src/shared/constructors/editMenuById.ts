import { TelegrafContext } from "telegraf/typings/context";
import { ExtraEditMessage } from "telegraf/typings/telegram-types";
import logg from "../../utils/logger";

const editMenuInSession = (ctx: TelegrafContext, menuText: string, keyboard: ExtraEditMessage) => {
    try {
        return ctx.telegram.editMessageText(
            ctx.session.chatId, 
            ctx.session.menuId, 
            ctx.session.menuId.toString(),
            menuText,
            keyboard
        )
    } catch (error) {
        logg.error(2, 'editMenuInSession', error.code);
    }  
}

export default editMenuInSession;