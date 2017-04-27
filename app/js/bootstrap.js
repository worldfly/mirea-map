import {error, requestC, debounce} from './lib.js';

var bootCount = 0;

(function bootstrap(window, document) {
    'use strict';

    var bMapWrap = document.getElementsByClassName('map-wrap')[0];

    bootCount++;

    if (!(Modernizr.inlinesvg && Modernizr.classlist && Modernizr.csstransforms)) {
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

        var transform = {
            scale: 1,
            x: 0,
            y: 0,
            xStart: 0,
            yStart: 0,
            getMatrix: () => `matrix(${transform.scale},0,0,${transform.scale},${transform.x},${transform.y})`,
            in: (event) => {
                event.preventDefault();
                transform.scale *= 1.3;
                transform.x = event.offsetX - (event.offsetX - transform.x)*1.3;
                transform.y = event.offsetY - (event.offsetY - transform.y)*1.3;
                bMap.style.transform = transform.getMatrix();
            },
            out: (event) => {
                if (transform.scale > 0.18) {
                    transform.scale *= 0.7;
                    transform.x = event.offsetX - (event.offsetX - transform.x)*0.7;
                    transform.y = event.offsetY - (event.offsetY - transform.y)*0.7;
                    bMap.style.transform = transform.getMatrix();
                }
            },
            slide: (event) => {
                event.preventDefault();
                transform.x += event.clientX - transform.xStart;
                transform.y += event.clientY - transform.yStart;

                transform.xStart = event.clientX;
                transform.yStart = event.clientY;

                bMap.style.transform = transform.getMatrix();
            },
    //        slideTouch: (event) => {
    //            event.preventDefault();
    //            var touch = event.changedTouches[0];
    //            var x = Math.round(transform.x - (transform.xStart - touch.clientX));
    //            var y = Math.round(transform.y - (transform.yStart - touch.clientY));
    //console.log(x);
    //            bMap.style.left = x;
    //            bMap.style.top = y;
    //        }
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
        //
        //window.addEventListener('touchstart', (event) => {
        //    var touch = event.changedTouches[0];
        //    transform.xStart = touch.clientX;
        //    transform.yStart = touch.clientY;
        //});
        //window.addEventListener('touchmove', (event) => transform.slideTouch);
        ////window.addEventListener('touchend', (event) => {
        ////    window.removeEventListener('touchmove', transform.slideTouch);
        ////});

    });

})(window, document);
