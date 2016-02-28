import {error, requestC} from './lib.js';

var bootCount = 0;

(function bootstrap(window, document) {
    'use strict';
    bootCount++;

    var bMapWrap = document.getElementsByClassName('map-wrap')[0];

    if (!(Modernizr.inlinesvg && Modernizr.classlist)) {
        error({
            context: bMapWrap,
            msg: 'Your browser is not supported',
            type: 'l'
        });
    }
    delete window.Modernizr;

    requestC('/svg/map_old.svg', (data, err) => {
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

        var zoom = {
            'in': (event) => {
                event.preventDefault();
                var width = parseFloat(bMap.style.width);
                width *= 1.3;
                bMap.style.width = width + '%';
            },
            out: (event) => {
                var width = parseFloat(bMap.style.width);
                if (width > 20) {
                    width *= 0.7;
                    bMap.style.width = width + '%';
                }
            }
        };

        document.getElementsByClassName('control__zoom-in')[0].addEventListener('click', zoom.in);
        bMapWrap.addEventListener('dblclick', zoom.in);

        document.getElementsByClassName('control__zoom-out')[0].addEventListener('click', zoom.out);

        var slider = {
            startingMousePostition: {},
            containerOffset: {},
            slide: (event) => {
                event.preventDefault();
                var x = slider.containerOffset.x + (slider.startingMousePostition.x - event.clientX);
                var y = slider.containerOffset.y + (slider.startingMousePostition.y - event.clientY);
                bMapWrap.scrollLeft = x;
                bMapWrap.scrollTop = y;
            }
        };

        window.addEventListener('mousedown', (event) => {
            slider.startingMousePostition = {
                x: event.clientX,
                y: event.clientY
            };
            slider.containerOffset = {
                x: bMapWrap.scrollLeft,
                y: bMapWrap.scrollTop
            };
            window.addEventListener('mousemove', slider.slide);
        });
        window.addEventListener('mouseup', (event) => {
            window.removeEventListener('mousemove', slider.slide);
        });

    });

})(window, document);
