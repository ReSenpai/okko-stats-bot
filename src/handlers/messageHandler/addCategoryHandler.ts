import { TelegrafContext } from "telegraf/typings/context";
import addCategory from "../../database/queryes/addCategory";
import mainMenu from "../../keyboards/mainMenu";
import cleanUpMsg from "../../shared/actions/cleanUpMsg";
import { categoryNameValidator } from "../../shared/validators/validators";
import logg from "../../utils/logger";

const addCategoryHandler = async (ctx: TelegrafContext) => {
    const msgText = ctx.message?.text;
    const authorId = ctx.from?.id; 

    if (!(msgText && authorId)) return logg.error(2, 'addCategoryHandler', `ctx.message?.text ${msgText}`);

    const categoryName = msgText.trim();

    if (!categoryNameValidator(categoryName)) {
        cleanUpMsg(ctx);
        ctx.reply('Некорректное имя. Длина имени должна быть от 1 до 50 символов');
        return;
    }

    await addCategory(categoryName, authorId);
    await mainMenu(ctx, 'edit-by-id');
    cleanUpMsg(ctx);
}

export default addCategoryHandler;