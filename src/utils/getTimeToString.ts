const getTimeToString = (date: Date = new Date()) => {
    const hours: string = ('0' + date.getHours()).slice(-2);
    const minutes: string = ('0' + date.getUTCMinutes()).slice(-2);
    const seconds: string = ('0' + date.getUTCSeconds()).slice(-2);
    const days: string = ('0' + date.getDate()).slice(-2);
    const months: string = ('0' + (date.getMonth() + 1)).slice(-2);
    const years: number = date.getFullYear();
    return `${days}.${months}.${years}, ${hours}:${minutes}:${seconds}`;
}

export default getTimeToString;