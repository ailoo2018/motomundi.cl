// swal


!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Sweetalert2 = e()
}(this,
    function () {
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
    }), window.Sweetalert2 && (window.sweetAlert = window.swal = window.Sweetalert2);

// end swal

if (context === undefined) {
    var context = new FilterContext();
}

function smoothScroll(t, e, n) {
    return t ? (e ? jQuery("html, body").animate({scrollTop: t.offset().top - jQuery(window).height() / 2 + t.height() / 2}, 500) : jQuery("html, body").animate({scrollTop: t.offset().top - 50}, 500), void ("function" == typeof n && n())) : (jQuery("html, body").animate({scrollTop: 0}), void ("function" == typeof n && n()))
}

angular.module("mm").service('mmservice', function ($rootScope, $http) {

    var config = {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};

    $rootScope.$on("contextChanged", function () {
        //   alert("context changed")
    });

    this.addPackToCart = function (pack, callback) {
        var packContents = [];
        var featuresIds = [];
        if(pack.mainProduct.selectedSize && pack.mainProduct.selectedSize.id > 0)
            featuresIds.push(pack.mainProduct.selectedSize.id);
        if(pack.mainProduct.selectedColor && pack.mainProduct.selectedColor.id > 0)
            featuresIds.push(pack.mainProduct.selectedColor.id);

        packContents.push({
            productId: pack.mainProduct.id,
            features: featuresIds,
            quantity: 1,
        });

        for(var p of pack.products){
            featuresIds = [];
            if(p.selectedSize && p.selectedSize.id > 0)
                featuresIds.push(p.selectedSize.id);
            if(p.selectedColor && p.selectedColor.id > 0)
                featuresIds.push(p.selectedColor.id);
            packContents.push({
                productId: p.id,
                features: featuresIds,
                quantity: 1,
            });
        }

        console.log("/Cart/AddToCart.rails********")

        $http.post("/Cart/AddToCart.rails", {
            productType: 2,
            packId: pack.id,
            quantity: 1,
            packContents: packContents,
        })
            .then(function (result) {
                callback.success(result);
            });
    };

    this.findPacks = function (productId, callback) {
        $http.get("/Product/FindPacks.rails", {params: {productId: productId}})
            .then(function (result) {
                callback.success(result.data);
                return;

            });
    };

    this.listMotorBikeBrands = function (callback) {
        $http.get("/ProductJson/ListManufacturers.rails")
            .then(function (result) {
                callback.success(result);
                return;

            });
    };

    this.listModels = function (bikeBrandId, callback) {
        loadProducts("/ProductJson/ListProducts.rails?bikeBrandId=" + bikeBrandId, {
            success: function (result) {
                callback.success(result.data.bikeModels);
            }
        });
    };

    this.listBikeYears = function (bikeModelId, callback) {
        loadProducts("/ProductJson/ListProducts.rails?bikeModelId=" + bikeModelId, {
            success: function (result) {
                callback.success(result.data.bikeYears);
            }
        });
    };

    this.getOemPartsBrand = function (brandId, callback) {
        $http.get("/ProductJson/ListDiagramBrand.rails?oemBrandId=" + brandId)
            .then(function (result) {
                callback.success(result);
                return;

            });
    };

    this.listOemPartsBrands = function (callback) {
        $http.get("/ProductJson/ListDiagramBrands.rails")
            .then(function (result) {
                callback.success(result);
                return;

            });
    };

    this.listOemPartsModels = function (oemBrandId, callback) {
        $http.get("/ProductJson/ListDiagramModel.rails?oemBrandId=" + oemBrandId)
            .then(function (result) {
                callback.success(result);
                return;

            });
    };

    this.listOemPartsVersions = function (oemModelId, callback) {
        $http.get("/ProductJson/ListDiagramVersion.rails?oemModelId=" + oemModelId)
            .then(function (result) {
                callback.success(result);
                return;

            });
    };

    this.findOemParts = function (oemPartCode, callback) {
        $http.get("/ProductJson/GetPart.rails?oemPartCode=" + oemPartCode)
            .then(function (result) {
                callback.success(result);
                return;

            });
    };


    this.listOemPartsNames = function (oemVersionId, callback) {
        $http.get("/ProductJson/ListDiagramNames.rails?oemVersionId=" + oemVersionId)
            .then(function (result) {
                callback.success(result);
                return;

            });
    };

    function loadProducts(url, callback) {
        $http({
            url: url,
            method: "GET",
        }).then(function (ret) {
            if (callback != null)
                callback.success(ret);
            $rootScope.$broadcast('filterUpdated', ret.data);
        });

    }


})
    .filter("transReplace", function () {
        return function (e, t) {
            var n = e;
            for (var r in t)
                if (t.hasOwnProperty(r)) {
                    var i = new RegExp(":" + r, "g");
                    n = n.replace(i, t[r])
                }
            return n
        }
    });


