import { TelegrafContext } from "telegraf/typings/context";
import getMenuId from "../database/queryes/getMenuId";
import updateMenuId from "../database/queryes/updateMenuId";
import mainMenu from "../keyboards/mainMenu";
import addUser from "../database/queryes/addUser";
import deleteMsgById from "../shared/actions/deleteMsgById";

const deleteMenu = async (ctx: TelegrafContext, userId: number) => {
    const menuId = await getMenuId(userId);
    if (menuId) {
        deleteMsgById(ctx, menuId)
    }
}

const startHandler = async (ctx: TelegrafContext) => {
    await addUser(ctx);
    const menu = await mainMenu(ctx, 'reply');
    
    if (menu && typeof menu !== "boolean") {
        const {message_id, chat: { id }} = menu;
        ctx.session.menuId = message_id;
        ctx.session.chatId = id;
        
        await deleteMenu(ctx, id);
        await updateMenuId(id, message_id);
    }
}

export default startHandler;