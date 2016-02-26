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

/**
 * Make compatible (without es6 promises) XHR GET to url
 * @param url
 * @param callback
 */
export function requestC(url, callback) {
    'use strict';

    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function () {
        if (request.status === 200) {
            callback(request.response, false);

        } else {
            callback(undefined, request.statusText);
        }
    };
    request.onerror = function () {
        callback(undefined, 'Network Error');
    };
    request.send(null);
}
