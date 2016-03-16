(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _lib = require('./lib.js');

var bootCount = 0;

(function bootstrap(window, document) {
    'use strict';

    var bMapWrap = document.getElementsByClassName('map-wrap')[0];

    bootCount++;

    if (!(Modernizr.inlinesvg && Modernizr.classlist && Modernizr.csstransforms)) {
        (0, _lib.error)({
            context: bMapWrap,
            msg: 'Your browser is not supported',
            type: 'l'
        });
    }
    delete window.Modernizr;

    (0, _lib.requestC)('/svg/map_old.svg', function (data, err) {
        if (err) {
            (0, _lib.error)({
                context: bMapWrap,
                type: 'l',
                msg: err
            });

            if (bootCount > 2) {
                throw new Error(err);
            } else {
                bootstrap(window, document);
            }
        }

        bMapWrap.innerHTML = data;
        bMapWrap.classList.remove('map-wrap_invisible');
        bMapWrap.classList.add('map-wrap_visible');

        var bMap = document.getElementsByClassName('map')[0];

        var transform = {
            scale: 1,
            x: 0,
            y: 0,
            xStart: 0,
            yStart: 0,
            getMatrix: function getMatrix() {
                return 'matrix(' + transform.scale + ',0,0,' + transform.scale + ',' + transform.x + ',' + transform.y + ')';
            },
            'in': function _in(event) {
                event.preventDefault();
                transform.scale *= 1.3;
                bMap.style.transform = transform.getMatrix();
            },
            out: function out(event) {
                if (transform.scale > 0.18) {
                    transform.scale *= 0.7;
                    bMap.style.transform = transform.getMatrix();
                }
            },
            slide: function slide(event) {
                event.preventDefault();
                var x = Math.round(transform.x - (transform.xStart - event.clientX));
                var y = Math.round(transform.y - (transform.yStart - event.clientY));

                bMap.style.left = x;
                bMap.style.top = y;
            }
        };

        //        slideTouch: (event) => {
        //            event.preventDefault();
        //            var touch = event.changedTouches[0];
        //            var x = Math.round(transform.x - (transform.xStart - touch.clientX));
        //            var y = Math.round(transform.y - (transform.yStart - touch.clientY));
        //console.log(x);
        //            bMap.style.left = x;
        //            bMap.style.top = y;
        //        }
        document.getElementsByClassName('control__zoom-in')[0].addEventListener('click', transform.in);
        bMapWrap.addEventListener('dblclick', transform.in);

        document.getElementsByClassName('control__zoom-out')[0].addEventListener('click', transform.out);

        window.addEventListener('mousedown', function (event) {
            transform.xStart = event.clientX;
            transform.yStart = event.clientY;
            window.addEventListener('mousemove', transform.slide);
        });
        window.addEventListener('mouseup', function (event) {
            window.removeEventListener('mousemove', transform.slide);
        });
        //
        //window.addEventListener('touchstart', (event) => {
        //    var touch = event.changedTouches[0];
        //    transform.xStart = touch.clientX;
        //    transform.yStart = touch.clientY;
        //});
        //window.addEventListener('touchmove', (event) => transform.slideTouch);
        ////window.addEventListener('touchend', (event) => {
        ////    window.removeEventListener('touchmove', transform.slideTouch);
        ////});
    });
})(window, document);

},{"./lib.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.error = error;
exports.request = request;
exports.requestC = requestC;
exports.debounce = debounce;
/**
 * Error handler
 * @param context
 * @param msg
 * @param type
 */
function error(_ref) {
    'use strict';

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
 * Make XHR GET to url
 * @param url
 * @returns {Promise}
 */
function request(url) {
    'use strict';

    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.response);
            } else {
                reject(Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(Error('Network Error'));
        };
        req.send(null);
    });
}

/**
 * Make compatible (without es6 promises) XHR GET to url
 * @param url
 * @param callback
 */
function requestC(url, callback) {
    'use strict';

    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onload = function () {
        if (req.status === 200) {
            callback(req.response, false);
        } else {
            callback(undefined, req.statusText);
        }
    };
    req.onerror = function () {
        callback(undefined, 'Network Error');
    };
    req.send(null);
}

function debounce(func, wait, immediate) {
    var _this = this,
        _arguments = arguments;

    var timeout;
    return function () {
        var context = _this;
        var args = _arguments;
        var later = function later() {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
}

},{}]},{},[1]);
