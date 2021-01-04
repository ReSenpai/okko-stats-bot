import logg from '../../utils/logger';
import { UserModel } from '../models/userSchema';

const getUsers = async (filter: object, select: string) => {
    try {
        const users = await UserModel.find(filter).select(select);
        logg.debug(2, 'MongoDB find last hour category', '');
        return users;
    } catch (error) {
        logg.error(2, 'MongoDB find last hour category', error);
        return [];
    }
}

export default getUsers;