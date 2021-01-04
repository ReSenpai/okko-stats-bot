import { TelegrafContext } from "telegraf/typings/context";
import addCategory from "../../database/queryes/addCategory";
import { EAddCategoryStatus } from "../../middlewares/session";
import logg from "../../utils/logger";

const createCategory = async (ctx: TelegrafContext) => {
    if (!(ctx.message?.text && ctx.from?.id)) {
        return logg.error(2, 'createCategory', `obj.message undefined`);
    }
    if (ctx.session.addCategoryStatus = EAddCategoryStatus.Done) {
        // const categoryName = ctx.message.text.trim();
        const authorId = ctx.from.id; 
        const {addCategoryName, addCategoryTimeLapse, addCategoryLimit} = ctx.session;

        await addCategory(addCategoryName, addCategoryTimeLapse, addCategoryLimit, authorId);
        ctx.session.addCategoryStatus = null;
    }
}

export default createCategory;