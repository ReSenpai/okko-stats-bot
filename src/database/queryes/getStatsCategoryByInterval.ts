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
        console.log(category);
        logg.debug(2, 'MongoDB find last hour category', category.length.toString());
        return category.length;
    } catch (error) {
        logg.error(2, 'MongoDB find last hour category', error);
        return [];
    }
}

export default getStatsCategoryByInterval;