import { TelegrafContext } from "telegraf/typings/context";
import help from "../../keyboards/help";
import editMsgMedia from "../../shared/actions/editMsgMedia";
import helpText from "../../shared/textDesk/helpText";

const helpCbQueryHandler = (ctx: TelegrafContext, helpCase: string) => {
    switch (helpCase) {
        case 'mainMenu':
            editMsgMedia(ctx, {
                source: 'src/assets/mainMenu.png',
                caption: helpText.aboutMainMenu
            });
            break;
        case 'auth':
            editMsgMedia(ctx, {
                source: 'src/assets/auth.png',
                caption: helpText.auth
            });
            break;
        case 'addButton':
            editMsgMedia(ctx, {
                source: 'src/assets/addButton.png',
                caption: helpText.addButton
            });
            break;
        case 'buttonEditor':
            editMsgMedia(ctx, {
                source: 'src/assets/buttonEditor.png',
                caption: helpText.buttonEditor
            });
            break;
        case 'getToken':
            editMsgMedia(ctx, {
                source: 'src/assets/getToken.png',
                caption: helpText.getToken
            });
            break;
        case 'alerts':
            editMsgMedia(ctx, {
                source: 'src/assets/alerts.png',
                caption: helpText.alerts
            });
            break;
        case 'back':
            help(ctx);
            break;
    }
}

export default helpCbQueryHandler;