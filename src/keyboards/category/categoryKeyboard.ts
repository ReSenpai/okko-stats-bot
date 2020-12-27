import { ICategory } from "../../database/models/types";

const keyboard = (arr: Array<ICategory>) => {
    return arr.map(obj => [{
        text: obj.name,
        callback_data: obj._id,
    }])
}

export default keyboard;