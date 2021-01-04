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
var getOneCategory_1 = __importDefault(require("../database/queryes/getOneCategory"));
var aliases_1 = require("../utils/aliases");
var getUserInfo_1 = __importDefault(require("../database/queryes/getUserInfo"));
var getCategoryItemStats = function (categoryData) { return __awaiter(void 0, void 0, void 0, function () {
    var authorObj, author;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getUserInfo_1.default(categoryData.authorId, 'firstName lastName userName')];
            case 1:
                authorObj = _a.sent();
                if (!authorObj)
                    return [2 /*return*/, 'Информация отсутствует'];
                author = aliases_1.getAuthor(authorObj);
                return [2 /*return*/, "\n    \uD83D\uDCC4 \u0418\u043C\u044F \u043A\u043D\u043E\u043F\u043A\u0438: " + categoryData.name + "\n    \n\uD83E\uDDA2 \u041A\u0442\u043E \u0441\u043E\u0437\u0434\u0430\u043B: " + author];
        }
    });
}); };
var categoryItemEditor = function (ctx, callbackQuery) { return __awaiter(void 0, void 0, void 0, function () {
    var objectId, categoryData, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                objectId = callbackQuery.replace(/^edit-/, '');
                return [4 /*yield*/, getOneCategory_1.default(objectId)];
            case 1:
                categoryData = _c.sent();
                if (!categoryData)
                    return [2 /*return*/]; // TODO: refactoring
                _b = (_a = ctx).editMessageText;
                return [4 /*yield*/, getCategoryItemStats(categoryData)];
            case 2: // TODO: refactoring
            return [2 /*return*/, _b.apply(_a, [_c.sent(), {
                        reply_markup: {
                            inline_keyboard: [
                                [{
                                        text: '❌ Удалить',
                                        callback_data: "delete-" + objectId
                                    }],
                                [{
                                        text: '✏️ Изменить имя',
                                        callback_data: "changeName-" + objectId
                                    }],
                                [{
                                        text: '⬅️ Назад',
                                        callback_data: 'editMenu'
                                    }]
                            ]
                        }
                    }])];
        }
    });
}); };
exports.default = categoryItemEditor;
