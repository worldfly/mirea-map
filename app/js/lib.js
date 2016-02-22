/**
 * Error handler
 * @param context
 * @param msg
 * @param type
 */
export function error({context: context, msg: msg, type: type}) {
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
 * Test for SVG support
 * @returns {boolean}
 */
export function svg() {
    var div = document.createElement('div');
    div.innerHTML = '<svg/>';
    return (
            typeof SVGRect != 'undefined' &&
            div.firstChild &&
            div.firstChild.namespaceURI
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
