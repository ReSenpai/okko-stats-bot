import logg from './../../utils/logger';
import { UserModel } from './../models/userSchema';
import { TelegrafContext } from 'telegraf/typings/context';
import { getFirstName, getLastName, getUsername, getFirstAndLastName } from '../../utils/aliases';
import { User } from 'telegraf/typings/telegram-types';
import { ErrorCode } from '../types/types';
import updateUserNames from './updateUserNames';

const createUserObj = (user: User) => ({
    userId: user.id,
    firstName: getFirstName(user),
    lastName: getLastName(user),
    userName: getUsername(user),
})

const addUser = async (ctx: TelegrafContext) => {
    try {
        if (!ctx.from) throw new Error(`obj.from undefined`);
        const user = ctx.from;
        await new UserModel(createUserObj(user))
        .save()
        .then(() => {
            logg.debug(2, 'MongoDB add user', getFirstAndLastName(user) || '');
        });
    } catch (error) {
        if (error.code === ErrorCode.Duplicate) {
            await updateUserNames(ctx);
            logg.debug(2, "MongoDB didn't miss the user's duplicate", error.keyValue.userId);
            return;
        }
        logg.error(2, 'MongoDB add user', error);
    } 
}

export default addUser;