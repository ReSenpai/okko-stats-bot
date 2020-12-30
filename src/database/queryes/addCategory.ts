import logg from '../../utils/logger';
import { CategoryModel } from './../models/categorySchema';
import { TAuthor } from '../types/types';

const createCategoryObj = (name: string, author: TAuthor) => ({
    name,
    counter: 0,
    author: {
        ...author
    }
})

const addCategory = async (name: string, author: TAuthor) => {
    try {
        await new CategoryModel(createCategoryObj(name, author))
        .save()
        .then(() => {
            logg.debug(2, 'MongoDB add category', name);
        });
    } catch (error) {
        logg.error(2, 'MongoDB add category', error);
    }
}

export default addCategory;