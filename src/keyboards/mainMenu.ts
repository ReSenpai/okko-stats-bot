import { TelegrafContext } from 'telegraf/typings/context';
import getAllCategoriesLastHour from '../database/queryes/getAllCategorieslastHour';
import getAllCategory from '../database/queryes/getAllCategory';
import getUserInfo from '../database/queryes/getUserInfo';
import { ERanks } from '../database/types/types';
import collectCategoriesStatsData from '../shared/constructors/collectCategoriesStatsData';
import convertStatsToText from '../shared/constructors/convertStatsToText';
import editMenuInSession from '../shared/constructors/editMenuById';
import logg from '../utils/logger';
import { TMsg } from './types';

const mainMenu = async (ctx: TelegrafContext, type: TMsg = 'edit') => {
    const keyboardData = await getAllCategory();
    const statsData = collectCategoriesStatsData(await getAllCategoriesLastHour())

    const stats = convertStatsToText(statsData);
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
                callback_data: `vote-${obj._id}`,}]),
                user?.rank === ERanks.User
                    ? []
                    : [{
                        text: '👑 Админка',
                        callback_data: 'settings'
                    }]
            ],
            parse_mode: "Markdown"
        }
    }

    switch (type) {
        case 'edit': return ctx.editMessageText(stats, {
            ...keyboard,
            parse_mode: 'Markdown'
        }).catch(() => {
                ctx.answerCbQuery('Не так быстро ❤️');
            });
        case 'edit-by-id': 
            try {
                return editMenuInSession(ctx, stats, {
                    ...keyboard,
                    parse_mode: 'Markdown'
                });
            } catch (error) {
                logg.error(2, 'mainMenu', error);
                break;
            }
        case 'reply': return ctx.reply(stats, {
            ...keyboard,
            parse_mode: 'Markdown'
        }).catch(() => {
                ctx.answerCbQuery('Не так быстро ❤️');
        });
    }  
}

export default mainMenu;