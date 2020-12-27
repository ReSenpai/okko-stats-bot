import logg from './../../utils/logger';
import { UserModel } from './../models/userSchema';
import { TelegrafContext } from 'telegraf/typings/context';
import { getFirstName, getLastName, getUsername, getFirstAndLastName } from '../../utils/aliases';
import { User } from 'telegraf/typings/telegram-types';

const createUserObj = (user: User) => ({
    userId: user.id,
    rank: 'admin',
    firstName: getFirstName(user),
    lastName: getLastName(user),
    userName: getUsername(user),
    menuId: 0,
    token: 'testToken'
})

const addUser = async (ctx: TelegrafContext) => {
    try {
        if (!ctx.from) throw new Error(`obj.from undefined`);
        const user = ctx.from;
        await new UserModel(createUserObj(user))
        .save()
        .then(() => {
            logg.debug(2, 'MongoDB add user', getFirstAndLastName(user));
        });
    } catch (error) {
        logg.error(2, 'MongoDB add user', error)
    } 
}

export default addUser;