"use strict";
exports.__esModule = true;
exports.displayError = exports.renderInputContent = exports.renderContent = exports.setLoading = exports.displayGif = exports.extractGif = exports.parseJSON = exports.fetchURL = exports.formatURL = exports.getTag = exports.randomGif = void 0;
var tags = '';
exports.randomGif = function () {
    exports.getTag()
        .then(exports.formatURL)
        .then(exports.fetchURL)
        .then(exports.parseJSON)
        .then(exports.extractGif)
        .then(exports.displayGif)
        .then(copyToClipboard)["catch"](exports.displayError);
};
exports.getTag = function () {
    return new Promise(function (resolve) {
        chrome.storage.sync.get('tag', function (items) { return resolve(items.tag || null); });
    });
};
exports.formatURL = function (tag) {
    var selectTags = (tag && tag.split(',')) || [
        'animals',
        'fail',
        'funny',
        'puppies',
        'kittens',
        'gaming',
        'celebrate',
        'reactions',
        'dance',
        'memes',
        'dogs',
        'wow',
        'backflip',
        'ok'
    ];
    tags = selectTags[Math.floor(Math.random() * selectTags.length)];
    exports.renderContent('status', "finding you a gif for:<br /><h3>" + tags + "</h3>");
    return "https://tbdsa3t4af.execute-api.us-east-2.amazonaws.com/v1/ramon?tag=" + tags;
};
exports.fetchURL = function (url) { return fetch(url); };
exports.parseJSON = function (response) { return response.json(); };
exports.extractGif = function (data) {
    if (!data || !data.image_url)
        return Error('Sorry, no response from Giphy!');
    exports.setLoading(true);
    return data;
};
exports.displayGif = function (data) {
    if (data === void 0) { data = {
        title: '',
        bitly_url: '',
        images: {
            downsized_large: {
                width: 0,
                height: 0,
                url: ''
            }
        }
    }; }
    var gifContainer = document.getElementById('image-result');
    gifContainer.width = data.images.downsized_large.width;
    gifContainer.height = data.images.downsized_large.height;
    gifContainer.src = data.images.downsized_large.url;
    gifContainer.hidden = false;
    exports.setLoading(false);
    exports.renderContent('title', data.title);
    exports.renderContent('sub-title', "from: " + tags);
    exports.renderInputContent('input-url', data.images.downsized_large.url);
    exports.renderInputContent('input-giphy', data.bitly_url);
    exports.renderInputContent('input-markdown', "![](" + data.images.downsized_large.url + ")");
    var getNewGif = function () {
        exports.setLoading(true);
        exports.randomGif();
        document
            .getElementById('refresh-button')
            .removeEventListener('click', getNewGif, false);
    };
    document
        .getElementById('refresh-button')
        .addEventListener('click', getNewGif, false);
    return data;
};
var copyToClipboard = function (data) {
    var disposable = document.createElement('input');
    disposable.setAttribute('id', 'disposable_id');
    document.body.appendChild(disposable);
    var disposableIdInput = document.getElementById('disposable_id');
    disposableIdInput.value = "![](" + data.images.downsized_large.url + ")";
    disposable.select();
    document.execCommand('copy');
    document.body.removeChild(disposable);
};
exports.setLoading = function (isLoading) {
    if (isLoading) {
        document.getElementById('loading').style.display = 'block';
        return (document.getElementById('complete').style.display = 'none');
    }
    document.getElementById('loading').style.display = 'none';
    return (document.getElementById('complete').style.display = 'block');
};
exports.renderContent = function (id, text) {
    return (document.getElementById(id).innerHTML = text);
};
exports.renderInputContent = function (id, text) {
    var defaultId = document.getElementById(id);
    return (defaultId.defaultValue = text);
};
exports.displayError = function (message) {
    return exports.renderContent('status', "Sorry, cannot display a gif at the moment. " + message);
};
document.addEventListener('DOMContentLoaded', exports.randomGif);
