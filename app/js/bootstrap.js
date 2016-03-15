import {error, requestC, debounce} from './lib.js';

var bootCount = 0;

(function bootstrap(window, document) {
    'use strict';
    bootCount++;

    var bMapWrap = document.getElementsByClassName('map-wrap')[0];

    if (!(Modernizr.inlinesvg && Modernizr.classlist && Modernizr.csstransforms)) {
        error({
            context: bMapWrap,
            msg: 'Your browser is not supported',
            type: 'l'
        });
    }
    delete window.Modernizr;

    requestC('/public/app/svg/map_old.svg', (data, err) => {
        if (err) {
            error({
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
            getMatrix: () => `matrix(${transform.scale},0,0,${transform.scale},${transform.x},${transform.y})`,
            'in': (event) => {
                event.preventDefault();
                transform.scale *= 1.3;
                bMap.style.transform = transform.getMatrix();
            },
            out: (event) => {
                if (transform.scale > 0) {
                    transform.scale *= 0.7;
                    bMap.style.transform = transform.getMatrix();
                }
            },
            slide: () => {
                debounce((event) => {
                    event.preventDefault();
                    transform.x = transform.x + (transform.xStart - event.clientX);
                    transform.y = transform.y + (transform.yStart - event.clientY);
                    bMap.style.transform = transform.getMatrix();
                }, 250);
            }
        };

        document.getElementsByClassName('control__zoom-in')[0].addEventListener('click', transform.in);
        bMapWrap.addEventListener('dblclick', transform.in);

        document.getElementsByClassName('control__zoom-out')[0].addEventListener('click', transform.out);

        window.addEventListener('mousedown', (event) => {
            transform.xStart = event.clientX;
            transform.yStart = event.clientY;
            window.addEventListener('mousemove', transform.slide);
        });
        window.addEventListener('mouseup', (event) => {
            window.removeEventListener('mousemove', transform.slide);
        });

    });

})(window, document);
