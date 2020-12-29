import { config } from 'dotenv';
import { Telegraf } from 'telegraf';
import addUser from './database/queryes/addUser';
import connectToDb from './database/database';
import categoryMenuHandler from './handlers/categoryMenuHandler';
import sendMenu from './handlers/start';
import createCategory from './handlers/createCategory';
import getAllCategory from './database/queryes/getAllCategory';
import { isPrivateChat } from './shared/validators/ctxValidators';

config();

const TOKEN: string = process.env.TOKEN || '';

const bot = new Telegraf(TOKEN);

connectToDb();


bot.start(async ctx => {
    if (!isPrivateChat(ctx)) return;
    await addUser(ctx);
    await sendMenu(ctx);
});


bot.on('message', async ctx => {
    if (ctx.message?.reply_to_message?.text === 'Напишите название кнопки') {
        await createCategory(ctx);
        ctx.deleteMessage(ctx.message.reply_to_message.message_id);
        ctx.deleteMessage(ctx.message.message_id);
        ctx.reply('Записал');
    }
});

bot.on('callback_query', async query => {
    await categoryMenuHandler(query);
});

bot.launch();