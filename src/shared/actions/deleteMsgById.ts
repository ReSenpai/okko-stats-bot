import { TelegrafContext } from "telegraf/typings/context";
import logg from "../../utils/logger";

const deleteMsgById = (ctx: TelegrafContext, id: number | undefined) => {
    ctx.deleteMessage(id).then(() => {
        logg.debug(2, 'Delete msg', id || '');
    }).catch(error => {
        logg.error(2, 'Delete msg', error.code);
    });
}

export default deleteMsgById;