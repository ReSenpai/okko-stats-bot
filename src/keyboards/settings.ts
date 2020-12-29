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
                    text: 'Назад',
                    callback_data: 'back'
                }]
            ]
        }
    });
}

export default settings;