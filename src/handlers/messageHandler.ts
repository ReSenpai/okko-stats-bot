import { msgReplyTextValidator } from '../shared/validators/validators';
import { TelegrafContext } from "telegraf/typings/context";
import updateCategory from "../database/queryes/updateCategory";
import createCategory from "./createCategory";
import logg from '../utils/logger';
import menuEditor from '../keyboards/menuEditor';
import mainMenu from '../keyboards/mainMenu';
import deleteMsgById from '../shared/actions/deleteMsgById';
import findAndDeleteToken from '../database/queryes/findAndDeleteToken';
import updateUserRank from '../database/queryes/updateUserRank';
import getUserInfo from '../database/queryes/getUserInfo';
import { ERanks } from '../database/types/types';

const msgReplyHandler = async (ctx: TelegrafContext) => {
    const replyMsgText = ctx.message?.reply_to_message?.text;
    const msgText = ctx.message?.text;
    const userId = ctx.from?.id;
    const replyMsgId = ctx.message?.reply_to_message?.message_id;
    const msgId = ctx.message?.message_id;

    const cleanUpMsg = () => {
        deleteMsgById(ctx, replyMsgId);
        deleteMsgById(ctx, msgId);
    }

    if (!(msgText && userId)) return logg.error(2, 'messageHandler', 'ctx.message?.text undefined');

    switch (replyMsgText) {
        case 'Напишите название кнопки':
            await createCategory(ctx);
            await mainMenu(ctx, 'edit-by-id');
            cleanUpMsg();
            break;
        case 'Напишите новое имя для кнопки':
            await updateCategory(ctx.session.buttonId, msgText);
            await menuEditor(ctx, 'edit-by-id');
            cleanUpMsg();
            break;
        case 'Введите токен':
            const oldRank = await getUserInfo(userId, 'rank');
            const newRank = await findAndDeleteToken(msgText);

            if (!newRank) {
                cleanUpMsg();
                ctx.reply(`Несуществующий токен 🚫`);
                return;
            }

            if (oldRank && oldRank.rank === ERanks.SuperAdmin) {
                ctx.reply(`У вас уже максимальный ранг - 👑 ${ERanks.SuperAdmin} 👑. \nА этот токен будет удален, для безопасности 😉`);
            } else if (oldRank && oldRank.rank === newRank) {
                ctx.reply(`Вы уже имеет ранг 👑 ${newRank} 👑. \nА этот токен будет удален, для безопасности 😉`);
            } else {
                await updateUserRank(ctx, newRank);
                ctx.reply(`Токен получен. \nВаш новый ранг - 👑 ${newRank} 👑`);
            }
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