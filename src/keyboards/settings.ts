import { TelegrafContext } from "telegraf/typings/context";

const settings = (ctx: TelegrafContext) => {
    return ctx.editMessageText('Настройки', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: '🔄 Очистить стату',
                    callback_data: 'cleanStats'
                }],
                [{
                    text: '📜 Редактировать меню',
                    callback_data: 'editMenu'
                }],
                [{
                    text: '➕ Добавить кнопку',
                    callback_data: 'addCategory'
                }],
                [{
                    text: 'Назад',
                    callback_data: 'back'
                }]
            ]
        }
    });
}

export default settings;