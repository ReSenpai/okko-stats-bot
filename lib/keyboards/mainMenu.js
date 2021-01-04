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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getAllCategory_1 = __importDefault(require("../database/queryes/getAllCategory"));
var getUserInfo_1 = __importDefault(require("../database/queryes/getUserInfo"));
var types_1 = require("../database/types/types");
var editMenuById_1 = __importDefault(require("../shared/constructors/editMenuById"));
var getAccidentStats = function (data) {
    var stats = data
        .filter(function (obj) { return obj.counter > 0; })
        .sort(function (a, b) { return b.counter - a.counter; })
        .map(function (obj) { return obj.name + " : " + obj.counter; })
        .join('\n');
    return stats || 'Пусто';
};
var mainMenu = function (ctx, type) {
    if (type === void 0) { type = 'edit'; }
    return __awaiter(void 0, void 0, void 0, function () {
        var keyboardData, stats, userId, user, keyboard;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getAllCategory_1.default()];
                case 1:
                    keyboardData = _b.sent();
                    stats = getAccidentStats(keyboardData);
                    userId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
                    if (!userId)
                        return [2 /*return*/];
                    return [4 /*yield*/, getUserInfo_1.default(userId, 'rank')];
                case 2:
                    user = _b.sent();
                    keyboard = {
                        reply_markup: {
                            inline_keyboard: __spreadArrays([
                                [{
                                        text: '🔄 Обновить',
                                        callback_data: 'update'
                                    }]
                            ], keyboardData.map(function (obj) { return [{
                                    text: obj.name,
                                    callback_data: "vote-" + obj._id,
                                }]; }), [
                                (user === null || user === void 0 ? void 0 : user.rank) === types_1.ERanks.User
                                    ? []
                                    : [{
                                            text: '🔧 Настройки',
                                            callback_data: 'settings'
                                        }]
                            ]),
                        }
                    };
                    switch (type) {
                        case 'edit': return [2 /*return*/, ctx.editMessageText(stats, keyboard).catch(function () {
                                ctx.answerCbQuery('Не так быстро ❤️');
                            })];
                        case 'edit-by-id': return [2 /*return*/, editMenuById_1.default(ctx, stats, keyboard)];
                        case 'reply': return [2 /*return*/, ctx.reply(stats, keyboard)];
                    }
                    return [2 /*return*/];
            }
        });
    });
};
exports.default = mainMenu;
