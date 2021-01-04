import logg from './../../utils/logger';
import { TelegrafContext } from 'telegraf/typings/context';
import { CategoryStatsMdel } from '../models/categoryStatsSchema';
import getOneCategory from './getOneCategory';

const createCategoryStatsObj = async (ctx: TelegrafContext, categoryId: string) => {
    const res = await getOneCategory(categoryId);
    if (!res) return {};
    return {
        authorClickId: ctx.from?.id,
        categoryId,
        categoryName: res.name
    }
}

const addCategoryStats = async (ctx: TelegrafContext, categoryId: string) => {
    try {
        await new CategoryStatsMdel(await createCategoryStatsObj(ctx, categoryId))
        .save()
        .then(() => {
            logg.debug(2, 'Add category stats', categoryId);
        });
    } catch (error) {
        logg.error(2, 'Add category stats', error);
    } 
}

export default addCategoryStats;