import { ICategory } from "../database/models/types";

const getAccidentStats = (data: Array<ICategory>) => {
    return data
        .filter(obj => obj.counter > 0)
        .sort((a, b) => b.counter - a.counter)
        .map(obj => `${obj.name} : ${obj.counter}`)
        .join('\n');
}

export default getAccidentStats;