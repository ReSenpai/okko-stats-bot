import { changeCooldownText, changeLimitValue } from './../consts/replyMsgTextConsts';
import { TelegrafContext } from "telegraf/typings/context";
import updateCategory from "../../database/queryes/updateCategory";
import menuEditor from "../../keyboards/menuEditor";
import cleanUpMsg from "../../shared/actions/cleanUpMsg";
import logg from "../../utils/logger";
import addCategoryHandler from "./addCategoryHandler";
import inputTokenHandler from './inputTokenHandler';
import changeCooldownHandler from './changeCooldownHandler';
import changeLimitHandler from './changeLimitHandler';

const msgReplyHandler = async (ctx: TelegrafContext) => {
    const replyMsgText = ctx.message?.reply_to_message?.text;
    const msgText = ctx.message?.text;
    const userId = ctx.from?.id;
    
    if (!(msgText && userId)) return logg.error(2, 'messageHandler', 'ctx.message?.text undefined');
    
    switch (replyMsgText) {
        case 'Напишите название кнопки':
            await addCategoryHandler(ctx);  
            break;
        case 'Напишите новое имя для кнопки':
            await updateCategory({_id: ctx.session.buttonId}, {name: msgText});
            await menuEditor(ctx, 'edit-by-id');
            cleanUpMsg(ctx);
            break;
        case 'Введите токен':
            await inputTokenHandler(ctx);
            break;
        case changeCooldownText:
            await changeCooldownHandler(ctx);
            break;
        case changeLimitValue:
            await changeLimitHandler(ctx);
            break;
        default:
            ctx.deleteMessage().catch(e => logg.error(2, 'msgReplyHandler', e));
            break;
    }
}

export default msgReplyHandler;