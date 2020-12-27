import logg from '../../utils/logger';
import { CategoryModel } from './../models/categorySchema';

const getAllCategory = async () => {
    try {
        const category = await CategoryModel.find({}).select('_id counter name');
        logg.debug(2, 'MongoDB find all category', category.length.toString());
        return category;
    } catch (error) {
        logg.error(2, 'MongoDB find all categoryy', error);
        return [];
    }
}

export default getAllCategory;