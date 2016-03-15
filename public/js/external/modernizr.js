/*! modernizr 3.3.1 (Custom Build) | MIT *
 * http://modernizr.com/download/?-classlist-csstransforms-inlinesvg !*/
!function(e,n,t){function r(e,n){return typeof e===n}function o(){var e,n,t,o,s,i,a;for(var f in y)if(y.hasOwnProperty(f)){if(e=[],n=y[f],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(o=r(n.fn,"function")?n.fn():n.fn,s=0;s<e.length;s++)i=e[s],a=i.split("."),1===a.length?Modernizr[a[0]]=o:(!Modernizr[a[0]]||Modernizr[a[0]]instanceof Boolean||(Modernizr[a[0]]=new Boolean(Modernizr[a[0]])),Modernizr[a[0]][a[1]]=o),C.push((o?"":"no-")+a.join("-"))}}function s(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):S?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function i(e,n){return!!~(""+e).indexOf(n)}function a(){var e=n.body;return e||(e=s(S?"svg":"body"),e.fake=!0),e}function f(e,t,r,o){var i,f,l,u,d="modernizr",p=s("div"),c=a();if(parseInt(r,10))for(;r--;)l=s("div"),l.id=o?o[r]:d+(r+1),p.appendChild(l);return i=s("style"),i.type="text/css",i.id="s"+d,(c.fake?c:p).appendChild(i),c.appendChild(p),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(n.createTextNode(e)),p.id=d,c.fake&&(c.style.background="",c.style.overflow="hidden",u=w.style.overflow,w.style.overflow="hidden",w.appendChild(c)),f=t(p,e),c.fake?(c.parentNode.removeChild(c),w.style.overflow=u,w.offsetHeight):p.parentNode.removeChild(p),!!f}function l(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function u(n,r){var o=n.length;if("CSS"in e&&"supports"in e.CSS){for(;o--;)if(e.CSS.supports(l(n[o]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var s=[];o--;)s.push("("+l(n[o])+":"+r+")");return s=s.join(" or "),f("@supports ("+s+") { #modernizr { position: absolute; } }",function(e){return"absolute"==getComputedStyle(e,null).position})}return t}function d(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function p(e,n,o,a){function f(){p&&(delete z.style,delete z.modElem)}if(a=r(a,"undefined")?!1:a,!r(o,"undefined")){var l=u(e,o);if(!r(l,"undefined"))return l}for(var p,c,m,v,h,y=["modernizr","tspan"];!z.style;)p=!0,z.modElem=s(y.shift()),z.style=z.modElem.style;for(m=e.length,c=0;m>c;c++)if(v=e[c],h=z.style[v],i(v,"-")&&(v=d(v)),z.style[v]!==t){if(a||r(o,"undefined"))return f(),"pfx"==n?v:!0;try{z.style[v]=o}catch(g){}if(z.style[v]!=h)return f(),"pfx"==n?v:!0}return f(),!1}function c(e,n){return function(){return e.apply(n,arguments)}}function m(e,n,t){var o;for(var s in e)if(e[s]in n)return t===!1?e[s]:(o=n[e[s]],r(o,"function")?c(o,t||n):o);return!1}function v(e,n,t,o,s){var i=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+x.join(i+" ")+i).split(" ");return r(n,"string")||r(n,"undefined")?p(a,n,o,s):(a=(e+" "+E.join(i+" ")+i).split(" "),m(a,n,t))}function h(e,n,r){return v(e,t,t,n,r)}var y=[],g={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){y.push({name:e,fn:n,options:t})},addAsyncTest:function(e){y.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=g,Modernizr=new Modernizr;var C=[],w=n.documentElement;Modernizr.addTest("classlist","classList"in w);var S="svg"===w.nodeName.toLowerCase();Modernizr.addTest("inlinesvg",function(){var e=s("div");return e.innerHTML="<svg/>","http://www.w3.org/2000/svg"==("undefined"!=typeof SVGRect&&e.firstChild&&e.firstChild.namespaceURI)});var _="Moz O ms Webkit",x=g._config.usePrefixes?_.split(" "):[];g._cssomPrefixes=x;var T={elem:s("modernizr")};Modernizr._q.push(function(){delete T.elem});var z={style:T.elem.style};Modernizr._q.unshift(function(){delete z.style});var E=g._config.usePrefixes?_.toLowerCase().split(" "):[];g._domPrefixes=E,g.testAllProps=v,g.testAllProps=h,Modernizr.addTest("csstransforms",function(){return-1===navigator.userAgent.indexOf("Android 2.")&&h("transform","scale(1)",!0)}),o(),delete g.addTest,delete g.addAsyncTest;for(var P=0;P<Modernizr._q.length;P++)Modernizr._q[P]();e.Modernizr=Modernizr}(window,document);