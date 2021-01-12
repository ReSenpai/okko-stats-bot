import { TelegrafContext } from "telegraf/typings/context";
import logg from "../../utils/logger";

interface IEditMsgMediaOptions {
    source: string,
    filename?: string,
    caption: string
}

const editMsgMedia = (ctx: TelegrafContext, options: IEditMsgMediaOptions) => {
    try {
        ctx.editMessageMedia({
            type: 'photo',
            media: {
                source: options.source,
                filename: options.filename || ''
                
            },
            caption: options.caption,
    
        }, {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'Назад',
                        callback_data: 'help-back'
                    }]
                ]
            }
        });
        logg.debug(2, 'editMsgMedia from id', ctx.from?.id || '');
    } catch (error) {
        logg.error(2, 'editMsgMedia', error);
    }
    
}

export default editMsgMedia;