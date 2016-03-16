/**
 * Error handler
 * @param context
 * @param msg
 * @param type
 */
export function error({context: context, msg: msg, type: type}) {
    'use strict';

    let h;
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
    context.innerHTML = `<h${h} class="error ${type ? 'error_size_' + type : ''}">${msg}</h${h}>`;
    console.error(msg);
}

/**
 * Make XHR GET to url
 * @param url
 * @returns {Promise}
 */
export function request(url) {
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
export function requestC(url, callback) {
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

export function debounce(func, wait, immediate) {
    var timeout;
    return () => {
        var context = this;
        var args = arguments;
        var later = () => {
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
