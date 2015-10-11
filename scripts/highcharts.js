/*
 Highcharts JS v3.0.10 (2014-03-10)

 (c) 2009-2014 Torstein Honsi

 License: www.highcharts.com/license
*/
(function () {
    function s(a, b) {
        var c;
        a || (a = {});
        for (c in b) a[c] = b[c];
        return a
    }

    function w() {
        var a, b = arguments,
            c, d = {}, e = function (a, b) {
                var c, d;
                typeof a !== "object" && (a = {});
                for (d in b) b.hasOwnProperty(d) && (c = b[d], a[d] = c && typeof c === "object" && Object.prototype.toString.call(c) !== "[object Array]" && d !== "renderTo" && typeof c.nodeType !== "number" ? e(a[d] || {}, c) : b[d]);
                return a
            };
        b[0] === !0 && (d = b[1], b = Array.prototype.slice.call(b, 2));
        c = b.length;
        for (a = 0; a < c; a++) d = e(d, b[a]);
        return d
    }

    function x(a, b) {
        return parseInt(a, b ||
            10)
    }

    function ga(a) {
        return typeof a === "string"
    }

    function $(a) {
        return typeof a === "object"
    }

    function La(a) {
        return Object.prototype.toString.call(a) === "[object Array]"
    }

    function ya(a) {
        return typeof a === "number"
    }

    function za(a) {
        return T.log(a) / T.LN10
    }

    function ha(a) {
        return T.pow(10, a)
    }

    function ia(a, b) {
        for (var c = a.length; c--;)
            if (a[c] === b) {
                a.splice(c, 1);
                break
            }
    }

    function r(a) {
        return a !== u && a !== null
    }

    function z(a, b, c) {
        var d, e;
        if (ga(b)) r(c) ? a.setAttribute(b, c) : a && a.getAttribute && (e = a.getAttribute(b));
        else if (r(b) &&
            $(b))
            for (d in b) a.setAttribute(d, b[d]);
        return e
    }

    function na(a) {
        return La(a) ? a : [a]
    }

    function o() {
        var a = arguments,
            b, c, d = a.length;
        for (b = 0; b < d; b++)
            if (c = a[b], typeof c !== "undefined" && c !== null) return c
    }

    function D(a, b) {
        if (Aa && !X && b && b.opacity !== u) b.filter = "alpha(opacity=" + b.opacity * 100 + ")";
        s(a.style, b)
    }

    function V(a, b, c, d, e) {
        a = y.createElement(a);
        b && s(a, b);
        e && D(a, {
            padding: 0,
            border: O,
            margin: 0
        });
        c && D(a, c);
        d && d.appendChild(a);
        return a
    }

    function ja(a, b) {
        var c = function () {};
        c.prototype = new a;
        s(c.prototype, b);
        return c
    }

    function Ga(a, b, c, d) {
        var e = L.lang,
            a = +a || 0,
            f = b === -1 ? (a.toString().split(".")[1] || "").length : isNaN(b = N(b)) ? 2 : b,
            b = c === void 0 ? e.decimalPoint : c,
            d = d === void 0 ? e.thousandsSep : d,
            e = a < 0 ? "-" : "",
            c = String(x(a = N(a).toFixed(f))),
            g = c.length > 3 ? c.length % 3 : 0;
        return e + (g ? c.substr(0, g) + d : "") + c.substr(g).replace(/(\d{3})(?=\d)/g, "$1" + d) + (f ? b + N(a - c).toFixed(f).slice(2) : "")
    }

    function Ha(a, b) {
        return Array((b || 2) + 1 - String(a).length).join(0) + a
    }

    function Ma(a, b, c) {
        var d = a[b];
        a[b] = function () {
            var a = Array.prototype.slice.call(arguments);
            a.unshift(d);
            return c.apply(this, a)
        }
    }

    function Ia(a, b) {
        for (var c = "{", d = !1, e, f, g, h, i, j = [];
            (c = a.indexOf(c)) !== -1;) {
            e = a.slice(0, c);
            if (d) {
                f = e.split(":");
                g = f.shift().split(".");
                i = g.length;
                e = b;
                for (h = 0; h < i; h++) e = e[g[h]];
                if (f.length) f = f.join(":"), g = /\.([0-9])/, h = L.lang, i = void 0, /f$/.test(f) ? (i = (i = f.match(g)) ? i[1] : -1, e = Ga(e, i, h.decimalPoint, f.indexOf(",") > -1 ? h.thousandsSep : "")) : e = bb(f, e)
            }
            j.push(e);
            a = a.slice(c + 1);
            c = (d = !d) ? "}" : "{"
        }
        j.push(a);
        return j.join("")
    }

    function mb(a) {
        return T.pow(10, S(T.log(a) / T.LN10))
    }

    function nb(a, b, c, d) {
        var e, c = o(c, 1);
        e = a / c;
        b || (b = [1, 2, 2.5, 5, 10], d && d.allowDecimals === !1 && (c === 1 ? b = [1, 2, 5, 10] : c <= 0.1 && (b = [1 / c])));
        for (d = 0; d < b.length; d++)
            if (a = b[d], e <= (b[d] + (b[d + 1] || b[d])) / 2) break;
        a *= c;
        return a
    }

    function Bb() {
        this.symbol = this.color = 0
    }

    function ob(a, b) {
        var c = a.length,
            d, e;
        for (e = 0; e < c; e++) a[e].ss_i = e;
        a.sort(function (a, c) {
            d = b(a, c);
            return d === 0 ? a.ss_i - c.ss_i : d
        });
        for (e = 0; e < c; e++) delete a[e].ss_i
    }

    function Na(a) {
        for (var b = a.length, c = a[0]; b--;) a[b] < c && (c = a[b]);
        return c
    }

    function Ba(a) {
        for (var b =
            a.length, c = a[0]; b--;) a[b] > c && (c = a[b]);
        return c
    }

    function Oa(a, b) {
        for (var c in a) a[c] && a[c] !== b && a[c].destroy && a[c].destroy(), delete a[c]
    }

    function Pa(a) {
        cb || (cb = V(Ja));
        a && cb.appendChild(a);
        cb.innerHTML = ""
    }

    function oa(a, b) {
        var c = "Highcharts error #" + a + ": www.highcharts.com/errors/" + a;
        if (b) throw c;
        else G.console && console.log(c)
    }

    function aa(a) {
        return parseFloat(a.toPrecision(14))
    }

    function Qa(a, b) {
        sa = o(a, b.animation)
    }

    function Cb() {
        var a = L.global.useUTC,
            b = a ? "getUTC" : "get",
            c = a ? "setUTC" : "set";
        Ra = (a && L.global.timezoneOffset ||
            0) * 6E4;
        db = a ? Date.UTC : function (a, b, c, g, h, i) {
            return (new Date(a, b, o(c, 1), o(g, 0), o(h, 0), o(i, 0))).getTime()
        };
        pb = b + "Minutes";
        qb = b + "Hours";
        rb = b + "Day";
        Xa = b + "Date";
        eb = b + "Month";
        fb = b + "FullYear";
        Db = c + "Minutes";
        Eb = c + "Hours";
        sb = c + "Date";
        Fb = c + "Month";
        Gb = c + "FullYear"
    }

    function ta() {}

    function Sa(a, b, c, d) {
        this.axis = a;
        this.pos = b;
        this.type = c || "";
        this.isNew = !0;
        !c && !d && this.addLabel()
    }

    function ka() {
        this.init.apply(this, arguments)
    }

    function Ya() {
        this.init.apply(this, arguments)
    }

    function Hb(a, b, c, d, e, f) {
        var g = a.chart.inverted;
        this.axis = a;
        this.isNegative = c;
        this.options = b;
        this.x = d;
        this.total = null;
        this.points = {};
        this.stack = e;
        this.percent = f === "percent";
        this.alignOptions = {
            align: b.align || (g ? c ? "left" : "right" : "center"),
            verticalAlign: b.verticalAlign || (g ? "middle" : c ? "bottom" : "top"),
            y: o(b.y, g ? 4 : c ? 14 : -6),
            x: o(b.x, g ? c ? -6 : 6 : 0)
        };
        this.textAlign = b.textAlign || (g ? c ? "right" : "left" : "center")
    }
    var u, y = document,
        G = window,
        T = Math,
        v = T.round,
        S = T.floor,
        Ka = T.ceil,
        t = T.max,
        E = T.min,
        N = T.abs,
        W = T.cos,
        ba = T.sin,
        la = T.PI,
        Ca = la * 2 / 360,
        ua = navigator.userAgent,
        Ib = G.opera,
        Aa = /msie/i.test(ua) && !Ib,
        gb = y.documentMode === 8,
        hb = /AppleWebKit/.test(ua),
        Ta = /Firefox/.test(ua),
        Jb = /(Mobile|Android|Windows Phone)/.test(ua),
        Da = "http://www.w3.org/2000/svg",
        X = !! y.createElementNS && !! y.createElementNS(Da, "svg").createSVGRect,
        Ob = Ta && parseInt(ua.split("Firefox/")[1], 10) < 4,
        ca = !X && !Aa && !! y.createElement("canvas").getContext,
        Za, $a, Kb = {}, tb = 0,
        cb, L, bb, sa, ub, B, Ea = function () {}, Y = [],
        Ja = "div",
        O = "none",
        Pb = /^[0-9]+$/,
        Lb = "stroke-width",
        db, Ra, pb, qb, rb, Xa, eb, fb, Db, Eb, sb, Fb, Gb, J = {}, Q = G.Highcharts = G.Highcharts ?
            oa(16, !0) : {};
    bb = function (a, b, c) {
        if (!r(b) || isNaN(b)) return "Invalid date";
        var a = o(a, "%Y-%m-%d %H:%M:%S"),
            d = new Date(b - Ra),
            e, f = d[qb](),
            g = d[rb](),
            h = d[Xa](),
            i = d[eb](),
            j = d[fb](),
            k = L.lang,
            l = k.weekdays,
            d = s({
                a: l[g].substr(0, 3),
                A: l[g],
                d: Ha(h),
                e: h,
                b: k.shortMonths[i],
                B: k.months[i],
                m: Ha(i + 1),
                y: j.toString().substr(2, 2),
                Y: j,
                H: Ha(f),
                I: Ha(f % 12 || 12),
                l: f % 12 || 12,
                M: Ha(d[pb]()),
                p: f < 12 ? "AM" : "PM",
                P: f < 12 ? "am" : "pm",
                S: Ha(d.getSeconds()),
                L: Ha(v(b % 1E3), 3)
            }, Q.dateFormats);
        for (e in d)
            for (; a.indexOf("%" + e) !== -1;) a = a.replace("%" +
                e, typeof d[e] === "function" ? d[e](b) : d[e]);
        return c ? a.substr(0, 1).toUpperCase() + a.substr(1) : a
    };
    Bb.prototype = {
        wrapColor: function (a) {
            if (this.color >= a) this.color = 0
        },
        wrapSymbol: function (a) {
            if (this.symbol >= a) this.symbol = 0
        }
    };
    B = function () {
        for (var a = 0, b = arguments, c = b.length, d = {}; a < c; a++) d[b[a++]] = b[a];
        return d
    }("millisecond", 1, "second", 1E3, "minute", 6E4, "hour", 36E5, "day", 864E5, "week", 6048E5, "month", 26784E5, "year", 31556952E3);
    ub = {
        init: function (a, b, c) {
            var b = b || "",
                d = a.shift,
                e = b.indexOf("C") > -1,
                f = e ? 7 : 3,
                g, b = b.split(" "),
                c = [].concat(c),
                h, i, j = function (a) {
                    for (g = a.length; g--;) a[g] === "M" && a.splice(g + 1, 0, a[g + 1], a[g + 2], a[g + 1], a[g + 2])
                };
            e && (j(b), j(c));
            a.isArea && (h = b.splice(b.length - 6, 6), i = c.splice(c.length - 6, 6));
            if (d <= c.length / f && b.length === c.length)
                for (; d--;) c = [].concat(c).splice(0, f).concat(c);
            a.shift = 0;
            if (b.length)
                for (a = c.length; b.length < a;) d = [].concat(b).splice(b.length - f, f), e && (d[f - 6] = d[f - 2], d[f - 5] = d[f - 1]), b = b.concat(d);
            h && (b = b.concat(h), c = c.concat(i));
            return [b, c]
        },
        step: function (a, b, c, d) {
            var e = [],
                f = a.length;
            if (c === 1) e =
                d;
            else if (f === b.length && c < 1)
                for (; f--;) d = parseFloat(a[f]), e[f] = isNaN(d) ? a[f] : c * parseFloat(b[f] - d) + d;
            else e = b;
            return e
        }
    };
    (function (a) {
        G.HighchartsAdapter = G.HighchartsAdapter || a && {
            init: function (b) {
                var c = a.fx,
                    d = c.step,
                    e, f = a.Tween,
                    g = f && f.propHooks;
                e = a.cssHooks.opacity;
                a.extend(a.easing, {
                    easeOutQuad: function (a, b, c, d, e) {
                        return -d * (b /= e) * (b - 2) + c
                    }
                });
                a.each(["cur", "_default", "width", "height", "opacity"], function (a, b) {
                    var e = d,
                        k;
                    b === "cur" ? e = c.prototype : b === "_default" && f && (e = g[b], b = "set");
                    (k = e[b]) && (e[b] = function (c) {
                        var d,
                            c = a ? c : this;
                        if (c.prop !== "align") return d = c.elem, d.attr ? d.attr(c.prop, b === "cur" ? u : c.now) : k.apply(this, arguments)
                    })
                });
                Ma(e, "get", function (a, b, c) {
                    return b.attr ? b.opacity || 0 : a.call(this, b, c)
                });
                e = function (a) {
                    var c = a.elem,
                        d;
                    if (!a.started) d = b.init(c, c.d, c.toD), a.start = d[0], a.end = d[1], a.started = !0;
                    c.attr("d", b.step(a.start, a.end, a.pos, c.toD))
                };
                f ? g.d = {
                    set: e
                } : d.d = e;
                this.each = Array.prototype.forEach ? function (a, b) {
                    return Array.prototype.forEach.call(a, b)
                } : function (a, b) {
                    for (var c = 0, d = a.length; c < d; c++)
                        if (b.call(a[c],
                            a[c], c, a) === !1) return c
                };
                a.fn.highcharts = function () {
                    var a = "Chart",
                        b = arguments,
                        c, d;
                    ga(b[0]) && (a = b[0], b = Array.prototype.slice.call(b, 1));
                    c = b[0];
                    if (c !== u) c.chart = c.chart || {}, c.chart.renderTo = this[0], new Q[a](c, b[1]), d = this;
                    c === u && (d = Y[z(this[0], "data-highcharts-chart")]);
                    return d
                }
            },
            getScript: a.getScript,
            inArray: a.inArray,
            adapterRun: function (b, c) {
                return a(b)[c]()
            },
            grep: a.grep,
            map: function (a, c) {
                for (var d = [], e = 0, f = a.length; e < f; e++) d[e] = c.call(a[e], a[e], e, a);
                return d
            },
            offset: function (b) {
                return a(b).offset()
            },
            addEvent: function (b, c, d) {
                a(b).bind(c, d)
            },
            removeEvent: function (b, c, d) {
                var e = y.removeEventListener ? "removeEventListener" : "detachEvent";
                y[e] && b && !b[e] && (b[e] = function () {});
                a(b).unbind(c, d)
            },
            fireEvent: function (b, c, d, e) {
                var f = a.Event(c),
                    g = "detached" + c,
                    h;
                !Aa && d && (delete d.layerX, delete d.layerY);
                s(f, d);
                b[c] && (b[g] = b[c], b[c] = null);
                a.each(["preventDefault", "stopPropagation"], function (a, b) {
                    var c = f[b];
                    f[b] = function () {
                        try {
                            c.call(f)
                        } catch (a) {
                            b === "preventDefault" && (h = !0)
                        }
                    }
                });
                a(b).trigger(f);
                b[g] && (b[c] = b[g], b[g] =
                    null);
                e && !f.isDefaultPrevented() && !h && e(f)
            },
            washMouseEvent: function (a) {
                var c = a.originalEvent || a;
                if (c.pageX === u) c.pageX = a.pageX, c.pageY = a.pageY;
                return c
            },
            animate: function (b, c, d) {
                var e = a(b);
                if (!b.style) b.style = {};
                if (c.d) b.toD = c.d, c.d = 1;
                e.stop();
                c.opacity !== u && b.attr && (c.opacity += "px");
                e.animate(c, d)
            },
            stop: function (b) {
                a(b).stop()
            }
        }
    })(G.jQuery);
    var R = G.HighchartsAdapter,
        F = R || {};
    R && R.init.call(R, ub);
    var ib = F.adapterRun,
        Qb = F.getScript,
        va = F.inArray,
        p = F.each,
        vb = F.grep,
        Rb = F.offset,
        Ua = F.map,
        C = F.addEvent,
        U =
            F.removeEvent,
        I = F.fireEvent,
        Sb = F.washMouseEvent,
        jb = F.animate,
        ab = F.stop,
        F = {
            enabled: !0,
            x: 0,
            y: 15,
            style: {
                color: "#666",
                cursor: "default",
                fontSize: "11px"
            }
        };
    L = {
        colors: "#2f7ed8,#0d233a,#8bbc21,#910000,#1aadce,#492970,#f28f43,#77a1e5,#c42525,#a6c96a".split(","),
        symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
        lang: {
            loading: "Loading...",
            months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
            shortMonths: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
            weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
            decimalPoint: ".",
            numericSymbols: "k,M,G,T,P,E".split(","),
            resetZoom: "Reset zoom",
            resetZoomTitle: "Reset zoom level 1:1",
            thousandsSep: ","
        },
        global: {
            useUTC: !0,
            canvasToolsURL: "http://code.highcharts.com/3.0.10/modules/canvas-tools.js",
            VMLRadialGradientURL: "http://code.highcharts.com/3.0.10/gfx/vml-radial-gradient.png"
        },
        chart: {
            borderColor: "#4572A7",
            borderRadius: 5,
            defaultSeriesType: "line",
            ignoreHiddenSeries: !0,
            spacing: [10, 10, 15,
                10
            ],
            backgroundColor: "#FFFFFF",
            plotBorderColor: "#C0C0C0",
            resetZoomButton: {
                theme: {
                    zIndex: 20
                },
                position: {
                    align: "right",
                    x: -10,
                    y: 10
                }
            }
        },
        title: {
            text: "Chart title",
            align: "center",
            margin: 15,
            style: {
                color: "#274b6d",
                fontSize: "16px"
            }
        },
        subtitle: {
            text: "",
            align: "center",
            style: {
                color: "#4d759e"
            }
        },
        plotOptions: {
            line: {
                allowPointSelect: !1,
                showCheckbox: !1,
                animation: {
                    duration: 1E3
                },
                events: {},
                lineWidth: 2,
                marker: {
                    enabled: !0,
                    lineWidth: 0,
                    radius: 4,
                    lineColor: "#FFFFFF",
                    states: {
                        hover: {
                            enabled: !0
                        },
                        select: {
                            fillColor: "#FFFFFF",
                            lineColor: "#000000",
                            lineWidth: 2
                        }
                    }
                },
                point: {
                    events: {}
                },
                dataLabels: w(F, {
                    align: "center",
                    enabled: !1,
                    formatter: function () {
                        return this.y === null ? "" : Ga(this.y, -1)
                    },
                    verticalAlign: "bottom",
                    y: 0
                }),
                cropThreshold: 300,
                pointRange: 0,
                states: {
                    hover: {
                        marker: {}
                    },
                    select: {
                        marker: {}
                    }
                },
                stickyTracking: !0,
                turboThreshold: 1E3
            }
        },
        labels: {
            style: {
                position: "absolute",
                color: "#3E576F"
            }
        },
        legend: {
            enabled: !0,
            align: "center",
            layout: "horizontal",
            labelFormatter: function () {
                return this.name
            },
            borderWidth: 1,
            borderColor: "#909090",
            borderRadius: 5,
            navigation: {
                activeColor: "#274b6d",
                inactiveColor: "#CCC"
            },
            shadow: !1,
            itemStyle: {
                color: "#274b6d",
                fontSize: "12px"
            },
            itemHoverStyle: {
                color: "#000"
            },
            itemHiddenStyle: {
                color: "#CCC"
            },
            itemCheckboxStyle: {
                position: "absolute",
                width: "13px",
                height: "13px"
            },
            symbolPadding: 5,
            verticalAlign: "bottom",
            x: 0,
            y: 0,
            title: {
                style: {
                    fontWeight: "bold"
                }
            }
        },
        loading: {
            labelStyle: {
                fontWeight: "bold",
                position: "relative",
                top: "1em"
            },
            style: {
                position: "absolute",
                backgroundColor: "white",
                opacity: 0.5,
                textAlign: "center"
            }
        },
        tooltip: {
            enabled: !0,
            animation: X,
            backgroundColor: "rgba(255, 255, 255, .85)",
            borderWidth: 1,
            borderRadius: 3,
            dateTimeLabelFormats: {
                millisecond: "%A, %b %e, %H:%M:%S.%L",
                second: "%A, %b %e, %H:%M:%S",
                minute: "%A, %b %e, %H:%M",
                hour: "%A, %b %e, %H:%M",
                day: "%A, %b %e, %Y",
                week: "Week from %A, %b %e, %Y",
                month: "%B %Y",
                year: "%Y"
            },
            headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
            shadow: !0,
            snap: Jb ? 25 : 10,
            style: {
                color: "#333333",
                cursor: "default",
                fontSize: "12px",
                padding: "8px",
                whiteSpace: "nowrap"
            }
        },
        credits: {
            enabled: !0,
            text: "Highcharts.com",
            href: "http://www.highcharts.com",
            position: {
                align: "right",
                x: -10,
                verticalAlign: "bottom",
                y: -5
            },
            style: {
                cursor: "pointer",
                color: "#909090",
                fontSize: "9px"
            }
        }
    };
    var Z = L.plotOptions,
        R = Z.line;
    Cb();
    var Tb = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
        Ub = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
        Vb = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
        wa = function (a) {
            var b = [],
                c, d;
            (function (a) {
                a && a.stops ?
                    d = Ua(a.stops, function (a) {
                        return wa(a[1])
                    }) : (c = Tb.exec(a)) ? b = [x(c[1]), x(c[2]), x(c[3]), parseFloat(c[4], 10)] : (c = Ub.exec(a)) ? b = [x(c[1], 16), x(c[2], 16), x(c[3], 16), 1] : (c = Vb.exec(a)) && (b = [x(c[1]), x(c[2]), x(c[3]), 1])
            })(a);
            return {
                get: function (c) {
                    var f;
                    d ? (f = w(a), f.stops = [].concat(f.stops), p(d, function (a, b) {
                        f.stops[b] = [f.stops[b][0], a.get(c)]
                    })) : f = b && !isNaN(b[0]) ? c === "rgb" ? "rgb(" + b[0] + "," + b[1] + "," + b[2] + ")" : c === "a" ? b[3] : "rgba(" + b.join(",") + ")" : a;
                    return f
                },
                brighten: function (a) {
                    if (d) p(d, function (b) {
                        b.brighten(a)
                    });
                    else if (ya(a) && a !== 0) {
                        var c;
                        for (c = 0; c < 3; c++) b[c] += x(a * 255), b[c] < 0 && (b[c] = 0), b[c] > 255 && (b[c] = 255)
                    }
                    return this
                },
                rgba: b,
                setOpacity: function (a) {
                    b[3] = a;
                    return this
                }
            }
        };
    ta.prototype = {
        init: function (a, b) {
            this.element = b === "span" ? V(b) : y.createElementNS(Da, b);
            this.renderer = a;
            this.attrSetters = {}
        },
        opacity: 1,
        animate: function (a, b, c) {
            b = o(b, sa, !0);
            ab(this);
            if (b) {
                b = w(b, {});
                if (c) b.complete = c;
                jb(this, a, b)
            } else this.attr(a), c && c()
        },
        attr: function (a, b) {
            var c, d, e, f, g = this.element,
                h = g.nodeName.toLowerCase(),
                i = this.renderer,
                j, k = this.attrSetters,
                l = this.shadows,
                m, n, q = this;
            ga(a) && r(b) && (c = a, a = {}, a[c] = b);
            if (ga(a)) c = a, h === "circle" ? c = {
                x: "cx",
                y: "cy"
            }[c] || c : c === "strokeWidth" && (c = "stroke-width"), q = z(g, c) || this[c] || 0, c !== "d" && c !== "visibility" && c !== "fill" && (q = parseFloat(q));
            else {
                for (c in a)
                    if (j = !1, d = a[c], e = k[c] && k[c].call(this, d, c), e !== !1) {
                        e !== u && (d = e);
                        if (c === "d") d && d.join && (d = d.join(" ")), /(NaN| {2}|^$)/.test(d) && (d = "M 0 0");
                        else if (c === "x" && h === "text")
                            for (e = 0; e < g.childNodes.length; e++) f = g.childNodes[e], z(f, "x") === z(g, "x") && z(f,
                                "x", d);
                        else if (this.rotation && (c === "x" || c === "y")) n = !0;
                        else if (c === "fill") d = i.color(d, g, c);
                        else if (h === "circle" && (c === "x" || c === "y")) c = {
                            x: "cx",
                            y: "cy"
                        }[c] || c;
                        else if (h === "rect" && c === "r") z(g, {
                            rx: d,
                            ry: d
                        }), j = !0;
                        else if (c === "translateX" || c === "translateY" || c === "rotation" || c === "verticalAlign" || c === "scaleX" || c === "scaleY") j = n = !0;
                        else if (c === "stroke") d = i.color(d, g, c);
                        else if (c === "dashstyle")
                            if (c = "stroke-dasharray", d = d && d.toLowerCase(), d === "solid") d = O;
                            else {
                                if (d) {
                                    d = d.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot",
                                        "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                                    for (e = d.length; e--;) d[e] = x(d[e]) * o(a["stroke-width"], this["stroke-width"]);
                                    d = d.join(",")
                                }
                            } else if (c === "width") d = x(d);
                        else if (c === "align") c = "text-anchor", d = {
                            left: "start",
                            center: "middle",
                            right: "end"
                        }[d];
                        else if (c === "title") e = g.getElementsByTagName("title")[0], e || (e = y.createElementNS(Da, "title"), g.appendChild(e)), e.textContent = d;
                        c === "strokeWidth" &&
                            (c = "stroke-width");
                        if (c === "stroke-width" || c === "stroke") {
                            this[c] = d;
                            if (this.stroke && this["stroke-width"]) z(g, "stroke", this.stroke), z(g, "stroke-width", this["stroke-width"]), this.hasStroke = !0;
                            else if (c === "stroke-width" && d === 0 && this.hasStroke) g.removeAttribute("stroke"), this.hasStroke = !1;
                            j = !0
                        }
                        this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(c) && (m || (this.symbolAttr(a), m = !0), j = !0);
                        if (l && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(c))
                            for (e = l.length; e--;) z(l[e],
                                c, c === "height" ? t(d - (l[e].cutHeight || 0), 0) : d);
                        if ((c === "width" || c === "height") && h === "rect" && d < 0) d = 0;
                        this[c] = d;
                        if (c === "text") {
                            if (d !== this.textStr) delete this.bBox, this.textStr = d, this.added && i.buildText(this)
                        } else j || d !== void 0 && g.setAttribute(c, d)
                    }
                n && this.updateTransform()
            }
            return q
        },
        addClass: function (a) {
            var b = this.element,
                c = z(b, "class") || "";
            c.indexOf(a) === -1 && z(b, "class", c + " " + a);
            return this
        },
        symbolAttr: function (a) {
            var b = this;
            p("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","), function (c) {
                b[c] =
                    o(a[c], b[c])
            });
            b.attr({
                d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b)
            })
        },
        clip: function (a) {
            return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : O)
        },
        crisp: function (a) {
            var b, c = {}, d, e = a.strokeWidth || this.strokeWidth || this.attr && this.attr("stroke-width") || 0;
            d = v(e) % 2 / 2;
            a.x = S(a.x || this.x || 0) + d;
            a.y = S(a.y || this.y || 0) + d;
            a.width = S((a.width || this.width || 0) - 2 * d);
            a.height = S((a.height || this.height || 0) - 2 * d);
            a.strokeWidth = e;
            for (b in a) this[b] !== a[b] && (this[b] = c[b] = a[b]);
            return c
        },
        css: function (a) {
            var b =
                this.styles,
                c = {}, d = this.element,
                e, f, g = "";
            e = !b;
            if (a && a.color) a.fill = a.color;
            if (b)
                for (f in a) a[f] !== b[f] && (c[f] = a[f], e = !0);
            if (e) {
                e = this.textWidth = a && a.width && d.nodeName.toLowerCase() === "text" && x(a.width);
                b && (a = s(b, c));
                this.styles = a;
                e && (ca || !X && this.renderer.forExport) && delete a.width;
                if (Aa && !X) D(this.element, a);
                else {
                    b = function (a, b) {
                        return "-" + b.toLowerCase()
                    };
                    for (f in a) g += f.replace(/([A-Z])/g, b) + ":" + a[f] + ";";
                    z(d, "style", g)
                }
                e && this.added && this.renderer.buildText(this)
            }
            return this
        },
        on: function (a, b) {
            var c =
                this,
                d = c.element;
            $a && a === "click" ? (d.ontouchstart = function (a) {
                c.touchEventFired = Date.now();
                a.preventDefault();
                b.call(d, a)
            }, d.onclick = function (a) {
                (ua.indexOf("Android") === -1 || Date.now() - (c.touchEventFired || 0) > 1100) && b.call(d, a)
            }) : d["on" + a] = b;
            return this
        },
        setRadialReference: function (a) {
            this.element.radialReference = a;
            return this
        },
        translate: function (a, b) {
            return this.attr({
                translateX: a,
                translateY: b
            })
        },
        invert: function () {
            this.inverted = !0;
            this.updateTransform();
            return this
        },
        updateTransform: function () {
            var a =
                this.translateX || 0,
                b = this.translateY || 0,
                c = this.scaleX,
                d = this.scaleY,
                e = this.inverted,
                f = this.rotation;
            e && (a += this.attr("width"), b += this.attr("height"));
            a = ["translate(" + a + "," + b + ")"];
            e ? a.push("rotate(90) scale(-1,1)") : f && a.push("rotate(" + f + " " + (this.x || 0) + " " + (this.y || 0) + ")");
            (r(c) || r(d)) && a.push("scale(" + o(c, 1) + " " + o(d, 1) + ")");
            a.length && z(this.element, "transform", a.join(" "))
        },
        toFront: function () {
            var a = this.element;
            a.parentNode.appendChild(a);
            return this
        },
        align: function (a, b, c) {
            var d, e, f, g, h = {};
            e = this.renderer;
            f = e.alignedObjects;
            if (a) {
                if (this.alignOptions = a, this.alignByTranslate = b, !c || ga(c)) this.alignTo = d = c || "renderer", ia(f, this), f.push(this), c = null
            } else a = this.alignOptions, b = this.alignByTranslate, d = this.alignTo;
            c = o(c, e[d], e);
            d = a.align;
            e = a.verticalAlign;
            f = (c.x || 0) + (a.x || 0);
            g = (c.y || 0) + (a.y || 0);
            if (d === "right" || d === "center") f += (c.width - (a.width || 0)) / {
                right: 1,
                center: 2
            }[d];
            h[b ? "translateX" : "x"] = v(f);
            if (e === "bottom" || e === "middle") g += (c.height - (a.height || 0)) / ({
                bottom: 1,
                middle: 2
            }[e] || 1);
            h[b ? "translateY" : "y"] = v(g);
            this[this.placed ? "animate" : "attr"](h);
            this.placed = !0;
            this.alignAttr = h;
            return this
        },
        getBBox: function () {
            var a = this.bBox,
                b = this.renderer,
                c, d, e = this.rotation;
            c = this.element;
            var f = this.styles,
                g = e * Ca;
            d = this.textStr;
            var h;
            if (d === "" || Pb.test(d)) h = d.toString().length + (f ? "|" + f.fontSize + "|" + f.fontFamily : ""), a = b.cache[h];
            if (!a) {
                if (c.namespaceURI === Da || b.forExport) {
                    try {
                        a = c.getBBox ? s({}, c.getBBox()) : {
                            width: c.offsetWidth,
                            height: c.offsetHeight
                        }
                    } catch (i) {}
                    if (!a || a.width < 0) a = {
                        width: 0,
                        height: 0
                    }
                } else a = this.htmlGetBBox();
                if (b.isSVG) {
                    c = a.width;
                    d = a.height;
                    if (Aa && f && f.fontSize === "11px" && d.toPrecision(3) === "16.9") a.height = d = 14;
                    if (e) a.width = N(d * ba(g)) + N(c * W(g)), a.height = N(d * W(g)) + N(c * ba(g))
                }
                this.bBox = a;
                h && (b.cache[h] = a)
            }
            return a
        },
        show: function (a) {
            return this.attr({
                visibility: a ? "inherit" : "visible"
            })
        },
        hide: function () {
            return this.attr({
                visibility: "hidden"
            })
        },
        fadeOut: function (a) {
            var b = this;
            b.animate({
                opacity: 0
            }, {
                duration: a || 150,
                complete: function () {
                    b.hide()
                }
            })
        },
        add: function (a) {
            var b = this.renderer,
                c = a || b,
                d = c.element || b.box,
                e = this.element,
                f = this.zIndex,
                g, h;
            if (a) this.parentGroup = a;
            this.parentInverted = a && a.inverted;
            this.textStr !== void 0 && b.buildText(this);
            if (f) c.handleZ = !0, f = x(f);
            if (c.handleZ) {
                a = d.childNodes;
                for (g = 0; g < a.length; g++)
                    if (b = a[g], c = z(b, "zIndex"), b !== e && (x(c) > f || !r(f) && r(c))) {
                        d.insertBefore(e, b);
                        h = !0;
                        break
                    }
            }
            h || d.appendChild(e);
            this.added = !0;
            if (this.onAdd) this.onAdd();
            return this
        },
        safeRemoveChild: function (a) {
            var b = a.parentNode;
            b && b.removeChild(a)
        },
        destroy: function () {
            var a = this,
                b = a.element || {}, c = a.shadows,
                d = a.renderer.isSVG &&
                    b.nodeName === "SPAN" && a.parentGroup,
                e, f;
            b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = b.point = null;
            ab(a);
            if (a.clipPath) a.clipPath = a.clipPath.destroy();
            if (a.stops) {
                for (f = 0; f < a.stops.length; f++) a.stops[f] = a.stops[f].destroy();
                a.stops = null
            }
            a.safeRemoveChild(b);
            for (c && p(c, function (b) {
                a.safeRemoveChild(b)
            }); d && d.div.childNodes.length === 0;) b = d.parentGroup, a.safeRemoveChild(d.div), delete d.div, d = b;
            a.alignTo && ia(a.renderer.alignedObjects, a);
            for (e in a) delete a[e];
            return null
        },
        shadow: function (a, b, c) {
            var d = [],
                e, f, g = this.element,
                h, i, j, k;
            if (a) {
                i = o(a.width, 3);
                j = (a.opacity || 0.15) / i;
                k = this.parentInverted ? "(-1,-1)" : "(" + o(a.offsetX, 1) + ", " + o(a.offsetY, 1) + ")";
                for (e = 1; e <= i; e++) {
                    f = g.cloneNode(0);
                    h = i * 2 + 1 - 2 * e;
                    z(f, {
                        isShadow: "true",
                        stroke: a.color || "black",
                        "stroke-opacity": j * e,
                        "stroke-width": h,
                        transform: "translate" + k,
                        fill: O
                    });
                    if (c) z(f, "height", t(z(f, "height") - h, 0)), f.cutHeight = h;
                    b ? b.element.appendChild(f) : g.parentNode.insertBefore(f, g);
                    d.push(f)
                }
                this.shadows = d
            }
            return this
        }
    };
    var pa = function () {
        this.init.apply(this,
            arguments)
    };
    pa.prototype = {
        Element: ta,
        init: function (a, b, c, d, e) {
            var f = location,
                g, d = this.createElement("svg").attr({
                    version: "1.1"
                }).css(this.getStyle(d));
            g = d.element;
            a.appendChild(g);
            a.innerHTML.indexOf("xmlns") === -1 && z(g, "xmlns", Da);
            this.isSVG = !0;
            this.box = g;
            this.boxWrapper = d;
            this.alignedObjects = [];
            this.url = (Ta || hb) && y.getElementsByTagName("base").length ? f.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
            this.createElement("desc").add().element.appendChild(y.createTextNode("Created with Highcharts 3.0.10"));
            this.defs = this.createElement("defs").add();
            this.forExport = e;
            this.gradients = {};
            this.cache = {};
            this.setSize(b, c, !1);
            var h;
            if (Ta && a.getBoundingClientRect) this.subPixelFix = b = function () {
                D(a, {
                    left: 0,
                    top: 0
                });
                h = a.getBoundingClientRect();
                D(a, {
                    left: Ka(h.left) - h.left + "px",
                    top: Ka(h.top) - h.top + "px"
                })
            }, b(), C(G, "resize", b)
        },
        getStyle: function (a) {
            return this.style = s({
                fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
                fontSize: "12px"
            }, a)
        },
        isHidden: function () {
            return !this.boxWrapper.getBBox().width
        },
        destroy: function () {
            var a = this.defs;
            this.box = null;
            this.boxWrapper = this.boxWrapper.destroy();
            Oa(this.gradients || {});
            this.gradients = null;
            if (a) this.defs = a.destroy();
            this.subPixelFix && U(G, "resize", this.subPixelFix);
            return this.alignedObjects = null
        },
        createElement: function (a) {
            var b = new this.Element;
            b.init(this, a);
            return b
        },
        draw: function () {},
        buildText: function (a) {
            for (var b = a.element, c = this, d = c.forExport, e = o(a.textStr, "").toString().replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g,
                    '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g), f = b.childNodes, g = /<.*style="([^"]+)".*>/, h = /<.*href="(http[^"]+)".*>/, i = z(b, "x"), j = a.styles, k = a.textWidth, l = j && j.lineHeight, m = f.length, n = function (a) {
                    return l ? x(l) : c.fontMetrics(/(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : j.fontSize || 11).h
                }; m--;) b.removeChild(f[m]);
            k && !a.added && this.box.appendChild(b);
            e[e.length - 1] === "" && e.pop();
            p(e, function (e, f) {
                var l, m = 0,
                    e = e.replace(/<span/g,
                        "|||<span").replace(/<\/span>/g, "</span>|||");
                l = e.split("|||");
                p(l, function (e) {
                    if (e !== "" || l.length === 1) {
                        var q = {}, o = y.createElementNS(Da, "tspan"),
                            p;
                        g.test(e) && (p = e.match(g)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), z(o, "style", p));
                        h.test(e) && !d && (z(o, "onclick", 'location.href="' + e.match(h)[1] + '"'), D(o, {
                            cursor: "pointer"
                        }));
                        e = (e.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
                        if (e !== " " && (o.appendChild(y.createTextNode(e)), m ? q.dx = 0 : q.x = i, z(o, q), !m && f && (!X && d && D(o, {
                                display: "block"
                            }),
                            z(o, "dy", n(o), hb && o.offsetHeight)), b.appendChild(o), m++, k))
                            for (var e = e.replace(/([^\^])-/g, "$1- ").split(" "), q = e.length > 1 && j.whiteSpace !== "nowrap", r, t, s = a._clipHeight, A = [], v = n(), u = 1; q && (e.length || A.length);) delete a.bBox, r = a.getBBox(), t = r.width, !X && c.forExport && (t = c.measureSpanWidth(o.firstChild.data, a.styles)), r = t > k, !r || e.length === 1 ? (e = A, A = [], e.length && (u++, s && u * v > s ? (e = ["..."], a.attr("title", a.textStr)) : (o = y.createElementNS(Da, "tspan"), z(o, {
                                dy: v,
                                x: i
                            }), p && z(o, "style", p), b.appendChild(o), t > k && (k =
                                t)))) : (o.removeChild(o.firstChild), A.unshift(e.pop())), e.length && o.appendChild(y.createTextNode(e.join(" ").replace(/- /g, "-")))
                    }
                })
            })
        },
        button: function (a, b, c, d, e, f, g, h, i) {
            var j = this.label(a, b, c, i, null, null, null, null, "button"),
                k = 0,
                l, m, n, q, o, p, a = {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                }, e = w({
                    "stroke-width": 1,
                    stroke: "#CCCCCC",
                    fill: {
                        linearGradient: a,
                        stops: [
                            [0, "#FEFEFE"],
                            [1, "#F6F6F6"]
                        ]
                    },
                    r: 2,
                    padding: 5,
                    style: {
                        color: "black"
                    }
                }, e);
            n = e.style;
            delete e.style;
            f = w(e, {
                    stroke: "#68A",
                    fill: {
                        linearGradient: a,
                        stops: [
                            [0, "#FFF"],
                            [1, "#ACF"]
                        ]
                    }
                },
                f);
            q = f.style;
            delete f.style;
            g = w(e, {
                stroke: "#68A",
                fill: {
                    linearGradient: a,
                    stops: [
                        [0, "#9BD"],
                        [1, "#CDF"]
                    ]
                }
            }, g);
            o = g.style;
            delete g.style;
            h = w(e, {
                style: {
                    color: "#CCC"
                }
            }, h);
            p = h.style;
            delete h.style;
            C(j.element, Aa ? "mouseover" : "mouseenter", function () {
                k !== 3 && j.attr(f).css(q)
            });
            C(j.element, Aa ? "mouseout" : "mouseleave", function () {
                k !== 3 && (l = [e, f, g][k], m = [n, q, o][k], j.attr(l).css(m))
            });
            j.setState = function (a) {
                (j.state = k = a) ? a === 2 ? j.attr(g).css(o) : a === 3 && j.attr(h).css(p) : j.attr(e).css(n)
            };
            return j.on("click", function () {
                k !==
                    3 && d.call(j)
            }).attr(e).css(s({
                cursor: "default"
            }, n))
        },
        crispLine: function (a, b) {
            a[1] === a[4] && (a[1] = a[4] = v(a[1]) - b % 2 / 2);
            a[2] === a[5] && (a[2] = a[5] = v(a[2]) + b % 2 / 2);
            return a
        },
        path: function (a) {
            var b = {
                fill: O
            };
            La(a) ? b.d = a : $(a) && s(b, a);
            return this.createElement("path").attr(b)
        },
        circle: function (a, b, c) {
            a = $(a) ? a : {
                x: a,
                y: b,
                r: c
            };
            return this.createElement("circle").attr(a)
        },
        arc: function (a, b, c, d, e, f) {
            if ($(a)) b = a.y, c = a.r, d = a.innerR, e = a.start, f = a.end, a = a.x;
            a = this.symbol("arc", a || 0, b || 0, c || 0, c || 0, {
                innerR: d || 0,
                start: e || 0,
                end: f || 0
            });
            a.r = c;
            return a
        },
        rect: function (a, b, c, d, e, f) {
            var e = $(a) ? a.r : e,
                g = this.createElement("rect"),
                a = $(a) ? a : a === u ? {} : {
                    x: a,
                    y: b,
                    width: t(c, 0),
                    height: t(d, 0)
                };
            if (f !== u) a.strokeWidth = f, a = g.crisp(a);
            if (e) a.r = e;
            return g.attr(a)
        },
        setSize: function (a, b, c) {
            var d = this.alignedObjects,
                e = d.length;
            this.width = a;
            this.height = b;
            for (this.boxWrapper[o(c, !0) ? "animate" : "attr"]({
                width: a,
                height: b
            }); e--;) d[e].align()
        },
        g: function (a) {
            var b = this.createElement("g");
            return r(a) ? b.attr({
                "class": "highcharts-" + a
            }) : b
        },
        image: function (a,
            b, c, d, e) {
            var f = {
                preserveAspectRatio: O
            };
            arguments.length > 1 && s(f, {
                x: b,
                y: c,
                width: d,
                height: e
            });
            f = this.createElement("image").attr(f);
            f.element.setAttributeNS ? f.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", a) : f.element.setAttribute("hc-svg-href", a);
            return f
        },
        symbol: function (a, b, c, d, e, f) {
            var g, h = this.symbols[a],
                h = h && h(v(b), v(c), d, e, f),
                i = /^url\((.*?)\)$/,
                j, k;
            if (h) g = this.path(h), s(g, {
                symbolName: a,
                x: b,
                y: c,
                width: d,
                height: e
            }), f && s(g, f);
            else if (i.test(a)) k = function (a, b) {
                a.element && (a.attr({
                    width: b[0],
                    height: b[1]
                }), a.alignByTranslate || a.translate(v((d - b[0]) / 2), v((e - b[1]) / 2)))
            }, j = a.match(i)[1], a = Kb[j], g = this.image(j).attr({
                x: b,
                y: c
            }), g.isImg = !0, a ? k(g, a) : (g.attr({
                width: 0,
                height: 0
            }), V("img", {
                onload: function () {
                    k(g, Kb[j] = [this.width, this.height])
                },
                src: j
            }));
            return g
        },
        symbols: {
            circle: function (a, b, c, d) {
                var e = 0.166 * c;
                return ["M", a + c / 2, b, "C", a + c + e, b, a + c + e, b + d, a + c / 2, b + d, "C", a - e, b + d, a - e, b, a + c / 2, b, "Z"]
            },
            square: function (a, b, c, d) {
                return ["M", a, b, "L", a + c, b, a + c, b + d, a, b + d, "Z"]
            },
            triangle: function (a, b, c, d) {
                return ["M",
                    a + c / 2, b, "L", a + c, b + d, a, b + d, "Z"]
            },
            "triangle-down": function (a, b, c, d) {
                return ["M", a, b, "L", a + c, b, a + c / 2, b + d, "Z"]
            },
            diamond: function (a, b, c, d) {
                return ["M", a + c / 2, b, "L", a + c, b + d / 2, a + c / 2, b + d, a, b + d / 2, "Z"]
            },
            arc: function (a, b, c, d, e) {
                var f = e.start,
                    c = e.r || c || d,
                    g = e.end - 0.001,
                    d = e.innerR,
                    h = e.open,
                    i = W(f),
                    j = ba(f),
                    k = W(g),
                    g = ba(g),
                    e = e.end - f < la ? 0 : 1;
                return ["M", a + c * i, b + c * j, "A", c, c, 0, e, 1, a + c * k, b + c * g, h ? "M" : "L", a + d * k, b + d * g, "A", d, d, 0, e, 0, a + d * i, b + d * j, h ? "" : "Z"]
            }
        },
        clipRect: function (a, b, c, d) {
            var e = "highcharts-" + tb++,
                f = this.createElement("clipPath").attr({
                    id: e
                }).add(this.defs),
                a = this.rect(a, b, c, d, 0).add(f);
            a.id = e;
            a.clipPath = f;
            return a
        },
        color: function (a, b, c) {
            var d = this,
                e, f = /^rgba/,
                g, h, i, j, k, l, m, n = [];
            a && a.linearGradient ? g = "linearGradient" : a && a.radialGradient && (g = "radialGradient");
            if (g) {
                c = a[g];
                h = d.gradients;
                j = a.stops;
                b = b.radialReference;
                La(c) && (a[g] = c = {
                    x1: c[0],
                    y1: c[1],
                    x2: c[2],
                    y2: c[3],
                    gradientUnits: "userSpaceOnUse"
                });
                g === "radialGradient" && b && !r(c.gradientUnits) && (c = w(c, {
                    cx: b[0] - b[2] / 2 + c.cx * b[2],
                    cy: b[1] - b[2] / 2 + c.cy * b[2],
                    r: c.r * b[2],
                    gradientUnits: "userSpaceOnUse"
                }));
                for (m in c) m !==
                    "id" && n.push(m, c[m]);
                for (m in j) n.push(j[m]);
                n = n.join(",");
                h[n] ? a = h[n].id : (c.id = a = "highcharts-" + tb++, h[n] = i = d.createElement(g).attr(c).add(d.defs), i.stops = [], p(j, function (a) {
                    f.test(a[1]) ? (e = wa(a[1]), k = e.get("rgb"), l = e.get("a")) : (k = a[1], l = 1);
                    a = d.createElement("stop").attr({
                        offset: a[0],
                        "stop-color": k,
                        "stop-opacity": l
                    }).add(i);
                    i.stops.push(a)
                }));
                return "url(" + d.url + "#" + a + ")"
            } else return f.test(a) ? (e = wa(a), z(b, c + "-opacity", e.get("a")), e.get("rgb")) : (b.removeAttribute(c + "-opacity"), a)
        },
        text: function (a,
            b, c, d) {
            var e = ca || !X && this.forExport;
            if (d && !this.forExport) return this.html(a, b, c);
            b = v(o(b, 0));
            c = v(o(c, 0));
            a = this.createElement("text").attr({
                x: b,
                y: c,
                text: a
            });
            e && a.css({
                position: "absolute"
            });
            a.x = b;
            a.y = c;
            return a
        },
        fontMetrics: function (a) {
            var a = a || this.style.fontSize,
                a = /px/.test(a) ? x(a) : /em/.test(a) ? parseFloat(a) * 12 : 12,
                a = a < 24 ? a + 4 : v(a * 1.2),
                b = v(a * 0.8);
            return {
                h: a,
                b: b
            }
        },
        label: function (a, b, c, d, e, f, g, h, i) {
            function j() {
                var a, b;
                a = q.element.style;
                K = (Va === void 0 || wb === void 0 || n.styles.textAlign) && q.textStr && q.getBBox();
                n.width = (Va || K.width || 0) + 2 * P + kb;
                n.height = (wb || K.height || 0) + 2 * P;
                xa = P + m.fontMetrics(a && a.fontSize).b;
                if (y) {
                    if (!o) a = v(-t * P), b = h ? -xa : 0, n.box = o = d ? m.symbol(d, a, b, n.width, n.height, A) : m.rect(a, b, n.width, n.height, 0, A[Lb]), o.attr("fill", O).add(n);
                    o.isImg || o.attr(w({
                        width: n.width,
                        height: n.height
                    }, A));
                    A = null
                }
            }

            function k() {
                var a = n.styles,
                    a = a && a.textAlign,
                    b = kb + P * (1 - t),
                    c;
                c = h ? 0 : xa;
                if (r(Va) && K && (a === "center" || a === "right")) b += {
                    center: 0.5,
                    right: 1
                }[a] * (Va - K.width);
                (b !== q.x || c !== q.y) && q.attr({
                    x: b,
                    y: c
                });
                q.x = b;
                q.y = c
            }

            function l(a,
                b) {
                o ? o.attr(a, b) : A[a] = b
            }
            var m = this,
                n = m.g(i),
                q = m.text("", 0, 0, g).attr({
                    zIndex: 1
                }),
                o, K, t = 0,
                P = 3,
                kb = 0,
                Va, wb, xb, yb, H = 0,
                A = {}, xa, g = n.attrSetters,
                y;
            n.onAdd = function () {
                q.add(n);
                n.attr({
                    text: a,
                    x: b,
                    y: c
                });
                o && r(e) && n.attr({
                    anchorX: e,
                    anchorY: f
                })
            };
            g.width = function (a) {
                Va = a;
                return !1
            };
            g.height = function (a) {
                wb = a;
                return !1
            };
            g.padding = function (a) {
                r(a) && a !== P && (P = a, k());
                return !1
            };
            g.paddingLeft = function (a) {
                r(a) && a !== kb && (kb = a, k());
                return !1
            };
            g.align = function (a) {
                t = {
                    left: 0,
                    center: 0.5,
                    right: 1
                }[a];
                return !1
            };
            g.text = function (a, b) {
                q.attr(b,
                    a);
                j();
                k();
                return !1
            };
            g[Lb] = function (a, b) {
                a && (y = !0);
                H = a % 2 / 2;
                l(b, a);
                return !1
            };
            g.stroke = g.fill = g.r = function (a, b) {
                b === "fill" && a && (y = !0);
                l(b, a);
                return !1
            };
            g.anchorX = function (a, b) {
                e = a;
                l(b, a + H - xb);
                return !1
            };
            g.anchorY = function (a, b) {
                f = a;
                l(b, a - yb);
                return !1
            };
            g.x = function (a) {
                n.x = a;
                a -= t * ((Va || K.width) + P);
                xb = v(a);
                n.attr("translateX", xb);
                return !1
            };
            g.y = function (a) {
                yb = n.y = v(a);
                n.attr("translateY", yb);
                return !1
            };
            var x = n.css;
            return s(n, {
                css: function (a) {
                    if (a) {
                        var b = {}, a = w(a);
                        p("fontSize,fontWeight,fontFamily,color,lineHeight,width,textDecoration,textShadow".split(","),
                            function (c) {
                                a[c] !== u && (b[c] = a[c], delete a[c])
                            });
                        q.css(b)
                    }
                    return x.call(n, a)
                },
                getBBox: function () {
                    return {
                        width: K.width + 2 * P,
                        height: K.height + 2 * P,
                        x: K.x - P,
                        y: K.y - P
                    }
                },
                shadow: function (a) {
                    o && o.shadow(a);
                    return n
                },
                destroy: function () {
                    U(n.element, "mouseenter");
                    U(n.element, "mouseleave");
                    q && (q = q.destroy());
                    o && (o = o.destroy());
                    ta.prototype.destroy.call(n);
                    n = m = j = k = l = null
                }
            })
        }
    };
    Za = pa;
    s(ta.prototype, {
        htmlCss: function (a) {
            var b = this.element;
            if (b = a && b.tagName === "SPAN" && a.width) delete a.width, this.textWidth = b, this.updateTransform();
            this.styles = s(this.styles, a);
            D(this.element, a);
            return this
        },
        htmlGetBBox: function () {
            var a = this.element,
                b = this.bBox;
            if (!b) {
                if (a.nodeName === "text") a.style.position = "absolute";
                b = this.bBox = {
                    x: a.offsetLeft,
                    y: a.offsetTop,
                    width: a.offsetWidth,
                    height: a.offsetHeight
                }
            }
            return b
        },
        htmlUpdateTransform: function () {
            if (this.added) {
                var a = this.renderer,
                    b = this.element,
                    c = this.translateX || 0,
                    d = this.translateY || 0,
                    e = this.x || 0,
                    f = this.y || 0,
                    g = this.textAlign || "left",
                    h = {
                        left: 0,
                        center: 0.5,
                        right: 1
                    }[g],
                    i = this.shadows;
                D(b, {
                    marginLeft: c,
                    marginTop: d
                });
                i && p(i, function (a) {
                    D(a, {
                        marginLeft: c + 1,
                        marginTop: d + 1
                    })
                });
                this.inverted && p(b.childNodes, function (c) {
                    a.invertChild(c, b)
                });
                if (b.tagName === "SPAN") {
                    var j = this.rotation,
                        k, l = x(this.textWidth),
                        m = [j, g, b.innerHTML, this.textWidth].join(",");
                    if (m !== this.cTT) {
                        k = a.fontMetrics(b.style.fontSize).b;
                        r(j) && this.setSpanRotation(j, h, k);
                        i = o(this.elemWidth, b.offsetWidth);
                        if (i > l && /[ \-]/.test(b.textContent || b.innerText)) D(b, {
                            width: l + "px",
                            display: "block",
                            whiteSpace: "normal"
                        }), i = l;
                        this.getSpanCorrection(i, k,
                            h, j, g)
                    }
                    D(b, {
                        left: e + (this.xCorr || 0) + "px",
                        top: f + (this.yCorr || 0) + "px"
                    });
                    if (hb) k = b.offsetHeight;
                    this.cTT = m
                }
            } else this.alignOnAdd = !0
        },
        setSpanRotation: function (a, b, c) {
            var d = {}, e = Aa ? "-ms-transform" : hb ? "-webkit-transform" : Ta ? "MozTransform" : Ib ? "-o-transform" : "";
            d[e] = d.transform = "rotate(" + a + "deg)";
            d[e + (Ta ? "Origin" : "-origin")] = d.transformOrigin = b * 100 + "% " + c + "px";
            D(this.element, d)
        },
        getSpanCorrection: function (a, b, c) {
            this.xCorr = -a * c;
            this.yCorr = -b
        }
    });
    s(pa.prototype, {
        html: function (a, b, c) {
            var d = this.createElement("span"),
                e = d.attrSetters,
                f = d.element,
                g = d.renderer;
            e.text = function (a) {
                a !== f.innerHTML && delete this.bBox;
                f.innerHTML = this.textStr = a;
                return !1
            };
            e.x = e.y = e.align = e.rotation = function (a, b) {
                b === "align" && (b = "textAlign");
                d[b] = a;
                d.htmlUpdateTransform();
                return !1
            };
            d.attr({
                text: a,
                x: v(b),
                y: v(c)
            }).css({
                position: "absolute",
                whiteSpace: "nowrap",
                fontFamily: this.style.fontFamily,
                fontSize: this.style.fontSize
            });
            d.css = d.htmlCss;
            if (g.isSVG) d.add = function (a) {
                var b, c = g.box.parentNode,
                    e = [];
                if (this.parentGroup = a) {
                    if (b = a.div, !b) {
                        for (; a;) e.push(a),
                        a = a.parentGroup;
                        p(e.reverse(), function (a) {
                            var d;
                            b = a.div = a.div || V(Ja, {
                                className: z(a.element, "class")
                            }, {
                                position: "absolute",
                                left: (a.translateX || 0) + "px",
                                top: (a.translateY || 0) + "px"
                            }, b || c);
                            d = b.style;
                            s(a.attrSetters, {
                                translateX: function (a) {
                                    d.left = a + "px"
                                },
                                translateY: function (a) {
                                    d.top = a + "px"
                                },
                                visibility: function (a, b) {
                                    d[b] = a
                                }
                            })
                        })
                    }
                } else b = c;
                b.appendChild(f);
                d.added = !0;
                d.alignOnAdd && d.htmlUpdateTransform();
                return d
            };
            return d
        }
    });
    var da;
    if (!X && !ca) {
        Q.VMLElement = da = {
            init: function (a, b) {
                var c = ["<", b, ' filled="f" stroked="f"'],
                    d = ["position: ", "absolute", ";"],
                    e = b === Ja;
                (b === "shape" || e) && d.push("left:0;top:0;width:1px;height:1px;");
                d.push("visibility: ", e ? "hidden" : "visible");
                c.push(' style="', d.join(""), '"/>');
                if (b) c = e || b === "span" || b === "img" ? c.join("") : a.prepVML(c), this.element = V(c);
                this.renderer = a;
                this.attrSetters = {}
            },
            add: function (a) {
                var b = this.renderer,
                    c = this.element,
                    d = b.box,
                    d = a ? a.element || a : d;
                a && a.inverted && b.invertChild(c, d);
                d.appendChild(c);
                this.added = !0;
                this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();
                if (this.onAdd) this.onAdd();
                return this
            },
            updateTransform: ta.prototype.htmlUpdateTransform,
            setSpanRotation: function () {
                var a = this.rotation,
                    b = W(a * Ca),
                    c = ba(a * Ca);
                D(this.element, {
                    filter: a ? ["progid:DXImageTransform.Microsoft.Matrix(M11=", b, ", M12=", -c, ", M21=", c, ", M22=", b, ", sizingMethod='auto expand')"].join("") : O
                })
            },
            getSpanCorrection: function (a, b, c, d, e) {
                var f = d ? W(d * Ca) : 1,
                    g = d ? ba(d * Ca) : 0,
                    h = o(this.elemHeight, this.element.offsetHeight),
                    i;
                this.xCorr = f < 0 && -a;
                this.yCorr = g < 0 && -h;
                i = f * g < 0;
                this.xCorr += g * b * (i ? 1 -
                    c : c);
                this.yCorr -= f * b * (d ? i ? c : 1 - c : 1);
                e && e !== "left" && (this.xCorr -= a * c * (f < 0 ? -1 : 1), d && (this.yCorr -= h * c * (g < 0 ? -1 : 1)), D(this.element, {
                    textAlign: e
                }))
            },
            pathToVML: function (a) {
                for (var b = a.length, c = []; b--;)
                    if (ya(a[b])) c[b] = v(a[b] * 10) - 5;
                    else if (a[b] === "Z") c[b] = "x";
                else if (c[b] = a[b], a.isArc && (a[b] === "wa" || a[b] === "at")) c[b + 5] === c[b + 7] && (c[b + 7] += a[b + 7] > a[b + 5] ? 1 : -1), c[b + 6] === c[b + 8] && (c[b + 8] += a[b + 8] > a[b + 6] ? 1 : -1);
                return c.join(" ") || "x"
            },
            attr: function (a, b) {
                var c, d, e, f = this.element || {}, g = f.style,
                    h = f.nodeName,
                    i = this.renderer,
                    j = this.symbolName,
                    k, l = this.shadows,
                    m, n = this.attrSetters,
                    q = this;
                ga(a) && r(b) && (c = a, a = {}, a[c] = b);
                if (ga(a)) c = a, q = c === "strokeWidth" || c === "stroke-width" ? this.strokeweight : this[c];
                else
                    for (c in a)
                        if (d = a[c], m = !1, e = n[c] && n[c].call(this, d, c), e !== !1 && d !== null) {
                            e !== u && (d = e);
                            if (j && /^(x|y|r|start|end|width|height|innerR|anchorX|anchorY)/.test(c)) k || (this.symbolAttr(a), k = !0), m = !0;
                            else if (c === "d") {
                                d = d || [];
                                this.d = d.join(" ");
                                f.path = d = this.pathToVML(d);
                                if (l)
                                    for (e = l.length; e--;) l[e].path = l[e].cutOff ? this.cutOffPath(d,
                                        l[e].cutOff) : d;
                                m = !0
                            } else if (c === "visibility") {
                                d === "inherit" && (d = "visible");
                                if (l)
                                    for (e = l.length; e--;) l[e].style[c] = d;
                                h === "DIV" && (d = d === "hidden" ? "-999em" : 0, gb || (g[c] = d ? "visible" : "hidden"), c = "top");
                                g[c] = d;
                                m = !0
                            } else if (c === "zIndex") d && (g[c] = d), m = !0;
                            else if (va(c, ["x", "y", "width", "height"]) !== -1) this[c] = d, c === "x" || c === "y" ? c = {
                                x: "left",
                                y: "top"
                            }[c] : d = t(0, d), this.updateClipping ? (this[c] = d, this.updateClipping()) : g[c] = d, m = !0;
                            else if (c === "class" && h === "DIV") f.className = d;
                            else if (c === "stroke") d = i.color(d, f, c), c =
                                "strokecolor";
                            else if (c === "stroke-width" || c === "strokeWidth") f.stroked = d ? !0 : !1, c = "strokeweight", this[c] = d, ya(d) && (d += "px");
                            else if (c === "dashstyle")(f.getElementsByTagName("stroke")[0] || V(i.prepVML(["<stroke/>"]), null, null, f))[c] = d || "solid", this.dashstyle = d, m = !0;
                            else if (c === "fill")
                                if (h === "SPAN") g.color = d;
                                else {
                                    if (h !== "IMG") f.filled = d !== O ? !0 : !1, d = i.color(d, f, c, this), c = "fillcolor"
                                } else if (c === "opacity") m = !0;
                            else if (h === "shape" && c === "rotation") this[c] = f.style[c] = d, f.style.left = -v(ba(d * Ca) + 1) + "px", f.style.top =
                                v(W(d * Ca)) + "px";
                            else if (c === "translateX" || c === "translateY" || c === "rotation") this[c] = d, this.updateTransform(), m = !0;
                            m || (gb ? f[c] = d : z(f, c, d))
                        } return q
            },
            clip: function (a) {
                var b = this,
                    c;
                a ? (c = a.members, ia(c, b), c.push(b), b.destroyClip = function () {
                    ia(c, b)
                }, a = a.getCSS(b)) : (b.destroyClip && b.destroyClip(), a = {
                    clip: gb ? "inherit" : "rect(auto)"
                });
                return b.css(a)
            },
            css: ta.prototype.htmlCss,
            safeRemoveChild: function (a) {
                a.parentNode && Pa(a)
            },
            destroy: function () {
                this.destroyClip && this.destroyClip();
                return ta.prototype.destroy.apply(this)
            },
            on: function (a, b) {
                this.element["on" + a] = function () {
                    var a = G.event;
                    a.target = a.srcElement;
                    b(a)
                };
                return this
            },
            cutOffPath: function (a, b) {
                var c, a = a.split(/[ ,]/);
                c = a.length;
                if (c === 9 || c === 11) a[c - 4] = a[c - 2] = x(a[c - 2]) - 10 * b;
                return a.join(" ")
            },
            shadow: function (a, b, c) {
                var d = [],
                    e, f = this.element,
                    g = this.renderer,
                    h, i = f.style,
                    j, k = f.path,
                    l, m, n, q;
                k && typeof k.value !== "string" && (k = "x");
                m = k;
                if (a) {
                    n = o(a.width, 3);
                    q = (a.opacity || 0.15) / n;
                    for (e = 1; e <= 3; e++) {
                        l = n * 2 + 1 - 2 * e;
                        c && (m = this.cutOffPath(k.value, l + 0.5));
                        j = ['<shape isShadow="true" strokeweight="',
                            l, '" filled="false" path="', m, '" coordsize="10 10" style="', f.style.cssText, '" />'
                        ];
                        h = V(g.prepVML(j), null, {
                            left: x(i.left) + o(a.offsetX, 1),
                            top: x(i.top) + o(a.offsetY, 1)
                        });
                        if (c) h.cutOff = l + 1;
                        j = ['<stroke color="', a.color || "black", '" opacity="', q * e, '"/>'];
                        V(g.prepVML(j), null, null, h);
                        b ? b.element.appendChild(h) : f.parentNode.insertBefore(h, f);
                        d.push(h)
                    }
                    this.shadows = d
                }
                return this
            }
        };
        da = ja(ta, da);
        var ea = {
            Element: da,
            isIE8: ua.indexOf("MSIE 8.0") > -1,
            init: function (a, b, c, d) {
                var e;
                this.alignedObjects = [];
                d = this.createElement(Ja).css(s(this.getStyle(d), {
                    position: "relative"
                }));
                e = d.element;
                a.appendChild(d.element);
                this.isVML = !0;
                this.box = e;
                this.boxWrapper = d;
                this.cache = {};
                this.setSize(b, c, !1);
                if (!y.namespaces.hcv) {
                    y.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                    try {
                        y.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    } catch (f) {
                        y.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                    }
                }
            },
            isHidden: function () {
                return !this.box.offsetWidth
            },
            clipRect: function (a, b, c, d) {
                var e = this.createElement(),
                    f = $(a);
                return s(e, {
                    members: [],
                    left: (f ? a.x : a) + 1,
                    top: (f ? a.y : b) + 1,
                    width: (f ? a.width : c) - 1,
                    height: (f ? a.height : d) - 1,
                    getCSS: function (a) {
                        var b = a.element,
                            c = b.nodeName,
                            a = a.inverted,
                            d = this.top - (c === "shape" ? b.offsetTop : 0),
                            e = this.left,
                            b = e + this.width,
                            f = d + this.height,
                            d = {
                                clip: "rect(" + v(a ? e : d) + "px," + v(a ? f : b) + "px," + v(a ? b : f) + "px," + v(a ? d : e) + "px)"
                            };
                        !a && gb && c === "DIV" && s(d, {
                            width: b + "px",
                            height: f + "px"
                        });
                        return d
                    },
                    updateClipping: function () {
                        p(e.members,
                            function (a) {
                                a.css(e.getCSS(a))
                            })
                    }
                })
            },
            color: function (a, b, c, d) {
                var e = this,
                    f, g = /^rgba/,
                    h, i, j = O;
                a && a.linearGradient ? i = "gradient" : a && a.radialGradient && (i = "pattern");
                if (i) {
                    var k, l, m = a.linearGradient || a.radialGradient,
                        n, q, o, K, r, P = "",
                        a = a.stops,
                        t, s = [],
                        v = function () {
                            h = ['<fill colors="' + s.join(",") + '" opacity="', o, '" o:opacity2="', q, '" type="', i, '" ', P, 'focus="100%" method="any" />'];
                            V(e.prepVML(h), null, null, b)
                        };
                    n = a[0];
                    t = a[a.length - 1];
                    n[0] > 0 && a.unshift([0, n[1]]);
                    t[0] < 1 && a.push([1, t[1]]);
                    p(a, function (a, b) {
                        g.test(a[1]) ?
                            (f = wa(a[1]), k = f.get("rgb"), l = f.get("a")) : (k = a[1], l = 1);
                        s.push(a[0] * 100 + "% " + k);
                        b ? (o = l, K = k) : (q = l, r = k)
                    });
                    if (c === "fill")
                        if (i === "gradient") c = m.x1 || m[0] || 0, a = m.y1 || m[1] || 0, n = m.x2 || m[2] || 0, m = m.y2 || m[3] || 0, P = 'angle="' + (90 - T.atan((m - a) / (n - c)) * 180 / la) + '"', v();
                        else {
                            var j = m.r,
                                u = j * 2,
                                y = j * 2,
                                w = m.cx,
                                A = m.cy,
                                xa = b.radialReference,
                                x, j = function () {
                                    xa && (x = d.getBBox(), w += (xa[0] - x.x) / x.width - 0.5, A += (xa[1] - x.y) / x.height - 0.5, u *= xa[2] / x.width, y *= xa[2] / x.height);
                                    P = 'src="' + L.global.VMLRadialGradientURL + '" size="' + u + "," + y + '" origin="0.5,0.5" position="' +
                                        w + "," + A + '" color2="' + r + '" ';
                                    v()
                                };
                            d.added ? j() : d.onAdd = j;
                            j = K
                        } else j = k
                } else if (g.test(a) && b.tagName !== "IMG") f = wa(a), h = ["<", c, ' opacity="', f.get("a"), '"/>'], V(this.prepVML(h), null, null, b), j = f.get("rgb");
                else {
                    j = b.getElementsByTagName(c);
                    if (j.length) j[0].opacity = 1, j[0].type = "solid";
                    j = a
                }
                return j
            },
            prepVML: function (a) {
                var b = this.isIE8,
                    a = a.join("");
                b ? (a = a.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'), a = a.indexOf('style="') === -1 ? a.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') :
                    a.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : a = a.replace("<", "<hcv:");
                return a
            },
            text: pa.prototype.html,
            path: function (a) {
                var b = {
                    coordsize: "10 10"
                };
                La(a) ? b.d = a : $(a) && s(b, a);
                return this.createElement("shape").attr(b)
            },
            circle: function (a, b, c) {
                var d = this.symbol("circle");
                if ($(a)) c = a.r, b = a.y, a = a.x;
                d.isCircle = !0;
                d.r = c;
                return d.attr({
                    x: a,
                    y: b
                })
            },
            g: function (a) {
                var b;
                a && (b = {
                    className: "highcharts-" + a,
                    "class": "highcharts-" + a
                });
                return this.createElement(Ja).attr(b)
            },
            image: function (a,
                b, c, d, e) {
                var f = this.createElement("img").attr({
                    src: a
                });
                arguments.length > 1 && f.attr({
                    x: b,
                    y: c,
                    width: d,
                    height: e
                });
                return f
            },
            createElement: function (a) {
                return a === "rect" ? this.symbol(a) : pa.prototype.createElement.call(this, a)
            },
            invertChild: function (a, b) {
                var c = this,
                    d = b.style,
                    e = a.tagName === "IMG" && a.style;
                D(a, {
                    flip: "x",
                    left: x(d.width) - (e ? x(e.top) : 1),
                    top: x(d.height) - (e ? x(e.left) : 1),
                    rotation: -90
                });
                p(a.childNodes, function (b) {
                    c.invertChild(b, a)
                })
            },
            symbols: {
                arc: function (a, b, c, d, e) {
                    var f = e.start,
                        g = e.end,
                        h = e.r || c ||
                            d,
                        c = e.innerR,
                        d = W(f),
                        i = ba(f),
                        j = W(g),
                        k = ba(g);
                    if (g - f === 0) return ["x"];
                    f = ["wa", a - h, b - h, a + h, b + h, a + h * d, b + h * i, a + h * j, b + h * k];
                    e.open && !c && f.push("e", "M", a, b);
                    f.push("at", a - c, b - c, a + c, b + c, a + c * j, b + c * k, a + c * d, b + c * i, "x", "e");
                    f.isArc = !0;
                    return f
                },
                circle: function (a, b, c, d, e) {
                    e && (c = d = 2 * e.r);
                    e && e.isCircle && (a -= c / 2, b -= d / 2);
                    return ["wa", a, b, a + c, b + d, a + c, b + d / 2, a + c, b + d / 2, "e"]
                },
                rect: function (a, b, c, d, e) {
                    var f = a + c,
                        g = b + d,
                        h;
                    !r(e) || !e.r ? f = pa.prototype.symbols.square.apply(0, arguments) : (h = E(e.r, c, d), f = ["M", a + h, b, "L", f - h, b, "wa", f - 2 *
                        h, b, f, b + 2 * h, f - h, b, f, b + h, "L", f, g - h, "wa", f - 2 * h, g - 2 * h, f, g, f, g - h, f - h, g, "L", a + h, g, "wa", a, g - 2 * h, a + 2 * h, g, a + h, g, a, g - h, "L", a, b + h, "wa", a, b, a + 2 * h, b + 2 * h, a, b + h, a + h, b, "x", "e"
                    ]);
                    return f
                }
            }
        };
        Q.VMLRenderer = da = function () {
            this.init.apply(this, arguments)
        };
        da.prototype = w(pa.prototype, ea);
        Za = da
    }
    pa.prototype.measureSpanWidth = function (a, b) {
        var c = y.createElement("span"),
            d;
        d = y.createTextNode(a);
        c.appendChild(d);
        D(c, b);
        this.box.appendChild(c);
        d = c.offsetWidth;
        Pa(c);
        return d
    };
    var Mb;
    if (ca) Q.CanVGRenderer = da = function () {
        Da = "http://www.w3.org/1999/xhtml"
    },
    da.prototype.symbols = {}, Mb = function () {
        function a() {
            var a = b.length,
                d;
            for (d = 0; d < a; d++) b[d]();
            b = []
        }
        var b = [];
        return {
            push: function (c, d) {
                b.length === 0 && Qb(d, a);
                b.push(c)
            }
        }
    }(), Za = da;
    Sa.prototype = {
        addLabel: function () {
            var a = this.axis,
                b = a.options,
                c = a.chart,
                d = a.horiz,
                e = a.categories,
                f = a.names,
                g = this.pos,
                h = b.labels,
                i = a.tickPositions,
                d = d && e && !h.step && !h.staggerLines && !h.rotation && c.plotWidth / i.length || !d && (c.margin[3] || c.chartWidth * 0.33),
                j = g === i[0],
                k = g === i[i.length - 1],
                l, f = e ? o(e[g], f[g], g) : g,
                e = this.label,
                m = i.info;
            a.isDatetimeAxis && m && (l = b.dateTimeLabelFormats[m.higherRanks[g] || m.unitName]);
            this.isFirst = j;
            this.isLast = k;
            b = a.labelFormatter.call({
                axis: a,
                chart: c,
                isFirst: j,
                isLast: k,
                dateTimeLabelFormat: l,
                value: a.isLog ? aa(ha(f)) : f
            });
            g = d && {
                width: t(1, v(d - 2 * (h.padding || 10))) + "px"
            };
            g = s(g, h.style);
            if (r(e)) e && e.attr({
                text: b
            }).css(g);
            else {
                l = {
                    align: a.labelAlign
                };
                if (ya(h.rotation)) l.rotation = h.rotation;
                if (d && h.ellipsis) l._clipHeight = a.len / i.length;
                this.label = r(b) && h.enabled ? c.renderer.text(b, 0, 0, h.useHTML).attr(l).css(g).add(a.labelGroup) :
                    null
            }
        },
        getLabelSize: function () {
            var a = this.label,
                b = this.axis;
            return a ? a.getBBox()[b.horiz ? "height" : "width"] : 0
        },
        getLabelSides: function () {
            var a = this.label.getBBox(),
                b = this.axis,
                c = b.horiz,
                d = b.options.labels,
                a = c ? a.width : a.height,
                b = c ? d.x - a * {
                    left: 0,
                    center: 0.5,
                    right: 1
                }[b.labelAlign] : 0;
            return [b, c ? a + b : a]
        },
        handleOverflow: function (a, b) {
            var c = !0,
                d = this.axis,
                e = this.isFirst,
                f = this.isLast,
                g = d.horiz ? b.x : b.y,
                h = d.reversed,
                i = d.tickPositions,
                j = this.getLabelSides(),
                k = j[0],
                j = j[1],
                l, m, n, q = this.label.line || 0;
            l = d.labelEdge;
            m = d.justifyLabels && (e || f);
            l[q] === u || g + k > l[q] ? l[q] = g + j : m || (c = !1);
            if (m) {
                l = (m = d.justifyToPlot) ? d.pos : 0;
                m = m ? l + d.len : d.chart.chartWidth;
                do a += e ? 1 : -1, n = d.ticks[i[a]]; while (i[a] && (!n || n.label.line !== q));
                d = n && n.label.xy && n.label.xy.x + n.getLabelSides()[e ? 0 : 1];
                e && !h || f && h ? g + k < l && (g = l - k, n && g + j > d && (c = !1)) : g + j > m && (g = m - j, n && g + k < d && (c = !1));
                b.x = g
            }
            return c
        },
        getPosition: function (a, b, c, d) {
            var e = this.axis,
                f = e.chart,
                g = d && f.oldChartHeight || f.chartHeight;
            return {
                x: a ? e.translate(b + c, null, null, d) + e.transB : e.left + e.offset +
                    (e.opposite ? (d && f.oldChartWidth || f.chartWidth) - e.right - e.left : 0),
                y: a ? g - e.bottom + e.offset - (e.opposite ? e.height : 0) : g - e.translate(b + c, null, null, d) - e.transB
            }
        },
        getLabelPosition: function (a, b, c, d, e, f, g, h) {
            var i = this.axis,
                j = i.transA,
                k = i.reversed,
                l = i.staggerLines,
                m = i.chart.renderer.fontMetrics(e.style.fontSize).b,
                n = e.rotation,
                a = a + e.x - (f && d ? f * j * (k ? -1 : 1) : 0),
                b = b + e.y - (f && !d ? f * j * (k ? 1 : -1) : 0);
            n && i.side === 2 && (b -= m - m * W(n * Ca));
            !r(e.y) && !n && (b += m - c.getBBox().height / 2);
            if (l) c.line = g / (h || 1) % l, b += c.line * (i.labelOffset /
                l);
            return {
                x: a,
                y: b
            }
        },
        getMarkPath: function (a, b, c, d, e, f) {
            return f.crispLine(["M", a, b, "L", a + (e ? 0 : -c), b + (e ? c : 0)], d)
        },
        render: function (a, b, c) {
            var d = this.axis,
                e = d.options,
                f = d.chart.renderer,
                g = d.horiz,
                h = this.type,
                i = this.label,
                j = this.pos,
                k = e.labels,
                l = this.gridLine,
                m = h ? h + "Grid" : "grid",
                n = h ? h + "Tick" : "tick",
                q = e[m + "LineWidth"],
                p = e[m + "LineColor"],
                K = e[m + "LineDashStyle"],
                t = e[n + "Length"],
                m = e[n + "Width"] || 0,
                r = e[n + "Color"],
                s = e[n + "Position"],
                n = this.mark,
                v = k.step,
                x = !0,
                y = d.tickmarkOffset,
                w = this.getPosition(g, j, y, b),
                H = w.x,
                w = w.y,
                A = g && H === d.pos + d.len || !g && w === d.pos ? -1 : 1;
            this.isActive = !0;
            if (q) {
                j = d.getPlotLinePath(j + y, q * A, b, !0);
                if (l === u) {
                    l = {
                        stroke: p,
                        "stroke-width": q
                    };
                    if (K) l.dashstyle = K;
                    if (!h) l.zIndex = 1;
                    if (b) l.opacity = 0;
                    this.gridLine = l = q ? f.path(j).attr(l).add(d.gridGroup) : null
                }
                if (!b && l && j) l[this.isNew ? "attr" : "animate"]({
                    d: j,
                    opacity: c
                })
            }
            if (m && t) s === "inside" && (t = -t), d.opposite && (t = -t), h = this.getMarkPath(H, w, t, m * A, g, f), n ? n.animate({
                d: h,
                opacity: c
            }) : this.mark = f.path(h).attr({
                stroke: r,
                "stroke-width": m,
                opacity: c
            }).add(d.axisGroup);
            if (i && !isNaN(H)) i.xy = w = this.getLabelPosition(H, w, i, g, k, y, a, v), this.isFirst && !this.isLast && !o(e.showFirstLabel, 1) || this.isLast && !this.isFirst && !o(e.showLastLabel, 1) ? x = !1 : !d.isRadial && !k.step && !k.rotation && !b && c !== 0 && (x = this.handleOverflow(a, w)), v && a % v && (x = !1), x && !isNaN(w.y) ? (w.opacity = c, i[this.isNew ? "attr" : "animate"](w), this.isNew = !1) : i.attr("y", -9999)
        },
        destroy: function () {
            Oa(this, this.axis)
        }
    };
    Q.PlotLineOrBand = function (a, b) {
        this.axis = a;
        if (b) this.options = b, this.id = b.id
    };
    Q.PlotLineOrBand.prototype = {
        render: function () {
            var a =
                this,
                b = a.axis,
                c = b.horiz,
                d = (b.pointRange || 0) / 2,
                e = a.options,
                f = e.label,
                g = a.label,
                h = e.width,
                i = e.to,
                j = e.from,
                k = r(j) && r(i),
                l = e.value,
                m = e.dashStyle,
                n = a.svgElem,
                q = [],
                p, K = e.color,
                s = e.zIndex,
                P = e.events,
                v = b.chart.renderer;
            b.isLog && (j = za(j), i = za(i), l = za(l));
            if (h) {
                if (q = b.getPlotLinePath(l, h), d = {
                    stroke: K,
                    "stroke-width": h
                }, m) d.dashstyle = m
            } else if (k) {
                if (j = t(j, b.min - d), i = E(i, b.max + d), q = b.getPlotBandPath(j, i, e), d = {
                    fill: K
                }, e.borderWidth) d.stroke = e.borderColor, d["stroke-width"] = e.borderWidth
            } else return; if (r(s)) d.zIndex =
                s;
            if (n)
                if (q) n.animate({
                    d: q
                }, null, n.onGetPath);
                else {
                    if (n.hide(), n.onGetPath = function () {
                        n.show()
                    }, g) a.label = g = g.destroy()
                } else if (q && q.length && (a.svgElem = n = v.path(q).attr(d).add(), P))
                for (p in e = function (b) {
                    n.on(b, function (c) {
                        P[b].apply(a, [c])
                    })
                }, P) e(p);
            if (f && r(f.text) && q && q.length && b.width > 0 && b.height > 0) {
                f = w({
                    align: c && k && "center",
                    x: c ? !k && 4 : 10,
                    verticalAlign: !c && k && "middle",
                    y: c ? k ? 16 : 10 : k ? 6 : -4,
                    rotation: c && !k && 90
                }, f);
                if (!g) a.label = g = v.text(f.text, 0, 0, f.useHTML).attr({
                    align: f.textAlign || f.align,
                    rotation: f.rotation,
                    zIndex: s
                }).css(f.style).add();
                b = [q[1], q[4], o(q[6], q[1])];
                q = [q[2], q[5], o(q[7], q[2])];
                c = Na(b);
                k = Na(q);
                g.align(f, !1, {
                    x: c,
                    y: k,
                    width: Ba(b) - c,
                    height: Ba(q) - k
                });
                g.show()
            } else g && g.hide();
            return a
        },
        destroy: function () {
            ia(this.axis.plotLinesAndBands, this);
            delete this.axis;
            Oa(this)
        }
    };
    ka.prototype = {
        defaultOptions: {
            dateTimeLabelFormats: {
                millisecond: "%H:%M:%S.%L",
                second: "%H:%M:%S",
                minute: "%H:%M",
                hour: "%H:%M",
                day: "%e. %b",
                week: "%e. %b",
                month: "%b '%y",
                year: "%Y"
            },
            endOnTick: !1,
            gridLineColor: "#C0C0C0",
            labels: F,
            lineColor: "#C0D0E0",
            lineWidth: 1,
            minPadding: 0.01,
            maxPadding: 0.01,
            minorGridLineColor: "#E0E0E0",
            minorGridLineWidth: 1,
            minorTickColor: "#A0A0A0",
            minorTickLength: 2,
            minorTickPosition: "outside",
            startOfWeek: 1,
            startOnTick: !1,
            tickColor: "#C0D0E0",
            tickLength: 5,
            tickmarkPlacement: "between",
            tickPixelInterval: 100,
            tickPosition: "outside",
            tickWidth: 1,
            title: {
                align: "middle",
                style: {
                    color: "#4d759e",
                    fontWeight: "bold"
                }
            },
            type: "linear"
        },
        defaultYAxisOptions: {
            endOnTick: !0,
            gridLineWidth: 1,
            tickPixelInterval: 72,
            showLastLabel: !0,
            labels: {
                x: -8,
                y: 3
            },
            lineWidth: 0,
            maxPadding: 0.05,
            minPadding: 0.05,
            startOnTick: !0,
            tickWidth: 0,
            title: {
                rotation: 270,
                text: "Values"
            },
            stackLabels: {
                enabled: !1,
                formatter: function () {
                    return Ga(this.total, -1)
                },
                style: F.style
            }
        },
        defaultLeftAxisOptions: {
            labels: {
                x: -8,
                y: null
            },
            title: {
                rotation: 270
            }
        },
        defaultRightAxisOptions: {
            labels: {
                x: 8,
                y: null
            },
            title: {
                rotation: 90
            }
        },
        defaultBottomAxisOptions: {
            labels: {
                x: 0,
                y: 14
            },
            title: {
                rotation: 0
            }
        },
        defaultTopAxisOptions: {
            labels: {
                x: 0,
                y: -5
            },
            title: {
                rotation: 0
            }
        },
        init: function (a, b) {
            var c = b.isX;
            this.horiz = a.inverted ? !c : c;
            this.coll =
                (this.isXAxis = c) ? "xAxis" : "yAxis";
            this.opposite = b.opposite;
            this.side = b.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
            this.setOptions(b);
            var d = this.options,
                e = d.type;
            this.labelFormatter = d.labels.formatter || this.defaultLabelFormatter;
            this.userOptions = b;
            this.minPixelPadding = 0;
            this.chart = a;
            this.reversed = d.reversed;
            this.zoomEnabled = d.zoomEnabled !== !1;
            this.categories = d.categories || e === "category";
            this.names = [];
            this.isLog = e === "logarithmic";
            this.isDatetimeAxis = e === "datetime";
            this.isLinked = r(d.linkedTo);
            this.tickmarkOffset = this.categories && d.tickmarkPlacement === "between" ? 0.5 : 0;
            this.ticks = {};
            this.labelEdge = [];
            this.minorTicks = {};
            this.plotLinesAndBands = [];
            this.alternateBands = {};
            this.len = 0;
            this.minRange = this.userMinRange = d.minRange || d.maxZoom;
            this.range = d.range;
            this.offset = d.offset || 0;
            this.stacks = {};
            this.oldStacks = {};
            this.min = this.max = null;
            this.crosshair = o(d.crosshair, na(a.options.tooltip.crosshairs)[c ? 0 : 1], !1);
            var f, d = this.options.events;
            va(this, a.axes) === -1 && (c && !this.isColorAxis ? a.axes.splice(a.xAxis.length,
                0, this) : a.axes.push(this), a[this.coll].push(this));
            this.series = this.series || [];
            if (a.inverted && c && this.reversed === u) this.reversed = !0;
            this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
            for (f in d) C(this, f, d[f]);
            if (this.isLog) this.val2lin = za, this.lin2val = ha
        },
        setOptions: function (a) {
            this.options = w(this.defaultOptions, this.isXAxis ? {} : this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], w(L[this.coll],
                a))
        },
        defaultLabelFormatter: function () {
            var a = this.axis,
                b = this.value,
                c = a.categories,
                d = this.dateTimeLabelFormat,
                e = L.lang.numericSymbols,
                f = e && e.length,
                g, h = a.options.labels.format,
                a = a.isLog ? b : a.tickInterval;
            if (h) g = Ia(h, this);
            else if (c) g = b;
            else if (d) g = bb(d, b);
            else if (f && a >= 1E3)
                for (; f-- && g === u;) c = Math.pow(1E3, f + 1), a >= c && e[f] !== null && (g = Ga(b / c, -1) + e[f]);
            g === u && (g = b >= 1E4 ? Ga(b, 0) : Ga(b, -1, u, ""));
            return g
        },
        getSeriesExtremes: function () {
            var a = this,
                b = a.chart;
            a.hasVisibleSeries = !1;
            a.dataMin = a.dataMax = null;
            a.buildStacks &&
                a.buildStacks();
            p(a.series, function (c) {
                if (c.visible || !b.options.chart.ignoreHiddenSeries) {
                    var d;
                    d = c.options.threshold;
                    var e;
                    a.hasVisibleSeries = !0;
                    a.isLog && d <= 0 && (d = null);
                    if (a.isXAxis) {
                        if (d = c.xData, d.length) a.dataMin = E(o(a.dataMin, d[0]), Na(d)), a.dataMax = t(o(a.dataMax, d[0]), Ba(d))
                    } else {
                        c.getExtremes();
                        e = c.dataMax;
                        c = c.dataMin;
                        if (r(c) && r(e)) a.dataMin = E(o(a.dataMin, c), c), a.dataMax = t(o(a.dataMax, e), e);
                        if (r(d))
                            if (a.dataMin >= d) a.dataMin = d, a.ignoreMinPadding = !0;
                            else if (a.dataMax < d) a.dataMax = d, a.ignoreMaxPadding = !0
                    }
                }
            })
        },
        translate: function (a, b, c, d, e, f) {
            var g = 1,
                h = 0,
                i = d ? this.oldTransA : this.transA,
                d = d ? this.oldMin : this.min,
                j = this.minPixelPadding,
                e = (this.options.ordinal || this.isLog && e) && this.lin2val;
            if (!i) i = this.transA;
            if (c) g *= -1, h = this.len;
            this.reversed && (g *= -1, h -= g * (this.sector || this.len));
            b ? (a = a * g + h, a -= j, a = a / i + d, e && (a = this.lin2val(a))) : (e && (a = this.val2lin(a)), f === "between" && (f = 0.5), a = g * (a - d) * i + h + g * j + (ya(f) ? i * f * this.pointRange : 0));
            return a
        },
        toPixels: function (a, b) {
            return this.translate(a, !1, !this.horiz, null, !0) +
                (b ? 0 : this.pos)
        },
        toValue: function (a, b) {
            return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
        },
        getPlotLinePath: function (a, b, c, d, e) {
            var f = this.chart,
                g = this.left,
                h = this.top,
                i, j, k = c && f.oldChartHeight || f.chartHeight,
                l = c && f.oldChartWidth || f.chartWidth,
                m;
            i = this.transB;
            e = o(e, this.translate(a, null, null, c));
            a = c = v(e + i);
            i = j = v(k - e - i);
            if (isNaN(e)) m = !0;
            else if (this.horiz) {
                if (i = h, j = k - this.bottom, a < g || a > g + this.width) m = !0
            } else if (a = g, c = l - this.right, i < h || i > h + this.height) m = !0;
            return m && !d ? null : f.renderer.crispLine(["M",
                a, i, "L", c, j
            ], b || 1)
        },
        getLinearTickPositions: function (a, b, c) {
            for (var d, b = aa(S(b / a) * a), c = aa(Ka(c / a) * a), e = []; b <= c;) {
                e.push(b);
                b = aa(b + a);
                if (b === d) break;
                d = b
            }
            return e
        },
        getMinorTickPositions: function () {
            var a = this.options,
                b = this.tickPositions,
                c = this.minorTickInterval,
                d = [],
                e;
            if (this.isLog) {
                e = b.length;
                for (a = 1; a < e; a++) d = d.concat(this.getLogTickPositions(c, b[a - 1], b[a], !0))
            } else if (this.isDatetimeAxis && a.minorTickInterval === "auto") d = d.concat(this.getTimeTicks(this.normalizeTimeTickInterval(c), this.min, this.max,
                a.startOfWeek)), d[0] < this.min && d.shift();
            else
                for (b = this.min + (b[0] - this.min) % c; b <= this.max; b += c) d.push(b);
            return d
        },
        adjustForMinRange: function () {
            var a = this.options,
                b = this.min,
                c = this.max,
                d, e = this.dataMax - this.dataMin >= this.minRange,
                f, g, h, i, j;
            if (this.isXAxis && this.minRange === u && !this.isLog) r(a.min) || r(a.max) ? this.minRange = null : (p(this.series, function (a) {
                i = a.xData;
                for (g = j = a.xIncrement ? 1 : i.length - 1; g > 0; g--)
                    if (h = i[g] - i[g - 1], f === u || h < f) f = h
            }), this.minRange = E(f * 5, this.dataMax - this.dataMin));
            if (c - b < this.minRange) {
                var k =
                    this.minRange;
                d = (k - c + b) / 2;
                d = [b - d, o(a.min, b - d)];
                if (e) d[2] = this.dataMin;
                b = Ba(d);
                c = [b + k, o(a.max, b + k)];
                if (e) c[2] = this.dataMax;
                c = Na(c);
                c - b < k && (d[0] = c - k, d[1] = o(a.min, c - k), b = Ba(d))
            }
            this.min = b;
            this.max = c
        },
        setAxisTranslation: function (a) {
            var b = this,
                c = b.max - b.min,
                d = b.axisPointRange || 0,
                e, f = 0,
                g = 0,
                h = b.linkedParent,
                i = !! b.categories,
                j = b.transA;
            if (b.isXAxis || i || d) h ? (f = h.minPointOffset, g = h.pointRangePadding) : p(b.series, function (a) {
                var h = t(b.isXAxis ? a.pointRange : b.axisPointRange || 0, +i),
                    j = a.options.pointPlacement,
                    n =
                        a.closestPointRange;
                h > c && (h = 0);
                d = t(d, h);
                f = t(f, ga(j) ? 0 : h / 2);
                g = t(g, j === "on" ? 0 : h);
                !a.noSharedTooltip && r(n) && (e = r(e) ? E(e, n) : n)
            }), h = b.ordinalSlope && e ? b.ordinalSlope / e : 1, b.minPointOffset = f *= h, b.pointRangePadding = g *= h, b.pointRange = E(d, c), b.closestPointRange = e;
            if (a) b.oldTransA = j;
            b.translationSlope = b.transA = j = b.len / (c + g || 1);
            b.transB = b.horiz ? b.left : b.bottom;
            b.minPixelPadding = j * f
        },
        setTickPositions: function (a) {
            var b = this,
                c = b.chart,
                d = b.options,
                e = b.isLog,
                f = b.isDatetimeAxis,
                g = b.isXAxis,
                h = b.isLinked,
                i = b.options.tickPositioner,
                j = d.maxPadding,
                k = d.minPadding,
                l = d.tickInterval,
                m = d.minTickInterval,
                n = d.tickPixelInterval,
                q, qa = b.categories;
            h ? (b.linkedParent = c[b.coll][d.linkedTo], c = b.linkedParent.getExtremes(), b.min = o(c.min, c.dataMin), b.max = o(c.max, c.dataMax), d.type !== b.linkedParent.options.type && oa(11, 1)) : (b.min = o(b.userMin, d.min, b.dataMin), b.max = o(b.userMax, d.max, b.dataMax));
            if (e)!a && E(b.min, o(b.dataMin, b.min)) <= 0 && oa(10, 1), b.min = aa(za(b.min)), b.max = aa(za(b.max));
            if (b.range && r(b.max)) b.userMin = b.min = t(b.min, b.max - b.range), b.userMax =
                b.max, b.range = null;
            b.beforePadding && b.beforePadding();
            b.adjustForMinRange();
            if (!qa && !b.axisPointRange && !b.usePercentage && !h && r(b.min) && r(b.max) && (c = b.max - b.min)) {
                if (!r(d.min) && !r(b.userMin) && k && (b.dataMin < 0 || !b.ignoreMinPadding)) b.min -= c * k;
                if (!r(d.max) && !r(b.userMax) && j && (b.dataMax > 0 || !b.ignoreMaxPadding)) b.max += c * j
            }
            b.min === b.max || b.min === void 0 || b.max === void 0 ? b.tickInterval = 1 : h && !l && n === b.linkedParent.options.tickPixelInterval ? b.tickInterval = b.linkedParent.tickInterval : (b.tickInterval = o(l, qa ? 1 :
                (b.max - b.min) * n / t(b.len, n)), !r(l) && b.len < n && !this.isRadial && !this.isLog && !qa && d.startOnTick && d.endOnTick && (q = !0, b.tickInterval /= 4));
            g && !a && p(b.series, function (a) {
                a.processData(b.min !== b.oldMin || b.max !== b.oldMax)
            });
            b.setAxisTranslation(!0);
            b.beforeSetTickPositions && b.beforeSetTickPositions();
            if (b.postProcessTickInterval) b.tickInterval = b.postProcessTickInterval(b.tickInterval);
            if (b.pointRange) b.tickInterval = t(b.pointRange, b.tickInterval);
            if (!l && b.tickInterval < m) b.tickInterval = m;
            if (!f && !e && !l) b.tickInterval =
                nb(b.tickInterval, null, mb(b.tickInterval), d);
            b.minorTickInterval = d.minorTickInterval === "auto" && b.tickInterval ? b.tickInterval / 5 : d.minorTickInterval;
            b.tickPositions = a = d.tickPositions ? [].concat(d.tickPositions) : i && i.apply(b, [b.min, b.max]);
            if (!a)!b.ordinalPositions && (b.max - b.min) / b.tickInterval > t(2 * b.len, 200) && oa(19, !0), a = f ? b.getTimeTicks(b.normalizeTimeTickInterval(b.tickInterval, d.units), b.min, b.max, d.startOfWeek, b.ordinalPositions, b.closestPointRange, !0) : e ? b.getLogTickPositions(b.tickInterval, b.min,
                b.max) : b.getLinearTickPositions(b.tickInterval, b.min, b.max), q && a.splice(1, a.length - 2), b.tickPositions = a;
            if (!h) e = a[0], f = a[a.length - 1], h = b.minPointOffset || 0, d.startOnTick ? b.min = e : b.min - h > e && a.shift(), d.endOnTick ? b.max = f : b.max + h < f && a.pop(), a.length === 1 && (d = N(b.max || 1) * 0.001, b.min -= d, b.max += d)
        },
        setMaxTicks: function () {
            var a = this.chart,
                b = a.maxTicks || {}, c = this.tickPositions,
                d = this._maxTicksKey = [this.coll, this.pos, this.len].join("-");
            if (!this.isLinked && !this.isDatetimeAxis && c && c.length > (b[d] || 0) && this.options.alignTicks !== !1) b[d] = c.length;
            a.maxTicks = b
        },
        adjustTickAmount: function () {
            var a = this._maxTicksKey,
                b = this.tickPositions,
                c = this.chart.maxTicks;
            if (c && c[a] && !this.isDatetimeAxis && !this.categories && !this.isLinked && this.options.alignTicks !== !1 && this.min !== u) {
                var d = this.tickAmount,
                    e = b.length;
                this.tickAmount = a = c[a];
                if (e < a) {
                    for (; b.length < a;) b.push(aa(b[b.length - 1] + this.tickInterval));
                    this.transA *= (e - 1) / (a - 1);
                    this.max = b[b.length - 1]
                }
                if (r(d) && a !== d) this.isDirty = !0
            }
        },
        setScale: function () {
            var a = this.stacks,
                b, c, d, e;
            this.oldMin =
                this.min;
            this.oldMax = this.max;
            this.oldAxisLength = this.len;
            this.setAxisSize();
            e = this.len !== this.oldAxisLength;
            p(this.series, function (a) {
                if (a.isDirtyData || a.isDirty || a.xAxis.isDirty) d = !0
            });
            if (e || d || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax) {
                if (!this.isXAxis)
                    for (b in a)
                        for (c in a[b]) a[b][c].total = null, a[b][c].cum = 0;
                this.forceRedraw = !1;
                this.getSeriesExtremes();
                this.setTickPositions();
                this.oldUserMin = this.userMin;
                this.oldUserMax = this.userMax;
                if (!this.isDirty) this.isDirty =
                    e || this.min !== this.oldMin || this.max !== this.oldMax
            } else if (!this.isXAxis) {
                if (this.oldStacks) a = this.stacks = this.oldStacks;
                for (b in a)
                    for (c in a[b]) a[b][c].cum = a[b][c].total
            }
            this.setMaxTicks()
        },
        setExtremes: function (a, b, c, d, e) {
            var f = this,
                g = f.chart,
                c = o(c, !0),
                e = s(e, {
                    min: a,
                    max: b
                });
            I(f, "setExtremes", e, function () {
                f.userMin = a;
                f.userMax = b;
                f.eventArgs = e;
                f.isDirtyExtremes = !0;
                c && g.redraw(d)
            })
        },
        zoom: function (a, b) {
            var c = this.dataMin,
                d = this.dataMax,
                e = this.options;
            this.allowZoomOutside || (r(c) && a <= E(c, o(e.min, c)) &&
                (a = u), r(d) && b >= t(d, o(e.max, d)) && (b = u));
            this.displayBtn = a !== u || b !== u;
            this.setExtremes(a, b, !1, u, {
                trigger: "zoom"
            });
            return !0
        },
        setAxisSize: function () {
            var a = this.chart,
                b = this.options,
                c = b.offsetLeft || 0,
                d = b.offsetRight || 0,
                e = this.horiz,
                f, g;
            this.left = g = o(b.left, a.plotLeft + c);
            this.top = f = o(b.top, a.plotTop);
            this.width = c = o(b.width, a.plotWidth - c + d);
            this.height = b = o(b.height, a.plotHeight);
            this.bottom = a.chartHeight - b - f;
            this.right = a.chartWidth - c - g;
            this.len = t(e ? c : b, 0);
            this.pos = e ? g : f
        },
        getExtremes: function () {
            var a = this.isLog;
            return {
                min: a ? aa(ha(this.min)) : this.min,
                max: a ? aa(ha(this.max)) : this.max,
                dataMin: this.dataMin,
                dataMax: this.dataMax,
                userMin: this.userMin,
                userMax: this.userMax
            }
        },
        getThreshold: function (a) {
            var b = this.isLog,
                c = b ? ha(this.min) : this.min,
                b = b ? ha(this.max) : this.max;
            c > a || a === null ? a = c : b < a && (a = b);
            return this.translate(a, 0, 1, 0, 1)
        },
        autoLabelAlign: function (a) {
            a = (o(a, 0) - this.side * 90 + 720) % 360;
            return a > 15 && a < 165 ? "right" : a > 195 && a < 345 ? "left" : "center"
        },
        getOffset: function () {
            var a = this,
                b = a.chart,
                c = b.renderer,
                d = a.options,
                e = a.tickPositions,
                f = a.ticks,
                g = a.horiz,
                h = a.side,
                i = b.inverted ? [1, 0, 3, 2][h] : h,
                j, k = 0,
                l, m = 0,
                n = d.title,
                q = d.labels,
                qa = 0,
                K = b.axisOffset,
                s = b.clipOffset,
                P = [-1, 1, 1, -1][h],
                v, w = 1,
                x = o(q.maxStaggerLines, 5),
                y, z, H, A;
            a.hasData = j = a.hasVisibleSeries || r(a.min) && r(a.max) && !! e;
            a.showAxis = b = j || o(d.showEmpty, !0);
            a.staggerLines = a.horiz && q.staggerLines;
            if (!a.axisGroup) a.gridGroup = c.g("grid").attr({
                zIndex: d.gridZIndex || 1
            }).add(), a.axisGroup = c.g("axis").attr({
                zIndex: d.zIndex || 2
            }).add(), a.labelGroup = c.g("axis-labels").attr({
                zIndex: q.zIndex || 7
            }).addClass("highcharts-" +
                a.coll.toLowerCase() + "-labels").add();
            if (j || a.isLinked) {
                a.labelAlign = o(q.align || a.autoLabelAlign(q.rotation));
                p(e, function (b) {
                    f[b] ? f[b].addLabel() : f[b] = new Sa(a, b)
                });
                if (a.horiz && !a.staggerLines && x && !q.rotation) {
                    for (v = a.reversed ? [].concat(e).reverse() : e; w < x;) {
                        j = [];
                        y = !1;
                        for (q = 0; q < v.length; q++) z = v[q], H = (H = f[z].label && f[z].label.getBBox()) ? H.width : 0, A = q % w, H && (z = a.translate(z), j[A] !== u && z < j[A] && (y = !0), j[A] = z + H);
                        if (y) w++;
                        else break
                    }
                    if (w > 1) a.staggerLines = w
                }
                p(e, function (b) {
                    if (h === 0 || h === 2 || {
                            1: "left",
                            3: "right"
                        }[h] ===
                        a.labelAlign) qa = t(f[b].getLabelSize(), qa)
                });
                if (a.staggerLines) qa *= a.staggerLines, a.labelOffset = qa
            } else
                for (v in f) f[v].destroy(), delete f[v]; if (n && n.text && n.enabled !== !1) {
                if (!a.axisTitle) a.axisTitle = c.text(n.text, 0, 0, n.useHTML).attr({
                    zIndex: 7,
                    rotation: n.rotation || 0,
                    align: n.textAlign || {
                        low: "left",
                        middle: "center",
                        high: "right"
                    }[n.align]
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-title").css(n.style).add(a.axisGroup), a.axisTitle.isNew = !0;
                if (b) k = a.axisTitle.getBBox()[g ? "height" : "width"], m = o(n.margin,
                    g ? 5 : 10), l = n.offset;
                a.axisTitle[b ? "show" : "hide"]()
            }
            a.offset = P * o(d.offset, K[h]);
            a.axisTitleMargin = o(l, qa + m + (h !== 2 && qa && P * d.labels[g ? "y" : "x"]));
            K[h] = t(K[h], a.axisTitleMargin + k + P * a.offset);
            s[i] = t(s[i], S(d.lineWidth / 2) * 2)
        },
        getLinePath: function (a) {
            var b = this.chart,
                c = this.opposite,
                d = this.offset,
                e = this.horiz,
                f = this.left + (c ? this.width : 0) + d,
                d = b.chartHeight - this.bottom - (c ? this.height : 0) + d;
            c && (a *= -1);
            return b.renderer.crispLine(["M", e ? this.left : f, e ? d : this.top, "L", e ? b.chartWidth - this.right : f, e ? d : b.chartHeight -
                this.bottom
            ], a)
        },
        getTitlePosition: function () {
            var a = this.horiz,
                b = this.left,
                c = this.top,
                d = this.len,
                e = this.options.title,
                f = a ? b : c,
                g = this.opposite,
                h = this.offset,
                i = x(e.style.fontSize || 12),
                d = {
                    low: f + (a ? 0 : d),
                    middle: f + d / 2,
                    high: f + (a ? d : 0)
                }[e.align],
                b = (a ? c + this.height : b) + (a ? 1 : -1) * (g ? -1 : 1) * this.axisTitleMargin + (this.side === 2 ? i : 0);
            return {
                x: a ? d : b + (g ? this.width : 0) + h + (e.x || 0),
                y: a ? b - (g ? this.height : 0) + h : d + (e.y || 0)
            }
        },
        render: function () {
            var a = this,
                b = a.horiz,
                c = a.reversed,
                d = a.chart,
                e = d.renderer,
                f = a.options,
                g = a.isLog,
                h = a.isLinked,
                i = a.tickPositions,
                j, k = a.axisTitle,
                l = a.ticks,
                m = a.minorTicks,
                n = a.alternateBands,
                q = f.stackLabels,
                o = f.alternateGridColor,
                K = a.tickmarkOffset,
                t = f.lineWidth,
                v = d.hasRendered && r(a.oldMin) && !isNaN(a.oldMin),
                s = a.hasData,
                w = a.showAxis,
                x, y = f.labels.overflow,
                z = a.justifyLabels = b && y !== !1,
                H;
            a.labelEdge.length = 0;
            a.justifyToPlot = y === "justify";
            p([l, m, n], function (a) {
                for (var b in a) a[b].isActive = !1
            });
            if (s || h)
                if (a.minorTickInterval && !a.categories && p(a.getMinorTickPositions(), function (b) {
                    m[b] || (m[b] = new Sa(a, b, "minor"));
                    v && m[b].isNew && m[b].render(null, !0);
                    m[b].render(null, !1, 1)
                }), i.length && (j = i.slice(), (b && c || !b && !c) && j.reverse(), z && (j = j.slice(1).concat([j[0]])), p(j, function (b, c) {
                    z && (c = c === j.length - 1 ? 0 : c + 1);
                    if (!h || b >= a.min && b <= a.max) l[b] || (l[b] = new Sa(a, b)), v && l[b].isNew && l[b].render(c, !0, 0.1), l[b].render(c, !1, 1)
                }), K && a.min === 0 && (l[-1] || (l[-1] = new Sa(a, -1, null, !0)), l[-1].render(-1))), o && p(i, function (b, c) {
                    if (c % 2 === 0 && b < a.max) n[b] || (n[b] = new Q.PlotLineOrBand(a)), x = b + K, H = i[c + 1] !== u ? i[c + 1] + K : a.max, n[b].options = {
                        from: g ?
                            ha(x) : x,
                        to: g ? ha(H) : H,
                        color: o
                    }, n[b].render(), n[b].isActive = !0
                }), !a._addedPlotLB) p((f.plotLines || []).concat(f.plotBands || []), function (b) {
                    a.addPlotBandOrLine(b)
                }), a._addedPlotLB = !0;
            p([l, m, n], function (a) {
                var b, c, e = [],
                    f = sa ? sa.duration || 500 : 0,
                    g = function () {
                        for (c = e.length; c--;) a[e[c]] && !a[e[c]].isActive && (a[e[c]].destroy(), delete a[e[c]])
                    };
                for (b in a)
                    if (!a[b].isActive) a[b].render(b, !1, 0), a[b].isActive = !1, e.push(b);
                a === n || !d.hasRendered || !f ? g() : f && setTimeout(g, f)
            });
            if (t) b = a.getLinePath(t), a.axisLine ? a.axisLine.animate({
                d: b
            }) :
                a.axisLine = e.path(b).attr({
                    stroke: f.lineColor,
                    "stroke-width": t,
                    zIndex: 7
                }).add(a.axisGroup), a.axisLine[w ? "show" : "hide"]();
            if (k && w) k[k.isNew ? "attr" : "animate"](a.getTitlePosition()), k.isNew = !1;
            q && q.enabled && a.renderStackTotals();
            a.isDirty = !1
        },
        redraw: function () {
            var a = this.chart.pointer;
            a && a.reset(!0);
            this.render();
            p(this.plotLinesAndBands, function (a) {
                a.render()
            });
            p(this.series, function (a) {
                a.isDirty = !0
            })
        },
        destroy: function (a) {
            var b = this,
                c = b.stacks,
                d, e = b.plotLinesAndBands;
            a || U(b);
            for (d in c) Oa(c[d]), c[d] =
                null;
            p([b.ticks, b.minorTicks, b.alternateBands], function (a) {
                Oa(a)
            });
            for (a = e.length; a--;) e[a].destroy();
            p("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","), function (a) {
                b[a] && (b[a] = b[a].destroy())
            });
            this.cross && this.cross.destroy()
        },
        drawCrosshair: function (a, b) {
            if (this.crosshair)
                if ((r(b) || !o(this.crosshair.snap, !0)) === !1) this.hideCrosshair();
                else {
                    var c, d = this.crosshair,
                        e = d.animation;
                    o(d.snap, !0) ? r(b) && (c = this.chart.inverted != this.horiz ? b.plotX : this.len - b.plotY) : c = this.horiz ?
                        a.chartX - this.pos : this.len - a.chartY + this.pos;
                    c = this.isRadial ? this.getPlotLinePath(this.isXAxis ? b.x : o(b.stackY, b.y)) : this.getPlotLinePath(null, null, null, null, c);
                    if (c === null) this.hideCrosshair();
                    else if (this.cross) this.cross.attr({
                        visibility: "visible"
                    })[e ? "animate" : "attr"]({
                        d: c
                    }, e);
                    else {
                        e = {
                            "stroke-width": d.width || 1,
                            stroke: d.color || "#C0C0C0",
                            zIndex: d.zIndex || 2
                        };
                        if (d.dashStyle) e.dashstyle = d.dashStyle;
                        this.cross = this.chart.renderer.path(c).attr(e).add()
                    }
                }
        },
        hideCrosshair: function () {
            this.cross && this.cross.hide()
        }
    };
    s(ka.prototype, {
        getPlotBandPath: function (a, b) {
            var c = this.getPlotLinePath(b),
                d = this.getPlotLinePath(a);
            d && c ? d.push(c[4], c[5], c[1], c[2]) : d = null;
            return d
        },
        addPlotBand: function (a) {
            this.addPlotBandOrLine(a, "plotBands")
        },
        addPlotLine: function (a) {
            this.addPlotBandOrLine(a, "plotLines")
        },
        addPlotBandOrLine: function (a, b) {
            var c = (new Q.PlotLineOrBand(this, a)).render(),
                d = this.userOptions;
            c && (b && (d[b] = d[b] || [], d[b].push(a)), this.plotLinesAndBands.push(c));
            return c
        },
        removePlotBandOrLine: function (a) {
            for (var b = this.plotLinesAndBands,
                    c = this.options, d = this.userOptions, e = b.length; e--;) b[e].id === a && b[e].destroy();
            p([c.plotLines || [], d.plotLines || [], c.plotBands || [], d.plotBands || []], function (b) {
                for (e = b.length; e--;) b[e].id === a && ia(b, b[e])
            })
        }
    });
    ka.prototype.getTimeTicks = function (a, b, c, d) {
        var e = [],
            f = {}, g = L.global.useUTC,
            h, i = new Date(b - Ra),
            j = a.unitRange,
            k = a.count;
        if (r(b)) {
            j >= B.second && (i.setMilliseconds(0), i.setSeconds(j >= B.minute ? 0 : k * S(i.getSeconds() / k)));
            if (j >= B.minute) i[Db](j >= B.hour ? 0 : k * S(i[pb]() / k));
            if (j >= B.hour) i[Eb](j >= B.day ? 0 : k *
                S(i[qb]() / k));
            if (j >= B.day) i[sb](j >= B.month ? 1 : k * S(i[Xa]() / k));
            j >= B.month && (i[Fb](j >= B.year ? 0 : k * S(i[eb]() / k)), h = i[fb]());
            j >= B.year && (h -= h % k, i[Gb](h));
            if (j === B.week) i[sb](i[Xa]() - i[rb]() + o(d, 1));
            b = 1;
            Ra && (i = new Date(i.getTime() + Ra));
            h = i[fb]();
            for (var d = i.getTime(), l = i[eb](), m = i[Xa](), n = g ? Ra : (864E5 + i.getTimezoneOffset() * 6E4) % 864E5; d < c;) e.push(d), j === B.year ? d = db(h + b * k, 0) : j === B.month ? d = db(h, l + b * k) : !g && (j === B.day || j === B.week) ? d = db(h, l, m + b * k * (j === B.day ? 1 : 7)) : d += j * k, b++;
            e.push(d);
            p(vb(e, function (a) {
                return j <=
                    B.hour && a % B.day === n
            }), function (a) {
                f[a] = "day"
            })
        }
        e.info = s(a, {
            higherRanks: f,
            totalRange: j * k
        });
        return e
    };
    ka.prototype.normalizeTimeTickInterval = function (a, b) {
        var c = b || [
            ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
            ["second", [1, 2, 5, 10, 15, 30]],
            ["minute", [1, 2, 5, 10, 15, 30]],
            ["hour", [1, 2, 3, 4, 6, 8, 12]],
            ["day", [1, 2]],
            ["week", [1, 2]],
            ["month", [1, 2, 3, 4, 6]],
            ["year", null]
        ],
            d = c[c.length - 1],
            e = B[d[0]],
            f = d[1],
            g;
        for (g = 0; g < c.length; g++)
            if (d = c[g], e = B[d[0]], f = d[1], c[g + 1] && a <= (e * f[f.length - 1] + B[c[g + 1][0]]) / 2) break;
        e === B.year &&
            a < 5 * e && (f = [1, 2, 5]);
        c = nb(a / e, f, d[0] === "year" ? t(mb(a / e), 1) : 1);
        return {
            unitRange: e,
            count: c,
            unitName: d[0]
        }
    };
    ka.prototype.getLogTickPositions = function (a, b, c, d) {
        var e = this.options,
            f = this.len,
            g = [];
        if (!d) this._minorAutoInterval = null;
        if (a >= 0.5) a = v(a), g = this.getLinearTickPositions(a, b, c);
        else if (a >= 0.08)
            for (var f = S(b), h, i, j, k, l, e = a > 0.3 ? [1, 2, 4] : a > 0.15 ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; f < c + 1 && !l; f++) {
                i = e.length;
                for (h = 0; h < i && !l; h++) j = za(ha(f) * e[h]), j > b && (!d || k <= c) && g.push(k), k > c && (l = !0), k = j
            } else if (b = ha(b), c = ha(c),
                a = e[d ? "minorTickInterval" : "tickInterval"], a = o(a === "auto" ? null : a, this._minorAutoInterval, (c - b) * (e.tickPixelInterval / (d ? 5 : 1)) / ((d ? f / this.tickPositions.length : f) || 1)), a = nb(a, null, mb(a)), g = Ua(this.getLinearTickPositions(a, b, c), za), !d) this._minorAutoInterval = a / 5;
        if (!d) this.tickInterval = a;
        return g
    };
    var Nb = Q.Tooltip = function () {
        this.init.apply(this, arguments)
    };
    Nb.prototype = {
        init: function (a, b) {
            var c = b.borderWidth,
                d = b.style,
                e = x(d.padding);
            this.chart = a;
            this.options = b;
            this.crosshairs = [];
            this.now = {
                x: 0,
                y: 0
            };
            this.isHidden = !0;
            this.label = a.renderer.label("", 0, 0, b.shape, null, null, b.useHTML, null, "tooltip").attr({
                padding: e,
                fill: b.backgroundColor,
                "stroke-width": c,
                r: b.borderRadius,
                zIndex: 8
            }).css(d).css({
                padding: 0
            }).add().attr({
                y: -9999
            });
            ca || this.label.shadow(b.shadow);
            this.shared = b.shared
        },
        destroy: function () {
            if (this.label) this.label = this.label.destroy();
            clearTimeout(this.hideTimer);
            clearTimeout(this.tooltipTimeout)
        },
        move: function (a, b, c, d) {
            var e = this,
                f = e.now,
                g = e.options.animation !== !1 && !e.isHidden;
            s(f, {
                x: g ? (2 * f.x + a) / 3 : a,
                y: g ?
                    (f.y + b) / 2 : b,
                anchorX: g ? (2 * f.anchorX + c) / 3 : c,
                anchorY: g ? (f.anchorY + d) / 2 : d
            });
            e.label.attr(f);
            if (g && (N(a - f.x) > 1 || N(b - f.y) > 1)) clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                e && e.move(a, b, c, d)
            }, 32)
        },
        hide: function () {
            var a = this,
                b;
            clearTimeout(this.hideTimer);
            if (!this.isHidden) b = this.chart.hoverPoints, this.hideTimer = setTimeout(function () {
                a.label.fadeOut();
                a.isHidden = !0
            }, o(this.options.hideDelay, 500)), b && p(b, function (a) {
                a.setState()
            }), this.chart.hoverPoints = null
        },
        getAnchor: function (a,
            b) {
            var c, d = this.chart,
                e = d.inverted,
                f = d.plotTop,
                g = 0,
                h = 0,
                i, a = na(a);
            c = a[0].tooltipPos;
            this.followPointer && b && (b.chartX === u && (b = d.pointer.normalize(b)), c = [b.chartX - d.plotLeft, b.chartY - f]);
            c || (p(a, function (a) {
                i = a.series.yAxis;
                g += a.plotX;
                h += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!e && i ? i.top - f : 0)
            }), g /= a.length, h /= a.length, c = [e ? d.plotWidth - h : g, this.shared && !e && a.length > 1 && b ? b.chartY - f : e ? d.plotHeight - g : h]);
            return Ua(c, v)
        },
        getPosition: function (a, b, c) {
            var d = this.chart,
                e = d.plotLeft,
                f = d.plotTop,
                g = d.plotWidth,
                h = d.plotHeight,
                i = o(this.options.distance, 12),
                j = isNaN(c.plotX) ? 0 : c.plotX,
                c = c.plotY,
                d = j + e + (d.inverted ? i : -a - i),
                k = c - b + f + 15,
                l;
            d < 7 && (d = e + t(j, 0) + i);
            d + a > e + g && (d -= d + a - (e + g), k = c - b + f - i, l = !0);
            k < f + 5 && (k = f + 5, l && c >= k && c <= k + b && (k = c + f + i));
            k + b > f + h && (k = t(f, f + h - b - i));
            return {
                x: d,
                y: k
            }
        },
        defaultFormatter: function (a) {
            var b = this.points || na(this),
                c = b[0].series,
                d;
            d = [a.tooltipHeaderFormatter(b[0])];
            p(b, function (a) {
                c = a.series;
                d.push(c.tooltipFormatter && c.tooltipFormatter(a) || a.point.tooltipFormatter(c.tooltipOptions.pointFormat))
            });
            d.push(a.options.footerFormat || "");
            return d.join("")
        },
        refresh: function (a, b) {
            var c = this.chart,
                d = this.label,
                e = this.options,
                f, g, h = {}, i, j = [];
            i = e.formatter || this.defaultFormatter;
            var h = c.hoverPoints,
                k, l = this.shared;
            clearTimeout(this.hideTimer);
            this.followPointer = na(a)[0].series.tooltipOptions.followPointer;
            g = this.getAnchor(a, b);
            f = g[0];
            g = g[1];
            l && (!a.series || !a.series.noSharedTooltip) ? (c.hoverPoints = a, h && p(h, function (a) {
                a.setState()
            }), p(a, function (a) {
                a.setState("hover");
                j.push(a.getLabelConfig())
            }), h = {
                x: a[0].category,
                y: a[0].y
            }, h.points = j, a = a[0]) : h = a.getLabelConfig();
            i = i.call(h, this);
            h = a.series;
            i === !1 ? this.hide() : (this.isHidden && (ab(d), d.attr("opacity", 1).show()), d.attr({
                text: i
            }), k = e.borderColor || a.color || h.color || "#606060", d.attr({
                stroke: k
            }), this.updatePosition({
                plotX: f,
                plotY: g
            }), this.isHidden = !1);
            I(c, "tooltipRefresh", {
                text: i,
                x: f + c.plotLeft,
                y: g + c.plotTop,
                borderColor: k
            })
        },
        updatePosition: function (a) {
            var b = this.chart,
                c = this.label,
                c = (this.options.positioner || this.getPosition).call(this, c.width, c.height, a);
            this.move(v(c.x),
                v(c.y), a.plotX + b.plotLeft, a.plotY + b.plotTop)
        },
        tooltipHeaderFormatter: function (a) {
            var b = a.series,
                c = b.tooltipOptions,
                d = c.dateTimeLabelFormats,
                e = c.xDateFormat,
                f = b.xAxis,
                g = f && f.options.type === "datetime" && ya(a.key),
                c = c.headerFormat,
                f = f && f.closestPointRange,
                h;
            if (g && !e) {
                if (f)
                    for (h in B) {
                        if (B[h] >= f || B[h] <= B.day && a.key % B[h] > 0) {
                            e = d[h];
                            break
                        }
                    } else e = d.day;
                e = e || d.year
            }
            g && e && (c = c.replace("{point.key}", "{point.key:" + e + "}"));
            return Ia(c, {
                point: a,
                series: b
            })
        }
    };
    var fa;
    $a = y.documentElement.ontouchstart !== u;
    var Wa = Q.Pointer =
        function (a, b) {
            this.init(a, b)
    };
    Wa.prototype = {
        init: function (a, b) {
            var c = b.chart,
                d = c.events,
                e = ca ? "" : c.zoomType,
                c = a.inverted,
                f;
            this.options = b;
            this.chart = a;
            this.zoomX = f = /x/.test(e);
            this.zoomY = e = /y/.test(e);
            this.zoomHor = f && !c || e && c;
            this.zoomVert = e && !c || f && c;
            this.runChartClick = d && !! d.click;
            this.pinchDown = [];
            this.lastValidTouch = {};
            if (Q.Tooltip && b.tooltip.enabled) a.tooltip = new Nb(a, b.tooltip);
            this.setDOMEvents()
        },
        normalize: function (a, b) {
            var c, d, a = a || G.event,
                a = Sb(a);
            if (!a.target) a.target = a.srcElement;
            d = a.touches ?
                a.touches.item(0) : a;
            if (!b) this.chartPosition = b = Rb(this.chart.container);
            d.pageX === u ? (c = t(a.x, a.clientX - b.left), d = a.y) : (c = d.pageX - b.left, d = d.pageY - b.top);
            return s(a, {
                chartX: v(c),
                chartY: v(d)
            })
        },
        getCoordinates: function (a) {
            var b = {
                xAxis: [],
                yAxis: []
            };
            p(this.chart.axes, function (c) {
                b[c.isXAxis ? "xAxis" : "yAxis"].push({
                    axis: c,
                    value: c.toValue(a[c.horiz ? "chartX" : "chartY"])
                })
            });
            return b
        },
        getIndex: function (a) {
            var b = this.chart;
            return b.inverted ? b.plotHeight + b.plotTop - a.chartY : a.chartX - b.plotLeft
        },
        runPointActions: function (a) {
            var b =
                this.chart,
                c = b.series,
                d = b.tooltip,
                e, f, g = b.hoverPoint,
                h = b.hoverSeries,
                i, j, k = b.chartWidth,
                l = this.getIndex(a);
            if (d && this.options.tooltip.shared && (!h || !h.noSharedTooltip)) {
                f = [];
                i = c.length;
                for (j = 0; j < i; j++)
                    if (c[j].visible && c[j].options.enableMouseTracking !== !1 && !c[j].noSharedTooltip && c[j].singularTooltips !== !0 && c[j].tooltipPoints.length && (e = c[j].tooltipPoints[l]) && e.series) e._dist = N(l - e.clientX), k = E(k, e._dist), f.push(e);
                for (i = f.length; i--;) f[i]._dist > k && f.splice(i, 1);
                if (f.length && f[0].clientX !== this.hoverX) d.refresh(f,
                    a), this.hoverX = f[0].clientX
            }
            if (h && h.tracker && (!d || !d.followPointer)) {
                if ((e = h.tooltipPoints[l]) && e !== g) e.onMouseOver(a)
            } else d && d.followPointer && !d.isHidden && (c = d.getAnchor([{}], a), d.updatePosition({
                plotX: c[0],
                plotY: c[1]
            })); if (d && !this._onDocumentMouseMove) this._onDocumentMouseMove = function (a) {
                if (r(fa)) Y[fa].pointer.onDocumentMouseMove(a)
            }, C(y, "mousemove", this._onDocumentMouseMove);
            p(b.axes, function (b) {
                b.drawCrosshair(a, o(e, g))
            })
        },
        reset: function (a) {
            var b = this.chart,
                c = b.hoverSeries,
                d = b.hoverPoint,
                e =
                    b.tooltip,
                f = e && e.shared ? b.hoverPoints : d;
            (a = a && e && f) && na(f)[0].plotX === u && (a = !1);
            if (a) e.refresh(f), d && d.setState(d.state, !0);
            else {
                if (d) d.onMouseOut();
                if (c) c.onMouseOut();
                e && e.hide();
                if (this._onDocumentMouseMove) U(y, "mousemove", this._onDocumentMouseMove), this._onDocumentMouseMove = null;
                p(b.axes, function (a) {
                    a.hideCrosshair()
                });
                this.hoverX = null
            }
        },
        scaleGroups: function (a, b) {
            var c = this.chart,
                d;
            p(c.series, function (e) {
                d = a || e.getPlotBox();
                e.xAxis && e.xAxis.zoomEnabled && (e.group.attr(d), e.markerGroup && (e.markerGroup.attr(d),
                    e.markerGroup.clip(b ? c.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(d))
            });
            c.clipRect.attr(b || c.clipBox)
        },
        dragStart: function (a) {
            var b = this.chart;
            b.mouseIsDown = a.type;
            b.cancelClick = !1;
            b.mouseDownX = this.mouseDownX = a.chartX;
            b.mouseDownY = this.mouseDownY = a.chartY
        },
        drag: function (a) {
            var b = this.chart,
                c = b.options.chart,
                d = a.chartX,
                e = a.chartY,
                f = this.zoomHor,
                g = this.zoomVert,
                h = b.plotLeft,
                i = b.plotTop,
                j = b.plotWidth,
                k = b.plotHeight,
                l, m = this.mouseDownX,
                n = this.mouseDownY;
            d < h ? d = h : d > h + j && (d = h + j);
            e < i ? e = i : e >
                i + k && (e = i + k);
            this.hasDragged = Math.sqrt(Math.pow(m - d, 2) + Math.pow(n - e, 2));
            if (this.hasDragged > 10) {
                l = b.isInsidePlot(m - h, n - i);
                if (b.hasCartesianSeries && (this.zoomX || this.zoomY) && l && !this.selectionMarker) this.selectionMarker = b.renderer.rect(h, i, f ? 1 : j, g ? 1 : k, 0).attr({
                    fill: c.selectionMarkerFill || "rgba(69,114,167,0.25)",
                    zIndex: 7
                }).add();
                this.selectionMarker && f && (d -= m, this.selectionMarker.attr({
                    width: N(d),
                    x: (d > 0 ? 0 : d) + m
                }));
                this.selectionMarker && g && (d = e - n, this.selectionMarker.attr({
                    height: N(d),
                    y: (d > 0 ? 0 : d) + n
                }));
                l && !this.selectionMarker && c.panning && b.pan(a, c.panning)
            }
        },
        drop: function (a) {
            var b = this.chart,
                c = this.hasPinched;
            if (this.selectionMarker) {
                var d = {
                    xAxis: [],
                    yAxis: [],
                    originalEvent: a.originalEvent || a
                }, e = this.selectionMarker,
                    f = e.x,
                    g = e.y,
                    h;
                if (this.hasDragged || c) p(b.axes, function (a) {
                    if (a.zoomEnabled) {
                        var b = a.horiz,
                            c = a.toValue(b ? f : g),
                            b = a.toValue(b ? f + e.width : g + e.height);
                        !isNaN(c) && !isNaN(b) && (d[a.coll].push({
                            axis: a,
                            min: E(c, b),
                            max: t(c, b)
                        }), h = !0)
                    }
                }), h && I(b, "selection", d, function (a) {
                    b.zoom(s(a, c ? {
                            animation: !1
                        } :
                        null))
                });
                this.selectionMarker = this.selectionMarker.destroy();
                c && this.scaleGroups()
            }
            if (b) D(b.container, {
                cursor: b._cursor
            }), b.cancelClick = this.hasDragged > 10, b.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = []
        },
        onContainerMouseDown: function (a) {
            a = this.normalize(a);
            a.preventDefault && a.preventDefault();
            this.dragStart(a)
        },
        onDocumentMouseUp: function (a) {
            r(fa) && Y[fa].pointer.drop(a)
        },
        onDocumentMouseMove: function (a) {
            var b = this.chart,
                c = this.chartPosition,
                d = b.hoverSeries,
                a = this.normalize(a, c);
            c &&
                d && !this.inClass(a.target, "highcharts-tracker") && !b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) && this.reset()
        },
        onContainerMouseLeave: function () {
            var a = Y[fa];
            if (a) a.pointer.reset(), a.pointer.chartPosition = null;
            fa = null
        },
        onContainerMouseMove: function (a) {
            var b = this.chart;
            fa = b.index;
            a = this.normalize(a);
            b.mouseIsDown === "mousedown" && this.drag(a);
            (this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop)) && !b.openMenu && this.runPointActions(a)
        },
        inClass: function (a,
            b) {
            for (var c; a;) {
                if (c = z(a, "class"))
                    if (c.indexOf(b) !== -1) return !0;
                    else if (c.indexOf("highcharts-container") !== -1) return !1;
                a = a.parentNode
            }
        },
        onTrackerMouseOut: function (a) {
            var b = this.chart.hoverSeries,
                c = (a = a.relatedTarget || a.toElement) && a.point && a.point.series;
            if (b && !b.options.stickyTracking && !this.inClass(a, "highcharts-tooltip") && c !== b) b.onMouseOut()
        },
        onContainerClick: function (a) {
            var b = this.chart,
                c = b.hoverPoint,
                d = b.plotLeft,
                e = b.plotTop,
                f = b.inverted,
                g, h, i, a = this.normalize(a);
            a.cancelBubble = !0;
            if (!b.cancelClick) c &&
                this.inClass(a.target, "highcharts-tracker") ? (g = this.chartPosition, h = c.plotX, i = c.plotY, s(c, {
                    pageX: g.left + d + (f ? b.plotWidth - i : h),
                    pageY: g.top + e + (f ? b.plotHeight - h : i)
                }), I(c.series, "click", s(a, {
                    point: c
                })), b.hoverPoint && c.firePointEvent("click", a)) : (s(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - e) && I(b, "click", a))
        },
        setDOMEvents: function () {
            var a = this,
                b = a.chart.container;
            b.onmousedown = function (b) {
                a.onContainerMouseDown(b)
            };
            b.onmousemove = function (b) {
                a.onContainerMouseMove(b)
            };
            b.onclick = function (b) {
                a.onContainerClick(b)
            };
            C(b, "mouseleave", a.onContainerMouseLeave);
            C(y, "mouseup", a.onDocumentMouseUp);
            if ($a) b.ontouchstart = function (b) {
                a.onContainerTouchStart(b)
            }, b.ontouchmove = function (b) {
                a.onContainerTouchMove(b)
            }, C(y, "touchend", a.onDocumentTouchEnd)
        },
        destroy: function () {
            var a;
            U(this.chart.container, "mouseleave", this.onContainerMouseLeave);
            U(y, "mouseup", this.onDocumentMouseUp);
            U(y, "touchend", this.onDocumentTouchEnd);
            clearInterval(this.tooltipTimeout);
            for (a in this) this[a] = null
        }
    };
    s(Q.Pointer.prototype, {
        pinchTranslate: function (a,
            b, c, d, e, f, g, h) {
            a && this.pinchTranslateDirection(!0, c, d, e, f, g, h);
            b && this.pinchTranslateDirection(!1, c, d, e, f, g, h)
        },
        pinchTranslateDirection: function (a, b, c, d, e, f, g, h) {
            var i = this.chart,
                j = a ? "x" : "y",
                k = a ? "X" : "Y",
                l = "chart" + k,
                m = a ? "width" : "height",
                n = i["plot" + (a ? "Left" : "Top")],
                q, o, p = h || 1,
                t = i.inverted,
                r = i.bounds[a ? "h" : "v"],
                v = b.length === 1,
                s = b[0][l],
                u = c[0][l],
                w = !v && b[1][l],
                x = !v && c[1][l],
                y, c = function () {
                    !v && N(s - w) > 20 && (p = h || N(u - x) / N(s - w));
                    o = (n - u) / p + s;
                    q = i["plot" + (a ? "Width" : "Height")] / p
                };
            c();
            b = o;
            b < r.min ? (b = r.min, y = !0) :
                b + q > r.max && (b = r.max - q, y = !0);
            y ? (u -= 0.8 * (u - g[j][0]), v || (x -= 0.8 * (x - g[j][1])), c()) : g[j] = [u, x];
            t || (f[j] = o - n, f[m] = q);
            f = t ? 1 / p : p;
            e[m] = q;
            e[j] = b;
            d[t ? a ? "scaleY" : "scaleX" : "scale" + k] = p;
            d["translate" + k] = f * n + (u - f * s)
        },
        pinch: function (a) {
            var b = this,
                c = b.chart,
                d = b.pinchDown,
                e = c.tooltip && c.tooltip.options.followTouchMove,
                f = a.touches,
                g = f.length,
                h = b.lastValidTouch,
                i = b.zoomHor || b.pinchHor,
                j = b.zoomVert || b.pinchVert,
                k = i || j,
                l = b.selectionMarker,
                m = {}, n = g === 1 && (b.inClass(a.target, "highcharts-tracker") && c.runTrackerClick || c.runChartClick),
                q = {};
            (k || e) && !n && a.preventDefault();
            Ua(f, function (a) {
                return b.normalize(a)
            });
            if (a.type === "touchstart") p(f, function (a, b) {
                d[b] = {
                    chartX: a.chartX,
                    chartY: a.chartY
                }
            }), h.x = [d[0].chartX, d[1] && d[1].chartX], h.y = [d[0].chartY, d[1] && d[1].chartY], p(c.axes, function (a) {
                if (a.zoomEnabled) {
                    var b = c.bounds[a.horiz ? "h" : "v"],
                        d = a.minPixelPadding,
                        e = a.toPixels(a.dataMin),
                        f = a.toPixels(a.dataMax),
                        g = E(e, f),
                        e = t(e, f);
                    b.min = E(a.pos, g - d);
                    b.max = t(a.pos + a.len, e + d)
                }
            });
            else if (d.length) {
                if (!l) b.selectionMarker = l = s({
                    destroy: Ea
                }, c.plotBox);
                b.pinchTranslate(i, j, d, f, m, l, q, h);
                b.hasPinched = k;
                b.scaleGroups(m, q);
                !k && e && g === 1 && this.runPointActions(b.normalize(a))
            }
        },
        onContainerTouchStart: function (a) {
            var b = this.chart;
            fa = b.index;
            a.touches.length === 1 ? (a = this.normalize(a), b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) ? (this.runPointActions(a), this.pinch(a)) : this.reset()) : a.touches.length === 2 && this.pinch(a)
        },
        onContainerTouchMove: function (a) {
            (a.touches.length === 1 || a.touches.length === 2) && this.pinch(a)
        },
        onDocumentTouchEnd: function (a) {
            r(fa) &&
                Y[fa].pointer.drop(a)
        }
    });
    if (G.PointerEvent || G.MSPointerEvent) {
        var ra = {}, zb = !! G.PointerEvent,
            Wb = function () {
                var a, b = [];
                b.item = function (a) {
                    return this[a]
                };
                for (a in ra) ra.hasOwnProperty(a) && b.push({
                    pageX: ra[a].pageX,
                    pageY: ra[a].pageY,
                    target: ra[a].target
                });
                return b
            }, Ab = function (a, b, c, d) {
                a = a.originalEvent || a;
                if ((a.pointerType === "touch" || a.pointerType === a.MSPOINTER_TYPE_TOUCH) && Y[fa]) d(a), d = Y[fa].pointer, d[b]({
                    type: c,
                    target: a.currentTarget,
                    preventDefault: Ea,
                    touches: Wb()
                })
            };
        s(Wa.prototype, {
            onContainerPointerDown: function (a) {
                Ab(a,
                    "onContainerTouchStart", "touchstart", function (a) {
                        ra[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY,
                            target: a.currentTarget
                        }
                    })
            },
            onContainerPointerMove: function (a) {
                Ab(a, "onContainerTouchMove", "touchmove", function (a) {
                    ra[a.pointerId] = {
                        pageX: a.pageX,
                        pageY: a.pageY
                    };
                    if (!ra[a.pointerId].target) ra[a.pointerId].target = a.currentTarget
                })
            },
            onDocumentPointerUp: function (a) {
                Ab(a, "onContainerTouchEnd", "touchend", function (a) {
                    delete ra[a.pointerId]
                })
            },
            batchMSEvents: function (a) {
                a(this.chart.container, zb ? "pointerdown" : "MSPointerDown",
                    this.onContainerPointerDown);
                a(this.chart.container, zb ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                a(y, zb ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
            }
        });
        Ma(Wa.prototype, "init", function (a, b, c) {
            D(b.container, {
                "-ms-touch-action": O,
                "touch-action": O
            });
            a.call(this, b, c)
        });
        Ma(Wa.prototype, "setDOMEvents", function (a) {
            a.apply(this);
            this.batchMSEvents(C)
        });
        Ma(Wa.prototype, "destroy", function (a) {
            this.batchMSEvents(U);
            a.call(this)
        })
    }
    var lb = Q.Legend = function (a, b) {
        this.init(a, b)
    };
    lb.prototype = {
        init: function (a, b) {
            var c = this,
                d = b.itemStyle,
                e = o(b.padding, 8),
                f = b.itemMarginTop || 0;
            this.options = b;
            if (b.enabled) c.baseline = x(d.fontSize) + 3 + f, c.itemStyle = d, c.itemHiddenStyle = w(d, b.itemHiddenStyle), c.itemMarginTop = f, c.padding = e, c.initialItemX = e, c.initialItemY = e - 5, c.maxItemWidth = 0, c.chart = a, c.itemHeight = 0, c.lastLineHeight = 0, c.symbolWidth = o(b.symbolWidth, 16), c.pages = [], c.render(), C(c.chart, "endResize", function () {
                c.positionCheckboxes()
            })
        },
        colorizeItem: function (a, b) {
            var c = this.options,
                d = a.legendItem,
                e = a.legendLine,
                f = a.legendSymbol,
                g = this.itemHiddenStyle.color,
                c = b ? c.itemStyle.color : g,
                h = b ? a.legendColor || a.color || "#CCC" : g,
                g = a.options && a.options.marker,
                i = {
                    stroke: h,
                    fill: h
                }, j;
            d && d.css({
                fill: c,
                color: c
            });
            e && e.attr({
                stroke: h
            });
            if (f) {
                if (g && f.isMarker)
                    for (j in g = a.convertAttribs(g), g) d = g[j], d !== u && (i[j] = d);
                f.attr(i)
            }
        },
        positionItem: function (a) {
            var b = this.options,
                c = b.symbolPadding,
                b = !b.rtl,
                d = a._legendItemPos,
                e = d[0],
                d = d[1],
                f = a.checkbox;
            a.legendGroup && a.legendGroup.translate(b ? e : this.legendWidth - e - 2 * c - 4, d);
            if (f) f.x = e, f.y =
                d
        },
        destroyItem: function (a) {
            var b = a.checkbox;
            p(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) {
                a[b] && (a[b] = a[b].destroy())
            });
            b && Pa(a.checkbox)
        },
        destroy: function () {
            var a = this.group,
                b = this.box;
            if (b) this.box = b.destroy();
            if (a) this.group = a.destroy()
        },
        positionCheckboxes: function (a) {
            var b = this.group.alignAttr,
                c, d = this.clipHeight || this.legendHeight;
            if (b) c = b.translateY, p(this.allItems, function (e) {
                var f = e.checkbox,
                    g;
                f && (g = c + f.y + (a || 0) + 3, D(f, {
                    left: b.translateX + e.legendItemWidth + f.x - 20 + "px",
                    top: g + "px",
                    display: g > c - 6 && g < c + d - 6 ? "" : O
                }))
            })
        },
        renderTitle: function () {
            var a = this.padding,
                b = this.options.title,
                c = 0;
            if (b.text) {
                if (!this.title) this.title = this.chart.renderer.label(b.text, a - 3, a - 4, null, null, null, null, null, "legend-title").attr({
                    zIndex: 1
                }).css(b.style).add(this.group);
                a = this.title.getBBox();
                c = a.height;
                this.offsetWidth = a.width;
                this.contentGroup.attr({
                    translateY: c
                })
            }
            this.titleHeight = c
        },
        renderItem: function (a) {
            var b = this.chart,
                c = b.renderer,
                d = this.options,
                e = d.layout === "horizontal",
                f = this.symbolWidth,
                g = d.symbolPadding,
                h = this.itemStyle,
                i = this.itemHiddenStyle,
                j = this.padding,
                k = e ? o(d.itemDistance, 8) : 0,
                l = !d.rtl,
                m = d.width,
                n = d.itemMarginBottom || 0,
                q = this.itemMarginTop,
                p = this.initialItemX,
                r = a.legendItem,
                s = a.series && a.series.drawLegendSymbol ? a.series : a,
                u = s.options,
                u = this.createCheckboxForItem && u && u.showCheckbox,
                x = d.useHTML;
            if (!r) a.legendGroup = c.g("legend-item").attr({
                zIndex: 1
            }).add(this.scrollGroup), s.drawLegendSymbol(this, a), a.legendItem = r = c.text(d.labelFormat ? Ia(d.labelFormat, a) : d.labelFormatter.call(a),
                l ? f + g : -g, this.baseline, x).css(w(a.visible ? h : i)).attr({
                align: l ? "left" : "right",
                zIndex: 2
            }).add(a.legendGroup), this.setItemEvents && this.setItemEvents(a, r, x, h, i), this.colorizeItem(a, a.visible), u && this.createCheckboxForItem(a);
            c = r.getBBox();
            f = a.legendItemWidth = d.itemWidth || a.legendItemWidth || f + g + c.width + k + (u ? 20 : 0);
            this.itemHeight = g = v(a.legendItemHeight || c.height);
            if (e && this.itemX - p + f > (m || b.chartWidth - 2 * j - p - d.x)) this.itemX = p, this.itemY += q + this.lastLineHeight + n, this.lastLineHeight = 0;
            this.maxItemWidth = t(this.maxItemWidth,
                f);
            this.lastItemY = q + this.itemY + n;
            this.lastLineHeight = t(g, this.lastLineHeight);
            a._legendItemPos = [this.itemX, this.itemY];
            e ? this.itemX += f : (this.itemY += q + g + n, this.lastLineHeight = g);
            this.offsetWidth = m || t((e ? this.itemX - p - k : f) + j, this.offsetWidth)
        },
        getAllItems: function () {
            var a = [];
            p(this.chart.series, function (b) {
                var c = b.options;
                if (o(c.showInLegend, !r(c.linkedTo) ? u : !1, !0)) a = a.concat(b.legendItems || (c.legendType === "point" ? b.data : b))
            });
            return a
        },
        render: function () {
            var a = this,
                b = a.chart,
                c = b.renderer,
                d = a.group,
                e,
                f, g, h, i = a.box,
                j = a.options,
                k = a.padding,
                l = j.borderWidth,
                m = j.backgroundColor;
            a.itemX = a.initialItemX;
            a.itemY = a.initialItemY;
            a.offsetWidth = 0;
            a.lastItemY = 0;
            if (!d) a.group = d = c.g("legend").attr({
                zIndex: 7
            }).add(), a.contentGroup = c.g().attr({
                zIndex: 1
            }).add(d), a.scrollGroup = c.g().add(a.contentGroup);
            a.renderTitle();
            e = a.getAllItems();
            ob(e, function (a, b) {
                return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
            });
            j.reversed && e.reverse();
            a.allItems = e;
            a.display = f = !! e.length;
            p(e, function (b) {
                a.renderItem(b)
            });
            g = j.width || a.offsetWidth;
            h = a.lastItemY + a.lastLineHeight + a.titleHeight;
            h = a.handleOverflow(h);
            if (l || m) {
                g += k;
                h += k;
                if (i) {
                    if (g > 0 && h > 0) i[i.isNew ? "attr" : "animate"](i.crisp({
                        width: g,
                        height: h
                    })), i.isNew = !1
                } else a.box = i = c.rect(0, 0, g, h, j.borderRadius, l || 0).attr({
                    stroke: j.borderColor,
                    "stroke-width": l || 0,
                    fill: m || O
                }).add(d).shadow(j.shadow), i.isNew = !0;
                i[f ? "show" : "hide"]()
            }
            a.legendWidth = g;
            a.legendHeight = h;
            p(e, function (b) {
                a.positionItem(b)
            });
            f && d.align(s({
                width: g,
                height: h
            }, j), !0, "spacingBox");
            b.isResizing || this.positionCheckboxes()
        },
        handleOverflow: function (a) {
            var b = this,
                c = this.chart,
                d = c.renderer,
                e = this.options,
                f = e.y,
                f = c.spacingBox.height + (e.verticalAlign === "top" ? -f : f) - this.padding,
                g = e.maxHeight,
                h, i = this.clipRect,
                j = e.navigation,
                k = o(j.animation, !0),
                l = j.arrowSize || 12,
                m = this.nav,
                n = this.pages,
                q, t = this.allItems;
            e.layout === "horizontal" && (f /= 2);
            g && (f = E(f, g));
            n.length = 0;
            if (a > f && !e.useHTML) {
                this.clipHeight = h = f - 20 - this.titleHeight - this.padding;
                this.currentPage = o(this.currentPage, 1);
                this.fullHeight = a;
                p(t, function (a, b) {
                    var c = a._legendItemPos[1],
                        d = v(a.legendItem.getBBox().height),
                        e = n.length;
                    if (!e || c - n[e - 1] > h && (q || c) !== n[e - 1]) n.push(q || c), e++;
                    b === t.length - 1 && c + d - n[e - 1] > h && n.push(c);
                    c !== q && (q = c)
                });
                if (!i) i = b.clipRect = d.clipRect(0, this.padding, 9999, 0), b.contentGroup.clip(i);
                i.attr({
                    height: h
                });
                if (!m) this.nav = m = d.g().attr({
                    zIndex: 1
                }).add(this.group), this.up = d.symbol("triangle", 0, 0, l, l).on("click", function () {
                    b.scroll(-1, k)
                }).add(m), this.pager = d.text("", 15, 10).css(j.style).add(m), this.down = d.symbol("triangle-down", 0, 0, l, l).on("click", function () {
                    b.scroll(1,
                        k)
                }).add(m);
                b.scroll(0);
                a = f
            } else if (m) i.attr({
                height: c.chartHeight
            }), m.hide(), this.scrollGroup.attr({
                translateY: 1
            }), this.clipHeight = 0;
            return a
        },
        scroll: function (a, b) {
            var c = this.pages,
                d = c.length,
                e = this.currentPage + a,
                f = this.clipHeight,
                g = this.options.navigation,
                h = g.activeColor,
                g = g.inactiveColor,
                i = this.pager,
                j = this.padding;
            e > d && (e = d);
            if (e > 0) b !== u && Qa(b, this.chart), this.nav.attr({
                translateX: j,
                translateY: f + this.padding + 7 + this.titleHeight,
                visibility: "visible"
            }), this.up.attr({
                fill: e === 1 ? g : h
            }).css({
                cursor: e ===
                    1 ? "default" : "pointer"
            }), i.attr({
                text: e + "/" + d
            }), this.down.attr({
                x: 18 + this.pager.getBBox().width,
                fill: e === d ? g : h
            }).css({
                cursor: e === d ? "default" : "pointer"
            }), c = -c[e - 1] + this.initialItemY, this.scrollGroup.animate({
                translateY: c
            }), this.currentPage = e, this.positionCheckboxes(c)
        }
    };
    F = Q.LegendSymbolMixin = {
        drawRectangle: function (a, b) {
            var c = a.options.symbolHeight || 12;
            b.legendSymbol = this.chart.renderer.rect(0, a.baseline - 5 - c / 2, a.symbolWidth, c, o(a.options.symbolRadius, 2)).attr({
                zIndex: 3
            }).add(b.legendGroup)
        },
        drawLineMarker: function (a) {
            var b =
                this.options,
                c = b.marker,
                d;
            d = a.symbolWidth;
            var e = this.chart.renderer,
                f = this.legendGroup,
                a = a.baseline - v(e.fontMetrics(a.options.itemStyle.fontSize).b * 0.3),
                g;
            if (b.lineWidth) {
                g = {
                    "stroke-width": b.lineWidth
                };
                if (b.dashStyle) g.dashstyle = b.dashStyle;
                this.legendLine = e.path(["M", 0, a, "L", d, a]).attr(g).add(f)
            }
            if (c && c.enabled) b = c.radius, this.legendSymbol = d = e.symbol(this.symbol, d / 2 - b, a - b, 2 * b, 2 * b).add(f), d.isMarker = !0
        }
    };
    (/Trident\/7\.0/.test(ua) || Ta) && Ma(lb.prototype, "positionItem", function (a, b) {
        var c = this,
            d = function () {
                b._legendItemPos &&
                    a.call(c, b)
            };
        c.chart.renderer.forExport ? d() : setTimeout(d)
    });
    Ya.prototype = {
        init: function (a, b) {
            var c, d = a.series;
            a.series = null;
            c = w(L, a);
            c.series = a.series = d;
            this.userOptions = a;
            d = c.chart;
            this.margin = this.splashArray("margin", d);
            this.spacing = this.splashArray("spacing", d);
            var e = d.events;
            this.bounds = {
                h: {},
                v: {}
            };
            this.callback = b;
            this.isResizing = 0;
            this.options = c;
            this.axes = [];
            this.series = [];
            this.hasCartesianSeries = d.showAxes;
            var f = this,
                g;
            f.index = Y.length;
            Y.push(f);
            d.reflow !== !1 && C(f, "load", function () {
                f.initReflow()
            });
            if (e)
                for (g in e) C(f, g, e[g]);
            f.xAxis = [];
            f.yAxis = [];
            f.animation = ca ? !1 : o(d.animation, !0);
            f.pointCount = 0;
            f.counters = new Bb;
            f.firstRender()
        },
        initSeries: function (a) {
            var b = this.options.chart;
            (b = J[a.type || b.type || b.defaultSeriesType]) || oa(17, !0);
            b = new b;
            b.init(this, a);
            return b
        },
        isInsidePlot: function (a, b, c) {
            var d = c ? b : a,
                a = c ? a : b;
            return d >= 0 && d <= this.plotWidth && a >= 0 && a <= this.plotHeight
        },
        adjustTickAmounts: function () {
            this.options.chart.alignTicks !== !1 && p(this.axes, function (a) {
                a.adjustTickAmount()
            });
            this.maxTicks =
                null
        },
        redraw: function (a) {
            var b = this.axes,
                c = this.series,
                d = this.pointer,
                e = this.legend,
                f = this.isDirtyLegend,
                g, h, i = this.isDirtyBox,
                j = c.length,
                k = j,
                l = this.renderer,
                m = l.isHidden(),
                n = [];
            Qa(a, this);
            m && this.cloneRenderTo();
            for (this.layOutTitles(); k--;)
                if (a = c[k], a.options.stacking && (g = !0, a.isDirty)) {
                    h = !0;
                    break
                }
            if (h)
                for (k = j; k--;)
                    if (a = c[k], a.options.stacking) a.isDirty = !0;
            p(c, function (a) {
                a.isDirty && a.options.legendType === "point" && (f = !0)
            });
            if (f && e.options.enabled) e.render(), this.isDirtyLegend = !1;
            g && this.getStacks();
            if (this.hasCartesianSeries) {
                if (!this.isResizing) this.maxTicks = null, p(b, function (a) {
                    a.setScale()
                });
                this.adjustTickAmounts();
                this.getMargins();
                p(b, function (a) {
                    a.isDirty && (i = !0)
                });
                p(b, function (a) {
                    if (a.isDirtyExtremes) a.isDirtyExtremes = !1, n.push(function () {
                        I(a, "afterSetExtremes", s(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    });
                    (i || g) && a.redraw()
                })
            }
            i && this.drawChartBox();
            p(c, function (a) {
                a.isDirty && a.visible && (!a.isCartesian || a.xAxis) && a.redraw()
            });
            d && d.reset(!0);
            l.draw();
            I(this, "redraw");
            m && this.cloneRenderTo(!0);
            p(n, function (a) {
                a.call()
            })
        },
        get: function (a) {
            var b = this.axes,
                c = this.series,
                d, e;
            for (d = 0; d < b.length; d++)
                if (b[d].options.id === a) return b[d];
            for (d = 0; d < c.length; d++)
                if (c[d].options.id === a) return c[d];
            for (d = 0; d < c.length; d++) {
                e = c[d].points || [];
                for (b = 0; b < e.length; b++)
                    if (e[b].id === a) return e[b]
            }
            return null
        },
        getAxes: function () {
            var a = this,
                b = this.options,
                c = b.xAxis = na(b.xAxis || {}),
                b = b.yAxis = na(b.yAxis || {});
            p(c, function (a, b) {
                a.index = b;
                a.isX = !0
            });
            p(b, function (a, b) {
                a.index = b
            });
            c = c.concat(b);
            p(c, function (b) {
                new ka(a,
                    b)
            });
            a.adjustTickAmounts()
        },
        getSelectedPoints: function () {
            var a = [];
            p(this.series, function (b) {
                a = a.concat(vb(b.points || [], function (a) {
                    return a.selected
                }))
            });
            return a
        },
        getSelectedSeries: function () {
            return vb(this.series, function (a) {
                return a.selected
            })
        },
        getStacks: function () {
            var a = this;
            p(a.yAxis, function (a) {
                if (a.stacks && a.hasVisibleSeries) a.oldStacks = a.stacks
            });
            p(a.series, function (b) {
                if (b.options.stacking && (b.visible === !0 || a.options.chart.ignoreHiddenSeries === !1)) b.stackKey = b.type + o(b.options.stack, "")
            })
        },
        setTitle: function (a, b, c) {
            var g;
            var d = this,
                e = d.options,
                f;
            f = e.title = w(e.title, a);
            g = e.subtitle = w(e.subtitle, b), e = g;
            p([
                ["title", a, f],
                ["subtitle", b, e]
            ], function (a) {
                var b = a[0],
                    c = d[b],
                    e = a[1],
                    a = a[2];
                c && e && (d[b] = c = c.destroy());
                a && a.text && !c && (d[b] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
                    align: a.align,
                    "class": "highcharts-" + b,
                    zIndex: a.zIndex || 4
                }).css(a.style).add())
            });
            d.layOutTitles(c)
        },
        layOutTitles: function (a) {
            var b = 0,
                c = this.title,
                d = this.subtitle,
                e = this.options,
                f = e.title,
                e = e.subtitle,
                g = this.spacingBox.width -
                    44;
            if (c && (c.css({
                width: (f.width || g) + "px"
            }).align(s({
                y: 15
            }, f), !1, "spacingBox"), !f.floating && !f.verticalAlign)) b = c.getBBox().height, b >= 18 && b <= 25 && (b = 15);
            d && (d.css({
                width: (e.width || g) + "px"
            }).align(s({
                y: b + f.margin
            }, e), !1, "spacingBox"), !e.floating && !e.verticalAlign && (b = Ka(b + d.getBBox().height)));
            c = this.titleOffset !== b;
            this.titleOffset = b;
            if (!this.isDirtyBox && c) this.isDirtyBox = c, this.hasRendered && o(a, !0) && this.isDirtyBox && this.redraw()
        },
        getChartSize: function () {
            var a = this.options.chart,
                b = a.width,
                a = a.height,
                c = this.renderToClone || this.renderTo;
            if (!r(b)) this.containerWidth = ib(c, "width");
            if (!r(a)) this.containerHeight = ib(c, "height");
            this.chartWidth = t(0, b || this.containerWidth || 600);
            this.chartHeight = t(0, o(a, this.containerHeight > 19 ? this.containerHeight : 400))
        },
        cloneRenderTo: function (a) {
            var b = this.renderToClone,
                c = this.container;
            a ? b && (this.renderTo.appendChild(c), Pa(b), delete this.renderToClone) : (c && c.parentNode === this.renderTo && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0), D(b, {
                position: "absolute",
                top: "-9999px",
                display: "block"
            }), b.style.setProperty && b.style.setProperty("display", "block", "important"), y.body.appendChild(b), c && b.appendChild(c))
        },
        getContainer: function () {
            var a, b = this.options.chart,
                c, d, e;
            this.renderTo = a = b.renderTo;
            e = "highcharts-" + tb++;
            if (ga(a)) this.renderTo = a = y.getElementById(a);
            a || oa(13, !0);
            c = x(z(a, "data-highcharts-chart"));
            !isNaN(c) && Y[c] && Y[c].hasRendered && Y[c].destroy();
            z(a, "data-highcharts-chart", this.index);
            a.innerHTML = "";
            !b.skipClone && !a.offsetWidth &&
                this.cloneRenderTo();
            this.getChartSize();
            c = this.chartWidth;
            d = this.chartHeight;
            this.container = a = V(Ja, {
                className: "highcharts-container" + (b.className ? " " + b.className : ""),
                id: e
            }, s({
                position: "relative",
                overflow: "hidden",
                width: c + "px",
                height: d + "px",
                textAlign: "left",
                lineHeight: "normal",
                zIndex: 0,
                "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
            }, b.style), this.renderToClone || a);
            this._cursor = a.style.cursor;
            this.renderer = b.forExport ? new pa(a, c, d, b.style, !0) : new Za(a, c, d, b.style);
            ca && this.renderer.create(this, a, c,
                d)
        },
        getMargins: function () {
            var a = this.spacing,
                b, c = this.legend,
                d = this.margin,
                e = this.options.legend,
                f = o(e.margin, 10),
                g = e.x,
                h = e.y,
                i = e.align,
                j = e.verticalAlign,
                k = this.titleOffset;
            this.resetMargins();
            b = this.axisOffset;
            if (k && !r(d[0])) this.plotTop = t(this.plotTop, k + this.options.title.margin + a[0]);
            if (c.display && !e.floating)
                if (i === "right") {
                    if (!r(d[1])) this.marginRight = t(this.marginRight, c.legendWidth - g + f + a[1])
                } else if (i === "left") {
                if (!r(d[3])) this.plotLeft = t(this.plotLeft, c.legendWidth + g + f + a[3])
            } else if (j === "top") {
                if (!r(d[0])) this.plotTop =
                    t(this.plotTop, c.legendHeight + h + f + a[0])
            } else if (j === "bottom" && !r(d[2])) this.marginBottom = t(this.marginBottom, c.legendHeight - h + f + a[2]);
            this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin);
            this.extraTopMargin && (this.plotTop += this.extraTopMargin);
            this.hasCartesianSeries && p(this.axes, function (a) {
                a.getOffset()
            });
            r(d[3]) || (this.plotLeft += b[3]);
            r(d[0]) || (this.plotTop += b[0]);
            r(d[2]) || (this.marginBottom += b[2]);
            r(d[1]) || (this.marginRight += b[1]);
            this.setChartSize()
        },
        reflow: function (a) {
            var b = this,
                c = b.options.chart,
                d = b.renderTo,
                e = c.width || ib(d, "width"),
                f = c.height || ib(d, "height"),
                c = a ? a.target : G,
                d = function () {
                    if (b.container) b.setSize(e, f, !1), b.hasUserSize = null
                };
            if (!b.hasUserSize && e && f && (c === G || c === y)) {
                if (e !== b.containerWidth || f !== b.containerHeight) clearTimeout(b.reflowTimeout), a ? b.reflowTimeout = setTimeout(d, 100) : d();
                b.containerWidth = e;
                b.containerHeight = f
            }
        },
        initReflow: function () {
            var a = this,
                b = function (b) {
                    a.reflow(b)
                };
            C(G, "resize", b);
            C(a, "destroy", function () {
                U(G, "resize", b)
            })
        },
        setSize: function (a,
            b, c) {
            var d = this,
                e, f, g;
            d.isResizing += 1;
            g = function () {
                d && I(d, "endResize", null, function () {
                    d.isResizing -= 1
                })
            };
            Qa(c, d);
            d.oldChartHeight = d.chartHeight;
            d.oldChartWidth = d.chartWidth;
            if (r(a)) d.chartWidth = e = t(0, v(a)), d.hasUserSize = !! e;
            if (r(b)) d.chartHeight = f = t(0, v(b));
            (sa ? jb : D)(d.container, {
                width: e + "px",
                height: f + "px"
            }, sa);
            d.setChartSize(!0);
            d.renderer.setSize(e, f, c);
            d.maxTicks = null;
            p(d.axes, function (a) {
                a.isDirty = !0;
                a.setScale()
            });
            p(d.series, function (a) {
                a.isDirty = !0
            });
            d.isDirtyLegend = !0;
            d.isDirtyBox = !0;
            d.getMargins();
            d.redraw(c);
            d.oldChartHeight = null;
            I(d, "resize");
            sa === !1 ? g() : setTimeout(g, sa && sa.duration || 500)
        },
        setChartSize: function (a) {
            var b = this.inverted,
                c = this.renderer,
                d = this.chartWidth,
                e = this.chartHeight,
                f = this.options.chart,
                g = this.spacing,
                h = this.clipOffset,
                i, j, k, l;
            this.plotLeft = i = v(this.plotLeft);
            this.plotTop = j = v(this.plotTop);
            this.plotWidth = k = t(0, v(d - i - this.marginRight));
            this.plotHeight = l = t(0, v(e - j - this.marginBottom));
            this.plotSizeX = b ? l : k;
            this.plotSizeY = b ? k : l;
            this.plotBorderWidth = f.plotBorderWidth || 0;
            this.spacingBox =
                c.spacingBox = {
                    x: g[3],
                    y: g[0],
                    width: d - g[3] - g[1],
                    height: e - g[0] - g[2]
            };
            this.plotBox = c.plotBox = {
                x: i,
                y: j,
                width: k,
                height: l
            };
            d = 2 * S(this.plotBorderWidth / 2);
            b = Ka(t(d, h[3]) / 2);
            c = Ka(t(d, h[0]) / 2);
            this.clipBox = {
                x: b,
                y: c,
                width: S(this.plotSizeX - t(d, h[1]) / 2 - b),
                height: S(this.plotSizeY - t(d, h[2]) / 2 - c)
            };
            a || p(this.axes, function (a) {
                a.setAxisSize();
                a.setAxisTranslation()
            })
        },
        resetMargins: function () {
            var a = this.spacing,
                b = this.margin;
            this.plotTop = o(b[0], a[0]);
            this.marginRight = o(b[1], a[1]);
            this.marginBottom = o(b[2], a[2]);
            this.plotLeft =
                o(b[3], a[3]);
            this.axisOffset = [0, 0, 0, 0];
            this.clipOffset = [0, 0, 0, 0]
        },
        drawChartBox: function () {
            var a = this.options.chart,
                b = this.renderer,
                c = this.chartWidth,
                d = this.chartHeight,
                e = this.chartBackground,
                f = this.plotBackground,
                g = this.plotBorder,
                h = this.plotBGImage,
                i = a.borderWidth || 0,
                j = a.backgroundColor,
                k = a.plotBackgroundColor,
                l = a.plotBackgroundImage,
                m = a.plotBorderWidth || 0,
                n, q = this.plotLeft,
                o = this.plotTop,
                p = this.plotWidth,
                t = this.plotHeight,
                r = this.plotBox,
                s = this.clipRect,
                v = this.clipBox;
            n = i + (a.shadow ? 8 : 0);
            if (i || j)
                if (e) e.animate(e.crisp({
                    width: c -
                        n,
                    height: d - n
                }));
                else {
                    e = {
                        fill: j || O
                    };
                    if (i) e.stroke = a.borderColor, e["stroke-width"] = i;
                    this.chartBackground = b.rect(n / 2, n / 2, c - n, d - n, a.borderRadius, i).attr(e).addClass("highcharts-background").add().shadow(a.shadow)
                }
            if (k) f ? f.animate(r) : this.plotBackground = b.rect(q, o, p, t, 0).attr({
                fill: k
            }).add().shadow(a.plotShadow);
            if (l) h ? h.animate(r) : this.plotBGImage = b.image(l, q, o, p, t).add();
            s ? s.animate({
                width: v.width,
                height: v.height
            }) : this.clipRect = b.clipRect(v);
            if (m) g ? g.animate(g.crisp({
                x: q,
                y: o,
                width: p,
                height: t
            })) : this.plotBorder =
                b.rect(q, o, p, t, 0, -m).attr({
                    stroke: a.plotBorderColor,
                    "stroke-width": m,
                    fill: O,
                    zIndex: 1
                }).add();
            this.isDirtyBox = !1
        },
        propFromSeries: function () {
            var a = this,
                b = a.options.chart,
                c, d = a.options.series,
                e, f;
            p(["inverted", "angular", "polar"], function (g) {
                c = J[b.type || b.defaultSeriesType];
                f = a[g] || b[g] || c && c.prototype[g];
                for (e = d && d.length; !f && e--;)(c = J[d[e].type]) && c.prototype[g] && (f = !0);
                a[g] = f
            })
        },
        linkSeries: function () {
            var a = this,
                b = a.series;
            p(b, function (a) {
                a.linkedSeries.length = 0
            });
            p(b, function (b) {
                var d = b.options.linkedTo;
                if (ga(d) && (d = d === ":previous" ? a.series[b.index - 1] : a.get(d))) d.linkedSeries.push(b), b.linkedParent = d
            })
        },
        renderSeries: function () {
            p(this.series, function (a) {
                a.translate();
                a.setTooltipPoints && a.setTooltipPoints();
                a.render()
            })
        },
        render: function () {
            var a = this,
                b = a.axes,
                c = a.renderer,
                d = a.options,
                e = d.labels,
                f = d.credits,
                g;
            a.setTitle();
            a.legend = new lb(a, d.legend);
            a.getStacks();
            p(b, function (a) {
                a.setScale()
            });
            a.getMargins();
            a.maxTicks = null;
            p(b, function (a) {
                a.setTickPositions(!0);
                a.setMaxTicks()
            });
            a.adjustTickAmounts();
            a.getMargins();
            a.drawChartBox();
            a.hasCartesianSeries && p(b, function (a) {
                a.render()
            });
            if (!a.seriesGroup) a.seriesGroup = c.g("series-group").attr({
                zIndex: 3
            }).add();
            a.renderSeries();
            e.items && p(e.items, function (b) {
                var d = s(e.style, b.style),
                    f = x(d.left) + a.plotLeft,
                    g = x(d.top) + a.plotTop + 12;
                delete d.left;
                delete d.top;
                c.text(b.html, f, g).attr({
                    zIndex: 2
                }).css(d).add()
            });
            if (f.enabled && !a.credits) g = f.href, a.credits = c.text(f.text, 0, 0).on("click", function () {
                if (g) location.href = g
            }).attr({
                align: f.position.align,
                zIndex: 8
            }).css(f.style).add().align(f.position);
            a.hasRendered = !0
        },
        destroy: function () {
            var a = this,
                b = a.axes,
                c = a.series,
                d = a.container,
                e, f = d && d.parentNode;
            I(a, "destroy");
            Y[a.index] = u;
            a.renderTo.removeAttribute("data-highcharts-chart");
            U(a);
            for (e = b.length; e--;) b[e] = b[e].destroy();
            for (e = c.length; e--;) c[e] = c[e].destroy();
            p("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","), function (b) {
                var c = a[b];
                c && c.destroy && (a[b] = c.destroy())
            });
            if (d) d.innerHTML = "", U(d), f && Pa(d);
            for (e in a) delete a[e]
        },
        isReadyToRender: function () {
            var a = this;
            return !X && G == G.top && y.readyState !== "complete" || ca && !G.canvg ? (ca ? Mb.push(function () {
                a.firstRender()
            }, a.options.global.canvasToolsURL) : y.attachEvent("onreadystatechange", function () {
                y.detachEvent("onreadystatechange", a.firstRender);
                y.readyState === "complete" && a.firstRender()
            }), !1) : !0
        },
        firstRender: function () {
            var a = this,
                b = a.options,
                c = a.callback;
            if (a.isReadyToRender()) {
                a.getContainer();
                I(a, "init");
                a.resetMargins();
                a.setChartSize();
                a.propFromSeries();
                a.getAxes();
                p(b.series || [], function (b) {
                    a.initSeries(b)
                });
                a.linkSeries();
                I(a, "beforeRender");
                if (Q.Pointer) a.pointer = new Wa(a, b);
                a.render();
                a.renderer.draw();
                c && c.apply(a, [a]);
                p(a.callbacks, function (b) {
                    b.apply(a, [a])
                });
                a.cloneRenderTo(!0);
                I(a, "load")
            }
        },
        splashArray: function (a, b) {
            var c = b[a],
                c = $(c) ? c : [c, c, c, c];
            return [o(b[a + "Top"], c[0]), o(b[a + "Right"], c[1]), o(b[a + "Bottom"], c[2]), o(b[a + "Left"], c[3])]
        }
    };
    Ya.prototype.callbacks = [];
    da = Q.CenteredSeriesMixin = {
        getCenter: function () {
            var a =
                this.options,
                b = this.chart,
                c = 2 * (a.slicedOffset || 0),
                d, e = b.plotWidth - 2 * c,
                f = b.plotHeight - 2 * c,
                b = a.center,
                a = [o(b[0], "50%"), o(b[1], "50%"), a.size || "100%", a.innerSize || 0],
                g = E(e, f),
                h;
            return Ua(a, function (a, b) {
                h = /%$/.test(a);
                d = b < 2 || b === 2 && h;
                return (h ? [e, f, g, g][b] * x(a) / 100 : a) + (d ? c : 0)
            })
        }
    };
    var Fa = function () {};
    Fa.prototype = {
        init: function (a, b, c) {
            this.series = a;
            this.applyOptions(b, c);
            this.pointAttr = {};
            if (a.options.colorByPoint && (b = a.options.colors || a.chart.options.colors, this.color = this.color || b[a.colorCounter++], a.colorCounter ===
                b.length)) a.colorCounter = 0;
            a.chart.pointCount++;
            return this
        },
        applyOptions: function (a, b) {
            var c = this.series,
                d = c.pointValKey,
                a = Fa.prototype.optionsToObject.call(this, a);
            s(this, a);
            this.options = this.options ? s(this.options, a) : a;
            if (d) this.y = this[d];
            if (this.x === u && c) this.x = b === u ? c.autoIncrement() : b;
            return this
        },
        optionsToObject: function (a) {
            var b = {}, c = this.series,
                d = c.pointArrayMap || ["y"],
                e = d.length,
                f = 0,
                g = 0;
            if (typeof a === "number" || a === null) b[d[0]] = a;
            else if (La(a)) {
                if (a.length > e) {
                    c = typeof a[0];
                    if (c === "string") b.name =
                        a[0];
                    else if (c === "number") b.x = a[0];
                    f++
                }
                for (; g < e;) b[d[g++]] = a[f++]
            } else if (typeof a === "object") {
                b = a;
                if (a.dataLabels) c._hasPointLabels = !0;
                if (a.marker) c._hasPointMarkers = !0
            }
            return b
        },
        destroy: function () {
            var a = this.series.chart,
                b = a.hoverPoints,
                c;
            a.pointCount--;
            if (b && (this.setState(), ia(b, this), !b.length)) a.hoverPoints = null;
            if (this === a.hoverPoint) this.onMouseOut();
            if (this.graphic || this.dataLabel) U(this), this.destroyElements();
            this.legendItem && a.legend.destroyItem(this);
            for (c in this) this[c] = null
        },
        destroyElements: function () {
            for (var a =
                "graphic,dataLabel,dataLabelUpper,group,connector,shadowGroup".split(","), b, c = 6; c--;) b = a[c], this[b] && (this[b] = this[b].destroy())
        },
        getLabelConfig: function () {
            return {
                x: this.category,
                y: this.y,
                key: this.name || this.category,
                series: this.series,
                point: this,
                percentage: this.percentage,
                total: this.total || this.stackTotal
            }
        },
        tooltipFormatter: function (a) {
            var b = this.series,
                c = b.tooltipOptions,
                d = o(c.valueDecimals, ""),
                e = c.valuePrefix || "",
                f = c.valueSuffix || "";
            p(b.pointArrayMap || ["y"], function (b) {
                b = "{point." + b;
                if (e || f) a =
                    a.replace(b + "}", e + b + "}" + f);
                a = a.replace(b + "}", b + ":,." + d + "f}")
            });
            return Ia(a, {
                point: this,
                series: this.series
            })
        }
    };
    var M = function () {};
    M.prototype = {
        isCartesian: !0,
        type: "line",
        pointClass: Fa,
        sorted: !0,
        requireSorting: !0,
        pointAttrToOptions: {
            stroke: "lineColor",
            "stroke-width": "lineWidth",
            fill: "fillColor",
            r: "radius"
        },
        axisTypes: ["xAxis", "yAxis"],
        colorCounter: 0,
        parallelArrays: ["x", "y"],
        init: function (a, b) {
            var c = this,
                d, e, f = a.series,
                g = function (a, b) {
                    return o(a.options.index, a._i) - o(b.options.index, b._i)
                };
            c.chart = a;
            c.options = b = c.setOptions(b);
            c.linkedSeries = [];
            c.bindAxes();
            s(c, {
                name: b.name,
                state: "",
                pointAttr: {},
                visible: b.visible !== !1,
                selected: b.selected === !0
            });
            if (ca) b.animation = !1;
            e = b.events;
            for (d in e) C(c, d, e[d]);
            if (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
            c.getColor();
            c.getSymbol();
            p(c.parallelArrays, function (a) {
                c[a + "Data"] = []
            });
            c.setData(b.data, !1);
            if (c.isCartesian) a.hasCartesianSeries = !0;
            f.push(c);
            c._i = f.length - 1;
            ob(f, g);
            this.yAxis && ob(this.yAxis.series,
                g);
            p(f, function (a, b) {
                a.index = b;
                a.name = a.name || "Series " + (b + 1)
            })
        },
        bindAxes: function () {
            var a = this,
                b = a.options,
                c = a.chart,
                d;
            p(a.axisTypes || [], function (e) {
                p(c[e], function (c) {
                    d = c.options;
                    if (b[e] === d.index || b[e] !== u && b[e] === d.id || b[e] === u && d.index === 0) c.series.push(a), a[e] = c, c.isDirty = !0
                });
                !a[e] && a.optionalAxis !== e && oa(18, !0)
            })
        },
        updateParallelArrays: function (a, b) {
            var c = a.series,
                d = arguments;
            p(c.parallelArrays, typeof b === "number" ? function (d) {
                var f = d === "y" && c.toYData ? c.toYData(a) : a[d];
                c[d + "Data"][b] = f
            } : function (a) {
                Array.prototype[b].apply(c[a +
                    "Data"], Array.prototype.slice.call(d, 2))
            })
        },
        autoIncrement: function () {
            var a = this.options,
                b = this.xIncrement,
                b = o(b, a.pointStart, 0);
            this.pointInterval = o(this.pointInterval, a.pointInterval, 1);
            this.xIncrement = b + this.pointInterval;
            return b
        },
        getSegments: function () {
            var a = -1,
                b = [],
                c, d = this.points,
                e = d.length;
            if (e)
                if (this.options.connectNulls) {
                    for (c = e; c--;) d[c].y === null && d.splice(c, 1);
                    d.length && (b = [d])
                } else p(d, function (c, g) {
                    c.y === null ? (g > a + 1 && b.push(d.slice(a + 1, g)), a = g) : g === e - 1 && b.push(d.slice(a + 1, g + 1))
                });
            this.segments =
                b
        },
        setOptions: function (a) {
            var b = this.chart,
                c = b.options.plotOptions,
                b = b.userOptions || {}, d = b.plotOptions || {}, e = c[this.type];
            this.userOptions = a;
            c = w(e, c.series, a);
            this.tooltipOptions = w(L.tooltip, L.plotOptions[this.type].tooltip, b.tooltip, d.series && d.series.tooltip, d[this.type] && d[this.type].tooltip, a.tooltip);
            e.marker === null && delete c.marker;
            return c
        },
        getColor: function () {
            var a = this.options,
                b = this.userOptions,
                c = this.chart.options.colors,
                d = this.chart.counters,
                e;
            e = a.color || Z[this.type].color;
            if (!e && !a.colorByPoint) r(b._colorIndex) ?
                a = b._colorIndex : (b._colorIndex = d.color, a = d.color++), e = c[a];
            this.color = e;
            d.wrapColor(c.length)
        },
        getSymbol: function () {
            var a = this.userOptions,
                b = this.options.marker,
                c = this.chart,
                d = c.options.symbols,
                c = c.counters;
            this.symbol = b.symbol;
            if (!this.symbol) r(a._symbolIndex) ? a = a._symbolIndex : (a._symbolIndex = c.symbol, a = c.symbol++), this.symbol = d[a];
            if (/^url/.test(this.symbol)) b.radius = 0;
            c.wrapSymbol(d.length)
        },
        drawLegendSymbol: F.drawLineMarker,
        setData: function (a, b, c, d) {
            var e = this,
                f = e.points,
                g = f && f.length || 0,
                h, i =
                    e.options,
                j = e.chart,
                k = null,
                l = e.xAxis,
                m = l && !! l.categories,
                n = e.tooltipPoints,
                q = i.turboThreshold,
                t = this.xData,
                r = this.yData,
                s = (h = e.pointArrayMap) && h.length,
                a = a || [];
            h = a.length;
            b = o(b, !0);
            if (d !== !1 && h && g === h && !e.cropped && !e.hasGroupedData) p(a, function (a, b) {
                f[b].update(a, !1)
            });
            else {
                e.xIncrement = null;
                e.pointRange = m ? 1 : i.pointRange;
                e.colorCounter = 0;
                p(this.parallelArrays, function (a) {
                    e[a + "Data"].length = 0
                });
                if (q && h > q) {
                    for (c = 0; k === null && c < h;) k = a[c], c++;
                    if (ya(k)) {
                        m = o(i.pointStart, 0);
                        i = o(i.pointInterval, 1);
                        for (c =
                            0; c < h; c++) t[c] = m, r[c] = a[c], m += i;
                        e.xIncrement = m
                    } else if (La(k))
                        if (s)
                            for (c = 0; c < h; c++) i = a[c], t[c] = i[0], r[c] = i.slice(1, s + 1);
                        else
                            for (c = 0; c < h; c++) i = a[c], t[c] = i[0], r[c] = i[1];
                        else oa(12)
                } else
                    for (c = 0; c < h; c++)
                        if (a[c] !== u && (i = {
                            series: e
                        }, e.pointClass.prototype.applyOptions.apply(i, [a[c]]), e.updateParallelArrays(i, c), m && i.name)) l.names[i.x] = i.name; ga(r[0]) && oa(14, !0);
                e.data = [];
                e.options.data = a;
                for (c = g; c--;) f[c] && f[c].destroy && f[c].destroy();
                if (n) n.length = 0;
                if (l) l.minRange = l.userMinRange;
                e.isDirty = e.isDirtyData =
                    j.isDirtyBox = !0;
                c = !1
            }
            b && j.redraw(c)
        },
        processData: function (a) {
            var b = this.xData,
                c = this.yData,
                d = b.length,
                e;
            e = 0;
            var f, g, h = this.xAxis,
                i = this.options,
                j = i.cropThreshold,
                k = this.isCartesian;
            if (k && !this.isDirty && !h.isDirty && !this.yAxis.isDirty && !a) return !1;
            if (k && this.sorted && (!j || d > j || this.forceCrop))
                if (a = h.min, h = h.max, b[d - 1] < a || b[0] > h) b = [], c = [];
                else if (b[0] < a || b[d - 1] > h) e = this.cropData(this.xData, this.yData, a, h), b = e.xData, c = e.yData, e = e.start, f = !0;
            for (h = b.length - 1; h >= 0; h--) d = b[h] - b[h - 1], d > 0 && (g === u || d < g) ? g =
                d : d < 0 && this.requireSorting && oa(15);
            this.cropped = f;
            this.cropStart = e;
            this.processedXData = b;
            this.processedYData = c;
            if (i.pointRange === null) this.pointRange = g || 1;
            this.closestPointRange = g
        },
        cropData: function (a, b, c, d) {
            var e = a.length,
                f = 0,
                g = e,
                h = o(this.cropShoulder, 1),
                i;
            for (i = 0; i < e; i++)
                if (a[i] >= c) {
                    f = t(0, i - h);
                    break
                }
            for (; i < e; i++)
                if (a[i] > d) {
                    g = i + h;
                    break
                }
            return {
                xData: a.slice(f, g),
                yData: b.slice(f, g),
                start: f,
                end: g
            }
        },
        generatePoints: function () {
            var a = this.options.data,
                b = this.data,
                c, d = this.processedXData,
                e = this.processedYData,
                f = this.pointClass,
                g = d.length,
                h = this.cropStart || 0,
                i, j = this.hasGroupedData,
                k, l = [],
                m;
            if (!b && !j) b = [], b.length = a.length, b = this.data = b;
            for (m = 0; m < g; m++) i = h + m, j ? l[m] = (new f).init(this, [d[m]].concat(na(e[m]))) : (b[i] ? k = b[i] : a[i] !== u && (b[i] = k = (new f).init(this, a[i], d[m])), l[m] = k);
            if (b && (g !== (c = b.length) || j))
                for (m = 0; m < c; m++)
                    if (m === h && !j && (m += g), b[m]) b[m].destroyElements(), b[m].plotX = u;
            this.data = b;
            this.points = l
        },
        getExtremes: function (a) {
            var b = this.yAxis,
                c = this.processedXData,
                d, e = [],
                f = 0;
            d = this.xAxis.getExtremes();
            var g = d.min,
                h = d.max,
                i, j, k, l, a = a || this.stackedYData || this.processedYData;
            d = a.length;
            for (l = 0; l < d; l++)
                if (j = c[l], k = a[l], i = k !== null && k !== u && (!b.isLog || k.length || k > 0), j = this.getExtremesFromAll || this.cropped || (c[l + 1] || j) >= g && (c[l - 1] || j) <= h, i && j)
                    if (i = k.length)
                        for (; i--;) k[i] !== null && (e[f++] = k[i]);
                    else e[f++] = k;
            this.dataMin = o(void 0, Na(e));
            this.dataMax = o(void 0, Ba(e))
        },
        translate: function () {
            this.processedXData || this.processData();
            this.generatePoints();
            for (var a = this.options, b = a.stacking, c = this.xAxis, d = c.categories,
                    e = this.yAxis, f = this.points, g = f.length, h = !! this.modifyValue, i = a.pointPlacement, j = i === "between" || ya(i), k = a.threshold, a = 0; a < g; a++) {
                var l = f[a],
                    m = l.x,
                    n = l.y,
                    q = l.low,
                    p = b && e.stacks[(this.negStacks && n < k ? "-" : "") + this.stackKey];
                if (e.isLog && n <= 0) l.y = n = null;
                l.plotX = c.translate(m, 0, 0, 0, 1, i, this.type === "flags");
                if (b && this.visible && p && p[m]) p = p[m], n = p.points[this.index], q = n[0], n = n[1], q === 0 && (q = o(k, e.min)), e.isLog && q <= 0 && (q = null), l.total = l.stackTotal = p.total, l.percentage = p.total && l.y / p.total * 100, l.stackY = n, p.setOffset(this.pointXOffset ||
                    0, this.barW || 0);
                l.yBottom = r(q) ? e.translate(q, 0, 1, 0, 1) : null;
                h && (n = this.modifyValue(n, l));
                l.plotY = typeof n === "number" && n !== Infinity ? e.translate(n, 0, 1, 0, 1) : u;
                l.clientX = j ? c.translate(m, 0, 0, 0, 1) : l.plotX;
                l.negative = l.y < (k || 0);
                l.category = d && d[l.x] !== u ? d[l.x] : l.x
            }
            this.getSegments()
        },
        animate: function (a) {
            var b = this,
                c = b.chart,
                d = c.renderer,
                e;
            e = b.options.animation;
            var f = c.clipBox,
                g = c.inverted,
                h;
            if (e && !$(e)) e = Z[b.type].animation;
            h = "_sharedClip" + e.duration + e.easing;
            if (a) a = c[h], e = c[h + "m"], a || (c[h] = a = d.clipRect(s(f, {
                width: 0
            })), c[h + "m"] = e = d.clipRect(-99, g ? -c.plotLeft : -c.plotTop, 99, g ? c.chartWidth : c.chartHeight)), b.group.clip(a), b.markerGroup.clip(e), b.sharedClipKey = h;
            else {
                if (a = c[h]) a.animate({
                    width: c.plotSizeX
                }, e), c[h + "m"].animate({
                    width: c.plotSizeX + 99
                }, e);
                b.animate = null;
                b.animationTimeout = setTimeout(function () {
                    b.afterAnimate()
                }, e.duration)
            }
        },
        afterAnimate: function () {
            var a = this.chart,
                b = this.sharedClipKey,
                c = this.group;
            c && this.options.clip !== !1 && (c.clip(a.clipRect), this.markerGroup.clip());
            setTimeout(function () {
                b &&
                    a[b] && (a[b] = a[b].destroy(), a[b + "m"] = a[b + "m"].destroy())
            }, 100)
        },
        drawPoints: function () {
            var a, b = this.points,
                c = this.chart,
                d, e, f, g, h, i, j, k, l = this.options.marker,
                m = this.pointAttr[""],
                n, q = this.markerGroup;
            if (l.enabled || this._hasPointMarkers)
                for (f = b.length; f--;)
                    if (g = b[f], d = S(g.plotX), e = g.plotY, k = g.graphic, i = g.marker || {}, a = l.enabled && i.enabled === u || i.enabled, n = c.isInsidePlot(v(d), e, c.inverted), a && e !== u && !isNaN(e) && g.y !== null)
                        if (a = g.pointAttr[g.selected ? "select" : ""] || m, h = a.r, i = o(i.symbol, this.symbol), j = i.indexOf("url") ===
                            0, k) k.attr({
                            visibility: n ? "inherit" : "hidden"
                        }).animate(s({
                            x: d - h,
                            y: e - h
                        }, k.symbolName ? {
                            width: 2 * h,
                            height: 2 * h
                        } : {}));
                        else {
                            if (n && (h > 0 || j)) g.graphic = c.renderer.symbol(i, d - h, e - h, 2 * h, 2 * h).attr(a).add(q)
                        } else if (k) g.graphic = k.destroy()
        },
        convertAttribs: function (a, b, c, d) {
            var e = this.pointAttrToOptions,
                f, g, h = {}, a = a || {}, b = b || {}, c = c || {}, d = d || {};
            for (f in e) g = e[f], h[f] = o(a[g], b[f], c[f], d[f]);
            return h
        },
        getAttribs: function () {
            var a = this,
                b = a.options,
                c = Z[a.type].marker ? b.marker : b,
                d = c.states,
                e = d.hover,
                f, g = a.color;
            f = {
                stroke: g,
                fill: g
            };
            var h = a.points || [],
                i, j = [],
                k, l = a.pointAttrToOptions;
            k = a.hasPointSpecificOptions;
            var m = b.negativeColor,
                n = c.lineColor,
                q = c.fillColor;
            i = b.turboThreshold;
            var o;
            b.marker ? (e.radius = e.radius || c.radius + 2, e.lineWidth = e.lineWidth || c.lineWidth + 1) : e.color = e.color || wa(e.color || g).brighten(e.brightness).get();
            j[""] = a.convertAttribs(c, f);
            p(["hover", "select"], function (b) {
                j[b] = a.convertAttribs(d[b], j[""])
            });
            a.pointAttr = j;
            g = h.length;
            if (!i || g < i || k)
                for (; g--;) {
                    i = h[g];
                    if ((c = i.options && i.options.marker || i.options) &&
                        c.enabled === !1) c.radius = 0;
                    if (i.negative && m) i.color = i.fillColor = m;
                    k = b.colorByPoint || i.color;
                    if (i.options)
                        for (o in l) r(c[l[o]]) && (k = !0);
                    if (k) {
                        c = c || {};
                        k = [];
                        d = c.states || {};
                        f = d.hover = d.hover || {};
                        if (!b.marker) f.color = f.color || !i.options.color && e.color || wa(i.color).brighten(f.brightness || e.brightness).get();
                        f = {
                            color: i.color
                        };
                        if (!q) f.fillColor = i.color;
                        if (!n) f.lineColor = i.color;
                        k[""] = a.convertAttribs(s(f, c), j[""]);
                        k.hover = a.convertAttribs(d.hover, j.hover, k[""]);
                        k.select = a.convertAttribs(d.select, j.select,
                            k[""])
                    } else k = j;
                    i.pointAttr = k
                }
        },
        destroy: function () {
            var a = this,
                b = a.chart,
                c = /AppleWebKit\/533/.test(ua),
                d, e, f = a.data || [],
                g, h, i;
            I(a, "destroy");
            U(a);
            p(a.axisTypes || [], function (b) {
                if (i = a[b]) ia(i.series, a), i.isDirty = i.forceRedraw = !0
            });
            a.legendItem && a.chart.legend.destroyItem(a);
            for (e = f.length; e--;)(g = f[e]) && g.destroy && g.destroy();
            a.points = null;
            clearTimeout(a.animationTimeout);
            p("area,graph,dataLabelsGroup,group,markerGroup,tracker,graphNeg,areaNeg,posClip,negClip".split(","), function (b) {
                a[b] && (d = c && b ===
                    "group" ? "hide" : "destroy", a[b][d]())
            });
            if (b.hoverSeries === a) b.hoverSeries = null;
            ia(b.series, a);
            for (h in a) delete a[h]
        },
        getSegmentPath: function (a) {
            var b = this,
                c = [],
                d = b.options.step;
            p(a, function (e, f) {
                var g = e.plotX,
                    h = e.plotY,
                    i;
                b.getPointSpline ? c.push.apply(c, b.getPointSpline(a, e, f)) : (c.push(f ? "L" : "M"), d && f && (i = a[f - 1], d === "right" ? c.push(i.plotX, h) : d === "center" ? c.push((i.plotX + g) / 2, i.plotY, (i.plotX + g) / 2, h) : c.push(g, i.plotY)), c.push(e.plotX, e.plotY))
            });
            return c
        },
        getGraphPath: function () {
            var a = this,
                b = [],
                c, d = [];
            p(a.segments, function (e) {
                c = a.getSegmentPath(e);
                e.length > 1 ? b = b.concat(c) : d.push(e[0])
            });
            a.singlePoints = d;
            return a.graphPath = b
        },
        drawGraph: function () {
            var a = this,
                b = this.options,
                c = [
                    ["graph", b.lineColor || this.color]
                ],
                d = b.lineWidth,
                e = b.dashStyle,
                f = b.linecap !== "square",
                g = this.getGraphPath(),
                h = b.negativeColor;
            h && c.push(["graphNeg", h]);
            p(c, function (c, h) {
                var k = c[0],
                    l = a[k];
                if (l) ab(l), l.animate({
                    d: g
                });
                else if (d && g.length) l = {
                    stroke: c[1],
                    "stroke-width": d,
                    fill: O,
                    zIndex: 1
                }, e ? l.dashstyle = e : f && (l["stroke-linecap"] =
                    l["stroke-linejoin"] = "round"), a[k] = a.chart.renderer.path(g).attr(l).add(a.group).shadow(!h && b.shadow)
            })
        },
        clipNeg: function () {
            var a = this.options,
                b = this.chart,
                c = b.renderer,
                d = a.negativeColor || a.negativeFillColor,
                e, f = this.graph,
                g = this.area,
                h = this.posClip,
                i = this.negClip;
            e = b.chartWidth;
            var j = b.chartHeight,
                k = t(e, j),
                l = this.yAxis;
            if (d && (f || g)) {
                d = v(l.toPixels(a.threshold || 0, !0));
                d < 0 && (k -= d);
                a = {
                    x: 0,
                    y: 0,
                    width: k,
                    height: d
                };
                k = {
                    x: 0,
                    y: d,
                    width: k,
                    height: k
                };
                if (b.inverted) a.height = k.y = b.plotWidth - d, c.isVML && (a = {
                    x: b.plotWidth -
                        d - b.plotLeft,
                    y: 0,
                    width: e,
                    height: j
                }, k = {
                    x: d + b.plotLeft - e,
                    y: 0,
                    width: b.plotLeft + d,
                    height: e
                });
                l.reversed ? (b = k, e = a) : (b = a, e = k);
                h ? (h.animate(b), i.animate(e)) : (this.posClip = h = c.clipRect(b), this.negClip = i = c.clipRect(e), f && this.graphNeg && (f.clip(h), this.graphNeg.clip(i)), g && (g.clip(h), this.areaNeg.clip(i)))
            }
        },
        invertGroups: function () {
            function a() {
                var a = {
                    width: b.yAxis.len,
                    height: b.xAxis.len
                };
                p(["group", "markerGroup"], function (c) {
                    b[c] && b[c].attr(a).invert()
                })
            }
            var b = this,
                c = b.chart;
            if (b.xAxis) C(c, "resize", a), C(b,
                "destroy", function () {
                    U(c, "resize", a)
                }), a(), b.invertGroups = a
        },
        plotGroup: function (a, b, c, d, e) {
            var f = this[a],
                g = !f;
            g && (this[a] = f = this.chart.renderer.g(b).attr({
                visibility: c,
                zIndex: d || 0.1
            }).add(e));
            f[g ? "attr" : "animate"](this.getPlotBox());
            return f
        },
        getPlotBox: function () {
            return {
                translateX: this.xAxis ? this.xAxis.left : this.chart.plotLeft,
                translateY: this.yAxis ? this.yAxis.top : this.chart.plotTop,
                scaleX: 1,
                scaleY: 1
            }
        },
        render: function () {
            var a = this.chart,
                b, c = this.options,
                d = c.animation && !! this.animate && a.renderer.isSVG,
                e = this.visible ? "visible" : "hidden",
                f = c.zIndex,
                g = this.hasRendered,
                h = a.seriesGroup;
            b = this.plotGroup("group", "series", e, f, h);
            this.markerGroup = this.plotGroup("markerGroup", "markers", e, f, h);
            d && this.animate(!0);
            this.getAttribs();
            b.inverted = this.isCartesian ? a.inverted : !1;
            this.drawGraph && (this.drawGraph(), this.clipNeg());
            this.drawDataLabels && this.drawDataLabels();
            this.visible && this.drawPoints();
            this.drawTracker && this.options.enableMouseTracking !== !1 && this.drawTracker();
            a.inverted && this.invertGroups();
            c.clip !== !1 && !this.sharedClipKey && !g && b.clip(a.clipRect);
            d ? this.animate() : g || this.afterAnimate();
            this.isDirty = this.isDirtyData = !1;
            this.hasRendered = !0
        },
        redraw: function () {
            var a = this.chart,
                b = this.isDirtyData,
                c = this.group,
                d = this.xAxis,
                e = this.yAxis;
            c && (a.inverted && c.attr({
                width: a.plotWidth,
                height: a.plotHeight
            }), c.animate({
                translateX: o(d && d.left, a.plotLeft),
                translateY: o(e && e.top, a.plotTop)
            }));
            this.translate();
            this.setTooltipPoints(!0);
            this.render();
            b && I(this, "updatedData")
        }
    };
    Hb.prototype = {
        destroy: function () {
            Oa(this,
                this.axis)
        },
        render: function (a) {
            var b = this.options,
                c = b.format,
                c = c ? Ia(c, this) : b.formatter.call(this);
            this.label ? this.label.attr({
                text: c,
                visibility: "hidden"
            }) : this.label = this.axis.chart.renderer.text(c, 0, 0, b.useHTML).css(b.style).attr({
                align: this.textAlign,
                rotation: b.rotation,
                visibility: "hidden"
            }).add(a)
        },
        setOffset: function (a, b) {
            var c = this.axis,
                d = c.chart,
                e = d.inverted,
                f = this.isNegative,
                g = c.translate(this.percent ? 100 : this.total, 0, 0, 0, 1),
                c = c.translate(0),
                c = N(g - c),
                h = d.xAxis[0].translate(this.x) + a,
                i = d.plotHeight,
                f = {
                    x: e ? f ? g : g - c : h,
                    y: e ? i - h - b : f ? i - g - c : i - g,
                    width: e ? c : b,
                    height: e ? b : c
                };
            if (e = this.label) e.align(this.alignOptions, null, f), f = e.alignAttr, e[this.options.crop === !1 || d.isInsidePlot(f.x, f.y) ? "show" : "hide"](!0)
        }
    };
    ka.prototype.buildStacks = function () {
        var a = this.series,
            b = o(this.options.reversedStacks, !0),
            c = a.length;
        if (!this.isXAxis) {
            for (this.usePercentage = !1; c--;) a[b ? c : a.length - c - 1].setStackedPoints();
            if (this.usePercentage)
                for (c = 0; c < a.length; c++) a[c].setPercentStacks()
        }
    };
    ka.prototype.renderStackTotals = function () {
        var a =
            this.chart,
            b = a.renderer,
            c = this.stacks,
            d, e, f = this.stackTotalGroup;
        if (!f) this.stackTotalGroup = f = b.g("stack-labels").attr({
            visibility: "visible",
            zIndex: 6
        }).add();
        f.translate(a.plotLeft, a.plotTop);
        for (d in c)
            for (e in a = c[d], a) a[e].render(f)
    };
    M.prototype.setStackedPoints = function () {
        if (this.options.stacking && !(this.visible !== !0 && this.chart.options.chart.ignoreHiddenSeries !== !1)) {
            var a = this.processedXData,
                b = this.processedYData,
                c = [],
                d = b.length,
                e = this.options,
                f = e.threshold,
                g = e.stack,
                e = e.stacking,
                h = this.stackKey,
                i = "-" + h,
                j = this.negStacks,
                k = this.yAxis,
                l = k.stacks,
                m = k.oldStacks,
                n, q, o, p, r;
            for (o = 0; o < d; o++) {
                p = a[o];
                r = b[o];
                q = (n = j && r < f) ? i : h;
                l[q] || (l[q] = {});
                if (!l[q][p]) m[q] && m[q][p] ? (l[q][p] = m[q][p], l[q][p].total = null) : l[q][p] = new Hb(k, k.options.stackLabels, n, p, g, e);
                q = l[q][p];
                q.points[this.index] = [q.cum || 0];
                e === "percent" ? (n = n ? h : i, j && l[n] && l[n][p] ? (n = l[n][p], q.total = n.total = t(n.total, q.total) + N(r) || 0) : q.total = aa(q.total + (N(r) || 0))) : q.total = aa(q.total + (r || 0));
                q.cum = (q.cum || 0) + (r || 0);
                q.points[this.index].push(q.cum);
                c[o] =
                    q.cum
            }
            if (e === "percent") k.usePercentage = !0;
            this.stackedYData = c;
            k.oldStacks = {}
        }
    };
    M.prototype.setPercentStacks = function () {
        var a = this,
            b = a.stackKey,
            c = a.yAxis.stacks,
            d = a.processedXData;
        p([b, "-" + b], function (b) {
            var e;
            for (var f = d.length, g, h; f--;)
                if (g = d[f], e = (h = c[b] && c[b][g]) && h.points[a.index], g = e) h = h.total ? 100 / h.total : 0, g[0] = aa(g[0] * h), g[1] = aa(g[1] * h), a.stackedYData[f] = g[1]
        })
    };
    s(Ya.prototype, {
        addSeries: function (a, b, c) {
            var d, e = this;
            a && (b = o(b, !0), I(e, "addSeries", {
                options: a
            }, function () {
                d = e.initSeries(a);
                e.isDirtyLegend = !0;
                e.linkSeries();
                b && e.redraw(c)
            }));
            return d
        },
        addAxis: function (a, b, c, d) {
            var e = b ? "xAxis" : "yAxis",
                f = this.options;
            new ka(this, w(a, {
                index: this[e].length,
                isX: b
            }));
            f[e] = na(f[e] || {});
            f[e].push(a);
            o(c, !0) && this.redraw(d)
        },
        showLoading: function (a) {
            var b = this.options,
                c = this.loadingDiv,
                d = b.loading;
            if (!c) this.loadingDiv = c = V(Ja, {
                className: "highcharts-loading"
            }, s(d.style, {
                zIndex: 10,
                display: O
            }), this.container), this.loadingSpan = V("span", null, d.labelStyle, c);
            this.loadingSpan.innerHTML = a || b.lang.loading;
            if (!this.loadingShown) D(c, {
                opacity: 0,
                display: "",
                left: this.plotLeft + "px",
                top: this.plotTop + "px",
                width: this.plotWidth + "px",
                height: this.plotHeight + "px"
            }), jb(c, {
                opacity: d.style.opacity
            }, {
                duration: d.showDuration || 0
            }), this.loadingShown = !0
        },
        hideLoading: function () {
            var a = this.options,
                b = this.loadingDiv;
            b && jb(b, {
                opacity: 0
            }, {
                duration: a.loading.hideDuration || 100,
                complete: function () {
                    D(b, {
                        display: O
                    })
                }
            });
            this.loadingShown = !1
        }
    });
    s(Fa.prototype, {
        update: function (a, b, c) {
            var d = this,
                e = d.series,
                f = d.graphic,
                g, h = e.data,
                i = e.chart,
                j = e.options,
                b = o(b, !0);
            d.firePointEvent("update", {
                options: a
            }, function () {
                d.applyOptions(a);
                if ($(a)) {
                    e.getAttribs();
                    if (f) a && a.marker && a.marker.symbol ? d.graphic = f.destroy() : f.attr(d.pointAttr[d.state || ""]);
                    if (a && a.dataLabels && d.dataLabel) d.dataLabel = d.dataLabel.destroy()
                }
                g = va(d, h);
                e.updateParallelArrays(d, g);
                j.data[g] = d.options;
                e.isDirty = e.isDirtyData = !0;
                if (!e.fixedBox && e.hasCartesianSeries) i.isDirtyBox = !0;
                j.legendType === "point" && i.legend.destroyItem(d);
                b && i.redraw(c)
            })
        },
        remove: function (a, b) {
            var c = this,
                d = c.series,
                e = d.points,
                f = d.chart,
                g, h = d.data;
            Qa(b, f);
            a = o(a, !0);
            c.firePointEvent("remove", null, function () {
                g = va(c, h);
                h.length === e.length && e.splice(g, 1);
                h.splice(g, 1);
                d.options.data.splice(g, 1);
                d.updateParallelArrays(c, "splice", g, 1);
                c.destroy();
                d.isDirty = !0;
                d.isDirtyData = !0;
                a && f.redraw()
            })
        }
    });
    s(M.prototype, {
        addPoint: function (a, b, c, d) {
            var e = this.options,
                f = this.data,
                g = this.graph,
                h = this.area,
                i = this.chart,
                j = this.xAxis && this.xAxis.names,
                k = g && g.shift || 0,
                l = e.data,
                m, n = this.xData;
            Qa(d, i);
            c && p([g, h, this.graphNeg, this.areaNeg], function (a) {
                if (a) a.shift =
                    k + 1
            });
            if (h) h.isArea = !0;
            b = o(b, !0);
            d = {
                series: this
            };
            this.pointClass.prototype.applyOptions.apply(d, [a]);
            g = d.x;
            h = n.length;
            if (this.requireSorting && g < n[h - 1])
                for (m = !0; h && n[h - 1] > g;) h--;
            this.updateParallelArrays(d, "splice", h, 0, 0);
            this.updateParallelArrays(d, h);
            if (j) j[g] = d.name;
            l.splice(h, 0, a);
            m && (this.data.splice(h, 0, null), this.processData());
            e.legendType === "point" && this.generatePoints();
            c && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), this.updateParallelArrays(d, "shift"), l.shift()));
            this.isDirtyData = this.isDirty = !0;
            b && (this.getAttribs(), i.redraw())
        },
        remove: function (a, b) {
            var c = this,
                d = c.chart,
                a = o(a, !0);
            if (!c.isRemoving) c.isRemoving = !0, I(c, "remove", null, function () {
                c.destroy();
                d.isDirtyLegend = d.isDirtyBox = !0;
                d.linkSeries();
                a && d.redraw(b)
            });
            c.isRemoving = !1
        },
        update: function (a, b) {
            var c = this.chart,
                d = this.type,
                e = J[d].prototype,
                f, a = w(this.userOptions, {
                    animation: !1,
                    index: this.index,
                    pointStart: this.xData[0]
                }, {
                    data: this.options.data
                }, a);
            this.remove(!1);
            for (f in e) e.hasOwnProperty(f) && (this[f] = u);
            s(this, J[a.type || d].prototype);
            this.init(c, a);
            o(b, !0) && c.redraw(!1)
        }
    });
    s(ka.prototype, {
        update: function (a, b) {
            var c = this.chart,
                a = c.options[this.coll][this.options.index] = w(this.userOptions, a);
            this.destroy(!0);
            this._addedPlotLB = this.userMin = this.userMax = u;
            this.init(c, s(a, {
                events: u
            }));
            c.isDirtyBox = !0;
            o(b, !0) && c.redraw()
        },
        remove: function (a) {
            for (var b = this.chart, c = this.coll, d = this.series, e = d.length; e--;) d[e] && d[e].remove(!1);
            ia(b.axes, this);
            ia(b[c], this);
            b.options[c].splice(this.options.index, 1);
            p(b[c], function (a, b) {
                a.options.index =
                    b
            });
            this.destroy();
            b.isDirtyBox = !0;
            o(a, !0) && b.redraw()
        },
        setTitle: function (a, b) {
            this.update({
                title: a
            }, b)
        },
        setCategories: function (a, b) {
            this.update({
                categories: a
            }, b)
        }
    });
    ea = ja(M);
    J.line = ea;
    Z.area = w(R, {
        threshold: 0
    });
    var ma = ja(M, {
        type: "area",
        getSegments: function () {
            var a = [],
                b = [],
                c = [],
                d = this.xAxis,
                e = this.yAxis,
                f = e.stacks[this.stackKey],
                g = {}, h, i, j = this.points,
                k = this.options.connectNulls,
                l, m, n;
            if (this.options.stacking && !this.cropped) {
                for (m = 0; m < j.length; m++) g[j[m].x] = j[m];
                for (n in f) f[n].total !== null && c.push(+n);
                c.sort(function (a, b) {
                    return a - b
                });
                p(c, function (a) {
                    if (!k || g[a] && g[a].y !== null) g[a] ? b.push(g[a]) : (h = d.translate(a), l = f[a].percent ? f[a].total ? f[a].cum * 100 / f[a].total : 0 : f[a].cum, i = e.toPixels(l, !0), b.push({
                        y: null,
                        plotX: h,
                        clientX: h,
                        plotY: i,
                        yBottom: i,
                        onMouseOver: Ea
                    }))
                });
                b.length && a.push(b)
            } else M.prototype.getSegments.call(this), a = this.segments;
            this.segments = a
        },
        getSegmentPath: function (a) {
            var b = M.prototype.getSegmentPath.call(this, a),
                c = [].concat(b),
                d, e = this.options;
            d = b.length;
            var f = this.yAxis.getThreshold(e.threshold),
                g;
            d === 3 && c.push("L", b[1], b[2]);
            if (e.stacking && !this.closedStacks)
                for (d = a.length - 1; d >= 0; d--) g = o(a[d].yBottom, f), d < a.length - 1 && e.step && c.push(a[d + 1].plotX, g), c.push(a[d].plotX, g);
            else this.closeSegment(c, a, f);
            this.areaPath = this.areaPath.concat(c);
            return b
        },
        closeSegment: function (a, b, c) {
            a.push("L", b[b.length - 1].plotX, c, "L", b[0].plotX, c)
        },
        drawGraph: function () {
            this.areaPath = [];
            M.prototype.drawGraph.apply(this);
            var a = this,
                b = this.areaPath,
                c = this.options,
                d = c.negativeColor,
                e = c.negativeFillColor,
                f = [
                    ["area",
                        this.color, c.fillColor
                    ]
                ];
            (d || e) && f.push(["areaNeg", d, e]);
            p(f, function (d) {
                var e = d[0],
                    f = a[e];
                f ? f.animate({
                    d: b
                }) : a[e] = a.chart.renderer.path(b).attr({
                    fill: o(d[2], wa(d[1]).setOpacity(o(c.fillOpacity, 0.75)).get()),
                    zIndex: 0
                }).add(a.group)
            })
        },
        drawLegendSymbol: F.drawRectangle
    });
    J.area = ma;
    Z.spline = w(R);
    ea = ja(M, {
        type: "spline",
        getPointSpline: function (a, b, c) {
            var d = b.plotX,
                e = b.plotY,
                f = a[c - 1],
                g = a[c + 1],
                h, i, j, k;
            if (f && g) {
                a = f.plotY;
                j = g.plotX;
                var g = g.plotY,
                    l;
                h = (1.5 * d + f.plotX) / 2.5;
                i = (1.5 * e + a) / 2.5;
                j = (1.5 * d + j) / 2.5;
                k = (1.5 *
                    e + g) / 2.5;
                l = (k - i) * (j - d) / (j - h) + e - k;
                i += l;
                k += l;
                i > a && i > e ? (i = t(a, e), k = 2 * e - i) : i < a && i < e && (i = E(a, e), k = 2 * e - i);
                k > g && k > e ? (k = t(g, e), i = 2 * e - k) : k < g && k < e && (k = E(g, e), i = 2 * e - k);
                b.rightContX = j;
                b.rightContY = k
            }
            c ? (b = ["C", f.rightContX || f.plotX, f.rightContY || f.plotY, h || d, i || e, d, e], f.rightContX = f.rightContY = null) : b = ["M", d, e];
            return b
        }
    });
    J.spline = ea;
    Z.areaspline = w(Z.area);
    ma = ma.prototype;
    ea = ja(ea, {
        type: "areaspline",
        closedStacks: !0,
        getSegmentPath: ma.getSegmentPath,
        closeSegment: ma.closeSegment,
        drawGraph: ma.drawGraph,
        drawLegendSymbol: F.drawRectangle
    });
    J.areaspline = ea;
    Z.column = w(R, {
        borderColor: "#FFFFFF",
        borderWidth: 1,
        borderRadius: 0,
        groupPadding: 0.2,
        marker: null,
        pointPadding: 0.1,
        minPointLength: 0,
        cropThreshold: 50,
        pointRange: null,
        states: {
            hover: {
                brightness: 0.1,
                shadow: !1
            },
            select: {
                color: "#C0C0C0",
                borderColor: "#000000",
                shadow: !1
            }
        },
        dataLabels: {
            align: null,
            verticalAlign: null,
            y: null
        },
        stickyTracking: !1,
        threshold: 0
    });
    ea = ja(M, {
        type: "column",
        pointAttrToOptions: {
            stroke: "borderColor",
            "stroke-width": "borderWidth",
            fill: "color",
            r: "borderRadius"
        },
        cropShoulder: 0,
        trackerGroups: ["group",
            "dataLabelsGroup"
        ],
        negStacks: !0,
        init: function () {
            M.prototype.init.apply(this, arguments);
            var a = this,
                b = a.chart;
            b.hasRendered && p(b.series, function (b) {
                if (b.type === a.type) b.isDirty = !0
            })
        },
        getColumnMetrics: function () {
            var a = this,
                b = a.options,
                c = a.xAxis,
                d = a.yAxis,
                e = c.reversed,
                f, g = {}, h, i = 0;
            b.grouping === !1 ? i = 1 : p(a.chart.series, function (b) {
                var c = b.options,
                    e = b.yAxis;
                if (b.type === a.type && b.visible && d.len === e.len && d.pos === e.pos) c.stacking ? (f = b.stackKey, g[f] === u && (g[f] = i++), h = g[f]) : c.grouping !== !1 && (h = i++), b.columnIndex =
                    h
            });
            var c = E(N(c.transA) * (c.ordinalSlope || b.pointRange || c.closestPointRange || c.tickInterval || 1), c.len),
                j = c * b.groupPadding,
                k = (c - 2 * j) / i,
                l = b.pointWidth,
                b = r(l) ? (k - l) / 2 : k * b.pointPadding,
                l = o(l, k - 2 * b);
            return a.columnMetrics = {
                width: l,
                offset: b + (j + ((e ? i - (a.columnIndex || 0) : a.columnIndex) || 0) * k - c / 2) * (e ? -1 : 1)
            }
        },
        translate: function () {
            var a = this.chart,
                b = this.options,
                c = b.borderWidth,
                d = this.yAxis,
                e = this.translatedThreshold = d.getThreshold(b.threshold),
                f = o(b.minPointLength, 5),
                b = this.getColumnMetrics(),
                g = b.width,
                h = this.barW =
                    Ka(t(g, 1 + 2 * c)),
                i = this.pointXOffset = b.offset,
                j = -(c % 2 ? 0.5 : 0),
                k = c % 2 ? 0.5 : 1;
            a.renderer.isVML && a.inverted && (k += 1);
            M.prototype.translate.apply(this);
            p(this.points, function (a) {
                var b = o(a.yBottom, e),
                    c = E(t(-999 - b, a.plotY), d.len + 999 + b),
                    q = a.plotX + i,
                    p = h,
                    r = E(c, b),
                    s, c = t(c, b) - r;
                N(c) < f && f && (c = f, r = v(N(r - e) > f ? b - f : e - (d.translate(a.y, 0, 1, 0, 1) <= e ? f : 0)));
                a.barX = q;
                a.pointWidth = g;
                b = N(q) < 0.5;
                p = v(q + p) + j;
                q = v(q) + j;
                p -= q;
                s = N(r) < 0.5;
                c = v(r + c) + k;
                r = v(r) + k;
                c -= r;
                b && (q += 1, p -= 1);
                s && (r -= 1, c += 1);
                a.shapeType = "rect";
                a.shapeArgs = {
                    x: q,
                    y: r,
                    width: p,
                    height: c
                }
            })
        },
        getSymbol: Ea,
        drawLegendSymbol: F.drawRectangle,
        drawGraph: Ea,
        drawPoints: function () {
            var a = this,
                b = a.options,
                c = this.chart.renderer,
                d = b.animationLimit || 250,
                e;
            p(a.points, function (f) {
                var g = f.plotY,
                    h = f.graphic;
                if (g !== u && !isNaN(g) && f.y !== null) e = f.shapeArgs, h ? (ab(h), h[a.points.length < d ? "animate" : "attr"](w(e))) : f.graphic = c[f.shapeType](e).attr(f.pointAttr[f.selected ? "select" : ""]).add(a.group).shadow(b.shadow, null, b.stacking && !b.borderRadius);
                else if (h) f.graphic = h.destroy()
            })
        },
        animate: function (a) {
            var b =
                this.yAxis,
                c = this.options,
                d = this.chart.inverted,
                e = {};
            if (X) a ? (e.scaleY = 0.001, a = E(b.pos + b.len, t(b.pos, b.toPixels(c.threshold))), d ? e.translateX = a - b.len : e.translateY = a, this.group.attr(e)) : (e.scaleY = 1, e[d ? "translateX" : "translateY"] = b.pos, this.group.animate(e, this.options.animation), this.animate = null)
        },
        remove: function () {
            var a = this,
                b = a.chart;
            b.hasRendered && p(b.series, function (b) {
                if (b.type === a.type) b.isDirty = !0
            });
            M.prototype.remove.apply(a, arguments)
        }
    });
    J.column = ea;
    Z.bar = w(Z.column);
    ma = ja(ea, {
        type: "bar",
        inverted: !0
    });
    J.bar = ma;
    Z.scatter = w(R, {
        lineWidth: 0,
        tooltip: {
            headerFormat: '<span style="font-size: 10px; color:{series.color}">{series.name}</span><br/>',
            pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>",
            followPointer: !0
        },
        stickyTracking: !1
    });
    ma = ja(M, {
        type: "scatter",
        sorted: !1,
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ["markerGroup"],
        takeOrdinalPosition: !1,
        singularTooltips: !0,
        drawGraph: function () {
            this.options.lineWidth && M.prototype.drawGraph.call(this)
        }
    });
    J.scatter = ma;
    Z.pie = w(R, {
        borderColor: "#FFFFFF",
        borderWidth: 1,
        center: [null, null],
        clip: !1,
        colorByPoint: !0,
        dataLabels: {
            distance: 30,
            enabled: !0,
            formatter: function () {
                return this.point.name
            }
        },
        ignoreHiddenPoint: !0,
        legendType: "point",
        marker: null,
        size: null,
        showInLegend: !1,
        slicedOffset: 10,
        states: {
            hover: {
                brightness: 0.1,
                shadow: !1
            }
        },
        stickyTracking: !1,
        tooltip: {
            followPointer: !0
        }
    });
    R = {
        type: "pie",
        isCartesian: !1,
        pointClass: ja(Fa, {
            init: function () {
                Fa.prototype.init.apply(this, arguments);
                var a = this,
                    b;
                if (a.y < 0) a.y = null;
                s(a, {
                    visible: a.visible !== !1,
                    name: o(a.name, "Slice")
                });
                b = function (b) {
                    a.slice(b.type === "select")
                };
                C(a, "select", b);
                C(a, "unselect", b);
                return a
            },
            setVisible: function (a) {
                var b = this,
                    c = b.series,
                    d = c.chart;
                b.visible = b.options.visible = a = a === u ? !b.visible : a;
                c.options.data[va(b, c.data)] = b.options;
                p(["graphic", "dataLabel", "connector", "shadowGroup"], function (c) {
                    if (b[c]) b[c][a ? "show" : "hide"](!0)
                });
                b.legendItem && d.legend.colorizeItem(b, a);
                if (!c.isDirty && c.options.ignoreHiddenPoint) c.isDirty = !0, d.redraw()
            },
            slice: function (a, b, c) {
                var d = this.series;
                Qa(c, d.chart);
                o(b, !0);
                this.sliced = this.options.sliced = a = r(a) ? a : !this.sliced;
                d.options.data[va(this, d.data)] = this.options;
                a = a ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                };
                this.graphic.animate(a);
                this.shadowGroup && this.shadowGroup.animate(a)
            }
        }),
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ["group", "dataLabelsGroup"],
        axisTypes: [],
        pointAttrToOptions: {
            stroke: "borderColor",
            "stroke-width": "borderWidth",
            fill: "color"
        },
        singularTooltips: !0,
        getColor: Ea,
        animate: function (a) {
            var b = this,
                c = b.points,
                d =
                    b.startAngleRad;
            if (!a) p(c, function (a) {
                var c = a.graphic,
                    a = a.shapeArgs;
                c && (c.attr({
                    r: b.center[3] / 2,
                    start: d,
                    end: d
                }), c.animate({
                    r: a.r,
                    start: a.start,
                    end: a.end
                }, b.options.animation))
            }), b.animate = null
        },
        setData: function (a, b, c, d) {
            M.prototype.setData.call(this, a, !1, c, d);
            this.processData();
            this.generatePoints();
            o(b, !0) && this.chart.redraw(c)
        },
        generatePoints: function () {
            var a, b = 0,
                c, d, e, f = this.options.ignoreHiddenPoint;
            M.prototype.generatePoints.call(this);
            c = this.points;
            d = c.length;
            for (a = 0; a < d; a++) e = c[a], b += f && !e.visible ?
                0 : e.y;
            this.total = b;
            for (a = 0; a < d; a++) e = c[a], e.percentage = b > 0 ? e.y / b * 100 : 0, e.total = b
        },
        translate: function (a) {
            this.generatePoints();
            var b = 0,
                c = this.options,
                d = c.slicedOffset,
                e = d + c.borderWidth,
                f, g, h, i = c.startAngle || 0,
                j = this.startAngleRad = la / 180 * (i - 90),
                i = (this.endAngleRad = la / 180 * (o(c.endAngle, i + 360) - 90)) - j,
                k = this.points,
                l = c.dataLabels.distance,
                c = c.ignoreHiddenPoint,
                m, n = k.length,
                p;
            if (!a) this.center = a = this.getCenter();
            this.getX = function (b, c) {
                h = T.asin(E((b - a[1]) / (a[2] / 2 + l), 1));
                return a[0] + (c ? -1 : 1) * W(h) * (a[2] /
                    2 + l)
            };
            for (m = 0; m < n; m++) {
                p = k[m];
                f = j + b * i;
                if (!c || p.visible) b += p.percentage / 100;
                g = j + b * i;
                p.shapeType = "arc";
                p.shapeArgs = {
                    x: a[0],
                    y: a[1],
                    r: a[2] / 2,
                    innerR: a[3] / 2,
                    start: v(f * 1E3) / 1E3,
                    end: v(g * 1E3) / 1E3
                };
                h = (g + f) / 2;
                h > 1.5 * la ? h -= 2 * la : h < -la / 2 && (h += 2 * la);
                p.slicedTranslation = {
                    translateX: v(W(h) * d),
                    translateY: v(ba(h) * d)
                };
                f = W(h) * a[2] / 2;
                g = ba(h) * a[2] / 2;
                p.tooltipPos = [a[0] + f * 0.7, a[1] + g * 0.7];
                p.half = h < -la / 2 || h > la / 2 ? 1 : 0;
                p.angle = h;
                e = E(e, l / 2);
                p.labelPos = [a[0] + f + W(h) * l, a[1] + g + ba(h) * l, a[0] + f + W(h) * e, a[1] + g + ba(h) * e, a[0] + f, a[1] + g, l < 0 ?
                    "center" : p.half ? "right" : "left", h
                ]
            }
        },
        drawGraph: null,
        drawPoints: function () {
            var a = this,
                b = a.chart.renderer,
                c, d, e = a.options.shadow,
                f, g;
            if (e && !a.shadowGroup) a.shadowGroup = b.g("shadow").add(a.group);
            p(a.points, function (h) {
                d = h.graphic;
                g = h.shapeArgs;
                f = h.shadowGroup;
                if (e && !f) f = h.shadowGroup = b.g("shadow").add(a.shadowGroup);
                c = h.sliced ? h.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                };
                f && f.attr(c);
                d ? d.animate(s(g, c)) : h.graphic = d = b[h.shapeType](g).setRadialReference(a.center).attr(h.pointAttr[h.selected ? "select" :
                    ""]).attr({
                    "stroke-linejoin": "round"
                }).attr(c).add(a.group).shadow(e, f);
                h.visible !== void 0 && h.setVisible(h.visible)
            })
        },
        sortByAngle: function (a, b) {
            a.sort(function (a, d) {
                return a.angle !== void 0 && (d.angle - a.angle) * b
            })
        },
        drawLegendSymbol: F.drawRectangle,
        getCenter: da.getCenter,
        getSymbol: Ea
    };
    R = ja(M, R);
    J.pie = R;
    M.prototype.drawDataLabels = function () {
        var a = this,
            b = a.options,
            c = b.cursor,
            d = b.dataLabels,
            b = a.points,
            e, f, g, h;
        if (d.enabled || a._hasPointLabels) a.dlProcessOptions && a.dlProcessOptions(d), h = a.plotGroup("dataLabelsGroup",
            "data-labels", a.visible ? "visible" : "hidden", d.zIndex || 6), f = d, p(b, function (b) {
            var j, k = b.dataLabel,
                l, m, n = b.connector,
                p = !0;
            e = b.options && b.options.dataLabels;
            j = o(e && e.enabled, f.enabled);
            if (k && !j) b.dataLabel = k.destroy();
            else if (j) {
                d = w(f, e);
                j = d.rotation;
                l = b.getLabelConfig();
                g = d.format ? Ia(d.format, l) : d.formatter.call(l, d);
                d.style.color = o(d.color, d.style.color, a.color, "black");
                if (k)
                    if (r(g)) k.attr({
                        text: g
                    }), p = !1;
                    else {
                        if (b.dataLabel = k = k.destroy(), n) b.connector = n.destroy()
                    } else if (r(g)) {
                    k = {
                        fill: d.backgroundColor,
                        stroke: d.borderColor,
                        "stroke-width": d.borderWidth,
                        r: d.borderRadius || 0,
                        rotation: j,
                        padding: d.padding,
                        zIndex: 1
                    };
                    for (m in k) k[m] === u && delete k[m];
                    k = b.dataLabel = a.chart.renderer[j ? "text" : "label"](g, 0, -999, null, null, null, d.useHTML).attr(k).css(s(d.style, c && {
                        cursor: c
                    })).add(h).shadow(d.shadow)
                }
                k && a.alignDataLabel(b, k, d, null, p)
            }
        })
    };
    M.prototype.alignDataLabel = function (a, b, c, d, e) {
        var f = this.chart,
            g = f.inverted,
            h = o(a.plotX, -999),
            i = o(a.plotY, -999),
            j = b.getBBox();
        if (a = this.visible && (a.series.forceDL || f.isInsidePlot(h,
            v(i), g) || d && f.isInsidePlot(h, g ? d.x + 1 : d.y + d.height - 1, g))) d = s({
            x: g ? f.plotWidth - i : h,
            y: v(g ? f.plotHeight - h : i),
            width: 0,
            height: 0
        }, d), s(c, {
            width: j.width,
            height: j.height
        }), c.rotation ? (g = {
            align: c.align,
            x: d.x + c.x + d.width / 2,
            y: d.y + c.y + d.height / 2
        }, b[e ? "attr" : "animate"](g)) : (b.align(c, null, d), g = b.alignAttr, o(c.overflow, "justify") === "justify" ? this.justifyDataLabel(b, c, g, j, d, e) : o(c.crop, !0) && (a = f.isInsidePlot(g.x, g.y) && f.isInsidePlot(g.x + j.width, g.y + j.height)));
        if (!a) b.attr({
            y: -999
        }), b.placed = !1
    };
    M.prototype.justifyDataLabel =
        function (a, b, c, d, e, f) {
            var g = this.chart,
                h = b.align,
                i = b.verticalAlign,
                j, k;
            j = c.x;
            if (j < 0) h === "right" ? b.align = "left" : b.x = -j, k = !0;
            j = c.x + d.width;
            if (j > g.plotWidth) h === "left" ? b.align = "right" : b.x = g.plotWidth - j, k = !0;
            j = c.y;
            if (j < 0) i === "bottom" ? b.verticalAlign = "top" : b.y = -j, k = !0;
            j = c.y + d.height;
            if (j > g.plotHeight) i === "top" ? b.verticalAlign = "bottom" : b.y = g.plotHeight - j, k = !0;
            if (k) a.placed = !f, a.align(b, null, e)
    };
    if (J.pie) J.pie.prototype.drawDataLabels = function () {
        var a = this,
            b = a.data,
            c, d = a.chart,
            e = a.options.dataLabels,
            f = o(e.connectorPadding,
                10),
            g = o(e.connectorWidth, 1),
            h = d.plotWidth,
            d = d.plotHeight,
            i, j, k = o(e.softConnector, !0),
            l = e.distance,
            m = a.center,
            n = m[2] / 2,
            q = m[1],
            r = l > 0,
            s, u, w, x, y = [
                [],
                []
            ],
            z, B, E, H, A, D = [0, 0, 0, 0],
            J = function (a, b) {
                return b.y - a.y
            };
        if (a.visible && (e.enabled || a._hasPointLabels)) {
            M.prototype.drawDataLabels.apply(a);
            p(b, function (a) {
                a.dataLabel && a.visible && y[a.half].push(a)
            });
            for (H = 0; !x && b[H];) x = b[H] && b[H].dataLabel && (b[H].dataLabel.getBBox().height || 21), H++;
            for (H = 2; H--;) {
                var b = [],
                    I = [],
                    F = y[H],
                    G = F.length,
                    C;
                a.sortByAngle(F, H - 0.5);
                if (l >
                    0) {
                    for (A = q - n - l; A <= q + n + l; A += x) b.push(A);
                    u = b.length;
                    if (G > u) {
                        c = [].concat(F);
                        c.sort(J);
                        for (A = G; A--;) c[A].rank = A;
                        for (A = G; A--;) F[A].rank >= u && F.splice(A, 1);
                        G = F.length
                    }
                    for (A = 0; A < G; A++) {
                        c = F[A];
                        w = c.labelPos;
                        c = 9999;
                        var O, L;
                        for (L = 0; L < u; L++) O = N(b[L] - w[1]), O < c && (c = O, C = L);
                        if (C < A && b[A] !== null) C = A;
                        else
                            for (u < G - A + C && b[A] !== null && (C = u - G + A); b[C] === null;) C++;
                        I.push({
                            i: C,
                            y: b[C]
                        });
                        b[C] = null
                    }
                    I.sort(J)
                }
                for (A = 0; A < G; A++) {
                    c = F[A];
                    w = c.labelPos;
                    s = c.dataLabel;
                    E = c.visible === !1 ? "hidden" : "visible";
                    c = w[1];
                    if (l > 0) {
                        if (u = I.pop(), C = u.i,
                            B = u.y, c > B && b[C + 1] !== null || c < B && b[C - 1] !== null) B = c
                    } else B = c;
                    z = e.justify ? m[0] + (H ? -1 : 1) * (n + l) : a.getX(C === 0 || C === b.length - 1 ? c : B, H);
                    s._attr = {
                        visibility: E,
                        align: w[6]
                    };
                    s._pos = {
                        x: z + e.x + ({
                            left: f,
                            right: -f
                        }[w[6]] || 0),
                        y: B + e.y - 10
                    };
                    s.connX = z;
                    s.connY = B;
                    if (this.options.size === null) u = s.width, z - u < f ? D[3] = t(v(u - z + f), D[3]) : z + u > h - f && (D[1] = t(v(z + u - h + f), D[1])), B - x / 2 < 0 ? D[0] = t(v(-B + x / 2), D[0]) : B + x / 2 > d && (D[2] = t(v(B + x / 2 - d), D[2]))
                }
            }
            if (Ba(D) === 0 || this.verifyDataLabelOverflow(D)) this.placeDataLabels(), r && g && p(this.points, function (b) {
                i =
                    b.connector;
                w = b.labelPos;
                if ((s = b.dataLabel) && s._pos) E = s._attr.visibility, z = s.connX, B = s.connY, j = k ? ["M", z + (w[6] === "left" ? 5 : -5), B, "C", z, B, 2 * w[2] - w[4], 2 * w[3] - w[5], w[2], w[3], "L", w[4], w[5]] : ["M", z + (w[6] === "left" ? 5 : -5), B, "L", w[2], w[3], "L", w[4], w[5]], i ? (i.animate({
                    d: j
                }), i.attr("visibility", E)) : b.connector = i = a.chart.renderer.path(j).attr({
                    "stroke-width": g,
                    stroke: e.connectorColor || b.color || "#606060",
                    visibility: E
                }).add(a.group);
                else if (i) b.connector = i.destroy()
            })
        }
    }, J.pie.prototype.placeDataLabels = function () {
        p(this.points,
            function (a) {
                var a = a.dataLabel,
                    b;
                if (a)(b = a._pos) ? (a.attr(a._attr), a[a.moved ? "animate" : "attr"](b), a.moved = !0) : a && a.attr({
                    y: -999
                })
            })
    }, J.pie.prototype.alignDataLabel = Ea, J.pie.prototype.verifyDataLabelOverflow = function (a) {
        var b = this.center,
            c = this.options,
            d = c.center,
            e = c = c.minSize || 80,
            f;
        d[0] !== null ? e = t(b[2] - t(a[1], a[3]), c) : (e = t(b[2] - a[1] - a[3], c), b[0] += (a[3] - a[1]) / 2);
        d[1] !== null ? e = t(E(e, b[2] - t(a[0], a[2])), c) : (e = t(E(e, b[2] - a[0] - a[2]), c), b[1] += (a[0] - a[2]) / 2);
        e < b[2] ? (b[2] = e, this.translate(b), p(this.points, function (a) {
            if (a.dataLabel) a.dataLabel._pos =
                null
        }), this.drawDataLabels && this.drawDataLabels()) : f = !0;
        return f
    };
    if (J.column) J.column.prototype.alignDataLabel = function (a, b, c, d, e) {
        var f = this.chart,
            g = f.inverted,
            h = a.dlBox || a.shapeArgs,
            i = a.below || a.plotY > o(this.translatedThreshold, f.plotSizeY),
            j = o(c.inside, !! this.options.stacking);
        if (h && (d = w(h), g && (d = {
            x: f.plotWidth - d.y - d.height,
            y: f.plotHeight - d.x - d.width,
            width: d.height,
            height: d.width
        }), !j)) g ? (d.x += i ? 0 : d.width, d.width = 0) : (d.y += i ? d.height : 0, d.height = 0);
        c.align = o(c.align, !g || j ? "center" : i ? "right" : "left");
        c.verticalAlign = o(c.verticalAlign, g || j ? "middle" : i ? "top" : "bottom");
        M.prototype.alignDataLabel.call(this, a, b, c, d, e)
    };
    R = Q.TrackerMixin = {
        drawTrackerPoint: function () {
            var a = this,
                b = a.chart,
                c = b.pointer,
                d = a.options.cursor,
                e = d && {
                    cursor: d
                }, f = function (c) {
                    var d = c.target,
                        e;
                    if (b.hoverSeries !== a) a.onMouseOver();
                    for (; d && !e;) e = d.point, d = d.parentNode;
                    if (e !== u && e !== b.hoverPoint) e.onMouseOver(c)
                };
            p(a.points, function (a) {
                if (a.graphic) a.graphic.element.point = a;
                if (a.dataLabel) a.dataLabel.element.point = a
            });
            if (!a._hasTracking) p(a.trackerGroups,
                function (b) {
                    if (a[b] && (a[b].addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function (a) {
                        c.onTrackerMouseOut(a)
                    }).css(e), $a)) a[b].on("touchstart", f)
                }), a._hasTracking = !0
        },
        drawTrackerGraph: function () {
            var a = this,
                b = a.options,
                c = b.trackByArea,
                d = [].concat(c ? a.areaPath : a.graphPath),
                e = d.length,
                f = a.chart,
                g = f.pointer,
                h = f.renderer,
                i = f.options.tooltip.snap,
                j = a.tracker,
                k = b.cursor,
                l = k && {
                    cursor: k
                }, k = a.singlePoints,
                m, n = function () {
                    if (f.hoverSeries !== a) a.onMouseOver()
                }, o = "rgba(192,192,192," + (X ? 1.0E-4 : 0.002) +
                    ")";
            if (e && !c)
                for (m = e + 1; m--;) d[m] === "M" && d.splice(m + 1, 0, d[m + 1] - i, d[m + 2], "L"), (m && d[m] === "M" || m === e) && d.splice(m, 0, "L", d[m - 2] + i, d[m - 1]);
            for (m = 0; m < k.length; m++) e = k[m], d.push("M", e.plotX - i, e.plotY, "L", e.plotX + i, e.plotY);
            j ? j.attr({
                d: d
            }) : (a.tracker = h.path(d).attr({
                "stroke-linejoin": "round",
                visibility: a.visible ? "visible" : "hidden",
                stroke: o,
                fill: c ? o : O,
                "stroke-width": b.lineWidth + (c ? 0 : 2 * i),
                zIndex: 2
            }).add(a.group), p([a.tracker, a.markerGroup], function (a) {
                a.addClass("highcharts-tracker").on("mouseover", n).on("mouseout",
                    function (a) {
                        g.onTrackerMouseOut(a)
                    }).css(l);
                if ($a) a.on("touchstart", n)
            }))
        }
    };
    if (J.column) ea.prototype.drawTracker = R.drawTrackerPoint;
    if (J.pie) J.pie.prototype.drawTracker = R.drawTrackerPoint;
    if (J.scatter) ma.prototype.drawTracker = R.drawTrackerPoint;
    s(lb.prototype, {
        setItemEvents: function (a, b, c, d, e) {
            var f = this;
            (c ? b : a.legendGroup).on("mouseover", function () {
                a.setState("hover");
                b.css(f.options.itemHoverStyle)
            }).on("mouseout", function () {
                b.css(a.visible ? d : e);
                a.setState()
            }).on("click", function (b) {
                var c = function () {
                    a.setVisible()
                },
                    b = {
                        browserEvent: b
                    };
                a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : I(a, "legendItemClick", b, c)
            })
        },
        createCheckboxForItem: function (a) {
            a.checkbox = V("input", {
                type: "checkbox",
                checked: a.selected,
                defaultChecked: a.selected
            }, this.options.itemCheckboxStyle, this.chart.container);
            C(a.checkbox, "click", function (b) {
                I(a, "checkboxClick", {
                    checked: b.target.checked
                }, function () {
                    a.select()
                })
            })
        }
    });
    L.legend.itemStyle.cursor = "pointer";
    s(Ya.prototype, {
        showResetZoom: function () {
            var a = this,
                b = L.lang,
                c = a.options.chart.resetZoomButton,
                d = c.theme,
                e = d.states,
                f = c.relativeTo === "chart" ? null : "plotBox";
            this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function () {
                a.zoomOut()
            }, d, e && e.hover).attr({
                align: c.position.align,
                title: b.resetZoomTitle
            }).add().align(c.position, !1, f)
        },
        zoomOut: function () {
            var a = this;
            I(a, "selection", {
                resetSelection: !0
            }, function () {
                a.zoom()
            })
        },
        zoom: function (a) {
            var b, c = this.pointer,
                d = !1,
                e;
            !a || a.resetSelection ? p(this.axes, function (a) {
                b = a.zoom()
            }) : p(a.xAxis.concat(a.yAxis), function (a) {
                var e = a.axis,
                    h = e.isXAxis;
                if (c[h ?
                    "zoomX" : "zoomY"] || c[h ? "pinchX" : "pinchY"]) b = e.zoom(a.min, a.max), e.displayBtn && (d = !0)
            });
            e = this.resetZoomButton;
            if (d && !e) this.showResetZoom();
            else if (!d && $(e)) this.resetZoomButton = e.destroy();
            b && this.redraw(o(this.options.chart.animation, a && a.animation, this.pointCount < 100))
        },
        pan: function (a, b) {
            var c = this,
                d = c.hoverPoints,
                e;
            d && p(d, function (a) {
                a.setState()
            });
            p(b === "xy" ? [1, 0] : [1], function (b) {
                var d = a[b ? "chartX" : "chartY"],
                    h = c[b ? "xAxis" : "yAxis"][0],
                    i = c[b ? "mouseDownX" : "mouseDownY"],
                    j = (h.pointRange || 0) / 2,
                    k = h.getExtremes(),
                    l = h.toValue(i - d, !0) + j,
                    i = h.toValue(i + c[b ? "plotWidth" : "plotHeight"] - d, !0) - j;
                h.series.length && l > E(k.dataMin, k.min) && i < t(k.dataMax, k.max) && (h.setExtremes(l, i, !1, !1, {
                    trigger: "pan"
                }), e = !0);
                c[b ? "mouseDownX" : "mouseDownY"] = d
            });
            e && c.redraw(!1);
            D(c.container, {
                cursor: "move"
            })
        }
    });
    s(Fa.prototype, {
        select: function (a, b) {
            var c = this,
                d = c.series,
                e = d.chart,
                a = o(a, !c.selected);
            c.firePointEvent(a ? "select" : "unselect", {
                accumulate: b
            }, function () {
                c.selected = c.options.selected = a;
                d.options.data[va(c, d.data)] = c.options;
                c.setState(a &&
                    "select");
                b || p(e.getSelectedPoints(), function (a) {
                    if (a.selected && a !== c) a.selected = a.options.selected = !1, d.options.data[va(a, d.data)] = a.options, a.setState(""), a.firePointEvent("unselect")
                })
            })
        },
        onMouseOver: function (a) {
            var b = this.series,
                c = b.chart,
                d = c.tooltip,
                e = c.hoverPoint;
            if (e && e !== this) e.onMouseOut();
            this.firePointEvent("mouseOver");
            d && (!d.shared || b.noSharedTooltip) && d.refresh(this, a);
            this.setState("hover");
            c.hoverPoint = this
        },
        onMouseOut: function () {
            var a = this.series.chart,
                b = a.hoverPoints;
            if (!b || va(this,
                b) === -1) this.firePointEvent("mouseOut"), this.setState(), a.hoverPoint = null
        },
        firePointEvent: function (a, b, c) {
            var d = this,
                e = this.series.options;
            (e.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents();
            a === "click" && e.allowPointSelect && (c = function (a) {
                d.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
            });
            I(this, a, b, c)
        },
        importEvents: function () {
            if (!this.hasImportedEvents) {
                var a = w(this.series.options.point, this.options).events,
                    b;
                this.events = a;
                for (b in a) C(this, b, a[b]);
                this.hasImportedEvents = !0
            }
        },
        setState: function (a, b) {
            var c = this.plotX,
                d = this.plotY,
                e = this.series,
                f = e.options.states,
                g = Z[e.type].marker && e.options.marker,
                h = g && !g.enabled,
                i = g && g.states[a],
                j = i && i.enabled === !1,
                k = e.stateMarkerGraphic,
                l = this.marker || {}, m = e.chart,
                n = this.pointAttr,
                a = a || "",
                b = b && k;
            if (!(a === this.state && !b || this.selected && a !== "select" || f[a] && f[a].enabled === !1 || a && (j || h && !i.enabled) || a && l.states && l.states[a] && l.states[a].enabled === !1)) {
                if (this.graphic) f = g && this.graphic.symbolName && n[a].r, this.graphic.attr(w(n[a], f ? {
                    x: c -
                        f,
                    y: d - f,
                    width: 2 * f,
                    height: 2 * f
                } : {}));
                else {
                    if (a && i)
                        if (f = i.radius, l = l.symbol || e.symbol, k && k.currentSymbol !== l && (k = k.destroy()), k) k[b ? "animate" : "attr"]({
                            x: c - f,
                            y: d - f
                        });
                        else e.stateMarkerGraphic = k = m.renderer.symbol(l, c - f, d - f, 2 * f, 2 * f).attr(n[a]).add(e.markerGroup), k.currentSymbol = l;
                    if (k) k[a && m.isInsidePlot(c, d, m.inverted) ? "show" : "hide"]()
                }
                this.state = a
            }
        }
    });
    s(M.prototype, {
        onMouseOver: function () {
            var a = this.chart,
                b = a.hoverSeries;
            if (b && b !== this) b.onMouseOut();
            this.options.events.mouseOver && I(this, "mouseOver");
            this.setState("hover");
            a.hoverSeries = this
        },
        onMouseOut: function () {
            var a = this.options,
                b = this.chart,
                c = b.tooltip,
                d = b.hoverPoint;
            if (d) d.onMouseOut();
            this && a.events.mouseOut && I(this, "mouseOut");
            c && !a.stickyTracking && (!c.shared || this.noSharedTooltip) && c.hide();
            this.setState();
            b.hoverSeries = null
        },
        setState: function (a) {
            var b = this.options,
                c = this.graph,
                d = this.graphNeg,
                e = b.states,
                b = b.lineWidth,
                a = a || "";
            if (this.state !== a) this.state = a, e[a] && e[a].enabled === !1 || (a && (b = e[a].lineWidth || b + 1), c && !c.dashstyle && (a = {
                    "stroke-width": b
                },
                c.attr(a), d && d.attr(a)))
        },
        setVisible: function (a, b) {
            var c = this,
                d = c.chart,
                e = c.legendItem,
                f, g = d.options.chart.ignoreHiddenSeries,
                h = c.visible;
            f = (c.visible = a = c.userOptions.visible = a === u ? !h : a) ? "show" : "hide";
            p(["group", "dataLabelsGroup", "markerGroup", "tracker"], function (a) {
                if (c[a]) c[a][f]()
            });
            if (d.hoverSeries === c) c.onMouseOut();
            e && d.legend.colorizeItem(c, a);
            c.isDirty = !0;
            c.options.stacking && p(d.series, function (a) {
                if (a.options.stacking && a.visible) a.isDirty = !0
            });
            p(c.linkedSeries, function (b) {
                b.setVisible(a, !1)
            });
            if (g) d.isDirtyBox = !0;
            b !== !1 && d.redraw();
            I(c, f)
        },
        setTooltipPoints: function (a) {
            var b = [],
                c, d, e = this.xAxis,
                f = e && e.getExtremes(),
                g = e ? e.tooltipLen || e.len : this.chart.plotSizeX,
                h, i, j = [];
            if (!(this.options.enableMouseTracking === !1 || this.singularTooltips)) {
                if (a) this.tooltipPoints = null;
                p(this.segments || this.points, function (a) {
                    b = b.concat(a)
                });
                e && e.reversed && (b = b.reverse());
                this.orderTooltipPoints && this.orderTooltipPoints(b);
                a = b.length;
                for (i = 0; i < a; i++)
                    if (e = b[i], c = e.x, c >= f.min && c <= f.max) {
                        h = b[i + 1];
                        c = d === u ?
                            0 : d + 1;
                        for (d = b[i + 1] ? E(t(0, S((e.clientX + (h ? h.wrappedClientX || h.clientX : g)) / 2)), g) : g; c >= 0 && c <= d;) j[c++] = e
                    }
                this.tooltipPoints = j
            }
        },
        show: function () {
            this.setVisible(!0)
        },
        hide: function () {
            this.setVisible(!1)
        },
        select: function (a) {
            this.selected = a = a === u ? !this.selected : a;
            if (this.checkbox) this.checkbox.checked = a;
            I(this, a ? "select" : "unselect")
        },
        drawTracker: R.drawTrackerGraph
    });
    s(Q, {
        Axis: ka,
        Chart: Ya,
        Color: wa,
        Point: Fa,
        Tick: Sa,
        Renderer: Za,
        Series: M,
        SVGElement: ta,
        SVGRenderer: pa,
        arrayMin: Na,
        arrayMax: Ba,
        charts: Y,
        dateFormat: bb,
        format: Ia,
        pathAnim: ub,
        getOptions: function () {
            return L
        },
        hasBidiBug: Ob,
        isTouchDevice: Jb,
        numberFormat: Ga,
        seriesTypes: J,
        setOptions: function (a) {
            L = w(!0, L, a);
            Cb();
            return L
        },
        addEvent: C,
        removeEvent: U,
        createElement: V,
        discardElement: Pa,
        css: D,
        each: p,
        extend: s,
        map: Ua,
        merge: w,
        pick: o,
        splat: na,
        extendClass: ja,
        pInt: x,
        wrap: Ma,
        svg: X,
        canvas: ca,
        vml: !X && !ca,
        product: "Highcharts",
        version: "3.0.10"
    })
})();