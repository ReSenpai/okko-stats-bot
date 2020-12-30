import { msgReplyTextValidator } from './../shared/validators/ctxValidators';
import { TelegrafContext } from "telegraf/typings/context";
import updateCategory from "../database/queryes/updateCategory";
import createCategory from "./createCategory";
import logg from '../utils/logger';
import getMenuData from '../shared/getMenuData';

const msgReplyHandler = async (ctx: TelegrafContext) => {
    const replyMsgText = ctx.message?.reply_to_message?.text;
    const replyMsgId = ctx.message?.reply_to_message?.message_id;
    const msgId = ctx.message?.message_id;

    switch (replyMsgText) {
        case 'Напишите название кнопки':
            await createCategory(ctx);
            const {stats , kb} = await getMenuData();
            try {
                ctx.deleteMessage(replyMsgId);
                ctx.deleteMessage(msgId);
                ctx.telegram.editMessageText(
                    ctx.session.chatId, 
                    ctx.session.menuId, 
                    ctx.session.menuId.toString(),
                    stats,
                    kb
                );
            } catch (error) {
                console.log(error);
            }
            break;
        case 'Напишите новое имя для кнопки':
            if (!ctx.message?.text) return logg.error(2, 'messageHandler', 'ctx.message?.text undefined');
            await updateCategory(ctx.session.buttonId, ctx.message?.text);
            break;
    }
}

const messageHandler = async (ctx: TelegrafContext) => {
    if (msgReplyTextValidator(ctx)) {
        await msgReplyHandler(ctx);
    }
}

export default messageHandler;