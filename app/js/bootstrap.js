import {svg, error, request} from './lib.js';

if (!svg()) {
    error(document.getElementsByClassName('map')[0], 'SVG');
}

request('/svg/map_old.svg').then(function (data) {
    document.getElementsByClassName('map')[0].innerHTML = data;
});

