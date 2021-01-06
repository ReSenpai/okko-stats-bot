import { TelegrafContext } from "telegraf/typings/context";
import getUserInfo from "../../database/queryes/getUserInfo";
import { ERanks } from "../../database/types/types";

export const composeValidators = (...validators: Array<Function>) => (ctx: TelegrafContext) => (
  validators.reduce((accum, validator) => !validator(ctx) ? false : accum, true)
);

export const isPrivateChat = (ctx: TelegrafContext) => ctx.chat?.type === 'private';
export const isSuperAdmin = async (ctx: TelegrafContext) => {
  const userId = ctx.from?.id;
  if (!userId) return false
  const res = await getUserInfo(userId, 'rank');
  return res?.rank === ERanks.SuperAdmin;
}
export const cooldownValueValidator = (value: number) => (value > 0 && value <= 1440);
export const limitValueValidator = (value: number) => (value > 0 && value <= 50);
export const categoryNameValidator = (name: string) => (name.length > 0 && name.length <= 50);

export const msgTextValidator = (ctx: TelegrafContext) => !!ctx.message?.text;
export const msgReplyValidator = (ctx: TelegrafContext) => !!ctx.message?.reply_to_message;
export const msgReplyTextValidator = (ctx: TelegrafContext) => !!ctx.message?.reply_to_message?.text;