import logg from '../../utils/logger';
import { CategoryModel } from './../models/categorySchema';

const createCategoryObj = (name: string) => ({
    name,
    counter: 0
})

const addCategory = async (name: string) => {
    try {
        await new CategoryModel(createCategoryObj(name))
        .save()
        .then(() => {
            logg.debug(2, 'MongoDB add category', name);
        });
    } catch (error) {
        logg.error(2, 'MongoDB add category', error);
    }
}

export default addCategory;