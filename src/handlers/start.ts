import { TelegrafContext } from "telegraf/typings/context";
import getMenuId from "../database/queryes/getMenuId";
import updateMenuId from "../database/queryes/updateMenuId";
import logg from "../utils/logger";
import getMenuData from "../shared/getMenuData";

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
    const {stats, kb} = await getMenuData();
    const menu = await ctx.reply(stats, kb);

    const {message_id, chat: { id }} = menu;

    await deleteMenu(ctx, id);
    await updateMenuId(id, message_id);
}

export default sendMenu;