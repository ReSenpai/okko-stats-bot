import getAllCategory from "../database/queryes/getAllCategory";
import getAccidentStats from "./getAccidentStats";
import keyboard from "./getKeyboard";

const getMenuData = async () => {
    const keyboardData = await getAllCategory();
    const stats = getAccidentStats(keyboardData);
    const kb = {
        reply_markup: {
            inline_keyboard: keyboard(keyboardData),
        }
    };
    return {stats , kb};
}

export default getMenuData;