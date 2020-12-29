import logg from '../../utils/logger';
import { CategoryModel } from './../models/categorySchema';

const deleteCategory = async (objectId: string) => {
    try {
        const deletedCategory = await CategoryModel.findByIdAndDelete(objectId);
        logg.debug(2, 'MongoDB find and delete category', deletedCategory?.name || '');
    } catch (error) {
        logg.error(2, 'MongoDB find and delete category', error);
    }
}

export default deleteCategory;