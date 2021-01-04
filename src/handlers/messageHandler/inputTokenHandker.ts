import { ERanks } from './../../database/types/types';
import { TelegrafContext } from "telegraf/typings/context";
import findAndDeleteToken from "../../database/queryes/findAndDeleteToken";
import getUserInfo from "../../database/queryes/getUserInfo";
import cleanUpMsg from "../../shared/actions/cleanUpMsg";
import logg from "../../utils/logger";
import updateUserRank from '../../database/queryes/updateUserRank';

const inputTokenHandler = async (ctx: TelegrafContext) => {
    const userId = ctx.from?.id;
    const msgText = ctx.message?.text;

    if (!(msgText && userId)) return logg.error(2, 'messageHandler', 'ctx.message?.text undefined');

    const oldRank = await getUserInfo(userId, 'rank');
    const newRank = await findAndDeleteToken(msgText);

    if (!newRank) {
        cleanUpMsg(ctx);
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
    cleanUpMsg(ctx);
}

export default inputTokenHandler;