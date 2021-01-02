import { msgReplyTextValidator } from './../shared/validators/ctxValidators';
import { TelegrafContext } from "telegraf/typings/context";
import updateCategory from "../database/queryes/updateCategory";
import createCategory from "./createCategory";
import logg from '../utils/logger';
import menuEditor from '../keyboards/menuEditor';
import mainMenu from '../keyboards/mainMenu';
import deleteMsgById from '../shared/actions/deleteMsgById';

const msgReplyHandler = async (ctx: TelegrafContext) => {
    const replyMsgText = ctx.message?.reply_to_message?.text;
    const replyMsgId = ctx.message?.reply_to_message?.message_id;
    const msgId = ctx.message?.message_id;

    const cleanUpMsg = () => {
        deleteMsgById(ctx, replyMsgId);
        deleteMsgById(ctx, msgId);
    }

    switch (replyMsgText) {
        case 'Напишите название кнопки':
            await createCategory(ctx);
            await mainMenu(ctx, 'edit-by-id');
            cleanUpMsg();
            break;
        case 'Напишите новое имя для кнопки':
            if (!ctx.message?.text) return logg.error(2, 'messageHandler', 'ctx.message?.text undefined');
            await updateCategory(ctx.session.buttonId, ctx.message?.text);
            await menuEditor(ctx, 'edit-by-id');
            cleanUpMsg();
            break;
    }
}

const messageHandler = async (ctx: TelegrafContext) => {
    if (msgReplyTextValidator(ctx)) {
        await msgReplyHandler(ctx);
    }
}

export default messageHandler;