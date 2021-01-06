import { TelegrafContext } from "telegraf/typings/context";
import { ICategory } from "../database/types/types";
import getOneCategory from "../database/queryes/getOneCategory";
import { getAuthor } from "../utils/aliases";
import getUserInfo from "../database/queryes/getUserInfo";
import logg from "../utils/logger";

const getCategoryItemStats = async (categoryData: ICategory) => {
    const authorObj = await getUserInfo(categoryData.authorId, 'firstName lastName userName');
    let author;

    !authorObj 
    ? author = 'Информация отсутствует'
    : author = getAuthor(authorObj);
    
    return `
    ✏️ Имя кнопки: ${categoryData.name}
    \n⏱ Временные рамки ${categoryData.cooldown} (минуты)
    \n📈 Лимит ${categoryData.limit} (обращения)
    \n🧮 Была нажата раз - ${categoryData.counter}
    \n🦢 Кто создал: ${author}`;
}

const categoryItemEditor = async (ctx: TelegrafContext, objectId: string) => {
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
                    text: '⏱ Изменить временные рамки',
                    callback_data: `changeCooldown-${objectId}`
                }],
                [{
                    text: '📈 Изменить лимит',
                    callback_data: `changeLimit-${objectId}`
                }],
                [{
                    text: '⬅️ Назад',
                    callback_data: 'editMenu'
                }]
            ]
        }
    }).catch(error => {
        logg.error(2, 'categoryItemEditor', error);
    });
}

export default categoryItemEditor;