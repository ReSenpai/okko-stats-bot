"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../database/types/types");
var tokenGenerator = function (type) {
    var length = 16;
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    if (type === types_1.ERanks.Admin)
        return retVal + ":" + types_1.ERanks.Admin;
    return retVal + ":" + types_1.ERanks.SuperAdmin;
};
exports.default = tokenGenerator;