angular.module("mm").controller("MotorbikeFormCtrl", function ($scope, $rootScope, mmservice) {

    $scope.motorbikeBrands = [];
    $scope.motorbikeModels = [];
    $scope.motorbikeYears = [];
    $scope.sendDisable = true;


    $scope.motorbikeBrand = $scope.motorbikeBrands[0];

    $scope.$watch("motorbikeBrand", function (newVal, oldVal) {
        if (newVal == null || newVal.id == 0)
            return;

//        $rootScope.$emit("contextChanged", { field: "motorbikeBrand" });

        context.addParam("bikeBrandId", newVal.id, newVal.name);

        $scope.motorbikeModelsLoading = true;


        mmservice.listModels(newVal.id, {
            success: function (result) {

                $scope.motorbikeModels = result;
                $scope.motorbikeModelsLoading = false;

                var empty = {id: 0, name: "SELECCIONA MODELO..."};
                $scope.motorbikeModels.unshift(empty);
                $scope.motorbikeModel = empty;

            }
        });
    });


    $scope.$watch("motorbikeModel", function (newVal, oldVal) {
        if (newVal == null || newVal.id == 0)
            return;

        $scope.motorbikeYearsLoading = true;
        context.addParam("bikeModelId", newVal.id, newVal.name);
        mmservice.listBikeYears(newVal.id, {
            success: function (result) {
                $scope.motorbikeYears = result;
                $scope.motorbikeYearsLoading = false;
                var empty = {id: 0, name: "SELECCIONA AÑO..."};
                $scope.motorbikeYears.unshift(empty);
                $scope.motorbikeYear = empty;

            }
        });
    });

    $scope.$watch("motorbikeYear", function (newVal, oldVal) {
        if (newVal == null || newVal.id == 0) {
            $scope.sendDisable = true;
            return;
        }

        $scope.sendDisable = false;
        context.addParam("bikeYear", newVal.id, newVal.name);

//        alert(context.getPath("/Product/ListProducts.rails?a=1"));
    });

    $scope.filterMotorbikeProducts = function (e) {
        var bikeModelId = context.findAllByName("bikeModelId")[0].value;
        var bikeYear = context.findAllByName("bikeYear")[0].value;

        window.location.href = "/Product/ListProducts.rails?bikeModelId=" + bikeModelId + "&bikeYear=" + bikeYear;
    };

    $scope.motorbikeBrandsLoading = true;
    mmservice.listMotorBikeBrands({
        success: function (result) {
            $scope.motorbikeBrands = result.data;

            var empty = {id: 0, name: "SELECCIONA MARCA..."};
            $scope.motorbikeBrand = empty;
            $scope.motorbikeBrands.unshift(empty);
            $scope.motorbikeBrandsLoading = false;
        }
    });
});


