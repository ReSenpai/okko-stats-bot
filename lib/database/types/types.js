"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERanks = exports.ErrorCode = void 0;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["Duplicate"] = 11000] = "Duplicate";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
var ERanks;
(function (ERanks) {
    ERanks["SuperAdmin"] = "SuperAdmin";
    ERanks["Admin"] = "Admin";
    ERanks["User"] = "User";
})(ERanks = exports.ERanks || (exports.ERanks = {}));
