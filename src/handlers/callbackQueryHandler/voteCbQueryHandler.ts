import { TelegrafContext } from "telegraf/typings/context";
import addCategoryStats from "../../database/queryes/addCategoryStats";
import getOneCategory from "../../database/queryes/getOneCategory";
import getStatsCategoryByInterval from "../../database/queryes/getStatsCategoryByInterval";
import getUsers from "../../database/queryes/getUsers";
import increaseCounter from "../../database/queryes/increaseCounter";
import updateCategory from "../../database/queryes/updateCategory";
import alert from "../../keyboards/alert";
import mainMenu from "../../keyboards/mainMenu";
import getTimeDiff from "../../shared/actions/getTimeDiff";
import getTimeToString from "../../utils/getTimeToString";
import logg from "../../utils/logger";

const voteCbQueryHandler = async (ctx: TelegrafContext) => {
    const callbackQuery = ctx.update.callback_query?.data;
    if (!callbackQuery) return logg.error(2, 'categoryMenu', `obj.from undefined`);

    const categoryId = callbackQuery.replace(/^vote-/, '');
    await addCategoryStats(ctx, categoryId);
    await increaseCounter(categoryId); // TODO: Delete?
    const category = await getOneCategory(categoryId);
    if (category) {
        const {timeSnapshot, limit, name, cooldown, multiplier} = category;
        const currentValue = await getStatsCategoryByInterval(categoryId, cooldown);

        const alertText = (emoji: string) => `
        ${emoji.repeat(1)} ${currentValue} обращений за последние ${cooldown} минут ${emoji.repeat(1)} 
        \n📜 ${name}
        \n🕜 \`Состояние на ${getTimeToString()} по МСК\`
        `
        const mailing = async (emoji: string) => {
            const filter = {rank: {$regex: /Admin/}};
    
            const users = await getUsers(filter, 'userId');
            users.forEach(user => {
                alert(ctx, user.userId, alertText(emoji));
            })
        }

        const cooldownIsDone = timeSnapshot && getTimeDiff(timeSnapshot) > cooldown * 60;

        const exceedingLimit = async (mult: number) => {
            if (currentValue >= (limit * mult)) {
                await updateCategory({_id: categoryId}, {timeSnapshot: new Date(), multiplier: multiplier + 0.5});
                await mailing('🆘');
            }
        }

        if (cooldownIsDone) {
            await updateCategory({_id: categoryId}, {multiplier: 1});
            await exceedingLimit(1);
        } else {
            await exceedingLimit(multiplier);
        }
    }
    
    ctx.answerCbQuery('Голос записан 🥰');
    await mainMenu(ctx);
}

export default voteCbQueryHandler;