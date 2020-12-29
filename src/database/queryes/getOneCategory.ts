import logg from '../../utils/logger';
import { CategoryModel } from './../models/categorySchema';

const getOneCategory = async (objectId: string) => {
    try {
        const oneCategory = await CategoryModel.findById(objectId)
        logg.debug(2, 'MongoDB find one category', oneCategory?.name || '');
        return oneCategory;
    } catch (error) {
        logg.error(2, 'MongoDB find one category', error);
    }
}

export default getOneCategory;