angular.module("mm").controller("OemPartsFormCtrl", function ($scope, $rootScope, mmservice) {

    $scope.oemPartsBrand = null;
    $scope.oemPartsModels = [];
    $scope.oemPartsVersions = [];
    $scope.sendDisable = true;

    $scope.oemPartsBrandsLoading = true;
    mmservice.getOemPartsBrand(brandId, {
        success: function (result) {
            $scope.oemPartsBrand = result.data && result.data.length > 0
                ? result.data[0]
                : null;

            if ($scope.oemPartsBrand) {
                context.addParam("oemBrandId", $scope.oemPartsBrand.id, $scope.oemPartsBrand.name);

                $scope.oemPartsModelsLoading = true;
                mmservice.listOemPartsModels($scope.oemPartsBrand.id,
                    {
                        success: function (result) {
                            $scope.oemPartsModels = result.data;

                            var empty = {id: 0, name: "SELECCIONA MODELO..."};
                            $scope.oemPartsModels.unshift(empty);
                            $scope.oemPartsModel = empty;
                            $scope.oemPartsModelsLoading = false;

                            if (!$scope.settedModel) {
                                $scope.settedModel = true;

                                for (var i = 0; i < $scope.oemPartsModels.length; i++) {
                                    if ($scope.oemPartsModels[i].id == modelId) {
                                        $scope.oemPartsModel = $scope.oemPartsModels[i];

                                        break;
                                    }
                                }

                            }
                        }
                    });
            }
        }
    });

    $scope.settedModel = false;

    $scope.$watch("oemPartsModel", function (newVal, oldVal) {
        if (newVal == null || newVal.id == 0)
            return;

        $scope.oemPartsVersionsLoading = true;
        context.addParam("oemModelId", newVal.id, newVal.name);
        mmservice.listOemPartsVersions(newVal.id, {
            success: function (result) {
                $scope.oemPartsVersions = result.data;

                $scope.oemPartsVersionsLoading = false;
                var empty = {id: 0, name: "SELECCIONA VERSION..."};
                $scope.oemPartsVersions.unshift(empty);
                $scope.oemPartsVersion = empty;
            }
        });
    });

    $scope.$watch("oemPartsVersion", function (newVal, oldVal) {
        if (newVal == null || newVal.id == 0) {
            $scope.sendDisable = true;
            return;
        }

        $scope.sendDisable = false;
        context.addParam("oemVersionId", newVal.id, newVal.name);
    });

    $scope.filterOemPartsProducts = function (e) {
        window.location.href = ("/repuestos/" + $scope.oemPartsBrand.name.replace(/\s/g, '-') + "/" + $scope.oemPartsVersion.name.replace(/\s/g, '-')).toLowerCase();
    };

});

angular.module("mm").controller("OemPartsRowCtrl", function ($scope, $rootScope, mmservice) {

    $scope.sendDisable = true;
    $scope.oemPartsCount = 1;

    $scope.$watch("oemPartsCount", function (newVal, oldVal) {
        if (!newVal || newVal == 0 || newVal == "") {
            $scope.sendDisable = true;
            return;
        }
        $scope.sendDisable = false;
    });

    $scope.gotoToPay = function (e, id) {
        var count = $scope.oemPartsCount;

        window.location.href = ("/Product/AddToCart.rails?productId=" + id + "&qty=" + count).toLowerCase();
    };
});

angular.module("mm").controller("OemPartsSearch", function ($scope, $rootScope, mmservice) {

    $scope.sendDisable = true;
    $scope.oemPartsCode = '';

    $scope.$watch("oemPartsCode", function (newVal, oldVal) {
        if (!newVal || newVal == 0 || newVal == "") {
            $scope.sendDisable = true;
            return;
        }
        $scope.sendDisable = false;
    });

    $scope.search = function (e) {
        var code = $scope.oemPartsCode;

        if (code) {
            mmservice.findOemParts(code, {
                success: function (result) {
                    if (result.data) {
                        window.location.href = ("/repuestos/" + result.data.Version.Model.Brand.Name.replace(/\s/g, '-') + "/" + result.data.Version.Name.replace(/\s/g, '-') + "/" + result.data.Name.replace(/\s/g, '-')).toLowerCase();
                    }
                }
            });
        }
    };
});
//angular.module("search", ["infinite-scroll"])


