import { CategoryStatsMdel } from '../models/categoryStatsSchema';
import logg from '../../utils/logger';

const getStatsCategoryByInterval = async (categoryId: string, interval: number = 15) => {
    const currentDate = new Date()
    const startingData = new Date();
    startingData.setMinutes(startingData.getMinutes() - interval);

    try {
        const category = await CategoryStatsMdel.find({
            createdAt: {
                $gte: startingData,
                $lt: currentDate
            },
            categoryId 
        }).select('categoryId categoryName');

        logg.debug(2, `MongoDB find category for last ${interval} minutes`, category.length.toString());
        return category.length;
    } catch (error) {
        logg.error(2, `MongoDB find category for last ${interval} minutes`, error);
        return [];
    }
}

export default getStatsCategoryByInterval;