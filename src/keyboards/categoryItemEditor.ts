import { TelegrafContext } from "telegraf/typings/context";
import { ICategory } from "../database/models/types";
import getOneCategory from "../database/queryes/getOneCategory";
import { getAuthor } from "../utils/aliases";

const getCategoryItemStats = (categoryData: ICategory) => {
    console.log(getAuthor(categoryData.author))
    return `
Название: ${categoryData.name}
Автор   : ${getAuthor(categoryData.author)}
    `
}

const categoryItemEditor = async (ctx: TelegrafContext, callbackQuery: string) => {
    const objectId = callbackQuery.replace(/^edit-/, '');
    const categoryData = await getOneCategory(objectId);
    if (!categoryData) return; // TODO: refactoring
    return ctx.editMessageText(getCategoryItemStats(categoryData), {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Удалить',
                    callback_data: `delete-${objectId}`
                }],
                [{
                    text: 'Назад',
                    callback_data: 'back'
                }]
            ]
        }
    });
}

export default categoryItemEditor;