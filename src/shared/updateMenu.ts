import { TelegrafContext } from "telegraf/typings/context";
import getMenuData from "./getMenuData";

const updateMenu = async (ctx: TelegrafContext) => {
    const {stats, kb} = await getMenuData();
    ctx.editMessageText(stats, kb).catch(() => {
        ctx.answerCbQuery('Не так быстро ❤️');
    })
}

export default updateMenu;