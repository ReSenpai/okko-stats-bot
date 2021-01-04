import LocalSession from 'telegraf-session-local';

export enum EAddCategoryStatus {
    Name = 'name',
    TimeLapse = 'timeLapse',
    Limit = 'limit',
    Done = 'done'
}

declare module 'telegraf/typings/context' {
    export interface TelegrafContext {
        session : {
            buttonId: string
            menuId: number
            chatId: number
            addCategoryStatus: EAddCategoryStatus | null
            addCategoryName: string
            addCategoryTimeLapse: number
            addCategoryLimit: number
        }
    }
}

const config = {
    database: 'sessions.json'
}

const session = () => new LocalSession(config).middleware();

export default session;
