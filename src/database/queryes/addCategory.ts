import logg from '../../utils/logger';
import { CategoryModel } from './../models/categorySchema';

const createCategoryObj = (name: string, authorId: number) => ({
    name,
    counter: 0,
    authorId
})

const addCategory = async (name: string, authorId: number) => {
    try {
        await new CategoryModel(createCategoryObj(name, authorId))
        .save()
        .then(() => {
            logg.debug(2, 'MongoDB add category', name);
        });
    } catch (error) {
        logg.error(2, 'MongoDB add category', error);
    }
}

export default addCategory;