import logg from '../../utils/logger';
import { UserModel } from '../models/userSchema';
import { TelegrafContext } from 'telegraf/typings/context';
import { getFirstName, getLastName, getUsername } from '../../utils/aliases';
import { User } from 'telegraf/typings/telegram-types';

const createNamesObj = (user: User) => ({
    firstName: getFirstName(user) || undefined,
    lastName: getLastName(user) || undefined,
    userName: getUsername(user) || undefined,
})

const updateUserNames = async (ctx: TelegrafContext) => {
    try {
        if (!ctx.from) throw new Error(`obj.from undefined`);
        const conditions = {userId: ctx.from.id};
        const update = createNamesObj(ctx.from);
        await UserModel.findOneAndUpdate(conditions, update);
        logg.debug(2, "MongoDB update user names", update.firstName || '');
    } catch (error) {
        logg.error(2, 'MongoDB update user names', error);
    } 
}

export default updateUserNames;