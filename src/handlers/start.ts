import { TelegrafContext } from "telegraf/typings/context";
import counterWatcher from "../database/queryes/counterWatcher";
import getAllCategory from "../database/queryes/getAllCategory";
import getMenuId from "../database/queryes/getMenuId";
import updateMenuId from "../database/queryes/updateMenuId";
import keyboard from "../keyboards/category/categoryKeyboard";
import getAccidentStats from "../shared/getAccidentStats";
import logg from "../utils/logger";

const deleteMenu = async (ctx: TelegrafContext, userId: number) => {
    const menuId = await getMenuId(userId);
    if (menuId) {
        await ctx.deleteMessage(menuId).then(() => {
            logg.debug(2, 'Delete menu', menuId.toString());
        }).catch(error => {
            logg.error(2, 'Delete menu', error);
        })
    }
}

const sendMenu = async (ctx: TelegrafContext) => {
    const keyboardData = await getAllCategory();
    const menu = await ctx.reply(getAccidentStats(keyboardData), {
        reply_markup: {
            inline_keyboard: keyboard(keyboardData)
        },
        parse_mode: 'Markdown'
    });

    const {message_id, chat: { id }} = menu;
    console.log(menu)

    await deleteMenu(ctx, id);
    await updateMenuId(id, message_id);
}

export default sendMenu;