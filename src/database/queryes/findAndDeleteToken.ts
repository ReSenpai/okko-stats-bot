import logg from "../../utils/logger";
import { tokenStoreModel } from "../models/tokenStoreSchema";

const findAndDeleteToken = async (token: string) => {
    try {
        const response = await tokenStoreModel.findOneAndDelete({token});
        logg.debug(2, 'MongoDB find and delete token', response?.token || '');
        return response?.rank;
    } catch (error) {
        logg.error(2, 'MongoDB find and delete token', error);
    } 
}

export default findAndDeleteToken;