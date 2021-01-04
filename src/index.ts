import { config } from 'dotenv';
import { Telegraf } from 'telegraf';
import connectToDb from './database/database';
import categoryMenuHandler from './handlers/callbackQueryHandler';
import startHandler from './handlers/startHandler';
import { composeValidators, isPrivateChat, isSuperAdmin, msgTextValidator } from './shared/validators/validators';
import messageHandler from './handlers/messageHandler';
import session from './middlewares/session';
import getTokenHandler from './handlers/getTokenHandler';
import authHandler from './handlers/authHandler';
import getStatsCategoryByInterval from './database/queryes/getStatsCategoryByInterval';



config();

const TOKEN: string = process.env.TOKEN || '';
const PORT: string = process.env.PORT || '';

const bot = new Telegraf(TOKEN, {

});
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
    // if (ctx.message?.text === 'find') {
    //     await getStatsCategoryByInterval('5ff0fcd63985e507c819922b');
    // }
    if (!composeValidators(isPrivateChat, msgTextValidator)(ctx)) return;
    await messageHandler(ctx);
});

bot.on('callback_query', async ctx => {
    await categoryMenuHandler(ctx);
});

bot.launch();