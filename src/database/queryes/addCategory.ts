import logg from '../../utils/logger';
import { CategoryModel } from './../models/categorySchema';

const createCategoryObj = (name: string, intervalValue: number, limit: number, authorId: number) => ({
    name,
    counter: 0,
    authorId,
    intervalValue,
    limit
})

const addCategory = async (name: string, intervalValue: number, limit: number, authorId: number) => {
    try {
        await new CategoryModel(createCategoryObj(name, intervalValue, limit, authorId))
        .save()
        .then(() => {
            logg.debug(2, 'MongoDB add category', name);
        });
    } catch (error) {
        logg.error(2, 'MongoDB add category', error);
    }
}

export default addCategory;