import Telegraf from 'telegraf';
import { TelegrafContext } from 'telegraf/typings/context';
import getAccidentStats from '../../shared/getAccidentStats';
import logg from '../../utils/logger';
import { CategoryModel } from '../models/categorySchema';
import getAllCategory from './getAllCategory';
import getMenuId from './getMenuId';

const pipeline = [{
    '$match': {
        '$or': [{ 'operationType': 'update' }],
        'updateDescription.updatedFields.counter': {
            '$gte': 0
        }       
    }
}];

const counterWatcher = async (bot: Telegraf<TelegrafContext>) => {
    // const chatId = ctx.from?.id || 0;
    const changeStream = CategoryModel.watch(pipeline);
    changeStream.on('change', async change => {
        if (change.operationType === 'update') {
            const currentCategory = await getAllCategory();
            // const msgId = await getMenuId(chatId);
            // const currentStats = getAccidentStats(currentCategory);
            console.log(currentCategory);
            // await ctx.editMessageText(currentStats);
        } 
    });
}

export default counterWatcher;