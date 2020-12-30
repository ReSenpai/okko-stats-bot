import { config } from 'dotenv';
import { Telegraf } from 'telegraf';
import addUser from './database/queryes/addUser';
import connectToDb from './database/database';
import categoryMenuHandler from './handlers/callbackQueryHandler';
import sendMenu from './handlers/start';
import { composeValidators, isPrivateChat, msgTextValidator } from './shared/validators/ctxValidators';
import messageHandler from './handlers/messageHandler';
import session from './middlewares/session';

config();

const TOKEN: string = process.env.TOKEN || '';

const bot = new Telegraf(TOKEN);
bot.use(session());

connectToDb();


bot.start(async ctx => {
    if (!isPrivateChat(ctx)) return;
    await addUser(ctx);
    await sendMenu(ctx); 
});

bot.on('message', async ctx => {
    if (!composeValidators(isPrivateChat, msgTextValidator)(ctx)) return;
    await messageHandler(ctx);
});

bot.on('callback_query', async query => {
    await categoryMenuHandler(query);
});

bot.launch();