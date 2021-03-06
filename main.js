(function(a) {
    function b(d) {
        if (c[d]) return c[d].exports;
        var e = c[d] = {
            i: d,
            l: !1,
            exports: {}
        };
        return a[d].call(e.exports, e, e.exports, b), e.l = !0, e.exports
    }
    var c = {};
    return b.m = a, b.c = c, b.d = function(a, c, d) {
        b.o(a, c) || Object.defineProperty(a, c, {
            enumerable: !0,
            get: d
        })
    }, b.r = function(a) {
        'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(a, Symbol.toStringTag, {
            value: 'Module'
        }), Object.defineProperty(a, '__esModule', {
            value: !0
        })
    }, b.t = function(a, c) {
        if (1 & c && (a = b(a)), 8 & c) return a;
        if (4 & c && 'object' == typeof a && a && a.__esModule) return a;
        var d = Object.create(null);
        if (b.r(d), Object.defineProperty(d, 'default', {
                enumerable: !0,
                value: a
            }), 2 & c && 'string' != typeof a)
            for (var e in a) b.d(d, e, function(b) {
                return a[b]
            }.bind(null, e));
        return d
    }, b.n = function(a) {
        var c = a && a.__esModule ? function() {
            return a['default']
        } : function() {
            return a
        };
        return b.d(c, 'a', c), c
    }, b.o = function(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }, b.p = '', b(b.s = 0)
})([function(a, b, c) {
    a.exports = c(1)
}, function(a, b, c) {
    'use strict';
    c.r(b);
    var d = c(2),
        e = c.n(d),
        f = c(3),
        g = c.n(f)
}, function() {}, function() {
    function a(a, b, c, d, e, f) {
        this.weekday = a, this.date = b, this.month = c, this.minTemp = d, this.maxTemp = e, this.conditionInt = f
    }

    function b(a, b) {
        d('Getting weather by location...');
        var e = '';
        e += 'https://api.openweathermap.org/data/2.5/forecast?', e += 'lat=' + 34.1533 + '&lon=' + -118.7617 + '&APPID=' + x, c(e)
    }

    function c(b) {
        d('Fetching weather data...');
        var c = new XMLHttpRequest;
        c.onreadystatechange = function() {
            var b = Math.max;
            if (4 == c.readyState && 200 == c.status) {
                var d = {},
                    h = JSON.parse(c.responseText),
                    k = new Set,
                    l = 0;
                for (i = 0; i < h.list.length; i++) {
                    var j = new Date(1e3 * h.list[i].dt),
                        m = j.getDate(),
                        n = new a;
                    n.weekday = j.getDay(), n.date = m, n.month = j.getMonth(), n.minTemp = f(h.list[i].main.temp_min), console.log(n.minTemp), n.maxTemp = f(h.list[i].main.temp_max), n.conditionInt = e(h.list[i].weather[0].icon), k.has(m) ? (B[l - 1].minTemp = Math.min(B[l - 1].minTemp, n.minTemp), B[l - 1].maxTemp = b(B[l - 1].maxTemp, n.maxTemp), B[l - 1].conditionInt = b(B[l - 1].conditionInt, n.conditionInt)) : (B.push(n), l++), k.add(m)
                }
                d.icon = h.list[0].weather[0].icon, d.conditionInt = e(h.list[0].weather[0].icon), d.city = 'California', d.temp = f(h.list[0].main.temp), d.maxTemp = B[0].maxTemp, d.minTemp = B[0].minTemp, z = d.conditionInt, g(d);
                var o = document.querySelector('.todays-weather-container');
                s(w(d.minTemp), w(d.maxTemp), o)
            }
        }, c.open('GET', b, !0), c.send()
    }

    function d(a) {
        var b = document.getElementById('loading-text');
        b.innerHTML = a
    }

    function e(a) {
        var b = '';
        switch (a) {
            default:
            case '01d':
            case '01n':
                b = 0;
                break;
            case '02n':
            case '02d':
            case '03d':
            case '03n':
            case '04d':
            case '04n':
                b = 1;
                break;
            case '10d':
            case '09d':
            case '11d':
                b = 2;
                break;
            case '13d':
                b = 3;
        }
        return b
    }

    function f(a) {
        var b = (a - 273.15) * 9/5 + 32;
        return b = b.toString().match(/^-?\d+(?:\.\d{0,1})?/)[0], b
    }

    function g(a) {
        var b = document.getElementById('city'),
            c = document.getElementById('temp'),
            d = document.querySelector('.current-weather-sprite'),
            e = document.querySelector('.weather-sprite');
        b.innerHTML = a.city, A = !0, t(a.temp), h(), o(d, z), m()
    }

    function h() {
        var a = document.querySelectorAll('.weekday');
        for (i = 0; i < a.length; i++) {
            var b = a[i],
                c = B[i + 1],
                d = v(c.date / 10),
                e = c.date % 10;
            p(e, '.date-ones', b), p(d, '.date-tens', b);
            var f = b.querySelector('.weekday-sprite'),
                g = b.querySelector('.current-weather-sprite'),
                h = c.minTemp,
                j = c.maxTemp;
            o(g, c.conditionInt), r((c.weekday + 6) % 7, f), s(w(h), w(j), b)
        }
    }

    function j() {
        var a = new Date,
            b = (a.getDay() + 6) % 7;
        if (k(a), b != D) {
            var c = a.getDate(),
                d = a.getMonth() + 1,
                e = document.querySelector('.weekday-sprite');
            r(b, e), q(c), p(d - 1, '.month', document), D = b
        }
    }

    function k(a) {
        var b = document.getElementById('time'),
            c = a.getHours(),
            d = a.getMinutes(),
            e = a.getSeconds(),
            f = 12 <= c ? 'pm' : 'am',
            g = c % 12;
        0 == g && (g = 12), b.innerHTML = ''.concat(10 > g ? '0' : '').concat(g, ':') + ''.concat(10 > d ? '0' : '').concat(d) + ''.concat(f), 18 <= c || 6 > c ? C && l() : !C && l()
    }

    function l() {
        var a = document.querySelectorAll('.timeOfDay');
        C = !C, a.forEach(function(a) {
            C ? a.classList.remove('night') : a.classList.add('night')
        })
    }

    function m() {
        var a = document.querySelector('.loading-overlay'),
            b = document.querySelector('#header-flexbox'),
            c = document.querySelector('.todays-weather-container');
        E = !E, E ? (a.classList.add('hide'), b.classList.add('bounceIn'), c.classList.add('mainBounceDown'), setTimeout(function() {
            var a = document.querySelectorAll('.weekday');
            a.forEach(function(a) {
                return a.classList.add('bounceDown')
            })
        }, 400), setTimeout(function() {
            n()
        }, 650), setTimeout(function() {
            a.parentNode.removeChild(a)
        }, 1e3)) : (a.classList.remove('hide'), b.classList.remove('bounceIn'))
    }

    function n() {
        var a = document.querySelectorAll('.background-image');
        a.forEach(function(a) {
            a.classList.add('screenshake')
        })
    }

    function o(a, b) {
        var c = parseInt(getComputedStyle(a).width.replace(/px/, '')),
            d = parseInt(getComputedStyle(a).height.replace(/px/, '')),
            e = -(y * d),
            f = ''.concat(-b * c, 'px ').concat(e, 'px');
        a.style.backgroundPosition = f
    }

    function p(a, b, c) {
        var d = c.querySelector(b + '-top'),
            e = c.querySelector(b + '-mid'),
            f = c.querySelector(b + '-base'),
            g = parseInt(getComputedStyle(d).width.replace(/px/, '')),
            h = parseInt(getComputedStyle(d).height.replace(/px/, ''));
        d.style.backgroundPosition = ''.concat(-a * g, 'px 0px'), e.style.backgroundPosition = ''.concat(-a * g, 'px -').concat(h, 'px'), f.style.backgroundPosition = ''.concat(-a * g, 'px -').concat(2 * h, 'px')
    }

    function q(a) {
        var b = v(a / 10);
        p(a % 10, '.date-ones', document), p(b, '.date-tens', document)
    }

    function r(a, b) {
        var c = parseInt(getComputedStyle(b).width.replace(/px/, '')),
            d = parseInt(getComputedStyle(b).height.replace(/px/, '')),
            e = v(a / 3) * -d,
            f = ''.concat(a % 3 * -c, 'px ').concat(e, 'px');
        b.style.backgroundPosition = f
    }

    function s(a, b, c) {
        var d = c.querySelector('.max-temp-sign'),
            e = c.querySelector('.max-temp-tens'),
            f = c.querySelector('.max-temp-ones'),
            g = c.querySelector('.min-temp-sign'),
            h = c.querySelector('.min-temp-tens'),
            j = c.querySelector('.min-temp-ones'),
            k = 32;
        0 <= b && (d.style.backgroundPosition = ''.concat(-384, 'px 0px')), 0 <= a && (g.style.backgroundPosition = ''.concat(-384, 'px 0px')), e.style.backgroundPosition = ''.concat(v(u(b) / 10) * -k, 'px 0px'), f.style.backgroundPosition = ''.concat(v(u(b) % 10) * -k, 'px 0px'), h.style.backgroundPosition = ''.concat(v(u(a) / 10) * -k, 'px 0px'), j.style.backgroundPosition = ''.concat(v(u(a) % 10) * -k, 'px 0px')
    }

    function t(a) {
        var b = document.querySelector('#current-temp-sign'),
            c = document.querySelector('#current-temp-tens'),
            d = document.querySelector('#current-temp-ones'),
            e = document.querySelector('#current-temp-tenths'),
            f = 72,
            g = v(10 * (a - v(a)));
        c.style.backgroundPosition = ''.concat(v(u(a) / 10) * -f, 'px 0px'), d.style.backgroundPosition = ''.concat(v(u(a) % 10) * -f, 'px 0px'), e.style.backgroundPosition = ''.concat(g * -f, 'px 0px')
    }
    var u = Math.abs,
        v = Math.floor,
        w = Math.round;
    CSS.supports('display', 'grid') ? console.log('initialise.js: supports CSS Grid') : console.log('CSS Grid not supported');
    var x = '32aa9a705e117c99f3cd712e3a521b18',
        y = 0,
        z = 0,
        A = !1,
        B = [],
        C = !0,
        D = -1,
        E = !1;
    console.log('getWeather.js');
    (function() {
        d('Getting geolocation...'), b(34.1533, -118.7617);
        })(), console.log('processWeather.js'), console.log('timedFunctions.js');
    setInterval(j, 1e3), j(), console.log('updateSprites.js'), window.setInterval(function() {
        var a = document.querySelector('.current-weather-sprite');
        if (y = (y + 1) % 3, o(a, z), A) {
            var b = document.querySelectorAll('.weekday');
            for (i = 0; i < b.length; i++) {
                var c = b[i],
                    d = c.querySelector('.current-weather-sprite'),
                    e = B[i + 1];
                o(d, e.conditionInt)
            }
        }
    }, 1e3)
}]);