import { TelegrafContext } from "telegraf/typings/context"
import clearAllCounters from "../database/queryes/clearAllCounters";
import increaseCounter from "../database/queryes/increaseCounter";
import settings from "../keyboards/settings";
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
            settings(ctx);
            break;
        case 'cleanStats':
            await clearAllCounters();
            ctx.answerCbQuery('Статистика удалена');
            break;
        case 'back':
            await updateMenu(ctx);
            break;
        default:
            await increaseCounter(callbackQuery);
            ctx.answerCbQuery('Голос записан 🥰');
            await updateMenu(ctx);
            break;
    }
}

export default categoryMenuHandler;