import { TelegrafContext } from "telegraf/typings/context";
import deleteMsgById from "./deleteMsgById";

const cleanUpMsg = (ctx: TelegrafContext) => {
    const replyMsgId = ctx.message?.reply_to_message?.message_id;
    const msgId = ctx.message?.message_id;
    deleteMsgById(ctx, replyMsgId);
    deleteMsgById(ctx, msgId);
}

export default cleanUpMsg;