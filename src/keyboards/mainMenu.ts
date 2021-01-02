import { TelegrafContext } from 'telegraf/typings/context';
import getAllCategory from '../database/queryes/getAllCategory';
import getUserInfo from '../database/queryes/getUserInfo';
import { ERanks, ICategory } from '../database/types/types';
import editMenuInSession from '../shared/constructors/editMenuById';
import { TMsg } from './types';

const getAccidentStats = (data: Array<ICategory>) => {
    const stats = data
        .filter(obj => obj.counter > 0)
        .sort((a, b) => b.counter - a.counter)
        .map(obj => `${obj.name} : ${obj.counter}`)
        .join('\n');
    return stats  || 'Пусто';
}

const mainMenu = async (ctx: TelegrafContext, type: TMsg = 'edit') => {

    const keyboardData = await getAllCategory();
    const stats = getAccidentStats(keyboardData);
    const userId = ctx.from?.id;
    if (!userId) return;

    const user = await getUserInfo(userId, 'rank');

    const keyboard = {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: '🔄 Обновить',
                    callback_data: 'update'
                }], 
                ...keyboardData.map(obj => [{
                text: obj.name,
                callback_data: obj._id,}]),
                user?.rank === ERanks.User
                    ? []
                    : [{
                        text: '🔧 Настройки',
                        callback_data: 'settings'
                    }]
            ],
        }
    }

    switch (type) {
        case 'edit': return ctx.editMessageText(stats, keyboard).catch(() => {
                ctx.answerCbQuery('Не так быстро ❤️');
            });
        case 'edit-by-id': return editMenuInSession(ctx, stats, keyboard);
        case 'reply': return ctx.reply(stats, keyboard);
    }  
}

export default mainMenu;