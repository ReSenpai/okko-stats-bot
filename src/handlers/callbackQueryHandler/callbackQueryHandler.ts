import { TelegrafContext } from "telegraf/typings/context";
import deleteCategory from "../../database/queryes/deleteCategory";
import categoryItemEditor from "../../keyboards/categoryItemEditor";
import menuEditor from "../../keyboards/menuEditor";
import settings from "../../keyboards/settings";
import forseReply from "../../shared/constructors/forseReply";
import mainMenu from "../../keyboards/mainMenu";
import logg from "../../utils/logger";
import voteCbQueryHandler from "./voteCbQueryHandler";
import { changeCooldownText, changeLimitValue } from "../consts/replyMsgTextConsts";


const callbackQueryHandler = async (ctx: TelegrafContext) => {
    if (!ctx.update.callback_query?.data) return logg.error(2, 'categoryMenu', `obj.from undefined`);
    const callbackQuery = ctx.update.callback_query.data;

    switch (callbackQuery) {
        case 'update':
            await mainMenu(ctx);
            break;
        case /^vote-\w+/i.test(callbackQuery) && callbackQuery:
            await voteCbQueryHandler(ctx);
            break;
        case 'settings':
            settings(ctx);
            break;
        case 'editMenu':
            await menuEditor(ctx);
            break;
        case /^edit-\w+/i.test(callbackQuery) && callbackQuery:
            const itemId = callbackQuery.replace(/^edit-/, '');
            await categoryItemEditor(ctx, itemId);
            break;
        case /^delete-\w+/i.test(callbackQuery) && callbackQuery:
            const objectId = callbackQuery.replace(/^delete-/, '');
            await deleteCategory(objectId);
            ctx.answerCbQuery('Кнопка удалена 👌');
            await menuEditor(ctx);
            break;
        case /^changeName-\w+/i.test(callbackQuery) && callbackQuery:
            ctx.session.buttonId = callbackQuery.replace(/^changeName-/, '');
            forseReply(ctx, 'Напишите новое имя для кнопки');
            break;
        case /^changeCooldown-\w+/i.test(callbackQuery) && callbackQuery:
            ctx.session.buttonId = callbackQuery.replace(/^changeCooldown-/, '');
            forseReply(ctx, changeCooldownText);
            break;
        case /^changeLimit-\w+/i.test(callbackQuery) && callbackQuery:
            ctx.session.buttonId = callbackQuery.replace(/^changeLimit-/, '');
            forseReply(ctx, changeLimitValue);
            break;
        case 'addCategory':
            forseReply(ctx, 'Напишите название кнопки');
            break;
        case 'closeAlert':
            try {
                ctx.deleteMessage();
            } catch (error) {
                logg.error(2, 'closeAlert', error);
            }
            break;
        case 'back':
            await mainMenu(ctx);
            break;
        default:
            break;
    }
}

export default callbackQueryHandler;