angular.module("mm").controller("SearchCtrl", ["$scope", "$http", "$timeout", function ($scope, $http, $timeout) {
    function o() {
        var wdw = $(window).width();
        wdw < 1600 && wdw >= 1500 ? p.css("width", "70%") : wdw < 1500 ? p.css("width", "80%") : p.css("width", "60%")
    }

    $scope.redirectToSearch = function() {
        var url = "/Product/Search.rails?w=" + encodeURIComponent($scope.masterSearch);
        document.location = url;
    }

    function showSearchWindow() {
        "string" == typeof $scope.masterSearch && $scope.masterSearch.length >= 3 && $scope.focus ? l() : $scope.showSearchWindow = !1
    }


    function l() {
        $timeout.cancel(h),
            h = $timeout(function () {
                doSearch()
            }, 300)
    }

    function doSearch(i) {
        $scope.loading = true;
        i || (d = 1);
        var searchUrl = getSearchUrl();
        $http({
            method: "GET",
            url: searchUrl
        }).then(function (ret) {
            var r = ret.data;
            $scope.products = i ? $scope.products.concat(r.results) : r.results;
            $scope.banner = r.banner;
            $scope.aggregations = r.aggregations;
            $scope.total = r.fallback ? 0 : r.total;
            $scope.showSearchWindow = true;
            $scope.fallbackProducts = r.fallback;
            c();
            $scope.$evalAsync(function () {
                $timeout(function () {
                    $scope.lastRefresh = Date.now();
                    $scope.loading = false;
                }, 0)
            });

        })
    }

    function c() {
        if ($scope.aggregations && $scope.aggregations.global_aggs) {
            var e = $scope.aggregations.global_aggs;
            if (e.categories) {
                $scope.selectedCategories.forEach(function (t) {
                    var n = e.categories.categories.buckets.find(function (e) {
                        return e.key === t
                    });
                    n || e.categories.categories.buckets.unshift({
                        key: t,
                        doc_count: 0
                    })
                });
                $scope.selectedBrands.forEach(function (t) {
                    var n = e.brands.brands.buckets.find(function (e) {
                        return e.key === t
                    });
                    n || e.brands.brands.buckets.unshift({
                        key: t,
                        doc_count: 0
                    })
                });
                $scope.selectedStatuses.filter(function (t) {
                    return e[t] && e[t].doc_count > 0
                });
            }
        }
    }

    function getSearchUrl() {
        var e = "/Ajax/QuickSearch.rails?q=" + $scope.masterSearch + "&page=" + d + "&lang=es";
        return $scope.selectedDepartments.length > 0 && (e += "&depts=" + $scope.selectedDepartments.join()),
        $scope.selectedCategories.length > 0 && (e += "&cats=" + $scope.selectedCategories.join()),
        $scope.selectedBrands.length > 0 && (e += "&brands=" + $scope.selectedBrands.join()),
        $scope.selectedStatuses.length > 0 && (e += "&stats=" + $scope.selectedStatuses.join()),
            e;
    }

    $scope.data = {
        Math: Math,
        range: function range(size, startAt = 0) {
            return [...Array(size).keys()].map(i => i + startAt);
        }
    };

    $scope.toggleSearchFilter = function () {
        $scope.showFilters = !$scope.showFilters;
    };

    $scope.test = function () {
        alert("search");
    }

    var d = true;
    var h = false;

    $scope.loading = false;
    $scope.focus = false;
    $scope.banner = false;
    $scope.showFilters = false;
    $scope.showMobileSearch = false;
    $scope.products = [];
    $scope.selectedDepartments = [1, 2, 3];
    $scope.selectedCategories = [];
    $scope.selectedBrands = [];
    $scope.selectedStatuses = [];
    $scope.masterSearch = "";
    $scope.elementsPerFilter = 5;
    $scope.filterMenuOptions = {
        onClick: {
            preventDefault: false
        },
        classNames: {
            fixedElements: {
                fixed: "mobile-header"
            }
        },
        offCanvas: {
            position: "right"
        },
        scrollBugFix: {
            fix: false
        },
        navbar: {
            add: false
        },
        extensions: ["pagedim-white"]
    };
    $scope.searchPlaceholder = "buscar producto o repuesto";

    if (false) {
        var p = $(".live-search-wrapper");
        p.height($(window).height() - 140),
            o(),
            $(window).on("resize", function () {
                p.height($(window).height() - 140),
                    o()
            })
    }
    if ("master-search-input" === document.activeElement.id) {
        $scope.focus = true;
        $scope.showSearchWindow = true;
    }

    $scope.fullSearch = function (event, keyEvent) {
        // If Escape key is pressed (keyCode 27), hide the search window
        if (keyEvent.keyCode === 27) {
            $scope.showSearchWindow = false;
            return;
        }

        // If Enter key is pressed (keyCode 13), redirect to search
        if (keyEvent.keyCode === 13) {
            $scope.redirectToSearch();
            return true;
        }

        // For all other keys, do nothing
        return;
    };

    $scope.manageDepartments = function (e) {
        $scope.selectedDepartments.indexOf(e) === -1 ? $scope.selectedDepartments.push(e) : $scope.selectedDepartments.splice($scope.selectedDepartments.indexOf(e), 1),
            doSearch()
    };

    $scope.manageCategories = function (e) {
        $scope.selectedCategories.indexOf(e) === -1 ? $scope.selectedCategories.push(e) : $scope.selectedCategories.splice($scope.selectedCategories.indexOf(e), 1),
            doSearch()
    };

    $scope.manageBrands = function (e) {
        $scope.selectedBrands.indexOf(e) === -1 ? $scope.selectedBrands.push(e) : $scope.selectedBrands.splice($scope.selectedBrands.indexOf(e), 1),
            doSearch()
    };
    $scope.manageStatuses = function (e) {
        $scope.selectedStatuses.indexOf(e) === -1 ? $scope.selectedStatuses.push(e) : $scope.selectedStatuses.splice($scope.selectedStatuses.indexOf(e), 1),
            doSearch()
    };
    $scope.resetFilters = function (e) {
        $scope.selectedCategories = [],
            $scope.selectedBrands = [],
            $scope.selectedStatuses = [],
        "undefined" == typeof e && (e = true),
        e && doSearch()
    };
    $scope.next = function () {
        !$scope.loading && $scope.lastRefresh < Date.now() - 200 && $scope.total && $scope.total > $scope.products.length && (d++,
            doSearch(true))
    };

    $scope.testInfiniteScroll = function(){
        console.log("testInfiniteScroll");
    }

    $scope.close = function () {
        $scope.showSearchWindow = false
    };
    $scope.expandFilter = function (t) {
        var e = jQuery(t.currentTarget);
        e.parents(".filter-block").toggleClass("collapsed"),
            e.children("i").toggleClass("icon-minus icon-plus")
    };
    $scope.toggleMobileSearch = function () {
        $scope.showMobileSearch = !$scope.showMobileSearch,
        $scope.showMobileSearch && $timeout(function () {
            angular.element("#master-search-input").focus()
        }, 100)
    };
    $scope.$watch("masterDepartment", function (e) {
        e && ($scope.searchPlaceholder = "buscar producto o repuesto",
            $scope.selectedDepartments = "all" === e ? [1, 2, 3] : [parseInt(e)],
            showSearchWindow())
    });
    $scope.$watch("masterSearch", function (e) {
        e.length < 3 ? ($scope.resetFilters(false),
            $scope.aggregations = [],
            $scope.products = [],
            $scope.banner = false,
            $scope.showSearchWindow = false) : showSearchWindow()
    });
    $scope.$watch("focus", function () {
        showSearchWindow()
    });
}
]);


