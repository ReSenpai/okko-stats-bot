import { getAuthorData } from './../utils/aliases';
import { TelegrafContext } from "telegraf/typings/context";
import addCategory from "../database/queryes/addCategory";
import logg from "../utils/logger";

const createCategory = async (ctx: TelegrafContext) => {
    if (!ctx.message?.text) return logg.error(2, 'createCategory', `obj.message undefined`);
    const categoryName = ctx.message.text.trim();
    if (categoryName.length === 0) return;
    if (!ctx.message.from) return
    const author = getAuthorData(ctx.message.from);
    await addCategory(categoryName, author);
}

export default createCategory;