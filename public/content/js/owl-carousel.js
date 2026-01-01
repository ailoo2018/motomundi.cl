
$ = jQuery;


function initOwl(t, e, n, i) {
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
        loop: false,
        center: false,
        rewind: false,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        freeDrag: false,
        margin: 0,
        stagePadding: 0,
        merge: false,
        mergeFit: true,
        autoWidth: false,
        startPosition: 0,
        rtl: false,
        smartSpeed: 250,
        fluidSpeed: false,
        dragEndSpeed: false,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: e,
        fallbackEasing: "swing",
        info: false,
        nestedItemSelector: false,
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
                merge: false,
                width: e
            }; i--;) n = this._mergers[i], n = this.settings.mergeFit && Math.min(n, this.settings.items) || n, t.items.merge = n > 1 || t.items.merge, o[i] = r ? e * n : this._items[i].width();
            this._widths = o
        }
    }, {
        filter: ["items", "settings"], run: function () {
            var e = [], n = this._items, i = this.settings, r = Math.max(2 * i.items, 4),
                o = 2 * Math.ceil(n.length / 2), a = i.loop && n.length ? i.rewind ? r : Math.max(r, o) : 0, s = "",
                l = "";
            for (a /= 2; a--;) e.push(this.normalize(e.length / 2, true)), s += n[e[e.length - 1]][0].outerHTML, e.push(this.normalize(n.length - 1 - (e.length - 1) / 2, true)), l = n[e[e.length - 1]][0].outerHTML + l;
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
        this.settings.autoWidth && (this.settings.stagePadding = false, this.settings.merge = false)
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
        return !!this._items.length && (this._width !== this.$element.width() && (!!this.$element.is(":visible") && (this.enter("resizing"), this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), false) : (this.invalidate("width"), this.refresh(), this.leave("resizing"), void this.trigger("resized")))))
    }, r.prototype.registerEventHandlers = function () {
        t.support.transition && this.$stage.on(t.support.transition.end + ".owl.core", t.proxy(this.onTransitionEnd, this)), this.settings.responsive !== false && this.on(e, "resize", this._handlers.onThrottledResize), this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", t.proxy(this.onDragStart, this)), this.$stage.on("dragstart.owl.core selectstart.owl.core", function () {
            return false
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
            return false
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
        return "string" === t.type(e) && (this._invalidated[e] = true, this.is("valid") && this.leave("valid")), t.map(this._invalidated, function (t, e) {
            return e
        })
    }, r.prototype.reset = function (t) {
        t = this.normalize(t), t !== i && (this._speed = 0, this._current = t, this.suppress(["translate", "translated"]), this.animate(this.coordinates(t)), this.release(["translate", "translated"]))
    }, r.prototype.normalize = function (t, e) {
        var n = this._items.length, r = e ? 0 : this._clones.length;
        return !this.isNumeric(t) || n < 1 ? t = i : (t < 0 || t >= n + r) && (t = ((t - r / 2) % n + n) % n + r / 2), t
    }, r.prototype.relative = function (t) {
        return t -= this._clones.length / 2, this.normalize(t, true)
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
        return t === i ? this._items.slice() : (t = this.normalize(t, true), this._items[t])
    }, r.prototype.mergers = function (t) {
        return t === i ? this._mergers.slice() : (t = this.normalize(t, true), this._mergers[t])
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
        t = t || false, this.to(this.relative(this.current()) + 1, t)
    }, r.prototype.prev = function (t) {
        t = t || false, this.to(this.relative(this.current()) - 1, t)
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
        n = n === i ? this._items.length : this.normalize(n, true), e = e instanceof jQuery ? e : t(e), this.trigger("add", {
            content: e,
            position: n
        }), e = this.prepare(e), 0 === this._items.length || n === this._items.length ? (0 === this._items.length && this.$stage.append(e), 0 !== this._items.length && this._items[n - 1].after(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) : (this._items[n].before(e), this._items.splice(n, 0, e), this._mergers.splice(n, 0, 1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), this._items[r] && this.reset(this._items[r].index()), this.invalidate("items"), this.trigger("added", {
            content: e,
            position: n
        })
    }, r.prototype.remove = function (t) {
        t = this.normalize(t, true), t !== i && (this.trigger("remove", {
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
        this.$element.off(".owl.core"), this.$stage.off(".owl.core"), t(n).off(".owl.core"), this.settings.responsive !== false && (e.clearTimeout(this.resizeTimer), this.off(e, "resize", this._handlers.onThrottledResize));
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
                }, t.event.special[e.name].owl = true
            }
        } else e.type === r.Type.State && (this._states.tags[e.name] ? this._states.tags[e.name] = this._states.tags[e.name].concat(e.tags) : this._states.tags[e.name] = e.tags, this._states.tags[e.name] = t.grep(this._states.tags[e.name], t.proxy(function (n, i) {
            return t.inArray(n, this._states.tags[e.name]) === i
        }, this)))
    }, r.prototype.suppress = function (e) {
        t.each(e, t.proxy(function (t, e) {
            this._supress[e] = true
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
}




(() => {
})(),
    function (e, t) {
        "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.PhotoSwipeUI_Default = t()
    }(this, photoSwipeUI_Default ), function (e, t) {
    var o = window.srcDoc;
    "function" == typeof define && define.amd ? define(["exports"], function (i) {
        t(i, o), e.srcDoc = i
    }) : "object" == typeof exports ? t(exports, o) : (e.srcDoc = {}, t(e.srcDoc, o))
}(this, function (e, t) {
    var o, i, n, a = !!("srcdoc" in document.createElement("iframe")),
        r = "Polyfill may not function in the presence of the `sandbox` attribute. Consider using the `force` option.",
        s = /\ballow-same-origin\b/, c = function (e, t) {
            var o = e.getAttribute("sandbox");
            "string" != typeof o || s.test(o) || (t && t.force ? e.removeAttribute("sandbox") : t && t.force === false || (n(r), e.setAttribute("data-srcdoc-polyfill", r)))
        }, l = {
            compliant: function (e, t, o) {
                t && (c(e, o), e.setAttribute("srcdoc", t))
            }, legacy: function (e, t, o) {
                var i;
                e && e.getAttribute && (t ? e.setAttribute("srcdoc", t) : t = e.getAttribute("srcdoc"), t && (c(e, o), i = "javascript: window.frameElement.getAttribute('srcdoc');", e.contentWindow && (e.contentWindow.location = i), e.setAttribute("src", i)))
            }
        }, u = e;
    if (n = window.console && window.console.error ? function (e) {
        window.console.error("[srcdoc-polyfill] " + e)
    } : function () {
    }, u.set = l.compliant, u.noConflict = function () {
        return window.srcDoc = t, u
    }, !a) for (u.set = l.legacy, i = document.getElementsByTagName("iframe"), o = i.length; o--;) u.set(i[o])
});



function photoSwipeUI_Default()
{
    "use strict";
    var e = function (e, t) {
        var o, i, n, a, r, s, c, l, u, d, m, p, f, h, v, g, w, y, b, x = this, S = false, T = true, D = true, C = {
            barsSize: {top: 44, bottom: "auto"},
            closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
            timeToIdle: 4e3,
            timeToIdleOutside: 1e3,
            loadingIndicatorDelay: 1e3,
            addCaptionHTMLFn: function (e, t) {
                return e.title ? (t.children[0].innerHTML = e.title, true) : (t.children[0].innerHTML = "", false)
            },
            closeEl: true,
            captionEl: true,
            fullscreenEl: true,
            zoomEl: true,
            shareEl: true,
            counterEl: true,
            arrowEl: true,
            preloaderEl: true,
            tapToClose: false,
            tapToToggleControls: true,
            clickToCloseNonZoomable: true,
            shareButtons: [{
                id: "facebook",
                label: "Share on Facebook",
                url: "https://www.facebook.com/sharer/sharer.php?u={{url}}"
            }, {
                id: "twitter",
                label: "Tweet",
                url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}"
            }, {
                id: "pinterest",
                label: "Pin it",
                url: "http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"
            }, {id: "download", label: "Download image", url: "{{raw_image_url}}", download: true}],
            getImageURLForShare: function () {
                return e.currItem.src || ""
            },
            getPageURLForShare: function () {
                return window.location.href
            },
            getTextForShare: function () {
                return e.currItem.title || ""
            },
            indexIndicatorSep: " / ",
            fitControlsWidth: 1200
        }, E = function (e) {
            if (g) return true;
            e = e || window.event, v.timeToIdle && v.mouseUsed && !u && A();
            for (var o, i, n = e.target || e.srcElement, a = n.getAttribute("class") || "", r = 0; r < V.length; r++) o = V[r], o.onTap && a.indexOf("pswp__" + o.name) > -1 && (o.onTap(), i = true);
            if (i) {
                e.stopPropagation && e.stopPropagation(), g = true;
                var s = t.features.isOldAndroid ? 600 : 30;
                w = setTimeout(function () {
                    g = false
                }, s)
            }
        }, k = function () {
            return !e.likelyTouchDevice || v.mouseUsed || screen.width > v.fitControlsWidth
        }, z = function (e, o, i) {
            t[(i ? "add" : "remove") + "Class"](e, "pswp__" + o)
        }, I = function () {
            var e = 1 === v.getNumItemsFn();
            e !== h && (z(i, "ui--one-slide", e), h = e)
        }, P = function () {
            z(c, "share-modal--hidden", D)
        }, _ = function () {
            return D = !D, D ? (t.removeClass(c, "pswp__share-modal--fade-in"), setTimeout(function () {
                D && P()
            }, 300)) : (P(), setTimeout(function () {
                D || t.addClass(c, "pswp__share-modal--fade-in")
            }, 30)), D || L(), false
        }, M = function (t) {
            t = t || window.event;
            var o = t.target || t.srcElement;
            return e.shout("shareLinkClick", t, o), !!o.href && (!!o.hasAttribute("download") || (window.open(o.href, "pswp_share", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left=" + (window.screen ? Math.round(screen.width / 2 - 275) : 100)), D || _(), false))
        }, L = function () {
            for (var e, t, o, i, n, a = "", r = 0; r < v.shareButtons.length; r++) e = v.shareButtons[r], o = v.getImageURLForShare(e), i = v.getPageURLForShare(e), n = v.getTextForShare(e), t = e.url.replace("{{url}}", encodeURIComponent(i)).replace("{{image_url}}", encodeURIComponent(o)).replace("{{raw_image_url}}", o).replace("{{text}}", encodeURIComponent(n)), a += '<a href="' + t + '" target="_blank" class="pswp__share--' + e.id + '"' + (e.download ? "download" : "") + ">" + e.label + "</a>", v.parseShareButtonOut && (a = v.parseShareButtonOut(e, a));
            c.children[0].innerHTML = a, c.children[0].onclick = M
        }, $ = function (e) {
            for (var o = 0; o < v.closeElClasses.length; o++) if (t.hasClass(e, "pswp__" + v.closeElClasses[o])) return true
        }, O = 0, A = function () {
            clearTimeout(b), O = 0, u && x.setIdle(false)
        }, F = function (e) {
            e = e ? e : window.event;
            var t = e.relatedTarget || e.toElement;
            t && "HTML" !== t.nodeName || (clearTimeout(b), b = setTimeout(function () {
                x.setIdle(true)
            }, v.timeToIdleOutside))
        }, R = function () {
            v.fullscreenEl && !t.features.isOldAndroid && (o || (o = x.getFullscreenAPI()), o ? (t.bind(document, o.eventK, x.updateFullscreen), x.updateFullscreen(), t.addClass(e.template, "pswp--supports-fs")) : t.removeClass(e.template, "pswp--supports-fs"))
        }, U = function () {
            v.preloaderEl && (B(true), d("beforeChange", function () {
                clearTimeout(f), f = setTimeout(function () {
                    e.currItem && e.currItem.loading ? (!e.allowProgressiveImg() || e.currItem.img && !e.currItem.img.naturalWidth) && B(false) : B(true)
                }, v.loadingIndicatorDelay)
            }), d("imageLoadComplete", function (t, o) {
                e.currItem === o && B(true)
            }))
        }, B = function (e) {
            p !== e && (z(m, "preloader--active", !e), p = e)
        }, N = function (e) {
            var o = e.vGap;
            if (k()) {
                var r = v.barsSize;
                if (v.captionEl && "auto" === r.bottom) if (a || (a = t.createEl("pswp__caption pswp__caption--fake"), a.appendChild(t.createEl("pswp__caption__center")), i.insertBefore(a, n), t.addClass(i, "pswp__ui--fit")), v.addCaptionHTMLFn(e, a, true)) {
                    var s = a.clientHeight;
                    o.bottom = parseInt(s, 10) || 44
                } else o.bottom = r.top; else o.bottom = "auto" === r.bottom ? 0 : r.bottom;
                o.top = r.top
            } else o.top = o.bottom = 0
        }, Z = function () {
            v.timeToIdle && d("mouseUsed", function () {
                t.bind(document, "mousemove", A), t.bind(document, "mouseout", F), y = setInterval(function () {
                    O++, 2 === O && x.setIdle(true)
                }, v.timeToIdle / 2)
            })
        }, q = function () {
            d("onVerticalDrag", function (e) {
                T && e < .95 ? x.hideControls() : !T && e >= .95 && x.showControls()
            });
            var e;
            d("onPinchClose", function (t) {
                T && t < .9 ? (x.hideControls(), e = true) : e && !T && t > .9 && x.showControls()
            }), d("zoomGestureEnded", function () {
                e = false, e && !T && x.showControls()
            })
        }, V = [{
            name: "caption", option: "captionEl", onInit: function (e) {
                n = e
            }
        }, {
            name: "share-modal", option: "shareEl", onInit: function (e) {
                c = e
            }, onTap: function () {
                _()
            }
        }, {
            name: "button--share", option: "shareEl", onInit: function (e) {
                s = e
            }, onTap: function () {
                _()
            }
        }, {name: "button--zoom", option: "zoomEl", onTap: e.toggleDesktopZoom}, {
            name: "counter",
            option: "counterEl",
            onInit: function (e) {
                r = e
            }
        }, {name: "button--close", option: "closeEl", onTap: e.close}, {
            name: "button--arrow--left",
            option: "arrowEl",
            onTap: e.prev
        }, {name: "button--arrow--right", option: "arrowEl", onTap: e.next}, {
            name: "button--fs",
            option: "fullscreenEl",
            onTap: function () {
                o.isFullscreen() ? o.exit() : o.enter()
            }
        }, {
            name: "preloader", option: "preloaderEl", onInit: function (e) {
                m = e
            }
        }], Q = function () {
            var e, o, n, a = function (i) {
                if (i) for (var a = i.length, r = 0; r < a; r++) {
                    e = i[r], o = e.className;
                    for (var s = 0; s < V.length; s++) n = V[s], o.indexOf("pswp__" + n.name) > -1 && (v[n.option] ? (t.removeClass(e, "pswp__element--disabled"), n.onInit && n.onInit(e)) : t.addClass(e, "pswp__element--disabled"))
                }
            };
            a(i.children);
            var r = t.getChildByClass(i, "pswp__top-bar");
            r && a(r.children)
        };
        x.init = function () {
            t.extend(e.options, C, true), v = e.options, i = t.getChildByClass(e.scrollWrap, "pswp__ui"), d = e.listen, q(), d("beforeChange", x.update), d("doubleTap", function (t) {
                var o = e.currItem.initialZoomLevel;
                e.getZoomLevel() !== o ? e.zoomTo(o, t, 333) : e.zoomTo(v.getDoubleTapZoom(false, e.currItem), t, 333)
            }), d("preventDragEvent", function (e, t, o) {
                var i = e.target || e.srcElement;
                i && i.getAttribute("class") && e.type.indexOf("mouse") > -1 && (i.getAttribute("class").indexOf("__caption") > 0 || /(SMALL|STRONG|EM)/i.test(i.tagName)) && (o.prevent = false)
            }), d("bindEvents", function () {
                t.bind(i, "pswpTap click", E), t.bind(e.scrollWrap, "pswpTap", x.onGlobalTap), e.likelyTouchDevice || t.bind(e.scrollWrap, "mouseover", x.onMouseOver)
            }), d("unbindEvents", function () {
                D || _(), y && clearInterval(y), t.unbind(document, "mouseout", F), t.unbind(document, "mousemove", A), t.unbind(i, "pswpTap click", E), t.unbind(e.scrollWrap, "pswpTap", x.onGlobalTap), t.unbind(e.scrollWrap, "mouseover", x.onMouseOver), o && (t.unbind(document, o.eventK, x.updateFullscreen), o.isFullscreen() && (v.hideAnimationDuration = 0, o.exit()), o = null)
            }), d("destroy", function () {
                v.captionEl && (a && i.removeChild(a), t.removeClass(n, "pswp__caption--empty")), c && (c.children[0].onclick = null), t.removeClass(i, "pswp__ui--over-close"), t.addClass(i, "pswp__ui--hidden"), x.setIdle(false)
            }), v.showAnimationDuration || t.removeClass(i, "pswp__ui--hidden"), d("initialZoomIn", function () {
                v.showAnimationDuration && t.removeClass(i, "pswp__ui--hidden")
            }), d("initialZoomOut", function () {
                t.addClass(i, "pswp__ui--hidden")
            }), d("parseVerticalMargin", N), Q(), v.shareEl && s && c && (D = true), I(), Z(), R(), U()
        }, x.setIdle = function (e) {
            u = e, z(i, "ui--idle", e)
        }, x.update = function () {
            T && e.currItem ? (x.updateIndexIndicator(), v.captionEl && (v.addCaptionHTMLFn(e.currItem, n), z(n, "caption--empty", !e.currItem.title)), S = true) : S = false, D || _(), I()
        }, x.updateFullscreen = function (i) {
            i && setTimeout(function () {
                e.setScrollOffset(0, t.getScrollY())
            }, 50), t[(o.isFullscreen() ? "add" : "remove") + "Class"](e.template, "pswp--fs")
        }, x.updateIndexIndicator = function () {
            v.counterEl && (r.innerHTML = e.getCurrentIndex() + 1 + v.indexIndicatorSep + v.getNumItemsFn())
        }, x.onGlobalTap = function (o) {
            o = o || window.event;
            var i = o.target || o.srcElement;
            if (!g) if (o.detail && "mouse" === o.detail.pointerType) {
                if ($(i)) return void e.close();
                t.hasClass(i, "pswp__img") && (1 === e.getZoomLevel() && e.getZoomLevel() <= e.currItem.fitRatio ? v.clickToCloseNonZoomable && e.close() : e.toggleDesktopZoom(o.detail.releasePoint))
            } else if (v.tapToToggleControls && (T ? x.hideControls() : x.showControls()), v.tapToClose && (t.hasClass(i, "pswp__img") || $(i))) return void e.close()
        }, x.onMouseOver = function (e) {
            e = e || window.event;
            var t = e.target || e.srcElement;
            z(i, "ui--over-close", $(t))
        }, x.hideControls = function () {
            t.addClass(i, "pswp__ui--hidden"), T = false
        }, x.showControls = function () {
            T = true, S || x.update(), t.removeClass(i, "pswp__ui--hidden")
        }, x.supportsFullscreen = function () {
            var e = document;
            return !!(e.exitFullscreen || e.mozCancelFullScreen || e.webkitExitFullscreen || e.msExitFullscreen)
        }, x.getFullscreenAPI = function () {
            var t, o = document.documentElement, i = "fullscreenchange";
            return o.requestFullscreen ? t = {
                enterK: "requestFullscreen",
                exitK: "exitFullscreen",
                elementK: "fullscreenElement",
                eventK: i
            } : o.mozRequestFullScreen ? t = {
                enterK: "mozRequestFullScreen",
                exitK: "mozCancelFullScreen",
                elementK: "mozFullScreenElement",
                eventK: "moz" + i
            } : o.webkitRequestFullscreen ? t = {
                enterK: "webkitRequestFullscreen",
                exitK: "webkitExitFullscreen",
                elementK: "webkitFullscreenElement",
                eventK: "webkit" + i
            } : o.msRequestFullscreen && (t = {
                enterK: "msRequestFullscreen",
                exitK: "msExitFullscreen",
                elementK: "msFullscreenElement",
                eventK: "MSFullscreenChange"
            }), t && (t.enter = function () {
                return l = v.closeOnScroll, v.closeOnScroll = false, "webkitRequestFullscreen" !== this.enterK ? e.template[this.enterK]() : void e.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)
            }, t.exit = function () {
                return v.closeOnScroll = l, document[this.exitK]()
            }, t.isFullscreen = function () {
                return document[this.elementK]
            }), t
        }
    };
    return e
}

function initEasyZoom(jQuery)
{
    "use strict";

    function t(t, o) {
        this.$target = jQuery(t), this.opts = jQuery.extend({}, c, o, this.$target.data()), void 0 === this.isOpen && this._init()
    }

    var o, i, n, a, r, s, c = {
        loadingNotice: "Loading image",
        errorNotice: "The image could not be loaded",
        errorDuration: 2500,
        linkAttribute: "href",
        preventClicks: true,
        beforeShow: jQuery.noop,
        beforeHide: jQuery.noop,
        onShow: jQuery.noop,
        onHide: jQuery.noop,
        onMove: jQuery.noop
    };
    t.prototype._init = function () {
        this.$link = this.$target.find("a"), this.$image = this.$target.find("img"), this.$flyout = jQuery('<div class="easyzoom-flyout" />'), this.$notice = jQuery('<div class="easyzoom-notice" />'), this.$target.on({
            "mousemove.easyzoom touchmove.easyzoom": jQuery.proxy(this._onMove, this),
            "mouseleave.easyzoom touchend.easyzoom": jQuery.proxy(this._onLeave, this),
            "mouseenter.easyzoom touchstart.easyzoom": jQuery.proxy(this._onEnter, this)
        }), this.opts.preventClicks && this.$target.on("click.easyzoom", function (e) {
            e.preventDefault()
        })
    };
    t.prototype.show = function (e, t) {
        var r, s, c, l, u = this;
        if (this.opts.beforeShow.call(this) !== false) {
            if (!this.isReady) return this._loadImage(this.$link.attr(this.opts.linkAttribute), function () {
                !u.isMouseOver && t || u.show(e)
            });
            this.$target.append(this.$flyout), r = this.$target.width(), s = this.$target.height(), c = this.$flyout.width(), l = this.$flyout.height(), o = this.$zoom.width() - c, i = this.$zoom.height() - l, o < 0 && (o = 0), i < 0 && (i = 0), n = o / r, a = i / s, this.isOpen = true, this.opts.onShow.call(this), e && this._move(e)
        }
    };
    t.prototype._onEnter = function (e) {
        var t = e.originalEvent.touches;
        this.isMouseOver = true, t && 1 != t.length || (e.preventDefault(), this.show(e, true))
    };
    t.prototype._onMove = function (e) {
        this.isOpen && (e.preventDefault(), this._move(e))
    };
    t.prototype._onLeave = function () {
        this.isMouseOver = false, this.isOpen && this.hide()
    };
    t.prototype._onLoad = function (e) {
        e.currentTarget.width && (this.isReady = true, this.$notice.detach(), this.$flyout.html(this.$zoom), this.$target.removeClass("is-loading").addClass("is-ready"), e.data.call && e.data())
    };
    t.prototype._onError = function () {
        var e = this;
        this.$notice.text(this.opts.errorNotice), this.$target.removeClass("is-loading").addClass("is-error"), this.detachNotice = setTimeout(function () {
            e.$notice.detach(), e.detachNotice = null
        }, this.opts.errorDuration)
    };
    t.prototype._loadImage = function (t, o) {
        var i = new Image;
        this.$target.addClass("is-loading").append(this.$notice.text(this.opts.loadingNotice)), this.$zoom = jQuery(i).on("error", jQuery.proxy(this._onError, this)).on("load", o, jQuery.proxy(this._onLoad, this)), i.style.position = "absolute", i.src = t
    };
    t.prototype._move = function (e) {
        if (0 === e.type.indexOf("touch")) {
            var t = e.touches || e.originalEvent.touches;
            r = t[0].pageX, s = t[0].pageY
        } else r = e.pageX || r, s = e.pageY || s;
        var c = this.$target.offset(), l = s - c.top, u = r - c.left, d = Math.ceil(l * a), m = Math.ceil(u * n);
        if (m < 0 || d < 0 || m > o || d > i) this.hide(); else {
            var p = d * -1, f = m * -1;
            this.$zoom.css({top: p, left: f}), this.opts.onMove.call(this, p, f)
        }
    };
    t.prototype.hide = function () {
        this.isOpen && this.opts.beforeHide.call(this) !== false && (this.$flyout.detach(), this.isOpen = false, this.opts.onHide.call(this))
    };
    t.prototype.swap = function (t, o, i) {
        this.hide(), this.isReady = false, this.detachNotice && clearTimeout(this.detachNotice), this.$notice.parent().length && this.$notice.detach(), this.$target.removeClass("is-loading is-ready is-error"), this.$image.attr({
            src: t,
            srcset: jQuery.isArray(i) ? i.join() : i
        }), this.$link.attr(this.opts.linkAttribute, o)
    };
    t.prototype.teardown = function () {
        this.hide();
        this.$target.off(".easyzoom").removeClass("is-loading is-ready is-error");
        if (this.detachNotice)
            clearTimeout(this.detachNotice);
        delete this.$link;
        delete this.$zoom;
        delete this.$image;
        delete this.$notice;
        delete this.$flyout;
        delete this.isOpen;
        delete this.isReady;
    };

    jQuery.fn.easyZoom = function (o) {
        return this.each(function () {
            var i = jQuery.data(this, "easyZoom");
            i ? void 0 === i.isOpen && i._init() : jQuery.data(this, "easyZoom", new t(this, o))
        })
    };

    if ("function" == typeof define && define.amd) {
        define(function () {
            return t
        })
    } else if ("undefined" != typeof module && module.exports) {
        (module.exports = t);
    }
}

function photoSwipe() {
    "use strict";
    var e = function (e, t, o, i) {
        var n = {
            features: null, bind: function (e, t, o, i) {
                var n = (i ? "remove" : "add") + "EventListener";
                t = t.split(" ");
                for (var a = 0; a < t.length; a++) t[a] && e[n](t[a], o, false)
            }, isArray: function (e) {
                return e instanceof Array
            }, createEl: function (e, t) {
                var o = document.createElement(t || "div");
                return e && (o.className = e), o
            }, getScrollY: function () {
                var e = window.pageYOffset;
                return void 0 !== e ? e : document.documentElement.scrollTop
            }, unbind: function (e, t, o) {
                n.bind(e, t, o, true)
            }, removeClass: function (e, t) {
                var o = new RegExp("(\\s|^)" + t + "(\\s|$)");
                e.className = e.className.replace(o, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
            }, addClass: function (e, t) {
                n.hasClass(e, t) || (e.className += (e.className ? " " : "") + t)
            }, hasClass: function (e, t) {
                return e.className && new RegExp("(^|\\s)" + t + "(\\s|$)").test(e.className)
            }, getChildByClass: function (e, t) {
                for (var o = e.firstChild; o;) {
                    if (n.hasClass(o, t)) return o;
                    o = o.nextSibling
                }
            }, arraySearch: function (e, t, o) {
                for (var i = e.length; i--;) if (e[i][o] === t) return i;
                return -1
            }, extend: function (e, t, o) {
                for (var i in t) if (t.hasOwnProperty(i)) {
                    if (o && e.hasOwnProperty(i)) continue;
                    e[i] = t[i]
                }
            }, easing: {
                sine: {
                    out: function (e) {
                        return Math.sin(e * (Math.PI / 2))
                    }, inOut: function (e) {
                        return -(Math.cos(Math.PI * e) - 1) / 2
                    }
                }, cubic: {
                    out: function (e) {
                        return --e * e * e + 1
                    }
                }
            }, detectFeatures: function () {
                if (n.features) return n.features;
                var e = n.createEl(), t = e.style, o = "", i = {};
                if (i.oldIE = document.all && !document.addEventListener, i.touch = "ontouchstart" in window, window.requestAnimationFrame && (i.raf = window.requestAnimationFrame, i.caf = window.cancelAnimationFrame), i.pointerEvent = navigator.pointerEnabled || navigator.msPointerEnabled, !i.pointerEvent) {
                    var a = navigator.userAgent;
                    if (/iP(hone|od)/.test(navigator.platform)) {
                        var r = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                        r && r.length > 0 && (r = parseInt(r[1], 10), r >= 1 && r < 8 && (i.isOldIOSPhone = true))
                    }
                    var s = a.match(/Android\s([0-9\.]*)/), c = s ? s[1] : 0;
                    c = parseFloat(c), c >= 1 && (c < 4.4 && (i.isOldAndroid = true), i.androidVersion = c), i.isMobileOpera = /opera mini|opera mobi/i.test(a)
                }
                for (var l, u, d = ["transform", "perspective", "animationName"], m = ["", "webkit", "Moz", "ms", "O"], p = 0; p < 4; p++) {
                    o = m[p];
                    for (var f = 0; f < 3; f++) l = d[f], u = o + (o ? l.charAt(0).toUpperCase() + l.slice(1) : l), !i[l] && u in t && (i[l] = u);
                    o && !i.raf && (o = o.toLowerCase(), i.raf = window[o + "RequestAnimationFrame"], i.raf && (i.caf = window[o + "CancelAnimationFrame"] || window[o + "CancelRequestAnimationFrame"]))
                }
                if (!i.raf) {
                    var h = 0;
                    i.raf = function (e) {
                        var t = (new Date).getTime(), o = Math.max(0, 16 - (t - h)),
                            i = window.setTimeout(function () {
                                e(t + o)
                            }, o);
                        return h = t + o, i
                    }, i.caf = function (e) {
                        clearTimeout(e)
                    }
                }
                return i.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, n.features = i, i
            }
        };
        n.detectFeatures(), n.features.oldIE && (n.bind = function (e, t, o, i) {
            t = t.split(" ");
            for (var n, a = (i ? "detach" : "attach") + "Event", r = function () {
                o.handleEvent.call(o)
            }, s = 0; s < t.length; s++) if (n = t[s]) if ("object" == typeof o && o.handleEvent) {
                if (i) {
                    if (!o["oldIE" + n]) return false
                } else o["oldIE" + n] = r;
                e[a]("on" + n, o["oldIE" + n])
            } else e[a]("on" + n, o)
        });
        var a = this, r = 25, s = 3, c = {
            allowPanToNext: true,
            spacing: .12,
            bgOpacity: 1,
            mouseUsed: false,
            loop: true,
            pinchToClose: true,
            closeOnScroll: true,
            closeOnVerticalDrag: true,
            verticalDragRange: .75,
            hideAnimationDuration: 333,
            showAnimationDuration: 333,
            showHideOpacity: false,
            focus: true,
            escKey: true,
            arrowKeys: true,
            mainScrollEndFriction: .35,
            panEndFriction: .35,
            isClickableElement: function (e) {
                return "A" === e.tagName
            },
            getDoubleTapZoom: function (e, t) {
                return e ? 1 : t.initialZoomLevel < .7 ? 1 : 1.33
            },
            maxSpreadZoom: 1.33,
            modal: true,
            scaleMode: "fit"
        };
        n.extend(c, i);
        var l, u, d, m, p, f, h, v, g, w, y, b, x, S, T, D, C, E, k, z, I, P, _, M, L, $, O, A, F, R, U, B, N, Z, q,
            V,
            Q, W, j, K, G, H, Y, X, J, ee, te, oe, ie, ne, ae, re, se, ce, le, ue, de = function () {
                return {x: 0, y: 0}
            }, me = de(), pe = de(), fe = de(), he = {}, ve = 0, ge = {}, we = de(), ye = 0, be = true, xe = [], Se = {},
            Te = false, De = function (e, t) {
                n.extend(a, t.publicMethods), xe.push(e)
            }, Ce = function (e) {
                var t = Jt();
                return e > t - 1 ? e - t : e < 0 ? t + e : e
            }, Ee = {}, ke = function (e, t) {
                return Ee[e] || (Ee[e] = []), Ee[e].push(t)
            }, ze = function (e) {
                var t = Ee[e];
                if (t) {
                    var o = Array.prototype.slice.call(arguments);
                    o.shift();
                    for (var i = 0; i < t.length; i++) t[i].apply(a, o)
                }
            }, Ie = function () {
                return (new Date).getTime()
            }, Pe = function (e) {
                ce = e, a.bg.style.opacity = e * c.bgOpacity
            }, _e = function (e, t, o, i, n) {
                (!Te || n && n !== a.currItem) && (i /= n ? n.fitRatio : a.currItem.fitRatio), e[P] = b + t + "px, " + o + "px" + x + " scale(" + i + ")"
            }, Me = function (e) {
                ie && (e && (w > a.currItem.fitRatio ? Te || (mo(a.currItem, false, true), Te = true) : Te && (mo(a.currItem), Te = false)), _e(ie, fe.x, fe.y, w))
            }, Le = function (e) {
                e.container && _e(e.container.style, e.initialPosition.x, e.initialPosition.y, e.initialZoomLevel, e)
            }, $e = function (e, t) {
                t[P] = b + e + "px, 0px" + x
            }, Oe = function (e, t) {
                if (!c.loop && t) {
                    var o = m + (we.x * ve - e) / we.x, i = Math.round(e - wt.x);
                    (o < 0 && i > 0 || o >= Jt() - 1 && i < 0) && (e = wt.x + i * c.mainScrollEndFriction)
                }
                wt.x = e, $e(e, p)
            }, Ae = function (e, t) {
                var o = yt[e] - ge[e];
                return pe[e] + me[e] + o - o * (t / y)
            }, Fe = function (e, t) {
                e.x = t.x, e.y = t.y, t.id && (e.id = t.id)
            }, Re = function (e) {
                e.x = Math.round(e.x), e.y = Math.round(e.y)
            }, Ue = null, Be = function () {
                Ue && (n.unbind(document, "mousemove", Be), n.addClass(e, "pswp--has_mouse"), c.mouseUsed = true, ze("mouseUsed")), Ue = setTimeout(function () {
                    Ue = null
                }, 100)
            }, Ne = function () {
                n.bind(document, "keydown", a), U.transform && n.bind(a.scrollWrap, "click", a), c.mouseUsed || n.bind(document, "mousemove", Be), n.bind(window, "resize scroll", a), ze("bindEvents")
            }, Ze = function () {
                n.unbind(window, "resize", a), n.unbind(window, "scroll", g.scroll), n.unbind(document, "keydown", a), n.unbind(document, "mousemove", Be), U.transform && n.unbind(a.scrollWrap, "click", a), W && n.unbind(window, h, a), ze("unbindEvents")
            }, qe = function (e, t) {
                var o = so(a.currItem, he, e);
                return t && (oe = o), o
            }, Ve = function (e) {
                return e || (e = a.currItem), e.initialZoomLevel
            }, Qe = function (e) {
                return e || (e = a.currItem), e.w > 0 ? c.maxSpreadZoom : 1
            }, We = function (e, t, o, i) {
                return i === a.currItem.initialZoomLevel ? (o[e] = a.currItem.initialPosition[e], true) : (o[e] = Ae(e, i), o[e] > t.min[e] ? (o[e] = t.min[e], true) : o[e] < t.max[e] && (o[e] = t.max[e], true))
            }, je = function () {
                if (P) {
                    var t = U.perspective && !M;
                    return b = "translate" + (t ? "3d(" : "("), void (x = U.perspective ? ", 0px)" : ")")
                }
                P = "left", n.addClass(e, "pswp--ie"), $e = function (e, t) {
                    t.left = e + "px"
                }, Le = function (e) {
                    var t = e.fitRatio > 1 ? 1 : e.fitRatio, o = e.container.style, i = t * e.w, n = t * e.h;
                    o.width = i + "px", o.height = n + "px", o.left = e.initialPosition.x + "px", o.top = e.initialPosition.y + "px"
                }, Me = function () {
                    if (ie) {
                        var e = ie, t = a.currItem, o = t.fitRatio > 1 ? 1 : t.fitRatio, i = o * t.w, n = o * t.h;
                        e.width = i + "px", e.height = n + "px", e.left = fe.x + "px", e.top = fe.y + "px"
                    }
                }
            }, Ke = function (e) {
                var t = "";
                c.escKey && 27 === e.keyCode ? t = "close" : c.arrowKeys && (37 === e.keyCode ? t = "prev" : 39 === e.keyCode && (t = "next")), t && (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || (e.preventDefault ? e.preventDefault() : e.returnValue = false, a[t]()))
            }, Ge = function (e) {
                e && (G || K || ne || V) && (e.preventDefault(), e.stopPropagation())
            }, He = function () {
                a.setScrollOffset(0, n.getScrollY())
            }, Ye = {}, Xe = 0, Je = function (e) {
                Ye[e] && (Ye[e].raf && $(Ye[e].raf), Xe--, delete Ye[e])
            }, et = function (e) {
                Ye[e] && Je(e), Ye[e] || (Xe++, Ye[e] = {})
            }, tt = function () {
                for (var e in Ye) Ye.hasOwnProperty(e) && Je(e)
            }, ot = function (e, t, o, i, n, a, r) {
                var s, c = Ie();
                et(e);
                var l = function () {
                    if (Ye[e]) {
                        if (s = Ie() - c, s >= i) return Je(e), a(o), void (r && r());
                        a((o - t) * n(s / i) + t), Ye[e].raf = L(l)
                    }
                };
                l()
            }, it = {
                shout: ze, listen: ke, viewportSize: he, options: c, isMainScrollAnimating: function () {
                    return ne
                }, getZoomLevel: function () {
                    return w
                }, getCurrentIndex: function () {
                    return m
                }, isDragging: function () {
                    return W
                }, isZooming: function () {
                    return J
                }, setScrollOffset: function (e, t) {
                    ge.x = e, R = ge.y = t, ze("updateScrollOffset", ge)
                }, applyZoomPan: function (e, t, o, i) {
                    fe.x = t, fe.y = o, w = e, Me(i)
                }, init: function () {
                    if (!l && !u) {
                        var o;
                        a.framework = n, a.template = e, a.bg = n.getChildByClass(e, "pswp__bg"), O = e.className, l = true, U = n.detectFeatures(), L = U.raf, $ = U.caf, P = U.transform, F = U.oldIE, a.scrollWrap = n.getChildByClass(e, "pswp__scroll-wrap"), a.container = n.getChildByClass(a.scrollWrap, "pswp__container"), p = a.container.style, a.itemHolders = D = [{
                            el: a.container.children[0],
                            wrap: 0,
                            index: -1
                        }, {el: a.container.children[1], wrap: 0, index: -1}, {
                            el: a.container.children[2],
                            wrap: 0,
                            index: -1
                        }], D[0].el.style.display = D[2].el.style.display = "none", je(), g = {
                            resize: a.updateSize,
                            scroll: He,
                            keydown: Ke,
                            click: Ge
                        };
                        var i = U.isOldIOSPhone || U.isOldAndroid || U.isMobileOpera;
                        for (U.animationName && U.transform && !i || (c.showAnimationDuration = c.hideAnimationDuration = 0), o = 0; o < xe.length; o++) a["init" + xe[o]]();
                        if (t) {
                            var r = a.ui = new t(a, n);
                            r.init()
                        }
                        ze("firstUpdate"), m = m || c.index || 0, (isNaN(m) || m < 0 || m >= Jt()) && (m = 0), a.currItem = Xt(m), (U.isOldIOSPhone || U.isOldAndroid) && (be = false), e.setAttribute("aria-hidden", "false"), c.modal && (be ? e.style.position = "fixed" : (e.style.position = "absolute", e.style.top = n.getScrollY() + "px")), void 0 === R && (ze("initialLayout"), R = A = n.getScrollY());
                        var d = "pswp--open ";
                        for (c.mainClass && (d += c.mainClass + " "), c.showHideOpacity && (d += "pswp--animate_opacity "), d += M ? "pswp--touch" : "pswp--notouch", d += U.animationName ? " pswp--css_animation" : "", d += U.svg ? " pswp--svg" : "", n.addClass(e, d), a.updateSize(), f = -1, ye = null, o = 0; o < s; o++) $e((o + f) * we.x, D[o].el.style);
                        F || n.bind(a.scrollWrap, v, a), ke("initialZoomInEnd", function () {
                            a.setContent(D[0], m - 1), a.setContent(D[2], m + 1), D[0].el.style.display = D[2].el.style.display = "block", c.focus && e.focus(), Ne()
                        }), a.setContent(D[1], m), a.updateCurrItem(), ze("afterInit"), be || (S = setInterval(function () {
                            Xe || W || J || w !== a.currItem.initialZoomLevel || a.updateSize()
                        }, 1e3)), n.addClass(e, "pswp--visible")
                    }
                }, close: function () {
                    l && (l = false, u = true, ze("close"), Ze(), to(a.currItem, null, true, a.destroy))
                }, destroy: function () {
                    ze("destroy"), Kt && clearTimeout(Kt), e.setAttribute("aria-hidden", "true"), e.className = O, S && clearInterval(S), n.unbind(a.scrollWrap, v, a), n.unbind(window, "scroll", a), Dt(), tt(), Ee = null
                }, panTo: function (e, t, o) {
                    o || (e > oe.min.x ? e = oe.min.x : e < oe.max.x && (e = oe.max.x), t > oe.min.y ? t = oe.min.y : t < oe.max.y && (t = oe.max.y)), fe.x = e, fe.y = t, Me()
                }, handleEvent: function (e) {
                    e = e || window.event, g[e.type] && g[e.type](e)
                }, goTo: function (e) {
                    e = Ce(e);
                    var t = e - m;
                    ye = t, m = e, a.currItem = Xt(m), ve -= t, Oe(we.x * ve), tt(), ne = false, a.updateCurrItem()
                }, next: function () {
                    a.goTo(m + 1)
                }, prev: function () {
                    a.goTo(m - 1)
                }, updateCurrZoomItem: function (e) {
                    if (e && ze("beforeChange", 0), D[1].el.children.length) {
                        var t = D[1].el.children[0];
                        ie = n.hasClass(t, "pswp__zoom-wrap") ? t.style : null
                    } else ie = null;
                    oe = a.currItem.bounds, y = w = a.currItem.initialZoomLevel, fe.x = oe.center.x, fe.y = oe.center.y, e && ze("afterChange")
                }, invalidateCurrItems: function () {
                    T = true;
                    for (var e = 0; e < s; e++) D[e].item && (D[e].item.needsUpdate = true)
                }, updateCurrItem: function (e) {
                    if (0 !== ye) {
                        var t, o = Math.abs(ye);
                        if (!(e && o < 2)) {
                            a.currItem = Xt(m), Te = false, ze("beforeChange", ye), o >= s && (f += ye + (ye > 0 ? -s : s), o = s);
                            for (var i = 0; i < o; i++) ye > 0 ? (t = D.shift(), D[s - 1] = t, f++, $e((f + 2) * we.x, t.el.style), a.setContent(t, m - o + i + 1 + 1)) : (t = D.pop(), D.unshift(t), f--, $e(f * we.x, t.el.style), a.setContent(t, m + o - i - 1 - 1));
                            if (ie && 1 === Math.abs(ye)) {
                                var n = Xt(C);
                                n.initialZoomLevel !== w && (so(n, he), mo(n), Le(n))
                            }
                            ye = 0, a.updateCurrZoomItem(), C = m, ze("afterChange")
                        }
                    }
                }, updateSize: function (t) {
                    if (!be && c.modal) {
                        var o = n.getScrollY();
                        if (R !== o && (e.style.top = o + "px", R = o), !t && Se.x === window.innerWidth && Se.y === window.innerHeight) return;
                        Se.x = window.innerWidth, Se.y = window.innerHeight, e.style.height = Se.y + "px"
                    }
                    if (he.x = a.scrollWrap.clientWidth, he.y = a.scrollWrap.clientHeight, He(), we.x = he.x + Math.round(he.x * c.spacing), we.y = he.y, Oe(we.x * ve), ze("beforeResize"), void 0 !== f) {
                        for (var i, r, l, u = 0; u < s; u++) i = D[u], $e((u + f) * we.x, i.el.style), l = m + u - 1, c.loop && Jt() > 2 && (l = Ce(l)), r = Xt(l), r && (T || r.needsUpdate || !r.bounds) ? (a.cleanSlide(r), a.setContent(i, l), 1 === u && (a.currItem = r, a.updateCurrZoomItem(true)), r.needsUpdate = false) : i.index === -1 && l >= 0 && a.setContent(i, l), r && r.container && (so(r, he), mo(r), Le(r));
                        T = false
                    }
                    y = w = a.currItem.initialZoomLevel, oe = a.currItem.bounds, oe && (fe.x = oe.center.x, fe.y = oe.center.y, Me(true)), ze("resize")
                }, zoomTo: function (e, t, o, i, a) {
                    t && (y = w, yt.x = Math.abs(t.x) - fe.x, yt.y = Math.abs(t.y) - fe.y, Fe(pe, fe));
                    var r = qe(e, false), s = {};
                    We("x", r, s, e), We("y", r, s, e);
                    var c = w, l = {x: fe.x, y: fe.y};
                    Re(s);
                    var u = function (t) {
                        1 === t ? (w = e, fe.x = s.x, fe.y = s.y) : (w = (e - c) * t + c, fe.x = (s.x - l.x) * t + l.x, fe.y = (s.y - l.y) * t + l.y), a && a(t), Me(1 === t)
                    };
                    o ? ot("customZoomTo", 0, 1, o, i || n.easing.sine.inOut, u) : u(1)
                }
            }, nt = 30, at = 10, rt = {}, st = {}, ct = {}, lt = {}, ut = {}, dt = [], mt = {}, pt = [], ft = {},
            ht = 0,
            vt = de(), gt = 0, wt = de(), yt = de(), bt = de(), xt = function (e, t) {
                return e.x === t.x && e.y === t.y
            }, St = function (e, t) {
                return Math.abs(e.x - t.x) < r && Math.abs(e.y - t.y) < r
            }, Tt = function (e, t) {
                return ft.x = Math.abs(e.x - t.x), ft.y = Math.abs(e.y - t.y), Math.sqrt(ft.x * ft.x + ft.y * ft.y)
            }, Dt = function () {
                H && ($(H), H = null)
            }, Ct = function () {
                W && (H = L(Ct), Nt())
            }, Et = function () {
                return !("fit" === c.scaleMode && w === a.currItem.initialZoomLevel)
            }, kt = function (e, t) {
                return !(!e || e === document) && (!(e.getAttribute("class") && e.getAttribute("class").indexOf("pswp__scroll-wrap") > -1) && (t(e) ? e : kt(e.parentNode, t)))
            }, zt = {}, It = function (e, t) {
                return zt.prevent = !kt(e.target, c.isClickableElement), ze("preventDragEvent", e, t, zt), zt.prevent
            }, Pt = function (e, t) {
                return t.x = e.pageX, t.y = e.pageY, t.id = e.identifier, t
            }, _t = function (e, t, o) {
                o.x = .5 * (e.x + t.x), o.y = .5 * (e.y + t.y)
            }, Mt = function (e, t, o) {
                if (e - N > 50) {
                    var i = pt.length > 2 ? pt.shift() : {};
                    i.x = t, i.y = o, pt.push(i), N = e
                }
            }, Lt = function () {
                var e = fe.y - a.currItem.initialPosition.y;
                return 1 - Math.abs(e / (he.y / 2))
            }, $t = {}, Ot = {}, At = [], Ft = function (e) {
                for (; At.length > 0;) At.pop();
                return _ ? (ue = 0, dt.forEach(function (e) {
                    0 === ue ? At[0] = e : 1 === ue && (At[1] = e), ue++
                })) : e.type.indexOf("touch") > -1 ? e.touches && e.touches.length > 0 && (At[0] = Pt(e.touches[0], $t), e.touches.length > 1 && (At[1] = Pt(e.touches[1], Ot))) : ($t.x = e.pageX, $t.y = e.pageY, $t.id = "", At[0] = $t), At
            }, Rt = function (e, t) {
                var o, i, n, r, s = 0, l = fe[e] + t[e], u = t[e] > 0, d = wt.x + t.x, m = wt.x - mt.x;
                return o = l > oe.min[e] || l < oe.max[e] ? c.panEndFriction : 1, l = fe[e] + t[e] * o, !c.allowPanToNext && w !== a.currItem.initialZoomLevel || (ie ? "h" !== ae || "x" !== e || K || (u ? (l > oe.min[e] && (o = c.panEndFriction, s = oe.min[e] - l, i = oe.min[e] - pe[e]), (i <= 0 || m < 0) && Jt() > 1 ? (r = d, m < 0 && d > mt.x && (r = mt.x)) : oe.min.x !== oe.max.x && (n = l)) : (l < oe.max[e] && (o = c.panEndFriction, s = l - oe.max[e], i = pe[e] - oe.max[e]), (i <= 0 || m > 0) && Jt() > 1 ? (r = d, m > 0 && d < mt.x && (r = mt.x)) : oe.min.x !== oe.max.x && (n = l))) : r = d, "x" !== e) ? void (ne || Y || w > a.currItem.fitRatio && (fe[e] += t[e] * o)) : (void 0 !== r && (Oe(r, true), Y = r !== mt.x), oe.min.x !== oe.max.x && (void 0 !== n ? fe.x = n : Y || (fe.x += t.x * o)), void 0 !== r)
            }, Ut = function (e) {
                if (!("mousedown" === e.type && e.button > 0)) {
                    if (Yt) return void e.preventDefault();
                    if (!Q || "mousedown" !== e.type) {
                        if (It(e, true) && e.preventDefault(), ze("pointerDown"), _) {
                            var t = n.arraySearch(dt, e.pointerId, "id");
                            t < 0 && (t = dt.length), dt[t] = {x: e.pageX, y: e.pageY, id: e.pointerId}
                        }
                        var o = Ft(e), i = o.length;
                        X = null, tt(), W && 1 !== i || (W = re = true, n.bind(window, h, a), q = le = se = V = Y = G = j = K = false, ae = null, ze("firstTouchStart", o), Fe(pe, fe), me.x = me.y = 0, Fe(lt, o[0]), Fe(ut, lt), mt.x = we.x * ve, pt = [{
                            x: lt.x,
                            y: lt.y
                        }], N = B = Ie(), qe(w, true), Dt(), Ct()), !J && i > 1 && !ne && !Y && (y = w, K = false, J = j = true, me.y = me.x = 0, Fe(pe, fe), Fe(rt, o[0]), Fe(st, o[1]), _t(rt, st, bt), yt.x = Math.abs(bt.x) - fe.x, yt.y = Math.abs(bt.y) - fe.y, ee = te = Tt(rt, st))
                    }
                }
            }, Bt = function (e) {
                if (e.preventDefault(), _) {
                    var t = n.arraySearch(dt, e.pointerId, "id");
                    if (t > -1) {
                        var o = dt[t];
                        o.x = e.pageX, o.y = e.pageY
                    }
                }
                if (W) {
                    var i = Ft(e);
                    if (ae || G || J) X = i; else if (wt.x !== we.x * ve) ae = "h"; else {
                        var a = Math.abs(i[0].x - lt.x) - Math.abs(i[0].y - lt.y);
                        Math.abs(a) >= at && (ae = a > 0 ? "h" : "v", X = i)
                    }
                }
            }, Nt = function () {
                if (X) {
                    var e = X.length;
                    if (0 !== e) if (Fe(rt, X[0]), ct.x = rt.x - lt.x, ct.y = rt.y - lt.y, J && e > 1) {
                        if (lt.x = rt.x, lt.y = rt.y, !ct.x && !ct.y && xt(X[1], st)) return;
                        Fe(st, X[1]), K || (K = true, ze("zoomGestureStarted"));
                        var t = Tt(rt, st), o = Wt(t);
                        o > a.currItem.initialZoomLevel + a.currItem.initialZoomLevel / 15 && (le = true);
                        var i = 1, n = Ve(), r = Qe();
                        if (o < n) if (c.pinchToClose && !le && y <= a.currItem.initialZoomLevel) {
                            var s = n - o, l = 1 - s / (n / 1.2);
                            Pe(l), ze("onPinchClose", l), se = true
                        } else i = (n - o) / n, i > 1 && (i = 1), o = n - i * (n / 3); else o > r && (i = (o - r) / (6 * n), i > 1 && (i = 1), o = r + i * n);
                        i < 0 && (i = 0), ee = t, _t(rt, st, vt), me.x += vt.x - bt.x, me.y += vt.y - bt.y, Fe(bt, vt), fe.x = Ae("x", o), fe.y = Ae("y", o), q = o > w, w = o, Me()
                    } else {
                        if (!ae) return;
                        if (re && (re = false, Math.abs(ct.x) >= at && (ct.x -= X[0].x - ut.x), Math.abs(ct.y) >= at && (ct.y -= X[0].y - ut.y)), lt.x = rt.x, lt.y = rt.y, 0 === ct.x && 0 === ct.y) return;
                        if ("v" === ae && c.closeOnVerticalDrag && !Et()) {
                            me.y += ct.y, fe.y += ct.y;
                            var u = Lt();
                            return V = true, ze("onVerticalDrag", u), Pe(u), void Me()
                        }
                        Mt(Ie(), rt.x, rt.y), G = true, oe = a.currItem.bounds;
                        var d = Rt("x", ct);
                        d || (Rt("y", ct), Re(fe), Me())
                    }
                }
            }, Zt = function (e) {
                if (U.isOldAndroid) {
                    if (Q && "mouseup" === e.type) return;
                    e.type.indexOf("touch") > -1 && (clearTimeout(Q), Q = setTimeout(function () {
                        Q = 0
                    }, 600))
                }
                ze("pointerUp"), It(e, false) && e.preventDefault();
                var t;
                if (_) {
                    var o = n.arraySearch(dt, e.pointerId, "id");
                    if (o > -1) if (t = dt.splice(o, 1)[0], navigator.pointerEnabled) t.type = e.pointerType || "mouse"; else {
                        var i = {4: "mouse", 2: "touch", 3: "pen"};
                        t.type = i[e.pointerType], t.type || (t.type = e.pointerType || "mouse")
                    }
                }
                var r, s = Ft(e), l = s.length;
                if ("mouseup" === e.type && (l = 0), 2 === l) return X = null, true;
                1 === l && Fe(ut, s[0]), 0 !== l || ae || ne || (t || ("mouseup" === e.type ? t = {
                    x: e.pageX,
                    y: e.pageY,
                    type: "mouse"
                } : e.changedTouches && e.changedTouches[0] && (t = {
                    x: e.changedTouches[0].pageX,
                    y: e.changedTouches[0].pageY,
                    type: "touch"
                })), ze("touchRelease", e, t));
                var u = -1;
                if (0 === l && (W = false, n.unbind(window, h, a), Dt(), J ? u = 0 : gt !== -1 && (u = Ie() - gt)), gt = 1 === l ? Ie() : -1, r = u !== -1 && u < 150 ? "zoom" : "swipe", J && l < 2 && (J = false, 1 === l && (r = "zoomPointerUp"), ze("zoomGestureEnded")), X = null, G || K || ne || V) if (tt(), Z || (Z = qt()), Z.calculateSwipeSpeed("x"), V) {
                    var d = Lt();
                    if (d < c.verticalDragRange) a.close(); else {
                        var m = fe.y, p = ce;
                        ot("verticalDrag", 0, 1, 300, n.easing.cubic.out, function (e) {
                            fe.y = (a.currItem.initialPosition.y - m) * e + m, Pe((1 - p) * e + p), Me()
                        }), ze("onVerticalDrag", 1)
                    }
                } else {
                    if ((Y || ne) && 0 === l) {
                        var f = Qt(r, Z);
                        if (f) return;
                        r = "zoomPointerUp"
                    }
                    if (!ne) return "swipe" !== r ? void jt() : void (!Y && w > a.currItem.fitRatio && Vt(Z))
                }
            }, qt = function () {
                var e, t, o = {
                    lastFlickOffset: {},
                    lastFlickDist: {},
                    lastFlickSpeed: {},
                    slowDownRatio: {},
                    slowDownRatioReverse: {},
                    speedDecelerationRatio: {},
                    speedDecelerationRatioAbs: {},
                    distanceOffset: {},
                    backAnimDestination: {},
                    backAnimStarted: {},
                    calculateSwipeSpeed: function (i) {
                        pt.length > 1 ? (e = Ie() - N + 50, t = pt[pt.length - 2][i]) : (e = Ie() - B, t = ut[i]), o.lastFlickOffset[i] = lt[i] - t, o.lastFlickDist[i] = Math.abs(o.lastFlickOffset[i]), o.lastFlickDist[i] > 20 ? o.lastFlickSpeed[i] = o.lastFlickOffset[i] / e : o.lastFlickSpeed[i] = 0, Math.abs(o.lastFlickSpeed[i]) < .1 && (o.lastFlickSpeed[i] = 0), o.slowDownRatio[i] = .95, o.slowDownRatioReverse[i] = 1 - o.slowDownRatio[i], o.speedDecelerationRatio[i] = 1
                    },
                    calculateOverBoundsAnimOffset: function (e, t) {
                        o.backAnimStarted[e] || (fe[e] > oe.min[e] ? o.backAnimDestination[e] = oe.min[e] : fe[e] < oe.max[e] && (o.backAnimDestination[e] = oe.max[e]), void 0 !== o.backAnimDestination[e] && (o.slowDownRatio[e] = .7, o.slowDownRatioReverse[e] = 1 - o.slowDownRatio[e], o.speedDecelerationRatioAbs[e] < .05 && (o.lastFlickSpeed[e] = 0, o.backAnimStarted[e] = true, ot("bounceZoomPan" + e, fe[e], o.backAnimDestination[e], t || 300, n.easing.sine.out, function (t) {
                            fe[e] = t, Me()
                        }))))
                    },
                    calculateAnimOffset: function (e) {
                        o.backAnimStarted[e] || (o.speedDecelerationRatio[e] = o.speedDecelerationRatio[e] * (o.slowDownRatio[e] + o.slowDownRatioReverse[e] - o.slowDownRatioReverse[e] * o.timeDiff / 10), o.speedDecelerationRatioAbs[e] = Math.abs(o.lastFlickSpeed[e] * o.speedDecelerationRatio[e]), o.distanceOffset[e] = o.lastFlickSpeed[e] * o.speedDecelerationRatio[e] * o.timeDiff, fe[e] += o.distanceOffset[e])
                    },
                    panAnimLoop: function () {
                        if (Ye.zoomPan && (Ye.zoomPan.raf = L(o.panAnimLoop), o.now = Ie(), o.timeDiff = o.now - o.lastNow, o.lastNow = o.now, o.calculateAnimOffset("x"), o.calculateAnimOffset("y"), Me(), o.calculateOverBoundsAnimOffset("x"), o.calculateOverBoundsAnimOffset("y"), o.speedDecelerationRatioAbs.x < .05 && o.speedDecelerationRatioAbs.y < .05)) return fe.x = Math.round(fe.x), fe.y = Math.round(fe.y), Me(), void Je("zoomPan")
                    }
                };
                return o
            }, Vt = function (e) {
                return e.calculateSwipeSpeed("y"), oe = a.currItem.bounds, e.backAnimDestination = {}, e.backAnimStarted = {}, Math.abs(e.lastFlickSpeed.x) <= .05 && Math.abs(e.lastFlickSpeed.y) <= .05 ? (e.speedDecelerationRatioAbs.x = e.speedDecelerationRatioAbs.y = 0, e.calculateOverBoundsAnimOffset("x"), e.calculateOverBoundsAnimOffset("y"), true) : (et("zoomPan"), e.lastNow = Ie(), void e.panAnimLoop())
            }, Qt = function (e, t) {
                var o;
                ne || (ht = m);
                var i;
                if ("swipe" === e) {
                    var r = lt.x - ut.x, s = t.lastFlickDist.x < 10;
                    r > nt && (s || t.lastFlickOffset.x > 20) ? i = -1 : r < -nt && (s || t.lastFlickOffset.x < -20) && (i = 1)
                }
                var l;
                i && (m += i, m < 0 ? (m = c.loop ? Jt() - 1 : 0, l = true) : m >= Jt() && (m = c.loop ? 0 : Jt() - 1, l = true), l && !c.loop || (ye += i, ve -= i, o = true));
                var u, d = we.x * ve, p = Math.abs(d - wt.x);
                return o || d > wt.x == t.lastFlickSpeed.x > 0 ? (u = Math.abs(t.lastFlickSpeed.x) > 0 ? p / Math.abs(t.lastFlickSpeed.x) : 333, u = Math.min(u, 400), u = Math.max(u, 250)) : u = 333, ht === m && (o = false), ne = true, ze("mainScrollAnimStart"), ot("mainScroll", wt.x, d, u, n.easing.cubic.out, Oe, function () {
                    tt(), ne = false, ht = -1, (o || ht !== m) && a.updateCurrItem(), ze("mainScrollAnimComplete")
                }), o && a.updateCurrItem(true), o
            }, Wt = function (e) {
                return 1 / te * e * y
            }, jt = function () {
                var e = w, t = Ve(), o = Qe();
                w < t ? e = t : w > o && (e = o);
                var i, r = 1, s = ce;
                return se && !q && !le && w < t ? (a.close(), true) : (se && (i = function (e) {
                    Pe((r - s) * e + s)
                }), a.zoomTo(e, 0, 200, n.easing.cubic.out, i), true)
            };
        De("Gestures", {
            publicMethods: {
                initGestures: function () {
                    var e = function (e, t, o, i, n) {
                        E = e + t, k = e + o, z = e + i, I = n ? e + n : ""
                    };
                    _ = U.pointerEvent, _ && U.touch && (U.touch = false), _ ? navigator.pointerEnabled ? e("pointer", "down", "move", "up", "cancel") : e("MSPointer", "Down", "Move", "Up", "Cancel") : U.touch ? (e("touch", "start", "move", "end", "cancel"), M = true) : e("mouse", "down", "move", "up"), h = k + " " + z + " " + I, v = E, _ && !M && (M = navigator.maxTouchPoints > 1 || navigator.msMaxTouchPoints > 1), a.likelyTouchDevice = M, g[E] = Ut, g[k] = Bt, g[z] = Zt, I && (g[I] = g[z]), U.touch && (v += " mousedown", h += " mousemove mouseup", g.mousedown = g[E], g.mousemove = g[k], g.mouseup = g[z]), M || (c.allowPanToNext = false)
                }
            }
        });
        var Kt, Gt, Ht, Yt, Xt, Jt, eo;
        var to = function (t, o, i, r) {
            Kt && clearTimeout(Kt), Yt = true, Ht = true;
            var s;
            t.initialLayout ? (s = t.initialLayout, t.initialLayout = null) : s = c.getThumbBoundsFn && c.getThumbBoundsFn(m);
            var l = i ? c.hideAnimationDuration : c.showAnimationDuration, u = function () {
                Je("initialZoom"), i ? (a.template.removeAttribute("style"), a.bg.removeAttribute("style")) : (Pe(1), o && (o.style.display = "block"), n.addClass(e, "pswp--animated-in"), ze("initialZoom" + (i ? "OutEnd" : "InEnd"))), r && r(), Yt = false
            };
            if (!l || !s || void 0 === s.x) return ze("initialZoom" + (i ? "Out" : "In")), w = t.initialZoomLevel, Fe(fe, t.initialPosition), Me(), e.style.opacity = i ? 0 : 1, Pe(1), void (l ? setTimeout(function () {
                u()
            }, l) : u());
            var p = function () {
                var o = d, r = !a.currItem.src || a.currItem.loadError || c.showHideOpacity;
                t.miniImg && (t.miniImg.style.webkitBackfaceVisibility = "hidden"), i || (w = s.w / t.w, fe.x = s.x, fe.y = s.y - A, a[r ? "template" : "bg"].style.opacity = .001, Me()), et("initialZoom"), i && !o && n.removeClass(e, "pswp--animated-in"), r && (i ? n[(o ? "remove" : "add") + "Class"](e, "pswp--animate_opacity") : setTimeout(function () {
                    n.addClass(e, "pswp--animate_opacity")
                }, 30)), Kt = setTimeout(function () {
                    if (ze("initialZoom" + (i ? "Out" : "In")), i) {
                        var a = s.w / t.w, c = {x: fe.x, y: fe.y}, d = w, m = ce, p = function (t) {
                            1 === t ? (w = a, fe.x = s.x, fe.y = s.y - R) : (w = (a - d) * t + d, fe.x = (s.x - c.x) * t + c.x, fe.y = (s.y - R - c.y) * t + c.y), Me(), r ? e.style.opacity = 1 - t : Pe(m - t * m)
                        };
                        o ? ot("initialZoom", 0, 1, l, n.easing.cubic.out, p, u) : (p(1), Kt = setTimeout(u, l + 20))
                    } else w = t.initialZoomLevel, Fe(fe, t.initialPosition), Me(), Pe(1), r ? e.style.opacity = 1 : Pe(1), Kt = setTimeout(u, l + 20)
                }, i ? 25 : 90)
            };
            p()
        }, oo = {}, io = [], no = {
            index: 0,
            errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
            forceProgressiveLoading: false,
            preload: [1, 1],
            getNumItemsFn: function () {
                return Gt.length
            }
        }, ao = function () {
            return {center: {x: 0, y: 0}, max: {x: 0, y: 0}, min: {x: 0, y: 0}}
        }, ro = function (e, t, o) {
            var i = e.bounds;
            i.center.x = Math.round((oo.x - t) / 2), i.center.y = Math.round((oo.y - o) / 2) + e.vGap.top, i.max.x = t > oo.x ? Math.round(oo.x - t) : i.center.x, i.max.y = o > oo.y ? Math.round(oo.y - o) + e.vGap.top : i.center.y, i.min.x = t > oo.x ? 0 : i.center.x, i.min.y = o > oo.y ? e.vGap.top : i.center.y
        }, so = function (e, t, o) {
            if (e.src && !e.loadError) {
                var i = !o;
                if (i && (e.vGap || (e.vGap = {
                    top: 0,
                    bottom: 0
                }), ze("parseVerticalMargin", e)), oo.x = t.x, oo.y = t.y - e.vGap.top - e.vGap.bottom, i) {
                    var n = oo.x / e.w, a = oo.y / e.h;
                    e.fitRatio = n < a ? n : a;
                    var r = c.scaleMode;
                    "orig" === r ? o = 1 : "fit" === r && (o = e.fitRatio), o > 1 && (o = 1), e.initialZoomLevel = o, e.bounds || (e.bounds = ao())
                }
                if (!o) return;
                return ro(e, e.w * o, e.h * o), i && o === e.initialZoomLevel && (e.initialPosition = e.bounds.center), e.bounds
            }
            return e.w = e.h = 0, e.initialZoomLevel = e.fitRatio = 1, e.bounds = ao(), e.initialPosition = e.bounds.center, e.bounds
        }, co = function (e, t, o, i, n, r) {
            t.loadError || i && (t.imageAppended = true, mo(t, i, t === a.currItem && Te), o.appendChild(i), r && setTimeout(function () {
                t && t.loaded && t.placeholder && (t.placeholder.style.display = "none", t.placeholder = null)
            }, 500))
        }, lo = function (e) {
            e.loading = true, e.loaded = false;
            var t = e.img = n.createEl("pswp__img", "img"), o = function () {
                e.loading = false, e.loaded = true, e.loadComplete ? e.loadComplete(e) : e.img = null, t.onload = t.onerror = null, t = null
            };
            return t.onload = o, t.onerror = function () {
                e.loadError = true, o()
            }, t.src = e.src, t
        }, uo = function (e, t) {
            if (e.src && e.loadError && e.container) return t && (e.container.innerHTML = ""), e.container.innerHTML = c.errorMsg.replace("%url%", e.src), true
        }, mo = function (e, t, o) {
            if (e.src) {
                t || (t = e.container.lastChild);
                var i = o ? e.w : Math.round(e.w * e.fitRatio), n = o ? e.h : Math.round(e.h * e.fitRatio);
                e.placeholder && !e.loaded && (e.placeholder.style.width = i + "px", e.placeholder.style.height = n + "px"), t.style.width = i + "px", t.style.height = n + "px"
            }
        }, po = function () {
            if (io.length) {
                for (var e, t = 0; t < io.length; t++) e = io[t], e.holder.index === e.index && co(e.index, e.item, e.baseDiv, e.img, false, e.clearPlaceholder);
                io = []
            }
        };

        De("Controller", {
            publicMethods: {
                lazyLoadItem: function (e) {
                    e = Ce(e);
                    var t = Xt(e);
                    t && (!t.loaded && !t.loading || T) && (ze("gettingData", e, t), t.src && lo(t))
                },
                initController: function () {
                    n.extend(c, no, true);
                    a.items = Gt = o;
                    Xt = a.getItemAt;
                    Jt = c.getNumItemsFn;
                    eo = c.loopl;
                    Jt() < 3 && (c.loop = false),
                        ke("beforeChange", function (e) {
                            var t, o = c.preload, i = null === e || e >= 0, n = Math.min(o[0], Jt()),
                                r = Math.min(o[1], Jt());
                            for (t = 1; t <= (i ? r : n); t++) a.lazyLoadItem(m + t);
                            for (t = 1; t <= (i ? n : r); t++) a.lazyLoadItem(m - t)
                        }), ke("initialLayout",
                        function () {
                            a.currItem.initialLayout = c.getThumbBoundsFn && c.getThumbBoundsFn(m)
                        }),
                        ke("mainScrollAnimComplete", po), ke("initialZoomInEnd", po),
                        ke("destroy", function () {
                            for (var e, t = 0; t < Gt.length; t++) e = Gt[t],
                            e.container && (e.container = null), e.placeholder && (e.placeholder = null),
                            e.img && (e.img = null), e.preloader && (e.preloader = null),
                            e.loadError && (e.loaded = e.loadError = false);
                            io = null
                        })
                },
                getItemAt: function (e) {
                    var ret = e >= 0 && (void 0 !== Gt[e] && Gt[e]);
                    return ret;
                },
                allowProgressiveImg: function () {
                    return c.forceProgressiveLoading || !M || c.mouseUsed || screen.width > 1200
                },
                setContent: function (e, t) {
                    c.loop && (t = Ce(t));
                    var o = a.getItemAt(e.index);
                    o && (o.container = null);
                    var i, r = a.getItemAt(t);
                    if (!r) return void (e.el.innerHTML = "");
                    ze("gettingData", t, r), e.index = t, e.item = r;
                    var s = r.container = n.createEl("pswp__zoom-wrap");
                    if (!r.src && r.html && (r.html.tagName ? s.appendChild(r.html) : s.innerHTML = r.html), uo(r), so(r, he), !r.src || r.loadError || r.loaded) r.src && !r.loadError && (i = n.createEl("pswp__img", "img"), i.style.opacity = 1, i.src = r.src, mo(r, i), co(t, r, s, i, true)); else {
                        if (r.loadComplete = function (o) {
                            if (l) {
                                if (e && e.index === t) {
                                    if (uo(o, true)) return o.loadComplete = o.img = null, so(o, he), Le(o), void (e.index === m && a.updateCurrZoomItem());
                                    o.imageAppended ? !Yt && o.placeholder && (o.placeholder.style.display = "none", o.placeholder = null) : U.transform && (ne || Yt) ? io.push({
                                        item: o,
                                        baseDiv: s,
                                        img: o.img,
                                        index: t,
                                        holder: e,
                                        clearPlaceholder: true
                                    }) : co(t, o, s, o.img, ne || Yt, true)
                                }
                                o.loadComplete = null, o.img = null, ze("imageLoadComplete", t, o)
                            }
                        }, n.features.transform) {
                            var u = "pswp__img pswp__img--placeholder";
                            u += r.msrc ? "" : " pswp__img--placeholder--blank";
                            var d = n.createEl(u, r.msrc ? "img" : "");
                            r.msrc && (d.src = r.msrc), mo(r, d), s.appendChild(d), r.placeholder = d
                        }
                        r.loading || lo(r), a.allowProgressiveImg() && (!Ht && U.transform ? io.push({
                            item: r,
                            baseDiv: s,
                            img: r.img,
                            index: t,
                            holder: e
                        }) : co(t, r, s, r.img, true, true))
                    }
                    Ht || t !== m ? Le(r) : (ie = s.style, to(r, i || r.img)), e.el.innerHTML = "", e.el.appendChild(s)
                },
                cleanSlide: function (e) {
                    e.img && (e.img.onload = e.img.onerror = null), e.loaded = e.loading = e.img = e.imageAppended = false
                }
            }
        });


        var fo, ho = {}, vo = function (e, t, o) {
            var i = document.createEvent("CustomEvent"),
                n = {origEvent: e, target: e.target, releasePoint: t, pointerType: o || "touch"};
            i.initCustomEvent("pswpTap", true, true, n), e.target.dispatchEvent(i)
        };


        De("Tap", {
            publicMethods: {
                initTap: function () {
                    ke("firstTouchStart", a.onTapStart), ke("touchRelease", a.onTapRelease), ke("destroy", function () {
                        ho = {}, fo = null
                    })
                }, onTapStart: function (e) {
                    e.length > 1 && (clearTimeout(fo), fo = null)
                }, onTapRelease: function (e, t) {
                    if (t && !G && !j && !Xe) {
                        var o = t;
                        if (fo && (clearTimeout(fo), fo = null, St(o, ho))) return void ze("doubleTap", o);
                        if ("mouse" === t.type) return void vo(e, t, "mouse");
                        var i = e.target.tagName.toUpperCase();
                        if ("BUTTON" === i || n.hasClass(e.target, "pswp__single-tap")) return void vo(e, t);
                        Fe(ho, o), fo = setTimeout(function () {
                            vo(e, t), fo = null
                        }, 300)
                    }
                }
            }
        });


        var go;

        De("DesktopZoom", {
            publicMethods: {
                initDesktopZoom: function () {
                    F || (M ? ke("mouseUsed", function () {
                        a.setupDesktopZoom()
                    }) : a.setupDesktopZoom(true))
                }, setupDesktopZoom: function (t) {
                    go = {};
                    var o = "wheel mousewheel DOMMouseScroll";
                    ke("bindEvents", function () {
                        n.bind(e, o, a.handleMouseWheel)
                    }), ke("unbindEvents", function () {
                        go && n.unbind(e, o, a.handleMouseWheel)
                    }), a.mouseZoomedIn = false;
                    var i, r = function () {
                        a.mouseZoomedIn && (n.removeClass(e, "pswp--zoomed-in"), a.mouseZoomedIn = false), w < 1 ? n.addClass(e, "pswp--zoom-allowed") : n.removeClass(e, "pswp--zoom-allowed"), s()
                    }, s = function () {
                        i && (n.removeClass(e, "pswp--dragging"), i = false)
                    };
                    ke("resize", r), ke("afterChange", r), ke("pointerDown", function () {
                        a.mouseZoomedIn && (i = true, n.addClass(e, "pswp--dragging"))
                    }), ke("pointerUp", s), t || r()
                }, handleMouseWheel: function (e) {
                    if (w <= a.currItem.fitRatio) return c.modal && (!c.closeOnScroll || Xe || W ? e.preventDefault() : P && Math.abs(e.deltaY) > 2 && (d = true, a.close())), true;
                    if (e.stopPropagation(), go.x = 0, "deltaX" in e) 1 === e.deltaMode ? (go.x = 18 * e.deltaX, go.y = 18 * e.deltaY) : (go.x = e.deltaX, go.y = e.deltaY); else if ("wheelDelta" in e) e.wheelDeltaX && (go.x = -.16 * e.wheelDeltaX), e.wheelDeltaY ? go.y = -.16 * e.wheelDeltaY : go.y = -.16 * e.wheelDelta; else {
                        if (!("detail" in e)) return;
                        go.y = e.detail
                    }
                    qe(w, true);
                    var t = fe.x - go.x, o = fe.y - go.y;
                    (c.modal || t <= oe.min.x && t >= oe.max.x && o <= oe.min.y && o >= oe.max.y) && e.preventDefault(), a.panTo(t, o)
                }, toggleDesktopZoom: function (t) {
                    t = t || {x: he.x / 2 + ge.x, y: he.y / 2 + ge.y};
                    var o = c.getDoubleTapZoom(true, a.currItem), i = w === o;
                    a.mouseZoomedIn = !i, a.zoomTo(i ? a.currItem.initialZoomLevel : o, t, 333), n[(i ? "remove" : "add") + "Class"](e, "pswp--zoomed-in")
                }
            }
        });
        var wo, yo, bo, xo, So, To, Do, Co, Eo, ko, zo, Io, Po = {history: true, galleryUID: 1}, _o = function () {
            return zo.hash.substring(1)
        }, Mo = function () {
            wo && clearTimeout(wo), bo && clearTimeout(bo)
        }, Lo = function () {
            var e = _o(), t = {};
            if (e.length < 5) return t;
            var o, i = e.split("&");
            for (o = 0; o < i.length; o++) if (i[o]) {
                var n = i[o].split("=");
                n.length < 2 || (t[n[0]] = n[1])
            }
            if (c.galleryPIDs) {
                var a = t.pid;
                for (t.pid = 0, o = 0; o < Gt.length; o++) if (Gt[o].pid === a) {
                    t.pid = o;
                    break
                }
            } else t.pid = parseInt(t.pid, 10) - 1;
            return t.pid < 0 && (t.pid = 0), t
        }, $o = function () {
            if (bo && clearTimeout(bo), Xe || W) return void (bo = setTimeout($o, 500));
            xo ? clearTimeout(yo) : xo = true;
            var e = m + 1, t = Xt(m);
            t.hasOwnProperty("pid") && (e = t.pid);
            var o = Do + "&gid=" + c.galleryUID + "&pid=" + e;
            Co || zo.hash.indexOf(o) === -1 && (ko = true);
            var i = zo.href.split("#")[0] + "#" + o;
            Io ? "#" + o !== window.location.hash && history[Co ? "replaceState" : "pushState"]("", document.title, i) : Co ? zo.replace(i) : zo.hash = o, Co = true, yo = setTimeout(function () {
                xo = false
            }, 60)
        };
        De("History", {
            publicMethods: {
                initHistory: function () {
                    if (n.extend(c, Po, true), c.history) {
                        zo = window.location, ko = false, Eo = false, Co = false, Do = _o(), Io = "pushState" in history, Do.indexOf("gid=") > -1 && (Do = Do.split("&gid=")[0], Do = Do.split("?gid=")[0]), ke("afterChange", a.updateURL), ke("unbindEvents", function () {
                            n.unbind(window, "hashchange", a.onHashChange)
                        });
                        var e = function () {
                            To = true, Eo || (ko ? history.back() : Do ? zo.hash = Do : Io ? history.pushState("", document.title, zo.pathname + zo.search) : zo.hash = ""), Mo()
                        };
                        ke("unbindEvents", function () {
                            d && e()
                        }), ke("destroy", function () {
                            To || e()
                        }), ke("firstUpdate", function () {
                            m = Lo().pid
                        });
                        var t = Do.indexOf("pid=");
                        t > -1 && (Do = Do.substring(0, t), "&" === Do.slice(-1) && (Do = Do.slice(0, -1))), setTimeout(function () {
                            l && n.bind(window, "hashchange", a.onHashChange)
                        }, 40)
                    }
                }, onHashChange: function () {
                    return _o() === Do ? (Eo = true, void a.close()) : void (xo || (So = true, a.goTo(Lo().pid), So = false))
                }, updateURL: function () {
                    Mo(), So || (Co ? wo = setTimeout($o, 800) : $o())
                }
            }
        }), n.extend(a, it)
    };
    return e
}

function initPhotoSwipe(e, t) {
    "function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t() : e.PhotoSwipe = t()
}

function initProductPhotoContainer() {
    "use strict";

    function e(e) {
        i || (i = setInterval(function () {
            "function" == typeof inject_orbitvu && "object" == typeof swfobject && "function" == typeof e && (clearInterval(i), e(), i = false)
        }, 100))
    }

    function t(e, t) {
        var o = document.querySelectorAll("." + t);
        if (!(o.length > 0)) {
            var i = document.createElement("script");
            i.src = e, i.className = t, document.body.appendChild(i)
        }
    }

    function initDvVisor360() {

        var e = $("#dvVisor360"), t = $(".product-photo-container").width();
        return !e.hasClass("orbitvu-container") && (inject_orbitvu("dvVisor360", motocard.viewData.cdnUrl + "/assets/360/orbitvuer12.swf", motocard.viewData.cdnUrl + "/assets/360/expressInstall.swf", {
            ovus_folder: motocard.viewData.cdnUrl + "/" + e.data("src"),
            content2: "yes",
            width: t,
            height: motocard.viewData.is_mobile ? t : 550,
            buttons_type: "auto",
            teaser: "autorotate",
            lang: motocard.viewData.language.code
        }), false)

    }

    if ($("#dvVisor360")) {
        $("#dvVisor360").length && (t(motocard.viewData.cdnUrl + "/assets/360/orbitvu.js", "orvitvu"), t(motocard.viewData.cdnUrl + "/assets/360/swfobject.js", "swfobject")), $("#dvVisor360").bind("load", function () {
            e(initDvVisor360)
        });
    }
    var i = false
}

function initCarusels1() {
    "use strict";


    if ($(".buy-block .countdown-clock")) {
        $(".buy-block .countdown-clock").length > 0 && !function () {
            var e = motocard.viewData.product.countdown;
            setCountdown($(".buy-block .countdown-clock"), e)
        }();
    }
    var $prodPhotoContainer = $(".product-photo-container");
    var t = false;
    $prodPhotoContainer.hide();
    $prodPhotoContainer.on("initialized.owl.carousel", function (t) {
        setTimeout(function () {
            $(".product-photo-preload").hide();
            $(".product-photo-container").show();
            $(".owl-item div[data-type=360]").on("touchstart mousedown", function (e) {
                e.stopPropagation()
            });
            var $owlVideoItems = $(".owl-item div[data-type=video]");
            $owlVideoItems.children("iframe").attr("width", $prodPhotoContainer.width());
            $owlVideoItems.children("iframe").attr("height", 9 * $prodPhotoContainer.width() / 16)
        }, 250)
    });
    var startPos = 0;
    startPos += $(".product-media-nav button[data-type=video]").length;
    if(location.search.indexOf("show360=true") === -1) {
        startPos += $(".product-media-nav button[data-type=360]").length;
    }


    $(".product-media-nav button").on("click", function () {
        $prodPhotoContainer.trigger("to.owl.carousel", $(this).data("navIndex"))
    });

    if(1 === $(".product-media-nav button").length) {
        $(".product-media-nav").hide();
    }
    var i = 549;
    // motocard.viewData.is_mobile && (i = 220);
    var showMore = $(".product-description-container .show-more");
    var showLess = $(".product-description-container .show-less");
    var $prodDescription = $(".product-description");

    if ($prodDescription.height() > i) {
        $prodDescription.height(i);
        $prodDescription.addClass("collapsed");
        showLess.hide();
    } else {
        showMore.remove();
        showLess.remove();
    }

    showMore.on("click", function () {
        var height = $prodDescription.css("height", "auto").height();
        //$prodDescription.height(i);
        $prodDescription.animate({height: "100%"}, .5);
        setTimeout(function () {
            $prodDescription.removeClass("collapsed")
        }, 100);
        showMore.hide();
        showLess.show();
    });
    showLess.on("click", function () {
        $prodDescription.addClass("collapsed");
        $prodDescription.animate({height: i}, .5);
        smoothScroll($(".product-description"));
        showLess.hide();
        showMore.show();
    });

    $prodPhotoContainer.owlCarousel({
        nav: true,
        dots: false,
        lazyLoad: false,
        startPosition: startPos,
        navText: ['<i class="icon-previous"></i>', '<i class="icon-next"></i>'],
        items: 1
    }).on("changed.owl.carousel", function (e) {
        if (!t) {
            t = true;
            var o = e.item.index;
            var i = $(e.target).find(".owl-item").eq(o);
            var n = i.children("div");
            var a = n.data("dotEnable");
            $(".product-media-nav button").removeClass("current");
            $(".product-media-nav button[data-index=" + a + "]").addClass("current");
            if ("360" == n.data("type"))
                n.trigger("load");

            setTimeout(function () {
                t = false;
            }, 10);
        }
    });

    $(".items-carousel.owl-carousel").owlCarousel({
        loop: false,
        nav: true,
        dots: false,
        lazyLoad: true,
        margin: 10,
        navText: ['<i class="icon-previous"></i>', '<i class="icon-next"></i>'],
        responsive: {0: {items: 2, slideBy: 2}, 641: {items: 3, slideBy: 3}, 900: {items: 5, slideBy: 5}},
        onTranslated: function () {
            lazyLoader.update()
        }
    }), $(".product-versions.owl-carousel").on("initialized.owl.carousel", function (e) {
        setTimeout(function () {
            $(".product-versions.owl-carousel").show()
        }, 250)
    }), $(".product-versions.owl-carousel").owlCarousel({
        loop: false,
        nav: true,
        dots: false,
        navText: ['<button>\n<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left"><path d="M15 18l-6-6 6-6"/></svg>\n</button>', '<button>\n<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><path d="M9 18l6-6-6-6"/></svg>\n</button>'],
        responsive: {
            0: {items: 3, slideBy: 2},
            641: {items: 4, slideBy: 3},
            1101: {items: 5, slideBy: 4},
            1501: {items: 6, slideBy: 4},
            1801: {items: 7, slideBy: 4}
        }
    }), $(".full-width-carousel.owl-carousel").owlCarousel({
        loop: false,
        nav: true,
        dots: false,
        lazyLoad: true,
        margin: 10,
        navText: ['<i class="icon-previous"></i>', '<i class="icon-next"></i>'],
        responsive: {0: {items: 2, slideBy: 2}, 641: {items: 6, slideBy: 6}, 1101: {items: 8, slideBy: 8}},
        onTranslated: function () {
            lazyLoader.update()
        }
    })
}

function initCarusels2() {
    "use strict";

    $(".product-photo-container").hide();
    var photoConatiner = $(".product-photo-container");

    function initProductThumbs(e) {

//        var hasVideo = $(".product-photo-container div[data-type=video]").length > 0;
  //      e = 0; // hasVideo ? 1 : 0;
        if(!n){
            (
                n = true,
                    photoConatiner.trigger("to.owl.carousel", [e, i, true]),
                    $productThumbs.trigger("to.owl.carousel", [e, i, true]),
                    $(".product-thumbs .owl-item.enabled").removeClass("enabled"),
                    $(".product-thumbs .owl-item").eq(e).addClass("enabled"),
                    setTimeout(function () {
                        n = false
                    }, 10)
            )
        }

    }

    $(".buy-block .countdown-clock").length > 0 && !function () {
        var e = motocard.viewData.product.rateExpiration;
        setCountdown($(".buy-block .countdown-clock"), e)
    }();


    var $productThumbs = $(".product-thumbs");
    var i = 250;
    var n = false;
    photoConatiner.on("initialized.owl.carousel", function (e) {
        $(".mc-spinner.main-owl").hide(),
            setTimeout(function () {
                $(".product-photo-container").show()
            }, 100)
    }),
        $productThumbs.on("initialized.owl.carousel", function (e) {
            $(".product-thumbs .owl-item").eq(0).addClass("enabled")
        });

        photoConatiner.owlCarousel({
            nav: true,
            dots: false,
//                center: true,
            loop: true,
            autoplay: true,
            lazyLoad: true,
            navText: ['<i class="icon-previous"></i>', '<i class="icon-next"></i>'],
            items: 1
        }).on("changed.owl.carousel", function (t) {
            initProductThumbs(t.item.index)
        });


        $productThumbs.owlCarousel({
            nav: true,
            dots: false,
     //       center: $(".product-thumbs  > div.video-thumb").length > 0, // jcf center producto thubms if video present so that video thumbs appears
            lazyLoad: true,
            items: $productThumbs.data("items"),
            margin: 10,
            autoWidth: true,
            navText: ['<button><i class="icon-previous"></i></button>', '<button><i class="icon-next"></i></button>']
        }).on("click", ".owl-item", function () {
            initProductThumbs($(this).index())
        }).on("changed.owl.carousel", function (t) {
            initProductThumbs(t.item.index)
        });


        $(".product-videos").owlCarousel({
            loop: false,
            nav: true,
            dots: false,
            navText: ['<button><i class="icon-previous"></i></button>', '<button><i class="icon-next"></i></button>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1e3: {
                    items: 1
                }
            }
        });


        $(".items-carousel.owl-carousel").owlCarousel({
            loop: false,
            nav: true,
            dots: false,
            margin: 10,
            navText: ['<button><i class="icon-previous"></i></button>', '<button><i class="icon-next"></i></button>'],
            responsive: {
                0: {
                    items: 2,
                    slideBy: 2
                },
                641: {
                    items: 3,
                    slideBy: 3
                },
                1101: {
                    items: 4,
                    slideBy: 4
                }
            },
            onTranslated: function () {
                lazyLoader.update()
            }
        });


        $(".full-width-carousel.owl-carousel").owlCarousel({
            loop: false,
            nav: true,
            dots: false,
            margin: 10,
            navText: ['<button><i class="icon-previous"></i></button>', '<button><i class="icon-next"></i></button>'],
            responsive: {
                0: {
                    items: 2,
                    slideBy: 2
                },
                641: {
                    items: 6,
                    slideBy: 6
                },
                1101: {
                    items: 8,
                    slideBy: 8
                }
            },
            onTranslated: function () {
                lazyLoader.update()
            }
        });
}
/*

(function () {
    "use strict";

    function e(e, t, o) {
        this.showMotorbikesModal = function (e) {
            o.load([motocard.viewData.angularTemplates.pagination, motocard.viewData.angularTemplates.motorbikesModal]).then(function () {
                var o = {
                    templateUrl: "motorbikes-modal.html",
                    windowClass: "compatible-moto",
                    size: "medium",
                    resolve: {
                        id: function () {
                            return e
                        }
                    },
                    controller: ["$scope", "$modalInstance", "id", function (e, t, o) {
                        e.translations = motocard.viewData.translations, e.models = listProducts[o], e.currentPage = 1, e.pageSize = motocard.viewData.is_mobile ? 4 : 6, e.searching = false, e.totalProducts = e.models.length, e.inputs = {keyword: ""}, e.currentLanguage = motocard.viewData.language.code, e.$watch("inputs.keyword", function (t) {
                            if ("" === t) return e.models = listProducts[o], void (e.searching = false);
                            e.searching = true;
                            const i = String(t).replace(new RegExp(" ", "g"), "").toLowerCase();
                            e.models = listProducts[o].filter(function (e) {
                                const t = String(e.brand + e.name).replace(new RegExp(" ", "g"), "").toLowerCase();
                                return t.includes(i)
                            })
                        }), e.clearSearch = function () {
                            e.inputs.keyword = "", e.searching = false
                        }, e.pageChanged = function (t) {
                            e.currentPage = t
                        }, e.cancel = function () {
                            t.dismiss("cancel")
                        }
                    }]
                };
                t.open(o)
            })
        }
    }

    angular.module("motocardServices").service("MotorbikeService", ["$http", "$modal", "$ocLazyLoad", e])
})();
*/


// initProductPhotoContainer();
// initCarusels1();
// initCarusels2();



