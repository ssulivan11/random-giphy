"use strict";
exports.__esModule = true;
var Storage = function (implementation) {
    var set = function (key, value, userCallback) {
        var _a;
        var callback = validateCallback(userCallback);
        implementation.set((_a = {}, _a[key] = value, _a), callback);
    };
    var get = function (key, callback) {
        return implementation.get(key, function (items) { return callback(items[key]); });
    };
    var validateCallback = function (callback) {
        if (!callback)
            return function () { return ({}); };
        return callback;
    };
    return {
        set: set,
        get: get
    };
};
exports["default"] = Storage;
