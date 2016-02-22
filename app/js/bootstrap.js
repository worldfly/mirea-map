import {error, request} from './lib.js';

var bMapWrap = document.getElementsByClassName('map-wrap')[0];

if (!(Modernizr.inlinesvg && Modernizr.classlist && Modernizr.promises)) {
    error({
        context: bMapWrap,
        msg: 'Your browser is not supported',
        type: 'l'
    });
}

request('/svg/map_old.svg').then(function (data) {
    bMapWrap.innerHTML = data;
    bMapWrap.classList.remove('map-wrap_invisible');
    bMapWrap.classList.add('map-wrap_visible');
});
