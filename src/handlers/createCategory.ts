import { TelegrafContext } from "telegraf/typings/context";
import addCategory from "../database/queryes/addCategory";
import logg from "../utils/logger";

const createCategory = async (ctx: TelegrafContext) => {
    if (!(ctx.message?.text && ctx.from?.id)) {
        return logg.error(2, 'createCategory', `obj.message undefined`);
    }

    const categoryName = ctx.message.text.trim();
    const authorId = ctx.from.id; 

    await addCategory(categoryName, authorId);
}

export default createCategory;