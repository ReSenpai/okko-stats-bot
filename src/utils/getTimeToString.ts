import { config } from 'dotenv';
config();

const RESENPAI_DEV: string = process.env.RESENPAI_DEV || 'SERVER';

const getTimeToString = (date: Date = new Date()) => {
    const currentDate = RESENPAI_DEV === 'DEV'
    ? date
    : new Date(date.setHours(date.getHours() + 3)); // 3 hours ahead

    const hours: string = ('0' + currentDate.getHours()).slice(-2);
    const minutes: string = ('0' + currentDate.getUTCMinutes()).slice(-2);
    const seconds: string = ('0' + currentDate.getUTCSeconds()).slice(-2);
    const days: string = ('0' + currentDate.getDate()).slice(-2);
    const months: string = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const years: number = currentDate.getFullYear();
    return `${days}.${months}.${years}, ${hours}:${minutes}:${seconds}`;
}

export default getTimeToString;