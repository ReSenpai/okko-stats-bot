import { config } from 'dotenv';
import { Telegraf } from 'telegraf';
import connectToDb from './database/database';
import { composeValidators, isPrivateChat, isSuperAdmin, msgTextValidator } from './shared/validators/validators';
import session from './middlewares/session';
import { authHandler, callbackQueryHandler, getTokenHandler, messageHandler, startHandler } from './handlers';

config();

const TOKEN: string = process.env.TOKEN || '';

const bot = new Telegraf(TOKEN);
bot.use(session());

connectToDb();

bot.start(async ctx => {
    if (!isPrivateChat(ctx)) return;
    await startHandler(ctx); 
});

bot.command('get_token', async ctx => {
    if (!(await isSuperAdmin(ctx) && isPrivateChat(ctx))) {
        return ctx.reply('Недостаточно прав 😔');
    }
    await getTokenHandler(ctx);
});

bot.command('auth', async ctx => {
    if (!isPrivateChat(ctx)) return;
    await authHandler(ctx);
});

bot.on('message', async ctx => {
    if (!composeValidators(isPrivateChat, msgTextValidator)(ctx)) return;
    await messageHandler(ctx);
});

bot.on('callback_query', async ctx => {
    await callbackQueryHandler(ctx);
});

bot.launch();