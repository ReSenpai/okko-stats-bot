import { TelegrafContext } from "telegraf/typings/context";
import addTokenToStore from "../../database/queryes/addTokenToStore";
import { ERanks } from "../../database/types/types";
import tokenGenerator from "../../utils/tokenGenerator";

const getTokenHandler = async (ctx: TelegrafContext) => {
    const token = tokenGenerator(ERanks.Admin);
    const duplicate = await addTokenToStore(token);
    if (duplicate) {
        ctx.reply('Вы счастливчик 1 на миллион! Вам удалось сгенерировать токен, который уже есть в базе данных. Попробуйте еще раз)');
    } else {
        ctx.reply(`\`${token}\``, {parse_mode: 'Markdown'});
    }
}

export default getTokenHandler;