import { TelegrafContext } from "telegraf/typings/context";

export const composeValidators = (...validators: Array<Function>) => (ctx: TelegrafContext) =>
  validators.reduce((accum, validator) => accum || validator(ctx), false);


export const isPrivateChat = (ctx: TelegrafContext) => ctx.chat?.type === 'private';
export const msgTextValidator = (ctx: TelegrafContext) => ctx.message?.text ? true : false;
export const msgReplyValidator = (ctx: TelegrafContext) => ctx.message?.reply_to_message && true;
export const msgReplyTextValidator = (ctx: TelegrafContext) => {
  if (ctx.message?.reply_to_message && ctx.message.reply_to_message?.text) return true;
  return false;
}

