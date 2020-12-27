import logg from '../../utils/logger';
import { CategoryModel } from '../models/categorySchema';

const increaseCounter = async (id: string) => {
    try {
        const conditions = {_id :id};
        const update = {$inc : {counter : 1}};
        const options = {new: true};
        await CategoryModel.findOneAndUpdate(conditions, update, options).then(res => {
            logg.debug(2, 'MongoDB increase counter', `${res?.name} : ${res?.counter}` || '');
        });
    } catch (error) {
        logg.error(2, 'MongoDB increase counter', error)
    } 
}

export default increaseCounter;