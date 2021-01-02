import { TelegrafContext } from "telegraf/typings/context";

export const composeValidators = (...validators: Array<Function>) => (ctx: TelegrafContext) => (
  validators.reduce((accum, validator) => !validator(ctx) ? false : accum, true)
);

export const isPrivateChat = (ctx: TelegrafContext) => ctx.chat?.type === 'private';
export const msgTextValidator = (ctx: TelegrafContext) => !!ctx.message?.text;
export const msgReplyValidator = (ctx: TelegrafContext) => !!ctx.message?.reply_to_message;
export const msgReplyTextValidator = (ctx: TelegrafContext) => !!ctx.message?.reply_to_message?.text;