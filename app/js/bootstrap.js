import {error, requestC} from './lib.js';

(function (window, document) {
    'use strict';

    var bMapWrap = document.getElementsByClassName('map-wrap')[0];

    if (!(Modernizr.inlinesvg && Modernizr.classlist)) {
        error({
            context: bMapWrap,
            msg: 'Your browser is not supported',
            type: 'l'
        });
    }
    delete window.Modernizr;

    //request('/svg/map_old.svg').then(function (data) {
    //    bMapWrap.innerHTML = data;
    //    bMapWrap.classList.remove('map-wrap_invisible');
    //    bMapWrap.classList.add('map-wrap_visible');
    //});

    requestC('/svg/map_old.svg', (data, err) => {
        if (err) {
            error({
                context: bMapWrap,
                type: 'l',
                msg: err
            });

            throw new Error(err);
        }

        bMapWrap.innerHTML = data;
        bMapWrap.classList.remove('map-wrap_invisible');
        bMapWrap.classList.add('map-wrap_visible');

        var bMap = document.getElementsByClassName('map')[0];

        document.getElementsByClassName('control__plus')[0].addEventListener('click', (event) => {
            let width = parseFloat(bMap.style.width);
            width += 20;
            bMap.style.width = width + '%';
        });

        document.getElementsByClassName('control__minus')[0].addEventListener('click', (event) => {
            let width = parseFloat(bMap.style.width);
            width -= 20;
            bMap.style.width = width + '%';
        });
    });

})(window, document);