angular.module("mm").factory('ModalService', Service);

function Service() {
    var modals = []; // array of modals on the page
    var service = {};

    service.Add = Add;
    service.Remove = Remove;
    service.Open = Open;
    service.Close = Close;

    return service;

    function Add(modal) {
        // add modal to array of active modals
        modals.push(modal);
    }

    function Remove(id) {
        // remove modal from array of active modals
        var modalToRemove = _.findWhere(modals, {id: id});
        modals = _.without(modals, modalToRemove);
    }

    function Open(id) {
        // open modal specified by id
        var modal = _.findWhere(modals, {id: id});
        modal.open();
    }

    function Close(id) {
        // close modal specified by id
        var modal = _.findWhere(modals, {id: id});
        modal.close();
    }
}


angular.module("mm").directive('countdown', function () {
    return {
        restrict: 'E',
        scope: {
            endTime: '@'
        },
        template: `
            <div class="countdown">
                <div>{{ days }}
                <span class="countdown-text">días</span>
                </div>
                <div class="countdown__dots" > : </div>
                <div>{{ hours }}
                <span class="countdown-text">horas</span>
                </div>
                <div class="countdown__dots" > : </div>
                <div>{{ minutes }}
                <span class="countdown-text">minutos</span>
                </div>
                <div class="countdown__dots"> : </div>
                <div>{{ seconds }}
                    <span class="countdown-text">segundos</span>
                </div>
            </div>
        `,
        controller: ['$scope', '$interval', function ($scope, $interval) {
            function calculateTimeLeft() {
                var endTime = new Date($scope.endTime).getTime();
                var now = new Date().getTime();
                var timeLeft = endTime - now;

                $scope.days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                $scope.hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                $scope.minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                $scope.seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                if (timeLeft < 0) {
                    $interval.cancel(countdownInterval);
                    $scope.days = $scope.hours = $scope.minutes = $scope.seconds = 0;
                }
            }

            var countdownInterval = $interval(calculateTimeLeft, 1000);
            calculateTimeLeft();  // Initial call to set values immediately
        }]
    };
});


