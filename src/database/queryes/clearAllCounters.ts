import logg from "../../utils/logger";
import { CategoryModel } from "../models/categorySchema";

const clearAllCounters = async () => {
    try {
        await CategoryModel.updateMany({}, { counter: 0 });
        logg.debug(2, 'MongoDB', 'clear all counter');
    } catch (error) {
        logg.error(2, 'MongoDB clear all counter', error)
    } 
}

export default clearAllCounters;