import { TMsg } from './types';
import { TelegrafContext } from "telegraf/typings/context";
import logg from "../utils/logger";
import helpText from "../shared/textDesk/helpText";


const help = (ctx: TelegrafContext, type: TMsg = 'edit') => {
    const media = {source: 'src/assets/goose.jpg'};
    const caption = helpText.main;
    const keyboard = {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: '🏡 О главном меню',
                    callback_data: 'help-mainMenu'
                }],
                [{
                    text: '🔑 О авторизации',
                    callback_data: 'help-auth'
                }],
                [{
                    text: '➕ О добавлении кнопок',
                    callback_data: 'help-addButton'
                }],
                [{
                    text: '🔧 О редакторе кнопок',
                    callback_data: 'help-buttonEditor'
                }],
                [{
                    text: '🟠 О оповещениях',
                    callback_data: 'help-alerts'
                }],
                [{
                    text: '📬 О получение токена',
                    callback_data: 'help-getToken'
                }],
                [{
                    text: 'Закрыть',
                    callback_data: 'closeAlert'
                }],
            ]
        },
    };

    try {
        switch (type) {
            case 'edit':
                return ctx.editMessageMedia({
                    type: 'photo',
                    media: media,
                    caption: caption
                }, keyboard);
            case 'reply':
                return ctx.replyWithPhoto(media, {
                    ...keyboard,
                    caption: caption
                })
        }
        logg.debug(2, 'Send', 'help menu');
    } catch (error) {
        logg.error(2, `Send help menu`, error);
    }
}

export default help;