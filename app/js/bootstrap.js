import {svg, error, request} from './lib.js';

if (!svg()) {
    error({
        context: document.getElementsByClassName('map-wrap')[0],
        msg: 'SVG not supported',
        type: 'l'
    });
}

request('/svg/map_old.svg').then(function (data) {
    document.getElementsByClassName('map-wrap')[0].innerHTML = data;
});
