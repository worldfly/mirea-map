/**
 * Error handler
 * @param context
 * @param msg
 */
export function error(context, msg) {
    context.innerHTML = '<h1 class="error">' + msg + '</h1>';
    console.error(msg);
}

/**
 * Test for SVG support
 * @returns {boolean}
 */
export function svg() {
    var div = document.createElement('div');
    div.innerHTML = '<svg/>';
    return (
            typeof SVGRect != 'undefined' &&
            div.firstChild && div.firstChild.namespaceURI
        ) == 'http://www.w3.org/2000/svg';
}

/**
 * Make XHR GET to url
 * @param url
 * @returns {Promise}
 */
export function request(url) {
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
