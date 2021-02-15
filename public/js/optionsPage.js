"use strict";
exports.__esModule = true;
var status_1 = require("./status");
var tag_1 = require("./tag");
var storage_1 = require("./storage");
document.addEventListener('DOMContentLoaded', function () {
    var storage = storage_1["default"](chrome.storage.sync);
    var tag = tag_1["default"](document.getElementById('tag'));
    var status = status_1["default"](document.getElementById('status'));
    // restore
    var restore = function () {
        return storage.get(tag.name, function (value) { return tag.changeTo(value); });
    };
    restore();
    // reset
    var resetButton = ResetButton(document.getElementById('reset'));
    var reset = function () { return storage.set('', tag.changeTo(''), status.notifyUpdate); };
    resetButton.onClick(reset);
    // save
    var saveButton = SaveButton(document.getElementById('save'));
    var saveForm = SaveForm(document.getElementById('form'));
    var save = function () { return storage.set(tag.name, tag.getValue(), status.notifyUpdate); };
    saveButton.onClick(save);
    saveForm.onSubmit(save);
});
var ResetButton = function (button) {
    var onClick = function (callback) {
        return button.addEventListener('click', callback);
    };
    return { onClick: onClick };
};
var SaveButton = function (button) {
    var onClick = function (callback) {
        return button.addEventListener('click', callback);
    };
    return { onClick: onClick };
};
var SaveForm = function (form) {
    var onSubmit = function (callback) {
        return form.addEventListener('submit', callback);
    };
    return { onSubmit: onSubmit };
};
