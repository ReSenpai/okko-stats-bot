import { TelegrafContext } from "telegraf/typings/context";
import getAllCategory from "../database/queryes/getAllCategory";
import editMenuInSession from "../shared/constructors/editMenuById";
import logg from "../utils/logger";

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
        case 'edit': return ctx.editMessageText(menuText, keyboard).catch(error => {
            logg.error(2, 'menuEditor', error);
        });
        case 'edit-by-id': 
            try {
                return editMenuInSession(ctx, menuText, keyboard);
            } catch (error) {
                logg.error(2, 'menuEditor', error);
                break;
            }
    }
}

export default menuEditor;