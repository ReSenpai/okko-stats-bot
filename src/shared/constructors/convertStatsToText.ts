import { IStatsData } from "../types/types";
import markerProvider from "./markerProvider";
import getTimeToString from "../../utils/getTimeToString";

const convertStatsToText = (data: Array<IStatsData>) => {
    const stats = data
        .sort((a, b) => b.counter - a.counter)
        .map(obj => `${markerProvider(obj.counter)} ${obj.name} : ${obj.counter}`)
        .join('\n');
    return `
    ⌛️ Что произошло за последний час?
    \n${stats}

    \n🕜 \`Состояние на ${getTimeToString()} по МСК\`
    `
}

export default convertStatsToText;