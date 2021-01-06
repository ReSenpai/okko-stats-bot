import { CategoryStatsMdel } from '../models/categoryStatsSchema';
import logg from '../../utils/logger';

const getAllCategoriesLastHour = async () => {
    const currentDate = new Date()
    const startingData = new Date();
    startingData.setMinutes(startingData.getMinutes() - 60);

    try {
        const category = await CategoryStatsMdel.find({
            createdAt: {
                $gte: startingData,
                $lt: currentDate
            } 
        }).select('categoryId categoryName');
        logg.debug(2, `MongoDB find all category for last hour`, category.length.toString());
        return category;
    } catch (error) {
        logg.error(2, `MongoDB find all category for last hour`, error);
        return [];
    }
}

export default getAllCategoriesLastHour;