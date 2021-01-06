import { TelegrafContext } from "telegraf/typings/context";
import logg from "../utils/logger";

const alert = async (ctx: TelegrafContext, userId: number, text: string) => {
    try {
        ctx.telegram.sendMessage(userId, text, {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'Закрыть',
                        callback_data: 'closeAlert'
                    }]
                ]
            },
            parse_mode: "Markdown"
        })
        logg.debug(2, 'Send alert', text);
    } catch (error) {
        logg.error(2, `Send alert ${text}`, error);
    }
}

export default alert;