import { TelegrafContext } from "telegraf/typings/context"
import increaseCounter from "../database/queryes/increaseCounter";
import logg from "../utils/logger";


const categoryMenuHandler = async (ctx: TelegrafContext) => {
    if (!ctx.update.callback_query?.data) return logg.error(2, 'categoryMenu', `obj.from undefined`);
    const callbackQuery = ctx.update.callback_query.data;

    await increaseCounter(callbackQuery);
    ctx.answerCbQuery('Голос записан 🥰');
}

export default categoryMenuHandler;