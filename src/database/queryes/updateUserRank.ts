import logg from '../../utils/logger';
import { UserModel } from '../models/userSchema';
import { TelegrafContext } from 'telegraf/typings/context';
import { ERanks } from '../types/types';

const updateUserRank = async (ctx: TelegrafContext, rank: ERanks) => {
    try {
        if (!ctx.from) throw new Error(`obj.from undefined`);
        const conditions = {userId: ctx.from.id};
        const update = {rank};
        await UserModel.findOneAndUpdate(conditions, update);
        logg.debug(2, "MongoDB update user rank", rank);
    } catch (error) {
        logg.error(2, 'MongoDB update user rank', error);
    } 
}

export default updateUserRank;