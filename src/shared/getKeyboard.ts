import { ICategory } from "../database/types/types";

const keyboard = (arr: Array<ICategory>) => {
    const customButtons = [
        [{
            text: '🔄 Обновить',
            callback_data: 'update'
        }]
    ];

    const settings = [{
        text: '🔧 Настройки',
        callback_data: 'settings'
    }]
    return [
        ...customButtons, 
        ...arr.map(obj => [{
        text: obj.name,
        callback_data: obj._id,}]),
        settings
    ];
}

export default keyboard;