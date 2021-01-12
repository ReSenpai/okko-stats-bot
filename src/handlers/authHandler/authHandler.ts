import { TelegrafContext } from "telegraf/typings/context";
import { inputTokenText } from "../../shared/textDesk/replyMsgTextConsts";

const authHandler = async (ctx: TelegrafContext) => {
    ctx.reply(inputTokenText, {
        reply_markup: {
            force_reply: true
        }
    })
}

export default authHandler;