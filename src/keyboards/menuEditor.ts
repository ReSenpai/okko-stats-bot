import { TelegrafContext } from "telegraf/typings/context";
import getAllCategory from "../database/queryes/getAllCategory";
import editMenuInSession from "../shared/constructors/editMenuById";

type TType = 'edit' | 'edit-by-id';

const menuEditor = async (ctx: TelegrafContext, type: TType = 'edit') => {

    const category = await getAllCategory();
    const menuText = 'Редактор меню';
    const keyboard = {
        reply_markup: {
            inline_keyboard: [
                ...category.map(obj => [{
                    text: `🛠 ${obj.name}`,
                    callback_data: `edit-${obj._id}`
                }]),
                [{
                    text: '⬅️ Назад',
                    callback_data: 'settings'
                }]
            ]
        }
    }

    switch (type) {
        case 'edit': return ctx.editMessageText(menuText, keyboard);
        case 'edit-by-id': return editMenuInSession(ctx, menuText, keyboard);
    }
}

export default menuEditor;