import { TelegrafContext } from "telegraf/typings/context";
import mainMenu from "../../keyboards/mainMenu";
import { EAddCategoryStatus } from "../../middlewares/session";
import cleanUpMsg from "../../shared/actions/cleanUpMsg";
import forseReply from "../../shared/constructors/forseReply";
import logg from "../../utils/logger";
import createCategory from "./createCategory";

const addCategoryHandler = async (ctx: TelegrafContext) => {
    const msgText = ctx.message?.text;

    if (!msgText) return logg.error(2, 'addCategoryHandler', `ctx.message?.text ${msgText}`);

    switch (ctx.session.addCategoryStatus) {
        case EAddCategoryStatus.Name:
            ctx.session.addCategoryName = msgText.trim();
            cleanUpMsg(ctx);
            forseReply(ctx, 'Напишите временные рамки, за которые будет делаться проверка статистики, только цифры. Измерение идет в минутах. Например - 15');
            ctx.session.addCategoryStatus = EAddCategoryStatus.TimeLapse;
            break;
        case EAddCategoryStatus.TimeLapse:
            ctx.session.addCategoryTimeLapse = parseInt(msgText);
            cleanUpMsg(ctx);
            forseReply(ctx, 'Напишите лимит обращений. Например, если 10. Это будет означать, что если в поступит 10 обращйний в течение 15 минут, то у админов будет уведомление об этом');
            ctx.session.addCategoryStatus = EAddCategoryStatus.Limit;
            break;
        case EAddCategoryStatus.Limit:
            ctx.session.addCategoryLimit = parseInt(msgText);
            ctx.session.addCategoryStatus = EAddCategoryStatus.Done;
            await createCategory(ctx);
            await mainMenu(ctx, 'edit-by-id');
            cleanUpMsg(ctx);
            break;
    }
}

export default addCategoryHandler;