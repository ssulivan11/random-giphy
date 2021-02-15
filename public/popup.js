var tags = '';
var defaultData = {
    title: '',
    bitly_url: '',
    image_url: '',
    images: {
        downsized_large: {
            width: 0,
            height: 0,
            url: ''
        }
    }
};
var randomGif = function () {
    getTag()
        .then(formatURL)
        .then(fetchURL)
        .then(parseJSON)
        .then(extractGif)
        .then(displayGif)
        .then(copyToClipboard)["catch"](displayError);
};
var getTag = function () {
    return new Promise(function (resolve) {
        chrome.storage.sync.get('tag', function (items) { return resolve(items.tag || null); });
    });
};
var formatURL = function (tag) {
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
    renderContent('status', "finding you a gif for:<br /><h3>" + tags + "</h3>");
    return "https://tbdsa3t4af.execute-api.us-east-2.amazonaws.com/v1/ramon?tag=" + tags;
};
var fetchURL = function (url) { return fetch(url); };
var parseJSON = function (response) { return response.json(); };
var extractGif = function (data) {
    if (!data || !data.image_url)
        return Error('Sorry, no response from Giphy!');
    setLoading(true);
    return data;
};
var displayGif = function (data) {
    if (data === void 0) { data = defaultData; }
    var gifContainer = document.getElementById('image-result');
    gifContainer.width = data.images.downsized_large.width;
    gifContainer.height = data.images.downsized_large.height;
    gifContainer.src = data.images.downsized_large.url;
    gifContainer.hidden = false;
    setLoading(false);
    renderContent('title', data.title);
    renderContent('sub-title', "from: " + tags);
    renderInputContent('input-url', data.images.downsized_large.url);
    renderInputContent('input-giphy', data.bitly_url);
    renderInputContent('input-markdown', "![](" + data.images.downsized_large.url + ")");
    var getNewGif = function () {
        setLoading(true);
        randomGif();
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
    var _a;
    if (data === void 0) { data = defaultData; }
    if (!((_a = data === null || data === void 0 ? void 0 : data.images) === null || _a === void 0 ? void 0 : _a.downsized_large))
        return false;
    var disposable = document.createElement('input');
    disposable.setAttribute('id', 'disposable_id');
    document.body.appendChild(disposable);
    var disposableIdInput = document.getElementById('disposable_id');
    disposableIdInput.value = "![](" + (data === null || data === void 0 ? void 0 : data.images.downsized_large.url) + ")";
    disposable.select();
    document.execCommand('copy');
    document.body.removeChild(disposable);
    return true;
};
var setLoading = function (isLoading) {
    if (isLoading) {
        document.getElementById('loading').style.display = 'block';
        return (document.getElementById('complete').style.display = 'none');
    }
    document.getElementById('loading').style.display = 'none';
    return (document.getElementById('complete').style.display = 'block');
};
var renderContent = function (id, text) {
    return (document.getElementById(id).innerHTML = text);
};
var renderInputContent = function (id, text) {
    var defaultId = document.getElementById(id);
    return (defaultId.defaultValue = text);
};
var displayError = function (message) {
    return renderContent('status', "Sorry, cannot display a gif at the moment. " + message);
};
document.addEventListener('DOMContentLoaded', randomGif);
module.exports = {
    randomGif: randomGif,
    getTag: getTag,
    formatURL: formatURL,
    extractGif: extractGif,
    displayGif: displayGif,
    copyToClipboard: copyToClipboard,
    setLoading: setLoading
};
