import { TelegrafContext } from "telegraf/typings/context";
import { ICategory } from "../database/types/types";
import getOneCategory from "../database/queryes/getOneCategory";
import { getAuthor } from "../utils/aliases";
import getUserInfo from "../database/queryes/getUserInfo";

const getCategoryItemStats = async (categoryData: ICategory) => {
    const authorObj = await getUserInfo(categoryData.authorId, 'firstName lastName userName');
    if (!authorObj) return 'Информация отсутствует';

    const author = getAuthor(authorObj);
    return `
    📄 Имя кнопки: ${categoryData.name}
    \n🦢 Кто создал: ${author}`;
}

const categoryItemEditor = async (ctx: TelegrafContext, callbackQuery: string) => {
    const objectId = callbackQuery.replace(/^edit-/, '');
    const categoryData = await getOneCategory(objectId);
    if (!categoryData) return; // TODO: refactoring
    return ctx.editMessageText(await getCategoryItemStats(categoryData), {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: '❌ Удалить',
                    callback_data: `delete-${objectId}`
                }],
                [{
                    text: '✏️ Изменить имя',
                    callback_data: `changeName-${objectId}`
                }],
                [{
                    text: '⬅️ Назад',
                    callback_data: 'editMenu'
                }]
            ]
        }
    });
}

export default categoryItemEditor;