angular.module("mm").directive('modal', Directive);

function Directive(ModalService) {
    return {
        link: function (scope, element, attrs) {
            // ensure id attribute exists
            if (!attrs.id) {
                console.error('modal must have an id');
                return;
            }

            // move element to bottom of page (just before </body>) so it can be displayed above everything else
            element.appendTo('body');

            // close modal on background click
            element.on('click', function (e) {
                var target = jQuery(e.target);
                if (!target.closest('.modal-body').length) {
                    scope.$evalAsync(Close);
                }
            });

            // add self (this modal instance) to the modal service so it's accessible from controllers
            var modal = {
                id: attrs.id,
                open: Open,
                close: Close
            };
            ModalService.Add(modal);

            // remove self from modal service when directive is destroyed
            scope.$on('$destroy', function () {
                ModalService.Remove(attrs.id);
                element.remove();
            });

            // open modal
            function Open() {
                element.show();
                jQuery('body').addClass('modal-open');

            }

            // close modal
            function Close() {
                element.hide();
                jQuery('body').removeClass('modal-open');
            }
        }
    };
}


angular.module("mm").controller("ListCtrl", function ($scope, $rootScope, mmservice, ModalService, $http) {

    var baseWidth = 160;
    var columnWidth = 200;

    $scope.isLoading = true;

    function openModal(id) {
        ModalService.Open(id);
    }


    function closeModal(id) {
        ModalService.Close(id);
    }

    jQuery("#compare-modal .modal-body").width(baseWidth + columnWidth);

    $scope.onAvailability = function (productId) {
        $rootScope.$broadcast('showAvailability', productId);
    };

    $scope.$watch("orderBy", function (newVal, oldVal) {
        if (oldVal == "" || oldVal == null)
            return;

        if (newVal == oldVal)
            return;
        context.addParam("orderBy", newVal, "");
        $scope.$emit('contextChanged', {message: "order by changed"});
    });


    $scope.onCompare = function (productId) {
        $scope.isLoading = true;
        openModal("compare-modal");
        $http.get("/Product/AddToCompare.rails", {params: {productId: productId}})
            .then(function (result) {
                $scope.compare = result.data;

                var numProds = 0;
                if (result.data.products != null)
                    numProds = result.data.products.length;
                var width = baseWidth + (columnWidth * numProds);
                if (result.data.products != null && result.data.products.length < 2)
                    width += columnWidth;

                jQuery("#compare-modal .modal-body").width(width);

                $scope.isLoading = false;


            });
    };

    $scope.remove = function (product) {
        $http.get("/Product/RemoveFromCompare.rails", {params: {productId: product.id}})
            .then(function (result) {
                var index = $scope.compare.products.indexOf(product);
                $scope.compare.products.splice(index, 1);
                var currentWidth = jQuery("#compare-modal .modal-body").width()
                jQuery("#compare-modal .modal-body").width(currentWidth - columnWidth);
            });
    };

    $scope.getPropertyValue = function (propertyId, product) {
        if (product.properties == null)
            return "";

        for (var i = 0; i < product.properties.length; i++) {
            var prop = product.properties[i];
            if (propertyId == prop.id)
                return prop.value;
        }

        return "";
    };

});

