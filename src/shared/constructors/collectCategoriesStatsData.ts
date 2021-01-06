import { ICategoryStats } from '../../database/types/types';
import logg from '../../utils/logger';
import { IStatsData } from '../types/types';

const collectCategoriesStatsData = (arr: Array<ICategoryStats>): Array<IStatsData> => {
    try {
        const object: any = {};

        arr.forEach(obj => {
            if(!object[obj.categoryId]) {
                object[obj.categoryId] = {};
                object[obj.categoryId].name = obj.categoryName;
                object[obj.categoryId].counter = 1;
            } else {
                object[obj.categoryId].name = obj.categoryName;
                object[obj.categoryId].counter++;
            }
            
        })

        return Object.keys(object).map(id => ({
            name: object[id].name,
            counter: object[id].counter
        }));
    } catch (error) {
        logg.error(2, 'collectCategoriesStatsData', error);
        return [];
    }
}

export default collectCategoriesStatsData;