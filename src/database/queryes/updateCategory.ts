import logg from "../../utils/logger";
import { CategoryModel } from "../models/categorySchema";

const updateCategory = async (conditions: object, update: object) => {
    try {
        await CategoryModel.findOneAndUpdate(conditions, update).then(res => {
            logg.debug(
                2, 
                'MongoDB update category', 
                `${JSON.stringify(res)} to ${JSON.stringify(update)}` || '');
        });
    } catch (error) {
        logg.error(2, 'MongoDB update category', error);
    } 
}

export default updateCategory;