import { TelegrafContext } from "telegraf/typings/context"
import increaseCounter from "../database/queryes/increaseCounter";
import updateMenu from "../shared/updateMenu";
import logg from "../utils/logger";


const categoryMenuHandler = async (ctx: TelegrafContext) => {
    if (!ctx.update.callback_query?.data) return logg.error(2, 'categoryMenu', `obj.from undefined`);
    const callbackQuery = ctx.update.callback_query.data;

    switch (callbackQuery) {
        case 'update':
            await updateMenu(ctx);
            break;
        case 'settings':
            break
        default:
            await increaseCounter(callbackQuery);
            ctx.answerCbQuery('Голос записан 🥰');
            await updateMenu(ctx);
            break;
    }
}

export default categoryMenuHandler;