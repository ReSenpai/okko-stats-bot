import { limitValueValidator } from './../../shared/validators/validators';
import { TelegrafContext } from "telegraf/typings/context";
import updateCategory from "../../database/queryes/updateCategory";
import menuEditor from "../../keyboards/menuEditor";
import cleanUpMsg from "../../shared/actions/cleanUpMsg";
import logg from "../../utils/logger";

const changeLimitHandler = async (ctx: TelegrafContext) => {
    const msgText = ctx.message?.text;

    if (!(msgText)) return logg.error(2, 'changeLimitHandler', 'ctx.message?.text undefined');

    const newLimit = parseInt(msgText);
    
    if (!limitValueValidator(newLimit)) {
        cleanUpMsg(ctx);
        ctx.reply('Неверное значение. Вы можете установить значение от 1 до 50');
        return;
    }
    await updateCategory({_id: ctx.session.buttonId}, {limit: newLimit});
    await menuEditor(ctx, 'edit-by-id');
    cleanUpMsg(ctx);
}

export default changeLimitHandler;