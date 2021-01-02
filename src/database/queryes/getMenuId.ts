import logg from "../../utils/logger";
import { UserModel } from "../models/userSchema";

const getMenuId = async (userId: number) => {
    try {
        const response = await UserModel.findOne({userId}).select('menuId');
        logg.debug(2, 'MongoDB get menuId', response?.menuId || '');
        return response?.menuId;
    } catch (error) {
        logg.error(2, 'MongoDB get menuId', error);
    } 
}

export default getMenuId;