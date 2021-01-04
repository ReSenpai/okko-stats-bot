"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthor = exports.getAuthorData = exports.getFirstAndLastName = exports.getUsername = exports.getLastName = exports.getFirstName = void 0;
var getFirstName = function (user) { return user.first_name || null; };
exports.getFirstName = getFirstName;
var getLastName = function (user) { return user.last_name || null; };
exports.getLastName = getLastName;
var getUsername = function (user) { return user.username ? "@" + user.username : null; };
exports.getUsername = getUsername;
var getFirstAndLastName = function (user) {
    return ((exports.getFirstName(user) || '') + " " + (exports.getLastName(user) || '')).trim() || null;
};
exports.getFirstAndLastName = getFirstAndLastName;
var getAuthorData = function (user) {
    return {
        firstName: exports.getFirstName(user),
        lastName: exports.getLastName(user),
        username: exports.getUsername(user)
    };
};
exports.getAuthorData = getAuthorData;
var getAuthor = function (_a) {
    var firstName = _a.firstName, lastName = _a.lastName, userName = _a.userName;
    return (firstName || '') + " " + (lastName || '') + " " + (userName ? "(" + userName + ")" : '');
};
exports.getAuthor = getAuthor;
