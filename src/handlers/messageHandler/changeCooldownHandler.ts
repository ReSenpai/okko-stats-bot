import { TelegrafContext } from "telegraf/typings/context";
import updateCategory from "../../database/queryes/updateCategory";
import menuEditor from "../../keyboards/menuEditor";
import cleanUpMsg from "../../shared/actions/cleanUpMsg";
import { cooldownValueValidator } from "../../shared/validators/validators";
import logg from "../../utils/logger";

const changeCooldownHandler = async (ctx: TelegrafContext) => {
    const msgText = ctx.message?.text;

    if (!(msgText)) return logg.error(2, 'changeCooldownHandler', 'ctx.message?.text undefined');

    const newCooldown = parseInt(msgText);
    
    if (!cooldownValueValidator(newCooldown)) {
        cleanUpMsg(ctx);
        ctx.reply('Неверное значение. Вы можете установить значение от 1 до 1440 (минут)');
        return;
    }
    await updateCategory({_id: ctx.session.buttonId}, {cooldown: newCooldown});
    await menuEditor(ctx, 'edit-by-id');
    cleanUpMsg(ctx);
}

export default changeCooldownHandler;