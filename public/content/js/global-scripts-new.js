$ = jQuery;

function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
}

function smoothScroll(t, e, n) {
    return t ? (e ? $("html, body").animate({scrollTop: t.offset().top - $(window).height() / 2 + t.height() / 2}, 500) : $("html, body").animate({scrollTop: t.offset().top - 50}, 500), void ("function" == typeof n && n())) : ($("html, body").animate({scrollTop: 0}), void ("function" == typeof n && n()))
}

function getParameterByName(t, e) {
    e || (e = window.location.href), t = t.replace(/[\[\]]/g, "\\$&");
    var n = new RegExp("[?&]" + t + "(=([^&#]*)|&|#|$)"), i = n.exec(e);
    return i ? i[2] ? decodeURIComponent(i[2].replace(/\+/g, " ")) : "" : null
}


function flyToCart(t, e, n) {
    var i = $(".cart")
        , r = 70
        , o = 70
        , a = 0
        , s = 0
        , l = 0
        , u = 0;
    angular.element(i).scope().hoverMenu = "";
    var c = $(".mobile-header .icon-shopping-bag");
    c.length ? (a = c.offset().top + 20,
        s = c.offset().left - 40,
        l = c.offset().top,
        u = c.offset().left + 10,
        setTimeout(function () {
            $(".mobile-header .cart-menu-link").click()
        }, 1500)) : (a = i.offset().top + 20,
        s = i.offset().left + 10,
        l = i.offset().top,
        u = i.offset().left + 10,
        setTimeout(function () {
            smoothScroll(i, !0)
        }, 800),
        setTimeout(function () {
            angular.element(document.body).injector().get("CartService").loading = !0,
                angular.element(i).scope().hoverMenu = "cart",
                angular.element(i).scope().$digest()
        }, 1300));
    var f = $('<img class="flyTocart">');
    f.attr("src", n),
        f.attr("width", "70%"),
        f.attr("height", "70%"),
        f.css({
            margin: "10px auto 0 10px"
        });
    var d = $("<div>").offset({
        top: t,
        left: e
    }).css({
        opacity: "0.8",
        position: "absolute",
        display: "block",
        width: "0px",
        height: "0px",
        backgroundColor: "white",
        borderRadius: "100px",
        border: "1px solid #d8d8d8",
        margin: "0 auto",
        overflow: "hidden",
        zIndex: 1001
    });
    d.append(f),
        d.appendTo($("body")).animate({
            width: 70,
            height: 70
        }, 500).animate({
            top: a,
            left: s,
            width: r,
            height: o,
            padding: "0px 0px 0px 0px"
        }, 800).animate({
            top: l,
            left: u,
            width: 0,
            height: 0,
            opacity: 0
        }, function () {
            $(this).detach()
        })
}

function flyToCartNew(t, e, n) {
    var i = $(".cart"), r = $("#mobile-cart-button"), o = !!r.length, a = o === !0 ? r.offset().top : i.offset().top,
        s = o === !0 ? r.offset().left : i.offset().left,
        l = {init: {top: t, left: e}, step1: {top: a + 20, left: o ? s - 40 : s + 10}, step2: {top: a, left: s + 10}};
    angular.element(i).scope().hoverMenu = "", o === !0 && (setTimeout(function () {
        angular.element(i).scope().paypalShortcutForm.show = !1, angular.element(i).scope().$digest()
    }, 100), setTimeout(function () {
        $(".mobile-header .cart-menu-link").click()
    }, 1e3)), o === !1 && (setTimeout(function () {
        smoothScroll(i, !0)
    }, 400), setTimeout(function () {
        var t = angular.element(i).scope();
        t.paypalShortcutForm.show = !1, t.hoverMenu = "cart", angular.element(i).scope().$digest()
    }, 300)), detachDivAnimated(l, n)
}

function flyToWishList(t, e, n) {
    var i = $(".wishlist-link"), r = $(".mobile-header .icon-menu"), o = !!r.length;
    if (i.length || (i = $(".user-account-menu-link")), !i.length && !r.length) return !1;
    var a = o === !0 ? r.offset().top : i.offset().top, s = o === !0 ? r.offset().left : i.offset().left,
        l = {init: {top: t, left: e}, step1: {top: a + 20, left: o ? s - 10 : s - 25}, step2: {top: a, left: s + 10}};
    o === !1 && setTimeout(function () {
        smoothScroll(i, !0), i.addClass("flash").removeClass("remove-flash"), setTimeout(function () {
            i.removeClass("flash").addClass("remove-flash")
        }, 800)
    }, 400), detachDivAnimated(l, n)
}

function detachDivAnimated(t, e) {
    var n = $("<img>");
    n.attr("src", e), n.attr("width", "70%"), n.attr("height", "70%"), n.css({margin: "10px auto 0 10px"});
    var i = $("<div>").offset({top: t.init.top, left: t.init.left}).css({
        opacity: "0.8",
        position: "absolute",
        display: "block",
        width: "0px",
        height: "0px",
        backgroundColor: "white",
        borderRadius: "100px",
        border: "1px solid #d8d8d8",
        margin: "0 auto",
        overflow: "hidden",
        zIndex: 1001
    });
    i.append(n), i.appendTo($("body")).animate({width: 70, height: 70}, 200).animate({
        top: t.step1.top,
        left: t.step1.left,
        width: 70,
        height: 70,
        padding: "0px 0px 0px 0px"
    }, 1e3).animate({top: t.step2.top, left: t.step2.left, width: 0, height: 0, opacity: 0}, function () {
        $(this).detach()
    })
}

function round(t, e, n) {
    var i, r, o, a;
    if (e |= 0, i = Math.pow(10, e), t *= i, a = t > 0 | -(t < 0), o = t % 1 === .5 * a, r = Math.floor(t), o) switch (n) {
        case"PHP_ROUND_HALF_DOWN":
            t = r + (a < 0);
            break;
        case"PHP_ROUND_HALF_EVEN":
            t = r + r % 2 * a;
            break;
        case"PHP_ROUND_HALF_ODD":
            t = r + !(r % 2);
            break;
        default:
            t = r + (a > 0)
    }
    return (o ? t : Math.round(t)) / i
}

function isElementInViewport(t) {
    "function" == typeof jQuery && t instanceof jQuery && (t = t[0]);
    var e = t.getBoundingClientRect();
    return e.bottom >= 0 && e.right >= 0 && e.top <= (window.innerHeight || document.documentElement.clientHeight) && e.left <= (window.innerWidth || document.documentElement.clientWidth)
}

function getCountdown(t) {
    var e = {days: 0, hours: 0, minutes: 0, seconds: t};
    return e.days = Math.floor(e.seconds / 86400), e.seconds -= 86400 * e.days, e.hours = Math.floor(e.seconds / 3600), e.seconds -= 3600 * e.hours, e.minutes = Math.floor(e.seconds / 60), e.seconds -= 60 * e.minutes, e
}

function setCountdown(t, e) {
    e += 5;
    var n = setInterval(function () {
        function i(t) {
            return t = t.toString(), t.length < 2 ? "0" + t : t.length > 2 ? "99" : t
        }

        if (1 == e && setTimeout(function () {
            document.location.reload()
        }, 1e3), e <= 0) return t.find(".digit").html(0), void clearInterval(n);
        var r = getCountdown(e), o = i(r.days), a = i(r.hours), s = i(r.minutes), l = i(r.seconds);
        t.find(".cc-days .digit").each(function (t, e) {
            $(e).html(o[t])
        }), t.find(".cc-hours .digit").each(function (t, e) {
            $(e).html(a[t])
        }), t.find(".cc-minutes .digit").each(function (t, e) {
            $(e).html(s[t])
        }), t.find(".cc-seconds .digit").each(function (t, e) {
            $(e).html(l[t])
        }), e--
    }, 1e3);
    return n
}

!function () {
    "use strict";

    function t(t) {
        d.push(t), 1 == d.length && u()
    }

    function e() {
        for (; d.length;) d[0](), d.shift()
    }

    function n(t) {
        this.a = f, this.b = void 0, this.f = [];
        var e = this;
        try {
            t(function (t) {
                o(e, t)
            }, function (t) {
                a(e, t)
            })
        } catch (n) {
            a(e, n)
        }
    }

    function i(t) {
        return new n(function (e, n) {
            n(t)
        })
    }

    function r(t) {
        return new n(function (e) {
            e(t)
        })
    }

    function o(t, e) {
        if (t.a == f) {
            if (e == t) throw new TypeError;
            var n = !1;
            try {
                var i = e && e.then;
                if (null != e && "object" == typeof e && "function" == typeof i) return void i.call(e, function (e) {
                    n || o(t, e), n = !0
                }, function (e) {
                    n || a(t, e), n = !0
                })
            } catch (r) {
                return void (n || a(t, r))
            }
            t.a = 0, t.b = e, s(t)
        }
    }

    function a(t, e) {
        if (t.a == f) {
            if (e == t) throw new TypeError;
            t.a = 1, t.b = e, s(t)
        }
    }

    function s(e) {
        t(function () {
            if (e.a != f) for (; e.f.length;) {
                var t = e.f.shift(), n = t[0], i = t[1], r = t[2], t = t[3];
                try {
                    0 == e.a ? r("function" == typeof n ? n.call(void 0, e.b) : e.b) : 1 == e.a && ("function" == typeof i ? r(i.call(void 0, e.b)) : t(e.b))
                } catch (o) {
                    t(o)
                }
            }
        })
    }

    function l(t) {
        return new n(function (e, n) {
            function i(n) {
                return function (i) {
                    a[n] = i, o += 1, o == t.length && e(a)
                }
            }

            var o = 0, a = [];
            0 == t.length && e(a);
            for (var s = 0; s < t.length; s += 1) r(t[s]).c(i(s), n)
        })
    }

    function c(t) {
        return new n(function (e, n) {
            for (var i = 0; i < t.length; i += 1) r(t[i]).c(e, n)
        })
    }

    var u, d = [];
    u = function () {
        setTimeout(e)
    };
    var f = 2;
    n.prototype.g = function (t) {
        return this.c(void 0, t)
    }, n.prototype.c = function (t, e) {
        var i = this;
        return new n(function (n, r) {
            i.f.push([t, e, n, r]), s(i)
        })
    }, window.Promise || (window.Promise = n, window.Promise.resolve = r, window.Promise.reject = i, window.Promise.race = c, window.Promise.all = l, window.Promise.prototype.then = n.prototype.c, window.Promise.prototype["catch"] = n.prototype.g)
}(),


    function () {
        function t(t, e) {
            document.addEventListener ? t.addEventListener("scroll", e, !1) : t.attachEvent("scroll", e)
        }

        function e(t) {
            document.body ? t() : document.addEventListener ? document.addEventListener("DOMContentLoaded", function e() {
                document.removeEventListener("DOMContentLoaded", e), t()
            }) : document.attachEvent("onreadystatechange", function n() {
                "interactive" != document.readyState && "complete" != document.readyState || (document.detachEvent("onreadystatechange", n), t())
            })
        }

        function n(t) {
            this.a = document.createElement("div"), this.a.setAttribute("aria-hidden", "true"), this.a.appendChild(document.createTextNode(t)), this.b = document.createElement("span"), this.c = document.createElement("span"), this.h = document.createElement("span"), this.f = document.createElement("span"), this.g = -1, this.b.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;", this.c.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;", this.f.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;", this.h.style.cssText = "display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;", this.b.appendChild(this.h), this.c.appendChild(this.f), this.a.appendChild(this.b), this.a.appendChild(this.c)
        }

        function i(t, e) {
            t.a.style.cssText = "max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:" + e + ";"
        }

        function r(t) {
            var e = t.a.offsetWidth, n = e + 100;
            return t.f.style.width = n + "px", t.c.scrollLeft = n, t.b.scrollLeft = t.b.scrollWidth + 100, t.g !== e && (t.g = e, !0)
        }

        function o(e, n) {
            function i() {
                var t = o;
                r(t) && t.a.parentNode && n(t.g)
            }

            var o = e;
            t(e.b, i), t(e.c, i), r(e)
        }

        function a(t, e) {
            var n = e || {};
            this.family = t, this.style = n.style || "normal", this.weight = n.weight || "normal", this.stretch = n.stretch || "normal"
        }

        function s() {
            if (null === f) if (l() && /Apple/.test(window.navigator.vendor)) {
                var t = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent);
                f = !!t && 603 > parseInt(t[1], 10)
            } else f = !1;
            return f
        }

        function l() {
            return null === p && (p = !!document.fonts), p
        }

        function c() {
            if (null === h) {
                var t = document.createElement("div");
                try {
                    t.style.font = "condensed 100px sans-serif"
                } catch (e) {
                }
                h = "" !== t.style.font
            }
            return h
        }

        function u(t, e) {
            return [t.style, t.weight, c() ? t.stretch : "", "100px", e].join(" ")
        }

        var d = null, f = null, h = null, p = null;
        a.prototype.load = function (t, r) {
            var a = this, c = t || "BESbswy", f = 0, h = r || 3e3, p = (new Date).getTime();
            return new Promise(function (t, r) {
                if (l() && !s()) {
                    var m = new Promise(function (t, e) {
                        function n() {
                            (new Date).getTime() - p >= h ? e(Error("" + h + "ms timeout exceeded")) : document.fonts.load(u(a, '"' + a.family + '"'), c).then(function (e) {
                                1 <= e.length ? t() : setTimeout(n, 25)
                            }, e)
                        }

                        // n()
                    }), g = new Promise(function (t, e) {
                        f = setTimeout(function () {
                            //     e(Error("" + h + "ms timeout exceeded"))
                        }, h)
                    });
                    Promise.race([g, m]).then(function () {
                        clearTimeout(f), t(a)
                    }, r)
                } else e(function () {
                    function e() {
                        var e;
                        (e = -1 != v && -1 != y || -1 != v && -1 != $ || -1 != y && -1 != $) && ((e = v != y && v != $ && y != $) || (null === d && (e = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent), d = !!e && (536 > parseInt(e[1], 10) || 536 === parseInt(e[1], 10) && 11 >= parseInt(e[2], 10))), e = d && (v == w && y == w && $ == w || v == b && y == b && $ == b || v == x && y == x && $ == x)), e = !e), e && (C.parentNode && C.parentNode.removeChild(C), clearTimeout(f), t(a))
                    }

                    function s() {
                        if ((new Date).getTime() - p >= h) C.parentNode && C.parentNode.removeChild(C), r(Error("" + h + "ms timeout exceeded")); else {
                            var t = document.hidden;
                            !0 !== t && void 0 !== t || (v = l.a.offsetWidth, y = m.a.offsetWidth, $ = g.a.offsetWidth, e()), f = setTimeout(s, 50)
                        }
                    }

                    var l = new n(c), m = new n(c), g = new n(c), v = -1, y = -1, $ = -1, w = -1, b = -1, x = -1,
                        C = document.createElement("div");
                    C.dir = "ltr", i(l, u(a, "sans-serif")), i(m, u(a, "serif")), i(g, u(a, "monospace")), C.appendChild(l.a), C.appendChild(m.a), C.appendChild(g.a), document.body.appendChild(C), w = l.a.offsetWidth, b = m.a.offsetWidth, x = g.a.offsetWidth, s(), o(l, function (t) {
                        v = t, e()
                    }), i(l, u(a, '"' + a.family + '",sans-serif')), o(m, function (t) {
                        y = t, e()
                    }), i(m, u(a, '"' + a.family + '",serif')), o(g, function (t) {
                        $ = t, e()
                    }), i(g, u(a, '"' + a.family + '",monospace'))
                })
            })
        }, "object" == typeof module ? module.exports = a : (window.FontFaceObserver = a, window.FontFaceObserver.prototype.load = a.prototype.load)
    }(),


    function (t, e) {
        "object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) : function (t) {
            if (!t.document) throw new Error("jQuery requires a window with a document");

            return jQuery;//         return e(t)
        } : e(t)
    }("undefined" != typeof window ? window : this, function (t, e) {
        function n(t) {
            var e = !!t && "length" in t && t.length, n = ot.type(t);
            return "function" !== n && !ot.isWindow(t) && ("array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
        }

        function i(t, e, n) {
            if (ot.isFunction(e)) return ot.grep(t, function (t, i) {
                return !!e.call(t, i, t) !== n
            });
            if (e.nodeType) return ot.grep(t, function (t) {
                return t === e !== n
            });
            if ("string" == typeof e) {
                if (mt.test(e)) return ot.filter(e, t, n);
                e = ot.filter(e, t)
            }
            return ot.grep(t, function (t) {
                return J.call(e, t) > -1 !== n
            })
        }

        function r(t, e) {
            for (; (t = t[e]) && 1 !== t.nodeType;) ;
            return t
        }

        function o(t) {
            var e = {};
            return ot.each(t.match(bt) || [], function (t, n) {
                e[n] = !0
            }), e
        }

        function a() {
            Q.removeEventListener("DOMContentLoaded", a), t.removeEventListener("load", a), ot.ready()
        }

        function s() {
            this.expando = ot.expando + s.uid++
        }

        function l(t, e, n) {
            var i;
            if (void 0 === n && 1 === t.nodeType) if (i = "data-" + e.replace(Tt, "-$&").toLowerCase(), n = t.getAttribute(i), "string" == typeof n) {
                try {
                    n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : Et.test(n) ? ot.parseJSON(n) : n)
                } catch (r) {
                }
                _t.set(t, e, n)
            } else n = void 0;
            return n
        }

        function c(t, e, n, i) {
            var r, o = 1, a = 20, s = i ? function () {
                    return i.cur()
                } : function () {
                    return ot.css(t, e, "")
                }, l = s(), c = n && n[3] || (ot.cssNumber[e] ? "" : "px"),
                u = (ot.cssNumber[e] || "px" !== c && +l) && Ot.exec(ot.css(t, e));
            if (u && u[3] !== c) {
                c = c || u[3], n = n || [], u = +l || 1;
                do o = o || ".5", u /= o, ot.style(t, e, u + c); while (o !== (o = s() / l) && 1 !== o && --a)
            }
            return n && (u = +u || +l || 0, r = n[1] ? u + (n[1] + 1) * n[2] : +n[2], i && (i.unit = c, i.start = u, i.end = r)), r
        }

        function u(t, e) {
            var n = "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e || "*") : "undefined" != typeof t.querySelectorAll ? t.querySelectorAll(e || "*") : [];
            return void 0 === e || e && ot.nodeName(t, e) ? ot.merge([t], n) : n
        }

        function d(t, e) {
            for (var n = 0, i = t.length; n < i; n++) St.set(t[n], "globalEval", !e || St.get(e[n], "globalEval"))
        }

        function f(t, e, n, i, r) {
            for (var o, a, s, l, c, f, h = e.createDocumentFragment(), p = [], m = 0, g = t.length; m < g; m++) if (o = t[m], o || 0 === o) if ("object" === ot.type(o)) ot.merge(p, o.nodeType ? [o] : o); else if (Ft.test(o)) {
                for (a = a || h.appendChild(e.createElement("div")), s = (Lt.exec(o) || ["", ""])[1].toLowerCase(), l = Nt[s] || Nt._default, a.innerHTML = l[1] + ot.htmlPrefilter(o) + l[2], f = l[0]; f--;) a = a.lastChild;
                ot.merge(p, a.childNodes), a = h.firstChild, a.textContent = ""
            } else p.push(e.createTextNode(o));
            for (h.textContent = "", m = 0; o = p[m++];) if (i && ot.inArray(o, i) > -1) r && r.push(o); else if (c = ot.contains(o.ownerDocument, o), a = u(h.appendChild(o), "script"), c && d(a), n) for (f = 0; o = a[f++];) jt.test(o.type || "") && n.push(o);
            return h
        }

        function h() {
            return !0
        }

        function p() {
            return !1
        }

        function m() {
            try {
                return Q.activeElement
            } catch (t) {
            }
        }

        function g(t, e, n, i, r, o) {
            var a, s;
            if ("object" == typeof e) {
                "string" != typeof n && (i = i || n, n = void 0);
                for (s in e) g(t, s, n, i, e[s], o);
                return t
            }
            if (null == i && null == r ? (r = n, i = n = void 0) : null == r && ("string" == typeof n ? (r = i, i = void 0) : (r = i, i = n, n = void 0)), r === !1) r = p; else if (!r) return t;
            return 1 === o && (a = r, r = function (t) {
                return ot().off(t), a.apply(this, arguments)
            }, r.guid = a.guid || (a.guid = ot.guid++)), t.each(function () {
                ot.event.add(this, e, r, i, n)
            })
        }

        function v(t, e) {
            return ot.nodeName(t, "table") && ot.nodeName(11 !== e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
        }

        function y(t) {
            return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t
        }

        function $(t) {
            var e = Vt.exec(t.type);
            return e ? t.type = e[1] : t.removeAttribute("type"), t
        }

        function w(t, e) {
            var n, i, r, o, a, s, l, c;
            if (1 === e.nodeType) {
                if (St.hasData(t) && (o = St.access(t), a = St.set(e, o), c = o.events)) {
                    delete a.handle, a.events = {};
                    for (r in c) for (n = 0, i = c[r].length; n < i; n++) ot.event.add(e, r, c[r][n])
                }
                _t.hasData(t) && (s = _t.access(t), l = ot.extend({}, s), _t.set(e, l))
            }
        }

        function b(t, e) {
            var n = e.nodeName.toLowerCase();
            "input" === n && Mt.test(t.type) ? e.checked = t.checked : "input" !== n && "textarea" !== n || (e.defaultValue = t.defaultValue)
        }

        function x(t, e, n, i) {
            e = X.apply([], e);
            var r, o, a, s, l, c, d = 0, h = t.length, p = h - 1, m = e[0], g = ot.isFunction(m);
            if (g || h > 1 && "string" == typeof m && !it.checkClone && Bt.test(m)) return t.each(function (r) {
                var o = t.eq(r);
                g && (e[0] = m.call(this, r, o.html())), x(o, e, n, i)
            });
            if (h && (r = f(e, t[0].ownerDocument, !1, t, i), o = r.firstChild, 1 === r.childNodes.length && (r = o), o || i)) {
                for (a = ot.map(u(r, "script"), y), s = a.length; d < h; d++) l = r, d !== p && (l = ot.clone(l, !0, !0), s && ot.merge(a, u(l, "script"))), n.call(t[d], l, d);
                if (s) for (c = a[a.length - 1].ownerDocument, ot.map(a, $), d = 0; d < s; d++) l = a[d], jt.test(l.type || "") && !St.access(l, "globalEval") && ot.contains(c, l) && (l.src ? ot._evalUrl && ot._evalUrl(l.src) : ot.globalEval(l.textContent.replace(Wt, "")))
            }
            return t
        }

        function C(t, e, n) {
            for (var i, r = e ? ot.filter(e, t) : t, o = 0; null != (i = r[o]); o++) n || 1 !== i.nodeType || ot.cleanData(u(i)), i.parentNode && (n && ot.contains(i.ownerDocument, i) && d(u(i, "script")), i.parentNode.removeChild(i));
            return t
        }

        function k(t, e) {
            var n = ot(e.createElement(t)).appendTo(e.body), i = ot.css(n[0], "display");
            return n.detach(), i
        }

        function S(t) {
            var e = Q, n = Gt[t];
            return n || (n = k(t, e), "none" !== n && n || (Ut = (Ut || ot("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), e = Ut[0].contentDocument, e.write(), e.close(), n = k(t, e), Ut.detach()), Gt[t] = n), n
        }

        function _(t, e, n) {
            var i, r, o, a, s = t.style;
            return n = n || Kt(t), a = n ? n.getPropertyValue(e) || n[e] : void 0, "" !== a && void 0 !== a || ot.contains(t.ownerDocument, t) || (a = ot.style(t, e)), n && !it.pixelMarginRight() && Qt.test(a) && Yt.test(e) && (i = s.width, r = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = i, s.minWidth = r, s.maxWidth = o), void 0 !== a ? a + "" : a
        }

        function E(t, e) {
            return {
                get: function () {
                    return t() ? void delete this.get : (this.get = e).apply(this, arguments)
                }
            }
        }

        function T(t) {
            if (t in ie) return t;
            for (var e = t[0].toUpperCase() + t.slice(1), n = ne.length; n--;) if (t = ne[n] + e, t in ie) return t
        }

        function A(t, e, n) {
            var i = Ot.exec(e);
            return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") : e
        }

        function O(t, e, n, i, r) {
            for (var o = n === (i ? "border" : "content") ? 4 : "width" === e ? 1 : 0, a = 0; o < 4; o += 2) "margin" === n && (a += ot.css(t, n + Dt[o], !0, r)), i ? ("content" === n && (a -= ot.css(t, "padding" + Dt[o], !0, r)), "margin" !== n && (a -= ot.css(t, "border" + Dt[o] + "Width", !0, r))) : (a += ot.css(t, "padding" + Dt[o], !0, r), "padding" !== n && (a += ot.css(t, "border" + Dt[o] + "Width", !0, r)));
            return a
        }

        function D(t, e, n) {
            var i = !0, r = "width" === e ? t.offsetWidth : t.offsetHeight, o = Kt(t),
                a = "border-box" === ot.css(t, "boxSizing", !1, o);
            if (r <= 0 || null == r) {
                if (r = _(t, e, o), (r < 0 || null == r) && (r = t.style[e]), Qt.test(r)) return r;
                i = a && (it.boxSizingReliable() || r === t.style[e]), r = parseFloat(r) || 0
            }
            return r + O(t, e, n || (a ? "border" : "content"), i, o) + "px"
        }

        function P(t, e) {
            for (var n, i, r, o = [], a = 0, s = t.length; a < s; a++) i = t[a], i.style && (o[a] = St.get(i, "olddisplay"), n = i.style.display, e ? (o[a] || "none" !== n || (i.style.display = ""), "" === i.style.display && Pt(i) && (o[a] = St.access(i, "olddisplay", S(i.nodeName)))) : (r = Pt(i), "none" === n && r || St.set(i, "olddisplay", r ? n : ot.css(i, "display"))));
            for (a = 0; a < s; a++) i = t[a], i.style && (e && "none" !== i.style.display && "" !== i.style.display || (i.style.display = e ? o[a] || "" : "none"));
            return t
        }

        function M(t, e, n, i, r) {
            return new M.prototype.init(t, e, n, i, r)
        }

        function L() {
            return t.setTimeout(function () {
                re = void 0
            }), re = ot.now()
        }

        function j(t, e) {
            var n, i = 0, r = {height: t};
            for (e = e ? 1 : 0; i < 4; i += 2 - e) n = Dt[i], r["margin" + n] = r["padding" + n] = t;
            return e && (r.opacity = r.width = t), r
        }

        function N(t, e, n) {
            for (var i, r = (R.tweeners[e] || []).concat(R.tweeners["*"]), o = 0, a = r.length; o < a; o++) if (i = r[o].call(n, e, t)) return i
        }

        function F(t, e, n) {
            var i, r, o, a, s, l, c, u, d = this, f = {}, h = t.style, p = t.nodeType && Pt(t), m = St.get(t, "fxshow");
            n.queue || (s = ot._queueHooks(t, "fx"), null == s.unqueued && (s.unqueued = 0, l = s.empty.fire, s.empty.fire = function () {
                s.unqueued || l()
            }), s.unqueued++, d.always(function () {
                d.always(function () {
                    s.unqueued--, ot.queue(t, "fx").length || s.empty.fire()
                })
            })), 1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [h.overflow, h.overflowX, h.overflowY], c = ot.css(t, "display"), u = "none" === c ? St.get(t, "olddisplay") || S(t.nodeName) : c, "inline" === u && "none" === ot.css(t, "float") && (h.display = "inline-block")), n.overflow && (h.overflow = "hidden", d.always(function () {
                h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
            }));
            for (i in e) if (r = e[i], ae.exec(r)) {
                if (delete e[i], o = o || "toggle" === r, r === (p ? "hide" : "show")) {
                    if ("show" !== r || !m || void 0 === m[i]) continue;
                    p = !0
                }
                f[i] = m && m[i] || ot.style(t, i)
            } else c = void 0;
            if (ot.isEmptyObject(f)) "inline" === ("none" === c ? S(t.nodeName) : c) && (h.display = c); else {
                m ? "hidden" in m && (p = m.hidden) : m = St.access(t, "fxshow", {}), o && (m.hidden = !p), p ? ot(t).show() : d.done(function () {
                    ot(t).hide()
                }), d.done(function () {
                    var e;
                    St.remove(t, "fxshow");
                    for (e in f) ot.style(t, e, f[e])
                });
                for (i in f) a = N(p ? m[i] : 0, i, d), i in m || (m[i] = a.start, p && (a.end = a.start, a.start = "width" === i || "height" === i ? 1 : 0))
            }
        }

        function I(t, e) {
            var n, i, r, o, a;
            for (n in t) if (i = ot.camelCase(n), r = e[i], o = t[n], ot.isArray(o) && (r = o[1], o = t[n] = o[0]), n !== i && (t[i] = o, delete t[n]), a = ot.cssHooks[i], a && "expand" in a) {
                o = a.expand(o), delete t[i];
                for (n in o) n in t || (t[n] = o[n], e[n] = r)
            } else e[i] = r
        }

        function R(t, e, n) {
            var i, r, o = 0, a = R.prefilters.length, s = ot.Deferred().always(function () {
                delete l.elem
            }), l = function () {
                if (r) return !1;
                for (var e = re || L(), n = Math.max(0, c.startTime + c.duration - e), i = n / c.duration || 0, o = 1 - i, a = 0, l = c.tweens.length; a < l; a++) c.tweens[a].run(o);
                return s.notifyWith(t, [c, o, n]), o < 1 && l ? n : (s.resolveWith(t, [c]), !1)
            }, c = s.promise({
                elem: t,
                props: ot.extend({}, e),
                opts: ot.extend(!0, {specialEasing: {}, easing: ot.easing._default}, n),
                originalProperties: e,
                originalOptions: n,
                startTime: re || L(),
                duration: n.duration,
                tweens: [],
                createTween: function (e, n) {
                    var i = ot.Tween(t, c.opts, e, n, c.opts.specialEasing[e] || c.opts.easing);
                    return c.tweens.push(i), i
                },
                stop: function (e) {
                    var n = 0, i = e ? c.tweens.length : 0;
                    if (r) return this;
                    for (r = !0; n < i; n++) c.tweens[n].run(1);
                    return e ? (s.notifyWith(t, [c, 1, 0]), s.resolveWith(t, [c, e])) : s.rejectWith(t, [c, e]), this
                }
            }), u = c.props;
            for (I(u, c.opts.specialEasing); o < a; o++) if (i = R.prefilters[o].call(c, t, u, c.opts)) return ot.isFunction(i.stop) && (ot._queueHooks(c.elem, c.opts.queue).stop = ot.proxy(i.stop, i)), i;
            return ot.map(u, N, c), ot.isFunction(c.opts.start) && c.opts.start.call(t, c), ot.fx.timer(ot.extend(l, {
                elem: t,
                anim: c,
                queue: c.opts.queue
            })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
        }

        function z(t) {
            return t.getAttribute && t.getAttribute("class") || ""
        }

        function q(t) {
            return function (e, n) {
                "string" != typeof e && (n = e, e = "*");
                var i, r = 0, o = e.toLowerCase().match(bt) || [];
                if (ot.isFunction(n)) for (; i = o[r++];) "+" === i[0] ? (i = i.slice(1) || "*", (t[i] = t[i] || []).unshift(n)) : (t[i] = t[i] || []).push(n)
            }
        }

        function H(t, e, n, i) {
            function r(s) {
                var l;
                return o[s] = !0, ot.each(t[s] || [], function (t, s) {
                    var c = s(e, n, i);
                    return "string" != typeof c || a || o[c] ? a ? !(l = c) : void 0 : (e.dataTypes.unshift(c), r(c), !1)
                }), l
            }

            var o = {}, a = t === _e;
            return r(e.dataTypes[0]) || !o["*"] && r("*")
        }

        function B(t, e) {
            var n, i, r = ot.ajaxSettings.flatOptions || {};
            for (n in e) void 0 !== e[n] && ((r[n] ? t : i || (i = {}))[n] = e[n]);
            return i && ot.extend(!0, t, i), t
        }

        function V(t, e, n) {
            for (var i, r, o, a, s = t.contents, l = t.dataTypes; "*" === l[0];) l.shift(), void 0 === i && (i = t.mimeType || e.getResponseHeader("Content-Type"));
            if (i) for (r in s) if (s[r] && s[r].test(i)) {
                l.unshift(r);
                break
            }
            if (l[0] in n) o = l[0]; else {
                for (r in n) {
                    if (!l[0] || t.converters[r + " " + l[0]]) {
                        o = r;
                        break
                    }
                    a || (a = r)
                }
                o = o || a
            }
            if (o) return o !== l[0] && l.unshift(o), n[o]
        }

        function W(t, e, n, i) {
            var r, o, a, s, l, c = {}, u = t.dataTypes.slice();
            if (u[1]) for (a in t.converters) c[a.toLowerCase()] = t.converters[a];
            for (o = u.shift(); o;) if (t.responseFields[o] && (n[t.responseFields[o]] = e), !l && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = o, o = u.shift()) if ("*" === o) o = l; else if ("*" !== l && l !== o) {
                if (a = c[l + " " + o] || c["* " + o], !a) for (r in c) if (s = r.split(" "), s[1] === o && (a = c[l + " " + s[0]] || c["* " + s[0]])) {
                    a === !0 ? a = c[r] : c[r] !== !0 && (o = s[0], u.unshift(s[1]));
                    break
                }
                if (a !== !0) if (a && t["throws"]) e = a(e); else try {
                    e = a(e)
                } catch (d) {
                    return {state: "parsererror", error: a ? d : "No conversion from " + l + " to " + o}
                }
            }
            return {state: "success", data: e}
        }

        function U(t, e, n, i) {
            var r;
            if (ot.isArray(e)) ot.each(e, function (e, r) {
                n || Oe.test(t) ? i(t, r) : U(t + "[" + ("object" == typeof r && null != r ? e : "") + "]", r, n, i)
            }); else if (n || "object" !== ot.type(e)) i(t, e); else for (r in e) U(t + "[" + r + "]", e[r], n, i)
        }

        function G(t) {
            return ot.isWindow(t) ? t : 9 === t.nodeType && t.defaultView
        }

        var Y = [], Q = t.document, K = Y.slice, X = Y.concat, Z = Y.push, J = Y.indexOf, tt = {}, et = tt.toString,
            nt = tt.hasOwnProperty, it = {}, rt = "2.2.4", ot = function (t, e) {
                return new ot.fn.init(t, e)
            }, at = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, st = /^-ms-/, lt = /-([\da-z])/gi, ct = function (t, e) {
                return e.toUpperCase()
            };
        ot.fn = ot.prototype = {
            jquery: rt, constructor: ot, selector: "", length: 0, toArray: function () {
                return K.call(this)
            }, get: function (t) {
                return null != t ? t < 0 ? this[t + this.length] : this[t] : K.call(this)
            }, pushStack: function (t) {
                var e = ot.merge(this.constructor(), t);
                return e.prevObject = this, e.context = this.context, e
            }, each: function (t) {
                return ot.each(this, t)
            }, map: function (t) {
                return this.pushStack(ot.map(this, function (e, n) {
                    return t.call(e, n, e)
                }))
            }, slice: function () {
                return this.pushStack(K.apply(this, arguments))
            }, first: function () {
                return this.eq(0)
            }, last: function () {
                return this.eq(-1)
            }, eq: function (t) {
                var e = this.length, n = +t + (t < 0 ? e : 0);
                return this.pushStack(n >= 0 && n < e ? [this[n]] : [])
            }, end: function () {
                return this.prevObject || this.constructor()
            }, push: Z, sort: Y.sort, splice: Y.splice
        }, ot.extend = ot.fn.extend = function () {
            var t, e, n, i, r, o, a = arguments[0] || {}, s = 1, l = arguments.length, c = !1;
            for ("boolean" == typeof a && (c = a, a = arguments[s] || {}, s++), "object" == typeof a || ot.isFunction(a) || (a = {}), s === l && (a = this, s--); s < l; s++) if (null != (t = arguments[s])) for (e in t) n = a[e], i = t[e], a !== i && (c && i && (ot.isPlainObject(i) || (r = ot.isArray(i))) ? (r ? (r = !1, o = n && ot.isArray(n) ? n : []) : o = n && ot.isPlainObject(n) ? n : {}, a[e] = ot.extend(c, o, i)) : void 0 !== i && (a[e] = i));
            return a
        }, ot.extend({
            expando: "jQuery" + (rt + Math.random()).replace(/\D/g, ""), isReady: !0, error: function (t) {
                throw new Error(t)
            }, noop: function () {
            }, isFunction: function (t) {
                return "function" === ot.type(t)
            }, isArray: Array.isArray, isWindow: function (t) {
                return null != t && t === t.window
            }, isNumeric: function (t) {
                var e = t && t.toString();
                return !ot.isArray(t) && e - parseFloat(e) + 1 >= 0
            }, isPlainObject: function (t) {
                var e;
                if ("object" !== ot.type(t) || t.nodeType || ot.isWindow(t)) return !1;
                if (t.constructor && !nt.call(t, "constructor") && !nt.call(t.constructor.prototype || {}, "isPrototypeOf")) return !1;
                for (e in t) ;
                return void 0 === e || nt.call(t, e)
            }, isEmptyObject: function (t) {
                var e;
                for (e in t) return !1;
                return !0
            }, type: function (t) {
                return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? tt[et.call(t)] || "object" : typeof t
            }, globalEval: function (t) {
                var e, n = eval;
                t = ot.trim(t), t && (1 === t.indexOf("use strict") ? (e = Q.createElement("script"), e.text = t, Q.head.appendChild(e).parentNode.removeChild(e)) : n(t))
            }, camelCase: function (t) {
                return t.replace(st, "ms-").replace(lt, ct)
            }, nodeName: function (t, e) {
                return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
            }, each: function (t, e) {
                var i, r = 0;
                if (n(t)) for (i = t.length; r < i && e.call(t[r], r, t[r]) !== !1; r++) ; else for (r in t) if (e.call(t[r], r, t[r]) === !1) break;
                return t
            }, trim: function (t) {
                return null == t ? "" : (t + "").replace(at, "")
            }, makeArray: function (t, e) {
                var i = e || [];
                return null != t && (n(Object(t)) ? ot.merge(i, "string" == typeof t ? [t] : t) : Z.call(i, t)), i
            }, inArray: function (t, e, n) {
                return null == e ? -1 : J.call(e, t, n)
            }, merge: function (t, e) {
                for (var n = +e.length, i = 0, r = t.length; i < n; i++) t[r++] = e[i];
                return t.length = r, t
            }, grep: function (t, e, n) {
                for (var i, r = [], o = 0, a = t.length, s = !n; o < a; o++) i = !e(t[o], o), i !== s && r.push(t[o]);
                return r
            }, map: function (t, e, i) {
                var r, o, a = 0, s = [];
                if (n(t)) for (r = t.length; a < r; a++) o = e(t[a], a, i), null != o && s.push(o); else for (a in t) o = e(t[a], a, i), null != o && s.push(o);
                return X.apply([], s)
            }, guid: 1, proxy: function (t, e) {
                var n, i, r;
                if ("string" == typeof e && (n = t[e], e = t, t = n), ot.isFunction(t)) return i = K.call(arguments, 2), r = function () {
                    return t.apply(e || this, i.concat(K.call(arguments)))
                }, r.guid = t.guid = t.guid || ot.guid++, r
            }, now: Date.now, support: it
        }), "function" == typeof Symbol && (ot.fn[Symbol.iterator] = Y[Symbol.iterator]), ot.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (t, e) {
            tt["[object " + e + "]"] = e.toLowerCase()
        });
        var ut = function (t) {
            function e(t, e, n, i) {
                var r, o, a, s, l, c, d, h, p = e && e.ownerDocument, m = e ? e.nodeType : 9;
                if (n = n || [], "string" != typeof t || !t || 1 !== m && 9 !== m && 11 !== m) return n;
                if (!i && ((e ? e.ownerDocument || e : z) !== P && D(e), e = e || P, L)) {
                    if (11 !== m && (c = vt.exec(t))) if (r = c[1]) {
                        if (9 === m) {
                            if (!(a = e.getElementById(r))) return n;
                            if (a.id === r) return n.push(a), n
                        } else if (p && (a = p.getElementById(r)) && I(e, a) && a.id === r) return n.push(a), n
                    } else {
                        if (c[2]) return Z.apply(n, e.getElementsByTagName(t)), n;
                        if ((r = c[3]) && b.getElementsByClassName && e.getElementsByClassName) return Z.apply(n, e.getElementsByClassName(r)), n
                    }
                    if (b.qsa && !W[t + " "] && (!j || !j.test(t))) {
                        if (1 !== m) p = e, h = t; else if ("object" !== e.nodeName.toLowerCase()) {
                            for ((s = e.getAttribute("id")) ? s = s.replace($t, "\\$&") : e.setAttribute("id", s = R), d = S(t), o = d.length, l = ft.test(s) ? "#" + s : "[id='" + s + "']"; o--;) d[o] = l + " " + f(d[o]);
                            h = d.join(","), p = yt.test(t) && u(e.parentNode) || e
                        }
                        if (h) try {
                            return Z.apply(n, p.querySelectorAll(h)), n
                        } catch (g) {
                        } finally {
                            s === R && e.removeAttribute("id")
                        }
                    }
                }
                return E(t.replace(st, "$1"), e, n, i)
            }

            function n() {
                function t(n, i) {
                    return e.push(n + " ") > x.cacheLength && delete t[e.shift()], t[n + " "] = i
                }

                var e = [];
                return t
            }

            function i(t) {
                return t[R] = !0, t
            }

            function r(t) {
                var e = P.createElement("div");
                try {
                    return !!t(e)
                } catch (n) {
                    return !1
                } finally {
                    e.parentNode && e.parentNode.removeChild(e), e = null
                }
            }

            function o(t, e) {
                for (var n = t.split("|"), i = n.length; i--;) x.attrHandle[n[i]] = e
            }

            function a(t, e) {
                var n = e && t,
                    i = n && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || G) - (~t.sourceIndex || G);
                if (i) return i;
                if (n) for (; n = n.nextSibling;) if (n === e) return -1;
                return t ? 1 : -1
            }

            function s(t) {
                return function (e) {
                    var n = e.nodeName.toLowerCase();
                    return "input" === n && e.type === t
                }
            }

            function l(t) {
                return function (e) {
                    var n = e.nodeName.toLowerCase();
                    return ("input" === n || "button" === n) && e.type === t
                }
            }

            function c(t) {
                return i(function (e) {
                    return e = +e, i(function (n, i) {
                        for (var r, o = t([], n.length, e), a = o.length; a--;) n[r = o[a]] && (n[r] = !(i[r] = n[r]))
                    })
                })
            }

            function u(t) {
                return t && "undefined" != typeof t.getElementsByTagName && t
            }

            function d() {
            }

            function f(t) {
                for (var e = 0, n = t.length, i = ""; e < n; e++) i += t[e].value;
                return i
            }

            function h(t, e, n) {
                var i = e.dir, r = n && "parentNode" === i, o = H++;
                return e.first ? function (e, n, o) {
                    for (; e = e[i];) if (1 === e.nodeType || r) return t(e, n, o)
                } : function (e, n, a) {
                    var s, l, c, u = [q, o];
                    if (a) {
                        for (; e = e[i];) if ((1 === e.nodeType || r) && t(e, n, a)) return !0
                    } else for (; e = e[i];) if (1 === e.nodeType || r) {
                        if (c = e[R] || (e[R] = {}), l = c[e.uniqueID] || (c[e.uniqueID] = {}), (s = l[i]) && s[0] === q && s[1] === o) return u[2] = s[2];
                        if (l[i] = u, u[2] = t(e, n, a)) return !0
                    }
                }
            }

            function p(t) {
                return t.length > 1 ? function (e, n, i) {
                    for (var r = t.length; r--;) if (!t[r](e, n, i)) return !1;
                    return !0
                } : t[0]
            }

            function m(t, n, i) {
                for (var r = 0, o = n.length; r < o; r++) e(t, n[r], i);
                return i
            }

            function g(t, e, n, i, r) {
                for (var o, a = [], s = 0, l = t.length, c = null != e; s < l; s++) (o = t[s]) && (n && !n(o, i, r) || (a.push(o), c && e.push(s)));
                return a
            }

            function v(t, e, n, r, o, a) {
                return r && !r[R] && (r = v(r)), o && !o[R] && (o = v(o, a)), i(function (i, a, s, l) {
                    var c, u, d, f = [], h = [], p = a.length, v = i || m(e || "*", s.nodeType ? [s] : s, []),
                        y = !t || !i && e ? v : g(v, f, t, s, l), $ = n ? o || (i ? t : p || r) ? [] : a : y;
                    if (n && n(y, $, s, l), r) for (c = g($, h), r(c, [], s, l), u = c.length; u--;) (d = c[u]) && ($[h[u]] = !(y[h[u]] = d));
                    if (i) {
                        if (o || t) {
                            if (o) {
                                for (c = [], u = $.length; u--;) (d = $[u]) && c.push(y[u] = d);
                                o(null, $ = [], c, l)
                            }
                            for (u = $.length; u--;) (d = $[u]) && (c = o ? tt(i, d) : f[u]) > -1 && (i[c] = !(a[c] = d))
                        }
                    } else $ = g($ === a ? $.splice(p, $.length) : $), o ? o(null, a, $, l) : Z.apply(a, $)
                })
            }

            function y(t) {
                for (var e, n, i, r = t.length, o = x.relative[t[0].type], a = o || x.relative[" "], s = o ? 1 : 0, l = h(function (t) {
                    return t === e
                }, a, !0), c = h(function (t) {
                    return tt(e, t) > -1
                }, a, !0), u = [function (t, n, i) {
                    var r = !o && (i || n !== T) || ((e = n).nodeType ? l(t, n, i) : c(t, n, i));
                    return e = null, r
                }]; s < r; s++) if (n = x.relative[t[s].type]) u = [h(p(u), n)]; else {
                    if (n = x.filter[t[s].type].apply(null, t[s].matches), n[R]) {
                        for (i = ++s; i < r && !x.relative[t[i].type]; i++) ;
                        return v(s > 1 && p(u), s > 1 && f(t.slice(0, s - 1).concat({value: " " === t[s - 2].type ? "*" : ""})).replace(st, "$1"), n, s < i && y(t.slice(s, i)), i < r && y(t = t.slice(i)), i < r && f(t))
                    }
                    u.push(n)
                }
                return p(u)
            }

            function $(t, n) {
                var r = n.length > 0, o = t.length > 0, a = function (i, a, s, l, c) {
                    var u, d, f, h = 0, p = "0", m = i && [], v = [], y = T, $ = i || o && x.find.TAG("*", c),
                        w = q += null == y ? 1 : Math.random() || .1, b = $.length;
                    for (c && (T = a === P || a || c); p !== b && null != (u = $[p]); p++) {
                        if (o && u) {
                            for (d = 0, a || u.ownerDocument === P || (D(u), s = !L); f = t[d++];) if (f(u, a || P, s)) {
                                l.push(u);
                                break
                            }
                            c && (q = w)
                        }
                        r && ((u = !f && u) && h--, i && m.push(u))
                    }
                    if (h += p, r && p !== h) {
                        for (d = 0; f = n[d++];) f(m, v, a, s);
                        if (i) {
                            if (h > 0) for (; p--;) m[p] || v[p] || (v[p] = K.call(l));
                            v = g(v)
                        }
                        Z.apply(l, v), c && !i && v.length > 0 && h + n.length > 1 && e.uniqueSort(l)
                    }
                    return c && (q = w, T = y), m
                };
                return r ? i(a) : a
            }

            var w, b, x, C, k, S, _, E, T, A, O, D, P, M, L, j, N, F, I, R = "sizzle" + 1 * new Date, z = t.document,
                q = 0,
                H = 0, B = n(), V = n(), W = n(), U = function (t, e) {
                    return t === e && (O = !0), 0
                }, G = 1 << 31, Y = {}.hasOwnProperty, Q = [], K = Q.pop, X = Q.push, Z = Q.push, J = Q.slice,
                tt = function (t, e) {
                    for (var n = 0, i = t.length; n < i; n++) if (t[n] === e) return n;
                    return -1
                },
                et = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                nt = "[\\x20\\t\\r\\n\\f]", it = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                rt = "\\[" + nt + "*(" + it + ")(?:" + nt + "*([*^$|!~]?=)" + nt + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + it + "))|)" + nt + "*\\]",
                ot = ":(" + it + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + rt + ")*)|.*)\\)|)",
                at = new RegExp(nt + "+", "g"),
                st = new RegExp("^" + nt + "+|((?:^|[^\\\\])(?:\\\\.)*)" + nt + "+$", "g"),
                lt = new RegExp("^" + nt + "*," + nt + "*"),
                ct = new RegExp("^" + nt + "*([>+~]|" + nt + ")" + nt + "*"),
                ut = new RegExp("=" + nt + "*([^\\]'\"]*?)" + nt + "*\\]", "g"), dt = new RegExp(ot),
                ft = new RegExp("^" + it + "$"), ht = {
                    ID: new RegExp("^#(" + it + ")"),
                    CLASS: new RegExp("^\\.(" + it + ")"),
                    TAG: new RegExp("^(" + it + "|[*])"),
                    ATTR: new RegExp("^" + rt),
                    PSEUDO: new RegExp("^" + ot),
                    CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + nt + "*(even|odd|(([+-]|)(\\d*)n|)" + nt + "*(?:([+-]|)" + nt + "*(\\d+)|))" + nt + "*\\)|)", "i"),
                    bool: new RegExp("^(?:" + et + ")$", "i"),
                    needsContext: new RegExp("^" + nt + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + nt + "*((?:-\\d)?\\d*)" + nt + "*\\)|)(?=[^-]|$)", "i")
                }, pt = /^(?:input|select|textarea|button)$/i, mt = /^h\d$/i, gt = /^[^{]+\{\s*\[native \w/,
                vt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, yt = /[+~]/, $t = /'|\\/g,
                wt = new RegExp("\\\\([\\da-f]{1,6}" + nt + "?|(" + nt + ")|.)", "ig"), bt = function (t, e, n) {
                    var i = "0x" + e - 65536;
                    return i !== i || n ? e : i < 0 ? String.fromCharCode(i + 65536) : String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320);
                }, xt = function () {
                    D()
                };
            try {
                Z.apply(Q = J.call(z.childNodes), z.childNodes), Q[z.childNodes.length].nodeType
            } catch (Ct) {
                Z = {
                    apply: Q.length ? function (t, e) {
                        X.apply(t, J.call(e))
                    } : function (t, e) {
                        for (var n = t.length, i = 0; t[n++] = e[i++];) ;
                        t.length = n - 1
                    }
                }
            }
            b = e.support = {}, k = e.isXML = function (t) {
                var e = t && (t.ownerDocument || t).documentElement;
                return !!e && "HTML" !== e.nodeName
            }, D = e.setDocument = function (t) {
                var e, n, i = t ? t.ownerDocument || t : z;
                return i !== P && 9 === i.nodeType && i.documentElement ? (P = i, M = P.documentElement, L = !k(P), (n = P.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", xt, !1) : n.attachEvent && n.attachEvent("onunload", xt)), b.attributes = r(function (t) {
                    return t.className = "i", !t.getAttribute("className")
                }), b.getElementsByTagName = r(function (t) {
                    return t.appendChild(P.createComment("")), !t.getElementsByTagName("*").length
                }), b.getElementsByClassName = gt.test(P.getElementsByClassName), b.getById = r(function (t) {
                    return M.appendChild(t).id = R, !P.getElementsByName || !P.getElementsByName(R).length
                }), b.getById ? (x.find.ID = function (t, e) {
                    if ("undefined" != typeof e.getElementById && L) {
                        var n = e.getElementById(t);
                        return n ? [n] : []
                    }
                }, x.filter.ID = function (t) {
                    var e = t.replace(wt, bt);
                    return function (t) {
                        return t.getAttribute("id") === e
                    }
                }) : (delete x.find.ID, x.filter.ID = function (t) {
                    var e = t.replace(wt, bt);
                    return function (t) {
                        var n = "undefined" != typeof t.getAttributeNode && t.getAttributeNode("id");
                        return n && n.value === e
                    }
                }), x.find.TAG = b.getElementsByTagName ? function (t, e) {
                    return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t) : b.qsa ? e.querySelectorAll(t) : void 0
                } : function (t, e) {
                    var n, i = [], r = 0, o = e.getElementsByTagName(t);
                    if ("*" === t) {
                        for (; n = o[r++];) 1 === n.nodeType && i.push(n);
                        return i
                    }
                    return o
                }, x.find.CLASS = b.getElementsByClassName && function (t, e) {
                    if ("undefined" != typeof e.getElementsByClassName && L) return e.getElementsByClassName(t)
                }, N = [], j = [], (b.qsa = gt.test(P.querySelectorAll)) && (r(function (t) {
                    M.appendChild(t).innerHTML = "<a id='" + R + "'></a><select id='" + R + "-\r\\' msallowcapture=''><option selected=''></option></select>", t.querySelectorAll("[msallowcapture^='']").length && j.push("[*^$]=" + nt + "*(?:''|\"\")"), t.querySelectorAll("[selected]").length || j.push("\\[" + nt + "*(?:value|" + et + ")"), t.querySelectorAll("[id~=" + R + "-]").length || j.push("~="), t.querySelectorAll(":checked").length || j.push(":checked"), t.querySelectorAll("a#" + R + "+*").length || j.push(".#.+[+~]")
                }), r(function (t) {
                    var e = P.createElement("input");
                    e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && j.push("name" + nt + "*[*^$|!~]?="), t.querySelectorAll(":enabled").length || j.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), j.push(",.*:")
                })), (b.matchesSelector = gt.test(F = M.matches || M.webkitMatchesSelector || M.mozMatchesSelector || M.oMatchesSelector || M.msMatchesSelector)) && r(function (t) {
                    b.disconnectedMatch = F.call(t, "div"), F.call(t, "[s!='']:x"), N.push("!=", ot)
                }), j = j.length && new RegExp(j.join("|")), N = N.length && new RegExp(N.join("|")), e = gt.test(M.compareDocumentPosition), I = e || gt.test(M.contains) ? function (t, e) {
                    var n = 9 === t.nodeType ? t.documentElement : t, i = e && e.parentNode;
                    return t === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)))
                } : function (t, e) {
                    if (e) for (; e = e.parentNode;) if (e === t) return !0;
                    return !1
                }, U = e ? function (t, e) {
                    if (t === e) return O = !0, 0;
                    var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
                    return n ? n : (n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) : 1, 1 & n || !b.sortDetached && e.compareDocumentPosition(t) === n ? t === P || t.ownerDocument === z && I(z, t) ? -1 : e === P || e.ownerDocument === z && I(z, e) ? 1 : A ? tt(A, t) - tt(A, e) : 0 : 4 & n ? -1 : 1)
                } : function (t, e) {
                    if (t === e) return O = !0, 0;
                    var n, i = 0, r = t.parentNode, o = e.parentNode, s = [t], l = [e];
                    if (!r || !o) return t === P ? -1 : e === P ? 1 : r ? -1 : o ? 1 : A ? tt(A, t) - tt(A, e) : 0;
                    if (r === o) return a(t, e);
                    for (n = t; n = n.parentNode;) s.unshift(n);
                    for (n = e; n = n.parentNode;) l.unshift(n);
                    for (; s[i] === l[i];) i++;
                    return i ? a(s[i], l[i]) : s[i] === z ? -1 : l[i] === z ? 1 : 0
                }, P) : P
            }, e.matches = function (t, n) {
                return e(t, null, null, n)
            }, e.matchesSelector = function (t, n) {
                if ((t.ownerDocument || t) !== P && D(t), n = n.replace(ut, "='$1']"), b.matchesSelector && L && !W[n + " "] && (!N || !N.test(n)) && (!j || !j.test(n))) try {
                    var i = F.call(t, n);
                    if (i || b.disconnectedMatch || t.document && 11 !== t.document.nodeType) return i
                } catch (r) {
                }
                return e(n, P, null, [t]).length > 0
            }, e.contains = function (t, e) {
                return (t.ownerDocument || t) !== P && D(t), I(t, e)
            }, e.attr = function (t, e) {
                (t.ownerDocument || t) !== P && D(t);
                var n = x.attrHandle[e.toLowerCase()],
                    i = n && Y.call(x.attrHandle, e.toLowerCase()) ? n(t, e, !L) : void 0;
                return void 0 !== i ? i : b.attributes || !L ? t.getAttribute(e) : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
            }, e.error = function (t) {
                throw new Error("Syntax error, unrecognized expression: " + t)
            }, e.uniqueSort = function (t) {
                var e, n = [], i = 0, r = 0;
                if (O = !b.detectDuplicates, A = !b.sortStable && t.slice(0), t.sort(U), O) {
                    for (; e = t[r++];) e === t[r] && (i = n.push(r));
                    for (; i--;) t.splice(n[i], 1)
                }
                return A = null, t
            }, C = e.getText = function (t) {
                var e, n = "", i = 0, r = t.nodeType;
                if (r) {
                    if (1 === r || 9 === r || 11 === r) {
                        if ("string" == typeof t.textContent) return t.textContent;
                        for (t = t.firstChild; t; t = t.nextSibling) n += C(t)
                    } else if (3 === r || 4 === r) return t.nodeValue
                } else for (; e = t[i++];) n += C(e);
                return n
            }, x = e.selectors = {
                cacheLength: 50,
                createPseudo: i,
                match: ht,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {dir: "parentNode", first: !0},
                    " ": {dir: "parentNode"},
                    "+": {dir: "previousSibling", first: !0},
                    "~": {dir: "previousSibling"}
                },
                preFilter: {
                    ATTR: function (t) {
                        return t[1] = t[1].replace(wt, bt), t[3] = (t[3] || t[4] || t[5] || "").replace(wt, bt), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                    }, CHILD: function (t) {
                        return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && e.error(t[0]), t
                    }, PSEUDO: function (t) {
                        var e, n = !t[6] && t[2];
                        return ht.CHILD.test(t[0]) ? null : (t[3] ? t[2] = t[4] || t[5] || "" : n && dt.test(n) && (e = S(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), t[2] = n.slice(0, e)), t.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function (t) {
                        var e = t.replace(wt, bt).toLowerCase();
                        return "*" === t ? function () {
                            return !0
                        } : function (t) {
                            return t.nodeName && t.nodeName.toLowerCase() === e
                        }
                    }, CLASS: function (t) {
                        var e = B[t + " "];
                        return e || (e = new RegExp("(^|" + nt + ")" + t + "(" + nt + "|$)")) && B(t, function (t) {
                            return e.test("string" == typeof t.className && t.className || "undefined" != typeof t.getAttribute && t.getAttribute("class") || "")
                        })
                    }, ATTR: function (t, n, i) {
                        return function (r) {
                            var o = e.attr(r, t);
                            return null == o ? "!=" === n : !n || (o += "", "=" === n ? o === i : "!=" === n ? o !== i : "^=" === n ? i && 0 === o.indexOf(i) : "*=" === n ? i && o.indexOf(i) > -1 : "$=" === n ? i && o.slice(-i.length) === i : "~=" === n ? (" " + o.replace(at, " ") + " ").indexOf(i) > -1 : "|=" === n && (o === i || o.slice(0, i.length + 1) === i + "-"))
                        }
                    }, CHILD: function (t, e, n, i, r) {
                        var o = "nth" !== t.slice(0, 3), a = "last" !== t.slice(-4), s = "of-type" === e;
                        return 1 === i && 0 === r ? function (t) {
                            return !!t.parentNode
                        } : function (e, n, l) {
                            var c, u, d, f, h, p, m = o !== a ? "nextSibling" : "previousSibling", g = e.parentNode,
                                v = s && e.nodeName.toLowerCase(), y = !l && !s, $ = !1;
                            if (g) {
                                if (o) {
                                    for (; m;) {
                                        for (f = e; f = f[m];) if (s ? f.nodeName.toLowerCase() === v : 1 === f.nodeType) return !1;
                                        p = m = "only" === t && !p && "nextSibling"
                                    }
                                    return !0
                                }
                                if (p = [a ? g.firstChild : g.lastChild], a && y) {
                                    for (f = g, d = f[R] || (f[R] = {}), u = d[f.uniqueID] || (d[f.uniqueID] = {}), c = u[t] || [], h = c[0] === q && c[1], $ = h && c[2], f = h && g.childNodes[h]; f = ++h && f && f[m] || ($ = h = 0) || p.pop();) if (1 === f.nodeType && ++$ && f === e) {
                                        u[t] = [q, h, $];
                                        break
                                    }
                                } else if (y && (f = e, d = f[R] || (f[R] = {}), u = d[f.uniqueID] || (d[f.uniqueID] = {}), c = u[t] || [], h = c[0] === q && c[1], $ = h), $ === !1) for (; (f = ++h && f && f[m] || ($ = h = 0) || p.pop()) && ((s ? f.nodeName.toLowerCase() !== v : 1 !== f.nodeType) || !++$ || (y && (d = f[R] || (f[R] = {}), u = d[f.uniqueID] || (d[f.uniqueID] = {}), u[t] = [q, $]), f !== e));) ;
                                return $ -= r, $ === i || $ % i === 0 && $ / i >= 0
                            }
                        }
                    }, PSEUDO: function (t, n) {
                        var r, o = x.pseudos[t] || x.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
                        return o[R] ? o(n) : o.length > 1 ? (r = [t, t, "", n], x.setFilters.hasOwnProperty(t.toLowerCase()) ? i(function (t, e) {
                            for (var i, r = o(t, n), a = r.length; a--;) i = tt(t, r[a]), t[i] = !(e[i] = r[a])
                        }) : function (t) {
                            return o(t, 0, r)
                        }) : o
                    }
                },
                pseudos: {
                    not: i(function (t) {
                        var e = [], n = [], r = _(t.replace(st, "$1"));
                        return r[R] ? i(function (t, e, n, i) {
                            for (var o, a = r(t, null, i, []), s = t.length; s--;) (o = a[s]) && (t[s] = !(e[s] = o))
                        }) : function (t, i, o) {
                            return e[0] = t, r(e, null, o, n), e[0] = null, !n.pop()
                        }
                    }), has: i(function (t) {
                        return function (n) {
                            return e(t, n).length > 0
                        }
                    }), contains: i(function (t) {
                        return t = t.replace(wt, bt), function (e) {
                            return (e.textContent || e.innerText || C(e)).indexOf(t) > -1
                        }
                    }), lang: i(function (t) {
                        return ft.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(wt, bt).toLowerCase(), function (e) {
                            var n;
                            do if (n = L ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return n = n.toLowerCase(), n === t || 0 === n.indexOf(t + "-"); while ((e = e.parentNode) && 1 === e.nodeType);
                            return !1
                        }
                    }), target: function (e) {
                        var n = t.location && t.location.hash;
                        return n && n.slice(1) === e.id
                    }, root: function (t) {
                        return t === M
                    }, focus: function (t) {
                        return t === P.activeElement && (!P.hasFocus || P.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                    }, enabled: function (t) {
                        return t.disabled === !1
                    }, disabled: function (t) {
                        return t.disabled === !0
                    }, checked: function (t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && !!t.checked || "option" === e && !!t.selected
                    }, selected: function (t) {
                        return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                    }, empty: function (t) {
                        for (t = t.firstChild; t; t = t.nextSibling) if (t.nodeType < 6) return !1;
                        return !0
                    }, parent: function (t) {
                        return !x.pseudos.empty(t)
                    }, header: function (t) {
                        return mt.test(t.nodeName)
                    }, input: function (t) {
                        return pt.test(t.nodeName)
                    }, button: function (t) {
                        var e = t.nodeName.toLowerCase();
                        return "input" === e && "button" === t.type || "button" === e
                    }, text: function (t) {
                        var e;
                        return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase())
                    }, first: c(function () {
                        return [0]
                    }), last: c(function (t, e) {
                        return [e - 1]
                    }), eq: c(function (t, e, n) {
                        return [n < 0 ? n + e : n]
                    }), even: c(function (t, e) {
                        for (var n = 0; n < e; n += 2) t.push(n);
                        return t
                    }), odd: c(function (t, e) {
                        for (var n = 1; n < e; n += 2) t.push(n);
                        return t
                    }), lt: c(function (t, e, n) {
                        for (var i = n < 0 ? n + e : n; --i >= 0;) t.push(i);
                        return t
                    }), gt: c(function (t, e, n) {
                        for (var i = n < 0 ? n + e : n; ++i < e;) t.push(i);
                        return t
                    })
                }
            }, x.pseudos.nth = x.pseudos.eq;
            for (w in {radio: !0, checkbox: !0, file: !0, password: !0, image: !0}) x.pseudos[w] = s(w);
            for (w in {submit: !0, reset: !0}) x.pseudos[w] = l(w);
            return d.prototype = x.filters = x.pseudos, x.setFilters = new d, S = e.tokenize = function (t, n) {
                var i, r, o, a, s, l, c, u = V[t + " "];
                if (u) return n ? 0 : u.slice(0);
                for (s = t, l = [], c = x.preFilter; s;) {
                    i && !(r = lt.exec(s)) || (r && (s = s.slice(r[0].length) || s), l.push(o = [])), i = !1, (r = ct.exec(s)) && (i = r.shift(), o.push({
                        value: i,
                        type: r[0].replace(st, " ")
                    }), s = s.slice(i.length));
                    for (a in x.filter) !(r = ht[a].exec(s)) || c[a] && !(r = c[a](r)) || (i = r.shift(), o.push({
                        value: i,
                        type: a,
                        matches: r
                    }), s = s.slice(i.length));
                    if (!i) break
                }
                return n ? s.length : s ? e.error(t) : V(t, l).slice(0)
            }, _ = e.compile = function (t, e) {
                var n, i = [], r = [], o = W[t + " "];
                if (!o) {
                    for (e || (e = S(t)), n = e.length; n--;) o = y(e[n]), o[R] ? i.push(o) : r.push(o);
                    o = W(t, $(r, i)), o.selector = t
                }
                return o
            }, E = e.select = function (t, e, n, i) {
                var r, o, a, s, l, c = "function" == typeof t && t, d = !i && S(t = c.selector || t);
                if (n = n || [], 1 === d.length) {
                    if (o = d[0] = d[0].slice(0), o.length > 2 && "ID" === (a = o[0]).type && b.getById && 9 === e.nodeType && L && x.relative[o[1].type]) {
                        if (e = (x.find.ID(a.matches[0].replace(wt, bt), e) || [])[0], !e) return n;
                        c && (e = e.parentNode), t = t.slice(o.shift().value.length)
                    }
                    for (r = ht.needsContext.test(t) ? 0 : o.length; r-- && (a = o[r], !x.relative[s = a.type]);) if ((l = x.find[s]) && (i = l(a.matches[0].replace(wt, bt), yt.test(o[0].type) && u(e.parentNode) || e))) {
                        if (o.splice(r, 1), t = i.length && f(o), !t) return Z.apply(n, i), n;
                        break
                    }
                }
                return (c || _(t, d))(i, e, !L, n, !e || yt.test(t) && u(e.parentNode) || e), n
            }, b.sortStable = R.split("").sort(U).join("") === R, b.detectDuplicates = !!O, D(), b.sortDetached = r(function (t) {
                return 1 & t.compareDocumentPosition(P.createElement("div"))
            }), r(function (t) {
                return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
            }) || o("type|href|height|width", function (t, e, n) {
                if (!n) return t.getAttribute(e, "type" === e.toLowerCase() ? 1 : 2)
            }), b.attributes && r(function (t) {
                return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
            }) || o("value", function (t, e, n) {
                if (!n && "input" === t.nodeName.toLowerCase()) return t.defaultValue
            }), r(function (t) {
                return null == t.getAttribute("disabled")
            }) || o(et, function (t, e, n) {
                var i;
                if (!n) return t[e] === !0 ? e.toLowerCase() : (i = t.getAttributeNode(e)) && i.specified ? i.value : null
            }), e
        }(t);
        ot.find = ut, ot.expr = ut.selectors, ot.expr[":"] = ot.expr.pseudos, ot.uniqueSort = ot.unique = ut.uniqueSort, ot.text = ut.getText, ot.isXMLDoc = ut.isXML, ot.contains = ut.contains;
        var dt = function (t, e, n) {
            for (var i = [], r = void 0 !== n; (t = t[e]) && 9 !== t.nodeType;) if (1 === t.nodeType) {
                if (r && ot(t).is(n)) break;
                i.push(t)
            }
            return i
        }, ft = function (t, e) {
            for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
            return n
        }, ht = ot.expr.match.needsContext, pt = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, mt = /^.[^:#\[\.,]*$/;
        ot.filter = function (t, e, n) {
            var i = e[0];
            return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === i.nodeType ? ot.find.matchesSelector(i, t) ? [i] : [] : ot.find.matches(t, ot.grep(e, function (t) {
                return 1 === t.nodeType
            }))
        }, ot.fn.extend({
            find: function (t) {
                var e, n = this.length, i = [], r = this;
                if ("string" != typeof t) return this.pushStack(ot(t).filter(function () {
                    for (e = 0; e < n; e++) if (ot.contains(r[e], this)) return !0
                }));
                for (e = 0; e < n; e++) ot.find(t, r[e], i);
                return i = this.pushStack(n > 1 ? ot.unique(i) : i), i.selector = this.selector ? this.selector + " " + t : t, i
            }, filter: function (t) {
                return this.pushStack(i(this, t || [], !1))
            }, not: function (t) {
                return this.pushStack(i(this, t || [], !0))
            }, is: function (t) {
                return !!i(this, "string" == typeof t && ht.test(t) ? ot(t) : t || [], !1).length
            }
        });
        var gt, vt = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, yt = ot.fn.init = function (t, e, n) {
            var i, r;
            if (!t) return this;
            if (n = n || gt, "string" == typeof t) {
                if (i = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [null, t, null] : vt.exec(t), !i || !i[1] && e) return !e || e.jquery ? (e || n).find(t) : this.constructor(e).find(t);
                if (i[1]) {
                    if (e = e instanceof ot ? e[0] : e, ot.merge(this, ot.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e : Q, !0)), pt.test(i[1]) && ot.isPlainObject(e)) for (i in e) ot.isFunction(this[i]) ? this[i](e[i]) : this.attr(i, e[i]);
                    return this
                }
                return r = Q.getElementById(i[2]), r && r.parentNode && (this.length = 1, this[0] = r), this.context = Q, this.selector = t, this
            }
            return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : ot.isFunction(t) ? void 0 !== n.ready ? n.ready(t) : t(ot) : (void 0 !== t.selector && (this.selector = t.selector, this.context = t.context), ot.makeArray(t, this))
        };
        yt.prototype = ot.fn, gt = ot(Q);
        var $t = /^(?:parents|prev(?:Until|All))/, wt = {children: !0, contents: !0, next: !0, prev: !0};
        ot.fn.extend({
            has: function (t) {
                var e = ot(t, this), n = e.length;
                return this.filter(function () {
                    for (var t = 0; t < n; t++) if (ot.contains(this, e[t])) return !0
                })
            }, closest: function (t, e) {
                for (var n, i = 0, r = this.length, o = [], a = ht.test(t) || "string" != typeof t ? ot(t, e || this.context) : 0; i < r; i++) for (n = this[i]; n && n !== e; n = n.parentNode) if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && ot.find.matchesSelector(n, t))) {
                    o.push(n);
                    break
                }
                return this.pushStack(o.length > 1 ? ot.uniqueSort(o) : o)
            }, index: function (t) {
                return t ? "string" == typeof t ? J.call(ot(t), this[0]) : J.call(this, t.jquery ? t[0] : t) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            }, add: function (t, e) {
                return this.pushStack(ot.uniqueSort(ot.merge(this.get(), ot(t, e))))
            }, addBack: function (t) {
                return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
            }
        }), ot.each({
            parent: function (t) {
                var e = t.parentNode;
                return e && 11 !== e.nodeType ? e : null
            }, parents: function (t) {
                return dt(t, "parentNode")
            }, parentsUntil: function (t, e, n) {
                return dt(t, "parentNode", n)
            }, next: function (t) {
                return r(t, "nextSibling")
            }, prev: function (t) {
                return r(t, "previousSibling")
            }, nextAll: function (t) {
                return dt(t, "nextSibling")
            }, prevAll: function (t) {
                return dt(t, "previousSibling")
            }, nextUntil: function (t, e, n) {
                return dt(t, "nextSibling", n)
            }, prevUntil: function (t, e, n) {
                return dt(t, "previousSibling", n)
            }, siblings: function (t) {
                return ft((t.parentNode || {}).firstChild, t)
            }, children: function (t) {
                return ft(t.firstChild)
            }, contents: function (t) {
                return t.contentDocument || ot.merge([], t.childNodes)
            }
        }, function (t, e) {
            ot.fn[t] = function (n, i) {
                var r = ot.map(this, e, n);
                return "Until" !== t.slice(-5) && (i = n), i && "string" == typeof i && (r = ot.filter(i, r)), this.length > 1 && (wt[t] || ot.uniqueSort(r), $t.test(t) && r.reverse()), this.pushStack(r)
            }
        });
        var bt = /\S+/g;
        ot.Callbacks = function (t) {
            t = "string" == typeof t ? o(t) : ot.extend({}, t);
            var e, n, i, r, a = [], s = [], l = -1, c = function () {
                for (r = t.once, i = e = !0; s.length; l = -1) for (n = s.shift(); ++l < a.length;) a[l].apply(n[0], n[1]) === !1 && t.stopOnFalse && (l = a.length, n = !1);
                t.memory || (n = !1), e = !1, r && (a = n ? [] : "")
            }, u = {
                add: function () {
                    return a && (n && !e && (l = a.length - 1, s.push(n)), function i(e) {
                        ot.each(e, function (e, n) {
                            ot.isFunction(n) ? t.unique && u.has(n) || a.push(n) : n && n.length && "string" !== ot.type(n) && i(n)
                        })
                    }(arguments), n && !e && c()), this
                }, remove: function () {
                    return ot.each(arguments, function (t, e) {
                        for (var n; (n = ot.inArray(e, a, n)) > -1;) a.splice(n, 1), n <= l && l--
                    }), this
                }, has: function (t) {
                    return t ? ot.inArray(t, a) > -1 : a.length > 0
                }, empty: function () {
                    return a && (a = []), this
                }, disable: function () {
                    return r = s = [], a = n = "", this
                }, disabled: function () {
                    return !a
                }, lock: function () {
                    return r = s = [], n || (a = n = ""), this
                }, locked: function () {
                    return !!r
                }, fireWith: function (t, n) {
                    return r || (n = n || [], n = [t, n.slice ? n.slice() : n], s.push(n), e || c()), this
                }, fire: function () {
                    return u.fireWith(this, arguments), this
                }, fired: function () {
                    return !!i
                }
            };
            return u
        }, ot.extend({
            Deferred: function (t) {
                var e = [["resolve", "done", ot.Callbacks("once memory"), "resolved"], ["reject", "fail", ot.Callbacks("once memory"), "rejected"], ["notify", "progress", ot.Callbacks("memory")]],
                    n = "pending", i = {
                        state: function () {
                            return n
                        }, always: function () {
                            return r.done(arguments).fail(arguments), this
                        }, then: function () {
                            var t = arguments;
                            return ot.Deferred(function (n) {
                                ot.each(e, function (e, o) {
                                    var a = ot.isFunction(t[e]) && t[e];
                                    r[o[1]](function () {
                                        var t = a && a.apply(this, arguments);
                                        t && ot.isFunction(t.promise) ? t.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[o[0] + "With"](this === i ? n.promise() : this, a ? [t] : arguments)
                                    })
                                }), t = null
                            }).promise()
                        }, promise: function (t) {
                            return null != t ? ot.extend(t, i) : i
                        }
                    }, r = {};
                return i.pipe = i.then, ot.each(e, function (t, o) {
                    var a = o[2], s = o[3];
                    i[o[1]] = a.add, s && a.add(function () {
                        n = s
                    }, e[1 ^ t][2].disable, e[2][2].lock), r[o[0]] = function () {
                        return r[o[0] + "With"](this === r ? i : this, arguments), this
                    }, r[o[0] + "With"] = a.fireWith
                }), i.promise(r), t && t.call(r, r), r
            }, when: function (t) {
                var e, n, i, r = 0, o = K.call(arguments), a = o.length,
                    s = 1 !== a || t && ot.isFunction(t.promise) ? a : 0, l = 1 === s ? t : ot.Deferred(),
                    c = function (t, n, i) {
                        return function (r) {
                            n[t] = this, i[t] = arguments.length > 1 ? K.call(arguments) : r, i === e ? l.notifyWith(n, i) : --s || l.resolveWith(n, i)
                        }
                    };
                if (a > 1) for (e = new Array(a), n = new Array(a), i = new Array(a); r < a; r++) o[r] && ot.isFunction(o[r].promise) ? o[r].promise().progress(c(r, n, e)).done(c(r, i, o)).fail(l.reject) : --s;
                return s || l.resolveWith(i, o), l.promise()
            }
        });
        var xt;
        ot.fn.ready = function (t) {
            return ot.ready.promise().done(t), this
        }, ot.extend({
            isReady: !1, readyWait: 1, holdReady: function (t) {
                t ? ot.readyWait++ : ot.ready(!0)
            }, ready: function (t) {
                (t === !0 ? --ot.readyWait : ot.isReady) || (ot.isReady = !0, t !== !0 && --ot.readyWait > 0 || (xt.resolveWith(Q, [ot]), ot.fn.triggerHandler && (ot(Q).triggerHandler("ready"), ot(Q).off("ready"))))
            }
        }), ot.ready.promise = function (e) {
            return xt || (xt = ot.Deferred(), "complete" === Q.readyState || "loading" !== Q.readyState && !Q.documentElement.doScroll ? t.setTimeout(ot.ready) : (Q.addEventListener("DOMContentLoaded", a), t.addEventListener("load", a))), xt.promise(e)
        }, ot.ready.promise();
        var Ct = function (t, e, n, i, r, o, a) {
            var s = 0, l = t.length, c = null == n;
            if ("object" === ot.type(n)) {
                r = !0;
                for (s in n) Ct(t, e, s, n[s], !0, o, a)
            } else if (void 0 !== i && (r = !0, ot.isFunction(i) || (a = !0), c && (a ? (e.call(t, i), e = null) : (c = e, e = function (t, e, n) {
                return c.call(ot(t), n)
            })), e)) for (; s < l; s++) e(t[s], n, a ? i : i.call(t[s], s, e(t[s], n)));
            return r ? t : c ? e.call(t) : l ? e(t[0], n) : o
        }, kt = function (t) {
            return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType
        };
        s.uid = 1, s.prototype = {
            register: function (t, e) {
                var n = e || {};
                return t.nodeType ? t[this.expando] = n : Object.defineProperty(t, this.expando, {
                    value: n,
                    writable: !0,
                    configurable: !0
                }), t[this.expando]
            }, cache: function (t) {
                if (!kt(t)) return {};
                var e = t[this.expando];
                return e || (e = {}, kt(t) && (t.nodeType ? t[this.expando] = e : Object.defineProperty(t, this.expando, {
                    value: e,
                    configurable: !0
                }))), e
            }, set: function (t, e, n) {
                var i, r = this.cache(t);
                if ("string" == typeof e) r[e] = n; else for (i in e) r[i] = e[i];
                return r
            }, get: function (t, e) {
                return void 0 === e ? this.cache(t) : t[this.expando] && t[this.expando][e]
            }, access: function (t, e, n) {
                var i;
                return void 0 === e || e && "string" == typeof e && void 0 === n ? (i = this.get(t, e), void 0 !== i ? i : this.get(t, ot.camelCase(e))) : (this.set(t, e, n), void 0 !== n ? n : e)
            }, remove: function (t, e) {
                var n, i, r, o = t[this.expando];
                if (void 0 !== o) {
                    if (void 0 === e) this.register(t); else {
                        ot.isArray(e) ? i = e.concat(e.map(ot.camelCase)) : (r = ot.camelCase(e), e in o ? i = [e, r] : (i = r, i = i in o ? [i] : i.match(bt) || [])), n = i.length;
                        for (; n--;) delete o[i[n]]
                    }
                    (void 0 === e || ot.isEmptyObject(o)) && (t.nodeType ? t[this.expando] = void 0 : delete t[this.expando])
                }
            }, hasData: function (t) {
                var e = t[this.expando];
                return void 0 !== e && !ot.isEmptyObject(e)
            }
        };
        var St = new s, _t = new s, Et = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, Tt = /[A-Z]/g;
        ot.extend({
            hasData: function (t) {
                return _t.hasData(t) || St.hasData(t)
            }, data: function (t, e, n) {
                return _t.access(t, e, n)
            }, removeData: function (t, e) {
                _t.remove(t, e)
            }, _data: function (t, e, n) {
                return St.access(t, e, n)
            }, _removeData: function (t, e) {
                St.remove(t, e)
            }
        }), ot.fn.extend({
            data: function (t, e) {
                var n, i, r, o = this[0], a = o && o.attributes;
                if (void 0 === t) {
                    if (this.length && (r = _t.get(o), 1 === o.nodeType && !St.get(o, "hasDataAttrs"))) {
                        for (n = a.length; n--;) a[n] && (i = a[n].name, 0 === i.indexOf("data-") && (i = ot.camelCase(i.slice(5)), l(o, i, r[i])));
                        St.set(o, "hasDataAttrs", !0)
                    }
                    return r
                }
                return "object" == typeof t ? this.each(function () {
                    _t.set(this, t)
                }) : Ct(this, function (e) {
                    var n, i;
                    if (o && void 0 === e) {
                        if (n = _t.get(o, t) || _t.get(o, t.replace(Tt, "-$&").toLowerCase()), void 0 !== n) return n;
                        if (i = ot.camelCase(t), n = _t.get(o, i), void 0 !== n) return n;
                        if (n = l(o, i, void 0), void 0 !== n) return n
                    } else i = ot.camelCase(t), this.each(function () {
                        var n = _t.get(this, i);
                        _t.set(this, i, e), t.indexOf("-") > -1 && void 0 !== n && _t.set(this, t, e)
                    })
                }, null, e, arguments.length > 1, null, !0)
            }, removeData: function (t) {
                return this.each(function () {
                    _t.remove(this, t)
                })
            }
        }), ot.extend({
            queue: function (t, e, n) {
                var i;
                if (t) return e = (e || "fx") + "queue", i = St.get(t, e), n && (!i || ot.isArray(n) ? i = St.access(t, e, ot.makeArray(n)) : i.push(n)), i || []
            }, dequeue: function (t, e) {
                e = e || "fx";
                var n = ot.queue(t, e), i = n.length, r = n.shift(), o = ot._queueHooks(t, e), a = function () {
                    ot.dequeue(t, e)
                };
                "inprogress" === r && (r = n.shift(), i--), r && ("fx" === e && n.unshift("inprogress"), delete o.stop, r.call(t, a, o)), !i && o && o.empty.fire()
            }, _queueHooks: function (t, e) {
                var n = e + "queueHooks";
                return St.get(t, n) || St.access(t, n, {
                    empty: ot.Callbacks("once memory").add(function () {
                        St.remove(t, [e + "queue", n])
                    })
                })
            }
        }), ot.fn.extend({
            queue: function (t, e) {
                var n = 2;
                return "string" != typeof t && (e = t, t = "fx", n--), arguments.length < n ? ot.queue(this[0], t) : void 0 === e ? this : this.each(function () {
                    var n = ot.queue(this, t, e);
                    ot._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && ot.dequeue(this, t)
                })
            }, dequeue: function (t) {
                return this.each(function () {
                    ot.dequeue(this, t)
                })
            }, clearQueue: function (t) {
                return this.queue(t || "fx", [])
            }, promise: function (t, e) {
                var n, i = 1, r = ot.Deferred(), o = this, a = this.length, s = function () {
                    --i || r.resolveWith(o, [o])
                };
                for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; a--;) n = St.get(o[a], t + "queueHooks"), n && n.empty && (i++, n.empty.add(s));
                return s(), r.promise(e)
            }
        });
        var At = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            Ot = new RegExp("^(?:([+-])=|)(" + At + ")([a-z%]*)$", "i"),
            Dt = ["Top", "Right", "Bottom", "Left"], Pt = function (t, e) {
                return t = e || t, "none" === ot.css(t, "display") || !ot.contains(t.ownerDocument, t)
            }, Mt = /^(?:checkbox|radio)$/i, Lt = /<([\w:-]+)/, jt = /^$|\/(?:java|ecma)script/i, Nt = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        Nt.optgroup = Nt.option, Nt.tbody = Nt.tfoot = Nt.colgroup = Nt.caption = Nt.thead, Nt.th = Nt.td;
        var Ft = /<|&#?\w+;/;
        !function () {
            var t = Q.createDocumentFragment(), e = t.appendChild(Q.createElement("div")), n = Q.createElement("input");
            n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), e.appendChild(n), it.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, e.innerHTML = "<textarea>x</textarea>", it.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue
        }();
        var It = /^key/, Rt = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, zt = /^([^.]*)(?:\.(.+)|)/;
        ot.event = {
            global: {},
            add: function (t, e, n, i, r) {
                var o, a, s, l, c, u, d, f, h, p, m, g = St.get(t);
                if (g) for (n.handler && (o = n, n = o.handler, r = o.selector), n.guid || (n.guid = ot.guid++), (l = g.events) || (l = g.events = {}), (a = g.handle) || (a = g.handle = function (e) {
                    return "undefined" != typeof ot && ot.event.triggered !== e.type ? ot.event.dispatch.apply(t, arguments) : void 0
                }), e = (e || "").match(bt) || [""], c = e.length; c--;) s = zt.exec(e[c]) || [], h = m = s[1], p = (s[2] || "").split(".").sort(), h && (d = ot.event.special[h] || {}, h = (r ? d.delegateType : d.bindType) || h, d = ot.event.special[h] || {}, u = ot.extend({
                    type: h,
                    origType: m,
                    data: i,
                    handler: n,
                    guid: n.guid,
                    selector: r,
                    needsContext: r && ot.expr.match.needsContext.test(r),
                    namespace: p.join(".")
                }, o), (f = l[h]) || (f = l[h] = [], f.delegateCount = 0, d.setup && d.setup.call(t, i, p, a) !== !1 || t.addEventListener && t.addEventListener(h, a)), d.add && (d.add.call(t, u), u.handler.guid || (u.handler.guid = n.guid)), r ? f.splice(f.delegateCount++, 0, u) : f.push(u), ot.event.global[h] = !0)
            },
            remove: function (t, e, n, i, r) {
                var o, a, s, l, c, u, d, f, h, p, m, g = St.hasData(t) && St.get(t);
                if (g && (l = g.events)) {
                    for (e = (e || "").match(bt) || [""], c = e.length; c--;) if (s = zt.exec(e[c]) || [], h = m = s[1], p = (s[2] || "").split(".").sort(), h) {
                        for (d = ot.event.special[h] || {}, h = (i ? d.delegateType : d.bindType) || h, f = l[h] || [], s = s[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = f.length; o--;) u = f[o], !r && m !== u.origType || n && n.guid !== u.guid || s && !s.test(u.namespace) || i && i !== u.selector && ("**" !== i || !u.selector) || (f.splice(o, 1), u.selector && f.delegateCount--, d.remove && d.remove.call(t, u));
                        a && !f.length && (d.teardown && d.teardown.call(t, p, g.handle) !== !1 || ot.removeEvent(t, h, g.handle), delete l[h])
                    } else for (h in l) ot.event.remove(t, h + e[c], n, i, !0);
                    ot.isEmptyObject(l) && St.remove(t, "handle events")
                }
            },
            dispatch: function (t) {
                t = ot.event.fix(t);
                var e, n, i, r, o, a = [], s = K.call(arguments), l = (St.get(this, "events") || {})[t.type] || [],
                    c = ot.event.special[t.type] || {};
                if (s[0] = t, t.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, t) !== !1) {
                    for (a = ot.event.handlers.call(this, t, l), e = 0; (r = a[e++]) && !t.isPropagationStopped();) for (t.currentTarget = r.elem, n = 0; (o = r.handlers[n++]) && !t.isImmediatePropagationStopped();) t.rnamespace && !t.rnamespace.test(o.namespace) || (t.handleObj = o, t.data = o.data, i = ((ot.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, s), void 0 !== i && (t.result = i) === !1 && (t.preventDefault(), t.stopPropagation()));
                    return c.postDispatch && c.postDispatch.call(this, t), t.result
                }
            },
            handlers: function (t, e) {
                var n, i, r, o, a = [], s = e.delegateCount, l = t.target;
                if (s && l.nodeType && ("click" !== t.type || isNaN(t.button) || t.button < 1)) for (; l !== this; l = l.parentNode || this) if (1 === l.nodeType && (l.disabled !== !0 || "click" !== t.type)) {
                    for (i = [], n = 0; n < s; n++) o = e[n], r = o.selector + " ", void 0 === i[r] && (i[r] = o.needsContext ? ot(r, this).index(l) > -1 : ot.find(r, this, null, [l]).length), i[r] && i.push(o);
                    i.length && a.push({elem: l, handlers: i})
                }
                return s < e.length && a.push({elem: this, handlers: e.slice(s)}), a
            },
            props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "), filter: function (t, e) {
                    return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function (t, e) {
                    var n, i, r, o = e.button;
                    return null == t.pageX && null != e.clientX && (n = t.target.ownerDocument || Q, i = n.documentElement, r = n.body, t.pageX = e.clientX + (i && i.scrollLeft || r && r.scrollLeft || 0) - (i && i.clientLeft || r && r.clientLeft || 0), t.pageY = e.clientY + (i && i.scrollTop || r && r.scrollTop || 0) - (i && i.clientTop || r && r.clientTop || 0)), t.which || void 0 === o || (t.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0), t
                }
            },
            fix: function (t) {
                if (t[ot.expando]) return t;
                var e, n, i, r = t.type, o = t, a = this.fixHooks[r];
                for (a || (this.fixHooks[r] = a = Rt.test(r) ? this.mouseHooks : It.test(r) ? this.keyHooks : {}), i = a.props ? this.props.concat(a.props) : this.props, t = new ot.Event(o), e = i.length; e--;) n = i[e], t[n] = o[n];
                return t.target || (t.target = Q), 3 === t.target.nodeType && (t.target = t.target.parentNode), a.filter ? a.filter(t, o) : t
            },
            special: {
                load: {noBubble: !0}, focus: {
                    trigger: function () {
                        if (this !== m() && this.focus) return this.focus(), !1
                    }, delegateType: "focusin"
                }, blur: {
                    trigger: function () {
                        if (this === m() && this.blur) return this.blur(), !1
                    }, delegateType: "focusout"
                }, click: {
                    trigger: function () {
                        if ("checkbox" === this.type && this.click && ot.nodeName(this, "input")) return this.click(), !1
                    }, _default: function (t) {
                        return ot.nodeName(t.target, "a")
                    }
                }, beforeunload: {
                    postDispatch: function (t) {
                        void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result)
                    }
                }
            }
        }, ot.removeEvent = function (t, e, n) {
            t.removeEventListener && t.removeEventListener(e, n)
        }, ot.Event = function (t, e) {
            return this instanceof ot.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && t.returnValue === !1 ? h : p) : this.type = t, e && ot.extend(this, e), this.timeStamp = t && t.timeStamp || ot.now(), void (this[ot.expando] = !0)) : new ot.Event(t, e)
        }, ot.Event.prototype = {
            constructor: ot.Event,
            isDefaultPrevented: p,
            isPropagationStopped: p,
            isImmediatePropagationStopped: p,
            isSimulated: !1,
            preventDefault: function () {
                var t = this.originalEvent;
                this.isDefaultPrevented = h, t && !this.isSimulated && t.preventDefault()
            },
            stopPropagation: function () {
                var t = this.originalEvent;
                this.isPropagationStopped = h, t && !this.isSimulated && t.stopPropagation()
            },
            stopImmediatePropagation: function () {
                var t = this.originalEvent;
                this.isImmediatePropagationStopped = h, t && !this.isSimulated && t.stopImmediatePropagation(), this.stopPropagation()
            }
        }, ot.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function (t, e) {
            ot.event.special[t] = {
                delegateType: e, bindType: e, handle: function (t) {
                    var n, i = this, r = t.relatedTarget, o = t.handleObj;
                    return r && (r === i || ot.contains(i, r)) || (t.type = o.origType, n = o.handler.apply(this, arguments), t.type = e), n
                }
            }
        }), ot.fn.extend({
            on: function (t, e, n, i) {
                return g(this, t, e, n, i)
            }, one: function (t, e, n, i) {
                return g(this, t, e, n, i, 1)
            }, off: function (t, e, n) {
                var i, r;
                if (t && t.preventDefault && t.handleObj) return i = t.handleObj, ot(t.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                if ("object" == typeof t) {
                    for (r in t) this.off(r, e, t[r]);
                    return this
                }
                return e !== !1 && "function" != typeof e || (n = e, e = void 0), n === !1 && (n = p), this.each(function () {
                    ot.event.remove(this, t, n, e)
                })
            }
        });
        var qt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
            Ht = /<script|<style|<link/i,
            Bt = /checked\s*(?:[^=]|=\s*.checked.)/i, Vt = /^true\/(.*)/,
            Wt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        ot.extend({
            htmlPrefilter: function (t) {
                return t.replace(qt, "<$1></$2>")
            }, clone: function (t, e, n) {
                var i, r, o, a, s = t.cloneNode(!0), l = ot.contains(t.ownerDocument, t);
                if (!(it.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || ot.isXMLDoc(t))) for (a = u(s), o = u(t), i = 0, r = o.length; i < r; i++) b(o[i], a[i]);
                if (e) if (n) for (o = o || u(t), a = a || u(s), i = 0, r = o.length; i < r; i++) w(o[i], a[i]); else w(t, s);
                return a = u(s, "script"), a.length > 0 && d(a, !l && u(t, "script")), s
            }, cleanData: function (t) {
                for (var e, n, i, r = ot.event.special, o = 0; void 0 !== (n = t[o]); o++) if (kt(n)) {
                    if (e = n[St.expando]) {
                        if (e.events) for (i in e.events) r[i] ? ot.event.remove(n, i) : ot.removeEvent(n, i, e.handle);
                        n[St.expando] = void 0
                    }
                    n[_t.expando] && (n[_t.expando] = void 0)
                }
            }
        }), ot.fn.extend({
            domManip: x, detach: function (t) {
                return C(this, t, !0)
            }, remove: function (t) {
                return C(this, t)
            }, text: function (t) {
                return Ct(this, function (t) {
                    return void 0 === t ? ot.text(this) : this.empty().each(function () {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = t)
                    })
                }, null, t, arguments.length)
            }, append: function () {
                return x(this, arguments, function (t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = v(this, t);
                        e.appendChild(t);
                    }
                })
            }, prepend: function () {
                return x(this, arguments, function (t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = v(this, t);
                        e.insertBefore(t, e.firstChild)
                    }
                })
            }, before: function () {
                return x(this, arguments, function (t) {
                    this.parentNode && this.parentNode.insertBefore(t, this)
                })
            }, after: function () {
                return x(this, arguments, function (t) {
                    this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
                })
            }, empty: function () {
                for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (ot.cleanData(u(t, !1)), t.textContent = "");
                return this
            }, clone: function (t, e) {
                return t = null != t && t, e = null == e ? t : e, this.map(function () {
                    return ot.clone(this, t, e)
                })
            }, html: function (t) {
                return Ct(this, function (t) {
                    var e = this[0] || {}, n = 0, i = this.length;
                    if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
                    if ("string" == typeof t && !Ht.test(t) && !Nt[(Lt.exec(t) || ["", ""])[1].toLowerCase()]) {
                        t = ot.htmlPrefilter(t);
                        try {
                            for (; n < i; n++) e = this[n] || {}, 1 === e.nodeType && (ot.cleanData(u(e, !1)), e.innerHTML = t);
                            e = 0
                        } catch (r) {
                        }
                    }
                    e && this.empty().append(t)
                }, null, t, arguments.length)
            }, replaceWith: function () {
                var t = [];
                return x(this, arguments, function (e) {
                    var n = this.parentNode;
                    ot.inArray(this, t) < 0 && (ot.cleanData(u(this)), n && n.replaceChild(e, this))
                }, t)
            }
        }), ot.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function (t, e) {
            ot.fn[t] = function (t) {
                for (var n, i = [], r = ot(t), o = r.length - 1, a = 0; a <= o; a++) n = a === o ? this : this.clone(!0), ot(r[a])[e](n), Z.apply(i, n.get());
                return this.pushStack(i)
            }
        });
        var Ut, Gt = {HTML: "block", BODY: "block"}, Yt = /^margin/,
            Qt = new RegExp("^(" + At + ")(?!px)[a-z%]+$", "i"),
            Kt = function (e) {
                var n = e.ownerDocument.defaultView;
                return n && n.opener || (n = t), n.getComputedStyle(e)
            }, Xt = function (t, e, n, i) {
                var r, o, a = {};
                for (o in e) a[o] = t.style[o], t.style[o] = e[o];
                r = n.apply(t, i || []);
                for (o in e) t.style[o] = a[o];
                return r
            }, Zt = Q.documentElement;
        !function () {
            function e() {
                s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", s.innerHTML = "", Zt.appendChild(a);
                var e = t.getComputedStyle(s);
                n = "1%" !== e.top, o = "2px" === e.marginLeft, i = "4px" === e.width, s.style.marginRight = "50%", r = "4px" === e.marginRight, Zt.removeChild(a)
            }

            var n, i, r, o, a = Q.createElement("div"), s = Q.createElement("div");
            s.style && (s.style.backgroundClip = "content-box", s.cloneNode(!0).style.backgroundClip = "", it.clearCloneStyle = "content-box" === s.style.backgroundClip, a.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", a.appendChild(s), ot.extend(it, {
                pixelPosition: function () {
                    return e(), n
                }, boxSizingReliable: function () {
                    return null == i && e(), i
                }, pixelMarginRight: function () {
                    return null == i && e(), r
                }, reliableMarginLeft: function () {
                    return null == i && e(), o
                }, reliableMarginRight: function () {
                    var e, n = s.appendChild(Q.createElement("div"));
                    return n.style.cssText = s.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", n.style.marginRight = n.style.width = "0", s.style.width = "1px", Zt.appendChild(a), e = !parseFloat(t.getComputedStyle(n).marginRight), Zt.removeChild(a), s.removeChild(n), e
                }
            }))
        }();
        var Jt = /^(none|table(?!-c[ea]).+)/, te = {position: "absolute", visibility: "hidden", display: "block"},
            ee = {letterSpacing: "0", fontWeight: "400"}, ne = ["Webkit", "O", "Moz", "ms"],
            ie = Q.createElement("div").style;
        ot.extend({
            cssHooks: {
                opacity: {
                    get: function (t, e) {
                        if (e) {
                            var n = _(t, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {"float": "cssFloat"},
            style: function (t, e, n, i) {
                if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                    var r, o, a, s = ot.camelCase(e), l = t.style;
                    return e = ot.cssProps[s] || (ot.cssProps[s] = T(s) || s), a = ot.cssHooks[e] || ot.cssHooks[s], void 0 === n ? a && "get" in a && void 0 !== (r = a.get(t, !1, i)) ? r : l[e] : (o = typeof n, "string" === o && (r = Ot.exec(n)) && r[1] && (n = c(t, e, r), o = "number"), null != n && n === n && ("number" === o && (n += r && r[3] || (ot.cssNumber[s] ? "" : "px")), it.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (l[e] = "inherit"), a && "set" in a && void 0 === (n = a.set(t, n, i)) || (l[e] = n)), void 0)
                }
            },
            css: function (t, e, n, i) {
                var r, o, a, s = ot.camelCase(e);
                return e = ot.cssProps[s] || (ot.cssProps[s] = T(s) || s), a = ot.cssHooks[e] || ot.cssHooks[s], a && "get" in a && (r = a.get(t, !0, n)), void 0 === r && (r = _(t, e, i)), "normal" === r && e in ee && (r = ee[e]), "" === n || n ? (o = parseFloat(r), n === !0 || isFinite(o) ? o || 0 : r) : r
            }
        }), ot.each(["height", "width"], function (t, e) {
            ot.cssHooks[e] = {
                get: function (t, n, i) {
                    if (n) return Jt.test(ot.css(t, "display")) && 0 === t.offsetWidth ? Xt(t, te, function () {
                        return D(t, e, i)
                    }) : D(t, e, i)
                }, set: function (t, n, i) {
                    var r, o = i && Kt(t), a = i && O(t, e, i, "border-box" === ot.css(t, "boxSizing", !1, o), o);
                    return a && (r = Ot.exec(n)) && "px" !== (r[3] || "px") && (t.style[e] = n, n = ot.css(t, e)), A(t, n, a)
                }
            }
        }), ot.cssHooks.marginLeft = E(it.reliableMarginLeft, function (t, e) {
            if (e) return (parseFloat(_(t, "marginLeft")) || t.getBoundingClientRect().left - Xt(t, {marginLeft: 0}, function () {
                return t.getBoundingClientRect().left
            })) + "px"
        }), ot.cssHooks.marginRight = E(it.reliableMarginRight, function (t, e) {
            if (e) return Xt(t, {display: "inline-block"}, _, [t, "marginRight"])
        }), ot.each({margin: "", padding: "", border: "Width"}, function (t, e) {
            ot.cssHooks[t + e] = {
                expand: function (n) {
                    for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n]; i < 4; i++) r[t + Dt[i] + e] = o[i] || o[i - 2] || o[0];
                    return r
                }
            }, Yt.test(t) || (ot.cssHooks[t + e].set = A)
        }), ot.fn.extend({
            css: function (t, e) {
                return Ct(this, function (t, e, n) {
                    var i, r, o = {}, a = 0;
                    if (ot.isArray(e)) {
                        for (i = Kt(t), r = e.length; a < r; a++) o[e[a]] = ot.css(t, e[a], !1, i);
                        return o
                    }
                    return void 0 !== n ? ot.style(t, e, n) : ot.css(t, e)
                }, t, e, arguments.length > 1)
            }, show: function () {
                return P(this, !0)
            }, hide: function () {
                return P(this)
            }, toggle: function (t) {
                return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function () {
                    Pt(this) ? ot(this).show() : ot(this).hide()
                })
            }
        }), ot.Tween = M, M.prototype = {
            constructor: M, init: function (t, e, n, i, r, o) {
                this.elem = t, this.prop = n, this.easing = r || ot.easing._default, this.options = e, this.start = this.now = this.cur(), this.end = i, this.unit = o || (ot.cssNumber[n] ? "" : "px")
            }, cur: function () {
                var t = M.propHooks[this.prop];
                return t && t.get ? t.get(this) : M.propHooks._default.get(this)
            }, run: function (t) {
                var e, n = M.propHooks[this.prop];
                return this.options.duration ? this.pos = e = ot.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : this.pos = e = t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : M.propHooks._default.set(this), this
            }
        }, M.prototype.init.prototype = M.prototype, M.propHooks = {
            _default: {
                get: function (t) {
                    var e;
                    return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] : (e = ot.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0)
                }, set: function (t) {
                    ot.fx.step[t.prop] ? ot.fx.step[t.prop](t) : 1 !== t.elem.nodeType || null == t.elem.style[ot.cssProps[t.prop]] && !ot.cssHooks[t.prop] ? t.elem[t.prop] = t.now : ot.style(t.elem, t.prop, t.now + t.unit)
                }
            }
        }, M.propHooks.scrollTop = M.propHooks.scrollLeft = {
            set: function (t) {
                t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
            }
        }, ot.easing = {
            linear: function (t) {
                return t
            }, swing: function (t) {
                return .5 - Math.cos(t * Math.PI) / 2
            }, _default: "swing"
        }, ot.fx = M.prototype.init, ot.fx.step = {};
        var re, oe, ae = /^(?:toggle|show|hide)$/, se = /queueHooks$/;
        ot.Animation = ot.extend(R, {
            tweeners: {
                "*": [function (t, e) {
                    var n = this.createTween(t, e);
                    return c(n.elem, t, Ot.exec(e), n), n
                }]
            }, tweener: function (t, e) {
                ot.isFunction(t) ? (e = t, t = ["*"]) : t = t.match(bt);
                for (var n, i = 0, r = t.length; i < r; i++) n = t[i], R.tweeners[n] = R.tweeners[n] || [], R.tweeners[n].unshift(e)
            }, prefilters: [F], prefilter: function (t, e) {
                e ? R.prefilters.unshift(t) : R.prefilters.push(t)
            }
        }), ot.speed = function (t, e, n) {
            var i = t && "object" == typeof t ? ot.extend({}, t) : {
                complete: n || !n && e || ot.isFunction(t) && t,
                duration: t,
                easing: n && e || e && !ot.isFunction(e) && e
            };
            return i.duration = ot.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in ot.fx.speeds ? ot.fx.speeds[i.duration] : ot.fx.speeds._default, null != i.queue && i.queue !== !0 || (i.queue = "fx"), i.old = i.complete, i.complete = function () {
                ot.isFunction(i.old) && i.old.call(this), i.queue && ot.dequeue(this, i.queue)
            }, i
        }, ot.fn.extend({
            fadeTo: function (t, e, n, i) {
                return this.filter(Pt).css("opacity", 0).show().end().animate({opacity: e}, t, n, i)
            }, animate: function (t, e, n, i) {
                var r = ot.isEmptyObject(t), o = ot.speed(e, n, i), a = function () {
                    var e = R(this, ot.extend({}, t), o);
                    (r || St.get(this, "finish")) && e.stop(!0)
                };
                return a.finish = a, r || o.queue === !1 ? this.each(a) : this.queue(o.queue, a)
            }, stop: function (t, e, n) {
                var i = function (t) {
                    var e = t.stop;
                    delete t.stop, e(n)
                };
                return "string" != typeof t && (n = e, e = t, t = void 0), e && t !== !1 && this.queue(t || "fx", []), this.each(function () {
                    var e = !0, r = null != t && t + "queueHooks", o = ot.timers, a = St.get(this);
                    if (r) a[r] && a[r].stop && i(a[r]); else for (r in a) a[r] && a[r].stop && se.test(r) && i(a[r]);
                    for (r = o.length; r--;) o[r].elem !== this || null != t && o[r].queue !== t || (o[r].anim.stop(n), e = !1, o.splice(r, 1));
                    !e && n || ot.dequeue(this, t)
                })
            }, finish: function (t) {
                return t !== !1 && (t = t || "fx"), this.each(function () {
                    var e, n = St.get(this), i = n[t + "queue"], r = n[t + "queueHooks"], o = ot.timers,
                        a = i ? i.length : 0;
                    for (n.finish = !0, ot.queue(this, t, []), r && r.stop && r.stop.call(this, !0), e = o.length; e--;) o[e].elem === this && o[e].queue === t && (o[e].anim.stop(!0), o.splice(e, 1));
                    for (e = 0; e < a; e++) i[e] && i[e].finish && i[e].finish.call(this);
                    delete n.finish
                })
            }
        }), ot.each(["toggle", "show", "hide"], function (t, e) {
            var n = ot.fn[e];
            ot.fn[e] = function (t, i, r) {
                return null == t || "boolean" == typeof t ? n.apply(this, arguments) : this.animate(j(e, !0), t, i, r)
            }
        }), ot.each({
            slideDown: j("show"),
            slideUp: j("hide"),
            slideToggle: j("toggle"),
            fadeIn: {opacity: "show"},
            fadeOut: {opacity: "hide"},
            fadeToggle: {opacity: "toggle"}
        }, function (t, e) {
            ot.fn[t] = function (t, n, i) {
                return this.animate(e, t, n, i)
            }
        }), ot.timers = [], ot.fx.tick = function () {
            var t, e = 0, n = ot.timers;
            for (re = ot.now(); e < n.length; e++) t = n[e], t() || n[e] !== t || n.splice(e--, 1);
            n.length || ot.fx.stop(), re = void 0
        }, ot.fx.timer = function (t) {
            ot.timers.push(t), t() ? ot.fx.start() : ot.timers.pop()
        }, ot.fx.interval = 13, ot.fx.start = function () {
            oe || (oe = t.setInterval(ot.fx.tick, ot.fx.interval))
        }, ot.fx.stop = function () {
            t.clearInterval(oe), oe = null
        }, ot.fx.speeds = {slow: 600, fast: 200, _default: 400}, ot.fn.delay = function (e, n) {
            return e = ot.fx ? ot.fx.speeds[e] || e : e, n = n || "fx", this.queue(n, function (n, i) {
                var r = t.setTimeout(n, e);
                i.stop = function () {
                    t.clearTimeout(r)
                }
            })
        }, function () {
            var t = Q.createElement("input"), e = Q.createElement("select"),
                n = e.appendChild(Q.createElement("option"));
            t.type = "checkbox", it.checkOn = "" !== t.value, it.optSelected = n.selected, e.disabled = !0, it.optDisabled = !n.disabled, t = Q.createElement("input"), t.value = "t", t.type = "radio", it.radioValue = "t" === t.value
        }();
        var le, ce = ot.expr.attrHandle;
        ot.fn.extend({
            attr: function (t, e) {
                return Ct(this, ot.attr, t, e, arguments.length > 1)
            }, removeAttr: function (t) {
                return this.each(function () {
                    ot.removeAttr(this, t)
                })
            }
        }), ot.extend({
            attr: function (t, e, n) {
                var i, r, o = t.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof t.getAttribute ? ot.prop(t, e, n) : (1 === o && ot.isXMLDoc(t) || (e = e.toLowerCase(), r = ot.attrHooks[e] || (ot.expr.match.bool.test(e) ? le : void 0)), void 0 !== n ? null === n ? void ot.removeAttr(t, e) : r && "set" in r && void 0 !== (i = r.set(t, n, e)) ? i : (t.setAttribute(e, n + ""), n) : r && "get" in r && null !== (i = r.get(t, e)) ? i : (i = ot.find.attr(t, e), null == i ? void 0 : i))
            }, attrHooks: {
                type: {
                    set: function (t, e) {
                        if (!it.radioValue && "radio" === e && ot.nodeName(t, "input")) {
                            var n = t.value;
                            return t.setAttribute("type", e), n && (t.value = n), e
                        }
                    }
                }
            }, removeAttr: function (t, e) {
                var n, i, r = 0, o = e && e.match(bt);
                if (o && 1 === t.nodeType) for (; n = o[r++];) i = ot.propFix[n] || n, ot.expr.match.bool.test(n) && (t[i] = !1), t.removeAttribute(n)
            }
        }), le = {
            set: function (t, e, n) {
                return e === !1 ? ot.removeAttr(t, n) : t.setAttribute(n, n), n
            }
        }, ot.each(ot.expr.match.bool.source.match(/\w+/g), function (t, e) {
            var n = ce[e] || ot.find.attr;
            ce[e] = function (t, e, i) {
                var r, o;
                return i || (o = ce[e], ce[e] = r, r = null != n(t, e, i) ? e.toLowerCase() : null, ce[e] = o), r
            }
        });
        var ue = /^(?:input|select|textarea|button)$/i, de = /^(?:a|area)$/i;
        ot.fn.extend({
            prop: function (t, e) {
                return Ct(this, ot.prop, t, e, arguments.length > 1)
            }, removeProp: function (t) {
                return this.each(function () {
                    delete this[ot.propFix[t] || t]
                })
            }
        }), ot.extend({
            prop: function (t, e, n) {
                var i, r, o = t.nodeType;
                if (3 !== o && 8 !== o && 2 !== o) return 1 === o && ot.isXMLDoc(t) || (e = ot.propFix[e] || e, r = ot.propHooks[e]), void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(t, n, e)) ? i : t[e] = n : r && "get" in r && null !== (i = r.get(t, e)) ? i : t[e]
            }, propHooks: {
                tabIndex: {
                    get: function (t) {
                        var e = ot.find.attr(t, "tabindex");
                        return e ? parseInt(e, 10) : ue.test(t.nodeName) || de.test(t.nodeName) && t.href ? 0 : -1
                    }
                }
            }, propFix: {"for": "htmlFor", "class": "className"}
        }), it.optSelected || (ot.propHooks.selected = {
            get: function (t) {
                var e = t.parentNode;
                return e && e.parentNode && e.parentNode.selectedIndex, null
            }, set: function (t) {
                var e = t.parentNode;
                e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
            }
        }), ot.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
            ot.propFix[this.toLowerCase()] = this
        });
        var fe = /[\t\r\n\f]/g;
        ot.fn.extend({
            addClass: function (t) {
                var e, n, i, r, o, a, s, l = 0;
                if (ot.isFunction(t)) return this.each(function (e) {
                    ot(this).addClass(t.call(this, e, z(this)))
                });
                if ("string" == typeof t && t) for (e = t.match(bt) || []; n = this[l++];) if (r = z(n), i = 1 === n.nodeType && (" " + r + " ").replace(fe, " ")) {
                    for (a = 0; o = e[a++];) i.indexOf(" " + o + " ") < 0 && (i += o + " ");
                    s = ot.trim(i), r !== s && n.setAttribute("class", s)
                }
                return this
            }, removeClass: function (t) {
                var e, n, i, r, o, a, s, l = 0;
                if (ot.isFunction(t)) return this.each(function (e) {
                    ot(this).removeClass(t.call(this, e, z(this)))
                });
                if (!arguments.length) return this.attr("class", "");
                if ("string" == typeof t && t) for (e = t.match(bt) || []; n = this[l++];) if (r = z(n), i = 1 === n.nodeType && (" " + r + " ").replace(fe, " ")) {
                    for (a = 0; o = e[a++];) for (; i.indexOf(" " + o + " ") > -1;) i = i.replace(" " + o + " ", " ");
                    s = ot.trim(i), r !== s && n.setAttribute("class", s)
                }
                return this
            }, toggleClass: function (t, e) {
                var n = typeof t;
                return "boolean" == typeof e && "string" === n ? e ? this.addClass(t) : this.removeClass(t) : ot.isFunction(t) ? this.each(function (n) {
                    ot(this).toggleClass(t.call(this, n, z(this), e), e)
                }) : this.each(function () {
                    var e, i, r, o;
                    if ("string" === n) for (i = 0, r = ot(this), o = t.match(bt) || []; e = o[i++];) r.hasClass(e) ? r.removeClass(e) : r.addClass(e); else void 0 !== t && "boolean" !== n || (e = z(this), e && St.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || t === !1 ? "" : St.get(this, "__className__") || ""))
                })
            }, hasClass: function (t) {
                var e, n, i = 0;
                for (e = " " + t + " "; n = this[i++];) if (1 === n.nodeType && (" " + z(n) + " ").replace(fe, " ").indexOf(e) > -1) return !0;
                return !1
            }
        });
        var he = /\r/g, pe = /[\x20\t\r\n\f]+/g;
        ot.fn.extend({
            val: function (t) {
                var e, n, i, r = this[0];
                {
                    if (arguments.length) return i = ot.isFunction(t), this.each(function (n) {
                        var r;
                        1 === this.nodeType && (r = i ? t.call(this, n, ot(this).val()) : t, null == r ? r = "" : "number" == typeof r ? r += "" : ot.isArray(r) && (r = ot.map(r, function (t) {
                            return null == t ? "" : t + ""
                        })), e = ot.valHooks[this.type] || ot.valHooks[this.nodeName.toLowerCase()], e && "set" in e && void 0 !== e.set(this, r, "value") || (this.value = r))
                    });
                    if (r) return e = ot.valHooks[r.type] || ot.valHooks[r.nodeName.toLowerCase()], e && "get" in e && void 0 !== (n = e.get(r, "value")) ? n : (n = r.value, "string" == typeof n ? n.replace(he, "") : null == n ? "" : n)
                }
            }
        }), ot.extend({
            valHooks: {
                option: {
                    get: function (t) {
                        var e = ot.find.attr(t, "value");
                        return null != e ? e : ot.trim(ot.text(t)).replace(pe, " ")
                    }
                }, select: {
                    get: function (t) {
                        for (var e, n, i = t.options, r = t.selectedIndex, o = "select-one" === t.type || r < 0, a = o ? null : [], s = o ? r + 1 : i.length, l = r < 0 ? s : o ? r : 0; l < s; l++) if (n = i[l], (n.selected || l === r) && (it.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !ot.nodeName(n.parentNode, "optgroup"))) {
                            if (e = ot(n).val(), o) return e;
                            a.push(e)
                        }
                        return a
                    }, set: function (t, e) {
                        for (var n, i, r = t.options, o = ot.makeArray(e), a = r.length; a--;) i = r[a], (i.selected = ot.inArray(ot.valHooks.option.get(i), o) > -1) && (n = !0);
                        return n || (t.selectedIndex = -1), o
                    }
                }
            }
        }), ot.each(["radio", "checkbox"], function () {
            ot.valHooks[this] = {
                set: function (t, e) {
                    if (ot.isArray(e)) return t.checked = ot.inArray(ot(t).val(), e) > -1
                }
            }, it.checkOn || (ot.valHooks[this].get = function (t) {
                return null === t.getAttribute("value") ? "on" : t.value
            })
        });
        var me = /^(?:focusinfocus|focusoutblur)$/;
        ot.extend(ot.event, {
            trigger: function (e, n, i, r) {
                var o, a, s, l, c, u, d, f = [i || Q], h = nt.call(e, "type") ? e.type : e,
                    p = nt.call(e, "namespace") ? e.namespace.split(".") : [];
                if (a = s = i = i || Q, 3 !== i.nodeType && 8 !== i.nodeType && !me.test(h + ot.event.triggered) && (h.indexOf(".") > -1 && (p = h.split("."), h = p.shift(), p.sort()), c = h.indexOf(":") < 0 && "on" + h, e = e[ot.expando] ? e : new ot.Event(h, "object" == typeof e && e), e.isTrigger = r ? 2 : 3, e.namespace = p.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = void 0, e.target || (e.target = i), n = null == n ? [e] : ot.makeArray(n, [e]), d = ot.event.special[h] || {}, r || !d.trigger || d.trigger.apply(i, n) !== !1)) {
                    if (!r && !d.noBubble && !ot.isWindow(i)) {
                        for (l = d.delegateType || h, me.test(l + h) || (a = a.parentNode); a; a = a.parentNode) f.push(a), s = a;
                        s === (i.ownerDocument || Q) && f.push(s.defaultView || s.parentWindow || t)
                    }
                    for (o = 0; (a = f[o++]) && !e.isPropagationStopped();) e.type = o > 1 ? l : d.bindType || h, u = (St.get(a, "events") || {})[e.type] && St.get(a, "handle"), u && u.apply(a, n), u = c && a[c], u && u.apply && kt(a) && (e.result = u.apply(a, n), e.result === !1 && e.preventDefault());
                    return e.type = h, r || e.isDefaultPrevented() || d._default && d._default.apply(f.pop(), n) !== !1 || !kt(i) || c && ot.isFunction(i[h]) && !ot.isWindow(i) && (s = i[c], s && (i[c] = null), ot.event.triggered = h, i[h](), ot.event.triggered = void 0, s && (i[c] = s)), e.result
                }
            }, simulate: function (t, e, n) {
                var i = ot.extend(new ot.Event, n, {type: t, isSimulated: !0});
                ot.event.trigger(i, null, e)
            }
        }), ot.fn.extend({
            trigger: function (t, e) {
                return this.each(function () {
                    ot.event.trigger(t, e, this)
                })
            }, triggerHandler: function (t, e) {
                var n = this[0];
                if (n) return ot.event.trigger(t, e, n, !0)
            }
        }), ot.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (t, e) {
            ot.fn[e] = function (t, n) {
                return arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
            }
        }), ot.fn.extend({
            hover: function (t, e) {
                return this.mouseenter(t).mouseleave(e || t)
            }
        }), it.focusin = "onfocusin" in t, it.focusin || ot.each({focus: "focusin", blur: "focusout"}, function (t, e) {
            var n = function (t) {
                ot.event.simulate(e, t.target, ot.event.fix(t))
            };
            ot.event.special[e] = {
                setup: function () {
                    var i = this.ownerDocument || this, r = St.access(i, e);
                    r || i.addEventListener(t, n, !0), St.access(i, e, (r || 0) + 1)
                }, teardown: function () {
                    var i = this.ownerDocument || this, r = St.access(i, e) - 1;
                    r ? St.access(i, e, r) : (i.removeEventListener(t, n, !0), St.remove(i, e))
                }
            }
        });
        var ge = t.location, ve = ot.now(), ye = /\?/;
        ot.parseJSON = function (t) {
            return JSON.parse(t + "")
        }, ot.parseXML = function (e) {
            var n;
            if (!e || "string" != typeof e) return null;
            try {
                n = (new t.DOMParser).parseFromString(e, "text/xml")
            } catch (i) {
                n = void 0
            }
            return n && !n.getElementsByTagName("parsererror").length || ot.error("Invalid XML: " + e), n
        };
        var $e = /#.*$/, we = /([?&])_=[^&]*/, be = /^(.*?):[ \t]*([^\r\n]*)$/gm,
            xe = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Ce = /^(?:GET|HEAD)$/, ke = /^\/\//,
            Se = {},
            _e = {}, Ee = "*/".concat("*"), Te = Q.createElement("a");
        Te.href = ge.href, ot.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: ge.href,
                type: "GET",
                isLocal: xe.test(ge.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Ee,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/},
                responseFields: {xml: "responseXML", text: "responseText", json: "responseJSON"},
                converters: {"* text": String, "text html": !0, "text json": ot.parseJSON, "text xml": ot.parseXML},
                flatOptions: {url: !0, context: !0}
            },
            ajaxSetup: function (t, e) {
                return e ? B(B(t, ot.ajaxSettings), e) : B(ot.ajaxSettings, t)
            },
            ajaxPrefilter: q(Se),
            ajaxTransport: q(_e),
            ajax: function (e, n) {
                function i(e, n, i, s) {
                    var c, d, y, $, b, C = n;
                    2 !== w && (w = 2, l && t.clearTimeout(l), r = void 0, a = s || "", x.readyState = e > 0 ? 4 : 0, c = e >= 200 && e < 300 || 304 === e, i && ($ = V(f, x, i)), $ = W(f, $, x, c), c ? (f.ifModified && (b = x.getResponseHeader("Last-Modified"), b && (ot.lastModified[o] = b), b = x.getResponseHeader("etag"), b && (ot.etag[o] = b)), 204 === e || "HEAD" === f.type ? C = "nocontent" : 304 === e ? C = "notmodified" : (C = $.state, d = $.data, y = $.error, c = !y)) : (y = C, !e && C || (C = "error", e < 0 && (e = 0))), x.status = e, x.statusText = (n || C) + "", c ? m.resolveWith(h, [d, C, x]) : m.rejectWith(h, [x, C, y]), x.statusCode(v), v = void 0, u && p.trigger(c ? "ajaxSuccess" : "ajaxError", [x, f, c ? d : y]), g.fireWith(h, [x, C]), u && (p.trigger("ajaxComplete", [x, f]), --ot.active || ot.event.trigger("ajaxStop")))
                }

                "object" == typeof e && (n = e, e = void 0), n = n || {};
                var r, o, a, s, l, c, u, d, f = ot.ajaxSetup({}, n), h = f.context || f,
                    p = f.context && (h.nodeType || h.jquery) ? ot(h) : ot.event, m = ot.Deferred(),
                    g = ot.Callbacks("once memory"), v = f.statusCode || {}, y = {}, $ = {}, w = 0, b = "canceled",
                    x = {
                        readyState: 0, getResponseHeader: function (t) {
                            var e;
                            if (2 === w) {
                                if (!s) for (s = {}; e = be.exec(a);) s[e[1].toLowerCase()] = e[2];
                                e = s[t.toLowerCase()]
                            }
                            return null == e ? null : e
                        }, getAllResponseHeaders: function () {
                            return 2 === w ? a : null
                        }, setRequestHeader: function (t, e) {
                            var n = t.toLowerCase();
                            return w || (t = $[n] = $[n] || t, y[t] = e), this
                        }, overrideMimeType: function (t) {
                            return w || (f.mimeType = t), this
                        }, statusCode: function (t) {
                            var e;
                            if (t) if (w < 2) for (e in t) v[e] = [v[e], t[e]]; else x.always(t[x.status]);
                            return this
                        }, abort: function (t) {
                            var e = t || b;
                            return r && r.abort(e), i(0, e), this
                        }
                    };
                if (m.promise(x).complete = g.add, x.success = x.done, x.error = x.fail, f.url = ((e || f.url || ge.href) + "").replace($e, "").replace(ke, ge.protocol + "//"), f.type = n.method || n.type || f.method || f.type, f.dataTypes = ot.trim(f.dataType || "*").toLowerCase().match(bt) || [""], null == f.crossDomain) {
                    c = Q.createElement("a");
                    try {
                        c.href = f.url, c.href = c.href, f.crossDomain = Te.protocol + "//" + Te.host != c.protocol + "//" + c.host
                    } catch (C) {
                        f.crossDomain = !0
                    }
                }
                if (f.data && f.processData && "string" != typeof f.data && (f.data = ot.param(f.data, f.traditional)), H(Se, f, n, x), 2 === w) return x;
                u = ot.event && f.global, u && 0 === ot.active++ && ot.event.trigger("ajaxStart"), f.type = f.type.toUpperCase(), f.hasContent = !Ce.test(f.type), o = f.url, f.hasContent || (f.data && (o = f.url += (ye.test(o) ? "&" : "?") + f.data, delete f.data), f.cache === !1 && (f.url = we.test(o) ? o.replace(we, "$1_=" + ve++) : o + (ye.test(o) ? "&" : "?") + "_=" + ve++)), f.ifModified && (ot.lastModified[o] && x.setRequestHeader("If-Modified-Since", ot.lastModified[o]), ot.etag[o] && x.setRequestHeader("If-None-Match", ot.etag[o])), (f.data && f.hasContent && f.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", f.contentType), x.setRequestHeader("Accept", f.dataTypes[0] && f.accepts[f.dataTypes[0]] ? f.accepts[f.dataTypes[0]] + ("*" !== f.dataTypes[0] ? ", " + Ee + "; q=0.01" : "") : f.accepts["*"]);
                for (d in f.headers) x.setRequestHeader(d, f.headers[d]);
                if (f.beforeSend && (f.beforeSend.call(h, x, f) === !1 || 2 === w)) return x.abort();
                b = "abort";
                for (d in {success: 1, error: 1, complete: 1}) x[d](f[d]);
                if (r = H(_e, f, n, x)) {
                    if (x.readyState = 1, u && p.trigger("ajaxSend", [x, f]), 2 === w) return x;
                    f.async && f.timeout > 0 && (l = t.setTimeout(function () {
                        x.abort("timeout")
                    }, f.timeout));
                    try {
                        w = 1, r.send(y, i)
                    } catch (C) {
                        if (!(w < 2)) throw C;
                        i(-1, C)
                    }
                } else i(-1, "No Transport");
                return x
            },
            getJSON: function (t, e, n) {
                return ot.get(t, e, n, "json")
            },
            getScript: function (t, e) {
                return ot.get(t, void 0, e, "script")
            }
        }), ot.each(["get", "post"], function (t, e) {
            ot[e] = function (t, n, i, r) {
                return ot.isFunction(n) && (r = r || i, i = n, n = void 0), ot.ajax(ot.extend({
                    url: t,
                    type: e,
                    dataType: r,
                    data: n,
                    success: i
                }, ot.isPlainObject(t) && t))
            }
        }), ot._evalUrl = function (t) {
            return ot.ajax({url: t, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0})
        }, ot.fn.extend({
            wrapAll: function (t) {
                var e;
                return ot.isFunction(t) ? this.each(function (e) {
                    ot(this).wrapAll(t.call(this, e))
                }) : (this[0] && (e = ot(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function () {
                    for (var t = this; t.firstElementChild;) t = t.firstElementChild;
                    return t
                }).append(this)), this)
            }, wrapInner: function (t) {
                return ot.isFunction(t) ? this.each(function (e) {
                    ot(this).wrapInner(t.call(this, e))
                }) : this.each(function () {
                    var e = ot(this), n = e.contents();
                    n.length ? n.wrapAll(t) : e.append(t)
                })
            }, wrap: function (t) {
                var e = ot.isFunction(t);
                return this.each(function (n) {
                    ot(this).wrapAll(e ? t.call(this, n) : t)
                })
            }, unwrap: function () {
                return this.parent().each(function () {
                    ot.nodeName(this, "body") || ot(this).replaceWith(this.childNodes)
                }).end()
            }
        }), ot.expr.filters.hidden = function (t) {
            return !ot.expr.filters.visible(t)
        }, ot.expr.filters.visible = function (t) {
            return t.offsetWidth > 0 || t.offsetHeight > 0 || t.getClientRects().length > 0
        };
        var Ae = /%20/g, Oe = /\[\]$/, De = /\r?\n/g, Pe = /^(?:submit|button|image|reset|file)$/i,
            Me = /^(?:input|select|textarea|keygen)/i;
        ot.param = function (t, e) {
            var n, i = [], r = function (t, e) {
                e = ot.isFunction(e) ? e() : null == e ? "" : e, i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
            };
            if (void 0 === e && (e = ot.ajaxSettings && ot.ajaxSettings.traditional), ot.isArray(t) || t.jquery && !ot.isPlainObject(t)) ot.each(t, function () {
                r(this.name, this.value)
            }); else for (n in t) U(n, t[n], e, r);
            return i.join("&").replace(Ae, "+")
        }, ot.fn.extend({
            serialize: function () {
                return ot.param(this.serializeArray())
            }, serializeArray: function () {
                return this.map(function () {
                    var t = ot.prop(this, "elements");
                    return t ? ot.makeArray(t) : this
                }).filter(function () {
                    var t = this.type;
                    return this.name && !ot(this).is(":disabled") && Me.test(this.nodeName) && !Pe.test(t) && (this.checked || !Mt.test(t))
                }).map(function (t, e) {
                    var n = ot(this).val();
                    return null == n ? null : ot.isArray(n) ? ot.map(n, function (t) {
                        return {name: e.name, value: t.replace(De, "\r\n")}
                    }) : {name: e.name, value: n.replace(De, "\r\n")}
                }).get()
            }
        }), ot.ajaxSettings.xhr = function () {
            try {
                return new t.XMLHttpRequest
            } catch (e) {
            }
        };
        var Le = {0: 200, 1223: 204}, je = ot.ajaxSettings.xhr();
        it.cors = !!je && "withCredentials" in je, it.ajax = je = !!je, ot.ajaxTransport(function (e) {
            var n, i;
            if (it.cors || je && !e.crossDomain) return {
                send: function (r, o) {
                    var a, s = e.xhr();
                    if (s.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (a in e.xhrFields) s[a] = e.xhrFields[a];
                    e.mimeType && s.overrideMimeType && s.overrideMimeType(e.mimeType), e.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
                    for (a in r) s.setRequestHeader(a, r[a]);
                    n = function (t) {
                        return function () {
                            n && (n = i = s.onload = s.onerror = s.onabort = s.onreadystatechange = null, "abort" === t ? s.abort() : "error" === t ? "number" != typeof s.status ? o(0, "error") : o(s.status, s.statusText) : o(Le[s.status] || s.status, s.statusText, "text" !== (s.responseType || "text") || "string" != typeof s.responseText ? {binary: s.response} : {text: s.responseText}, s.getAllResponseHeaders()))
                        }
                    }, s.onload = n(), i = s.onerror = n("error"), void 0 !== s.onabort ? s.onabort = i : s.onreadystatechange = function () {
                        4 === s.readyState && t.setTimeout(function () {
                            n && i()
                        })
                    }, n = n("abort");
                    try {
                        s.send(e.hasContent && e.data || null)
                    } catch (l) {
                        if (n) throw l
                    }
                }, abort: function () {
                    n && n()
                }
            }
        }), ot.ajaxSetup({
            accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},
            contents: {script: /\b(?:java|ecma)script\b/},
            converters: {
                "text script": function (t) {
                    return ot.globalEval(t), t
                }
            }
        }), ot.ajaxPrefilter("script", function (t) {
            void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET")
        }), ot.ajaxTransport("script", function (t) {
            if (t.crossDomain) {
                var e, n;
                return {
                    send: function (i, r) {
                        e = ot("<script>").prop({
                            charset: t.scriptCharset,
                            src: t.url
                        }).on("load error", n = function (t) {
                            e.remove(), n = null, t && r("error" === t.type ? 404 : 200, t.type)
                        }), Q.head.appendChild(e[0])
                    }, abort: function () {
                        n && n()
                    }
                }
            }
        });
        var Ne = [], Fe = /(=)\?(?=&|$)|\?\?/;
        ot.ajaxSetup({
            jsonp: "callback", jsonpCallback: function () {
                var t = Ne.pop() || ot.expando + "_" + ve++;
                return this[t] = !0, t
            }
        }), ot.ajaxPrefilter("json jsonp", function (e, n, i) {
            var r, o, a,
                s = e.jsonp !== !1 && (Fe.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Fe.test(e.data) && "data");
            if (s || "jsonp" === e.dataTypes[0]) return r = e.jsonpCallback = ot.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, s ? e[s] = e[s].replace(Fe, "$1" + r) : e.jsonp !== !1 && (e.url += (ye.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function () {
                return a || ot.error(r + " was not called"), a[0]
            }, e.dataTypes[0] = "json", o = t[r], t[r] = function () {
                a = arguments
            }, i.always(function () {
                void 0 === o ? ot(t).removeProp(r) : t[r] = o, e[r] && (e.jsonpCallback = n.jsonpCallback, Ne.push(r)), a && ot.isFunction(o) && o(a[0]), a = o = void 0
            }), "script"
        }), ot.parseHTML = function (t, e, n) {
            if (!t || "string" != typeof t) return null;
            "boolean" == typeof e && (n = e, e = !1), e = e || Q;
            var i = pt.exec(t), r = !n && [];
            return i ? [e.createElement(i[1])] : (i = f([t], e, r), r && r.length && ot(r).remove(), ot.merge([], i.childNodes))
        };
        var Ie = ot.fn.load;
        ot.fn.load = function (t, e, n) {
            if ("string" != typeof t && Ie) return Ie.apply(this, arguments);
            var i, r, o, a = this, s = t.indexOf(" ");
            return s > -1 && (i = ot.trim(t.slice(s)), t = t.slice(0, s)), ot.isFunction(e) ? (n = e, e = void 0) : e && "object" == typeof e && (r = "POST"), a.length > 0 && ot.ajax({
                url: t,
                type: r || "GET",
                dataType: "html",
                data: e
            }).done(function (t) {
                o = arguments, a.html(i ? ot("<div>").append(ot.parseHTML(t)).find(i) : t)
            }).always(n && function (t, e) {
                a.each(function () {
                    n.apply(this, o || [t.responseText, e, t])
                })
            }), this
        }, ot.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (t, e) {
            ot.fn[e] = function (t) {
                return this.on(e, t)
            }
        }), ot.expr.filters.animated = function (t) {
            return ot.grep(ot.timers, function (e) {
                return t === e.elem
            }).length
        }, ot.offset = {
            setOffset: function (t, e, n) {
                var i, r, o, a, s, l, c, u = ot.css(t, "position"), d = ot(t), f = {};
                "static" === u && (t.style.position = "relative"), s = d.offset(), o = ot.css(t, "top"), l = ot.css(t, "left"), c = ("absolute" === u || "fixed" === u) && (o + l).indexOf("auto") > -1, c ? (i = d.position(), a = i.top, r = i.left) : (a = parseFloat(o) || 0, r = parseFloat(l) || 0), ot.isFunction(e) && (e = e.call(t, n, ot.extend({}, s))), null != e.top && (f.top = e.top - s.top + a), null != e.left && (f.left = e.left - s.left + r), "using" in e ? e.using.call(t, f) : d.css(f)
            }
        }, ot.fn.extend({
            offset: function (t) {
                if (arguments.length) return void 0 === t ? this : this.each(function (e) {
                    ot.offset.setOffset(this, t, e)
                });
                var e, n, i = this[0], r = {top: 0, left: 0}, o = i && i.ownerDocument;
                if (o) return e = o.documentElement, ot.contains(e, i) ? (r = i.getBoundingClientRect(), n = G(o), {
                    top: r.top + n.pageYOffset - e.clientTop,
                    left: r.left + n.pageXOffset - e.clientLeft
                }) : r
            }, position: function () {
                if (this[0]) {
                    var t, e, n = this[0], i = {top: 0, left: 0};
                    return "fixed" === ot.css(n, "position") ? e = n.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), ot.nodeName(t[0], "html") || (i = t.offset()), i.top += ot.css(t[0], "borderTopWidth", !0), i.left += ot.css(t[0], "borderLeftWidth", !0)), {
                        top: e.top - i.top - ot.css(n, "marginTop", !0),
                        left: e.left - i.left - ot.css(n, "marginLeft", !0)
                    }
                }
            }, offsetParent: function () {
                return this.map(function () {
                    for (var t = this.offsetParent; t && "static" === ot.css(t, "position");) t = t.offsetParent;
                    return t || Zt
                })
            }
        }), ot.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (t, e) {
            var n = "pageYOffset" === e;
            ot.fn[t] = function (i) {
                return Ct(this, function (t, i, r) {
                    var o = G(t);
                    return void 0 === r ? o ? o[e] : t[i] : void (o ? o.scrollTo(n ? o.pageXOffset : r, n ? r : o.pageYOffset) : t[i] = r)
                }, t, i, arguments.length)
            }
        }), ot.each(["top", "left"], function (t, e) {
            ot.cssHooks[e] = E(it.pixelPosition, function (t, n) {
                if (n) return n = _(t, e), Qt.test(n) ? ot(t).position()[e] + "px" : n
            })
        }), ot.each({Height: "height", Width: "width"}, function (t, e) {
            ot.each({padding: "inner" + t, content: e, "": "outer" + t}, function (n, i) {
                ot.fn[i] = function (i, r) {
                    var o = arguments.length && (n || "boolean" != typeof i),
                        a = n || (i === !0 || r === !0 ? "margin" : "border");
                    return Ct(this, function (e, n, i) {
                        var r;
                        return ot.isWindow(e) ? e.document.documentElement["client" + t] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + t], r["scroll" + t], e.body["offset" + t], r["offset" + t], r["client" + t])) : void 0 === i ? ot.css(e, n, a) : ot.style(e, n, i, a)
                    }, e, o ? i : void 0, o, null)
                }
            })
        }), ot.fn.extend({
            bind: function (t, e, n) {
                return this.on(t, null, e, n)
            }, unbind: function (t, e) {
                return this.off(t, null, e)
            }, delegate: function (t, e, n, i) {
                return this.on(e, t, n, i)
            }, undelegate: function (t, e, n) {
                return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", n)
            }, size: function () {
                return this.length
            }
        }), ot.fn.andSelf = ot.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function () {
            return ot
        });
        var Re = t.jQuery, ze = t.$;

        if (true)
            return;

        return ot.noConflict = function (e) {
            return t.$ === ot && (t.$ = ze), e && t.jQuery === ot && (t.jQuery = Re), ot
        }, e || (t.jQuery = t.$ = ot), ot
    }) ,


    function (t) {
        "use strict";

        function e(t, e) {
            return e = e || Error, function () {
                var n, i, r = 2, o = arguments, a = o[0], s = "[" + (t ? t + ":" : "") + a + "] ", l = o[1];
                for (s += l.replace(/\{\d+\}/g, function (t) {
                    var e = +t.slice(1, -1), n = e + r;
                    return n < o.length ? $t(o[n]) : t
                }), s += "\nhttp://errors.angularjs.org/1.5.10/" + (t ? t + "/" : "") + a, i = r, n = "?"; i < o.length; i++, n = "&") s += n + "p" + (i - r) + "=" + encodeURIComponent($t(o[i]));
                return new e(s)
            }
        }

        function n(t) {
            if (null == t || _(t)) return !1;
            if (ir(t) || b(t) || Wi && t instanceof Wi) return !0;
            var e = "length" in Object(t) && t.length;
            return x(e) && (e >= 0 && (e - 1 in t || t instanceof Array) || "function" == typeof t.item)
        }

        function i(t, e, r) {
            var o, a;
            if (t) if (k(t)) for (o in t) "prototype" === o || "length" === o || "name" === o || t.hasOwnProperty && !t.hasOwnProperty(o) || e.call(r, t[o], o, t); else if (ir(t) || n(t)) {
                var s = "object" != typeof t;
                for (o = 0, a = t.length; o < a; o++) (s || o in t) && e.call(r, t[o], o, t)
            } else if (t.forEach && t.forEach !== i) t.forEach(e, r, t); else if (w(t)) for (o in t) e.call(r, t[o], o, t); else if ("function" == typeof t.hasOwnProperty) for (o in t) t.hasOwnProperty(o) && e.call(r, t[o], o, t); else for (o in t) Ri.call(t, o) && e.call(r, t[o], o, t);
            return t
        }

        function r(t, e, n) {
            for (var i = Object.keys(t).sort(), r = 0; r < i.length; r++) e.call(n, t[i[r]], i[r]);
            return i
        }

        function o(t) {
            return function (e, n) {
                t(n, e)
            }
        }

        function a() {
            return ++er
        }

        function s(t, e) {
            e ? t.$$hashKey = e : delete t.$$hashKey
        }

        function l(t, e, n) {
            for (var i = t.$$hashKey, r = 0, o = e.length; r < o; ++r) {
                var a = e[r];
                if ($(a) || k(a)) for (var c = Object.keys(a), u = 0, d = c.length; u < d; u++) {
                    var f = c[u], h = a[f];
                    n && $(h) ? C(h) ? t[f] = new Date(h.valueOf()) : S(h) ? t[f] = new RegExp(h) : h.nodeName ? t[f] = h.cloneNode(!0) : j(h) ? t[f] = h.clone() : ($(t[f]) || (t[f] = ir(h) ? [] : {}), l(t[f], [h], !0)) : t[f] = h
                }
            }
            return s(t, i), t
        }

        function c(t) {
            return l(t, Yi.call(arguments, 1), !1)
        }

        function u(t) {
            return l(t, Yi.call(arguments, 1), !0)
        }

        function d(t) {
            return parseInt(t, 10)
        }

        function f(t, e) {
            return c(Object.create(t), e)
        }

        function h() {
        }

        function p(t) {
            return t
        }

        function m(t) {
            return function () {
                return t
            }
        }

        function g(t) {
            return k(t.toString) && t.toString !== Xi
        }

        function v(t) {
            return "undefined" == typeof t
        }

        function y(t) {
            return "undefined" != typeof t
        }

        function $(t) {
            return null !== t && "object" == typeof t
        }

        function w(t) {
            return null !== t && "object" == typeof t && !Zi(t)
        }

        function b(t) {
            return "string" == typeof t
        }

        function x(t) {
            return "number" == typeof t
        }

        function C(t) {
            return "[object Date]" === Xi.call(t)
        }

        function k(t) {
            return "function" == typeof t
        }

        function S(t) {
            return "[object RegExp]" === Xi.call(t)
        }

        function _(t) {
            return t && t.window === t
        }

        function E(t) {
            return t && t.$evalAsync && t.$watch
        }

        function T(t) {
            return "[object File]" === Xi.call(t)
        }

        function A(t) {
            return "[object FormData]" === Xi.call(t)
        }

        function O(t) {
            return "[object Blob]" === Xi.call(t)
        }

        function D(t) {
            return "boolean" == typeof t
        }

        function P(t) {
            return t && k(t.then)
        }

        function M(t) {
            return t && x(t.length) && rr.test(Xi.call(t))
        }

        function L(t) {
            return "[object ArrayBuffer]" === Xi.call(t)
        }

        function j(t) {
            return !(!t || !(t.nodeName || t.prop && t.attr && t.find))
        }

        function N(t) {
            var e, n = {}, i = t.split(",");
            for (e = 0; e < i.length; e++) n[i[e]] = !0;
            return n
        }

        function F(t) {
            return zi(t.nodeName || t[0] && t[0].nodeName)
        }

        function I(t, e) {
            var n = t.indexOf(e);
            return n >= 0 && t.splice(n, 1), n
        }

        function R(t, e) {
            function n(t, e) {
                var n, i = e.$$hashKey;
                if (ir(t)) for (var o = 0, a = t.length; o < a; o++) e.push(r(t[o])); else if (w(t)) for (n in t) e[n] = r(t[n]); else if (t && "function" == typeof t.hasOwnProperty) for (n in t) t.hasOwnProperty(n) && (e[n] = r(t[n])); else for (n in t) Ri.call(t, n) && (e[n] = r(t[n]));
                return s(e, i), e
            }

            function r(t) {
                if (!$(t)) return t;
                var e = a.indexOf(t);
                if (e !== -1) return l[e];
                if (_(t) || E(t)) throw Ji("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
                var i = !1, r = o(t);
                return void 0 === r && (r = ir(t) ? [] : Object.create(Zi(t)), i = !0), a.push(t), l.push(r), i ? n(t, r) : r
            }

            function o(t) {
                switch (Xi.call(t)) {
                    case"[object Int8Array]":
                    case"[object Int16Array]":
                    case"[object Int32Array]":
                    case"[object Float32Array]":
                    case"[object Float64Array]":
                    case"[object Uint8Array]":
                    case"[object Uint8ClampedArray]":
                    case"[object Uint16Array]":
                    case"[object Uint32Array]":
                        return new t.constructor(r(t.buffer), t.byteOffset, t.length);
                    case"[object ArrayBuffer]":
                        if (!t.slice) {
                            var e = new ArrayBuffer(t.byteLength);
                            return new Uint8Array(e).set(new Uint8Array(t)), e
                        }
                        return t.slice(0);
                    case"[object Boolean]":
                    case"[object Number]":
                    case"[object String]":
                    case"[object Date]":
                        return new t.constructor(t.valueOf());
                    case"[object RegExp]":
                        var n = new RegExp(t.source, t.toString().match(/[^\/]*$/)[0]);
                        return n.lastIndex = t.lastIndex, n;
                    case"[object Blob]":
                        return new t.constructor([t], {type: t.type})
                }
                if (k(t.cloneNode)) return t.cloneNode(!0)
            }

            var a = [], l = [];
            if (e) {
                if (M(e) || L(e)) throw Ji("cpta", "Can't copy! TypedArray destination cannot be mutated.");
                if (t === e) throw Ji("cpi", "Can't copy! Source and destination are identical.");
                return ir(e) ? e.length = 0 : i(e, function (t, n) {
                    "$$hashKey" !== n && delete e[n]
                }), a.push(t), l.push(e), n(t, e)
            }
            return r(t)
        }

        function z(t, e) {
            if (t === e) return !0;
            if (null === t || null === e) return !1;
            if (t !== t && e !== e) return !0;
            var n, i, r, o = typeof t, a = typeof e;
            if (o === a && "object" === o) {
                if (!ir(t)) {
                    if (C(t)) return !!C(e) && z(t.getTime(), e.getTime());
                    if (S(t)) return !!S(e) && t.toString() === e.toString();
                    if (E(t) || E(e) || _(t) || _(e) || ir(e) || C(e) || S(e)) return !1;
                    r = mt();
                    for (i in t) if ("$" !== i.charAt(0) && !k(t[i])) {
                        if (!z(t[i], e[i])) return !1;
                        r[i] = !0
                    }
                    for (i in e) if (!(i in r) && "$" !== i.charAt(0) && y(e[i]) && !k(e[i])) return !1;
                    return !0
                }
                if (!ir(e)) return !1;
                if ((n = t.length) === e.length) {
                    for (i = 0; i < n; i++) if (!z(t[i], e[i])) return !1;
                    return !0
                }
            }
            return !1
        }

        function q(t, e, n) {
            return t.concat(Yi.call(e, n))
        }

        function H(t, e) {
            return Yi.call(t, e || 0)
        }

        function B(t, e) {
            var n = arguments.length > 2 ? H(arguments, 2) : [];
            return !k(e) || e instanceof RegExp ? e : n.length ? function () {
                return arguments.length ? e.apply(t, q(n, arguments, 0)) : e.apply(t, n)
            } : function () {
                return arguments.length ? e.apply(t, arguments) : e.call(t)
            }
        }

        function V(e, n) {
            var i = n;
            return "string" == typeof e && "$" === e.charAt(0) && "$" === e.charAt(1) ? i = void 0 : _(n) ? i = "$WINDOW" : n && t.document === n ? i = "$DOCUMENT" : E(n) && (i = "$SCOPE"), i
        }

        function W(t, e) {
            if (!v(t)) return x(e) || (e = e ? 2 : null), JSON.stringify(t, V, e)
        }

        function U(t) {
            return b(t) ? JSON.parse(t) : t
        }

        function G(t, e) {
            t = t.replace(cr, "");
            var n = Date.parse("Jan 01, 1970 00:00:00 " + t) / 6e4;
            return nr(n) ? e : n
        }

        function Y(t, e) {
            return t = new Date(t.getTime()), t.setMinutes(t.getMinutes() + e), t
        }

        function Q(t, e, n) {
            n = n ? -1 : 1;
            var i = t.getTimezoneOffset(), r = G(e, i);
            return Y(t, n * (r - i))
        }

        function K(t) {
            t = Wi(t).clone();
            try {
                t.empty()
            } catch (e) {
            }
            var n = Wi("<div>").append(t).html();
            try {
                return t[0].nodeType === gr ? zi(n) : n.match(/^(<[^>]+>)/)[1].replace(/^<([\w-]+)/, function (t, e) {
                    return "<" + zi(e)
                })
            } catch (e) {
                return zi(n)
            }
        }

        function X(t) {
            try {
                return decodeURIComponent(t)
            } catch (e) {
            }
        }

        function Z(t) {
            var e = {};
            return i((t || "").split("&"), function (t) {
                var n, i, r;
                t && (i = t = t.replace(/\+/g, "%20"), n = t.indexOf("="), n !== -1 && (i = t.substring(0, n), r = t.substring(n + 1)), i = X(i), y(i) && (r = !y(r) || X(r), Ri.call(e, i) ? ir(e[i]) ? e[i].push(r) : e[i] = [e[i], r] : e[i] = r))
            }), e
        }

        function J(t) {
            var e = [];
            return i(t, function (t, n) {
                ir(t) ? i(t, function (t) {
                    e.push(et(n, !0) + (t === !0 ? "" : "=" + et(t, !0)))
                }) : e.push(et(n, !0) + (t === !0 ? "" : "=" + et(t, !0)))
            }), e.length ? e.join("&") : ""
        }

        function tt(t) {
            return et(t, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
        }

        function et(t, e) {
            return encodeURIComponent(t).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, e ? "%20" : "+")
        }

        function nt(t, e) {
            var n, i, r = ur.length;
            for (i = 0; i < r; ++i) if (n = ur[i] + e, b(n = t.getAttribute(n))) return n;
            return null
        }

        function it(t) {
            if (!t.currentScript) return !0;
            var e = t.currentScript.getAttribute("src"), n = t.createElement("a");
            if (n.href = e, t.location.origin === n.origin) return !0;
            switch (n.protocol) {
                case"http:":
                case"https:":
                case"ftp:":
                case"blob:":
                case"file:":
                case"data:":
                    return !0;
                default:
                    return !1
            }
        }

        function rt(e, n) {
            var r, o, a = {};
            if (i(ur, function (t) {
                var n = t + "app";
                !r && e.hasAttribute && e.hasAttribute(n) && (r = e, o = e.getAttribute(n))
            }), i(ur, function (t) {
                var n, i = t + "app";
                !r && (n = e.querySelector("[" + i.replace(":", "\\:") + "]")) && (r = n, o = n.getAttribute(i))
            }), r) {
                if (!dr) return void t.console.error("Angular: disabling automatic bootstrap. <script> protocol indicates an extension, document.location.href does not match.");
                a.strictDi = null !== nt(r, "strict-di"), n(r, o ? [o] : [], a)
            }
        }

        function ot(e, n, r) {
            $(r) || (r = {});
            var o = {strictDi: !1};
            r = c(o, r);
            var a = function () {
                if (e = Wi(e), e.injector()) {
                    var i = e[0] === t.document ? "document" : K(e);
                    throw Ji("btstrpd", "App already bootstrapped with this element '{0}'", i.replace(/</, "&lt;").replace(/>/, "&gt;"))
                }
                n = n || [], n.unshift(["$provide", function (t) {
                    t.value("$rootElement", e)
                }]), r.debugInfoEnabled && n.push(["$compileProvider", function (t) {
                    t.debugInfoEnabled(!0)
                }]), n.unshift("ng");
                var o = re(n, r.strictDi);
                return o.invoke(["$rootScope", "$rootElement", "$compile", "$injector", function (t, e, n, i) {
                    t.$apply(function () {
                        e.data("$injector", i), n(e)(t)
                    })
                }]), o
            }, s = /^NG_ENABLE_DEBUG_INFO!/, l = /^NG_DEFER_BOOTSTRAP!/;
            return t && s.test(t.name) && (r.debugInfoEnabled = !0, t.name = t.name.replace(s, "")), t && !l.test(t.name) ? a() : (t.name = t.name.replace(l, ""), tr.resumeBootstrap = function (t) {
                return i(t, function (t) {
                    n.push(t)
                }), a()
            }, void (k(tr.resumeDeferredBootstrap) && tr.resumeDeferredBootstrap()))
        }

        function at() {
            t.name = "NG_ENABLE_DEBUG_INFO!" + t.name, t.location.reload()
        }

        function st(t) {
            var e = tr.element(t).injector();
            if (!e) throw Ji("test", "no injector found for element argument to getTestability");
            return e.get("$$testability")
        }

        function lt(t, e) {
            return e = e || "_", t.replace(fr, function (t, n) {
                return (n ? e : "") + t.toLowerCase()
            })
        }

        function ct() {
            var e;
            if (!hr) {
                var n = lr();
                Ui = v(n) ? t.jQuery : n ? t[n] : void 0, Ui && Ui.fn.on ? (Wi = Ui, c(Ui.fn, {
                    scope: jr.scope,
                    isolateScope: jr.isolateScope,
                    controller: jr.controller,
                    injector: jr.injector,
                    inheritedData: jr.inheritedData
                }), e = Ui.cleanData, Ui.cleanData = function (t) {
                    for (var n, i, r = 0; null != (i = t[r]); r++) n = Ui._data(i, "events"), n && n.$destroy && Ui(i).triggerHandler("$destroy");
                    e(t)
                }) : Wi = Ot, tr.element = Wi, hr = !0
            }
        }

        function ut(t, e, n) {
            if (!t) throw Ji("areq", "Argument '{0}' is {1}", e || "?", n || "required");
            return t
        }

        function dt(t, e, n) {
            return n && ir(t) && (t = t[t.length - 1]), ut(k(t), e, "not a function, got " + (t && "object" == typeof t ? t.constructor.name || "Object" : typeof t)), t
        }

        function ft(t, e) {
            if ("hasOwnProperty" === t) throw Ji("badname", "hasOwnProperty is not a valid {0} name", e)
        }

        function ht(t, e, n) {
            if (!e) return t;
            for (var i, r = e.split("."), o = t, a = r.length, s = 0; s < a; s++) i = r[s], t && (t = (o = t)[i]);
            return !n && k(t) ? B(o, t) : t
        }

        function pt(t) {
            for (var e, n = t[0], i = t[t.length - 1], r = 1; n !== i && (n = n.nextSibling); r++) (e || t[r] !== n) && (e || (e = Wi(Yi.call(t, 0, r))), e.push(n));
            return e || t
        }

        function mt() {
            return Object.create(null)
        }

        function gt(t) {
            function n(t, e, n) {
                return t[e] || (t[e] = n())
            }

            var i = e("$injector"), r = e("ng"), o = n(t, "angular", Object);
            return o.$$minErr = o.$$minErr || e, n(o, "module", function () {
                var t = {};
                return function (e, o, a) {
                    var s = function (t, e) {
                        if ("hasOwnProperty" === t) throw r("badname", "hasOwnProperty is not a valid {0} name", e)
                    };
                    return s(e, "module"), o && t.hasOwnProperty(e) && (t[e] = null), n(t, e, function () {
                        function t(t, e, n, i) {
                            return i || (i = r), function () {
                                return i[n || "push"]([t, e, arguments]), u
                            }
                        }

                        function n(t, n) {
                            return function (i, o) {
                                return o && k(o) && (o.$$moduleName = e), r.push([t, n, arguments]), u
                            }
                        }

                        if (!o) throw i("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", e);
                        var r = [], s = [], l = [], c = t("$injector", "invoke", "push", s), u = {
                            _invokeQueue: r,
                            _configBlocks: s,
                            _runBlocks: l,
                            requires: o,
                            name: e,
                            provider: n("$provide", "provider"),
                            factory: n("$provide", "factory"),
                            service: n("$provide", "service"),
                            value: t("$provide", "value"),
                            constant: t("$provide", "constant", "unshift"),
                            decorator: n("$provide", "decorator"),
                            animation: n("$animateProvider", "register"),
                            filter: n("$filterProvider", "register"),
                            controller: n("$controllerProvider", "register"),
                            directive: n("$compileProvider", "directive"),
                            component: n("$compileProvider", "component"),
                            config: c,
                            run: function (t) {
                                return l.push(t), this
                            }
                        };
                        return a && c(a), u
                    })
                }
            })
        }

        function vt(t, e) {
            if (ir(t)) {
                e = e || [];
                for (var n = 0, i = t.length; n < i; n++) e[n] = t[n]
            } else if ($(t)) {
                e = e || {};
                for (var r in t) "$" === r.charAt(0) && "$" === r.charAt(1) || (e[r] = t[r])
            }
            return e || t
        }

        function yt(t) {
            var e = [];
            return JSON.stringify(t, function (t, n) {
                if (n = V(t, n), $(n)) {
                    if (e.indexOf(n) >= 0) return "...";
                    e.push(n)
                }
                return n
            })
        }

        function $t(t) {
            return "function" == typeof t ? t.toString().replace(/ \{[\s\S]*$/, "") : v(t) ? "undefined" : "string" != typeof t ? yt(t) : t
        }

        function wt(n) {
            c(n, {
                bootstrap: ot,
                copy: R,
                extend: c,
                merge: u,
                equals: z,
                element: Wi,
                forEach: i,
                injector: re,
                noop: h,
                bind: B,
                toJson: W,
                fromJson: U,
                identity: p,
                isUndefined: v,
                isDefined: y,
                isString: b,
                isFunction: k,
                isObject: $,
                isNumber: x,
                isElement: j,
                isArray: ir,
                version: wr,
                isDate: C,
                lowercase: zi,
                uppercase: qi,
                callbacks: {$$counter: 0},
                getTestability: st,
                $$minErr: e,
                $$csp: sr,
                reloadWithDebugInfo: at
            }), (Gi = gt(t))("ng", ["ngLocale"], ["$provide", function (t) {
                t.provider({$$sanitizeUri: _n}), t.provider("$compile", me).directive({
                    a: ia,
                    input: xa,
                    textarea: xa,
                    form: la,
                    script: vs,
                    select: ws,
                    option: bs,
                    ngBind: Sa,
                    ngBindHtml: Ea,
                    ngBindTemplate: _a,
                    ngClass: Aa,
                    ngClassEven: Da,
                    ngClassOdd: Oa,
                    ngCloak: Pa,
                    ngController: Ma,
                    ngForm: ca,
                    ngHide: us,
                    ngIf: Na,
                    ngInclude: Fa,
                    ngInit: Ra,
                    ngNonBindable: es,
                    ngPluralize: os,
                    ngRepeat: as,
                    ngShow: cs,
                    ngStyle: ds,
                    ngSwitch: fs,
                    ngSwitchWhen: hs,
                    ngSwitchDefault: ps,
                    ngOptions: rs,
                    ngTransclude: gs,
                    ngModel: Za,
                    ngList: za,
                    ngChange: Ta,
                    pattern: Cs,
                    ngPattern: Cs,
                    required: xs,
                    ngRequired: xs,
                    minlength: Ss,
                    ngMinlength: Ss,
                    maxlength: ks,
                    ngMaxlength: ks,
                    ngValue: ka,
                    ngModelOptions: ts
                }).directive({ngInclude: Ia}).directive(ra).directive(La), t.provider({
                    $anchorScroll: oe,
                    $animate: Xr,
                    $animateCss: to,
                    $$animateJs: Qr,
                    $$animateQueue: Kr,
                    $$AnimateRunner: Jr,
                    $$animateAsyncRun: Zr,
                    $browser: de,
                    $cacheFactory: fe,
                    $controller: be,
                    $document: xe,
                    $exceptionHandler: Ce,
                    $filter: zn,
                    $$forceReflow: ao,
                    $interpolate: Fe,
                    $interval: Ie,
                    $http: Me,
                    $httpParamSerializer: Se,
                    $httpParamSerializerJQLike: _e,
                    $httpBackend: je,
                    $xhrFactory: Le,
                    $jsonpCallbacks: go,
                    $location: Je,
                    $log: tn,
                    $parse: wn,
                    $rootScope: Sn,
                    $q: bn,
                    $$q: xn,
                    $sce: On,
                    $sceDelegate: An,
                    $sniffer: Dn,
                    $templateCache: he,
                    $templateRequest: Pn,
                    $$testability: Mn,
                    $timeout: Ln,
                    $window: Fn,
                    $$rAF: kn,
                    $$jqLite: Xt,
                    $$HashMap: Rr,
                    $$cookieReader: Rn
                })
            }])
        }

        function bt() {
            return ++xr
        }

        function xt(t) {
            return t.replace(Sr, function (t, e, n, i) {
                return i ? n.toUpperCase() : n
            }).replace(_r, "Moz$1")
        }

        function Ct(t) {
            return !Or.test(t)
        }

        function kt(t) {
            var e = t.nodeType;
            return e === pr || !e || e === yr
        }

        function St(t) {
            for (var e in br[t.ng339]) return !0;
            return !1
        }

        function _t(t) {
            for (var e = 0, n = t.length; e < n; e++) Lt(t[e])
        }

        function Et(t, e) {
            var n, r, o, a, s = e.createDocumentFragment(), l = [];
            if (Ct(t)) l.push(e.createTextNode(t)); else {
                for (n = s.appendChild(e.createElement("div")), r = (Dr.exec(t) || ["", ""])[1].toLowerCase(), o = Mr[r] || Mr._default, n.innerHTML = o[1] + t.replace(Pr, "<$1></$2>") + o[2], a = o[0]; a--;) n = n.lastChild;
                l = q(l, n.childNodes), n = s.firstChild, n.textContent = ""
            }
            return s.textContent = "", s.innerHTML = "", i(l, function (t) {
                s.appendChild(t)
            }), s
        }

        function Tt(e, n) {
            n = n || t.document;
            var i;
            return (i = Ar.exec(e)) ? [n.createElement(i[1])] : (i = Et(e, n)) ? i.childNodes : []
        }

        function At(t, e) {
            var n = t.parentNode;
            n && n.replaceChild(e, t), e.appendChild(t)
        }

        function Ot(t) {
            if (t instanceof Ot) return t;
            var e;
            if (b(t) && (t = or(t), e = !0), !(this instanceof Ot)) {
                if (e && "<" !== t.charAt(0)) throw Tr("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
                return new Ot(t)
            }
            e ? zt(this, Tt(t)) : zt(this, t)
        }

        function Dt(t) {
            return t.cloneNode(!0)
        }

        function Pt(t, e) {
            if (e || Lt(t), t.querySelectorAll) for (var n = t.querySelectorAll("*"), i = 0, r = n.length; i < r; i++) Lt(n[i])
        }

        function Mt(t, e, n, r) {
            if (y(r)) throw Tr("offargs", "jqLite#off() does not support the `selector` argument");
            var o = jt(t), a = o && o.events, s = o && o.handle;
            if (s) if (e) {
                var l = function (e) {
                    var i = a[e];
                    y(n) && I(i || [], n), y(n) && i && i.length > 0 || (kr(t, e, s), delete a[e])
                };
                i(e.split(" "), function (t) {
                    l(t), Er[t] && l(Er[t])
                })
            } else for (e in a) "$destroy" !== e && kr(t, e, s), delete a[e]
        }

        function Lt(t, e) {
            var n = t.ng339, i = n && br[n];
            if (i) {
                if (e) return void delete i.data[e];
                i.handle && (i.events.$destroy && i.handle({}, "$destroy"), Mt(t)), delete br[n], t.ng339 = void 0
            }
        }

        function jt(t, e) {
            var n = t.ng339, i = n && br[n];
            return e && !i && (t.ng339 = n = bt(), i = br[n] = {events: {}, data: {}, handle: void 0}), i
        }

        function Nt(t, e, n) {
            if (kt(t)) {
                var i = y(n), r = !i && e && !$(e), o = !e, a = jt(t, !r), s = a && a.data;
                if (i) s[e] = n; else {
                    if (o) return s;
                    if (r) return s && s[e];
                    c(s, e)
                }
            }
        }

        function Ft(t, e) {
            return !!t.getAttribute && (" " + (t.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + e + " ") > -1
        }

        function It(t, e) {
            e && t.setAttribute && i(e.split(" "), function (e) {
                t.setAttribute("class", or((" " + (t.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + or(e) + " ", " ")))
            })
        }

        function Rt(t, e) {
            if (e && t.setAttribute) {
                var n = (" " + (t.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
                i(e.split(" "), function (t) {
                    t = or(t), n.indexOf(" " + t + " ") === -1 && (n += t + " ")
                }), t.setAttribute("class", or(n))
            }
        }

        function zt(t, e) {
            if (e) if (e.nodeType) t[t.length++] = e; else {
                var n = e.length;
                if ("number" == typeof n && e.window !== e) {
                    if (n) for (var i = 0; i < n; i++) t[t.length++] = e[i]
                } else t[t.length++] = e
            }
        }

        function qt(t, e) {
            return Ht(t, "$" + (e || "ngController") + "Controller")
        }

        function Ht(t, e, n) {
            t.nodeType === yr && (t = t.documentElement);
            for (var i = ir(e) ? e : [e]; t;) {
                for (var r = 0, o = i.length; r < o; r++) if (y(n = Wi.data(t, i[r]))) return n;
                t = t.parentNode || t.nodeType === $r && t.host
            }
        }

        function Bt(t) {
            for (Pt(t, !0); t.firstChild;) t.removeChild(t.firstChild)
        }

        function Vt(t, e) {
            e || Pt(t);
            var n = t.parentNode;
            n && n.removeChild(t)
        }

        function Wt(e, n) {
            n = n || t, "complete" === n.document.readyState ? n.setTimeout(e) : Wi(n).on("load", e)
        }

        function Ut(t, e) {
            var n = Nr[e.toLowerCase()];
            return n && Fr[F(t)] && n
        }

        function Gt(t) {
            return Ir[t]
        }

        function Yt(t, e) {
            var n = function (n, i) {
                n.isDefaultPrevented = function () {
                    return n.defaultPrevented
                };
                var r = e[i || n.type], o = r ? r.length : 0;
                if (o) {
                    if (v(n.immediatePropagationStopped)) {
                        var a = n.stopImmediatePropagation;
                        n.stopImmediatePropagation = function () {
                            n.immediatePropagationStopped = !0, n.stopPropagation && n.stopPropagation(), a && a.call(n)
                        }
                    }
                    n.isImmediatePropagationStopped = function () {
                        return n.immediatePropagationStopped === !0
                    };
                    var s = r.specialHandlerWrapper || Qt;
                    o > 1 && (r = vt(r));
                    for (var l = 0; l < o; l++) n.isImmediatePropagationStopped() || s(t, n, r[l])
                }
            };
            return n.elem = t, n
        }

        function Qt(t, e, n) {
            n.call(t, e)
        }

        function Kt(t, e, n) {
            var i = e.relatedTarget;
            i && (i === t || Lr.call(t, i)) || n.call(t, e)
        }

        function Xt() {
            this.$get = function () {
                return c(Ot, {
                    hasClass: function (t, e) {
                        return t.attr && (t = t[0]), Ft(t, e)
                    }, addClass: function (t, e) {
                        return t.attr && (t = t[0]), Rt(t, e)
                    }, removeClass: function (t, e) {
                        return t.attr && (t = t[0]), It(t, e)
                    }
                })
            }
        }

        function Zt(t, e) {
            var n = t && t.$$hashKey;
            if (n) return "function" == typeof n && (n = t.$$hashKey()), n;
            var i = typeof t;
            return n = "function" === i || "object" === i && null !== t ? t.$$hashKey = i + ":" + (e || a)() : i + ":" + t
        }

        function Jt(t, e) {
            if (e) {
                var n = 0;
                this.nextUid = function () {
                    return ++n
                }
            }
            i(t, this.put, this)
        }

        function te(t) {
            return Function.prototype.toString.call(t) + " "
        }

        function ee(t) {
            var e = te(t).replace(Vr, ""), n = e.match(zr) || e.match(qr);
            return n
        }

        function ne(t) {
            var e = ee(t);
            return e ? "function(" + (e[1] || "").replace(/[\s\r\n]+/, " ") + ")" : "fn"
        }

        function ie(t, e, n) {
            var r, o, a;
            if ("function" == typeof t) {
                if (!(r = t.$inject)) {
                    if (r = [], t.length) {
                        if (e) throw b(n) && n || (n = t.name || ne(t)), Wr("strictdi", "{0} is not using explicit annotation and cannot be invoked in strict mode", n);
                        o = ee(t), i(o[1].split(Hr), function (t) {
                            t.replace(Br, function (t, e, n) {
                                r.push(n)
                            })
                        })
                    }
                    t.$inject = r
                }
            } else ir(t) ? (a = t.length - 1, dt(t[a], "fn"), r = t.slice(0, a)) : dt(t, "fn", !0);
            return r
        }

        function re(t, e) {
            function n(t) {
                return function (e, n) {
                    return $(e) ? void i(e, o(t)) : t(e, n)
                }
            }

            function r(t, e) {
                if (ft(t, "service"), (k(e) || ir(e)) && (e = C.instantiate(e)), !e.$get) throw Wr("pget", "Provider '{0}' must define $get factory method.", t);
                return x[t + g] = e
            }

            function a(t, e) {
                return function () {
                    var n = E.invoke(e, this);
                    if (v(n)) throw Wr("undef", "Provider '{0}' must return a value from $get factory method.", t);
                    return n
                }
            }

            function s(t, e, n) {
                return r(t, {$get: n !== !1 ? a(t, e) : e})
            }

            function l(t, e) {
                return s(t, ["$injector", function (t) {
                    return t.instantiate(e)
                }])
            }

            function c(t, e) {
                return s(t, m(e), !1)
            }

            function u(t, e) {
                ft(t, "constant"), x[t] = e, S[t] = e
            }

            function d(t, e) {
                var n = C.get(t + g), i = n.$get;
                n.$get = function () {
                    var t = E.invoke(i, n);
                    return E.invoke(e, null, {$delegate: t})
                }
            }

            function f(t) {
                ut(v(t) || ir(t), "modulesToLoad", "not an array");
                var e, n = [];
                return i(t, function (t) {
                    function i(t) {
                        var e, n;
                        for (e = 0, n = t.length; e < n; e++) {
                            var i = t[e], r = C.get(i[0]);
                            r[i[1]].apply(r, i[2])
                        }
                    }

                    if (!w.get(t)) {
                        w.put(t, !0);
                        try {
                            b(t) ? (e = Gi(t), n = n.concat(f(e.requires)).concat(e._runBlocks), i(e._invokeQueue), i(e._configBlocks)) : k(t) ? n.push(C.invoke(t)) : ir(t) ? n.push(C.invoke(t)) : dt(t, "module")
                        } catch (r) {
                            throw ir(t) && (t = t[t.length - 1]), r.message && r.stack && r.stack.indexOf(r.message) === -1 && (r = r.message + "\n" + r.stack), Wr("modulerr", "Failed to instantiate module {0} due to:\n{1}", t, r.stack || r.message || r)
                        }
                    }
                }), n
            }

            function h(t, n) {
                function i(e, i) {
                    if (t.hasOwnProperty(e)) {
                        if (t[e] === p) throw Wr("cdep", "Circular dependency found: {0}", e + " <- " + y.join(" <- "));
                        return t[e]
                    }
                    try {
                        return y.unshift(e), t[e] = p, t[e] = n(e, i), t[e]
                    } catch (r) {
                        throw t[e] === p && delete t[e], r
                    } finally {
                        y.shift()
                    }
                }

                function r(t, n, r) {
                    for (var o = [], a = re.$$annotate(t, e, r), s = 0, l = a.length; s < l; s++) {
                        var c = a[s];
                        if ("string" != typeof c) throw Wr("itkn", "Incorrect injection token! Expected service name as string, got {0}", c);
                        o.push(n && n.hasOwnProperty(c) ? n[c] : i(c, r))
                    }
                    return o
                }

                function o(t) {
                    return !(Vi <= 11) && ("function" == typeof t && /^(?:class\b|constructor\()/.test(te(t)))
                }

                function a(t, e, n, i) {
                    "string" == typeof n && (i = n, n = null);
                    var a = r(t, n, i);
                    return ir(t) && (t = t[t.length - 1]), o(t) ? (a.unshift(null), new (Function.prototype.bind.apply(t, a))) : t.apply(e, a)
                }

                function s(t, e, n) {
                    var i = ir(t) ? t[t.length - 1] : t, o = r(t, e, n);
                    return o.unshift(null), new (Function.prototype.bind.apply(i, o))
                }

                return {
                    invoke: a, instantiate: s, get: i, annotate: re.$$annotate, has: function (e) {
                        return x.hasOwnProperty(e + g) || t.hasOwnProperty(e)
                    }
                }
            }

            e = e === !0;
            var p = {}, g = "Provider", y = [], w = new Jt([], (!0)),
                x = {
                    $provide: {
                        provider: n(r),
                        factory: n(s),
                        service: n(l),
                        value: n(c),
                        constant: n(u),
                        decorator: d
                    }
                },
                C = x.$injector = h(x, function (t, e) {
                    throw tr.isString(e) && y.push(e), Wr("unpr", "Unknown provider: {0}", y.join(" <- "))
                }), S = {}, _ = h(S, function (t, e) {
                    var n = C.get(t + g, e);
                    return E.invoke(n.$get, n, void 0, t)
                }), E = _;
            x["$injector" + g] = {$get: m(_)};
            var T = f(t);
            return E = _.get("$injector"), E.strictDi = e, i(T, function (t) {
                t && E.invoke(t)
            }), E
        }

        function oe() {
            var t = !0;
            this.disableAutoScrolling = function () {
                t = !1
            }, this.$get = ["$window", "$location", "$rootScope", function (e, n, i) {
                function r(t) {
                    var e = null;
                    return Array.prototype.some.call(t, function (t) {
                        if ("a" === F(t)) return e = t, !0
                    }), e
                }

                function o() {
                    var t = s.yOffset;
                    if (k(t)) t = t(); else if (j(t)) {
                        var n = t[0], i = e.getComputedStyle(n);
                        t = "fixed" !== i.position ? 0 : n.getBoundingClientRect().bottom
                    } else x(t) || (t = 0);
                    return t
                }

                function a(t) {
                    if (t) {
                        t.scrollIntoView();
                        var n = o();
                        if (n) {
                            var i = t.getBoundingClientRect().top;
                            e.scrollBy(0, i - n)
                        }
                    } else e.scrollTo(0, 0)
                }

                function s(t) {
                    t = b(t) ? t : x(t) ? t.toString() : n.hash();
                    var e;
                    t ? (e = l.getElementById(t)) ? a(e) : (e = r(l.getElementsByName(t))) ? a(e) : "top" === t && a(null) : a(null)
                }

                var l = e.document;
                return t && i.$watch(function () {
                    return n.hash()
                }, function (t, e) {
                    t === e && "" === t || Wt(function () {
                        i.$evalAsync(s)
                    })
                }), s
            }]
        }

        function ae(t, e) {
            return t || e ? t ? e ? (ir(t) && (t = t.join(" ")), ir(e) && (e = e.join(" ")), t + " " + e) : t : e : ""
        }

        function se(t) {
            for (var e = 0; e < t.length; e++) {
                var n = t[e];
                if (n.nodeType === Gr) return n
            }
        }

        function le(t) {
            b(t) && (t = t.split(" "));
            var e = mt();
            return i(t, function (t) {
                t.length && (e[t] = !0)
            }), e
        }

        function ce(t) {
            return $(t) ? t : {}
        }

        function ue(t, e, n, r) {
            function o(t) {
                try {
                    t.apply(null, H(arguments, 1))
                } finally {
                    if (y--, 0 === y) for (; $.length;) try {
                        $.pop()()
                    } catch (e) {
                        n.error(e)
                    }
                }
            }

            function a(t) {
                var e = t.indexOf("#");
                return e === -1 ? "" : t.substr(e)
            }

            function s() {
                k = null, l(), c()
            }

            function l() {
                w = S(), w = v(w) ? null : w, z(w, T) && (w = T), T = w
            }

            function c() {
                x === u.url() && b === w || (x = u.url(), b = w, i(_, function (t) {
                    t(u.url(), w)
                }))
            }

            var u = this, d = t.location, f = t.history, p = t.setTimeout, m = t.clearTimeout, g = {};
            u.isMock = !1;
            var y = 0, $ = [];
            u.$$completeOutstandingRequest = o, u.$$incOutstandingRequestCount = function () {
                y++
            }, u.notifyWhenNoOutstandingRequests = function (t) {
                0 === y ? t() : $.push(t)
            };
            var w, b, x = d.href, C = e.find("base"), k = null, S = r.history ? function () {
                try {
                    return f.state
                } catch (t) {
                }
            } : h;
            l(), b = w, u.url = function (e, n, i) {
                if (v(i) && (i = null), d !== t.location && (d = t.location), f !== t.history && (f = t.history), e) {
                    var o = b === i;
                    if (x === e && (!r.history || o)) return u;
                    var s = x && Ve(x) === Ve(e);
                    return x = e, b = i, !r.history || s && o ? (s || (k = e), n ? d.replace(e) : s ? d.hash = a(e) : d.href = e, d.href !== e && (k = e)) : (f[n ? "replaceState" : "pushState"](i, "", e), l(), b = w), k && (k = e), u
                }
                return k || d.href.replace(/%27/g, "'")
            }, u.state = function () {
                return w
            };
            var _ = [], E = !1, T = null;
            u.onUrlChange = function (e) {
                return E || (r.history && Wi(t).on("popstate", s), Wi(t).on("hashchange", s), E = !0), _.push(e), e
            }, u.$$applicationDestroyed = function () {
                Wi(t).off("hashchange popstate", s)
            }, u.$$checkUrlChange = c, u.baseHref = function () {
                var t = C.attr("href");
                return t ? t.replace(/^(https?:)?\/\/[^\/]*/, "") : ""
            }, u.defer = function (t, e) {
                var n;
                return y++, n = p(function () {
                    delete g[n], o(t)
                }, e || 0), g[n] = !0, n
            }, u.defer.cancel = function (t) {
                return !!g[t] && (delete g[t], m(t), o(h), !0)
            }
        }

        function de() {
            this.$get = ["$window", "$log", "$sniffer", "$document", function (t, e, n, i) {
                return new ue(t, i, e, n)
            }]
        }

        function fe() {
            this.$get = function () {
                function t(t, i) {
                    function r(t) {
                        t !== f && (h ? h === t && (h = t.n) : h = t, o(t.n, t.p), o(t, f), f = t, f.n = null)
                    }

                    function o(t, e) {
                        t !== e && (t && (t.p = e), e && (e.n = t))
                    }

                    if (t in n) throw e("$cacheFactory")("iid", "CacheId '{0}' is already taken!", t);
                    var a = 0, s = c({}, i, {id: t}), l = mt(), u = i && i.capacity || Number.MAX_VALUE, d = mt(),
                        f = null,
                        h = null;
                    return n[t] = {
                        put: function (t, e) {
                            if (!v(e)) {
                                if (u < Number.MAX_VALUE) {
                                    var n = d[t] || (d[t] = {key: t});
                                    r(n)
                                }
                                return t in l || a++, l[t] = e, a > u && this.remove(h.key), e
                            }
                        }, get: function (t) {
                            if (u < Number.MAX_VALUE) {
                                var e = d[t];
                                if (!e) return;
                                r(e)
                            }
                            return l[t]
                        }, remove: function (t) {
                            if (u < Number.MAX_VALUE) {
                                var e = d[t];
                                if (!e) return;
                                e === f && (f = e.p), e === h && (h = e.n), o(e.n, e.p), delete d[t]
                            }
                            t in l && (delete l[t], a--)
                        }, removeAll: function () {
                            l = mt(), a = 0, d = mt(), f = h = null
                        }, destroy: function () {
                            l = null, s = null, d = null, delete n[t]
                        }, info: function () {
                            return c({}, s, {size: a})
                        }
                    }
                }

                var n = {};
                return t.info = function () {
                    var t = {};
                    return i(n, function (e, n) {
                        t[n] = e.info()
                    }), t
                }, t.get = function (t) {
                    return n[t]
                }, t
            }
        }

        function he() {
            this.$get = ["$cacheFactory", function (t) {
                return t("templates")
            }]
        }

        function pe() {
        }

        function me(e, n) {
            function r(t, e, n) {
                var r = /^\s*([@&<]|=(\*?))(\??)\s*(\w*)\s*$/, o = mt();
                return i(t, function (t, i) {
                    if (t in T) return void (o[i] = T[t]);
                    var a = t.match(r);
                    if (!a) throw eo("iscp", "Invalid {3} for directive '{0}'. Definition: {... {1}: '{2}' ...}", e, i, t, n ? "controller bindings definition" : "isolate scope definition");
                    o[i] = {
                        mode: a[1][0],
                        collection: "*" === a[2],
                        optional: "?" === a[3],
                        attrName: a[4] || i
                    }, a[4] && (T[t] = o[i])
                }), o
            }

            function a(t, e) {
                var n = {isolateScope: null, bindToController: null};
                if ($(t.scope) && (t.bindToController === !0 ? (n.bindToController = r(t.scope, e, !0), n.isolateScope = {}) : n.isolateScope = r(t.scope, e, !1)), $(t.bindToController) && (n.bindToController = r(t.bindToController, e, !0)), n.bindToController && !t.controller) throw eo("noctrl", "Cannot bind to controller without directive '{0}'s controller.", e);
                return n
            }

            function s(t) {
                var e = t.charAt(0);
                if (!e || e !== zi(e)) throw eo("baddir", "Directive/Component name '{0}' is invalid. The first character must be a lowercase letter", t);
                if (t !== t.trim()) throw eo("baddir", "Directive/Component name '{0}' is invalid. The name should not contain leading or trailing whitespaces", t)
            }

            function l(t) {
                var e = t.require || t.controller && t.name;
                return !ir(e) && $(e) && i(e, function (t, n) {
                    var i = t.match(S), r = t.substring(i[0].length);
                    r || (e[n] = i[0] + n)
                }), e
            }

            function u(t, e) {
                if (t && (!b(t) || !/[EACM]/.test(t))) throw eo("badrestrict", "Restrict property '{0}' of directive '{1}' is invalid", t, e);
                return t || "EA"
            }

            var d = {}, g = "Directive", w = /^\s*directive:\s*([\w-]+)\s+(.*)$/, x = /(([\w-]+)(?::([^;]+))?;?)/,
                C = N("ngSrc,ngSrcset,src,srcset"), S = /^(?:(\^\^?)?(\?)?(\^\^?)?)?/, _ = /^(on[a-z]+|formaction)$/,
                T = mt();
            this.directive = function j(t, n) {
                return ut(t, "name"), ft(t, "directive"), b(t) ? (s(t), ut(n, "directiveFactory"), d.hasOwnProperty(t) || (d[t] = [], e.factory(t + g, ["$injector", "$exceptionHandler", function (e, n) {
                    var r = [];
                    return i(d[t], function (i, o) {
                        try {
                            var a = e.invoke(i);
                            k(a) ? a = {compile: m(a)} : !a.compile && a.link && (a.compile = m(a.link)), a.priority = a.priority || 0, a.index = o, a.name = a.name || t, a.require = l(a), a.restrict = u(a.restrict, t), a.$$moduleName = i.$$moduleName, r.push(a)
                        } catch (s) {
                            n(s)
                        }
                    }), r
                }])), d[t].push(n)) : i(t, o(j)), this
            }, this.component = function (t, e) {
                function n(t) {
                    function n(e) {
                        return k(e) || ir(e) ? function (n, i) {
                            return t.invoke(e, this, {$element: n, $attrs: i})
                        } : e
                    }

                    var o = e.template || e.templateUrl ? e.template : "", a = {
                        controller: r,
                        controllerAs: we(e.controller) || e.controllerAs || "$ctrl",
                        template: n(o),
                        templateUrl: n(e.templateUrl),
                        transclude: e.transclude,
                        scope: {},
                        bindToController: e.bindings || {},
                        restrict: "E",
                        require: e.require
                    };
                    return i(e, function (t, e) {
                        "$" === e.charAt(0) && (a[e] = t)
                    }), a
                }

                var r = e.controller || function () {
                };
                return i(e, function (t, e) {
                    "$" === e.charAt(0) && (n[e] = t, k(r) && (r[e] = t))
                }), n.$inject = ["$injector"], this.directive(t, n)
            }, this.aHrefSanitizationWhitelist = function (t) {
                return y(t) ? (n.aHrefSanitizationWhitelist(t), this) : n.aHrefSanitizationWhitelist()
            }, this.imgSrcSanitizationWhitelist = function (t) {
                return y(t) ? (n.imgSrcSanitizationWhitelist(t), this) : n.imgSrcSanitizationWhitelist()
            };
            var A = !0;
            this.debugInfoEnabled = function (t) {
                return y(t) ? (A = t, this) : A
            };
            var O = !0;
            this.preAssignBindingsEnabled = function (t) {
                return y(t) ? (O = t, this) : O
            };
            var P = 10;
            this.onChangesTtl = function (t) {
                return arguments.length ? (P = t, this) : P
            };
            var M = !0;
            this.commentDirectivesEnabled = function (t) {
                return arguments.length ? (M = t, this) : M
            };
            var L = !0;
            this.cssClassDirectivesEnabled = function (t) {
                return arguments.length ? (L = t, this) : L
            }, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$templateRequest", "$parse", "$controller", "$rootScope", "$sce", "$animate", "$$sanitizeUri", function (e, n, r, o, s, l, u, m, T, j) {
                function N() {
                    try {
                        if (!--Tt) throw xt = void 0, eo("infchng", "{0} $onChanges() iterations reached. Aborting!\n", P);
                        u.$apply(function () {
                            for (var t = [], e = 0, n = xt.length; e < n; ++e) try {
                                xt[e]()
                            } catch (i) {
                                t.push(i)
                            }
                            if (xt = void 0, t.length) throw t
                        })
                    } finally {
                        Tt++
                    }
                }

                function R(t, e) {
                    if (e) {
                        var n, i, r, o = Object.keys(e);
                        for (n = 0, i = o.length; n < i; n++) r = o[n], this[r] = e[r]
                    } else this.$attr = {};
                    this.$$element = t
                }

                function q(t, e, n) {
                    St.innerHTML = "<span " + e + ">";
                    var i = St.firstChild.attributes, r = i[0];
                    i.removeNamedItem(r.name), r.value = n, t.attributes.setNamedItem(r)
                }

                function V(t, e) {
                    try {
                        t.addClass(e)
                    } catch (n) {
                    }
                }

                function W(e, n, i, r, o) {
                    e instanceof Wi || (e = Wi(e));
                    for (var a = /\S+/, s = 0, l = e.length; s < l; s++) {
                        var c = e[s];
                        c.nodeType === gr && c.nodeValue.match(a) && At(c, e[s] = t.document.createElement("span"))
                    }
                    var u = G(e, n, e, i, r, o);
                    W.$$addScopeClass(e);
                    var d = null;
                    return function (t, n, i) {
                        ut(t, "scope"), o && o.needsNewScope && (t = t.$parent.$new()), i = i || {};
                        var r = i.parentBoundTranscludeFn, a = i.transcludeControllers, s = i.futureParentElement;
                        r && r.$$boundTransclude && (r = r.$$boundTransclude), d || (d = U(s));
                        var l;
                        if (l = "html" !== d ? Wi(pt(d, Wi("<div>").append(e).html())) : n ? jr.clone.call(e) : e, a) for (var c in a) l.data("$" + c + "Controller", a[c].instance);
                        return W.$$addScopeInfo(l, t), n && n(l, t), u && u(t, l, l, r), l
                    }
                }

                function U(t) {
                    var e = t && t[0];
                    return e && "foreignobject" !== F(e) && Xi.call(e).match(/SVG/) ? "svg" : "html"
                }

                function G(t, e, n, i, r, o) {
                    function a(t, n, i, r) {
                        var o, a, s, l, c, u, d, f, m;
                        if (h) {
                            var g = n.length;
                            for (m = new Array(g), c = 0; c < p.length; c += 3) d = p[c], m[d] = n[d]
                        } else m = n;
                        for (c = 0, u = p.length; c < u;) s = m[p[c++]], o = p[c++], a = p[c++], o ? (o.scope ? (l = t.$new(), W.$$addScopeInfo(Wi(s), l)) : l = t, f = o.transcludeOnThisElement ? Y(t, o.transclude, r) : !o.templateOnThisElement && r ? r : !r && e ? Y(t, e) : null, o(a, l, s, i, f)) : a && a(t, s.childNodes, void 0, r)
                    }

                    for (var s, l, c, u, d, f, h, p = [], m = 0; m < t.length; m++) s = new R, l = Q(t[m], [], s, 0 === m ? i : void 0, r), c = l.length ? et(l, t[m], s, e, n, null, [], [], o) : null, c && c.scope && W.$$addScopeClass(s.$$element), d = c && c.terminal || !(u = t[m].childNodes) || !u.length ? null : G(u, c ? (c.transcludeOnThisElement || !c.templateOnThisElement) && c.transclude : e), (c || d) && (p.push(m, c, d), f = !0, h = h || c), o = null;
                    return f ? a : null
                }

                function Y(t, e, n) {
                    function i(i, r, o, a, s) {
                        return i || (i = t.$new(!1, s), i.$$transcluded = !0), e(i, r, {
                            parentBoundTranscludeFn: n,
                            transcludeControllers: o,
                            futureParentElement: a
                        })
                    }

                    var r = i.$$slots = mt();
                    for (var o in e.$$slots) e.$$slots[o] ? r[o] = Y(t, e.$$slots[o], n) : r[o] = null;
                    return i
                }

                function Q(t, e, n, i, r) {
                    var o, a, s, l = t.nodeType, c = n.$attr;
                    switch (l) {
                        case pr:
                            a = F(t), ot(e, ve(a), "E", i, r);
                            for (var u, d, f, h, p, m, g = t.attributes, v = 0, y = g && g.length; v < y; v++) {
                                var w = !1, C = !1;
                                u = g[v], d = u.name, p = or(u.value), h = ve(d), m = Lt.test(h), m && (d = d.replace(io, "").substr(8).replace(/_(.)/g, function (t, e) {
                                    return e.toUpperCase()
                                }));
                                var k = h.match(jt);
                                k && at(k[1]) && (w = d, C = d.substr(0, d.length - 5) + "end", d = d.substr(0, d.length - 6)), f = ve(d.toLowerCase()),
                                    c[f] = d, !m && n.hasOwnProperty(f) || (n[f] = p, Ut(t, f) && (n[f] = !0)), vt(t, e, p, f, m), ot(e, f, "A", i, r, w, C)
                            }
                            if ("input" === a && "hidden" === t.getAttribute("type") && t.setAttribute("autocomplete", "off"), !Et) break;
                            if (s = t.className, $(s) && (s = s.animVal), b(s) && "" !== s) for (; o = x.exec(s);) f = ve(o[2]), ot(e, f, "C", i, r) && (n[f] = or(o[3])), s = s.substr(o.index + o[0].length);
                            break;
                        case gr:
                            if (11 === Vi) for (; t.parentNode && t.nextSibling && t.nextSibling.nodeType === gr;) t.nodeValue = t.nodeValue + t.nextSibling.nodeValue, t.parentNode.removeChild(t.nextSibling);
                            ht(e, t.nodeValue);
                            break;
                        case vr:
                            if (!_t) break;
                            X(t, e, n, i, r)
                    }
                    return e.sort(dt), e
                }

                function X(t, e, n, i, r) {
                    try {
                        var o = w.exec(t.nodeValue);
                        if (o) {
                            var a = ve(o[1]);
                            ot(e, a, "M", i, r) && (n[a] = or(o[2]))
                        }
                    } catch (s) {
                    }
                }

                function Z(t, e, n) {
                    var i = [], r = 0;
                    if (e && t.hasAttribute && t.hasAttribute(e)) {
                        do {
                            if (!t) throw eo("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", e, n);
                            t.nodeType === pr && (t.hasAttribute(e) && r++, t.hasAttribute(n) && r--), i.push(t), t = t.nextSibling
                        } while (r > 0)
                    } else i.push(t);
                    return Wi(i)
                }

                function J(t, e, n) {
                    return function (i, r, o, a, s) {
                        return r = Z(r[0], e, n), t(i, r, o, a, s)
                    }
                }

                function tt(t, e, n, i, r, o) {
                    var a;
                    return t ? W(e, n, i, r, o) : function () {
                        return a || (a = W(e, n, i, r, o), e = n = o = null), a.apply(this, arguments)
                    }
                }

                function et(t, e, n, o, a, s, l, u, d) {
                    function f(t, e, n, i) {
                        t && (n && (t = J(t, n, i)), t.require = p.require, t.directiveName = m, (S === p || p.$$isolateScope) && (t = $t(t, {isolateScope: !0})), l.push(t)), e && (n && (e = J(e, n, i)), e.require = p.require, e.directiveName = m, (S === p || p.$$isolateScope) && (e = $t(e, {isolateScope: !0})), u.push(e))
                    }

                    function h(t, o, a, s, d) {
                        function f(t, e, n, i) {
                            var r;
                            if (E(t) || (i = n, n = e, e = t, t = void 0), P && (r = w), n || (n = P ? T.parent() : T), !i) return d(t, e, r, n, I);
                            var o = d.$$slots[i];
                            if (o) return o(t, e, r, n, I);
                            if (v(o)) throw eo("noslot", 'No parent directive that requires a transclusion with slot name "{0}". Element: {1}', i, K(T))
                        }

                        var h, p, m, g, y, w, b, T, A, D;
                        e === a ? (A = n, T = n.$$element) : (T = Wi(a), A = new R(T, n)), y = o, S ? g = o.$new(!0) : x && (y = o.$parent), d && (b = f, b.$$boundTransclude = d, b.isSlotFilled = function (t) {
                            return !!d.$$slots[t]
                        }), C && (w = it(T, A, b, C, g, o, S)), S && (W.$$addScopeInfo(T, g, !0, !(_ && (_ === S || _ === S.$$originalDirective))), W.$$addScopeClass(T, !0), g.$$isolateBindings = S.$$isolateBindings, D = bt(o, A, g, g.$$isolateBindings, S), D.removeWatches && g.$on("$destroy", D.removeWatches));
                        for (var M in w) {
                            var L = C[M], j = w[M], N = L.$$bindings.bindToController;
                            if (O) {
                                N ? j.bindingInfo = bt(y, A, j.instance, N, L) : j.bindingInfo = {};
                                var F = j();
                                F !== j.instance && (j.instance = F, T.data("$" + L.name + "Controller", F), j.bindingInfo.removeWatches && j.bindingInfo.removeWatches(), j.bindingInfo = bt(y, A, j.instance, N, L))
                            } else j.instance = j(), T.data("$" + L.name + "Controller", j.instance), j.bindingInfo = bt(y, A, j.instance, N, L)
                        }
                        for (i(C, function (t, e) {
                            var n = t.require;
                            t.bindToController && !ir(n) && $(n) && c(w[e].instance, nt(e, n, T, w))
                        }), i(w, function (t) {
                            var e = t.instance;
                            if (k(e.$onChanges)) try {
                                e.$onChanges(t.bindingInfo.initialChanges)
                            } catch (n) {
                                r(n)
                            }
                            if (k(e.$onInit)) try {
                                e.$onInit()
                            } catch (n) {
                                r(n)
                            }
                            k(e.$doCheck) && (y.$watch(function () {
                                e.$doCheck()
                            }), e.$doCheck()), k(e.$onDestroy) && y.$on("$destroy", function () {
                                e.$onDestroy()
                            })
                        }), h = 0, p = l.length; h < p; h++) m = l[h], wt(m, m.isolateScope ? g : o, T, A, m.require && nt(m.directiveName, m.require, T, w), b);
                        var I = o;
                        for (S && (S.template || null === S.templateUrl) && (I = g), t && t(I, a.childNodes, void 0, d), h = u.length - 1; h >= 0; h--) m = u[h], wt(m, m.isolateScope ? g : o, T, A, m.require && nt(m.directiveName, m.require, T, w), b);
                        i(w, function (t) {
                            var e = t.instance;
                            k(e.$postLink) && e.$postLink()
                        })
                    }

                    d = d || {};
                    for (var p, m, g, y, w, b = -Number.MAX_VALUE, x = d.newScopeDirective, C = d.controllerDirectives, S = d.newIsolateScopeDirective, _ = d.templateDirective, T = d.nonTlbTranscludeDirective, A = !1, D = !1, P = d.hasElementTranscludeDirective, M = n.$$element = Wi(e), L = s, j = o, N = !1, I = !1, z = 0, q = t.length; z < q; z++) {
                        p = t[z];
                        var V = p.$$start, U = p.$$end;
                        if (V && (M = Z(e, V, U)), g = void 0, b > p.priority) break;
                        if (w = p.scope, w && (p.templateUrl || ($(w) ? (ft("new/isolated scope", S || x, p, M), S = p) : ft("new/isolated scope", S, p, M)), x = x || p), m = p.name, !N && (p.replace && (p.templateUrl || p.template) || p.transclude && !p.$$tlb)) {
                            for (var G, Y = z + 1; G = t[Y++];) if (G.transclude && !G.$$tlb || G.replace && (G.templateUrl || G.template)) {
                                I = !0;
                                break
                            }
                            N = !0
                        }
                        if (!p.templateUrl && p.controller && (C = C || mt(), ft("'" + m + "' controller", C[m], p, M), C[m] = p), w = p.transclude) if (A = !0, p.$$tlb || (ft("transclusion", T, p, M), T = p), "element" === w) P = !0, b = p.priority, g = M, M = n.$$element = Wi(W.$$createComment(m, n[m])), e = M[0], yt(a, H(g), e), g[0].$$parentNode = g[0].parentNode, j = tt(I, g, o, b, L && L.name, {nonTlbTranscludeDirective: T}); else {
                            var X = mt();
                            if (g = Wi(Dt(e)).contents(), $(w)) {
                                g = [];
                                var et = mt(), ot = mt();
                                i(w, function (t, e) {
                                    var n = "?" === t.charAt(0);
                                    t = n ? t.substring(1) : t, et[t] = e, X[e] = null, ot[e] = n
                                }), i(M.contents(), function (t) {
                                    var e = et[ve(F(t))];
                                    e ? (ot[e] = !0, X[e] = X[e] || [], X[e].push(t)) : g.push(t)
                                }), i(ot, function (t, e) {
                                    if (!t) throw eo("reqslot", "Required transclusion slot `{0}` was not filled.", e)
                                });
                                for (var at in X) X[at] && (X[at] = tt(I, X[at], o))
                            }
                            M.empty(), j = tt(I, g, o, void 0, void 0, {needsNewScope: p.$$isolateScope || p.$$newScope}), j.$$slots = X
                        }
                        if (p.template) if (D = !0, ft("template", _, p, M), _ = p, w = k(p.template) ? p.template(M, n) : p.template, w = Mt(w), p.replace) {
                            if (L = p, g = Ct(w) ? [] : $e(pt(p.templateNamespace, or(w))), e = g[0], 1 !== g.length || e.nodeType !== pr) throw eo("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", m, "");
                            yt(a, M, e);
                            var lt = {$attr: {}}, ut = Q(e, [], lt), dt = t.splice(z + 1, t.length - (z + 1));
                            (S || x) && rt(ut, S, x), t = t.concat(ut).concat(dt), st(n, lt), q = t.length
                        } else M.html(w);
                        if (p.templateUrl) D = !0, ft("template", _, p, M), _ = p, p.replace && (L = p), h = ct(t.splice(z, t.length - z), M, n, a, A && j, l, u, {
                            controllerDirectives: C,
                            newScopeDirective: x !== p && x,
                            newIsolateScopeDirective: S,
                            templateDirective: _,
                            nonTlbTranscludeDirective: T
                        }), q = t.length; else if (p.compile) try {
                            y = p.compile(M, n, j);
                            var ht = p.$$originalDirective || p;
                            k(y) ? f(null, B(ht, y), V, U) : y && f(B(ht, y.pre), B(ht, y.post), V, U)
                        } catch (gt) {
                            r(gt, K(M))
                        }
                        p.terminal && (h.terminal = !0, b = Math.max(b, p.priority))
                    }
                    return h.scope = x && x.scope === !0, h.transcludeOnThisElement = A, h.templateOnThisElement = D, h.transclude = j, d.hasElementTranscludeDirective = P, h
                }

                function nt(t, e, n, r) {
                    var o;
                    if (b(e)) {
                        var a = e.match(S), s = e.substring(a[0].length), l = a[1] || a[3], c = "?" === a[2];
                        if ("^^" === l ? n = n.parent() : (o = r && r[s], o = o && o.instance), !o) {
                            var u = "$" + s + "Controller";
                            o = l ? n.inheritedData(u) : n.data(u)
                        }
                        if (!o && !c) throw eo("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", s, t)
                    } else if (ir(e)) {
                        o = [];
                        for (var d = 0, f = e.length; d < f; d++) o[d] = nt(t, e[d], n, r)
                    } else $(e) && (o = {}, i(e, function (e, i) {
                        o[i] = nt(t, e, n, r)
                    }));
                    return o || null
                }

                function it(t, e, n, i, r, o, a) {
                    var s = mt();
                    for (var c in i) {
                        var u = i[c],
                            d = {$scope: u === a || u.$$isolateScope ? r : o, $element: t, $attrs: e, $transclude: n},
                            f = u.controller;
                        "@" === f && (f = e[u.name]);
                        var h = l(f, d, !0, u.controllerAs);
                        s[u.name] = h, t.data("$" + u.name + "Controller", h.instance)
                    }
                    return s
                }

                function rt(t, e, n) {
                    for (var i = 0, r = t.length; i < r; i++) t[i] = f(t[i], {$$isolateScope: e, $$newScope: n})
                }

                function ot(t, n, i, r, o, s, l) {
                    if (n === o) return null;
                    var c = null;
                    if (d.hasOwnProperty(n)) for (var u, h = e.get(n + g), p = 0, m = h.length; p < m; p++) if (u = h[p], (v(r) || r > u.priority) && u.restrict.indexOf(i) !== -1) {
                        if (s && (u = f(u, {$$start: s, $$end: l})), !u.$$bindings) {
                            var y = u.$$bindings = a(u, u.name);
                            $(y.isolateScope) && (u.$$isolateBindings = y.isolateScope)
                        }
                        t.push(u), c = u
                    }
                    return c
                }

                function at(t) {
                    if (d.hasOwnProperty(t)) for (var n, i = e.get(t + g), r = 0, o = i.length; r < o; r++) if (n = i[r], n.multiElement) return !0;
                    return !1
                }

                function st(t, e) {
                    var n = e.$attr, r = t.$attr;
                    i(t, function (i, r) {
                        "$" !== r.charAt(0) && (e[r] && e[r] !== i && (i += ("style" === r ? ";" : " ") + e[r]), t.$set(r, i, !0, n[r]))
                    }), i(e, function (e, i) {
                        t.hasOwnProperty(i) || "$" === i.charAt(0) || (t[i] = e, "class" !== i && "style" !== i && (r[i] = n[i]))
                    })
                }

                function ct(t, e, n, r, a, s, l, c) {
                    var u, d, h = [], p = e[0], m = t.shift(),
                        g = f(m, {templateUrl: null, transclude: null, replace: null, $$originalDirective: m}),
                        v = k(m.templateUrl) ? m.templateUrl(e, n) : m.templateUrl, y = m.templateNamespace;
                    return e.empty(), o(v).then(function (o) {
                        var f, w, b, x;
                        if (o = Mt(o), m.replace) {
                            if (b = Ct(o) ? [] : $e(pt(y, or(o))), f = b[0], 1 !== b.length || f.nodeType !== pr) throw eo("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", m.name, v);
                            w = {$attr: {}}, yt(r, e, f);
                            var C = Q(f, [], w);
                            $(m.scope) && rt(C, !0), t = C.concat(t), st(n, w)
                        } else f = p, e.html(o);
                        for (t.unshift(g), u = et(t, f, n, a, e, m, s, l, c), i(r, function (t, n) {
                            t === f && (r[n] = e[0])
                        }), d = G(e[0].childNodes, a); h.length;) {
                            var k = h.shift(), S = h.shift(), _ = h.shift(), E = h.shift(), T = e[0];
                            if (!k.$$destroyed) {
                                if (S !== p) {
                                    var A = S.className;
                                    c.hasElementTranscludeDirective && m.replace || (T = Dt(f)), yt(_, Wi(S), T), V(Wi(T), A)
                                }
                                x = u.transcludeOnThisElement ? Y(k, u.transclude, E) : E, u(d, k, T, r, x)
                            }
                        }
                        h = null
                    }), function (t, e, n, i, r) {
                        var o = r;
                        e.$$destroyed || (h ? h.push(e, n, i, o) : (u.transcludeOnThisElement && (o = Y(e, u.transclude, r)), u(d, e, n, i, o)))
                    }
                }

                function dt(t, e) {
                    var n = e.priority - t.priority;
                    return 0 !== n ? n : t.name !== e.name ? t.name < e.name ? -1 : 1 : t.index - e.index
                }

                function ft(t, e, n, i) {
                    function r(t) {
                        return t ? " (module: " + t + ")" : ""
                    }

                    if (e) throw eo("multidir", "Multiple directives [{0}{1}, {2}{3}] asking for {4} on: {5}", e.name, r(e.$$moduleName), n.name, r(n.$$moduleName), t, K(i))
                }

                function ht(t, e) {
                    var i = n(e, !0);
                    i && t.push({
                        priority: 0, compile: function (t) {
                            var e = t.parent(), n = !!e.length;
                            return n && W.$$addBindingClass(e), function (t, e) {
                                var r = e.parent();
                                n || W.$$addBindingClass(r), W.$$addBindingInfo(r, i.expressions), t.$watch(i, function (t) {
                                    e[0].nodeValue = t
                                })
                            }
                        }
                    })
                }

                function pt(e, n) {
                    switch (e = zi(e || "html")) {
                        case"svg":
                        case"math":
                            var i = t.document.createElement("div");
                            return i.innerHTML = "<" + e + ">" + n + "</" + e + ">", i.childNodes[0].childNodes;
                        default:
                            return n
                    }
                }

                function gt(t, e) {
                    if ("srcdoc" === e) return m.HTML;
                    var n = F(t);
                    if ("src" === e || "ngSrc" === e) {
                        if (["img", "video", "audio", "source", "track"].indexOf(n) === -1) return m.RESOURCE_URL
                    } else if ("xlinkHref" === e || "form" === n && "action" === e) return m.RESOURCE_URL
                }

                function vt(t, e, i, r, o) {
                    var a = gt(t, r), s = !o, l = C[r] || o, c = n(i, s, a, l);
                    if (c) {
                        if ("multiple" === r && "select" === F(t)) throw eo("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", K(t));
                        e.push({
                            priority: 100, compile: function () {
                                return {
                                    pre: function (t, e, o) {
                                        var s = o.$$observers || (o.$$observers = mt());
                                        if (_.test(r)) throw eo("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
                                        var u = o[r];
                                        u !== i && (c = u && n(u, !0, a, l), i = u), c && (o[r] = c(t), (s[r] || (s[r] = [])).$$inter = !0, (o.$$observers && o.$$observers[r].$$scope || t).$watch(c, function (t, e) {
                                            "class" === r && t !== e ? o.$updateClass(t, e) : o.$set(r, t)
                                        }))
                                    }
                                }
                            }
                        })
                    }
                }

                function yt(e, n, i) {
                    var r, o, a = n[0], s = n.length, l = a.parentNode;
                    if (e) for (r = 0, o = e.length; r < o; r++) if (e[r] === a) {
                        e[r++] = i;
                        for (var c = r, u = c + s - 1, d = e.length; c < d; c++, u++) u < d ? e[c] = e[u] : delete e[c];
                        e.length -= s - 1, e.context === a && (e.context = i);
                        break
                    }
                    l && l.replaceChild(i, a);
                    var f = t.document.createDocumentFragment();
                    for (r = 0; r < s; r++) f.appendChild(n[r]);
                    for (Wi.hasData(a) && (Wi.data(i, Wi.data(a)), Wi(a).off("$destroy")), Wi.cleanData(f.querySelectorAll("*")), r = 1; r < s; r++) delete n[r];
                    n[0] = i, n.length = 1
                }

                function $t(t, e) {
                    return c(function () {
                        return t.apply(null, arguments)
                    }, t, e)
                }

                function wt(t, e, n, i, o, a) {
                    try {
                        t(e, n, i, o, a)
                    } catch (s) {
                        r(s, K(n))
                    }
                }

                function bt(t, e, r, o, a) {
                    function l(e, n, i) {
                        !k(r.$onChanges) || n === i || n !== n && i !== i || (xt || (t.$$postDigest(N), xt = []), u || (u = {}, xt.push(c)), u[e] && (i = u[e].previousValue), u[e] = new ge(i, n))
                    }

                    function c() {
                        r.$onChanges(u), u = void 0
                    }

                    var u, d = [], f = {};
                    return i(o, function (i, o) {
                        var c, u, p, m, g, v = i.attrName, y = i.optional, $ = i.mode;
                        switch ($) {
                            case"@":
                                y || Ri.call(e, v) || (r[o] = e[v] = void 0), g = e.$observe(v, function (t) {
                                    if (b(t) || D(t)) {
                                        var e = r[o];
                                        l(o, t, e), r[o] = t
                                    }
                                }), e.$$observers[v].$$scope = t, c = e[v], b(c) ? r[o] = n(c)(t) : D(c) && (r[o] = c), f[o] = new ge(no, r[o]), d.push(g);
                                break;
                            case"=":
                                if (!Ri.call(e, v)) {
                                    if (y) break;
                                    e[v] = void 0
                                }
                                if (y && !e[v]) break;
                                u = s(e[v]), m = u.literal ? z : function (t, e) {
                                    return t === e || t !== t && e !== e
                                }, p = u.assign || function () {
                                    throw c = r[o] = u(t), eo("nonassign", "Expression '{0}' in attribute '{1}' used with directive '{2}' is non-assignable!", e[v], v, a.name)
                                }, c = r[o] = u(t);
                                var w = function (e) {
                                    return m(e, r[o]) || (m(e, c) ? p(t, e = r[o]) : r[o] = e), c = e
                                };
                                w.$stateful = !0, g = i.collection ? t.$watchCollection(e[v], w) : t.$watch(s(e[v], w), null, u.literal), d.push(g);
                                break;
                            case"<":
                                if (!Ri.call(e, v)) {
                                    if (y) break;
                                    e[v] = void 0
                                }
                                if (y && !e[v]) break;
                                u = s(e[v]);
                                var x = u.literal, C = r[o] = u(t);
                                f[o] = new ge(no, r[o]), g = t.$watch(u, function (t, e) {
                                    if (e === t) {
                                        if (e === C || x && z(e, C)) return;
                                        e = C
                                    }
                                    l(o, t, e), r[o] = t
                                }, x), d.push(g);
                                break;
                            case"&":
                                if (u = e.hasOwnProperty(v) ? s(e[v]) : h, u === h && y) break;
                                r[o] = function (e) {
                                    return u(t, e)
                                }
                        }
                    }), {
                        initialChanges: f, removeWatches: d.length && function () {
                            for (var t = 0, e = d.length; t < e; ++t) d[t]()
                        }
                    }
                }

                var xt, kt = /^\w/, St = t.document.createElement("div"), _t = M, Et = L, Tt = P;
                R.prototype = {
                    $normalize: ve, $addClass: function (t) {
                        t && t.length > 0 && T.addClass(this.$$element, t)
                    }, $removeClass: function (t) {
                        t && t.length > 0 && T.removeClass(this.$$element, t)
                    }, $updateClass: function (t, e) {
                        var n = ye(t, e);
                        n && n.length && T.addClass(this.$$element, n);
                        var i = ye(e, t);
                        i && i.length && T.removeClass(this.$$element, i)
                    }, $set: function (t, e, n, o) {
                        var a, s = this.$$element[0], l = Ut(s, t), c = Gt(t), u = t;
                        if (l ? (this.$$element.prop(t, e), o = l) : c && (this[c] = e, u = c), this[t] = e, o ? this.$attr[t] = o : (o = this.$attr[t], o || (this.$attr[t] = o = lt(t, "-"))), a = F(this.$$element), "a" === a && ("href" === t || "xlinkHref" === t) || "img" === a && "src" === t) this[t] = e = j(e, "src" === t); else if ("img" === a && "srcset" === t && y(e)) {
                            for (var d = "", f = or(e), h = /(\s+\d+x\s*,|\s+\d+w\s*,|\s+,|,\s+)/, p = /\s/.test(f) ? h : /(,)/, m = f.split(p), g = Math.floor(m.length / 2), $ = 0; $ < g; $++) {
                                var w = 2 * $;
                                d += j(or(m[w]), !0), d += " " + or(m[w + 1])
                            }
                            var b = or(m[2 * $]).split(/\s/);
                            d += j(or(b[0]), !0), 2 === b.length && (d += " " + or(b[1])), this[t] = e = d
                        }
                        n !== !1 && (null === e || v(e) ? this.$$element.removeAttr(o) : kt.test(o) ? this.$$element.attr(o, e) : q(this.$$element[0], o, e));
                        var x = this.$$observers;
                        x && i(x[u], function (t) {
                            try {
                                t(e)
                            } catch (n) {
                                r(n)
                            }
                        })
                    }, $observe: function (t, e) {
                        var n = this, i = n.$$observers || (n.$$observers = mt()), r = i[t] || (i[t] = []);
                        return r.push(e), u.$evalAsync(function () {
                            r.$$inter || !n.hasOwnProperty(t) || v(n[t]) || e(n[t])
                        }), function () {
                            I(r, e)
                        }
                    }
                };
                var Ot = n.startSymbol(), Pt = n.endSymbol(), Mt = "{{" === Ot && "}}" === Pt ? p : function (t) {
                    return t.replace(/\{\{/g, Ot).replace(/}}/g, Pt)
                }, Lt = /^ngAttr[A-Z]/, jt = /^(.+)Start$/;
                return W.$$addBindingInfo = A ? function (t, e) {
                    var n = t.data("$binding") || [];
                    ir(e) ? n = n.concat(e) : n.push(e), t.data("$binding", n)
                } : h, W.$$addBindingClass = A ? function (t) {
                    V(t, "ng-binding")
                } : h, W.$$addScopeInfo = A ? function (t, e, n, i) {
                    var r = n ? i ? "$isolateScopeNoTemplate" : "$isolateScope" : "$scope";
                    t.data(r, e)
                } : h, W.$$addScopeClass = A ? function (t, e) {
                    V(t, e ? "ng-isolate-scope" : "ng-scope")
                } : h, W.$$createComment = function (e, n) {
                    var i = "";
                    return A && (i = " " + (e || "") + ": ", n && (i += n + " ")), t.document.createComment(i)
                }, W
            }]
        }

        function ge(t, e) {
            this.previousValue = t, this.currentValue = e
        }

        function ve(t) {
            return xt(t.replace(io, ""))
        }

        function ye(t, e) {
            var n = "", i = t.split(/\s+/), r = e.split(/\s+/);
            t:for (var o = 0; o < i.length; o++) {
                for (var a = i[o], s = 0; s < r.length; s++) if (a === r[s]) continue t;
                n += (n.length > 0 ? " " : "") + a
            }
            return n
        }

        function $e(t) {
            t = Wi(t);
            var e = t.length;
            if (e <= 1) return t;
            for (; e--;) {
                var n = t[e];
                (n.nodeType === vr || n.nodeType === gr && "" === n.nodeValue.trim()) && Qi.call(t, e, 1)
            }
            return t
        }

        function we(t, e) {
            if (e && b(e)) return e;
            if (b(t)) {
                var n = oo.exec(t);
                if (n) return n[3]
            }
        }

        function be() {
            var t = {}, n = !1;
            this.has = function (e) {
                return t.hasOwnProperty(e)
            }, this.register = function (e, n) {
                ft(e, "controller"), $(e) ? c(t, e) : t[e] = n
            }, this.allowGlobals = function () {
                n = !0
            }, this.$get = ["$injector", "$window", function (i, r) {
                function o(t, n, i, r) {
                    if (!t || !$(t.$scope)) throw e("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", r, n);
                    t.$scope[n] = i
                }

                return function (e, a, s, l) {
                    var u, d, f, h;
                    if (s = s === !0, l && b(l) && (h = l), b(e)) {
                        if (d = e.match(oo), !d) throw ro("ctrlfmt", "Badly formed controller string '{0}'. Must match `__name__ as __id__` or `__name__`.", e);
                        if (f = d[1], h = h || d[3], e = t.hasOwnProperty(f) ? t[f] : ht(a.$scope, f, !0) || (n ? ht(r, f, !0) : void 0), !e) throw ro("ctrlreg", "The controller with the name '{0}' is not registered.", f);
                        dt(e, f, !0)
                    }
                    if (s) {
                        var p = (ir(e) ? e[e.length - 1] : e).prototype;
                        return u = Object.create(p || null), h && o(a, h, u, f || e.name), c(function () {
                            var t = i.invoke(e, u, a, f);
                            return t !== u && ($(t) || k(t)) && (u = t, h && o(a, h, u, f || e.name)), u
                        }, {instance: u, identifier: h})
                    }
                    return u = i.instantiate(e, a, f), h && o(a, h, u, f || e.name), u
                }
            }]
        }

        function xe() {
            this.$get = ["$window", function (t) {
                return Wi(t.document)
            }]
        }

        function Ce() {
            this.$get = ["$log", function (t) {
                return function (e, n) {
                    t.error.apply(t, arguments)
                }
            }]
        }

        function ke(t) {
            return $(t) ? C(t) ? t.toISOString() : W(t) : t
        }

        function Se() {
            this.$get = function () {
                return function (t) {
                    if (!t) return "";
                    var e = [];
                    return r(t, function (t, n) {
                        null === t || v(t) || (ir(t) ? i(t, function (t) {
                            e.push(et(n) + "=" + et(ke(t)))
                        }) : e.push(et(n) + "=" + et(ke(t))))
                    }), e.join("&")
                }
            }
        }

        function _e() {
            this.$get = function () {
                return function (t) {
                    function e(t, o, a) {
                        null === t || v(t) || (ir(t) ? i(t, function (t, n) {
                            e(t, o + "[" + ($(t) ? n : "") + "]")
                        }) : $(t) && !C(t) ? r(t, function (t, n) {
                            e(t, o + (a ? "" : "[") + n + (a ? "" : "]"))
                        }) : n.push(et(o) + "=" + et(ke(t))))
                    }

                    if (!t) return "";
                    var n = [];
                    return e(t, "", !0), n.join("&")
                }
            }
        }

        function Ee(t, e) {
            if (b(t)) {
                var n = t.replace(fo, "").trim();
                if (n) {
                    var i = e("Content-Type");
                    (i && 0 === i.indexOf(so) || Te(n)) && (t = U(n))
                }
            }
            return t
        }

        function Te(t) {
            var e = t.match(co);
            return e && uo[e[0]].test(t)
        }

        function Ae(t) {
            function e(t, e) {
                t && (r[t] = r[t] ? r[t] + ", " + e : e)
            }

            var n, r = mt();
            return b(t) ? i(t.split("\n"), function (t) {
                n = t.indexOf(":"), e(zi(or(t.substr(0, n))), or(t.substr(n + 1)))
            }) : $(t) && i(t, function (t, n) {
                e(zi(n), or(t))
            }), r
        }

        function Oe(t) {
            var e;
            return function (n) {
                if (e || (e = Ae(t)), n) {
                    var i = e[zi(n)];
                    return void 0 === i && (i = null), i
                }
                return e
            }
        }

        function De(t, e, n, r) {
            return k(r) ? r(t, e, n) : (i(r, function (i) {
                t = i(t, e, n)
            }), t)
        }

        function Pe(t) {
            return 200 <= t && t < 300
        }

        function Me() {
            var t = this.defaults = {
                transformResponse: [Ee],
                transformRequest: [function (t) {
                    return !$(t) || T(t) || O(t) || A(t) ? t : W(t)
                }],
                headers: {
                    common: {Accept: "application/json, text/plain, */*"},
                    post: vt(lo),
                    put: vt(lo),
                    patch: vt(lo)
                },
                xsrfCookieName: "XSRF-TOKEN",
                xsrfHeaderName: "X-XSRF-TOKEN",
                paramSerializer: "$httpParamSerializer"
            }, n = !1;
            this.useApplyAsync = function (t) {
                return y(t) ? (n = !!t, this) : n
            };
            var r = !0;
            this.useLegacyPromiseExtensions = function (t) {
                return y(t) ? (r = !!t, this) : r
            };
            var o = this.interceptors = [];
            this.$get = ["$httpBackend", "$$cookieReader", "$cacheFactory", "$rootScope", "$q", "$injector", function (a, s, l, u, d, f) {
                function h(n) {
                    function o(t, e) {
                        for (var n = 0, i = e.length; n < i;) {
                            var r = e[n++], o = e[n++];
                            t = t.then(r, o)
                        }
                        return e.length = 0, t
                    }

                    function a(t, e) {
                        var n, r = {};
                        return i(t, function (t, i) {
                            k(t) ? (n = t(e), null != n && (r[i] = n)) : r[i] = t
                        }), r
                    }

                    function s(e) {
                        var n, i, r, o = t.headers, s = c({}, e.headers);
                        o = c({}, o.common, o[zi(e.method)]);
                        t:for (n in o) {
                            i = zi(n);
                            for (r in s) if (zi(r) === i) continue t;
                            s[n] = o[n]
                        }
                        return a(s, vt(e))
                    }

                    function l(e) {
                        var n = e.headers, r = De(e.data, Oe(n), void 0, e.transformRequest);
                        return v(r) && i(n, function (t, e) {
                            "content-type" === zi(e) && delete n[e]
                        }), v(e.withCredentials) && !v(t.withCredentials) && (e.withCredentials = t.withCredentials), g(e, r).then(u, u)
                    }

                    function u(t) {
                        var e = c({}, t);
                        return e.data = De(t.data, t.headers, t.status, h.transformResponse), Pe(t.status) ? e : d.reject(e)
                    }

                    if (!$(n)) throw e("$http")("badreq", "Http request configuration must be an object.  Received: {0}", n);
                    if (!b(n.url)) throw e("$http")("badreq", "Http request configuration url must be a string.  Received: {0}", n.url);
                    var h = c({
                        method: "get",
                        transformRequest: t.transformRequest,
                        transformResponse: t.transformResponse,
                        paramSerializer: t.paramSerializer
                    }, n);
                    h.headers = s(n), h.method = qi(h.method), h.paramSerializer = b(h.paramSerializer) ? f.get(h.paramSerializer) : h.paramSerializer;
                    var p = [], m = [], y = d.when(h);
                    return i(C, function (t) {
                        (t.request || t.requestError) && p.unshift(t.request, t.requestError), (t.response || t.responseError) && m.push(t.response, t.responseError)
                    }), y = o(y, p), y = y.then(l), y = o(y, m), r ? (y.success = function (t) {
                        return dt(t, "fn"), y.then(function (e) {
                            t(e.data, e.status, e.headers, h)
                        }), y
                    }, y.error = function (t) {
                        return dt(t, "fn"), y.then(null, function (e) {
                            t(e.data, e.status, e.headers, h)
                        }), y
                    }) : (y.success = po("success"), y.error = po("error")), y
                }

                function p(t) {
                    i(arguments, function (t) {
                        h[t] = function (e, n) {
                            return h(c({}, n || {}, {method: t, url: e}))
                        }
                    })
                }

                function m(t) {
                    i(arguments, function (t) {
                        h[t] = function (e, n, i) {
                            return h(c({}, i || {}, {method: t, url: e, data: n}))
                        }
                    })
                }

                function g(e, r) {
                    function o(t) {
                        if (t) {
                            var e = {};
                            return i(t, function (t, i) {
                                e[i] = function (e) {
                                    function i() {
                                        t(e)
                                    }

                                    n ? u.$applyAsync(i) : u.$$phase ? i() : u.$apply(i)
                                }
                            }), e
                        }
                    }

                    function l(t, e, i, r) {
                        function o() {
                            c(e, t, i, r)
                        }

                        m && (Pe(t) ? m.put(S, [t, e, Ae(i), r]) : m.remove(S)), n ? u.$applyAsync(o) : (o(), u.$$phase || u.$apply())
                    }

                    function c(t, n, i, r) {
                        n = n >= -1 ? n : 0, (Pe(n) ? b.resolve : b.reject)({
                            data: t,
                            status: n,
                            headers: Oe(i),
                            config: e,
                            statusText: r
                        })
                    }

                    function f(t) {
                        c(t.data, t.status, vt(t.headers()), t.statusText)
                    }

                    function p() {
                        var t = h.pendingRequests.indexOf(e);
                        t !== -1 && h.pendingRequests.splice(t, 1)
                    }

                    var m, g, b = d.defer(), C = b.promise, k = e.headers, S = w(e.url, e.paramSerializer(e.params));
                    if (h.pendingRequests.push(e), C.then(p, p), !e.cache && !t.cache || e.cache === !1 || "GET" !== e.method && "JSONP" !== e.method || (m = $(e.cache) ? e.cache : $(t.cache) ? t.cache : x), m && (g = m.get(S), y(g) ? P(g) ? g.then(f, f) : ir(g) ? c(g[1], g[0], vt(g[2]), g[3]) : c(g, 200, {}, "OK") : m.put(S, C)), v(g)) {
                        var _ = Nn(e.url) ? s()[e.xsrfCookieName || t.xsrfCookieName] : void 0;
                        _ && (k[e.xsrfHeaderName || t.xsrfHeaderName] = _), a(e.method, S, r, l, k, e.timeout, e.withCredentials, e.responseType, o(e.eventHandlers), o(e.uploadEventHandlers))
                    }
                    return C
                }

                function w(t, e) {
                    return e.length > 0 && (t += (t.indexOf("?") === -1 ? "?" : "&") + e), t
                }

                var x = l("$http");
                t.paramSerializer = b(t.paramSerializer) ? f.get(t.paramSerializer) : t.paramSerializer;
                var C = [];
                return i(o, function (t) {
                    C.unshift(b(t) ? f.get(t) : f.invoke(t))
                }), h.pendingRequests = [], p("get", "delete", "head", "jsonp"), m("post", "put", "patch"), h.defaults = t, h
            }]
        }

        function Le() {
            this.$get = function () {
                return function () {
                    return new t.XMLHttpRequest
                }
            }
        }

        function je() {
            this.$get = ["$browser", "$jsonpCallbacks", "$document", "$xhrFactory", function (t, e, n, i) {
                return Ne(t, i, t.defer, e, n[0])
            }]
        }

        function Ne(t, e, n, r, o) {
            function a(t, e, n) {
                t = t.replace("JSON_CALLBACK", e);
                var i = o.createElement("script"), a = null;
                return i.type = "text/javascript", i.src = t, i.async = !0, a = function (t) {
                    kr(i, "load", a), kr(i, "error", a), o.body.removeChild(i), i = null;
                    var s = -1, l = "unknown";
                    t && ("load" !== t.type || r.wasCalled(e) || (t = {type: "error"}), l = t.type, s = "error" === t.type ? 404 : 200), n && n(s, l)
                }, Cr(i, "load", a), Cr(i, "error", a), o.body.appendChild(i), a
            }

            return function (o, s, l, c, u, d, f, p, m, g) {
                function $() {
                    x && x(), C && C.abort()
                }

                function w(e, i, r, o, a) {
                    y(_) && n.cancel(_), x = C = null, e(i, r, o, a), t.$$completeOutstandingRequest(h)
                }

                if (t.$$incOutstandingRequestCount(), s = s || t.url(), "jsonp" === zi(o)) var b = r.createCallback(s),
                    x = a(s, b, function (t, e) {
                        var n = 200 === t && r.getResponse(b);
                        w(c, t, n, "", e), r.removeCallback(b)
                    }); else {
                    var C = e(o, s);
                    C.open(o, s, !0), i(u, function (t, e) {
                        y(t) && C.setRequestHeader(e, t)
                    }), C.onload = function () {
                        var t = C.statusText || "", e = "response" in C ? C.response : C.responseText,
                            n = 1223 === C.status ? 204 : C.status;
                        0 === n && (n = e ? 200 : "file" === jn(s).protocol ? 404 : 0), w(c, n, e, C.getAllResponseHeaders(), t)
                    };
                    var k = function () {
                        w(c, -1, null, null, "")
                    };
                    if (C.onerror = k, C.onabort = k, C.ontimeout = k, i(m, function (t, e) {
                        C.addEventListener(e, t)
                    }), i(g, function (t, e) {
                        C.upload.addEventListener(e, t)
                    }), f && (C.withCredentials = !0), p) try {
                        C.responseType = p
                    } catch (S) {
                        if ("json" !== p) throw S
                    }
                    C.send(v(l) ? null : l)
                }
                if (d > 0) var _ = n($, d); else P(d) && d.then($)
            }
        }

        function Fe() {
            var t = "{{", e = "}}";
            this.startSymbol = function (e) {
                return e ? (t = e, this) : t
            }, this.endSymbol = function (t) {
                return t ? (e = t, this) : e
            }, this.$get = ["$parse", "$exceptionHandler", "$sce", function (n, i, r) {
                function o(t) {
                    return "\\\\\\" + t
                }

                function a(n) {
                    return n.replace(h, t).replace(p, e)
                }

                function s(t) {
                    if (null == t) return "";
                    switch (typeof t) {
                        case"string":
                            break;
                        case"number":
                            t = "" + t;
                            break;
                        default:
                            t = W(t)
                    }
                    return t
                }

                function l(t, e, n, i) {
                    var r = t.$watch(function (t) {
                        return r(), i(t)
                    }, e, n);
                    return r
                }

                function u(o, u, h, p) {
                    function g(t) {
                        try {
                            return t = P(t), p && !y(t) ? t : s(t)
                        } catch (e) {
                            i(mo.interr(o, e))
                        }
                    }

                    if (!o.length || o.indexOf(t) === -1) {
                        var $;
                        if (!u) {
                            var w = a(o);
                            $ = m(w), $.exp = o, $.expressions = [], $.$$watchDelegate = l
                        }
                        return $
                    }
                    p = !!p;
                    for (var b, x, C, S = 0, _ = [], E = [], T = o.length, A = [], O = []; S < T;) {
                        if ((b = o.indexOf(t, S)) === -1 || (x = o.indexOf(e, b + d)) === -1) {
                            S !== T && A.push(a(o.substring(S)));
                            break
                        }
                        S !== b && A.push(a(o.substring(S, b))), C = o.substring(b + d, x), _.push(C), E.push(n(C, g)), S = x + f, O.push(A.length), A.push("")
                    }
                    if (h && A.length > 1 && mo.throwNoconcat(o), !u || _.length) {
                        var D = function (t) {
                            for (var e = 0, n = _.length; e < n; e++) {
                                if (p && v(t[e])) return;
                                A[O[e]] = t[e]
                            }
                            return A.join("")
                        }, P = function (t) {
                            return h ? r.getTrusted(h, t) : r.valueOf(t)
                        };
                        return c(function (t) {
                            var e = 0, n = _.length, r = new Array(n);
                            try {
                                for (; e < n; e++) r[e] = E[e](t);
                                return D(r)
                            } catch (a) {
                                i(mo.interr(o, a))
                            }
                        }, {
                            exp: o, expressions: _, $$watchDelegate: function (t, e) {
                                var n;
                                return t.$watchGroup(E, function (i, r) {
                                    var o = D(i);
                                    k(e) && e.call(this, o, i !== r ? n : o, t), n = o
                                })
                            }
                        })
                    }
                }

                var d = t.length, f = e.length, h = new RegExp(t.replace(/./g, o), "g"),
                    p = new RegExp(e.replace(/./g, o), "g");
                return u.startSymbol = function () {
                    return t
                }, u.endSymbol = function () {
                    return e
                }, u
            }]
        }

        function Ie() {
            this.$get = ["$rootScope", "$window", "$q", "$$q", "$browser", function (t, e, n, i, r) {
                function o(o, s, l, c) {
                    function u() {
                        d ? o.apply(null, f) : o(m)
                    }

                    var d = arguments.length > 4, f = d ? H(arguments, 4) : [], h = e.setInterval, p = e.clearInterval,
                        m = 0, g = y(c) && !c, v = (g ? i : n).defer(), $ = v.promise;
                    return l = y(l) ? l : 0, $.$$intervalId = h(function () {
                        g ? r.defer(u) : t.$evalAsync(u), v.notify(m++), l > 0 && m >= l && (v.resolve(m), p($.$$intervalId), delete a[$.$$intervalId]), g || t.$apply()
                    }, s), a[$.$$intervalId] = v, $
                }

                var a = {};
                return o.cancel = function (t) {
                    return !!(t && t.$$intervalId in a) && (a[t.$$intervalId].reject("canceled"), e.clearInterval(t.$$intervalId), delete a[t.$$intervalId], !0)
                }, o
            }]
        }

        function Re(t) {
            for (var e = t.split("/"), n = e.length; n--;) e[n] = tt(e[n]);
            return e.join("/")
        }

        function ze(t, e) {
            var n = jn(t);
            e.$$protocol = n.protocol, e.$$host = n.hostname, e.$$port = d(n.port) || yo[n.protocol] || null
        }

        function qe(t, e) {
            if (wo.test(t)) throw $o("badpath", 'Invalid url "{0}".', t);
            var n = "/" !== t.charAt(0);
            n && (t = "/" + t);
            var i = jn(t);
            e.$$path = decodeURIComponent(n && "/" === i.pathname.charAt(0) ? i.pathname.substring(1) : i.pathname), e.$$search = Z(i.search), e.$$hash = decodeURIComponent(i.hash), e.$$path && "/" !== e.$$path.charAt(0) && (e.$$path = "/" + e.$$path)
        }

        function He(t, e) {
            return t.slice(0, e.length) === e
        }

        function Be(t, e) {
            if (He(e, t)) return e.substr(t.length)
        }

        function Ve(t) {
            var e = t.indexOf("#");
            return e === -1 ? t : t.substr(0, e)
        }

        function We(t) {
            return t.replace(/(#.+)|#$/, "$1")
        }

        function Ue(t) {
            return t.substr(0, Ve(t).lastIndexOf("/") + 1)
        }

        function Ge(t) {
            return t.substring(0, t.indexOf("/", t.indexOf("//") + 2))
        }

        function Ye(t, e, n) {
            this.$$html5 = !0, n = n || "", ze(t, this), this.$$parse = function (t) {
                var n = Be(e, t);
                if (!b(n)) throw $o("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', t, e);
                qe(n, this), this.$$path || (this.$$path = "/"), this.$$compose()
            }, this.$$compose = function () {
                var t = J(this.$$search), n = this.$$hash ? "#" + tt(this.$$hash) : "";
                this.$$url = Re(this.$$path) + (t ? "?" + t : "") + n, this.$$absUrl = e + this.$$url.substr(1)
            }, this.$$parseLinkUrl = function (i, r) {
                if (r && "#" === r[0]) return this.hash(r.slice(1)), !0;
                var o, a, s;
                return y(o = Be(t, i)) ? (a = o, s = n && y(o = Be(n, o)) ? e + (Be("/", o) || o) : t + a) : y(o = Be(e, i)) ? s = e + o : e === i + "/" && (s = e), s && this.$$parse(s), !!s
            }
        }

        function Qe(t, e, n) {
            ze(t, this), this.$$parse = function (i) {
                function r(t, e, n) {
                    var i, r = /^\/[A-Z]:(\/.*)/;
                    return He(e, n) && (e = e.replace(n, "")), r.exec(e) ? t : (i = r.exec(t), i ? i[1] : t)
                }

                var o, a = Be(t, i) || Be(e, i);
                v(a) || "#" !== a.charAt(0) ? this.$$html5 ? o = a : (o = "", v(a) && (t = i, this.replace())) : (o = Be(n, a), v(o) && (o = a)), qe(o, this), this.$$path = r(this.$$path, o, t), this.$$compose()
            }, this.$$compose = function () {
                var e = J(this.$$search), i = this.$$hash ? "#" + tt(this.$$hash) : "";
                this.$$url = Re(this.$$path) + (e ? "?" + e : "") + i, this.$$absUrl = t + (this.$$url ? n + this.$$url : "")
            }, this.$$parseLinkUrl = function (e, n) {
                return Ve(t) === Ve(e) && (this.$$parse(e), !0)
            }
        }

        function Ke(t, e, n) {
            this.$$html5 = !0, Qe.apply(this, arguments), this.$$parseLinkUrl = function (i, r) {
                if (r && "#" === r[0]) return this.hash(r.slice(1)), !0;
                var o, a;
                return t === Ve(i) ? o = i : (a = Be(e, i)) ? o = t + n + a : e === i + "/" && (o = e), o && this.$$parse(o), !!o
            }, this.$$compose = function () {
                var e = J(this.$$search), i = this.$$hash ? "#" + tt(this.$$hash) : "";
                this.$$url = Re(this.$$path) + (e ? "?" + e : "") + i, this.$$absUrl = t + n + this.$$url
            }
        }

        function Xe(t) {
            return function () {
                return this[t]
            }
        }

        function Ze(t, e) {
            return function (n) {
                return v(n) ? this[t] : (this[t] = e(n), this.$$compose(), this)
            }
        }

        function Je() {
            var t = "", e = {enabled: !1, requireBase: !0, rewriteLinks: !0};
            this.hashPrefix = function (e) {
                return y(e) ? (t = e, this) : t
            }, this.html5Mode = function (t) {
                return D(t) ? (e.enabled = t, this) : $(t) ? (D(t.enabled) && (e.enabled = t.enabled), D(t.requireBase) && (e.requireBase = t.requireBase), (D(t.rewriteLinks) || b(t.rewriteLinks)) && (e.rewriteLinks = t.rewriteLinks), this) : e
            }, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", "$window", function (n, i, r, o, a) {
                function s(t, e, n) {
                    var r = c.url(), o = c.$$state;
                    try {
                        i.url(t, e, n), c.$$state = i.state()
                    } catch (a) {
                        throw c.url(r), c.$$state = o, a
                    }
                }

                function l(t, e) {
                    n.$broadcast("$locationChangeSuccess", c.absUrl(), t, c.$$state, e)
                }

                var c, u, d, f = i.baseHref(), h = i.url();
                if (e.enabled) {
                    if (!f && e.requireBase) throw $o("nobase", "$location in HTML5 mode requires a <base> tag to be present!");
                    d = Ge(h) + (f || "/"), u = r.history ? Ye : Ke
                } else d = Ve(h), u = Qe;
                var p = Ue(d);
                c = new u(d, p, "#" + t), c.$$parseLinkUrl(h, h), c.$$state = i.state();
                var m = /^\s*(javascript|mailto):/i;
                o.on("click", function (t) {
                    var r = e.rewriteLinks;
                    if (r && !t.ctrlKey && !t.metaKey && !t.shiftKey && 2 !== t.which && 2 !== t.button) {
                        for (var s = Wi(t.target); "a" !== F(s[0]);) if (s[0] === o[0] || !(s = s.parent())[0]) return;
                        if (!b(r) || !v(s.attr(r))) {
                            var l = s.prop("href"), u = s.attr("href") || s.attr("xlink:href");
                            $(l) && "[object SVGAnimatedString]" === l.toString() && (l = jn(l.animVal).href), m.test(l) || !l || s.attr("target") || t.isDefaultPrevented() || c.$$parseLinkUrl(l, u) && (t.preventDefault(), c.absUrl() !== i.url() && (n.$apply(), a.angular["ff-684208-preventDefault"] = !0))
                        }
                    }
                }), We(c.absUrl()) !== We(h) && i.url(c.absUrl(), !0);
                var g = !0;
                return i.onUrlChange(function (t, e) {
                    return v(Be(p, t)) ? void (a.location.href = t) : (n.$evalAsync(function () {
                        var i, r = c.absUrl(), o = c.$$state;
                        t = We(t), c.$$parse(t), c.$$state = e, i = n.$broadcast("$locationChangeStart", t, r, e, o).defaultPrevented, c.absUrl() === t && (i ? (c.$$parse(r), c.$$state = o, s(r, !1, o)) : (g = !1, l(r, o)))
                    }), void (n.$$phase || n.$digest()))
                }), n.$watch(function () {
                    var t = We(i.url()), e = We(c.absUrl()), o = i.state(), a = c.$$replace,
                        u = t !== e || c.$$html5 && r.history && o !== c.$$state;
                    (g || u) && (g = !1, n.$evalAsync(function () {
                        var e = c.absUrl(),
                            i = n.$broadcast("$locationChangeStart", e, t, c.$$state, o).defaultPrevented;
                        c.absUrl() === e && (i ? (c.$$parse(t), c.$$state = o) : (u && s(e, a, o === c.$$state ? null : c.$$state), l(t, o)))
                    })), c.$$replace = !1
                }), c
            }]
        }

        function tn() {
            var t = !0, e = this;
            this.debugEnabled = function (e) {
                return y(e) ? (t = e, this) : t
            }, this.$get = ["$window", function (n) {
                function r(t) {
                    return t instanceof Error && (t.stack ? t = t.message && t.stack.indexOf(t.message) === -1 ? "Error: " + t.message + "\n" + t.stack : t.stack : t.sourceURL && (t = t.message + "\n" + t.sourceURL + ":" + t.line)), t
                }

                function o(t) {
                    var e = n.console || {}, o = e[t] || e.log || h, a = !1;
                    try {
                        a = !!o.apply
                    } catch (s) {
                    }
                    return a ? function () {
                        var t = [];
                        return i(arguments, function (e) {
                            t.push(r(e))
                        }), o.apply(e, t)
                    } : function (t, e) {
                        o(t, null == e ? "" : e)
                    }
                }

                return {
                    log: o("log"), info: o("info"), warn: o("warn"), error: o("error"), debug: function () {
                        var n = o("debug");
                        return function () {
                            t && n.apply(e, arguments)
                        }
                    }()
                }
            }]
        }

        function en(t, e) {
            if ("__defineGetter__" === t || "__defineSetter__" === t || "__lookupGetter__" === t || "__lookupSetter__" === t || "__proto__" === t) throw xo("isecfld", "Attempting to access a disallowed field in Angular expressions! Expression: {0}", e);
            return t
        }

        function nn(t) {
            return t + ""
        }

        function rn(t, e) {
            if (t) {
                if (t.constructor === t) throw xo("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", e);
                if (t.window === t) throw xo("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", e);
                if (t.children && (t.nodeName || t.prop && t.attr && t.find)) throw xo("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", e);
                if (t === Object) throw xo("isecobj", "Referencing Object in Angular expressions is disallowed! Expression: {0}", e)
            }
            return t
        }

        function on(t, e) {
            if (t) {
                if (t.constructor === t) throw xo("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", e);
                if (t === jo || t === No || t === Fo) throw xo("isecff", "Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}", e)
            }
        }

        function an(t, e) {
            if (t && (t === Co || t === ko || t === So || t === _o || t === Eo || t === To || t === Ao || t === Oo || t === Do || t === Po || t === Mo || t === Lo)) throw xo("isecaf", "Assigning to a constructor or its prototype is disallowed! Expression: {0}", e)
        }

        function sn(t, e) {
            return "undefined" != typeof t ? t : e
        }

        function ln(t, e) {
            return "undefined" == typeof t ? e : "undefined" == typeof e ? t : t + e
        }

        function cn(t, e) {
            var n = t(e);
            return !n.$stateful
        }

        function un(t, e) {
            var n, r, o;
            switch (t.type) {
                case Ho.Program:
                    n = !0, i(t.body, function (t) {
                        un(t.expression, e), n = n && t.expression.constant
                    }), t.constant = n;
                    break;
                case Ho.Literal:
                    t.constant = !0, t.toWatch = [];
                    break;
                case Ho.UnaryExpression:
                    un(t.argument, e), t.constant = t.argument.constant, t.toWatch = t.argument.toWatch;
                    break;
                case Ho.BinaryExpression:
                    un(t.left, e), un(t.right, e), t.constant = t.left.constant && t.right.constant, t.toWatch = t.left.toWatch.concat(t.right.toWatch);
                    break;
                case Ho.LogicalExpression:
                    un(t.left, e), un(t.right, e), t.constant = t.left.constant && t.right.constant, t.toWatch = t.constant ? [] : [t];
                    break;
                case Ho.ConditionalExpression:
                    un(t.test, e), un(t.alternate, e), un(t.consequent, e), t.constant = t.test.constant && t.alternate.constant && t.consequent.constant, t.toWatch = t.constant ? [] : [t];
                    break;
                case Ho.Identifier:
                    t.constant = !1, t.toWatch = [t];
                    break;
                case Ho.MemberExpression:
                    un(t.object, e), t.computed && un(t.property, e), t.constant = t.object.constant && (!t.computed || t.property.constant), t.toWatch = [t];
                    break;
                case Ho.CallExpression:
                    o = !!t.filter && cn(e, t.callee.name), n = o, r = [], i(t.arguments, function (t) {
                        un(t, e), n = n && t.constant, t.constant || r.push.apply(r, t.toWatch)
                    }), t.constant = n, t.toWatch = o ? r : [t];
                    break;
                case Ho.AssignmentExpression:
                    un(t.left, e), un(t.right, e), t.constant = t.left.constant && t.right.constant, t.toWatch = [t];
                    break;
                case Ho.ArrayExpression:
                    n = !0, r = [], i(t.elements, function (t) {
                        un(t, e), n = n && t.constant, t.constant || r.push.apply(r, t.toWatch)
                    }), t.constant = n, t.toWatch = r;
                    break;
                case Ho.ObjectExpression:
                    n = !0, r = [], i(t.properties, function (t) {
                        un(t.value, e), n = n && t.value.constant && !t.computed, t.value.constant || r.push.apply(r, t.value.toWatch)
                    }), t.constant = n, t.toWatch = r;
                    break;
                case Ho.ThisExpression:
                    t.constant = !1, t.toWatch = [];
                    break;
                case Ho.LocalsExpression:
                    t.constant = !1, t.toWatch = []
            }
        }

        function dn(t) {
            if (1 === t.length) {
                var e = t[0].expression, n = e.toWatch;
                return 1 !== n.length ? n : n[0] !== e ? n : void 0
            }
        }

        function fn(t) {
            return t.type === Ho.Identifier || t.type === Ho.MemberExpression
        }

        function hn(t) {
            if (1 === t.body.length && fn(t.body[0].expression)) return {
                type: Ho.AssignmentExpression,
                left: t.body[0].expression,
                right: {type: Ho.NGValueParameter},
                operator: "="
            }
        }

        function pn(t) {
            return 0 === t.body.length || 1 === t.body.length && (t.body[0].expression.type === Ho.Literal || t.body[0].expression.type === Ho.ArrayExpression || t.body[0].expression.type === Ho.ObjectExpression)
        }

        function mn(t) {
            return t.constant
        }

        function gn(t, e) {
            this.astBuilder = t, this.$filter = e
        }

        function vn(t, e) {
            this.astBuilder = t, this.$filter = e
        }

        function yn(t) {
            return "constructor" === t
        }

        function $n(t) {
            return k(t.valueOf) ? t.valueOf() : Io.call(t)
        }

        function wn() {
            var t, e, n = mt(), r = mt(), o = {"true": !0, "false": !1, "null": null, undefined: void 0};
            this.addLiteral = function (t, e) {
                o[t] = e
            }, this.setIdentifierFns = function (n, i) {
                return t = n, e = i, this
            }, this.$get = ["$filter", function (a) {
                function s(t, e, i) {
                    var o, s, c;
                    switch (i = i || w, typeof t) {
                        case"string":
                            t = t.trim(), c = t;
                            var g = i ? r : n;
                            if (o = g[c], !o) {
                                ":" === t.charAt(0) && ":" === t.charAt(1) && (s = !0, t = t.substring(2));
                                var y = i ? $ : v, b = new qo(y), x = new Bo(b, a, y);
                                o = x.parse(t), o.constant ? o.$$watchDelegate = p : s ? o.$$watchDelegate = o.literal ? f : d : o.inputs && (o.$$watchDelegate = u), i && (o = l(o)), g[c] = o
                            }
                            return m(o, e);
                        case"function":
                            return m(t, e);
                        default:
                            return m(h, e)
                    }
                }

                function l(t) {
                    function e(e, n, i, r) {
                        var o = w;
                        w = !0;
                        try {
                            return t(e, n, i, r)
                        } finally {
                            w = o
                        }
                    }

                    if (!t) return t;
                    e.$$watchDelegate = t.$$watchDelegate, e.assign = l(t.assign), e.constant = t.constant, e.literal = t.literal;
                    for (var n = 0; t.inputs && n < t.inputs.length; ++n) t.inputs[n] = l(t.inputs[n]);
                    return e.inputs = t.inputs, e
                }

                function c(t, e) {
                    return null == t || null == e ? t === e : ("object" != typeof t || (t = $n(t), "object" != typeof t)) && (t === e || t !== t && e !== e)
                }

                function u(t, e, n, i, r) {
                    var o, a = i.inputs;
                    if (1 === a.length) {
                        var s = c;
                        return a = a[0], t.$watch(function (t) {
                            var e = a(t);
                            return c(e, s) || (o = i(t, void 0, void 0, [e]), s = e && $n(e)), o
                        }, e, n, r)
                    }
                    for (var l = [], u = [], d = 0, f = a.length; d < f; d++) l[d] = c, u[d] = null;
                    return t.$watch(function (t) {
                        for (var e = !1, n = 0, r = a.length; n < r; n++) {
                            var s = a[n](t);
                            (e || (e = !c(s, l[n]))) && (u[n] = s, l[n] = s && $n(s))
                        }
                        return e && (o = i(t, void 0, void 0, u)), o
                    }, e, n, r)
                }

                function d(t, e, n, i) {
                    var r, o;
                    return r = t.$watch(function (t) {
                        return i(t)
                    }, function (t, n, i) {
                        o = t, k(e) && e.apply(this, arguments), y(t) && i.$$postDigest(function () {
                            y(o) && r()
                        })
                    }, n)
                }

                function f(t, e, n, r) {
                    function o(t) {
                        var e = !0;
                        return i(t, function (t) {
                            y(t) || (e = !1)
                        }), e
                    }

                    var a, s;
                    return a = t.$watch(function (t) {
                        return r(t)
                    }, function (t, n, i) {
                        s = t, k(e) && e.call(this, t, n, i), o(t) && i.$$postDigest(function () {
                            o(s) && a()
                        })
                    }, n)
                }

                function p(t, e, n, i) {
                    var r = t.$watch(function (t) {
                        return r(), i(t)
                    }, e, n);
                    return r
                }

                function m(t, e) {
                    if (!e) return t;
                    var n = t.$$watchDelegate, i = !1, r = n !== f && n !== d, o = r ? function (n, r, o, a) {
                        var s = i && a ? a[0] : t(n, r, o, a);
                        return e(s, n, r)
                    } : function (n, i, r, o) {
                        var a = t(n, i, r, o), s = e(a, n, i);
                        return y(a) ? s : a
                    };
                    return t.$$watchDelegate && t.$$watchDelegate !== u ? o.$$watchDelegate = t.$$watchDelegate : e.$stateful || (o.$$watchDelegate = u, i = !t.inputs, o.inputs = t.inputs ? t.inputs : [t]), o
                }

                var g = sr().noUnsafeEval, v = {
                    csp: g,
                    expensiveChecks: !1,
                    literals: R(o),
                    isIdentifierStart: k(t) && t,
                    isIdentifierContinue: k(e) && e
                }, $ = {
                    csp: g,
                    expensiveChecks: !0,
                    literals: R(o),
                    isIdentifierStart: k(t) && t,
                    isIdentifierContinue: k(e) && e
                }, w = !1;
                return s.$$runningExpensiveChecks = function () {
                    return w
                }, s
            }]
        }

        function bn() {
            this.$get = ["$rootScope", "$exceptionHandler", function (t, e) {
                return Cn(function (e) {
                    t.$evalAsync(e)
                }, e)
            }]
        }

        function xn() {
            this.$get = ["$browser", "$exceptionHandler", function (t, e) {
                return Cn(function (e) {
                    t.defer(e)
                }, e)
            }]
        }

        function Cn(t, n) {
            function r() {
                var t = new u;
                return t.resolve = a(t, t.resolve), t.reject = a(t, t.reject), t.notify = a(t, t.notify), t
            }

            function o() {
                this.$$state = {status: 0}
            }

            function a(t, e) {
                return function (n) {
                    e.call(t, n)
                }
            }

            function s(t) {
                var e, i, r;
                r = t.pending, t.processScheduled = !1, t.pending = void 0;
                for (var o = 0, a = r.length; o < a; ++o) {
                    i = r[o][0], e = r[o][t.status];
                    try {
                        k(e) ? i.resolve(e(t.value)) : 1 === t.status ? i.resolve(t.value) : i.reject(t.value)
                    } catch (s) {
                        i.reject(s), n(s)
                    }
                }
            }

            function l(e) {
                !e.processScheduled && e.pending && (e.processScheduled = !0, t(function () {
                    s(e)
                }))
            }

            function u() {
                this.promise = new o
            }

            function d(t) {
                var e = new u;
                return e.reject(t), e.promise
            }

            function f(t, e, n) {
                var i = null;
                try {
                    k(n) && (i = n())
                } catch (r) {
                    return d(r)
                }
                return P(i) ? i.then(function () {
                    return e(t)
                }, d) : e(t)
            }

            function h(t, e, n, i) {
                var r = new u;
                return r.resolve(t), r.promise.then(e, n, i)
            }

            function p(t) {
                var e = new u, n = 0, r = ir(t) ? [] : {};
                return i(t, function (t, i) {
                    n++, h(t).then(function (t) {
                        r[i] = t, --n || e.resolve(r)
                    }, function (t) {
                        e.reject(t)
                    })
                }), 0 === n && e.resolve(r), e.promise
            }

            function m(t) {
                var e = r();
                return i(t, function (t) {
                    h(t).then(e.resolve, e.reject)
                }), e.promise
            }

            function g(t) {
                function e(t) {
                    i.resolve(t)
                }

                function n(t) {
                    i.reject(t)
                }

                if (!k(t)) throw y("norslvr", "Expected resolverFn, got '{0}'", t);
                var i = new u;
                return t(e, n), i.promise
            }

            var y = e("$q", TypeError);
            c(o.prototype, {
                then: function (t, e, n) {
                    if (v(t) && v(e) && v(n)) return this;
                    var i = new u;
                    return this.$$state.pending = this.$$state.pending || [], this.$$state.pending.push([i, t, e, n]), this.$$state.status > 0 && l(this.$$state), i.promise
                }, "catch": function (t) {
                    return this.then(null, t)
                }, "finally": function (t, e) {
                    return this.then(function (e) {
                        return f(e, w, t)
                    }, function (e) {
                        return f(e, d, t)
                    }, e)
                }
            }), c(u.prototype, {
                resolve: function (t) {
                    this.promise.$$state.status || (t === this.promise ? this.$$reject(y("qcycle", "Expected promise to be resolved with value other than itself '{0}'", t)) : this.$$resolve(t))
                }, $$resolve: function (t) {
                    function e(t) {
                        s || (s = !0, o.$$resolve(t))
                    }

                    function i(t) {
                        s || (s = !0, o.$$reject(t))
                    }

                    var r, o = this, s = !1;
                    try {
                        ($(t) || k(t)) && (r = t && t.then), k(r) ? (this.promise.$$state.status = -1, r.call(t, e, i, a(this, this.notify))) : (this.promise.$$state.value = t, this.promise.$$state.status = 1, l(this.promise.$$state))
                    } catch (c) {
                        i(c), n(c)
                    }
                }, reject: function (t) {
                    this.promise.$$state.status || this.$$reject(t)
                }, $$reject: function (t) {
                    this.promise.$$state.value = t, this.promise.$$state.status = 2, l(this.promise.$$state)
                }, notify: function (e) {
                    var i = this.promise.$$state.pending;
                    this.promise.$$state.status <= 0 && i && i.length && t(function () {
                        for (var t, r, o = 0, a = i.length; o < a; o++) {
                            r = i[o][0], t = i[o][3];
                            try {
                                r.notify(k(t) ? t(e) : e)
                            } catch (s) {
                                n(s)
                            }
                        }
                    })
                }
            });
            var w = h;
            return g.prototype = o.prototype, g.defer = r, g.reject = d, g.when = h, g.resolve = w, g.all = p, g.race = m, g
        }

        function kn() {
            this.$get = ["$window", "$timeout", function (t, e) {
                var n = t.requestAnimationFrame || t.webkitRequestAnimationFrame,
                    i = t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.webkitCancelRequestAnimationFrame,
                    r = !!n, o = r ? function (t) {
                        var e = n(t);
                        return function () {
                            i(e)
                        }
                    } : function (t) {
                        var n = e(t, 16.66, !1);
                        return function () {
                            e.cancel(n)
                        }
                    };
                return o.supported = r, o
            }]
        }

        function Sn() {
            function t(t) {
                function e() {
                    this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null, this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$id = a(), this.$$ChildScope = null
                }

                return e.prototype = t, e
            }

            var r = 10, o = e("$rootScope"), s = null, l = null;
            this.digestTtl = function (t) {
                return arguments.length && (r = t), r
            }, this.$get = ["$exceptionHandler", "$parse", "$browser", function (e, c, u) {
                function d(t) {
                    t.currentScope.$$destroyed = !0
                }

                function f(t) {
                    9 === Vi && (t.$$childHead && f(t.$$childHead), t.$$nextSibling && f(t.$$nextSibling)), t.$parent = t.$$nextSibling = t.$$prevSibling = t.$$childHead = t.$$childTail = t.$root = t.$$watchers = null
                }

                function p() {
                    this.$id = a(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this.$root = this, this.$$destroyed = !1, this.$$listeners = {}, this.$$listenerCount = {}, this.$$watchersCount = 0, this.$$isolateBindings = null
                }

                function m(t) {
                    if (S.$$phase) throw o("inprog", "{0} already in progress", S.$$phase);
                    S.$$phase = t
                }

                function g() {
                    S.$$phase = null
                }

                function y(t, e) {
                    do t.$$watchersCount += e; while (t = t.$parent)
                }

                function w(t, e, n) {
                    do t.$$listenerCount[n] -= e, 0 === t.$$listenerCount[n] && delete t.$$listenerCount[n]; while (t = t.$parent)
                }

                function b() {
                }

                function x() {
                    for (; T.length;) try {
                        T.shift()()
                    } catch (t) {
                        e(t)
                    }
                    l = null
                }

                function C() {
                    null === l && (l = u.defer(function () {
                        S.$apply(x)
                    }))
                }

                p.prototype = {
                    constructor: p, $new: function (e, n) {
                        var i;
                        return n = n || this, e ? (i = new p, i.$root = this.$root) : (this.$$ChildScope || (this.$$ChildScope = t(this)), i = new this.$$ChildScope), i.$parent = n, i.$$prevSibling = n.$$childTail, n.$$childHead ? (n.$$childTail.$$nextSibling = i, n.$$childTail = i) : n.$$childHead = n.$$childTail = i, (e || n !== this) && i.$on("$destroy", d), i
                    }, $watch: function (t, e, n, i) {
                        var r = c(t);
                        if (r.$$watchDelegate) return r.$$watchDelegate(this, e, n, r, t);
                        var o = this, a = o.$$watchers, l = {fn: e, last: b, get: r, exp: i || t, eq: !!n};
                        return s = null, k(e) || (l.fn = h), a || (a = o.$$watchers = [], a.$$digestWatchIndex = -1), a.unshift(l), a.$$digestWatchIndex++, y(this, 1), function () {
                            var t = I(a, l);
                            t >= 0 && (y(o, -1), t < a.$$digestWatchIndex && a.$$digestWatchIndex--), s = null
                        }
                    }, $watchGroup: function (t, e) {
                        function n() {
                            l = !1, c ? (c = !1, e(o, o, s)) : e(o, r, s)
                        }

                        var r = new Array(t.length), o = new Array(t.length), a = [], s = this, l = !1, c = !0;
                        if (!t.length) {
                            var u = !0;
                            return s.$evalAsync(function () {
                                u && e(o, o, s)
                            }), function () {
                                u = !1
                            }
                        }
                        return 1 === t.length ? this.$watch(t[0], function (t, n, i) {
                            o[0] = t, r[0] = n, e(o, t === n ? o : r, i)
                        }) : (i(t, function (t, e) {
                            var i = s.$watch(t, function (t, i) {
                                o[e] = t, r[e] = i, l || (l = !0, s.$evalAsync(n))
                            });
                            a.push(i)
                        }), function () {
                            for (; a.length;) a.shift()()
                        })
                    }, $watchCollection: function (t, e) {
                        function i(t) {
                            o = t;
                            var e, i, r, s, l;
                            if (!v(o)) {
                                if ($(o)) if (n(o)) {
                                    a !== h && (a = h, g = a.length = 0, d++), e = o.length, g !== e && (d++, a.length = g = e);
                                    for (var c = 0; c < e; c++) l = a[c], s = o[c], r = l !== l && s !== s, r || l === s || (d++, a[c] = s)
                                } else {
                                    a !== p && (a = p = {}, g = 0, d++), e = 0;
                                    for (i in o) Ri.call(o, i) && (e++, s = o[i], l = a[i], i in a ? (r = l !== l && s !== s, r || l === s || (d++, a[i] = s)) : (g++, a[i] = s, d++));
                                    if (g > e) {
                                        d++;
                                        for (i in a) Ri.call(o, i) || (g--, delete a[i])
                                    }
                                } else a !== o && (a = o, d++);
                                return d
                            }
                        }

                        function r() {
                            if (m ? (m = !1, e(o, o, l)) : e(o, s, l), u) if ($(o)) if (n(o)) {
                                s = new Array(o.length);
                                for (var t = 0; t < o.length; t++) s[t] = o[t]
                            } else {
                                s = {};
                                for (var i in o) Ri.call(o, i) && (s[i] = o[i])
                            } else s = o
                        }

                        i.$stateful = !0;
                        var o, a, s, l = this, u = e.length > 1, d = 0, f = c(t, i), h = [], p = {}, m = !0, g = 0;
                        return this.$watch(f, r)
                    }, $digest: function () {
                        var t, n, i, a, c, d, f, h, p, v, y, $ = r, w = this, C = [];
                        m("$digest"), u.$$checkUrlChange(), this === S && null !== l && (u.defer.cancel(l), x()), s = null;
                        do {
                            f = !1, p = w;
                            for (var T = 0; T < _.length; T++) {
                                try {
                                    y = _[T], y.scope.$eval(y.expression, y.locals)
                                } catch (O) {
                                    e(O)
                                }
                                s = null
                            }
                            _.length = 0;
                            t:do {
                                if (d = p.$$watchers) for (d.$$digestWatchIndex = d.length; d.$$digestWatchIndex--;) try {
                                    if (t = d[d.$$digestWatchIndex]) if (c = t.get, (n = c(p)) === (i = t.last) || (t.eq ? z(n, i) : nr(n) && nr(i))) {
                                        if (t === s) {
                                            f = !1;
                                            break t
                                        }
                                    } else f = !0, s = t, t.last = t.eq ? R(n, null) : n, a = t.fn, a(n, i === b ? n : i, p), $ < 5 && (v = 4 - $, C[v] || (C[v] = []), C[v].push({
                                        msg: k(t.exp) ? "fn: " + (t.exp.name || t.exp.toString()) : t.exp,
                                        newVal: n,
                                        oldVal: i
                                    }))
                                } catch (O) {
                                    e(O)
                                }
                                if (!(h = p.$$watchersCount && p.$$childHead || p !== w && p.$$nextSibling)) for (; p !== w && !(h = p.$$nextSibling);) p = p.$parent
                            } while (p = h);
                            if ((f || _.length) && !$--) throw g(), o("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", r, C)
                        } while (f || _.length);
                        for (g(); A < E.length;) try {
                            E[A++]()
                        } catch (O) {
                            e(O)
                        }
                        E.length = A = 0
                    }, $destroy: function () {
                        if (!this.$$destroyed) {
                            var t = this.$parent;
                            this.$broadcast("$destroy"), this.$$destroyed = !0, this === S && u.$$applicationDestroyed(), y(this, -this.$$watchersCount);
                            for (var e in this.$$listenerCount) w(this, this.$$listenerCount[e], e);
                            t && t.$$childHead === this && (t.$$childHead = this.$$nextSibling), t && t.$$childTail === this && (t.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$destroy = this.$digest = this.$apply = this.$evalAsync = this.$applyAsync = h, this.$on = this.$watch = this.$watchGroup = function () {
                                return h
                            }, this.$$listeners = {}, this.$$nextSibling = null, f(this)
                        }
                    }, $eval: function (t, e) {
                        return c(t)(this, e)
                    }, $evalAsync: function (t, e) {
                        S.$$phase || _.length || u.defer(function () {
                            _.length && S.$digest()
                        }), _.push({scope: this, expression: c(t), locals: e})
                    }, $$postDigest: function (t) {
                        E.push(t)
                    }, $apply: function (t) {
                        try {
                            m("$apply");
                            try {
                                return this.$eval(t)
                            } finally {
                                g()
                            }
                        } catch (n) {
                            e(n)
                        } finally {
                            try {
                                S.$digest()
                            } catch (n) {
                                throw e(n), n
                            }
                        }
                    }, $applyAsync: function (t) {
                        function e() {
                            n.$eval(t)
                        }

                        var n = this;
                        t && T.push(e), t = c(t), C()
                    }, $on: function (t, e) {
                        var n = this.$$listeners[t];
                        n || (this.$$listeners[t] = n = []), n.push(e);
                        var i = this;
                        do i.$$listenerCount[t] || (i.$$listenerCount[t] = 0), i.$$listenerCount[t]++; while (i = i.$parent);
                        var r = this;
                        return function () {
                            var i = n.indexOf(e);
                            i !== -1 && (n[i] = null, w(r, 1, t))
                        }
                    }, $emit: function (t, n) {
                        var i, r, o, a = [], s = this, l = !1, c = {
                            name: t, targetScope: s, stopPropagation: function () {
                                l = !0
                            }, preventDefault: function () {
                                c.defaultPrevented = !0
                            }, defaultPrevented: !1
                        }, u = q([c], arguments, 1);
                        do {
                            for (i = s.$$listeners[t] || a, c.currentScope = s, r = 0, o = i.length; r < o; r++) if (i[r]) try {
                                i[r].apply(null, u)
                            } catch (d) {
                                e(d)
                            } else i.splice(r, 1), r--, o--;
                            if (l) return c.currentScope = null, c;
                            s = s.$parent
                        } while (s);
                        return c.currentScope = null, c
                    }, $broadcast: function (t, n) {
                        var i = this, r = i, o = i, a = {
                            name: t, targetScope: i, preventDefault: function () {
                                a.defaultPrevented = !0
                            }, defaultPrevented: !1
                        };
                        if (!i.$$listenerCount[t]) return a;
                        for (var s, l, c, u = q([a], arguments, 1); r = o;) {
                            for (a.currentScope = r, s = r.$$listeners[t] || [], l = 0, c = s.length; l < c; l++) if (s[l]) try {
                                s[l].apply(null, u)
                            } catch (d) {
                                e(d)
                            } else s.splice(l, 1), l--, c--;
                            if (!(o = r.$$listenerCount[t] && r.$$childHead || r !== i && r.$$nextSibling)) for (; r !== i && !(o = r.$$nextSibling);) r = r.$parent
                        }
                        return a.currentScope = null, a
                    }
                };
                var S = new p, _ = S.$$asyncQueue = [], E = S.$$postDigestQueue = [], T = S.$$applyAsyncQueue = [],
                    A = 0;
                return S
            }]
        }

        function _n() {
            var t = /^\s*(https?|ftp|mailto|tel|file):/, e = /^\s*((https?|ftp|file|blob):|data:image\/)/;
            this.aHrefSanitizationWhitelist = function (e) {
                return y(e) ? (t = e, this) : t
            }, this.imgSrcSanitizationWhitelist = function (t) {
                return y(t) ? (e = t, this) : e
            }, this.$get = function () {
                return function (n, i) {
                    var r, o = i ? e : t;
                    return r = jn(n).href, "" === r || r.match(o) ? n : "unsafe:" + r
                }
            }
        }

        function En(t) {
            if ("self" === t) return t;
            if (b(t)) {
                if (t.indexOf("***") > -1) throw Vo("iwcard", "Illegal sequence *** in string matcher.  String: {0}", t);
                return t = ar(t).replace(/\\\*\\\*/g, ".*").replace(/\\\*/g, "[^:/.?&;]*"), new RegExp("^" + t + "$")
            }
            if (S(t)) return new RegExp("^" + t.source + "$");
            throw Vo("imatcher", 'Matchers may only be "self", string patterns or RegExp objects')
        }

        function Tn(t) {
            var e = [];
            return y(t) && i(t, function (t) {
                e.push(En(t))
            }), e
        }

        function An() {
            this.SCE_CONTEXTS = Wo;
            var t = ["self"], e = [];
            this.resourceUrlWhitelist = function (e) {
                return arguments.length && (t = Tn(e)), t
            }, this.resourceUrlBlacklist = function (t) {
                return arguments.length && (e = Tn(t)), e
            }, this.$get = ["$injector", function (n) {
                function i(t, e) {
                    return "self" === t ? Nn(e) : !!t.exec(e.href)
                }

                function r(n) {
                    var r, o, a = jn(n.toString()), s = !1;
                    for (r = 0, o = t.length; r < o; r++) if (i(t[r], a)) {
                        s = !0;
                        break
                    }
                    if (s) for (r = 0, o = e.length; r < o; r++) if (i(e[r], a)) {
                        s = !1;
                        break
                    }
                    return s
                }

                function o(t) {
                    var e = function (t) {
                        this.$$unwrapTrustedValue = function () {
                            return t
                        }
                    };
                    return t && (e.prototype = new t), e.prototype.valueOf = function () {
                        return this.$$unwrapTrustedValue()
                    }, e.prototype.toString = function () {
                        return this.$$unwrapTrustedValue().toString()
                    }, e
                }

                function a(t, e) {
                    var n = d.hasOwnProperty(t) ? d[t] : null;
                    if (!n) throw Vo("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", t, e);
                    if (null === e || v(e) || "" === e) return e;
                    if ("string" != typeof e) throw Vo("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", t);
                    return new n(e)
                }

                function s(t) {
                    return t instanceof u ? t.$$unwrapTrustedValue() : t
                }

                function l(t, e) {
                    if (null === e || v(e) || "" === e) return e;
                    var n = d.hasOwnProperty(t) ? d[t] : null;
                    if (n && e instanceof n) return e.$$unwrapTrustedValue();
                    if (t === Wo.RESOURCE_URL) {
                        if (r(e)) return e;
                        throw Vo("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", e.toString())
                    }
                    if (t === Wo.HTML) return c(e);
                    throw Vo("unsafe", "Attempting to use an unsafe value in a safe context.")
                }

                var c = function (t) {
                    throw Vo("unsafe", "Attempting to use an unsafe value in a safe context.")
                };
                n.has("$sanitize") && (c = n.get("$sanitize"));
                var u = o(), d = {};
                return d[Wo.HTML] = o(u), d[Wo.CSS] = o(u), d[Wo.URL] = o(u), d[Wo.JS] = o(u), d[Wo.RESOURCE_URL] = o(d[Wo.URL]), {
                    trustAs: a,
                    getTrusted: l,
                    valueOf: s
                }
            }]
        }

        function On() {
            var t = !0;
            this.enabled = function (e) {
                return arguments.length && (t = !!e), t
            }, this.$get = ["$parse", "$sceDelegate", function (e, n) {
                if (t && Vi < 8) throw Vo("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 11 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
                var r = vt(Wo);
                r.isEnabled = function () {
                    return t
                }, r.trustAs = n.trustAs, r.getTrusted = n.getTrusted, r.valueOf = n.valueOf, t || (r.trustAs = r.getTrusted = function (t, e) {
                    return e
                }, r.valueOf = p), r.parseAs = function (t, n) {
                    var i = e(n);
                    return i.literal && i.constant ? i : e(n, function (e) {
                        return r.getTrusted(t, e)
                    })
                };
                var o = r.parseAs, a = r.getTrusted, s = r.trustAs;
                return i(Wo, function (t, e) {
                    var n = zi(e);
                    r[xt("parse_as_" + n)] = function (e) {
                        return o(t, e)
                    }, r[xt("get_trusted_" + n)] = function (e) {
                        return a(t, e)
                    }, r[xt("trust_as_" + n)] = function (e) {
                        return s(t, e)
                    }
                }), r
            }]
        }

        function Dn() {
            this.$get = ["$window", "$document", function (t, e) {
                var n, i, r = {},
                    o = t.chrome && (t.chrome.app && t.chrome.app.runtime || !t.chrome.app && t.chrome.runtime && t.chrome.runtime.id),
                    a = !o && t.history && t.history.pushState,
                    s = d((/android (\d+)/.exec(zi((t.navigator || {}).userAgent)) || [])[1]),
                    l = /Boxee/i.test((t.navigator || {}).userAgent), c = e[0] || {}, u = /^(Moz|webkit|ms)(?=[A-Z])/,
                    f = c.body && c.body.style, h = !1, p = !1;
                if (f) {
                    for (var m in f) if (i = u.exec(m)) {
                        n = i[0], n = n[0].toUpperCase() + n.substr(1);
                        break
                    }
                    n || (n = "WebkitOpacity" in f && "webkit"), h = !!("transition" in f || n + "Transition" in f), p = !!("animation" in f || n + "Animation" in f), !s || h && p || (h = b(f.webkitTransition), p = b(f.webkitAnimation))
                }
                return {
                    history: !(!a || s < 4 || l), hasEvent: function (t) {
                        if ("input" === t && Vi <= 11) return !1;
                        if (v(r[t])) {
                            var e = c.createElement("div");
                            r[t] = "on" + t in e
                        }
                        return r[t]
                    }, csp: sr(), vendorPrefix: n, transitions: h, animations: p, android: s
                }
            }]
        }

        function Pn() {
            var t;
            this.httpOptions = function (e) {
                return e ? (t = e, this) : t
            }, this.$get = ["$templateCache", "$http", "$q", "$sce", function (e, n, i, r) {
                function o(a, s) {
                    function l(t) {
                        if (!s) throw Uo("tpload", "Failed to load template: {0} (HTTP status: {1} {2})", a, t.status, t.statusText);
                        return i.reject(t)
                    }

                    o.totalPendingRequests++, b(a) && !v(e.get(a)) || (a = r.getTrustedResourceUrl(a));
                    var u = n.defaults && n.defaults.transformResponse;
                    return ir(u) ? u = u.filter(function (t) {
                        return t !== Ee
                    }) : u === Ee && (u = null), n.get(a, c({
                        cache: e,
                        transformResponse: u
                    }, t))["finally"](function () {
                        o.totalPendingRequests--
                    }).then(function (t) {
                        return e.put(a, t.data), t.data
                    }, l)
                }

                return o.totalPendingRequests = 0, o
            }]
        }

        function Mn() {
            this.$get = ["$rootScope", "$browser", "$location", function (t, e, n) {
                var r = {};
                return r.findBindings = function (t, e, n) {
                    var r = t.getElementsByClassName("ng-binding"), o = [];
                    return i(r, function (t) {
                        var r = tr.element(t).data("$binding");
                        r && i(r, function (i) {
                            if (n) {
                                var r = new RegExp("(^|\\s)" + ar(e) + "(\\s|\\||$)");
                                r.test(i) && o.push(t)
                            } else i.indexOf(e) !== -1 && o.push(t)
                        })
                    }), o
                }, r.findModels = function (t, e, n) {
                    for (var i = ["ng-", "data-ng-", "ng\\:"], r = 0; r < i.length; ++r) {
                        var o = n ? "=" : "*=", a = "[" + i[r] + "model" + o + '"' + e + '"]',
                            s = t.querySelectorAll(a);
                        if (s.length) return s
                    }
                }, r.getLocation = function () {
                    return n.url()
                }, r.setLocation = function (e) {
                    e !== n.url() && (n.url(e), t.$digest())
                }, r.whenStable = function (t) {
                    e.notifyWhenNoOutstandingRequests(t)
                }, r
            }]
        }

        function Ln() {
            this.$get = ["$rootScope", "$browser", "$q", "$$q", "$exceptionHandler", function (t, e, n, i, r) {
                function o(o, s, l) {
                    k(o) || (l = s, s = o, o = h);
                    var c, u = H(arguments, 3), d = y(l) && !l, f = (d ? i : n).defer(), p = f.promise;
                    return c = e.defer(function () {
                        try {
                            f.resolve(o.apply(null, u))
                        } catch (e) {
                            f.reject(e), r(e)
                        } finally {
                            delete a[p.$$timeoutId]
                        }
                        d || t.$apply()
                    }, s), p.$$timeoutId = c, a[c] = f, p
                }

                var a = {};
                return o.cancel = function (t) {
                    return !!(t && t.$$timeoutId in a) && (a[t.$$timeoutId].reject("canceled"), delete a[t.$$timeoutId], e.defer.cancel(t.$$timeoutId))
                }, o
            }]
        }

        function jn(t) {
            var e = t;
            return Vi && (Go.setAttribute("href", e), e = Go.href), Go.setAttribute("href", e), {
                href: Go.href,
                protocol: Go.protocol ? Go.protocol.replace(/:$/, "") : "",
                host: Go.host,
                search: Go.search ? Go.search.replace(/^\?/, "") : "",
                hash: Go.hash ? Go.hash.replace(/^#/, "") : "",
                hostname: Go.hostname,
                port: Go.port,
                pathname: "/" === Go.pathname.charAt(0) ? Go.pathname : "/" + Go.pathname
            }
        }

        function Nn(t) {
            var e = b(t) ? jn(t) : t;
            return e.protocol === Yo.protocol && e.host === Yo.host
        }

        function Fn() {
            this.$get = m(t)
        }

        function In(t) {
            function e(t) {
                try {
                    return decodeURIComponent(t)
                } catch (e) {
                    return t
                }
            }

            var n = t[0] || {}, i = {}, r = "";
            return function () {
                var t, o, a, s, l, c = n.cookie || "";
                if (c !== r) for (r = c, t = r.split("; "), i = {}, a = 0; a < t.length; a++) o = t[a], s = o.indexOf("="), s > 0 && (l = e(o.substring(0, s)), v(i[l]) && (i[l] = e(o.substring(s + 1))));
                return i
            }
        }

        function Rn() {
            this.$get = In
        }

        function zn(t) {
            function e(r, o) {
                if ($(r)) {
                    var a = {};
                    return i(r, function (t, n) {
                        a[n] = e(n, t)
                    }), a
                }
                return t.factory(r + n, o)
            }

            var n = "Filter";
            this.register = e, this.$get = ["$injector", function (t) {
                return function (e) {
                    return t.get(e + n)
                }
            }], e("currency", Wn), e("date", ai), e("filter", qn), e("json", si), e("limitTo", li), e("lowercase", ea), e("number", Un), e("orderBy", ui), e("uppercase", na)
        }

        function qn() {
            return function (t, i, r, o) {
                if (!n(t)) {
                    if (null == t) return t;
                    throw e("filter")("notarray", "Expected array but received: {0}", t)
                }
                o = o || "$";
                var a, s, l = Vn(i);
                switch (l) {
                    case"function":
                        a = i;
                        break;
                    case"boolean":
                    case"null":
                    case"number":
                    case"string":
                        s = !0;
                    case"object":
                        a = Hn(i, r, o, s);
                        break;
                    default:
                        return t
                }
                return Array.prototype.filter.call(t, a)
            }
        }

        function Hn(t, e, n, i) {
            var r, o = $(t) && n in t;
            return e === !0 ? e = z : k(e) || (e = function (t, e) {
                return !v(t) && (null === t || null === e ? t === e : !($(e) || $(t) && !g(t)) && (t = zi("" + t), e = zi("" + e), t.indexOf(e) !== -1))
            }), r = function (r) {
                return o && !$(r) ? Bn(r, t[n], e, n, !1) : Bn(r, t, e, n, i)
            }
        }

        function Bn(t, e, n, i, r, o) {
            var a = Vn(t), s = Vn(e);
            if ("string" === s && "!" === e.charAt(0)) return !Bn(t, e.substring(1), n, i, r);
            if (ir(t)) return t.some(function (t) {
                return Bn(t, e, n, i, r)
            });
            switch (a) {
                case"object":
                    var l;
                    if (r) {
                        for (l in t) if ("$" !== l.charAt(0) && Bn(t[l], e, n, i, !0)) return !0;
                        return !o && Bn(t, e, n, i, !1)
                    }
                    if ("object" === s) {
                        for (l in e) {
                            var c = e[l];
                            if (!k(c) && !v(c)) {
                                var u = l === i, d = u ? t : t[l];
                                if (!Bn(d, c, n, i, u, u)) return !1
                            }
                        }
                        return !0
                    }
                    return n(t, e);
                case"function":
                    return !1;
                default:
                    return n(t, e)
            }
        }

        function Vn(t) {
            return null === t ? "null" : typeof t
        }

        function Wn(t) {
            var e = t.NUMBER_FORMATS;
            return function (t, n, i) {
                return v(n) && (n = e.CURRENCY_SYM), v(i) && (i = e.PATTERNS[1].maxFrac), null == t ? t : Qn(t, e.PATTERNS[1], e.GROUP_SEP, e.DECIMAL_SEP, i).replace(/\u00A4/g, n)
            }
        }

        function Un(t) {
            var e = t.NUMBER_FORMATS;
            return function (t, n) {
                return null == t ? t : Qn(t, e.PATTERNS[0], e.GROUP_SEP, e.DECIMAL_SEP, n)
            }
        }

        function Gn(t) {
            var e, n, i, r, o, a = 0;
            for ((n = t.indexOf(Ko)) > -1 && (t = t.replace(Ko, "")), (i = t.search(/e/i)) > 0 ? (n < 0 && (n = i), n += +t.slice(i + 1), t = t.substring(0, i)) : n < 0 && (n = t.length), i = 0; t.charAt(i) === Xo; i++) ;
            if (i === (o = t.length)) e = [0], n = 1; else {
                for (o--; t.charAt(o) === Xo;) o--;
                for (n -= i, e = [], r = 0; i <= o; i++, r++) e[r] = +t.charAt(i)
            }
            return n > Qo && (e = e.splice(0, Qo - 1), a = n - 1, n = 1), {d: e, e: a, i: n}
        }

        function Yn(t, e, n, i) {
            var r = t.d, o = r.length - t.i;
            e = v(e) ? Math.min(Math.max(n, o), i) : +e;
            var a = e + t.i, s = r[a];
            if (a > 0) {
                r.splice(Math.max(t.i, a));
                for (var l = a; l < r.length; l++) r[l] = 0
            } else {
                o = Math.max(0, o), t.i = 1, r.length = Math.max(1, a = e + 1), r[0] = 0;
                for (var c = 1; c < a; c++) r[c] = 0
            }
            if (s >= 5) if (a - 1 < 0) {
                for (var u = 0; u > a; u--) r.unshift(0), t.i++;
                r.unshift(1), t.i++
            } else r[a - 1]++;
            for (; o < Math.max(0, e); o++) r.push(0);
            var d = r.reduceRight(function (t, e, n, i) {
                return e += t, i[n] = e % 10, Math.floor(e / 10)
            }, 0);
            d && (r.unshift(d), t.i++)
        }

        function Qn(t, e, n, i, r) {
            if (!b(t) && !x(t) || isNaN(t)) return "";
            var o, a = !isFinite(t), s = !1, l = Math.abs(t) + "", c = "";
            if (a) c = "∞"; else {
                o = Gn(l), Yn(o, r, e.minFrac, e.maxFrac);
                var u = o.d, d = o.i, f = o.e, h = [];
                for (s = u.reduce(function (t, e) {
                    return t && !e
                }, !0); d < 0;) u.unshift(0), d++;
                d > 0 ? h = u.splice(d, u.length) : (h = u, u = [0]);
                var p = [];
                for (u.length >= e.lgSize && p.unshift(u.splice(-e.lgSize, u.length).join("")); u.length > e.gSize;) p.unshift(u.splice(-e.gSize, u.length).join(""));
                u.length && p.unshift(u.join("")), c = p.join(n), h.length && (c += i + h.join("")), f && (c += "e+" + f)
            }
            return t < 0 && !s ? e.negPre + c + e.negSuf : e.posPre + c + e.posSuf
        }

        function Kn(t, e, n, i) {
            var r = "";
            for ((t < 0 || i && t <= 0) && (i ? t = -t + 1 : (t = -t, r = "-")), t = "" + t; t.length < e;) t = Xo + t;
            return n && (t = t.substr(t.length - e)), r + t
        }

        function Xn(t, e, n, i, r) {
            return n = n || 0, function (o) {
                var a = o["get" + t]();
                return (n > 0 || a > -n) && (a += n), 0 === a && n === -12 && (a = 12), Kn(a, e, i, r)
            }
        }

        function Zn(t, e, n) {
            return function (i, r) {
                var o = i["get" + t](), a = (n ? "STANDALONE" : "") + (e ? "SHORT" : ""), s = qi(a + t);
                return r[s][o]
            }
        }

        function Jn(t, e, n) {
            var i = -1 * n, r = i >= 0 ? "+" : "";
            return r += Kn(Math[i > 0 ? "floor" : "ceil"](i / 60), 2) + Kn(Math.abs(i % 60), 2)
        }

        function ti(t) {
            var e = new Date(t, 0, 1).getDay();
            return new Date(t, 0, (e <= 4 ? 5 : 12) - e)
        }

        function ei(t) {
            return new Date(t.getFullYear(), t.getMonth(), t.getDate() + (4 - t.getDay()))
        }

        function ni(t) {
            return function (e) {
                var n = ti(e.getFullYear()), i = ei(e), r = +i - +n, o = 1 + Math.round(r / 6048e5);
                return Kn(o, t)
            }
        }

        function ii(t, e) {
            return t.getHours() < 12 ? e.AMPMS[0] : e.AMPMS[1]
        }

        function ri(t, e) {
            return t.getFullYear() <= 0 ? e.ERAS[0] : e.ERAS[1]
        }

        function oi(t, e) {
            return t.getFullYear() <= 0 ? e.ERANAMES[0] : e.ERANAMES[1]
        }

        function ai(t) {
            function e(t) {
                var e;
                if (e = t.match(n)) {
                    var i = new Date(0), r = 0, o = 0, a = e[8] ? i.setUTCFullYear : i.setFullYear,
                        s = e[8] ? i.setUTCHours : i.setHours;
                    e[9] && (r = d(e[9] + e[10]), o = d(e[9] + e[11])), a.call(i, d(e[1]), d(e[2]) - 1, d(e[3]));
                    var l = d(e[4] || 0) - r, c = d(e[5] || 0) - o, u = d(e[6] || 0),
                        f = Math.round(1e3 * parseFloat("0." + (e[7] || 0)));
                    return s.call(i, l, c, u, f), i
                }
                return t
            }

            var n = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
            return function (n, r, o) {
                var a, s, l = "", c = [];
                if (r = r || "mediumDate", r = t.DATETIME_FORMATS[r] || r, b(n) && (n = ta.test(n) ? d(n) : e(n)), x(n) && (n = new Date(n)), !C(n) || !isFinite(n.getTime())) return n;
                for (; r;) s = Jo.exec(r), s ? (c = q(c, s, 1), r = c.pop()) : (c.push(r), r = null);
                var u = n.getTimezoneOffset();
                return o && (u = G(o, u), n = Q(n, o, !0)), i(c, function (e) {
                    a = Zo[e], l += a ? a(n, t.DATETIME_FORMATS, u) : "''" === e ? "'" : e.replace(/(^'|'$)/g, "").replace(/''/g, "'")
                }), l
            }
        }

        function si() {
            return function (t, e) {
                return v(e) && (e = 2), W(t, e)
            }
        }

        function li() {
            return function (t, e, i) {
                return e = Math.abs(Number(e)) === 1 / 0 ? Number(e) : d(e), nr(e) ? t : (x(t) && (t = t.toString()), n(t) ? (i = !i || isNaN(i) ? 0 : d(i), i = i < 0 ? Math.max(0, t.length + i) : i, e >= 0 ? ci(t, i, i + e) : 0 === i ? ci(t, e, t.length) : ci(t, Math.max(0, i + e), i)) : t)
            }
        }

        function ci(t, e, n) {
            return b(t) ? t.slice(e, n) : Yi.call(t, e, n)
        }

        function ui(t) {
            function i(e) {
                return e.map(function (e) {
                    var n = 1, i = p;
                    if (k(e)) i = e; else if (b(e) && ("+" !== e.charAt(0) && "-" !== e.charAt(0) || (n = "-" === e.charAt(0) ? -1 : 1, e = e.substring(1)), "" !== e && (i = t(e), i.constant))) {
                        var r = i();
                        i = function (t) {
                            return t[r]
                        }
                    }
                    return {get: i, descending: n}
                })
            }

            function r(t) {
                switch (typeof t) {
                    case"number":
                    case"boolean":
                    case"string":
                        return !0;
                    default:
                        return !1
                }
            }

            function o(t) {
                return k(t.valueOf) && (t = t.valueOf(), r(t)) ? t : g(t) && (t = t.toString(), r(t)) ? t : t
            }

            function a(t, e) {
                var n = typeof t;
                return null === t ? (n = "string", t = "null") : "object" === n && (t = o(t)), {
                    value: t,
                    type: n,
                    index: e
                }
            }

            function s(t, e) {
                var n = 0, i = t.type, r = e.type;
                if (i === r) {
                    var o = t.value, a = e.value;
                    "string" === i ? (o = o.toLowerCase(), a = a.toLowerCase()) : "object" === i && ($(o) && (o = t.index), $(a) && (a = e.index)), o !== a && (n = o < a ? -1 : 1)
                } else n = i < r ? -1 : 1;
                return n
            }

            return function (t, r, o, l) {
                function c(t, e) {
                    return {
                        value: t,
                        tieBreaker: {value: e, type: "number", index: e},
                        predicateValues: d.map(function (n) {
                            return a(n.get(t), e)
                        })
                    }
                }

                function u(t, e) {
                    for (var n = 0, i = d.length; n < i; n++) {
                        var r = h(t.predicateValues[n], e.predicateValues[n]);
                        if (r) return r * d[n].descending * f
                    }
                    return h(t.tieBreaker, e.tieBreaker) * f
                }

                if (null == t) return t;
                if (!n(t)) throw e("orderBy")("notarray", "Expected array but received: {0}", t);
                ir(r) || (r = [r]), 0 === r.length && (r = ["+"]);
                var d = i(r), f = o ? -1 : 1, h = k(l) ? l : s, p = Array.prototype.map.call(t, c);
                return p.sort(u), t = p.map(function (t) {
                    return t.value
                })
            }
        }

        function di(t) {
            return k(t) && (t = {link: t}), t.restrict = t.restrict || "AC", m(t)
        }

        function fi(t, e) {
            t.$name = e
        }

        function hi(t, e, n, r, o) {
            var a = this, s = [];
            a.$error = {}, a.$$success = {}, a.$pending = void 0, a.$name = o(e.name || e.ngForm || "")(n), a.$dirty = !1, a.$pristine = !0, a.$valid = !0, a.$invalid = !1, a.$submitted = !1, a.$$parentForm = oa, a.$rollbackViewValue = function () {
                i(s, function (t) {
                    t.$rollbackViewValue()
                })
            }, a.$commitViewValue = function () {
                i(s, function (t) {
                    t.$commitViewValue()
                })
            }, a.$addControl = function (t) {
                ft(t.$name, "input"), s.push(t), t.$name && (a[t.$name] = t), t.$$parentForm = a
            }, a.$$renameControl = function (t, e) {
                var n = t.$name;
                a[n] === t && delete a[n], a[e] = t, t.$name = e
            }, a.$removeControl = function (t) {
                t.$name && a[t.$name] === t && delete a[t.$name], i(a.$pending, function (e, n) {
                    a.$setValidity(n, null, t)
                }), i(a.$error, function (e, n) {
                    a.$setValidity(n, null, t)
                }), i(a.$$success, function (e, n) {
                    a.$setValidity(n, null, t)
                }), I(s, t), t.$$parentForm = oa
            }, Li({
                ctrl: this, $element: t, set: function (t, e, n) {
                    var i = t[e];
                    if (i) {
                        var r = i.indexOf(n);
                        r === -1 && i.push(n)
                    } else t[e] = [n]
                }, unset: function (t, e, n) {
                    var i = t[e];
                    i && (I(i, n), 0 === i.length && delete t[e])
                }, $animate: r
            }), a.$setDirty = function () {
                r.removeClass(t, Ba), r.addClass(t, Va), a.$dirty = !0, a.$pristine = !1, a.$$parentForm.$setDirty()
            }, a.$setPristine = function () {
                r.setClass(t, Ba, Va + " " + aa), a.$dirty = !1, a.$pristine = !0, a.$submitted = !1, i(s, function (t) {
                    t.$setPristine()
                })
            }, a.$setUntouched = function () {
                i(s, function (t) {
                    t.$setUntouched()
                })
            }, a.$setSubmitted = function () {
                r.addClass(t, aa), a.$submitted = !0, a.$$parentForm.$setSubmitted()
            }
        }

        function pi(t) {
            t.$formatters.push(function (e) {
                return t.$isEmpty(e) ? e : e.toString()
            })
        }

        function mi(t, e, n, i, r, o) {
            gi(t, e, n, i, r, o), pi(i)
        }

        function gi(t, e, n, i, r, o) {
            var a = zi(e[0].type);
            if (!r.android) {
                var s = !1;
                e.on("compositionstart", function () {
                    s = !0
                }), e.on("compositionend", function () {
                    s = !1, c()
                })
            }
            var l, c = function (t) {
                if (l && (o.defer.cancel(l), l = null), !s) {
                    var r = e.val(), c = t && t.type;
                    "password" === a || n.ngTrim && "false" === n.ngTrim || (r = or(r)), (i.$viewValue !== r || "" === r && i.$$hasNativeValidators) && i.$setViewValue(r, c)
                }
            };
            if (r.hasEvent("input")) e.on("input", c); else {
                var u = function (t, e, n) {
                    l || (l = o.defer(function () {
                        l = null, e && e.value === n || c(t)
                    }))
                };
                e.on("keydown", function (t) {
                    var e = t.keyCode;
                    91 === e || 15 < e && e < 19 || 37 <= e && e <= 40 || u(t, this, this.value)
                }), r.hasEvent("paste") && e.on("paste cut", u)
            }
            e.on("change", c), wa[a] && i.$$hasNativeValidators && a === n.type && e.on($a, function (t) {
                if (!l) {
                    var e = this[Ii], n = e.badInput, i = e.typeMismatch;
                    l = o.defer(function () {
                        l = null, e.badInput === n && e.typeMismatch === i || c(t)
                    })
                }
            }), i.$render = function () {
                var t = i.$isEmpty(i.$viewValue) ? "" : i.$viewValue;
                e.val() !== t && e.val(t)
            }
        }

        function vi(t, e) {
            if (C(t)) return t;
            if (b(t)) {
                ga.lastIndex = 0;
                var n = ga.exec(t);
                if (n) {
                    var i = +n[1], r = +n[2], o = 0, a = 0, s = 0, l = 0, c = ti(i), u = 7 * (r - 1);
                    return e && (o = e.getHours(), a = e.getMinutes(), s = e.getSeconds(), l = e.getMilliseconds()), new Date(i, 0, c.getDate() + u, o, a, s, l)
                }
            }
            return NaN
        }

        function yi(t, e) {
            return function (n, r) {
                var o, a;
                if (C(n)) return n;
                if (b(n)) {
                    if ('"' === n.charAt(0) && '"' === n.charAt(n.length - 1) && (n = n.substring(1, n.length - 1)), ua.test(n)) return new Date(n);
                    if (t.lastIndex = 0, o = t.exec(n)) return o.shift(), a = r ? {
                        yyyy: r.getFullYear(),
                        MM: r.getMonth() + 1,
                        dd: r.getDate(),
                        HH: r.getHours(),
                        mm: r.getMinutes(),
                        ss: r.getSeconds(),
                        sss: r.getMilliseconds() / 1e3
                    } : {yyyy: 1970, MM: 1, dd: 1, HH: 0, mm: 0, ss: 0, sss: 0}, i(o, function (t, n) {
                        n < e.length && (a[e[n]] = +t)
                    }), new Date(a.yyyy, a.MM - 1, a.dd, a.HH, a.mm, a.ss || 0, 1e3 * a.sss || 0)
                }
                return NaN
            }
        }

        function $i(t, e, n, i) {
            return function (r, o, a, s, l, c, u) {
                function d(t) {
                    return t && !(t.getTime && t.getTime() !== t.getTime())
                }

                function f(t) {
                    return y(t) && !C(t) ? n(t) || void 0 : t
                }

                wi(r, o, a, s), gi(r, o, a, s, l, c);
                var h, p = s && s.$options && s.$options.timezone;
                if (s.$$parserName = t, s.$parsers.push(function (t) {
                    if (s.$isEmpty(t)) return null;
                    if (e.test(t)) {
                        var i = n(t, h);
                        return p && (i = Q(i, p)), i
                    }
                }), s.$formatters.push(function (t) {
                    if (t && !C(t)) throw Ka("datefmt", "Expected `{0}` to be a date", t);
                    return d(t) ? (h = t, h && p && (h = Q(h, p, !0)), u("date")(t, i, p)) : (h = null, "")
                }), y(a.min) || a.ngMin) {
                    var m;
                    s.$validators.min = function (t) {
                        return !d(t) || v(m) || n(t) >= m
                    }, a.$observe("min", function (t) {
                        m = f(t), s.$validate()
                    })
                }
                if (y(a.max) || a.ngMax) {
                    var g;
                    s.$validators.max = function (t) {
                        return !d(t) || v(g) || n(t) <= g
                    }, a.$observe("max", function (t) {
                        g = f(t), s.$validate()
                    })
                }
            }
        }

        function wi(t, e, n, i) {
            var r = e[0], o = i.$$hasNativeValidators = $(r.validity);
            o && i.$parsers.push(function (t) {
                var n = e.prop(Ii) || {};
                return n.badInput || n.typeMismatch ? void 0 : t
            })
        }

        function bi(t) {
            t.$$parserName = "number", t.$parsers.push(function (e) {
                return t.$isEmpty(e) ? null : ha.test(e) ? parseFloat(e) : void 0
            }), t.$formatters.push(function (e) {
                if (!t.$isEmpty(e)) {
                    if (!x(e)) throw Ka("numfmt", "Expected `{0}` to be a number", e);
                    e = e.toString()
                }
                return e
            })
        }

        function xi(t) {
            return y(t) && !x(t) && (t = parseFloat(t)), nr(t) ? void 0 : t
        }

        function Ci(t) {
            return (0 | t) === t
        }

        function ki(t) {
            var e = t.toString(), n = e.indexOf(".");
            if (n === -1) {
                if (-1 < t && t < 1) {
                    var i = /e-(\d+)$/.exec(e);
                    if (i) return Number(i[1])
                }
                return 0
            }
            return e.length - n - 1
        }

        function Si(t, e, n) {
            var i = Number(t);
            if (!Ci(i) || !Ci(e) || !Ci(n)) {
                var r = Math.max(ki(i), ki(e), ki(n)), o = Math.pow(10, r);
                i *= o, e *= o, n *= o
            }
            return (i - e) % n === 0
        }

        function _i(t, e, n, i, r, o) {
            wi(t, e, n, i), gi(t, e, n, i, r, o), bi(i);
            var a, s;
            (y(n.min) || n.ngMin) && (i.$validators.min = function (t) {
                return i.$isEmpty(t) || v(a) || t >= a
            }, n.$observe("min", function (t) {
                a = xi(t), i.$validate()
            })), (y(n.max) || n.ngMax) && (i.$validators.max = function (t) {
                return i.$isEmpty(t) || v(s) || t <= s
            }, n.$observe("max", function (t) {
                s = xi(t), i.$validate()
            }))
        }

        function Ei(t, e, n, i, r, o) {
            function a(t, i) {
                e.attr(t, n[t]), n.$observe(t, i)
            }

            function s(t) {
                if (d = xi(t), !nr(i.$modelValue)) if (u) {
                    var n = e.val();
                    d > n && (n = d, e.val(n)), i.$setViewValue(n)
                } else i.$validate()
            }

            function l(t) {
                if (f = xi(t), !nr(i.$modelValue)) if (u) {
                    var n = e.val();
                    f < n && (e.val(f), n = f < d ? d : f), i.$setViewValue(n)
                } else i.$validate()
            }

            function c(t) {
                h = xi(t), nr(i.$modelValue) || (u && i.$viewValue !== e.val() ? i.$setViewValue(e.val()) : i.$validate())
            }

            wi(t, e, n, i), bi(i), gi(t, e, n, i, r, o);
            var u = i.$$hasNativeValidators && "range" === e[0].type, d = u ? 0 : void 0, f = u ? 100 : void 0,
                h = u ? 1 : void 0, p = e[0].validity, m = y(n.min), g = y(n.max), $ = y(n.step), w = i.$render;
            i.$render = u && y(p.rangeUnderflow) && y(p.rangeOverflow) ? function () {
                w(), i.$setViewValue(e.val())
            } : w, m && (i.$validators.min = u ? function () {
                return !0
            } : function (t, e) {
                return i.$isEmpty(e) || v(d) || e >= d
            }, a("min", s)), g && (i.$validators.max = u ? function () {
                return !0
            } : function (t, e) {
                return i.$isEmpty(e) || v(f) || e <= f
            }, a("max", l)), $ && (i.$validators.step = u ? function () {
                return !p.stepMismatch
            } : function (t, e) {
                return i.$isEmpty(e) || v(h) || Si(e, d || 0, h)
            }, a("step", c))
        }

        function Ti(t, e, n, i, r, o) {
            gi(t, e, n, i, r, o), pi(i), i.$$parserName = "url", i.$validators.url = function (t, e) {
                var n = t || e;
                return i.$isEmpty(n) || da.test(n)
            }
        }

        function Ai(t, e, n, i, r, o) {
            gi(t, e, n, i, r, o), pi(i), i.$$parserName = "email", i.$validators.email = function (t, e) {
                var n = t || e;
                return i.$isEmpty(n) || fa.test(n)
            }
        }

        function Oi(t, e, n, i) {
            v(n.name) && e.attr("name", a());
            var r = function (t) {
                e[0].checked && i.$setViewValue(n.value, t && t.type)
            };
            e.on("click", r), i.$render = function () {
                var t = n.value;
                e[0].checked = t == i.$viewValue
            }, n.$observe("value", i.$render)
        }

        function Di(t, e, n, i, r) {
            var o;
            if (y(i)) {
                if (o = t(i), !o.constant) throw Ka("constexpr", "Expected constant expression for `{0}`, but saw `{1}`.", n, i);
                return o(e)
            }
            return r
        }

        function Pi(t, e, n, i, r, o, a, s) {
            var l = Di(s, t, "ngTrueValue", n.ngTrueValue, !0), c = Di(s, t, "ngFalseValue", n.ngFalseValue, !1),
                u = function (t) {
                    i.$setViewValue(e[0].checked, t && t.type)
                };
            e.on("click", u), i.$render = function () {
                e[0].checked = i.$viewValue
            }, i.$isEmpty = function (t) {
                return t === !1
            }, i.$formatters.push(function (t) {
                return z(t, l)
            }), i.$parsers.push(function (t) {
                return t ? l : c
            })
        }

        function Mi(t, e) {
            return t = "ngClass" + t, ["$animate", function (n) {
                function r(t, e) {
                    var n = [];
                    t:for (var i = 0; i < t.length; i++) {
                        for (var r = t[i], o = 0; o < e.length; o++) if (r === e[o]) continue t;
                        n.push(r)
                    }
                    return n
                }

                function o(t) {
                    var e = [];
                    return ir(t) ? (i(t, function (t) {
                        e = e.concat(o(t))
                    }), e) : b(t) ? t.split(" ") : $(t) ? (i(t, function (t, n) {
                        t && (e = e.concat(n.split(" ")))
                    }), e) : t
                }

                return {
                    restrict: "AC", link: function (a, s, l) {
                        function c(t) {
                            var e = d(t, 1);
                            l.$addClass(e)
                        }

                        function u(t) {
                            var e = d(t, -1);
                            l.$removeClass(e)
                        }

                        function d(t, e) {
                            var n = s.data("$classCounts") || mt(), r = [];
                            return i(t, function (t) {
                                (e > 0 || n[t]) && (n[t] = (n[t] || 0) + e, n[t] === +(e > 0) && r.push(t))
                            }), s.data("$classCounts", n), r.join(" ")
                        }

                        function f(t, e) {
                            var i = r(e, t), o = r(t, e);
                            i = d(i, 1), o = d(o, -1), i && i.length && n.addClass(s, i), o && o.length && n.removeClass(s, o)
                        }

                        function h(t) {
                            if (e === !0 || (1 & a.$index) === e) {
                                var n = o(t || []);
                                if (p) {
                                    if (!z(t, p)) {
                                        var i = o(p);
                                        f(i, n)
                                    }
                                } else c(n)
                            }
                            p = ir(t) ? t.map(function (t) {
                                return vt(t)
                            }) : vt(t)
                        }

                        var p;
                        l.$observe("class", function (e) {
                            h(a.$eval(l[t]))
                        }), "ngClass" !== t && a.$watch("$index", function (t, n) {
                            var i = 1 & t;
                            if (i !== (1 & n)) {
                                var r = o(p);
                                i === e ? c(r) : u(r)
                            }
                        }), a.$watch(l[t], h, !0)
                    }
                }
            }]
        }

        function Li(t) {
            function e(t, e, s) {
                v(e) ? n("$pending", t, s) : i("$pending", t, s), D(e) ? e ? (u(a.$error, t, s), c(a.$$success, t, s)) : (c(a.$error, t, s), u(a.$$success, t, s)) : (u(a.$error, t, s), u(a.$$success, t, s)), a.$pending ? (r(Ga, !0), a.$valid = a.$invalid = void 0, o("", null)) : (r(Ga, !1), a.$valid = ji(a.$error), a.$invalid = !a.$valid, o("", a.$valid));
                var l;
                l = a.$pending && a.$pending[t] ? void 0 : !a.$error[t] && (!!a.$$success[t] || null), o(t, l), a.$$parentForm.$setValidity(t, l, a)
            }

            function n(t, e, n) {
                a[t] || (a[t] = {}), c(a[t], e, n)
            }

            function i(t, e, n) {
                a[t] && u(a[t], e, n), ji(a[t]) && (a[t] = void 0)
            }

            function r(t, e) {
                e && !l[t] ? (d.addClass(s, t), l[t] = !0) : !e && l[t] && (d.removeClass(s, t), l[t] = !1)
            }

            function o(t, e) {
                t = t ? "-" + lt(t, "-") : "", r(qa + t, e === !0), r(Ha + t, e === !1)
            }

            var a = t.ctrl, s = t.$element, l = {}, c = t.set, u = t.unset, d = t.$animate;
            l[Ha] = !(l[qa] = s.hasClass(qa)), a.$setValidity = e
        }

        function ji(t) {
            if (t) for (var e in t) if (t.hasOwnProperty(e)) return !1;
            return !0
        }

        function Ni(t) {
            t[0].hasAttribute("selected") && (t[0].selected = !0)
        }

        var Fi = /^\/(.+)\/([a-z]*)$/, Ii = "validity", Ri = Object.prototype.hasOwnProperty, zi = function (t) {
            return b(t) ? t.toLowerCase() : t
        }, qi = function (t) {
            return b(t) ? t.toUpperCase() : t
        }, Hi = function (t) {
            return b(t) ? t.replace(/[A-Z]/g, function (t) {
                return String.fromCharCode(32 | t.charCodeAt(0))
            }) : t
        }, Bi = function (t) {
            return b(t) ? t.replace(/[a-z]/g, function (t) {
                return String.fromCharCode(t.charCodeAt(0) & -33)
            }) : t
        };
        "i" !== "I".toLowerCase() && (zi = Hi, qi = Bi);
        var Vi, Wi, Ui, Gi, Yi = [].slice, Qi = [].splice, Ki = [].push, Xi = Object.prototype.toString,
            Zi = Object.getPrototypeOf, Ji = e("ng"), tr = t.angular || (t.angular = {}), er = 0;
        Vi = t.document.documentMode;
        var nr = Number.isNaN || function (t) {
            return t !== t
        };
        h.$inject = [], p.$inject = [];
        var ir = Array.isArray,
            rr = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array]$/,
            or = function (t) {
                return b(t) ? t.trim() : t
            }, ar = function (t) {
                return t.replace(/([-()[\]{}+?*.$^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
            }, sr = function () {
                function e() {
                    try {
                        return new Function(""), !1
                    } catch (t) {
                        return !0
                    }
                }

                if (!y(sr.rules)) {
                    var n = t.document.querySelector("[ng-csp]") || t.document.querySelector("[data-ng-csp]");
                    if (n) {
                        var i = n.getAttribute("ng-csp") || n.getAttribute("data-ng-csp");
                        sr.rules = {
                            noUnsafeEval: !i || i.indexOf("no-unsafe-eval") !== -1,
                            noInlineStyle: !i || i.indexOf("no-inline-style") !== -1
                        }
                    } else sr.rules = {noUnsafeEval: e(), noInlineStyle: !1}
                }
                return sr.rules
            }, lr = function () {
                if (y(lr.name_)) return lr.name_;
                var e, n, i, r, o = ur.length;
                for (n = 0; n < o; ++n) if (i = ur[n], e = t.document.querySelector("[" + i.replace(":", "\\:") + "jq]")) {
                    r = e.getAttribute(i + "jq");
                    break
                }
                return lr.name_ = r
            }, cr = /:/g, ur = ["ng-", "data-ng-", "ng:", "x-ng-"], dr = it(t.document), fr = /[A-Z]/g, hr = !1, pr = 1,
            mr = 2,
            gr = 3, vr = 8, yr = 9, $r = 11,
            wr = {full: "1.5.10", major: 1, minor: 5, dot: 10, codeName: "asynchronous-synchronization"};
        Ot.expando = "ng339";
        var br = Ot.cache = {}, xr = 1, Cr = function (t, e, n) {
            t.addEventListener(e, n, !1)
        }, kr = function (t, e, n) {
            t.removeEventListener(e, n, !1)
        };
        Ot._data = function (t) {
            return this.cache[t[this.expando]] || {}
        };
        var Sr = /([:\-_]+(.))/g, _r = /^moz([A-Z])/, Er = {mouseleave: "mouseout", mouseenter: "mouseover"},
            Tr = e("jqLite"), Ar = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, Or = /<|&#?\w+;/, Dr = /<([\w:-]+)/,
            Pr = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, Mr = {
                option: [1, '<select multiple="multiple">', "</select>"],
                thead: [1, "<table>", "</table>"],
                col: [2, "<table><colgroup>", "</colgroup></table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: [0, "", ""]
            };
        Mr.optgroup = Mr.option, Mr.tbody = Mr.tfoot = Mr.colgroup = Mr.caption = Mr.thead, Mr.th = Mr.td;
        var Lr = t.Node.prototype.contains || function (t) {
            return !!(16 & this.compareDocumentPosition(t))
        }, jr = Ot.prototype = {
            ready: function (e) {
                function n() {
                    i || (i = !0, e())
                }

                var i = !1;
                "complete" === t.document.readyState ? t.setTimeout(n) : (this.on("DOMContentLoaded", n), Ot(t).on("load", n))
            }, toString: function () {
                var t = [];
                return i(this, function (e) {
                    t.push("" + e)
                }), "[" + t.join(", ") + "]"
            }, eq: function (t) {
                return Wi(t >= 0 ? this[t] : this[this.length + t])
            }, length: 0, push: Ki, sort: [].sort, splice: [].splice
        }, Nr = {};
        i("multiple,selected,checked,disabled,readOnly,required,open".split(","), function (t) {
            Nr[zi(t)] = t
        });
        var Fr = {};
        i("input,select,option,textarea,button,form,details".split(","), function (t) {
            Fr[t] = !0
        });
        var Ir = {ngMinlength: "minlength", ngMaxlength: "maxlength", ngMin: "min", ngMax: "max", ngPattern: "pattern"};
        i({data: Nt, removeData: Lt, hasData: St, cleanData: _t}, function (t, e) {
            Ot[e] = t
        }), i({
            data: Nt, inheritedData: Ht, scope: function (t) {
                return Wi.data(t, "$scope") || Ht(t.parentNode || t, ["$isolateScope", "$scope"])
            }, isolateScope: function (t) {
                return Wi.data(t, "$isolateScope") || Wi.data(t, "$isolateScopeNoTemplate")
            }, controller: qt, injector: function (t) {
                return Ht(t, "$injector")
            }, removeAttr: function (t, e) {
                t.removeAttribute(e)
            }, hasClass: Ft, css: function (t, e, n) {
                return e = xt(e), y(n) ? void (t.style[e] = n) : t.style[e]
            }, attr: function (t, e, n) {
                var i = t.nodeType;
                if (i !== gr && i !== mr && i !== vr) {
                    var r = zi(e);
                    if (Nr[r]) {
                        if (!y(n)) return t[e] || (t.attributes.getNamedItem(e) || h).specified ? r : void 0;
                        n ? (t[e] = !0, t.setAttribute(e, r)) : (t[e] = !1, t.removeAttribute(r))
                    } else if (y(n)) t.setAttribute(e, n); else if (t.getAttribute) {
                        var o = t.getAttribute(e, 2);
                        return null === o ? void 0 : o
                    }
                }
            }, prop: function (t, e, n) {
                return y(n) ? void (t[e] = n) : t[e]
            }, text: function () {
                function t(t, e) {
                    if (v(e)) {
                        var n = t.nodeType;
                        return n === pr || n === gr ? t.textContent : ""
                    }
                    t.textContent = e
                }

                return t.$dv = "", t
            }(), val: function (t, e) {
                if (v(e)) {
                    if (t.multiple && "select" === F(t)) {
                        var n = [];
                        return i(t.options, function (t) {
                            t.selected && n.push(t.value || t.text)
                        }), 0 === n.length ? null : n
                    }
                    return t.value
                }
                t.value = e
            }, html: function (t, e) {
                return v(e) ? t.innerHTML : (Pt(t, !0), void (t.innerHTML = e))
            }, empty: Bt
        }, function (t, e) {
            Ot.prototype[e] = function (e, n) {
                var i, r, o = this.length;
                if (t !== Bt && v(2 === t.length && t !== Ft && t !== qt ? e : n)) {
                    if ($(e)) {
                        for (i = 0; i < o; i++) if (t === Nt) t(this[i], e); else for (r in e) t(this[i], r, e[r]);
                        return this
                    }
                    for (var a = t.$dv, s = v(a) ? Math.min(o, 1) : o, l = 0; l < s; l++) {
                        var c = t(this[l], e, n);
                        a = a ? a + c : c
                    }
                    return a
                }
                for (i = 0; i < o; i++) t(this[i], e, n);
                return this
            }
        }), i({
            removeData: Lt, on: function (t, e, n, i) {
                if (y(i)) throw Tr("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
                if (kt(t)) {
                    var r = jt(t, !0), o = r.events, a = r.handle;
                    a || (a = r.handle = Yt(t, o));
                    for (var s = e.indexOf(" ") >= 0 ? e.split(" ") : [e], l = s.length, c = function (e, i, r) {
                        var s = o[e];
                        s || (s = o[e] = [], s.specialHandlerWrapper = i, "$destroy" === e || r || Cr(t, e, a)), s.push(n)
                    }; l--;) e = s[l], Er[e] ? (c(Er[e], Kt), c(e, void 0, !0)) : c(e)
                }
            }, off: Mt, one: function (t, e, n) {
                t = Wi(t), t.on(e, function i() {
                    t.off(e, n), t.off(e, i)
                }), t.on(e, n)
            }, replaceWith: function (t, e) {
                var n, r = t.parentNode;
                Pt(t), i(new Ot(e), function (e) {
                    n ? r.insertBefore(e, n.nextSibling) : r.replaceChild(e, t), n = e
                })
            }, children: function (t) {
                var e = [];
                return i(t.childNodes, function (t) {
                    t.nodeType === pr && e.push(t)
                }), e
            }, contents: function (t) {
                return t.contentDocument || t.childNodes || []
            }, append: function (t, e) {
                var n = t.nodeType;
                if (n === pr || n === $r) {
                    e = new Ot(e);
                    for (var i = 0, r = e.length; i < r; i++) {
                        var o = e[i];
                        t.appendChild(o)
                    }
                }
            }, prepend: function (t, e) {
                if (t.nodeType === pr) {
                    var n = t.firstChild;
                    i(new Ot(e), function (e) {
                        t.insertBefore(e, n)
                    })
                }
            }, wrap: function (t, e) {
                At(t, Wi(e).eq(0).clone()[0])
            }, remove: Vt, detach: function (t) {
                Vt(t, !0)
            }, after: function (t, e) {
                var n = t, i = t.parentNode;
                if (i) {
                    e = new Ot(e);
                    for (var r = 0, o = e.length; r < o; r++) {
                        var a = e[r];
                        i.insertBefore(a, n.nextSibling), n = a
                    }
                }
            }, addClass: Rt, removeClass: It, toggleClass: function (t, e, n) {
                e && i(e.split(" "), function (e) {
                    var i = n;
                    v(i) && (i = !Ft(t, e)), (i ? Rt : It)(t, e)
                })
            }, parent: function (t) {
                var e = t.parentNode;
                return e && e.nodeType !== $r ? e : null
            }, next: function (t) {
                return t.nextElementSibling
            }, find: function (t, e) {
                return t.getElementsByTagName ? t.getElementsByTagName(e) : []
            }, clone: Dt, triggerHandler: function (t, e, n) {
                var r, o, a, s = e.type || e, l = jt(t), u = l && l.events, d = u && u[s];
                d && (r = {
                    preventDefault: function () {
                        this.defaultPrevented = !0
                    }, isDefaultPrevented: function () {
                        return this.defaultPrevented === !0
                    }, stopImmediatePropagation: function () {
                        this.immediatePropagationStopped = !0
                    }, isImmediatePropagationStopped: function () {
                        return this.immediatePropagationStopped === !0
                    }, stopPropagation: h, type: s, target: t
                }, e.type && (r = c(r, e)), o = vt(d), a = n ? [r].concat(n) : [r], i(o, function (e) {
                    r.isImmediatePropagationStopped() || e.apply(t, a)
                }))
            }
        }, function (t, e) {
            Ot.prototype[e] = function (e, n, i) {
                for (var r, o = 0, a = this.length; o < a; o++) v(r) ? (r = t(this[o], e, n, i), y(r) && (r = Wi(r))) : zt(r, t(this[o], e, n, i));
                return y(r) ? r : this
            }
        }), Ot.prototype.bind = Ot.prototype.on, Ot.prototype.unbind = Ot.prototype.off, Jt.prototype = {
            put: function (t, e) {
                this[Zt(t, this.nextUid)] = e
            }, get: function (t) {
                return this[Zt(t, this.nextUid)]
            }, remove: function (t) {
                var e = this[t = Zt(t, this.nextUid)];
                return delete this[t], e
            }
        };
        var Rr = [function () {
                this.$get = [function () {
                    return Jt
                }]
            }], zr = /^([^(]+?)=>/, qr = /^[^(]*\(\s*([^)]*)\)/m, Hr = /,/, Br = /^\s*(_?)(\S+?)\1\s*$/,
            Vr = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm, Wr = e("$injector");
        re.$$annotate = ie;
        var Ur = e("$animate"), Gr = 1, Yr = "ng-animate", Qr = function () {
            this.$get = h
        }, Kr = function () {
            var t = new Jt, e = [];
            this.$get = ["$$AnimateRunner", "$rootScope", function (n, r) {
                function o(t, e, n) {
                    var r = !1;
                    return e && (e = b(e) ? e.split(" ") : ir(e) ? e : [], i(e, function (e) {
                        e && (r = !0, t[e] = n)
                    })), r
                }

                function a() {
                    i(e, function (e) {
                        var n = t.get(e);
                        if (n) {
                            var r = le(e.attr("class")), o = "", a = "";
                            i(n, function (t, e) {
                                var n = !!r[e];
                                t !== n && (t ? o += (o.length ? " " : "") + e : a += (a.length ? " " : "") + e)
                            }), i(e, function (t) {
                                o && Rt(t, o), a && It(t, a)
                            }), t.remove(e)
                        }
                    }), e.length = 0
                }

                function s(n, i, s) {
                    var l = t.get(n) || {}, c = o(l, i, !0), u = o(l, s, !1);
                    (c || u) && (t.put(n, l), e.push(n), 1 === e.length && r.$$postDigest(a))
                }

                return {
                    enabled: h, on: h, off: h, pin: h, push: function (t, e, i, r) {
                        r && r(), i = i || {}, i.from && t.css(i.from), i.to && t.css(i.to), (i.addClass || i.removeClass) && s(t, i.addClass, i.removeClass);
                        var o = new n;
                        return o.complete(), o
                    }
                }
            }]
        }, Xr = ["$provide", function (t) {
            var e = this;
            this.$$registeredAnimations = Object.create(null), this.register = function (n, i) {
                if (n && "." !== n.charAt(0)) throw Ur("notcsel", "Expecting class selector starting with '.' got '{0}'.", n);
                var r = n + "-animation";
                e.$$registeredAnimations[n.substr(1)] = r, t.factory(r, i)
            }, this.classNameFilter = function (t) {
                if (1 === arguments.length && (this.$$classNameFilter = t instanceof RegExp ? t : null, this.$$classNameFilter)) {
                    var e = new RegExp("(\\s+|\\/)" + Yr + "(\\s+|\\/)");
                    if (e.test(this.$$classNameFilter.toString())) throw Ur("nongcls", '$animateProvider.classNameFilter(regex) prohibits accepting a regex value which matches/contains the "{0}" CSS class.', Yr)
                }
                return this.$$classNameFilter
            }, this.$get = ["$$animateQueue", function (t) {
                function e(t, e, n) {
                    if (n) {
                        var i = se(n);
                        !i || i.parentNode || i.previousElementSibling || (n = null)
                    }
                    n ? n.after(t) : e.prepend(t)
                }

                return {
                    on: t.on, off: t.off, pin: t.pin, enabled: t.enabled, cancel: function (t) {
                        t.end && t.end()
                    }, enter: function (n, i, r, o) {
                        return i = i && Wi(i), r = r && Wi(r), i = i || r.parent(), e(n, i, r), t.push(n, "enter", ce(o))
                    }, move: function (n, i, r, o) {
                        return i = i && Wi(i), r = r && Wi(r), i = i || r.parent(), e(n, i, r), t.push(n, "move", ce(o))
                    }, leave: function (e, n) {
                        return t.push(e, "leave", ce(n), function () {
                            e.remove()
                        })
                    }, addClass: function (e, n, i) {
                        return i = ce(i), i.addClass = ae(i.addclass, n), t.push(e, "addClass", i)
                    }, removeClass: function (e, n, i) {
                        return i = ce(i), i.removeClass = ae(i.removeClass, n), t.push(e, "removeClass", i)
                    }, setClass: function (e, n, i, r) {
                        return r = ce(r), r.addClass = ae(r.addClass, n), r.removeClass = ae(r.removeClass, i), t.push(e, "setClass", r)
                    }, animate: function (e, n, i, r, o) {
                        return o = ce(o), o.from = o.from ? c(o.from, n) : n, o.to = o.to ? c(o.to, i) : i, r = r || "ng-inline-animate", o.tempClasses = ae(o.tempClasses, r), t.push(e, "animate", o)
                    }
                }
            }]
        }], Zr = function () {
            this.$get = ["$$rAF", function (t) {
                function e(e) {
                    n.push(e), n.length > 1 || t(function () {
                        for (var t = 0; t < n.length; t++) n[t]();
                        n = []
                    })
                }

                var n = [];
                return function () {
                    var t = !1;
                    return e(function () {
                        t = !0
                    }), function (n) {
                        t ? n() : e(n)
                    }
                }
            }]
        }, Jr = function () {
            this.$get = ["$q", "$sniffer", "$$animateAsyncRun", "$document", "$timeout", function (t, e, n, r, o) {
                function a(t) {
                    this.setHost(t);
                    var e = n(), i = function (t) {
                        o(t, 0, !1)
                    };
                    this._doneCallbacks = [], this._tick = function (t) {
                        var n = r[0];
                        n && n.hidden ? i(t) : e(t)
                    }, this._state = 0
                }

                var s = 0, l = 1, c = 2;
                return a.chain = function (t, e) {
                    function n() {
                        return i === t.length ? void e(!0) : void t[i](function (t) {
                            return t === !1 ? void e(!1) : (i++, void n())
                        })
                    }

                    var i = 0;
                    n()
                }, a.all = function (t, e) {
                    function n(n) {
                        o = o && n, ++r === t.length && e(o)
                    }

                    var r = 0, o = !0;
                    i(t, function (t) {
                        t.done(n)
                    })
                }, a.prototype = {
                    setHost: function (t) {
                        this.host = t || {}
                    }, done: function (t) {
                        this._state === c ? t() : this._doneCallbacks.push(t)
                    }, progress: h, getPromise: function () {
                        if (!this.promise) {
                            var e = this;
                            this.promise = t(function (t, n) {
                                e.done(function (e) {
                                    e === !1 ? n() : t()
                                })
                            })
                        }
                        return this.promise
                    }, then: function (t, e) {
                        return this.getPromise().then(t, e)
                    }, "catch": function (t) {
                        return this.getPromise()["catch"](t)
                    }, "finally": function (t) {
                        return this.getPromise()["finally"](t)
                    }, pause: function () {
                        this.host.pause && this.host.pause()
                    }, resume: function () {
                        this.host.resume && this.host.resume()
                    }, end: function () {
                        this.host.end && this.host.end(), this._resolve(!0)
                    }, cancel: function () {
                        this.host.cancel && this.host.cancel(), this._resolve(!1)
                    }, complete: function (t) {
                        var e = this;
                        e._state === s && (e._state = l, e._tick(function () {
                            e._resolve(t)
                        }))
                    }, _resolve: function (t) {
                        this._state !== c && (i(this._doneCallbacks, function (e) {
                            e(t)
                        }), this._doneCallbacks.length = 0, this._state = c)
                    }
                }, a
            }]
        }, to = function () {
            this.$get = ["$$rAF", "$q", "$$AnimateRunner", function (t, e, n) {
                return function (e, i) {
                    function r() {
                        return t(function () {
                            o(), s || l.complete(), s = !0
                        }), l
                    }

                    function o() {
                        a.addClass && (e.addClass(a.addClass), a.addClass = null), a.removeClass && (e.removeClass(a.removeClass), a.removeClass = null), a.to && (e.css(a.to), a.to = null)
                    }

                    var a = i || {};
                    a.$$prepared || (a = R(a)), a.cleanupStyles && (a.from = a.to = null), a.from && (e.css(a.from), a.from = null);
                    var s, l = new n;
                    return {start: r, end: r}
                }
            }]
        }, eo = e("$compile"), no = new pe;
        me.$inject = ["$provide", "$$sanitizeUriProvider"], ge.prototype.isFirstChange = function () {
            return this.previousValue === no
        };
        var io = /^((?:x|data)[:\-_])/i, ro = e("$controller"), oo = /^(\S+)(\s+as\s+([\w$]+))?$/, ao = function () {
                this.$get = ["$document", function (t) {
                    return function (e) {
                        return e ? !e.nodeType && e instanceof Wi && (e = e[0]) : e = t[0].body, e.offsetWidth + 1
                    }
                }]
            }, so = "application/json", lo = {"Content-Type": so + ";charset=utf-8"}, co = /^\[|^\{(?!\{)/,
            uo = {"[": /]$/, "{": /}$/}, fo = /^\)]\}',?\n/, ho = e("$http"), po = function (t) {
                return function () {
                    throw ho("legacy", "The method `{0}` on the promise returned from `$http` has been disabled.", t)
                }
            }, mo = tr.$interpolateMinErr = e("$interpolate");
        mo.throwNoconcat = function (t) {
            throw mo("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", t)
        }, mo.interr = function (t, e) {
            return mo("interr", "Can't interpolate: {0}\n{1}", t, e.toString())
        };
        var go = function () {
                this.$get = ["$window", function (t) {
                    function e(t) {
                        var e = function (t) {
                            e.data = t, e.called = !0
                        };
                        return e.id = t, e
                    }

                    var n = t.angular.callbacks, i = {};
                    return {
                        createCallback: function (t) {
                            var r = "_" + (n.$$counter++).toString(36), o = "angular.callbacks." + r, a = e(r);
                            return i[o] = n[r] = a, o
                        }, wasCalled: function (t) {
                            return i[t].called
                        }, getResponse: function (t) {
                            return i[t].data
                        }, removeCallback: function (t) {
                            var e = i[t];
                            delete n[e.id], delete i[t]
                        }
                    }
                }]
            }, vo = /^([^?#]*)(\?([^#]*))?(#(.*))?$/, yo = {http: 80, https: 443, ftp: 21}, $o = e("$location"),
            wo = /^\s*[\\\/]{2,}/, bo = {
                $$absUrl: "", $$html5: !1, $$replace: !1, absUrl: Xe("$$absUrl"), url: function (t) {
                    if (v(t)) return this.$$url;
                    var e = vo.exec(t);
                    return (e[1] || "" === t) && this.path(decodeURIComponent(e[1])), (e[2] || e[1] || "" === t) && this.search(e[3] || ""), this.hash(e[5] || ""), this
                }, protocol: Xe("$$protocol"), host: Xe("$$host"), port: Xe("$$port"), path: Ze("$$path", function (t) {
                    return t = null !== t ? t.toString() : "", "/" === t.charAt(0) ? t : "/" + t
                }), search: function (t, e) {
                    switch (arguments.length) {
                        case 0:
                            return this.$$search;
                        case 1:
                            if (b(t) || x(t)) t = t.toString(), this.$$search = Z(t); else {
                                if (!$(t)) throw $o("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
                                t = R(t, {}), i(t, function (e, n) {
                                    null == e && delete t[n]
                                }), this.$$search = t
                            }
                            break;
                        default:
                            v(e) || null === e ? delete this.$$search[t] : this.$$search[t] = e
                    }
                    return this.$$compose(), this
                }, hash: Ze("$$hash", function (t) {
                    return null !== t ? t.toString() : ""
                }), replace: function () {
                    return this.$$replace = !0, this
                }
            };
        i([Ke, Qe, Ye], function (t) {
            t.prototype = Object.create(bo), t.prototype.state = function (e) {
                if (!arguments.length) return this.$$state;
                if (t !== Ye || !this.$$html5) throw $o("nostate", "History API state support is available only in HTML5 mode and only in browsers supporting HTML5 History API");
                return this.$$state = v(e) ? null : e, this
            }
        });
        var xo = e("$parse"), Co = [].constructor, ko = (!1).constructor, So = Function.constructor,
            _o = (0).constructor,
            Eo = {}.constructor, To = "".constructor, Ao = Co.prototype, Oo = ko.prototype, Do = So.prototype,
            Po = _o.prototype, Mo = Eo.prototype, Lo = To.prototype, jo = Do.call, No = Do.apply, Fo = Do.bind,
            Io = Mo.valueOf, Ro = mt();
        i("+ - * / % === !== == != < > <= >= && || ! = |".split(" "), function (t) {
            Ro[t] = !0
        });
        var zo = {n: "\n", f: "\f", r: "\r", t: "\t", v: "\x0B", "'": "'", '"': '"'}, qo = function (t) {
            this.options = t
        };
        qo.prototype = {
            constructor: qo, lex: function (t) {
                for (this.text = t, this.index = 0, this.tokens = []; this.index < this.text.length;) {
                    var e = this.text.charAt(this.index);
                    if ('"' === e || "'" === e) this.readString(e); else if (this.isNumber(e) || "." === e && this.isNumber(this.peek())) this.readNumber(); else if (this.isIdentifierStart(this.peekMultichar())) this.readIdent(); else if (this.is(e, "(){}[].,;:?")) this.tokens.push({
                        index: this.index,
                        text: e
                    }), this.index++; else if (this.isWhitespace(e)) this.index++; else {
                        var n = e + this.peek(), i = n + this.peek(2), r = Ro[e], o = Ro[n], a = Ro[i];
                        if (r || o || a) {
                            var s = a ? i : o ? n : e;
                            this.tokens.push({index: this.index, text: s, operator: !0}), this.index += s.length
                        } else this.throwError("Unexpected next character ", this.index, this.index + 1)
                    }
                }
                return this.tokens
            }, is: function (t, e) {
                return e.indexOf(t) !== -1
            }, peek: function (t) {
                var e = t || 1;
                return this.index + e < this.text.length && this.text.charAt(this.index + e)
            }, isNumber: function (t) {
                return "0" <= t && t <= "9" && "string" == typeof t
            }, isWhitespace: function (t) {
                return " " === t || "\r" === t || "\t" === t || "\n" === t || "\x0B" === t || " " === t
            }, isIdentifierStart: function (t) {
                return this.options.isIdentifierStart ? this.options.isIdentifierStart(t, this.codePointAt(t)) : this.isValidIdentifierStart(t)
            }, isValidIdentifierStart: function (t) {
                return "a" <= t && t <= "z" || "A" <= t && t <= "Z" || "_" === t || "$" === t
            }, isIdentifierContinue: function (t) {
                return this.options.isIdentifierContinue ? this.options.isIdentifierContinue(t, this.codePointAt(t)) : this.isValidIdentifierContinue(t)
            }, isValidIdentifierContinue: function (t, e) {
                return this.isValidIdentifierStart(t, e) || this.isNumber(t)
            }, codePointAt: function (t) {
                return 1 === t.length ? t.charCodeAt(0) : (t.charCodeAt(0) << 10) + t.charCodeAt(1) - 56613888
            }, peekMultichar: function () {
                var t = this.text.charAt(this.index), e = this.peek();
                if (!e) return t;
                var n = t.charCodeAt(0), i = e.charCodeAt(0);
                return n >= 55296 && n <= 56319 && i >= 56320 && i <= 57343 ? t + e : t
            }, isExpOperator: function (t) {
                return "-" === t || "+" === t || this.isNumber(t)
            }, throwError: function (t, e, n) {
                n = n || this.index;
                var i = y(e) ? "s " + e + "-" + this.index + " [" + this.text.substring(e, n) + "]" : " " + n;
                throw xo("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", t, i, this.text)
            }, readNumber: function () {
                for (var t = "", e = this.index; this.index < this.text.length;) {
                    var n = zi(this.text.charAt(this.index));
                    if ("." === n || this.isNumber(n)) t += n; else {
                        var i = this.peek();
                        if ("e" === n && this.isExpOperator(i)) t += n; else if (this.isExpOperator(n) && i && this.isNumber(i) && "e" === t.charAt(t.length - 1)) t += n; else {
                            if (!this.isExpOperator(n) || i && this.isNumber(i) || "e" !== t.charAt(t.length - 1)) break;
                            this.throwError("Invalid exponent")
                        }
                    }
                    this.index++
                }
                this.tokens.push({index: e, text: t, constant: !0, value: Number(t)})
            }, readIdent: function () {
                var t = this.index;
                for (this.index += this.peekMultichar().length; this.index < this.text.length;) {
                    var e = this.peekMultichar();
                    if (!this.isIdentifierContinue(e)) break;
                    this.index += e.length
                }
                this.tokens.push({index: t, text: this.text.slice(t, this.index), identifier: !0})
            }, readString: function (t) {
                var e = this.index;
                this.index++;
                for (var n = "", i = t, r = !1; this.index < this.text.length;) {
                    var o = this.text.charAt(this.index);
                    if (i += o, r) {
                        if ("u" === o) {
                            var a = this.text.substring(this.index + 1, this.index + 5);
                            a.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + a + "]"), this.index += 4, n += String.fromCharCode(parseInt(a, 16))
                        } else {
                            var s = zo[o];
                            n += s || o
                        }
                        r = !1
                    } else if ("\\" === o) r = !0; else {
                        if (o === t) return this.index++, void this.tokens.push({
                            index: e,
                            text: i,
                            constant: !0,
                            value: n
                        });
                        n += o
                    }
                    this.index++
                }
                this.throwError("Unterminated quote", e)
            }
        };
        var Ho = function (t, e) {
            this.lexer = t, this.options = e
        };
        Ho.Program = "Program", Ho.ExpressionStatement = "ExpressionStatement", Ho.AssignmentExpression = "AssignmentExpression", Ho.ConditionalExpression = "ConditionalExpression", Ho.LogicalExpression = "LogicalExpression", Ho.BinaryExpression = "BinaryExpression", Ho.UnaryExpression = "UnaryExpression", Ho.CallExpression = "CallExpression", Ho.MemberExpression = "MemberExpression", Ho.Identifier = "Identifier", Ho.Literal = "Literal", Ho.ArrayExpression = "ArrayExpression", Ho.Property = "Property", Ho.ObjectExpression = "ObjectExpression", Ho.ThisExpression = "ThisExpression", Ho.LocalsExpression = "LocalsExpression", Ho.NGValueParameter = "NGValueParameter", Ho.prototype = {
            ast: function (t) {
                this.text = t, this.tokens = this.lexer.lex(t);
                var e = this.program();
                return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]), e
            }, program: function () {
                for (var t = []; ;) if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && t.push(this.expressionStatement()), !this.expect(";")) return {
                    type: Ho.Program,
                    body: t
                }
            }, expressionStatement: function () {
                return {type: Ho.ExpressionStatement, expression: this.filterChain()}
            }, filterChain: function () {
                for (var t = this.expression(); this.expect("|");) t = this.filter(t);
                return t
            }, expression: function () {
                return this.assignment()
            }, assignment: function () {
                var t = this.ternary();
                if (this.expect("=")) {
                    if (!fn(t)) throw xo("lval", "Trying to assign a value to a non l-value");
                    t = {type: Ho.AssignmentExpression, left: t, right: this.assignment(), operator: "="}
                }
                return t
            }, ternary: function () {
                var t, e, n = this.logicalOR();
                return this.expect("?") && (t = this.expression(), this.consume(":")) ? (e = this.expression(), {
                    type: Ho.ConditionalExpression,
                    test: n,
                    alternate: t,
                    consequent: e
                }) : n
            }, logicalOR: function () {
                for (var t = this.logicalAND(); this.expect("||");) t = {
                    type: Ho.LogicalExpression,
                    operator: "||",
                    left: t,
                    right: this.logicalAND()
                };
                return t
            }, logicalAND: function () {
                for (var t = this.equality(); this.expect("&&");) t = {
                    type: Ho.LogicalExpression,
                    operator: "&&",
                    left: t,
                    right: this.equality()
                };
                return t
            }, equality: function () {
                for (var t, e = this.relational(); t = this.expect("==", "!=", "===", "!==");) e = {
                    type: Ho.BinaryExpression,
                    operator: t.text,
                    left: e,
                    right: this.relational()
                };
                return e
            }, relational: function () {
                for (var t, e = this.additive(); t = this.expect("<", ">", "<=", ">=");) e = {
                    type: Ho.BinaryExpression,
                    operator: t.text,
                    left: e,
                    right: this.additive()
                };
                return e
            }, additive: function () {
                for (var t, e = this.multiplicative(); t = this.expect("+", "-");) e = {
                    type: Ho.BinaryExpression,
                    operator: t.text,
                    left: e,
                    right: this.multiplicative()
                };
                return e
            }, multiplicative: function () {
                for (var t, e = this.unary(); t = this.expect("*", "/", "%");) e = {
                    type: Ho.BinaryExpression,
                    operator: t.text,
                    left: e,
                    right: this.unary()
                };
                return e
            }, unary: function () {
                var t;
                return (t = this.expect("+", "-", "!")) ? {
                    type: Ho.UnaryExpression,
                    operator: t.text,
                    prefix: !0,
                    argument: this.unary()
                } : this.primary()
            }, primary: function () {
                var t;
                this.expect("(") ? (t = this.filterChain(), this.consume(")")) : this.expect("[") ? t = this.arrayDeclaration() : this.expect("{") ? t = this.object() : this.selfReferential.hasOwnProperty(this.peek().text) ? t = R(this.selfReferential[this.consume().text]) : this.options.literals.hasOwnProperty(this.peek().text) ? t = {
                    type: Ho.Literal,
                    value: this.options.literals[this.consume().text]
                } : this.peek().identifier ? t = this.identifier() : this.peek().constant ? t = this.constant() : this.throwError("not a primary expression", this.peek());
                for (var e; e = this.expect("(", "[", ".");) "(" === e.text ? (t = {
                    type: Ho.CallExpression,
                    callee: t,
                    arguments: this.parseArguments()
                }, this.consume(")")) : "[" === e.text ? (t = {
                    type: Ho.MemberExpression,
                    object: t,
                    property: this.expression(),
                    computed: !0
                }, this.consume("]")) : "." === e.text ? t = {
                    type: Ho.MemberExpression,
                    object: t,
                    property: this.identifier(),
                    computed: !1
                } : this.throwError("IMPOSSIBLE");
                return t
            }, filter: function (t) {
                for (var e = [t], n = {
                    type: Ho.CallExpression,
                    callee: this.identifier(),
                    arguments: e,
                    filter: !0
                }; this.expect(":");) e.push(this.expression());
                return n
            }, parseArguments: function () {
                var t = [];
                if (")" !== this.peekToken().text) do t.push(this.filterChain()); while (this.expect(","));
                return t
            }, identifier: function () {
                var t = this.consume();
                return t.identifier || this.throwError("is not a valid identifier", t), {
                    type: Ho.Identifier,
                    name: t.text
                }
            }, constant: function () {
                return {type: Ho.Literal, value: this.consume().value}
            }, arrayDeclaration: function () {
                var t = [];
                if ("]" !== this.peekToken().text) do {
                    if (this.peek("]")) break;
                    t.push(this.expression())
                } while (this.expect(","));
                return this.consume("]"), {type: Ho.ArrayExpression, elements: t}
            }, object: function () {
                var t, e = [];
                if ("}" !== this.peekToken().text) do {
                    if (this.peek("}")) break;
                    t = {
                        type: Ho.Property,
                        kind: "init"
                    }, this.peek().constant ? (t.key = this.constant(), t.computed = !1, this.consume(":"), t.value = this.expression()) : this.peek().identifier ? (t.key = this.identifier(), t.computed = !1, this.peek(":") ? (this.consume(":"), t.value = this.expression()) : t.value = t.key) : this.peek("[") ? (this.consume("["), t.key = this.expression(), this.consume("]"), t.computed = !0, this.consume(":"), t.value = this.expression()) : this.throwError("invalid key", this.peek()), e.push(t)
                } while (this.expect(","));
                return this.consume("}"), {type: Ho.ObjectExpression, properties: e}
            }, throwError: function (t, e) {
                throw xo("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", e.text, t, e.index + 1, this.text, this.text.substring(e.index))
            }, consume: function (t) {
                if (0 === this.tokens.length) throw xo("ueoe", "Unexpected end of expression: {0}", this.text);
                var e = this.expect(t);
                return e || this.throwError("is unexpected, expecting [" + t + "]", this.peek()), e
            }, peekToken: function () {
                if (0 === this.tokens.length) throw xo("ueoe", "Unexpected end of expression: {0}", this.text);
                return this.tokens[0]
            }, peek: function (t, e, n, i) {
                return this.peekAhead(0, t, e, n, i)
            }, peekAhead: function (t, e, n, i, r) {
                if (this.tokens.length > t) {
                    var o = this.tokens[t], a = o.text;
                    if (a === e || a === n || a === i || a === r || !e && !n && !i && !r) return o
                }
                return !1
            }, expect: function (t, e, n, i) {
                var r = this.peek(t, e, n, i);
                return !!r && (this.tokens.shift(), r)
            }, selfReferential: {"this": {type: Ho.ThisExpression}, $locals: {type: Ho.LocalsExpression}}
        }, gn.prototype = {
            compile: function (t, e) {
                var n = this, r = this.astBuilder.ast(t);
                this.state = {
                    nextId: 0,
                    filters: {},
                    expensiveChecks: e,
                    fn: {vars: [], body: [], own: {}},
                    assign: {vars: [], body: [], own: {}},
                    inputs: []
                }, un(r, n.$filter);
                var o, a = "";
                if (this.stage = "assign", o = hn(r)) {
                    this.state.computing = "assign";
                    var s = this.nextId();
                    this.recurse(o, s), this.return_(s), a = "fn.assign=" + this.generateFunction("assign", "s,v,l")
                }
                var l = dn(r.body);
                n.stage = "inputs", i(l, function (t, e) {
                    var i = "fn" + e;
                    n.state[i] = {vars: [], body: [], own: {}}, n.state.computing = i;
                    var r = n.nextId();
                    n.recurse(t, r), n.return_(r), n.state.inputs.push(i), t.watchId = e
                }), this.state.computing = "fn", this.stage = "main", this.recurse(r);
                var c = '"' + this.USE + " " + this.STRICT + '";\n' + this.filterPrefix() + "var fn=" + this.generateFunction("fn", "s,l,a,i") + a + this.watchFns() + "return fn;",
                    u = new Function("$filter", "ensureSafeMemberName", "ensureSafeObject", "ensureSafeFunction", "getStringValue", "ensureSafeAssignContext", "ifDefined", "plus", "text", c)(this.$filter, en, rn, on, nn, an, sn, ln, t);
                return this.state = this.stage = void 0, u.literal = pn(r), u.constant = mn(r), u
            }, USE: "use", STRICT: "strict", watchFns: function () {
                var t = [], e = this.state.inputs, n = this;
                return i(e, function (e) {
                    t.push("var " + e + "=" + n.generateFunction(e, "s"))
                }), e.length && t.push("fn.inputs=[" + e.join(",") + "];"), t.join("")
            }, generateFunction: function (t, e) {
                return "function(" + e + "){" + this.varsPrefix(t) + this.body(t) + "};"
            }, filterPrefix: function () {
                var t = [], e = this;
                return i(this.state.filters, function (n, i) {
                    t.push(n + "=$filter(" + e.escape(i) + ")")
                }), t.length ? "var " + t.join(",") + ";" : ""
            }, varsPrefix: function (t) {
                return this.state[t].vars.length ? "var " + this.state[t].vars.join(",") + ";" : ""
            }, body: function (t) {
                return this.state[t].body.join("")
            }, recurse: function (t, e, n, r, o, a) {
                var s, l, c, u, d, f = this;
                if (r = r || h, !a && y(t.watchId)) return e = e || this.nextId(), void this.if_("i", this.lazyAssign(e, this.computedMember("i", t.watchId)), this.lazyRecurse(t, e, n, r, o, !0));
                switch (t.type) {
                    case Ho.Program:
                        i(t.body, function (e, n) {
                            f.recurse(e.expression, void 0, void 0, function (t) {
                                l = t
                            }), n !== t.body.length - 1 ? f.current().body.push(l, ";") : f.return_(l)
                        });
                        break;
                    case Ho.Literal:
                        u = this.escape(t.value), this.assign(e, u), r(u);
                        break;
                    case Ho.UnaryExpression:
                        this.recurse(t.argument, void 0, void 0, function (t) {
                            l = t
                        }), u = t.operator + "(" + this.ifDefined(l, 0) + ")", this.assign(e, u), r(u);
                        break;
                    case Ho.BinaryExpression:
                        this.recurse(t.left, void 0, void 0, function (t) {
                            s = t
                        }), this.recurse(t.right, void 0, void 0, function (t) {
                            l = t
                        }), u = "+" === t.operator ? this.plus(s, l) : "-" === t.operator ? this.ifDefined(s, 0) + t.operator + this.ifDefined(l, 0) : "(" + s + ")" + t.operator + "(" + l + ")", this.assign(e, u), r(u);
                        break;
                    case Ho.LogicalExpression:
                        e = e || this.nextId(), f.recurse(t.left, e), f.if_("&&" === t.operator ? e : f.not(e), f.lazyRecurse(t.right, e)), r(e);
                        break;
                    case Ho.ConditionalExpression:
                        e = e || this.nextId(), f.recurse(t.test, e), f.if_(e, f.lazyRecurse(t.alternate, e), f.lazyRecurse(t.consequent, e)), r(e);
                        break;
                    case Ho.Identifier:
                        e = e || this.nextId(), n && (n.context = "inputs" === f.stage ? "s" : this.assign(this.nextId(), this.getHasOwnProperty("l", t.name) + "?l:s"), n.computed = !1, n.name = t.name), en(t.name), f.if_("inputs" === f.stage || f.not(f.getHasOwnProperty("l", t.name)), function () {
                            f.if_("inputs" === f.stage || "s", function () {
                                o && 1 !== o && f.if_(f.not(f.nonComputedMember("s", t.name)), f.lazyAssign(f.nonComputedMember("s", t.name), "{}")), f.assign(e, f.nonComputedMember("s", t.name))
                            })
                        }, e && f.lazyAssign(e, f.nonComputedMember("l", t.name))), (f.state.expensiveChecks || yn(t.name)) && f.addEnsureSafeObject(e), r(e);
                        break;
                    case Ho.MemberExpression:
                        s = n && (n.context = this.nextId()) || this.nextId(), e = e || this.nextId(), f.recurse(t.object, s, void 0, function () {
                            f.if_(f.notNull(s), function () {
                                o && 1 !== o && f.addEnsureSafeAssignContext(s), t.computed ? (l = f.nextId(), f.recurse(t.property, l), f.getStringValue(l), f.addEnsureSafeMemberName(l), o && 1 !== o && f.if_(f.not(f.computedMember(s, l)), f.lazyAssign(f.computedMember(s, l), "{}")), u = f.ensureSafeObject(f.computedMember(s, l)), f.assign(e, u), n && (n.computed = !0, n.name = l)) : (en(t.property.name), o && 1 !== o && f.if_(f.not(f.nonComputedMember(s, t.property.name)), f.lazyAssign(f.nonComputedMember(s, t.property.name), "{}")), u = f.nonComputedMember(s, t.property.name), (f.state.expensiveChecks || yn(t.property.name)) && (u = f.ensureSafeObject(u)), f.assign(e, u), n && (n.computed = !1, n.name = t.property.name))
                            }, function () {
                                f.assign(e, "undefined")
                            }), r(e)
                        }, !!o);
                        break;
                    case Ho.CallExpression:
                        e = e || this.nextId(), t.filter ? (l = f.filter(t.callee.name), c = [], i(t.arguments, function (t) {
                            var e = f.nextId();
                            f.recurse(t, e), c.push(e)
                        }), u = l + "(" + c.join(",") + ")", f.assign(e, u), r(e)) : (l = f.nextId(), s = {}, c = [], f.recurse(t.callee, l, s, function () {
                            f.if_(f.notNull(l), function () {
                                f.addEnsureSafeFunction(l), i(t.arguments, function (t) {
                                    f.recurse(t, f.nextId(), void 0, function (t) {
                                        c.push(f.ensureSafeObject(t))
                                    })
                                }), s.name ? (f.state.expensiveChecks || f.addEnsureSafeObject(s.context), u = f.member(s.context, s.name, s.computed) + "(" + c.join(",") + ")") : u = l + "(" + c.join(",") + ")", u = f.ensureSafeObject(u), f.assign(e, u)
                            }, function () {
                                f.assign(e, "undefined")
                            }), r(e)
                        }));
                        break;
                    case Ho.AssignmentExpression:
                        l = this.nextId(), s = {}, this.recurse(t.left, void 0, s, function () {
                            f.if_(f.notNull(s.context), function () {
                                f.recurse(t.right, l), f.addEnsureSafeObject(f.member(s.context, s.name, s.computed)), f.addEnsureSafeAssignContext(s.context), u = f.member(s.context, s.name, s.computed) + t.operator + l, f.assign(e, u), r(e || u)
                            })
                        }, 1);
                        break;
                    case Ho.ArrayExpression:
                        c = [], i(t.elements, function (t) {
                            f.recurse(t, f.nextId(), void 0, function (t) {
                                c.push(t)
                            })
                        }), u = "[" + c.join(",") + "]", this.assign(e, u), r(u);
                        break;
                    case Ho.ObjectExpression:
                        c = [], d = !1, i(t.properties, function (t) {
                            t.computed && (d = !0)
                        }), d ? (e = e || this.nextId(), this.assign(e, "{}"), i(t.properties, function (t) {
                            t.computed ? (s = f.nextId(), f.recurse(t.key, s)) : s = t.key.type === Ho.Identifier ? t.key.name : "" + t.key.value, l = f.nextId(), f.recurse(t.value, l), f.assign(f.member(e, s, t.computed), l)
                        })) : (i(t.properties, function (e) {
                            f.recurse(e.value, t.constant ? void 0 : f.nextId(), void 0, function (t) {
                                c.push(f.escape(e.key.type === Ho.Identifier ? e.key.name : "" + e.key.value) + ":" + t)
                            })
                        }), u = "{" + c.join(",") + "}", this.assign(e, u)), r(e || u);
                        break;
                    case Ho.ThisExpression:
                        this.assign(e, "s"), r("s");
                        break;
                    case Ho.LocalsExpression:
                        this.assign(e, "l"), r("l");
                        break;
                    case Ho.NGValueParameter:
                        this.assign(e, "v"), r("v")
                }
            }, getHasOwnProperty: function (t, e) {
                var n = t + "." + e, i = this.current().own;
                return i.hasOwnProperty(n) || (i[n] = this.nextId(!1, t + "&&(" + this.escape(e) + " in " + t + ")")), i[n]
            }, assign: function (t, e) {
                if (t) return this.current().body.push(t, "=", e, ";"), t
            }, filter: function (t) {
                return this.state.filters.hasOwnProperty(t) || (this.state.filters[t] = this.nextId(!0)), this.state.filters[t]
            }, ifDefined: function (t, e) {
                return "ifDefined(" + t + "," + this.escape(e) + ")"
            }, plus: function (t, e) {
                return "plus(" + t + "," + e + ")"
            }, return_: function (t) {
                this.current().body.push("return ", t, ";")
            }, if_: function (t, e, n) {
                if (t === !0) e(); else {
                    var i = this.current().body;
                    i.push("if(", t, "){"), e(), i.push("}"), n && (i.push("else{"), n(), i.push("}"))
                }
            }, not: function (t) {
                return "!(" + t + ")"
            }, notNull: function (t) {
                return t + "!=null"
            }, nonComputedMember: function (t, e) {
                var n = /^[$_a-zA-Z][$_a-zA-Z0-9]*$/, i = /[^$_a-zA-Z0-9]/g;
                return n.test(e) ? t + "." + e : t + '["' + e.replace(i, this.stringEscapeFn) + '"]'
            }, computedMember: function (t, e) {
                return t + "[" + e + "]"
            }, member: function (t, e, n) {
                return n ? this.computedMember(t, e) : this.nonComputedMember(t, e)
            }, addEnsureSafeObject: function (t) {
                this.current().body.push(this.ensureSafeObject(t), ";")
            }, addEnsureSafeMemberName: function (t) {
                this.current().body.push(this.ensureSafeMemberName(t), ";")
            }, addEnsureSafeFunction: function (t) {
                this.current().body.push(this.ensureSafeFunction(t), ";")
            }, addEnsureSafeAssignContext: function (t) {
                this.current().body.push(this.ensureSafeAssignContext(t), ";")
            }, ensureSafeObject: function (t) {
                return "ensureSafeObject(" + t + ",text)"
            }, ensureSafeMemberName: function (t) {
                return "ensureSafeMemberName(" + t + ",text)"
            }, ensureSafeFunction: function (t) {
                return "ensureSafeFunction(" + t + ",text)"
            }, getStringValue: function (t) {
                this.assign(t, "getStringValue(" + t + ")")
            }, ensureSafeAssignContext: function (t) {
                return "ensureSafeAssignContext(" + t + ",text)"
            }, lazyRecurse: function (t, e, n, i, r, o) {
                var a = this;
                return function () {
                    a.recurse(t, e, n, i, r, o)
                }
            }, lazyAssign: function (t, e) {
                var n = this;
                return function () {
                    n.assign(t, e)
                }
            }, stringEscapeRegex: /[^ a-zA-Z0-9]/g, stringEscapeFn: function (t) {
                return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
            }, escape: function (t) {
                if (b(t)) return "'" + t.replace(this.stringEscapeRegex, this.stringEscapeFn) + "'";
                if (x(t)) return t.toString();
                if (t === !0) return "true";
                if (t === !1) return "false";
                if (null === t) return "null";
                if ("undefined" == typeof t) return "undefined";
                throw xo("esc", "IMPOSSIBLE")
            }, nextId: function (t, e) {
                var n = "v" + this.state.nextId++;
                return t || this.current().vars.push(n + (e ? "=" + e : "")), n
            }, current: function () {
                return this.state[this.state.computing]
            }
        }, vn.prototype = {
            compile: function (t, e) {
                var n = this, r = this.astBuilder.ast(t);
                this.expression = t, this.expensiveChecks = e, un(r, n.$filter);
                var o, a;
                (o = hn(r)) && (a = this.recurse(o));
                var s, l = dn(r.body);
                l && (s = [], i(l, function (t, e) {
                    var i = n.recurse(t);
                    t.input = i, s.push(i), t.watchId = e
                }));
                var c = [];
                i(r.body, function (t) {
                    c.push(n.recurse(t.expression))
                });
                var u = 0 === r.body.length ? h : 1 === r.body.length ? c[0] : function (t, e) {
                    var n;
                    return i(c, function (i) {
                        n = i(t, e)
                    }), n
                };
                return a && (u.assign = function (t, e, n) {
                    return a(t, n, e)
                }), s && (u.inputs = s), u.literal = pn(r), u.constant = mn(r), u
            }, recurse: function (t, e, n) {
                var r, o, a, s = this;
                if (t.input) return this.inputs(t.input, t.watchId);
                switch (t.type) {
                    case Ho.Literal:
                        return this.value(t.value, e);
                    case Ho.UnaryExpression:
                        return o = this.recurse(t.argument), this["unary" + t.operator](o, e);
                    case Ho.BinaryExpression:
                        return r = this.recurse(t.left), o = this.recurse(t.right), this["binary" + t.operator](r, o, e);
                    case Ho.LogicalExpression:
                        return r = this.recurse(t.left), o = this.recurse(t.right), this["binary" + t.operator](r, o, e);
                    case Ho.ConditionalExpression:
                        return this["ternary?:"](this.recurse(t.test), this.recurse(t.alternate), this.recurse(t.consequent), e);
                    case Ho.Identifier:
                        return en(t.name, s.expression), s.identifier(t.name, s.expensiveChecks || yn(t.name), e, n, s.expression);
                    case Ho.MemberExpression:
                        return r = this.recurse(t.object, !1, !!n), t.computed || (en(t.property.name, s.expression), o = t.property.name), t.computed && (o = this.recurse(t.property)), t.computed ? this.computedMember(r, o, e, n, s.expression) : this.nonComputedMember(r, o, s.expensiveChecks, e, n, s.expression);
                    case Ho.CallExpression:
                        return a = [], i(t.arguments, function (t) {
                            a.push(s.recurse(t))
                        }), t.filter && (o = this.$filter(t.callee.name)), t.filter || (o = this.recurse(t.callee, !0)), t.filter ? function (t, n, i, r) {
                            for (var s = [], l = 0; l < a.length; ++l) s.push(a[l](t, n, i, r));
                            var c = o.apply(void 0, s, r);
                            return e ? {context: void 0, name: void 0, value: c} : c
                        } : function (t, n, i, r) {
                            var l, c = o(t, n, i, r);
                            if (null != c.value) {
                                rn(c.context, s.expression), on(c.value, s.expression);
                                for (var u = [], d = 0; d < a.length; ++d) u.push(rn(a[d](t, n, i, r), s.expression));
                                l = rn(c.value.apply(c.context, u), s.expression)
                            }
                            return e ? {value: l} : l
                        };
                    case Ho.AssignmentExpression:
                        return r = this.recurse(t.left, !0, 1), o = this.recurse(t.right), function (t, n, i, a) {
                            var l = r(t, n, i, a), c = o(t, n, i, a);
                            return rn(l.value, s.expression), an(l.context), l.context[l.name] = c, e ? {value: c} : c
                        };
                    case Ho.ArrayExpression:
                        return a = [], i(t.elements, function (t) {
                            a.push(s.recurse(t))
                        }), function (t, n, i, r) {
                            for (var o = [], s = 0; s < a.length; ++s) o.push(a[s](t, n, i, r));
                            return e ? {value: o} : o
                        };
                    case Ho.ObjectExpression:
                        return a = [], i(t.properties, function (t) {
                            t.computed ? a.push({
                                key: s.recurse(t.key),
                                computed: !0,
                                value: s.recurse(t.value)
                            }) : a.push({
                                key: t.key.type === Ho.Identifier ? t.key.name : "" + t.key.value,
                                computed: !1,
                                value: s.recurse(t.value)
                            })
                        }), function (t, n, i, r) {
                            for (var o = {}, s = 0; s < a.length; ++s) a[s].computed ? o[a[s].key(t, n, i, r)] = a[s].value(t, n, i, r) : o[a[s].key] = a[s].value(t, n, i, r);
                            return e ? {value: o} : o
                        };
                    case Ho.ThisExpression:
                        return function (t) {
                            return e ? {value: t} : t
                        };
                    case Ho.LocalsExpression:
                        return function (t, n) {
                            return e ? {value: n} : n
                        };
                    case Ho.NGValueParameter:
                        return function (t, n, i) {
                            return e ? {value: i} : i
                        }
                }
            }, "unary+": function (t, e) {
                return function (n, i, r, o) {
                    var a = t(n, i, r, o);
                    return a = y(a) ? +a : 0, e ? {value: a} : a
                }
            }, "unary-": function (t, e) {
                return function (n, i, r, o) {
                    var a = t(n, i, r, o);
                    return a = y(a) ? -a : 0, e ? {value: a} : a
                }
            }, "unary!": function (t, e) {
                return function (n, i, r, o) {
                    var a = !t(n, i, r, o);
                    return e ? {value: a} : a
                }
            }, "binary+": function (t, e, n) {
                return function (i, r, o, a) {
                    var s = t(i, r, o, a), l = e(i, r, o, a), c = ln(s, l);
                    return n ? {value: c} : c
                }
            }, "binary-": function (t, e, n) {
                return function (i, r, o, a) {
                    var s = t(i, r, o, a), l = e(i, r, o, a), c = (y(s) ? s : 0) - (y(l) ? l : 0);
                    return n ? {value: c} : c
                }
            }, "binary*": function (t, e, n) {
                return function (i, r, o, a) {
                    var s = t(i, r, o, a) * e(i, r, o, a);
                    return n ? {value: s} : s
                }
            }, "binary/": function (t, e, n) {
                return function (i, r, o, a) {
                    var s = t(i, r, o, a) / e(i, r, o, a);
                    return n ? {value: s} : s
                }
            }, "binary%": function (t, e, n) {
                return function (i, r, o, a) {
                    var s = t(i, r, o, a) % e(i, r, o, a);
                    return n ? {value: s} : s
                }
            }, "binary===": function (t, e, n) {
                return function (i, r, o, a) {
                    var s = t(i, r, o, a) === e(i, r, o, a);
                    return n ? {value: s} : s
                }
            }, "binary!==": function (t, e, n) {
                return function (i, r, o, a) {
                    var s = t(i, r, o, a) !== e(i, r, o, a);
                    return n ? {value: s} : s
                }
            }, "binary==": function (t, e, n) {
                return function (i, r, o, a) {
                    var s = t(i, r, o, a) == e(i, r, o, a);
                    return n ? {value: s} : s
                }
            }, "binary!=": function (t, e, n) {
                return function (i, r, o, a) {
                    var s = t(i, r, o, a) != e(i, r, o, a);
                    return n ? {value: s} : s
                }
            }, "binary<": function (t, e, n) {
                return function (i, r, o, a) {
                    var s = t(i, r, o, a) < e(i, r, o, a);
                    return n ? {value: s} : s
                }
            }, "binary>": function (t, e, n) {
                return function (i, r, o, a) {
                    var s = t(i, r, o, a) > e(i, r, o, a);
                    return n ? {value: s} : s
                }
            }, "binary<=": function (t, e, n) {
                return function (i, r, o, a) {
                    var s = t(i, r, o, a) <= e(i, r, o, a);
                    return n ? {value: s} : s
                }
            }, "binary>=": function (t, e, n) {
                return function (i, r, o, a) {
                    var s = t(i, r, o, a) >= e(i, r, o, a);
                    return n ? {value: s} : s
                }
            }, "binary&&": function (t, e, n) {
                return function (i, r, o, a) {
                    var s = t(i, r, o, a) && e(i, r, o, a);
                    return n ? {value: s} : s
                }
            }, "binary||": function (t, e, n) {
                return function (i, r, o, a) {
                    var s = t(i, r, o, a) || e(i, r, o, a);
                    return n ? {value: s} : s
                }
            }, "ternary?:": function (t, e, n, i) {
                return function (r, o, a, s) {
                    var l = t(r, o, a, s) ? e(r, o, a, s) : n(r, o, a, s);
                    return i ? {value: l} : l
                }
            }, value: function (t, e) {
                return function () {
                    return e ? {context: void 0, name: void 0, value: t} : t
                }
            }, identifier: function (t, e, n, i, r) {
                return function (o, a, s, l) {
                    var c = a && t in a ? a : o;
                    i && 1 !== i && c && !c[t] && (c[t] = {});
                    var u = c ? c[t] : void 0;
                    return e && rn(u, r), n ? {context: c, name: t, value: u} : u
                }
            }, computedMember: function (t, e, n, i, r) {
                return function (o, a, s, l) {
                    var c, u, d = t(o, a, s, l);
                    return null != d && (c = e(o, a, s, l), c = nn(c), en(c, r), i && 1 !== i && (an(d), d && !d[c] && (d[c] = {})), u = d[c], rn(u, r)), n ? {
                        context: d,
                        name: c,
                        value: u
                    } : u
                }
            }, nonComputedMember: function (t, e, n, i, r, o) {
                return function (a, s, l, c) {
                    var u = t(a, s, l, c);
                    r && 1 !== r && (an(u), u && !u[e] && (u[e] = {}));
                    var d = null != u ? u[e] : void 0;
                    return (n || yn(e)) && rn(d, o), i ? {context: u, name: e, value: d} : d
                }
            }, inputs: function (t, e) {
                return function (n, i, r, o) {
                    return o ? o[e] : t(n, i, r)
                }
            }
        };
        var Bo = function (t, e, n) {
            this.lexer = t, this.$filter = e, this.options = n, this.ast = new Ho(t, n), this.astCompiler = n.csp ? new vn(this.ast, e) : new gn(this.ast, e)
        };
        Bo.prototype = {
            constructor: Bo, parse: function (t) {
                return this.astCompiler.compile(t, this.options.expensiveChecks)
            }
        };
        var Vo = e("$sce"), Wo = {HTML: "html", CSS: "css", URL: "url", RESOURCE_URL: "resourceUrl", JS: "js"},
            Uo = e("$compile"), Go = t.document.createElement("a"), Yo = jn(t.location.href);
        In.$inject = ["$document"], zn.$inject = ["$provide"];
        var Qo = 22, Ko = ".", Xo = "0";
        Wn.$inject = ["$locale"], Un.$inject = ["$locale"];
        var Zo = {
                yyyy: Xn("FullYear", 4, 0, !1, !0),
                yy: Xn("FullYear", 2, 0, !0, !0),
                y: Xn("FullYear", 1, 0, !1, !0),
                MMMM: Zn("Month"),
                MMM: Zn("Month", !0),
                MM: Xn("Month", 2, 1),
                M: Xn("Month", 1, 1),
                LLLL: Zn("Month", !1, !0),
                dd: Xn("Date", 2),
                d: Xn("Date", 1),
                HH: Xn("Hours", 2),
                H: Xn("Hours", 1),
                hh: Xn("Hours", 2, -12),
                h: Xn("Hours", 1, -12),
                mm: Xn("Minutes", 2),
                m: Xn("Minutes", 1),
                ss: Xn("Seconds", 2),
                s: Xn("Seconds", 1),
                sss: Xn("Milliseconds", 3),
                EEEE: Zn("Day"),
                EEE: Zn("Day", !0),
                a: ii,
                Z: Jn,
                ww: ni(2),
                w: ni(1),
                G: ri,
                GG: ri,
                GGG: ri,
                GGGG: oi
            }, Jo = /((?:[^yMLdHhmsaZEwG']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|L+|d+|H+|h+|m+|s+|a|Z|G+|w+))(.*)/,
            ta = /^-?\d+$/;
        ai.$inject = ["$locale"];
        var ea = m(zi), na = m(qi);
        ui.$inject = ["$parse"];
        var ia = m({
            restrict: "E", compile: function (t, e) {
                if (!e.href && !e.xlinkHref) return function (t, e) {
                    if ("a" === e[0].nodeName.toLowerCase()) {
                        var n = "[object SVGAnimatedString]" === Xi.call(e.prop("href")) ? "xlink:href" : "href";
                        e.on("click", function (t) {
                            e.attr(n) || t.preventDefault()
                        })
                    }
                }
            }
        }), ra = {};
        i(Nr, function (t, e) {
            function n(t, n, r) {
                t.$watch(r[i], function (t) {
                    r.$set(e, !!t)
                })
            }

            if ("multiple" !== t) {
                var i = ve("ng-" + e), r = n;
                "checked" === t && (r = function (t, e, r) {
                    r.ngModel !== r[i] && n(t, e, r)
                }), ra[i] = function () {
                    return {restrict: "A", priority: 100, link: r}
                }
            }
        }), i(Ir, function (t, e) {
            ra[e] = function () {
                return {
                    priority: 100, link: function (t, n, i) {
                        if ("ngPattern" === e && "/" === i.ngPattern.charAt(0)) {
                            var r = i.ngPattern.match(Fi);
                            if (r) return void i.$set("ngPattern", new RegExp(r[1], r[2]))
                        }
                        t.$watch(i[e], function (t) {
                            i.$set(e, t)
                        })
                    }
                }
            }
        }), i(["src", "srcset", "href"], function (t) {
            var e = ve("ng-" + t);
            ra[e] = function () {
                return {
                    priority: 99, link: function (n, i, r) {
                        var o = t, a = t;
                        "href" === t && "[object SVGAnimatedString]" === Xi.call(i.prop("href")) && (a = "xlinkHref", r.$attr[a] = "xlink:href", o = null), r.$observe(e, function (e) {
                            return e ? (r.$set(a, e), void (Vi && o && i.prop(o, r[a]))) : void ("href" === t && r.$set(a, null))
                        })
                    }
                }
            }
        });
        var oa = {
            $addControl: h,
            $$renameControl: fi,
            $removeControl: h,
            $setValidity: h,
            $setDirty: h,
            $setPristine: h,
            $setSubmitted: h
        }, aa = "ng-submitted";
        hi.$inject = ["$element", "$attrs", "$scope", "$animate", "$interpolate"];
        var sa = function (t) {
                return ["$timeout", "$parse", function (e, n) {
                    function i(t) {
                        return "" === t ? n('this[""]').assign : n(t).assign || h
                    }

                    var r = {
                        name: "form",
                        restrict: t ? "EAC" : "E",
                        require: ["form", "^^?form"],
                        controller: hi,
                        compile: function (n, r) {
                            n.addClass(Ba).addClass(qa);
                            var o = r.name ? "name" : !(!t || !r.ngForm) && "ngForm";
                            return {
                                pre: function (t, n, r, a) {
                                    var s = a[0];
                                    if (!("action" in r)) {
                                        var l = function (e) {
                                            t.$apply(function () {
                                                s.$commitViewValue(), s.$setSubmitted()
                                            }), e.preventDefault()
                                        };
                                        Cr(n[0], "submit", l), n.on("$destroy", function () {
                                            e(function () {
                                                kr(n[0], "submit", l)
                                            }, 0, !1)
                                        })
                                    }
                                    var u = a[1] || s.$$parentForm;
                                    u.$addControl(s);
                                    var d = o ? i(s.$name) : h;
                                    o && (d(t, s), r.$observe(o, function (e) {
                                        s.$name !== e && (d(t, void 0), s.$$parentForm.$$renameControl(s, e), (d = i(s.$name))(t, s))
                                    })), n.on("$destroy", function () {
                                        s.$$parentForm.$removeControl(s), d(t, void 0), c(s, oa)
                                    })
                                }
                            }
                        }
                    };
                    return r
                }]
            }, la = sa(), ca = sa(!0), ua = /^\d{4,}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+(?:[+-][0-2]\d:[0-5]\d|Z)$/,
            da = /^[a-z][a-z\d.+-]*:\/*(?:[^:@]+(?::[^@]+)?@)?(?:[^\s:\/?#]+|\[[a-f\d:]+])(?::\d+)?(?:\/[^?#]*)?(?:\?[^#]*)?(?:#.*)?$/i,
            fa = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/,
            ha = /^\s*(-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/, pa = /^(\d{4,})-(\d{2})-(\d{2})$/,
            ma = /^(\d{4,})-(\d\d)-(\d\d)T(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, ga = /^(\d{4,})-W(\d\d)$/,
            va = /^(\d{4,})-(\d\d)$/, ya = /^(\d\d):(\d\d)(?::(\d\d)(\.\d{1,3})?)?$/, $a = "keydown wheel mousedown",
            wa = mt();
        i("date,datetime-local,month,time,week".split(","), function (t) {
            wa[t] = !0
        });
        var ba = {
            text: mi,
            date: $i("date", pa, yi(pa, ["yyyy", "MM", "dd"]), "yyyy-MM-dd"),
            "datetime-local": $i("datetimelocal", ma, yi(ma, ["yyyy", "MM", "dd", "HH", "mm", "ss", "sss"]), "yyyy-MM-ddTHH:mm:ss.sss"),
            time: $i("time", ya, yi(ya, ["HH", "mm", "ss", "sss"]), "HH:mm:ss.sss"),
            week: $i("week", ga, vi, "yyyy-Www"),
            month: $i("month", va, yi(va, ["yyyy", "MM"]), "yyyy-MM"),
            number: _i,
            url: Ti,
            email: Ai,
            radio: Oi,
            range: Ei,
            checkbox: Pi,
            hidden: h,
            button: h,
            submit: h,
            reset: h,
            file: h
        }, xa = ["$browser", "$sniffer", "$filter", "$parse", function (t, e, n, i) {
            return {
                restrict: "E", require: ["?ngModel"], link: {
                    pre: function (r, o, a, s) {
                        if (s[0]) {
                            var l = zi(a.type);
                            "range" !== l || a.hasOwnProperty("ngInputRange") || (l = "text"), (ba[l] || ba.text)(r, o, a, s[0], e, t, n, i)
                        }
                    }
                }
            }
        }], Ca = /^(true|false|\d+)$/, ka = function () {
            return {
                restrict: "A", priority: 100, compile: function (t, e) {
                    return Ca.test(e.ngValue) ? function (t, e, n) {
                        n.$set("value", t.$eval(n.ngValue))
                    } : function (t, e, n) {
                        t.$watch(n.ngValue, function (t) {
                            n.$set("value", t)
                        })
                    }
                }
            }
        }, Sa = ["$compile", function (t) {
            return {
                restrict: "AC", compile: function (e) {
                    return t.$$addBindingClass(e), function (e, n, i) {
                        t.$$addBindingInfo(n, i.ngBind), n = n[0], e.$watch(i.ngBind, function (t) {
                            n.textContent = v(t) ? "" : t
                        })
                    }
                }
            }
        }], _a = ["$interpolate", "$compile", function (t, e) {
            return {
                compile: function (n) {
                    return e.$$addBindingClass(n), function (n, i, r) {
                        var o = t(i.attr(r.$attr.ngBindTemplate));
                        e.$$addBindingInfo(i, o.expressions), i = i[0], r.$observe("ngBindTemplate", function (t) {
                            i.textContent = v(t) ? "" : t
                        })
                    }
                }
            }
        }], Ea = ["$sce", "$parse", "$compile", function (t, e, n) {
            return {
                restrict: "A", compile: function (i, r) {
                    var o = e(r.ngBindHtml), a = e(r.ngBindHtml, function (e) {
                        return t.valueOf(e)
                    });
                    return n.$$addBindingClass(i), function (e, i, r) {
                        n.$$addBindingInfo(i, r.ngBindHtml), e.$watch(a, function () {
                            var n = o(e);
                            i.html(t.getTrustedHtml(n) || "")
                        })
                    }
                }
            }
        }], Ta = m({
            restrict: "A", require: "ngModel", link: function (t, e, n, i) {
                i.$viewChangeListeners.push(function () {
                    t.$eval(n.ngChange)
                })
            }
        }), Aa = Mi("", !0), Oa = Mi("Odd", 0), Da = Mi("Even", 1), Pa = di({
            compile: function (t, e) {
                e.$set("ngCloak", void 0), t.removeClass("ng-cloak")
            }
        }), Ma = [function () {
            return {restrict: "A", scope: !0, controller: "@", priority: 500}
        }], La = {}, ja = {blur: !0, focus: !0};
        i("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function (t) {
            var e = ve("ng-" + t);
            La[e] = ["$parse", "$rootScope", function (n, i) {
                return {
                    restrict: "A", compile: function (r, o) {
                        var a = n(o[e], null, !0);
                        return function (e, n) {
                            n.on(t, function (n) {
                                var r = function () {
                                    a(e, {$event: n})
                                };
                                ja[t] && i.$$phase ? e.$evalAsync(r) : e.$apply(r)
                            })
                        }
                    }
                }
            }]
        });
        var Na = ["$animate", "$compile", function (t, e) {
                return {
                    multiElement: !0,
                    transclude: "element",
                    priority: 600,
                    terminal: !0,
                    restrict: "A",
                    $$tlb: !0,
                    link: function (n, i, r, o, a) {
                        var s, l, c;
                        n.$watch(r.ngIf, function (n) {
                            n ? l || a(function (n, o) {
                                l = o, n[n.length++] = e.$$createComment("end ngIf", r.ngIf), s = {clone: n}, t.enter(n, i.parent(), i)
                            }) : (c && (c.remove(), c = null), l && (l.$destroy(), l = null), s && (c = pt(s.clone), t.leave(c).done(function (t) {
                                t !== !1 && (c = null)
                            }), s = null))
                        })
                    }
                }
            }], Fa = ["$templateRequest", "$anchorScroll", "$animate", function (t, e, n) {
                return {
                    restrict: "ECA",
                    priority: 400,
                    terminal: !0,
                    transclude: "element",
                    controller: tr.noop,
                    compile: function (i, r) {
                        var o = r.ngInclude || r.src, a = r.onload || "", s = r.autoscroll;
                        return function (i, r, l, c, u) {
                            var d, f, h, p = 0, m = function () {
                                f && (f.remove(), f = null), d && (d.$destroy(), d = null), h && (n.leave(h).done(function (t) {
                                    t !== !1 && (f = null)
                                }), f = h, h = null)
                            };
                            i.$watch(o, function (o) {
                                var l = function (t) {
                                    t === !1 || !y(s) || s && !i.$eval(s) || e()
                                }, f = ++p;
                                o ? (t(o, !0).then(function (t) {
                                    if (!i.$$destroyed && f === p) {
                                        var e = i.$new();
                                        c.template = t;
                                        var s = u(e, function (t) {
                                            m(), n.enter(t, null, r).done(l)
                                        });
                                        d = e, h = s, d.$emit("$includeContentLoaded", o), i.$eval(a)
                                    }
                                }, function () {
                                    i.$$destroyed || f === p && (m(), i.$emit("$includeContentError", o))
                                }), i.$emit("$includeContentRequested", o)) : (m(), c.template = null)
                            })
                        }
                    }
                }
            }], Ia = ["$compile", function (e) {
                return {
                    restrict: "ECA", priority: -400, require: "ngInclude", link: function (n, i, r, o) {
                        return Xi.call(i[0]).match(/SVG/) ? (i.empty(), void e(Et(o.template, t.document).childNodes)(n, function (t) {
                            i.append(t)
                        }, {futureParentElement: i})) : (i.html(o.template), void e(i.contents())(n))
                    }
                }
            }], Ra = di({
                priority: 450, compile: function () {
                    return {
                        pre: function (t, e, n) {
                            t.$eval(n.ngInit)
                        }
                    }
                }
            }), za = function () {
                return {
                    restrict: "A", priority: 100, require: "ngModel", link: function (t, e, n, r) {
                        var o = e.attr(n.$attr.ngList) || ", ", a = "false" !== n.ngTrim, s = a ? or(o) : o,
                            l = function (t) {
                                if (!v(t)) {
                                    var e = [];
                                    return t && i(t.split(s), function (t) {
                                        t && e.push(a ? or(t) : t)
                                    }), e
                                }
                            };
                        r.$parsers.push(l), r.$formatters.push(function (t) {
                            if (ir(t)) return t.join(o)
                        }), r.$isEmpty = function (t) {
                            return !t || !t.length
                        }
                    }
                }
            }, qa = "ng-valid", Ha = "ng-invalid", Ba = "ng-pristine", Va = "ng-dirty", Wa = "ng-untouched",
            Ua = "ng-touched",
            Ga = "ng-pending", Ya = "ng-empty", Qa = "ng-not-empty", Ka = e("ngModel"),
            Xa = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", "$timeout", "$rootScope", "$q", "$interpolate", function (t, e, n, r, o, a, s, l, c, u) {
                this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$$rawModelValue = void 0, this.$validators = {}, this.$asyncValidators = {}, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$untouched = !0, this.$touched = !1, this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$error = {}, this.$$success = {}, this.$pending = void 0, this.$name = u(n.name || "", !1)(t), this.$$parentForm = oa;
                var d, f = o(n.ngModel), p = f.assign, m = f, g = p, $ = null, w = this;
                this.$$setOptions = function (t) {
                    if (w.$options = t, t && t.getterSetter) {
                        var e = o(n.ngModel + "()"), i = o(n.ngModel + "($$$p)");
                        m = function (t) {
                            var n = f(t);
                            return k(n) && (n = e(t)), n
                        }, g = function (t, e) {
                            k(f(t)) ? i(t, {$$$p: e}) : p(t, e)
                        }
                    } else if (!f.assign) throw Ka("nonassign", "Expression '{0}' is non-assignable. Element: {1}", n.ngModel, K(r))
                }, this.$render = h, this.$isEmpty = function (t) {
                    return v(t) || "" === t || null === t || t !== t
                }, this.$$updateEmptyClasses = function (t) {
                    w.$isEmpty(t) ? (a.removeClass(r, Qa), a.addClass(r, Ya)) : (a.removeClass(r, Ya), a.addClass(r, Qa))
                };
                var b = 0;
                Li({
                    ctrl: this, $element: r, set: function (t, e) {
                        t[e] = !0
                    }, unset: function (t, e) {
                        delete t[e]
                    }, $animate: a
                }), this.$setPristine = function () {
                    w.$dirty = !1, w.$pristine = !0, a.removeClass(r, Va), a.addClass(r, Ba)
                }, this.$setDirty = function () {
                    w.$dirty = !0, w.$pristine = !1, a.removeClass(r, Ba), a.addClass(r, Va), w.$$parentForm.$setDirty()
                }, this.$setUntouched = function () {
                    w.$touched = !1, w.$untouched = !0, a.setClass(r, Wa, Ua)
                }, this.$setTouched = function () {
                    w.$touched = !0, w.$untouched = !1, a.setClass(r, Ua, Wa)
                }, this.$rollbackViewValue = function () {
                    s.cancel($), w.$viewValue = w.$$lastCommittedViewValue, w.$render()
                }, this.$validate = function () {
                    if (!nr(w.$modelValue)) {
                        var t = w.$$lastCommittedViewValue, e = w.$$rawModelValue, n = w.$valid, i = w.$modelValue,
                            r = w.$options && w.$options.allowInvalid;
                        w.$$runValidators(e, t, function (t) {
                            r || n === t || (w.$modelValue = t ? e : void 0, w.$modelValue !== i && w.$$writeModelToScope())
                        })
                    }
                }, this.$$runValidators = function (t, e, n) {
                    function r() {
                        var t = w.$$parserName || "parse";
                        return v(d) ? (s(t, null), !0) : (d || (i(w.$validators, function (t, e) {
                            s(e, null)
                        }), i(w.$asyncValidators, function (t, e) {
                            s(e, null)
                        })), s(t, d), d)
                    }

                    function o() {
                        var n = !0;
                        return i(w.$validators, function (i, r) {
                            var o = i(t, e);
                            n = n && o, s(r, o)
                        }), !!n || (i(w.$asyncValidators, function (t, e) {
                            s(e, null)
                        }), !1)
                    }

                    function a() {
                        var n = [], r = !0;
                        i(w.$asyncValidators, function (i, o) {
                            var a = i(t, e);
                            if (!P(a)) throw Ka("nopromise", "Expected asynchronous validator to return a promise but got '{0}' instead.", a);
                            s(o, void 0), n.push(a.then(function () {
                                s(o, !0)
                            }, function () {
                                r = !1, s(o, !1)
                            }))
                        }), n.length ? c.all(n).then(function () {
                            l(r)
                        }, h) : l(!0)
                    }

                    function s(t, e) {
                        u === b && w.$setValidity(t, e)
                    }

                    function l(t) {
                        u === b && n(t)
                    }

                    b++;
                    var u = b;
                    return r() && o() ? void a() : void l(!1)
                }, this.$commitViewValue = function () {
                    var t = w.$viewValue;
                    s.cancel($), (w.$$lastCommittedViewValue !== t || "" === t && w.$$hasNativeValidators) && (w.$$updateEmptyClasses(t), w.$$lastCommittedViewValue = t, w.$pristine && this.$setDirty(), this.$$parseAndValidate())
                }, this.$$parseAndValidate = function () {
                    function e() {
                        w.$modelValue !== o && w.$$writeModelToScope()
                    }

                    var n = w.$$lastCommittedViewValue, i = n;
                    if (d = !v(i) || void 0) for (var r = 0; r < w.$parsers.length; r++) if (i = w.$parsers[r](i), v(i)) {
                        d = !1;
                        break
                    }
                    nr(w.$modelValue) && (w.$modelValue = m(t));
                    var o = w.$modelValue, a = w.$options && w.$options.allowInvalid;
                    w.$$rawModelValue = i, a && (w.$modelValue = i, e()), w.$$runValidators(i, w.$$lastCommittedViewValue, function (t) {
                        a || (w.$modelValue = t ? i : void 0, e())
                    })
                }, this.$$writeModelToScope = function () {
                    g(t, w.$modelValue), i(w.$viewChangeListeners, function (t) {
                        try {
                            t()
                        } catch (n) {
                            e(n)
                        }
                    })
                }, this.$setViewValue = function (t, e) {
                    w.$viewValue = t, w.$options && !w.$options.updateOnDefault || w.$$debounceViewValueCommit(e)
                }, this.$$debounceViewValueCommit = function (e) {
                    var n, i = 0, r = w.$options;
                    r && y(r.debounce) && (n = r.debounce, x(n) ? i = n : x(n[e]) ? i = n[e] : x(n["default"]) && (i = n["default"])), s.cancel($), i ? $ = s(function () {
                        w.$commitViewValue()
                    }, i) : l.$$phase ? w.$commitViewValue() : t.$apply(function () {
                        w.$commitViewValue()
                    })
                }, t.$watch(function () {
                    var e = m(t);
                    if (e !== w.$modelValue && (w.$modelValue === w.$modelValue || e === e)) {
                        w.$modelValue = w.$$rawModelValue = e, d = void 0;
                        for (var n = w.$formatters, i = n.length, r = e; i--;) r = n[i](r);
                        w.$viewValue !== r && (w.$$updateEmptyClasses(r), w.$viewValue = w.$$lastCommittedViewValue = r, w.$render(), w.$$runValidators(w.$modelValue, w.$viewValue, h))
                    }
                    return e
                })
            }], Za = ["$rootScope", function (t) {
                return {
                    restrict: "A",
                    require: ["ngModel", "^?form", "^?ngModelOptions"],
                    controller: Xa,
                    priority: 1,
                    compile: function (e) {
                        return e.addClass(Ba).addClass(Wa).addClass(qa), {
                            pre: function (t, e, n, i) {
                                var r = i[0], o = i[1] || r.$$parentForm;
                                r.$$setOptions(i[2] && i[2].$options), o.$addControl(r), n.$observe("name", function (t) {
                                    r.$name !== t && r.$$parentForm.$$renameControl(r, t)
                                }), t.$on("$destroy", function () {
                                    r.$$parentForm.$removeControl(r)
                                })
                            }, post: function (e, n, i, r) {
                                var o = r[0];
                                o.$options && o.$options.updateOn && n.on(o.$options.updateOn, function (t) {
                                    o.$$debounceViewValueCommit(t && t.type)
                                }), n.on("blur", function () {
                                    o.$touched || (t.$$phase ? e.$evalAsync(o.$setTouched) : e.$apply(o.$setTouched))
                                })
                            }
                        }
                    }
                }
            }], Ja = /(\s+|^)default(\s+|$)/, ts = function () {
                return {
                    restrict: "A", controller: ["$scope", "$attrs", function (t, e) {
                        var n = this;
                        this.$options = R(t.$eval(e.ngModelOptions)), y(this.$options.updateOn) ? (this.$options.updateOnDefault = !1, this.$options.updateOn = or(this.$options.updateOn.replace(Ja, function () {
                            return n.$options.updateOnDefault = !0, " "
                        }))) : this.$options.updateOnDefault = !0
                    }]
                }
            }, es = di({terminal: !0, priority: 1e3}), ns = e("ngOptions"),
            is = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([$\w][$\w]*)|(?:\(\s*([$\w][$\w]*)\s*,\s*([$\w][$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
            rs = ["$compile", "$document", "$parse", function (e, r, o) {
                function a(t, e, i) {
                    function r(t, e, n, i, r) {
                        this.selectValue = t, this.viewValue = e, this.label = n, this.group = i, this.disabled = r
                    }

                    function a(t) {
                        var e;
                        if (!c && n(t)) e = t; else {
                            e = [];
                            for (var i in t) t.hasOwnProperty(i) && "$" !== i.charAt(0) && e.push(i)
                        }
                        return e
                    }

                    var s = t.match(is);
                    if (!s) throw ns("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", t, K(e));
                    var l = s[5] || s[7], c = s[6], u = / as /.test(s[0]) && s[1], d = s[9], f = o(s[2] ? s[1] : l),
                        h = u && o(u), p = h || f, m = d && o(d), g = d ? function (t, e) {
                            return m(i, e)
                        } : function (t) {
                            return Zt(t)
                        }, v = function (t, e) {
                            return g(t, C(t, e))
                        }, y = o(s[2] || s[1]), $ = o(s[3] || ""), w = o(s[4] || ""), b = o(s[8]), x = {},
                        C = c ? function (t, e) {
                            return x[c] = e, x[l] = t, x
                        } : function (t) {
                            return x[l] = t, x
                        };
                    return {
                        trackBy: d, getTrackByValue: v, getWatchables: o(b, function (t) {
                            var e = [];
                            t = t || [];
                            for (var n = a(t), r = n.length, o = 0; o < r; o++) {
                                var l = t === n ? o : n[o], c = t[l], u = C(c, l), d = g(c, u);
                                if (e.push(d), s[2] || s[1]) {
                                    var f = y(i, u);
                                    e.push(f)
                                }
                                if (s[4]) {
                                    var h = w(i, u);
                                    e.push(h)
                                }
                            }
                            return e
                        }), getOptions: function () {
                            for (var t = [], e = {}, n = b(i) || [], o = a(n), s = o.length, l = 0; l < s; l++) {
                                var c = n === o ? l : o[l], u = n[c], f = C(u, c), h = p(i, f), m = g(h, f),
                                    x = y(i, f),
                                    k = $(i, f), S = w(i, f), _ = new r(m, h, x, k, S);
                                t.push(_), e[m] = _
                            }
                            return {
                                items: t, selectValueMap: e, getOptionFromViewValue: function (t) {
                                    return e[v(t)]
                                }, getViewValueFromOption: function (t) {
                                    return d ? R(t.viewValue) : t.viewValue
                                }
                            }
                        }
                    }
                }

                function s(t, n, o, s) {
                    function u(t, e) {
                        var n = l.cloneNode(!1);
                        e.appendChild(n), d(t, n)
                    }

                    function d(t, e) {
                        t.element = e, e.disabled = t.disabled, t.label !== e.label && (e.label = t.label, e.textContent = t.label), e.value = t.selectValue
                    }

                    function f() {
                        var t = k && p.readValue();
                        if (k) for (var e = k.items.length - 1; e >= 0; e--) {
                            var i = k.items[e];
                            Vt(y(i.group) ? i.element.parentNode : i.element)
                        }
                        k = S.getOptions();
                        var r = {};
                        if (b && n.prepend(h), k.items.forEach(function (t) {
                            var e;
                            y(t.group) ? (e = r[t.group], e || (e = c.cloneNode(!1), _.appendChild(e), e.label = null === t.group ? "null" : t.group, r[t.group] = e), u(t, e)) : u(t, _)
                        }), n[0].appendChild(_), m.$render(), !m.$isEmpty(t)) {
                            var o = p.readValue(), a = S.trackBy || g;
                            (a ? z(t, o) : t === o) || (m.$setViewValue(o), m.$render())
                        }
                    }

                    for (var h, p = s[0], m = s[1], g = o.multiple, v = 0, $ = n.children(), w = $.length; v < w; v++) if ("" === $[v].value) {
                        h = $.eq(v);
                        break
                    }
                    var b = !!h, x = !1, C = Wi(l.cloneNode(!1));
                    C.val("?");
                    var k, S = a(o.ngOptions, n, t), _ = r[0].createDocumentFragment(), E = function () {
                        b || n.prepend(h), n.val(""), x && (h.prop("selected", !0), h.attr("selected", !0))
                    }, T = function () {
                        b ? x && h.removeAttr("selected") : h.remove()
                    }, A = function () {
                        n.prepend(C), n.val("?"), C.prop("selected", !0), C.attr("selected", !0)
                    }, O = function () {
                        C.remove()
                    };
                    g ? (m.$isEmpty = function (t) {
                        return !t || 0 === t.length
                    }, p.writeValue = function (t) {
                        k.items.forEach(function (t) {
                            t.element.selected = !1
                        }), t && t.forEach(function (t) {
                            var e = k.getOptionFromViewValue(t);
                            e && (e.element.selected = !0)
                        })
                    }, p.readValue = function () {
                        var t = n.val() || [], e = [];
                        return i(t, function (t) {
                            var n = k.selectValueMap[t];
                            n && !n.disabled && e.push(k.getViewValueFromOption(n))
                        }), e
                    }, S.trackBy && t.$watchCollection(function () {
                        if (ir(m.$viewValue)) return m.$viewValue.map(function (t) {
                            return S.getTrackByValue(t)
                        })
                    }, function () {
                        m.$render()
                    })) : (p.writeValue = function (t) {
                        var e = k.selectValueMap[n.val()], i = k.getOptionFromViewValue(t);
                        e && e.element.removeAttribute("selected"),
                            i ? (n[0].value !== i.selectValue && (O(), T(), n[0].value = i.selectValue, i.element.selected = !0), i.element.setAttribute("selected", "selected")) : null === t || b ? (O(), E()) : (T(), A())
                    }, p.readValue = function () {
                        var t = k.selectValueMap[n.val()];
                        return t && !t.disabled ? (T(), O(), k.getViewValueFromOption(t)) : null
                    }, S.trackBy && t.$watch(function () {
                        return S.getTrackByValue(m.$viewValue)
                    }, function () {
                        m.$render()
                    })), b ? (h.remove(), e(h)(t), h[0].nodeType === vr ? (x = !1, p.registerOption = function (t, e) {
                        "" === e.val() && (x = !0, h = e, h.removeClass("ng-scope"), m.$render(), e.on("$destroy", function () {
                            h = void 0, x = !1
                        }))
                    }) : (h.removeClass("ng-scope"), x = !0)) : h = Wi(l.cloneNode(!1)), n.empty(), f(), t.$watchCollection(S.getWatchables, f)
                }

                var l = t.document.createElement("option"), c = t.document.createElement("optgroup");
                return {
                    restrict: "A", terminal: !0, require: ["select", "ngModel"], link: {
                        pre: function (t, e, n, i) {
                            i[0].registerOption = h
                        }, post: s
                    }
                }
            }], os = ["$locale", "$interpolate", "$log", function (t, e, n) {
                var r = /{}/g, o = /^when(Minus)?(.+)$/;
                return {
                    link: function (a, s, l) {
                        function c(t) {
                            s.text(t || "")
                        }

                        var u, d = l.count, f = l.$attr.when && s.attr(l.$attr.when), p = l.offset || 0,
                            m = a.$eval(f) || {},
                            g = {}, y = e.startSymbol(), $ = e.endSymbol(), w = y + d + "-" + p + $, b = tr.noop;
                        i(l, function (t, e) {
                            var n = o.exec(e);
                            if (n) {
                                var i = (n[1] ? "-" : "") + zi(n[2]);
                                m[i] = s.attr(l.$attr[e])
                            }
                        }), i(m, function (t, n) {
                            g[n] = e(t.replace(r, w))
                        }), a.$watch(d, function (e) {
                            var i = parseFloat(e), r = nr(i);
                            if (r || i in m || (i = t.pluralCat(i - p)), !(i === u || r && nr(u))) {
                                b();
                                var o = g[i];
                                v(o) ? (null != e && n.debug("ngPluralize: no rule defined for '" + i + "' in " + f), b = h, c()) : b = a.$watch(o, c), u = i
                            }
                        })
                    }
                }
            }], as = ["$parse", "$animate", "$compile", function (t, r, o) {
                var a = "$$NG_REMOVED", s = e("ngRepeat"), l = function (t, e, n, i, r, o, a) {
                    t[n] = i, r && (t[r] = o), t.$index = e, t.$first = 0 === e, t.$last = e === a - 1, t.$middle = !(t.$first || t.$last), t.$odd = !(t.$even = 0 === (1 & e))
                }, c = function (t) {
                    return t.clone[0]
                }, u = function (t) {
                    return t.clone[t.clone.length - 1]
                };
                return {
                    restrict: "A",
                    multiElement: !0,
                    transclude: "element",
                    priority: 1e3,
                    terminal: !0,
                    $$tlb: !0,
                    compile: function (e, d) {
                        var f = d.ngRepeat, h = o.$$createComment("end ngRepeat", f),
                            p = f.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);
                        if (!p) throw s("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", f);
                        var m = p[1], g = p[2], v = p[3], y = p[4];
                        if (p = m.match(/^(?:(\s*[$\w]+)|\(\s*([$\w]+)\s*,\s*([$\w]+)\s*\))$/), !p) throw s("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", m);
                        var $ = p[3] || p[1], w = p[2];
                        if (v && (!/^[$a-zA-Z_][$a-zA-Z0-9_]*$/.test(v) || /^(null|undefined|this|\$index|\$first|\$middle|\$last|\$even|\$odd|\$parent|\$root|\$id)$/.test(v))) throw s("badident", "alias '{0}' is invalid --- must be a valid JS identifier which is not a reserved name.", v);
                        var b, x, C, k, S = {$id: Zt};
                        return y ? b = t(y) : (C = function (t, e) {
                            return Zt(e)
                        }, k = function (t) {
                            return t
                        }), function (t, e, o, d, p) {
                            b && (x = function (e, n, i) {
                                return w && (S[w] = e), S[$] = n, S.$index = i, b(t, S)
                            });
                            var m = mt();
                            t.$watchCollection(g, function (o) {
                                var d, g, y, b, S, _, E, T, A, O, D, P, M = e[0], L = mt();
                                if (v && (t[v] = o), n(o)) A = o, T = x || C; else {
                                    T = x || k, A = [];
                                    for (var j in o) Ri.call(o, j) && "$" !== j.charAt(0) && A.push(j)
                                }
                                for (b = A.length, D = new Array(b), d = 0; d < b; d++) if (S = o === A ? d : A[d], _ = o[S], E = T(S, _, d), m[E]) O = m[E], delete m[E], L[E] = O, D[d] = O; else {
                                    if (L[E]) throw i(D, function (t) {
                                        t && t.scope && (m[t.id] = t)
                                    }), s("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}", f, E, _);
                                    D[d] = {id: E, scope: void 0, clone: void 0}, L[E] = !0
                                }
                                for (var N in m) {
                                    if (O = m[N], P = pt(O.clone), r.leave(P), P[0].parentNode) for (d = 0, g = P.length; d < g; d++) P[d][a] = !0;
                                    O.scope.$destroy()
                                }
                                for (d = 0; d < b; d++) if (S = o === A ? d : A[d], _ = o[S], O = D[d], O.scope) {
                                    y = M;
                                    do y = y.nextSibling; while (y && y[a]);
                                    c(O) !== y && r.move(pt(O.clone), null, M), M = u(O), l(O.scope, d, $, _, w, S, b)
                                } else p(function (t, e) {
                                    O.scope = e;
                                    var n = h.cloneNode(!1);
                                    t[t.length++] = n, r.enter(t, null, M), M = n, O.clone = t, L[O.id] = O, l(O.scope, d, $, _, w, S, b)
                                });
                                m = L
                            })
                        }
                    }
                }
            }], ss = "ng-hide", ls = "ng-hide-animate", cs = ["$animate", function (t) {
                return {
                    restrict: "A", multiElement: !0, link: function (e, n, i) {
                        e.$watch(i.ngShow, function (e) {
                            t[e ? "removeClass" : "addClass"](n, ss, {tempClasses: ls})
                        })
                    }
                }
            }], us = ["$animate", function (t) {
                return {
                    restrict: "A", multiElement: !0, link: function (e, n, i) {
                        e.$watch(i.ngHide, function (e) {
                            t[e ? "addClass" : "removeClass"](n, ss, {tempClasses: ls})
                        })
                    }
                }
            }], ds = di(function (t, e, n) {
                t.$watch(n.ngStyle, function (t, n) {
                    n && t !== n && i(n, function (t, n) {
                        e.css(n, "")
                    }), t && e.css(t)
                }, !0)
            }), fs = ["$animate", "$compile", function (t, e) {
                return {
                    require: "ngSwitch", controller: ["$scope", function () {
                        this.cases = {}
                    }], link: function (n, r, o, a) {
                        var s = o.ngSwitch || o.on, l = [], c = [], u = [], d = [], f = function (t, e) {
                            return function (n) {
                                n !== !1 && t.splice(e, 1)
                            }
                        };
                        n.$watch(s, function (n) {
                            for (var r, o; u.length;) t.cancel(u.pop());
                            for (r = 0, o = d.length; r < o; ++r) {
                                var s = pt(c[r].clone);
                                d[r].$destroy();
                                var h = u[r] = t.leave(s);
                                h.done(f(u, r))
                            }
                            c.length = 0, d.length = 0, (l = a.cases["!" + n] || a.cases["?"]) && i(l, function (n) {
                                n.transclude(function (i, r) {
                                    d.push(r);
                                    var o = n.element;
                                    i[i.length++] = e.$$createComment("end ngSwitchWhen");
                                    var a = {clone: i};
                                    c.push(a), t.enter(i, o.parent(), o)
                                })
                            })
                        })
                    }
                }
            }], hs = di({
                transclude: "element",
                priority: 1200,
                require: "^ngSwitch",
                multiElement: !0,
                link: function (t, e, n, r, o) {
                    var a = n.ngSwitchWhen.split(n.ngSwitchWhenSeparator).sort().filter(function (t, e, n) {
                        return n[e - 1] !== t
                    });
                    i(a, function (t) {
                        r.cases["!" + t] = r.cases["!" + t] || [], r.cases["!" + t].push({transclude: o, element: e})
                    })
                }
            }), ps = di({
                transclude: "element",
                priority: 1200,
                require: "^ngSwitch",
                multiElement: !0,
                link: function (t, e, n, i, r) {
                    i.cases["?"] = i.cases["?"] || [], i.cases["?"].push({transclude: r, element: e})
                }
            }), ms = e("ngTransclude"), gs = ["$compile", function (t) {
                return {
                    restrict: "EAC", terminal: !0, compile: function (e) {
                        var n = t(e.contents());
                        return e.empty(), function (t, e, i, r, o) {
                            function a(t, n) {
                                t.length ? e.append(t) : (s(), n.$destroy())
                            }

                            function s() {
                                n(t, function (t) {
                                    e.append(t)
                                })
                            }

                            if (!o) throw ms("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", K(e));
                            i.ngTransclude === i.$attr.ngTransclude && (i.ngTransclude = "");
                            var l = i.ngTransclude || i.ngTranscludeSlot;
                            o(a, null, l), l && !o.isSlotFilled(l) && s()
                        }
                    }
                }
            }], vs = ["$templateCache", function (t) {
                return {
                    restrict: "E", terminal: !0, compile: function (e, n) {
                        if ("text/ng-template" === n.type) {
                            var i = n.id, r = e[0].text;
                            t.put(i, r)
                        }
                    }
                }
            }], ys = {$setViewValue: h, $render: h}, $s = ["$element", "$scope", function (e, n) {
                var i = this, r = new Jt;
                i.ngModelCtrl = ys, i.unknownOption = Wi(t.document.createElement("option")), i.renderUnknownOption = function (t) {
                    var n = "? " + Zt(t) + " ?";
                    i.unknownOption.val(n), e.prepend(i.unknownOption), e.val(n)
                }, n.$on("$destroy", function () {
                    i.renderUnknownOption = h
                }), i.removeUnknownOption = function () {
                    i.unknownOption.parent() && i.unknownOption.remove()
                }, i.readValue = function () {
                    return i.removeUnknownOption(), e.val()
                }, i.writeValue = function (t) {
                    i.hasOption(t) ? (i.removeUnknownOption(), e.val(t), "" === t && i.emptyOption.prop("selected", !0)) : null == t && i.emptyOption ? (i.removeUnknownOption(), e.val("")) : i.renderUnknownOption(t)
                }, i.addOption = function (t, e) {
                    if (e[0].nodeType !== vr) {
                        ft(t, '"option value"'), "" === t && (i.emptyOption = e);
                        var n = r.get(t) || 0;
                        r.put(t, n + 1), i.ngModelCtrl.$render(), Ni(e)
                    }
                }, i.removeOption = function (t) {
                    var e = r.get(t);
                    e && (1 === e ? (r.remove(t), "" === t && (i.emptyOption = void 0)) : r.put(t, e - 1))
                }, i.hasOption = function (t) {
                    return !!r.get(t)
                }, i.registerOption = function (t, e, n, r, o) {
                    if (r) {
                        var a;
                        n.$observe("value", function (t) {
                            y(a) && i.removeOption(a), a = t, i.addOption(t, e)
                        })
                    } else o ? t.$watch(o, function (t, r) {
                        n.$set("value", t), r !== t && i.removeOption(r), i.addOption(t, e)
                    }) : i.addOption(n.value, e);
                    e.on("$destroy", function () {
                        i.removeOption(n.value), i.ngModelCtrl.$render()
                    })
                }
            }], ws = function () {
                function t(t, e, n, r) {
                    var o = r[1];
                    if (o) {
                        var a = r[0];
                        if (a.ngModelCtrl = o, e.on("change", function () {
                            t.$apply(function () {
                                o.$setViewValue(a.readValue())
                            })
                        }), n.multiple) {
                            a.readValue = function () {
                                var t = [];
                                return i(e.find("option"), function (e) {
                                    e.selected && t.push(e.value)
                                }), t
                            }, a.writeValue = function (t) {
                                var n = new Jt(t);
                                i(e.find("option"), function (t) {
                                    t.selected = y(n.get(t.value))
                                })
                            };
                            var s, l = NaN;
                            t.$watch(function () {
                                l !== o.$viewValue || z(s, o.$viewValue) || (s = vt(o.$viewValue), o.$render()), l = o.$viewValue
                            }), o.$isEmpty = function (t) {
                                return !t || 0 === t.length
                            }
                        }
                    }
                }

                function e(t, e, n, i) {
                    var r = i[1];
                    if (r) {
                        var o = i[0];
                        r.$render = function () {
                            o.writeValue(r.$viewValue)
                        }
                    }
                }

                return {
                    restrict: "E",
                    require: ["select", "?ngModel"],
                    controller: $s,
                    priority: 1,
                    link: {pre: t, post: e}
                }
            }, bs = ["$interpolate", function (t) {
                return {
                    restrict: "E", priority: 100, compile: function (e, n) {
                        var i, r;
                        return y(n.ngValue) ? i = !0 : y(n.value) ? i = t(n.value, !0) : (r = t(e.text(), !0), r || n.$set("value", e.text())), function (t, e, n) {
                            var o = "$selectController", a = e.parent(), s = a.data(o) || a.parent().data(o);
                            s && s.registerOption(t, e, n, i, r)
                        }
                    }
                }
            }], xs = function () {
                return {
                    restrict: "A", require: "?ngModel", link: function (t, e, n, i) {
                        i && (n.required = !0, i.$validators.required = function (t, e) {
                            return !n.required || !i.$isEmpty(e)
                        }, n.$observe("required", function () {
                            i.$validate()
                        }))
                    }
                }
            }, Cs = function () {
                return {
                    restrict: "A", require: "?ngModel", link: function (t, n, i, r) {
                        if (r) {
                            var o, a = i.ngPattern || i.pattern;
                            i.$observe("pattern", function (t) {
                                if (b(t) && t.length > 0 && (t = new RegExp("^" + t + "$")), t && !t.test) throw e("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", a, t, K(n));
                                o = t || void 0, r.$validate()
                            }), r.$validators.pattern = function (t, e) {
                                return r.$isEmpty(e) || v(o) || o.test(e)
                            }
                        }
                    }
                }
            }, ks = function () {
                return {
                    restrict: "A", require: "?ngModel", link: function (t, e, n, i) {
                        if (i) {
                            var r = -1;
                            n.$observe("maxlength", function (t) {
                                var e = d(t);
                                r = nr(e) ? -1 : e, i.$validate()
                            }), i.$validators.maxlength = function (t, e) {
                                return r < 0 || i.$isEmpty(e) || e.length <= r
                            }
                        }
                    }
                }
            }, Ss = function () {
                return {
                    restrict: "A", require: "?ngModel", link: function (t, e, n, i) {
                        if (i) {
                            var r = 0;
                            n.$observe("minlength", function (t) {
                                r = d(t) || 0, i.$validate()
                            }), i.$validators.minlength = function (t, e) {
                                return i.$isEmpty(e) || e.length >= r
                            }
                        }
                    }
                }
            };
        return t.angular.bootstrap ? void t.console : (ct(), wt(tr), tr.module("ngLocale", [], ["$provide", function (t) {
            function e(t) {
                t += "";
                var e = t.indexOf(".");
                return e == -1 ? 0 : t.length - e - 1
            }

            function n(t, n) {
                var i = n;
                void 0 === i && (i = Math.min(e(t), 3));
                var r = Math.pow(10, i), o = (t * r | 0) % r;
                return {v: i, f: o}
            }

            var i = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
            t.value("$locale", {
                DATETIME_FORMATS: {
                    AMPMS: ["AM", "PM"],
                    DAY: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    ERANAMES: ["Before Christ", "Anno Domini"],
                    ERAS: ["BC", "AD"],
                    FIRSTDAYOFWEEK: 6,
                    MONTH: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    SHORTDAY: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    SHORTMONTH: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    STANDALONEMONTH: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    WEEKENDRANGE: [5, 6],
                    fullDate: "EEEE, MMMM d, y",
                    longDate: "MMMM d, y",
                    medium: "MMM d, y h:mm:ss a",
                    mediumDate: "MMM d, y",
                    mediumTime: "h:mm:ss a",
                    "short": "M/d/yy h:mm a",
                    shortDate: "M/d/yy",
                    shortTime: "h:mm a"
                },
                NUMBER_FORMATS: {
                    CURRENCY_SYM: "$",
                    DECIMAL_SEP: ".",
                    GROUP_SEP: ",",
                    PATTERNS: [{
                        gSize: 3,
                        lgSize: 3,
                        maxFrac: 3,
                        minFrac: 0,
                        minInt: 1,
                        negPre: "-",
                        negSuf: "",
                        posPre: "",
                        posSuf: ""
                    }, {
                        gSize: 3,
                        lgSize: 3,
                        maxFrac: 2,
                        minFrac: 2,
                        minInt: 1,
                        negPre: "-¤",
                        negSuf: "",
                        posPre: "¤",
                        posSuf: ""
                    }]
                },
                id: "en-us",
                localeID: "en_US",
                pluralCat: function (t, e) {
                    var r = 0 | t, o = n(t, e);
                    return 1 == r && 0 == o.v ? i.ONE : i.OTHER
                }
            })
        }]), void Wi(t.document).ready(function () {
            rt(t.document, ot)
        }))
    }(window),


!window.angular.$$csp().noInlineStyle && window.angular.element(document.head).prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>'),

    function (t, e) {
        "use strict";

        function n(t, e, n) {
            if (!t) throw mt("areq", "Argument '{0}' is {1}", e || "?", n || "required");
            return t
        }

        function i(t, e) {
            return t || e ? t ? e ? (Q(t) && (t = t.join(" ")), Q(e) && (e = e.join(" ")), t + " " + e) : t : e : ""
        }

        function r(t) {
            var e = {};
            return t && (t.to || t.from) && (e.to = t.to, e.from = t.from), e
        }

        function o(t, e, n) {
            var i = "";
            return t = Q(t) ? t : t && tt(t) && t.length ? t.split(/\s+/) : [], Y(t, function (t, r) {
                t && t.length > 0 && (i += r > 0 ? " " : "", i += n ? e + t : t + e)
            }), i
        }

        function a(t, e) {
            var n = t.indexOf(e);
            e >= 0 && t.splice(n, 1)
        }

        function s(t) {
            if (t instanceof nt) switch (t.length) {
                case 0:
                    return t;
                case 1:
                    if (t[0].nodeType === F) return t;
                    break;
                default:
                    return nt(l(t))
            }
            if (t.nodeType === F) return nt(t)
        }

        function l(t) {
            if (!t[0]) return t;
            for (var e = 0; e < t.length; e++) {
                var n = t[e];
                if (n.nodeType === F) return n
            }
        }

        function c(t, e, n) {
            Y(e, function (e) {
                t.addClass(e, n)
            })
        }

        function u(t, e, n) {
            Y(e, function (e) {
                t.removeClass(e, n)
            })
        }

        function d(t) {
            return function (e, n) {
                n.addClass && (c(t, e, n.addClass), n.addClass = null), n.removeClass && (u(t, e, n.removeClass), n.removeClass = null)
            }
        }

        function f(t) {
            if (t = t || {}, !t.$$prepared) {
                var e = t.domOperation || it;
                t.domOperation = function () {
                    t.$$domOperationFired = !0, e(), e = it
                }, t.$$prepared = !0
            }
            return t
        }

        function h(t, e) {
            p(t, e), m(t, e)
        }

        function p(t, e) {
            e.from && (t.css(e.from), e.from = null)
        }

        function m(t, e) {
            e.to && (t.css(e.to), e.to = null)
        }

        function g(t, e, n) {
            var i = e.options || {}, r = n.options || {}, o = (i.addClass || "") + " " + (r.addClass || ""),
                a = (i.removeClass || "") + " " + (r.removeClass || ""), s = v(t.attr("class"), o, a);
            r.preparationClasses && (i.preparationClasses = k(r.preparationClasses, i.preparationClasses), delete r.preparationClasses);
            var l = i.domOperation !== it ? i.domOperation : null;
            return G(i, r), l && (i.domOperation = l), s.addClass ? i.addClass = s.addClass : i.addClass = null, s.removeClass ? i.removeClass = s.removeClass : i.removeClass = null, e.addClass = i.addClass, e.removeClass = i.removeClass, i
        }

        function v(t, e, n) {
            function i(t) {
                tt(t) && (t = t.split(" "));
                var e = {};
                return Y(t, function (t) {
                    t.length && (e[t] = !0)
                }), e
            }

            var r = 1, o = -1, a = {};
            t = i(t), e = i(e), Y(e, function (t, e) {
                a[e] = r
            }), n = i(n), Y(n, function (t, e) {
                a[e] = a[e] === r ? null : o
            });
            var s = {addClass: "", removeClass: ""};
            return Y(a, function (e, n) {
                var i, a;
                e === r ? (i = "addClass", a = !t[n] || t[n + R]) : e === o && (i = "removeClass", a = t[n] || t[n + I]), a && (s[i].length && (s[i] += " "), s[i] += n)
            }), s
        }

        function y(t) {
            return t instanceof nt ? t[0] : t
        }

        function $(t, e, n) {
            var i = "";
            e && (i = o(e, z, !0)), n.addClass && (i = k(i, o(n.addClass, I))), n.removeClass && (i = k(i, o(n.removeClass, R))), i.length && (n.preparationClasses = i, t.addClass(i))
        }

        function w(t, e) {
            e.preparationClasses && (t.removeClass(e.preparationClasses), e.preparationClasses = null), e.activeClasses && (t.removeClass(e.activeClasses), e.activeClasses = null)
        }

        function b(t, e) {
            var n = e ? "-" + e + "s" : "";
            return C(t, [ht, n]), [ht, n]
        }

        function x(t, e) {
            var n = e ? "paused" : "", i = j + ct;
            return C(t, [i, n]), [i, n]
        }

        function C(t, e) {
            var n = e[0], i = e[1];
            t.style[n] = i
        }

        function k(t, e) {
            return t ? e ? t + " " + e : t : e
        }

        function S(t) {
            return [ft, t + "s"]
        }

        function _(t, e) {
            var n = e ? dt : ht;
            return [n, t + "s"]
        }

        function E(t, e, n) {
            var i = Object.create(null), r = t.getComputedStyle(e) || {};
            return Y(n, function (t, e) {
                var n = r[t];
                if (n) {
                    var o = n.charAt(0);
                    ("-" === o || "+" === o || o >= 0) && (n = T(n)), 0 === n && (n = null), i[e] = n
                }
            }), i
        }

        function T(t) {
            var e = 0, n = t.split(/\s*,\s*/);
            return Y(n, function (t) {
                "s" === t.charAt(t.length - 1) && (t = t.substring(0, t.length - 1)), t = parseFloat(t) || 0, e = e ? Math.max(t, e) : t
            }), e
        }

        function A(t) {
            return 0 === t || null != t
        }

        function O(t, e) {
            var n = M, i = t + "s";
            return e ? n += rt : i += " linear all", [n, i]
        }

        function D() {
            var t = Object.create(null);
            return {
                flush: function () {
                    t = Object.create(null)
                }, count: function (e) {
                    var n = t[e];
                    return n ? n.total : 0
                }, get: function (e) {
                    var n = t[e];
                    return n && n.value
                }, put: function (e, n) {
                    t[e] ? t[e].total++ : t[e] = {total: 1, value: n}
                }
            }
        }

        function P(t, e, n) {
            Y(n, function (n) {
                t[n] = K(t[n]) ? t[n] : e.style.getPropertyValue(n)
            })
        }

        var M, L, j, N, F = 1, I = "-add", R = "-remove", z = "ng-", q = "-active", H = "-prepare", B = "ng-animate",
            V = "$$ngAnimateChildren", W = "";
        void 0 === t.ontransitionend && void 0 !== t.onwebkittransitionend ? (W = "-webkit-", M = "WebkitTransition", L = "webkitTransitionEnd transitionend") : (M = "transition", L = "transitionend"), void 0 === t.onanimationend && void 0 !== t.onwebkitanimationend ? (W = "-webkit-", j = "WebkitAnimation", N = "webkitAnimationEnd animationend") : (j = "animation", N = "animationend");
        var U, G, Y, Q, K, X, Z, J, tt, et, nt, it, rt = "Duration", ot = "Property", at = "Delay",
            st = "TimingFunction",
            lt = "IterationCount", ct = "PlayState", ut = 9999, dt = j + at, ft = j + rt, ht = M + at, pt = M + rt,
            mt = e.$$minErr("ng"), gt = ["$$rAF", function (t) {
                function e(t) {
                    i = i.concat(t), n()
                }

                function n() {
                    if (i.length) {
                        for (var e = i.shift(), o = 0; o < e.length; o++) e[o]();
                        r || t(function () {
                            r || n()
                        })
                    }
                }

                var i, r;
                return i = e.queue = [], e.waitUntilQuiet = function (e) {
                    r && r(), r = t(function () {
                        r = null, e(), n()
                    })
                }, e
            }], vt = ["$interpolate", function (t) {
                return {
                    link: function (e, n, i) {
                        function r(t) {
                            t = "on" === t || "true" === t, n.data(V, t)
                        }

                        var o = i.ngAnimateChildren;
                        tt(o) && 0 === o.length ? n.data(V, !0) : (r(t(o)(e)), i.$observe("ngAnimateChildren", r))
                    }
                }
            }], yt = "$$animateCss", $t = 1e3, wt = 3, bt = 1.5, xt = {
                transitionDuration: pt,
                transitionDelay: ht,
                transitionProperty: M + ot,
                animationDuration: ft,
                animationDelay: dt,
                animationIterationCount: j + lt
            }, Ct = {transitionDuration: pt, transitionDelay: ht, animationDuration: ft, animationDelay: dt},
            kt = ["$animateProvider", function (t) {
                var e = D(), n = D();
                this.$get = ["$window", "$$jqLite", "$$AnimateRunner", "$timeout", "$$forceReflow", "$sniffer", "$$rAFScheduler", "$$animateQueue", function (t, i, s, l, c, u, g, v) {
                    function $(t, e) {
                        var n = "$$ngAnimateParentKey", i = t.parentNode, r = i[n] || (i[n] = ++H);
                        return r + "-" + t.getAttribute("class") + "-" + e
                    }

                    function w(n, i, r, o) {
                        var a = e.get(r);
                        return a || (a = E(t, n, o), "infinite" === a.animationIterationCount && (a.animationIterationCount = 1)), e.put(r, a), a
                    }

                    function k(r, a, s, l) {
                        var c;
                        if (e.count(s) > 0 && (c = n.get(s), !c)) {
                            var u = o(a, "-stagger");
                            i.addClass(r, u), c = E(t, r, l), c.animationDuration = Math.max(c.animationDuration, 0), c.transitionDuration = Math.max(c.transitionDuration, 0), i.removeClass(r, u), n.put(s, c)
                        }
                        return c || {}
                    }

                    function T(t) {
                        B.push(t), g.waitUntilQuiet(function () {
                            e.flush(), n.flush();
                            for (var t = c(), i = 0; i < B.length; i++) B[i](t);
                            B.length = 0
                        })
                    }

                    function D(t, e, n) {
                        var i = w(t, e, n, xt), r = i.animationDelay, o = i.transitionDelay;
                        return i.maxDelay = r && o ? Math.max(r, o) : r || o, i.maxDuration = Math.max(i.animationDuration * i.animationIterationCount, i.transitionDuration), i
                    }

                    var F = d(i), H = 0, B = [];
                    return function (t, n) {
                        function c() {
                            g()
                        }

                        function d() {
                            g(!0)
                        }

                        function g(e) {
                            if (!(K || Z && X)) {
                                K = !0, X = !1, V.$$skipPreparationClasses || i.removeClass(t, xt), i.removeClass(t, St), x(G, !1), b(G, !1), Y(ct, function (t) {
                                    G.style[t[0]] = ""
                                }), F(t, V), h(t, V), Object.keys(W).length && Y(W, function (t, e) {
                                    t ? G.style.setProperty(e, t) : G.style.removeProperty(e)
                                }), V.onDone && V.onDone(), ht && ht.length && t.off(ht.join(" "), H);
                                var n = t.data(yt);
                                n && (l.cancel(n[0].timer), t.removeData(yt)), J && J.complete(!e)
                            }
                        }

                        function w(t) {
                            Rt.blockTransition && b(G, t), Rt.blockKeyframeAnimation && x(G, !!t)
                        }

                        function E() {
                            return J = new s({end: c, cancel: d}), T(it), g(), {
                                $$willAnimate: !1, start: function () {
                                    return J
                                }, end: c
                            }
                        }

                        function H(t) {
                            t.stopPropagation();
                            var e = t.originalEvent || t, n = e.$manualTimeStamp || Date.now(),
                                i = parseFloat(e.elapsedTime.toFixed(wt));
                            Math.max(n - lt, 0) >= nt && i >= rt && (Z = !0, g())
                        }

                        function B() {
                            function e() {
                                if (!K) {
                                    if (w(!1), Y(ct, function (t) {
                                        var e = t[0], n = t[1];
                                        G.style[e] = n
                                    }), F(t, V), i.addClass(t, St), Rt.recalculateTimingStyles) {
                                        if (kt = G.className + " " + xt, Tt = $(G, kt), Ft = D(G, kt, Tt), It = Ft.maxDelay, et = Math.max(It, 0), rt = Ft.maxDuration, 0 === rt) return void g();
                                        Rt.hasTransitions = Ft.transitionDuration > 0, Rt.hasAnimations = Ft.animationDuration > 0
                                    }
                                    if (Rt.applyAnimationDelay && (It = "boolean" != typeof V.delay && A(V.delay) ? parseFloat(V.delay) : It, et = Math.max(It, 0), Ft.animationDelay = It, zt = _(It, !0), ct.push(zt), G.style[zt[0]] = zt[1]), nt = et * $t, at = rt * $t, V.easing) {
                                        var e, r = V.easing;
                                        Rt.hasTransitions && (e = M + st, ct.push([e, r]), G.style[e] = r), Rt.hasAnimations && (e = j + st, ct.push([e, r]), G.style[e] = r)
                                    }
                                    Ft.transitionDuration && ht.push(L), Ft.animationDuration && ht.push(N), lt = Date.now();
                                    var o = nt + bt * at, a = lt + o, s = t.data(yt) || [], c = !0;
                                    if (s.length) {
                                        var u = s[0];
                                        c = a > u.expectedEndTime, c ? l.cancel(u.timer) : s.push(g)
                                    }
                                    if (c) {
                                        var d = l(n, o, !1);
                                        s[0] = {timer: d, expectedEndTime: a}, s.push(g), t.data(yt, s)
                                    }
                                    ht.length && t.on(ht.join(" "), H), V.to && (V.cleanupStyles && P(W, G, Object.keys(V.to)), m(t, V))
                                }
                            }

                            function n() {
                                var e = t.data(yt);
                                if (e) {
                                    for (var n = 1; n < e.length; n++) e[n]();
                                    t.removeData(yt)
                                }
                            }

                            if (!K) {
                                if (!G.parentNode) return void g();
                                var r = function (t) {
                                        if (Z) X && t && (X = !1, g()); else if (X = !t, Ft.animationDuration) {
                                            var e = x(G, X);
                                            X ? ct.push(e) : a(ct, e)
                                        }
                                    },
                                    o = jt > 0 && (Ft.transitionDuration && 0 === At.transitionDuration || Ft.animationDuration && 0 === At.animationDuration) && Math.max(At.animationDelay, At.transitionDelay);
                                o ? l(e, Math.floor(o * jt * $t), !1) : e(), tt.resume = function () {
                                    r(!0)
                                }, tt.pause = function () {
                                    r(!1)
                                }
                            }
                        }

                        var V = n || {};
                        V.$$prepared || (V = f(U(V)));
                        var W = {}, G = y(t);
                        if (!G || !G.parentNode || !v.enabled()) return E();
                        var K, X, Z, J, tt, et, nt, rt, at, lt, ct = [], dt = t.attr("class"), ft = r(V), ht = [];
                        if (0 === V.duration || !u.animations && !u.transitions) return E();
                        var pt = V.event && Q(V.event) ? V.event.join(" ") : V.event, mt = pt && V.structural, gt = "",
                            vt = "";
                        mt ? gt = o(pt, z, !0) : pt && (gt = pt), V.addClass && (vt += o(V.addClass, I)), V.removeClass && (vt.length && (vt += " "), vt += o(V.removeClass, R)), V.applyClassesEarly && vt.length && F(t, V);
                        var xt = [gt, vt].join(" ").trim(), kt = dt + " " + xt, St = o(xt, q),
                            _t = ft.to && Object.keys(ft.to).length > 0, Et = (V.keyframeStyle || "").length > 0;
                        if (!Et && !_t && !xt) return E();
                        var Tt, At;
                        if (V.stagger > 0) {
                            var Ot = parseFloat(V.stagger);
                            At = {transitionDelay: Ot, animationDelay: Ot, transitionDuration: 0, animationDuration: 0}
                        } else Tt = $(G, kt), At = k(G, xt, Tt, Ct);
                        V.$$skipPreparationClasses || i.addClass(t, xt);
                        var Dt;
                        if (V.transitionStyle) {
                            var Pt = [M, V.transitionStyle];
                            C(G, Pt), ct.push(Pt)
                        }
                        if (V.duration >= 0) {
                            Dt = G.style[M].length > 0;
                            var Mt = O(V.duration, Dt);
                            C(G, Mt), ct.push(Mt)
                        }
                        if (V.keyframeStyle) {
                            var Lt = [j, V.keyframeStyle];
                            C(G, Lt), ct.push(Lt)
                        }
                        var jt = At ? V.staggerIndex >= 0 ? V.staggerIndex : e.count(Tt) : 0, Nt = 0 === jt;
                        Nt && !V.skipBlocking && b(G, ut);
                        var Ft = D(G, kt, Tt), It = Ft.maxDelay;
                        et = Math.max(It, 0), rt = Ft.maxDuration;
                        var Rt = {};
                        if (Rt.hasTransitions = Ft.transitionDuration > 0, Rt.hasAnimations = Ft.animationDuration > 0, Rt.hasTransitionAll = Rt.hasTransitions && "all" === Ft.transitionProperty, Rt.applyTransitionDuration = _t && (Rt.hasTransitions && !Rt.hasTransitionAll || Rt.hasAnimations && !Rt.hasTransitions), Rt.applyAnimationDuration = V.duration && Rt.hasAnimations, Rt.applyTransitionDelay = A(V.delay) && (Rt.applyTransitionDuration || Rt.hasTransitions), Rt.applyAnimationDelay = A(V.delay) && Rt.hasAnimations, Rt.recalculateTimingStyles = vt.length > 0, (Rt.applyTransitionDuration || Rt.applyAnimationDuration) && (rt = V.duration ? parseFloat(V.duration) : rt, Rt.applyTransitionDuration && (Rt.hasTransitions = !0, Ft.transitionDuration = rt, Dt = G.style[M + ot].length > 0, ct.push(O(rt, Dt))), Rt.applyAnimationDuration && (Rt.hasAnimations = !0, Ft.animationDuration = rt, ct.push(S(rt)))), 0 === rt && !Rt.recalculateTimingStyles) return E();
                        if (null != V.delay) {
                            var zt;
                            "boolean" != typeof V.delay && (zt = parseFloat(V.delay), et = Math.max(zt, 0)), Rt.applyTransitionDelay && ct.push(_(zt)), Rt.applyAnimationDelay && ct.push(_(zt, !0))
                        }
                        return null == V.duration && Ft.transitionDuration > 0 && (Rt.recalculateTimingStyles = Rt.recalculateTimingStyles || Nt), nt = et * $t, at = rt * $t, V.skipBlocking || (Rt.blockTransition = Ft.transitionDuration > 0, Rt.blockKeyframeAnimation = Ft.animationDuration > 0 && At.animationDelay > 0 && 0 === At.animationDuration), V.from && (V.cleanupStyles && P(W, G, Object.keys(V.from)), p(t, V)), Rt.blockTransition || Rt.blockKeyframeAnimation ? w(rt) : V.skipBlocking || b(G, !1), {
                            $$willAnimate: !0,
                            end: c,
                            start: function () {
                                if (!K) return tt = {
                                    end: c,
                                    cancel: d,
                                    resume: null,
                                    pause: null
                                }, J = new s(tt), T(B), J
                            }
                        }
                    }
                }]
            }], St = ["$$animationProvider", function (t) {
                function e(t) {
                    return t.parentNode && 11 === t.parentNode.nodeType
                }

                t.drivers.push("$$animateCssDriver");
                var n = "ng-animate-shim", i = "ng-anchor", r = "ng-anchor-out", o = "ng-anchor-in";
                this.$get = ["$animateCss", "$rootScope", "$$AnimateRunner", "$rootElement", "$sniffer", "$$jqLite", "$document", function (t, a, s, l, c, u, d) {
                    function f(t) {
                        return t.replace(/\bng-\S+\b/g, "")
                    }

                    function h(t, e) {
                        return tt(t) && (t = t.split(" ")), tt(e) && (e = e.split(" ")), t.filter(function (t) {
                            return e.indexOf(t) === -1
                        }).join(" ")
                    }

                    function p(e, a, l) {
                        function c(t) {
                            var e = {}, n = y(t).getBoundingClientRect();
                            return Y(["width", "height", "top", "left"], function (t) {
                                var i = n[t];
                                switch (t) {
                                    case"top":
                                        i += v.scrollTop;
                                        break;
                                    case"left":
                                        i += v.scrollLeft
                                }
                                e[t] = Math.floor(i) + "px"
                            }), e
                        }

                        function u() {
                            var e = t(g, {addClass: r, delay: !0, from: c(a)});
                            return e.$$willAnimate ? e : null
                        }

                        function d(t) {
                            return t.attr("class") || ""
                        }

                        function p() {
                            var e = f(d(l)), n = h(e, $), i = h($, e),
                                a = t(g, {to: c(l), addClass: o + " " + n, removeClass: r + " " + i, delay: !0});
                            return a.$$willAnimate ? a : null
                        }

                        function m() {
                            g.remove(), a.removeClass(n), l.removeClass(n)
                        }

                        var g = nt(y(a).cloneNode(!0)), $ = f(d(g));
                        a.addClass(n), l.addClass(n), g.addClass(i), w.append(g);
                        var b, x = u();
                        if (!x && (b = p(), !b)) return m();
                        var C = x || b;
                        return {
                            start: function () {
                                function t() {
                                    n && n.end()
                                }

                                var e, n = C.start();
                                return n.done(function () {
                                    return n = null, !b && (b = p()) ? (n = b.start(), n.done(function () {
                                        n = null, m(), e.complete()
                                    }), n) : (m(), void e.complete())
                                }), e = new s({end: t, cancel: t})
                            }
                        }
                    }

                    function m(t, e, n, i) {
                        var r = g(t, it), o = g(e, it), a = [];
                        if (Y(i, function (t) {
                            var e = t.out, i = t["in"], r = p(n, e, i);
                            r && a.push(r)
                        }), r || o || 0 !== a.length) return {
                            start: function () {
                                function t() {
                                    Y(e, function (t) {
                                        t.end()
                                    })
                                }

                                var e = [];
                                r && e.push(r.start()), o && e.push(o.start()), Y(a, function (t) {
                                    e.push(t.start())
                                });
                                var n = new s({end: t, cancel: t});
                                return s.all(e, function (t) {
                                    n.complete(t)
                                }), n
                            }
                        }
                    }

                    function g(e) {
                        var n = e.element, i = e.options || {};
                        e.structural && (i.event = e.event, i.structural = !0, i.applyClassesEarly = !0, "leave" === e.event && (i.onDone = i.domOperation)), i.preparationClasses && (i.event = k(i.event, i.preparationClasses));
                        var r = t(n, i);
                        return r.$$willAnimate ? r : null
                    }

                    if (!c.animations && !c.transitions) return it;
                    var v = d[0].body, $ = y(l), w = nt(e($) || v.contains($) ? $ : v);
                    return function (t) {
                        return t.from && t.to ? m(t.from, t.to, t.classes, t.anchors) : g(t)
                    }
                }]
            }], _t = ["$animateProvider", function (t) {
                this.$get = ["$injector", "$$AnimateRunner", "$$jqLite", function (e, n, i) {
                    function r(n) {
                        n = Q(n) ? n : n.split(" ");
                        for (var i = [], r = {}, o = 0; o < n.length; o++) {
                            var a = n[o], s = t.$$registeredAnimations[a];
                            s && !r[a] && (i.push(e.get(s)), r[a] = !0)
                        }
                        return i
                    }

                    var o = d(i);
                    return function (t, e, i, a) {
                        function s() {
                            a.domOperation(), o(t, a)
                        }

                        function l() {
                            p = !0, s(), h(t, a)
                        }

                        function c(t, e, i, r, o) {
                            var a;
                            switch (i) {
                                case"animate":
                                    a = [e, r.from, r.to, o];
                                    break;
                                case"setClass":
                                    a = [e, v, y, o];
                                    break;
                                case"addClass":
                                    a = [e, v, o];
                                    break;
                                case"removeClass":
                                    a = [e, y, o];
                                    break;
                                default:
                                    a = [e, o]
                            }
                            a.push(r);
                            var s = t.apply(t, a);
                            if (s) if (Z(s.start) && (s = s.start()), s instanceof n) s.done(o); else if (Z(s)) return s;
                            return it
                        }

                        function u(t, e, i, r, o) {
                            var a = [];
                            return Y(r, function (r) {
                                var s = r[o];
                                s && a.push(function () {
                                    var r, o, a = !1, l = function (t) {
                                        a || (a = !0, (o || it)(t), r.complete(!t))
                                    };
                                    return r = new n({
                                        end: function () {
                                            l()
                                        }, cancel: function () {
                                            l(!0)
                                        }
                                    }), o = c(s, t, e, i, function (t) {
                                        var e = t === !1;
                                        l(e)
                                    }), r
                                })
                            }), a
                        }

                        function d(t, e, i, r, o) {
                            var a = u(t, e, i, r, o);
                            if (0 === a.length) {
                                var s, l;
                                "beforeSetClass" === o ? (s = u(t, "removeClass", i, r, "beforeRemoveClass"), l = u(t, "addClass", i, r, "beforeAddClass")) : "setClass" === o && (s = u(t, "removeClass", i, r, "removeClass"), l = u(t, "addClass", i, r, "addClass")), s && (a = a.concat(s)), l && (a = a.concat(l))
                            }
                            if (0 !== a.length) return function (t) {
                                var e = [];
                                return a.length && Y(a, function (t) {
                                    e.push(t())
                                }), e.length ? n.all(e, t) : t(), function (t) {
                                    Y(e, function (e) {
                                        t ? e.cancel() : e.end()
                                    })
                                }
                            }
                        }

                        var p = !1;
                        3 === arguments.length && J(i) && (a = i, i = null), a = f(a), i || (i = t.attr("class") || "", a.addClass && (i += " " + a.addClass), a.removeClass && (i += " " + a.removeClass));
                        var m, g, v = a.addClass, y = a.removeClass, $ = r(i);
                        if ($.length) {
                            var w, b;
                            "leave" === e ? (b = "leave", w = "afterLeave") : (b = "before" + e.charAt(0).toUpperCase() + e.substr(1), w = e), "enter" !== e && "move" !== e && (m = d(t, e, a, $, b)), g = d(t, e, a, $, w)
                        }
                        if (m || g) {
                            var x;
                            return {
                                $$willAnimate: !0, end: function () {
                                    return x ? x.end() : (l(), x = new n, x.complete(!0)), x
                                }, start: function () {
                                    function t(t) {
                                        l(t), x.complete(t)
                                    }

                                    function e(e) {
                                        p || ((i || it)(e), t(e))
                                    }

                                    if (x) return x;
                                    x = new n;
                                    var i, r = [];
                                    return m && r.push(function (t) {
                                        i = m(t)
                                    }), r.length ? r.push(function (t) {
                                        s(), t(!0)
                                    }) : s(), g && r.push(function (t) {
                                        i = g(t)
                                    }), x.setHost({
                                        end: function () {
                                            e()
                                        }, cancel: function () {
                                            e(!0)
                                        }
                                    }), n.chain(r, t), x
                                }
                            }
                        }
                    }
                }]
            }], Et = ["$$animationProvider", function (t) {
                t.drivers.push("$$animateJsDriver"), this.$get = ["$$animateJs", "$$AnimateRunner", function (t, e) {
                    function n(e) {
                        var n = e.element, i = e.event, r = e.options, o = e.classes;
                        return t(n, i, o, r)
                    }

                    return function (t) {
                        if (t.from && t.to) {
                            var i = n(t.from), r = n(t.to);
                            if (!i && !r) return;
                            return {
                                start: function () {
                                    function t() {
                                        return function () {
                                            Y(o, function (t) {
                                                t.end()
                                            })
                                        }
                                    }

                                    function n(t) {
                                        a.complete(t)
                                    }

                                    var o = [];
                                    i && o.push(i.start()), r && o.push(r.start()), e.all(o, n);
                                    var a = new e({end: t(), cancel: t()});
                                    return a
                                }
                            }
                        }
                        return n(t)
                    }
                }]
            }], Tt = "data-ng-animate", At = "$ngAnimatePin", Ot = ["$animateProvider", function (e) {
                function i(t) {
                    if (!t) return null;
                    var e = t.split(p), n = Object.create(null);
                    return Y(e, function (t) {
                        n[t] = !0
                    }), n
                }

                function r(t, e) {
                    if (t && e) {
                        var n = i(e);
                        return t.split(p).some(function (t) {
                            return n[t]
                        })
                    }
                }

                function o(t, e, n, i) {
                    return m[t].some(function (t) {
                        return t(e, n, i)
                    })
                }

                function a(t, e) {
                    var n = (t.addClass || "").length > 0, i = (t.removeClass || "").length > 0;
                    return e ? n && i : n || i
                }

                var c = 1, u = 2, p = " ", m = this.rules = {skip: [], cancel: [], join: []};
                m.join.push(function (t, e, n) {
                    return !e.structural && a(e)
                }), m.skip.push(function (t, e, n) {
                    return !e.structural && !a(e)
                }), m.skip.push(function (t, e, n) {
                    return "leave" === n.event && e.structural
                }), m.skip.push(function (t, e, n) {
                    return n.structural && n.state === u && !e.structural
                }), m.cancel.push(function (t, e, n) {
                    return n.structural && e.structural
                }), m.cancel.push(function (t, e, n) {
                    return n.state === u && e.structural
                }), m.cancel.push(function (t, e, n) {
                    if (n.structural) return !1;
                    var i = e.addClass, o = e.removeClass, a = n.addClass, s = n.removeClass;
                    return !(et(i) && et(o) || et(a) && et(s)) && (r(i, s) || r(o, a))
                }), this.$get = ["$$rAF", "$rootScope", "$rootElement", "$document", "$$HashMap", "$$animation", "$$AnimateRunner", "$templateRequest", "$$jqLite", "$$forceReflow", function (i, r, p, m, v, b, x, C, k, S) {
                    function _() {
                        var t = !1;
                        return function (e) {
                            t ? e() : r.$$postDigest(function () {
                                t = !0, e()
                            })
                        }
                    }

                    function E(t, e) {
                        return g(t, e, {})
                    }

                    function T(t, e, n) {
                        var i = y(e), r = y(t), o = [], a = H[n];
                        return a && Y(a, function (t) {
                            it.call(t.node, i) ? o.push(t.callback) : "leave" === n && it.call(t.node, r) && o.push(t.callback)
                        }), o
                    }

                    function A(t, e, n) {
                        var i = l(e);
                        return t.filter(function (t) {
                            var e = t.node === i && (!n || t.callback === n);
                            return !e
                        })
                    }

                    function O(t, e) {
                        "close" !== t || e[0].parentNode || rt.off(e)
                    }

                    function D(t, e, n) {
                        function l(e, n, r, o) {
                            S(function () {
                                var e = T(v, t, n);
                                e.length ? i(function () {
                                    Y(e, function (e) {
                                        e(t, r, o)
                                    }), O(r, t)
                                }) : O(r, t)
                            }), e.progress(n, r, o)
                        }

                        function d(e) {
                            w(t, C), Z(t, C), h(t, C), C.domOperation(), k.complete(!e)
                        }

                        var p, v, C = U(n);
                        t = s(t), t && (p = y(t), v = t.parent()), C = f(C);
                        var k = new x, S = _();
                        if (Q(C.addClass) && (C.addClass = C.addClass.join(" ")), C.addClass && !tt(C.addClass) && (C.addClass = null), Q(C.removeClass) && (C.removeClass = C.removeClass.join(" ")), C.removeClass && !tt(C.removeClass) && (C.removeClass = null), C.from && !J(C.from) && (C.from = null), C.to && !J(C.to) && (C.to = null), !p) return d(), k;
                        var A = [p.className, C.addClass, C.removeClass].join(" ");
                        if (!W(A)) return d(), k;
                        var D = ["enter", "move", "leave"].indexOf(e) >= 0, L = m[0].hidden, F = !z || L || R.get(p),
                            q = !F && I.get(p) || {}, H = !!q.state;
                        if (F || H && q.state === c || (F = !j(t, v, e)), F) return L && l(k, e, "start"), d(), L && l(k, e, "close"), k;
                        D && P(t);
                        var B = {
                            structural: D,
                            element: t,
                            event: e,
                            addClass: C.addClass,
                            removeClass: C.removeClass,
                            close: d,
                            options: C,
                            runner: k
                        };
                        if (H) {
                            var V = o("skip", t, B, q);
                            if (V) return q.state === u ? (d(), k) : (g(t, q, B), q.runner);
                            var G = o("cancel", t, B, q);
                            if (G) if (q.state === u) q.runner.end(); else {
                                if (!q.structural) return g(t, q, B), q.runner;
                                q.close()
                            } else {
                                var K = o("join", t, B, q);
                                if (K) {
                                    if (q.state !== u) return $(t, D ? e : null, C), e = B.event = q.event, C = g(t, q, B), q.runner;
                                    E(t, B)
                                }
                            }
                        } else E(t, B);
                        var X = B.structural;
                        if (X || (X = "animate" === B.event && Object.keys(B.options.to || {}).length > 0 || a(B)), !X) return d(), M(t), k;
                        var et = (q.counter || 0) + 1;
                        return B.counter = et, N(t, c, B), r.$$postDigest(function () {
                            var n = I.get(p), i = !n;
                            n = n || {};
                            var r = t.parent() || [], o = r.length > 0 && ("animate" === n.event || n.structural || a(n));
                            if (i || n.counter !== et || !o) return i && (Z(t, C), h(t, C)), (i || D && n.event !== e) && (C.domOperation(), k.end()), void (o || M(t));
                            e = !n.structural && a(n, !0) ? "setClass" : n.event, N(t, u);
                            var s = b(t, e, n.options);
                            k.setHost(s), l(k, e, "start", {}), s.done(function (n) {
                                d(!n);
                                var i = I.get(p);
                                i && i.counter === et && M(y(t)), l(k, e, "close", {})
                            })
                        }), k
                    }

                    function P(t) {
                        var e = y(t), n = e.querySelectorAll("[" + Tt + "]");
                        Y(n, function (t) {
                            var e = parseInt(t.getAttribute(Tt), 10), n = I.get(t);
                            if (n) switch (e) {
                                case u:
                                    n.runner.end();
                                case c:
                                    I.remove(t)
                            }
                        })
                    }

                    function M(t) {
                        var e = y(t);
                        e.removeAttribute(Tt), I.remove(e)
                    }

                    function L(t, e) {
                        return y(t) === y(e)
                    }

                    function j(t, e, n) {
                        var i, r = nt(m[0].body), o = L(t, r) || "HTML" === t[0].nodeName, a = L(t, p), s = !1,
                            l = R.get(y(t)),
                            c = nt.data(t[0], At);
                        for (c && (e = c), e = y(e); e && (a || (a = L(e, p)), e.nodeType === F);) {
                            var u = I.get(e) || {};
                            if (!s) {
                                var d = R.get(e);
                                if (d === !0 && l !== !1) {
                                    l = !0;
                                    break
                                }
                                d === !1 && (l = !1), s = u.structural
                            }
                            if (et(i) || i === !0) {
                                var f = nt.data(e, V);
                                K(f) && (i = f)
                            }
                            if (s && i === !1) break;
                            if (o || (o = L(e, r)), o && a) break;
                            e = a || !(c = nt.data(e, At)) ? e.parentNode : y(c)
                        }
                        var h = (!s || i) && l !== !0;
                        return h && a && o
                    }

                    function N(t, e, n) {
                        n = n || {}, n.state = e;
                        var i = y(t);
                        i.setAttribute(Tt, e);
                        var r = I.get(i), o = r ? G(r, n) : n;
                        I.put(i, o)
                    }

                    var I = new v, R = new v, z = null, q = r.$watch(function () {
                        return 0 === C.totalPendingRequests
                    }, function (t) {
                        t && (q(), r.$$postDigest(function () {
                            r.$$postDigest(function () {
                                null === z && (z = !0)
                            })
                        }))
                    }), H = Object.create(null), B = e.classNameFilter(), W = B ? function (t) {
                        return B.test(t)
                    } : function () {
                        return !0
                    }, Z = d(k), it = t.Node.prototype.contains || function (t) {
                        return this === t || !!(16 & this.compareDocumentPosition(t))
                    }, rt = {
                        on: function (t, e, n) {
                            var i = l(e);
                            H[t] = H[t] || [], H[t].push({node: i, callback: n}), nt(e).on("$destroy", function () {
                                var r = I.get(i);
                                r || rt.off(t, e, n)
                            })
                        }, off: function (t, e, n) {
                            if (1 !== arguments.length || tt(arguments[0])) {
                                var i = H[t];
                                i && (H[t] = 1 === arguments.length ? null : A(i, e, n))
                            } else {
                                e = arguments[0];
                                for (var r in H) H[r] = A(H[r], e)
                            }
                        }, pin: function (t, e) {
                            n(X(t), "element", "not an element"), n(X(e), "parentElement", "not an element"), t.data(At, e)
                        }, push: function (t, e, n, i) {
                            return n = n || {}, n.domOperation = i, D(t, e, n)
                        }, enabled: function (t, e) {
                            var n = arguments.length;
                            if (0 === n) e = !!z; else {
                                var i = X(t);
                                if (i) {
                                    var r = y(t);
                                    1 === n ? e = !R.get(r) : R.put(r, !e)
                                } else e = z = !!t
                            }
                            return e
                        }
                    };
                    return rt
                }]
            }], Dt = ["$animateProvider", function (t) {
                function e(t, e) {
                    t.data(s, e)
                }

                function n(t) {
                    t.removeData(s)
                }

                function r(t) {
                    return t.data(s)
                }

                var o = "ng-animate-ref", a = this.drivers = [], s = "$$animationRunner";
                this.$get = ["$$jqLite", "$rootScope", "$injector", "$$AnimateRunner", "$$HashMap", "$$rAFScheduler", function (t, s, l, c, u, p) {
                    function m(t) {
                        function e(t) {
                            if (t.processed) return t;
                            t.processed = !0;
                            var n = t.domNode, i = n.parentNode;
                            o.put(n, t);
                            for (var a; i;) {
                                if (a = o.get(i)) {
                                    a.processed || (a = e(a));
                                    break
                                }
                                i = i.parentNode
                            }
                            return (a || r).children.push(t), t
                        }

                        function n(t) {
                            var e, n = [], i = [];
                            for (e = 0; e < t.children.length; e++) i.push(t.children[e]);
                            var r = i.length, o = 0, a = [];
                            for (e = 0; e < i.length; e++) {
                                var s = i[e];
                                r <= 0 && (r = o, o = 0, n.push(a), a = []), a.push(s.fn), s.children.forEach(function (t) {
                                    o++, i.push(t)
                                }), r--
                            }
                            return a.length && n.push(a), n
                        }

                        var i, r = {children: []}, o = new u;
                        for (i = 0; i < t.length; i++) {
                            var a = t[i];
                            o.put(a.domNode, t[i] = {domNode: a.domNode, fn: a.fn, children: []})
                        }
                        for (i = 0; i < t.length; i++) e(t[i]);
                        return n(r)
                    }

                    var g = [], v = d(t);
                    return function (u, d, $) {
                        function w(t) {
                            var e = "[" + o + "]", n = t.hasAttribute(o) ? [t] : t.querySelectorAll(e), i = [];
                            return Y(n, function (t) {
                                var e = t.getAttribute(o);
                                e && e.length && i.push(t)
                            }), i
                        }

                        function b(t) {
                            var e = [], n = {};
                            Y(t, function (t, i) {
                                var r = t.element, a = y(r), s = t.event, l = ["enter", "move"].indexOf(s) >= 0,
                                    c = t.structural ? w(a) : [];
                                if (c.length) {
                                    var u = l ? "to" : "from";
                                    Y(c, function (t) {
                                        var e = t.getAttribute(o);
                                        n[e] = n[e] || {}, n[e][u] = {animationID: i, element: nt(t)}
                                    })
                                } else e.push(t)
                            });
                            var i = {}, r = {};
                            return Y(n, function (n, o) {
                                var a = n.from, s = n.to;
                                if (!a || !s) {
                                    var l = a ? a.animationID : s.animationID, c = l.toString();
                                    return void (i[c] || (i[c] = !0, e.push(t[l])))
                                }
                                var u = t[a.animationID], d = t[s.animationID], f = a.animationID.toString();
                                if (!r[f]) {
                                    var h = r[f] = {
                                        structural: !0, beforeStart: function () {
                                            u.beforeStart(), d.beforeStart()
                                        }, close: function () {
                                            u.close(), d.close()
                                        }, classes: x(u.classes, d.classes), from: u, to: d, anchors: []
                                    };
                                    h.classes.length ? e.push(h) : (e.push(u), e.push(d))
                                }
                                r[f].anchors.push({out: a.element, "in": s.element})
                            }), e
                        }

                        function x(t, e) {
                            t = t.split(" "), e = e.split(" ");
                            for (var n = [], i = 0; i < t.length; i++) {
                                var r = t[i];
                                if ("ng-" !== r.substring(0, 3)) for (var o = 0; o < e.length; o++) if (r === e[o]) {
                                    n.push(r);
                                    break
                                }
                            }
                            return n.join(" ")
                        }

                        function C(t) {
                            for (var e = a.length - 1; e >= 0; e--) {
                                var n = a[e], i = l.get(n), r = i(t);
                                if (r) return r
                            }
                        }

                        function k() {
                            u.addClass(B), D && t.addClass(u, D), P && (t.removeClass(u, P), P = null)
                        }

                        function S(t, e) {
                            function n(t) {
                                var n = r(t);
                                n && n.setHost(e)
                            }

                            t.from && t.to ? (n(t.from.element), n(t.to.element)) : n(t.element)
                        }

                        function _() {
                            var t = r(u);
                            !t || "leave" === d && $.$$domOperationFired || t.end()
                        }

                        function E(e) {
                            u.off("$destroy", _), n(u), v(u, $), h(u, $), $.domOperation(), D && t.removeClass(u, D), u.removeClass(B), A.complete(!e)
                        }

                        $ = f($);
                        var T = ["enter", "move", "leave"].indexOf(d) >= 0, A = new c({
                            end: function () {
                                E()
                            }, cancel: function () {
                                E(!0)
                            }
                        });
                        if (!a.length) return E(), A;
                        e(u, A);
                        var O = i(u.attr("class"), i($.addClass, $.removeClass)), D = $.tempClasses;
                        D && (O += " " + D, $.tempClasses = null);
                        var P;
                        return T && (P = "ng-" + d + H, t.addClass(u, P)), g.push({
                            element: u,
                            classes: O,
                            event: d,
                            structural: T,
                            options: $,
                            beforeStart: k,
                            close: E
                        }), u.on("$destroy", _), g.length > 1 ? A : (s.$$postDigest(function () {
                            var t = [];
                            Y(g, function (e) {
                                r(e.element) ? t.push(e) : e.close()
                            }), g.length = 0;
                            var e = b(t), n = [];
                            Y(e, function (t) {
                                n.push({
                                    domNode: y(t.from ? t.from.element : t.element), fn: function () {
                                        t.beforeStart();
                                        var e, n = t.close, i = t.anchors ? t.from.element || t.to.element : t.element;
                                        if (r(i)) {
                                            var o = C(t);
                                            o && (e = o.start)
                                        }
                                        if (e) {
                                            var a = e();
                                            a.done(function (t) {
                                                n(!t)
                                            }), S(t, a)
                                        } else n()
                                    }
                                })
                            }), p(m(n))
                        }), A)
                    }
                }]
            }], Pt = ["$animate", "$rootScope", function (t, e) {
                return {
                    restrict: "A", transclude: "element", terminal: !0, priority: 600, link: function (e, n, i, r, o) {
                        var a, s;
                        e.$watchCollection(i.ngAnimateSwap || i["for"], function (i) {
                            a && t.leave(a), s && (s.$destroy(), s = null), (i || 0 === i) && (s = e.$new(), o(s, function (e) {
                                a = e, t.enter(e, null, n)
                            }))
                        })
                    }
                }
            }];
        e.module("ngAnimate", [], function () {
            it = e.noop, U = e.copy, G = e.extend, nt = e.element, Y = e.forEach, Q = e.isArray, tt = e.isString, J = e.isObject, et = e.isUndefined, K = e.isDefined, Z = e.isFunction, X = e.isElement
        }).directive("ngAnimateSwap", Pt).directive("ngAnimateChildren", vt).factory("$$rAFScheduler", gt).provider("$$animateQueue", Ot).provider("$$animation", Dt).provider("$animateCss", kt).provider("$$animateCssDriver", St).provider("$$animateJs", _t).provider("$$animateJsDriver", Et)
    }(window, window.angular),


    function (t, e, n, i) {
        function r(e, n) {
            this.settings = null, this.options = t.extend({}, r.Defaults, n), this.$element = t(e), this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, this._pipe = [], this._drag = {
                time: null,
                target: null,
                pointer: null,
                stage: {start: null, current: null},
                direction: null
            }, this._states = {
                current: {},
                tags: {initializing: ["busy"], animating: ["busy"], dragging: ["interacting"]}
            }, t.each(["onResize", "onThrottledResize"], t.proxy(function (e, n) {
                this._handlers[n] = t.proxy(this[n], this)
            }, this)), t.each(r.Plugins, t.proxy(function (t, e) {
                this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this)
            }, this)), t.each(r.Workers, t.proxy(function (e, n) {
                this._pipe.push({filter: n.filter, run: t.proxy(n.run, this)})
            }, this)), this.setup(), this.initialize()
        }

        r.Defaults = {
            items: 3,
            loop: !1,
            center: !1,
            rewind: !1,
            mouseDrag: !0,
            touchDrag: !0,
            pullDrag: !0,
            freeDrag: !1,
            margin: 0,
            stagePadding: 0,
            merge: !1,
            mergeFit: !0,
            autoWidth: !1,
            startPosition: 0,
            rtl: !1,
            smartSpeed: 250,
            fluidSpeed: !1,
            dragEndSpeed: !1,
            responsive: {},
            responsiveRefreshRate: 200,
            responsiveBaseElement: e,
            fallbackEasing: "swing",
            info: !1,
            nestedItemSelector: !1,
            itemElement: "div",
            stageElement: "div",
            refreshClass: "owl-refresh",
            loadedClass: "owl-loaded",
            loadingClass: "owl-loading",
            rtlClass: "owl-rtl",
            responsiveClass: "owl-responsive",
            dragClass: "owl-drag",
            itemClass: "owl-item",
            stageClass: "owl-stage",
            stageOuterClass: "owl-stage-outer",
            grabClass: "owl-grab"
        }, r.Width = {Default: "default", Inner: "inner", Outer: "outer"}, r.Type = {
            Event: "event",
            State: "state"
        }, r.Plugins = {}, r.Workers = [{
            filter: ["width", "settings"], run: function () {
                this._width = this.$element.width()
            }
        }, {
            filter: ["width", "items", "settings"], run: function (t) {
                t.current = this._items && this._items[this.relative(this._current)]
            }
        }, {
            filter: ["items", "settings"], run: function () {
                this.$stage.children(".cloned").remove()
            }
        }, {
            filter: ["width", "items", "settings"], run: function (t) {
                var e = this.settings.margin || "", n = !this.settings.autoWidth, i = this.settings.rtl,
                    r = {width: "auto", "margin-left": i ? e : "", "margin-right": i ? "" : e};
                !n && this.$stage.children().css(r), t.css = r
            }
        }, {
            filter: ["width", "items", "settings"], run: function (t) {
                var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin, n = null,
                    i = this._items.length, r = !this.settings.autoWidth, o = [];
                for (t.items = {
                    merge: !1,
                    width: e
                }; i--;) n = this._mergers[i], n = this.settings.mergeFit && Math.min(n, this.settings.items) || n, t.items.merge = n > 1 || t.items.merge, o[i] = r ? e * n : this._items[i].width();
                this._widths = o
            }
        }, {
            filter: ["items", "settings"], run: function () {
                var e = [], n = this._items, i = this.settings, r = Math.max(2 * i.items, 4),
                    o = 2 * Math.ceil(n.length / 2), a = i.loop && n.length ? i.rewind ? r : Math.max(r, o) : 0, s = "",
                    l = "";
                for (a /= 2; a--;) e.push(this.normalize(e.length / 2, !0)), s += n[e[e.length - 1]][0].outerHTML, e.push(this.normalize(n.length - 1 - (e.length - 1) / 2, !0)), l = n[e[e.length - 1]][0].outerHTML + l;
                this._clones = e, t(s).addClass("cloned").appendTo(this.$stage), t(l).addClass("cloned").prependTo(this.$stage)
            }
        }, {
            filter: ["width", "items", "settings"], run: function () {
                for (var t = this.settings.rtl ? 1 : -1, e = this._clones.length + this._items.length, n = -1, i = 0, r = 0, o = []; ++n < e;) i = o[n - 1] || 0, r = this._widths[this.relative(n)] + this.settings.margin, o.push(i + r * t);
                this._coordinates = o
            }
        }, {
            filter: ["width", "items", "settings"], run: function () {
                var t = this.settings.stagePadding, e = this._coordinates, n = {
                    width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
                    "padding-left": t || "",
                    "padding-right": t || ""
                };
                this.$stage.css(n)
            }
        }, {
            filter: ["width", "items", "settings"], run: function (t) {
                var e = this._coordinates.length, n = !this.settings.autoWidth, i = this.$stage.children();
                if (n && t.items.merge) for (; e--;) t.css.width = this._widths[this.relative(e)], i.eq(e).css(t.css); else n && (t.css.width = t.items.width, i.css(t.css))
            }
        }, {
            filter: ["items"], run: function () {
                this._coordinates.length < 1 && this.$stage.removeAttr("style")
            }
        }, {
            filter: ["width", "items", "settings"], run: function (t) {
                t.current = t.current ? this.$stage.children().index(t.current) : 0, t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current)), this.reset(t.current)
            }
        }, {
            filter: ["position"], run: function () {
                this.animate(this.coordinates(this._current))
            }
        }, {
            filter: ["width", "position", "items", "settings"], run: function () {
                var t, e, n, i, r = this.settings.rtl ? 1 : -1, o = 2 * this.settings.stagePadding,
                    a = this.coordinates(this.current()) + o, s = a + this.width() * r, l = [];
                for (n = 0, i = this._coordinates.length; n < i; n++) t = this._coordinates[n - 1] || 0, e = Math.abs(this._coordinates[n]) + o * r, (this.op(t, "<=", a) && this.op(t, ">", s) || this.op(e, "<", a) && this.op(e, ">", s)) && l.push(n);
                this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass("active"), this.settings.center && (this.$stage.children(".center").removeClass("center"), this.$stage.children().eq(this.current()).addClass("center"))
            }
        }], r.prototype.initialize = function () {
            if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), this.settings.autoWidth && !this.is("pre-loading")) {
                var e, n, r;
                e = this.$element.find("img"), n = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : i, r = this.$element.children(n).width(), e.length && r <= 0 && this.preloadAutoWidthImages(e)
            }
            this.$element.addClass(this.options.loadingClass), this.$stage = t("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), this.$element.is(":visible") ? this.refresh() : this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized")
        }, r.prototype.setup = function () {
            var e = this.viewport(), n = this.options.responsive, i = -1, r = null;
            n ? (t.each(n, function (t) {
                t <= e && t > i && (i = Number(t))
            }), r = t.extend({}, this.options, n[i]), "function" == typeof r.stagePadding && (r.stagePadding = r.stagePadding()), delete r.responsive, r.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + i))) : r = t.extend({}, this.options), this.trigger("change", {
                property: {
                    name: "settings",
                    value: r
                }
            }), this._breakpoint = i, this.settings = r, this.invalidate("settings"), this.trigger("changed", {
                property: {
                    name: "settings",
                    value: this.settings
                }
            })
        }, r.prototype.optionsLogic = function () {
            this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1)
        }, r.prototype.prepare = function (e) {
            var n = this.trigger("prepare", {content: e});
            return n.data || (n.data = t("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(e)), this.trigger("prepared", {content: n.data}), n.data
        }, r.prototype.update = function () {
            for (var e = 0, n = this._pipe.length, i = t.proxy(function (t) {
                return this[t]
            }, this._invalidated), r = {}; e < n;) (this._invalidated.all || t.grep(this._pipe[e].filter, i).length > 0) && this._pipe[e].run(r), e++;
            this._invalidated = {}, !this.is("valid") && this.enter("valid")
        }, r.prototype.width = function (t) {
            switch (t = t || r.Width.Default) {
                case r.Width.Inner:
                case r.Width.Outer:
                    return this._width;
                default:
                    return this._width - 2 * this.settings.stagePadding + this.settings.margin
            }
        }, r.prototype.refresh = function () {
            this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), this.leave("refreshing"), this.trigger("refreshed")
        }, r.prototype.onThrottledResize = function () {
            e.clearTimeout(this.resizeTimer), this.resizeTimer = e.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate)
        }, r.prototype.onResize = function () {
            return !!this._items.length && (this._width !== this.$element.width() && (!!this.$element.is(":visible") && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
        }, r.prototype.registerEventHandlers = function () {
            t.support.transition && this.$stage.on(t.support.transition.end + ".owl.core", t.proxy(this.onTransitionEnd, this)), this.settings.responsive !== !1 && this.on(e, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
                return !1
            })), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("touchcancel.owl.core", t.proxy(this.onDragEnd, this)))
        }, r.prototype.onDragStart = function (e) {
            var i = null;
            3 !== e.which && (t.support.transform ? (i = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), i = {
                x: i[16 === i.length ? 12 : 4],
                y: i[16 === i.length ? 13 : 5]
            }) : (i = this.$stage.position(), i = {
                x: this.settings.rtl ? i.left + this.$stage.width() - this.width() + this.settings.margin : i.left,
                y: i.top
            }), this.is("animating") && (t.support.transform ? this.animate(i.x) : this.$stage.stop(), this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === e.type), this.speed(0), this._drag.time = (new Date).getTime(), this._drag.target = t(e.target), this._drag.stage.start = i, this._drag.stage.current = i, this._drag.pointer = this.pointer(e), t(n).on("mouseup.owl.core touchend.owl.core", t.proxy(this.onDragEnd, this)), t(n).one("mousemove.owl.core touchmove.owl.core", t.proxy(function (e) {
                var i = this.difference(this._drag.pointer, this.pointer(e));
                t(n).on("mousemove.owl.core touchmove.owl.core", t.proxy(this.onDragMove, this)), Math.abs(i.x) < Math.abs(i.y) && this.is("valid") || (e.preventDefault(), this.enter("dragging"), this.trigger("drag"))
            }, this)))
        }, r.prototype.onDragMove = function (t) {
            var e = null, n = null, i = null, r = this.difference(this._drag.pointer, this.pointer(t)),
                o = this.difference(this._drag.stage.start, r);
            this.is("dragging") && (t.preventDefault(), this.settings.loop ? (e = this.coordinates(this.minimum()), n = this.coordinates(this.maximum() + 1) - e, o.x = ((o.x - e) % n + n) % n + e) : (e = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()), n = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()), i = this.settings.pullDrag ? -1 * r.x / 5 : 0, o.x = Math.max(Math.min(o.x, e + i), n + i)), this._drag.stage.current = o, this.animate(o.x))
        }, r.prototype.onDragEnd = function (e) {
            var i = this.difference(this._drag.pointer, this.pointer(e)), r = this._drag.stage.current,
                o = i.x > 0 ^ this.settings.rtl ? "left" : "right";
            t(n).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== i.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), this.current(this.closest(r.x, 0 !== i.x ? o : this._drag.direction)), this.invalidate("position"), this.update(), this._drag.direction = o, (Math.abs(i.x) > 3 || (new Date).getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function () {
                return !1
            })), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"))
        }, r.prototype.closest = function (e, n) {
            var i = -1, r = 30, o = this.width(), a = this.coordinates();
            return this.settings.freeDrag || t.each(a, t.proxy(function (t, s) {
                return "left" === n && e > s - r && e < s + r ? i = t : "right" === n && e > s - o - r && e < s - o + r ? i = t + 1 : this.op(e, "<", s) && this.op(e, ">", a[t + 1] || s - o) && (i = "left" === n ? t + 1 : t), i === -1
            }, this)), this.settings.loop || (this.op(e, ">", a[this.minimum()]) ? i = e = this.minimum() : this.op(e, "<", a[this.maximum()]) && (i = e = this.maximum())), i
        }, r.prototype.animate = function (e) {
            var n = this.speed() > 0;
            this.is("animating") && this.onTransitionEnd(), n && (this.enter("animating"), this.trigger("translate")), t.support.transform3d && t.support.transition ? this.$stage.css({
                transform: "translate3d(" + e + "px,0px,0px)",
                transition: this.speed() / 1e3 + "s"
            }) : n ? this.$stage.animate({left: e + "px"}, this.speed(), this.settings.fallbackEasing, t.proxy(this.onTransitionEnd, this)) : this.$stage.css({left: e + "px"})
        }, r.prototype.is = function (t) {
            return this._states.current[t] && this._states.current[t] > 0
        }, r.prototype.current = function (t) {
            if (t === i) return this._current;
            if (0 === this._items.length) return i;
            if (t = this.normalize(t), this._current !== t) {
                var e = this.trigger("change", {property: {name: "position", value: t}});
                e.data !== i && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), this.trigger("changed", {
                    property: {
                        name: "position",
                        value: this._current
                    }
                })
            }
            return this._current
        }, r.prototype.invalidate = function (e) {
            return "string" === t.type(e) && (this._invalidated[e] = !0, this.is("valid") && this.leave("valid")), t.map(this._invalidated, function (t, e) {
                return e
            })
        }, r.prototype.reset = function (t) {
            t = this.normalize(t), t !== i && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
        }, r.prototype.normalize = function (t, e) {
            var n = this._items.length, r = e ? 0 : this._clones.length;
            return !this.isNumeric(t) || n < 1 ? t = i : (t < 0 || t >= n + r) && (t = ((t - r / 2) % n + n) % n + r / 2), t
        }, r.prototype.relative = function (t) {
            return t -= this._clones.length / 2, this.normalize(t, !0)
        }, r.prototype.maximum = function (t) {
            var e, n, i, r = this.settings, o = this._coordinates.length;
            if (r.loop) o = this._clones.length / 2 + this._items.length - 1; else if (r.autoWidth || r.merge) {
                for (e = this._items.length, n = this._items[--e].width(), i = this.$element.width(); e-- && (n += this._items[e].width() + this.settings.margin, !(n > i));) ;
                o = e + 1
            } else o = r.center ? this._items.length - 1 : this._items.length - r.items;
            return t && (o -= this._clones.length / 2), Math.max(o, 0)
        }, r.prototype.minimum = function (t) {
            return t ? 0 : this._clones.length / 2
        }, r.prototype.items = function (t) {
            return t === i ? this._items.slice() : (t = this.normalize(t, !0), this._items[t])
        }, r.prototype.mergers = function (t) {
            return t === i ? this._mergers.slice() : (t = this.normalize(t, !0), this._mergers[t])
        }, r.prototype.clones = function (e) {
            var n = this._clones.length / 2, r = n + this._items.length, o = function (t) {
                return t % 2 === 0 ? r + t / 2 : n - (t + 1) / 2
            };
            return e === i ? t.map(this._clones, function (t, e) {
                return o(e)
            }) : t.map(this._clones, function (t, n) {
                return t === e ? o(n) : null
            })
        }, r.prototype.speed = function (t) {
            return t !== i && (this._speed = t), this._speed
        }, r.prototype.coordinates = function (e) {
            var n, r = 1, o = e - 1;
            return e === i ? t.map(this._coordinates, t.proxy(function (t, e) {
                return this.coordinates(e)
            }, this)) : (this.settings.center ? (this.settings.rtl && (r = -1, o = e + 1), n = this._coordinates[e], n += (this.width() - n + (this._coordinates[o] || 0)) / 2 * r) : n = this._coordinates[o] || 0, n = Math.ceil(n))
        }, r.prototype.duration = function (t, e, n) {
            return 0 === n ? 0 : Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(n || this.settings.smartSpeed)
        }, r.prototype.to = function (t, e) {
            var n = this.current(), i = null, r = t - this.relative(n), o = (r > 0) - (r < 0), a = this._items.length,
                s = this.minimum(), l = this.maximum();
            this.settings.loop ? (!this.settings.rewind && Math.abs(r) > a / 2 && (r += o * -1 * a), t = n + r, i = ((t - s) % a + a) % a + s, i !== t && i - r <= l && i - r > 0 && (n = i - r, t = i, this.reset(n))) : this.settings.rewind ? (l += 1, t = (t % l + l) % l) : t = Math.max(s, Math.min(l, t)), this.speed(this.duration(n, t, e)), this.current(t), this.$element.is(":visible") && this.update()
        }, r.prototype.next = function (t) {
            t = t || !1, this.to(this.relative(this.current()) + 1, t)
        }, r.prototype.prev = function (t) {
            t = t || !1, this.to(this.relative(this.current()) - 1, t)
        }, r.prototype.onTransitionEnd = function (t) {
            return (t === i || (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) === this.$stage.get(0))) && (this.leave("animating"), void this.trigger("translated"))
        }, r.prototype.viewport = function () {
            var i;
            if (this.options.responsiveBaseElement !== e) i = t(this.options.responsiveBaseElement).width(); else if (e.innerWidth) i = e.innerWidth; else {
                if (!n.documentElement || !n.documentElement.clientWidth) throw"Can not detect viewport width.";
                i = n.documentElement.clientWidth
            }
            return i
        }, r.prototype.replace = function (e) {
            this.$stage.empty(), this._items = [], e && (e = e instanceof jQuery ? e : t(e)), this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)), e.filter(function () {
                return 1 === this.nodeType
            }).each(t.proxy(function (t, e) {
                e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)
            }, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0), this.invalidate("items")
        }, r.prototype.add = function (e, n) {
            var r = this.relative(this._current);
            n = n === i ? this._items.length : this.normalize(n, !0), e = e instanceof jQuery ? e : t(e), this.trigger("add", {
                content: e,
                position: n
            }), e = this.prepare(e), 0 === this._items.length || n === this._items.length ? (0 === this._items.length && this.$stage.append(e), 0 !== this._items.length && this._items[n - 1].after(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[n].before(e), this._items.splice(n, 0, e), this._mergers.splice(n, 0, 1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[r] && this.reset(this._items[r].index()), this.invalidate("items"), this.trigger("added", {
                content: e,
                position: n
            })
        }, r.prototype.remove = function (t) {
            t = this.normalize(t, !0), t !== i && (this.trigger("remove", {
                content: this._items[t],
                position: t
            }), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), this.invalidate("items"), this.trigger("removed", {
                content: null,
                position: t
            }))
        }, r.prototype.preloadAutoWidthImages = function (e) {
            e.each(t.proxy(function (e, n) {
                this.enter("pre-loading"), n = t(n), t(new Image).one("load", t.proxy(function (t) {
                    n.attr("src", t.target.src), n.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh()
                }, this)).attr("src", n.attr("src") || n.attr("data-src") || n.attr("data-src-retina"))
            }, this))
        }, r.prototype.destroy = function () {
            this.$element.off(".owl.core"), this.$stage.off(".owl.core"), t(n).off(".owl.core"), this.settings.responsive !== !1 && (e.clearTimeout(this.resizeTimer), this.off(e, "resize", this._handlers.onThrottledResize));
            for (var i in this._plugins) this._plugins[i].destroy();
            this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel")
        }, r.prototype.op = function (t, e, n) {
            var i = this.settings.rtl;
            switch (e) {
                case"<":
                    return i ? t > n : t < n;
                case">":
                    return i ? t < n : t > n;
                case">=":
                    return i ? t <= n : t >= n;
                case"<=":
                    return i ? t >= n : t <= n
            }
        }, r.prototype.on = function (t, e, n, i) {
            t.addEventListener ? t.addEventListener(e, n, i) : t.attachEvent && t.attachEvent("on" + e, n)
        }, r.prototype.off = function (t, e, n, i) {
            t.removeEventListener ? t.removeEventListener(e, n, i) : t.detachEvent && t.detachEvent("on" + e, n)
        }, r.prototype.trigger = function (e, n, i, o, a) {
            var s = {item: {count: this._items.length, index: this.current()}},
                l = t.camelCase(t.grep(["on", e, i], function (t) {
                    return t
                }).join("-").toLowerCase()),
                c = t.Event([e, "owl", i || "carousel"].join(".").toLowerCase(), t.extend({relatedTarget: this}, s, n));
            return this._supress[e] || (t.each(this._plugins, function (t, e) {
                e.onTrigger && e.onTrigger(c)
            }), this.register({
                type: r.Type.Event,
                name: e
            }), this.$element.trigger(c), this.settings && "function" == typeof this.settings[l] && this.settings[l].call(this, c)), c
        }, r.prototype.enter = function (e) {
            t.each([e].concat(this._states.tags[e] || []), t.proxy(function (t, e) {
                this._states.current[e] === i && (this._states.current[e] = 0), this._states.current[e]++
            }, this))
        }, r.prototype.leave = function (e) {
            t.each([e].concat(this._states.tags[e] || []), t.proxy(function (t, e) {
                this._states.current[e]--
            }, this))
        }, r.prototype.register = function (e) {
            if (e.type === r.Type.Event) {
                if (t.event.special[e.name] || (t.event.special[e.name] = {}), !t.event.special[e.name].owl) {
                    var n = t.event.special[e.name]._default;
                    t.event.special[e.name]._default = function (t) {
                        return !n || !n.apply || t.namespace && t.namespace.indexOf("owl") !== -1 ? t.namespace && t.namespace.indexOf("owl") > -1 : n.apply(this, arguments)
                    }, t.event.special[e.name].owl = !0
                }
            } else e.type === r.Type.State && (this._states.tags[e.name] ? this._states.tags[e.name] = this._states.tags[e.name].concat(e.tags) : this._states.tags[e.name] = e.tags, this._states.tags[e.name] = t.grep(this._states.tags[e.name], t.proxy(function (n, i) {
                return t.inArray(n, this._states.tags[e.name]) === i
            }, this)))
        }, r.prototype.suppress = function (e) {
            t.each(e, t.proxy(function (t, e) {
                this._supress[e] = !0
            }, this))
        }, r.prototype.release = function (e) {
            t.each(e, t.proxy(function (t, e) {
                delete this._supress[e]
            }, this))
        }, r.prototype.pointer = function (t) {
            var n = {x: null, y: null};
            return t = t.originalEvent || t || e.event, t = t.touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t, t.pageX ? (n.x = t.pageX, n.y = t.pageY) : (n.x = t.clientX, n.y = t.clientY), n
        }, r.prototype.isNumeric = function (t) {
            return !isNaN(parseFloat(t))
        }, r.prototype.difference = function (t, e) {
            return {x: t.x - e.x, y: t.y - e.y}
        }, t.fn.owlCarousel = function (e) {
            var n = Array.prototype.slice.call(arguments, 1);
            return this.each(function () {
                var i = t(this), o = i.data("owl.carousel");
                o || (o = new r(this, "object" == typeof e && e), i.data("owl.carousel", o), t.each(["next", "prev", "to", "destroy", "refresh", "replace", "add", "remove"], function (e, n) {
                    o.register({
                        type: r.Type.Event,
                        name: n
                    }), o.$element.on(n + ".owl.carousel.core", t.proxy(function (t) {
                        t.namespace && t.relatedTarget !== this && (this.suppress([n]), o[n].apply(this, [].slice.call(arguments, 1)), this.release([n]))
                    }, o))
                })), "string" == typeof e && "_" !== e.charAt(0) && o[e].apply(o, n)
            })
        }, t.fn.owlCarousel.Constructor = r
    }(window.Zepto || window.jQuery, window, document) ,
    function (t, e, n, i) {
        var r = function (e) {
            this._core = e, this._interval = null, this._visible = null, this._handlers = {
                "initialized.owl.carousel": t.proxy(function (t) {
                    t.namespace && this._core.settings.autoRefresh && this.watch()
                }, this)
            }, this._core.options = t.extend({}, r.Defaults, this._core.options), this._core.$element.on(this._handlers)
        };
        r.Defaults = {autoRefresh: !0, autoRefreshInterval: 500}, r.prototype.watch = function () {
            this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = e.setInterval(t.proxy(this.refresh, this), this._core.settings.autoRefreshInterval))
        }, r.prototype.refresh = function () {
            this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh())
        }, r.prototype.destroy = function () {
            var t, n;
            e.clearInterval(this._interval);
            for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (n in Object.getOwnPropertyNames(this)) "function" != typeof this[n] && (this[n] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.AutoRefresh = r
    }(window.Zepto || window.jQuery, window, document),


    function (t, e, n, i) {
        var r = function (e) {
            this._core = e, this._loaded = [], this._handlers = {
                "initialized.owl.carousel change.owl.carousel resized.owl.carousel": t.proxy(function (e) {
                    if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type)) for (var n = this._core.settings, r = n.center && Math.ceil(n.items / 2) || n.items, o = n.center && r * -1 || 0, a = (e.property && e.property.value !== i ? e.property.value : this._core.current()) + o, s = this._core.clones().length, l = t.proxy(function (t, e) {
                        this.load(e)
                    }, this); o++ < r;) this.load(s / 2 + this._core.relative(a)), s && t.each(this._core.clones(this._core.relative(a)), l), a++
                }, this)
            }, this._core.options = t.extend({}, r.Defaults, this._core.options), this._core.$element.on(this._handlers)
        };
        r.Defaults = {lazyLoad: !1}, r.prototype.load = function (n) {
            var i = this._core.$stage.children().eq(n), r = i && i.find(".owl-lazy");
            !r || t.inArray(i.get(0), this._loaded) > -1 || (r.each(t.proxy(function (n, i) {
                var r, o = t(i), a = e.devicePixelRatio > 1 && o.attr("data-src-retina") || o.attr("data-src");
                this._core.trigger("load", {
                    element: o,
                    url: a
                }, "lazy"), o.is("img") ? o.one("load.owl.lazy", t.proxy(function () {
                    o.css("opacity", 1), this._core.trigger("loaded", {element: o, url: a}, "lazy")
                }, this)).attr("src", a) : (r = new Image, r.onload = t.proxy(function () {
                    o.css({"background-image": "url(" + a + ")", opacity: "1"}), this._core.trigger("loaded", {
                        element: o,
                        url: a
                    }, "lazy")
                }, this), r.src = a)
            }, this)), this._loaded.push(i.get(0)))
        }, r.prototype.destroy = function () {
            var t, e;
            for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Lazy = r
    }(window.Zepto || window.jQuery, window, document),

    function (t, e, n, i) {
        var r = function (e) {
            this._core = e, this._handlers = {
                "initialized.owl.carousel refreshed.owl.carousel": t.proxy(function (t) {
                    t.namespace && this._core.settings.autoHeight && this.update()
                }, this), "changed.owl.carousel": t.proxy(function (t) {
                    t.namespace && this._core.settings.autoHeight && "position" == t.property.name && this.update()
                }, this), "loaded.owl.lazy": t.proxy(function (t) {
                    t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update()
                }, this)
            }, this._core.options = t.extend({}, r.Defaults, this._core.options), this._core.$element.on(this._handlers)
        };
        r.Defaults = {autoHeight: !1, autoHeightClass: "owl-height"}, r.prototype.update = function () {
            var e = this._core._current, n = e + this._core.settings.items,
                i = this._core.$stage.children().toArray().slice(e, n), r = [], o = 0;
            t.each(i, function (e, n) {
                r.push(t(n).height())
            }), o = Math.max.apply(null, r), this._core.$stage.parent().height(o).addClass(this._core.settings.autoHeightClass)
        }, r.prototype.destroy = function () {
            var t, e;
            for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.AutoHeight = r
    }(window.Zepto || window.jQuery, window, document),


    function (t, e, n, i) {
        var r = function (e) {
            this._core = e, this._videos = {}, this._playing = null, this._handlers = {
                "initialized.owl.carousel": t.proxy(function (t) {
                    t.namespace && this._core.register({type: "state", name: "playing", tags: ["interacting"]})
                }, this), "resize.owl.carousel": t.proxy(function (t) {
                    t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault()
                }, this), "refreshed.owl.carousel": t.proxy(function (t) {
                    t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove()
                }, this), "changed.owl.carousel": t.proxy(function (t) {
                    t.namespace && "position" === t.property.name && this._playing && this.stop()
                }, this), "prepared.owl.carousel": t.proxy(function (e) {
                    if (e.namespace) {
                        var n = t(e.content).find(".owl-video");
                        n.length && (n.css("display", "none"), this.fetch(n, t(e.content)))
                    }
                }, this)
            }, this._core.options = t.extend({}, r.Defaults, this._core.options), this._core.$element.on(this._handlers), this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function (t) {
                this.play(t)
            }, this))
        };
        r.Defaults = {video: !1, videoHeight: !1, videoWidth: !1}, r.prototype.fetch = function (t, e) {
            var n = function () {
                    return t.attr("data-vimeo-id") ? "vimeo" : t.attr("data-vzaar-id") ? "vzaar" : "youtube"
                }(), i = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"),
                r = t.attr("data-width") || this._core.settings.videoWidth,
                o = t.attr("data-height") || this._core.settings.videoHeight, a = t.attr("href");
            if (!a) throw new Error("Missing video URL.");
            if (i = a.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), i[3].indexOf("youtu") > -1) n = "youtube"; else if (i[3].indexOf("vimeo") > -1) n = "vimeo"; else {
                if (!(i[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
                n = "vzaar"
            }
            i = i[6], this._videos[a] = {
                type: n,
                id: i,
                width: r,
                height: o
            }, e.attr("data-video", a), this.thumbnail(t, this._videos[a])
        }, r.prototype.thumbnail = function (e, n) {
            var i, r, o, a = n.width && n.height ? 'style="width:' + n.width + "px;height:" + n.height + 'px;"' : "",
                s = e.find("img"), l = "src", c = "", u = this._core.settings, d = function (t) {
                    r = '<div class="owl-video-play-icon"></div>', i = u.lazyLoad ? '<div class="owl-video-tn ' + c + '" ' + l + '="' + t + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>', e.after(i), e.after(r)
                };
            return e.wrap('<div class="owl-video-wrapper"' + a + "></div>"), this._core.settings.lazyLoad && (l = "data-src", c = "owl-lazy"), s.length ? (d(s.attr(l)), s.remove(), !1) : void ("youtube" === n.type ? (o = "//img.youtube.com/vi/" + n.id + "/hqdefault.jpg", d(o)) : "vimeo" === n.type ? t.ajax({
                type: "GET",
                url: "//vimeo.com/api/v2/video/" + n.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function (t) {
                    o = t[0].thumbnail_large, d(o)
                }
            }) : "vzaar" === n.type && t.ajax({
                type: "GET",
                url: "//vzaar.com/api/videos/" + n.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function (t) {
                    o = t.framegrab_url, d(o)
                }
            }))
        }, r.prototype.stop = function () {
            this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), this._core.trigger("stopped", null, "video")
        }, r.prototype.play = function (e) {
            var n, i = t(e.target), r = i.closest("." + this._core.settings.itemClass),
                o = this._videos[r.attr("data-video")], a = o.width || "100%",
                s = o.height || this._core.$stage.height();
            this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), r = this._core.items(this._core.relative(r.index())), this._core.reset(r.index()), "youtube" === o.type ? n = '<iframe width="' + a + '" height="' + s + '" src="//www.youtube.com/embed/' + o.id + "?autoplay=1&v=" + o.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === o.type ? n = '<iframe src="//player.vimeo.com/video/' + o.id + '?autoplay=1" width="' + a + '" height="' + s + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' : "vzaar" === o.type && (n = '<iframe frameborder="0"height="' + s + '"width="' + a + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + o.id + '/player?autoplay=true"></iframe>'), t('<div class="owl-video-frame">' + n + "</div>").insertAfter(r.find(".owl-video")), this._playing = r.addClass("owl-video-playing"))
        }, r.prototype.isInFullScreen = function () {
            var e = n.fullscreenElement || n.mozFullScreenElement || n.webkitFullscreenElement;
            return e && t(e).parent().hasClass("owl-video-frame")
        }, r.prototype.destroy = function () {
            var t, e;
            this._core.$element.off("click.owl.video");
            for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Video = r
    }(window.Zepto || window.jQuery, window, document),


    function (t, e, n, i) {
        var r = function (e) {
            this.core = e, this.core.options = t.extend({}, r.Defaults, this.core.options), this.swapping = !0, this.previous = i, this.next = i, this.handlers = {
                "change.owl.carousel": t.proxy(function (t) {
                    t.namespace && "position" == t.property.name && (this.previous = this.core.current(), this.next = t.property.value)
                }, this), "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": t.proxy(function (t) {
                    t.namespace && (this.swapping = "translated" == t.type)
                }, this), "translate.owl.carousel": t.proxy(function (t) {
                    t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
                }, this)
            }, this.core.$element.on(this.handlers)
        };
        r.Defaults = {animateOut: !1, animateIn: !1}, r.prototype.swap = function () {
            if (1 === this.core.settings.items && t.support.animation && t.support.transition) {
                this.core.speed(0);
                var e, n = t.proxy(this.clear, this), i = this.core.$stage.children().eq(this.previous),
                    r = this.core.$stage.children().eq(this.next), o = this.core.settings.animateIn,
                    a = this.core.settings.animateOut;
                this.core.current() !== this.previous && (a && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next), i.one(t.support.animation.end, n).css({left: e + "px"}).addClass("animated owl-animated-out").addClass(a)), o && r.one(t.support.animation.end, n).addClass("animated owl-animated-in").addClass(o))
            }
        }, r.prototype.clear = function (e) {
            t(e.target).css({left: ""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), this.core.onTransitionEnd()
        }, r.prototype.destroy = function () {
            var t, e;
            for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Animate = r
    }(window.Zepto || window.jQuery, window, document),


    function (t, e, n, i) {
        var r = function (e) {
            this._core = e, this._timeout = null, this._paused = !1, this._handlers = {
                "changed.owl.carousel": t.proxy(function (t) {
                    t.namespace && "settings" === t.property.name ? this._core.settings.autoplay ? this.play() : this.stop() : t.namespace && "position" === t.property.name && this._core.settings.autoplay && this._setAutoPlayInterval()
                }, this), "initialized.owl.carousel": t.proxy(function (t) {
                    t.namespace && this._core.settings.autoplay && this.play()
                }, this), "play.owl.autoplay": t.proxy(function (t, e, n) {
                    t.namespace && this.play(e, n)
                }, this), "stop.owl.autoplay": t.proxy(function (t) {
                    t.namespace && this.stop()
                }, this), "mouseover.owl.autoplay": t.proxy(function () {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
                }, this), "mouseleave.owl.autoplay": t.proxy(function () {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play()
                }, this), "touchstart.owl.core": t.proxy(function () {
                    this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause()
                }, this), "touchend.owl.core": t.proxy(function () {
                    this._core.settings.autoplayHoverPause && this.play()
                }, this)
            }, this._core.$element.on(this._handlers), this._core.options = t.extend({}, r.Defaults, this._core.options)
        };
        r.Defaults = {
            autoplay: !1,
            autoplayTimeout: 5e3,
            autoplayHoverPause: !1,
            autoplaySpeed: !1
        }, r.prototype.play = function (t, e) {
            this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval())
        }, r.prototype._getNextTimeout = function (i, r) {
            return this._timeout && e.clearTimeout(this._timeout), e.setTimeout(t.proxy(function () {
                this._paused || this._core.is("busy") || this._core.is("interacting") || n.hidden || this._core.next(r || this._core.settings.autoplaySpeed)
            }, this), i || this._core.settings.autoplayTimeout)
        }, r.prototype._setAutoPlayInterval = function () {
            this._timeout = this._getNextTimeout()
        }, r.prototype.stop = function () {
            this._core.is("rotating") && (e.clearTimeout(this._timeout), this._core.leave("rotating"))
        }, r.prototype.pause = function () {
            this._core.is("rotating") && (this._paused = !0)
        }, r.prototype.destroy = function () {
            var t, e;
            this.stop();
            for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
            for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.autoplay = r
    }(window.Zepto || window.jQuery, window, document),


    function (t, e, n, i) {
        "use strict";
        var r = function (e) {
            this._core = e, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], this.$element = this._core.$element, this._overrides = {
                next: this._core.next,
                prev: this._core.prev,
                to: this._core.to
            }, this._handlers = {
                "prepared.owl.carousel": t.proxy(function (e) {
                    e.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + t(e.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>")
                }, this), "added.owl.carousel": t.proxy(function (t) {
                    t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop())
                }, this), "remove.owl.carousel": t.proxy(function (t) {
                    t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1)
                }, this), "changed.owl.carousel": t.proxy(function (t) {
                    t.namespace && "position" == t.property.name && this.draw()
                }, this), "initialized.owl.carousel": t.proxy(function (t) {
                    t.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"))
                }, this), "refreshed.owl.carousel": t.proxy(function (t) {
                    t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"))
                }, this)
            }, this._core.options = t.extend({}, r.Defaults, this._core.options), this.$element.on(this._handlers)
        };
        r.Defaults = {
            nav: !1,
            navText: ["prev", "next"],
            navSpeed: !1,
            navElement: "div",
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotsData: !1,
            dotsSpeed: !1,
            dotsContainer: !1
        }, r.prototype.initialize = function () {
            var e, n = this._core.settings;
            this._controls.$relative = (n.navContainer ? t(n.navContainer) : t("<div>").addClass(n.navContainerClass).appendTo(this.$element)).addClass("disabled"), this._controls.$previous = t("<" + n.navElement + ">").addClass(n.navClass[0]).html(n.navText[0]).prependTo(this._controls.$relative).on("click", t.proxy(function (t) {
                this.prev(n.navSpeed)
            }, this)), this._controls.$next = t("<" + n.navElement + ">").addClass(n.navClass[1]).html(n.navText[1]).appendTo(this._controls.$relative).on("click", t.proxy(function (t) {
                this.next(n.navSpeed)
            }, this)), n.dotsData || (this._templates = [t("<div>").addClass(n.dotClass).append(t("<span>")).prop("outerHTML")]), this._controls.$absolute = (n.dotsContainer ? t(n.dotsContainer) : t("<div>").addClass(n.dotsClass).appendTo(this.$element)).addClass("disabled"), this._controls.$absolute.on("click", "div", t.proxy(function (e) {
                var i = t(e.target).parent().is(this._controls.$absolute) ? t(e.target).index() : t(e.target).parent().index();
                e.preventDefault(), this.to(i, n.dotsSpeed)
            }, this));
            for (e in this._overrides) this._core[e] = t.proxy(this[e], this)
        }, r.prototype.destroy = function () {
            var t, e, n, i;
            for (t in this._handlers) this.$element.off(t, this._handlers[t]);
            for (e in this._controls) this._controls[e].remove();
            for (i in this.overides) this._core[i] = this._overrides[i];
            for (n in Object.getOwnPropertyNames(this)) "function" != typeof this[n] && (this[n] = null)
        }, r.prototype.update = function () {
            var t, e, n, i = this._core.clones().length / 2, r = i + this._core.items().length,
                o = this._core.maximum(!0),
                a = this._core.settings, s = a.center || a.autoWidth || a.dotsData ? 1 : a.dotsEach || a.items;
            if ("page" !== a.slideBy && (a.slideBy = Math.min(a.slideBy, a.items)), a.dots || "page" == a.slideBy) for (this._pages = [], t = i, e = 0, n = 0; t < r; t++) {
                if (e >= s || 0 === e) {
                    if (this._pages.push({
                        start: Math.min(o, t - i),
                        end: t - i + s - 1
                    }), Math.min(o, t - i) === o) break;
                    e = 0, ++n
                }
                e += this._core.mergers(this._core.relative(t))
            }
        }, r.prototype.draw = function () {
            var e, n = this._core.settings, i = this._core.items().length <= n.items,
                r = this._core.relative(this._core.current()), o = n.loop || n.rewind;
            this._controls.$relative.toggleClass("disabled", !n.nav || i), n.nav && (this._controls.$previous.toggleClass("disabled", !o && r <= this._core.minimum(!0)), this._controls.$next.toggleClass("disabled", !o && r >= this._core.maximum(!0))), this._controls.$absolute.toggleClass("disabled", !n.dots || i), n.dots && (e = this._pages.length - this._controls.$absolute.children().length, n.dotsData && 0 !== e ? this._controls.$absolute.html(this._templates.join("")) : e > 0 ? this._controls.$absolute.append(new Array(e + 1).join(this._templates[0])) : e < 0 && this._controls.$absolute.children().slice(e).remove(), this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(t.inArray(this.current(), this._pages)).addClass("active"))
        }, r.prototype.onTrigger = function (e) {
            var n = this._core.settings;
            e.page = {
                index: t.inArray(this.current(), this._pages),
                count: this._pages.length,
                size: n && (n.center || n.autoWidth || n.dotsData ? 1 : n.dotsEach || n.items)
            }
        }, r.prototype.current = function () {
            var e = this._core.relative(this._core.current());
            return t.grep(this._pages, t.proxy(function (t, n) {
                return t.start <= e && t.end >= e
            }, this)).pop()
        }, r.prototype.getPosition = function (e) {
            var n, i, r = this._core.settings;
            return "page" == r.slideBy ? (n = t.inArray(this.current(), this._pages), i = this._pages.length, e ? ++n : --n, n = this._pages[(n % i + i) % i].start) : (n = this._core.relative(this._core.current()), i = this._core.items().length, e ? n += r.slideBy : n -= r.slideBy), n
        }, r.prototype.next = function (e) {
            t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e)
        }, r.prototype.prev = function (e) {
            t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e)
        }, r.prototype.to = function (e, n, i) {
            var r;
            !i && this._pages.length ? (r = this._pages.length, t.proxy(this._overrides.to, this._core)(this._pages[(e % r + r) % r].start, n)) : t.proxy(this._overrides.to, this._core)(e, n)
        }, t.fn.owlCarousel.Constructor.Plugins.Navigation = r
    }(window.Zepto || window.jQuery, window, document),

    function (t, e, n, i) {
        "use strict";
        var r = function (n) {
            this._core = n, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
                "initialized.owl.carousel": t.proxy(function (n) {
                    n.namespace && "URLHash" === this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation")
                }, this), "prepared.owl.carousel": t.proxy(function (e) {
                    if (e.namespace) {
                        var n = t(e.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
                        if (!n) return;
                        this._hashes[n] = e.content
                    }
                }, this), "changed.owl.carousel": t.proxy(function (n) {
                    if (n.namespace && "position" === n.property.name) {
                        var i = this._core.items(this._core.relative(this._core.current())),
                            r = t.map(this._hashes, function (t, e) {
                                return t === i ? e : null
                            }).join();
                        if (!r || e.location.hash.slice(1) === r) return;
                        e.location.hash = r
                    }
                }, this)
            }, this._core.options = t.extend({}, r.Defaults, this._core.options), this.$element.on(this._handlers), t(e).on("hashchange.owl.navigation", t.proxy(function (t) {
                var n = e.location.hash.substring(1), r = this._core.$stage.children(),
                    o = this._hashes[n] && r.index(this._hashes[n]);
                o !== i && o !== this._core.current() && this._core.to(this._core.relative(o), !1, !0)
            }, this))
        };
        r.Defaults = {URLhashListener: !1}, r.prototype.destroy = function () {
            var n, i;
            t(e).off("hashchange.owl.navigation");
            for (n in this._handlers) this._core.$element.off(n, this._handlers[n]);
            for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null)
        }, t.fn.owlCarousel.Constructor.Plugins.Hash = r
    }(window.Zepto || window.jQuery, window, document),


    function (t, e, n, i) {
        function r(e, n) {
            var r = !1, o = e.charAt(0).toUpperCase() + e.slice(1);
            return t.each((e + " " + s.join(o + " ") + o).split(" "), function (t, e) {
                if (a[e] !== i) return r = !n || e, !1
            }), r
        }

        function o(t) {
            return r(t, !0)
        }

        var a = t("<support>").get(0).style, s = "Webkit Moz O ms".split(" "), l = {
            transition: {
                end: {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "oTransitionEnd",
                    transition: "transitionend"
                }
            },
            animation: {
                end: {
                    WebkitAnimation: "webkitAnimationEnd",
                    MozAnimation: "animationend",
                    OAnimation: "oAnimationEnd",
                    animation: "animationend"
                }
            }
        }, c = {
            csstransforms: function () {
                return !!r("transform")
            }, csstransforms3d: function () {
                return !!r("perspective")
            }, csstransitions: function () {
                return !!r("transition")
            }, cssanimations: function () {
                return !!r("animation")
            }
        };
        c.csstransitions() && (t.support.transition = new String(o("transition")), t.support.transition.end = l.transition.end[t.support.transition]), c.cssanimations() && (t.support.animation = new String(o("animation")), t.support.animation.end = l.animation.end[t.support.animation]), c.csstransforms() && (t.support.transform = new String(o("transform")), t.support.transform3d = c.csstransforms3d())
    }(window.Zepto || window.jQuery, window, document),


    function (t, e) {
        "object" == typeof exports ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Spinner = e()
    }(this, function () {
        "use strict";

        function t(t, e) {
            var n, i = document.createElement(t || "div");
            for (n in e) i[n] = e[n];
            return i
        }

        function e(t) {
            for (var e = 1, n = arguments.length; e < n; e++) t.appendChild(arguments[e]);
            return t
        }

        function n(t, e, n, i) {
            var r = ["opacity", e, ~~(100 * t), n, i].join("-"), o = .01 + n / i * 100,
                a = Math.max(1 - (1 - t) / e * (100 - o), t), s = c.substring(0, c.indexOf("Animation")).toLowerCase(),
                l = s && "-" + s + "-" || "";
            return d[r] || (f.insertRule("@" + l + "keyframes " + r + "{0%{opacity:" + a + "}" + o + "%{opacity:" + t + "}" + (o + .01) + "%{opacity:1}" + (o + e) % 100 + "%{opacity:" + t + "}100%{opacity:" + a + "}}", f.cssRules.length), d[r] = 1), r
        }

        function i(t, e) {
            var n, i, r = t.style;
            for (e = e.charAt(0).toUpperCase() + e.slice(1), i = 0; i < u.length; i++) if (n = u[i] + e, void 0 !== r[n]) return n;
            if (void 0 !== r[e]) return e
        }

        function r(t, e) {
            for (var n in e) t.style[i(t, n) || n] = e[n];
            return t
        }

        function o(t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var i in n) void 0 === t[i] && (t[i] = n[i])
            }
            return t
        }

        function a(t, e) {
            return "string" == typeof t ? t : t[e % t.length]
        }

        function s(t) {
            this.opts = o(t || {}, s.defaults, h)
        }

        function l() {
            function n(e, n) {
                return t("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', n)
            }

            f.addRule(".spin-vml", "behavior:url(#default#VML)"), s.prototype.lines = function (t, i) {
                function o() {
                    return r(n("group", {coordsize: u + " " + u, coordorigin: -c + " " + -c}), {width: u, height: u})
                }

                function s(t, s, l) {
                    e(f, e(r(o(), {
                        rotation: 360 / i.lines * t + "deg",
                        left: ~~s
                    }), e(r(n("roundrect", {arcsize: i.corners}), {
                        width: c,
                        height: i.width,
                        left: i.radius,
                        top: -i.width >> 1,
                        filter: l
                    }), n("fill", {color: a(i.color, t), opacity: i.opacity}), n("stroke", {opacity: 0}))))
                }

                var l, c = i.length + i.width, u = 2 * c, d = 2 * -(i.width + i.length) + "px",
                    f = r(o(), {position: "absolute", top: d, left: d});
                if (i.shadow) for (l = 1; l <= i.lines; l++) s(l, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
                for (l = 1; l <= i.lines; l++) s(l);
                return e(t, f)
            }, s.prototype.opacity = function (t, e, n, i) {
                var r = t.firstChild;
                i = i.shadow && i.lines || 0, r && e + i < r.childNodes.length && (r = r.childNodes[e + i], r = r && r.firstChild, r = r && r.firstChild, r && (r.opacity = n))
            }
        }

        var c, u = ["webkit", "Moz", "ms", "O"], d = {}, f = function () {
            var n = t("style", {type: "text/css"});
            return e(document.getElementsByTagName("head")[0], n), n.sheet || n.styleSheet
        }(), h = {
            lines: 12,
            length: 7,
            width: 5,
            radius: 10,
            rotate: 0,
            corners: 1,
            color: "#000",
            direction: 1,
            speed: 1,
            trail: 100,
            opacity: .25,
            fps: 20,
            zIndex: 2e9,
            className: "spinner",
            top: "50%",
            left: "50%",
            position: "absolute"
        };
        s.defaults = {}, o(s.prototype, {
            spin: function (e) {
                this.stop();
                var n = this, i = n.opts,
                    o = n.el = r(t(0, {className: i.className}), {position: i.position, width: 0, zIndex: i.zIndex});
                i.radius + i.length + i.width;
                if (r(o, {
                    left: i.left,
                    top: i.top
                }), e && e.insertBefore(o, e.firstChild || null), o.setAttribute("role", "progressbar"), n.lines(o, n.opts), !c) {
                    var a, s = 0, l = (i.lines - 1) * (1 - i.direction) / 2, u = i.fps, d = u / i.speed,
                        f = (1 - i.opacity) / (d * i.trail / 100), h = d / i.lines;
                    !function p() {
                        s++;
                        for (var t = 0; t < i.lines; t++) a = Math.max(1 - (s + (i.lines - t) * h) % d * f, i.opacity), n.opacity(o, t * i.direction + l, a, i);
                        n.timeout = n.el && setTimeout(p, ~~(1e3 / u))
                    }()
                }
                return n
            }, stop: function () {
                var t = this.el;
                return t && (clearTimeout(this.timeout), t.parentNode && t.parentNode.removeChild(t), this.el = void 0), this
            }, lines: function (i, o) {
                function s(e, n) {
                    return r(t(), {
                        position: "absolute",
                        width: o.length + o.width + "px",
                        height: o.width + "px",
                        background: e,
                        boxShadow: n,
                        transformOrigin: "left",
                        transform: "rotate(" + ~~(360 / o.lines * u + o.rotate) + "deg) translate(" + o.radius + "px,0)",
                        borderRadius: (o.corners * o.width >> 1) + "px"
                    })
                }

                for (var l, u = 0, d = (o.lines - 1) * (1 - o.direction) / 2; u < o.lines; u++) l = r(t(), {
                    position: "absolute",
                    top: 1 + ~(o.width / 2) + "px",
                    transform: o.hwaccel ? "translate3d(0,0,0)" : "",
                    opacity: o.opacity,
                    animation: c && n(o.opacity, o.trail, d + u * o.direction, o.lines) + " " + 1 / o.speed + "s linear infinite"
                }), o.shadow && e(l, r(s("#000", "0 0 4px #000"), {top: "2px"})), e(i, e(l, s(a(o.color, u), "0 0 1px rgba(0,0,0,.1)")));
                return i
            }, opacity: function (t, e, n) {
                e < t.childNodes.length && (t.childNodes[e].style.opacity = n)
            }
        });
        var p = r(t("group"), {behavior: "url(#default#VML)"});
        return !i(p, "transform") && p.adj ? l() : c = i(p, "animation"), s
    }),
    function (t, e) {
        "object" == typeof exports ? module.exports = e(require("spin.js")) : "function" == typeof define && define.amd ? define(["spin"], e) : t.Ladda = e(t.Spinner)
    }(this, function (t) {
        "use strict";

        function e(t) {
            if ("undefined" != typeof t) {
                if (/ladda-button/i.test(t.className) || (t.className += " ladda-button"), t.hasAttribute("data-style") || t.setAttribute("data-style", "expand-right"), !t.querySelector(".ladda-label")) {
                    var e = document.createElement("span");
                    e.className = "ladda-label", l(t, e)
                }
                var n, i = t.querySelector(".ladda-spinner");
                i || (i = document.createElement("span"), i.className = "ladda-spinner"), t.appendChild(i);
                var r, o = {
                    start: function () {
                        return n || (n = a(t)), t.setAttribute("disabled", ""), t.setAttribute("data-loading", ""), clearTimeout(r), n.spin(i), this.setProgress(0), this
                    }, startAfter: function (t) {
                        return clearTimeout(r), r = setTimeout(function () {
                            o.start()
                        }, t), this
                    }, stop: function () {
                        return t.removeAttribute("disabled"), t.removeAttribute("data-loading"), clearTimeout(r), n && (r = setTimeout(function () {
                            n.stop()
                        }, 1e3)), this
                    }, toggle: function () {
                        return this.isLoading() ? this.stop() : this.start(), this
                    }, setProgress: function (e) {
                        e = Math.max(Math.min(e, 1), 0);
                        var n = t.querySelector(".ladda-progress");
                        0 === e && n && n.parentNode ? n.parentNode.removeChild(n) : (n || (n = document.createElement("div"), n.className = "ladda-progress", t.appendChild(n)), n.style.width = (e || 0) * t.offsetWidth + "px")
                    }, enable: function () {
                        return this.stop(), this
                    }, disable: function () {
                        return this.stop(), t.setAttribute("disabled", ""), this
                    }, isLoading: function () {
                        return t.hasAttribute("data-loading")
                    }, remove: function () {
                        clearTimeout(r), t.removeAttribute("disabled", ""), t.removeAttribute("data-loading", ""), n && (n.stop(), n = null);
                        for (var e = 0, i = c.length; e < i; e++) if (o === c[e]) {
                            c.splice(e, 1);
                            break
                        }
                    }
                };
                return c.push(o), o
            }
        }

        function n(t, e) {
            for (; t.parentNode && t.tagName !== e;) t = t.parentNode;
            return e === t.tagName ? t : void 0
        }

        function i(t) {
            for (var e = ["input", "textarea", "select"], n = [], i = 0; i < e.length; i++) for (var r = t.getElementsByTagName(e[i]), o = 0; o < r.length; o++) r[o].hasAttribute("required") && n.push(r[o]);
            return n
        }

        function r(t, r) {
            r = r || {};
            var o = [];
            "string" == typeof t ? o = s(document.querySelectorAll(t)) : "object" == typeof t && "string" == typeof t.nodeName && (o = [t]);
            for (var a = 0, l = o.length; a < l; a++) !function () {
                var t = o[a];
                if ("function" == typeof t.addEventListener) {
                    var s = e(t), l = -1;
                    t.addEventListener("click", function (e) {
                        var o = !0, a = n(t, "FORM");
                        if ("undefined" != typeof a) if ("function" == typeof a.checkValidity) o = a.checkValidity(); else for (var c = i(a), u = 0; u < c.length; u++) "" === c[u].value.replace(/^\s+|\s+$/g, "") && (o = !1), "checkbox" !== c[u].type && "radio" !== c[u].type || c[u].checked || (o = !1), "email" === c[u].type && (o = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(c[u].value));
                        o && (s.startAfter(1), "number" == typeof r.timeout && (clearTimeout(l), l = setTimeout(s.stop, r.timeout)), "function" == typeof r.callback && r.callback.apply(null, [s]))
                    }, !1)
                }
            }()
        }

        function o() {
            for (var t = 0, e = c.length; t < e; t++) c[t].stop()
        }

        function a(e) {
            var n, i, r = e.offsetHeight;
            0 === r && (r = parseFloat(window.getComputedStyle(e).height)), r > 32 && (r *= .8), e.hasAttribute("data-spinner-size") && (r = parseInt(e.getAttribute("data-spinner-size"), 10)), e.hasAttribute("data-spinner-color") && (n = e.getAttribute("data-spinner-color")), e.hasAttribute("data-spinner-lines") && (i = parseInt(e.getAttribute("data-spinner-lines"), 10));
            var o = .2 * r, a = .6 * o, s = o < 7 ? 2 : 3;
            return new t({
                color: n || "#fff",
                lines: i || 12,
                radius: o,
                length: a,
                width: s,
                zIndex: "auto",
                top: "auto",
                left: "auto",
                className: ""
            })
        }

        function s(t) {
            for (var e = [], n = 0; n < t.length; n++) e.push(t[n]);
            return e
        }

        function l(t, e) {
            var n = document.createRange();
            n.selectNodeContents(t), n.surroundContents(e), t.appendChild(e)
        }

        var c = [];
        return {bind: r, create: e, stopAll: o}
    }),
    function (t, e) {
        "use strict";
        if ("function" == typeof define && define.amd) define(["angular", "ladda"], e); else {
            if ("undefined" == typeof module || "object" != typeof module.exports) return e(t.angular, t.Ladda);
            module.exports = e(window.angular || require("angular"), require("ladda"))
        }
    }(this,
        function (t, e) {
            "use strict";
            var n = "angular-ladda";
            return t.module(n, []).provider("ladda", function () {
                var e = {style: "zoom-in"};
                return {
                    setOption: function (n) {
                        t.extend(e, n)
                    }, $get: function () {
                        return e
                    }
                }
            }).directive("ladda", ["ladda", "$timeout", function (n, i) {
                return {
                    restrict: "A", priority: -1, link: function (r, o, a) {
                        i(function () {
                            if (o.addClass("ladda-button"), t.isUndefined(o.attr("data-style")) && o.attr("data-style", n.style || "zoom-in"), t.isUndefined(o.attr("data-spinner-size")) && n.spinnerSize && o.attr("data-spinner-size", n.spinnerSize), t.isUndefined(o.attr("data-spinner-color")) && n.spinnerColor && o.attr("data-spinner-color", n.spinnerColor), !o[0].querySelector(".ladda-label")) {
                                var i = document.createElement("span");
                                i.className = "ladda-label", t.element(i).append(o.contents()), o.append(i)
                            }
                            var s = e.create(o[0]);
                            r.$watch(a.ladda, function (e) {
                                return e || t.isNumber(e) ? (s.isLoading() || s.start(), void (t.isNumber(e) && s.setProgress(e))) : (s.stop(), void (a.ngDisabled && o.attr("disabled", r.$eval(a.ngDisabled))))
                            }), r.$on("$destroy", function () {
                                s && s.remove()
                            })
                        })
                    }
                }
            }]), n
        }),
    function (t, e, n) {
        "use strict";
        !function (e) {
            "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? module.exports = e(require("jquery")) : e(t.jQuery)
        }(function (i) {
            function r(t, e) {
                return this.$element = i(t), e && ("string" !== i.type(e.delay) && "number" !== i.type(e.delay) || (e.delay = {
                    show: e.delay,
                    hide: e.delay
                })), this.options = i.extend({}, l, e), this._defaults = l, this._name = o, this._targetclick = !1, this.init(), u.push(this.$element), this
            }

            var o = "webuiPopover", a = "webui-popover", s = "webui.popover", l = {
                    placement: "auto",
                    container: null,
                    width: "auto",
                    height: "auto",
                    trigger: "click",
                    style: "",
                    selector: !1,
                    delay: {show: null, hide: 300},
                    async: {type: "GET", before: null, success: null, error: null},
                    cache: !0,
                    multi: !1,
                    arrow: !0,
                    title: "",
                    content: "",
                    closeable: !1,
                    padding: !0,
                    url: "",
                    type: "html",
                    direction: "",
                    animation: null,
                    template: '<div class="webui-popover"><div class="webui-arrow"></div><div class="webui-popover-inner"><a href="#" class="close"></a><h3 class="webui-popover-title"></h3><div class="webui-popover-content"><i class="icon-refresh"></i> <p>&nbsp;</p></div></div></div>',
                    backdrop: !1,
                    dismissible: !0,
                    onShow: null,
                    onHide: null,
                    abortXHR: !0,
                    autoHide: !1,
                    offsetTop: 0,
                    offsetLeft: 0,
                    iframeOptions: {
                        frameborder: "0",
                        allowtransparency: "true",
                        id: "",
                        name: "",
                        scrolling: "",
                        onload: "",
                        height: "",
                        width: ""
                    },
                    hideEmpty: !1
                }, c = a + "-rtl", u = [], d = i('<div class="webui-popover-backdrop"></div>'), f = 0, h = !1, p = -2e3,
                m = i(e), g = function (t, e) {
                    return isNaN(t) ? e || 0 : Number(t)
                }, v = function (t) {
                    return t.data("plugin_" + o)
                }, y = function () {
                    for (var t = null, e = 0; e < u.length; e++) t = v(u[e]), t && t.hide(!0);
                    m.trigger("hiddenAll." + s)
                }, $ = function (t) {
                    for (var e = null, n = 0; n < u.length; n++) e = v(u[n]), e && e.id !== t.id && e.hide(!0);
                    m.trigger("hiddenAll." + s)
                }, w = "ontouchstart" in e.documentElement && /Mobi/.test(navigator.userAgent), b = function (t) {
                    var e = {x: 0, y: 0};
                    if ("touchstart" === t.type || "touchmove" === t.type || "touchend" === t.type || "touchcancel" === t.type) {
                        var n = t.originalEvent.touches[0] || t.originalEvent.changedTouches[0];
                        e.x = n.pageX, e.y = n.pageY
                    } else "mousedown" !== t.type && "mouseup" !== t.type && "click" !== t.type || (e.x = t.pageX, e.y = t.pageY);
                    return e
                };
            r.prototype = {
                init: function () {
                    if (this.$element[0] instanceof e.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
                    "manual" !== this.getTrigger() && ("click" === this.getTrigger() || w ? this.$element.off("click touchend", this.options.selector).on("click touchend", this.options.selector, i.proxy(this.toggle, this)) : "hover" === this.getTrigger() && this.$element.off("mouseenter mouseleave click", this.options.selector).on("mouseenter", this.options.selector, i.proxy(this.mouseenterHandler, this)).on("mouseleave", this.options.selector, i.proxy(this.mouseleaveHandler, this))), this._poped = !1, this._inited = !0, this._opened = !1, this._idSeed = f, this.id = o + this._idSeed, this.options.container = i(this.options.container || e.body).first(), this.options.backdrop && d.appendTo(this.options.container).hide(), f++, "sticky" === this.getTrigger() && this.show(), this.options.selector && (this._options = i.extend({}, this.options, {selector: ""}))
                }, destroy: function () {
                    for (var t = -1, e = 0; e < u.length; e++) if (u[e] === this.$element) {
                        t = e;
                        break
                    }
                    u.splice(t, 1), this.hide(), this.$element.data("plugin_" + o, null), "click" === this.getTrigger() ? this.$element.off("click") : "hover" === this.getTrigger() && this.$element.off("mouseenter mouseleave"), this.$target && this.$target.remove()
                }, getDelegateOptions: function () {
                    var t = {};
                    return this._options && i.each(this._options, function (e, n) {
                        l[e] !== n && (t[e] = n)
                    }), t
                }, hide: function (t, e) {
                    if ((t || "sticky" !== this.getTrigger()) && this._opened) {
                        e && (e.preventDefault(), e.stopPropagation()), this.xhr && this.options.abortXHR === !0 && (this.xhr.abort(), this.xhr = null);
                        var n = i.Event("hide." + s);
                        if (this.$element.trigger(n, [this.$target]), this.$target) {
                            this.$target.removeClass("in").addClass(this.getHideAnimation());
                            var r = this;
                            setTimeout(function () {
                                r.$target.hide(), r.getCache() || r.$target.remove()
                            }, r.getHideDelay())
                        }
                        this.options.backdrop && d.hide(), this._opened = !1, this.$element.trigger("hidden." + s, [this.$target]), this.options.onHide && this.options.onHide(this.$target)
                    }
                }, resetAutoHide: function () {
                    var t = this, e = t.getAutoHide();
                    e && (t.autoHideHandler && clearTimeout(t.autoHideHandler), t.autoHideHandler = setTimeout(function () {
                        t.hide()
                    }, e))
                }, delegate: function (t) {
                    var e = i(t).data("plugin_" + o);
                    return e || (e = new r(t, this.getDelegateOptions()), i(t).data("plugin_" + o, e)), e
                }, toggle: function (t) {
                    var e = this;
                    t && (t.preventDefault(), t.stopPropagation(), this.options.selector && (e = this.delegate(t.currentTarget))), e[e.getTarget().hasClass("in") ? "hide" : "show"]()
                }, hideAll: function () {
                    y()
                }, hideOthers: function () {
                    $(this)
                }, show: function () {
                    if (!this._opened) {
                        var t = this.getTarget().removeClass().addClass(a).addClass(this._customTargetClass);
                        if (this.options.multi || this.hideOthers(), !this.getCache() || !this._poped || "" === this.content) {
                            if (this.content = "", this.setTitle(this.getTitle()), this.options.closeable || t.find(".close").off("click").remove(), this.isAsync() ? this.setContentASync(this.options.content) : this.setContent(this.getContent()), this.canEmptyHide() && "" === this.content) return;
                            t.show()
                        }
                        this.displayContent(), this.options.onShow && this.options.onShow(t), this.bindBodyEvents(), this.options.backdrop && d.show(), this._opened = !0, this.resetAutoHide()
                    }
                }, displayContent: function () {
                    var t = this.getElementPosition(),
                        e = this.getTarget().removeClass().addClass(a).addClass(this._customTargetClass),
                        n = this.getContentElement(), r = e[0].offsetWidth, o = e[0].offsetHeight, l = "bottom",
                        u = i.Event("show." + s);
                    if (this.canEmptyHide()) {
                        var d = n.children().html();
                        if (null !== d && 0 === d.trim().length) return
                    }
                    this.$element.trigger(u, [e]);
                    var f = this.$element.data("width") || this.options.width;
                    "" === f && (f = this._defaults.width), "auto" !== f && e.width(f);
                    var h = this.$element.data("height") || this.options.height;
                    "" === h && (h = this._defaults.height), "auto" !== h && n.height(h), this.options.style && this.$target.addClass(a + "-" + this.options.style), "rtl" !== this.options.direction || n.hasClass(c) || n.addClass(c), this.options.arrow || e.find(".webui-arrow").remove(), e.detach().css({
                        top: p,
                        left: p,
                        display: "block"
                    }), this.getAnimation() && e.addClass(this.getAnimation()), e.appendTo(this.options.container), l = this.getPlacement(t), this.$element.trigger("added." + s), this.initTargetEvents(), this.options.padding || ("auto" !== this.options.height && n.css("height", n.outerHeight()), this.$target.addClass("webui-no-padding")), this.options.maxHeight && n.css("maxHeight", this.options.maxHeight), this.options.maxWidth && n.css("maxWidth", this.options.maxWidth), r = e[0].offsetWidth, o = e[0].offsetHeight;
                    var m = this.getTargetPositin(t, l, r, o);
                    if (this.$target.css(m.position).addClass(l).addClass("in"),
                    "iframe" === this.options.type) {
                        var g = e.find("iframe"), v = e.width(), y = g.parent().height();
                        "" !== this.options.iframeOptions.width && "auto" !== this.options.iframeOptions.width && (v = this.options.iframeOptions.width), "" !== this.options.iframeOptions.height && "auto" !== this.options.iframeOptions.height && (y = this.options.iframeOptions.height), g.width(v).height(y)
                    }
                    if (this.options.arrow || this.$target.css({margin: 0}), this.options.arrow) {
                        var $ = this.$target.find(".webui-arrow");
                        $.removeAttr("style"), "left" === l || "right" === l ? $.css({top: this.$target.height() / 2}) : "top" !== l && "bottom" !== l || $.css({left: this.$target.width() / 2}), m.arrowOffset && (m.arrowOffset.left === -1 || m.arrowOffset.top === -1 ? $.hide() : $.css(m.arrowOffset))
                    }
                    this._poped = !0, this.$element.trigger("shown." + s, [this.$target])
                }, isTargetLoaded: function () {
                    return 0 === this.getTarget().find("i.glyphicon-refresh").length
                }, getTriggerElement: function () {
                    return this.$element
                }, getTarget: function () {
                    if (!this.$target) {
                        var t = o + this._idSeed;
                        this.$target = i(this.options.template).attr("id", t), this._customTargetClass = this.$target.attr("class") !== a ? this.$target.attr("class") : null, this.getTriggerElement().attr("data-target", t)
                    }
                    return this.$target.data("trigger-element") || this.$target.data("trigger-element", this.getTriggerElement()), this.$target
                }, removeTarget: function () {
                    this.$target.remove(), this.$target = null, this.$contentElement = null
                }, getTitleElement: function () {
                    return this.getTarget().find("." + a + "-title")
                }, getContentElement: function () {
                    return this.$contentElement || (this.$contentElement = this.getTarget().find("." + a + "-content")), this.$contentElement
                }, getTitle: function () {
                    return this.$element.attr("data-title") || this.options.title || this.$element.attr("title")
                }, getUrl: function () {
                    return this.$element.attr("data-url") || this.options.url
                }, getAutoHide: function () {
                    return this.$element.attr("data-auto-hide") || this.options.autoHide
                }, getOffsetTop: function () {
                    return g(this.$element.attr("data-offset-top")) || this.options.offsetTop
                }, getOffsetLeft: function () {
                    return g(this.$element.attr("data-offset-left")) || this.options.offsetLeft
                }, getCache: function () {
                    var t = this.$element.attr("data-cache");
                    if ("undefined" != typeof t) switch (t.toLowerCase()) {
                        case"true":
                        case"yes":
                        case"1":
                            return !0;
                        case"false":
                        case"no":
                        case"0":
                            return !1
                    }
                    return this.options.cache
                }, getTrigger: function () {
                    return this.$element.attr("data-trigger") || this.options.trigger
                }, getDelayShow: function () {
                    var t = this.$element.attr("data-delay-show");
                    return "undefined" != typeof t ? t : 0 === this.options.delay.show ? 0 : this.options.delay.show || 100
                }, getHideDelay: function () {
                    var t = this.$element.attr("data-delay-hide");
                    return "undefined" != typeof t ? t : 0 === this.options.delay.hide ? 0 : this.options.delay.hide || 100
                }, getAnimation: function () {
                    var t = this.$element.attr("data-animation");
                    return t || this.options.animation
                }, getHideAnimation: function () {
                    var t = this.getAnimation();
                    return t ? t + "-out" : "out"
                }, setTitle: function (t) {
                    var e = this.getTitleElement();
                    t ? ("rtl" !== this.options.direction || e.hasClass(c) || e.addClass(c), e.html(t)) : e.remove()
                }, hasContent: function () {
                    return this.getContent()
                }, canEmptyHide: function () {
                    return this.options.hideEmpty && "html" === this.options.type
                }, getIframe: function () {
                    var t = i("<iframe></iframe>").attr("src", this.getUrl()), e = this;
                    return i.each(this._defaults.iframeOptions, function (n) {
                        "undefined" != typeof e.options.iframeOptions[n] && t.attr(n, e.options.iframeOptions[n])
                    }), t
                }, getContent: function () {
                    if (this.getUrl()) switch (this.options.type) {
                        case"iframe":
                            this.content = this.getIframe();
                            break;
                        case"html":
                            try {
                                this.content = i(this.getUrl()), this.content.is(":visible") || this.content.show()
                            } catch (t) {
                                throw new Error("Unable to get popover content. Invalid selector specified.")
                            }
                    } else if (!this.content) {
                        var e = "";
                        if (e = i.isFunction(this.options.content) ? this.options.content.apply(this.$element[0], [this]) : this.options.content, this.content = this.$element.attr("data-content") || e, !this.content) {
                            var n = this.$element.next();
                            n && n.hasClass(a + "-content") && (this.content = n)
                        }
                    }
                    return this.content
                }, setContent: function (t) {
                    var e = this.getTarget(), n = this.getContentElement();
                    "string" == typeof t ? n.html(t) : t instanceof i && (n.html(""), this.options.cache ? t.removeClass(a + "-content").appendTo(n) : t.clone(!0, !0).removeClass(a + "-content").appendTo(n)), this.$target = e
                }, isAsync: function () {
                    return "async" === this.options.type
                }, setContentASync: function (t) {
                    var e = this;
                    this.xhr || (this.xhr = i.ajax({
                        url: this.getUrl(),
                        type: this.options.async.type,
                        cache: this.getCache(),
                        beforeSend: function (t) {
                            e.options.async.before && e.options.async.before(e, t)
                        },
                        success: function (n) {
                            e.bindBodyEvents(), t && i.isFunction(t) ? e.content = t.apply(e.$element[0], [n]) : e.content = n, e.setContent(e.content);
                            var r = e.getContentElement();
                            r.removeAttr("style"), e.displayContent(), e.options.async.success && e.options.async.success(e, n)
                        },
                        complete: function () {
                            e.xhr = null
                        },
                        error: function (t, n) {
                            e.options.async.error && e.options.async.error(e, t, n)
                        }
                    }))
                }, bindBodyEvents: function () {
                    h || (this.options.dismissible && "click" === this.getTrigger() ? (m.off("keyup.webui-popover").on("keyup.webui-popover", i.proxy(this.escapeHandler, this)), m.off("click.webui-popover touchend.webui-popover").on("click.webui-popover touchend.webui-popover", i.proxy(this.bodyClickHandler, this))) : "hover" === this.getTrigger() && m.off("touchend.webui-popover").on("touchend.webui-popover", i.proxy(this.bodyClickHandler, this)))
                }, mouseenterHandler: function (t) {
                    var e = this;
                    t && this.options.selector && (e = this.delegate(t.currentTarget)), e._timeout && clearTimeout(e._timeout), e._enterTimeout = setTimeout(function () {
                        e.getTarget().is(":visible") || e.show()
                    }, this.getDelayShow())
                }, mouseleaveHandler: function () {
                    var t = this;
                    clearTimeout(t._enterTimeout), t._timeout = setTimeout(function () {
                        t.hide()
                    }, this.getHideDelay())
                }, escapeHandler: function (t) {
                    27 === t.keyCode && this.hideAll()
                }, bodyClickHandler: function (t) {
                    h = !0;
                    for (var e = !0, n = 0; n < u.length; n++) {
                        var i = v(u[n]);
                        if (i && i._opened) {
                            var r = i.getTarget().offset(), o = r.left, a = r.top, s = r.left + i.getTarget().width(),
                                l = r.top + i.getTarget().height(), c = b(t),
                                d = c.x >= o && c.x <= s && c.y >= a && c.y <= l;
                            if (d) {
                                e = !1;
                                break
                            }
                        }
                    }
                    e && y()
                }, initTargetEvents: function () {
                    "hover" === this.getTrigger() && this.$target.off("mouseenter mouseleave").on("mouseenter", i.proxy(this.mouseenterHandler, this)).on("mouseleave", i.proxy(this.mouseleaveHandler, this)), this.$target.find(".close").off("click").on("click", i.proxy(this.hide, this, !0))
                }, getPlacement: function (t) {
                    var e, n = this.options.container, i = n.innerWidth(), r = n.innerHeight(), o = n.scrollTop(),
                        a = n.scrollLeft(), s = Math.max(0, t.left - a), l = Math.max(0, t.top - o);
                    e = "function" == typeof this.options.placement ? this.options.placement.call(this, this.getTarget()[0], this.$element[0]) : this.$element.data("placement") || this.options.placement;
                    var c = "horizontal" === e, u = "vertical" === e, d = "auto" === e || c || u;
                    return d ? e = s < i / 3 ? l < r / 3 ? c ? "right-bottom" : "bottom-right" : l < 2 * r / 3 ? u ? l <= r / 2 ? "bottom-right" : "top-right" : "right" : c ? "right-top" : "top-right" : s < 2 * i / 3 ? l < r / 3 ? c ? s <= i / 2 ? "right-bottom" : "left-bottom" : "bottom" : l < 2 * r / 3 ? c ? s <= i / 2 ? "right" : "left" : l <= r / 2 ? "bottom" : "top" : c ? s <= i / 2 ? "right-top" : "left-top" : "top" : l < r / 3 ? c ? "left-bottom" : "bottom-left" : l < 2 * r / 3 ? u ? l <= r / 2 ? "bottom-left" : "top-left" : "left" : c ? "left-top" : "top-left" : "auto-top" === e ? e = s < i / 3 ? "top-right" : s < 2 * i / 3 ? "top" : "top-left" : "auto-bottom" === e ? e = s < i / 3 ? "bottom-right" : s < 2 * i / 3 ? "bottom" : "bottom-left" : "auto-left" === e ? e = l < r / 3 ? "left-top" : l < 2 * r / 3 ? "left" : "left-bottom" : "auto-right" === e && (e = l < r / 3 ? "right-bottom" : l < 2 * r / 3 ? "right" : "right-top"), e
                }, getElementPosition: function () {
                    var t = this.$element[0].getBoundingClientRect(), n = this.options.container, r = n.css("position");
                    if (n.is(e.body) || "static" === r) return i.extend({}, this.$element.offset(), {
                        width: this.$element[0].offsetWidth || t.width,
                        height: this.$element[0].offsetHeight || t.height
                    });
                    if ("fixed" === r) {
                        var o = n[0].getBoundingClientRect();
                        return {
                            top: t.top - o.top + n.scrollTop(),
                            left: t.left - o.left + n.scrollLeft(),
                            width: t.width,
                            height: t.height
                        }
                    }
                    return "relative" === r ? {
                        top: this.$element.offset().top - n.offset().top,
                        left: this.$element.offset().left - n.offset().left,
                        width: this.$element[0].offsetWidth || t.width,
                        height: this.$element[0].offsetHeight || t.height
                    } : void 0
                }, getTargetPositin: function (t, n, i, r) {
                    var o = t, a = this.options.container, s = this.$element.outerWidth(),
                        l = this.$element.outerHeight(),
                        c = e.documentElement.scrollTop + a.scrollTop(),
                        u = e.documentElement.scrollLeft + a.scrollLeft(),
                        d = {}, f = null, h = this.options.arrow ? 20 : 0, m = 10, g = s < h + m ? h : 0,
                        v = l < h + m ? h : 0, y = 0, $ = e.documentElement.clientHeight + c,
                        w = e.documentElement.clientWidth + u, b = o.left + o.width / 2 - g > 0,
                        x = o.left + o.width / 2 + g < w, C = o.top + o.height / 2 - v > 0,
                        k = o.top + o.height / 2 + v < $;
                    switch (n) {
                        case"bottom":
                            d = {top: o.top + o.height, left: o.left + o.width / 2 - i / 2};
                            break;
                        case"top":
                            d = {top: o.top - r, left: o.left + o.width / 2 - i / 2};
                            break;
                        case"left":
                            d = {top: o.top + o.height / 2 - r / 2, left: o.left - i};
                            break;
                        case"right":
                            d = {top: o.top + o.height / 2 - r / 2, left: o.left + o.width};
                            break;
                        case"top-right":
                            d = {top: o.top - r, left: b ? o.left - g : m}, f = {left: b ? Math.min(s, i) / 2 + g : p};
                            break;
                        case"top-left":
                            y = x ? g : -m, d = {
                                top: o.top - r,
                                left: o.left - i + o.width + y
                            }, f = {left: x ? i - Math.min(s, i) / 2 - g : p};
                            break;
                        case"bottom-right":
                            d = {
                                top: o.top + o.height,
                                left: b ? o.left - g : m
                            }, f = {left: b ? Math.min(s, i) / 2 + g : p};
                            break;
                        case"bottom-left":
                            y = x ? g : -m, d = {
                                top: o.top + o.height,
                                left: o.left - i + o.width + y
                            }, f = {left: x ? i - Math.min(s, i) / 2 - g : p};
                            break;
                        case"right-top":
                            y = k ? v : -m, d = {
                                top: o.top - r + o.height + y,
                                left: o.left + o.width
                            }, f = {top: k ? r - Math.min(l, r) / 2 - v : p};
                            break;
                        case"right-bottom":
                            d = {
                                top: C ? o.top - v : m,
                                left: o.left + o.width
                            }, f = {top: C ? Math.min(l, r) / 2 + v : p};
                            break;
                        case"left-top":
                            y = k ? v : -m, d = {
                                top: o.top - r + o.height + y,
                                left: o.left - i
                            }, f = {top: k ? r - Math.min(l, r) / 2 - v : p};
                            break;
                        case"left-bottom":
                            d = {top: C ? o.top - v : m, left: o.left - i}, f = {top: C ? Math.min(l, r) / 2 + v : p}
                    }
                    return d.top += this.getOffsetTop(), d.left += this.getOffsetLeft(), {position: d, arrowOffset: f}
                }
            }, i.fn[o] = function (t, e) {
                var n = [], a = this.each(function () {
                    var a = i.data(this, "plugin_" + o);
                    a ? "destroy" === t ? a.destroy() : "string" == typeof t && n.push(a[t]()) : (t ? "string" == typeof t ? "destroy" !== t && (e || (a = new r(this, null), n.push(a[t]()))) : "object" == typeof t && (a = new r(this, t)) : a = new r(this, null), i.data(this, "plugin_" + o, a))
                });
                return n.length ? n : a
            };
            var x = function () {
                var t = function () {
                    y()
                }, e = function (t, e) {
                    e = e || {}, i(t).webuiPopover(e)
                }, r = function (t) {
                    var e = !0;
                    return i(t).each(function (t, r) {
                        e = e && i(r).data("plugin_" + o) !== n
                    }), e
                }, a = function (t, e) {
                    e ? i(t).webuiPopover(e).webuiPopover("show") : i(t).webuiPopover("show")
                }, s = function (t) {
                    i(t).webuiPopover("hide")
                }, c = function (t) {
                    l = i.extend({}, l, t)
                }, u = function (t, e) {
                    var n = i(t).data("plugin_" + o);
                    if (n) {
                        var r = n.getCache();
                        n.options.cache = !1, n.options.content = e, n._opened ? (n._opened = !1, n.show()) : n.isAsync() ? n.setContentASync(e) : n.setContent(e), n.options.cache = r
                    }
                }, d = function (t, e) {
                    var n = i(t).data("plugin_" + o);
                    if (n) {
                        var r = n.getCache(), a = n.options.type;
                        n.options.cache = !1, n.options.url = e, n._opened ? (n._opened = !1, n.show()) : (n.options.type = "async", n.setContentASync(n.content)), n.options.cache = r, n.options.type = a
                    }
                };
                return {
                    show: a,
                    hide: s,
                    create: e,
                    isCreated: r,
                    hideAll: t,
                    updateContent: u,
                    updateContentAsync: d,
                    setDefaultOptions: c
                }
            }();
            t.WebuiPopovers = x
        })
    }(window, document),

    function (t, e) {
        if ("function" == typeof define && define.amd) define(["exports"], e); else if ("undefined" != typeof exports) e(exports); else {
            var n = {exports: {}};
            e(n.exports), t.angularFoundation = n.exports
        }
    }(this,
        function (t) {
            "use strict";

            function e(t) {
                if (Array.isArray(t)) {
                    for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
                    return n
                }
                return Array.from(t)
            }

            function n(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }

            function i(t, e, n) {
                "ngInject";
                var i = this;
                i.groups = [], i.closeOthers = function (i) {
                    var r = angular.isDefined(e.closeOthers) ? t.$eval(e.closeOthers) : n.closeOthers;
                    r && angular.forEach(this.groups, function (t) {
                        t !== i && (t.isOpen = !1)
                    })
                }, i.addGroup = function (t) {
                    this.groups.push(t)
                }, i.removeGroup = function (t) {
                    var e = this.groups.indexOf(t);
                    e !== -1 && this.groups.splice(e, 1)
                }
            }

            function r(t, e, n, i, r, o, a, s) {
                "ngInject";

                function l(t) {
                    f.active = !1, f.closeOnClick && p.off("click", u)
                }

                function c(t) {
                    f.active = !0, d(s), f.closeOnClick && p.on("click", u)
                }

                function u(e) {
                    var n = Array.prototype.slice.apply(i[0].querySelectorAll("*"));
                    if (n.length) {
                        var r = n.every(function (t) {
                            return t !== e.target
                        });
                        r && (l(), t.$apply())
                    }
                }

                function d(t) {
                    var e = f.paneOffset || t, n = angular.element(i[0].querySelector("toggle *:first-child")),
                        o = r.position(n);
                    f.css.top = o.top + o.height + e + "px", "center" === f.paneAlign ? (f.css.left = o.left + o.width / 2 + "px", f.css.transform = "translateX(-50%)") : "right" === f.paneAlign ? (f.css.left = o.left + o.width + "px", f.css.transform = "translateX(-100%)") : f.css.left = o.left + "px"
                }

                var f = this, h = void 0, p = angular.element(document.querySelector("body"));
                f.css = {}, a(function (t, e) {
                    var n = angular.element(i[0].querySelector("span:nth-child(1)"));
                    n.append(t)
                }, i.parent(), "toggle"), a(function (t, e) {
                    e.$close = l;
                    var n = angular.element(i[0].querySelector("div:nth-child(2)"));
                    n.append(t)
                }, i.parent(), "pane"), o(function () {
                    d()
                }), f.$onDestroy = function () {
                    f.closeOnClick && p.off("click", u)
                }, f.toggle = function () {
                    f.active ? l() : c()
                }, f.mouseover = function () {
                    o.cancel(h), f.active = !0, d(s)
                }, f.mouseleave = function () {
                    o.cancel(h), h = o(function () {
                        t.$apply(function () {
                            f.active = !1
                        })
                    }, 250)
                }
            }

            function o(t, e, n) {
                "ngInject";
                return {
                    scope: {},
                    restrict: "EA",
                    bindToController: {closeOnClick: "=", paneAlign: "@", toggleOnHover: "=", paneOffset: "="},
                    transclude: {toggle: "toggle", pane: "pane"},
                    templateUrl: "template/dropdownToggle/dropdownToggle.html",
                    controller: r,
                    controllerAs: "$ctrl"
                }
            }

            i.$inject = ["$scope", "$attrs", "accordionConfig"], r.$inject = ["$scope", "$attrs", "mediaQueries", "$element", "$position", "$timeout", "$transclude", "dropdownPaneOffset"], o.$inject = ["$document", "$window", "$location"], Object.defineProperty(t, "__esModule", {value: !0});
            var a = function () {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var i = e[n];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                    }
                }

                return function (e, n, i) {
                    return n && t(e.prototype, n), i && t(e, i), e
                }
            }(), s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t
            };
            angular.module("mm.foundation.accordion", []).constant("accordionConfig", {closeOthers: !0}).controller("AccordionController", i).directive("accordion", function () {
                "ngInject";
                return {
                    restrict: "EA",
                    controller: i,
                    controllerAs: "$ctrl",
                    transclude: !0,
                    replace: !1,
                    templateUrl: "template/accordion/accordion.html"
                }
            }).directive("accordionGroup", function () {
                "ngInject";
                return {
                    require: {accordion: "^accordion"},
                    restrict: "EA",
                    transclude: !0,
                    replace: !0,
                    templateUrl: "template/accordion/accordion-group.html",
                    scope: {},
                    controllerAs: "$ctrl",
                    bindToController: {heading: "@"},
                    controller: ["$scope", "$element", "$attrs", "$parse", function (t, e, n, i) {
                        var r = this;
                        r.isOpen = !1, r.setHTMLHeading = function (t) {
                            r.HTMLHeading = t
                        }, r.$onInit = function () {
                            r.accordion.addGroup(r), t.$on("$destroy", function (t) {
                                r.accordion.removeGroup(r)
                            });
                            var o, a;
                            n.isOpen && (o = i(n.isOpen), a = o.assign, t.$parent.$watch(o, function (t) {
                                r.isOpen = !!t
                            })), t.$watch(function () {
                                return r.isOpen
                            }, function (n) {
                                n && r.accordion.closeOthers(r), a && a(t.$parent, n), n ? t.$emit("down.af.accordionGroup", e, t) : t.$emit("up.af.accordionGroup", e, t)
                            })
                        }
                    }]
                }
            }).directive("accordionHeading", function () {
                "ngInject";
                return {
                    restrict: "EA",
                    transclude: !0,
                    template: "",
                    replace: !0,
                    require: "^accordionGroup",
                    link: function (t, e, n, i, r) {
                        i.setHTMLHeading(r(t, function () {
                        }))
                    }
                }
            }).directive("accordionTransclude", function () {
                "ngInject";
                return {
                    require: "^accordionGroup", link: function (t, e, n, i) {
                        t.$watch(function () {
                            return i.HTMLHeading
                        }, function (t) {
                            t && (e.html(""), e.append(t))
                        })
                    }
                }
            }), function () {
                angular.module("mm.foundation.accordion").run(["$templateCache", function (t) {
                    t.put("template/accordion/accordion-group.html", '<li class="accordion-item" ng-class="{ \'is-active\': $ctrl.isOpen }">\n  <a ng-click="$ctrl.isOpen = !$ctrl.isOpen" class="accordion-title" accordion-transclude>{{$ctrl.heading}}</a>\n  <div class="accordion-content" ng-style="{display: $ctrl.isOpen ? \'block\' : \'none\'}" ng-transclude></div>\n</li>\n'), t.put("template/accordion/accordion.html", '<ul class="accordion" ng-transclude></ul>\n')
                }])
            }(), angular.module("mm.foundation.alert", []).controller("AlertController", ["$scope", "$attrs", function (t, e) {
                "ngInject";
                t.closeable = "close" in e && "undefined" != typeof e.close
            }]).directive("alert", function () {
                "ngInject";
                return {
                    restrict: "EA",
                    controller: "AlertController",
                    templateUrl: "template/alert/alert.html",
                    transclude: !0,
                    replace: !0,
                    scope: {type: "=", close: "&"}
                }
            }), function () {
                angular.module("mm.foundation.alert").run(["$templateCache", function (t) {
                    t.put("template/alert/alert.html", '<div class="callout" ng-class=\'(type || "")\'>\n  <span ng-transclude></span>\n  <button ng-click="close()" ng-show="closeable" class="close-button" aria-label="Close alert" type="button">\n      <span aria-hidden="true">&times;</span>\n  </button>\n</div>\n')
                }])
            }(), angular.module("mm.foundation.bindHtml", []).directive("bindHtmlUnsafe", function () {
                "ngInject";
                return function (t, e, n) {
                    e.addClass("ng-binding").data("$binding", n.bindHtmlUnsafe), t.$watch(n.bindHtmlUnsafe, function (t) {
                        e.html(t || "")
                    })
                }
            }), angular.module("mm.foundation.buttons", []).constant("buttonConfig", {
                activeClass: "hollow",
                toggleEvent: "click"
            }).controller("ButtonsController", ["buttonConfig", function (t) {
                this.activeClass = t.activeClass, this.toggleEvent = t.toggleEvent
            }]).directive("btnRadio", function () {
                "ngInject";
                return {
                    require: ["btnRadio", "ngModel"], controller: "ButtonsController", link: function (t, e, n, i) {
                        var r = i[0], o = i[1];
                        o.$render = function () {
                            e.toggleClass(r.activeClass, angular.equals(o.$modelValue, t.$eval(n.btnRadio)))
                        }, e.bind(r.toggleEvent, function () {
                            e.hasClass(r.activeClass) || t.$apply(function () {
                                o.$setViewValue(t.$eval(n.btnRadio)), o.$render()
                            })
                        })
                    }
                }
            }).directive("btnCheckbox", function () {
                "ngInject";
                return {
                    require: ["btnCheckbox", "ngModel"], controller: "ButtonsController", link: function (t, e, n, i) {
                        function r() {
                            return a(n.btnCheckboxTrue, !0)
                        }

                        function o() {
                            return a(n.btnCheckboxFalse, !1)
                        }

                        function a(e, n) {
                            var i = t.$eval(e);
                            return angular.isDefined(i) ? i : n
                        }

                        var s = i[0], l = i[1];
                        l.$render = function () {
                            e.toggleClass(s.activeClass, angular.equals(l.$modelValue, r()))
                        }, e.bind(s.toggleEvent, function () {
                            t.$apply(function () {
                                l.$setViewValue(e.hasClass(s.activeClass) ? o() : r()), l.$render()
                            })
                        })
                    }
                }
            }), angular.module("mm.foundation.dropdownMenu", []).directive("dropdownMenu", ["$compile", function (t) {
                "ngInject";
                return {
                    bindToController: {disableHover: "=", disableClickOpen: "=", closingTime: "=", opensLeft: "="},
                    scope: {},
                    restrict: "A",
                    controllerAs: "vm",
                    controller: ["$scope", "$element", function (t, e) {
                    }]
                }
            }]).directive("li", ["$timeout", function (t) {
                "ngInject";
                return {
                    require: "?^^dropdownMenu", restrict: "E", link: function (e, n, i, r) {
                        if (r) {
                            for (var o, a = null, s = n[0].children, l = 0; l < s.length; l++) {
                                var c = angular.element(s[l]);
                                "UL" === c[0].nodeName && c.hasClass("menu") && (a = c)
                            }
                            var u = n.parent()[0].hasAttribute("dropdown-menu");
                            u || n.addClass("is-submenu-item"), a && (a.addClass("is-dropdown-submenu menu submenu vertical"), n.addClass("is-dropdown-submenu-parent opens-" + (r.opensLeft ? "left" : "right")), u && a.addClass("first-sub"), r.disableHover || n.on("mouseenter", function () {
                                t.cancel(o), n.parent().children().children().removeClass("js-dropdown-active"), a.addClass("js-dropdown-active"), n.addClass("is-active")
                            }), n.on("click", function () {
                                a.addClass("js-dropdown-active"), n.addClass("is-active")
                            }), n.on("mouseleave", function () {
                                o = t(function () {
                                    a.removeClass("js-dropdown-active"), n.removeClass("is-active")
                                }, r.closingTime ? r.closingTime : 500)
                            }))
                        }
                    }
                }
            }]), angular.module("mm.foundation.dropdownToggle", ["mm.foundation.position", "mm.foundation.mediaQueries"]).directive("dropdownToggle", o).constant("dropdownPaneOffset", 1), function () {
                angular.module("mm.foundation.dropdownToggle").run(["$templateCache", function (t) {
                    t.put("template/dropdownToggle/dropdownToggle.html", '<span\n    ng-class="{\'is-open\': $ctrl.active}"\n    ng-click="!$ctrl.toggleOnHover && $ctrl.toggle()"\n    ng-mouseover="$ctrl.toggleOnHover && $ctrl.mouseover()"\n    ng-mouseleave="$ctrl.toggleOnHover && $ctrl.mouseleave($event)"></span>\n<div\n    ng-style="$ctrl.css"\n    ng-class="{\'is-open\': $ctrl.active}"\n    ng-attr-aria-hidden="$ctrl.active"\n    ng-mouseover="$ctrl.toggleOnHover && $ctrl.mouseover()"\n    ng-mouseleave="$ctrl.toggleOnHover && $ctrl.mouseleave($event)"\n    class="dropdown-pane{{$ctrl.paneAlign && \' dropdown-pane-\' + $ctrl.paneAlign}}"></div>\n')
                }])
            }(), angular.module("mm.foundation.mediaQueries", []).factory("matchMedia", ["$document", "$window", function (t, e) {
                "ngInject";
                return e.matchMedia || function (t, e) {
                    var n = void 0, i = t.documentElement, r = i.firstElementChild || i.firstChild,
                        o = t.createElement("body"),
                        a = t.createElement("div");
                    return a.id = "mq-test-1", a.style.cssText = "position:absolute;top:-100em", o.style.background = "none", o.appendChild(a), function (t) {
                        return a.innerHTML = '&shy;<style media="' + t + '"> #mq-test-1 { width: 42px; }</style>', i.insertBefore(o, r), n = 42 === a.offsetWidth, i.removeChild(o), {
                            matches: n,
                            media: t
                        }
                    }
                }(t[0])
            }]).factory("mediaQueries", ["$document", "matchMedia", function (t, e) {
                "ngInject";

                function n(t) {
                    var e = {};
                    return "string" != typeof t ? e : (t = t.trim().slice(1, -1)) ? e = t.split("&").reduce(function (t, e) {
                        var n = e.replace(/\+/g, " ").split("="), i = n[0], r = n[1];
                        return i = decodeURIComponent(i), r = void 0 === r ? null : decodeURIComponent(r), t.hasOwnProperty(i) ? Array.isArray(t[i]) ? t[i].push(r) : t[i] = [t[i], r] : t[i] = r, t
                    }, {}) : e
                }

                function i(t) {
                    for (var e in u) {
                        var n = u[e];
                        if (t === n.name) return n.value
                    }
                    return null
                }

                function r(t) {
                    var e = i(t);
                    return !!e && window.matchMedia(e).matches
                }

                function o() {
                    for (var t = void 0, n = 0; n < u.length; n++) {
                        var i = u[n];
                        e(i.value).matches && (t = i)
                    }
                    return "object" === ("undefined" == typeof t ? "undefined" : s(t)) ? t.name : t
                }

                var a = angular.element(t[0].querySelector("head"));
                a.append('<meta class="foundation-mq" />');
                var l = getComputedStyle(a[0].querySelector("meta.foundation-mq")).fontFamily, c = n(l), u = [];
                for (var d in c) u.push({name: d, value: "only screen and (min-width: " + c[d] + ")"});
                var f = function () {
                    return /iP(ad|hone|od).*OS/.test(window.navigator.userAgent)
                }, h = function () {
                    return /Android/.test(window.navigator.userAgent)
                };
                return {
                    getCurrentSize: o, atLeast: r, mobileSniff: function () {
                        return f() || h()
                    }
                }
            }]);
            var l = t.StackedMap = function () {
                function t() {
                    n(this, t), this.stack = []
                }

                return a(t, [{
                    key: "add", value: function (t, e) {
                        this.stack.push({key: t, value: e})
                    }
                }, {
                    key: "get", value: function (t) {
                        return this.stack.find(function (e) {
                            return e.key === t
                        })
                    }
                }, {
                    key: "keys", value: function () {
                        return this.stack.map(function (t) {
                            return t.key
                        })
                    }
                }, {
                    key: "top", value: function () {
                        return this.stack[this.stack.length - 1]
                    }
                }, {
                    key: "remove", value: function (t) {
                        this.stack = this.stack.filter(function (e) {
                            return e.key !== t
                        })
                    }
                }, {
                    key: "removeTop", value: function () {
                        return this.stack.splice(this.stack.length - 1, 1)[0]
                    }
                }, {
                    key: "length", value: function () {
                        return this.stack.length
                    }
                }]), t
            }();
            angular.module("mm.foundation.modal", ["mm.foundation.mediaQueries"]).directive("modalBackdrop", ["$modalStack", function (t) {
                "ngInject";
                return {
                    restrict: "EA", replace: !0, templateUrl: "template/modal/backdrop.html", link: function (e) {
                        e.close = function (e) {
                            var n = t.getTop();
                            n && n.value.closeOnClick && n.value.backdrop && "static" !== n.value.backdrop && e.target === e.currentTarget && (e.preventDefault(), e.stopPropagation(), t.dismiss(n.key, "backdrop click"))
                        }
                    }
                }
            }]).directive("modalWindow", ["$modalStack", function (t) {
                "ngInject";
                return {
                    restrict: "EA",
                    scope: {index: "@"},
                    replace: !0,
                    transclude: !0,
                    templateUrl: "template/modal/window.html",
                    link: function (e, n, i) {
                        e.windowClass = i.windowClass || "", e.isTop = function () {
                            var n = t.getTop();
                            return !n || n.value.modalScope && n.value.modalScope === e.$parent
                        }
                    }
                }
            }]).factory("$modalStack", ["$window", "$timeout", "$document", "$compile", "$rootScope", "$animate", "$q", "mediaQueries", function (t, n, i, r, o, a, s, c) {
                "ngInject";

                function u() {
                    for (var t = -1, e = $.keys(), n = 0; n < e.length; n++) $.get(e[n]).value.backdrop && (t = n);
                    return t
                }

                function d() {
                    for (var t = $.keys(), e = t.length > 0, n = (i.find("body").eq(0), 0); n < t.length; n++) {
                        var r = w.reposition(t[n]);
                        r && "fixed" !== r.position && (e = !1)
                    }
                }

                function f(e) {
                    var n = $.get(e).value;
                    if ($.remove(e), n.backdropDomEl && a.leave(n.backdropDomEl).then(function () {
                        n.backdropScope.$destroy()
                    }), 0 === $.length()) {
                        var r = i.find("body").eq(0);
                        if (r.removeClass(g), m) {
                            var o = i.find("html").eq(0);
                            o.removeClass(g), y && (r[0].scrollTop = y, y = null)
                        }
                        angular.element(t).unbind("resize", d)
                    }
                    a.leave(n.modalDomEl).then(function () {
                        n.modalScope.$destroy()
                    })
                }

                function h(t) {
                    return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length)
                }

                function p(t) {
                    var e = t.options;
                    if (e.backdrop) return {left: 0, position: "relative"};
                    var n = e.modalDomEl, r = i.find("body").eq(0),
                        o = r.clientWidth || i[0].documentElement.clientWidth,
                        a = r.clientHeight || i[0].documentElement.clientHeight, s = n[0].offsetWidth,
                        l = n[0].offsetHeight,
                        c = parseInt((o - s) / 2, 10), u = 0;
                    l < a && (u = parseInt((a - l) / 4, 10));
                    var d = e.modalPos = e.modalPos || {};
                    return d.left = c, d.position = "fixed", d
                }

                var m = c.mobileSniff(), g = "is-reveal-open",
                    v = "a[href], area[href], input:not([disabled]):not([tabindex='-1']), button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']), textarea:not([disabled]):not([tabindex='-1']), iframe, object, embed, *[tabindex]:not([tabindex='-1']), *[contenteditable=true]",
                    y = null, $ = new l, w = {};
                return i.on("keydown", function (t) {
                    var e = $.top();
                    if (e) if (27 === t.which) e.value.keyboard && o.$apply(function () {
                        w.dismiss(e.key)
                    }); else if (9 === t.which) {
                        var n = w.loadFocusElementList(e), i = !1;
                        t.shiftKey ? (w.isFocusInFirstItem(t, n) || w.isModalFocused(t, e)) && (i = w.focusLastFocusableElement(n)) : w.isFocusInLastItem(t, n) && (i = w.focusFirstFocusableElement(n)), i && (t.preventDefault(), t.stopPropagation())
                    }
                }), w.loadFocusElementList = function (t) {
                    if (!t) return [];
                    var n = t.value.modalDomEl;
                    if (n && n.length) {
                        var i = n[0].querySelectorAll(v);
                        return [].concat(e(i)).filter(function (t) {
                            return h(t)
                        })
                    }
                    return []
                }, w.isModalFocused = function (t, e) {
                    if (t && e) {
                        var n = e.value.modalDomEl;
                        if (n && n.length) return (t.target || t.srcElement) === n[0]
                    }
                    return !1
                }, w.isFocusInLastItem = function (t, e) {
                    return e.length > 0 && (t.target || t.srcElement) === e[e.length - 1]
                }, w.focusFirstFocusableElement = function (t) {
                    return t.length > 0 && (t[0].focus(), !0)
                }, w.focusLastFocusableElement = function (t) {
                    return t.length > 0 && (t[t.length - 1].focus(), !0)
                }, w.isFocusInFirstItem = function (t, e) {
                    return e.length > 0 && (t.target || t.srcElement) === e[0]
                }, w.open = function (e, l) {
                    e.options = {
                        deferred: l.deferred,
                        modalScope: l.scope,
                        backdrop: l.backdrop,
                        keyboard: l.keyboard,
                        closeOnClick: l.closeOnClick,
                        id: l.id
                    }, $.add(e, e.options);
                    var c = (u(), void 0);
                    if (l.backdrop) {
                        var f = o.$new(!0);
                        c = r("<div modal-backdrop></div>")(f), $.top().value.backdropDomEl = c, $.top().value.backdropScope = f
                    }
                    1 === $.length() && angular.element(t).on("resize", d);
                    var h = [];
                    l.windowClass && h.push(l.windowClass), l.size && h.push(l.size), l.backdrop || h.push("without-overlay");
                    var v = angular.element("<div modal-window></div>").attr({
                        style: "\n                visibility: visible;\n                z-index: -1;\n                display: block;\n            ",
                        "window-class": h.join(" "),
                        index: $.length() - 1
                    });
                    return v.html(l.content), r(v)(l.scope), $.top().value.modalDomEl = v, n(function () {
                        l.scope.$apply();
                        var n = i.find("body").eq(0);
                        n.prepend(v);
                        var r = p(e, !0);
                        v.detach(), v.attr({style: "\n                    visibility: visible;\n                    left: " + r.left + "px;\n                    display: block;\n                    position: " + r.position + ";\n                "});
                        var o = [];
                        c && o.push(a.enter(c, n, n[0].lastChild));
                        var u = c || n;
                        if (o.push(a.enter(v, u, u[0].lastChild)), m) {
                            y = t.pageYOffset;
                            var f = i.find("html").eq(0);
                            f.addClass(g)
                        }
                        return n.addClass(g), l.backdrop || l.scope.$watch(function () {
                            return Math.floor(v[0].offsetHeight / 10)
                        }, d), s.all(o).then(function () {
                            var t = v[0].querySelector("[autofocus]") || v[0], e = u[0].scrollTop;
                            t.focus(), u[0].scrollTop = e
                        })
                    })
                }, w.reposition = function (t) {
                    var e = $.get(t).value;
                    if (e) {
                        var n = e.modalDomEl, i = p(t);
                        return n.css("left", i.left + "px"), n.css("position", i.position), i
                    }
                    return {}
                }, w.close = function (t, e) {
                    var n = $.get(t);
                    return n ? (n.value.deferred.resolve(e), t.opened.then(function () {
                        f(t)
                    })) : s.resolve()
                }, w.dismiss = function (t, e) {
                    var n = $.get(t);
                    return n ? (n.value.deferred.reject(e), t.opened.then(function () {
                        f(t)
                    })) : s.resolve()
                }, w.dismissAll = function (t) {
                    var e = arguments.length <= 1 || void 0 === arguments[1] ? [] : arguments[1];
                    return s.all($.keys().filter(function (t) {
                        return e.indexOf($.get(t).value.id) === -1
                    }).map(function (e) {
                        return w.dismiss(e, t)
                    }))
                }, w.getTop = function () {
                    return $.top()
                }, w.isOpen = function (t) {
                    return $.keys().some(function (t) {
                        return skipIds.indexOf($.get().value.id) !== -1
                    })
                }, w
            }]).provider("$modal", function () {
                "ngInject";
                var t = this;
                this.options = {
                    backdrop: !0,
                    keyboard: !0,
                    closeOnClick: !0,
                    id: 0
                }, this.$get = ["$injector", "$rootScope", "$q", "$http", "$templateCache", "$controller", "$modalStack", function (e, n, i, r, o, a, s) {
                    function l(t) {
                        return t.template ? i.resolve(t.template) : r.get(t.templateUrl, {cache: o}).then(function (t) {
                            return t.data
                        })
                    }

                    function c(t) {
                        var n = [];
                        return angular.forEach(t, function (t) {
                            (angular.isFunction(t) || angular.isArray(t)) && n.push(i.when(e.invoke(t)))
                        }), n
                    }

                    var u = {};
                    return u.open = function (e) {
                        var r = i.defer(), o = i.defer(), u = {
                            result: r.promise, opened: o.promise, close: function (t) {
                                s.close(u, t)
                            }, dismiss: function (t) {
                                s.dismiss(u, t)
                            }, reposition: function () {
                                s.reposition(u)
                            }
                        }, d = angular.extend({}, t.options, e);
                        if (d.resolve = d.resolve || {}, !d.template && !d.templateUrl) throw new Error("One of template or templateUrl options is required.");
                        var f = i.all([l(d)].concat(c(d.resolve))), h = f.then(function (t) {
                            var e = (d.scope || n).$new();
                            e.$close = u.close, e.$dismiss = u.dismiss;
                            var i = void 0, o = {}, l = 1;
                            return d.controller && (o.$scope = e, o.$modalInstance = u, angular.forEach(d.resolve, function (e, n) {
                                o[n] = t[l++]
                            }), i = a(d.controller, o), d.controllerAs && (e[d.controllerAs] = i)), s.open(u, {
                                scope: e,
                                deferred: r,
                                content: t[0],
                                backdrop: d.backdrop,
                                keyboard: d.keyboard,
                                windowClass: d.windowClass,
                                size: d.size,
                                closeOnClick: d.closeOnClick,
                                id: d.id
                            })
                        }, function (t) {
                            return r.reject(t), i.reject(t)
                        });
                        return h.then(function () {
                            o.resolve()
                        }, function () {
                            o.reject()
                        }), u
                    }, u
                }]
            }), function () {
                angular.module("mm.foundation.modal").run(["$templateCache", function (t) {
                    t.put("template/modal/backdrop.html", '<div ng-animate-children="true"\n    class="reveal-overlay ng-animate"\n    ng-click="close($event)"\n    style="display: block;"></div>\n'), t.put("template/modal/window.html", '<div tabindex="-1" class="reveal {{ windowClass }}" style="display: block; visibility: visible;">\n  <div ng-transclude></div>\n</div>\n')
                }])
            }(), angular.module("mm.foundation.offcanvas", []).directive("offCanvasWrapper", ["$window", function (t) {
                "ngInject";
                return {
                    scope: {},
                    bindToController: {disableAutoClose: "="},
                    controllerAs: "vm",
                    restrict: "C",
                    controller: ["$scope", "$element", function (e, n) {
                        var i = this, r = angular.element(n[0].querySelector(".position-left")),
                            o = angular.element(n[0].querySelector(".position-right")),
                            a = angular.element(n[0].querySelector(".off-canvas-wrapper-inner")),
                            s = angular.element('<div class="js-off-canvas-exit"></div>');
                        a.append(s), s.on("click", function () {
                            i.hide()
                        }), i.leftToggle = function () {
                            a && a.toggleClass("is-off-canvas-open"), a && a.toggleClass("is-open-left"), r && r.toggleClass("is-open"), s.addClass("is-visible")
                        }, i.rightToggle = function () {
                            a && a.toggleClass("is-off-canvas-open"), a && a.toggleClass("is-open-right"), o && o.toggleClass("is-open"), s.addClass("is-visible")
                        }, i.hide = function () {
                            a && a.removeClass("is-open-left"), a && a.removeClass("is-open-right"), r && r.removeClass("is-open"), o && o.removeClass("is-open"), a && a.removeClass("is-off-canvas-open"), s.removeClass("is-visible")
                        };
                        var l = angular.element(t);
                        l.bind("resize.body", i.hide), e.$on("$destroy", function () {
                            l.unbind("resize.body", i.hide)
                        })
                    }]
                }
            }]).directive("leftOffCanvasToggle", function () {
                "ngInject";
                return {
                    require: "^^offCanvasWrapper", restrict: "C", link: function (t, e, n, i) {
                        e.on("click", function () {
                            i.leftToggle()
                        })
                    }
                }
            }).directive("rightOffCanvasToggle", function () {
                "ngInject";
                return {
                    require: "^^offCanvasWrapper", restrict: "C", link: function (t, e, n, i) {
                        e.on("click", function () {
                            i.rightToggle()
                        })
                    }
                }
            }).directive("offCanvas", function () {
                "ngInject";
                return {
                    require: {offCanvasWrapper: "^^offCanvasWrapper"},
                    restrict: "C",
                    bindToController: {},
                    scope: {},
                    controllerAs: "vm",
                    controller: function () {
                    }
                }
            }).directive("li", function () {
                "ngInject";
                return {
                    require: "?^^offCanvas", restrict: "E", link: function (t, e, n, i) {
                        i && !i.offCanvasWrapper.disableAutoClose && e.on("click", function () {
                            i.offCanvasWrapper.hide()
                        })
                    }
                }
            }), angular.module("mm.foundation.pagination", []).controller("PaginationController", ["$scope", "$attrs", "$parse", "$interpolate", function (t, e, n, i) {
                var r = this, o = e.numPages ? n(e.numPages).assign : angular.noop;
                this.init = function (i) {
                    e.itemsPerPage ? t.$parent.$watch(n(e.itemsPerPage), function (e) {
                        r.itemsPerPage = parseInt(e, 10), t.totalPages = r.calculateTotalPages()
                    }) : this.itemsPerPage = i
                }, this.noPrevious = function () {
                    return 1 === this.page
                }, this.noNext = function () {
                    return this.page === t.totalPages
                }, this.isActive = function (t) {
                    return this.page === t
                }, this.calculateTotalPages = function () {
                    var e = this.itemsPerPage < 1 ? 1 : Math.ceil(t.totalItems / this.itemsPerPage);
                    return Math.max(e || 0, 1)
                }, this.getAttributeValue = function (e, n, r) {
                    return angular.isDefined(e) ? r ? i(e)(t.$parent) : t.$parent.$eval(e) : n
                }, this.render = function () {
                    this.page = parseInt(t.page, 10) || 1, this.page > 0 && this.page <= t.totalPages && (t.pages = this.getPages(this.page, t.totalPages))
                }, t.selectPage = function (e) {
                    !r.isActive(e) && e > 0 && e <= t.totalPages && (t.page = e, t.onSelectPage({page: e}))
                }, t.$watch("page", function () {
                    r.render()
                }), t.$watch("totalItems", function () {
                    t.totalPages = r.calculateTotalPages()
                }), t.$watch("totalPages", function (e) {
                    o(t.$parent, e), r.page > e ? t.selectPage(e) : r.render()
                })
            }]).constant("paginationConfig", {
                itemsPerPage: 10,
                boundaryLinks: !1,
                directionLinks: !0,
                firstText: "First",
                previousText: "Previous",
                nextText: "Next",
                lastText: "Last",
                rotate: !0
            }).directive("pagination", ["$parse", "paginationConfig", function (t, e) {
                "ngInject";
                return {
                    restrict: "EA",
                    scope: {page: "=", totalItems: "=", onSelectPage: " &"},
                    controller: "PaginationController",
                    templateUrl: "template/pagination/pagination.html",
                    replace: !0,
                    link: function (n, i, r, o) {
                        function a(t, e, n, i) {
                            return {number: t, text: e, active: n, disabled: i}
                        }

                        var s, l = o.getAttributeValue(r.boundaryLinks, e.boundaryLinks),
                            c = o.getAttributeValue(r.directionLinks, e.directionLinks),
                            u = o.getAttributeValue(r.firstText, e.firstText, !0),
                            d = o.getAttributeValue(r.previousText, e.previousText, !0),
                            f = o.getAttributeValue(r.nextText, e.nextText, !0),
                            h = o.getAttributeValue(r.lastText, e.lastText, !0),
                            p = o.getAttributeValue(r.rotate, e.rotate);
                        o.init(e.itemsPerPage), r.maxSize && n.$parent.$watch(t(r.maxSize), function (t) {
                            s = parseInt(t, 10), o.render()
                        }), o.getPages = function (t, e) {
                            var n = [], i = 1, r = e, m = angular.isDefined(s) && s < e;
                            m && (p ? (i = Math.max(t - Math.floor(s / 2), 1), r = i + s - 1, r > e && (r = e, i = r - s + 1)) : (i = (Math.ceil(t / s) - 1) * s + 1, r = Math.min(i + s - 1, e)));
                            for (var g = i; g <= r; g++) {
                                var v = a(g, g, o.isActive(g), !1);
                                n.push(v)
                            }
                            if (m && !p) {
                                if (i > 1) {
                                    var y = a(i - 1, "...", !1, !1);
                                    n.unshift(y)
                                }
                                if (r < e) {
                                    var $ = a(r + 1, "...", !1, !1);
                                    n.push($)
                                }
                            }
                            if (c) {
                                var w = a(t - 1, d, !1, o.noPrevious());
                                n.unshift(w);
                                var b = a(t + 1, f, !1, o.noNext());
                                n.push(b)
                            }
                            if (l) {
                                var x = a(1, u, !1, o.noPrevious());
                                n.unshift(x);
                                var C = a(e, h, !1, o.noNext());
                                n.push(C)
                            }
                            return n
                        }
                    }
                }
            }]).constant("pagerConfig", {
                itemsPerPage: 10,
                previousText: "« Previous",
                nextText: "Next »",
                align: !0
            }).directive("pager", ["pagerConfig", function (t) {
                "ngInject";
                return {
                    restrict: "EA",
                    scope: {page: "=", totalItems: "=", onSelectPage: " &"},
                    controller: "PaginationController",
                    templateUrl: "template/pagination/pager.html",
                    replace: !0,
                    link: function (e, n, i, r) {
                        function o(t, e, n, i, r) {
                            return {number: t, text: e, disabled: n, previous: l && i, next: l && r}
                        }

                        var a = r.getAttributeValue(i.previousText, t.previousText, !0),
                            s = r.getAttributeValue(i.nextText, t.nextText, !0),
                            l = r.getAttributeValue(i.align, t.align);
                        r.init(t.itemsPerPage), r.getPages = function (t) {
                            return [o(t - 1, a, r.noPrevious(), !0, !1), o(t + 1, s, r.noNext(), !1, !0)]
                        }
                    }
                }
            }]), function () {
                angular.module("mm.foundation.pagination").run(["$templateCache", function (t) {
                    t.put("template/pagination/pager.html", '<ul class="pagination">\n  <li ng-repeat="page in pages" class="arrow" ng-class="{unavailable: page.disabled, left: page.previous, right: page.next}"><a ng-click="selectPage(page.number)">{{page.text}}</a></li>\n</ul>\n'), t.put("template/pagination/pagination.html", '<ul class="pagination" role="navigation" aria-label="Pagination">\n  <li ng-repeat="page in pages"\n    ng-class="{\n        \'pagination-previous\': $first,\n        \'pagination-next\': $last,\n        current: page.active,\n        unavailable: page.disabled\n        }">\n    <a ng-if="!page.active" ng-click="selectPage(page.number)">{{page.text}}</a>\n    <span ng-if="page.active">{{page.text}}</span>\n  </li>\n</ul>\n')
                }])
            }(), angular.module("mm.foundation.position", []).factory("$position", ["$document", "$window", function (t, e) {
                "ngInject";

                function n(t, n) {
                    return t.currentStyle ? t.currentStyle[n] : e.getComputedStyle ? e.getComputedStyle(t)[n] : t.style[n]
                }

                function i(t) {
                    return "static" === (n(t, "position") || "static")
                }

                var r = function (e) {
                    for (var n = t[0], r = e.offsetParent || n; r && r !== n && i(r);) r = r.offsetParent;
                    return r || n
                };
                return {
                    position: function (e) {
                        var n = this.offset(e), i = {top: 0, left: 0}, o = r(e[0]);
                        o != t[0] && (i = this.offset(angular.element(o)), i.top += o.clientTop - o.scrollTop, i.left += o.clientLeft - o.scrollLeft);
                        var a = e[0].getBoundingClientRect();
                        return {
                            width: a.width || e.prop("offsetWidth"),
                            height: a.height || e.prop("offsetHeight"),
                            top: n.top - i.top,
                            left: n.left - i.left
                        }
                    }, offset: function (n) {
                        var i = n[0].getBoundingClientRect();
                        return {
                            width: i.width || n.prop("offsetWidth"),
                            height: i.height || n.prop("offsetHeight"),
                            top: i.top + (e.pageYOffset || t[0].body.scrollTop || t[0].documentElement.scrollTop),
                            left: i.left + (e.pageXOffset || t[0].body.scrollLeft || t[0].documentElement.scrollLeft)
                        }
                    }
                }
            }]), angular.module("mm.foundation.progressbar", []).constant("progressConfig", {
                animate: !0,
                max: 100
            }).controller("ProgressController", ["$scope", "$attrs", "progressConfig", "$animate", function (t, e, n, i) {
                "ngInject";
                var r = this, o = [], a = angular.isDefined(e.max) ? t.$parent.$eval(e.max) : n.max,
                    s = angular.isDefined(e.animate) ? t.$parent.$eval(e.animate) : n.animate;
                this.addBar = function (t, e) {
                    var n = 0, i = t.$parent.$index;
                    angular.isDefined(i) && o[i] && (n = o[i].value), o.push(t), this.update(e, t.value, n), t.$watch("value", function (t, n) {
                        t !== n && r.update(e, t, n)
                    }), t.$on("$destroy", function () {
                        r.removeBar(t)
                    })
                }, this.update = function (t, e, n) {
                    var r = this.getPercentage(e);
                    s ? (t.css("width", this.getPercentage(n) + "%"), i.animate(t, {width: this.getPercentage(n) + "%"}, {width: r + "%"})) : t.css({
                        transition: "none",
                        width: r + "%"
                    })
                }, this.removeBar = function (t) {
                    o.splice(o.indexOf(t), 1)
                }, this.getPercentage = function (t) {
                    return Math.round(100 * t / a)
                }
            }]).directive("progress", function () {
                "ngInject";
                return {
                    restrict: "EA",
                    replace: !0,
                    transclude: !0,
                    controller: "ProgressController",
                    require: "progress",
                    scope: {},
                    template: '<div class="progress" ng-transclude></div>'
                }
            }).directive("bar", function () {
                "ngInject";
                return {
                    restrict: "EA",
                    replace: !0,
                    transclude: !0,
                    require: "^progress",
                    scope: {value: "=", type: "@"},
                    templateUrl: "template/progressbar/bar.html",
                    link: function (t, e, n, i) {
                        i.addBar(t, e)
                    }
                }
            }).directive("progressbar", function () {
                return {
                    restrict: "EA",
                    replace: !0,
                    transclude: !0,
                    controller: "ProgressController",
                    scope: {value: "=", type: "@"},
                    templateUrl: "template/progressbar/progressbar.html",
                    link: function (t, e, n, i) {
                        i.addBar(t, angular.element(e.children()[0]))
                    }
                }
            }), function () {
                angular.module("mm.foundation.progressbar").run(["$templateCache", function (t) {
                    t.put("template/progressbar/bar.html", '<span class="meter" ng-transclude></span>\n'), t.put("template/progressbar/progress.html", '<div class="progress" ng-class="type" ng-transclude></div>\n'), t.put("template/progressbar/progressbar.html", '<div class="progress" role="progressbar" ng-class="type">\n  <span class="progress-meter"><p class="progress-meter-text" ng-transclude></p></span>\n</div>\n')
                }])
            }(), angular.module("mm.foundation.rating", []).constant("ratingConfig", {
                max: 5,
                stateOn: null,
                stateOff: null
            }).controller("RatingController", ["$scope", "$attrs", "$parse", "ratingConfig", function (t, e, n, i) {
                this.maxRange = angular.isDefined(e.max) ? t.$parent.$eval(e.max) : i.max, this.stateOn = angular.isDefined(e.stateOn) ? t.$parent.$eval(e.stateOn) : i.stateOn, this.stateOff = angular.isDefined(e.stateOff) ? t.$parent.$eval(e.stateOff) : i.stateOff, this.createRateObjects = function (t) {
                    for (var e = {
                        stateOn: this.stateOn,
                        stateOff: this.stateOff
                    }, n = 0, i = t.length; n < i; n++) t[n] = angular.extend({index: n}, e, t[n]);
                    return t
                }, t.range = angular.isDefined(e.ratingStates) ? this.createRateObjects(angular.copy(t.$parent.$eval(e.ratingStates))) : this.createRateObjects(new Array(this.maxRange)), t.rate = function (e) {
                    t.value === e || t.readonly || (t.value = e)
                }, t.enter = function (e) {
                    t.readonly || (t.val = e), t.onHover({value: e})
                }, t.reset = function () {
                    t.val = angular.copy(t.value), t.onLeave()
                }, t.$watch("value", function (e) {
                    t.val = e
                }), t.readonly = !1, e.readonly && t.$parent.$watch(n(e.readonly), function (e) {
                    t.readonly = !!e
                })
            }]).directive("rating", function () {
                return {
                    restrict: "EA",
                    scope: {value: "=", onHover: "&", onLeave: "&"},
                    controller: "RatingController",
                    templateUrl: "template/rating/rating.html",
                    replace: !0
                }
            }), function () {
                angular.module("mm.foundation.rating").run(["$templateCache", function (t) {
                    t.put("template/rating/rating.html", '<span ng-mouseleave="reset()">\n  <i ng-repeat="r in range" ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="fa"\n    ng-class="$index < val && (r.stateOn || \'fa-star\') || (r.stateOff || \'fa-star-o\')"></i>\n</span>\n')
                }])
            }(), angular.module("mm.foundation.tabs", []).controller("TabsetController", ["$scope", function (t) {
                "ngInject";
                var e = this, n = e.tabs = t.tabs = [];
                angular.isUndefined(t.openOnLoad) && (t.openOnLoad = !0), e.select = function (t) {
                    angular.forEach(n, function (t) {
                        t.active = !1
                    }), t.active = !0
                }, e.addTab = function (i) {
                    n.push(i), t.openOnLoad && (1 === n.length || i.active) && e.select(i)
                }, e.removeTab = function (t) {
                    var i = n.indexOf(t);
                    if (t.active && n.length > 1) {
                        var r = i == n.length - 1 ? i - 1 : i + 1;
                        e.select(n[r])
                    }
                    n.splice(i, 1)
                }
            }]).directive("tabset", function () {
                "ngInject";
                return {
                    restrict: "EA",
                    transclude: !0,
                    replace: !0,
                    scope: {openOnLoad: "=?"},
                    controller: "TabsetController",
                    templateUrl: function (t, e) {
                        var n = "true" == e.vertical ? "vertical" : "horizontal";
                        return "template/tabs/tabset-" + n + ".html"
                    },
                    link: function (t, e, n) {
                        t.vertical = !!angular.isDefined(n.vertical) && t.$parent.$eval(n.vertical), t.justified = !!angular.isDefined(n.justified) && t.$parent.$eval(n.justified), t.type = angular.isDefined(n.type) ? t.$parent.$eval(n.type) : "tabs"
                    }
                }
            }).directive("tab", ["$parse", function (t) {
                "ngInject";
                return {
                    require: "^tabset",
                    restrict: "EA",
                    replace: !0,
                    templateUrl: "template/tabs/tab.html",
                    transclude: !0,
                    scope: {heading: "@", onSelect: "&select", onDeselect: "&deselect"},
                    controller: function () {
                    },
                    compile: function (e, n, i) {
                        return function (e, n, r, o) {
                            var a, s;
                            r.active ? (a = t(r.active), s = a.assign, e.$parent.$watch(a, function (t, n) {
                                t !== n && (e.active = !!t)
                            }), e.active = a(e.$parent)) : s = a = angular.noop, e.$watch("active", function (t) {
                                angular.isFunction(s) && (s(e.$parent, t), t ? (o.select(e), e.onSelect(), e.$emit("change.af.tabs", n)) : e.onDeselect())
                            }), e.disabled = !1, r.disabled && e.$parent.$watch(t(r.disabled), function (t) {
                                e.disabled = !!t
                            }), e.select = function () {
                                e.disabled || (e.active = !0)
                            }, o.addTab(e), e.$on("$destroy", function () {
                                o.removeTab(e)
                            }), e.$transcludeFn = i
                        }
                    }
                }
            }]).directive("tabHeadingTransclude", function () {
                "ngInject";
                return {
                    restrict: "A", require: "^tab", link: function (t, e, n, i) {
                        t.$watch("headingElement", function (t) {
                            t && (e.html(""), e.append(t))
                        })
                    }
                }
            }).directive("tabContentTransclude", function () {
                "ngInject";

                function t(t) {
                    return t.tagName && (t.hasAttribute("tab-heading") || t.hasAttribute("data-tab-heading") || "tab-heading" === t.tagName.toLowerCase() || "data-tab-heading" === t.tagName.toLowerCase())
                }

                return {
                    restrict: "A", require: "^tabset", link: function (e, n, i) {
                        var r = e.$eval(i.tabContentTransclude);
                        r.$transcludeFn(r.$parent, function (e) {
                            angular.forEach(e, function (e) {
                                t(e) ? r.headingElement = e : n.append(e)
                            })
                        })
                    }
                }
            }), function () {
                angular.module("mm.foundation.tabs").run(["$templateCache", function (t) {
                    t.put("template/tabs/tab.html", '<li class="tabs-title" ng-class="{\'is-active\': active}">\n  <a ng-click="select()" ng-attr-aria-selected="{{active}}" tab-heading-transclude>{{heading}}</a>\n</li>\n'), t.put("template/tabs/tabset-horizontal.html", '<div class="tabbable">\n  <ul class="tabs" ng-transclude></ul>\n  <div class="tabs-content">\n    <div class="tabs-panel"\n      ng-repeat="tab in tabs"\n      ng-class="{\'is-active\': tab.active}">\n      <div tab-content-transclude="tab"></div>\n    </div>\n  </div>\n</div>\n'), t.put("template/tabs/tabset-vertical.html", '<div class="tabbable row collapse">\n  <div class="medium-3 columns">\n    <ul class="tabs vertical" ng-transclude></ul>\n  </div>\n  <div class="medium-9 columns">\n    <div class="tabs-content vertical">\n      <div class="tabs-panel"\n        ng-repeat="tab in tabs"\n        ng-class="{\'is-active\': tab.active}">\n        <div tab-content-transclude="tab"></div>\n      </div>\n    </div>\n  </div>\n</div>\n')
                }])
            }(), angular.module("mm.foundation.tooltip", ["mm.foundation.position", "mm.foundation.bindHtml"]).provider("$tooltip", function () {
                "ngInject";

                function t(t) {
                    var e = /[A-Z]/g, n = "-";
                    return t.replace(e, function (t, e) {
                        return (e ? n : "") + t.toLowerCase()
                    })
                }

                var e = {placement: "top", popupDelay: 0}, n = {mouseover: "mouseout", click: "click", focus: "blur"},
                    i = {};
                this.options = function (t) {
                    angular.extend(i, t)
                }, this.setTriggers = function (t) {
                    angular.extend(n, t)
                }, this.$get = ["$window", "$compile", "$timeout", "$parse", "$document", "$position", "$interpolate", "$animate", function (r, o, a, s, l, c, u, d) {
                    return function (r, f, h) {
                        function p(t) {
                            var e = (t || m.trigger || h).split(" "), i = e.map(function (t) {
                                return n[t] || t
                            });
                            return {show: e, hide: i}
                        }

                        var m = angular.extend({}, e, i), g = t(r), v = u.startSymbol(), y = u.endSymbol(),
                            $ = "<div " + g + '-popup title="' + v + "tt_title" + y + '" content="' + v + "tt_content" + y + '" placement="' + v + "tt_placement" + y + '" is-open="tt_isOpen"></div>';
                        return {
                            restrict: "EA", scope: !0, compile: function (t) {
                                var e = o($);
                                return function (t, n, i) {
                                    function o() {
                                        t.tt_isOpen ? h() : u()
                                    }

                                    function u() {
                                        k && !t.$eval(i[f + "Enable"]) || (t.tt_popupDelay ? (b = a(g, t.tt_popupDelay, !1), b.then(function (t) {
                                            t()
                                        }, angular.noop)) : g()())
                                    }

                                    function h() {
                                        t.$apply(function () {
                                            v()
                                        })
                                    }

                                    function g() {
                                        return t.tt_content ? (y(), w.css({
                                            top: 0,
                                            left: 0
                                        }), x ? d.enter(w, l.find("body")) : d.enter(w, n.parent(), n), S(), t.tt_isOpen = !0, t.$digest(), S) : angular.noop
                                    }

                                    function v() {
                                        t.tt_isOpen = !1, a.cancel(b), $()
                                    }

                                    function y() {
                                        w && $(), w = e(t, function () {
                                        }), t.$digest()
                                    }

                                    function $() {
                                        w && (d.leave(w), w = null)
                                    }

                                    var w, b, x = !!angular.isDefined(m.appendToBody) && m.appendToBody, C = p(void 0),
                                        k = angular.isDefined(i[f + "Enable"]), S = function () {
                                            var e, i, r, o;
                                            switch (e = x ? c.offset(n) : c.position(n), i = w.prop("offsetWidth"), r = w.prop("offsetHeight"), t.tt_placement) {
                                                case"right":
                                                    o = {top: e.top + e.height / 2 - r / 2, left: e.left + e.width + 10};
                                                    break;
                                                case"bottom":
                                                    o = {top: e.top + e.height + 10, left: e.left - i / 2 + e.width / 2};
                                                    break;
                                                case"left":
                                                    o = {top: e.top + e.height / 2 - r / 2, left: e.left - i - 10};
                                                    break;
                                                default:
                                                    o = {top: e.top - r - 10, left: e.left - i / 2 + e.width / 2}
                                            }
                                            o.top += "px", o.left += "px", w.css(o)
                                        };
                                    t.tt_isOpen = !1, i.$observe(r, function (e) {
                                        t.tt_content = e, !e && t.tt_isOpen && v()
                                    }), i.$observe(f + "Title", function (e) {
                                        t.tt_title = e
                                    }), i[f + "Placement"] = i[f + "Placement"] || null, i.$observe(f + "Placement", function (e) {
                                        t.tt_placement = angular.isDefined(e) && e ? e : m.placement
                                    }), i[f + "PopupDelay"] = i[f + "PopupDelay"] || null, i.$observe(f + "PopupDelay", function (e) {
                                        var n = parseInt(e, 10);
                                        t.tt_popupDelay = isNaN(n) ? m.popupDelay : n
                                    });
                                    var _ = function () {
                                        C.show.forEach(function (t, e) {
                                            var i = C.hide[e];
                                            t === i ? n.off(t, o) : (n.off(t, u), n.off(i, h))
                                        })
                                    };
                                    i[f + "Trigger"] = i[f + "Trigger"] || null, i.$observe(f + "Trigger", function (t) {
                                        _(), C = p(t), C.show.forEach(function (t, e) {
                                            var i = C.hide[e];
                                            t === i ? n.bind(t, o) : (n.bind(t, u), n.bind(i, h))
                                        }), n.on("keydown", function (t) {
                                            27 === t.which && h()
                                        })
                                    }), i.$observe(f + "AppendToBody", function (e) {
                                        x = angular.isDefined(e) ? s(e)(t) : x
                                    }), x && t.$on("$locationChangeSuccess", function () {
                                        t.tt_isOpen && v()
                                    }), t.$on("$destroy", function () {
                                        a.cancel(b), _(), $()
                                    })
                                }
                            }
                        }
                    }
                }]
            }).directive("tooltipPopup", function () {
                "ngInject";
                return {
                    restrict: "EA",
                    replace: !0,
                    scope: {content: "@", placement: "@", isOpen: "&"},
                    templateUrl: "template/tooltip/tooltip-popup.html"
                }
            }).directive("tooltip", ["$tooltip", function (t) {
                "ngInject";
                return t("tooltip", "tooltip", "mouseover")
            }]).directive("tooltipHtmlUnsafePopup", function () {
                return {
                    restrict: "EA",
                    replace: !0,
                    scope: {content: "@", placement: "@", isOpen: "&"},
                    templateUrl: "template/tooltip/tooltip-html-unsafe-popup.html"
                }
            }).directive("tooltipHtmlUnsafe", ["$tooltip", function (t) {
                "ngInject";
                return t("tooltipHtmlUnsafe", "tooltip", "mouseover")
            }]), function () {
                angular.module("mm.foundation.tooltip").run(["$templateCache", function (t) {
                    t.put("template/tooltip/tooltip-html-unsafe-popup.html", '<div class="tooltip {{placement}}" style="width: auto;">\n  <span bind-html-unsafe="content"></span>\n</div>\n'), t.put("template/tooltip/tooltip-popup.html", '<div class="tooltip {{placement}}" style="width: auto;">\n  <span ng-bind="content"></span>\n</div>\n')
                }])
            }(), angular.module("mm.foundation", ["mm.foundation.accordion", "mm.foundation.alert", "mm.foundation.bindHtml", "mm.foundation.buttons", "mm.foundation.dropdownMenu", "mm.foundation.dropdownToggle", "mm.foundation.mediaQueries", "mm.foundation.modal", "mm.foundation.offcanvas", "mm.foundation.pagination", "mm.foundation.position", "mm.foundation.progressbar", "mm.foundation.rating", "mm.foundation.tabs", "mm.foundation.tooltip"])
        }),
    function () {
        "use strict";

        function t(t, e, n) {
            return {
                restrict: "A", link: function (i, r, o) {
                    n(function () {
                        function a(t) {
                            var a, s, u, d, f, h;
                            if (!angular.element(r).hasClass("ng-hide") && t && t.target) {
                                for (s = t.target; s; s = s.parentNode) {
                                    if (s === r[0]) return;
                                    if (d = s.id, f = s.className, h = c.length, f && void 0 !== f.baseVal && (f = f.baseVal), f || d) for (a = 0; a < h; a++) if (u = new RegExp("\\b" + c[a] + "\\b"), void 0 !== d && d === c[a] || f && u.test(f)) return
                                }
                                n(function () {
                                    (l = e(o.clickOutside))(i, {event: t})
                                })
                            }
                        }

                        function s() {
                            return "ontouchstart" in window || navigator.maxTouchPoints
                        }

                        var l, c = void 0 !== o.outsideIfNot ? o.outsideIfNot.split(/[ ,]+/) : [];
                        s() && t.on("touchstart", a), t.on("click", a), i.$on("$destroy", function () {
                            s() && t.off("touchstart", a), t.off("click", a)
                        })
                    })
                }
            }
        }

        angular.module("angular-click-outside", []).directive("clickOutside", ["$document", "$parse", "$timeout", t])
    }(),
    function () {
        function t(t, e, n) {
            function i(i, u) {
                var d = u.dirPaginate,
                    f = d.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),
                    h = /\|\s*itemsPerPage\s*:\s*(.*\(\s*\w*\)|([^\)]*?(?=\s+as\s+))|[^\)]*)/;
                if (null === f[2].match(h)) throw"pagination directive: the 'itemsPerPage' filter must be set.";
                var p = f[2].replace(h, ""), m = e(p);
                a(i);
                var g = u.paginationId || c;
                return n.registerInstance(g), function (i, a, u) {
                    var f = e(u.paginationId)(i) || u.paginationId || c;
                    n.registerInstance(f);
                    var h = r(d, f);
                    o(a, u, h), s(a);
                    var p = t(a), g = l(i, u, f);
                    n.setCurrentPageParser(f, g, i), "undefined" != typeof u.totalItems ? (n.setAsyncModeTrue(f), i.$watch(function () {
                        return e(u.totalItems)(i)
                    }, function (t) {
                        0 <= t && n.setCollectionLength(f, t)
                    })) : (n.setAsyncModeFalse(f), i.$watchCollection(function () {
                        return m(i)
                    }, function (t) {
                        if (t) {
                            var e = t instanceof Array ? t.length : Object.keys(t).length;
                            n.setCollectionLength(f, e)
                        }
                    })), p(i)
                }
            }

            function r(t, e) {
                var n, i = !!t.match(/(\|\s*itemsPerPage\s*:[^|]*:[^|]*)/);
                return n = e === c || i ? t : t.replace(/(\|\s*itemsPerPage\s*:\s*[^|\s]*)/, "$1 : '" + e + "'")
            }

            function o(t, e, n) {
                t[0].hasAttribute("dir-paginate-start") || t[0].hasAttribute("data-dir-paginate-start") ? (e.$set("ngRepeatStart", n), t.eq(t.length - 1).attr("ng-repeat-end", !0)) : e.$set("ngRepeat", n)
            }

            function a(t) {
                angular.forEach(t, function (t) {
                    1 === t.nodeType && angular.element(t).attr("dir-paginate-no-compile", !0)
                })
            }

            function s(t) {
                angular.forEach(t, function (t) {
                    1 === t.nodeType && angular.element(t).removeAttr("dir-paginate-no-compile")
                }), t.eq(0).removeAttr("dir-paginate-start").removeAttr("dir-paginate").removeAttr("data-dir-paginate-start").removeAttr("data-dir-paginate"), t.eq(t.length - 1).removeAttr("dir-paginate-end").removeAttr("data-dir-paginate-end")
            }

            function l(t, n, i) {
                var r;
                if (n.currentPage) r = e(n.currentPage); else {
                    var o = (i + "__currentPage").replace(/\W/g, "_");
                    t[o] = 1, r = e(o)
                }
                return r
            }

            return {terminal: !0, multiElement: !0, priority: 100, compile: i}
        }

        function e() {
            return {priority: 5e3, terminal: !0}
        }

        function n(t) {
            t.put("angularUtils.directives.dirPagination.template", '<ul class="pagination" ng-if="1 < pages.length || !autoHide"><li ng-if="boundaryLinks" ng-class="{ disabled : pagination.current == 1 }"><a href="" ng-click="setCurrent(1)">&laquo;</a></li><li ng-if="directionLinks" ng-class="{ disabled : pagination.current == 1 }"><a href="" ng-click="setCurrent(pagination.current - 1)">&lsaquo;</a></li><li ng-repeat="pageNumber in pages track by tracker(pageNumber, $index)" ng-class="{ active : pagination.current == pageNumber, disabled : pageNumber == \'...\' || ( ! autoHide && pages.length === 1 ) }"><a href="" ng-click="setCurrent(pageNumber)">{{ pageNumber }}</a></li><li ng-if="directionLinks" ng-class="{ disabled : pagination.current == pagination.last }"><a href="" ng-click="setCurrent(pagination.current + 1)">&rsaquo;</a></li><li ng-if="boundaryLinks"  ng-class="{ disabled : pagination.current == pagination.last }"><a href="" ng-click="setCurrent(pagination.last)">&raquo;</a></li></ul>')
        }

        function i(t, e) {
            function n(e, n, r) {
                function a(n) {
                    if (t.isRegistered(f) && u(n)) {
                        var r = e.pagination.current;
                        e.pages = i(n, t.getCollectionLength(f), t.getItemsPerPage(f), h), e.pagination.current = n, l(), e.onPageChange && e.onPageChange({
                            newPageNumber: n,
                            oldPageNumber: r
                        })
                    }
                }

                function s() {
                    if (t.isRegistered(f)) {
                        var n = parseInt(t.getCurrentPage(f)) || 1;
                        e.pages = i(n, t.getCollectionLength(f), t.getItemsPerPage(f), h), e.pagination.current = n, e.pagination.last = e.pages[e.pages.length - 1], e.pagination.last < e.pagination.current ? e.setCurrent(e.pagination.last) : l()
                    }
                }

                function l() {
                    if (t.isRegistered(f)) {
                        var n = t.getCurrentPage(f), i = t.getItemsPerPage(f), r = t.getCollectionLength(f);
                        e.range.lower = (n - 1) * i + 1, e.range.upper = Math.min(n * i, r), e.range.total = r
                    }
                }

                function u(t) {
                    return o.test(t) && 0 < t && t <= e.pagination.last
                }

                var d = r.paginationId || c, f = e.paginationId || r.paginationId || c;
                if (!t.isRegistered(f) && !t.isRegistered(d)) {
                    window.console
                }
                e.maxSize || (e.maxSize = 9), e.autoHide = void 0 === e.autoHide || e.autoHide, e.directionLinks = !angular.isDefined(r.directionLinks) || e.$parent.$eval(r.directionLinks), e.boundaryLinks = !!angular.isDefined(r.boundaryLinks) && e.$parent.$eval(r.boundaryLinks);
                var h = Math.max(e.maxSize, 5);
                e.pages = [], e.pagination = {last: 1, current: 1}, e.range = {
                    lower: 1,
                    upper: 1,
                    total: 1
                }, e.$watch("maxSize", function (t) {
                    t && (h = Math.max(e.maxSize, 5), s())
                }), e.$watch(function () {
                    if (t.isRegistered(f)) return (t.getCollectionLength(f) + 1) * t.getItemsPerPage(f)
                }, function (t) {
                    0 < t && s()
                }), e.$watch(function () {
                    if (t.isRegistered(f)) return t.getItemsPerPage(f)
                }, function (t, n) {
                    t != n && "undefined" != typeof n && a(e.pagination.current)
                }), e.$watch(function () {
                    if (t.isRegistered(f)) return t.getCurrentPage(f)
                }, function (t, e) {
                    t != e && a(t)
                }), e.setCurrent = function (e) {
                    t.isRegistered(f) && u(e) && (e = parseInt(e, 10), t.setCurrentPage(f, e))
                }, e.tracker = function (t, e) {
                    return t + "_" + e
                }
            }

            function i(t, e, n, i) {
                var o, a = [], s = Math.ceil(e / n), l = Math.ceil(i / 2);
                o = t <= l ? "start" : s - l < t ? "end" : "middle";
                for (var c = i < s, u = 1; u <= s && u <= i;) {
                    var d = r(u, t, i, s), f = 2 === u && ("middle" === o || "end" === o),
                        h = u === i - 1 && ("middle" === o || "start" === o);
                    c && (f || h) ? a.push("...") : a.push(d), u++
                }
                return a
            }

            function r(t, e, n, i) {
                var r = Math.ceil(n / 2);
                return t === n ? i : 1 === t ? t : n < i ? i - r < e ? i - n + t : r < e ? e - r + t : t : t
            }

            var o = /^\d+$/, a = {
                restrict: "AE",
                scope: {maxSize: "=?", onPageChange: "&?", paginationId: "=?", autoHide: "=?"},
                link: n
            }, s = e.getString();
            return void 0 !== s ? a.template = s : a.templateUrl = function (t, n) {
                return n.templateUrl || e.getPath()
            }, a
        }

        function r(t) {
            return function (e, n, i) {
                if ("undefined" == typeof i && (i = c), !t.isRegistered(i)) throw"pagination directive: the itemsPerPage id argument (id: " + i + ") does not match a registered pagination-id.";
                var r, a;
                if (angular.isObject(e)) {
                    if (n = parseInt(n) || 9999999999, a = t.isAsyncMode(i) ? 0 : (t.getCurrentPage(i) - 1) * n, r = a + n, t.setItemsPerPage(i, n), e instanceof Array) return e.slice(a, r);
                    var s = {};
                    return angular.forEach(o(e).slice(a, r), function (t) {
                        s[t] = e[t]
                    }), s
                }
                return e
            }
        }

        function o(t) {
            if (Object.keys) return Object.keys(t);
            var e = [];
            for (var n in t) t.hasOwnProperty(n) && e.push(n);
            return e
        }

        function a() {
            var t, e = {};
            this.registerInstance = function (n) {
                "undefined" == typeof e[n] && (e[n] = {asyncMode: !1}, t = n)
            }, this.deregisterInstance = function (t) {
                delete e[t]
            }, this.isRegistered = function (t) {
                return "undefined" != typeof e[t]
            }, this.getLastInstanceId = function () {
                return t
            }, this.setCurrentPageParser = function (t, n, i) {
                e[t].currentPageParser = n, e[t].context = i
            }, this.setCurrentPage = function (t, n) {
                e[t].currentPageParser.assign(e[t].context, n)
            }, this.getCurrentPage = function (t) {
                var n = e[t].currentPageParser;
                return n ? n(e[t].context) : 1
            }, this.setItemsPerPage = function (t, n) {
                e[t].itemsPerPage = n
            }, this.getItemsPerPage = function (t) {
                return e[t].itemsPerPage
            }, this.setCollectionLength = function (t, n) {
                e[t].collectionLength = n
            }, this.getCollectionLength = function (t) {
                return e[t].collectionLength
            }, this.setAsyncModeTrue = function (t) {
                e[t].asyncMode = !0
            }, this.setAsyncModeFalse = function (t) {
                e[t].asyncMode = !1
            }, this.isAsyncMode = function (t) {
                return e[t].asyncMode
            }
        }

        function s() {
            var t, e = "angularUtils.directives.dirPagination.template";
            this.setPath = function (t) {
                e = t
            }, this.setString = function (e) {
                t = e
            }, this.$get = function () {
                return {
                    getPath: function () {
                        return e
                    }, getString: function () {
                        return t
                    }
                }
            }
        }

        var l = "angularUtils.directives.dirPagination", c = "__default";
        angular.module(l, []).directive("dirPaginate", ["$compile", "$parse", "paginationService", t]).directive("dirPaginateNoCompile", e).directive("dirPaginationControls", ["paginationService", "paginationTemplate", i]).filter("itemsPerPage", ["paginationService", r]).service("paginationService", a).provider("paginationTemplate", s).run(["$templateCache", n])
    }(),
    function (t, e, n) {
        "use strict";

        function i(t) {
            return {
                require: "?ngModel", restrict: "A", link: function (n, i, r, o) {
                    function a() {
                        var t = s(n);
                        return e.isObject(t) && t.hasOwnProperty("$viewValue") && (t = t.$viewValue), t
                    }

                    if (o && r.match) {
                        var s = t(r.match), l = t(r.matchCaseless), c = t(r.notMatch), u = t(r.matchIgnoreEmpty);
                        n.$watch(a, function () {
                            o.$$parseAndValidate()
                        }), o.$validators.match = function (t, i) {
                            var r, o = t || i, s = a(), d = c(n);
                            return !(!u(n) || i) || (r = l(n) ? e.lowercase(o) === e.lowercase(s) : o === s, r ^= d, !!r)
                        }
                    }
                }
            }
        }

        i.$inject = ["$parse"], e.module("validation.match", []), e.module("validation.match").directive("match", i)
    }(window, window.angular),
    !function (t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Sweetalert2 = e()
    }(this, function () {
        "use strict";
        var t = "swal2-", e = function (e) {
                var n = {};
                for (var i in e) n[e[i]] = t + e[i];
                return n
            },
            n = e(["container", "in", "iosfix", "modal", "overlay", "fade", "show", "hide", "noanimation", "close", "title", "content", "spacer", "confirm", "cancel", "icon", "image", "input", "file", "range", "select", "radio", "checkbox", "textarea", "inputerror", "validationerror", "progresssteps", "activeprogressstep", "progresscircle", "progressline", "loading", "styled"]),
            i = e(["success", "warning", "info", "question", "error"]), r = {
                title: "",
                titleText: "",
                text: "",
                html: "",
                type: null,
                customClass: "",
                animation: !0,
                allowOutsideClick: !0,
                allowEscapeKey: !0,
                showConfirmButton: !0,
                showCancelButton: !1,
                preConfirm: null,
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6",
                confirmButtonClass: null,
                cancelButtonText: "Cancel",
                cancelButtonColor: "#aaa",
                cancelButtonClass: null,
                buttonsStyling: !0,
                reverseButtons: !1,
                focusCancel: !1,
                showCloseButton: !1,
                showLoaderOnConfirm: !1,
                imageUrl: null,
                imageWidth: null,
                imageHeight: null,
                imageClass: null,
                timer: null,
                width: 500,
                padding: 20,
                background: "#fff",
                input: null,
                inputPlaceholder: "",
                inputValue: "",
                inputOptions: {},
                inputAutoTrim: !0,
                inputClass: null,
                inputAttributes: {},
                inputValidator: null,
                progressSteps: [],
                currentProgressStep: null,
                progressStepsDistance: "40px",
                onOpen: null,
                onClose: null
            },
            o = ('\n  <div class="' + n.modal + '" tabIndex="-1">\n    <ul class="' + n.progresssteps + '"></ul>\n    <div class="' + n.icon + " " + i.error + '">\n      <span class="x-mark"><span class="line left"></span><span class="line right"></span></span>\n    </div>\n    <div class="' + n.icon + " " + i.question + '">?</div>\n    <div class="' + n.icon + " " + i.warning + '">!</div>\n    <div class="' + n.icon + " " + i.info + '">i</div>\n    <div class="' + n.icon + " " + i.success + '">\n      <span class="line tip"></span> <span class="line long"></span>\n      <div class="placeholder"></div> <div class="fix"></div>\n    </div>\n    <img class="' + n.image + '">\n    <h2 class="' + n.title + '"></h2>\n    <div class="' + n.content + '"></div>\n    <input class="' + n.input + '">\n    <input type="file" class="' + n.file + '">\n    <div class="' + n.range + '">\n      <output></output>\n      <input type="range">\n    </div>\n    <select class="' + n.select + '"></select>\n    <div class="' + n.radio + '"></div>\n    <label for="' + n.checkbox + '" class="' + n.checkbox + '">\n      <input type="checkbox">\n    </label>\n    <textarea class="' + n.textarea + '"></textarea>\n    <div class="' + n.validationerror + '"></div>\n    <hr class="' + n.spacer + '">\n    <button type="button" class="' + n.confirm + '">OK</button>\n    <button type="button" class="' + n.cancel + '">Cancel</button>\n    <span class="' + n.close + '">&times;</span>\n  </div>\n').replace(/(^|\n)\s*/g, ""),
            a = void 0, s = document.getElementsByClassName(n.container);
        s.length ? a = s[0] : (a = document.createElement("div"), a.className = n.container, a.innerHTML = o);
        var l = function (t, e) {
            t = String(t).replace(/[^0-9a-f]/gi, ""), t.length < 6 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), e = e || 0;
            for (var n = "#", i = 0; i < 3; i++) {
                var r = parseInt(t.substr(2 * i, 2), 16);
                r = Math.round(Math.min(Math.max(0, r + r * e), 255)).toString(16), n += ("00" + r).substr(r.length)
            }
            return n
        }, c = {previousWindowKeyDown: null, previousActiveElement: null, previousBodyPadding: null}, u = function () {
            if ("undefined" != typeof document && !document.getElementsByClassName(n.container).length) {
                document.body.appendChild(a);
                var t = f(), e = T(t, n.input), i = T(t, n.file), r = t.querySelector("." + n.range + " input"),
                    o = t.querySelector("." + n.range + " output"), s = T(t, n.select),
                    l = t.querySelector("." + n.checkbox + " input"), c = T(t, n.textarea);
                return e.oninput = function () {
                    X.resetValidationError()
                }, e.onkeydown = function (t) {
                    setTimeout(function () {
                        13 === t.keyCode && (t.stopPropagation(), X.clickConfirm())
                    }, 0)
                }, i.onchange = function () {
                    X.resetValidationError()
                }, r.oninput = function () {
                    X.resetValidationError(), o.value = r.value
                }, r.onchange = function () {
                    X.resetValidationError(), r.previousSibling.value = r.value
                }, s.onchange = function () {
                    X.resetValidationError()
                }, l.onchange = function () {
                    X.resetValidationError()
                }, c.oninput = function () {
                    X.resetValidationError()
                }, t
            }
        }, d = function (t) {
            return a.querySelector("." + t)
        }, f = function () {
            return document.body.querySelector("." + n.modal) || u()
        }, h = function () {
            var t = f();
            return t.querySelectorAll("." + n.icon)
        }, p = function () {
            return d(n.title)
        }, m = function () {
            return d(n.content)
        }, g = function () {
            return d(n.image)
        }, v = function () {
            return d(n.spacer)
        }, y = function () {
            return d(n.progresssteps)
        }, $ = function () {
            return d(n.validationerror)
        }, w = function () {
            return d(n.confirm)
        }, b = function () {
            return d(n.cancel)
        }, x = function () {
            return d(n.close)
        }, C = function (e) {
            var n = [w(), b()];
            return e && n.reverse(), n.concat(Array.prototype.slice.call(f().querySelectorAll("button:not([class^=" + t + "]), input:not([type=hidden]), textarea, select")))
        }, k = function (t, e) {
            return !!t.classList && t.classList.contains(e)
        }, S = function (t) {
            if (t.focus(), "file" !== t.type) {
                var e = t.value;
                t.value = "", t.value = e
            }
        }, _ = function (t, e) {
            if (t && e) {
                var n = e.split(/\s+/).filter(Boolean);
                n.forEach(function (e) {
                    t.classList.add(e)
                })
            }
        }, E = function (t, e) {
            if (t && e) {
                var n = e.split(/\s+/).filter(Boolean);
                n.forEach(function (e) {
                    t.classList.remove(e)
                })
            }
        }, T = function (t, e) {
            for (var n = 0; n < t.childNodes.length; n++) if (k(t.childNodes[n], e)) return t.childNodes[n]
        }, A = function (t, e) {
            e || (e = "block"), t.style.opacity = "", t.style.display = e
        }, O = function (t) {
            t.style.opacity = "", t.style.display = "none"
        }, D = function (t) {
            for (; t.firstChild;) t.removeChild(t.firstChild)
        }, P = function (t) {
            return t.offsetWidth || t.offsetHeight || t.getClientRects().length
        }, M = function (t, e) {
            t.style.removeProperty ? t.style.removeProperty(e) : t.style.removeAttribute(e)
        }, L = function (t) {
            if (!P(t)) return !1;
            if ("function" == typeof MouseEvent) {
                var e = new MouseEvent("click", {view: window, bubbles: !1, cancelable: !0});
                t.dispatchEvent(e)
            } else if (document.createEvent) {
                var n = document.createEvent("MouseEvents");
                n.initEvent("click", !1, !1), t.dispatchEvent(n)
            } else document.createEventObject ? t.fireEvent("onclick") : "function" == typeof t.onclick && t.onclick()
        }, j = function () {
            var t = document.createElement("div"), e = {
                WebkitAnimation: "webkitAnimationEnd",
                OAnimation: "oAnimationEnd oanimationend",
                msAnimation: "MSAnimationEnd",
                animation: "animationend"
            };
            for (var n in e) if (e.hasOwnProperty(n) && void 0 !== t.style[n]) return e[n];
            return !1
        }(), N = function () {
            var t = f();
            window.onkeydown = c.previousWindowKeyDown, c.previousActiveElement && c.previousActiveElement.focus && c.previousActiveElement.focus(), clearTimeout(t.timeout)
        }, F = function () {
            var t = document.createElement("div");
            t.style.width = "50px", t.style.height = "50px", t.style.overflow = "scroll", document.body.appendChild(t);
            var e = t.offsetWidth - t.clientWidth;
            return document.body.removeChild(t), e
        }, I = function (t, e) {
            var n = void 0;
            return function () {
                var i = function () {
                    n = null, t()
                };
                clearTimeout(n), n = setTimeout(i, e)
            }
        }, R = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }, z = Object.assign || function (t) {
            for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];
                for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
            }
            return t
        }, q = z({}, r), H = [], B = void 0, V = function (t) {
            var e = f();
            for (var o in t) r.hasOwnProperty(o) || "extraParams" === o || void 0;
            e.style.width = "number" == typeof t.width ? t.width + "px" : t.width, e.style.padding = t.padding + "px", e.style.background = t.background;
            var a = p(), s = m(), l = w(), c = b(), u = x();
            if (t.titleText ? a.innerText = t.titleText : a.innerHTML = t.title.split("\n").join("<br>"), t.text || t.html) {
                if ("object" === R(t.html)) if (s.innerHTML = "", 0 in t.html) for (var d = 0; d in t.html; d++) s.appendChild(t.html[d].cloneNode(!0)); else s.appendChild(t.html.cloneNode(!0)); else t.html ? s.innerHTML = t.html : t.text && (s.textContent = t.text);
                A(s)
            } else O(s);
            t.showCloseButton ? A(u) : O(u), e.className = n.modal, t.customClass && _(e, t.customClass);
            var $ = y(), C = parseInt(null === t.currentProgressStep ? X.getQueueStep() : t.currentProgressStep, 10);
            t.progressSteps.length ? (A($), D($), C >= t.progressSteps.length && void 0, t.progressSteps.forEach(function (e, i) {
                var r = document.createElement("li");
                if (_(r, n.progresscircle), r.innerHTML = e, i === C && _(r, n.activeprogressstep), $.appendChild(r), i !== t.progressSteps.length - 1) {
                    var o = document.createElement("li");
                    _(o, n.progressline), o.style.width = t.progressStepsDistance, $.appendChild(o)
                }
            })) : O($);
            for (var k = h(), S = 0; S < k.length; S++) O(k[S]);
            if (t.type) {
                var T = !1;
                for (var P in i) if (t.type === P) {
                    T = !0;
                    break
                }
                if (!T) return !1;
                var L = e.querySelector("." + n.icon + "." + i[t.type]);
                switch (A(L), t.type) {
                    case"success":
                        _(L, "animate"), _(L.querySelector(".tip"), "animate-success-tip"), _(L.querySelector(".long"), "animate-success-long");
                        break;
                    case"error":
                        _(L, "animate-error-icon"), _(L.querySelector(".x-mark"), "animate-x-mark");
                        break;
                    case"warning":
                        _(L, "pulse-warning")
                }
            }
            var j = g();
            t.imageUrl ? (j.setAttribute("src", t.imageUrl), A(j), t.imageWidth ? j.setAttribute("width", t.imageWidth) : j.removeAttribute("width"), t.imageHeight ? j.setAttribute("height", t.imageHeight) : j.removeAttribute("height"), j.className = n.image, t.imageClass && _(j, t.imageClass)) : O(j), t.showCancelButton ? c.style.display = "inline-block" : O(c), t.showConfirmButton ? M(l, "display") : O(l);
            var N = v();
            t.showConfirmButton || t.showCancelButton ? A(N) : O(N), l.innerHTML = t.confirmButtonText, c.innerHTML = t.cancelButtonText, t.buttonsStyling && (l.style.backgroundColor = t.confirmButtonColor, c.style.backgroundColor = t.cancelButtonColor), l.className = n.confirm, _(l, t.confirmButtonClass), c.className = n.cancel, _(c, t.cancelButtonClass), t.buttonsStyling ? (_(l, n.styled), _(c, n.styled)) : (E(l, n.styled), E(c, n.styled), l.style.backgroundColor = l.style.borderLeftColor = l.style.borderRightColor = "", c.style.backgroundColor = c.style.borderLeftColor = c.style.borderRightColor = ""), t.animation === !0 ? E(e, n.noanimation) : _(e, n.noanimation)
        }, W = function (t, e) {
            var i = f();
            t ? (_(i, n.show), _(a, n.fade), E(i, n.hide)) : E(i, n.fade), A(i), a.style.overflowY = "hidden", j && !k(i, n.noanimation) ? i.addEventListener(j, function r() {
                i.removeEventListener(j, r), a.style.overflowY = "auto"
            }) : a.style.overflowY = "auto", _(a, n["in"]), _(document.body, n["in"]), U(), Y(), c.previousActiveElement = document.activeElement, null !== e && "function" == typeof e && e(i)
        }, U = function () {
            null === c.previousBodyPadding && document.body.scrollHeight > window.innerHeight && (c.previousBodyPadding = document.body.style.paddingRight, document.body.style.paddingRight = F() + "px")
        }, G = function () {
            null !== c.previousBodyPadding && (document.body.style.paddingRight = c.previousBodyPadding, c.previousBodyPadding = null)
        }, Y = function () {
            var t = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            if (t && !k(document.body, n.iosfix)) {
                var e = document.body.scrollTop;
                document.body.style.top = e * -1 + "px", _(document.body, n.iosfix)
            }
        }, Q = function () {
            if (k(document.body, n.iosfix)) {
                var t = parseInt(document.body.style.top, 10);
                E(document.body, n.iosfix), document.body.style.top = "", document.body.scrollTop = t * -1
            }
        }, K = function () {
            for (var t = arguments.length, e = Array(t), i = 0; i < t; i++) e[i] = arguments[i];
            if (void 0 === e[0]) return !1;
            var r = z({}, q);
            switch (R(e[0])) {
                case"string":
                    r.title = e[0], r.html = e[1], r.type = e[2];
                    break;
                case"object":
                    z(r, e[0]), r.extraParams = e[0].extraParams, "email" === r.input && null === r.inputValidator && (r.inputValidator = function (t) {
                        return new Promise(function (e, n) {
                            var i = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                            i.test(t) ? e() : n("Invalid email address")
                        })
                    });
                    break;
                default:
                    return !1
            }
            V(r);
            var o = f();
            return new Promise(function (t, e) {
                r.timer && (o.timeout = setTimeout(function () {
                    X.closeModal(r.onClose), e("timer")
                }, r.timer));
                var i = function (t) {
                    switch (t = t || r.input) {
                        case"select":
                        case"textarea":
                        case"file":
                            return T(o, n[t]);
                        case"checkbox":
                            return o.querySelector("." + n.checkbox + " input");
                        case"radio":
                            return o.querySelector("." + n.radio + " input:checked") || o.querySelector("." + n.radio + " input:first-child");
                        case"range":
                            return o.querySelector("." + n.range + " input");
                        default:
                            return T(o, n.input)
                    }
                }, s = function () {
                    var t = i();
                    if (!t) return null;
                    switch (r.input) {
                        case"checkbox":
                            return t.checked ? 1 : 0;
                        case"radio":
                            return t.checked ? t.value : null;
                        case"file":
                            return t.files.length ? t.files[0] : null;
                        default:
                            return r.inputAutoTrim ? t.value.trim() : t.value
                    }
                };
                r.input && setTimeout(function () {
                    var t = i();
                    t && S(t)
                }, 0);
                for (var u = function (e) {
                    r.showLoaderOnConfirm && X.showLoading(), r.preConfirm ? r.preConfirm(e, r.extraParams).then(function (n) {
                        X.closeModal(r.onClose), t(n || e)
                    }, function (t) {
                        X.hideLoading(), t && X.showValidationError(t)
                    }) : (X.closeModal(r.onClose), t(e))
                }, d = function (t) {
                    var n = t || window.event, i = n.target || n.srcElement, o = w(), a = b(),
                        c = o === i || o.contains(i),
                        d = a === i || a.contains(i);
                    switch (n.type) {
                        case"mouseover":
                        case"mouseup":
                            r.buttonsStyling && (c ? o.style.backgroundColor = l(r.confirmButtonColor, -.1) : d && (a.style.backgroundColor = l(r.cancelButtonColor, -.1)));
                            break;
                        case"mouseout":
                            r.buttonsStyling && (c ? o.style.backgroundColor = r.confirmButtonColor : d && (a.style.backgroundColor = r.cancelButtonColor));
                            break;
                        case"mousedown":
                            r.buttonsStyling && (c ? o.style.backgroundColor = l(r.confirmButtonColor, -.2) : d && (a.style.backgroundColor = l(r.cancelButtonColor, -.2)));
                            break;
                        case"click":
                            c && X.isVisible() ? r.input ? !function () {
                                var t = s();
                                r.inputValidator ? (X.disableInput(), r.inputValidator(t, r.extraParams).then(function () {
                                    X.enableInput(), u(t)
                                }, function (t) {
                                    X.enableInput(), t && X.showValidationError(t)
                                })) : u(t)
                            }() : u(!0) : d && X.isVisible() && (X.closeModal(r.onClose), e("cancel"))
                    }
                }, h = o.querySelectorAll("button"), p = 0; p < h.length; p++) h[p].onclick = d, h[p].onmouseover = d, h[p].onmouseout = d, h[p].onmousedown = d;
                x().onclick = function () {
                    X.closeModal(r.onClose), e("close")
                }, a.onclick = function (t) {
                    t.target === a && r.allowOutsideClick && (X.closeModal(r.onClose), e("overlay"))
                };
                var m = w(), g = b();
                r.reverseButtons ? m.parentNode.insertBefore(g, m) : m.parentNode.insertBefore(m, g);
                var k = function (t, e) {
                    for (var n = C(r.focusCancel), i = 0; i < n.length; i++) {
                        t += e, t === n.length ? t = 0 : t === -1 && (t = n.length - 1);
                        var o = n[t];
                        if (P(o)) return o.focus()
                    }
                }, D = function (t) {
                    var n = t || window.event, i = n.keyCode || n.which;
                    if ([9, 13, 32, 27].indexOf(i) !== -1) {
                        for (var o = n.target || n.srcElement, a = C(r.focusCancel), s = -1, l = 0; l < a.length; l++) if (o === a[l]) {
                            s = l;
                            break
                        }
                        9 === i ? (n.shiftKey ? k(s, -1) : k(s, 1), n.stopPropagation(), n.preventDefault()) : 13 === i || 32 === i ? s === -1 && (r.focusCancel ? L(g, n) : L(m, n)) : 27 === i && r.allowEscapeKey === !0 && (X.closeModal(r.onClose), e("esc"))
                    }
                };
                c.previousWindowKeyDown = window.onkeydown, window.onkeydown = D, r.buttonsStyling && (m.style.borderLeftColor = r.confirmButtonColor, m.style.borderRightColor = r.confirmButtonColor), X.showLoading = X.enableLoading = function () {
                    A(v()), A(m, "inline-block"), _(m, n.loading), _(o, n.loading), m.disabled = !0, g.disabled = !0
                }, X.hideLoading = X.disableLoading = function () {
                    r.showConfirmButton || (O(m), r.showCancelButton || O(v())), E(m, n.loading), E(o, n.loading), m.disabled = !1, g.disabled = !1
                }, X.enableButtons = function () {
                    m.disabled = !1, g.disabled = !1
                }, X.disableButtons = function () {
                    m.disabled = !0, g.disabled = !0
                }, X.enableConfirmButton = function () {
                    m.disabled = !1
                }, X.disableConfirmButton = function () {
                    m.disabled = !0
                }, X.enableInput = function () {
                    var t = i();
                    if (!t) return !1;
                    if ("radio" === t.type) for (var e = t.parentNode.parentNode, n = e.querySelectorAll("input"), r = 0; r < n.length; r++) n[r].disabled = !1; else t.disabled = !1
                }, X.disableInput = function () {
                    var t = i();
                    if (!t) return !1;
                    if (t && "radio" === t.type) for (var e = t.parentNode.parentNode, n = e.querySelectorAll("input"), r = 0; r < n.length; r++) n[r].disabled = !0; else t.disabled = !0
                }, X.recalculateHeight = I(function () {
                    var t = f(), e = t.style.display;
                    t.style.minHeight = "", A(t), t.style.minHeight = t.scrollHeight + 1 + "px", t.style.display = e
                }, 50), X.showValidationError = function (t) {
                    var e = $();
                    e.innerHTML = t, A(e);
                    var r = i();
                    S(r), _(r, n.inputerror)
                }, X.resetValidationError = function () {
                    var t = $();
                    O(t), X.recalculateHeight();
                    var e = i();
                    e && E(e, n.inputerror)
                }, X.getProgressSteps = function () {
                    return r.progressSteps
                }, X.setProgressSteps = function (t) {
                    r.progressSteps = t, V(r)
                }, X.showProgressSteps = function () {
                    A(y())
                }, X.hideProgressSteps = function () {
                    O(y())
                }, X.enableButtons(), X.hideLoading(), X.resetValidationError();
                for (var M = ["input", "file", "range", "select", "radio", "checkbox", "textarea"], j = void 0, N = 0; N < M.length; N++) {
                    var F = n[M[N]], z = T(o, F);
                    if (j = i(M[N])) {
                        for (var q in j.attributes) if (j.attributes.hasOwnProperty(q)) {
                            var H = j.attributes[q].name;
                            "type" !== H && "value" !== H && j.removeAttribute(H)
                        }
                        for (var U in r.inputAttributes) j.setAttribute(U, r.inputAttributes[U])
                    }
                    z.className = F, r.inputClass && _(z, r.inputClass), O(z)
                }
                var G = void 0;
                !function () {
                    switch (r.input) {
                        case"text":
                        case"email":
                        case"password":
                        case"number":
                        case"tel":
                            j = T(o, n.input), j.value = r.inputValue, j.placeholder = r.inputPlaceholder, j.type = r.input, A(j);
                            break;
                        case"file":
                            j = T(o, n.file), j.placeholder = r.inputPlaceholder, j.type = r.input, A(j);
                            break;
                        case"range":
                            var t = T(o, n.range), e = t.querySelector("input"), a = t.querySelector("output");
                            e.value = r.inputValue, e.type = r.input, a.value = r.inputValue, A(t);
                            break;
                        case"select":
                            var s = T(o, n.select);
                            if (s.innerHTML = "", r.inputPlaceholder) {
                                var l = document.createElement("option");
                                l.innerHTML = r.inputPlaceholder, l.value = "", l.disabled = !0, l.selected = !0, s.appendChild(l)
                            }
                            G = function (t) {
                                for (var e in t) {
                                    var n = document.createElement("option");
                                    n.value = e, n.innerHTML = t[e], r.inputValue === e && (n.selected = !0), s.appendChild(n)
                                }
                                A(s), s.focus()
                            };
                            break;
                        case"radio":
                            var c = T(o, n.radio);
                            c.innerHTML = "", G = function (t) {
                                for (var e in t) {
                                    var i = 1, o = document.createElement("input"), a = document.createElement("label"),
                                        s = document.createElement("span");
                                    o.type = "radio", o.name = n.radio, o.value = e, o.id = n.radio + "-" + i++, r.inputValue === e && (o.checked = !0), s.innerHTML = t[e], a.appendChild(o), a.appendChild(s), a["for"] = o.id, c.appendChild(a)
                                }
                                A(c);
                                var l = c.querySelectorAll("input");
                                l.length && l[0].focus()
                            };
                            break;
                        case"checkbox":
                            var u = T(o, n.checkbox), d = i("checkbox");
                            d.type = "checkbox", d.value = 1, d.id = n.checkbox, d.checked = Boolean(r.inputValue);
                            var f = u.getElementsByTagName("span");
                            f.length && u.removeChild(f[0]), f = document.createElement("span"), f.innerHTML = r.inputPlaceholder, u.appendChild(f), A(u);
                            break;
                        case"textarea":
                            var h = T(o, n.textarea);
                            h.value = r.inputValue, h.placeholder = r.inputPlaceholder, A(h);
                            break;
                        case null:
                    }
                }(), "select" !== r.input && "radio" !== r.input || (r.inputOptions instanceof Promise ? (X.showLoading(), r.inputOptions.then(function (t) {
                    X.hideLoading(), G(t)
                })) : "object" === R(r.inputOptions) ? G(r.inputOptions) : void 0), W(r.animation, r.onOpen), k(-1, 1), a.scrollTop = 0, "undefined" == typeof MutationObserver || B || (B = new MutationObserver(X.recalculateHeight), B.observe(o, {
                    childList: !0,
                    characterData: !0,
                    subtree: !0
                }))
            })
        }, X = function Z() {
            for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
            return Z.isVisible() && Z.close(), K.apply(void 0, e)
        };
        return X.isVisible = function () {
            var t = f();
            return P(t)
        }, X.queue = function (t) {
            H = t;
            var e = f(), n = function () {
                H = [], e.removeAttribute("data-queue-step")
            }, i = [];
            return new Promise(function (t, r) {
                !function o(a, s) {
                    a < H.length ? (e.setAttribute("data-queue-step", a), X(H[a]).then(function (t) {
                        i.push(t), o(a + 1, s)
                    }, function (t) {
                        n(), r(t)
                    })) : (n(), t(i))
                }(0)
            })
        }, X.getQueueStep = function () {
            return f().getAttribute("data-queue-step")
        }, X.insertQueueStep = function (t, e) {
            return e && e < H.length ? H.splice(e, 0, t) : H.push(t)
        }, X.deleteQueueStep = function (t) {
            "undefined" != typeof H[t] && H.splice(t, 1)
        }, X.close = X.closeModal = function (t) {
            var e = f();
            E(e, n.show), _(e, n.hide);
            var r = e.querySelector("." + n.icon + "." + i.success);
            E(r, "animate"), E(r.querySelector(".tip"), "animate-success-tip"), E(r.querySelector(".long"), "animate-success-long");
            var o = e.querySelector("." + n.icon + "." + i.error);
            E(o, "animate-error-icon"), E(o.querySelector(".x-mark"), "animate-x-mark");
            var s = e.querySelector("." + n.icon + "." + i.warning);
            E(s, "pulse-warning"), N();
            var l = function () {
                O(e), e.style.minHeight = "", E(a, n["in"]), E(document.body, n["in"]), G(), Q()
            };
            j && !k(e, n.noanimation) ? e.addEventListener(j, function c() {
                e.removeEventListener(j, c), k(e, n.hide) && l()
            }) : l(), null !== t && "function" == typeof t && t(e)
        }, X.clickConfirm = function () {
            return w().click()
        }, X.clickCancel = function () {
            return b().click()
        }, X.setDefaults = function (t) {
            if (t && "object" === ("undefined" == typeof t ? "undefined" : R(t))) {
                for (var e in t) r.hasOwnProperty(e) || "extraParams" === e || delete t[e];
                z(q, t)
            }
        }, X.resetDefaults = function () {
            q = z({}, r)
        }, X.noop = function () {
        }, X.version = "6.3.0", X["default"] = X, X
    }),
window.Sweetalert2 && (window.sweetAlert = window.swal = window.Sweetalert2),
    !function (t, e) {
        if ("function" == typeof define && define.amd) define(["module", "exports", "angular"], e); else if ("undefined" != typeof exports) e(module, exports, require("angular")); else {
            var n = {exports: {}};
            e(n, n.exports, t.angular), t.infiniteScroll = n.exports
        }
    }(this,
        function (t, e, n) {
            "use strict";

            function i(t) {
                return t && t.__esModule ? t : {"default": t}
            }

            Object.defineProperty(e, "__esModule", {value: !0});
            var r = i(n), o = "infinite-scroll";
            r["default"]
                .module("infinite-scroll", [])
                .value("THROTTLE_MILLISECONDS", null)
                .directive("infiniteScroll", ["$rootScope", "$window", "$interval", "THROTTLE_MILLISECONDS", function ($rootScope, $window, $interval, THROTTLE_MILLISECONDS) {
                    return {
                        scope: {
                            infiniteScroll: "&",
                            infiniteScrollContainer: "=",
                            infiniteScrollDistance: "=",
                            infiniteScrollDisabled: "=",
                            infiniteScrollUseDocumentBottom: "=",
                            infiniteScrollListenForEvent: "@"
                        }, link: function (scope, elem, attrs) {

                            function l(t) {
                                var e = t[0] || t;
                                return isNaN(e.offsetHeight) ? e.document.documentElement.clientHeight : e.offsetHeight
                            }

                            function c(t) {
                                var e = t[0] || t;
                                return isNaN(window.pageYOffset) ? e.document.documentElement.scrollTop : e.ownerDocument.defaultView.pageYOffset
                            }

                            function u(t) {
                                if (t[0].getBoundingClientRect && !t.css("none")) return t[0].getBoundingClientRect().top + c(t)
                            }

                            function d() {
                                var e = null;
                                var i = null;
                                if (k === w){
                                    e = l(k) + c(k[0].document.documentElement), i = u(elem) + l(elem);
                                }else {
                                    e = l(k);
                                    var r = 0;
                                    void 0 !== u(k) && (r = u(k)), i = u(elem) - r + l(elem)
                                }
                                if(_) {
                                    (i = l((elem[0].ownerDocument || elem[0].document).documentElement));
                                }
                                var s = i - e;
                                var d = s <= l(k) * b + 1;

                                if(d){
                                    C = true;
                                    if(x) {
                                        if( (scope.$$phase || $rootScope.$$phase))
                                            scope.infiniteScroll();
                                        else
                                            scope.$apply(scope.infiniteScroll)
                                    }
                                }else{
                                    if(T)
                                        $interval.cancel(T);
                                    C = false;

                                }
                            }

                            function f(t, e) {
                                function i() {
                                    return a = (new Date).getTime(), $interval.cancel(o), o = null, t.call()
                                }

                                function r() {
                                    var r = (new Date).getTime(), s = e - (r - a);
                                    s <= 0 ? ($interval.cancel(o), o = null, a = r, t.call()) : o || (o = $interval(i, s, 1))
                                }

                                var o = null, a = 0;
                                return r
                            }

                            function h() {
                                k.unbind("scroll", A), null != E && (E(), E = null), T && $interval.cancel(T)
                            }

                            function setScrollDistance(t) {
                                b = parseFloat(t) || 0
                            }

                            function disableInfScroll(t) {
                                x = !t, x && C && (C = !1, A())
                            }

                            function useDocumentBottom(t) {
                                _ = t
                            }

                            function bindScroll(t) {
                                if(k != null)
                                    k.unbind("scroll", A);
                                k = t;
                                if(t != null)
                                    k.bind("scroll", A)
                            }

                            function y(t) {
                                if (null != t && 0 !== t.length) {
                                    var e = void 0;
                                    if (e = t.nodeType && 1 === t.nodeType ? r["default"].element(t) : "function" == typeof t.append ? r["default"].element(t[t.length - 1]) : "string" == typeof t ? r["default"].element(document.querySelector(t)) : t, null == e) throw new Error("invalid infinite-scroll-container attribute.");
                                    bindScroll(e)
                                }
                            }

                            function interval_callback() {
                                return S && A(), $interval.cancel(T)
                            }

                            var w = r["default"].element($window);
                            var b = null;
                            var x = null;
                            var C = null;
                            var k = null;
                            var S = true;
                            var _ = false;
                            var E = null;
                            var T = false;
                            var A;
                            if (THROTTLE_MILLISECONDS != null) {
                                A = f(d, THROTTLE_MILLISECONDS);
                            } else {
                                A = d;
                            }

                            scope.$on("$destroy", h);
                            scope.$watch("infiniteScrollDistance", setScrollDistance);
                            setScrollDistance(scope.infiniteScrollDistance);

                            scope.$watch("infiniteScrollDisabled", disableInfScroll);
                            disableInfScroll(scope.infiniteScrollDisabled);

                            scope.$watch("infiniteScrollUseDocumentBottom", useDocumentBottom);
                            useDocumentBottom(scope.infiniteScrollUseDocumentBottom);

                            bindScroll(w);

                            if(scope.infiniteScrollListenForEvent)
                                (E = $rootScope.$on(scope.infiniteScrollListenForEvent, A));
                            scope.$watch("infiniteScrollContainer", y);
                            y(scope.infiniteScrollContainer || []);

                            if(null != attrs.infiniteScrollParent){
                                bindScroll(r["default"].element(elem.parent()));
                            }

                            if(null != attrs.infiniteScrollImmediateCheck){
                                (S = scope.$eval(attrs.infiniteScrollImmediateCheck));
                            }

                            return  T = $interval(interval_callback)
                        }
                    }
                }]), e["default"] = o, t.exports = e["default"]
        }),
    function () {
        "use strict";

        function t(t) {
            return {
                restrict: "A", require: "?^^inViewContainer", link: function (e, a, s, l) {
                    var d = {};
                    s.inViewOptions && (d = e.$eval(s.inViewOptions)), d.offset && (d.offset = r(d.offset)), d.viewportOffset && (d.viewportOffset = r(d.viewportOffset));
                    var f = u({type: "initial"}).merge(c(window, "checkInView click ready wheel mousewheel DomMouseScroll MozMousePixelScroll resize scroll touchmove mouseup keydown"));
                    l && (f = f.merge(l.eventsSignal)), d.throttle && (f = f.throttle(d.throttle));
                    var h = f.map(function (t) {
                        var e;
                        e = l ? l.getViewportRect() : n(), e = o(e, d.viewportOffset);
                        var r = o(a[0].getBoundingClientRect(), d.offset),
                            s = !!(a[0].offsetWidth || a[0].offsetHeight || a[0].getClientRects().length),
                            c = {inView: s && i(r, e), event: t, element: a, elementRect: r, viewportRect: e};
                        return d.generateParts && c.inView && (c.parts = {}, c.parts.top = r.top >= e.top, c.parts.left = r.left >= e.left, c.parts.bottom = r.bottom <= e.bottom, c.parts.right = r.right <= e.right), c
                    }).scan({}, function (t, e) {
                        return d.generateDirection && e.inView && t.elementRect && (e.direction = {
                            horizontal: e.elementRect.left - t.elementRect.left,
                            vertical: e.elementRect.top - t.elementRect.top
                        }), e.changed = e.inView !== t.inView || !angular.equals(e.parts, t.parts) || !angular.equals(e.direction, t.direction), e
                    }).filter(function (t) {
                        return !!t.changed && !("initial" === t.event.type && !t.inView)
                    }), p = t(s.inView), m = h.subscribe(function (t) {
                        e.$applyAsync(function () {
                            p(e, {$inview: t.inView, $inviewInfo: t})
                        })
                    });
                    e.$on("$destroy", m)
                }
            }
        }

        function e() {
            return {
                restrict: "A", controller: ["$element", function (t) {
                    this.element = t, this.eventsSignal = c(t, "scroll"), this.getViewportRect = function () {
                        return t[0].getBoundingClientRect()
                    }
                }]
            }
        }

        function n() {
            var t = {
                top: 0,
                left: 0,
                width: window.innerWidth,
                right: window.innerWidth,
                height: window.innerHeight,
                bottom: window.innerHeight
            };
            if (t.height) return t;
            var e = document.compatMode;
            return "CSS1Compat" === e ? (t.width = t.right = document.documentElement.clientWidth, t.height = t.bottom = document.documentElement.clientHeight) : (t.width = t.right = document.body.clientWidth, t.height = t.bottom = document.body.clientHeight), t
        }

        function i(t, e) {
            return !(e.left > t.right || e.right < t.left || e.top > t.bottom || e.bottom < t.top)
        }

        function r(t) {
            return angular.isArray(t) ? 2 == t.length ? t.concat(t) : 3 == t.length ? t.concat([t[1]]) : t : [t, t, t, t]
        }

        function o(t, e) {
            if (!e) return t;
            var n = {
                top: a(e[0]) ? parseFloat(e[0]) * t.height : e[0],
                right: a(e[1]) ? parseFloat(e[1]) * t.width : e[1],
                bottom: a(e[2]) ? parseFloat(e[2]) * t.height : e[2],
                left: a(e[3]) ? parseFloat(e[3]) * t.width : e[3]
            };
            return {
                top: t.top - n.top,
                left: t.left - n.left,
                bottom: t.bottom + n.bottom,
                right: t.right + n.right,
                height: t.height + n.top + n.bottom,
                width: t.width + n.left + n.right
            }
        }

        function a(t) {
            return angular.isString(t) && t.indexOf("%") > 0
        }

        function s(t) {
            this.didSubscribeFunc = t
        }

        function l() {
            var t = arguments;
            return new s(function (e) {
                for (var n = [], i = t.length - 1; i >= 0; i--) n.push(t[i].subscribe(function () {
                    e.apply(null, arguments)
                }));
                e.$dispose = function () {
                    for (var t = n.length - 1; t >= 0; t--) n[t] && n[t]()
                }
            })
        }

        function c(t, e) {
            return new s(function (n) {
                var i = function (t) {
                    n(t)
                }, r = angular.element(t);
                r.on(e, i), n.$dispose = function () {
                    r.off(e, i)
                }
            })
        }

        function u(t) {
            return new s(function (e) {
                setTimeout(function () {
                    e(t)
                })
            })
        }

        var d = angular.module("angular-inview", []).directive("inView", ["$parse", t]).directive("inViewContainer", e);
        s.prototype.subscribe = function (t) {
            this.didSubscribeFunc(t);
            var e = function () {
                t.$dispose && (t.$dispose(), t.$dispose = null)
            };
            return e
        }, s.prototype.map = function (t) {
            var e = this;
            return new s(function (n) {
                n.$dispose = e.subscribe(function (e) {
                    n(t(e))
                })
            })
        }, s.prototype.filter = function (t) {
            var e = this;
            return new s(function (n) {
                n.$dispose = e.subscribe(function (e) {
                    t(e) && n(e)
                })
            })
        }, s.prototype.scan = function (t, e) {
            var n = this;
            return new s(function (i) {
                var r = t;
                i.$dispose = n.subscribe(function (t) {
                    r = e(r, t), i(r)
                })
            })
        }, s.prototype.merge = function (t) {
            return l(this, t)
        }, s.prototype.throttle = function (t) {
            var e, n, i = this;
            return new s(function (r) {
                var o = i.subscribe(function () {
                    var i = +new Date, o = arguments;
                    e && i < e + t ? (clearTimeout(n), n = setTimeout(function () {
                        e = i, r.apply(null, o)
                    }, t)) : (e = i, r.apply(null, o))
                });
                r.$dispose = function () {
                    clearTimeout(n), o && o()
                }
            })
        }, "function" == typeof define && define.amd ? define(["angular"], d) : "undefined" != typeof module && module && module.exports && (module.exports = d)
    }(),
    function (t, e) {
        "use strict";

        function n() {
            function n(t, e) {
                var n, i = {}, r = t.split(",");
                for (n = 0; n < r.length; n++) i[e ? l(r[n]) : r[n]] = !0;
                return i
            }

            function i(e, n) {
                null === e || void 0 === e ? e = "" : "string" != typeof e && (e = "" + e), y.innerHTML = e;
                var i = 5;
                do {
                    if (0 === i) throw f("uinput", "Failed to sanitize html because the input is unstable");
                    i--, t.document.documentMode && g(y), e = y.innerHTML, y.innerHTML = e
                } while (e !== y.innerHTML);
                for (var r = y.firstChild; r;) {
                    switch (r.nodeType) {
                        case 1:
                            n.start(r.nodeName.toLowerCase(), h(r.attributes));
                            break;
                        case 3:
                            n.chars(r.textContent)
                    }
                    var o;
                    if (!(o = r.firstChild) && (1 === r.nodeType && n.end(r.nodeName.toLowerCase()), o = r.nextSibling, !o)) for (; null == o && (r = r.parentNode, r !== y);) o = r.nextSibling, 1 === r.nodeType && n.end(r.nodeName.toLowerCase());
                    r = o
                }
                for (; r = y.firstChild;) y.removeChild(r)
            }

            function h(t) {
                for (var e = {}, n = 0, i = t.length; n < i; n++) {
                    var r = t[n];
                    e[r.name] = r.value
                }
                return e
            }

            function p(t) {
                return t.replace(/&/g, "&amp;").replace($, function (t) {
                    var e = t.charCodeAt(0), n = t.charCodeAt(1);
                    return "&#" + (1024 * (e - 55296) + (n - 56320) + 65536) + ";"
                }).replace(w, function (t) {
                    return "&#" + t.charCodeAt(0) + ";"
                }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
            }

            function m(t, e) {
                var n = !1, i = r(t, t.push);
                return {
                    start: function (t, r) {
                        t = l(t), !n && T[t] && (n = t), n || A[t] !== !0 || (i("<"), i(t), a(r, function (n, r) {
                            var o = l(r), a = "img" === t && "src" === o || "background" === o;
                            M[o] !== !0 || O[o] === !0 && !e(n, a) || (i(" "), i(r), i('="'), i(p(n)), i('"'))
                        }), i(">"))
                    }, end: function (t) {
                        t = l(t), n || A[t] !== !0 || b[t] === !0 || (i("</"), i(t), i(">")), t == n && (n = !1)
                    }, chars: function (t) {
                        n || i(p(t))
                    }
                }
            }

            function g(e) {
                for (; e;) {
                    if (e.nodeType === t.Node.ELEMENT_NODE) for (var n = e.attributes, i = 0, r = n.length; i < r; i++) {
                        var o = n[i], a = o.name.toLowerCase();
                        "xmlns:ns1" !== a && 0 !== a.lastIndexOf("ns1:", 0) || (e.removeAttributeNode(o), i--, r--)
                    }
                    var s = e.firstChild;
                    s && g(s), e = e.nextSibling
                }
            }

            var v = !1;
            this.$get = ["$$sanitizeUri", function (t) {
                return v && o(A, E), function (e) {
                    var n = [];
                    return u(e, d(n, function (e, n) {
                        return !/^unsafe:/.test(t(e, n))
                    })), n.join("")
                }
            }], this.enableSvg = function (t) {
                return s(t) ? (v = t, this) : v
            }, r = e.bind, o = e.extend, a = e.forEach, s = e.isDefined, l = e.lowercase, c = e.noop, u = i, d = m;
            var y, $ = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, w = /([^#-~ |!])/g, b = n("area,br,col,hr,img,wbr"),
                x = n("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), C = n("rp,rt"), k = o({}, C, x),
                S = o({}, x, n("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul")),
                _ = o({}, C, n("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
                E = n("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan"),
                T = n("script,style"), A = o({}, b, S, _, k), O = n("background,cite,href,longdesc,src,xlink:href"),
                D = n("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"),
                P = n("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan", !0),
                M = o({}, O, P, D);
            !function (t) {
                var e;
                if (!t.document || !t.document.implementation) throw f("noinert", "Can't create an inert html document");
                e = t.document.implementation.createHTMLDocument("inert");
                var n = e.documentElement || e.getDocumentElement(), i = n.getElementsByTagName("body");
                if (1 === i.length) y = i[0]; else {
                    var r = e.createElement("html");
                    y = e.createElement("body"), r.appendChild(y), e.appendChild(r)
                }
            }(t)
        }

        function i(t) {
            var e = [], n = d(e, c);
            return n.chars(t), e.join("")
        }

        var r, o, a, s, l, c, u, d, f = e.$$minErr("$sanitize");
        e.module("ngSanitize", []).provider("$sanitize", n), e.module("ngSanitize").filter("linky", ["$sanitize", function (t) {
            var n = /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,
                r = /^mailto:/i, o = e.$$minErr("linky"), a = e.isDefined, s = e.isFunction, l = e.isObject,
                c = e.isString;
            return function (e, u, d) {
                function f(t) {
                    t && $.push(i(t))
                }

                function h(t, e) {
                    var n, i = v(t);
                    $.push("<a ");
                    for (n in i) $.push(n + '="' + i[n] + '" ');
                    !a(u) || "target" in i || $.push('target="', u, '" '), $.push('href="', t.replace(/"/g, "&quot;"), '">'), f(e), $.push("</a>")
                }

                if (null == e || "" === e) return e;
                if (!c(e)) throw o("notstring", "Expected string but received: {0}", e);
                for (var p, m, g, v = s(d) ? d : l(d) ? function () {
                    return d
                } : function () {
                    return {}
                }, y = e, $ = []; p = y.match(n);) m = p[0], p[2] || p[4] || (m = (p[3] ? "http://" : "mailto:") + m), g = p.index, f(y.substr(0, g)), h(m, p[0].replace(r, "")), y = y.substring(g + p[0].length);
                return f(y), t($.join(""))
            }
        }])
    }(window, window.angular),
    !function (t, e) {
        "use strict";
        var n = ["ng", "oc.lazyLoad"], i = {}, r = [], o = [], a = [], s = [], l = t.noop, c = {}, u = [],
            d = t.module("oc.lazyLoad", ["ng"]);
        d.provider("$ocLazyLoad", ["$controllerProvider", "$provide", "$compileProvider", "$filterProvider", "$injector", "$animateProvider", function (d, f, m, g, v, y) {
            function $(e, i, r) {
                if (i) {
                    var o, s, d, f = [];
                    for (o = i.length - 1; o >= 0; o--) if (s = i[o], t.isString(s) || (s = x(s)), s && -1 === u.indexOf(s) && (!k[s] || -1 !== a.indexOf(s))) {
                        var h = -1 === n.indexOf(s);
                        if (d = p(s), h && (n.push(s), $(e, d.requires, r)), d._runBlocks.length > 0) for (c[s] = []; d._runBlocks.length > 0;) c[s].push(d._runBlocks.shift());
                        t.isDefined(c[s]) && (h || r.rerun) && (f = f.concat(c[s])), b(e, d._invokeQueue, s, r.reconfig), b(e, d._configBlocks, s, r.reconfig), l(h ? "ocLazyLoad.moduleLoaded" : "ocLazyLoad.moduleReloaded", s), i.pop(), u.push(s)
                    }
                    var m = e.getInstanceInjector();
                    t.forEach(f, function (t) {
                        m.invoke(t)
                    })
                }
            }

            function w(e, n) {
                function r(e, n) {
                    var i, r = !0;
                    return n.length && (i = o(e), t.forEach(n, function (t) {
                        r = r && o(t) !== i
                    })), r
                }

                function o(e) {
                    return t.isArray(e) ? D(e.toString()) : t.isObject(e) ? D(O(e)) : t.isDefined(e) && null !== e ? D(e.toString()) : e
                }

                var a = e[2][0], s = e[1], c = !1;
                t.isUndefined(i[n]) && (i[n] = {}), t.isUndefined(i[n][s]) && (i[n][s] = {});
                var u = function (t, e) {
                    i[n][s].hasOwnProperty(t) || (i[n][s][t] = []), r(e, i[n][s][t]) && (c = !0, i[n][s][t].push(e), l("ocLazyLoad.componentLoaded", [n, s, t]))
                };
                if (t.isString(a)) u(a, e[2][1]); else {
                    if (!t.isObject(a)) return !1;
                    t.forEach(a, function (e, n) {
                        t.isString(e) ? u(e, a[1]) : u(n, e)
                    })
                }
                return c
            }

            function b(e, n, i, o) {
                if (n) {
                    var a, s, l, c;
                    for (a = 0, s = n.length; s > a; a++) if (l = n[a], t.isArray(l)) {
                        if (null !== e) {
                            if (!e.hasOwnProperty(l[0])) throw new Error("unsupported provider " + l[0]);
                            c = e[l[0]]
                        }
                        var u = w(l, i);
                        if ("invoke" !== l[1]) u && t.isDefined(c) && c[l[1]].apply(c, l[2]); else {
                            var d = function (e) {
                                var n = r.indexOf(i + "-" + e);
                                (-1 === n || o) && (-1 === n && r.push(i + "-" + e), t.isDefined(c) && c[l[1]].apply(c, l[2]))
                            };
                            if (t.isFunction(l[2][0])) d(l[2][0]); else if (t.isArray(l[2][0])) for (var f = 0, h = l[2][0].length; h > f; f++) t.isFunction(l[2][0][f]) && d(l[2][0][f])
                        }
                    }
                }
            }

            function x(e) {
                var n = null;
                return t.isString(e) ? n = e : t.isObject(e) && e.hasOwnProperty("name") && t.isString(e.name) && (n = e.name), n
            }

            function C(e) {
                if (!t.isString(e)) return !1;
                try {
                    return p(e)
                } catch (n) {
                    if (/No module/.test(n) || n.message.indexOf("$injector:nomod") > -1) return !1
                }
            }

            var k = {}, S = {
                $controllerProvider: d,
                $compileProvider: m,
                $filterProvider: g,
                $provide: f,
                $injector: v,
                $animateProvider: y
            }, _ = !1, E = !1, T = [], A = {};
            T.push = function (t) {
                -1 === this.indexOf(t) && Array.prototype.push.apply(this, arguments)
            }, this.config = function (e) {
                t.isDefined(e.modules) && (t.isArray(e.modules) ? t.forEach(e.modules, function (t) {
                    k[t.name] = t
                }) : k[e.modules.name] = e.modules), t.isDefined(e.debug) && (_ = e.debug), t.isDefined(e.events) && (E = e.events)
            }, this._init = function (i) {
                if (0 === o.length) {
                    var r = [i], a = ["ng:app", "ng-app", "x-ng-app", "data-ng-app"],
                        l = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/, c = function (t) {
                            return t && r.push(t)
                        };
                    t.forEach(a, function (e) {
                        a[e] = !0, c(document.getElementById(e)), e = e.replace(":", "\\:"), "undefined" != typeof i[0] && i[0].querySelectorAll && (t.forEach(i[0].querySelectorAll("." + e), c), t.forEach(i[0].querySelectorAll("." + e + "\\:"), c), t.forEach(i[0].querySelectorAll("[" + e + "]"), c))
                    }), t.forEach(r, function (e) {
                        if (0 === o.length) {
                            var n = " " + i.className + " ", r = l.exec(n);
                            r ? o.push((r[2] || "").replace(/\s+/g, ",")) : t.forEach(e.attributes, function (t) {
                                0 === o.length && a[t.name] && o.push(t.value)
                            })
                        }
                    })
                }
                0 !== o.length || (e.jasmine || e.mocha) && t.isDefined(t.mock) || void 0;
                var u = function d(e) {
                    if (-1 === n.indexOf(e)) {
                        n.push(e);
                        var i = t.module(e);
                        b(null, i._invokeQueue, e), b(null, i._configBlocks, e), t.forEach(i.requires, d)
                    }
                };
                t.forEach(o, function (t) {
                    u(t)
                }), o = [], s.pop()
            };
            var O = function (e) {
                try {
                    return JSON.stringify(e)
                } catch (n) {
                    var i = [];
                    return JSON.stringify(e, function (e, n) {
                        if (t.isObject(n) && null !== n) {
                            if (-1 !== i.indexOf(n)) return;
                            i.push(n)
                        }
                        return n
                    })
                }
            }, D = function (t) {
                var e, n, i, r = 0;
                if (0 == t.length) return r;
                for (e = 0, i = t.length; i > e; e++) n = t.charCodeAt(e), r = (r << 5) - r + n, r |= 0;
                return r
            };
            this.$get = ["$log", "$rootElement", "$rootScope", "$cacheFactory", "$q", function (e, r, a, c, d) {
                function f(t) {
                    var n = d.defer();
                    return e.error(t.message), n.reject(t), n.promise
                }

                var m, g = c("ocLazyLoad");
                return _ || (e = {}, e.error = t.noop, e.warn = t.noop, e.info = t.noop), S.getInstanceInjector = function () {
                    return m ? m : m = r.data("$injector") || t.injector()
                }, l = function (t, n) {
                    E && a.$broadcast(t, n), _ && e.info(t, n)
                }, {
                    _broadcast: l,
                    _$log: e,
                    _getFilesCache: function () {
                        return g
                    },
                    toggleWatch: function (t) {
                        t ? s.push(!0) : s.pop()
                    },
                    getModuleConfig: function (e) {
                        if (!t.isString(e)) throw new Error("You need to give the name of the module to get");
                        return k[e] ? t.copy(k[e]) : null
                    },
                    setModuleConfig: function (e) {
                        if (!t.isObject(e)) throw new Error("You need to give the module config object to set");
                        return k[e.name] = e, e
                    },
                    getModules: function () {
                        return n
                    },
                    isLoaded: function (e) {
                        var i = function (t) {
                            var e = n.indexOf(t) > -1;
                            return e || (e = !!C(t)), e
                        };
                        if (t.isString(e) && (e = [e]), t.isArray(e)) {
                            var r, o;
                            for (r = 0, o = e.length; o > r; r++) if (!i(e[r])) return !1;
                            return !0
                        }
                        throw new Error("You need to define the module(s) name(s)")
                    },
                    _getModuleName: x,
                    _getModule: function (t) {
                        try {
                            return p(t)
                        } catch (e) {
                            throw(/No module/.test(e) || e.message.indexOf("$injector:nomod") > -1) && (e.message = 'The module "' + O(t) + '" that you are trying to load does not exist. ' + e.message), e
                        }
                    },
                    moduleExists: C,
                    _loadDependencies: function (e, n) {
                        var i, r, o, a = [], s = this;
                        if (e = s._getModuleName(e), null === e) return d.when();
                        try {
                            i = s._getModule(e)
                        } catch (l) {
                            return f(l)
                        }
                        return r = s.getRequires(i), t.forEach(r, function (i) {
                            if (t.isString(i)) {
                                var r = s.getModuleConfig(i);
                                if (null === r) return void T.push(i);
                                i = r, r.name = void 0
                            }
                            if (s.moduleExists(i.name)) return o = i.files.filter(function (t) {
                                return s.getModuleConfig(i.name).files.indexOf(t) < 0
                            }), 0 !== o.length && s._$log.warn('Module "', e, '" attempted to redefine configuration for dependency. "', i.name, '"\n Additional Files Loaded:', o),
                                t.isDefined(s.filesLoader) ? void a.push(s.filesLoader(i, n).then(function () {
                                    return s._loadDependencies(i)
                                })) : f(new Error("Error: New dependencies need to be loaded from external files (" + i.files + "), but no loader has been defined."));
                            if (t.isArray(i)) {
                                var l = [];
                                t.forEach(i, function (t) {
                                    var e = s.getModuleConfig(t);
                                    null === e ? l.push(t) : e.files && (l = l.concat(e.files))
                                }), l.length > 0 && (i = {files: l})
                            } else t.isObject(i) && i.hasOwnProperty("name") && i.name && (s.setModuleConfig(i), T.push(i.name));
                            if (t.isDefined(i.files) && 0 !== i.files.length) {
                                if (!t.isDefined(s.filesLoader)) return f(new Error('Error: the module "' + i.name + '" is defined in external files (' + i.files + "), but no loader has been defined."));
                                a.push(s.filesLoader(i, n).then(function () {
                                    return s._loadDependencies(i)
                                }))
                            }
                        }), d.all(a)
                    },
                    inject: function (e) {
                        var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
                            i = !(arguments.length <= 2 || void 0 === arguments[2]) && arguments[2], r = this,
                            a = d.defer();
                        if (t.isDefined(e) && null !== e) {
                            if (t.isArray(e)) {
                                var s = [];
                                return t.forEach(e, function (t) {
                                    s.push(r.inject(t, n, i))
                                }), d.all(s)
                            }
                            r._addToLoadList(r._getModuleName(e), !0, i)
                        }
                        if (o.length > 0) {
                            var l = o.slice(), c = function f(t) {
                                T.push(t), A[t] = a.promise, r._loadDependencies(t, n).then(function () {
                                    try {
                                        u = [], $(S, T, n)
                                    } catch (t) {
                                        return r._$log.error(t.message), void a.reject(t)
                                    }
                                    o.length > 0 ? f(o.shift()) : a.resolve(l)
                                }, function (t) {
                                    a.reject(t)
                                })
                            };
                            c(o.shift())
                        } else {
                            if (n && n.name && A[n.name]) return A[n.name];
                            a.resolve()
                        }
                        return a.promise
                    },
                    getRequires: function (e) {
                        var i = [];
                        return t.forEach(e.requires, function (t) {
                            -1 === n.indexOf(t) && i.push(t)
                        }), i
                    },
                    _invokeQueue: b,
                    _registerInvokeList: w,
                    _register: $,
                    _addToLoadList: h,
                    _unregister: function (e) {
                        t.isDefined(e) && t.isArray(e) && t.forEach(e, function (t) {
                            i[t] = void 0
                        })
                    }
                }
            }], this._init(t.element(e.document))
        }]);
        var f = t.bootstrap;
        t.bootstrap = function (e, d, p) {
            return n = ["ng", "oc.lazyLoad"], i = {}, r = [], o = [], a = [], s = [], l = t.noop, c = {}, u = [], t.forEach(d.slice(), function (t) {
                h(t, !0, !0)
            }), f(e, d, p)
        };
        var h = function (e, n, i) {
            (s.length > 0 || n) && t.isString(e) && -1 === o.indexOf(e) && (o.push(e), i && a.push(e))
        }, p = t.module;
        t.module = function (t, e, n) {
            return h(t, !1, !0), p(t, e, n)
        }, "undefined" != typeof module && "undefined" != typeof exports && module.exports === exports && (module.exports = "oc.lazyLoad")
    }(angular, window),
    function (t) {
        "use strict";
        t.module("oc.lazyLoad").directive("ocLazyLoad", ["$ocLazyLoad", "$compile", "$animate", "$parse", "$timeout", function (e, n, i, r, o) {
            return {
                restrict: "A", terminal: !0, priority: 1e3, compile: function (o, a) {
                    var s = o[0].innerHTML;
                    return o.html(""), function (o, a, l) {
                        var c = r(l.ocLazyLoad);
                        o.$watch(function () {
                            return c(o) || l.ocLazyLoad
                        }, function (r) {
                            t.isDefined(r) && e.load(r).then(function () {
                                i.enter(s, a), n(a.contents())(o)
                            })
                        }, !0)
                    }
                }
            }
        }])
    }(angular),
    function (t) {
        "use strict";
        t.module("oc.lazyLoad").config(["$provide", function (e) {
            e.decorator("$ocLazyLoad", ["$delegate", "$q", "$window", "$interval", function (e, n, i, r) {
                var o = !1, a = !1,
                    s = i.document.getElementsByTagName("head")[0] || i.document.getElementsByTagName("body")[0];
                return e.buildElement = function (l, c, u) {
                    var d, f, h = n.defer(), p = e._getFilesCache(), m = function (t) {
                        var e = (new Date).getTime();
                        return t.indexOf("?") >= 0 ? "&" === t.substring(0, t.length - 1) ? t + "_dc=" + e : t + "&_dc=" + e : t + "?_dc=" + e
                    };
                    switch (t.isUndefined(p.get(c)) && p.put(c, h.promise), l) {
                        case"css":
                            d = i.document.createElement("link"), d.type = "text/css", d.rel = "stylesheet", d.href = u.cache === !1 ? m(c) : c;
                            break;
                        case"js":
                            d = i.document.createElement("script"), d.src = u.cache === !1 ? m(c) : c;
                            break;
                        default:
                            p.remove(c), h.reject(new Error('Requested type "' + l + '" is not known. Could not inject "' + c + '"'))
                    }
                    d.onload = d.onreadystatechange = function (t) {
                        d.readyState && !/^c|loade/.test(d.readyState) || f || (d.onload = d.onreadystatechange = null, f = 1, e._broadcast("ocLazyLoad.fileLoaded", c), h.resolve(d))
                    }, d.onerror = function () {
                        p.remove(c), h.reject(new Error("Unable to load " + c))
                    }, d.async = u.serie ? 0 : 1;
                    var g = s.lastChild;
                    if (u.insertBefore) {
                        var v = t.element(t.isDefined(window.jQuery) ? u.insertBefore : document.querySelector(u.insertBefore));
                        v && v.length > 0 && (g = v[0])
                    }
                    if (g.parentNode.insertBefore(d, g), "css" == l) {
                        if (!o) {
                            var y = i.navigator.userAgent.toLowerCase();
                            if (y.indexOf("phantomjs/1.9") > -1) a = !0; else if (/iP(hone|od|ad)/.test(i.navigator.platform)) {
                                var $ = i.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
                                    w = parseFloat([parseInt($[1], 10), parseInt($[2], 10), parseInt($[3] || 0, 10)].join("."));
                                a = 6 > w
                            } else if (y.indexOf("android") > -1) {
                                var b = parseFloat(y.slice(y.indexOf("android") + 8));
                                a = 4.4 > b
                            } else if (y.indexOf("safari") > -1) {
                                var x = y.match(/version\/([\.\d]+)/i);
                                a = x && x[1] && parseFloat(x[1]) < 6
                            }
                        }
                        if (a) var C = 1e3, k = r(function () {
                            try {
                                d.sheet.cssRules, r.cancel(k), d.onload()
                            } catch (t) {
                                --C <= 0 && d.onerror()
                            }
                        }, 20)
                    }
                    return h.promise
                }, e
            }])
        }])
    }(angular),
    function (t) {
        "use strict";
        t.module("oc.lazyLoad").config(["$provide", function (e) {
            e.decorator("$ocLazyLoad", ["$delegate", "$q", function (e, n) {
                return e.filesLoader = function (i) {
                    var r = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], o = [], a = [],
                        s = [],
                        l = [], c = null, u = e._getFilesCache();
                    e.toggleWatch(!0), t.extend(r, i);
                    var d = function (n) {
                        var i, d = null;
                        if (t.isObject(n) && (d = n.type, n = n.path), c = u.get(n), t.isUndefined(c) || r.cache === !1) {
                            if (null !== (i = /^(css|less|html|htm|js)?(?=!)/.exec(n)) && (d = i[1], n = n.substr(i[1].length + 1, n.length)), !d) if (null !== (i = /[.](css|less|html|htm|js)?((\?|#).*)?$/.exec(n))) d = i[1]; else {
                                if (e.jsLoader.hasOwnProperty("ocLazyLoadLoader") || !e.jsLoader.hasOwnProperty("requirejs")) return void e._$log.error("File type could not be determined. " + n);
                                d = "js"
                            }
                            "css" !== d && "less" !== d || -1 !== o.indexOf(n) ? "html" !== d && "htm" !== d || -1 !== a.indexOf(n) ? "js" === d || -1 === s.indexOf(n) ? s.push(n) : e._$log.error("File type is not valid. " + n) : a.push(n) : o.push(n)
                        } else c && l.push(c)
                    };
                    if (r.serie ? d(r.files.shift()) : t.forEach(r.files, function (t) {
                        d(t)
                    }), o.length > 0) {
                        var f = n.defer();
                        e.cssLoader(o, function (n) {
                            t.isDefined(n) && e.cssLoader.hasOwnProperty("ocLazyLoadLoader") ? (e._$log.error(n), f.reject(n)) : f.resolve()
                        }, r), l.push(f.promise)
                    }
                    if (a.length > 0) {
                        var h = n.defer();
                        e.templatesLoader(a, function (n) {
                            t.isDefined(n) && e.templatesLoader.hasOwnProperty("ocLazyLoadLoader") ? (e._$log.error(n), h.reject(n)) : h.resolve()
                        }, r), l.push(h.promise)
                    }
                    if (s.length > 0) {
                        var p = n.defer();
                        e.jsLoader(s, function (n) {
                            t.isDefined(n) && (e.jsLoader.hasOwnProperty("ocLazyLoadLoader") || e.jsLoader.hasOwnProperty("requirejs")) ? (e._$log.error(n), p.reject(n)) : p.resolve()
                        }, r), l.push(p.promise)
                    }
                    if (0 === l.length) {
                        var m = n.defer(),
                            g = "Error: no file to load has been found, if you're trying to load an existing module you should use the 'inject' method instead of 'load'.";
                        return e._$log.error(g), m.reject(g), m.promise
                    }
                    return r.serie && r.files.length > 0 ? n.all(l).then(function () {
                        return e.filesLoader(i, r)
                    }) : n.all(l)["finally"](function (t) {
                        return e.toggleWatch(!1), t
                    })
                }, e.load = function (i) {
                    var r, o = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], a = this, s = null,
                        l = [], c = n.defer(), u = t.copy(i), d = t.copy(o);
                    if (t.isArray(u)) return t.forEach(u, function (t) {
                        l.push(a.load(t, d))
                    }), n.all(l).then(function (t) {
                        c.resolve(t)
                    }, function (t) {
                        c.reject(t)
                    }), c.promise;
                    if (t.isString(u) ? (s = a.getModuleConfig(u), s || (s = {files: [u]})) : t.isObject(u) && (s = t.isDefined(u.path) && t.isDefined(u.type) ? {files: [u]} : a.setModuleConfig(u)), null === s) {
                        var f = a._getModuleName(u);
                        return r = 'Module "' + (f || "unknown") + '" is not configured, cannot load.', e._$log.error(r), c.reject(new Error(r)), c.promise
                    }
                    t.isDefined(s.template) && (t.isUndefined(s.files) && (s.files = []), t.isString(s.template) ? s.files.push(s.template) : t.isArray(s.template) && s.files.concat(s.template));
                    var h = t.extend({}, d, s);
                    return t.isUndefined(s.files) && t.isDefined(s.name) && e.moduleExists(s.name) ? e.inject(s.name, h, !0) : (e.filesLoader(s, h).then(function () {
                        e.inject(null, h).then(function (t) {
                            c.resolve(t)
                        }, function (t) {
                            c.reject(t)
                        })
                    }, function (t) {
                        c.reject(t)
                    }), c.promise)
                }, e
            }])
        }])
    }(angular),
    function (t) {
        "use strict";
        t.module("oc.lazyLoad").config(["$provide", function (e) {
            e.decorator("$ocLazyLoad", ["$delegate", "$q", function (e, n) {
                return e.cssLoader = function (i, r, o) {
                    var a = [];
                    t.forEach(i, function (t) {
                        a.push(e.buildElement("css", t, o))
                    }), n.all(a).then(function () {
                        r()
                    }, function (t) {
                        r(t)
                    })
                }, e.cssLoader.ocLazyLoadLoader = !0, e
            }])
        }])
    }(angular),
    function (t) {
        "use strict";
        t.module("oc.lazyLoad").config(["$provide", function (e) {
            e.decorator("$ocLazyLoad", ["$delegate", "$q", function (e, n) {
                return e.jsLoader = function (i, r, o) {
                    var a = [];
                    t.forEach(i, function (t) {
                        a.push(e.buildElement("js", t, o))
                    }), n.all(a).then(function () {
                        r()
                    }, function (t) {
                        r(t)
                    })
                }, e.jsLoader.ocLazyLoadLoader = !0, e
            }])
        }])
    }(angular),
    function (t) {
        "use strict";
        t.module("oc.lazyLoad").config(["$provide", function (e) {
            e.decorator("$ocLazyLoad", ["$delegate", "$templateCache", "$q", "$http", function (e, n, i, r) {
                return e.templatesLoader = function (o, a, s) {
                    var l = [], c = e._getFilesCache();
                    return t.forEach(o, function (e) {
                        var o = i.defer();
                        l.push(o.promise), r.get(e, s).then(function (i) {
                            var r = i.data;
                            t.isString(r) && r.length > 0 && t.forEach(t.element(r), function (t) {
                                "SCRIPT" === t.nodeName && "text/ng-template" === t.type && n.put(t.id, t.innerHTML)
                            }), t.isUndefined(c.get(e)) && c.put(e, !0), o.resolve()
                        })["catch"](function (t) {
                            o.reject(new Error('Unable to load template file "' + e + '": ' + t.data))
                        })
                    }), i.all(l).then(function () {
                        a()
                    }, function (t) {
                        a(t)
                    })
                }, e.templatesLoader.ocLazyLoadLoader = !0, e
            }])
        }])
    }(angular),
Array.prototype.indexOf || (Array.prototype.indexOf = function (t, e) {
    var n;
    if (null == this) throw new TypeError('"this" is null or not defined');
    var i = Object(this), r = i.length >>> 0;
    if (0 === r) return -1;
    var o = +e || 0;
    if (Math.abs(o) === 1 / 0 && (o = 0), o >= r) return -1;
    for (n = Math.max(o >= 0 ? o : r - Math.abs(o), 0); r > n;) {
        if (n in i && i[n] === t) return n;
        n++
    }
    return -1
});
var _createClass = function () {
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
        }
    }

    return function (e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e
    }
}(), _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
    return typeof t
} : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
};
!function (t) {
    function e(t) {
        if (void 0 === Function.prototype.name) {
            var e = /function\s([^(]{1,})\(/, n = e.exec(t.toString());
            return n && n.length > 1 ? n[1].trim() : ""
        }
        return void 0 === t.prototype ? t.constructor.name : t.prototype.constructor.name
    }

    function n(t) {
        return "true" === t || "false" !== t && (isNaN(1 * t) ? t : parseFloat(t))
    }

    function i(t) {
        return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
    }

    var r = "6.3.0", o = {
        version: r, _plugins: {}, _uuids: [], rtl: function () {
            return "rtl" === t("html").attr("dir")
        }, plugin: function (t, n) {
            var r = n || e(t), o = i(r);
            this._plugins[o] = this[r] = t
        }, registerPlugin: function (t, n) {
            var r = n ? i(n) : e(t.constructor).toLowerCase();
            t.uuid = this.GetYoDigits(6, r), t.$element.attr("data-" + r) || t.$element.attr("data-" + r, t.uuid), t.$element.data("zfPlugin") || t.$element.data("zfPlugin", t), t.$element.trigger("init.zf." + r), this._uuids.push(t.uuid)
        }, unregisterPlugin: function (t) {
            var n = i(e(t.$element.data("zfPlugin").constructor));
            this._uuids.splice(this._uuids.indexOf(t.uuid), 1), t.$element.removeAttr("data-" + n).removeData("zfPlugin").trigger("destroyed.zf." + n);
            for (var r in t) t[r] = null
        }, reInit: function (e) {
            var n = e instanceof t;
            try {
                if (n) e.each(function () {
                    t(this).data("zfPlugin")._init()
                }); else {
                    var r = "undefined" == typeof e ? "undefined" : _typeof(e), o = this, a = {
                        object: function (e) {
                            e.forEach(function (e) {
                                e = i(e), t("[data-" + e + "]").foundation("_init")
                            })
                        }, string: function () {
                            e = i(e), t("[data-" + e + "]").foundation("_init")
                        }, undefined: function () {
                            this.object(Object.keys(o._plugins))
                        }
                    };
                    a[r](e)
                }
            } catch (s) {
            } finally {
                return e
            }
        }, GetYoDigits: function (t, e) {
            return t = t || 6, Math.round(Math.pow(36, t + 1) - Math.random() * Math.pow(36, t)).toString(36).slice(1) + (e ? "-" + e : "")
        }, reflow: function (e, i) {
            "undefined" == typeof i ? i = Object.keys(this._plugins) : "string" == typeof i && (i = [i]);
            var r = this;
            t.each(i, function (i, o) {
                var a = r._plugins[o], s = t(e).find("[data-" + o + "]").addBack("[data-" + o + "]");
                s.each(function () {
                    var e = t(this), i = {};
                    if (!e.data("zfPlugin")) {
                        e.attr("data-options") && e.attr("data-options").split(";").forEach(function (t, e) {
                            var r = t.split(":").map(function (t) {
                                return t.trim()
                            });
                            r[0] && (i[r[0]] = n(r[1]))
                        });
                        try {
                            e.data("zfPlugin", new a(t(this), i))
                        } catch (r) {
                        } finally {
                            return
                        }
                    }
                })
            })
        }, getFnName: e, transitionend: function (t) {
            var e, n = {
                transition: "transitionend",
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "otransitionend"
            }, i = document.createElement("div");
            for (var r in n) "undefined" != typeof i.style[r] && (e = n[r]);
            return e ? e : (e = setTimeout(function () {
                t.triggerHandler("transitionend", [t])
            }, 1), "transitionend")
        }
    };
    o.util = {
        throttle: function (t, e) {
            var n = null;
            return function () {
                var i = this, r = arguments;
                null === n && (n = setTimeout(function () {
                    t.apply(i, r), n = null
                }, e))
            }
        }
    };
    var a = function (n) {
        var i = "undefined" == typeof n ? "undefined" : _typeof(n), r = t("meta.foundation-mq"), a = t(".no-js");
        if (r.length || t('<meta class="foundation-mq">').appendTo(document.head), a.length && a.removeClass("no-js"), "undefined" === i) o.MediaQuery._init(), o.reflow(this); else {
            if ("string" !== i) throw new TypeError("We're sorry, " + i + " is not a valid parameter. You must use a string representing the method you wish to invoke.");
            var s = Array.prototype.slice.call(arguments, 1), l = this.data("zfPlugin");
            if (void 0 === l || void 0 === l[n]) throw new ReferenceError("We're sorry, '" + n + "' is not an available method for " + (l ? e(l) : "this element") + ".");
            1 === this.length ? l[n].apply(l, s) : this.each(function (e, i) {
                l[n].apply(t(i).data("zfPlugin"), s)
            })
        }
        return this
    };
    window.Foundation = o, t.fn.foundation = a, function () {
        Date.now && window.Date.now || (window.Date.now = Date.now = function () {
            return (new Date).getTime()
        });
        for (var t = ["webkit", "moz"], e = 0; e < t.length && !window.requestAnimationFrame; ++e) {
            var n = t[e];
            window.requestAnimationFrame = window[n + "RequestAnimationFrame"], window.cancelAnimationFrame = window[n + "CancelAnimationFrame"] || window[n + "CancelRequestAnimationFrame"]
        }
        if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
            var i = 0;
            window.requestAnimationFrame = function (t) {
                var e = Date.now(), n = Math.max(i + 16, e);
                return setTimeout(function () {
                    t(i = n)
                }, n - e)
            }, window.cancelAnimationFrame = clearTimeout
        }
        window.performance && window.performance.now || (window.performance = {
            start: Date.now(), now: function () {
                return Date.now() - this.start
            }
        })
    }(), Function.prototype.bind || (Function.prototype.bind = function (t) {
        if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var e = Array.prototype.slice.call(arguments, 1), n = this, i = function () {
        }, r = function () {
            return n.apply(this instanceof i ? this : t, e.concat(Array.prototype.slice.call(arguments)))
        };
        return this.prototype && (i.prototype = this.prototype), r.prototype = new i, r
    })
}(jQuery), !function (t) {
    var e = function () {
        function e(n, i) {
            _classCallCheck(this, e), this.$element = n, this.options = t.extend({}, e.defaults, this.$element.data(), i), this._init(), Foundation.registerPlugin(this, "Equalizer")
        }

        return _createClass(e, [{
            key: "_init", value: function () {
                var e = this.$element.attr("data-equalizer") || "",
                    n = this.$element.find('[data-equalizer-watch="' + e + '"]');
                this.$watched = n.length ? n : this.$element.find("[data-equalizer-watch]"), this.$element.attr("data-resize", e || Foundation.GetYoDigits(6, "eq")), this.$element.attr("data-mutate", e || Foundation.GetYoDigits(6, "eq")), this.hasNested = this.$element.find("[data-equalizer]").length > 0, this.isNested = this.$element.parentsUntil(document.body, "[data-equalizer]").length > 0, this.isOn = !1, this._bindHandler = {
                    onResizeMeBound: this._onResizeMe.bind(this),
                    onPostEqualizedBound: this._onPostEqualized.bind(this)
                };
                var i, r = this.$element.find("img");
                this.options.equalizeOn ? (i = this._checkMQ(), t(window).on("changed.zf.mediaquery", this._checkMQ.bind(this))) : this._events(), (void 0 !== i && i === !1 || void 0 === i) && (r.length ? Foundation.onImagesLoaded(r, this._reflow.bind(this)) : this._reflow())
            }
        }, {
            key: "_pauseEvents", value: function () {
                this.isOn = !1, this.$element.off({
                    ".zf.equalizer": this._bindHandler.onPostEqualizedBound,
                    "resizeme.zf.trigger": this._bindHandler.onResizeMeBound,
                    "mutateme.zf.trigger": this._bindHandler.onResizeMeBound
                })
            }
        }, {
            key: "_onResizeMe", value: function (t) {
                this._reflow()
            }
        }, {
            key: "_onPostEqualized", value: function (t) {
                t.target !== this.$element[0] && this._reflow()
            }
        }, {
            key: "_events", value: function () {
                this._pauseEvents(), this.hasNested ? this.$element.on("postequalized.zf.equalizer", this._bindHandler.onPostEqualizedBound) : (this.$element.on("resizeme.zf.trigger", this._bindHandler.onResizeMeBound), this.$element.on("mutateme.zf.trigger", this._bindHandler.onResizeMeBound)), this.isOn = !0
            }
        }, {
            key: "_checkMQ", value: function () {
                var t = !Foundation.MediaQuery.is(this.options.equalizeOn);
                return t ? this.isOn && (this._pauseEvents(), this.$watched.css("height", "auto")) : this.isOn || this._events(), t
            }
        }, {
            key: "_killswitch", value: function () {
            }
        }, {
            key: "_reflow", value: function () {
                return !this.options.equalizeOnStack && this._isStacked() ? (this.$watched.css("height", "auto"), !1) : void (this.options.equalizeByRow ? this.getHeightsByRow(this.applyHeightByRow.bind(this)) : this.getHeights(this.applyHeight.bind(this)))
            }
        }, {
            key: "_isStacked", value: function () {
                return !this.$watched[0] || !this.$watched[1] || this.$watched[0].getBoundingClientRect().top !== this.$watched[1].getBoundingClientRect().top
            }
        }, {
            key: "getHeights", value: function (t) {
                for (var e = [], n = 0, i = this.$watched.length; n < i; n++) this.$watched[n].style.height = "auto", e.push(this.$watched[n].offsetHeight);
                t(e)
            }
        }, {
            key: "getHeightsByRow", value: function (e) {
                var n = this.$watched.length ? this.$watched.first().offset().top : 0, i = [], r = 0;
                i[r] = [];
                for (var o = 0, a = this.$watched.length; o < a; o++) {
                    this.$watched[o].style.height = "auto";
                    var s = t(this.$watched[o]).offset().top;
                    s != n && (r++, i[r] = [], n = s), i[r].push([this.$watched[o], this.$watched[o].offsetHeight])
                }
                for (var l = 0, c = i.length; l < c; l++) {
                    var u = t(i[l]).map(function () {
                        return this[1]
                    }).get(), d = Math.max.apply(null, u);
                    i[l].push(d)
                }
                e(i)
            }
        }, {
            key: "applyHeight", value: function (t) {
                var e = Math.max.apply(null, t);
                this.$element.trigger("preequalized.zf.equalizer"), this.$watched.css("height", e), this.$element.trigger("postequalized.zf.equalizer")
            }
        }, {
            key: "applyHeightByRow", value: function (e) {
                this.$element.trigger("preequalized.zf.equalizer");
                for (var n = 0, i = e.length; n < i; n++) {
                    var r = e[n].length, o = e[n][r - 1];
                    if (r <= 2) t(e[n][0][0]).css({height: "auto"}); else {
                        this.$element.trigger("preequalizedrow.zf.equalizer");
                        for (var a = 0, s = r - 1; a < s; a++) t(e[n][a][0]).css({height: o});
                        this.$element.trigger("postequalizedrow.zf.equalizer")
                    }
                }
                this.$element.trigger("postequalized.zf.equalizer")
            }
        }, {
            key: "destroy", value: function () {
                this._pauseEvents(), this.$watched.css("height", "auto"), Foundation.unregisterPlugin(this)
            }
        }]), e
    }();
    e.defaults = {equalizeOnStack: !1, equalizeByRow: !1, equalizeOn: ""}, Foundation.plugin(e, "Equalizer")
}(jQuery), !function (t) {
    function e() {
        return /iP(ad|hone|od).*OS/.test(window.navigator.userAgent)
    }

    function n() {
        return /Android/.test(window.navigator.userAgent)
    }

    function i() {
        return e() || n()
    }

    var r = function () {
        function e(n, i) {
            _classCallCheck(this, e), this.$element = n, this.options = t.extend({}, e.defaults, this.$element.data(), i), this._init(), Foundation.registerPlugin(this, "Reveal"), Foundation.Keyboard.register("Reveal", {
                ENTER: "open",
                SPACE: "open",
                ESCAPE: "close"
            })
        }

        return _createClass(e, [{
            key: "_init", value: function () {
                this.id = this.$element.attr("id"), this.isActive = !1, this.cached = {mq: Foundation.MediaQuery.current}, this.isMobile = i(), this.$anchor = t(t('[data-open="' + this.id + '"]').length ? '[data-open="' + this.id + '"]' : '[data-toggle="' + this.id + '"]'), this.$anchor.attr({
                    "aria-controls": this.id,
                    "aria-haspopup": !0,
                    tabindex: 0
                }), (this.options.fullScreen || this.$element.hasClass("full")) && (this.options.fullScreen = !0, this.options.overlay = !1), this.options.overlay && !this.$overlay && (this.$overlay = this._makeOverlay(this.id)), this.$element.attr({
                    role: "dialog",
                    "aria-hidden": !0,
                    "data-yeti-box": this.id,
                    "data-resize": this.id
                }), this.$overlay ? this.$element.detach().appendTo(this.$overlay) : (this.$element.detach().appendTo(t(this.options.appendTo)), this.$element.addClass("without-overlay")), this._events(), this.options.deepLink && window.location.hash === "#" + this.id && t(window).one("load.zf.reveal", this.open.bind(this))
            }
        }, {
            key: "_makeOverlay", value: function () {
                return t("<div></div>").addClass("reveal-overlay").appendTo(this.options.appendTo)
            }
        }, {
            key: "_updatePosition", value: function () {
                var e, n, i = this.$element.outerWidth(), r = t(window).width(), o = this.$element.outerHeight(),
                    a = t(window).height();
                e = "auto" === this.options.hOffset ? parseInt((r - i) / 2, 10) : parseInt(this.options.hOffset, 10), n = "auto" === this.options.vOffset ? o > a ? parseInt(Math.min(100, a / 10), 10) : parseInt((a - o) / 4, 10) : parseInt(this.options.vOffset, 10), this.$element.css({top: n + "px"}), this.$overlay && "auto" === this.options.hOffset || (this.$element.css({left: e + "px"}), this.$element.css({margin: "0px"}))
            }
        }, {
            key: "_events", value: function () {
                var e = this, n = this;
                this.$element.on({
                    "open.zf.trigger": this.open.bind(this), "close.zf.trigger": function (i, r) {
                        if (i.target === n.$element[0] || t(i.target).parents("[data-closable]")[0] === r) return e.close.apply(e)
                    }, "toggle.zf.trigger": this.toggle.bind(this), "resizeme.zf.trigger": function () {
                        n._updatePosition()
                    }
                }), this.$anchor.length && this.$anchor.on("keydown.zf.reveal", function (t) {
                    13 !== t.which && 32 !== t.which || (t.stopPropagation(), t.preventDefault(), n.open())
                }), this.options.closeOnClick && this.options.overlay && this.$overlay.off(".zf.reveal").on("click.zf.reveal", function (e) {
                    e.target !== n.$element[0] && !t.contains(n.$element[0], e.target) && t.contains(document, e.target) && n.close()
                }), this.options.deepLink && t(window).on("popstate.zf.reveal:" + this.id, this._handleState.bind(this))
            }
        }, {
            key: "_handleState", value: function (t) {
                window.location.hash !== "#" + this.id || this.isActive ? this.close() : this.open()
            }
        }, {
            key: "open", value: function () {
                function e() {
                    r.isMobile ? (r.originalScrollPos || (r.originalScrollPos = window.pageYOffset), t("html, body").addClass("is-reveal-open")) : t("body").addClass("is-reveal-open")
                }

                var n = this;
                if (this.options.deepLink) {
                    var i = "#" + this.id;
                    window.history.pushState ? window.history.pushState(null, null, i) : window.location.hash = i
                }
                this.isActive = !0, this.$element.css({visibility: "hidden"}).show().scrollTop(0), this.options.overlay && this.$overlay.css({visibility: "hidden"}).show(), this._updatePosition(), this.$element.hide().css({visibility: ""}), this.$overlay && (this.$overlay.css({visibility: ""}).hide(), this.$element.hasClass("fast") ? this.$overlay.addClass("fast") : this.$element.hasClass("slow") && this.$overlay.addClass("slow")), this.options.multipleOpened || this.$element.trigger("closeme.zf.reveal", this.id);
                var r = this;
                if (this.options.animationIn) {
                    var o = function () {
                        r.$element.attr({
                            "aria-hidden": !1,
                            tabindex: -1
                        }).focus(), e(), Foundation.Keyboard.trapFocus(r.$element)
                    };
                    this.options.overlay && Foundation.Motion.animateIn(this.$overlay, "fade-in"), Foundation.Motion.animateIn(this.$element, this.options.animationIn, function () {
                        n.$element && (n.focusableElements = Foundation.Keyboard.findFocusable(n.$element), o())
                    })
                } else this.options.overlay && this.$overlay.show(0), this.$element.show(this.options.showDelay);
                this.$element.attr({
                    "aria-hidden": !1,
                    tabindex: -1
                }).focus(), Foundation.Keyboard.trapFocus(this.$element), this.$element.trigger("open.zf.reveal"), e(), setTimeout(function () {
                    n._extraHandlers()
                }, 0)
            }
        }, {
            key: "_extraHandlers", value: function () {
                var e = this;
                this.$element && (this.focusableElements = Foundation.Keyboard.findFocusable(this.$element), this.options.overlay || !this.options.closeOnClick || this.options.fullScreen || t("body").on("click.zf.reveal", function (n) {
                    n.target !== e.$element[0] && !t.contains(e.$element[0], n.target) && t.contains(document, n.target) && e.close()
                }), this.options.closeOnEsc && t(window).on("keydown.zf.reveal", function (t) {
                    Foundation.Keyboard.handleKey(t, "Reveal", {
                        close: function () {
                            e.options.closeOnEsc && (e.close(), e.$anchor.focus())
                        }
                    })
                }), this.$element.on("keydown.zf.reveal", function (n) {
                    var i = t(this);
                    Foundation.Keyboard.handleKey(n, "Reveal", {
                        open: function () {
                            e.$element.find(":focus").is(e.$element.find("[data-close]")) ? setTimeout(function () {
                                e.$anchor.focus()
                            }, 1) : i.is(e.focusableElements) && e.open()
                        }, close: function () {
                            e.options.closeOnEsc && (e.close(), e.$anchor.focus())
                        }, handled: function (t) {
                            t && n.preventDefault()
                        }
                    })
                }))
            }
        }, {
            key: "close", value: function () {
                function e() {
                    n.isMobile ? (t("html, body").removeClass("is-reveal-open"), n.originalScrollPos && (t("body").scrollTop(n.originalScrollPos), n.originalScrollPos = null)) : t("body").removeClass("is-reveal-open"), Foundation.Keyboard.releaseFocus(n.$element), n.$element.attr("aria-hidden", !0), n.$element.trigger("closed.zf.reveal")
                }

                if (!this.isActive || !this.$element.is(":visible")) return !1;
                var n = this;
                this.options.animationOut ? (this.options.overlay ? Foundation.Motion.animateOut(this.$overlay, "fade-out", e) : e(), Foundation.Motion.animateOut(this.$element, this.options.animationOut)) : (this.options.overlay ? this.$overlay.hide(0, e) : e(), this.$element.hide(this.options.hideDelay)), this.options.closeOnEsc && t(window).off("keydown.zf.reveal"), !this.options.overlay && this.options.closeOnClick && t("body").off("click.zf.reveal"), this.$element.off("keydown.zf.reveal"), this.options.resetOnClose && this.$element.html(this.$element.html()), this.isActive = !1, n.options.deepLink && (window.history.replaceState ? window.history.replaceState("", document.title, window.location.href.replace("#" + this.id, "")) : window.location.hash = "")
            }
        }, {
            key: "toggle", value: function () {
                this.isActive ? this.close() : this.open()
            }
        }, {
            key: "destroy", value: function () {
                this.options.overlay && (this.$element.appendTo(t(this.options.appendTo)), this.$overlay.hide().off().remove()), this.$element.hide().off(), this.$anchor.off(".zf"), t(window).off(".zf.reveal:" + this.id), Foundation.unregisterPlugin(this)
            }
        }]), e
    }();
    r.defaults = {
        animationIn: "",
        animationOut: "",
        showDelay: 0,
        hideDelay: 0,
        closeOnClick: !0,
        closeOnEsc: !0,
        multipleOpened: !1,
        vOffset: "auto",
        hOffset: "auto",
        fullScreen: !1,
        btmOffsetPct: 10,
        overlay: !0,
        resetOnClose: !1,
        deepLink: !1,
        appendTo: "body"
    }, Foundation.plugin(r, "Reveal")
}(jQuery), !function (t) {
    function e(t) {
        return parseInt(window.getComputedStyle(document.body, null).fontSize, 10) * t
    }

    var n = function () {
        function n(e, i) {
            _classCallCheck(this, n), this.$element = e, this.options = t.extend({}, n.defaults, this.$element.data(), i), this._init(), Foundation.registerPlugin(this, "Sticky")
        }

        return _createClass(n, [{
            key: "_init", value: function () {
                var e = this.$element.parent("[data-sticky-container]"),
                    n = this.$element[0].id || Foundation.GetYoDigits(6, "sticky"), i = this;
                e.length || (this.wasWrapped = !0), this.$container = e.length ? e : t(this.options.container).wrapInner(this.$element), this.$container.addClass(this.options.containerClass), this.$element.addClass(this.options.stickyClass).attr({"data-resize": n}), this.scrollCount = this.options.checkEvery, this.isStuck = !1, t(window).one("load.zf.sticky", function () {
                    i.containerHeight = "none" == i.$element.css("display") ? 0 : i.$element[0].getBoundingClientRect().height, i.$container.css("height", i.containerHeight), i.elemHeight = i.containerHeight, "" !== i.options.anchor ? i.$anchor = t("#" + i.options.anchor) : i._parsePoints(), i._setSizes(function () {
                        var t = window.pageYOffset;
                        i._calc(!1, t), i.isStuck || i._removeSticky(!(t >= i.topPoint))
                    }), i._events(n.split("-").reverse().join("-"))
                })
            }
        }, {
            key: "_parsePoints", value: function () {
                for (var e = "" == this.options.topAnchor ? 1 : this.options.topAnchor, n = "" == this.options.btmAnchor ? document.documentElement.scrollHeight : this.options.btmAnchor, i = [e, n], r = {}, o = 0, a = i.length; o < a && i[o]; o++) {
                    var s;
                    if ("number" == typeof i[o]) s = i[o]; else {
                        var l = i[o].split(":"), c = t("#" + l[0]);
                        s = c.offset().top, l[1] && "bottom" === l[1].toLowerCase() && (s += c[0].getBoundingClientRect().height)
                    }
                    r[o] = s
                }
                this.points = r
            }
        }, {
            key: "_events", value: function (e) {
                var n = this, i = this.scrollListener = "scroll.zf." + e;
                this.isOn || (this.canStick && (this.isOn = !0, t(window).off(i).on(i, function (t) {
                    0 === n.scrollCount ? (n.scrollCount = n.options.checkEvery, n._setSizes(function () {
                        n._calc(!1, window.pageYOffset)
                    })) : (n.scrollCount--, n._calc(!1, window.pageYOffset))
                })), this.$element.off("resizeme.zf.trigger").on("resizeme.zf.trigger", function (t, r) {
                    n._setSizes(function () {
                        n._calc(!1), n.canStick ? n.isOn || n._events(e) : n.isOn && n._pauseListeners(i)
                    })
                }))
            }
        }, {
            key: "_pauseListeners", value: function (e) {
                this.isOn = !1, t(window).off(e), this.$element.trigger("pause.zf.sticky")
            }
        }, {
            key: "_calc", value: function (t, e) {
                return t && this._setSizes(), this.canStick ? (e || (e = window.pageYOffset), void (e >= this.topPoint ? e <= this.bottomPoint ? this.isStuck || this._setSticky() : this.isStuck && this._removeSticky(!1) : this.isStuck && this._removeSticky(!0))) : (this.isStuck && this._removeSticky(!0), !1)
            }
        }, {
            key: "_setSticky", value: function () {
                var t = this, e = this.options.stickTo, n = "top" === e ? "marginTop" : "marginBottom",
                    i = "top" === e ? "bottom" : "top", r = {};
                r[n] = this.options[n] + "em", r[e] = 0, r[i] = "auto", this.isStuck = !0, this.$element.removeClass("is-anchored is-at-" + i).addClass("is-stuck is-at-" + e).css(r).trigger("sticky.zf.stuckto:" + e), this.$element.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function () {
                    t._setSizes()
                })
            }
        }, {
            key: "_removeSticky", value: function (t) {
                var e = this.options.stickTo, n = "top" === e, i = {},
                    r = (this.points ? this.points[1] - this.points[0] : this.anchorHeight) - this.elemHeight,
                    o = n ? "marginTop" : "marginBottom", a = t ? "top" : "bottom";
                i[o] = 0, i.bottom = "auto", t ? i.top = 0 : i.top = r, this.isStuck = !1, this.$element.removeClass("is-stuck is-at-" + e).addClass("is-anchored is-at-" + a).css(i).trigger("sticky.zf.unstuckfrom:" + a)
            }
        }, {
            key: "_setSizes", value: function (t) {
                this.canStick = Foundation.MediaQuery.is(this.options.stickyOn), this.canStick || t && "function" == typeof t && t();
                var e = this.$container[0].getBoundingClientRect().width,
                    n = window.getComputedStyle(this.$container[0]), i = parseInt(n["padding-left"], 10),
                    r = parseInt(n["padding-right"], 10);
                this.$anchor && this.$anchor.length ? this.anchorHeight = this.$anchor[0].getBoundingClientRect().height : this._parsePoints(), this.$element.css({"max-width": e - i - r + "px"});
                var o = this.$element[0].getBoundingClientRect().height || this.containerHeight;
                if ("none" == this.$element.css("display") && (o = 0), this.containerHeight = o, this.$container.css({height: o}), this.elemHeight = o, !this.isStuck && this.$element.hasClass("is-at-bottom")) {
                    var a = (this.points ? this.points[1] - this.$container.offset().top : this.anchorHeight) - this.elemHeight;
                    this.$element.css("top", a)
                }
                this._setBreakPoints(o, function () {
                    t && "function" == typeof t && t()
                })
            }
        }, {
            key: "_setBreakPoints", value: function (t, n) {
                if (!this.canStick) {
                    if (!n || "function" != typeof n) return !1;
                    n()
                }
                var i = e(this.options.marginTop), r = e(this.options.marginBottom),
                    o = this.points ? this.points[0] : this.$anchor.offset().top,
                    a = this.points ? this.points[1] : o + this.anchorHeight, s = window.innerHeight;
                "top" === this.options.stickTo ? (o -= i, a -= t + i) : "bottom" === this.options.stickTo && (o -= s - (t + r), a -= s - r), this.topPoint = o, this.bottomPoint = a, n && "function" == typeof n && n()
            }
        }, {
            key: "destroy", value: function () {
                this._removeSticky(!0), this.$element.removeClass(this.options.stickyClass + " is-anchored is-at-top").css({
                    height: "",
                    top: "",
                    bottom: "",
                    "max-width": ""
                }).off("resizeme.zf.trigger"), this.$anchor && this.$anchor.length && this.$anchor.off("change.zf.sticky"), t(window).off(this.scrollListener), this.wasWrapped ? this.$element.unwrap() : this.$container.removeClass(this.options.containerClass).css({height: ""}), Foundation.unregisterPlugin(this)
            }
        }]), n
    }();
    n.defaults = {
        container: "<div data-sticky-container></div>",
        stickTo: "top",
        anchor: "",
        topAnchor: "",
        btmAnchor: "",
        marginTop: 1,
        marginBottom: 1,
        stickyOn: "medium",
        stickyClass: "sticky",
        containerClass: "sticky-container",
        checkEvery: -1
    }, Foundation.plugin(n, "Sticky")
}(jQuery), !function (t) {
    var e = function () {
        function e(n, i) {
            _classCallCheck(this, e), this.$element = n, this.options = t.extend({}, e.defaults, this.$element.data(), i), this.isActive = !1, this.isClick = !1, this._init(), Foundation.registerPlugin(this, "Tooltip")
        }

        return _createClass(e, [{
            key: "_init", value: function () {
                var e = this.$element.attr("aria-describedby") || Foundation.GetYoDigits(6, "tooltip");
                this.options.positionClass = this.options.positionClass || this._getPositionClass(this.$element), this.options.tipText = this.options.tipText || this.$element.attr("title"), this.template = this.options.template ? t(this.options.template) : this._buildTemplate(e), this.options.allowHtml ? this.template.appendTo(document.body).html(this.options.tipText).hide() : this.template.appendTo(document.body).text(this.options.tipText).hide(), this.$element.attr({
                    title: "",
                    "aria-describedby": e,
                    "data-yeti-box": e,
                    "data-toggle": e,
                    "data-resize": e
                }).addClass(this.options.triggerClass), this.usedPositions = [], this.counter = 4,
                    this.classChanged = !1, this._events()
            }
        }, {
            key: "_getPositionClass", value: function (t) {
                if (!t) return "";
                var e = t[0].className.match(/\b(top|left|right)\b/g);
                return e = e ? e[0] : ""
            }
        }, {
            key: "_buildTemplate", value: function (e) {
                var n = (this.options.tooltipClass + " " + this.options.positionClass + " " + this.options.templateClasses).trim(),
                    i = t("<div></div>").addClass(n).attr({
                        role: "tooltip",
                        "aria-hidden": !0,
                        "data-is-active": !1,
                        "data-is-focus": !1,
                        id: e
                    });
                return i
            }
        }, {
            key: "_reposition", value: function (t) {
                this.usedPositions.push(t ? t : "bottom"), !t && this.usedPositions.indexOf("top") < 0 ? this.template.addClass("top") : "top" === t && this.usedPositions.indexOf("bottom") < 0 ? this.template.removeClass(t) : "left" === t && this.usedPositions.indexOf("right") < 0 ? this.template.removeClass(t).addClass("right") : "right" === t && this.usedPositions.indexOf("left") < 0 ? this.template.removeClass(t).addClass("left") : !t && this.usedPositions.indexOf("top") > -1 && this.usedPositions.indexOf("left") < 0 ? this.template.addClass("left") : "top" === t && this.usedPositions.indexOf("bottom") > -1 && this.usedPositions.indexOf("left") < 0 ? this.template.removeClass(t).addClass("left") : "left" === t && this.usedPositions.indexOf("right") > -1 && this.usedPositions.indexOf("bottom") < 0 ? this.template.removeClass(t) : "right" === t && this.usedPositions.indexOf("left") > -1 && this.usedPositions.indexOf("bottom") < 0 ? this.template.removeClass(t) : this.template.removeClass(t), this.classChanged = !0, this.counter--
            }
        }, {
            key: "_setPosition", value: function () {
                var t = this._getPositionClass(this.template), e = Foundation.Box.GetDimensions(this.template),
                    n = Foundation.Box.GetDimensions(this.$element),
                    i = "left" === t ? "left" : "right" === t ? "left" : "top", r = "top" === i ? "height" : "width";
                if ("height" === r ? this.options.vOffset : this.options.hOffset, e.width >= e.windowDims.width || !this.counter && !Foundation.Box.ImNotTouchingYou(this.template)) return this.template.offset(Foundation.Box.GetOffsets(this.template, this.$element, "center bottom", this.options.vOffset, this.options.hOffset, !0)).css({
                    width: n.windowDims.width - 2 * this.options.hOffset,
                    height: "auto"
                }), !1;
                for (this.template.offset(Foundation.Box.GetOffsets(this.template, this.$element, "center " + (t || "bottom"), this.options.vOffset, this.options.hOffset)); !Foundation.Box.ImNotTouchingYou(this.template) && this.counter;) this._reposition(t), this._setPosition()
            }
        }, {
            key: "show", value: function () {
                if ("all" !== this.options.showOn && !Foundation.MediaQuery.is(this.options.showOn)) return !1;
                var t = this;
                this.template.css("visibility", "hidden").show(), this._setPosition(), this.$element.trigger("closeme.zf.tooltip", this.template.attr("id")), this.template.attr({
                    "data-is-active": !0,
                    "aria-hidden": !1
                }), t.isActive = !0, this.template.stop().hide().css("visibility", "").fadeIn(this.options.fadeInDuration, function () {
                }), this.$element.trigger("show.zf.tooltip")
            }
        }, {
            key: "hide", value: function () {
                var t = this;
                this.template.stop().attr({
                    "aria-hidden": !0,
                    "data-is-active": !1
                }).fadeOut(this.options.fadeOutDuration, function () {
                    t.isActive = !1, t.isClick = !1, t.classChanged && (t.template.removeClass(t._getPositionClass(t.template)).addClass(t.options.positionClass), t.usedPositions = [], t.counter = 4, t.classChanged = !1)
                }), this.$element.trigger("hide.zf.tooltip")
            }
        }, {
            key: "_events", value: function () {
                var t = this, e = (this.template, !1);
                this.options.disableHover || this.$element.on("mouseenter.zf.tooltip", function (e) {
                    t.isActive || (t.timeout = setTimeout(function () {
                        t.show()
                    }, t.options.hoverDelay))
                }).on("mouseleave.zf.tooltip", function (n) {
                    clearTimeout(t.timeout), (!e || t.isClick && !t.options.clickOpen) && t.hide()
                }), this.options.clickOpen ? this.$element.on("mousedown.zf.tooltip", function (e) {
                    e.stopImmediatePropagation(), t.isClick || (t.isClick = !0, !t.options.disableHover && t.$element.attr("tabindex") || t.isActive || t.show())
                }) : this.$element.on("mousedown.zf.tooltip", function (e) {
                    e.stopImmediatePropagation(), t.isClick = !0
                }), this.options.disableForTouch || this.$element.on("tap.zf.tooltip touchend.zf.tooltip", function (e) {
                    t.isActive ? t.hide() : t.show()
                }), this.$element.on({"close.zf.trigger": this.hide.bind(this)}), this.$element.on("focus.zf.tooltip", function (n) {
                    return e = !0, t.isClick ? (t.options.clickOpen || (e = !1), !1) : void t.show()
                }).on("focusout.zf.tooltip", function (n) {
                    e = !1, t.isClick = !1, t.hide()
                }).on("resizeme.zf.trigger", function () {
                    t.isActive && t._setPosition()
                })
            }
        }, {
            key: "toggle", value: function () {
                this.isActive ? this.hide() : this.show()
            }
        }, {
            key: "destroy", value: function () {
                this.$element.attr("title", this.template.text()).off(".zf.trigger .zf.tooltip").removeClass("has-tip top right left").removeAttr("aria-describedby aria-haspopup data-disable-hover data-resize data-toggle data-tooltip data-yeti-box"), this.template.remove(), Foundation.unregisterPlugin(this)
            }
        }]), e
    }();
    e.defaults = {
        disableForTouch: !1,
        hoverDelay: 200,
        fadeInDuration: 150,
        fadeOutDuration: 150,
        disableHover: !1,
        templateClasses: "",
        tooltipClass: "tooltip",
        triggerClass: "has-tip",
        showOn: "small",
        template: "",
        tipText: "",
        touchCloseText: "Tap to close.",
        clickOpen: !0,
        positionClass: "",
        vOffset: 10,
        hOffset: 12,
        allowHtml: !1
    }, Foundation.plugin(e, "Tooltip")
}(jQuery), !function (t) {
    function e(t, e) {
        return t / e
    }

    function n(t, e, n, i) {
        return Math.abs(t.position()[e] + t[i]() / 2 - n)
    }

    function i(t, e) {
        return Math.log(e) / Math.log(t)
    }

    var r = function () {
        function r(e, n) {
            _classCallCheck(this, r), this.$element = e, this.options = t.extend({}, r.defaults, this.$element.data(), n), this._init(), Foundation.registerPlugin(this, "Slider"), Foundation.Keyboard.register("Slider", {
                ltr: {
                    ARROW_RIGHT: "increase",
                    ARROW_UP: "increase",
                    ARROW_DOWN: "decrease",
                    ARROW_LEFT: "decrease",
                    SHIFT_ARROW_RIGHT: "increase_fast",
                    SHIFT_ARROW_UP: "increase_fast",
                    SHIFT_ARROW_DOWN: "decrease_fast",
                    SHIFT_ARROW_LEFT: "decrease_fast"
                },
                rtl: {
                    ARROW_LEFT: "increase",
                    ARROW_RIGHT: "decrease",
                    SHIFT_ARROW_LEFT: "increase_fast",
                    SHIFT_ARROW_RIGHT: "decrease_fast"
                }
            })
        }

        return _createClass(r, [{
            key: "_init", value: function () {
                this.inputs = this.$element.find("input"), this.handles = this.$element.find("[data-slider-handle]"), this.$handle = this.handles.eq(0), this.$input = this.inputs.length ? this.inputs.eq(0) : t("#" + this.$handle.attr("aria-controls")), this.$fill = this.$element.find("[data-slider-fill]").css(this.options.vertical ? "height" : "width", 0);
                var e = !1;
                (this.options.disabled || this.$element.hasClass(this.options.disabledClass)) && (this.options.disabled = !0, this.$element.addClass(this.options.disabledClass)), this.inputs.length || (this.inputs = t().add(this.$input), this.options.binding = !0), this._setInitAttr(0), this.handles[1] && (this.options.doubleSided = !0, this.$handle2 = this.handles.eq(1), this.$input2 = this.inputs.length > 1 ? this.inputs.eq(1) : t("#" + this.$handle2.attr("aria-controls")), this.inputs[1] || (this.inputs = this.inputs.add(this.$input2)), e = !0, this._setInitAttr(1)), this.setHandles(), this._events()
            }
        }, {
            key: "setHandles", value: function () {
                var t = this;
                this.handles[1] ? this._setHandlePos(this.$handle, this.inputs.eq(0).val(), !0, function () {
                    t._setHandlePos(t.$handle2, t.inputs.eq(1).val(), !0)
                }) : this._setHandlePos(this.$handle, this.inputs.eq(0).val(), !0)
            }
        }, {
            key: "_reflow", value: function () {
                this.setHandles()
            }
        }, {
            key: "_pctOfBar", value: function (t) {
                var n = e(t - this.options.start, this.options.end - this.options.start);
                switch (this.options.positionValueFunction) {
                    case"pow":
                        n = this._logTransform(n);
                        break;
                    case"log":
                        n = this._powTransform(n)
                }
                return n.toFixed(2)
            }
        }, {
            key: "_value", value: function (t) {
                switch (this.options.positionValueFunction) {
                    case"pow":
                        t = this._powTransform(t);
                        break;
                    case"log":
                        t = this._logTransform(t)
                }
                var e = (this.options.end - this.options.start) * t + this.options.start;
                return e
            }
        }, {
            key: "_logTransform", value: function (t) {
                return i(this.options.nonLinearBase, t * (this.options.nonLinearBase - 1) + 1)
            }
        }, {
            key: "_powTransform", value: function (t) {
                return (Math.pow(this.options.nonLinearBase, t) - 1) / (this.options.nonLinearBase - 1)
            }
        }, {
            key: "_setHandlePos", value: function (t, n, i, r) {
                if (!this.$element.hasClass(this.options.disabledClass)) {
                    n = parseFloat(n), n < this.options.start ? n = this.options.start : n > this.options.end && (n = this.options.end);
                    var o = this.options.doubleSided;
                    if (o) if (0 === this.handles.index(t)) {
                        var a = parseFloat(this.$handle2.attr("aria-valuenow"));
                        n = n >= a ? a - this.options.step : n
                    } else {
                        var s = parseFloat(this.$handle.attr("aria-valuenow"));
                        n = n <= s ? s + this.options.step : n
                    }
                    this.options.vertical && !i && (n = this.options.end - n);
                    var l = this, c = this.options.vertical, u = c ? "height" : "width", d = c ? "top" : "left",
                        f = t[0].getBoundingClientRect()[u], h = this.$element[0].getBoundingClientRect()[u],
                        p = this._pctOfBar(n), m = (h - f) * p, g = (100 * e(m, h)).toFixed(this.options.decimal);
                    n = parseFloat(n.toFixed(this.options.decimal));
                    var v = {};
                    if (this._setValues(t, n), o) {
                        var y, $ = 0 === this.handles.index(t), w = ~~(100 * e(f, h));
                        if ($) v[d] = g + "%", y = parseFloat(this.$handle2[0].style[d]) - g + w, r && "function" == typeof r && r(); else {
                            var b = parseFloat(this.$handle[0].style[d]);
                            y = g - (isNaN(b) ? (this.options.initialStart - this.options.start) / ((this.options.end - this.options.start) / 100) : b) + w
                        }
                        v["min-" + u] = y + "%"
                    }
                    this.$element.one("finished.zf.animate", function () {
                        l.$element.trigger("moved.zf.slider", [t])
                    });
                    var x = this.$element.data("dragging") ? 1e3 / 60 : this.options.moveTime;
                    Foundation.Move(x, t, function () {
                        isNaN(g) ? t.css(d, 100 * p + "%") : t.css(d, g + "%"), l.options.doubleSided ? l.$fill.css(v) : l.$fill.css(u, 100 * p + "%")
                    }), clearTimeout(l.timeout), l.timeout = setTimeout(function () {
                        l.$element.trigger("changed.zf.slider", [t])
                    }, l.options.changedDelay)
                }
            }
        }, {
            key: "_setInitAttr", value: function (t) {
                var e = 0 === t ? this.options.initialStart : this.options.initialEnd,
                    n = this.inputs.eq(t).attr("id") || Foundation.GetYoDigits(6, "slider");
                this.inputs.eq(t).attr({
                    id: n,
                    max: this.options.end,
                    min: this.options.start,
                    step: this.options.step
                }), this.inputs.eq(t).val(e), this.handles.eq(t).attr({
                    role: "slider",
                    "aria-controls": n,
                    "aria-valuemax": this.options.end,
                    "aria-valuemin": this.options.start,
                    "aria-valuenow": e,
                    "aria-orientation": this.options.vertical ? "vertical" : "horizontal",
                    tabindex: 0
                })
            }
        }, {
            key: "_setValues", value: function (t, e) {
                var n = this.options.doubleSided ? this.handles.index(t) : 0;
                this.inputs.eq(n).val(e), t.attr("aria-valuenow", e)
            }
        }, {
            key: "_handleEvent", value: function (i, r, o) {
                var a, s;
                if (o) a = this._adjustValue(null, o), s = !0; else {
                    i.preventDefault();
                    var l = this, c = this.options.vertical, u = c ? "height" : "width", d = c ? "top" : "left",
                        f = c ? i.pageY : i.pageX,
                        h = (this.$handle[0].getBoundingClientRect()[u] / 2, this.$element[0].getBoundingClientRect()[u]),
                        p = c ? t(window).scrollTop() : t(window).scrollLeft(), m = this.$element.offset()[d];
                    i.clientY === i.pageY && (f += p);
                    var g, v = f - m;
                    g = v < 0 ? 0 : v > h ? h : v;
                    var y = e(g, h);
                    if (a = this._value(y), Foundation.rtl() && !this.options.vertical && (a = this.options.end - a), a = l._adjustValue(null, a), s = !1, !r) {
                        var $ = n(this.$handle, d, g, u), w = n(this.$handle2, d, g, u);
                        r = $ <= w ? this.$handle : this.$handle2
                    }
                }
                this._setHandlePos(r, a, s)
            }
        }, {
            key: "_adjustValue", value: function (t, e) {
                var n, i, r, o, a = this.options.step, s = parseFloat(a / 2);
                return n = t ? parseFloat(t.attr("aria-valuenow")) : e, i = n % a, r = n - i, o = r + a, 0 === i ? n : n = n >= r + s ? o : r
            }
        }, {
            key: "_events", value: function () {
                this._eventsForHandle(this.$handle), this.handles[1] && this._eventsForHandle(this.$handle2)
            }
        }, {
            key: "_eventsForHandle", value: function (e) {
                var n, i = this;
                if (this.inputs.off("change.zf.slider").on("change.zf.slider", function (e) {
                    var n = i.inputs.index(t(this));
                    i._handleEvent(e, i.handles.eq(n), t(this).val())
                }), this.options.clickSelect && this.$element.off("click.zf.slider").on("click.zf.slider", function (e) {
                    return !i.$element.data("dragging") && void (t(e.target).is("[data-slider-handle]") || (i.options.doubleSided ? i._handleEvent(e) : i._handleEvent(e, i.$handle)))
                }), this.options.draggable) {
                    this.handles.addTouch();
                    var r = t("body");
                    e.off("mousedown.zf.slider").on("mousedown.zf.slider", function (o) {
                        e.addClass("is-dragging"), i.$fill.addClass("is-dragging"), i.$element.data("dragging", !0), n = t(o.currentTarget), r.on("mousemove.zf.slider", function (t) {
                            t.preventDefault(), i._handleEvent(t, n)
                        }).on("mouseup.zf.slider", function (t) {
                            i._handleEvent(t, n), e.removeClass("is-dragging"), i.$fill.removeClass("is-dragging"), i.$element.data("dragging", !1), r.off("mousemove.zf.slider mouseup.zf.slider")
                        })
                    }).on("selectstart.zf.slider touchmove.zf.slider", function (t) {
                        t.preventDefault()
                    })
                }
                e.off("keydown.zf.slider").on("keydown.zf.slider", function (e) {
                    var n, r = t(this), o = i.options.doubleSided ? i.handles.index(r) : 0,
                        a = parseFloat(i.inputs.eq(o).val());
                    Foundation.Keyboard.handleKey(e, "Slider", {
                        decrease: function () {
                            n = a - i.options.step
                        }, increase: function () {
                            n = a + i.options.step
                        }, decrease_fast: function () {
                            n = a - 10 * i.options.step
                        }, increase_fast: function () {
                            n = a + 10 * i.options.step
                        }, handled: function () {
                            e.preventDefault(), i._setHandlePos(r, n, !0)
                        }
                    })
                })
            }
        }, {
            key: "destroy", value: function () {
                this.handles.off(".zf.slider"), this.inputs.off(".zf.slider"), this.$element.off(".zf.slider"), clearTimeout(this.timeout), Foundation.unregisterPlugin(this)
            }
        }]), r
    }();
    r.defaults = {
        start: 0,
        end: 100,
        step: 1,
        initialStart: 0,
        initialEnd: 100,
        binding: !1,
        clickSelect: !0,
        vertical: !1,
        draggable: !0,
        disabled: !1,
        doubleSided: !1,
        decimal: 2,
        moveTime: 200,
        disabledClass: "disabled",
        invertVertical: !1,
        changedDelay: 500,
        nonLinearBase: 5,
        positionValueFunction: "linear"
    }, Foundation.plugin(r, "Slider")
}(jQuery), !function (t) {
    function e(t, e, i, r) {
        var o, a, s, l, c = n(t);
        if (e) {
            var u = n(e);
            a = c.offset.top + c.height <= u.height + u.offset.top, o = c.offset.top >= u.offset.top, s = c.offset.left >= u.offset.left, l = c.offset.left + c.width <= u.width + u.offset.left
        } else a = c.offset.top + c.height <= c.windowDims.height + c.windowDims.offset.top, o = c.offset.top >= c.windowDims.offset.top, s = c.offset.left >= c.windowDims.offset.left, l = c.offset.left + c.width <= c.windowDims.width;
        var d = [a, o, s, l];
        return i ? s === l == 1 : r ? o === a == 1 : d.indexOf(!1) === -1
    }

    function n(t, e) {
        if (t = t.length ? t[0] : t, t === window || t === document) throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
        var n = t.getBoundingClientRect(), i = t.parentNode.getBoundingClientRect(),
            r = document.body.getBoundingClientRect(), o = window.pageYOffset, a = window.pageXOffset;
        return {
            width: n.width,
            height: n.height,
            offset: {top: n.top + o, left: n.left + a},
            parentDims: {width: i.width, height: i.height, offset: {top: i.top + o, left: i.left + a}},
            windowDims: {width: r.width, height: r.height, offset: {top: o, left: a}}
        }
    }

    function i(t, e, i, r, o, a) {
        var s = n(t), l = e ? n(e) : null;
        switch (i) {
            case"top":
                return {
                    left: Foundation.rtl() ? l.offset.left - s.width + l.width : l.offset.left,
                    top: l.offset.top - (s.height + r)
                };
            case"left":
                return {left: l.offset.left - (s.width + o), top: l.offset.top};
            case"right":
                return {left: l.offset.left + l.width + o, top: l.offset.top};
            case"center top":
                return {left: l.offset.left + l.width / 2 - s.width / 2, top: l.offset.top - (s.height + r)};
            case"center bottom":
                return {left: a ? o : l.offset.left + l.width / 2 - s.width / 2, top: l.offset.top + l.height + r};
            case"center left":
                return {left: l.offset.left - (s.width + o), top: l.offset.top + l.height / 2 - s.height / 2};
            case"center right":
                return {left: l.offset.left + l.width + o + 1, top: l.offset.top + l.height / 2 - s.height / 2};
            case"center":
                return {
                    left: s.windowDims.offset.left + s.windowDims.width / 2 - s.width / 2,
                    top: s.windowDims.offset.top + s.windowDims.height / 2 - s.height / 2
                };
            case"reveal":
                return {left: (s.windowDims.width - s.width) / 2, top: s.windowDims.offset.top + r};
            case"reveal full":
                return {left: s.windowDims.offset.left, top: s.windowDims.offset.top};
            case"left bottom":
                return {left: l.offset.left, top: l.offset.top + l.height + r};
            case"right bottom":
                return {left: l.offset.left + l.width + o - s.width, top: l.offset.top + l.height + r};
            default:
                return {
                    left: Foundation.rtl() ? l.offset.left - s.width + l.width : l.offset.left + o,
                    top: l.offset.top + l.height + r
                }
        }
    }

    Foundation.Box = {ImNotTouchingYou: e, GetDimensions: n, GetOffsets: i}
}(jQuery), !function (t) {
    function e(t) {
        var e = {};
        for (var n in t) e[t[n]] = t[n];
        return e
    }

    var n = {
        9: "TAB",
        13: "ENTER",
        27: "ESCAPE",
        32: "SPACE",
        37: "ARROW_LEFT",
        38: "ARROW_UP",
        39: "ARROW_RIGHT",
        40: "ARROW_DOWN"
    }, i = {}, r = {
        keys: e(n), parseKey: function (t) {
            var e = n[t.which || t.keyCode] || String.fromCharCode(t.which).toUpperCase();
            return e = e.replace(/\W+/, ""), t.shiftKey && (e = "SHIFT_" + e), t.ctrlKey && (e = "CTRL_" + e), t.altKey && (e = "ALT_" + e), e = e.replace(/_$/, "")
        }, handleKey: function (e, n, r) {
            var o, a, s, l = i[n], c = this.parseKey(e);
            if (l) if (o = "undefined" == typeof l.ltr ? l : Foundation.rtl() ? t.extend({}, l.ltr, l.rtl) : t.extend({}, l.rtl, l.ltr), a = o[c], s = r[a], s && "function" == typeof s) {
                var u = s.apply();
                (r.handled || "function" == typeof r.handled) && r.handled(u)
            } else (r.unhandled || "function" == typeof r.unhandled) && r.unhandled()
        }, findFocusable: function (e) {
            return !!e && e.find("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]").filter(function () {
                return !(!t(this).is(":visible") || t(this).attr("tabindex") < 0)
            })
        }, register: function (t, e) {
            i[t] = e
        }, trapFocus: function (t) {
            var e = Foundation.Keyboard.findFocusable(t), n = e.eq(0), i = e.eq(-1);
            t.on("keydown.zf.trapfocus", function (t) {
                t.target === i[0] && "TAB" === Foundation.Keyboard.parseKey(t) ? (t.preventDefault(), n.focus()) : t.target === n[0] && "SHIFT_TAB" === Foundation.Keyboard.parseKey(t) && (t.preventDefault(), i.focus())
            })
        }, releaseFocus: function (t) {
            t.off("keydown.zf.trapfocus")
        }
    };
    Foundation.Keyboard = r
}(jQuery), !function (t) {
    function e(t) {
        var e = {};
        return "string" != typeof t ? e : (t = t.trim().slice(1, -1)) ? e = t.split("&").reduce(function (t, e) {
            var n = e.replace(/\+/g, " ").split("="), i = n[0], r = n[1];
            return i = decodeURIComponent(i), r = void 0 === r ? null : decodeURIComponent(r), t.hasOwnProperty(i) ? Array.isArray(t[i]) ? t[i].push(r) : t[i] = [t[i], r] : t[i] = r, t
        }, {}) : e
    }

    var n = {
        queries: [], current: "", _init: function () {
            var n, i = this, r = t(".foundation-mq").css("font-family");
            n = e(r);
            for (var o in n) n.hasOwnProperty(o) && i.queries.push({
                name: o,
                value: "only screen and (min-width: " + n[o] + ")"
            });
            this.current = this._getCurrentSize(), this._watcher()
        }, atLeast: function (t) {
            var e = this.get(t);
            return !!e && window.matchMedia(e).matches
        }, is: function (t) {
            return t = t.trim().split(" "), t.length > 1 && "only" === t[1] ? t[0] === this._getCurrentSize() : this.atLeast(t[0])
        }, get: function (t) {
            for (var e in this.queries) if (this.queries.hasOwnProperty(e)) {
                var n = this.queries[e];
                if (t === n.name) return n.value
            }
            return null
        }, _getCurrentSize: function () {
            for (var t, e = 0; e < this.queries.length; e++) {
                var n = this.queries[e];
                window.matchMedia(n.value).matches && (t = n)
            }
            return "object" === ("undefined" == typeof t ? "undefined" : _typeof(t)) ? t.name : t
        }, _watcher: function () {
            var e = this;
            t(window).on("resize.zf.mediaquery", function () {
                var n = e._getCurrentSize(), i = e.current;
                n !== i && (e.current = n, t(window).trigger("changed.zf.mediaquery", [n, i]))
            })
        }
    };
    Foundation.MediaQuery = n, window.matchMedia || (window.matchMedia = function () {
        var t = window.styleMedia || window.media;
        if (!t) {
            var e = document.createElement("style"), n = document.getElementsByTagName("script")[0], i = null;
            e.type = "text/css", e.id = "matchmediajs-test", n && n.parentNode && n.parentNode.insertBefore(e, n), i = "getComputedStyle" in window && window.getComputedStyle(e, null) || e.currentStyle, t = {
                matchMedium: function (t) {
                    var n = "@media " + t + "{ #matchmediajs-test { width: 1px; } }";
                    return e.styleSheet ? e.styleSheet.cssText = n : e.textContent = n, "1px" === i.width
                }
            }
        }
        return function (e) {
            return {matches: t.matchMedium(e || "all"), media: e || "all"}
        }
    }()), Foundation.MediaQuery = n
}(jQuery), function (t) {
    function e() {
        this.removeEventListener("touchmove", n), this.removeEventListener("touchend", e), c = !1
    }

    function n(n) {
        if (t.spotSwipe.preventDefault && n.preventDefault(), c) {
            var i, r = n.touches[0].pageX, a = (n.touches[0].pageY, o - r);
            l = (new Date).getTime() - s, Math.abs(a) >= t.spotSwipe.moveThreshold && l <= t.spotSwipe.timeThreshold && (i = a > 0 ? "left" : "right"), i && (n.preventDefault(), e.call(this), t(this).trigger("swipe", i).trigger("swipe" + i))
        }
    }

    function i(t) {
        1 == t.touches.length && (o = t.touches[0].pageX, a = t.touches[0].pageY, c = !0, s = (new Date).getTime(), this.addEventListener("touchmove", n, !1), this.addEventListener("touchend", e, !1))
    }

    function r() {
        this.addEventListener && this.addEventListener("touchstart", i, !1)
    }

    t.spotSwipe = {
        version: "1.0.0",
        enabled: "ontouchstart" in document.documentElement,
        preventDefault: !1,
        moveThreshold: 75,
        timeThreshold: 200
    };
    var o, a, s, l, c = !1;
    t.event.special.swipe = {setup: r}, t.each(["left", "up", "down", "right"], function () {
        t.event.special["swipe" + this] = {
            setup: function () {
                t(this).on("swipe", t.noop)
            }
        }
    })
}(jQuery), !function (t) {
    t.fn.addTouch = function () {
        this.each(function (n, i) {
            t(i).bind("touchstart touchmove touchend touchcancel", function () {
                e(event)
            })
        });
        var e = function (t) {
            var e, n = t.changedTouches, i = n[0],
                r = {touchstart: "mousedown", touchmove: "mousemove", touchend: "mouseup"}, o = r[t.type];
            "MouseEvent" in window && "function" == typeof window.MouseEvent ? e = new window.MouseEvent(o, {
                bubbles: !0,
                cancelable: !0,
                screenX: i.screenX,
                screenY: i.screenY,
                clientX: i.clientX,
                clientY: i.clientY
            }) : (e = document.createEvent("MouseEvent"), e.initMouseEvent(o, !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null)), i.target.dispatchEvent(e)
        }
    }
}(jQuery), !function (t) {
    function e() {
        a(), i(), r(), o(), n()
    }

    function n(e) {
        var n = t("[data-yeti-box]"), i = ["dropdown", "tooltip", "reveal"];
        if (e && ("string" == typeof e ? i.push(e) : "object" === ("undefined" == typeof e ? "undefined" : _typeof(e)) && "string" == typeof e[0] && i.concat(e)), n.length) {
            var r = i.map(function (t) {
                return "closeme.zf." + t
            }).join(" ");
            t(window).off(r).on(r, function (e, n) {
                var i = e.namespace.split(".")[0], r = t("[data-" + i + "]").not('[data-yeti-box="' + n + '"]');
                r.each(function () {
                    var e = t(this);
                    e.triggerHandler("close.zf.trigger", [e])
                })
            })
        }
    }

    function i(e) {
        var n = void 0, i = t("[data-resize]");
        i.length && t(window).off("resize.zf.trigger").on("resize.zf.trigger", function (r) {
            n && clearTimeout(n), n = setTimeout(function () {
                s || i.each(function () {
                    t(this).triggerHandler("resizeme.zf.trigger")
                }), i.attr("data-events", "resize")
            }, e || 10)
        })
    }

    function r(e) {
        var n = void 0, i = t("[data-scroll]");
        i.length && t(window).off("scroll.zf.trigger").on("scroll.zf.trigger", function (r) {
            n && clearTimeout(n), n = setTimeout(function () {
                s || i.each(function () {
                    t(this).triggerHandler("scrollme.zf.trigger")
                }), i.attr("data-events", "scroll")
            }, e || 10)
        })
    }

    function o(e) {
        var n = t("[data-mutate]");
        n.length && s && n.each(function () {
            t(this).triggerHandler("mutateme.zf.trigger")
        })
    }

    function a() {
        if (!s) return !1;
        var e = document.querySelectorAll("[data-resize], [data-scroll], [data-mutate]"), n = function (e) {
            var n = t(e[0].target);
            switch (e[0].type) {
                case"attributes":
                    "scroll" === n.attr("data-events") && "data-events" === e[0].attributeName && n.triggerHandler("scrollme.zf.trigger", [n, window.pageYOffset]), "resize" === n.attr("data-events") && "data-events" === e[0].attributeName && n.triggerHandler("resizeme.zf.trigger", [n]), "style" === e[0].attributeName && (n.closest("[data-mutate]").attr("data-events", "mutate"), n.closest("[data-mutate]").triggerHandler("mutateme.zf.trigger", [n.closest("[data-mutate]")]));
                    break;
                case"childList":
                    n.closest("[data-mutate]").attr("data-events", "mutate"), n.closest("[data-mutate]").triggerHandler("mutateme.zf.trigger", [n.closest("[data-mutate]")]);
                    break;
                default:
                    return !1
            }
        };
        if (e.length) for (var i = 0; i <= e.length - 1; i++) {
            var r = new s(n);
            r.observe(e[i], {
                attributes: !0,
                childList: !0,
                characterData: !1,
                subtree: !0,
                attributeFilter: ["data-events", "style"]
            })
        }
    }

    var s = function () {
        for (var t = ["WebKit", "Moz", "O", "Ms", ""], e = 0; e < t.length; e++) if (t[e] + "MutationObserver" in window) return window[t[e] + "MutationObserver"];
        return !1
    }(), l = function (e, n) {
        e.data(n).split(" ").forEach(function (i) {
            t("#" + i)["close" === n ? "trigger" : "triggerHandler"](n + ".zf.trigger", [e])
        })
    };
    t(document).on("click.zf.trigger", "[data-open]", function () {
        l(t(this), "open")
    }), t(document).on("click.zf.trigger", "[data-close]", function () {
        var e = t(this).data("close");
        e ? l(t(this), "close") : t(this).trigger("close.zf.trigger")
    }), t(document).on("click.zf.trigger", "[data-toggle]", function () {
        var e = t(this).data("toggle");
        e ? l(t(this), "toggle") : t(this).trigger("toggle.zf.trigger")
    }), t(document).on("close.zf.trigger", "[data-closable]", function (e) {
        e.stopPropagation();
        var n = t(this).data("closable");
        "" !== n ? Foundation.Motion.animateOut(t(this), n, function () {
            t(this).trigger("closed.zf")
        }) : t(this).fadeOut().trigger("closed.zf")
    }), t(document).on("focus.zf.trigger blur.zf.trigger", "[data-toggle-focus]", function () {
        var e = t(this).data("toggle-focus");
        t("#" + e).triggerHandler("toggle.zf.trigger", [t(this)])
    }), t(window).on("load", function () {
        e()
    }), Foundation.IHearYou = e
}(jQuery), !function (t) {
    function e(t, e, n) {
        function i(s) {
            a || (a = s), o = s - a, n.apply(e), o < t ? r = window.requestAnimationFrame(i, e) : (window.cancelAnimationFrame(r), e.trigger("finished.zf.animate", [e]).triggerHandler("finished.zf.animate", [e]))
        }

        var r, o, a = null;
        return 0 === t ? (n.apply(e), void e.trigger("finished.zf.animate", [e]).triggerHandler("finished.zf.animate", [e])) : void (r = window.requestAnimationFrame(i))
    }

    function n(e, n, o, a) {
        function s() {
            e || n.hide(), l(), a && a.apply(n)
        }

        function l() {
            n[0].style.transitionDuration = 0, n.removeClass(c + " " + u + " " + o)
        }

        if (n = t(n).eq(0), n.length) {
            var c = e ? i[0] : i[1], u = e ? r[0] : r[1];
            l(), n.addClass(o).css("transition", "none"), requestAnimationFrame(function () {
                n.addClass(c), e && n.show()
            }), requestAnimationFrame(function () {
                n[0].offsetWidth, n.css("transition", "").addClass(u)
            }), n.one(Foundation.transitionend(n), s)
        }
    }

    var i = ["mui-enter", "mui-leave"], r = ["mui-enter-active", "mui-leave-active"], o = {
        animateIn: function (t, e, i) {
            n(!0, t, e, i)
        }, animateOut: function (t, e, i) {
            n(!1, t, e, i)
        }
    };
    Foundation.Move = e, Foundation.Motion = o
}(jQuery), !function (t) {
    var e = function () {
        function e(n, i) {
            _classCallCheck(this, e), this.$element = n, this.options = t.extend({}, e.defaults, this.$element.data(), i), this._init(), Foundation.registerPlugin(this, "Accordion"), Foundation.Keyboard.register("Accordion", {
                ENTER: "toggle",
                SPACE: "toggle",
                ARROW_DOWN: "next",
                ARROW_UP: "previous"
            })
        }

        return _createClass(e, [{
            key: "_init", value: function () {
                this.$element.attr("role", "tablist"), this.$tabs = this.$element.children("[data-accordion-item]"), this.$tabs.each(function (e, n) {
                    var i = t(n), r = i.children("[data-tab-content]"),
                        o = r[0].id || Foundation.GetYoDigits(6, "accordion"), a = n.id || o + "-label";
                    i.find("a:first").attr({
                        "aria-controls": o,
                        role: "tab",
                        id: a,
                        "aria-expanded": !1,
                        "aria-selected": !1
                    }), r.attr({role: "tabpanel", "aria-labelledby": a, "aria-hidden": !0, id: o})
                });
                var e = this.$element.find(".is-active").children("[data-tab-content]");
                e.length && this.down(e, !0), this._events()
            }
        }, {
            key: "_events", value: function () {
                var e = this;
                this.$tabs.each(function () {
                    var n = t(this), i = n.children("[data-tab-content]");
                    i.length && n.children("a").off("click.zf.accordion keydown.zf.accordion").on("click.zf.accordion", function (t) {
                        t.preventDefault(), e.toggle(i)
                    }).on("keydown.zf.accordion", function (t) {
                        Foundation.Keyboard.handleKey(t, "Accordion", {
                            toggle: function () {
                                e.toggle(i)
                            }, next: function () {
                                var t = n.next().find("a").focus();
                                e.options.multiExpand || t.trigger("click.zf.accordion")
                            }, previous: function () {
                                var t = n.prev().find("a").focus();
                                e.options.multiExpand || t.trigger("click.zf.accordion")
                            }, handled: function () {
                                t.preventDefault(), t.stopPropagation()
                            }
                        })
                    })
                })
            }
        }, {
            key: "toggle", value: function (t) {
                t.parent().hasClass("is-active") ? this.up(t) : this.down(t)
            }
        }, {
            key: "down", value: function (e, n) {
                var i = this;
                if (e.attr("aria-hidden", !1).parent("[data-tab-content]").addBack().parent().addClass("is-active"), !this.options.multiExpand && !n) {
                    var r = this.$element.children(".is-active").children("[data-tab-content]");
                    r.length && this.up(r.not(e))
                }
                e.slideDown(this.options.slideSpeed, function () {
                    i.$element.trigger("down.zf.accordion", [e])
                }), t("#" + e.attr("aria-labelledby")).attr({"aria-expanded": !0, "aria-selected": !0})
            }
        }, {
            key: "up", value: function (e) {
                var n = e.parent().siblings(), i = this;
                (this.options.allowAllClosed || n.hasClass("is-active")) && e.parent().hasClass("is-active") && (e.slideUp(i.options.slideSpeed, function () {
                    i.$element.trigger("up.zf.accordion", [e])
                }), e.attr("aria-hidden", !0).parent().removeClass("is-active"), t("#" + e.attr("aria-labelledby")).attr({
                    "aria-expanded": !1,
                    "aria-selected": !1
                }))
            }
        }, {
            key: "destroy", value: function () {
                this.$element.find("[data-tab-content]").stop(!0).slideUp(0).css("display", ""), this.$element.find("a").off(".zf.accordion"), Foundation.unregisterPlugin(this)
            }
        }]), e
    }();
    e.defaults = {slideSpeed: 250, multiExpand: !1, allowAllClosed: !1}, Foundation.plugin(e, "Accordion")
}(jQuery), motocard.bootstrap = function () {
    "use strict";
    angular.module("motocard", motocard.angularModules).service("MotoLoaderService", function () {
        var t = this;
        t.status = {active: !1}, t.delay = 2e3, t.setLoaderActive = function (e) {
            t.status.active = e
        }
    }).service("TrafficMonitorService", function () {
        var t = {total: 0, pending: 0};
        return t.endRequest = function () {
            t.pending--
        }, t.startRequest = function () {
            t.total++, t.pending++
        }, t
    }).service("TrackActivityService", ["$http", function (t) {
        var e = this;
        e.track = function (e, n) {
            /bot|crawler|spider|robot|crawling/gi.test(navigator.userAgent) && !/googlebot/i.test(navigator.userAgent) || (n && "string" == typeof n.path && (n.path = n.path.replace(/\//g, ".").replace(/\?p\=.*$/gi, "").replace(/^\.en\./, "")), t.post("/ajax/track", {
                activity: e,
                data: angular.toJson(n)
            }))
        }
    }])/*.directive("raty", function () {
        return {
            restrict: "AE", scope: {ngModel: "="}, link: function (t, e, n) {
                var i = $(e).raty({
                    score: t.ngModel ? t.ngModel / 2 : 0,
                    number: 5,
                    half: !0,
                    starHalf: "icon-star-half-alt",
                    starOff: "icon-star-empty",
                    starOn: "icon-star",
                    click: function (e) {
                        t.ngModel = 2 * e, t.$apply()
                    }
                });
                t.$watch("ngModel", function (t) {
                    i.raty("score", t / 2)
                })
            }
        }
    })*/.directive("crossSell", function () {
        var t = {
            controller: ["$rootScope", "$timeout", "$http", "$scope", function (t, e, n, i) {
                i.hide = !0, i.initialized = !1, i.close = function () {
                    i.hide = !0
                }, t.$on("showCrossSell", function (t, r) {
                    i.hide = !0, e(function () {
                        i.initialized = !1, i.html = ""
                    }, 500).then(function () {
                        n({url: "/ajax/get-cross-selling-block/" + r, method: "GET"}).success(function (t) {
                            i.html = t, e(function () {
                                $(".cross-buy .owl-carousel").owlCarousel({
                                    loop: !1,
                                    nav: !0,
                                    dots: !0,
                                    lazyLoad: !0,
                                    margin: 10,
                                    navText: ['<i class="icon-previous"></i>', '<i class="icon-next"></i>'],
                                    responsive: {
                                        0: {items: 2, slideBy: 2},
                                        641: {items: 6, slideBy: 6},
                                        1101: {items: 8, slideBy: 8}
                                    },
                                    onInitialized: function () {
                                        i.hide = !1, i.initialized = !0
                                    }
                                })
                            }, 100)
                        })
                    })
                })
            }], controllerAs: "vm", template: '<div bind-unsafe-html="html" compile-html="true" ></div>'
        };
        return t
    }).directive("motoLoader", function () {
        var t = {
            controller: ["$rootScope", "$scope", "$timeout", "MotoLoaderService", function (t, e, n, i) {
                e.status = i.status, e.active = !1, e.showError = !1;
                var r = !1, o = !1;
                e.$watch("status.active", function (t) {
                    t ? (r = n(function () {
                        e.showError = !1, e.active = !0
                    }, i.delay), o = n(function () {
                        e.showError = !0
                    }, 2e4)) : (n.cancel(r), n.cancel(o), n(function () {
                        e.active = !1
                    }, 1e3))
                }), e.reload = function () {
                    location.reload()
                }
            }], controllerAs: "vm", templateUrl: "motoLoader.html"
        };
        return t
    }).directive("cartLoadingHide", ["CartService", function (t) {
        return function (e, n) {
            e.cartService = t, e.$watch("cartService.loading", function (t) {
                t ? n.hide() : n.show()
            }, !0)
        }
    }]).directive("bindUnsafeHtml", ["$compile", function (t) {
        return function (e, n, i) {
            e.$watch(function (t) {
                return t.$eval(i.bindUnsafeHtml)
            }, function (r) {
                void 0 !== r && (n.html(r), "true" == i.compileHtml && t(n.contents())(e))
            })
        }
    }]).directive("preview", function () {
        function t(t, e) {
            var n = document.createElement("iframe");
            n.src = 'javascript:window["contents"]';
            var i = e[0];
            i.appendChild(n);
            var r = !1;
            n.onload = function () {
                t.$watch("content", function () {
                    r || (n.contentWindow.document.open("text/htmlreplace"), n.contentWindow.document.write(t.content), n.contentWindow.document.close()), r = !0
                })
            }
        }

        return {link: t, restrict: "E", scope: {content: "="}}
    }).directive("trackActivity", ["$http", "TrackActivityService", function (t, e) {
        return {
            restrict: "A",
            scope: {activity: "@trackActivity", event: "@trackEvent", data: "=trackData"},
            link: function (t, n) {
                t.event || (t.event = "click");
                var i = t.event.split(":"), r = i[0], o = i[1];
                n.on(r, function (n) {
                    return "keypress" == r && "any" != o ? void (n.keyCode == o && e.track(t.activity, t.data)) : void e.track(t.activity, t.data)
                })
            }
        }
    }]).directive("favoriteButton", ["WishListService", function (t) {
        return {
            restrict: "E",
            scope: {productId: "=", productImg: "=", active: "="},
            replace: !0,
            templateUrl: "favoriteButton.html",
            link: function (e) {
                e.active && t.setInWishList(e.productId), e.inWishList = function () {
                    return t.productInWishList(e.productId)
                }, e.toggleWishList = function (n) {
                    return t.toggleWishList(n, e.productId, e.productImg)
                }
            }
        }
    }]).directive("mmenu", function () {

        return {
            restrict: "A",
            link: function (t, e, n) {
                $(e).mmenu(t[n.mmenuOptions])
            }
        }
        /*        return {
                    restrict: "A", link: function (t, e, n) {
                        var i = JSON.parse(n.mmenuOptions);
                        $("#" + n.mmenuLauncher).on("click", function () {
                            $(e).mmenu(i)
                        }), "true" === n.mmenuInitOpened && $("#" + n.mmenuLauncher).click()
                    }
                }*/
    }).directive("countdown2", function () {
        return {
            restrict: "E", scope: {seconds: "="}, link: function (t, e) {
                setInterval(function () {
                    var n = getCountdown(t.seconds);
                    t.seconds--;
                    if (t.seconds < 0)
                        (t.seconds = 0);
                    isElementInViewport(e) &&
                    (e[0].innerHTML = (n.days ? n.days + motocard.viewData.translations.DAY_SHORT + "<span>:</span>" : "") + (n.hours ? n.hours + motocard.viewData.translations.HOUR_SHORT + "<span>:</span>" : "") + n.minutes + "m<span>:</span>" + n.seconds + "s")
                }, 1000)
            }
        }
    }).directive("gdprMoreInfo", ["$rootScope", function (t) {
        return {
            link: function (e, n, i) {
                n.click(function () {
                    t.$broadcast("openPrivacyMoreInfoModal")
                })
            }
        }
    }]).directive("autoScrollTo", ["$location", "$anchorScroll", "$timeout", function (t, e, n) {
        return {
            restrict: "A", scope: !1, link: function (t, i, r) {
                n(function () {
                    e(r.autoScrollTo)
                })
            }
        }
    }]).filter("toDate", function () {
        return function (t) {
            return new Date(t.replace(/\s/, "T"))
        }
    }).filter("trans", function () {
        return function (t, e) {
            var n = t;
            if (e) for (var i in e) {
                var r = String(e[i]);
                n = n.replace(new RegExp(":" + i, "g"), r)
            }
            return n
        }
    }).filter("transChoice", function () {
        return function (t, e, n) {
            var i = t, r = i.split("|");
            if (i = 1 === e ? r[0] : r[1], n) for (var o in n) {
                var a = String(n[o]);
                i = i.replace(new RegExp(":" + o, "g"), a)
            }
            return i
        }
    }).config(["$httpProvider", "$locationProvider", "laddaProvider", function (t, e, n) {
        function i(t, e) {
            function n(t) {
                return e.startRequest(t.method), t
            }

            function i(n) {
                return e.startRequest(), t.reject(n)
            }

            function r(t) {
                return e.endRequest(), t
            }

            function o(n) {
                return e.endRequest(), t.reject(n)
            }

            return {request: n, requestError: i, response: r, responseError: o}
        }

        function r() {
            return {
                request: function (t) {
                    return t.headers["x-client-language"] = motocard.viewData.language.id, t
                }
            }
        }

        n.setOption({
            style: "zoom-in",
            spinnerSize: 25,
            spinnerColor: "#FFFFFF"
        }), t.defaults.xsrfCookieName = "SHARED-XSRF-TOKEN", t.interceptors.push(["$q", "TrafficMonitorService", i]), t.interceptors.push(r), t.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"
    }]).run(["MotoLoaderService", function (t) {
        if (motocard.viewData.flash_errors) {
            var e = "";
            motocard.viewData.flash_errors.forEach(function (t) {
                e += t + "<br>"
            }), e = e.replace(/<br>$/, "");
            var n = {
                title: "",
                type: "error",
                html: e,
                showCancelButton: !1,
                allowOutsideClick: !1,
                showLoaderOnConfirm: !0
            };
            motocard.viewData.redirect_on_error && (n.preConfirm = function () {
                return new Promise(function (e) {
                    t.delay = 0, t.setLoaderActive(!0), window.location.href = motocard.viewData["departmentBaseRoute_" + motocard.viewData.department.id], e()
                })
            }), swal(n)
        }
        if (motocard.viewData.flash_success) {
            var e = "";
            motocard.viewData.flash_success.forEach(function (t) {
                e += t + "<br>"
            }), e = e.replace(/<br>$/, "");
            var n = {
                title: "",
                type: "success",
                html: e,
                showCancelButton: !1,
                allowOutsideClick: !1,
                showLoaderOnConfirm: !0
            };
            swal(n)
        }
    }]), angular.bootstrap(angular.element("body")[0], ["motocard"])
},
    motocard.setup(),
    function () {
        "use strict";

        function t(t, e) {
            this.openForgotPasswordModal = function () {
                var n = {
                    templateUrl: "forgot-password-modal.html",
                    size: "tiny",
                    windowClass: "register-modal",
                    controller: ["$scope", "$modalInstance", function (e, n) {
                        e.registering = !1, e.cancel = function () {
                            n.dismiss("cancel")
                        }, e.recoverPassword = function (i) {
                            i.$setSubmitted(), i.$valid && (e.registering = !0, t({
                                url: "/ajax/account/recover-password",
                                method: "POST",
                                data: {email: i.data.email}
                            }).success(function () {
                                n.dismiss("cancel"), swal(motocard.viewData.translations.PASSWORD_RECOVERY_SUCCESS_TITLE, motocard.viewData.translations.PASSWORD_RECOVERY_SUCCESS_BODY, "success")
                            }).error(function (t) {
                                n.dismiss("cancel");
                                var e = motocard.viewData.translations.PASSWORD_RECOVERY_ERROR_BODY_GENERIC;
                                "invalid_email" == t.error && (e = motocard.viewData.translations.PASSWORD_RECOVERY_ERROR_BODY), swal(motocard.viewData.translations.PASSWORD_RECOVERY_ERROR_TITLE, e, "error")
                            })["finally"](function () {
                                e.registering = !1
                            }))
                        }
                    }]
                };
                e.open(n)
            }, this.openRegisterModal = function (t) {
                var n = {
                    templateUrl: "register-modal.html",
                    windowClass: "register-modal",
                    controller: ["$scope", "$modalInstance", "$timeout", "$http", "MotoLoaderService", "$rootScope", function (e, n, i, r, o, a) {
                        e.registerForm = {}, e.registering = !1;
                        var s = null;
                        i(function () {
                            s = $(".register-modal .mc-checkbox-label").webuiPopover({
                                trigger: "manual",
                                animation: "pop",
                                multi: !0,
                                width: 270
                            })
                        }, 600), e.$watch("registerForm.data.termsAccepted", function (t) {
                            t === !0 && s.webuiPopover("hide")
                        }), e.$watch("registerForm.data.email", function () {
                            e.registerForm.errorEmailRepeated = !1
                        }), e.cancel = function () {
                            n.dismiss("cancel")
                        }, e.register = function (n) {
                            e.registerForm = n, e.registerForm.$setSubmitted(), e.registerForm.errorEmailRepeated = !1, e.registerForm.$valid && (e.registerForm.data.termsAccepted ? (e.registering = !0, r({
                                url: "/ajax/register",
                                method: "POST",
                                data: {
                                    name: n.data.name,
                                    surnames: n.data.surnames,
                                    email: n.data.email,
                                    password: n.data.password,
                                    age: n.data.age
                                }
                            }).success(function (n) {
                                return "function" == typeof t && t(), "object" == typeof n ? (a.$broadcast("loginClient", n), e.cancel(), void i(function () {
                                    a.$broadcast("openGdprModal")
                                }, 1e3)) : void (e.registerForm.errorEmailRepeated = !0)
                            }).error(function (t) {
                                e.registerForm.errorMessage = t
                            })["finally"](function () {
                                e.registering = !1
                            })) : s.webuiPopover("show"))
                        }
                    }]
                };
                e = $("body").injector().get("$modal"), motocard.viewData.is_mobile && $("#mobile-menu").data("mmenu").close(), e.open(n)
            }, this.openLoginModal = function (t, n) {
                e = $("body").injector().get("$modal");
                var i = {
                    templateUrl: "login-modal.html",
                    windowClass: "login-modal",
                    controller: ["$scope", "$modalInstance", "$http", "AccountService", function (e, i, r, o) {
                        var a = $("#modalLoginBlock");
                        e.modalLoginFormValues = {};
                        a.find("form input[name=email]"), a.find("form input[name=password]");
                        e.$watch("[email,password]", function () {
                            e.errorMessage = !1
                        }), e.runCallback = !1, "function" == typeof n && (e.runCallback = n), e.modalTitle = t, e.registerModal = function () {
                            o.openRegisterModal(e.runCallback), i.dismiss("cancel")
                        }, e.login = function (t) {
                            t.$valid && r({
                                url: "/ajax/login",
                                method: "POST",
                                data: {email: e.modalLoginFormValues.email, password: e.modalLoginFormValues.password}
                            }).success(function (t) {
                                if (e.runCallback) return e.runCallback(), i.dismiss("cancel"), null;
                                var n = getParameterByName("go");
                                if (n) location.href = base64_decode(n); else if (t.client.language_id != motocard.viewData.language.id || t.client.country_id != motocard.viewData.country.id || t.client.currency_id != motocard.viewData.currency.id) {
                                    var r = !1;
                                    t.client.language_id != motocard.viewData.language.id && (r = document.getElementById("translated-url-" + t.client.language.code)), r ? r.click() : document.location.reload()
                                } else document.location.reload()
                            }).error(function (t, n) {
                                403 === n ? swal({
                                    title: motocard.viewData.translations.DELETED_ACCOUNT,
                                    type: "info",
                                    html: motocard.viewData.translations.DELETED_ACCOUNT_INFO.replace(":days", t.days_to_recover),
                                    showCancelButton: !0,
                                    confirmButtonText: motocard.viewData.translations.RECOVER_ACCOUNT,
                                    cancelButtonText: motocard.viewData.translations.CANCEL,
                                    showLoaderOnConfirm: !0,
                                    preConfirm: function () {
                                        return new Promise(function (t) {
                                            r({
                                                method: "PUT",
                                                url: "/ajax/account/restore-account",
                                                data: {
                                                    email: e.modalLoginFormValues.email,
                                                    password: e.modalLoginFormValues.password
                                                }
                                            }).success(function () {
                                                e.login()
                                            }).error(function () {
                                                t(), setTimeout(function () {
                                                    swal("", motocard.viewData.translations.GENERIC_ERROR, "error")
                                                }, 1e3)
                                            })
                                        })
                                    }
                                }) : e.errorMessage = t.error
                            })
                        }, e.openForgotPasswordModal = o.openForgotPasswordModal, e.cancel = function () {
                            i.dismiss("cancel")
                        }
                    }]
                };
                e.open(i)
            }
        }

        angular.module("motocardServices").service("AccountService", ["$http", "$modal", t])
    }(), function () {
    "use strict";

    function t(t, e, n) {
        var i = this;
        i.loading = !0, i.count = 0, i.autoRefresh = !0, i.refreshCallback = !1, i.preRequestCallback = !1, i.failedRequestCallback = !1, i.cart || (i.cart = {}), this.getCart = function () {
            return i.cart
        }, this.setCart = function (t, e) {
            i.cart.items && t.items && i.cart.items.forEach(function (e) {
                e.notEnoughStock && t.items.forEach(function (t) {
                    e.id == t.id && (t.notEnoughStock = !0)
                })
            }), i.cart = t, e && i.updateCount()
        }, this.setRefreshCallback = function (t) {
            i.refreshCallback = t
        }, this.setPreRequestCallback = function (t) {
            i.preRequestCallback = t
        }, this.setFailedRequestCallback = function (t) {
            i.failedRequestCallback = t
        }, this.getItemPrice = function (t, e) {
            var n = t.price;
            return t.promo_discount && (n -= t.promo_discount), e && (n *= t.quantity), n
        }, this.getItemDiscount = function (t, e) {
            var n = t.promo_discount;
            return e && (n *= t.quantity), n
        }, this.subItem = function (t, e) {
            t.quantity > 1 && (t.quantity--, t.newQuantity = t.quantity, i.updateCount(), i.changeQuantity(t, t.quantity, e))
        }, this.addItem = function (t, e) {
            t.quantity++, t.newQuantity = t.quantity, i.updateCount(), i.changeQuantity(t, t.quantity, e)
        }, this.updateQuantity = function (t, e) {
            t.newQuantity >= 1 && t.newQuantity <= 99 && t.newQuantity != t.quantity && (t.quantity = parseInt(t.newQuantity), i.changeQuantity(t, t.quantity, e))
        }, this.removeItem = function (t, n) {
            i.preRequestCallback && i.preRequestCallback(), e({
                url: "/ajax/cart/remove-item/" + t.id,
                method: "GET",
                data: {}
            }).success(function (t) {
                i.updateCart(t.cart), n && n(i.getCart())
            }).error(function () {
                i.failedRequestCallback && i.failedRequestCallback()
            })
        }, this.changeQuantity = function (t, n, r) {
            i.preRequestCallback && i.preRequestCallback(), e({
                url: "/ajax/cart/update-quantity/" + t.id,
                method: "POST",
                data: {quantity: n}
            }).success(function (t) {
                i.updateCart(t.cart, t.errors), r && r(i.getCart())
            }).error(function () {
                i.failedRequestCallback && i.failedRequestCallback()
            })
        }, this.updateCart = function (t, e) {
            i.autoRefresh && (i.cart = t, i.updateCount()), i.checkErrors(e), i.refreshCallback && i.refreshCallback()
        }, this.checkErrors = function (t) {
            if (t) {
                var e = !1, r = !1;
                t.forEach(function (t) {
                    "not_enough_stock" == t.error && (0 == t.current_stock ? e = !0 : angular.forEach(i.cart.items, function (e) {
                        e.id != t.id || e.blockUpdate || (e.notEnoughStock = !0, e.blockUpdate = !0, n(function () {
                            i.cart.items.forEach(function (t) {
                                t.id == e.id && (t.notEnoughStock = !1, t.blockUpdate = !1)
                            })
                        }, 5e3))
                    })), "pack_deleted" == t.error && (r = !0)
                }), e && swal(motocard.viewData.translations.ALERT, motocard.viewData.translations.PRODUCT_REMOVED_ALERT, "warning"), r && swal(motocard.viewData.translations.ALERT, motocard.viewData.translations.PACK_REMOVED_ALERT, "warning")
            }
        }, this.updateCount = function () {
            var t = 0;
            angular.forEach(i.cart.items, function (e) {
                "product-size" != e.item_type && "customization" != e.item_type || (t += e.quantity)
            }), i.count = t
        }, i.cart && i.updateCount(), t.$on("addProductToCart", function (t, e) {
            motocard.viewData && motocard.viewData.cookie_consent && motocard.viewData.cookie_consent.marketing && fbq("track", "AddToCart", {
                content_type: "product",
                content_ids: e
            })
        }), t.$on("updateCart", function (t, e, r) {
            i.updateCart(e, r), i.loading = !1, n(function () {
                var t = $("#cart-items > ul");
                t.scrollTop(t.prop("scrollHeight"))
            }, 150)
        })
    }

    angular.module("motocardServices").service("CartService", ["$rootScope", "$http", "$timeout", t])
}(), function () {
    "use strict";

    function t() {
        var t = motocard.viewData.country, e = motocard.viewData.currency, n = motocard.viewData.moneyFormat,
            i = n[0].charAt(n[0].indexOf("9") + 1), r = n[0].charAt(n[0].indexOf("6") + 1);
        this.setCountry = function (e) {
            t = e
        }, this.setCurrency = function (t) {
            e = t
        }, this.convert = function (n, i, r, o) {
            return (void 0 === i || i) && (n += n / 100 * t.vat), (void 0 === r || r) && (n *= e.conversion_rate), void 0 === o || o ? round(round(round(n) / 10) / 100, 2) : n
        }, this.toMoney = function (t, e, o, a) {
            if (void 0 !== t) {
                (void 0 === e || e) && (t = this.convert(t, o, a));
                var s = t.toFixed(2), l = s.replace(/\./, r).replace(/(\d)(?=(\d{3})+,)/g, "$1" + i), c = n[1];
                return c.indexOf("0") != -1 && (c = c.replace(c.charAt(c.indexOf("0") - 1), "").replace(/0/g, "")), c.replace("9", l)
            }
        }
    }

    angular.module("motocardServices").service("MoneyService", t)
}(), function () {
    "use strict";

    function t(t, e, n) {
        this.showMotorbikesModal = function (t) {
            n.load([motocard.viewData.angularTemplates.pagination, motocard.viewData.angularTemplates.motorbikesModal]).then(function () {
                var n = {
                    templateUrl: "motorbikes-modal.html",
                    windowClass: "compatible-moto",
                    size: "medium",
                    resolve: {
                        id: function () {
                            return t
                        }
                    },
                    controller: ["$scope", "$modalInstance", "id", function (t, e, n) {
                        t.translations = motocard.viewData.translations, t.models = listProducts[n], t.currentPage = 1, t.pageSize = motocard.viewData.is_mobile ? 4 : 6, t.searching = !1, t.totalProducts = t.models.length, t.inputs = {keyword: ""}, t.currentLanguage = motocard.viewData.language.code, t.$watch("inputs.keyword", function (e) {
                            if ("" === e) return t.models = listProducts[n], void (t.searching = !1);
                            t.searching = !0;
                            const i = String(e).replace(new RegExp(" ", "g"), "").toLowerCase();
                            t.models = listProducts[n].filter(function (t) {
                                const e = String(t.brand + t.name).replace(new RegExp(" ", "g"), "").toLowerCase();
                                return e.includes(i)
                            })
                        }), t.clearSearch = function () {
                            t.inputs.keyword = "", t.searching = !1
                        }, t.pageChanged = function (e) {
                            t.currentPage = e
                        }, t.cancel = function () {
                            e.dismiss("cancel")
                        }
                    }]
                };
                e.open(n)
            })
        }
    }

    angular.module("motocardServices").service("MotorbikeService", ["$http", "$modal", "$ocLazyLoad", t])
}(), function () {
    "use strict";

    function t(t) {
        var e = motocard.viewData.product, n = motocard.viewData.department.id, i = motocard.viewData.language;
        this.getMainProductPrice = function (t) {
            return this.getProductPrice(e, t)
        }, this.getProductPrice = function (t, e) {
            return void 0 == e ? parseFloat(t.price) : e.price ? parseFloat(e.price) : 0
        }, this.getSlotPrice = function (t, e) {
            return void 0 !== e ? parseFloat(t.packPrice[e.id]) : parseFloat(t.packPrice[Object.keys(t.packPrice)[0]])
        }, this.getMainSlotPrice = function (t, e) {
            return void 0 == e ? parseFloat(t.main_product_prices[Object.keys(t.main_product_prices)[0]]) : parseFloat(t.main_product_prices[e.id])
        }, this.getSlotSavedPrice = function (t, e) {
            return this.getProductPrice(t, e) - this.getSlotPrice(t, e)
        }, this.getMainSlotSavedPrice = function (t, e) {
            return this.getMainProductPrice(e) - this.getMainSlotPrice(t, e)
        }, this.isOfferSlot = function (t, e) {
            var n = this.getProductPrice(t, e), i = this.getSlotPrice(t, e);
            return n != i
        }, this.mainProductIsOffer = function (t) {
            return this.getMainProductPrice() != t.main_product_prices[Object.keys(t.main_product_prices)[0]]
        }, this.getUrl = function (t) {
            return "object" == typeof t.url[n] && "string" == typeof t.url[n][i.code] ? t.url[n][i.code] : "object" == typeof t.url[Object.keys(t.url)[0]] && "string" == typeof t.url[Object.keys(t.url)[0]][i.code] ? t.url[Object.keys(t.url)[0]][i.code] : "string" == typeof t.url[i.code] ? t.url[i.code] : "#"
        }, this.getImage = function (t) {
            void 0 == t && (t = e);
            var n = t.image.split(".");
            return n[n.length - 2] = n[n.length - 2] + "-medium", n.join(".")
        }, this.getProduct = function () {
            return e
        }, this.getMainSizeName = function (e, n) {
            if (0 == n.id) return motocard.viewData.translations.SELECT_SIZE;
            var r = this.getMainProductPrice(n);
            return e && (r = this.getMainSlotPrice(e, n)), n.name[i.code] + " - " + t.toMoney(r, !0, !1)
        }, this.getSlotSizeName = function (e, n, r) {
            return 0 == r.id ? motocard.viewData.translations.SELECT_SIZE : r.name[i.code] + " - " + t.toMoney(this.getSlotPrice(n, r), !0, !1)
        }
    }

    angular.module("motocardServices").service("ProductService", ["MoneyService", t])
}(), function () {
    "use strict";

    function t(t, e) {
        var n = this;
        n.disableWishListButtons = !1, n.wishList || (n.wishList = []), this.productInWishList = function (t) {
            return n.wishList.indexOf(t) >= 0
        }, this.setInWishList = function (t) {
            n.wishList.push(t)
        }, this.toggleWishList = function (t, e, i) {
            n.productInWishList(e) ? n.removeFromWishList(e) : n.addToWishList(t, e, i)
        }, this.addToWishList = function (i, r, o) {
            n.disableWishListButtons === !1 && (n.disableWishListButtons = !0, flyToWishList(i.pageY, i.pageX, o), t({
                url: "/ajax/wishlist/add-to-wishlist/" + r,
                method: "POST"
            }).success(function (t) {
                if (n.wishList = t.wishList, t.session === !0 && n.wishList.length % 3 == 0 && e.openLoginModal(motocard.viewData.translations.WISHLIST_LOGIN_TITLE), $(".wishlist-count").length) {
                    var i = n.wishList.length > 0 ? n.wishList.length : "";
                    $(".wishlist-count").text(i)
                }
                n.disableWishListButtons = !1
            }))
        }, this.removeFromWishList = function (e) {
            n.disableWishListButtons === !1 && (n.disableWishListButtons = !0, t({
                url: "/ajax/wishlist/remove-from-wishlist/" + e,
                method: "POST"
            }).success(function (t) {
                if (n.wishList = t.wishList, $(".wishlist-count").length) {
                    var e = n.wishList.length > 0 ? n.wishList.length : "";
                    $(".wishlist-count").text(e)
                }
                n.disableWishListButtons = !1
            }))
        }
    }

    angular.module("motocardServices").service("WishListService", ["$http", "AccountService", t])
}(), function () {
    "use strict";

    function t(t, n, i, r, o, a, s, l, c) {
        function u(t) {
            n.paypalShortcutForm.loadingShippingData = !0, i({
                url: "/ajax/checkout/set-carrier/" + t,
                method: "GET"
            }).success(function () {
                f(), t !== n.storeCarrierId ? d() : (n.paypalShortcutForm.data.shippingTimeString = "", n.paypalShortcutForm.loadingShippingData = !1)
            })
        }

        function d() {
            n.paypalShortcutForm.loadingShippingData = !0;
            var t = "/ajax/checkout/get-shipping-times?format=short";
            n.paypalShortcutForm.formData.selectedStore > 0 && n.paypalShortcutForm.formData.selectedCarrier === n.storeCarrierId && (t += "&storeId=" + n.paypalShortcutForm.formData.selectedStore), i({
                url: t,
                method: "GET"
            }).success(function (t) {
                t.string ? n.paypalShortcutForm.data.shippingTimeString = t.string : n.paypalShortcutForm.data.shippingTimeString = ""
            }).error(function () {
                n.paypalShortcutForm.data.shippingTimeString = ""
            }).then(function () {
                n.paypalShortcutForm.loadingShippingData = !1
            })
        }

        function f(t, e, r) {
            t ? (l.setCart(t, !0), h(t)) : i({method: "GET", url: "/ajax/cart"}).success(function (t) {
                l.setCart(t.cart, !0), h(l.getCart()), n.loading = !1, "function" == typeof e && e(t)
            }).error(function (t) {
                "function" == typeof r && r(t)
            })
        }

        function h(t) {
            try {
                n.paypalShortcutForm.formData.selectedCarrier = t.carrier_id, n.paypalShortcutForm.data.appliedCode = t.promo_code, t.carrier_data = JSON.parse(t.carrier_data), t.carrier_data.store_id && (n.paypalShortcutForm.formData.selectedStore = t.carrier_data.store_id)
            } catch (e) {
            }
        }

        n.cartService = l, n.cdnUrl = motocard.viewData.cdnUrl, n.translations = motocard.viewData.translations, n.productService = s, n.moneyService = c, n.loading = !1, n.loadingCheckout = !1, n.cartLoaded = !1, n.storeCarrierId = 6, n.paypalShortcutForm = {
            loading: !1,
            show: !1,
            promoCodeError: !1,
            loadingShippingData: !0,
            showExpanded: !1,
            waitingPaypalRedirect: !1,
            showSelectStoreError: !1,
            data: {shippingTimeString: "", appliedCode: !1, manualCode: !1, availableCodes: [], loadingPromoCode: !1},
            formData: {selectedCarrier: 0, selectedStore: 0, selectedPromoCode: 0, manualPromoCode: ""}
        }, l.loading = !1, n.$watch("paypalShortcutForm.formData.selectedCarrier", function (t) {
            t && t != l.getCart().carrier_id && u(t)
        }), n.$watch("paypalShortcutForm.formData.selectedStore", function (t) {
            n.paypalShortcutForm.showSelectStoreError = !1, n.paypalShortcutForm.formData.selectedCarrier === n.storeCarrierId && (t && t > 0 ? d() : n.paypalShortcutForm.data.shippingTimeString = "")
        }), n.$watch("paypalShortcutForm.formData.selectedPromoCode", function (t, e) {
            if (void 0 !== t) if (t > 0) {
                var i = o("filter")(n.paypalShortcutForm.data.availableCodes, {id: t}, !0)[0];
                i.code !== n.paypalShortcutForm.data.appliedCode && n.submitPromoCode(i.code)
            } else 0 === t ? n.removePromoCode() : t === -1 && e > 0 && n.removePromoCode()
        }), n.removePromoCode = function () {
            var t = l.getCart(), e = t.promo_code;
            if (e) {
                n.paypalShortcutForm.data.appliedCode = !1;
                for (var i = 0; i < t.items.length; i++) if ("promo" === t.items[i].item_type && t.items[i].item_data) try {
                    var r = JSON.parse(t.items[i].item_data);
                    if (r.code === e) {
                        l.removeItem(t.items[i], function (t) {
                            f(t)
                        });
                        break
                    }
                } catch (o) {
                }
            }
        }, n.submitPromoCode = function (t) {
            n.paypalShortcutForm.data.loadingPromoCode = !0, i({
                url: "/ajax/checkout/add-promo-code",
                method: "POST",
                data: {code: t}
            }).success(function () {
                n.paypalShortcutForm.promoCodeError = !1, f()
            }).error(function (t) {
                n.paypalShortcutForm.promoCodeError = t.error
            })["finally"](function () {
                n.paypalShortcutForm.data.loadingPromoCode = !1
            })
        }, n.enablePaypalShortcut = function () {
            n.paypalShortcutForm.loading = !0, i({
                url: "/ajax/checkout/set-gateway/paypal-express",
                method: "GET"
            }).success(function () {
                var t = r.when(i({url: "/ajax/checkout/get-carriers", method: "GET"})),
                    e = r.when(i({method: "GET", url: "/ajax/checkout/get-pickup-stores"})),
                    s = r.when(i({url: "/ajax/checkout/get-promo-codes", method: "GET"}));
                r.all([t, e, s]).then(function (t) {
                    n.paypalShortcutForm.data.carriers = t[0].data, n.paypalShortcutForm.data.stores = t[1].data, n.paypalShortcutForm.data.stores.unshift({
                        id: 0,
                        city: motocard.viewData.translations.SELECT_STORE
                    }), n.paypalShortcutForm.data.availableCodes = [], t[2].data.general.forEach(function (t) {
                        t.type = motocard.viewData.translations.CURRENT_CODES, n.paypalShortcutForm.data.availableCodes.push(t)
                    }), t[2].data.personal.forEach(function (t) {
                        t.type = motocard.viewData.translations.YOUR_CODES, n.paypalShortcutForm.data.availableCodes.push(t)
                    }), 0 === n.paypalShortcutForm.data.availableCodes.length ? n.paypalShortcutForm.formData.selectedPromoCode = -1 : (n.paypalShortcutForm.data.availableCodes.unshift({
                        id: 0,
                        code: motocard.viewData.translations.SELECT_CODE
                    }), n.paypalShortcutForm.data.availableCodes.push({
                        id: -1,
                        type: motocard.viewData.translations.OTHER_CODES,
                        code: motocard.viewData.translations.INTRO_CODE
                    }), n.paypalShortcutForm.formData.selectedPromoCode === -1 && (n.paypalShortcutForm.formData.selectedPromoCode = 0));
                    var e = l.getCart(), i = e.promo_code;
                    if (i) {
                        var r = o("filter")(n.paypalShortcutForm.data.availableCodes, {code: i}, !0);
                        r.length ? n.paypalShortcutForm.formData.selectedPromoCode = r[0].id : (n.paypalShortcutForm.formData.manualCode = i, n.paypalShortcutForm.data.appliedCode = i)
                    } else n.paypalShortcutForm.data.appliedCode = !1, n.paypalShortcutForm.formData.manualCode = !1;
                    e.carrier_id && 0 !== o("filter")(n.paypalShortcutForm.data.carriers, {id: e.carrier_id}, !0).length ? d() : u(n.paypalShortcutForm.data.carriers[0].id), n.paypalShortcutForm.initialized = !0, n.paypalShortcutForm.loading = !1, n.paypalShortcutForm.show = !0, a(function () {
                        var t = 200;
                        motocard.viewData.is_mobile && (t = 165), $(".cart-paypal-checkout__block span.paypal-shipping-time-info").webuiPopover({
                            trigger: "hover",
                            delay: {show: null, hide: null},
                            width: t
                        })
                    })
                })
            }), motocard.viewData.cookie_consent.statistics && gtag("event", "paypal-shortcut", {
                send_to: "ga",
                event_category: "Cart"
            })
        }, n.changeShippingMethod = function () {
            n.paypalShortcutForm.formData.selectedCarrier = n.paypalShortcutForm.data.carriers[0].id
        }, n.changePromoCode = function () {
            n.paypalShortcutForm.formData.selectedPromoCode = 0
        }, n.getShippingPrice = function (t) {
            return e(c, t)
        }, n.makePaypalPayment = function () {
            return n.paypalShortcutForm.formData.selectedCarrier !== n.storeCarrierId || n.paypalShortcutForm.formData.selectedStore ? (n.paypalShortcutForm.waitingPaypalRedirect = !0, void i({
                url: "/ajax/checkout/checkout-paypal-shortcut",
                method: "POST",
                data: {storeId: n.paypalShortcutForm.formData.selectedStore}
            }).success(function (t) {
                return t.redirect ? void (document.location.href = t.redirect) : void n.checkout()
            }).error(function () {
                n.checkout()
            })) : void (n.paypalShortcutForm.showSelectStoreError = !0)
        }, n.checkout = function () {
            n.loadingCheckout = !0, document.location.href = $("#checkout-button").data("url"), motocard.viewData.cookie_consent.statistics && gtag("event", "checkout", {
                send_to: "ga",
                event_category: "Cart"
            })
        }, n.openMenu = function () {
            n.hoverMenu = "cart", $("body").addClass("no-scroll")
        }, n.enterCart = function () {
            n.cartLoaded || (n.loading = !0, f(!1, function () {
                n.cartLoaded = !0
            }))
        }, n.closeMenu = function () {
            n.paypalShortcutForm.show || (n.hoverMenu = "", $("body").removeClass("no-scroll"))
        }, n.manualCodeInputKeyUp = function (t) {
            t && 13 === t.keyCode && n.paypalShortcutForm.formData.manualPromoCode && n.submitPromoCode(n.paypalShortcutForm.formData.manualPromoCode)
        }, $(window).bind("pageshow", function (t) {
            t.originalEvent.persisted && n.$apply(function () {
                n.loadingCheckout = !1, n.paypalShortcutForm.waitingPaypalRedirect = !1
            })
        }), t.$on("updateCart", function () {
            setTimeout(function () {
                n.cartLoaded = !0
            }, 150)
        })
    }

    function e(t, e) {
        return e <= 0 ? motocard.viewData.translations.FREE : t.toMoney(e, !0, !1, !1)
    }

    angular.module("cart", []).filter("filterNotListable", function () {
        return function (t) {
            var e = [];
            return angular.forEach(t, function (t) {
                "product-size" != t.item_type && "customization" != t.item_type || e.push(t)
            }), e
        }
    }).filter("formatCarrierName", ["MoneyService", function (t) {
        return function (n) {
            var i = n.name;
            return void 0 !== n.price && (i += " (" + e(t, n.price) + ")"), i
        }
    }]).filter("formatStoreName", function () {
        return function (t) {
            return 0 !== t.id ? t.city + " · " + t.address : t.city
        }
    }).controller("CartCtrl", ["$rootScope", "$scope", "$http", "$q", "$filter", "$timeout", "ProductService", "CartService", "MoneyService", t])
}(), function () {
    "use strict";

    function t(t, e) {
        t.cancel = function () {
            e && e.dismiss("cancel")
        }
    }

    function e(e, n, i) {
        if (motocard.viewData.showClosedStoresModal) {
            if (location.href.indexOf("/blog/") > -1) return;
            n({url: "/ajax/set-cookie/shared_closed_stores_modal", method: "GET"});
            var r = {
                templateUrl: "closed-stores-modal.html",
                windowClass: "official-statement-modal closed-stores-modal animated",
                size: "small",
                resolve: {},
                controller: ["$scope", "$modalInstance", t]
            };
            i(function () {
                e.open(r)
            }, 5e3)
        }
    }

    angular.module("closedStores", []).run(["$modal", "$http", "$timeout", e]), motocard.addAngularModule("closedStores")
}(), function () {
    "use strict";

    function t(t, e, n, i) {
        function r(t) {
            return n({url: "/ajax/set-localization", method: "POST", data: t}).success(function () {
                var e = document.getElementById("translated-url-" + t.language);
                e ? e.click() : document.location.reload()
            })
        }

        var o = {};
        e.countries = [], e.open = !1, e.selectedCountry = null, e.$watch("open", function () {
            1 == e.open && e.initCountries()
        }, !0), e.$watch("selectedCountry", function (t) {
            if (e.countries.length > 0) {
                var n = i("filter")(e.countries, {id: t}, !0)[0];
                $("#locale-box-language").val(n.language.code), $("#locale-box-currency").val(n.currency_id)
            }
        }, !0), e.initCountries = function () {
            0 == e.countries.length && n({url: "/ajax/get-countries", method: "GET"}).success(function (t) {
                e.countries = t
            })
        }, e.setLocale = function () {
            o.country = e.selectedCountry, o.language = $("#locale-box-language").val(), o.currency = $("#locale-box-currency").val(), r(o)
        }, e.openLocaleBox = function () {
            e.open = !0
        }, e.closeLocaleBox = function () {
            e.open = !1
        }, t.$on("setLocale", function (t, e) {
            return r(e)
        })
    }

    angular.module("localeBox", []).controller("LocaleBoxCtrl", ["$rootScope", "$scope", "$http", "$filter", t])
}(), function () {
    "use strict";

    function t(t, e, n, i, r, o, a) {
        function s(n) {
            e.client = n, motocard.viewData.client = n, e.welcome = motocard.viewData.translations.USER_WELCOME.replace(":name", e.client.name), t.$broadcast("clientLoggedIn", n), i("account-menus.html").then(function (t) {
                var n = $(t);
                r(n.insertBefore(".user-account-content-menu.submenu-login"))(e), o(function () {
                    e.showMenu(), e.keepMenuOpen = !0
                }, 100)
            })
        }

        e.showHoverMenu = !1, e.client = motocard.viewData.client, e.welcome = "";
        var l = $("#loginBlock"), c = l.find("form input[name=email]"), u = l.find("form input[name=password]");
        e.client && (e.welcome = motocard.viewData.translations.USER_WELCOME.replace(":name", e.client.name)), e.$watch("[email,password]", function () {
            e.errorMessage = !1
        }), e.hideMenu = function () {
            c.is(":focus") || u.is(":focus") || e.keepMenuOpen || (e.showHoverMenu = !1)
        }, e.showMenu = function () {
            e.showHoverMenu = !0, e.keepMenuOpen = !1
        }, e.login = function () {
            e.loginForm.$valid && n({
                url: "/ajax/login",
                method: "POST",
                data: {email: e.email, password: e.password}
            }).success(function (t) {
                var e = getParameterByName("go");
                if (e) location.href = base64_decode(e); else if (t.client.language_id != motocard.viewData.language.id || t.client.country_id != motocard.viewData.country.id || t.client.currency_id != motocard.viewData.currency.id) {
                    var n = !1;
                    t.client.language_id != motocard.viewData.language.id && (n = document.getElementById("translated-url-" + t.client.language.code)), n ? (n.getAttribute("href") == window.location && document.location.reload(), n.click()) : document.location.reload()
                } else document.location.reload()
            }).error(function (t, i) {
                403 === i ? swal({
                    title: motocard.viewData.translations.DELETED_ACCOUNT,
                    type: "info",
                    html: motocard.viewData.translations.DELETED_ACCOUNT_INFO.replace(":days", t.days_to_recover),
                    showCancelButton: !0,
                    confirmButtonText: motocard.viewData.translations.RECOVER_ACCOUNT,
                    cancelButtonText: motocard.viewData.translations.CANCEL,
                    showLoaderOnConfirm: !0,
                    preConfirm: function () {
                        return new Promise(function (t) {
                            n({
                                method: "PUT",
                                url: "/ajax/account/restore-account",
                                data: {email: e.email, password: e.password}
                            }).success(function () {
                                e.login()
                            }).error(function () {
                                t(), setTimeout(function () {
                                    swal("", motocard.viewData.translations.GENERIC_ERROR, "error")
                                }, 1e3)
                            })
                        })
                    }
                }) : e.errorMessage = t.error
            })
        }, t.$on("loginClient", function (t, e) {
            s(e)
        }), e.logout = function () {
            n({url: "/ajax/logout", method: "GET"}).then(function () {
                t.$broadcast("clientLoggedOut");
                var e = getParameterByName("go");
                e ? location.href = base64_decode(e) : location.reload()
            })
        }, e.openForgotPasswordModal = a.openForgotPasswordModal, e.openRegisterModal = a.openRegisterModal
    }

    angular.module("login", [])
        .controller("LoginCtrl", ["$rootScope", "$scope", "$http", "$templateRequest", "$compile", "$timeout", "AccountService", t])
}(), function () {
    "use strict";

    function t(t, e) {
        var n = !1;
        t.sendDisable = !0, t.motorbikeBrandsLoading = !0, t.motorbikeModelsLoading = !1, t.motorbikeYearsLoading = !1, t.motorbikeBrands = [], t.motorbikeModels = [], t.motorbikeYears = [],
            t.initMotorbikeBrands = function () {
                1 == t.motorbikeBrandsLoading && (motocard.viewData.motorbikeBrands ? (t.motorbikeBrands = motocard.viewData.motorbikeBrands, t.motorbikeBrand = t.motorbikeBrands[0], t.motorbikeBrandsLoading = !1) : e({
                    url: "/ajax/get-motorbike-brands",
                    method: "GET",
                    data: {}
                }).success(function (e) {
                    motocard.viewData.motorbikeBrands = e, t.motorbikeBrands = e, t.motorbikeBrand = t.motorbikeBrands[0], t.motorbikeBrandsLoading = !1
                }))
            }, t.$watch("motorbikeBrand", function () {
            void 0 != t.motorbikeBrand && 0 != t.motorbikeBrand.id ? (n = !0, t.motorbikeModelsLoading = !0, e({
                url: "/ajax/get-motorbike-models/" + t.motorbikeBrand.id,
                method: "GET",
                data: {}
            }).success(function (e) {
                t.motorbikeModels = e, t.motorbikeModel = t.motorbikeModels[0], t.motorbikeModelsLoading = !1, t.sendDisable = !1
            })) : (t.motorbikeModels = [], t.motorbikeModel = void 0, t.sendDisable = !0)
        }, !0), t.$watch("motorbikeModel", function () {
            void 0 != t.motorbikeModel && 0 != t.motorbikeModel.id ? (n = !0, t.motorbikeYearsLoading = !0, e({
                url: "/ajax/get-motorbike-years/" + t.motorbikeModel.id,
                method: "GET",
                data: {}
            }).success(function (e) {
                t.motorbikeYears = e, t.motorbikeYear = t.motorbikeYears[0], t.motorbikeYearsLoading = !1
            })) : (t.motorbikeYears = [], t.motorbikeYear = void 0, n = !0)
        }, !0), t.$watch("motorbikeYear", function () {
            void 0 != t.motorbikeYear && (n = !0)
        }), t.openMenu = function (e) {
            n = !1, t.hoverMenu = e
        }, t.closeMenu = function () {
            n || (t.hoverMenu = "")
        }, t.filterMotorbikeProducts = function (e) {
            var n = $(e.currentTarget), i = n.data("baseUrl") + "/";
            i += t.motorbikeBrand.name.toLowerCase().replace(/ /g, "_").replace(/-/g, "__") + "-", 0 != t.motorbikeModel.id && (i += t.motorbikeModel.name.toLowerCase().replace(/ /g, "_").replace(/-/g, "__") + "-", 0 != t.motorbikeYear.id && (i += t.motorbikeYear.value + "?p=1&nidx")), "-" == i.slice(-1) && (i = i.substring(0, i.length - 1), i += "?p=1&nidx"), document.location.href = i
        }
    }

    angular.module("motorbikeForm", []).controller("MotorbikeFormCtrl", ["$scope", "$http", t])
}();

function initSearchCtrl() {
    "use strict";

    function SearchController($scope, $window, $http, $timeout, $location, o, a, SearchService) {
        function l() {
            motocard.viewData.department && ($scope.data.selectedDepartments = [motocard.viewData.department.id]), window.location.pathname.indexOf("/blog/") > -1 && ($scope.data.selectedDepartments = ["blog"])
        }

        function c() {
            "string" == typeof $scope.data.masterSearch && $scope.data.masterSearch.length >= 3 && ($scope.data.focus || motocard.viewData.is_mobile) ? u() : $scope.data.showSearchWindow = !1
        }

        function u() {
            $timeout.cancel($scope.data.searchTimeout), $scope.data.selectedDepartments.indexOf("blog") > -1 ? $scope.data.searchTimeout = $timeout(function () {
                g()
            }, 300) : ($scope.data.posts = [], $scope.data.searchTimeout = $timeout(function () {
                f()
            }, 300))
        }

        function d() {
            $http({method: "GET", url: "/ajax/search/banner?q=" + $scope.data.masterSearch}).success(function (e) {
                $scope.data.banner = e
            })
        }

        function f(e) {
            $scope.data.loading = !0, e || ($(".live-search-results").animate({scrollTop: 0}, "fast"), b = 0);
            var n = $scope.data.masterSearch, o = motocard.viewData.language.code, a = $scope.data.selectedDepartments,
                s = $scope.data.selectedCategories.join(), l = $scope.data.selectedSections.join(),
                c = $scope.data.selectedBrands.join(), u = $scope.data.selectedStatuses.join(), f = [];
            a.forEach(function (t) {
                f.push("departments:" + t)
            }), $scope.facetFilters = [f], $scope.data.selectedSections.length > 0 && $scope.facetFilters.push(["section." + o + ":" + l]), $scope.data.selectedCategories.length > 0 && $scope.facetFilters.push(["category." + o + ":" + s]), $scope.data.selectedBrands.length > 0 && $scope.facetFilters.push(["brand:" + c]), $scope.data.selectedStatuses.length > 0 && $scope.facetFilters.push(["status:" + u]);
            var m = "Otras";
            motocard.viewData.product && (m = "Producto"), motocard.viewData.motorbikeBrands && (m = "Home"), motocard.viewData.currentOrder && motocard.viewData.currentPage && (m = "Listado"), algoliaSearchIndex.search({
                query: n,
                attributesToRetrieve: ["objectID", "description." + o, "name", "brand", "average_rating", "image", "preorder", "outlet", "sizes", "reference", "url", "prices", "status", "hideDiscountTagsFr"],
                restrictSearchableAttributes: ["name", "brand", "sizes", "reference", "description." + o, "section." + o, "category." + o, "properties." + o, "motorbikes.brand", "motorbikes.name"],
                analyticsTags: ["Idioma: " + motocard.viewData.language.code, "País: " + motocard.viewData.country.name.es, "Página: " + m],
                hitsPerPage: 50,
                page: b,
                analytics: !0,
                attributesToSnippet: "*:20",
                getRankingInfo: !0,
                snippetEllipsisText: "…",
                responseFields: "*",
                facets: "*,departments,brand,section." + o + ",category." + o + ",status",
                facetFilters: $scope.facetFilters
            }, function (n) {
                var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, a = o.hits, s = o.facets,
                    l = o.nbHits;
                if (n) throw n;
                for (var c = 0; c < a.length; c++) "UNICA" == a[c].sizes && (a[c].sizes = motocard.viewData.translations.UNIQUE_SIZE), a[c].hideDiscountTagsFr && motocard.viewData.is_france_law && (a[c].hideDiscountTags = !0);
                $scope.data.products = e ? $scope.data.products.concat(a) : a, $scope.data.showSearchWindow = !0, $scope.data.aggregations = s, $scope.data.total = l, $location.hash("search-" + base64_encode(JSON.stringify(p()))), h(), d(), $scope.trackSearch("search"), $scope.$evalAsync(function () {
                    $timeout(function () {
                        $scope.data.lastRefresh = Date.now(),
                            $scope.data.loading = !1
                    }, 0)
                })
            })
        }

        function h() {
            if ($scope.data.aggregations && $scope.data.aggregations) {
                var e = $scope.data.aggregations;
                e.categories && ($scope.data.selectedCategories.forEach(function (t) {
                    var n = e.categories.categories.buckets.find(function (e) {
                        return e.key === t
                    });
                    n || e.categories.categories.buckets.unshift({key: t, doc_count: 0})
                }), $scope.data.selectedBrands.forEach(function (t) {
                    var n = e.brands.brands.buckets.find(function (e) {
                        return e.key === t
                    });
                    n || e.brands.brands.buckets.unshift({key: t, doc_count: 0})
                }), $scope.data.selectedStatuses.filter(function (t) {
                    return e[t] && e[t].doc_count > 0
                }))
            }
        }

        function p() {
            return {
                q: $scope.data.masterSearch,
                depts: $scope.data.selectedDepartments,
                cats: $scope.data.selectedCategories,
                brands: $scope.data.selectedBrands,
                stats: $scope.data.selectedStatuses
            }
        }

        function m(e) {
            $scope.data.masterSearch = e.q, $scope.data.selectedDepartments = e.depts, $scope.data.selectedCategories = e.cats, $scope.data.selectedBrands = e.brands, $scope.data.selectedStatuses = e.stats
        }

        function g() {
            $scope.data.total = 0, $scope.data.loading = !0, $http({
                method: "GET",
                url: "/ajax/search/blog?lang=" + motocard.viewData.language.code + "&action=searchwp_live_search&swpengine=default&swpquery=" + $scope.data.masterSearch
            }).success(function (e) {
                $scope.data.posts = e.data, $scope.data.showSearchWindow = !0, $scope.data.total = e.totalPosts, $timeout(function () {
                    $scope.data.loading = !1
                }, 0)
            })
        }

        function v() {
            if ($scope.data.tabletMode = $window.innerWidth <= 1179, $scope.data.tabletMode) {
                var n = $(".live-search-wrapper:not(.ng-hide)");
                if (n.length) {
                    var i = $(".right-menu-search"), r = i.offset().left + i.width() / 2 - n.offset().left;
                    $(".live-search-wrapper .caret").css("left", r + "px")
                }
            } else $(".live-search-wrapper .caret").css("left", "50%")
        }

        function toggleMobileSearch() {
            $scope.data.showMobileSearch = !$scope.data.showMobileSearch, $("body").toggleClass("is-search-open"), $scope.data.showMobileSearch ? (!$location.hash() && x && $location.hash(x), $timeout(function () {
                angular.element("#master-search-input").focus()
            }, 300)) : (x = $location.hash(), $location.hash(""))
        }

        function w() {
            var t = $(window).width();
            t < 1600 && t >= 1500 ? C.css("width", "70%") : t < 1500 ? C.css("width", "80%") : C.css("width", "60%")
        }

        var b = 0, x = "";
        if ($scope.data = SearchService, $scope.motocard = motocard, $scope.data.searchTimeout = !1, $scope.data.loading = !1, $scope.data.focus = !1, $scope.data.banner = !1, $scope.data.tabletMode = $window.innerWidth <= 1179, $scope.data.showFilters = !1, $scope.data.showMobileSearch = !1, $scope.data.products = [], $scope.data.posts = !1, $scope.data.openOnInit = !1, $scope.data.selectedDepartments = [1, 2], $scope.data.selectedCategories = [], $scope.data.selectedSections = [], $scope.data.selectedBrands = [], $scope.data.selectedStatuses = [], $scope.data.masterSearch = "", $scope.data.elementsPerFilter = 5, $scope.data.moneyService = o, $scope.data.Math = window.Math, $scope.rateId = 1, "b2b" == motocard.viewData.platform && motocard.viewData.client.rate_id && ($scope.rateId = motocard.viewData.client.rate_id), $scope.data.range = function (t) {
            for (var e = [], n = 0; n < t; n++) e.push(n);
            return e
        }, $scope.data.filterMenuOptions = {
            onClick: {preventDefault: !1},
            classNames: {fixedElements: {fixed: "mobile-header"}},
            offCanvas: {position: "right"},
            scrollBugFix: {fix: !1},
            navbar: {add: !1},
            extensions: ["pagedim-white"]
        }, $scope.data.searchPlaceholder = motocard.viewData.translations.SEARCH_PLACEHOLDER_ALL, !motocard.viewData.is_mobile) {
            var C = $(".live-search-wrapper");
            C.height($(window).height() - 140), w(), $(window).on("resize", function () {
                C.height($(window).height() - 140), w()
            })
        }
        motocard.viewData.is_tablet && (angular.element($window).on("resize", v), $scope.$watch("[data.showSearchWindow,data.focus,data.masterSearch]", function () {
            $scope.data.showSearchWindow && $scope.data.focus && $scope.data.masterSearch.length && $timeout(function () {
                v()
            })
        }));
        var k = $location.hash();
        if (k) {
            var S = k.split("-");
            if ("search" === S[0]) {
                var _ = base64_decode(S[1]);
                m(JSON.parse(_)), motocard.viewData.is_mobile ? $scope.data.openOnInit = !0 : angular.element("#master-search-input").focus()
            }
        }
        l(), "master-search-input" === document.activeElement.id && ($scope.data.focus = !0, $scope.data.showSearchWindow = !0),
            $scope.data.fullSearch = function (e, n) {
                (n && 13 === n.keyCode || !n) && (motocard.viewData.is_mobile ? angular.element("#master-search-input").blur() : (a.track("search-do-full-search"), $scope.trackSearch("search"), $scope.data.doFullSearch())), n && 27 === n.keyCode && ($scope.data.showSearchWindow = !1)
            }, $scope.data.initMasterSearch = function (e) {
            e && ($scope.data.masterSearch = e)
        }, $scope.data.manageDepartments = function (e) {
            $scope.data.products = [], $scope.data.fallbackProducts = [], $scope.data.posts = [], $scope.data.selectedDepartments.indexOf(e) === -1 ? "blog" !== e ? ($scope.data.selectedDepartments.indexOf("blog") > -1 && $scope.data.selectedDepartments.splice($scope.data.selectedDepartments.indexOf("blog"), 1), $scope.data.selectedDepartments.push(e)) : $scope.data.selectedDepartments = [e] : $scope.data.selectedDepartments.splice($scope.data.selectedDepartments.indexOf(e), 1), c()
        }, $scope.data.manageCategories = function (e) {
            $scope.data.selectedCategories.indexOf(e) === -1 ? $scope.data.selectedCategories.push(e) : $scope.data.selectedCategories.splice($scope.data.selectedCategories.indexOf(e), 1), f()
        }, $scope.data.manageSections = function (e) {
            $scope.data.selectedSections.indexOf(e) === -1 ? $scope.data.selectedSections.push(e) : $scope.data.selectedSections.splice($scope.data.selectedSections.indexOf(e), 1), f()
        };
        $scope.data.manageBrands = function (e) {
            $scope.data.selectedBrands.indexOf(e) === -1 ? $scope.data.selectedBrands.push(e) : $scope.data.selectedBrands.splice($scope.data.selectedBrands.indexOf(e), 1), f()
        };
        $scope.data.manageStatuses = function (e) {
            $scope.data.selectedStatuses.indexOf(e) === -1 ? $scope.data.selectedStatuses.push(e) : $scope.data.selectedStatuses.splice($scope.data.selectedStatuses.indexOf(e), 1), f()
        };

        $scope.data.resetFilters = function (e) {
            $scope.data.selectedCategories = [], $scope.data.selectedBrands = [], $scope.data.selectedStatuses = [], "undefined" == typeof e && (e = !0), e && f()
        };

        $scope.data.next = function () {
            !$scope.data.loading && $scope.data.lastRefresh < Date.now() - 200 && $scope.data.total && $scope.data.total > $scope.data.products.length && (b++, f(!0))
        };

        $scope.data.close = function () {
            $location.hash(""), $scope.data.focus = !1, $scope.data.showSearchWindow = !1, $("body").removeClass("no-scroll")
        };

        $scope.data.expandFilter = function (t) {
            var e = $(t.currentTarget);
            e.parents(".filter-block").toggleClass("collapsed"), e.children("i").toggleClass("icon-minus icon-plus")
        };

        $scope.data.openTabletInput = function () {
            $scope.data.showSearchWindow = !0, $scope.data.focus = !0, $timeout(function () {
                $($scope.data.tabletMode ? "#master-search-input-tablet" : "#master-search-input").focus()
            }, 300)
        };

        $scope.data.toggleMobileSearch = toggleMobileSearch;

        $scope.$watch("data.masterSearch", function (e) {
            e && e.length < 3 && ($scope.data.resetFilters(!1), $scope.data.aggregations = [], $scope.data.products = [], $scope.data.fallbackProducts = [], $scope.data.banner = !1, $scope.data.posts = !1, $scope.data.showSearchWindow = !1, $scope.data.focus = !0), c()
        });

        $scope.$watch("data.focus", function () {
            motocard.viewData.is_mobile || c()
        });

        $scope.data.doFullSearch = function () {
            if ($scope.data.masterSearch.length >= 3) {
                var e = motocard.viewData.departmentBaseRoute_1;
                $scope.data.selectedDepartments.indexOf("blog") > -1 ? e += ("/" === e.substr(e.length - 1) ? "" : "/") + "blog/?s=" + encodeURIComponent($scope.data.masterSearch) : (e = motocard.viewData["departmentBaseRoute_" + (motocard.viewData.department.id + "")], e += "?q=" + encodeURIComponent($scope.data.masterSearch) + "&p=1&nidx"), document.location = e
            }
        };

        $scope.trackSearch = function (e) {
            $http({method: "POST", url: "/ajax/track-search", data: {type: e, query: $scope.data.masterSearch}})
        }
    }

    /*
    angular.module("search", ["infinite-scroll", "ngSanitize"]).factory("SearchService", function () {
        return {Math: Math}
    }).controller("SearchCtrl", ["$scope", "$window", "$http", "$timeout", "$location", "MoneyService", "TrackActivityService", "SearchService", SearchController])

     */
};
initSearchCtrl(),

    function () {
        "use strict";

        function t(t, e) {
            t.closed = !1, t.close = function () {
                t.closed = !0, e({
                    url: "/ajax/set-daily-cookie/shared_show_sitewide_message_2",
                    method: "GET"
                }), $(".with-sitewide-message").removeClass("with-sitewide-message")
            }, t.moreInfo = function () {
                e({url: "/ajax/set-daily-cookie/shared_show_sitewide_message_2", method: "GET"}).then(function () {
                    document.location = "/covid19.html"
                })
            }
        }

        angular.module("sitewideMessage", []).controller("SitewideMessage", ["$scope", "$http", t]), motocard.addAngularModule("sitewideMessage")
    }(), function () {
    "use strict";

    function t(t, e) {
        t.errorMessage = !1, t.showHoverMenu = !1, t.data = {};
        var n = $(".menu-order-tracking-form"), i = n.find("input[name=order]"), r = n.find("input[name=email]");
        t.$watch("data", function () {
            t.errorMessage = !1
        }, !0), t.hideMenu = function () {
            i.is(":focus") || r.is(":focus") || (t.showHoverMenu = !1)
        }, t.showMenu = function () {
            t.showHoverMenu = !0
        }, t.track = function () {
            t.trackingForm.$valid && (t.loading = !0, e({
                url: "/ajax/get-tracking-url",
                method: "GET",
                params: t.data
            }).success(function (t) {
                document.location.href = t.tracking_url
            }).error(function (e) {
                t.loading = !1, t.errorMessage = e.error
            }))
        }
    }

    angular.module("tracking", []).controller("TrackingCtrl", ["$scope", "$http", t])
}(), $(document).ready(function () {
    $(".brands .expand-block a").on("click", function () {
        $(".brands .expand-block").hide(), $(".brands .compact-block").show(), $(".brands .all-brands").slideDown()
    }), $(".brands .compact-block a").on("click", function () {
        $(".brands .expand-block").show(), $(".brands .compact-block").hide(), $(".brands .all-brands").slideUp()
    })
}), function () {
    "use strict";

    function t(t, e, n, i, r) {
        e.openRegisterModal = r.openRegisterModal
    }

    angular.module("footerCtrl", []).controller("FooterCtrl", ["$rootScope", "$scope", "$http", "$window", "AccountService", t]), motocard.addAngularModule("footerCtrl")
}(), function () {
    "use strict";

    function t(t, e, n, i, r) {
        t.isModal = !1, t.saved = !1, t.closed = !1, t.show = !1, t.showMoreInfo = !1, t.alreadySubscribed = !1, t.privacy = {
            notifications: !1,
            customizeContent: !1
        }, e.$on("openPrivacyMoreInfoModal", function () {
            t.showMoreInfo = !0, e.$apply()
        }), e.$on("openGdprModal", function () {
            motocard.viewData.client && motocard.viewData.client.groups.length && (t.alreadySubscribed = !0), t.show = !0, e.$apply()
        }), i(function () {
            t.isModal || "object" != typeof motocard.viewData.consent || (t.privacy = {
                notifications: !!motocard.viewData.consent.notifications,
                customizeContent: !!motocard.viewData.consent.customizeContent
            })
        }), motocard.viewData.showGdprModal && (t.show = !0), motocard.viewData.client && motocard.viewData.client.groups.length && (t.alreadySubscribed = !0), t.save = function () {
            n({url: "/ajax/account/gdpr-consent", method: "POST", data: t.privacy}).success(function () {
                t.isModal || swal("", motocard.viewData.translations.ACCOUNT_DATA_SAVED, "success"), t.saved = !0
            })
        }, t.confirmDelete = function () {
            swal({
                title: motocard.viewData.translations.DATA_LOST,
                type: "error",
                html: "<p>" + motocard.viewData.translations.DATA_LOST_LONG + "</p><p>" + motocard.viewData.translations.IRREVERSIBLE_PROCESS + "</p>",
                showCancelButton: !0,
                confirmButtonText: '<i class="icon-attention"></i> ' + motocard.viewData.translations.DELETE_ACCOUNT,
                cancelButtonText: motocard.viewData.translations.GET_ME_OUT,
                customClass: "delete-account",
                preConfirm: function () {
                    return new Promise(function (t) {
                        r.delay = 0, r.setLoaderActive(!0), t(), n({
                            method: "DELETE",
                            url: "/ajax/account/destroy"
                        }).success(function () {
                            window.location = motocard.viewData["departmentBaseRoute_" + motocard.viewData.department.id]
                        }).error(function () {
                            r.setLoaderActive(!1), setTimeout(function () {
                                swal("", motocard.viewData.translations.ERROR, "error")
                            }, 1e3)
                        })
                    })
                }
            })
        }
    }

    angular.module("privacy", []).controller("PrivacyCtrl", ["$scope", "$rootScope", "$http", "$timeout", "MotoLoaderService", t]), motocard.addAngularModule("privacy")
}(), function () {
    "use strict";

    function t(t, e, n, i) {
        e.client = motocard.viewData.client, e.subscribedNewsletterList = [], e.sendingForm = !1;
        var r = $('label[for="gdpr-legal-accept-newsletter"]').webuiPopover({
            trigger: "manual",
            animation: "pop",
            multi: !0,
            width: 270
        });
        e.$watch("newsletterForm.data.termsAccepted", function (t) {
            t === !0 && r.webuiPopover("hide")
        }), t.$on("clientLoggedIn", function (t, n) {
            e.client = n
        }), e.$watch("client", function (t) {
            t && angular.forEach(t.groups, function (t) {
                e.subscribedNewsletterList.push(t.id)
            })
        }), e.$watch("subscribedNewsletterList", function (t) {
            t.length > 0 && (e.newsletterNotSelected = !1)
        }, !0), e.toggleSubscribe = function (t) {
            var n = !1;
            e.subscribedNewsletterList.indexOf(t) > -1 ? e.subscribedNewsletterList.splice(e.subscribedNewsletterList.indexOf(t), 1) : (e.subscribedNewsletterList.push(t), n = !0), e.client && e.subscribeToNewsletter(null, n)
        }, e.subscribeToNewsletter = function (t, i) {
            n({
                url: "/ajax/subscribed-newsletter",
                method: "PUT",
                data: {id: t, groups: e.subscribedNewsletterList}
            }).success(function () {
                i || void 0 === i ? swal("", motocard.viewData.translations.FORM_SUCCESS, "success") : swal("", motocard.viewData.translations.UNSUBSCRIBED, "success")
            }).error(function () {
                swal("", motocard.viewData.translations.FORM_ERROR, "error")
            })
        }, e.submit = function () {
            if (e.newsletterForm.$setSubmitted(), e.newsletterForm.errorMessage = !1, e.newsletterNotSelected = !1, e.$watch("newsletterForm.data.email", function () {
                e.newsletterForm.email.$setValidity("unique", !0)
            }), e.newsletterForm.$valid) {
                var o = null;
                if (e.newsletterForm.data.checkboxRegister && (o = e.newsletterForm.data.password), e.subscribedNewsletterList.length < 1) return e.newsletterNotSelected = !0, smoothScroll($("#newsletter-required-alert"), !0), !1;
                if (!e.newsletterForm.data.termsAccepted) return r.webuiPopover("show"), !1;
                r.webuiPopover("hide"), e.sendingForm = !0, n({
                    url: "/ajax/get-subscribed-newsletters",
                    method: "POST",
                    data: {email: e.newsletterForm.data.email}
                }).success(function (r) {
                    var a = r.length;
                    n({
                        url: "/ajax/register",
                        method: "POST",
                        data: {
                            name: e.newsletterForm.data.name,
                            surnames: e.newsletterForm.data.surnames,
                            email: e.newsletterForm.data.email,
                            password: o,
                            source: "newsletter",
                            age: e.newsletterForm.data.age,
                            subscribe: "true",
                            groups: e.subscribedNewsletterList
                        }
                    }).success(function (n) {
                        e.subscribedNewsletterList = [], "object" == typeof n && o ? (t.$broadcast("loginClient", n), i(function () {
                            t.$broadcast("openGdprModal")
                        }, 1e3)) : swal("", motocard.viewData.translations.FORM_SUCCESS, "success"), e.newsletterForm.data = {}, e.newsletterForm.$setPristine(), 0 == a && motocard.viewData.cookie_consent.statistics && (gtag("event", "register", {
                            send_to: "ga",
                            event_category: "Newsletter"
                        }), fbq("trackCustom", "SubscribeNewsletter", {}))
                    }).error(function (t) {
                        "undefined" != typeof t.email && e.newsletterForm.email.$setValidity("unique", !1)
                    })["finally"](function () {
                        e.sendingForm = !1
                    })
                })
            }
        }
    }

    function e(t, e, n, i, r) {
        var o = /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, a = null;
        n(function () {
            a = $(".subscribe-modal .mc-checkbox-label, .subscribe .mc-checkbox-label").webuiPopover({
                trigger: "manual",
                animation: "pop",
                multi: !0,
                width: 270
            })
        }, 600), e.$watch("formData.termsAccepted", function (t) {
            t === !0 && a.webuiPopover("hide")
        }), e.$watch("formData.email", function () {
            e.success = !1, e.alreadySubscribed = !1
        }), e.formData = {newsletter: [], termsAccepted: !1}, e.cancel = function () {
            r && ($(".subscribe-modal").removeClass("fadeInUp").addClass("fadeOutDown"), n(function () {
                r.dismiss("cancel")
            }, 500))
        }, e.subscribeMe = function () {
            if (e.formData.termsAccepted) if (o.test(e.formData.email)) if (e.wrongEmail = !1, e.formData.newsletter.indexOf(!0) !== -1) {
                e.selectOne = !1;
                var t = [];
                e.formData.newsletter.forEach(function (e, n) {
                    e && t.push(n)
                }), e.loading = !0, i({
                    url: "/ajax/get-subscribed-newsletters",
                    method: "POST",
                    data: {email: e.formData.email}
                }).success(function (r) {
                    if ($(t).not(r).get().length > 0) {
                        var o = r.length;
                        e.alreadySubscribed = !1, i({
                            url: "/ajax/register",
                            method: "POST",
                            data: {name: "", surnames: "", email: e.formData.email, groups: t}
                        }).success(function (t) {
                            e.success = !0, e.loading = !1, e.formData.email = "", n(function () {
                                e.cancel()
                            }, 1e3), t.exists || 0 == o && motocard.viewData.cookie_consent.statistics && (gtag("event", "modal-register", {
                                send_to: "ga",
                                event_category: "Newsletter"
                            }), fbq("trackCustom", "SubscribeNewsletter", {}))
                        })
                    } else e.alreadySubscribed = !0, e.loading = !1
                })
            } else e.selectOne = !0; else e.wrongEmail = !0; else a.webuiPopover("show")
        }
    }

    function n(t, n, i) {
        if (motocard.viewData.showNewsletterModal) {
            if (location.href.indexOf("/blog/") > -1) return;
            n({url: "/ajax/NewsletterModal.rails", method: "GET"});
            var r = {
                templateUrl: "newsletter-modal.html",
                windowClass: "subscribe-modal animated swing",
                size: "small",
                resolve: {},
                controller: ["$rootScope", "$scope", "$timeout", "$http", "$modalInstance", e]
            };
            i(function () {
                t.open(r)
            }, 5e3)
        }
    }

    angular.module("newsletter", []).controller("NewsletterFormCtrl", ["$rootScope", "$scope", "$http", "$timeout", t]).controller("NewsletterFieldCtrl", ["$rootScope", "$scope", "$timeout", "$http", e]).run(["$modal", "$http", "$timeout", n]), motocard.addAngularModule("newsletter")
}(), function () {
    "use strict";

    function t(t, e, n, i, r) {
        var o = /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, a = null;
        n(function () {
            a = $(".promotion-modal .promotion-checkbox-label").webuiPopover({
                trigger: "manual",
                animation: "pop",
                multi: !0,
                width: 270
            })
        }, 600), e.$watch("formData.termsAccepted", function (t) {
            t === !0 && a.webuiPopover("hide")
        }), e.$watch("formData.email", function () {
            e.success = !1, e.alreadySubscribed = !1
        }), e.formData = {newsletter: [], termsAccepted: !1}, e.cancel = function () {
            r && ($(".promotion-modal").removeClass("fadeInUp").addClass("fadeOutDown"), n(function () {
                r.dismiss("cancel")
            }, 500))
        }, e.subscribeMe = function () {
            if (e.formData.termsAccepted) if (o.test(e.formData.email)) if (e.wrongEmail = !1, e.formData.newsletter.indexOf(!0) !== -1) {
                e.selectOne = !1;
                var t = [];
                e.formData.newsletter.forEach(function (e, n) {
                    e && t.push(n)
                }), e.loading = !0, i({
                    url: "/ajax/validate-promotion-email",
                    method: "POST",
                    data: {email: e.formData.email}
                }).success(function (r) {
                    i({
                        url: "/ajax/get-subscribed-newsletters",
                        method: "POST",
                        data: {email: e.formData.email}
                    }).success(function (r) {
                        var o = r.length;
                        e.alreadySubscribed = !1, i({
                            url: "/ajax/register",
                            method: "POST",
                            data: {name: "", surnames: "", promotion: !0, email: e.formData.email, groups: t}
                        }).success(function (t) {
                            e.success = !0, e.loading = !1, e.formData.email = "", n(function () {
                                e.cancel()
                            }, 1e3), swal("", motocard.viewData.translations.PROMOTION_FORM_SUCCESS, "success"), t.exists || 0 == o && motocard.viewData.cookie_consent.statistics && (gtag("event", "modal-register", {
                                send_to: "ga",
                                event_category: "Newsletter"
                            }), gtag("event", "discount-register", {
                                send_to: "ga",
                                event_category: "Newsletter"
                            }), fbq("trackCustom", "SubscribeNewsletter", {}))
                        })
                    })
                }).error(function (t) {
                    e.success = !1, e.loading = !1, swal("", t, "error")
                })
            } else e.selectOne = !0; else e.wrongEmail = !0; else a.webuiPopover("show")
        }
    }

    function e(e, n, i) {
        if (motocard.viewData.showPromotionModal) {
            if (location.href.indexOf("/blog/") > -1) return;
            n({url: "/ajax/set-cookie/promotion_modal", method: "GET"}), n({
                url: "/ajax/NewsletterModal.rails",
                method: "GET"
            });
            var r = {
                templateUrl: "promotion-modal.html",
                windowClass: "subscribe-modal promotion-modal animated swing",
                size: "small",
                resolve: {},
                controller: ["$rootScope", "$scope", "$timeout", "$http", "$modalInstance", t]
            };
            i(function () {
                e.open(r)
            }, 5e3)
        }
    }

    angular.module("promotion", []).controller("PromotionsFormCtrl", ["$rootScope", "$scope", "$timeout", "$http", t]).run(["$modal", "$http", "$timeout", e]), motocard.addAngularModule("promotion")
}();
