import { TelegrafContext } from "telegraf/typings/context";

const authHandler = async (ctx: TelegrafContext) => {
    ctx.reply('Введите токен', {
        reply_markup: {
            force_reply: true
        }
    })
}

export default authHandler;