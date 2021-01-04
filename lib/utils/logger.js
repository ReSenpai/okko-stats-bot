"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logger = /** @class */ (function () {
    /**
     *
     * @param logLvl Level of logging, from 0 (turn off logs) to any, whatever your soul
     * @param type The type of logging. colored or ordinary
     */
    function Logger(logLvl, type) {
        this._logLvl = logLvl;
        this._type = type || 'colored';
        this._start = 0;
        this._end = 0;
        this._color = {
            cyan: '\x1b[36m%s\x1b[0m',
            yellow: '\x1b[33m%s\x1b[0m',
            red: '\x1b[31m%s\x1b[0m',
            green: '\x1b[32m%s\x1b[0m',
            puprple: '\x1b[35m%s\x1b[0m',
            grey: '\x1b[37m%s\x1b[0m'
        };
    }
    /**
     * Date/Time log + line
     * @param {number} logLvl
     */
    Logger.prototype.logLine = function (logLvl) {
        if (this._logLvl >= logLvl) {
            console.log("------------------------------------------------------------------------------------");
        }
    };
    /**
     * Service method for marking
     * @param {string} moduleName Name console log
     * @param {string} message What we're loging
     * @returns {string} Formatted console log
     */
    Logger.prototype._logStr = function (moduleName, message) {
        if (typeof message == 'object') {
            setTimeout(function () {
                console.log(message);
            }, 100);
            return this._getTime() + "/ " + moduleName + " :";
        }
        return this._getTime() + "/ " + moduleName + " : " + message;
    };
    /**
     * Gives an actal time
     * @returns {string} log time
     */
    Logger.prototype._getTime = function () {
        var date = new Date();
        var hours = ('0' + date.getHours()).slice(-2);
        var minutes = ('0' + date.getUTCMinutes()).slice(-2);
        var seconds = ('0' + date.getUTCSeconds()).slice(-2);
        var days = ('0' + date.getDate()).slice(-2);
        var months = ('0' + (date.getMonth() + 1)).slice(-2);
        var years = date.getFullYear();
        return days + "." + months + "." + years + " / " + hours + ":" + minutes + ":" + seconds + " ";
    };
    /**
     * Console log white
     * @param {number} logLvl Loging level
     * @param {string} moduleName Name console log
     * @param {string} message What we're loging
     */
    Logger.prototype.log = function (logLvl, moduleName, message) {
        if (this._logLvl >= logLvl) {
            console.log(this._logStr(moduleName, message));
        }
    };
    /**
     * A service method for compiling colored logs
     * @param {string} color Color
     * @param {number} logLvl Loging level
     * @param {string} moduleName Name console log
     * @param {string} message What we're loging
     */
    Logger.prototype._default = function (color, logLvl, moduleName, message) {
        if (this._type === 'ordinary') {
            console.log(this._logStr(moduleName, message));
        }
        else {
            if (this._logLvl >= logLvl) {
                console.log(color, this._logStr(moduleName, message));
            }
        }
    };
    /**
     * Console log cyan
     * @param {number} logLvl Loging level
     * @param {string} moduleName Name console log
     * @param {string} message What we're loging
     */
    Logger.prototype.debug = function (logLvl, moduleName, message) {
        this._default(this._color.cyan, logLvl, moduleName, message);
    };
    /**
     * Console log gold
     * @param {number} logLvl Loging level
     * @param {string} moduleName Name console log
     * @param {string} message What we're loging
     */
    Logger.prototype.prime = function (logLvl, moduleName, message) {
        this._default(this._color.yellow, logLvl, moduleName, message);
    };
    /**
     * Console log red
     * @param {number} logLvl Loging level
     * @param {string} moduleName Name console log
     * @param {string} message What we're loging
     */
    Logger.prototype.error = function (logLvl, moduleName, message) {
        this._default(this._color.red, logLvl, moduleName, message);
    };
    /**
     * Console log green
     * @param {number} logLvl Loging level
     * @param {string} moduleName Name console log
     * @param {string} message What we're loging
     */
    Logger.prototype.green = function (logLvl, moduleName, message) {
        this._default(this._color.green, logLvl, moduleName, message);
    };
    /**
     * Algorithm speed
     * @param {number} logLvl Loging level
     * @param {string} moduleName Name console log
     * @param {string} position Location of measurement: 'start' or 'end'
     */
    Logger.prototype.time = function (logLvl, moduleName, position) {
        if (this._logLvl >= logLvl) {
            if (position == 'start') {
                this._start = new Date().getTime();
            }
            else if (position == 'end') {
                this._end = new Date().getTime();
                console.log(" " + moduleName + " : speed " + (this._end - this._start) + " ms");
            }
        }
    };
    return Logger;
}());
var logg = new Logger(3, 'colored');
exports.default = logg;
