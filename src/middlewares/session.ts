import LocalSession from 'telegraf-session-local';

declare module 'telegraf/typings/context' {
    export interface TelegrafContext {
        session : {
            buttonId: string
            menuId: number
            chatId: number
        }
    }
}

const config = {
    database: 'sessions.json'
}

const session = () => new LocalSession(config).middleware();

export default session;
