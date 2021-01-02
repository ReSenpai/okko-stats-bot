import logg from '../../utils/logger';
import { tokenStoreModel } from '../models/tokenStoreSchema';
import { ErrorCode } from '../types/types';

const createTokenObj = (token: string) => ({
    token,
    rank: token.split(':')[1]
});

const addTokenToStore = async (token: string) => {
    try {
        await new tokenStoreModel(createTokenObj(token)).save();
        logg.debug(2, 'MongoDB add token to store', token);
    } catch (error) {
        if (error.code === ErrorCode.Duplicate) {
            logg.debug(2, "MongoDB didn't miss the token duplicate", token);
            return true;
        }
        logg.error(2, 'MongoDB add token to store', error);
    }
}

export default addTokenToStore;