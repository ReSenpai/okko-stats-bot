import { TelegrafContext } from "telegraf/typings/context";

export const isPrivateChat = (ctx: TelegrafContext) => ctx.chat?.type === 'private';