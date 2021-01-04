"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var types_1 = require("../types/types");
var mongoose_1 = __importStar(require("mongoose"));
var UserSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    rank: {
        type: String,
        default: types_1.ERanks.User
    },
    userName: {
        type: String,
        default: null
    },
    firstName: {
        type: String,
        default: null
    },
    lastName: {
        type: String,
        default: null
    },
    menuId: {
        type: Number,
        default: null
    },
    token: {
        type: String,
        default: null
    }
}, {
    timestamps: true,
});
exports.UserModel = mongoose_1.default.model('user', UserSchema);
