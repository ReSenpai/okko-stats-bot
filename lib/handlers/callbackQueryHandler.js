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
var clearAllCounters_1 = __importDefault(require("../database/queryes/clearAllCounters"));
var deleteCategory_1 = __importDefault(require("../database/queryes/deleteCategory"));
var increaseCounter_1 = __importDefault(require("../database/queryes/increaseCounter"));
var categoryItemEditor_1 = __importDefault(require("../keyboards/categoryItemEditor"));
var menuEditor_1 = __importDefault(require("../keyboards/menuEditor"));
var settings_1 = __importDefault(require("../keyboards/settings"));
var forseReply_1 = __importDefault(require("../shared/constructors/forseReply"));
var mainMenu_1 = __importDefault(require("../keyboards/mainMenu"));
var logger_1 = __importDefault(require("../utils/logger"));
var addCategoryStats_1 = __importDefault(require("../database/queryes/addCategoryStats"));
var categoryMenuHandler = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var callbackQuery, _a, categoryId, objectId;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!((_b = ctx.update.callback_query) === null || _b === void 0 ? void 0 : _b.data))
                    return [2 /*return*/, logger_1.default.error(2, 'categoryMenu', "obj.from undefined")];
                callbackQuery = ctx.update.callback_query.data;
                _a = callbackQuery;
                switch (_a) {
                    case 'update': return [3 /*break*/, 1];
                    case /^vote-\w+/i.test(callbackQuery) && callbackQuery: return [3 /*break*/, 3];
                    case 'settings': return [3 /*break*/, 7];
                    case 'cleanStats': return [3 /*break*/, 8];
                    case 'editMenu': return [3 /*break*/, 11];
                    case /^edit-\w+/i.test(callbackQuery) && callbackQuery: return [3 /*break*/, 13];
                    case /^delete-\w+/i.test(callbackQuery) && callbackQuery: return [3 /*break*/, 15];
                    case /^changeName-\w+/i.test(callbackQuery) && callbackQuery: return [3 /*break*/, 18];
                    case 'addCategory': return [3 /*break*/, 19];
                    case 'back': return [3 /*break*/, 20];
                }
                return [3 /*break*/, 22];
            case 1: return [4 /*yield*/, mainMenu_1.default(ctx)];
            case 2:
                _c.sent();
                return [3 /*break*/, 23];
            case 3:
                categoryId = callbackQuery.replace(/^vote-/, '');
                return [4 /*yield*/, addCategoryStats_1.default(ctx, categoryId)];
            case 4:
                _c.sent();
                return [4 /*yield*/, increaseCounter_1.default(categoryId)];
            case 5:
                _c.sent();
                ctx.answerCbQuery('Голос записан 🥰');
                return [4 /*yield*/, mainMenu_1.default(ctx)];
            case 6:
                _c.sent();
                return [3 /*break*/, 23];
            case 7:
                settings_1.default(ctx);
                return [3 /*break*/, 23];
            case 8: return [4 /*yield*/, clearAllCounters_1.default()];
            case 9:
                _c.sent();
                ctx.answerCbQuery('Статистика удалена');
                return [4 /*yield*/, mainMenu_1.default(ctx)];
            case 10:
                _c.sent();
                return [3 /*break*/, 23];
            case 11: return [4 /*yield*/, menuEditor_1.default(ctx)];
            case 12:
                _c.sent();
                return [3 /*break*/, 23];
            case 13: return [4 /*yield*/, categoryItemEditor_1.default(ctx, callbackQuery)];
            case 14:
                _c.sent();
                return [3 /*break*/, 23];
            case 15:
                objectId = callbackQuery.replace(/^delete-/, '');
                return [4 /*yield*/, deleteCategory_1.default(objectId)];
            case 16:
                _c.sent();
                ctx.answerCbQuery('Кнопка удалена 👌');
                return [4 /*yield*/, menuEditor_1.default(ctx)];
            case 17:
                _c.sent();
                return [3 /*break*/, 23];
            case 18:
                forseReply_1.default(ctx, 'Напишите новое имя для кнопки');
                ctx.session.buttonId = callbackQuery.replace(/^changeName-/, '');
                return [3 /*break*/, 23];
            case 19:
                forseReply_1.default(ctx, 'Напишите название кнопки');
                return [3 /*break*/, 23];
            case 20: return [4 /*yield*/, mainMenu_1.default(ctx)];
            case 21:
                _c.sent();
                return [3 /*break*/, 23];
            case 22: return [3 /*break*/, 23];
            case 23: return [2 /*return*/];
        }
    });
}); };
exports.default = categoryMenuHandler;
