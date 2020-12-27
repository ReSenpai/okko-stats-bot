import { config } from 'dotenv';
import { Telegraf } from 'telegraf';
import addUser from './database/queryes/addUser';
import connectToDb from './database/database';
import categoryMenuHandler from './handlers/categoryMenuHandler';
import sendMenu from './handlers/start';
import createCategory from './handlers/createCategory';
import getAllCategory from './database/queryes/getAllCategory';
import { isPrivateChat } from './shared/validators/ctxValidators';
import counterWatcher from './database/queryes/counterWatcher';

config();

const TOKEN: string = process.env.TOKEN || '';

const bot = new Telegraf(TOKEN);
connectToDb();
counterWatcher(bot);

bot.start(async ctx => {
    if (!isPrivateChat(ctx)) return;
    await sendMenu(ctx);
});

bot.command('category', async ctx => {
    await createCategory(ctx);
});

bot.on('message', async msg => {
    if (msg.message?.text === 'add') {
        await addUser(msg);
    }
    
    if (msg.message?.text === 'find') {
        await getAllCategory();
    }
});

bot.on('callback_query', async query => {
    await categoryMenuHandler(query);
});

bot.launch();