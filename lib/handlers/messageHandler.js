"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validators_1 = require("../shared/validators/validators");
var updateCategory_1 = __importDefault(require("../database/queryes/updateCategory"));
var createCategory_1 = __importDefault(require("./createCategory"));
var logger_1 = __importDefault(require("../utils/logger"));
var menuEditor_1 = __importDefault(require("../keyboards/menuEditor"));
var mainMenu_1 = __importDefault(require("../keyboards/mainMenu"));
var deleteMsgById_1 = __importDefault(require("../shared/actions/deleteMsgById"));
var findAndDeleteToken_1 = __importDefault(require("../database/queryes/findAndDeleteToken"));
var updateUserRank_1 = __importDefault(require("../database/queryes/updateUserRank"));
var getUserInfo_1 = __importDefault(require("../database/queryes/getUserInfo"));
var types_1 = require("../database/types/types");
var msgReplyHandler = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var replyMsgText, msgText, userId, replyMsgId, msgId, cleanUpMsg, _a, oldRank, newRank;
    var _b, _c, _d, _e, _f, _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                replyMsgText = (_c = (_b = ctx.message) === null || _b === void 0 ? void 0 : _b.reply_to_message) === null || _c === void 0 ? void 0 : _c.text;
                msgText = (_d = ctx.message) === null || _d === void 0 ? void 0 : _d.text;
                userId = (_e = ctx.from) === null || _e === void 0 ? void 0 : _e.id;
                replyMsgId = (_g = (_f = ctx.message) === null || _f === void 0 ? void 0 : _f.reply_to_message) === null || _g === void 0 ? void 0 : _g.message_id;
                msgId = (_h = ctx.message) === null || _h === void 0 ? void 0 : _h.message_id;
                cleanUpMsg = function () {
                    deleteMsgById_1.default(ctx, replyMsgId);
                    deleteMsgById_1.default(ctx, msgId);
                };
                if (!(msgText && userId))
                    return [2 /*return*/, logger_1.default.error(2, 'messageHandler', 'ctx.message?.text undefined')];
                _a = replyMsgText;
                switch (_a) {
                    case 'Напишите название кнопки': return [3 /*break*/, 1];
                    case 'Напишите новое имя для кнопки': return [3 /*break*/, 4];
                    case 'Введите токен': return [3 /*break*/, 7];
                }
                return [3 /*break*/, 14];
            case 1: return [4 /*yield*/, createCategory_1.default(ctx)];
            case 2:
                _j.sent();
                return [4 /*yield*/, mainMenu_1.default(ctx, 'edit-by-id')];
            case 3:
                _j.sent();
                cleanUpMsg();
                return [3 /*break*/, 14];
            case 4: return [4 /*yield*/, updateCategory_1.default(ctx.session.buttonId, msgText)];
            case 5:
                _j.sent();
                return [4 /*yield*/, menuEditor_1.default(ctx, 'edit-by-id')];
            case 6:
                _j.sent();
                cleanUpMsg();
                return [3 /*break*/, 14];
            case 7: return [4 /*yield*/, getUserInfo_1.default(userId, 'rank')];
            case 8:
                oldRank = _j.sent();
                return [4 /*yield*/, findAndDeleteToken_1.default(msgText)];
            case 9:
                newRank = _j.sent();
                if (!newRank) {
                    cleanUpMsg();
                    ctx.reply("\u041D\u0435\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0439 \u0442\u043E\u043A\u0435\u043D \uD83D\uDEAB");
                    return [2 /*return*/];
                }
                if (!(oldRank && oldRank.rank === types_1.ERanks.SuperAdmin)) return [3 /*break*/, 10];
                ctx.reply("\u0423 \u0432\u0430\u0441 \u0443\u0436\u0435 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u043D\u0433 - \uD83D\uDC51 " + types_1.ERanks.SuperAdmin + " \uD83D\uDC51. \n\u0410 \u044D\u0442\u043E\u0442 \u0442\u043E\u043A\u0435\u043D \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D, \u0434\u043B\u044F \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \uD83D\uDE09");
                return [3 /*break*/, 13];
            case 10:
                if (!(oldRank && oldRank.rank === newRank)) return [3 /*break*/, 11];
                ctx.reply("\u0412\u044B \u0443\u0436\u0435 \u0438\u043C\u0435\u0435\u0442 \u0440\u0430\u043D\u0433 \uD83D\uDC51 " + newRank + " \uD83D\uDC51. \n\u0410 \u044D\u0442\u043E\u0442 \u0442\u043E\u043A\u0435\u043D \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D, \u0434\u043B\u044F \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \uD83D\uDE09");
                return [3 /*break*/, 13];
            case 11: return [4 /*yield*/, updateUserRank_1.default(ctx, newRank)];
            case 12:
                _j.sent();
                ctx.reply("\u0422\u043E\u043A\u0435\u043D \u043F\u043E\u043B\u0443\u0447\u0435\u043D. \n\u0412\u0430\u0448 \u043D\u043E\u0432\u044B\u0439 \u0440\u0430\u043D\u0433 - \uD83D\uDC51 " + newRank + " \uD83D\uDC51");
                _j.label = 13;
            case 13:
                cleanUpMsg();
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); };
var messageHandler = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!validators_1.msgReplyTextValidator(ctx)) return [3 /*break*/, 2];
                return [4 /*yield*/, msgReplyHandler(ctx)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
exports.default = messageHandler;
