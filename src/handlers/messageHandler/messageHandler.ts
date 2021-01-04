import { msgReplyTextValidator } from '../../shared/validators/validators';
import { TelegrafContext } from "telegraf/typings/context";
import msgReplyHandler from './messageReplyHandler';

const messageHandler = async (ctx: TelegrafContext) => {
    if (msgReplyTextValidator(ctx)) {
        await msgReplyHandler(ctx);
    }
}

export default messageHandler;