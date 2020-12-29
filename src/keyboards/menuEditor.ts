import { TelegrafContext } from "telegraf/typings/context";
import getAllCategory from "../database/queryes/getAllCategory";

const menuEditor = async (ctx: TelegrafContext) => {

    const category = await getAllCategory();

    return ctx.editMessageText('Редактор меню', {
        reply_markup: {
            inline_keyboard: [
                ...category.map(obj => [{
                    text: obj.name,
                    callback_data: `edit-${obj._id}`
                }]),
                [{
                    text: 'Назад',
                    callback_data: 'back'
                }]
            ]
        }
    });
}

export default menuEditor;