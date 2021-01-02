import logg from "../../utils/logger";
import { UserModel } from "../models/userSchema";

const getUserInfo = async (userId: number, options: string) => {
    try {
        const response = await UserModel.findOne({userId}).select(options);
        logg.debug(2, 'MongoDB get userInfo', options);
        return response;
    } catch (error) {
        logg.error(2, 'MongoDB get userInfo', error);
    } 
}

export default getUserInfo;