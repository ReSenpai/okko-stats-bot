import { TelegrafContext } from "telegraf/typings/context";
import addCategoryStats from "../../database/queryes/addCategoryStats";
import getOneCategory from "../../database/queryes/getOneCategory";
import getStatsCategoryByInterval from "../../database/queryes/getStatsCategoryByInterval";
import getUsers from "../../database/queryes/getUsers";
import increaseCounter from "../../database/queryes/increaseCounter";
import mainMenu from "../../keyboards/mainMenu";
import logg from "../../utils/logger";

const voteCbQueryHandler = async (ctx: TelegrafContext) => {
    const callbackQuery = ctx.update.callback_query?.data;
    if (!callbackQuery) return logg.error(2, 'categoryMenu', `obj.from undefined`);

    const categoryId = callbackQuery.replace(/^vote-/, '');
    await addCategoryStats(ctx, categoryId);
    await increaseCounter(categoryId); // TODO: Delete?
    const category = await getOneCategory(categoryId);
    if (category) {
        const {intervalValue, limit, name} = category;
        const currentValue = await getStatsCategoryByInterval(categoryId, intervalValue);
        if (currentValue >= limit) {
            const users = await getUsers({
                rank: {
                    $regex: /Admin/
                }
            }, 'userId');
            users.forEach(user => {
                ctx.telegram.sendMessage(user.userId, `Поступило более ${currentValue} обращений за последние ${intervalValue} минут по категории : ${name}`)
            })
        }
    }
    
    ctx.answerCbQuery('Голос записан 🥰');
    await mainMenu(ctx);
}

export default voteCbQueryHandler;