import { TelegrafContext } from "telegraf/typings/context"

const forseReply = (ctx: TelegrafContext, text: string) => {
    return ctx.reply(text, {
        reply_markup: {
            force_reply: true
        },
    })
}

export default forseReply;