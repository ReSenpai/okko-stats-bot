import { TelegrafContext } from "telegraf/typings/context"
import clearAllCounters from "../database/queryes/clearAllCounters";
import deleteCategory from "../database/queryes/deleteCategory";
import increaseCounter from "../database/queryes/increaseCounter";
import categoryItemEditor from "../keyboards/categoryItemEditor";
import menuEditor from "../keyboards/menuEditor";
import settings from "../keyboards/settings";
import forseReply from "../shared/constructors/forseReply";
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
        case 'editMenu':
            await menuEditor(ctx);
            break;
        case /^edit-\w+/i.test(callbackQuery) && callbackQuery:
            await categoryItemEditor(ctx, callbackQuery);
            break;
        case /^delete-\w+/i.test(callbackQuery) && callbackQuery:
            const objectId = callbackQuery.replace(/^delete-/, '');
            await deleteCategory(objectId);
            ctx.answerCbQuery('Кнопка удалена 👌');
            await menuEditor(ctx);
            break;
        case /^changeName-\w+/i.test(callbackQuery) && callbackQuery:
            forseReply(ctx, 'Напишите новое имя для кнопки');
            ctx.session.buttonId = callbackQuery.replace(/^changeName-/, '');
            break;
        case 'addCategory':
            forseReply(ctx, 'Напишите название кнопки');
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