import logg from "../../utils/logger";
import { UserModel } from "../models/userSchema";

const updateMenuId = async (userId: number, menuId: number) => {
    try {
        const conditions = {userId};
        const update = {menuId};
        const options = {new: true};
        await UserModel.findOneAndUpdate(conditions, update, options).then(res => {
            logg.debug(2, 'MongoDB update menuId', `${res?.userName} : ${res?.menuId}` || '');
        });
    } catch (error) {
        logg.error(2, 'MongoDB update menuId', error)
    } 
}

export default updateMenuId;