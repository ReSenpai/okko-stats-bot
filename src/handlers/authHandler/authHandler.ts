import { TelegrafContext } from "telegraf/typings/context";
import { inputTokenText } from "../consts/replyMsgTextConsts";

const authHandler = async (ctx: TelegrafContext) => {
    ctx.reply(inputTokenText, {
        reply_markup: {
            force_reply: true
        }
    })
}

export default authHandler;