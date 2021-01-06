import { TelegrafContext } from "telegraf/typings/context";
import logg from "../utils/logger";

const settings = (ctx: TelegrafContext) => {
    return ctx.editMessageText('Настройки', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: '📜 Редактировать меню',
                    callback_data: 'editMenu'
                }],
                [{
                    text: '➕ Добавить кнопку',
                    callback_data: 'addCategory'
                }],
                [{
                    text: '⬅️ Назад',
                    callback_data: 'back'
                }]
            ]
        }
    }).catch(error => {
        logg.error(2, 'settings', error);
    });
}

export default settings;