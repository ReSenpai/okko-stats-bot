import logg from '../../utils/logger';
import { CategoryModel } from './../models/categorySchema';

const createCategoryObj = (name: string, сooldown: number, limit: number, authorId: number) => ({
    name,
    counter: 0,
    authorId,
    сooldown,
    limit
})

const addCategory = async (name: string, сooldown: number, limit: number, authorId: number) => {
    try {
        await new CategoryModel(createCategoryObj(name, сooldown, limit, authorId))
        .save()
        .then(() => {
            logg.debug(2, 'MongoDB add category', name);
        });
    } catch (error) {
        logg.error(2, 'MongoDB add category', error);
    }
}

export default addCategory;