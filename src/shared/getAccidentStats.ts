import { ICategory } from "../database/types/types";

const getAccidentStats = (data: Array<ICategory>) => {
    const stats = data
        .filter(obj => obj.counter > 0)
        .sort((a, b) => b.counter - a.counter)
        .map(obj => `${obj.name} : ${obj.counter}`)
        .join('\n');
    return stats  || 'Пусто';
}

export default getAccidentStats;