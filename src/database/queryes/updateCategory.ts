import logg from "../../utils/logger";
import { CategoryModel } from "../models/categorySchema";

const updateCategory = async (objectId: string, name: string) => {
    try {
        const conditions = {_id: objectId};
        const update = {name};
        await CategoryModel.findOneAndUpdate(conditions, update).then(res => {
            logg.debug(2, 'MongoDB update category name', `${res?.name} to ${name}` || '');
        });
    } catch (error) {
        logg.error(2, 'MongoDB update category name', error);
    } 
}

export default updateCategory;