angular.module("mm").controller("InventoryStockCtrl", function ($scope, $rootScope, mmservice, ModalService, $http) {

    $scope.$on('showAvailability', function (event, productId) {
        $scope.isLoading = true;
        ModalService.Open("availability-modal");
        $http.get("/Ajax/InventoryStock.rails", {params: {productId: productId}})
            .then(function (result) {
                $scope.stock = result.data;
                $scope.isLoading = false;

            });

    });

    $scope.formatFacilityName = function (facility) {
        if (facility.type == 1)
            return "INTERNET";
        return facility.name.toLowerCase().replace(/\s+/g, '_');
    }

    $scope.isColorAvailable = function (color) {
        var avail = false;
        angular.forEach($scope.stock.stock, function (stk) {
            if (stk.productItem.colorId == color.id && stk.quantity > 0) {
                avail = true;
            }
        });
        return avail;
    };

    $scope.isAvailable = function (facility, color, size) {
        var avail = false;
        angular.forEach($scope.stock.stock, function (stk) {
            if ((stk.facilityId == facility.id || facility.type == 1)
                && stk.productItem.colorId == color.id
                && stk.productItem.sizeId == size.id
                && stk.quantity > 0) {
                avail = true;
            }
        });


        return avail;
    };

    $scope.getFacilityName = function (facility) {
        if (facility.type == 1)
            return "INTERNET";
        return facility.name;
    };

    $scope.filterFacility = function (facility) {
        return facility.type == 0 || facility.type == 1;
    };


});


angular.module("mm").controller("ContactCtrl", ["$scope", "$http", "$window",
    function ($scope, $http, $window) {
        $scope.selectedForm = "contactUs";
        $scope.submit = function () {
            $scope[$scope.selectedForm].$setSubmitted();
            $scope[$scope.selectedForm].$valid && grecaptcha.execute()
        };

        $scope.submitContactForm = function (n) {
            $scope.sending = true;

            var config = {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};
            $http.post("/Ajax/ContactUs.rails", jQuery.param($scope.formData), config)
                .then(function (result) {
                    $scope[$scope.selectedForm].$setPristine();
                    $scope.formData = {};
                    grecaptcha.reset();
                    swal("", "Hemos recibido su consulta", "success");
                });
        };
        $window.submitContactForm = $scope.submitContactForm;
    }]);


