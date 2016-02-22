(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _lib = require('./lib.js');

var bMapWrap = document.getElementsByClassName('map-wrap')[0];

if (!(0, _lib.svg)()) {
    (0, _lib.error)({
        context: bMapWrap,
        msg: 'SVG not supported',
        type: 'l'
    });
}

(0, _lib.request)('/svg/map_old.svg').then(function (data) {
    bMapWrap.innerHTML = data;
    bMapWrap.classList.remove('map-wrap_invisible');
    bMapWrap.classList.add('map-wrap_visible');
});

},{"./lib.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.error = error;
exports.svg = svg;
exports.request = request;
/**
 * Error handler
 * @param context
 * @param msg
 * @param type
 */
function error(_ref) {
    var context = _ref.context;
    var msg = _ref.msg;
    var type = _ref.type;

    var h = undefined;
    switch (type) {
        case 'l':
            h = 2;
            break;
        case 's':
            h = 4;
            break;
        default:
            h = 3;
    }
    context.innerHTML = '<h' + h + ' class="error ' + (type ? 'error_size_' + type : '') + '">' + msg + '</h' + h + '>';
    console.error(msg);
}

/**
 * Test for SVG support
 * @returns {boolean}
 */
function svg() {
    var div = document.createElement('div');
    div.innerHTML = '<svg/>';
    return (typeof SVGRect != 'undefined' && div.firstChild && div.firstChild.namespaceURI) == 'http://www.w3.org/2000/svg';
}

/**
 * Make XHR GET to url
 * @param url
 * @returns {Promise}
 */
function request(url) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onload = function () {
            if (request.status === 200) {
                resolve(request.response);
            } else {
                reject(Error(request.statusText));
            }
        };
        request.onerror = function () {
            reject(Error('Network Error'));
        };
        request.send(null);
    });
}

},{}]},{},[1]);
