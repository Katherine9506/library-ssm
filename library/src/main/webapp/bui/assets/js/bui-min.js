/**
 * Sea.js 2.1.1 | seajs.org/LICENSE.md
 */(function (e, t) {
    function i(e) {
        return function (t) {
            return Object.prototype.toString.call(t) === "[object " + e + "]"
        }
    }

    function l() {
        return f++
    }

    function m(e) {
        return e.match(p)[0]
    }

    function g(e) {
        e = e.replace(d, "/");
        while (e.match(v)) e = e.replace(v, "/");
        return e
    }

    function y(e) {
        var t = e.length - 1, n = e.charAt(t);
        return n === "#" ? e.substring(0, t) : e.substring(t - 2) === ".js" || e.indexOf("?") > 0 || e.substring(t - 3) === ".css" || n === "/" ? e : e + ".js"
    }

    function E(e) {
        var t = r.alias;
        return t && o(t[e]) ? t[e] : e
    }

    function S(e) {
        var t = r.paths, n;
        return t && (n = e.match(b)) && o(t[n[1]]) && (e = t[n[1]] + n[2]), e
    }

    function x(e) {
        var t = r.vars;
        return t && e.indexOf("{") > -1 && (e = e.replace(w, function (e, n) {
            return o(t[n]) ? t[n] : e
        })), e
    }

    function T(e) {
        var t = r.map, n = e;
        if (t) for (var i = 0, s = t.length; i < s; i++) {
            var o = t[i];
            n = a(o) ? o(e) || e : e.replace(o[0], o[1]);
            if (n !== e) break
        }
        return n
    }

    function k(e, t) {
        var n, i = e.charAt(0);
        if (N.test(e)) n = e; else if (i === ".") n = g((t ? m(t) : r.cwd) + e); else if (i === "/") {
            var s = r.cwd.match(C);
            n = s ? s[0] + e.substring(1) : e
        } else n = r.base + e;
        return n
    }

    function L(e, t) {
        if (!e) return "";
        e = E(e), e = S(e), e = x(e), e = y(e);
        var n = k(e, t);
        return n = T(n), n
    }

    function H(e) {
        return e.hasAttribute ? e.src : e.getAttribute("src", 4)
    }

    function z(e, t, n) {
        var r = F.test(e), i = A.createElement(r ? "link" : "script");
        if (n) {
            var s = a(n) ? n(e) : n;
            s && (i.charset = s)
        }
        W(i, t, r), r ? (i.rel = "stylesheet", i.href = e) : (i.async = !0, i.src = e), q = i, j ? B.insertBefore(i, j) : B.appendChild(i), q = null
    }

    function W(e, t, n) {
        var i = n && (U || !("onload" in e));
        if (i) {
            setTimeout(function () {
                X(e, t)
            }, 1);
            return
        }
        e.onload = e.onerror = e.onreadystatechange = function () {
            I.test(e.readyState) && (e.onload = e.onerror = e.onreadystatechange = null, !n && !r.debug && B.removeChild(e), e = null, t())
        }
    }

    function X(e, t) {
        var n = e.sheet, r;
        if (U) n && (r = !0); else if (n) try {
            n.cssRules && (r = !0)
        } catch (i) {
            i.name === "NS_ERROR_DOM_SECURITY_ERR" && (r = !0)
        }
        setTimeout(function () {
            r ? t() : X(e, t)
        }, 20)
    }

    function V() {
        if (q) return q;
        if (R && R.readyState === "interactive") return R;
        var e = B.getElementsByTagName("script");
        for (var t = e.length - 1; t >= 0; t--) {
            var n = e[t];
            if (n.readyState === "interactive") return R = n, R
        }
    }

    function K(e) {
        var t = [];
        return e.replace(J, "").replace($, function (e, n, r) {
            r && t.push(r)
        }), t
    }

    function nt(e, t) {
        this.uri = e, this.dependencies = t || [], this.exports = null, this.status = 0, this._waitings = {}, this._remain = 0
    }

    if (e.seajs) return;
    var n = e.seajs = {version: "2.1.1"}, r = n.data = {}, s = i("Object"), o = i("String"),
        u = Array.isArray || i("Array"), a = i("Function"), f = 0, c = r.events = {};
    n.on = function (e, t) {
        var r = c[e] || (c[e] = []);
        return r.push(t), n
    }, n.off = function (e, t) {
        if (!e && !t) return c = r.events = {}, n;
        var i = c[e];
        if (i) if (t) for (var s = i.length - 1; s >= 0; s--) i[s] === t && i.splice(s, 1); else delete c[e];
        return n
    };
    var h = n.emit = function (e, t) {
            var r = c[e], i;
            if (r) {
                r = r.slice();
                while (i = r.shift()) i(t)
            }
            return n
        }, p = /[^?#]*\//, d = /\/\.\//g, v = /\/[^/]+\/\.\.\//, b = /^([^/:]+)(\/.+)$/, w = /{([^{]+)}/g, N = /^\/\/.|:\//,
        C = /^.*?\/\/.*?\//, A = document, O = location, M = m(O.href), _ = A.getElementsByTagName("script"),
        D = A.getElementById("seajsnode") || _[_.length - 1], P = m(H(D) || M),
        B = A.getElementsByTagName("head")[0] || A.documentElement, j = B.getElementsByTagName("base")[0],
        F = /\.css(?:\?|$)/i, I = /^(?:loaded|complete|undefined)$/, q, R,
        U = navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, "$1") * 1 < 536,
        $ = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,
        J = /\\\\/g, Q = n.cache = {}, G, Y = {}, Z = {}, et = {},
        tt = nt.STATUS = {FETCHING: 1, SAVED: 2, LOADING: 3, LOADED: 4, EXECUTING: 5, EXECUTED: 6};
    nt.prototype.resolve = function () {
        var e = this, t = e.dependencies, n = [];
        for (var r = 0, i = t.length; r < i; r++) n[r] = nt.resolve(t[r], e.uri);
        return n
    }, nt.prototype.load = function () {
        var e = this;
        if (e.status >= tt.LOADING) return;
        e.status = tt.LOADING;
        var t = e.resolve();
        h("load", t);
        var n = e._remain = t.length, r;
        for (var i = 0; i < n; i++) r = nt.get(t[i]), r.status < tt.LOADED ? r._waitings[e.uri] = (r._waitings[e.uri] || 0) + 1 : e._remain--;
        if (e._remain === 0) {
            e.onload();
            return
        }
        var s = {};
        for (i = 0; i < n; i++) r = Q[t[i]], r.status < tt.FETCHING ? r.fetch(s) : r.status === tt.SAVED && r.load();
        for (var o in s) s.hasOwnProperty(o) && s[o]()
    }, nt.prototype.onload = function () {
        var e = this;
        e.status = tt.LOADED, e.callback && e.callback();
        var t = e._waitings, n, r;
        for (n in t) t.hasOwnProperty(n) && (r = Q[n], r._remain -= t[n], r._remain === 0 && r.onload());
        delete e._waitings, delete e._remain
    }, nt.prototype.fetch = function (e) {
        function o() {
            z(i.requestUri, i.onRequest, i.charset)
        }

        function u() {
            delete Y[s], Z[s] = !0, G && (nt.save(n, G), G = null);
            var e, t = et[s];
            delete et[s];
            while (e = t.shift()) e.load()
        }

        var t = this, n = t.uri;
        t.status = tt.FETCHING;
        var i = {uri: n};
        h("fetch", i);
        var s = i.requestUri || n;
        if (!s || Z[s]) {
            t.load();
            return
        }
        if (Y[s]) {
            et[s].push(t);
            return
        }
        Y[s] = !0, et[s] = [t], h("request", i = {
            uri: n,
            requestUri: s,
            onRequest: u,
            charset: r.charset
        }), i.requested || (e ? e[i.requestUri] = o : o())
    }, nt.prototype.exec = function () {
        function r(e) {
            return nt.get(r.resolve(e)).exec()
        }

        var e = this;
        if (e.status >= tt.EXECUTING) return e.exports;
        e.status = tt.EXECUTING;
        var n = e.uri;
        r.resolve = function (e) {
            return nt.resolve(e, n)
        }, r.async = function (e, t) {
            return nt.use(e, t, n + "_async_" + l()), r
        };
        var i = e.factory, s = a(i) ? i(r, e.exports = {}, e) : i;
        return s === t && (s = e.exports), s === null && !F.test(n) && h("error", e), delete e.factory, e.exports = s, e.status = tt.EXECUTED, h("exec", e), s
    }, nt.resolve = function (e, t) {
        var n = {id: e, refUri: t};
        return h("resolve", n), n.uri || L(n.id, t)
    }, nt.define = function (e, n, r) {
        var i = arguments.length;
        i === 1 ? (r = e, e = t) : i === 2 && (r = n, u(e) ? (n = e, e = t) : n = t), !u(n) && a(r) && (n = K(r.toString()));
        var s = {id: e, uri: nt.resolve(e), deps: n, factory: r};
        if (!s.uri && A.attachEvent) {
            var o = V();
            o && (s.uri = o.src)
        }
        h("define", s), s.uri ? nt.save(s.uri, s) : G = s
    }, nt.save = function (e, t) {
        var n = nt.get(e);
        n.status < tt.SAVED && (n.id = t.id || e, n.dependencies = t.deps || [], n.factory = t.factory, n.status = tt.SAVED)
    }, nt.get = function (e, t) {
        return Q[e] || (Q[e] = new nt(e, t))
    }, nt.use = function (t, n, r) {
        var i = nt.get(r, u(t) ? t : [t]);
        i.callback = function () {
            var t = [], r = i.resolve();
            for (var s = 0, o = r.length; s < o; s++) t[s] = Q[r[s]].exec();
            n && n.apply(e, t), delete i.callback
        }, i.load()
    }, nt.preload = function (e) {
        var t = r.preload, n = t.length;
        n ? nt.use(t, function () {
            t.splice(0, n), nt.preload(e)
        }, r.cwd + "_preload_" + l()) : e()
    }, n.use = function (e, t) {
        return nt.preload(function () {
            nt.use(e, t, r.cwd + "_use_" + l())
        }), n
    }, nt.define.cmd = {}, e.define = nt.define, n.Module = nt, r.fetchedList = Z, r.cid = l, n.resolve = L, n.require = function (e) {
        return (Q[nt.resolve(e)] || {}).exports
    };
    var rt = /^(.+?\/)(\?\?)?(seajs\/)+/;
    r.base = (P.match(rt) || ["", P])[1], r.dir = P, r.cwd = M, r.charset = "utf-8", r.preload = function () {
        var e = [], t = O.search.replace(/(seajs-\w+)(&|$)/g, "$1=1$2");
        return t += " " + A.cookie, t.replace(/(seajs-\w+)=1/g, function (t, n) {
            e.push(n)
        }), e
    }(), n.config = function (e) {
        for (var t in e) {
            var i = e[t], o = r[t];
            if (o && s(o)) for (var a in i) o[a] = i[a]; else u(o) ? i = o.concat(i) : t === "base" && (i.slice(-1) === "/" || (i += "/"), i = k(i)), r[t] = i
        }
        return h("config", e), n
    }
})(this), function () {
    var e = seajs.pluginSDK ? seajs.pluginSDK.util.loaderDir : seajs.data.base, t = e.lastIndexOf("/");
    t == e.length - 1 && (e = e.substr(0, t)), seajs.config({charset: "utf-8"}), seajs.config({paths: {bui: e}});
    var n = window.BUI = window.BUI || {}, r = document.getElementsByTagName("script"), i = r[r.length - 1];
    n.loaderScript = i, i.getAttribute("data-debug") == "true" ? n.debug = !0 : n.debug = !1, n.use = seajs.use, n.config = function (e) {
        e.alias && (e.paths = e.alias, delete e.alias), seajs.config(e)
    }, n.setDebug = function (e) {
        n.debug = e;
        if (e) {
            var t = seajs.data.map, r = -1;
            if (t) {
                for (var i = 0; i < t.length; i++) {
                    var s = t[i];
                    if (s[0].toString() == /.js$/.toString() && s[1] == "-min.js") {
                        r = i;
                        break
                    }
                }
                r != -1 && t.splice(r, 1)
            }
        } else seajs.config({map: [[/.js$/, "-min.js"]]})
    }, n.setDebug(n.debug)
}(), function () {
    var e = ["bui/util", "bui/ua", "bui/json", "bui/date", "bui/array", "bui/keycode", "bui/observable", "bui/base", "bui/component"];
    window.KISSY && (!window.KISSY.Node || !window.jQuery) && e.unshift("bui/adapter"), define("bui/common", e, function (e) {
        window.KISSY && (!window.KISSY.Node || !window.jQuery) && e("bui/adapter");
        var t = e("bui/util");
        return t.mix(t, {
            UA: e("bui/ua"),
            JSON: e("bui/json"),
            Date: e("bui/date"),
            Array: e("bui/array"),
            KeyCode: e("bui/keycode"),
            Observable: e("bui/observable"),
            Base: e("bui/base"),
            Component: e("bui/component")
        }), t
    })
}(), window.BUI = window.BUI || {}, !BUI.use && window.seajs && (BUI.use = seajs.use, BUI.config = seajs.config), define("bui/util", function (e) {
    function t(e, t) {
        for (var r in t) t.hasOwnProperty(r) && (e[r] = e[r] || {}, n(e[r], t[r]))
    }

    function n(e, t) {
        for (var n in t) t.hasOwnProperty(n) && (n == "value" ? BUI.isObject(t[n]) ? (e[n] = e[n] || {}, BUI.mix(e[n], t[n])) : BUI.isArray(t[n]) ? (e[n] = e[n] || [], e[n] = e[n].concat(t[n])) : e[n] = t[n] : e[n] = t[n])
    }

    (function (e) {
        e.fn && (e.fn.on = e.fn.on || e.fn.bind, e.fn.off = e.fn.off || e.fn.unbind)
    })(jQuery);
    var r = window, i = document, s = Object.prototype, o = s.toString, u = "body", a = "documentElement", f = "scroll",
        l = f + "Width", c = f + "Height", h = "ATTRS", p = "PARSER", d = "guid";
    $.extend(BUI, {
        version: 1, subVersion: 90, isFunction: function (e) {
            return typeof e == "function"
        }, isArray: "isArray" in Array ? Array.isArray : function (e) {
            return o.call(e) === "[object Array]"
        }, isDate: function (e) {
            return o.call(e) === "[object Date]"
        }, isObject: o.call(null) === "[object Object]" ? function (e) {
            return e !== null && e !== undefined && o.call(e) === "[object Object]" && e.ownerDocument === undefined
        } : function (e) {
            return o.call(e) === "[object Object]"
        }, isNumeric: function (e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        }, augment: function (e, t) {
            if (!BUI.isFunction(e)) return e;
            for (var n = 1; n < arguments.length; n++) BUI.mix(e.prototype, arguments[n].prototype || arguments[n]);
            return e
        }, cloneObject: function (e) {
            var t = BUI.isArray(e) ? [] : {};
            return BUI.mix(!0, t, e)
        }, error: function (e) {
            if (BUI.debug) throw e
        }, extend: function (e, t, n, r) {
            BUI.isFunction(t) || (n = t, t = e, e = function () {
            });
            var i = Object.create ? function (e, t) {
                return Object.create(e, {constructor: {value: t}})
            } : function (e, t) {
                function n() {
                }

                n.prototype = e;
                var r = new n;
                return r.constructor = t, r
            }, s = i(t.prototype, e);
            return e.prototype = BUI.mix(s, e.prototype), e.superclass = i(t.prototype, t), BUI.mix(s, n), BUI.mix(e, r), e
        }, guid: function () {
            var e = {};
            return function (t) {
                return t = t || BUI.prefix + d, e[t] ? e[t] += 1 : e[t] = 1, t + e[t]
            }
        }(), isString: function (e) {
            return typeof e == "string"
        }, isNumber: function (e) {
            return typeof e == "number"
        }, isBoolean: function (e) {
            return typeof e == "boolean"
        }, log: function (e) {
            BUI.debug && r.console && r.console.log && r.console.log(e)
        }, merge: function () {
            var e = $.makeArray(arguments), t = e[0];
            return BUI.isBoolean(t) ? (e.shift(), e.unshift({}), e.unshift(t)) : e.unshift({}), BUI.mix.apply(null, e)
        }, mix: function () {
            return $.extend.apply(null, arguments)
        }, app: function (e) {
            return window[e] || (window[e] = {
                namespace: function (t) {
                    return BUI.namespace(t, window[e])
                }
            }), window[e]
        }, mixAttrs: t, mixAttr: n, mixin: function (e, n, r) {
            r = r || [h, p];
            var i = n;
            if (i) {
                e.mixins = i;
                var s = {}, o = i.concat(e);
                BUI.each(o, function (e) {
                    e && BUI.each(r, function (n) {
                        e[n] && (s[n] = s[n] || {}, n == "ATTRS" ? t(s[n], e[n]) : BUI.mix(s[n], e[n]))
                    })
                }), BUI.each(s, function (t, n) {
                    e[n] = t
                });
                var u = {};
                BUI.each(o, function (e) {
                    if (e) {
                        var t = e.prototype;
                        for (var n in t) t.hasOwnProperty(n) && (u[n] = t[n])
                    }
                }), BUI.each(u, function (t, n) {
                    e.prototype[n] = t
                })
            }
            return e
        }, namespace: function (e, t) {
            t = t || BUI;
            if (!e) return t;
            var n = e.split("."), r = t;
            for (var i = 0; i < n.length; i++) {
                var s = n[i];
                r[s] || (r[s] = {}), r = r[s]
            }
            return r
        }, prefix: "bui-", substitute: function (e, t, n) {
            return !BUI.isString(e) || !BUI.isObject(t) && !BUI.isArray(t) ? e : e.replace(n || /\\?\{([^{}]+)\}/g, function (e, n) {
                return e.charAt(0) === "\\" ? e.slice(1) : t[n] === undefined ? "" : t[n]
            })
        }, ucfirst: function (e) {
            return e += "", e.charAt(0).toUpperCase() + e.substring(1)
        }, isInView: function (e) {
            var t = e.left, n = e.top, r = BUI.viewportWidth(), i = BUI.viewportHeight(), s = BUI.scrollTop(),
                o = BUI.scrollLeft();
            return t < o || t > o + r ? !1 : n < s || n > s + i ? !1 : !0
        }, isInVerticalView: function (e) {
            var t = BUI.viewportHeight(), n = BUI.scrollTop();
            return e < n || e > n + t ? !1 : !0
        }, isInHorizontalView: function (e) {
            var t = BUI.viewportWidth(), n = BUI.scrollLeft();
            return e < n || e > n + t ? !1 : !0
        }, viewportWidth: function () {
            return $(window).width()
        }, viewportHeight: function () {
            return $(window).height()
        }, scrollLeft: function () {
            return $(window).scrollLeft()
        }, scrollTop: function () {
            return $(window).scrollTop()
        }, docWidth: function () {
            return Math.max(this.viewportWidth(), i[a][l], i[u][l])
        }, docHeight: function () {
            return Math.max(this.viewportHeight(), i[a][c], i[u][c])
        }, each: function (e, t) {
            if (!e) return;
            $.each(e, function (e, n) {
                return t(n, e)
            })
        }, wrapBehavior: function (e, t) {
            return e["__bui_wrap_" + t] = function (n) {
                e.get("disabled") || e[t](n)
            }
        }, getWrapBehavior: function (e, t) {
            return e["__bui_wrap_" + t]
        }, getControl: function (e) {
            return BUI.Component.Manager.getComponent(e)
        }
    });
    var v = BUI.FormHelper = {
        serializeToObject: function (e) {
            var t = $(e).serializeArray(), n = {};
            return BUI.each(t, function (e) {
                var t = e.name;
                n[t] ? (BUI.isArray(n[t]) || (n[t] = [n[t]]), n[t].push(e.value)) : n[t] = e.value
            }), n
        }, setFields: function (e, t) {
            for (var n in t) t.hasOwnProperty(n) && BUI.FormHelper.setField(e, n, t[n])
        }, clear: function (e) {
            var t = $.makeArray(e.elements);
            BUI.each(t, function (e) {
                e.type === "checkbox" || e.type === "radio" ? $(e).attr("checked", !1) : $(e).val(""), $(e).change()
            })
        }, setField: function (e, t, n) {
            var r = e.elements[t];
            r && r.type ? v._setFieldValue(r, n) : (BUI.isArray(r) || r && r.length) && BUI.each(r, function (e) {
                v._setFieldValue(e, n)
            })
        }, _setFieldValue: function (e, t) {
            e.type === "checkbox" ? e.value == "" + t || BUI.isArray(t) && BUI.Array.indexOf(e.value, t) !== -1 ? $(e).attr("checked", !0) : $(e).attr("checked", !1) : e.type === "radio" ? e.value == "" + t ? $(e).attr("checked", !0) : $(e).attr("checked", !1) : $(e).val(t)
        }, getField: function (e, t) {
            return BUI.FormHelper.serializeToObject(e)[t]
        }
    };
    return BUI
}), define("bui/array", ["bui/util"], function (e) {
    var t = e("bui/util");
    return t.Array = {
        peek: function (e) {
            return e[e.length - 1]
        }, indexOf: function (e, t, n) {
            var r = n == null ? 0 : n < 0 ? Math.max(0, t.length + n) : n;
            for (var i = r; i < t.length; i++) if (i in t && t[i] === e) return i;
            return -1
        }, contains: function (e, n) {
            return t.Array.indexOf(e, n) >= 0
        }, each: t.each, equals: function (e, t) {
            if (e == t) return !0;
            if (!e || !t) return !1;
            if (e.length != t.length) return !1;
            var n = !0;
            for (var r = 0; r < e.length; r++) if (e[r] !== t[r]) {
                n = !1;
                break
            }
            return n
        }, filter: function (e, n) {
            var r = [];
            return t.Array.each(e, function (e, t) {
                n(e, t) && r.push(e)
            }), r
        }, map: function (e, n) {
            var r = [];
            return t.Array.each(e, function (e, t) {
                r.push(n(e, t))
            }), r
        }, find: function (e, n) {
            var r = t.Array.findIndex(e, n);
            return r < 0 ? null : e[r]
        }, findIndex: function (e, n) {
            var r = -1;
            return t.Array.each(e, function (e, t) {
                if (n(e, t)) return r = t, !1
            }), r
        }, isEmpty: function (e) {
            return e.length == 0
        }, add: function (e, t) {
            e.push(t)
        }, addAt: function (e, n, r) {
            t.Array.splice(e, r, 0, n)
        }, empty: function (e) {
            if (!(e instanceof Array)) for (var t = e.length - 1; t >= 0; t--) delete e[t];
            e.length = 0
        }, remove: function (e, n) {
            var r = t.Array.indexOf(n, e), i;
            return (i = r >= 0) && t.Array.removeAt(e, r), i
        }, removeAt: function (e, n) {
            return t.Array.splice(e, n, 1).length == 1
        }, slice: function (e, t, n) {
            return arguments.length <= 2 ? Array.prototype.slice.call(e, t) : Array.prototype.slice.call(e, t, n)
        }, splice: function (e, n, r, i) {
            return Array.prototype.splice.apply(e, t.Array.slice(arguments, 1))
        }
    }, t.Array
}), define("bui/observable", ["bui/util"], function (e) {
    function r() {
        return new n
    }

    var t = e("bui/util"), n = function () {
        this._init()
    };
    t.augment(n, {
        _functions: null, _init: function () {
            var e = this;
            e._functions = []
        }, add: function (e) {
            this._functions.push(e)
        }, remove: function (e) {
            var n = this._functions;
            index = t.Array.indexOf(e, n), index >= 0 && n.splice(index, 1)
        }, empty: function () {
            var e = this._functions.length;
            this._functions.splice(0, e)
        }, pause: function () {
            this._paused = !0
        }, resume: function () {
            this._paused = !1
        }, fireWith: function (e, n) {
            var r = this, i;
            if (this._paused) return;
            return t.each(r._functions, function (t) {
                i = t.apply(e, n);
                if (i === !1) return !1
            }), i
        }
    });
    var i = function (e) {
        this._events = [], this._eventMap = {}, this._bubblesEvents = [], this._initEvents(e)
    };
    return t.augment(i, {
        _events: [],
        _eventMap: {},
        _bubblesEvents: [],
        _bubbleTarget: null,
        _getCallbacks: function (e) {
            var t = this, n = t._eventMap;
            return n[e]
        },
        _initEvents: function (e) {
            var t = this, n = null;
            if (!e) return;
            n = e.listeners || {}, e.handler && (n.click = e.handler);
            if (n) for (var r in n) n.hasOwnProperty(r) && t.on(r, n[r])
        },
        _isBubbles: function (e) {
            return t.Array.indexOf(e, this._bubblesEvents) >= 0
        },
        addTarget: function (e) {
            this._bubbleTarget = e
        },
        addEvents: function (e) {
            function o(e) {
                t.Array.indexOf(e, i) === -1 && (s[e] = r(), i.push(e))
            }

            var n = this, i = n._events, s = n._eventMap;
            t.isArray(e) ? $.each(e, function (e, t) {
                o(t)
            }) : o(e)
        },
        clearListeners: function () {
            var e = this, t = e._eventMap;
            for (var n in t) t.hasOwnProperty(n) && t[n].empty()
        },
        fire: function (e, t) {
            var n = this, r = n._getCallbacks(e), i = $.makeArray(arguments), s;
            t || (t = {}, i.push(t)), t.target || (t.target = n), r && (s = r.fireWith(n, Array.prototype.slice.call(i, 1)));
            if (n._isBubbles(e)) {
                var o = n._bubbleTarget;
                o && o.fire && o.fire(e, t)
            }
            return s
        },
        pauseEvent: function (e) {
            var t = this, n = t._getCallbacks(e);
            n && n.pause()
        },
        resumeEvent: function (e) {
            var t = this, n = t._getCallbacks(e);
            n && n.resume()
        },
        on: function (e, n) {
            var r = e.split(" "), i = this, s = null;
            return r.length > 1 ? t.each(r, function (e) {
                i.on(e, n)
            }) : (s = i._getCallbacks(e), s ? s.add(n) : (i.addEvents(e), i.on(e, n))), i
        },
        off: function (e, t) {
            if (!e && !t) return this.clearListeners(), this;
            var n = this, r = n._getCallbacks(e);
            return r && r.remove(t), n
        },
        publish: function (e, n) {
            var r = this, i = r._bubblesEvents;
            if (n.bubbles) t.Array.indexOf(e, i) === -1 && i.push(e); else {
                var s = t.Array.indexOf(e, i);
                s !== -1 && i.splice(s, 1)
            }
        }
    }), i
}), define("bui/ua", function () {
    function e(e) {
        var t = 0;
        return parseFloat(e.replace(/\./g, function () {
            return t++ === 0 ? "." : ""
        }))
    }

    function t(e) {
        e = e.toLowerCase();
        var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [],
            n = {browser: t[1] || "", version: t[2] || "0"}, r = {};
        return n.browser && (r[n.browser] = !0, r.version = n.version), r.chrome ? r.webkit = !0 : r.webkit && (r.safari = !0), r
    }

    var n = $.UA || function () {
        var n = $.browser || t(navigator.userAgent), r = e(n.version),
            i = {ie: n.msie && r, webkit: n.webkit && r, opera: n.opera && r, mozilla: n.mozilla && r};
        return i
    }();
    return n
}), define("bui/json", ["bui/ua"], function (e) {
    function i(e) {
        return e < 10 ? "0" + e : e
    }

    function c(e) {
        return o.lastIndex = 0, o.test(e) ? '"' + e.replace(o, function (e) {
            var t = f[e];
            return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + e + '"'
    }

    function h(e, t) {
        var n, r, i, s, o = u, f, p = t[e];
        p && typeof p == "object" && typeof p.toJSON == "function" && (p = p.toJSON(e)), typeof l == "function" && (p = l.call(t, e, p));
        switch (typeof p) {
            case"string":
                return c(p);
            case"number":
                return isFinite(p) ? String(p) : "null";
            case"boolean":
            case"null":
                return String(p);
            case"object":
                if (!p) return "null";
                u += a, f = [];
                if (Object.prototype.toString.apply(p) === "[object Array]") {
                    s = p.length;
                    for (n = 0; n < s; n += 1) f[n] = h(n, p) || "null";
                    return i = f.length === 0 ? "[]" : u ? "[\n" + u + f.join(",\n" + u) + "\n" + o + "]" : "[" + f.join(",") + "]", u = o, i
                }
                if (l && typeof l == "object") {
                    s = l.length;
                    for (n = 0; n < s; n += 1) r = l[n], typeof r == "string" && (i = h(r, p), i && f.push(c(r) + (u ? ": " : ":") + i))
                } else for (r in p) Object.hasOwnProperty.call(p, r) && (i = h(r, p), i && f.push(c(r) + (u ? ": " : ":") + i));
                return i = f.length === 0 ? "{}" : u ? "{\n" + u + f.join(",\n" + u) + "\n" + o + "}" : "{" + f.join(",") + "}", u = o, i
        }
    }

    function p(e) {
        try {
            return (new Function("return " + e + ";"))()
        } catch (t) {
            throw"Json parse error!"
        }
    }

    var t = window, n = e("bui/ua"), r = t.JSON;
    if (!r || n.ie < 9) r = t.JSON = {};
    typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function (e) {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + i(this.getUTCMonth() + 1) + "-" + i(this.getUTCDate()) + "T" + i(this.getUTCHours()) + ":" + i(this.getUTCMinutes()) + ":" + i(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (e) {
        return this.valueOf()
    });
    var s = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        o = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        u, a, f = {"\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"}, l;
    typeof r.stringify != "function" && (r.stringify = function (e, t, n) {
        var r;
        u = "", a = "";
        if (typeof n == "number") for (r = 0; r < n; r += 1) a += " "; else typeof n == "string" && (a = n);
        l = t;
        if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") return h("", {"": e});
        throw new Error("JSON.stringify")
    });
    var r = {parse: $.parseJSON, looseParse: p, stringify: r.stringify};
    return r
}), define("bui/keycode", function () {
    var e = {
        BACKSPACE: 8,
        TAB: 9,
        NUM_CENTER: 12,
        ENTER: 13,
        RETURN: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAUSE: 19,
        CAPS_LOCK: 20,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        PRINT_SCREEN: 44,
        INSERT: 45,
        DELETE: 46,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        CONTEXT_MENU: 93,
        NUM_ZERO: 96,
        NUM_ONE: 97,
        NUM_TWO: 98,
        NUM_THREE: 99,
        NUM_FOUR: 100,
        NUM_FIVE: 101,
        NUM_SIX: 102,
        NUM_SEVEN: 103,
        NUM_EIGHT: 104,
        NUM_NINE: 105,
        NUM_MULTIPLY: 106,
        NUM_PLUS: 107,
        NUM_MINUS: 109,
        NUM_PERIOD: 110,
        NUM_DIVISION: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123
    };
    return e
}), define("bui/date", function () {
    function t(e, n) {
        if (e instanceof Date) return e;
        if (typeof n == "undefined" || n == null || n == "") {
            var r = new Array("y-m-d", "yyyy-mm-dd", "yyyy-mm-dd HH:MM:ss", "H:M:s");
            for (var i = 0; i < r.length; i++) {
                var s = t(e, r[i]);
                if (s != null) return s
            }
            return null
        }
        e += "";
        var o = 0, u = 0, a = "", f = "", l, c, h = new Date, p = h.getYear(), d = h.getMonth() + 1, v = 1, m = 0,
            g = 0, y = 0;
        this.isInteger = function (e) {
            return /^\d*$/.test(e)
        }, this.getInt = function (e, t, n, r) {
            for (var i = r; i >= n; i--) {
                var s = e.substring(t, t + i);
                if (s.length < n) return null;
                if (this.isInteger(s)) return s
            }
            return null
        };
        while (u < n.length) {
            a = n.charAt(u), f = "";
            while (n.charAt(u) == a && u < n.length) f += n.charAt(u++);
            if (f == "yyyy" || f == "yy" || f == "y") {
                f == "yyyy" && (l = 4, c = 4), f == "yy" && (l = 2, c = 2), f == "y" && (l = 2, c = 4), p = this.getInt(e, o, l, c);
                if (p == null) return null;
                o += p.length, p.length == 2 && (p = p > 70 ? 1900 + (p - 0) : 2e3 + (p - 0))
            } else if (f == "mm" || f == "m") {
                d = this.getInt(e, o, f.length, 2);
                if (d == null || d < 1 || d > 12) return null;
                o += d.length
            } else if (f == "dd" || f == "d") {
                v = this.getInt(e, o, f.length, 2);
                if (v == null || v < 1 || v > 31) return null;
                o += v.length
            } else if (f == "hh" || f == "h") {
                m = this.getInt(e, o, f.length, 2);
                if (m == null || m < 1 || m > 12) return null;
                o += m.length
            } else if (f == "HH" || f == "H") {
                m = this.getInt(e, o, f.length, 2);
                if (m == null || m < 0 || m > 23) return null;
                o += m.length
            } else if (f == "MM" || f == "M") {
                g = this.getInt(e, o, f.length, 2);
                if (g == null || g < 0 || g > 59) return null;
                o += g.length
            } else if (f == "ss" || f == "s") {
                y = this.getInt(e, o, f.length, 2);
                if (y == null || y < 0 || y > 59) return null;
                o += y.length
            } else {
                if (e.substring(o, o + f.length) != f) return null;
                o += f.length
            }
        }
        if (o != e.length) return null;
        if (d == 2) if (p % 4 == 0 && p % 100 != 0 || p % 400 == 0) {
            if (v > 29) return null
        } else if (v > 28) return null;
        if (d == 4 || d == 6 || d == 9 || d == 11) if (v > 30) return null;
        return new Date(p, d - 1, v, m, g, y)
    }

    function n(e, t, n) {
        var r = new Date(n);
        isNaN(r) && (r = new Date), t = parseInt(t, 10);
        switch (e) {
            case"s":
                r = new Date(r.getTime() + 1e3 * t);
                break;
            case"n":
                r = new Date(r.getTime() + 6e4 * t);
                break;
            case"h":
                r = new Date(r.getTime() + 36e5 * t);
                break;
            case"d":
                r = new Date(r.getTime() + 864e5 * t);
                break;
            case"w":
                r = new Date(r.getTime() + 6048e5 * t);
                break;
            case"m":
                r = new Date(r.getFullYear(), r.getMonth() + t, r.getDate(), r.getHours(), r.getMinutes(), r.getSeconds());
                break;
            case"y":
                r = new Date(r.getFullYear() + t, r.getMonth(), r.getDate(), r.getHours(), r.getMinutes(), r.getSeconds())
        }
        return r
    }

    var e = /^(?:(?!0000)[0-9]{4}([-/.]+)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-/.]?)0?2\2(?:29))(\s+([01]|([01][0-9]|2[0-3])):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9]))?$/,
        r = function () {
            var e = /w{1}|d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
                t = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
                n = /[^-+\dA-Z]/g, r = function (e, t) {
                    e = String(e), t = t || 2;
                    while (e.length < t) e = "0" + e;
                    return e
                }, i = {
                    "default": "ddd mmm dd yyyy HH:MM:ss",
                    shortDate: "m/d/yy",
                    longDate: "mmmm d, yyyy",
                    fullDate: "dddd, mmmm d, yyyy",
                    shortTime: "h:MM TT",
                    longTime: "h:MM:ss TT Z",
                    isoDate: "yyyy-mm-dd",
                    isoTime: "HH:MM:ss",
                    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
                    isoUTCDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
                    localShortDate: "yy\u5e74mm\u6708dd\u65e5",
                    localShortDateTime: "yy\u5e74mm\u6708dd\u65e5 hh:MM:ss TT",
                    localLongDate: "yyyy\u5e74mm\u6708dd\u65e5",
                    localLongDateTime: "yyyy\u5e74mm\u6708dd\u65e5 hh:MM:ss TT",
                    localFullDate: "yyyy\u5e74mm\u6708dd\u65e5 w",
                    localFullDateTime: "yyyy\u5e74mm\u6708dd\u65e5 w hh:MM:ss TT"
                }, s = {
                    dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d"],
                    monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
                };
            return function (o, u, a) {
                arguments.length === 1 && Object.prototype.toString.call(o) === "[object String]" && !/\d/.test(o) && (u = o, o = undefined), o = o ? new Date(o) : new Date;
                if (isNaN(o)) throw SyntaxError("invalid date");
                u = String(i[u] || u || i["default"]), u.slice(0, 4) === "UTC:" && (u = u.slice(4), a = !0);
                var f = a ? "getUTC" : "get", l = o[f + "Date"](), c = o[f + "Day"](), h = o[f + "Month"](),
                    p = o[f + "FullYear"](), d = o[f + "Hours"](), v = o[f + "Minutes"](), m = o[f + "Seconds"](),
                    g = o[f + "Milliseconds"](), y = a ? 0 : o.getTimezoneOffset(), b = {
                        d: l,
                        dd: r(l, undefined),
                        ddd: s.dayNames[c],
                        dddd: s.dayNames[c + 7],
                        w: s.dayNames[c + 14],
                        m: h + 1,
                        mm: r(h + 1, undefined),
                        mmm: s.monthNames[h],
                        mmmm: s.monthNames[h + 12],
                        yy: String(p).slice(2),
                        yyyy: p,
                        h: d % 12 || 12,
                        hh: r(d % 12 || 12, undefined),
                        H: d,
                        HH: r(d, undefined),
                        M: v,
                        MM: r(v, undefined),
                        s: m,
                        ss: r(m, undefined),
                        l: r(g, 3),
                        L: r(g > 99 ? Math.round(g / 10) : g, undefined),
                        t: d < 12 ? "a" : "p",
                        tt: d < 12 ? "am" : "pm",
                        T: d < 12 ? "A" : "P",
                        TT: d < 12 ? "AM" : "PM",
                        Z: a ? "UTC" : (String(o).match(t) || [""]).pop().replace(n, ""),
                        o: (y > 0 ? "-" : "+") + r(Math.floor(Math.abs(y) / 60) * 100 + Math.abs(y) % 60, 4),
                        S: ["th", "st", "nd", "rd"][l % 10 > 3 ? 0 : (l % 100 - l % 10 !== 10) * l % 10]
                    };
                return u.replace(e, function (e) {
                    return e in b ? b[e] : e.slice(1, e.length - 1)
                })
            }
        }(), i = {
            add: function (e, t, r) {
                return n(e, t, r)
            }, addHour: function (e, t) {
                return n("h", e, t)
            }, addMinute: function (e, t) {
                return n("n", e, t)
            }, addSecond: function (e, t) {
                return n("s", e, t)
            }, addDay: function (e, t) {
                return n("d", e, t)
            }, addWeek: function (e, t) {
                return n("w", e, t)
            }, addMonths: function (e, t) {
                return n("m", e, t)
            }, addYear: function (e, t) {
                return n("y", e, t)
            }, isDateEquals: function (e, t) {
                return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate()
            }, isEquals: function (e, t) {
                return e == t ? !0 : !e || !t ? !1 : !e.getTime || !t.getTime ? !1 : e.getTime() == t.getTime()
            }, isDateString: function (t) {
                return e.test(t)
            }, format: function (e, t, n) {
                return r(e, t, n)
            }, parse: function (e, n) {
                return BUI.isString(e) && (e = e.replace("/", "-")), t(e, n)
            }, today: function () {
                var e = new Date;
                return new Date(e.getFullYear(), e.getMonth(), e.getDate())
            }, getDate: function (e) {
                return new Date(e.getFullYear(), e.getMonth(), e.getDate())
            }
        };
    return i
}), define("bui/base", ["bui/observable"], function (e) {
    function r(e, t, n) {
        var r = e[t] || {};
        return n && (e[t] = r), r
    }

    function i(e, t) {
        return BUI.isString(t) ? e[t] : t
    }

    function s(e, t, n, r, i) {
        var s = n;
        return e.fire(t + BUI.ucfirst(n) + "Change", {attrName: s, prevVal: r, newVal: i})
    }

    function o(e, t, n, r, i) {
        r = r || {};
        var o, u, a;
        return a = e.get(t), !$.isPlainObject(n) && !BUI.isArray(n) && a === n ? undefined : !r.silent && !1 === s(e, "before", t, a, n) ? !1 : (o = e._set(t, n, r), o === !1 ? o : (r.silent || (n = e.__attrVals[t], s(e, "after", t, a, n)), e))
    }

    function u(e) {
        if (e._attrs || e == a) return;
        var t = e.superclass.constructor;
        t && !t._attrs && u(t), e._attrs = {}, BUI.mixAttrs(e._attrs, t._attrs), BUI.mixAttrs(e._attrs, e.ATTRS)
    }

    var t = {}, n = e("bui/observable"), a = function (e) {
        var t = this, r = t.constructor, i = [];
        this.__attrs = {}, this.__attrVals = {}, n.apply(this, arguments);
        while (r) i.push(r), r.extensions && (BUI.mixin(r, r.extensions), delete r.extensions), r = r.superclass ? r.superclass.constructor : null;
        var s = t.constructor;
        u(s), t._initStaticAttrs(s._attrs), t._initAttrs(e)
    };
    return a.INVALID = t, BUI.extend(a, n), BUI.augment(a, {
        _initStaticAttrs: function (e) {
            var t = this, n;
            n = t.__attrs = {};
            for (var r in e) if (e.hasOwnProperty(r)) {
                var i = e[r];
                i.shared === !1 || i.valueFn ? (n[r] = {}, BUI.mixAttr(n[r], e[r])) : n[r] = e[r]
            }
        }, addAttr: function (e, t, n) {
            var r = this, i = r.__attrs, s = i[e];
            s || (s = i[e] = {});
            for (var o in t) t.hasOwnProperty(o) && (o == "value" ? BUI.isObject(t[o]) ? (s[o] = s[o] || {}, BUI.mix(s[o], t[o])) : BUI.isArray(t[o]) ? (s[o] = s[o] || [], BUI.mix(s[o], t[o])) : s[o] = t[o] : s[o] = t[o]);
            return r
        }, addAttrs: function (e, t, n) {
            var r = this;
            return e ? (typeof t == "boolean" && (n = t, t = null), BUI.each(e, function (e, t) {
                r.addAttr(t, e, n)
            }), t && r.set(t), r) : r
        }, hasAttr: function (e) {
            return e && this.__attrs.hasOwnProperty(e)
        }, getAttrs: function () {
            return this.__attrs
        }, getAttrVals: function () {
            return this.__attrVals
        }, get: function (e) {
            var t = this, n = t.__attrVals, s, o, u;
            return s = r(t.__attrs, e), o = s.getter, u = e in n ? n[e] : t._getDefAttrVal(e), o && (o = i(t, o)) && (u = o.call(t, u, e)), u
        }, clearAttrVals: function () {
            this.__attrVals = {}
        }, removeAttr: function (e) {
            var t = this;
            return t.hasAttr(e) && (delete t.__attrs[e], delete t.__attrVals[e]), t
        }, set: function (e, t, n) {
            var r = this;
            if ($.isPlainObject(e)) {
                n = t;
                var i = Object(e), s = [];
                for (e in i) i.hasOwnProperty(e) && o(r, e, i[e], n);
                return r
            }
            return o(r, e, t, n)
        }, setInternal: function (e, t, n) {
            return this._set(e, t, n)
        }, _getDefAttrVal: function (e) {
            var t = this, n = t.__attrs, s = r(n, e), o = s.valueFn, u;
            return o && (o = i(t, o)) && (u = o.call(t), u !== undefined && (s.value = u), delete s.valueFn, n[e] = s), s.value
        }, _set: function (e, n, s) {
            var o = this, u, a = r(o.__attrs, e, !0), f = a.setter;
            return f && (f = i(o, f)) && (u = f.call(o, n, e)), u === t ? !1 : (u !== undefined && (n = u), o.__attrVals[e] = n, o)
        }, _initAttrs: function (e) {
            var t = this;
            if (e) for (var n in e) e.hasOwnProperty(n) && t._set(n, e[n])
        }
    }), a
}), define("bui/component", ["bui/component/manage", "bui/component/uibase", "bui/component/view", "bui/component/controller"], function (e) {
    function n(e, n) {
        var r, i;
        return e && (i = e.xclass) && (n && !e.prefixCls && (e.prefixCls = n.get("prefixCls")), r = t.Manager.getConstructorByXClass(i), r || BUI.error("can not find class by xclass desc : " + i), e = new r(e)), e
    }

    var t = {};
    return BUI.mix(t, {
        Manager: e("bui/component/manage"),
        UIBase: e("bui/component/uibase"),
        View: e("bui/component/view"),
        Controller: e("bui/component/controller")
    }), t.create = n, t
}), define("bui/component/manage", function (e) {
    function n(e) {
        var n = e.split(/\s+/), r = -1, i, s = null;
        for (var o = 0; o < n.length; o++) {
            var u = t[n[o]];
            u && (i = u.priority) > r && (r = i, s = u.constructor)
        }
        return s
    }

    function r(e) {
        for (var n in t) {
            var r = t[n];
            if (r.constructor == e) return n
        }
        return 0
    }

    function i(e, n) {
        BUI.isFunction(n) ? t[e] = {constructor: n, priority: 0} : (n.priority = n.priority || 0, t[e] = n)
    }

    function s(e) {
        var t = $.trim(e).split(/\s+/);
        for (var n = 0; n < t.length; n++) t[n] && (t[n] = this.get("prefixCls") + t[n]);
        return t.join(" ")
    }

    var t = {}, o = {}, u = {
        __instances: o, addComponent: function (e, t) {
            o[e] = t
        }, removeComponent: function (e) {
            delete o[e]
        }, eachComponent: function (e) {
            BUI.each(o, e)
        }, getComponent: function (e) {
            return o[e]
        }, getCssClassWithPrefix: s, getXClassByConstructor: r, getConstructorByXClass: n, setConstructorByXClass: i
    };
    return u
}), function () {
    var e = "bui/component/uibase/";
    define("bui/component/uibase", [e + "base", e + "align", e + "autoshow", e + "autohide", e + "close", e + "collapsable", e + "drag", e + "keynav", e + "list", e + "listitem", e + "mask", e + "position", e + "selection", e + "stdmod", e + "decorate", e + "tpl", e + "childcfg", e + "bindable", e + "depends"], function (t) {
        var n = t(e + "base");
        return BUI.mix(n, {
            Align: t(e + "align"),
            AutoShow: t(e + "autoshow"),
            AutoHide: t(e + "autohide"),
            Close: t(e + "close"),
            Collapsable: t(e + "collapsable"),
            Drag: t(e + "drag"),
            KeyNav: t(e + "keynav"),
            List: t(e + "list"),
            ListItem: t(e + "listitem"),
            Mask: t(e + "mask"),
            Position: t(e + "position"),
            Selection: t(e + "selection"),
            StdMod: t(e + "stdmod"),
            Decorate: t(e + "decorate"),
            Tpl: t(e + "tpl"),
            ChildCfg: t(e + "childcfg"),
            Bindable: t(e + "bindable"),
            Depends: t(e + "depends")
        }), BUI.mix(n, {
            CloseView: n.Close.View,
            CollapsableView: n.Collapsable.View,
            ChildList: n.List.ChildList,
            ListItemView: n.ListItem.View,
            MaskView: n.Mask.View,
            PositionView: n.Position.View,
            StdModView: n.StdMod.View,
            TplView: n.Tpl.View
        }), n
    })
}(), define("bui/component/uibase/base", ["bui/component/manage"], function (e) {
    function u(e, t) {
        a(e, "initializer", "constructor")
    }

    function a(e, t, n) {
        var r = e.constructor, i = [], s, o, u, a;
        while (r) {
            a = [];
            if (u = r.mixins) for (var f = 0; f < u.length; f++) s = u[f], s && (n != "constructor" && (s.prototype.hasOwnProperty(n) ? s = s.prototype[n] : s = null), s && a.push(s));
            r.prototype.hasOwnProperty(t) && (o = r.prototype[t]) && a.push(o), a.length && i.push.apply(i, a.reverse()), r = r.superclass && r.superclass.constructor
        }
        for (f = i.length - 1; f >= 0; f--) i[f] && i[f].call(e)
    }

    function f(e) {
        var t = e.constructor, n, r, i;
        while (t) {
            t.prototype.hasOwnProperty("destructor") && t.prototype.destructor.apply(e);
            if (n = t.mixins) for (i = n.length - 1; i >= 0; i--) r = n[i] && n[i].prototype.__destructor, r && r.apply(e);
            t = t.superclass && t.superclass.constructor
        }
    }

    function l(e) {
        if (!e) return;
        BUI.each(e, function (t, n) {
            BUI.isFunction(t) && (e[n] = new t)
        })
    }

    function c(e, t, n) {
        if (!t) return;
        BUI.each(t, function (t, r) {
            t[n] && t[n](e)
        })
    }

    function h(e) {
    }

    function p(e) {
        var t, r, s = e.getAttrs();
        for (var o in s) if (s.hasOwnProperty(o)) {
            var u = n + i(o);
            (r = e[u]) && s[o].sync !== !1 && (t = e.get(o)) !== undefined && r.call(e, t)
        }
    }

    function v(e) {
        var t = [];
        while (e.base) t.push(e), e = e.base;
        for (var n = t.length - 1; n >= 0; n--) {
            var r = t[n];
            BUI.mix(r.prototype, r.px), BUI.mix(r, r.sx), r.base = null, r.px = null, r.sx = null
        }
    }

    var t = e("bui/component/manage"), n = "_uiSet", r = "ATTRS", i = BUI.ucfirst, s = $.noop, o = e("bui/base"),
        d = function (e) {
            var t = this, n;
            o.apply(t, arguments), t.setInternal("userConfig", e), u(t, e);
            var r,
                i, s = t.get("plugins");
            l(s);
            var a = t.get("xclass");
            a && (t.__xclass = a), c(t, s, "initializer"), e && e.autoRender && t.render()
        };
    return d.ATTRS = {
        userConfig: {},
        autoRender: {value: !1},
        listeners: {value: {}},
        plugins: {},
        rendered: {value: !1},
        xclass: {
            valueFn: function () {
                return t.getXClassByConstructor(this.constructor)
            }
        }
    }, BUI.extend(d, o), BUI.augment(d, {
        create: function () {
            var e = this;
            return e.get("created") || (e.fire("beforeCreateDom"), a(e, "createDom", "__createDom"), e._set("created", !0), e.fire("afterCreateDom"), c(e, e.get("plugins"), "createDom")), e
        }, render: function () {
            var e = this;
            if (!e.get("rendered")) {
                var t = e.get("plugins");
                e.create(undefined), e.set("created", !0), e.fire("beforeRenderUI"), a(e, "renderUI", "__renderUI"), e.fire("afterRenderUI"), c(e, t, "renderUI"), e.fire("beforeBindUI"), h(e), a(e, "bindUI", "__bindUI"), e.set("binded", !0), e.fire("afterBindUI"), c(e, t, "bindUI"), e.fire("beforeSyncUI"), p(e), a(e, "syncUI", "__syncUI"), e.fire("afterSyncUI"), c(e, t, "syncUI"), e._set("rendered", !0)
            }
            return e
        }, createDom: s, renderUI: s, bindUI: s, syncUI: s, destroy: function () {
            var e = this;
            return e.destroyed ? e : (e.fire("beforeDestroy"), c(e, e.get("plugins"), "destructor"), f(e), e.fire("afterDestroy"), e.off(), e.clearAttrVals(), e.destroyed = !0, e)
        }
    }), BUI.mix(d, {
        define: function (e, t, n, r) {
            function i() {
                var e = this.constructor;
                e.base && v(e), d.apply(this, arguments)
            }

            return $.isPlainObject(t) && (r = n, n = t, t = []), BUI.extend(i, e), i.base = e, i.px = n, i.sx = r, t.length && (i.extensions = t), i
        }, extend: function m(e, n, r) {
            var i = $.makeArray(arguments), s, o = i[i.length - 1];
            i.unshift(this), o.xclass && (i.pop(), i.push(o.xclass)), s = d.define.apply(d, i);
            if (o.xclass) {
                var u = o.priority || (this.priority ? this.priority + 1 : 1);
                t.setConstructorByXClass(o.xclass, {
                    constructor: s,
                    priority: u
                }), s.__xclass = o.xclass, s.priority = u, s.toString = function () {
                    return o.xclass
                }
            }
            return s.extend = m, s
        }
    }), d
}), define("bui/component/uibase/align", ["bui/ua"], function (e) {
    function i(e) {
        var t = e.ownerDocument, n = t.body, r, i = $(e).css("position"), s = i == "fixed" || i == "absolute";
        if (!s) return e.nodeName.toLowerCase() == "html" ? null : e.parentNode;
        for (r = e.parentNode; r && r != n; r = r.parentNode) {
            i = $(r).css("position");
            if (i != "static") return r
        }
        return null
    }

    function s(e) {
        var n = {left: 0, right: Infinity, top: 0, bottom: Infinity}, s, o, u, a, f = e.ownerDocument, l = f.body,
            c = f.documentElement;
        for (s = e; s = i(s);) if ((!t.ie || s.clientWidth != 0) && s != l && s != c && $(s).css("overflow") != "visible") {
            var h = $(s).offset();
            h.left += s.clientLeft, h.top += s.clientTop, n.top = Math.max(n.top, h.top), n.right = Math.min(n.right, h.left + s.clientWidth), n.bottom = Math.min(n.bottom, h.top + s.clientHeight), n.left = Math.max(n.left, h.left)
        }
        return o = $(r).scrollLeft(), u = $(r).scrollTop(), n.left = Math.max(n.left, o), n.top = Math.max(n.top, u), a = {
            width: BUI.viewportWidth(),
            height: BUI.viewportHeight()
        }, n.right = Math.min(n.right, o + a.width), n.bottom = Math.min(n.bottom, u + a.height), n.top >= 0 && n.left >= 0 && n.bottom > n.top && n.right > n.left ? n : null
    }

    function o(e, t, n, r) {
        var i, s, o, u;
        return i = {
            left: e.left,
            top: e.top
        }, o = d(t, n[0]), u = d(e, n[1]), s = [u.left - o.left, u.top - o.top], {
            left: i.left - s[0] + +r[0],
            top: i.top - s[1] + +r[1]
        }
    }

    function u(e, t, n) {
        return e.left < n.left || e.left + t.width > n.right
    }

    function a(e, t, n) {
        return e.top < n.top || e.top + t.height > n.bottom
    }

    function f(e, t, n, r) {
        var i = BUI.cloneObject(e), s = {width: t.width, height: t.height};
        return r.adjustX && i.left < n.left && (i.left = n.left), r.resizeWidth && i.left >= n.left && i.left + s.width > n.right && (s.width -= i.left + s.width - n.right), r.adjustX && i.left + s.width > n.right && (i.left = Math.max(n.right - s.width, n.left)), r.adjustY && i.top < n.top && (i.top = n.top), r.resizeHeight && i.top >= n.top && i.top + s.height > n.bottom && (s.height -= i.top + s.height - n.bottom), r.adjustY && i.top + s.height > n.bottom && (i.top = Math.max(n.bottom - s.height, n.top)), BUI.mix(i, s)
    }

    function l(e, t, n) {
        var r = [];
        return $.each(e, function (e, i) {
            r.push(i.replace(t, function (e) {
                return n[e]
            }))
        }), r
    }

    function c(e, t) {
        return e[t] = -e[t], e
    }

    function h() {
    }

    function p(e) {
        var t, n, r;
        return e.length && !$.isWindow(e[0]) ? (t = e.offset(), n = e.outerWidth(), r = e.outerHeight()) : (t = {
            left: BUI.scrollLeft(),
            top: BUI.scrollTop()
        }, n = BUI.viewportWidth(), r = BUI.viewportHeight()), t.width = n, t.height = r, t
    }

    function d(e, t) {
        var n = t.charAt(0), r = t.charAt(1), i = e.width, s = e.height, o, u;
        return o = e.left, u = e.top, n === "c" ? u += s / 2 : n === "b" && (u += s), r === "c" ? o += i / 2 : r === "r" && (o += i), {
            left: o,
            top: u
        }
    }

    function v(e) {
        var t = e.attr("class"), r = new RegExp("s?" + n + "[a-z]{2}-[a-z]{2}", "ig"), i = r.exec(t);
        i && e.removeClass(i.join(" "))
    }

    var t = e("bui/ua"), n = "x-align-", r = window;
    return h.__getOffsetParent = i, h.__getVisibleRectForElement = s, h.ATTRS = {
        align: {
            shared: !1,
            value: {}
        }
    }, h.prototype = {
        _uiSetAlign: function (e, t) {
            var r = "", i, s;
            e && e.points && (this.align(e.node, e.points, e.offset, e.overflow), this.set("cachePosition", null), i = this.get("el"), v(i), s = e.points.join("-"), r = n + s, i.addClass(r))
        }, align: function (e, t, n, i) {
            e = $(e || r), n = n && [].concat(n) || [0, 0], i = i || {};
            var h = this, d = h.get("el"), v = 0, m = s(d[0]), g = p(d), y = p(e), b = o(g, y, t, n),
                w = BUI.merge(g, b);
            if (m && (i.adjustX || i.adjustY)) {
                u(b, g, m) && (v = 1, t = l(t, /[lr]/ig, {
                    l: "r",
                    r: "l"
                }), n = c(n, 0)), a(b, g, m) && (v = 1, t = l(t, /[tb]/ig, {
                    t: "b",
                    b: "t"
                }), n = c(n, 1)), v && (b = o(g, y, t, n), BUI.mix(w, b));
                var E = {};
                E.adjustX = i.adjustX && u(b, g, m), E.adjustY = i.adjustY && a(b, g, m);
                if (E.adjustX || E.adjustY) w = f(b, g, m, E)
            }
            return w.left != g.left && (h.setInternal("x", null), h.get("view").setInternal("x", null), h.set("x", w.left)), w.top != g.top && (h.setInternal("y", null), h.get("view").setInternal("y", null), h.set("y", w.top)), w.width != g.width && d.width(d.width() + w.width - g.width), w.height != g.height && d.height(d.height() + w.height - g.height), h
        }, center: function (e) {
            var t = this;
            return t.set("align", {node: e, points: ["cc", "cc"], offset: [0, 0]}), t
        }
    }, h
}), define("bui/component/uibase/autoshow", function () {
    function e() {
    }

    return e.ATTRS = {
        trigger: {},
        delegateTigger: {
            getter: function () {
                this.get("delegateTrigger")
            }, setter: function (e) {
                this.set("delegateTrigger", e)
            }
        },
        delegateTrigger: {value: !1},
        autoAlign: {value: !0},
        autoFocused: {value: !0},
        triggerActiveCls: {},
        curTrigger: {},
        triggerCallback: {},
        triggerEvent: {value: "click"},
        triggerHideEvent: {},
        events: {value: {triggerchange: !1}}
    }, e.prototype = {
        __createDom: function () {
            this._setTrigger()
        }, __bindUI: function () {
            var e = this, t = e.get("triggerActiveCls");
            t && e.on("hide", function () {
                var n = e.get("curTrigger");
                n && n.removeClass(t)
            })
        }, _setTrigger: function () {
            function a(t) {
                if (e.get("disabled")) return;
                var n = e.get("curTrigger"), s = o ? $(t.currentTarget) : $(this), u = e.get("align");
                if (!n || n[0] != s[0]) n && n.removeClass(i), e.set("curTrigger", s), e.fire("triggerchange", {
                    prevTrigger: n,
                    curTrigger: s
                });
                s.addClass(i), e.get("autoAlign") && (u.node = s), e.set("align", u), e.show(), r && r(t)
            }

            function f(t) {
                var n = t.toElement || t.relatedTarget;
                (!n || !e.containsElement(n)) && e.hide()
            }

            var e = this, t = e.get("triggerEvent"), n = e.get("triggerHideEvent"), r = e.get("triggerCallback"),
                i = e.get("triggerActiveCls") || "", s = e.get("trigger"), o = e.get("delegateTrigger"), u = $(s);
            t && (o && BUI.isString(s) ? $(document).delegate(s, t, a) : u.on(t, a)), n && (o && BUI.isString(s) ? $(document).delegate(s, n, f) : u.on(n, f))
        }, __renderUI: function () {
            var e = this, t = e.get("align");
            t && !t.node && (t.node = e.get("render") || e.get("trigger"))
        }
    }, e
}), define("bui/component/uibase/autohide", function () {
    function n(e, t) {
        var n = e.get("hideExceptNode");
        return n && n.length ? $.contains(n[0], t) : !1
    }

    function r() {
    }

    var e = BUI.wrapBehavior, t = BUI.getWrapBehavior;
    return r.ATTRS = {
        autoHideType: {value: "click"},
        autoHide: {value: !1},
        hideExceptNode: {},
        events: {value: {autohide: !1}}
    }, r.prototype = {
        __bindUI: function () {
            var e = this;
            e.on("afterVisibleChange", function (t) {
                var n = t.newVal;
                e.get("autoHide") && (n ? e._bindHideEvent() : e._clearHideEvent())
            })
        }, handleMoveOuter: function (e) {
            var t = this, r = e.toElement || e.relatedTarget;
            !t.containsElement(r) && !n(t, r) && t.fire("autohide") !== !1 && t.hide()
        }, handleDocumentClick: function (e) {
            var t = this, r = e.target;
            !t.containsElement(r) && !n(t, r) && t.fire("autohide") !== !1 && t.hide()
        }, _bindHideEvent: function () {
            var t = this, n = t.get("curTrigger"), r = t.get("autoHideType");
            r === "click" ? $(document).on("mousedown", e(t, "handleDocumentClick")) : (t.get("el").on("mouseleave", e(t, "handleMoveOuter")), n && $(n).on("mouseleave", e(t, "handleMoveOuter")))
        }, _clearHideEvent: function () {
            var e = this, n = e.get("curTrigger"), r = e.get("autoHideType");
            r === "click" ? $(document).off("mousedown", t(e, "handleDocumentClick")) : (e.get("el").off("mouseleave", t(e, "handleMoveOuter")), n && $(n).off("mouseleave", t(e, "handleMoveOuter")))
        }
    }, r
}), define("bui/component/uibase/close", function () {
    function t(e) {
        return $(e.get("closeTpl"))
    }

    function n() {
    }

    function r() {
    }

    var e = BUI.prefix + "ext-";
    n.ATTRS = {
        closeTpl: {value: '<a tabindex="0" href=\'javascript:void("\u5173\u95ed")\' role="button" class="' + e + "close" + '">' + '<span class="' + e + "close-x" + '">\u5173\u95ed<' + "/span>" + "<" + "/a>"},
        closeable: {value: !0},
        closeBtn: {}
    }, n.prototype = {
        _uiSetCloseable: function (e) {
            var n = this, r = n.get("closeBtn");
            e ? (r || n.setInternal("closeBtn", r = t(n)), r.appendTo(n.get("el"), undefined)) : r && r.remove()
        }
    };
    var i = "hide";
    r.ATTRS = {closeTpl: {view: !0}, closeable: {view: 1}, closeBtn: {view: 1}, closeAction: {value: i}};
    var s = {hide: i, destroy: "destroy", remove: "remove"};
    return r.prototype = {
        _uiSetCloseable: function (e) {
            var t = this;
            e && !t.__bindCloseEvent && (t.__bindCloseEvent = 1, t.get("closeBtn").on("click", function (e) {
                t.fire("closeclick", {domTarget: e.target}) !== !1 && t.close(), e.preventDefault()
            }))
        }, __destructor: function () {
            var e = this.get("closeBtn");
            e && e.detach()
        }, close: function () {
            var e = this, t = s[e.get("closeAction") || i];
            e.fire("closing", {action: t}) !== !1 && (e.fire("beforeclosed", {action: t}), t == "remove" ? e[t](!0) : e[t](), e.fire("closed", {action: t}))
        }
    }, r.View = n, r
}), define("bui/component/uibase/drag", function () {
    function r() {
        var e = $(n).css("opacity", 0).prependTo("body");
        return e
    }

    var e = BUI.guid("drag"), t = function () {
    };
    t.ATTRS = {
        dragNode: {}, draging: {
            setter: function (e) {
                if (e === !0) return {}
            }, value: null
        }, constraint: {}, dragBackEl: {
            getter: function () {
                return $("#" + e)
            }
        }
    };
    var n = '<div id="' + e + '" style="background-color: red; position: fixed; left: 0px; width: 100%; height: 100%; top: 0px; cursor: move; z-index: 999999; display: none; "></div>';
    return t.prototype = {
        __bindUI: function () {
            function r(n) {
                var r = e.get("draging");
                r && (n.preventDefault(), e._dragMoveTo(n.pageX, n.pageY, r, t))
            }

            function i(t) {
                if (t.which == 1) {
                    e.set("draging", !1);
                    var n = e.get("dragBackEl");
                    n && n.hide(), o()
                }
            }

            function s() {
                $(document).on("mousemove", r), $(document).on("mouseup", i)
            }

            function o() {
                $(document).off("mousemove", r), $(document).off("mouseup", i)
            }

            var e = this, t = e.get("constraint"), n = e.get("dragNode");
            if (!n) return;
            n.on("mousedown", function (t) {
                t.which == 1 && (t.preventDefault(), e.set("draging", {
                    elX: e.get("x"),
                    elY: e.get("y"),
                    startX: t.pageX,
                    startY: t.pageY
                }), s())
            })
        }, _dragMoveTo: function (e, t, n, i) {
            var s = this, o = s.get("dragBackEl"), n = n || s.get("draging"), u = n.startX - e, a = n.startY - t;
            o.length || (o = r()), o.css({
                cursor: "move",
                display: "block"
            }), s.set("xy", [s._getConstrainX(n.elX - u, i), s._getConstrainY(n.elY - a, i)])
        }, _getConstrainX: function (e, t) {
            var n = this, r = n.get("el").outerWidth(), i = e + r, s = n.get("x");
            if (t) {
                var o = t.offset();
                return o.left >= e ? o.left : o.left + t.width() < i ? o.left + t.width() - r : e
            }
            return BUI.isInHorizontalView(e) && BUI.isInHorizontalView(i) ? e : s
        }, _getConstrainY: function (e, t) {
            var n = this, r = n.get("el").outerHeight(), i = e + r, s = n.get("y");
            if (t) {
                var o = t.offset();
                return o.top > e ? o.top : o.top + t.height() < i ? o.top + t.height() - r : e
            }
            return BUI.isInVerticalView(e) && BUI.isInVerticalView(i) ? e : s
        }
    }, t
}), define("bui/component/uibase/keynav", ["bui/keycode"], function (e) {
    var t = e("bui/keycode"), n = BUI.wrapBehavior, r = BUI.getWrapBehavior, i = function () {
    };
    return i.ATTRS = {
        allowKeyNav: {value: !0},
        navEvent: {value: "keydown"},
        ignoreInputFields: {value: !0}
    }, i.prototype = {
        __bindUI: function () {
        }, _uiSetAllowKeyNav: function (e) {
            var t = this, i = t.get("navEvent"), s = t.get("el");
            e ? s.on(i, n(t, "_handleKeyDown")) : s.off(i, r(t, "_handleKeyDown"))
        }, _handleKeyDown: function (e) {
            var n = this, r = n.get("ignoreInputFields"), i = e.which;
            if (r && $(e.target).is("input,select,textarea")) return;
            switch (i) {
                case t.UP:
                    e.preventDefault(), n.handleNavUp(e);
                    break;
                case t.DOWN:
                    e.preventDefault(), n.handleNavDown(e);
                    break;
                case t.RIGHT:
                    e.preventDefault(), n.handleNavRight(e);
                    break;
                case t.LEFT:
                    e.preventDefault(), n.handleNavLeft(e);
                    break;
                case t.ENTER:
                    n.handleNavEnter(e);
                    break;
                case t.ESC:
                    n.handleNavEsc(e);
                    break;
                case t.TAB:
                    n.handleNavTab(e);
                    break;
                default:
            }
        }, handleNavUp: function (e) {
        }, handleNavDown: function (e) {
        }, handleNavLeft: function (e) {
        }, handleNavRight: function (e) {
        }, handleNavEnter: function (e) {
        }, handleNavEsc: function (e) {
        }, handleNavTab: function (e) {
        }
    }, i
}), define("bui/component/uibase/mask", function (e) {
    function i(e) {
        return e.get("prefixCls") + "ext-mask"
    }

    function s() {
        return r ? BUI.docWidth() + "px" : "100%"
    }

    function o() {
        return r ? BUI.docHeight() + "px" : "100%"
    }

    function u(e) {
        var t = $('<div  style="width:' + s() + ";" + "left:0;" + "top:0;" + "height:" + o() + ";" + "position:" + (r ? "absolute" : "fixed") + ';"' + ' class="' + e + '">' + (r ? '<iframe style="position:absolute;left:0;top:0;background:white;width: expression(this.parentNode.offsetWidth);height: expression(this.parentNode.offsetHeight);filter:alpha(opacity=0);z-index:-1;"></iframe>' : "") + "</div>").prependTo("body");
        return t.on("mousedown", function (e) {
            e.preventDefault()
        }), t
    }

    function a() {
    }

    function f() {
    }

    var t = e("bui/ua"), n = {}, r = t.ie == 6;
    return a.ATTRS = {maskShared: {value: !0}}, a.prototype = {
        _maskExtShow: function () {
            var e = this, t, r = i(e), s = n[r], o = e.get("maskShared"), a = e.get("maskNode");
            a || (o ? s ? a = s.node : (a = u(r), s = n[r] = {
                num: 0,
                node: a
            }) : a = u(r), e.setInternal("maskNode", a)), (t = e.get("zIndex")) && a.css("z-index", t - 1), o && s.num++, (!o || s.num == 1) && a.show(), $("body").addClass("x-masked-relative")
        }, _maskExtHide: function () {
            var e = this, t = i(e), r = n[t], s = e.get("maskShared"), o = e.get("maskNode");
            s && r ? (r.num = Math.max(r.num - 1, 0), r.num == 0 && o.hide()) : o && o.hide(), $("body").removeClass("x-masked-relative")
        }, __destructor: function () {
            var e = this, t = e.get("maskShared"), n = e.get("maskNode");
            e.get("maskNode") && (t ? e.get("visible") && e._maskExtHide() : n.remove())
        }
    }, f.ATTRS = {mask: {value: !1}, maskNode: {view: 1}, maskShared: {view: 1}}, f.prototype = {
        __bindUI: function () {
            var e = this, t = e.get("view"), n = t._maskExtShow, r = t._maskExtHide;
            e.get("mask") && (e.on("show", function () {
                t._maskExtShow()
            }), e.on("hide", function () {
                t._maskExtHide()
            }))
        }
    }, f = f, f.View = a, f
}), define("bui/component/uibase/position", function () {
    function e() {
    }

    function t() {
    }

    return e.ATTRS = {
        x: {
            valueFn: function () {
                var e = this;
                return e.get("el") && e.get("el").offset().left
            }
        }, y: {
            valueFn: function () {
                var e = this;
                return e.get("el") && e.get("el").offset().top
            }
        }, zIndex: {}, visibleMode: {value: "visibility"}
    }, e.prototype = {
        __createDom: function () {
            this.get("el").addClass(BUI.prefix + "ext-position")
        }, _uiSetZIndex: function (e) {
            this.get("el").css("z-index", e)
        }, _uiSetX: function (e) {
            e != null && this.get("el").offset({left: e})
        }, _uiSetY: function (e) {
            e != null && this.get("el").offset({top: e})
        }, _uiSetLeft: function (e) {
            e != null && this.get("el").css({left: e})
        }, _uiSetTop: function (e) {
            e != null && this.get("el").css({top: e})
        }
    }, t.ATTRS = {
        x: {view: 1}, y: {view: 1}, left: {view: 1}, top: {view: 1}, xy: {
            setter: function (e) {
                var t = this, n = $.makeArray(e);
                return n.length && (n[0] && t.set("x", n[0]), n[1] && t.set("y", n[1])), e
            }, getter: function () {
                return [this.get("x"), this.get("y")]
            }
        }, zIndex: {view: 1}, visible: {view: !0, value: !0}
    }, t.prototype = {
        move: function (e, t) {
            var n = this;
            return BUI.isArray(e) && (t = e[1], e = e[0]), n.set("xy", [e, t]), n
        }, _uiSetX: function (e) {
            if (e != null) {
                var t = this, n = t.get("el");
                t.setInternal("left", n.position().left), e != -999 && this.set("cachePosition", null)
            }
        }, _uiSetY: function (e) {
            if (e != null) {
                var t = this, n = t.get("el");
                t.setInternal("top", n.position().top), e != -999 && this.set("cachePosition", null)
            }
        }, _uiSetLeft: function (e) {
            var t = this, n = t.get("el");
            e != null && t.setInternal("x", n.offset().left)
        }, _uiSetTop: function (e) {
            var t = this, n = t.get("el");
            e != null && t.setInternal("y", n.offset().top)
        }
    }, t.View = e, t
}), define("bui/component/uibase/listitem", function () {
    function e() {
    }

    function t() {
    }

    return e.ATTRS = {selected: {}}, e.prototype = {
        _uiSetSelected: function (e) {
            var t = this, n = t.getStatusCls("selected"), r = t.get("el");
            e ? r.addClass(n) : r.removeClass(n)
        }
    }, t.ATTRS = {selectable: {value: !0}, selected: {view: !0, sync: !1, value: !1}}, t.prototype = {}, t.View = e, t
}), define("bui/component/uibase/stdmod", function () {
    function t() {
    }

    function n(t, n) {
        var r = t.get("contentEl"), i = t.get(n);
        i || (i = $('<div class="' + e + n + '"' + " " + " >" + "</div>"), i.appendTo(r), t.setInternal(n, i))
    }

    function r(e, t, n) {
        t = e.get(t), BUI.isString(n) ? t.html(n) : t.html("").append(n)
    }

    function i() {
    }

    var e = BUI.prefix + "stdmod-";
    return t.ATTRS = {
        header: {},
        body: {},
        footer: {},
        bodyStyle: {},
        footerStyle: {},
        headerStyle: {},
        headerContent: {},
        bodyContent: {},
        footerContent: {}
    }, t.PARSER = {
        header: function (t) {
            return t.one("." + e + "header")
        }, body: function (t) {
            return t.one("." + e + "body")
        }, footer: function (t) {
            return t.one("." + e + "footer")
        }
    }, t.prototype = {
        __renderUI: function () {
            n(this, "header"), n(this, "body"), n(this, "footer")
        }, _uiSetBodyStyle: function (e) {
            this.get("body").css(e)
        }, _uiSetHeaderStyle: function (e) {
            this.get("header").css(e)
        }, _uiSetFooterStyle: function (e) {
            this.get("footer").css(e)
        }, _uiSetBodyContent: function (e) {
            r(this, "body", e)
        }, _uiSetHeaderContent: function (e) {
            r(this, "header", e)
        }, _uiSetFooterContent: function (e) {
            r(this, "footer", e)
        }
    }, i.ATTRS = {
        header: {view: 1},
        body: {view: 1},
        footer: {view: 1},
        bodyStyle: {view: 1},
        footerStyle: {view: 1},
        headerStyle: {view: 1},
        headerContent: {view: 1},
        bodyContent: {view: 1},
        footerContent: {view: 1}
    }, i.View = t, i
}), define("bui/component/uibase/decorate", ["bui/array", "bui/json", "bui/component/manage"], function (e) {
    function l(e, t) {
        if (t[e]) return !0;
        var n = new RegExp("^" + i);
        return e !== s && n.test(e) ? !0 : !1
    }

    function c(e) {
        var t = [], n = e.constructor;
        while (n) t.push(n), n = n.superclass && n.superclass.constructor;
        return t
    }

    function h(e) {
        return e.toLowerCase().replace(a, function (e, t) {
            return (t + "").toUpperCase()
        })
    }

    function p(e) {
        e = $.trim(e);
        if (e.toLowerCase() === "false") e = !1; else if (e.toLowerCase() === "true") e = !0; else if (f.test(e)) e = n.looseParse(e); else if (/\d/.test(e) && /[^a-z]/i.test(e)) {
            var t = parseFloat(e);
            t + "" === e && (e = t)
        }
        return e
    }

    function d(e, t) {
        var n = e.userConfig || {};
        for (var r in t) r in n || e.setInternal(r, t[r])
    }

    function v(e, t) {
        var n = this, r, i, s = n.userConfig || {};
        for (r in t) r in s || (i = t[r], BUI.isFunction(i) ? n.setInternal(r, i.call(n, e)) : typeof i == "string" ? n.setInternal(r, e.find(i)) : BUI.isArray(i) && i[0] && n.setInternal(r, e.find(i[0])))
    }

    function m(e, t) {
        var n = e.constructor, r, i, s;
        s = c(e);
        for (r = s.length - 1; r >= 0; r--) n = s[r], (i = n[o]) && v.call(e, t, i)
    }

    function g(e) {
        var t = e, n = t.get("srcNode"), r, i;
        n && (n = $(n), t.setInternal("el", n), t.setInternal("srcNode", n), r = t.get("userConfig"), i = t.getDecorateConfig(n), d(e, i), t.get("isDecorateChild") && t.decorateInternal && t.decorateInternal(n), m(e, n))
    }

    function y() {
        g(this)
    }

    var t = e("bui/array"), n = e("bui/json"), r = BUI.prefix, i = "data-", s = i + "cfg", o = "PARSER",
        u = e("bui/component/manage"), a = /-([a-z])/g, f = /^[\{\[]/;
    return y.ATTRS = {
        srcNode: {view: !0},
        isDecorateChild: {value: !1},
        decorateCfgFields: {value: {id: !0, name: !0, value: !0, title: !0}}
    }, y.prototype = {
        getDecorateConfig: function (e) {
            if (!e.length) return null;
            var t = this, n = e[0], r = n.attributes, o = t.get("decorateCfgFields"), u = {}, a = t._getStautsCfg(e);
            return BUI.each(r, function (e) {
                var t = e.nodeName;
                try {
                    if (t === s) {
                        var n = p(e.nodeValue);
                        BUI.mix(u, n)
                    } else if (l(t, o)) {
                        var r = e.nodeValue;
                        t.indexOf(i) !== -1 && (t = t.replace(i, ""), t = h(t), r = p(r)), u[t] && BUI.isObject(r) ? BUI.mix(u[t], r) : u[t] = r
                    }
                } catch (a) {
                    BUI.log("parse field error,the attribute is:" + t)
                }
            }), BUI.mix(u, a)
        }, _getStautsCfg: function (e) {
            var t = this, n = {}, r = t.get("statusCls");
            return BUI.each(r, function (t, r) {
                e.hasClass(t) && (n[r] = !0)
            }), n
        }, getDecorateElments: function () {
            var e = this, t = e.get("el"), n = e.get("childContainer");
            return n ? t.find(n).children() : t.children()
        }, decorateInternal: function (e) {
            var t = this;
            t.decorateChildren(e)
        }, findXClassByNode: function (e, t) {
            var n = this, i = e.attr("class") || "", s = n.get("defaultChildClass");
            i = i.replace(new RegExp("\\b" + r, "ig"), "");
            var o = u.getConstructorByXClass(i) || u.getConstructorByXClass(s);
            return !o && !t && (BUI.log(e), BUI.error("can not find ui " + i + " from this markup")), u.getXClassByConstructor(o)
        }, decorateChildrenInternal: function (e, t) {
            var n = this, r = n.get("children");
            r.push({xclass: e, srcNode: t})
        }, decorateChildren: function (e) {
            var t = this, n = t.getDecorateElments();
            BUI.each(n, function (e) {
                var n = t.findXClassByNode($(e));
                t.decorateChildrenInternal(n, $(e))
            })
        }
    }, y
}), define("bui/component/uibase/tpl", function () {
    function e() {
    }

    function t() {
    }

    return e.ATTRS = {tpl: {}, tplEl: {}}, e.prototype = {
        __renderUI: function () {
            var e = this, t = e.get("childContainer"), n;
            t && (n = e.get("el").find(t), n.length && e.set("contentEl", n))
        }, getTpl: function (e) {
            var t = this, n = t.get("tpl"), r = t.get("tplRender");
            return e = e || t.getAttrVals(), r ? r(e) : n ? BUI.substitute(n, e) : ""
        }, setTplContent: function (e) {
            var t = this, n = t.get("el"), r = t.get("content"), i = t.get("tplEl"), s = t.getTpl(e);
            !r && s && (n.empty(), n.html(s))
        }
    }, t.ATTRS = {
        tpl: {view: !0, sync: !1},
        tplRender: {view: !0, value: null},
        childContainer: {view: !0}
    }, t.prototype = {
        __renderUI: function () {
            this.get("srcNode") || this.setTplContent()
        }, updateContent: function () {
            this.setTplContent()
        }, setTplContent: function () {
            var e = this, t = e.getAttrVals();
            e.get("view").setTplContent(t)
        }, _uiSetTpl: function () {
            this.setTplContent()
        }
    }, t.View = e, t
}), define("bui/component/uibase/collapsable", function () {
    var e = function () {
    };
    e.ATTRS = {collapsed: {}}, e.prototype = {
        _uiSetCollapsed: function (e) {
            var t = this, n = t.getStatusCls("collapsed"), r = t.get("el");
            e ? r.addClass(n) : r.removeClass(n)
        }
    };
    var t = function () {
    };
    return t.ATTRS = {
        collapsable: {value: !1},
        collapsed: {view: !0, value: !1},
        events: {value: {expanded: !0, collapsed: !0}}
    }, t.prototype = {
        _uiSetCollapsed: function (e) {
            var t = this;
            e ? t.fire("collapsed") : t.fire("expanded")
        }
    }, t.View = e, t
}), define("bui/component/uibase/selection", function () {
    var e = "single", t = function () {
    };
    return t.ATTRS = {
        selectedEvent: {value: "click"},
        events: {value: {selectedchange: !1, beforeselectedchange: !1, itemselected: !1, itemunselected: !1}},
        idField: {value: "id"},
        multipleSelect: {value: !1}
    }, t.prototype = {
        clearSelection: function () {
            var e = this, t = e.getSelection();
            BUI.each(t, function (t) {
                e.clearSelected(t)
            })
        }, getSelection: function () {
        }, getSelected: function () {
            return this.getSelection()[0]
        }, getSelectedValue: function () {
            var e = this, t = e.get("idField"), n = e.getSelected();
            return e.getValueByField(n, t)
        }, getSelectionValues: function () {
            var e = this, t = e.get("idField"), n = e.getSelection();
            return $.map(n, function (n) {
                return e.getValueByField(n, t)
            })
        }, getSelectionText: function () {
            var e = this, t = e.getSelection();
            return $.map(t, function (t) {
                return e.getItemText(t)
            })
        }, clearSelected: function (e) {
            var t = this;
            e = e || t.getSelected(), e && t.setItemSelected(e, !1)
        }, getSelectedText: function () {
            var e = this, t = e.getSelected();
            return e.getItemText(t)
        }, setSelection: function (e) {
            var t = this;
            e = BUI.isArray(e) ? e : [e], BUI.each(e, function (e) {
                t.setSelected(e)
            })
        }, setSelected: function (e) {
            var t = this, n = t.get("multipleSelect");
            if (!t.isItemSelectable(e)) return;
            if (!n) {
                var r = t.getSelected();
                e != r && t.clearSelected(r)
            }
            t.setItemSelected(e, !0)
        }, isItemSelected: function (e) {
        }, isItemSelectable: function (e) {
            return !0
        }, setItemSelected: function (e, t) {
            var n = this, r;
            if (e) {
                r = n.isItemSelected(e);
                if (r == t) return
            }
            n.fire("beforeselectedchange", {item: e, selected: t}) !== !1 && n.setItemSelectedStatus(e, t)
        }, setItemSelectedStatus: function (e, t) {
        }, setAllSelection: function () {
        }, setSelectedByField: function (e, t) {
            t || (t = e, e = this.get("idField"));
            var n = this, r = n.findItemByField(e, t);
            n.setSelected(r)
        }, setSelectionByField: function (e, t) {
            t || (t = e, e = this.get("idField"));
            var n = this;
            BUI.each(t, function (t) {
                n.setSelectedByField(e, t)
            })
        }, afterSelected: function (e, t, n) {
            var r = this;
            t ? (r.fire("itemselected", {item: e, domTarget: n}), r.fire("selectedchange", {
                item: e,
                domTarget: n,
                selected: t
            })) : (r.fire("itemunselected", {
                item: e,
                domTarget: n
            }), r.get("multipleSelect") && r.fire("selectedchange", {item: e, domTarget: n, selected: t}))
        }
    }, t
}), define("bui/component/uibase/list", ["bui/component/uibase/selection"], function (e) {
    function r(e) {
        e.selected && (e.selected = !1), e.set && e.set("selected", !1)
    }

    function i(e, t) {
        var n = t.isController ? t.getAttrVals() : t, r = e.get("itemTpl"), i = e.get("itemStatusCls"),
            o = e.get("itemTplRender");
        r && !n.tpl && s(t, "tpl", r), o && !n.tplRender && s(t, "tplRender", o);
        if (i) {
            var u = n.statusCls || t.isController ? t.get("statusCls") : {};
            BUI.each(i, function (e, t) {
                e && !u[t] && (u[t] = e)
            }), s(t, "statusCls", u)
        }
    }

    function s(e, t, n) {
        e.isController ? e.set(t, n) : e[t] = n
    }

    var t = e("bui/component/uibase/selection"), n = function () {
    };
    n.ATTRS = {
        items: {shared: !1, view: !0},
        idField: {value: "id"},
        itemTpl: {view: !0},
        itemTplRender: {view: !0},
        itemStatusCls: {view: !0, value: {}},
        events: {value: {itemclick: !0}}
    }, n.prototype = {
        getItemCount: function () {
            return this.getItems().length
        }, getValueByField: function (e, t) {
        }, getItems: function () {
        }, getFirstItem: function () {
            return this.getItemAt(0)
        }, getLastItem: function () {
            return this.getItemAt(this.getItemCount() - 1)
        }, getItemAt: function (e) {
            return this.getItems()[e] || null
        }, getItem: function (e) {
            var t = this.get("idField");
            return this.findItemByField(t, e)
        }, indexOfItem: function (e) {
            return BUI.Array.indexOf(e, this.getItems())
        }, addItems: function (e) {
            var t = this;
            BUI.each(e, function (e) {
                t.addItem(e)
            })
        }, addItemsAt: function (e, t) {
            var n = this;
            BUI.each(e, function (e, r) {
                n.addItemAt(e, t + r)
            })
        }, updateItem: function (e) {
        }, addItem: function (e) {
            return this.addItemAt(e, this.getItemCount())
        }, addItemAt: function (e, t) {
        }, findItemByField: function (e, t) {
        }, getItemText: function (e) {
        }, clearItems: function () {
            var e = this, t = e.getItems();
            t.splice(0), e.clearControl()
        }, removeItem: function (e) {
        }, removeItems: function (e) {
            var t = this;
            BUI.each(e, function (e) {
                t.removeItem(e)
            })
        }, removeItemAt: function (e) {
            this.removeItem(this.getItemAt(e))
        }, clearControl: function () {
        }
    };
    var o = function () {
        this.__init()
    };
    return o.ATTRS = BUI.merge(!0, n.ATTRS, t.ATTRS, {
        items: {sync: !1},
        autoInitItems: {value: !0},
        isDecorateChild: {value: !0},
        defaultLoaderCfg: {value: {property: "children", dataType: "json"}}
    }), BUI.augment(o, n, t, {
        __init: function () {
            var e = this, t = e.get("items");
            t && e.get("autoInitItems") && e.addItems(t), e.on("beforeRenderUI", function () {
                e._beforeRenderUI()
            })
        }, _uiSetItems: function (e) {
            var t = this;
            t.clearControl(), t.addItems(e)
        }, _beforeRenderUI: function () {
            var e = this, t = e.get("children"), n = e.get("items");
            BUI.each(t, function (t) {
                i(e, t)
            })
        }, __bindUI: function () {
            var e = this, t = e.get("selectedEvent");
            e.on(t, function (t) {
                var n = t.target;
                n.get("selectable") && (n.get("selected") ? e.get("multipleSelect") && e.clearSelected(n) : e.setSelected(n))
            }), e.on("click", function (t) {
                t.target !== e && e.fire("itemclick", {item: t.target, domTarget: t.domTarget, domEvent: t})
            }), e.on("beforeAddChild", function (t) {
                i(e, t.child)
            }), e.on("beforeRemoveChild", function (t) {
                var n = t.child, r = n.get("selected");
                r && (e.get("multipleSelect") ? e.clearSelected(n) : e.setSelected(null)), n.set("selected", !1)
            })
        }, clearControl: function () {
            this.removeChildren(!0)
        }, getItems: function () {
            return this.get("children")
        }, updateItem: function (e) {
            var t = this, n = t.get("idField"), r = t.findItemByField(n, e[n]);
            return r && r.setTplContent(), r
        }, removeItem: function (e) {
            var t = this, n = t.get("idField");
            e instanceof BUI.Component.Controller || (e = t.findItemByField(n, e[n])), this.removeChild(e, !0)
        }, addItemAt: function (e, t) {
            return this.addChild(e, t)
        }, findItemByField: function (e, t, n) {
            n = n || this;
            var r = this, i = n.get("children"), s = null;
            return $(i).each(function (n, i) {
                i.get(e) == t ? s = i : i.get("children").length && (s = r.findItemByField(e, t, i));
                if (s) return !1
            }), s
        }, getItemText: function (e) {
            return e.get("el").text()
        }, getValueByField: function (e, t) {
            return e && e.get(t)
        }, setItemSelectedStatus: function (e, t) {
            var n = this, r = t ? "addClass" : "removeClass", i = null;
            e && (e.set("selected", t), i = e.get("el")), n.afterSelected(e, t, i)
        }, isItemSelected: function (e) {
            return e ? e.get("selected") : !1
        }, setAllSelection: function () {
            var e = this, t = e.getItems();
            e.setSelection(t)
        }, getSelection: function () {
            var e = this, t = e.getItems(), n = [];
            return BUI.each(t, function (t) {
                e.isItemSelected(t) && n.push(t)
            }), n
        }
    }), n.ChildList = o, n
}), define("bui/component/uibase/childcfg", function (e) {
    var t = function (e) {
        this._init()
    };
    return t.ATTRS = {defaultChildCfg: {}}, t.prototype = {
        _init: function () {
            var e = this, t = e.get("defaultChildCfg");
            t && e.on("beforeAddChild", function (e) {
                var n = e.child;
                $.isPlainObject(n) && BUI.each(t, function (e, t) {
                    n[t] == null && (n[t] = e)
                })
            })
        }
    }, t
}), define("bui/component/uibase/depends", ["bui/component/manage"], function (e) {
    function r(e) {
        var n = t.exec(e), r = n[1], i = n[2], s = o(r);
        return {source: s, eventType: i}
    }

    function i(e, t, n) {
        var i = r(t), s = i.source, o = i.eventType, u;
        return s && n && o && (BUI.isFunction(n) ? u = n : BUI.isArray(n) && (u = function () {
            BUI.each(n, function (t) {
                e[t] && e[t]()
            })
        })), u ? (i.callbak = u, s.on(o, u), i) : null
    }

    function s(e) {
        var t = e.source, n = e.eventType, r = e.callbak;
        t.off(n, r)
    }

    function o(e) {
        var t = n.getComponent(e);
        return t || (t = $("#" + e), t.length || (t = null)), t
    }

    function u() {
    }

    var t = /^#(.*):(.*)$/, n = e("bui/component/manage");
    return u.ATTRS = {depends: {}, dependencesMap: {shared: !1, value: {}}}, u.prototype = {
        __syncUI: function () {
            this.initDependences()
        }, initDependences: function () {
            var e = this, t = e.get("depends");
            BUI.each(t, function (t, n) {
                e.addDependence(n, t)
            })
        }, addDependence: function (e, t) {
            var n = this, r = n.get("dependencesMap"), s;
            n.removeDependence(e), s = i(n, e, t), s && (r[e] = s)
        }, removeDependence: function (e) {
            var t = this, n = t.get("dependencesMap"), r = n[e];
            r && (s(r), delete n[e])
        }, clearDependences: function () {
            var e = this, t = e.get("dependencesMap");
            BUI.each(t, function (e, t) {
                s(e)
            }), e.set("dependencesMap", {})
        }, __destructor: function () {
            this.clearDependences()
        }
    }, u
}), define("bui/component/uibase/bindable", function () {
    function e() {
    }

    return e.ATTRS = {store: {}, loadMask: {value: !1}}, BUI.augment(e, {
        __bindUI: function () {
            var e = this, t = e.get("store"), n = e.get("loadMask");
            if (!t) return;
            t.on("beforeload", function (t) {
                e.onBeforeLoad(t), n && n.show && n.show()
            }), t.on("load", function (t) {
                e.onLoad(t), n && n.hide && n.hide()
            }), t.on("exception", function (t) {
                e.onException(t), n && n.hide && n.hide()
            }), t.on("add", function (t) {
                e.onAdd(t)
            }), t.on("remove", function (t) {
                e.onRemove(t)
            }), t.on("update", function (t) {
                e.onUpdate(t)
            }), t.on("localsort", function (t) {
                e.onLocalSort(t)
            }), t.on("filtered", function (t) {
                e.onFiltered(t)
            })
        }, __syncUI: function () {
            var e = this, t = e.get("store");
            if (!t) return;
            t.hasData() && e.onLoad()
        }, onBeforeLoad: function (e) {
        }, onLoad: function (e) {
        }, onException: function (e) {
        }, onAdd: function (e) {
        }, onRemove: function (e) {
        }, onUpdate: function (e) {
        }, onLocalSort: function (e) {
        }, onFiltered: function (e) {
        }
    }), e
}), define("bui/component/view", ["bui/component/manage", "bui/component/uibase"], function (e) {
    var t = window, n = e("bui/component/manage"), r = e("bui/component/uibase"), i = document,
        s = r.extend([r.TplView], {
            getComponentCssClassWithState: function (e) {
                var t = this, n = t.get("ksComponentCss");
                return e = e || "", t.getCssClassWithPrefix(n.split(/\s+/).join(e + " ") + e)
            }, getCssClassWithPrefix: n.getCssClassWithPrefix, getKeyEventTarget: function () {
                return this.get("el")
            }, getContentElement: function () {
                return this.get("contentEl") || this.get("el")
            }, getStatusCls: function (e) {
                var t = this, n = t.get("statusCls"), r = n[e];
                return r || (r = t.getComponentCssClassWithState("-" + e)), r
            }, renderUI: function () {
                var e = this;
                if (!e.get("srcNode")) {
                    var t = e.get("render"), n = e.get("el"), r = e.get("elBefore");
                    r ? n.insertBefore(r, undefined) : t ? n.appendTo(t, undefined) : n.appendTo(i.body, undefined)
                }
            }, createDom: function () {
                var e = this, t = e.get("contentEl"), n = e.get("el");
                e.get("srcNode") || (n = $("<" + e.get("elTagName") + ">"), t && n.append(t), e.setInternal("el", n)), n.addClass(e.getComponentCssClassWithState()), t || e.setInternal("contentEl", n)
            }, _uiSetHighlighted: function (e) {
                var t = this, n = t.getStatusCls("hover"), r = t.get("el");
                r[e ? "addClass" : "removeClass"](n)
            }, _uiSetDisabled: function (e) {
                var t = this, n = t.getStatusCls("disabled"), r = t.get("el");
                r[e ? "addClass" : "removeClass"](n).attr("aria-disabled", e), e && t.get("highlighted") && t.set("highlighted", !1), t.get("focusable") && t.getKeyEventTarget().attr("tabIndex", e ? -1 : 0)
            }, _uiSetActive: function (e) {
                var t = this, n = t.getStatusCls("active");
                t.get("el")[e ? "addClass" : "removeClass"](n).attr("aria-pressed", !!e)
            }, _uiSetFocused: function (e) {
                var t = this, n = t.get("el"), r = t.getStatusCls("focused");
                n[e ? "addClass" : "removeClass"](r)
            }, _uiSetElAttrs: function (e) {
                this.get("el").attr(e)
            }, _uiSetElCls: function (e) {
                this.get("el").addClass(e)
            }, _uiSetElStyle: function (e) {
                this.get("el").css(e)
            }, _uiSetRole: function (e) {
                e && this.get("el").attr("role", e)
            }, _uiSetWidth: function (e) {
                this.get("el").width(e)
            }, _uiSetHeight: function (e) {
                var t = this;
                t.get("el").height(e)
            }, _uiSetContent: function (e) {
                var t = this, n;
                if (!t.get("srcNode") || !!t.get("rendered")) n = t.get("contentEl"), typeof e == "string" ? n.html(e) : e && n.empty().append(e)
            }, _uiSetVisible: function (e) {
                var t = this, n = t.get("el"), r = t.get("visibleMode");
                r === "visibility" ? n.css("visibility", e ? "visible" : "hidden") : n.css("display", e ? "" : "none")
            }, set: function (e, t) {
                var n = this, r = n.__attrs[e], i, o, u;
                if (!r || !n.get("binded")) return s.superclass.set.call(this, e, t), n;
                var a = s.superclass.get.call(this, e);
                return !$.isPlainObject(t) && !BUI.isArray(t) && a === t ? n : (s.superclass.set.call(this, e, t), t = n.__attrVals[e], i = {
                    attrName: e,
                    prevVal: a,
                    newVal: t
                }, o = BUI.ucfirst(e), u = "_uiSet" + o, n[u] && n[u](t, i), n)
            }, destructor: function () {
                var e = this.get("el");
                e && e.remove()
            }
        }, {xclass: "view", priority: 0});
    return s.ATTRS = {
        el: {
            setter: function (e) {
                return $(e)
            }
        },
        elCls: {},
        elStyle: {},
        role: {},
        width: {},
        height: {},
        statusCls: {value: {}},
        elTagName: {value: "div"},
        elAttrs: {},
        content: {},
        elBefore: {},
        render: {},
        visible: {value: !0},
        visibleMode: {value: "display"},
        cachePosition: {},
        contentEl: {
            valueFn: function () {
                return this.get("el")
            }
        },
        prefixCls: {value: BUI.prefix},
        focusable: {value: !0},
        focused: {},
        active: {},
        disabled: {},
        highlighted: {}
    }, s
}), define("bui/component/loader"
    , ["bui/util"], function (e) {
        "use strict";
        var t = e("bui/util"), n = e("bui/base"), r = function (e) {
            r.superclass.constructor.call(this, e), this._init()
        };
        return r.ATTRS = {
            url: {},
            target: {},
            hasLoad: {value: !1},
            autoLoad: {},
            lazyLoad: {},
            property: {},
            renderer: {
                value: function (e) {
                    return e
                }
            },
            loadMask: {value: !1},
            dataType: {value: "text"},
            ajaxOptions: {value: {type: "get", cache: !1}},
            params: {},
            appendParams: {},
            lastParams: {shared: !1, value: {}},
            callback: {},
            failure: {}
        }, t.extend(r, n), t.augment(r, {
            isLoader: !0, _init: function () {
                var e = this, t = e.get("autoLoad"), n = e.get("params");
                e._initMask(), t ? e.load(n) : (e._initParams(), e._initLazyLoad())
            }, _initLazyLoad: function () {
                var e = this, t = e.get("target"), n = e.get("lazyLoad");
                t && n && n.event && t.on(n.event, function () {
                    (!e.get("hasLoad") || n.repeat) && e.load()
                })
            }, _initMask: function () {
                var e = this, n = e.get("target"), r = e.get("loadMask");
                n && r && t.use("bui/mask", function (i) {
                    var s = $.isPlainObject(r) ? r : {};
                    r = new i.LoadMask(t.mix({el: n.get("el")}, s)), e.set("loadMask", r)
                })
            }, _initParams: function () {
                var e = this, n = e.get("lastParams"), r = e.get("params");
                t.mix(n, r)
            }, load: function (e) {
                var n = this, r = n.get("url"), i = n.get("ajaxOptions"), s = n.get("lastParams"),
                    o = n.get("appendParams");
                e = e || s, e = t.merge(o, e), n.set("lastParams", e);
                if (!r) return;
                n.onBeforeLoad(), n.set("hasLoad", !0), $.ajax(t.mix({
                    dataType: n.get("dataType"),
                    data: e,
                    url: r,
                    success: function (t) {
                        n.onload(t, e)
                    },
                    error: function (t, r, i) {
                        n.onException({jqXHR: t, textStatus: r, errorThrown: i}, e)
                    }
                }, i))
            }, onBeforeLoad: function () {
                var e = this, t = e.get("loadMask");
                t && t.show && t.show()
            }, onload: function (e, n) {
                var r = this, i = r.get("loadMask"), s = r.get("property"), o = r.get("callback"),
                    u = r.get("renderer"), a = r.get("target");
                t.isString(e) && a.set(s, ""), a.set(s, u.call(r, e)), i && i.hide && i.hide(), o && o.call(this, e, n)
            }, onException: function (e, t) {
                var n = this, r = n.get("failure");
                r && r.call(this, e, t)
            }
        }), r
    }), define("bui/component/controller", ["bui/component/uibase", "bui/component/manage", "bui/component/view", "bui/component/loader"], function (e) {
    "use strict";

    function u(e) {
        return function (t) {
            var n = this;
            if (n === t.target) {
                var r = t.newVal, i = n.get("view");
                i && i.set(e, r)
            }
        }
    }

    function a(e) {
        return function (t) {
            var n = this, r = n.get("view");
            return t === undefined ? r.get(e) : t
        }
    }

    function f(e, t, n) {
        e.create();
        var r = e.getContentElement(), i = e.get("defaultChildClass");
        return !t.xclass && !(t instanceof p) && (t.xtype ? t.xclass = i + "-" + t.xtype : t.xclass = i), t = BUI.Component.create(t, e), t.setInternal("parent", e), t.set("render", r), t.set("elBefore", n), t.create(undefined), t
    }

    function l(e) {
        var t, n, r, i = {}, s, o = e.get("xview");
        t = e.getAttrs();
        for (r in t) t.hasOwnProperty(r) && (n = t[r], n.view && (s = e.get(r)) !== undefined && (i[r] = s));
        return delete i.autoRender, i.ksComponentCss = c(e), new o(i)
    }

    function c(e) {
        var t = e.constructor, r, i = [];
        while (t && t !== p) r = n.getXClassByConstructor(t), r && i.push(r), t = t.superclass && t.superclass.constructor;
        return i.join(" ")
    }

    function h(e, t) {
        var n = e.relatedTarget;
        return n && (n === t[0] || $.contains(t, n))
    }

    var t = e("bui/component/uibase"), n = e("bui/component/manage"), r = e("bui/component/view"),
        i = e("bui/component/loader"), s = BUI.wrapBehavior, o = BUI.getWrapBehavior,
        p = t.extend([t.Decorate, t.Tpl, t.ChildCfg, t.KeyNav, t.Depends], {
            isController: !0,
            getCssClassWithPrefix: n.getCssClassWithPrefix,
            initializer: function () {
                var e = this;
                e.get("id") || e.set("id", e.getNextUniqueId()), n.addComponent(e.get("id"), e);
                var t = l(e);
                e.setInternal("view", t), e.__view = t
            },
            getNextUniqueId: function () {
                var e = this, t = n.getXClassByConstructor(e.constructor);
                return BUI.guid(t)
            },
            createDom: function () {
                var e = this, t = e.get("view");
                t.create(undefined)
            },
            renderUI: function () {
                var e = this, t = e.get("loader");
                e.get("view").render(), e._initChildren(), t && e.setInternal("loader", t)
            },
            _initChildren: function (e) {
                var t = this, n, e, r;
                e = e || t.get("children").concat(), t.get("children").length = 0;
                for (n = 0; n < e.length; n++) r = t.addChild(e[n]), r.render()
            },
            bindUI: function () {
                var e = this, t = e.get("events");
                this.on("afterVisibleChange", function (e) {
                    this.fire(e.newVal ? "show" : "hide")
                }), BUI.each(t, function (t, n) {
                    e.publish(n, {bubbles: t})
                })
            },
            containsElement: function (e) {
                var t = this, n = t.get("el"), r = t.get("children"), i = !1;
                return t.get("rendered") ? ($.contains(n[0], e) || n[0] === e ? i = !0 : BUI.each(r, function (t) {
                    if (t.containsElement(e)) return i = !0, !1
                }), i) : !1
            },
            isChildrenElement: function (e) {
                var t = this, n = t.get("children"), r = !1;
                return BUI.each(n, function (t) {
                    if (t.containsElement(e)) return r = !0, !1
                }), r
            },
            show: function () {
                var e = this;
                return e.render(), e.set("visible", !0), e
            },
            hide: function () {
                var e = this;
                return e.set("visible", !1), e
            },
            toggle: function () {
                return this.set("visible", !this.get("visible")), this
            },
            _uiSetFocusable: function (e) {
                var t = this, n, r = t.getKeyEventTarget();
                e ? r.attr("tabIndex", 0).attr("hideFocus", !0).on("focus", s(t, "handleFocus")).on("blur", s(t, "handleBlur")).on("keydown", s(t, "handleKeydown")).on("keyup", s(t, "handleKeyUp")) : (r.removeAttr("tabIndex"), (n = o(t, "handleFocus")) && r.off("focus", n), (n = o(t, "handleBlur")) && r.off("blur", n), (n = o(t, "handleKeydown")) && r.off("keydown", n), (n = o(t, "handleKeyUp")) && r.off("keyup", n))
            },
            _uiSetHandleMouseEvents: function (e) {
                var t = this, n = t.get("el"), r;
                e ? n.on("mouseenter", s(t, "handleMouseEnter")).on("mouseleave", s(t, "handleMouseLeave")).on("contextmenu", s(t, "handleContextMenu")).on("mousedown", s(t, "handleMouseDown")).on("mouseup", s(t, "handleMouseUp")).on("dblclick", s(t, "handleDblClick")) : (r = o(t, "handleMouseEnter") && n.off("mouseenter", r), r = o(t, "handleMouseLeave") && n.off("mouseleave", r), r = o(t, "handleContextMenu") && n.off("contextmenu", r), r = o(t, "handleMouseDown") && n.off("mousedown", r), r = o(t, "handleMouseUp") && n.off("mouseup", r), r = o(t, "handleDblClick") && n.off("dblclick", r))
            },
            _uiSetFocused: function (e) {
                e && this.getKeyEventTarget()[0].focus()
            },
            _uiSetVisible: function (e) {
                var t = this, n = t.get("el"), r = t.get("visibleMode");
                if (r === "visibility") {
                    if (e) {
                        var i = t.get("cachePosition");
                        i && t.set("xy", i)
                    }
                    if (!e) {
                        var i = [t.get("x"), t.get("y")];
                        t.set("cachePosition", i), t.set("xy", [-999, -999])
                    }
                }
            },
            _uiSetChildren: function (e) {
                var t = this, n = BUI.cloneObject(e);
                t._initChildren(n)
            },
            enable: function () {
                return this.set("disabled", !1), this
            },
            disable: function () {
                return this.set("disabled", !0), this
            },
            focus: function () {
                this.get("focusable") && this.set("focused", !0)
            },
            getContentElement: function () {
                return this.get("view").getContentElement()
            },
            getKeyEventTarget: function () {
                return this.get("view").getKeyEventTarget()
            },
            addChild: function (e, t) {
                var n = this, r = n.get("children"), i;
                return t === undefined && (t = r.length), n.fire("beforeAddChild", {
                    child: e,
                    index: t
                }), i = r[t] && r[t].get("el") || null, e = f(n, e, i), r.splice(t, 0, e), n.get("rendered") && e.render(), n.fire("afterAddChild", {
                    child: e,
                    index: t
                }), e
            },
            remove: function (e) {
                var t = this, n = t.get("parent");
                return n ? n.removeChild(t, e) : e && t.destroy(), t
            },
            removeChild: function (e, t) {
                var n = this, r = n.get("children"), i = BUI.Array.indexOf(e, r);
                if (i === -1) return;
                return n.fire("beforeRemoveChild", {
                    child: e,
                    destroy: t
                }), i !== -1 && r.splice(i, 1), t && e.destroy && e.destroy(), n.fire("afterRemoveChild", {
                    child: e,
                    destroy: t
                }), e
            },
            removeChildren: function (e) {
                var t = this, n, r = [].concat(t.get("children"));
                for (n = 0; n < r.length; n++) t.removeChild(r[n], e)
            },
            getChildAt: function (e) {
                var t = this.get("children");
                return t[e] || null
            },
            getChild: function (e, t) {
                return this.getChildBy(function (t) {
                    return t.get("id") === e
                }, t)
            },
            getChildBy: function (e, t) {
                return this.getChildrenBy(e, t)[0] || null
            },
            getAppendHeight: function () {
                var e = this.get("el");
                return e.outerHeight() - e.height()
            },
            getAppendWidth: function () {
                var e = this.get("el");
                return e.outerWidth() - e.width()
            },
            getChildrenBy: function (e, t) {
                var n = this, r = [];
                return e ? (n.eachChild(function (n) {
                    e(n) ? r.push(n) : t && (r = r.concat(n.getChildrenBy(e, t)))
                }), r) : r
            },
            eachChild: function (e) {
                BUI.each(this.get("children"), e)
            },
            handleDblClick: function (e) {
                this.performActionInternal(e), this.isChildrenElement(e.target) || this.fire("dblclick", {
                    domTarget: e.target,
                    domEvent: e
                })
            },
            handleMouseOver: function (e) {
                var t = this, n = t.get("el");
                h(e, n) || t.handleMouseEnter(e)
            },
            handleMouseOut: function (e) {
                var t = this, n = t.get("el");
                h(e, n) || t.handleMouseLeave(e)
            },
            handleMouseEnter: function (e) {
                var t = this;
                this.set("highlighted", !!e), t.fire("mouseenter", {domTarget: e.target, domEvent: e})
            },
            handleMouseLeave: function (e) {
                var t = this;
                t.set("active", !1), t.set("highlighted", !e), t.fire("mouseleave", {domTarget: e.target, domEvent: e})
            },
            handleMouseDown: function (e) {
                var t = this, n, r = $(e.target), i = e.which === 1, s;
                i && (s = t.getKeyEventTarget(), t.get("activeable") && t.set("active", !0), t.get("focusable") && t.setInternal("focused", !0), t.get("allowTextSelection") || (n = e.target.nodeName, n = n && n.toLowerCase(), n !== "input" && n !== "textarea" && e.preventDefault()), t.isChildrenElement(e.target) || t.fire("mousedown", {
                    domTarget: e.target,
                    domEvent: e
                }))
            },
            handleMouseUp: function (e) {
                var t = this, n = t.isChildrenElement(e.target);
                t.get("active") && e.which === 1 && (t.performActionInternal(e), t.set("active", !1), n || t.fire("click", {
                    domTarget: e.target,
                    domEvent: e
                })), n || t.fire("mouseup", {domTarget: e.target, domEvent: e})
            },
            handleContextMenu: function (e) {
            },
            handleFocus: function (e) {
                this.set("focused", !!e), this.fire("focus", {domEvent: e, domTarget: e.target})
            },
            handleBlur: function (e) {
                this.set("focused", !e), this.fire("blur", {domEvent: e, domTarget: e.target})
            },
            handleKeyEventInternal: function (e) {
                var t = this, n = t.isChildrenElement(e.target);
                if (e.which === 13) return n || t.fire("click", {
                    domTarget: e.target,
                    domEvent: e
                }), this.performActionInternal(e);
                n || t.fire("keydown", {domTarget: e.target, domEvent: e})
            },
            handleKeydown: function (e) {
                var t = this;
                if (t.handleKeyEventInternal(e)) return e.halt(), !0
            },
            handleKeyUp: function (e) {
                var t = this;
                t.isChildrenElement(e.target) || t.fire("keyup", {domTarget: e.target, domEvent: e})
            },
            performActionInternal: function (e) {
            },
            destructor: function () {
                var e = this, t, r, i, s = e.get("children");
                t = e.get("id");
                for (r = 0; r < s.length; r++) s[r].destroy && s[r].destroy();
                e.get("view").destroy(), n.removeComponent(t)
            },
            set: function (e, t, n) {
                var r = this, i = r.__view, s = r.__attrs[e], o, u, a;
                BUI.isObject(e) && (n = t, BUI.each(e, function (e, t) {
                    r.set(t, e, n)
                }));
                if (!i || !s || n && n.silent) return p.superclass.set.call(this, e, t, n), r;
                var f = p.superclass.get.call(this, e);
                return !$.isPlainObject(t) && !BUI.isArray(t) && f === t ? r : (o = BUI.ucfirst(e), a = "_uiSet" + o, r.fire("before" + o + "Change", {
                    attrName: e,
                    prevVal: f,
                    newVal: t
                }), r.setInternal(e, t), t = r.__attrVals[e], i && s.view && i.set(e, t), u = {
                    attrName: e,
                    prevVal: f,
                    newVal: t
                }, r.fire("after" + o + "Change", u), r.get("binded") && r[a] && r[a](t, u), r)
            },
            get: function (e) {
                var t = this, n = t.__view, r = t.__attrs[e], i = p.superclass.get.call(this, e);
                return i !== undefined ? i : n && r && r.view ? n.get(e) : i
            }
        }, {
            ATTRS: {
                content: {view: 1},
                elTagName: {view: !0, value: "div"},
                defaultChildClass: {},
                xtype: {},
                id: {view: !0},
                width: {view: 1},
                height: {view: 1},
                elCls: {view: 1},
                elStyle: {view: 1},
                elAttrs: {view: 1},
                elBefore: {view: 1},
                el: {view: 1},
                events: {
                    value: {
                        click: !0,
                        dblclick: !0,
                        mouseenter: !0,
                        mouseleave: !0,
                        keydown: !0,
                        keyup: !0,
                        focus: !1,
                        blur: !1,
                        mousedown: !0,
                        mouseup: !0,
                        show: !1,
                        hide: !1
                    }
                },
                render: {view: 1},
                role: {view: 1},
                statusCls: {view: !0, value: {}},
                visibleMode: {view: 1, value: "display"},
                visible: {value: !0, view: 1},
                handleMouseEvents: {value: !0},
                focusable: {value: !1, view: 1},
                defaultLoaderCfg: {value: {property: "content", autoLoad: !0}},
                loader: {
                    getter: function (e) {
                        var t = this, n;
                        return e && !e.isLoader && (e.target = t, n = t.get("defaultLoaderCfg"), e = new i(BUI.merge(n, e)), t.setInternal("loader", e)), e
                    }
                },
                allowTextSelection: {value: !0},
                activeable: {value: !0},
                focused: {view: 1},
                active: {view: 1},
                highlighted: {view: 1},
                children: {sync: !1, shared: !1, value: []},
                prefixCls: {value: BUI.prefix, view: 1},
                parent: {
                    setter: function (e) {
                        this.addTarget(e)
                    }
                },
                disabled: {view: 1, value: !1},
                xview: {value: r}
            }, PARSER: {
                visible: function (e) {
                    var t = this, n = e.css("display"), r = e.css("visibility"), i = t.get("visibleMode");
                    return n == "none" && i == "display" || r == "hidden" && i == "visibility" ? !1 : !0
                }
            }
        }, {xclass: "controller", priority: 0});
    return p
}), define("bui/cookie", function () {
    function i(e) {
        return typeof e == "string" && e !== ""
    }

    var e = document, t = 864e5, n = encodeURIComponent, r = decodeURIComponent, s = {
        get: function (t) {
            var n, s;
            return i(t) && (s = String(e.cookie).match(new RegExp("(?:^| )" + t + "(?:(?:=([^;]*))|;|$)"))) && (n = s[1] ? r(s[1]) : ""), n
        }, set: function (r, s, o, u, a, f) {
            var l = String(n(s)), c = o;
            typeof c == "number" && (c = new Date, c.setTime(c.getTime() + o * t)), c instanceof Date && (l += "; expires=" + c.toUTCString()), i(u) && (l += "; domain=" + u), i(a) && (l += "; path=" + a), f && (l += "; secure"), e.cookie = r + "=" + l
        }, remove: function (e, t, n, r) {
            this.set(e, "", -1, t, n, r)
        }
    };
    return BUI.Cookie = s, s
}), function () {
    var e = "bui/data/";
    define("bui/data", ["bui/common", e + "sortable", e + "proxy", e + "abstractstore", e + "store", e + "node", e + "treestore"], function (t) {
        var n = t("bui/common"), r = n.namespace("Data");
        return n.mix(r, {
            Sortable: t(e + "sortable"),
            Proxy: t(e + "proxy"),
            AbstractStore: t(e + "abstractstore"),
            Store: t(e + "store"),
            Node: t(e + "node"),
            TreeStore: t(e + "treestore")
        }), r
    })
}(), define("bui/data/sortable", function () {
    var e = "ASC", t = "DESC", n = function () {
    };
    return n.ATTRS = {
        compareFunction: {
            value: function (e, t) {
                return e === undefined && (e = ""), t === undefined && (t = ""), BUI.isString(e) ? e.localeCompare(t) : e > t ? 1 : e === t ? 0 : -1
            }
        }, sortField: {}, sortDirection: {value: "ASC"}, sortInfo: {
            getter: function () {
                var e = this, t = e.get("sortField");
                return {field: t, direction: e.get("sortDirection")}
            }, setter: function (e) {
                var t = this;
                t.set("sortField", e.field), t.set("sortDirection", e.direction)
            }
        }
    }, BUI.augment(n, {
        compare: function (t, n, r, i) {
            var s = this, o;
            return r = r || s.get("sortField"), i = i || s.get("sortDirection"), !r || !i ? 1 : (o = i === e ? 1 : -1, s.get("compareFunction")(t[r], n[r]) * o)
        }, getSortData: function () {
        }, sortData: function (e, t, n) {
            var r = this, n = n || r.getSortData();
            return BUI.isArray(e) && (n = e, e = null), e = e || r.get("sortField"), t = t || r.get("sortDirection"), r.set("sortField", e), r.set("sortDirection", t), !e || !t ? n : (n.sort(function (n, i) {
                return r.compare(n, i, e, t)
            }), n)
        }
    }), n
}), define("bui/data/proxy", ["bui/data/sortable"], function (e) {
    var t = e("bui/data/sortable"), n = function (e) {
        n.superclass.constructor.call(this, e)
    };
    n.ATTRS = {}, BUI.extend(n, BUI.Base), BUI.augment(n, {
        _read: function (e, t) {
        }, read: function (e, t, n) {
            var r = this;
            n = n || r, r._read(e, function (e) {
                t.call(n, e)
            })
        }, _save: function (e, t, n) {
        }, save: function (e, t, n, r) {
            var i = this;
            r = r || i, i._save(e, t, function (e) {
                n.call(r, e)
            })
        }
    });
    var r = {READ: "read", ADD: "add", UPDATE: "update", REMOVE: "remove", SAVE_ALL: "all"}, i = function (e) {
        i.superclass.constructor.call(this, e)
    };
    i.ATTRS = BUI.mix(!0, n.ATTRS, {
        limitParam: {value: "limit"},
        startParam: {value: "start"},
        pageIndexParam: {value: "pageIndex"},
        saveTypeParam: {value: "saveType"},
        saveDataParam: {},
        pageStart: {value: 0},
        dataType: {value: "json"},
        method: {value: "GET"},
        ajaxOptions: {value: {}},
        cache: {value: !1},
        save: {},
        url: {}
    }), BUI.extend(i, n), BUI.augment(i, {
        _processParams: function (e) {
            var t = this, n = t.get("pageStart"), r = ["start", "limit", "pageIndex"];
            e.pageIndex != null && (e.pageIndex = e.pageIndex + n), BUI.each(r, function (n) {
                var r = t.get(n + "Param");
                r !== n && (e[r] = e[n], delete e[n])
            })
        }, _getUrl: function (e) {
            var t = this, n = t.get("save"), i;
            return e === r.READ ? t.get("url") : n ? BUI.isString(n) ? n : (i = n[e + "Url"], i || (i = t.get("url")), i) : t.get("url")
        }, _getAppendParams: function (e) {
            var t = this, n, i, s = null;
            return e == r.READ ? s : (n = t.get("save"), i = t.get("saveTypeParam"), n && !n[e + "Url"] && (s = {}, s[i] = e), s)
        }, _read: function (e, t) {
            var n = this, i;
            e = BUI.cloneObject(e), n._processParams(e), i = n._getAjaxOptions(r.READ, e), n._ajax(i, t)
        }, _getAjaxOptions: function (e, t) {
            var n = this, r = n.get("ajaxOptions"), i = n._getUrl(e), s;
            return BUI.mix(t, n._getAppendParams(e)), s = BUI.merge({
                url: i,
                type: n.get("method"),
                dataType: n.get("dataType"),
                data: t,
                cache: n.get("cache")
            }, r), s
        }, _ajax: function (e, t) {
            var n = this, r = e.success, i = e.error;
            e.success = function (e) {
                r && r(e), t(e)
            }, e.error = function (e, n, r) {
                i && i(e, n, r);
                var s = {exception: {status: n, errorThrown: r, jqXHR: e}};
                t(s)
            }, $.ajax(e)
        }, _save: function (e, t, n) {
            var r = this, i;
            i = r._getAjaxOptions(e, t), r._ajax(i, n)
        }
    });
    var s = function (e) {
        s.superclass.constructor.call(this, e)
    };
    return s.ATTRS = {matchFields: {value: []}}, BUI.extend(s, n), BUI.mixin(s, [t]), BUI.augment(s, {
        _read: function (e, t) {
            var n = this, r = e.pageable, i = e.start, s = e.sortField, o = e.sortDirection, u = e.limit,
                a = n.get("data"), f = [];
            a = n._getMatches(e), n.sortData(s, o), u ? (f = a.slice(i, i + u), t({
                rows: f,
                results: a.length
            })) : (f = a.slice(i), t(f))
        }, _getMatchFn: function (e, t) {
            var n = this;
            return function (n) {
                var r = !0;
                return BUI.each(t, function (t) {
                    if (e[t] != null && e[t] !== n[t]) return r = !1, !1
                }), r
            }
        }, _getMatches: function (e) {
            var t = this, n = t.get("matchFields"), r, i = t.get("data") || [];
            return e && n.length && (r = t._getMatchFn(e, n), i = BUI.Array.filter(i, r)), i
        }, _save: function (e, t, n) {
            var i = this, s = i.get("data");
            e == r.ADD ? s.push(t) : e == r.REMOVE ? BUI.Array.remove(s, t) : e == r.SAVE_ALL && (BUI.each(t.add, function (e) {
                s.push(e)
            }), BUI.each(t.remove, function (e) {
                BUI.Array.remove(s, e)
            }))
        }
    }), n.Ajax = i, n.Memery = s, n
}), define("bui/data/abstractstore", ["bui/common", "bui/data/proxy"], function (e) {
    function r(e) {
        r.superclass.constructor.call(this, e), this._init()
    }

    var t = e("bui/common"), n = e("bui/data/proxy");
    return r.ATTRS = {
        autoLoad: {value: !1},
        remoteFilter: {value: !1},
        lastParams: {shared: !1, value: {}},
        params: {},
        proxy: {shared: !1, value: {}},
        url: {},
        events: {value: ["acceptchanges", "load", "beforeload", "beforeprocessload", "add", "exception", "remove", "update", "localsort", "filtered"]},
        data: {
            setter: function (e) {
                var t = this, n = t.get("proxy");
                n.set ? n.set("data", e) : n.data = e, t.set("autoLoad", !0)
            }
        }
    }, t.extend(r, t.Base), t.augment(r, {
        isStore: !0, _init: function () {
            var e = this;
            e.beforeInit(), e._initParams(), e._initProxy(), e._initData()
        }, beforeInit: function () {
        }, _initData: function () {
            var e = this, t = e.get("autoLoad");
            t && e.load()
        }, _initParams: function () {
            var e = this, n = e.get("lastParams"), r = e.get("params");
            t.mix(n, r)
        }, _initProxy: function () {
            var e = this, t = e.get("url"), r = e.get("proxy");
            r instanceof n || (t && (r.url = t), r.type === "ajax" || r.url ? r = new n.Ajax(r) : r = new n.Memery(r), e.set("proxy", r))
        }, load: function (e, n) {
            var r = this, i = r.get("proxy"), s = r.get("lastParams");
            t.mix(s, r.getAppendParams(), e), r.fire("beforeload", {params: s}), e = t.cloneObject(s), i.read(s, function (t) {
                r.onLoad(t, e), n && n(t, e)
            }, r)
        }, onFiltered: function (e, t) {
            var n = this;
            n.fire("filtered", {data: e, filter: t})
        }, onLoad: function (e, t) {
            var n = this, r = n.processLoad(e, t);
            r && n.afterProcessLoad(e, t)
        }, getResult: function () {
        }, filter: function (e) {
            var t = this, n = t.get("remoteFilter"), r;
            e = e || t.get("filter"), n ? t.load({filter: e}) : e && (t.set("filter", e), t.getResult().length > 0 && (r = t._filterLocal(e), t.onFiltered(r, e)))
        }, _filterLocal: function (e) {
        }, getFilterResult: function () {
            var e = this.get("filter");
            return e ? this._filterLocal(e) : this.getResult()
        }, _clearLocalFilter: function () {
            this.set("filter", null)
        }, clearFilter: function () {
            var e = this, t = e.get("remoteFilter"), n;
            t ? e.load({filter: ""}) : (e._clearLocalFilter(), n = e.getFilterResult(), e.onFiltered(n, null))
        }, processLoad: function (e, t) {
            var n = this, r = n.get("hasErrorProperty");
            return n.fire("beforeprocessload", {data: e}), n.fire("beforeProcessLoad", e), e[r] || e.exception ? (n.onException(e), !1) : !0
        }, afterProcessLoad: function (e, t) {
        }, onException: function (e) {
            var t = this, n = t.get("errorProperty"), r = {};
            e.exception ? (r.type = "exception", r[n] = e.exception) : (r.type = "error", r[n] = e[n]), t.fire("exception", r)
        }, hasData: function () {
        }, getAppendParams: function () {
            return {}
        }
    }), r
}), define("bui/data/node", ["bui/common"], function (e) {
    function n(e, n) {
        var r = {};
        return n ? (t.each(e, function (e, t) {
            var i = n[t] || t;
            r[i] = e
        }), r.record = e) : r = e, r
    }

    function r(e, r) {
        var i = this;
        e = n(e, r), t.mix(this, e)
    }

    var t = e("bui/common");
    return t.augment(r, {
        root: !1,
        leaf: null,
        text: "",
        id: null,
        loaded: !1,
        path: null,
        parent: null,
        level: 0,
        record: null,
        children: null,
        isNode: !0
    }), r
}), define("bui/data/treestore", ["bui/common", "bui/data/node", "bui/data/abstractstore", "bui/data/proxy"], function (e) {
    function s(e) {
        s.superclass.constructor.call(this, e)
    }

    var t = e("bui/common"), n = e("bui/data/node"), r = e("bui/data/proxy"), i = e("bui/data/abstractstore");
    return s.ATTRS = {
        root: {},
        map: {},
        pidField: {},
        dataProperty: {value: "nodes"},
        events: {value: ["add", "update", "remove", "load"]}
    }, t.extend(s, i), t.augment(s, {
        beforeInit: function () {
            this.initRoot()
        }, _initData: function () {
            var e = this, t = e.get("autoLoad"), n = e.get("pidField"), r = e.get("proxy"), i = e.get("root");
            !r.get("url") && n && r.get("matchFields").push(n), t && !i.children && e.loadNode(i)
        }, initRoot: function () {
            var e = this, t = e.get("map"), r = e.get("root");
            r || (r = {}), r.isNode || (r = new n(r, t)), r.path = [r.id], r.level = 0, r.children && e.setChildren(r, r.children), e.set("root", r)
        }, add: function (e, t, n) {
            var r = this;
            return e = r._add(e, t, n), r.fire("add", {node: e, record: e, index: n}), e
        }, _add: function (e, r, i) {
            r = r || this.get("root");
            var s = this, o = s.get("map"), u = r.children, a;
            return e.isNode || (e = new n(e, o)), a = e.children || [], a.length == 0 && e.leaf == null && (e.leaf = !0), r && (r.leaf = !1), e.parent = r, e.level = r.level + 1, e.path = r.path.concat(e.id), i = i == null ? r.children.length : i, t.Array.addAt(u, e, i), s.setChildren(e, a), e
        }, remove: function (e) {
            var n = e.parent || _self.get("root"), r = t.Array.indexOf(e, n.children);
            return t.Array.remove(n.children, e), n.children.length === 0 && (n.leaf = !0), this.fire("remove", {
                node: e,
                record: e,
                index: r
            }), e.parent = null, e
        }, setValue: function (e, t, n) {
            var r = this;
            e[t] = n, r.fire("update", {node: e, record: e, field: t, value: n})
        }, update: function (e) {
            this.fire("update", {node: e, record: e})
        }, getResult: function () {
            return this.get("root").children
        }, setResult: function (e) {
            var t = this, n = t.get("proxy"), i = t.get("root");
            n instanceof r.Memery ? (t.set("data", e), t.load({id: i.id})) : t.setChildren(i, e)
        }, setChildren: function (e, n) {
            var r = this;
            e.children = [];
            if (!n.length) return;
            t.each(n, function (t) {
                r._add(t, e)
            })
        }, findNode: function (e, t, n) {
            return this.findNodeBy(function (t) {
                return t.id === e
            }, t, n)
        }, findNodeBy: function (e, n, r) {
            var i = this;
            r = r == null ? !0 : r;
            if (!n) {
                var s = i.get("root");
                return e(s) ? s : i.findNodeBy(e, s)
            }
            var o = n.children, u = null;
            return t.each(o, function (t) {
                e(t) ? u = t : r && (u = i.findNodeBy(e, t));
                if (u) return !1
            }), u
        }, findNodesBy: function (e, n) {
            var r = this, i, s = [];
            return n || (n = r.get("root")), t.each(n.children, function (t) {
                e(t) && s.push(t), s = s.concat(r.findNodesBy(e, t))
            }), s
        }, findNodeByPath: function (e) {
            if (!e) return null;
            var t = this, n = t.get("root"), r = e.split(","), i, s, o = r[0];
            if (!o) return null;
            n.id == o ? i = n : i = t.findNode(o, n, !1);
            if (!i) return;
            for (s = 1; s < r.length; s += 1) {
                var o = r[s];
                i = t.findNode(o, i, !1);
                if (!i) break
            }
            return i
        }, contains: function (e, t) {
            var n = this, r = n.findNode(e.id, t);
            return !!r
        }, afterProcessLoad: function (e, n) {
            var r = this, i = r.get("pidField"), s = n.id || n[i], o = r.get("dataProperty"),
                u = r.findNode(s) || r.get("root");
            t.isArray(e) ? r.setChildren(u, e) : r.setChildren(u, e[o]), u.loaded = !0, r.fire("load", {
                node: u,
                params: n
            })
        }, hasData: function () {
            return this.get("root").children && this.get("root").children.length !== 0
        }, isLoaded: function (e) {
            var t = this.get("root");
            return e == t && !t.children ? !1 : !this.get("url") && !this.get("pidField") ? !0 : e.loaded || e.leaf || !!e.children && !!e.children.length
        }, loadNode: function (e, t) {
            var n = this, r = n.get("pidField"), i;
            if (!t && n.isLoaded(e)) return;
            i = {id: e.id}, r && (i[r] = e.id), n.load(i)
        }, reloadNode: function (e) {
            var t = this;
            e = e || t.get("root"), e.loaded = !1, t.loadNode(e, !0)
        }, loadPath: function (e) {
            var t = this, n = e.split(","), r = n[0];
            if (t.findNodeByPath(e)) return;
            t.load({id: r, path: e})
        }
    }), s
}), define("bui/data/store", ["bui/data/proxy", "bui/data/abstractstore", "bui/data/sortable"], function (e) {
    function i(e, t) {
        if (e < 0) return;
        var n = t, r = n[e];
        return n.splice(e, 1), r
    }

    function s(e, t) {
        var n = BUI.Array.indexOf(e, t);
        n >= 0 && i(n, t)
    }

    function o(e, t) {
        return BUI.Array.indexOf(e, t) !== -1
    }

    var t = e("bui/data/proxy"), n = e("bui/data/abstractstore"), r = e("bui/data/sortable"), u = function (e) {
        u.superclass.constructor.call(this, e)
    };
    return u.ATTRS = {
        autoSync: {value: !1},
        currentPage: {value: 0},
        deletedRecords: {shared: !1, value: []},
        errorProperty: {value: "error"},
        hasErrorProperty: {value: "hasError"},
        matchFunction: {
            value: function (e, t) {
                return e == t
            }
        },
        modifiedRecords: {shared: !1, value: []},
        newRecords: {shared: !1, value: []},
        remoteSort: {value: !1},
        resultMap: {shared: !1, value: {}},
        root: {value: "rows"},
        rowCount: {value: 0},
        totalProperty: {value: "results"},
        start: {value: 0},
        pageSize: {}
    }, BUI.extend(u, n), BUI.mixin(u, [r]), BUI.augment(u, {
        add: function (e, t, n) {
            var r = this, i = r.getCount();
            r.addAt(e, i, t, n)
        }, addAt: function (e, t, n, r) {
            var i = this;
            r = r || i._getDefaultMatch(), BUI.isArray(e) || (e = [e]), $.each(e, function (e, o) {
                if (!n || !i.contains(o, r)) i._addRecord(o, e + t), i.get("newRecords").push(o), s(o, i.get("deletedRecords")), s(o, i.get("modifiedRecords"))
            })
        }, contains: function (e, t) {
            return this.findIndexBy(e, t) !== -1
        }, find: function (e, t) {
            var n = this, r = null, i = n.getResult();
            return $.each(i, function (n, i) {
                if (i[e] === t) return r = i, !1
            }), r
        }, findAll: function (e, t) {
            var n = this, r = [], i = n.getResult();
            return $.each(i, function (n, i) {
                i[e] === t && r.push(i)
            }), r
        }, findByIndex: function (e) {
            return this.getResult()[e]
        }, findIndexBy: function (e, t) {
            var n = this, r = -1, i = n.getResult();
            return t = t || n._getDefaultMatch(), e === null || e === undefined ? -1 : ($.each(i, function (n, i) {
                if (t(e, i)) return r = n, !1
            }), r)
        }, findNextRecord: function (e) {
            var t = this, n = t.findIndexBy(e);
            if (n >= 0) return t.findByIndex(n + 1);
            return
        }, getCount: function () {
            return this.getResult().length
        }, getTotalCount: function () {
            var e = this, t = e.get("resultMap"), n = e.get("totalProperty");
            return parseInt(t[n], 10) || 0
        }, getResult: function () {
            var e = this, t = e.get("resultMap"), n = e.get("root");
            return t[n]
        }, hasData: function () {
            return this.getCount() !== 0
        }, setResult: function (e) {
            var n = this, r = n.get("proxy");
            r instanceof t.Memery ? (n.set("data", e), n.load({start: 0})) : (n._setResult(e), n.get("filter") && n.filter())
        }, remove: function (e, t) {
            var n = this, r = [];
            t = t || n._getDefaultMatch(), BUI.isArray(e) || (e = [e]), $.each(e, function (e, r) {
                var e = n.findIndexBy(r, t), u = i(e, n.getResult());
                !o(u, n.get("newRecords")) && !o(u, n.get("deletedRecords")) && n.get("deletedRecords").push(u), s(u, n.get("newRecords")), s(u, n.get("modifiedRecords")), n.fire("remove", {record: u})
            })
        }, save: function (e, t, n) {
            var r = this, i = r.get("proxy");
            BUI.isFunction(e) && (n = e, e = undefined), BUI.isObject(e) && (n = t, t = e, e = undefined), e || (e = r._getSaveType(t)), e == "all" && !t && (t = r._getDirtyData()), r.fire("beforesave", {
                type: e,
                saveData: t
            }), i.save(e, t, function (i) {
                r.onSave(e, t, i), n && n(i, t)
            }, r)
        }, _getSaveType: function (e) {
            var t = this;
            return e ? BUI.Array.contains(e, t.get("newRecords")) ? "add" : BUI.Array.contains(e, t.get("modifiedRecords")) ? "update" : BUI.Array.contains(e, t.get("deletedRecords")) ? "remove" : "custom" : "all"
        }, _getDirtyData: function () {
            var e = this, t = e.get("proxy");
            return t.get("url") ? {
                add: BUI.JSON.stringify(e.get("newRecords")),
                update: BUI.JSON.stringify(e.get("modifiedRecords")),
                remove: BUI.JSON.stringify(e.get("deletedRecords"))
            } : {add: e.get("newRecords"), update: e.get("modifiedRecords"), remove: e.get("deletedRecords")}
        }, onSave: function (e, t, n) {
            var r = this, i = r.get("hasErrorProperty");
            if (n[i] || n.exception) {
                r.onException(n);
                return
            }
            r._clearDirty(e, t), r.fire("saved", {type: e, saveData: t, data: n}), r.get("autoSync") && r.load()
        }, _clearDirty: function (e, t) {
            function r(e, t) {
                BUI.Array.remove(n.get(t), e)
            }

            var n = this;
            switch (e) {
                case"all":
                    n._clearChanges();
                    break;
                case"add":
                    r(t, "newRecords");
                    break;
                case"update":
                    r(t, "modifiedRecords");
                    break;
                case"remove":
                    r(t, "deletedRecords");
                    break;
                default:
            }
        }, sort: function (e, t) {
            var n = this, r = n.get("remoteSort");
            r ? (n.set("sortField", e), n.set("sortDirection", t), n.load(n.get("sortInfo"))) : n._localSort(e, t)
        }, sum: function (e, t) {
            var n = this, r = t || n.getResult(), i = 0;
            return BUI.each(r, function (t) {
                var n = t[e];
                isNaN(n) || (i += parseFloat(n))
            }), i
        }, setValue: function (e, t, n) {
            var r = e, i = this;
            r[t] = n, !o(r, i.get("newRecords")) && !o(r, i.get("modifiedRecords")) && i.get("modifiedRecords").push(r), i.fire("update", {
                record: r,
                field: t,
                value: n
            })
        }, update: function (e, t, n) {
            var r = e, i = this, n = null, s = null;
            t && (n = n || i._getDefaultMatch(), s = i.findIndexBy(e, n), s >= 0 && (r = i.getResult()[s])), r = BUI.mix(r, e), !o(r, i.get("newRecords")) && !o(r, i.get("modifiedRecords")) && i.get("modifiedRecords").push(r), i.fire("update", {record: r})
        }, _addRecord: function (e, t) {
            var n = this.getResult();
            t == undefined && (t = n.length), n.splice(t, 0, e), this.fire("add", {record: e, index: t})
        }, _clearChanges: function () {
            var e = this;
            BUI.Array.empty(e.get("newRecords")), BUI.Array.empty(e.get("modifiedRecords")), BUI.Array.empty(e.get("deletedRecords"))
        }, _filterLocal: function (e, t) {
            var n = this, r = [];
            return t = t || n.getResult(), e ? (BUI.each(t, function (t) {
                e(t) && r.push(t)
            }), r) : t
        }, _getDefaultMatch: function () {
            return this.get("matchFunction")
        }, _getPageParams: function () {
            var e = this, t = e.get("sortInfo"), n = e.get("start"), r = e.get("pageSize"),
                i = e.get("pageIndex") || (r ? n / r : 0);
            return params = {start: n, limit: r, pageIndex: i}, e.get("remoteSort") && BUI.mix(params, t), params
        }, getAppendParams: function () {
            return this._getPageParams()
        }, beforeInit: function () {
            this._setResult([])
        }, _localSort: function (e, t) {
            var n = this;
            n._sortData(e, t), n.fire("localsort", {field: e, direction: t})
        }, _sortData: function (e, t, n) {
            var r = this;
            n = n || r.getResult(), r.sortData(e, t, n)
        }, afterProcessLoad: function (e, t) {
            var n = this, r = n.get("root"), i = t.start, s = t.limit, o = n.get("totalProperty");
            BUI.isArray(e) ? n._setResult(e) : n._setResult(e[r], e[o]), n.set("start", i), s && n.set("pageIndex", i / s), n.get("remoteSort") || n._sortData(), n.fire("load", {params: t}), !n.get("remoteFilter") && n.get("filter") && n.filter(n.get("filter"))
        }, _setResult: function (e, t) {
            var n = this, r = n.get("resultMap");
            t = t || e.length, r[n.get("root")] = e, r[n.get("totalProperty")] = t, n._clearChanges()
        }
    }), u
}), define("bui/overlay", ["bui/common", "bui/overlay/overlay", "bui/overlay/dialog", "bui/overlay/message"], function (e) {
    var t = e("bui/common"), n = t.namespace("Overlay");
    return t.mix(n, {
        Overlay: e("bui/overlay/overlay"),
        Dialog: e("bui/overlay/dialog"),
        Message: e("bui/overlay/message")
    }), t.mix(n, {OverlayView: n.Overlay.View, DialogView: n.Dialog.View}), t.Message = t.Overlay.Message, n
}), define("bui/overlay/overlay", ["bui/common"], function (e) {
    var t = e("bui/common"), n = t.Component, r = "x-align-arrow", i = n.UIBase,
        s = n.View.extend([i.PositionView, i.CloseView]),
        o = n.Controller.extend([i.Position, i.Align, i.Close, i.AutoShow, i.AutoHide], {
            renderUI: function () {
                var e = this, t = e.get("el"), n = e.get("arrowContainer"), r = n ? t.one(n) : t;
                e.get("showArrow") && $(e.get("arrowTpl")).appendTo(r)
            }, show: function () {
                function o() {
                    r === "visibility" ? n.css({display: "block"}) : e.set("visible", !0), t.callback && t.callback.call(e);
                    var i = e.get("autoHideDelay"), s = e.get("delayHandler");
                    i && (s && clearTimeout(s), s = setTimeout(function () {
                        e.hide(), e.set("delayHandler", null)
                    }, i), e.set("delayHandler", s))
                }

                var e = this, t = e.get("effect"), n = e.get("el"), r = e.get("visibleMode"), i = t.effect,
                    s = t.duration;
                e.get("rendered") || (e.set("visible", !0), e.render(), e.set("visible", !1), n = e.get("el")), r === "visibility" && (e.set("visible", !0), n.css({display: "none"}));
                switch (i) {
                    case"linear":
                        n.show(s, o);
                        break;
                    case"fade":
                        n.fadeIn(s, o);
                        break;
                    case"slide":
                        n.slideDown(s, o);
                        break;
                    default:
                        o()
                }
            }, hide: function () {
                function s() {
                    e.get("visibleMode") === "visibility" && n.css({display: "block"}), e.set("visible", !1), t.callback && t.callback.call(e)
                }

                var e = this, t = e.get("effect"), n = e.get("el"), r = t.effect, i = t.duration;
                switch (r) {
                    case"linear":
                        n.hide(i, s);
                        break;
                    case"fade":
                        n.fadeOut(i, s);
                        break;
                    case"slide":
                        n.slideUp(i, s);
                        break;
                    default:
                        s()
                }
            }
        }, {
            ATTRS: {
                effect: {value: {effect: "none", duration: 0, callback: null}},
                autoHideDelay: {},
                closeable: {value: !1},
                showArrow: {value: !1},
                arrowContainer: {view: !0},
                arrowTpl: {value: '<s class="' + r + '"><s class="' + r + '-inner"></s></s>'},
                visibleMode: {value: "visibility"},
                visible: {value: !1},
                xview: {value: s}
            }
        }, {xclass: "overlay"});
    return o.View = s, o
}), define("bui/overlay/dialog", ["bui/overlay/overlay"], function (e) {
    var t = e("bui/overlay/overlay"), n = BUI.Component.UIBase, r = "header-title", i = BUI.prefix, s = 20,
        o = t.View.extend([n.StdModView, n.MaskView], {
            getContentElement: function () {
                return this.get("body")
            }, _uiSetTitle: function (e) {
                var t = this, n = t.get("el");
                n.find("." + r).html(e)
            }, _uiSetContentId: function (e) {
                var t = this, n = t.get("body"), r = $("#" + e).children();
                r.appendTo(n)
            }, _uiSetHeight: function (e) {
                var t = this, n = e, r = t.get("header"), i = t.get("body"), o = t.get("footer");
                n -= r.outerHeight() + o.outerHeight(), n -= s * 2, i.height(n)
            }, _removeContent: function () {
                var e = this, t = e.get("body"), n = e.get("contentId");
                n ? t.children().appendTo($("#" + n)) : t.children().remove()
            }
        }, {xclass: "dialog-view"}), u = t.extend([n.StdMod, n.Mask, n.Drag], {
            show: function () {
                var e = this;
                u.superclass.show.call(this), e.center()
            }, bindUI: function () {
                var e = this;
                e.on("closeclick", function () {
                    return e.onCancel()
                })
            }, onCancel: function () {
                var e = this, t = e.get("cancel");
                return t.call(this)
            }, _uiSetButtons: function (e) {
                var t = this, n = t.get("footer");
                n.children().remove(), BUI.each(e, function (e) {
                    t._createButton(e, n)
                })
            }, _createButton: function (e, t) {
                var n = this, r = '<button class="' + e.elCls + '">' + e.text + "</button>", i = $(r).appendTo(t);
                i.on("click", function () {
                    e.handler.call(n, n, this)
                })
            }, destructor: function () {
                var e = this, t = e.get("contentId"), n = e.get("body"), r = e.get("closeAction");
                r == "destroy" && (e.hide(), t && n.children().appendTo("#" + t))
            }
        }, {
            ATTRS: {
                closeTpl: {
                    view: !0,
                    value: '<a tabindex="0" href=javascript:void("\u5173\u95ed") role="button" class="' + i + 'ext-close" style=""><span class="' + i + 'ext-close-x x-icon x-icon-normal">\u00d7</span></a>'
                },
                buttons: {
                    value: [{
                        text: "\u786e\u5b9a", elCls: "button button-primary", handler: function () {
                            var e = this, t = e.get("success");
                            t && t.call(e)
                        }
                    }, {
                        text: "\u53d6\u6d88", elCls: "button button-primary", handler: function (e, t) {
                            this.onCancel() !== !1 && this.close()
                        }
                    }]
                },
                contentId: {view: !0},
                success: {
                    value: function () {
                        this.close()
                    }
                },
                cancel: {
                    value: function () {
                    }
                },
                dragNode: {
                    valueFn: function () {
                        return this.get("header")
                    }
                },
                defaultLoaderCfg: {
                    valueFn: function () {
                        var e = this;
                        return {
                            property: "bodyContent",
                            autoLoad: !1,
                            lazyLoad: {event: "show"},
                            loadMask: {el: e.get("body")}
                        }
                    }
                },
                title: {view: !0, value: ""},
                mask: {value: !0},
                maskShared: {value: !1},
                headerContent: {value: '<div class="' + r + '">\u6807\u9898</div>'},
                footerContent: {},
                closeable: {value: !0},
                xview: {value: o}
            }
        }, {xclass: "dialog"});
    return u.View = o, u
}), define("bui/overlay/message", ["bui/overlay/dialog"], function (e) {
    function o(e, t) {
        return function (n, r, i) {
            BUI.isString(r) && (i = r, r = null), i = i || t, r = r || f, u({buttons: e, icon: i, msg: n, success: r})
        }
    }

    function u(e) {
        s || (s = new i({icon: "info", title: ""})), s.set(e), s.show()
    }

    function a() {
        var e = this, t = e.get("success");
        t && (t.call(e), e.hide())
    }

    function f() {
        this.hide()
    }

    var t = e("bui/overlay/dialog"), n = BUI.prefix,
        r = {info: "i", error: "\u00d7", success: '<i class="icon-ok icon-white"></i>', question: "?", warning: "!"},
        i = t.extend({
            renderUI: function () {
                this._setContent()
            }, bindUI: function () {
                var e = this, t = e.get("body");
                e.on("afterVisibleChange", function (n) {
                    if (n.newVal && BUI.UA.ie < 8) {
                        var r = t.outerWidth();
                        BUI.UA.ie == 6 && (r = r > 350 ? 350 : r), e.get("header").width(r - 20), e.get("footer").width(r)
                    }
                })
            }, _setContent: function () {
                var e = this, t = e.get("body"),
                    n = BUI.substitute(e.get("contentTpl"), {msg: e.get("msg"), iconTpl: e.get("iconTpl")});
                t.empty(), $(n).appendTo(t)
            }, _uiSetIcon: function (e) {
                if (!this.get("rendered")) return;
                this._setContent()
            }, _uiSetMsg: function (e) {
                if (!this.get("rendered")) return;
                this._setContent()
            }
        }, {
            ATTRS: {
                icon: {}, msg: {}, iconTpl: {
                    getter: function () {
                        var e = this, t = e.get("icon");
                        return '<div class="x-icon x-icon-' + t + '">' + r[t] + "</div>"
                    }
                }, contentTpl: {value: '{iconTpl}<div class="' + n + 'message-content">{msg}</div>'}
            }
        }, {xclass: "message", priority: 0}), s,
        l = o([{text: "\u786e\u5b9a", elCls: "button button-primary", handler: a}], "info"),
        c = o([{text: "\u786e\u5b9a", elCls: "button button-primary", handler: a}, {
            text: "\u53d6\u6d88",
            elCls: "button button-primary",
            handler: f
        }], "question");
    return i.Alert = l, i.Confirm = c, i.Show = u, i
}), function () {
    var e = "bui/list/";
    define("bui/list", ["bui/common", e + "list", e + "listitem", e + "simplelist", e + "listbox"], function (t) {
        var n = t("bui/common"), r = n.namespace("List");
        return n.mix(r, {
            List: t(e + "list"),
            ListItem: t(e + "listitem"),
            SimpleList: t(e + "simplelist"),
            Listbox: t(e + "listbox")
        }), n.mix(r, {ListItemView: r.ListItem.View, SimpleListView: r.SimpleList.View}), r
    })
}(), define("bui/list/domlist", ["bui/common"], function (e) {
    "use strict";

    function s(e, t) {
        var n = t, r = n.get("itemCls"), i = n.get("itemStatusCls");
        return i && i[e] ? i[e] : r + "-" + e
    }

    function u(e, n) {
        var i = e.attributes, o = n.get("itemStatusFields"), u = {};
        return t.each(i, function (e) {
            var t = e.nodeName;
            t.indexOf(r) !== -1 && (t = t.replace(r, ""), u[t] = e.nodeValue)
        }), u.text = $(e).text(), t.each(o, function (t, r) {
            var i = s(r, n);
            $(e).hasClass(i) && (u[t] = !0)
        }), u
    }

    var t = e("bui/common"), n = t.Component.UIBase.Selection, r = "data-", i = t.Component.UIBase.List,
        o = function () {
        };
    o.ATTRS = {items: {}}, o.prototype = {
        clearControl: function () {
            var e = this, t = e.getItemContainer(), n = e.get("itemCls");
            t.find("." + n).remove()
        }, addItem: function (e, t) {
            return this._createItem(e, t)
        }, getItems: function () {
            var e = this, n = e.getAllElements(), r = [];
            return t.each(n, function (t) {
                r.push(e.getItemByElement(t))
            }), r
        }, updateItem: function (e) {
            var n = this, r = n.getItems(), i = t.Array.indexOf(e, r), s = null, o;
            return i >= 0 && (s = n.findElement(e), o = n.getItemTpl(e, i), s && $(s).html($(o).html())), s
        }, removeItem: function (e, t) {
            t = t || this.findElement(e), $(t).remove()
        }, getItemContainer: function () {
            var e = this.get("itemContainer");
            return e.length ? e : this.get("el")
        }, getItemTpl: function (e, n) {
            var r = this, i = r.get("itemTplRender"), s = r.get("itemTpl");
            return i ? i(e, n) : t.substitute(s, e)
        }, _createItem: function (e, t) {
            var n = this, r = n.getItemContainer(), i = n.get("itemCls"), s = n.get("dataField"),
                o = n.getItemTpl(e, t), u = $(o);
            if (t !== undefined) {
                var a = r.find("." + i)[t];
                a ? u.insertBefore(a) : u.appendTo(r)
            } else u.appendTo(r);
            return u.addClass(i), u.data(s, e), u
        }, getItemStatusCls: function (e) {
            return s(e, this)
        }, setItemStatusCls: function (e, t, n) {
            var r = this, i = r.getItemStatusCls(e), s = n ? "addClass" : "removeClass";
            t && $(t)[s](i)
        }, hasStatus: function (e, t) {
            var n = this, r = n.getItemStatusCls(e);
            return $(t).hasClass(r)
        }, setItemSelected: function (e, t, n) {
            var r = this;
            n = n || r.findElement(e), r.setItemStatusCls("selected", n, t)
        }, getAllElements: function () {
            var e = this, t = e.get("itemCls"), n = e.get("el");
            return n.find("." + t)
        }, getItemByElement: function (e) {
            var t = this, n = t.get("dataField");
            return $(e).data(n)
        }, getFirstElementByStatus: function (e) {
            var t = this, n = t.getItemStatusCls(e), r = t.get("el");
            return r.find("." + n)[0]
        }, getElementsByStatus: function (e) {
            var t = this, n = t.getItemStatusCls(e), r = t.get("el");
            return r.find("." + n)
        }, getSelectedElements: function () {
            var e = this, t = e.getItemStatusCls("selected"), n = e.get("el");
            return n.find("." + t)
        }, findElement: function (e) {
            var n = this, r = n.getAllElements(), i = null;
            return t.each(r, function (t) {
                if (n.getItemByElement(t) == e) return i = t, !1
            }), i
        }, isElementSelected: function (e) {
            var t = this, n = t.getItemStatusCls("selected");
            return e && $(e).hasClass(n)
        }
    };
    var a = function () {
    };
    return a.ATTRS = t.merge(!0, i.ATTRS, n.ATTRS, {
        dataField: {view: !0, value: "data-item"},
        itemContainer: {view: !0},
        itemStatusFields: {value: {}},
        itemCls: {view: !0},
        cancelSelected: {value: !1},
        textGetter: {},
        defaultLoaderCfg: {value: {property: "items", dataType: "json"}},
        events: {
            value: {
                itemrendered: !0,
                itemremoved: !0,
                itemupdated: !0,
                itemsshow: !1,
                beforeitemsshow: !1,
                itemsclear: !1,
                itemdblclick: !1,
                beforeitemsclear: !1
            }
        }
    }), a.PARSER = {
        items: function (e) {
            var n = this, r = [], i = n.get("itemCls"), s = n.get("dataField"), o = e.find("." + i);
            return o.length || (o = e.children(), o.addClass(i)), t.each(o, function (e) {
                var t = u(e, n);
                r.push(t), $(e).data(s, t)
            }), r
        }
    }, t.augment(a, i, n, {
        _uiSetItems: function (e) {
            var t = this;
            if (t.get("srcNode") && !t.get("rendered")) return;
            this.setItems(e)
        }, __bindUI: function () {
            function i(t, n) {
                var r = e.get("multipleSelect"), i;
                i = e.isItemSelected(t, n), i ? r ? e.setItemSelected(t, !1, n) : e.get("cancelSelected") && e.setSelected(null) : (r || e.clearSelected(), e.setItemSelected(t, !0, n))
            }

            var e = this, t = e.get("selectedEvent"), n = e.get("itemCls"), r = e.get("view").getItemContainer();
            r.delegate("." + n, "click", function (n) {
                if (e.get("disabled")) return;
                var r = $(n.currentTarget), s = e.getItemByElement(r);
                if (e.isItemDisabled(s, r)) return;
                var o = e.fire("itemclick", {item: s, element: r[0], domTarget: n.target, domEvent: n});
                o !== !1 && t == "click" && e.isItemSelectable(s) && i(s, r)
            }), t !== "click" && r.delegate("." + n, t, function (t) {
                if (e.get("disabled")) return;
                var n = $(t.currentTarget), r = e.getItemByElement(n);
                if (e.isItemDisabled(r, n)) return;
                e.isItemSelectable(r) && i(r, n)
            }), r.delegate("." + n, "dblclick", function (t) {
                if (e.get("disabled")) return;
                var n = $(t.currentTarget), r = e.getItemByElement(n);
                if (e.isItemDisabled(r, n)) return;
                e.fire("itemdblclick", {item: r, element: n[0], domTarget: t.target})
            }), e.on("itemrendered itemupdated", function (t) {
                var n = t.item, r = t.element;
                e._syncItemStatus(n, r)
            })
        }, getValueByField: function (e, t) {
            return e && e[t]
        }, _syncItemStatus: function (e, n) {
            var r = this, i = r.get("itemStatusFields");
            t.each(i, function (t, i) {
                e[t] != null && r.get("view").setItemStatusCls(i, n, e[t])
            })
        }, getStatusValue: function (e, t) {
            var n = this, r = n.get("itemStatusFields"), i = r[t];
            return e[i]
        }, getCount: function () {
            var e = this.getItems();
            return e ? e.length : 0
        }, getStatusField: function (e) {
            var t = this, n = t.get("itemStatusFields");
            return n[e]
        }, setStatusValue: function (e, t, n) {
            var r = this, i = r.get("itemStatusFields"), s = i[t];
            s && (e[s] = n)
        }, getItemText: function (e) {
            var t = this, n = t.get("textGetter");
            return e ? n ? n(e) : $(t.findElement(e)).text() : ""
        }, removeItem: function (e) {
            var n = this, r = n.get("items"), i = n.findElement(e), s;
            s = t.Array.indexOf(e, r), s !== -1 && r.splice(s, 1), n.get("view").removeItem(e, i), n.fire("itemremoved", {
                item: e,
                domTarget: $(i)[0],
                element: i
            })
        }, addItemAt: function (e, t) {
            var n = this, r = n.get("items");
            return t === undefined && (t = r.length), r.splice(t, 0, e), n.addItemToView(e, t), e
        }, addItemToView: function (e, t) {
            var n = this, r = n.get("view").addItem(e, t);
            return n.fire("itemrendered", {item: e, domTarget: $(r)[0], element: r}), r
        }, updateItem: function (e) {
            var t = this, n = t.get("view").updateItem(e);
            t.fire("itemupdated", {item: e, domTarget: $(n)[0], element: n})
        }, setItems: function (e) {
            var n = this;
            e != n.getItems() && n.setInternal("items", e), n.clearControl(), n.fire("beforeitemsshow"), t.each(e, function (e, t) {
                n.addItemToView(e, t)
            }), n.fire("itemsshow")
        }, getItems: function () {
            return this.get("items")
        }, getItemByElement: function (e) {
            return this.get("view").getItemByElement(e)
        }, getSelected: function () {
            var e = this, t = e.get("view").getFirstElementByStatus("selected");
            return e.getItemByElement(t) || null
        }, getItemsByStatus: function (e) {
            var n = this, r = n.get("view").getElementsByStatus(e), i = [];
            return t.each(r, function (e) {
                i.push(n.getItemByElement(e))
            }), i
        }, findElement: function (e) {
            var n = this;
            return t.isString(e) && (e = n.getItem(e)), this.get("view").findElement(e)
        }, findItemByField: function (e, n) {
            var r = this, i = r.get("items"), s = null;
            return t.each(i, function (t) {
                if (t[e] != null && t[e] == n) return s = t, !1
            }), s
        }, setItemSelectedStatus: function (e, t, n) {
            var r = this;
            n = n || r.findElement(e), r.setItemStatus(e, "selected", t, n)
        }, setAllSelection: function () {
            var e = this, t = e.getItems();
            e.setSelection(t)
        }, isItemSelected: function (e, t) {
            var n = this;
            return t = t || n.findElement(e), n.get("view").isElementSelected(t)
        }, isItemDisabled: function (e, t) {
            return this.hasStatus(e, "disabled", t)
        }, setItemDisabled: function (e, t) {
            var n = this;
            n.setItemStatus(e, "disabled", t)
        }, getSelection: function () {
            var e = this, n = e.get("view").getSelectedElements(), r = [];
            return t.each(n, function (t) {
                r.push(e.getItemByElement(t))
            }), r
        }, clearControl: function () {
            this.fire("beforeitemsclear"), this.get("view").clearControl(), this.fire("itemsclear")
        }, hasStatus: function (e, t, n) {
            if (!e) return !1;
            var r = this, i = r.getStatusField(t);
            return n = n || r.findElement(e), r.get("view").hasStatus(t, n)
        }, setItemStatus: function (e, t, n, r) {
            var i = this;
            e && (r = r || i.findElement(e));
            if (!i.isItemDisabled(e, r) || t === "disabled") e && (t === "disabled" && n && i.clearItemStatus(e), i.setStatusValue(e, t, n), i.get("view").setItemStatusCls(t, r, n), i.fire("itemstatuschange", {
                item: e,
                status: t,
                value: n,
                element: r
            })), t === "selected" && i.afterSelected(e, n, r)
        }, clearItemStatus: function (e, n, r) {
            var i = this, s = i.get("itemStatusFields");
            r = r || i.findElement(e), n ? i.setItemStatus(e, n, !1, r) : (t.each(s, function (t, n) {
                i.setItemStatus(e, n, !1, r)
            }), s.selected || i.setItemSelected(e, !1), i.setItemStatus(e, "hover", !1))
        }
    }), a.View = o, a
}), define("bui/list/keynav", ["bui/common"], function (e) {
    "use strict";
    var t = e("bui/common"), n = function () {
    };
    return n.ATTRS = {highlightedStatus: {value: "hover"}}, t.augment(n, {
        setHighlighted: function (e, t) {
            if (this.hasStatus(e, "hover", t)) return;
            var n = this, r = n.get("highlightedStatus"), i = n._getHighLightedElement(),
                s = i ? n.getItemByElement(i) : null;
            s !== e && (s && this.setItemStatus(s, r, !1, i), this.setItemStatus(e, r, !0, t), n._scrollToItem(e, t))
        }, _getHighLightedElement: function () {
            var e = this, t = e.get("highlightedStatus"), n = e.get("view").getFirstElementByStatus(t);
            return n
        }, getHighlighted: function () {
            var e = this, t = e.get("highlightedStatus"), n = e.get("view").getFirstElementByStatus(t);
            return e.getItemByElement(n) || null
        }, getColumnCount: function () {
            var e = this, t = e.getFirstItem(), n = e.findElement(t), r = $(n);
            return n ? parseInt(r.parent().width() / r.outerWidth(), 10) : 1
        }, getRowCount: function (e) {
            var t = this;
            return e = e || t.getColumnCount(), (this.getCount() + e - 1) / e
        }, _getNextItem: function (e, t, n) {
            var r = this, i = r._getCurrentIndex(), s = r.getCount(), o = e ? 1 : -1, u;
            return i === -1 ? e ? r.getFirstItem() : r.getLastItem() : (e || (t *= o), u = (i + t + n) % n, u > s - 1 && (e ? u -= s - 1 : u += t), r.getItemAt(u))
        }, _getLeftItem: function () {
            var e = this, t = e.getCount(), n = e.getColumnCount();
            return !t || n <= 1 ? null : e._getNextItem(!1, 1, t)
        }, _getCurrentItem: function () {
            return this.getHighlighted()
        }, _getCurrentIndex: function () {
            var e = this, t = e._getCurrentItem();
            return this.indexOfItem(t)
        }, _getRightItem: function () {
            var e = this, t = e.getCount(), n = e.getColumnCount();
            return !t || n <= 1 ? null : this._getNextItem(!0, 1, t)
        }, _getDownItem: function () {
            var e = this, t = e.getColumnCount(), n = e.getRowCount(t);
            return n <= 1 ? null : this._getNextItem(!0, t, t * n)
        }, getScrollContainer: function () {
            return this.get("el")
        }, isScrollVertical: function () {
            var e = this, t = e.get("el"), n = e.get("view").getItemContainer();
            return t.height() < n.height()
        }, _scrollToItem: function (e, t) {
            var n = this;
            if (n.isScrollVertical()) {
                t = t || n.findElement(e);
                var r = n.getScrollContainer(), i = $(t).position().top, s = r.position().top, o = r.height(),
                    u = i - s, a = $(t).height(), f = r.scrollTop();
                (u < 0 || u > o - a) && r.scrollTop(f + u)
            }
        }, _getUpperItem: function () {
            var e = this, t = e.getColumnCount(), n = e.getRowCount(t);
            return n <= 1 ? null : this._getNextItem(!1, t, t * n)
        }, handleNavUp: function (e) {
            var t = this, n = t._getUpperItem();
            t.setHighlighted(n)
        }, handleNavDown: function (e) {
            this.setHighlighted(this._getDownItem())
        }, handleNavLeft: function (e) {
            this.setHighlighted(this._getLeftItem())
        }, handleNavRight: function (e) {
            this.setHighlighted(this._getRightItem())
        }, handleNavEnter: function (e) {
            var t = this, n = t._getCurrentItem(), r;
            n && (r = t.findElement(n), $(r).trigger("click"))
        }, handleNavEsc: function (e) {
            this.setHighlighted(null)
        }, handleNavTab: function (e) {
            this.setHighlighted(this._getRightItem())
        }
    }), n
}), define("bui/list/sortable", ["bui/common", "bui/data"], function (e) {
    var t = e("bui/common"), n = e("bui/data").Sortable, r = function () {
    };
    return r.ATTRS = t.merge(!0, n.ATTRS, {}), t.augment(r, n, {
        compare: function (e, t, n, r) {
            var i = this, s;
            return n = n || i.get("sortField"), r = r || i.get("sortDirection"), !n || !r ? 1 : (s = r === "ASC" ? 1 : -1, $.isPlainObject(e) || (e = i.getItemByElement(e)), $.isPlainObject(t) || (t = i.getItemByElement(t)), i.get("compareFunction")(e[n], t[n]) * s)
        }, getSortData: function () {
            return $.makeArray(this.get("view").getAllElements())
        }, sort: function (e, n) {
            var r = this, i = r.sortData(e, n), s = r.get("view").getItemContainer();
            r.get("store") || r.sortData(e, n, r.get("items")), t.each(i, function (e) {
                $(e).appendTo(s)
            })
        }
    }), r
}), define("bui/list/simplelist", ["bui/common", "bui/list/domlist", "bui/list/keynav", "bui/list/sortable"], function (e) {
    var t = e("bui/common"), n = t.Component.UIBase, r = t.UA, i = e("bui/list/domlist"), s = e("bui/list/keynav"),
        o = e("bui/list/sortable"), u = t.prefix + "list-item", a = t.Component.View.extend([i.View], {
            setElementHover: function (e, t) {
                var n = this;
                n.setItemStatusCls("hover", e, t)
            }
        }, {
            ATTRS: {
                itemContainer: {
                    valueFn: function () {
                        return this.get("el").find(this.get("listSelector"))
                    }
                }
            }
        }, {xclass: "simple-list-view"}), f = t.Component.Controller.extend([i, n.Bindable, s, o], {
            bindUI: function () {
                var e = this, t = e.get("itemCls"), n = e.get("view").getItemContainer();
                n.delegate("." + t, "mouseover", function (t) {
                    if (e.get("disabled")) return;
                    var n = t.currentTarget, i = e.getItemByElement(n);
                    if (e.isItemDisabled(t.item, t.currentTarget)) return;
                    !(r.ie && r.ie < 8) && e.get("focusable") && e.get("highlightedStatus") === "hover" ? e.setHighlighted(i, n) : e.setItemStatus(i, "hover", !0, n)
                }).delegate("." + t, "mouseout", function (t) {
                    if (e.get("disabled")) return;
                    var n = $(t.currentTarget);
                    e.get("view").setElementHover(n, !1)
                })
            }, onAdd: function (e) {
                var t = this, n = t.get("store"), r = e.record;
                t.getCount() == 0 ? t.setItems(n.getResult()) : t.addItemToView(r, e.index)
            }, onRemove: function (e) {
                var t = this, n = e.record;
                t.removeItem(n)
            }, onUpdate: function (e) {
                this.updateItem(e.record)
            }, onLocalSort: function (e) {
                this.get("frontSortable") ? this.sort(e.field, e.direction) : this.onLoad(e)
            }, onLoad: function () {
                var e = this, t = e.get("store"), n = t.getResult();
                e.set("items", n)
            }, onFiltered: function (e) {
                var t = this, n = e.data;
                t.set("items", n)
            }
        }, {
            ATTRS: {
                frontSortable: {value: !1},
                focusable: {value: !1},
                items: {view: !0, value: []},
                itemCls: {view: !0, value: u},
                idField: {value: "value"},
                listSelector: {view: !0, value: "ul"},
                itemTpl: {view: !0, value: '<li role="option" class="' + u + '">{text}</li>'},
                tpl: {value: "<ul></ul>"},
                xview: {value: a}
            }
        }, {xclass: "simple-list", prority: 0});
    return f.View = a, f
}), define("bui/list/listbox", ["bui/list/simplelist"], function (e) {
    var t = e("bui/list/simplelist"), n = t.extend({
        bindUI: function () {
            var e = this;
            e.on("selectedchange", function (e) {
                var t = e.item, n = $(e.domTarget), r = n.find("input");
                t && r.attr("checked", e.selected)
            })
        }
    }, {
        ATTRS: {
            itemTpl: {value: '<li><span class="x-checkbox"></span>{text}</li>'},
            multipleSelect: {value: !0}
        }
    }, {xclass: "listbox"});
    return n
}), define("bui/list/listitem", ["bui/common"], function (e) {
    var t = e("bui/common"), n = t.Component, r = n.UIBase, i = n.View.extend([r.ListItemView], {}),
        s = n.Controller.extend([r.ListItem], {}, {
            ATTRS: {
                elTagName: {view: !0, value: "li"},
                xview: {value: i},
                tpl: {view: !0, value: "<span>{text}</span>"}
            }
        }, {xclass: "list-item"});
    return s.View = i, s
}), define("bui/list/list", ["bui/common"], function (e) {
    var t = e("bui/common"), n = t.Component, r = n.UIBase, i = n.Controller.extend([r.ChildList], {}, {
        ATTRS: {
            elTagName: {view: !0, value: "ul"},
            idField: {value: "id"},
            defaultChildClass: {value: "list-item"}
        }
    }, {xclass: "list"});
    return i
}), define("bui/picker", ["bui/common", "bui/picker/mixin", "bui/picker/picker", "bui/picker/listpicker"], function (e) {
    var t = e("bui/common"), n = t.namespace("Picker");
    return t.mix(n, {
        Mixin: e("bui/picker/mixin"),
        Picker: e("bui/picker/picker"),
        ListPicker: e("bui/picker/listpicker")
    }), n
}), define("bui/picker/mixin", function (e) {
    var t = function () {
    };
    return t.ATTRS = {
        innerControl: {
            getter: function () {
                return this.get("children")[0]
            }
        },
        triggerEvent: {value: "click"},
        autoSetValue: {value: !0},
        changeEvent: {value: "selectedchange"},
        autoHide: {value: !0},
        hideEvent: {value: "itemclick"},
        textField: {},
        align: {value: {points: ["bl", "tl"], offset: [0, 0]}},
        valueField: {}
    }, t.prototype = {
        __bindUI: function () {
            var e = this, t = e.get("hideEvent"), n = $(e.get("trigger"));
            e.on("show", function (t) {
                e.get("isInit") || e._initControl();
                if (e.get("autoSetValue")) {
                    var n = e.get("valueField") || e.get("textField") || e.get("curTrigger"), r = $(n).val();
                    e.setSelectedValue(r)
                }
            })
        }, _initControl: function () {
            var e = this;
            if (e.get("isInit")) return;
            if (!e.get("innerControl")) {
                var t = e.createControl();
                e.get("children").push(t)
            }
            e.initControlEvent(), e.set("isInit", !0)
        }, initControl: function () {
            this._initControl()
        }, createControl: function () {
        }, initControlEvent: function () {
            var e = this, t = e.get("innerControl"), n = $(e.get("trigger")), r = e.get("hideEvent");
            t.on(e.get("changeEvent"), function (t) {
                var r = e.get("curTrigger"), i = e.get("textField") || r || n, s = e.get("valueField"),
                    o = e.getSelectedValue(), u = !1;
                if (i) {
                    var a = e.getSelectedText(), f = $(i).val();
                    a != f && ($(i).val(a), u = !0, $(i).trigger("change"))
                }
                if (s) {
                    var l = $(s).val();
                    s != l && ($(s).val(o), u = !0, $(s).trigger("change"))
                }
                u && e.onChange(a, o, t)
            }), r && t.on(e.get("hideEvent"), function () {
                var t = e.get("curTrigger");
                try {
                    t && t.focus()
                } catch (n) {
                    BUI.log(n)
                }
                e.hide()
            })
        }, setSelectedValue: function (e) {
        }, getSelectedValue: function () {
        }, getSelectedText: function () {
        }, focus: function () {
            this.get("innerControl").focus()
        }, onChange: function (e, t, n) {
            var r = this, i = r.get("curTrigger");
            r.fire("selectedchange", {value: t, text: e, curTrigger: i})
        }, handleNavEsc: function (e) {
            this.hide()
        }, _uiSetValueField: function (e) {
            var t = this;
            e != null && e !== "" && t.setSelectedValue($(e).val())
        }, _getTextField: function () {
            var e = this;
            return e.get("textField") || e.get("curTrigger")
        }
    }, t
}), define("bui/picker/picker", ["bui/overlay", "bui/picker/mixin"], function (e) {
    var t = e("bui/overlay").Overlay, n = e("bui/picker/mixin"), r = t.extend([n], {}, {ATTRS: {}}, {xclass: "picker"});
    return r
}), define("bui/picker/listpicker", ["bui/picker/picker", "bui/list"], function (e) {
    var t = e("bui/list"), n = e("bui/picker/picker"), r = n.extend({
        initializer: function () {
            var e = this, t = e.get("children"), n = e.get("list");
            n || t.push({})
        }, setSelectedValue: function (e) {
            e = e ? e.toString() : "", this.get("isInit") || this._initControl();
            var t = this, n = t.get("list"), r = t.getSelectedValue();
            e !== r && n.getCount() && (n.get("multipleSelect") && n.clearSelection(), n.setSelectionByField(e.split(",")))
        }, onChange: function (e, t, n) {
            var r = this, i = r.get("curTrigger");
            r.fire("selectedchange", {value: t, text: e, curTrigger: i, item: n.item})
        }, getSelectedValue: function () {
            return this.get("isInit") || this._initControl(), this.get("list").getSelectionValues().join(",")
        }, getSelectedText: function () {
            return this.get("isInit") || this._initControl(), this.get("list").getSelectionText().join(",")
        }
    }, {
        ATTRS: {
            defaultChildClass: {value: "simple-list"}, list: {
                getter: function () {
                    return this.get("children")[0]
                }
            }
        }
    }, {xclass: "list-picker"});
    return r
}), function () {
    var e = "bui/form/";
    define("bui/form", ["bui/common", e + "fieldcontainer", e + "form", e + "row", e + "fieldgroup", e + "horizontal", e + "rules", e + "field", e + "fieldgroup"], function (t) {
        var n = t("bui/common"), r = n.namespace("Form"), i = t(e + "tips");
        return n.mix(r, {
            Tips: i,
            TipItem: i.Item,
            FieldContainer: t(e + "fieldcontainer"),
            Form: t(e + "form"),
            Row: t(e + "row"),
            Group: t(e + "fieldgroup"),
            HForm: t(e + "horizontal"),
            Rules: t(e + "rules"),
            Field: t(e + "field"),
            FieldGroup: t(e + "fieldgroup")
        }), r
    })
}(), define("bui/form/tips", ["bui/common", "bui/overlay"], function (e) {
    var t = e("bui/common"), n = t.prefix, r = e("bui/overlay").Overlay, i = "data-tip", s = n + "form-tip-container",
        o = r.extend({
            initializer: function () {
                var e = this, t = e.get("render");
                if (!t) {
                    var n = $(e.get("trigger")).parent();
                    e.set("render", n)
                }
            }, renderUI: function () {
                var e = this;
                e.resetVisible()
            }, resetVisible: function () {
                var e = this, t = $(e.get("trigger"));
                t.val() ? e.set("visible", !1) : (e.set("align", {
                    node: $(e.get("trigger")),
                    points: ["cl", "cl"]
                }), e.set("visible", !0))
            }, bindUI: function () {
                var e = this, t = $(e.get("trigger"));
                e.get("el").on("click", function () {
                    e.hide(), t.focus()
                }), t.on("click focus", function () {
                    e.hide()
                }), t.on("blur", function () {
                    e.resetVisible()
                })
            }
        }, {
            ATTRS: {
                trigger: {},
                text: {},
                iconCls: {},
                tpl: {value: '<span class="{iconCls}"></span><span class="tip-text">{text}</span>'}
            }
        }, {xclass: "form-tip"}), u = function (e) {
            if (this.constructor !== u) return new u(e);
            u.superclass.constructor.call(this, e), this._init()
        };
    return u.ATTRS = {
        form: {}, items: {
            valueFn: function () {
                return []
            }
        }
    }, t.extend(u, t.Base), t.augment(u, {
        _init: function () {
            var e = this, n = $(e.get("form"));
            n.length && (t.each($.makeArray(n[0].elements), function (t) {
                var n = $(t).attr(i);
                n && e._initFormElement(t, $.parseJSON(n))
            }), n.addClass(s))
        }, _initFormElement: function (e, t) {
            t && (t.trigger = e);
            var n = this, r = n.get("items"), i = new o(t);
            r.push(i)
        }, getItem: function (e) {
            var n = this, r = n.get("items"), i = null;
            return t.each(r, function (t) {
                if ($(t.get("trigger")).attr("name") === e) return i = t, !1
            }), i
        }, resetVisible: function () {
            var e = this, n = e.get("items");
            t.each(n, function (e) {
                e.resetVisible()
            })
        }, render: function () {
            var e = this, n = e.get("items");
            t.each(n, function (e) {
                e.render()
            })
        }, destroy: function () {
            var e = this, n = e.get(n);
            t.each(n, function (e) {
                e.destroy()
            })
        }
    }), u.Item = o, u
}), define("bui/form/basefield", ["bui/common", "bui/form/tips", "bui/form/valid", "bui/form/remote"], function (e) {
    var t = e("bui/common"), n = t.Component, r = e("bui/form/tips").Item, i = e("bui/form/valid"),
        s = e("bui/form/remote"), o = t.prefix + "form-field-error", u = "data-error",
        a = n.View.extend([s.View, i.View], {
            renderUI: function () {
                var e = this, t = e.get("control");
                if (!t) {
                    var n = e.get("controlTpl"), r = e.getControlContainer();
                    if (n) {
                        var t = $(n).appendTo(r);
                        e.set("control", t)
                    }
                } else e.set("controlContainer", t.parent())
            }, clearErrors: function () {
                var e = this, t = e.get("msgEl");
                t && (t.remove(), e.set("msgEl", null)), e.get("el").removeClass(o)
            }, showError: function (e, n) {
                var r = this, i = r.get("control"), s = t.substitute(n, {error: e}), u = $(s);
                u.appendTo(i.parent()), r.set("msgEl", u), r.get("el").addClass(o)
            }, getControlContainer: function () {
                var e = this, n = e.get("el"), r = e.get("controlContainer");
                return r && t.isString(r) && (r = n.find(r)), r && r.length ? r : n
            }, getLoadingContainer: function () {
                return this.getControlContainer()
            }, _uiSetName: function (e) {
                var t = this;
                t.get("control").attr("name", e)
            }
        }, {ATTRS: {error: {}, controlContainer: {}, msgEl: {}, control: {}}}), f = n.Controller.extend([s, i], {
            isField: !0, initializer: function () {
                var e = this;
                e.on("afterRenderUI", function () {
                    var t = e.get("tip");
                    t && (t.trigger = e.getTipTigger(), t.autoRender = !0, t = new r(t), e.set("tip", t))
                })
            }, bindUI: function () {
                var e = this, t = e.get("validEvent"), n = e.get("changeEvent"), r = e.get("firstValidEvent"),
                    i = e.getInnerControl();
                i.is("select") && (t = "change"), i.on(t, function () {
                    var t = e.getControlValue(i);
                    e.validControl(t)
                }), r && i.on(r, function () {
                    if (!e.get("hasValid")) {
                        var t = e.getControlValue(i);
                        e.validControl(t)
                    }
                }), e.on(n, function () {
                    e.onValid()
                }), e.on("remotecomplete", function (t) {
                    e._setError(t.error)
                })
            }, onValid: function () {
                var e = this, t = e.getControlValue();
                t = e.parseValue(t), e.isCurrentValue(t) || (e.setInternal("value", t), e.onChange())
            }, onChange: function () {
                this.fire("change")
            }, isCurrentValue: function (e) {
                return e == this.get("value")
            }, _clearError: function () {
                this.set("error", null), this.get("view").clearErrors()
            }, _setError: function (e) {
                this.set("error", e), this.showErrors()
            }, getControlValue: function (e) {
                var t = this;
                return e = e || t.getInnerControl(), e.val()
            }, getControlContainer: function () {
                return this.get("view").getControlContainer()
            }, getRemoteParams: function () {
                var e = this, t = {};
                return t[e.get("name")] = e.getControlValue(), t
            }, setControlValue: function (e) {
                var t = this, n = t.getInnerControl();
                n.val(e)
            }, parseValue: function (e) {
                return e
            }, valid: function () {
                var e = this;
                e.validControl()
            }, validControl: function (e) {
                var t = this, n;
                return e = e || t.getControlValue(), preError = t.get("error"), n = t.getValidError(e), t.setInternal("hasValid", !0), n ? (t._setError(n), t.fire("error", {
                    msg: n,
                    value: e
                }), preError !== n && t.fire("validchange", {valid: !1})) : (t._clearError(), t.fire("valid"), preError && t.fire("validchange", {valid: !0})), !n
            }, focus: function () {
                this.getInnerControl().focus()
            }, change: function () {
                var e = this.getInnerControl();
                e.change()
            }, blur: function () {
                this.getInnerControl().blur()
            }, isValid: function () {
                var e = this;
                return e.get("hasValid") || e.validControl(), !e.get("error")
            }, getError: function () {
                return this.get("error")
            }, getErrors: function () {
                var e = this.getError();
                return e ? [e] : []
            }, clearErrors: function (e) {
                var t = this;
                t._clearError(), e && t.getControlValue() != t.get("value") && t.setControlValue(t.get("value"))
            }, getInnerControl: function () {
                return this.get("view").get("control")
            }, getTipTigger: function () {
                return this.getInnerControl()
            }, destructor: function () {
                var e = this, t = e.get("tip");
                t && t.destroy && t.destroy()
            }, setInnerWidth: function (e) {
                var n = this, r = n.getInnerControl(), i = r.siblings(), s = r.outerWidth() - r.width();
                t.each(i, function (e) {
                    s += $(e).outerWidth()
                }), r.width(e - s)
            }, _resetTip: function () {
                var e = this, t = e.get("tip");
                t && t.resetVisible()
            }, resetTip: function () {
                this._resetTip()
            }, _uiSetValue: function (e) {
                var t = this;
                t.setControlValue(e), t.get("rendered") && (t.validControl(), t.onChange()), t._resetTip()
            }, _uiSetDisabled: function (e) {
                var n = this, r = n.getInnerControl(), i = n.get("children");
                r.attr("disabled", e), n.get("rendered") && (e && n.clearErrors(), e || n.valid()), t.each(i, function (t) {
                    t.set("disabled", e)
                })
            }, _uiSetWidth: function (e) {
                var t = this;
                e != null && t.get("forceFit") && t.setInnerWidth(e)
            }
        }, {
            ATTRS: {
                hasValid: {value: !1},
                forceFit: {value: !1},
                tip: {},
                changeEvent: {value: "valid"},
                firstValidEvent: {value: "blur"},
                validEvent: {value: "keyup change"},
                name: {view: !0},
                showError: {view: !0, value: !0},
                value: {view: !0},
                label: {},
                controlContainer: {view: !0},
                control: {view: !0},
                controlTpl: {view: !0, value: '<input type="text"/>'},
                events: {value: {error: !1, valid: !1, change: !0, validchange: !0}},
                tpl: {value: "<label>{label}</label>"},
                xview: {value: a}
            }, PARSER: {
                control: function (e) {
                    var t = e.find("input,select,textarea");
                    return t.length ? t : e
                }, disabled: function (e) {
                    return !!e.attr("disabled")
                }, value: function (e) {
                    var t = this, n = "select,input,textarea", r = t.get("value");
                    return r || (e.is(n) ? (r = e.val(), !r && e.is("select") && (r = e.attr("value"))) : r = e.find(n).val()), r
                }, name: function (e) {
                    var t = this, n = "select,input,textarea", r = t.get("name");
                    return r || (e.is(n) ? r = e.attr("name") : r = e.find(n).attr("name")), r
                }
            }
        }, {xclass: "form-field"});
    return f.View = a, f
}), define("bui/form/textfield", ["bui/form/basefield"], function (e) {
    var t = e("bui/form/basefield"), n = t.extend({}, {xclass: "form-field-text"});
    return n
}), define("bui/form/textareafield", ["bui/form/basefield"], function (e) {
    var t = e("bui/form/basefield"), n = t.extend({
        _uiSetRows: function (e) {
            var t = this, n = t.getInnerControl();
            e && n.attr("rows", e)
        }, _uiSetCols: function (e) {
            var t = this, n = t.getInnerControl();
            e && n.attr("cols", e)
        }
    }, {
        ATTRS: {
            controlTpl: {value: "<textarea></textarea>"},
            rows: {},
            cols: {},
            decorateCfgFields: {value: {rows: !0, cols: !0}}
        }
    }, {xclass: "form-field-textarea"});
    return n
}), define("bui/form/numberfield", ["bui/form/basefield"], function (e) {
    var t = e("bui/form/basefield"), n = t.extend({
        parseValue: function (e) {
            if (e == "" || e == null) return null;
            if (BUI.isNumber(e)) return e;
            var t = this, n = t.get("allowDecimals");
            return e = e.replace(/\,/g, ""), n ? parseFloat(parseFloat(e).toFixed(t.get("decimalPrecision"))) : parseInt(e, 10)
        }, _uiSetMax: function (e) {
            this.addRule("max", e)
        }, _uiSetMin: function (e) {
            this.addRule("min", e)
        }
    }, {
        ATTRS: {
            max: {},
            min: {},
            decorateCfgFields: {value: {min: !0, max: !0}},
            validEvent: {value: "keyup change"},
            defaultRules: {value: {number: !0}},
            allowDecimals: {value: !0},
            decimalPrecision: {value: 2},
            step: {value: 1}
        }
    }, {xclass: "form-field-number"});
    return n
}), define("bui/form/hiddenfield", ["bui/form/basefield"], function (e) {
    var t = e("bui/form/basefield"), n = t.extend({}, {
        ATTRS: {
            controlTpl: {value: '<input type="hidden"/>'},
            tpl: {value: ""}
        }
    }, {xclass: "form-field-hidden"});
    return n
}), define("bui/form/readonlyfield", ["bui/form/basefield"], function (e) {
    var t = e("bui/form/basefield"),
        n = t.extend({}, {ATTRS: {controlTpl: {value: '<input type="text" readonly="readonly"/>'}}}, {xclass: "form-field-readonly"});
    return n
}), define("bui/form/selectfield", ["bui/common", "bui/form/basefield"], function (e) {
    function r(e, n, r) {
        e.children().remove();
        var s = r.get("emptyText");
        s && r.get("showBlank") && i("", s, e), t.each(n, function (t) {
            i(t.value, t.text, e)
        })
    }

    function i(e, t, n) {
        var r = '<option value="' + e + '">' + t + "</option>";
        $(r).appendTo(n)
    }

    var t = e("bui/common"), n = e("bui/form/basefield"), s = n.extend({
        renderUI: function () {
            var e = this, t = e.getInnerControl(), n = e.get("select");
            if (e.get("srcNode") && t.is("select")) return;
            $.isPlainObject(n) && e._initSelect(n)
        }, _initSelect: function (e) {
            var n = this, r = n.get("items");
            t.use("bui/select", function (t) {
                e.render = n.getControlContainer(), e.valueField = n.getInnerControl(), e.autoRender = !0, e = new t.Select(e), n.set("select", e), n.set("isCreate", !0), n.get("children").push(e), e.on("change", function (t) {
                    var r = e.getSelectedValue();
                    n.set("value", r)
                })
            })
        }, setItems: function (e) {
            var n = this, i = n.get("select");
            if ($.isPlainObject(e)) {
                var s = [];
                t.each(e, function (e, t) {
                    s.push({value: t, text: e})
                }), e = s
            }
            var o = n.getInnerControl();
            o.is("select") && (r(o, e, n), n.setControlValue(n.get("value")), n.getControlValue() || n.setInternal("value", "")), i && (i.set ? i.set("items", e) : i.items = e)
        }, setControlValue: function (e) {
            var t = this, n = t.get("select"), r = t.getInnerControl();
            r.val(e), n && n.set && n.getSelectedValue() !== e && n.setSelectedValue(e)
        }, getSelectedText: function () {
            var e = this, t = e.get("select"), n = e.getInnerControl();
            if (n.is("select")) {
                var r = n[0], i = r.options[r.selectedIndex];
                return i ? i.text : ""
            }
            return t.getSelectedText()
        }, getTipTigger: function () {
            var e = this, t = e.get("select");
            return t && t.rendered ? t.get("el").find("input") : e.get("el")
        }, _uiSetItems: function (e) {
            e && this.setItems(e)
        }, setInnerWidth: function (e) {
            var t = this, n = t.getInnerControl(), r = t.get("select"), i = n.outerWidth() - n.width();
            n.width(e - i), r && r.set && r.set("width", e)
        }
    }, {
        ATTRS: {
            items: {},
            controlTpl: {value: '<input type="hidden"/>'},
            showBlank: {value: !0},
            emptyText: {value: "\u8bf7\u9009\u62e9"},
            select: {shared: !1, value: {}}
        }, PARSER: {
            emptyText: function (e) {
                if (!this.get("showBlank")) return "";
                var t = e.find("option"), n = this.get("emptyText");
                return t.length && (n = $(t[0]).text()), n
            }
        }
    }, {xclass: "form-field-select"});
    return s
}), define("bui/form/datefield", ["bui/common", "bui/form/basefield", "bui/calendar"], function (e) {
    var t = e("bui/common"), n = e("bui/form/basefield"), r = t.Date, i = n.extend({
        renderUI: function () {
            var e = this, t = e.get("datePicker");
            $.isPlainObject(t) && e.initDatePicker(t), (t.get && t.get("showTime") || t.showTime) && e.getInnerControl().addClass("calendar-time")
        }, initDatePicker: function (e) {
            var n = this;
            t.use("bui/calendar", function (t) {
                e.trigger = n.getInnerControl(), e.autoRender = !0, e = new t.DatePicker(e), n.set("datePicker", e), n.set("isCreatePicker", !0), n.get("children").push(e)
            })
        }, setControlValue: function (e) {
            var n = this, i = n.getInnerControl();
            t.isDate(e) && (e = r.format(e, n._getFormatMask())), i.val(e)
        }, _getFormatMask: function () {
            var e = this, t = e.get("datePicker");
            return t.showTime || t.get && t.get("showTime") ? "yyyy-mm-dd HH:MM:ss" : "yyyy-mm-dd"
        }, parseValue: function (e) {
            return t.isNumber(e) ? new Date(e) : r.parse(e)
        }, isCurrentValue: function (e) {
            return r.isEquals(e, this.get("value"))
        }, _uiSetMax: function (e) {
            this.addRule("max", e);
            var t = this, n = t.get("datePicker");
            n && (n.set ? n.set("maxDate", e) : n.maxDate = e)
        }, _uiSetMin: function (e) {
            this.addRule("min", e);
            var t = this, n = t.get("datePicker");
            n && (n.set ? n.set("minDate", e) : n.minDate = e)
        }
    }, {
        ATTRS: {
            controlTpl: {value: '<input type="text" class="calendar"/>'},
            defaultRules: {value: {date: !0}},
            max: {},
            min: {},
            value: {
                setter: function (e) {
                    return t.isNumber(e) ? new Date(e) : e
                }
            },
            datePicker: {shared: !1, value: {}},
            isCreatePicker: {value: !0}
        }, PARSER: {
            datePicker: function (e) {
                var n = this, r = n.get("datePicker") || {};
                return e.hasClass("calendar-time") && t.mix(r, {showTime: !0}), r
            }
        }
    }, {xclass: "form-field-date"});
    return i
}), define("bui/form/checkfield", ["bui/form/basefield"], function (e) {
    var t = e("bui/form/basefield"), n = t.extend({
        onValid: function () {
            var e = this, t = e._getControlChecked();
            e.setInternal("checked", t), e.fire("change"), t ? e.fire("checked") : e.fire("unchecked")
        }, _setControlChecked: function (e) {
            var t = this, n = t.getInnerControl();
            n.attr("checked", !!e)
        }, _getControlChecked: function () {
            var e = this, t = e.getInnerControl();
            return !!t.attr("checked")
        }, _uiSetValue: function (e) {
            this.setControlValue(e)
        }, _uiSetWidth: function (e) {
        }, _uiSetChecked: function (e) {
            var t = this;
            t._setControlChecked(e), t.get("rendered") && t.onValid()
        }
    }, {
        ATTRS: {validEvent: {value: "click"}, checked: {value: !1}, events: {value: {checked: !1, unchecked: !1}}},
        PARSER: {
            checked: function (e) {
                return !!e.attr("checked")
            }
        }
    }, {xclass: "form-check-field"});
    return n
}), define("bui/form/checkboxfield"
    , ["bui/form/checkfield"], function (e) {
        var t = e("bui/form/checkfield"), n = t.extend({}, {
            ATTRS: {
                controlTpl: {view: !0, value: '<input type="checkbox"/>'},
                controlContainer: {value: ".checkbox"},
                tpl: {value: '<label><span class="checkbox"></span>{label}</label>'}
            }
        }, {xclass: "form-field-checkbox"});
        return n
    }), define("bui/form/radiofield", ["bui/form/checkfield"], function (e) {
    var t = e("bui/form/checkfield"), n = t.extend({
        bindUI: function () {
            var e = this, t = e.get("parent"), n = e.get("name");
            t && e.getInnerControl().on("click", function (r) {
                var i = t.getFields(n);
                BUI.each(i, function (t) {
                    t != e && t.set("checked", !1)
                })
            })
        }
    }, {
        ATTRS: {
            controlTpl: {view: !0, value: '<input type="radio"/>'},
            controlContainer: {value: ".radio"},
            tpl: {value: '<label><span class="radio"></span>{label}</label>'}
        }
    }, {xclass: "form-field-radio"});
    return n
}), define("bui/form/plainfield", ["bui/form/basefield"], function (e) {
    var t = e("bui/form/basefield"), n = t.View.extend({
        _uiSetValue: function (e) {
            var t = this, n = t.get("textEl"), r = t.getControlContainer(), i = t.get("renderer"), s = i ? i(e) : e,
                o = t.get("width"), u = 0, a;
            n && n.remove(), s = s || "&nbsp;", a = BUI.substitute(t.get("textTpl"), {text: s}), n = $(a).appendTo(r), u = n.outerWidth() - n.width(), n.width(o - u), t.set("textEl", n)
        }
    }, {ATTRS: {textEl: {}, value: {}}}, {xclass: "form-field-plain-view"}), r = t.extend({}, {
        ATTRS: {
            controlTpl: {value: '<input type="hidden"/>'},
            textTpl: {view: !0, value: '<span class="x-form-text">{text}</span>'},
            renderer: {
                view: !0, value: function (e) {
                    return e
                }
            },
            tpl: {value: ""},
            xview: {value: n}
        }
    }, {xclass: "form-field-plain"});
    return r
}), define("bui/form/listfield", ["bui/common", "bui/form/basefield", "bui/list"], function (e) {
    function i(e) {
        var n = e;
        return $.isPlainObject(e) && (n = [], t.each(e, function (e, t) {
            n.push({text: e, value: t})
        })), n
    }

    var t = e("bui/common"), n = e("bui/list"), r = e("bui/form/basefield"), n = r.extend({
        initializer: function () {
            var e = this;
            e._initList()
        }, _getList: function () {
            var e = this, t = e.get("children");
            return t[0]
        }, bindUI: function () {
            var e = this, t = e._getList();
            t && t.on("selectedchange", function () {
                var n = e._getListValue(t);
                e.set("value", n)
            })
        }, _getListValue: function (e) {
            var t = this;
            return e = e || t._getList(), e.getSelectionValues().join(",")
        }, setControlValue: function (e) {
            var t = this, n = t.getInnerControl(), r = t._getList();
            n.val(e), t._getListValue(r) !== e && r.getCount() && (r.get("multipleSelect") && r.clearSelection(), r.setSelectionByField(e.split(",")))
        }, syncUI: function () {
            this.set("list", this._getList())
        }, _initList: function () {
            var e = this, n = e.get("defaultListCfg"), r = e.get("children"), i = e.get("list") || {};
            if (r[0]) return;
            $.isPlainObject(i) && t.mix(i, n), r.push(i)
        }, setItems: function (e) {
            var t = this, n = t.get("value"), r = t._getList();
            r.set("items", i(e)), r.setSelectionByField(n.split(","))
        }, _uiSetItems: function (e) {
            e && this.setItems(e)
        }
    }, {
        ATTRS: {
            controlTpl: {value: '<input type="hidden"/>'},
            defaultListCfg: {value: {xclass: "simple-list"}},
            items: {
                setter: function (e) {
                    if ($.isPlainObject(e)) {
                        var n = [];
                        t.each(e, function (e, t) {
                            n.push({value: t, text: e})
                        }), e = n
                    }
                    return e
                }
            },
            list: {}
        }, PARSER: {
            list: function (e) {
                var t = e.find(".bui-simple-list");
                if (t.length) return {srcNode: t}
            }
        }
    }, {xclass: "form-field-list"});
    return n
}), define("bui/form/uploaderfield", ["bui/common", "bui/form/basefield", "bui/form/rules"], function (e) {
    var t = e("bui/common"), n = t.JSON, r = e("bui/form/basefield"), i = e("bui/form/rules"), s = r.extend({
        renderUI: function () {
            var e = this, t = e.getInnerControl();
            if (e.get("srcNode") && t.get(0).type === "file") return;
            e._initControlValue(), e._initUpload()
        }, _initUpload: function () {
            var e = this, n = e.get("children"), r = e.get("uploader") || {};
            t.use("bui/uploader", function (t) {
                r.render = e.getControlContainer(), r.autoRender = !0, r = new t.Uploader(r), e.set("uploader", r), e.set("isCreate", !0), e.get("children").push(r), e._initQueue(r.get("queue")), r.on("success", function (t) {
                    var n = e._getUploaderResult();
                    e.setControlValue(n)
                }), r.get("queue").on("itemremoved", function () {
                    var t = e._getUploaderResult();
                    e.setControlValue(t)
                })
            })
        }, _getUploaderResult: function () {
            var e = this, n = e.get("uploader"), r = n.get("queue"), i = r.getItems(), s = [];
            return t.each(i, function (e) {
                e.result && s.push(e.result)
            }), s
        }, setControlValue: function (e) {
            var t = this, r = t.getInnerControl();
            r.val(n.stringify(e))
        }, _initControlValue: function () {
            var e = this, n = e.getControlValue(), r;
            n && (r = t.JSON.parse(n), e.set("value", r))
        }, _initQueue: function (e) {
            var n = this, r = n.get("value"), i = [];
            t.each(r, function (e) {
                var n = t.cloneObject(e);
                n.success = !0, n.result = e, i.push(n)
            }), e && e.setItems(i)
        }
    }, {
        ATTRS: {
            controlTpl: {value: '<input type="hidden"/>'}, uploader: {
                setter: function (e) {
                    var t = this.get("disabled");
                    return e && e.isController && e.set("disabled", t), e
                }
            }, disabled: {
                setter: function (e) {
                    var t = this, n = t.get("uploader");
                    n && n.isController && n.set("disabled", e)
                }
            }, value: {shared: !1, value: []}, defaultRules: function () {
                !0
            }
        }
    }, {xclass: "form-field-uploader"});
    return i.add({
        name: "uploader",
        msg: "\u4e0a\u4f20\u6587\u4ef6\u9009\u62e9\u6709\u8bef\uff01",
        validator: function (e, t, n, r) {
            var i = r.get("uploader");
            if (i && !i.isValid()) return n
        }
    }), s
}), define("bui/form/checklistfield", ["bui/common", "bui/form/listfield"], function (e) {
    "use strict";
    var t = e("bui/common"), n = e("bui/form/listfield"), r = n.extend({}, {
        ATTRS: {
            defaultListCfg: {
                value: {
                    itemTpl: '<li><span class="x-checkbox"></span>{text}</li>',
                    multipleSelect: !0,
                    allowTextSelection: !1
                }
            }
        }
    }, {xclass: "form-field-checklist"});
    return r
}), define("bui/form/radiolistfield", ["bui/common", "bui/form/listfield"], function (e) {
    "use strict";
    var t = e("bui/common"), n = e("bui/form/listfield"), r = n.extend({}, {
        ATTRS: {
            defaultListCfg: {
                value: {
                    itemTpl: '<li><span class="x-radio"></span>{text}</li>',
                    allowTextSelection: !1
                }
            }
        }
    }, {xclass: "form-field-radiolist"});
    return r
}), function () {
    var e = "bui/form/";
    define(e + "field", ["bui/common", e + "textfield", e + "datefield", e + "selectfield", e + "hiddenfield", e + "numberfield", e + "checkfield", e + "radiofield", e + "checkboxfield", e + "plainfield", e + "listfield", e + "uploaderfield", e + "checklistfield", e + "radiolistfield", e + "textareafield"], function (t) {
        var n = t("bui/common"), r = t(e + "basefield");
        return n.mix(r, {
            Text: t(e + "textfield"),
            Date: t(e + "datefield"),
            Select: t(e + "selectfield"),
            Hidden: t(e + "hiddenfield"),
            Number: t(e + "numberfield"),
            Check: t(e + "checkfield"),
            Radio: t(e + "radiofield"),
            Checkbox: t(e + "checkboxfield"),
            Plain: t(e + "plainfield"),
            List: t(e + "listfield"),
            TextArea: t(e + "textareafield"),
            Uploader: t(e + "uploaderfield"),
            CheckList: t(e + "checklistfield"),
            RadioList: t(e + "radiolistfield")
        }), r
    })
}(), define("bui/form/valid", ["bui/common", "bui/form/rules"], function (e) {
    var t = e("bui/common"), n = e("bui/form/rules"), r = function () {
    };
    r.prototype = {
        getErrorsContainer: function () {
            var e = this, n = e.get("errorContainer");
            return n ? t.isString(n) ? e.get("el").find(n) : n : e.getContentElement()
        }, showErrors: function (e) {
            var n = this, r = n.getErrorsContainer(), i = n.get("errorTpl");
            n.clearErrors();
            if (!n.get("showError")) return;
            if (n.get("showOneError")) {
                e && e.length && n.showError(e[0], i, r);
                return
            }
            t.each(e, function (e) {
                e && n.showError(e, i, r)
            })
        }, showError: function (e, t, n) {
        }, clearErrors: function () {
        }
    };
    var i = function () {
    };
    return i.ATTRS = {
        defaultRules: {value: {}},
        defaultMessages: {value: {}},
        rules: {shared: !1, value: {}},
        messages: {shared: !1, value: {}},
        validator: {},
        errorContainer: {view: !0},
        errorTpl: {
            view: !0,
            value: '<span class="x-field-error"><span class="x-icon x-icon-mini x-icon-error">!</span><label class="x-field-error-text">{error}</label></span>'
        },
        showError: {view: !0, value: !0},
        showOneError: {},
        error: {},
        pauseValid: {value: !1}
    }, i.prototype = {
        __bindUI: function () {
            var e = this;
            e.on("afterDisabledChange", function (t) {
                var n = t.newVal;
                n ? e.clearErrors(!1, !1) : e.valid()
            })
        }, isValid: function () {
        }, valid: function () {
        }, validControl: function () {
        }, validRules: function (e, t) {
            if (!e) return null;
            if (this.get("pauseValid")) return null;
            var r = this, i = r._getValidMessages(), s = null;
            for (var o in e) if (e.hasOwnProperty(o)) {
                var u = e[o];
                s = n.valid(o, t, u, i[o], r);
                if (s) break
            }
            return s
        }, _getValidMessages: function () {
            var e = this, n = e.get("defaultMessages"), r = e.get("messages");
            return t.merge(n, r)
        }, getValidError: function (e) {
            var t = this, n = t.get("validator"), r = null;
            return r = t.validRules(t.get("defaultRules"), e) || t.validRules(t.get("rules"), e), !r && !this.get("pauseValid") && (t.parseValue && (e = t.parseValue(e)), r = n ? n.call(this, e) : ""), r
        }, getErrors: function () {
        }, showErrors: function (e) {
            var t = this, e = e || t.getErrors();
            t.get("view").showErrors(e)
        }, clearErrors: function (e, n) {
            n = n == null ? !0 : n;
            var r = this, i = r.get("children");
            n && t.each(i, function (t) {
                t.clearErrors && (t.field ? t.clearErrors(e) : t.clearErrors(e, n))
            }), r.set("error", null), r.get("view").clearErrors()
        }, addRule: function (e, t, n) {
            var r = this, i = r.get("rules"), s = r.get("messages");
            i[e] = t, n && (s[e] = n)
        }, addRules: function (e, n) {
            var r = this;
            t.each(e, function (e, t) {
                var i = n ? n[t] : null;
                r.addRule(t, e, i)
            })
        }, removeRule: function (e) {
            var t = this, n = t.get("rules");
            delete n[e]
        }, clearRules: function () {
            var e = this;
            e.set("rules", {})
        }
    }, i.View = r, i
}), define("bui/form/groupvalid", ["bui/form/valid"], function (e) {
    function r() {
    }

    function i() {
    }

    var t = "x-form-error", n = e("bui/form/valid");
    return BUI.augment(r, n.View, {
        showError: function (e, n, r) {
            var i = BUI.substitute(n, {error: e}), s = $(i);
            s.appendTo(r), s.addClass(t)
        }, clearErrors: function () {
            var e = this, n = e.getErrorsContainer();
            n.children("." + t).remove()
        }
    }), i.ATTRS = ATTRS = BUI.merge(!0, n.ATTRS, {
        events: {
            value: {
                validchange: !0,
                change: !0
            }
        }
    }), BUI.augment(i, n, {
        __bindUI: function () {
            var e = this, t = "validchange change";
            e.on(t, function (t) {
                var n = t.target;
                if (n != this && e.get("showError")) {
                    var r = n.isValid();
                    e._hasAllChildrenValid() && (r = r && e.isChildrenValid(), r && (e.validControl(e.getRecord()), r = e.isSelfValid())), r ? e.clearErrors() : e.showErrors()
                }
            })
        }, isValid: function () {
            if (this.get("disabled")) return !0;
            var e = this, t = e.isChildrenValid();
            return t && e.isSelfValid()
        }, valid: function () {
            var e = this, t = e.get("children");
            if (e.get("disabled")) return;
            BUI.each(t, function (e) {
                e.get("disabled") || e.valid()
            })
        }, _hasAllChildrenValid: function () {
            var e = this, t = e.get("children"), n = !0;
            return BUI.each(t, function (e) {
                if (!e.get("disabled") && e.get("hasValid") === !1) return n = !1, !1
            }), n
        }, isChildrenValid: function () {
            var e = this, t = e.get("children"), n = !0;
            return BUI.each(t, function (e) {
                if (!e.get("disabled") && !e.isValid()) return n = !1, !1
            }), n
        }, isSelfValid: function () {
            return !this.get("error")
        }, validControl: function (e) {
            var t = this, n = t.getValidError(e);
            t.set("error", n)
        }, getErrors: function () {
            var e = this, t = e.get("children"), n = e.get("showChildError"), r = null, i = [];
            return n && BUI.each(t, function (e) {
                e.getErrors && (i = i.concat(e.getErrors()))
            }), e._hasAllChildrenValid() && e.isChildrenValid() && (r = e.get("error"), r && i.push(r)), i
        }, _uiSetErrorTpl: function (e) {
            var t = this, n = t.get("children");
            BUI.each(n, function (t) {
                t.get("userConfig").errorTpl || t.set("errorTpl", e)
            })
        }
    }), i.View = r, i
}), define("bui/form/fieldcontainer", ["bui/common", "bui/form/field", "bui/form/groupvalid"], function (e) {
    function f(e) {
        return e.is(a)
    }

    function l(e, n) {
        if (e != n) {
            if (f(e)) return [e];
            var r = e.attr("class");
            if (r && (r.indexOf(u) !== -1 || r.indexOf(o) !== -1)) return [e]
        }
        var i = [], s = e.children();
        return t.each(s, function (e) {
            i = i.concat(l($(e), n))
        }), i
    }

    var t = e("bui/common"), n = e("bui/form/field"), r = e("bui/form/groupvalid"), i = t.prefix, s = "form-field",
        o = i + s, u = i + "form-group", a = "input,select,textarea", c = t.Component.View.extend([r.View]),
        h = t.Component.Controller.extend([r], {
            syncUI: function () {
                var e = this, n = e.getFields(), r = e.get("validators");
                t.each(n, function (e) {
                    var t = e.get("name");
                    r[t] && e.set("validator", r[t])
                }), t.each(r, function (t, n) {
                    if (n.indexOf("#") == 0) {
                        var r = n.replace("#", ""), i = e.getChild(r, !0);
                        i && i.set("validator", t)
                    }
                })
            }, getDecorateElments: function () {
                var e = this, t = e.get("el"), n = l(t, t);
                return n
            }, findXClassByNode: function (e, n) {
                return e.attr("type") === "checkbox" ? s + "-checkbox" : e.attr("type") === "radio" ? s + "-radio" : e.attr("type") === "number" ? s + "-number" : e.hasClass("calendar") ? s + "-date" : e[0].tagName == "SELECT" ? s + "-select" : f(e) ? s : t.Component.Controller.prototype.findXClassByNode.call(this, e, n)
            }, getRecord: function () {
                var e = this, n = {}, r = e.getFields();
                return t.each(r, function (r) {
                    var i = r.get("name"), s = e._getFieldValue(r);
                    if (!n[i]) n[i] = s; else if (t.isArray(n[i]) && s != null) n[i].push(s); else if (s != null) {
                        var o = [n[i]];
                        o.push(s), n[i] = o
                    }
                }), n
            }, getFields: function (e) {
                var r = this, i = [], s = r.get("children");
                return t.each(s, function (t) {
                    t instanceof n ? (!e || t.get("name") == e) && i.push(t) : t.getFields && (i = i.concat(t.getFields(e)))
                }), i
            }, getField: function (e) {
                var n = this, r = n.getFields(), i = null;
                return t.each(r, function (t) {
                    if (t.get("name") === e) return i = t, !1
                }), i
            }, getFieldAt: function (e) {
                return this.getFields()[e]
            }, setFieldValue: function (e, n) {
                var r = this, i = r.getFields(e);
                t.each(i, function (e) {
                    r._setFieldValue(e, n)
                })
            }, _setFieldValue: function (e, r) {
                if (e.get("disabled")) return;
                if (e instanceof n.Check) {
                    var i = e.get("value");
                    r && (i === r || t.isArray(r) && t.Array.contains(i, r)) ? e.set("checked", !0) : e.set("checked", !1)
                } else r == null && (r = ""), e.clearErrors(!0), e.set("value", r)
            }, getFieldValue: function (e) {
                var n = this, r = n.getFields(e), i = [];
                return t.each(r, function (e) {
                    var t = n._getFieldValue(e);
                    t && i.push(t)
                }), i.length === 0 ? null : i.length === 1 ? i[0] : i
            }, _getFieldValue: function (e) {
                return e instanceof n.Check && !e.get("checked") ? null : e.get("value")
            }, clearFields: function () {
                this.clearErrors(!0), this.setRecord({})
            }, setRecord: function (e) {
                var n = this, r = n.getFields();
                t.each(r, function (t) {
                    var r = t.get("name");
                    n._setFieldValue(t, e[r])
                })
            }, updateRecord: function (e) {
                var n = this, r = n.getFields();
                t.each(r, function (t) {
                    var r = t.get("name");
                    e.hasOwnProperty(r) && n._setFieldValue(t, e[r])
                })
            }, focus: function () {
                var e = this, t = e.getFields(), n = t[0];
                n && n.focus()
            }, _uiSetDisabled: function (e) {
                var n = this, r = n.get("children");
                t.each(r, function (t) {
                    t.set("disabled", e)
                })
            }
        }, {
            ATTRS: {
                record: {
                    setter: function (e) {
                        this.setRecord(e)
                    }, getter: function () {
                        return this.getRecord()
                    }
                },
                validators: {value: {}},
                defaultLoaderCfg: {value: {property: "children", dataType: "json"}},
                disabled: {sync: !1},
                isDecorateChild: {value: !0},
                xview: {value: c}
            }
        }, {xclass: "form-field-container"});
    return h.View = c, h
}), define("bui/form/group/base", ["bui/common", "bui/form/fieldcontainer"], function (e) {
    var t = e("bui/common"), n = e("bui/form/fieldcontainer"), r = n.extend({}, {
        ATTRS: {
            label: {view: !0},
            defaultChildClass: {value: "form-field"}
        }
    }, {xclass: "form-group"});
    return r
}), define("bui/form/group/range", ["bui/form/group/base"], function (e) {
    function n(e, t, n) {
        var r = e.get("allowEqual");
        return r ? n <= t : n < t
    }

    var t = e("bui/form/group/base"), r = t.extend({}, {
        ATTRS: {
            rangeText: {value: "\u5f00\u59cb\u4e0d\u80fd\u5927\u4e8e\u7ed3\u675f\uff01"},
            allowEqual: {value: !0},
            validator: {
                value: function (e) {
                    var t = this, r = t.getFields(), i = !0;
                    for (var s = 1; s < r.length; s++) {
                        var o = r[s], u = r[s - 1], a, f;
                        if (o && u) {
                            a = o.get("value"), f = u.get("value");
                            if (!n(t, a, f)) {
                                i = !1;
                                break
                            }
                        }
                    }
                    return i ? null : t.get("rangeText")
                }
            }
        }
    }, {xclass: "form-group-range"});
    return r
}), define("bui/form/group/check", ["bui/form/group/base"], function (e) {
    function n(e) {
        var t = e.getFieldAt(0);
        return t ? t.get("name") : ""
    }

    var t = e("bui/form/group/base"), r = t.extend({
        bindUI: function () {
            var e = this;
            e.on("change", function (t) {
                var r = n(e), i = e.get("range"), s = e.getRecord(), o = s[r], u = i[1];
                o && o.length >= u ? e._setFieldsEnable(r, !1) : e._setFieldsEnable(r, !0)
            })
        }, _setFieldsEnable: function (e, t) {
            var n = this, r = n.getFields(e);
            BUI.each(r, function (e) {
                t ? e.enable() : e.get("checked") || e.disable()
            })
        }, _uiSetRange: function (e) {
            this.addRule("checkRange", e)
        }
    }, {
        ATTRS: {
            range: {
                setter: function (e) {
                    if (BUI.isString(e) || BUI.isNumber(e)) e = [parseInt(e, 10)];
                    return e
                }
            }
        }
    }, {xclass: "form-group-check"});
    return r
}), define("bui/form/group/select", ["bui/form/group/base", "bui/data"], function (e) {
    function i(e) {
        var t = [];
        return BUI.each(e, function (e) {
            t.push({text: e.text, value: e.id})
        }), t
    }

    var t = e("bui/form/group/base"), n = e("bui/data"), r = BUI.Component.UIBase.Bindable, s = t.extend([r], {
        initializer: function () {
            var e = this, t = e.get("url"), r = e.get("store") || e._getStore();
            r.isStore || (r.autoLoad = !0, t && (r.url = t), r = new n.TreeStore(r), e.set("store", r))
        }, bindUI: function () {
            var e = this;
            e.on("change", function (t) {
                var n = t.target;
                if (n != e) {
                    var r = n, i = r.get("value"), s = e._getFieldIndex(r) + 1;
                    e._valueChange(i, s)
                }
            })
        }, onLoad: function (e) {
            var t = this, n = e ? e.node : t.get("store").get("root");
            t._setFieldItems(n.level, n.children)
        }, _getStore: function () {
            var e = this, t = e.get("type");
            return t && o[t] ? o[t] : {}
        }, _valueChange: function (e, t) {
            var n = this, r = n.get("store");
            if (e) {
                var i = r.findNode(e);
                if (!i) return;
                r.isLoaded(i) ? n._setFieldItems(t, i.children) : r.loadNode(i)
            } else n._setFieldItems(t, [])
        }, _setFieldItems: function (e, t) {
            var n = this, r = n.getFieldAt(e), s = i(t);
            r && (r.setItems(s), n._valueChange(r.get("value"), e + 1))
        }, _getFieldIndex: function (e) {
            var t = this, n = t.getFields();
            return BUI.Array.indexOf(e, n)
        }
    }, {ATTRS: {type: {}, store: {}}}, {xclass: "form-group-select"}), o = {};
    return s.addType = function (e, t) {
        o[e] = t
    }, s.addType("city", {
        proxy: {url: "http://lp.taobao.com/go/rgn/citydistrictdata.php", dataType: "jsonp"},
        map: {isleaf: "leaf", value: "text"}
    }), s
}), define("bui/form/fieldgroup", ["bui/common", "bui/form/group/base", "bui/form/group/range", "bui/form/group/check", "bui/form/group/select"], function (e) {
    var t = e("bui/common"), n = e("bui/form/group/base");
    return t.mix(n, {
        Range: e("bui/form/group/range"),
        Check: e("bui/form/group/check"),
        Select: e("bui/form/group/select")
    }), n
}), define("bui/form/form", ["bui/common", "bui/form/fieldcontainer"], function (e) {
    var t = e("bui/common"), n = {NORMAL: "normal", AJAX: "ajax", IFRAME: "iframe"}, r = e("bui/form/fieldcontainer"),
        i = t.Component, s = r.View.extend({
            _uiSetMethod: function (e) {
                this.get("el").attr("method", e)
            }, _uiSetAction: function (e) {
                this.get("el").attr("action", e)
            }
        }, {ATTRS: {method: {}, action: {}}}, {xclass: "form-view"}), o = r.extend({
            renderUI: function () {
                var e = this, n = e.get("buttonBar"), r;
                $.isPlainObject(n) && e.get("buttons") && (r = t.merge(e.getDefaultButtonBarCfg(), n), e._initButtonBar(r)), e._initSubmitMask()
            }, _initButtonBar: function (e) {
                var n = this;
                t.use("bui/toolbar", function (t) {
                    buttonBar = new t.Bar(e), n.set("buttonBar", buttonBar)
                })
            }, bindUI: function () {
                var e = this, t = e.get("el");
                t.on("submit", function (t) {
                    e.valid();
                    if (!e.isValid() || e.onBeforeSubmit() === !1) {
                        t.preventDefault(), e.focusError();
                        return
                    }
                    e.isValid() && e.get("submitType") === n.AJAX && (t.preventDefault(), e.ajaxSubmit())
                })
            }, getDefaultButtonBarCfg: function () {
                var e = this, t = e.get("buttons");
                return {
                    autoRender: !0,
                    elCls: "toolbar",
                    render: e.get("el"),
                    items: t,
                    defaultChildClass: "bar-item-button"
                }
            }, focusError: function () {
                var e = this, n = e.getFields();
                t.each(n, function (e) {
                    if (e.get("visible") && !e.get("disabled") && !e.isValid()) {
                        try {
                            e.focus()
                        } catch (n) {
                            t.log(n)
                        }
                        return !1
                    }
                })
            }, submit: function (e) {
                var t = this, r = t.get("submitType");
                t.valid();
                if (t.isValid()) {
                    if (t.onBeforeSubmit() == 0) return;
                    r === n.NORMAL ? t.get("el")[0].submit() : r === n.AJAX && t.ajaxSubmit(e)
                } else t.focusError()
            }, ajaxSubmit: function (e) {
                var n = this, r = n.get("method"), i = n.get("action"), s = n.get("callback"), o = n.get("submitMask"),
                    u = n.serializeToObject(), a, f = t.merge(!0, {url: i, type: r, dataType: "json", data: u}, e);
                e && e.success && (a = e.success), f.success = function (e) {
                    o && o.hide && o.hide(), a && a(e), s && s.call(n, e)
                }, o && o.show && o.show(), $.ajax(f)
            }, _initSubmitMask: function () {
                var e = this, r = e.get("submitType"), i = e.get("submitMask");
                r === n.AJAX && i && t.use("bui/mask", function (n) {
                    var r = $.isPlainObject(i) ? i : {};
                    i = new n.LoadMask(t.mix({el: e.get("el")}, r)), e.set("submitMask", i)
                })
            }, serializeToObject: function () {
                return t.FormHelper.serializeToObject(this.get("el")[0])
            }, toObject: function () {
                return this.serializeToObject()
            }, onBeforeSubmit: function () {
                return this.fire("beforesubmit")
            }, reset: function () {
                var e = this, t = e.get("initRecord");
                e.setRecord(t)
            }, resetTips: function () {
                var e = this, n = e.getFields();
                t.each(n, function (e) {
                    e.resetTip()
                })
            }, destructor: function () {
                var e = this, t = e.get("buttonBar"), n = e.get("submitMask");
                t && t.destroy && t.destroy(), n && n.destroy && n.destroy()
            }, _uiSetInitRecord: function (e) {
                this.setRecord(e)
            }
        }, {
            ATTRS: {
                action: {view: !0, value: ""},
                allowTextSelection: {value: !0},
                events: {value: {beforesubmit: !1}},
                method: {view: !0, value: "get"},
                defaultLoaderCfg: {value: {autoLoad: !0, property: "record", dataType: "json"}},
                submitMask: {value: {msg: "\u6b63\u5728\u63d0\u4ea4\u3002\u3002\u3002"}},
                submitType: {value: "normal"},
                focusError: {value: !0},
                callback: {},
                decorateCfgFields: {value: {method: !0, action: !0}},
                defaultChildClass: {value: "form-field"},
                elTagName: {value: "form"},
                buttons: {},
                buttonBar: {shared: !1, value: {}},
                childContainer: {value: ".x-form-fields"},
                initRecord: {},
                showError: {value: !1},
                xview: {value: s},
                tpl: {value: '<div class="x-form-fields"></div>'}
            }
        }, {xclass: "form"});
    return o.View = s, o
}), define("bui/form/horizontal", ["bui/common", "bui/form/form"], function (e) {
    var t = e("bui/common"), n = e("bui/form/form"), r = n.extend({
        getDefaultButtonBarCfg: function () {
            var e = this, t = e.get("buttons");
            return {
                autoRender: !0,
                elCls: "actions-bar toolbar row",
                tpl: '<div class="form-actions span21 offset3"></div>',
                childContainer: ".form-actions",
                render: e.get("el"),
                items: t,
                defaultChildClass: "bar-item-button"
            }
        }
    }, {
        ATTRS: {
            defaultChildClass: {value: "form-row"},
            errorTpl: {value: '<span class="valid-text"><span class="estate error"><span class="x-icon x-icon-mini x-icon-error">!</span><em>{error}</em></span></span>'},
            elCls: {value: "form-horizontal"}
        }, PARSER: {}
    }, {xclass: "form-horizontal"});
    return r
}), define("bui/form/row", ["bui/common", "bui/form/fieldcontainer"], function (e) {
    var t = e("bui/common"), n = e("bui/form/fieldcontainer"), r = n.extend({}, {
        ATTRS: {
            elCls: {value: "row"},
            defaultChildCfg: {
                value: {
                    tpl: ' <label class="control-label">{label}</label>                <div class="controls">                </div>',
                    childContainer: ".controls",
                    showOneError: !0,
                    controlContainer: ".controls",
                    elCls: "control-group span8",
                    errorTpl: '<span class="valid-text"><span class="estate error"><span class="x-icon x-icon-mini x-icon-error">!</span><em>{error}</em></span></span>'
                }
            },
            defaultChildClass: {value: "form-field-text"}
        }
    }, {xclass: "form-row"});
    return r
}), define("bui/form/rule", ["bui/common"], function (e) {
    function r(e, n, r, i, o) {
        t.isArray(r) && t.isString(r[1]) && (r[1] && (i = r[1]), r = r[0]);
        var u = e, a = u.get("validator"), f = s(e, r, i), l = !0;
        return n = n == null ? "" : n, a.call(u, n, r, f, o)
    }

    function i(e) {
        if (e == null) return {};
        if ($.isPlainObject(e)) return e;
        var n = e, r = {};
        if (t.isArray(e)) {
            for (var i = 0; i < n.length; i++) r[i] = n[i];
            return r
        }
        return {0: e}
    }

    function s(e, n, r) {
        var s = i(n);
        return r = r || e.get("msg"), t.substitute(r, s)
    }

    var t = e("bui/common"), n = function (e) {
        n.superclass.constructor.call(this, e)
    };
    return t.extend(n, t.Base), n.ATTRS = {
        name: {}, msg: {}, validator: {
            value: function (e, t, n, r) {
            }
        }
    }, t.augment(n, {
        valid: function (e, t, n, i) {
            var s = this;
            return r(s, e, t, n, i)
        }
    }), n
}), define("bui/form/rules", ["bui/form/rule"], function (e) {
    function n(e) {
        return parseFloat(e)
    }

    function r(e) {
        return BUI.Date.parse(e)
    }

    function w(e, t, n) {
        var r = e && e.equals !== !1;
        return r ? n <= t : n < t
    }

    function E(e) {
        return e == "" || e == null
    }

    function S(e, t, n, r) {
        var i = r.getFields(), s = !0;
        for (var o = 1; o < i.length; o++) {
            var u = i[o], a = i[o - 1], f, l;
            if (u && a) {
                f = u.get("value"), l = a.get("value");
                if (!E(f) && !E(l) && !w(t, f, l)) {
                    s = !1;
                    break
                }
            }
        }
        return s ? null : n
    }

    function N(e) {
        var t = e.getFieldAt(0);
        return t ? t.get("name") : ""
    }

    function C(e, t) {
        BUI.isArray(t) || (t = [t]);
        if (!e || !t.length) return !1;
        var n = e ? BUI.isArray(e) ? e.length : 1 : 0;
        if (t.length == 1) {
            var r = t[0];
            if (!r) return !0;
            if (r > n) return !1
        } else {
            var i = t[0], s = t[1];
            if (i > n || s < n) return !1
        }
        return !0
    }

    var t = e("bui/form/rule"), i = {}, s = {
        add: function (e) {
            var n;
            return $.isPlainObject(e) ? (n = e.name, i[n] = new t(e)) : e.get && (n = e.get("name"), i[n] = e), i[n]
        }, remove: function (e) {
            delete i[e]
        }, get: function (e) {
            return i[e]
        }, valid: function (e, t, n, r, i) {
            var o = s.get(e);
            return o ? o.valid(t, n, r, i) : null
        }, isValid: function (e, t, n, r) {
            return s.valid(e, t, n, r) == null
        }
    }, o = s.add({
        name: "required", msg: "\u4e0d\u80fd\u4e3a\u7a7a\uff01", validator: function (e, t, n) {
            if (t !== !1 && /^\s*$/.test(e)) return n
        }
    }), u = s.add({
        name: "equalTo",
        msg: "\u4e24\u6b21\u8f93\u5165\u4e0d\u4e00\u81f4\uff01",
        validator: function (e, t, n) {
            var r = $(t);
            return r.length && (t = r.val()), e === t ? undefined : n
        }
    }), a = s.add({
        name: "min",
        msg: "\u8f93\u5165\u503c\u4e0d\u80fd\u5c0f\u4e8e{0}\uff01",
        validator: function (e, t, r) {
            BUI.isString(e) && (e = e.replace(/\,/g, ""));
            if (e !== "" && n(e) < n(t)) return r
        }
    }), f = s.add({
        name: "max",
        msg: "\u8f93\u5165\u503c\u4e0d\u80fd\u5927\u4e8e{0}\uff01",
        validator: function (e, t, r) {
            BUI.isString(e) && (e = e.replace(/\,/g, ""));
            if (e !== "" && n(e) > n(t)) return r
        }
    }), l = s.add({
        name: "length", msg: "\u8f93\u5165\u503c\u957f\u5ea6\u4e3a{0}\uff01", validator: function (e, t, n) {
            if (e != null) {
                e = $.trim(e.toString());
                if (t != e.length) return n
            }
        }
    }), c = s.add({
        name: "minlength",
        msg: "\u8f93\u5165\u503c\u957f\u5ea6\u4e0d\u5c0f\u4e8e{0}\uff01",
        validator: function (e, t, n) {
            if (e != null) {
                e = $.trim(e.toString());
                var r = e.length;
                if (r < t) return n
            }
        }
    }), h = s.add({
        name: "maxlength",
        msg: "\u8f93\u5165\u503c\u957f\u5ea6\u4e0d\u5927\u4e8e{0}\uff01",
        validator: function (e, t, n) {
            if (e) {
                e = $.trim(e.toString());
                var r = e.length;
                if (r > t) return n
            }
        }
    }), p = s.add({
        name: "regexp", msg: "\u8f93\u5165\u503c\u4e0d\u7b26\u5408{0}\uff01", validator: function (e, t, n) {
            if (t) return t.test(e) ? undefined : n
        }
    }), d = s.add({
        name: "email",
        msg: "\u4e0d\u662f\u6709\u6548\u7684\u90ae\u7bb1\u5730\u5740\uff01",
        validator: function (e, t, n) {
            e = $.trim(e);
            if (e) return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e) ? undefined : n
        }
    }), v = s.add({
        name: "date",
        msg: "\u4e0d\u662f\u6709\u6548\u7684\u65e5\u671f\uff01",
        validator: function (e, t, n) {
            if (BUI.isNumber(e)) return;
            if (BUI.isDate(e)) return;
            e = $.trim(e);
            if (e) return BUI.Date.isDateString(e) ? undefined : n
        }
    }), m = s.add({
        name: "minDate",
        msg: "\u8f93\u5165\u65e5\u671f\u4e0d\u80fd\u5c0f\u4e8e{0}\uff01",
        validator: function (e, t, n) {
            if (e) {
                var i = r(e);
                if (i && i < r(t)) return n
            }
        }
    }), g = s.add({
        name: "maxDate",
        msg: "\u8f93\u5165\u65e5\u671f\u4e0d\u80fd\u5927\u4e8e{0}\uff01",
        validator: function (e, t, n) {
            if (e) {
                var i = r(e);
                if (i && i > r(t)) return n
            }
        }
    }), y = s.add({
        name: "mobile",
        msg: "\u4e0d\u662f\u6709\u6548\u7684\u624b\u673a\u53f7\u7801\uff01",
        validator: function (e, t, n) {
            e = $.trim(e);
            if (e) return /^\d{11}$/.test(e) ? undefined : n
        }
    }), b = s.add({
        name: "number",
        msg: "\u4e0d\u662f\u6709\u6548\u7684\u6570\u5b57\uff01",
        validator: function (e, t, n) {
            if (BUI.isNumber(e)) return;
            return e = e.replace(/\,/g, ""), isNaN(e) ? n : undefined
        }
    }), x = s.add({
        name: "dateRange",
        msg: "\u7ed3\u675f\u65e5\u671f\u4e0d\u80fd\u5c0f\u4e8e\u8d77\u59cb\u65e5\u671f\uff01",
        validator: S
    }), T = s.add({
        name: "numberRange",
        msg: "\u7ed3\u675f\u6570\u5b57\u4e0d\u80fd\u5c0f\u4e8e\u5f00\u59cb\u6570\u5b57\uff01",
        validator: S
    }), k = s.add({
        name: "checkRange",
        msg: "\u5fc5\u987b\u9009\u4e2d{0}\u9879\uff01",
        validator: function (e, t, n, r) {
            var i = N(r), s, o = t;
            if (i && o) {
                s = e[i];
                if (!C(s, o)) return n
            }
            return null
        }
    });
    return s
}), define("bui/form/remote", ["bui/common"], function (e) {
    var t = e("bui/common"), n = function () {
    };
    n.ATTRS = {isLoading: {}, loadingEl: {}}, n.prototype = {
        getLoadingContainer: function () {
        }, _setLoading: function () {
            var e = this, t = e.get("loadingEl"), n = e.get("loadingTpl");
            n && !t && (t = $(n).appendTo(e.getLoadingContainer()), e.setInternal("loadingEl", t))
        }, _clearLoading: function () {
            var e = this, t = e.get("loadingEl");
            t && (t.remove(), e.setInternal("loadingEl", null))
        }, _uiSetIsLoading: function (e) {
            var t = this;
            e ? t._setLoading() : t._clearLoading()
        }
    };
    var r = function () {
    };
    return r.ATTRS = {
        defaultRemote: {
            value: {
                method: "GET", cache: !0, callback: function (e) {
                    return e
                }
            }
        },
        remoteDaly: {value: 500},
        cacheMap: {value: {}},
        loadingTpl: {
            view: !0,
            value: '<img src="http://img02.taobaocdn.com/tps/i2/T1NU8nXCVcXXaHNz_X-16-16.gif" alt="loading"/>'
        },
        isLoading: {view: !0, value: !1},
        remote: {
            setter: function (e) {
                return t.isString(e) && (e = {url: e}), e
            }
        },
        remoteHandler: {},
        events: {value: {remotecomplete: !1, remotestart: !1}}
    }, r.prototype = {
        __bindUI: function () {
            var e = this;
            e.on("valid", function (t) {
                if (e.get("remote") && e.isValid() && !e.get("pauseValid")) {
                    var n = e.getControlValue(), r = e.getRemoteParams();
                    e._startRemote(r, n)
                }
            }), e.on("error", function (t) {
                e.get("remote") && e._cancelRemote()
            })
        }, _startRemote: function (e, t) {
            function o() {
                n._remoteValid(e, r, t), n.set("isLoading", !0)
            }

            var n = this, r = n.get("remoteHandler"), i = n.get("cacheMap"), s = n.get("remoteDaly");
            r && n._cancelRemote(r);
            if (i[t] != null) {
                n._validResult(n._getCallback(), i[t]);
                return
            }
            r = setTimeout(o, s), n.setInternal("remoteHandler", r)
        }, _validResult: function (e, t) {
            var n = this, r = e(t);
            n.onRemoteComplete(r, t)
        }, onRemoteComplete: function (e, t, n) {
            var r = this;
            n == r.get("remoteHandler") && (r.fire("remotecomplete", {
                error: e,
                data: t
            }), r.set("isLoading", !1), r.setInternal("remoteHandler", null))
        }, _getOptions: function (e) {
            var n = this, r = n.get("remote"), i = n.get("defaultRemote"), s = t.merge(i, r, {data: e});
            return s
        }, _getCallback: function () {
            return this._getOptions().callback
        }, _remoteValid: function (e, t, n) {
            var r = this, i = r.get("cacheMap"), s = r._getOptions(e);
            s.success = function (e) {
                var o = s.callback, u = o(e);
                i[n] = e, r.onRemoteComplete(u, e, t)
            }, s.error = function (e, n, i) {
                r.onRemoteComplete(i, null, t)
            }, r.fire("remotestart", {data: e}), $.ajax(s)
        }, getRemoteParams: function () {
        }, clearCache: function () {
            this.set("cacheMap", {})
        }, _cancelRemote: function (e) {
            var t = this;
            e = e || t.get("remoteHandler"), e && (clearTimeout(e), t.setInternal("remoteHandler", null)), t.set("isLoading", !1)
        }
    }, r.View = n, r
}), define("bui/select", ["bui/common", "bui/select/select", "bui/select/combox", "bui/select/suggest"], function (e) {
    var t = e("bui/common"), n = t.namespace("Select");
    return t.mix(n, {
        Select: e("bui/select/select"),
        Combox: e("bui/select/combox"),
        Suggest: e("bui/select/suggest")
    }), n
}), define("bui/select/select", ["bui/common", "bui/picker"], function (e) {
    "use strict";

    function i(e) {
        if ($.isPlainObject(e)) {
            var n = [];
            return t.each(e, function (e, t) {
                n.push({value: t, text: e})
            }), n
        }
        var r = [];
        return t.each(e, function (e, n) {
            t.isString(e) ? r.push({value: e, text: e}) : r.push(e)
        }), r
    }

    var t = e("bui/common"), n = e("bui/picker").ListPicker, r = t.prefix, s = t.Component, o = n,
        u = r + "select-input", a = s.Controller.extend({
            initializer: function () {
                var e = this, t = e.get("multipleSelect"), n, s = e.get("picker");
                s ? e.get("valueField") && s.set("valueField", e.get("valueField")) : (n = t ? "listbox" : "simple-list", s = new o({
                    children: [{
                        xclass: n,
                        elCls: r + "select-list",
                        store: e.get("store"),
                        items: i(e.get("items"))
                    }], valueField: e.get("valueField")
                }), e.set("picker", s)), t && s.set("hideEvent", "")
            }, renderUI: function () {
                var e = this, t = e.get("picker"), n = e.get("el"), r = n.find("." + e.get("inputCls"));
                t.set("trigger", n), t.set("triggerEvent", e.get("triggerEvent")), t.set("autoSetValue", e.get("autoSetValue")), t.set("textField", r), t.render(), e.set("list", t.get("list"))
            }, bindUI: function () {
                var e = this, t = e.get("picker"), n = t.get("list"), r = n.get("store");
                t.on("selectedchange", function (t) {
                    e.fire("change", {text: t.text, value: t.value, item: t.item})
                }), n.on("itemsshow", function () {
                    e._syncValue()
                }), t.on("show", function () {
                    e.get("forceFit") && t.set("width", e.get("el").outerWidth())
                })
            }, containsElement: function (e) {
                var t = this, n = t.get("picker");
                return s.Controller.prototype.containsElement.call(this, e) || n.containsElement(e)
            }, _uiSetItems: function (e) {
                if (!e) return;
                var t = this, n = t.get("picker"), r = n.get("list");
                r.set("items", i(e)), t._syncValue()
            }, _syncValue: function () {
                var e = this, t = e.get("picker"), n = e.get("valueField");
                n && t.setSelectedValue($(n).val())
            }, _uiSetName: function (e) {
                var t = this, n = t._getTextEl();
                e && n.attr("name", e)
            }, _uiSetWidth: function (e) {
                var t = this;
                if (e != null) {
                    var n = t._getTextEl(), r = t.get("el").find(".x-icon"), i = n.outerWidth() - n.width(),
                        s = t.get("picker"), o = e - r.outerWidth() - i;
                    n.width(o), t.get("forceFit") && s.set("width", e)
                }
            }, _uiSetDisabled: function (e) {
                var t = this, n = t.get("picker"), r = t._getTextEl();
                n.set("disabled", e), r && r.attr("disabled", e)
            }, _getTextEl: function () {
                var e = this, t = e.get("el");
                return t.find("." + e.get("inputCls"))
            }, destructor: function () {
                var e = this, t = e.get("picker");
                t && t.destroy()
            }, _getList: function () {
                var e = this, t = e.get("picker"), n = t.get("list");
                return n
            }, getSelectedValue: function () {
                return this.get("picker").getSelectedValue()
            }, setSelectedValue: function (e) {
                var t = this, n = t.get("picker");
                n.setSelectedValue(e)
            }, getSelectedText: function () {
                return this.get("picker").getSelectedText()
            }
        }, {
            ATTRS: {
                picker: {},
                list: {},
                valueField: {},
                store: {},
                focusable: {value: !0},
                multipleSelect: {value: !1},
                name: {},
                items: {sync: !1},
                inputCls: {value: u},
                forceFit: {value: !0},
                events: {value: {change: !1}},
                tpl: {
                    view: !0,
                    value: '<input type="text" readonly="readonly" class="' + u + '"/><span class="x-icon x-icon-normal"><i class="icon icon-caret icon-caret-down"></i></span>'
                },
                triggerEvent: {value: "click"}
            }
        }, {xclass: "select"});
    return a
}), define("bui/select/combox", ["bui/common", "bui/select/select"], function (e) {
    var t = e("bui/common"), n = e("bui/select/select"), r = t.prefix + "combox-input", i = n.extend({
        renderUI: function () {
            var e = this, t = e.get("picker");
            t.set("autoFocused", !1)
        }, _uiSetItems: function (e) {
            var n = this;
            for (var r = 0; r < e.length; r++) {
                var s = e[r];
                t.isString(s) && (e[r] = {value: s, text: s})
            }
            i.superclass._uiSetItems.call(n, e)
        }, bindUI: function () {
            var e = this, t = e.get("picker"), n = t.get("list"), r = t.get("textField");
            $(r).on("keyup", function (e) {
                var t = n.getSelected();
                t && n.clearItemStatus(t)
            })
        }
    }, {
        ATTRS: {
            tpl: {view: !0, value: '<input type="text" class="' + r + '"/>'},
            inputCls: {value: r}
        }
    }, {xclass: "combox"});
    return i
}), define("bui/select/suggest", ["bui/common", "bui/select/combox"], function (e) {
    "use strict";
    var t = e("bui/common"), n = e("bui/select/combox"), r = 200, i = "", s = n.extend({
        bindUI: function () {
            var e = this, t = e.get("el").find("input"),
                n = e.get("triggerEvent") === "keyup" ? "keyup" : "keyup click";
            t.on(n, function () {
                e._start()
            })
        }, _start: function () {
            var e = this;
            e._timer = e.later(function () {
                e._updateContent()
            }, r)
        }, _updateContent: function () {
            var e = this, t = e.get("data"), n = e.get("el").find("input"), r;
            if (!t && n.val() === e.get("query")) return;
            e.set("query", n.val()), r = n.val();
            if (!t && !r) return;
            var i = e.get("cacheable"), s = e.get("url"), o = e.get("data");
            if (i && s) {
                var u = e.get("dataCache");
                u[r] !== undefined ? e._handleResponse(u[r]) : e._requestData()
            } else s ? e._requestData() : o && e._handleResponse(o, !0)
        }, _getStore: function () {
            var e = this, t = e.get("picker"), n = t.get("list");
            if (n) return n.get("store")
        }, _requestData: function () {
            var e = this, t = e.get("el").find("input"), n = e.get("callback"), r = e.get("store"), i = {};
            i[t.attr("name")] = t.val(), r ? (i.start = 0, r.load(i, n)) : $.ajax({
                url: e.get("url"),
                type: "post",
                dataType: e.get("dataType"),
                data: i,
                success: function (t) {
                    e._handleResponse(t), n && n(t)
                }
            })
        }, _handleResponse: function (e, t) {
            var n = this, r = t ? n._getFilterItems(e) : e;
            n.set("items", r), n.get("cacheable") && (n.get("dataCache")[n.get("query")] = r)
        }, _getItemText: function (e) {
            var t = this, n = t.get("picker"), r = n.get("list");
            return r ? r.getItemText(e) : ""
        }, _getFilterItems: function (e) {
            function u(e, n) {
                t.isString(n) ? r.push(e) : r.push(n)
            }

            var n = this, r = [], i = n.get("el").find("input"), s = i.val(), o = n.get("data"
            );
            return e = e || [], t.each(e, function (e) {
                var r = t.isString(e) ? e : n._getItemText(e);
                o ? r.indexOf($.trim(s)) !== -1 && u(r, e) : u(r, e)
            }), r
        }, later: function (e, t, n) {
            t = t || 0;
            var r = n ? setInterval(e, t) : setTimeout(e, t);
            return {
                id: r, interval: n, cancel: function () {
                    this.interval ? clearInterval(r) : clearTimeout(r)
                }
            }
        }
    }, {
        ATTRS: {
            data: {value: null},
            query: {value: i},
            cacheable: {value: !1},
            dataCache: {shared: !1, value: {}},
            dataType: {value: "jsonp"},
            url: {},
            callback: {},
            triggerEvent: {
                valueFn: function () {
                    return this.get("data") ? "click" : "keyup"
                }
            },
            autoSetValue: {value: !1}
        }
    }, {xclass: "suggest"});
    return s
}), define("bui/mask", ["bui/common", "bui/mask/mask", "bui/mask/loadmask"], function (e) {
    var t = e("bui/common"), n = e("bui/mask/mask");
    return n.LoadMask = e("bui/mask/loadmask"), n
}), define("bui/mask/mask", ["bui/common"], function (e) {
    var t = e("bui/common"), n = t.namespace("Mask"), r = t.UA, i = t.prefix + "ext-mask", s = i + "-msg";
    return t.mix(n, {
        maskElement: function (e, n, o) {
            var u = $(e), a = $("." + i, u), f = null, l = null, c = null, h = null;
            if (!a.length) {
                a = $('<div class="' + i + '"></div>').appendTo(u), u.addClass("x-masked-relative x-masked"), r.ie === 6 && a.height(u.height());
                if (n) {
                    f = ['<div class="' + s + '"><div>', n, "</div></div>"].join(""), l = $(f).appendTo(u), o && l.addClass(o);
                    try {
                        c = (u.height() - l.height()) / 2, h = (u.width() - l.width()) / 2, l.css({left: h, top: c})
                    } catch (p) {
                        t.log("mask error occurred")
                    }
                }
            }
            return a
        }, unmaskElement: function (e) {
            var t = $(e), n = t.children("." + s), r = t.children("." + i);
            n && n.remove(), r && r.remove(), t.removeClass("x-masked-relative x-masked")
        }
    }), n
}),define("bui/mask/loadmask", ["bui/mask/mask"], function (e) {
    function n(e) {
        var t = this;
        n.superclass.constructor.call(t, e)
    }

    var t = e("bui/mask/mask");
    return BUI.extend(n, BUI.Base), n.ATTRS = {
        el: {},
        msg: {value: "Loading..."},
        msgCls: {value: "x-mask-loading"},
        disabled: {value: !1}
    }, BUI.augment(n, {
        disable: function () {
            this.set("disabled", !0)
        }, onLoad: function () {
            t.unmaskElement(this.get("el"))
        }, onBeforeLoad: function () {
            var e = this;
            e.get("disabled") || t.maskElement(e.get("el"), e.get("msg"), this.get("msgCls"))
        }, show: function () {
            this.onBeforeLoad()
        }, hide: function () {
            this.onLoad()
        }, destroy: function () {
            this.hide(), this.clearAttrVals(), this.off()
        }
    }), n
}),define("bui/menu", ["bui/common", "bui/menu/menu", "bui/menu/menuitem", "bui/memu/contextmenu", "bui/menu/popmenu", "bui/menu/sidemenu"], function (e) {
    var t = e("bui/common"), n = t.namespace("Menu");
    return t.mix(n, {
        Menu: e("bui/menu/menu"),
        MenuItem: e("bui/menu/menuitem"),
        ContextMenu: e("bui/memu/contextmenu"),
        PopMenu: e("bui/menu/popmenu"),
        SideMenu: e("bui/menu/sidemenu")
    }), n.ContextMenuItem = n.ContextMenu.Item, n
}),define("bui/menu/menuitem", ["bui/common"], function (e) {
    var t = e("bui/common"), n = t.Component, r = n.UIBase, i = t.prefix, s = i + "menu-item-open", o = "x-caret",
        u = i + "menu-item-collapsed", a = "data-id", f = n.View.extend([r.ListItemView, r.CollapsableView], {
            _uiSetOpen: function (e) {
                var t = this, n = t.getStatusCls("open");
                e ? t.get("el").addClass(n) : t.get("el").removeClass(n)
            }
        }, {ATTRS: {}}, {xclass: "menu-item-view"}), l = n.Controller.extend([r.ListItem, r.Collapsable], {
            renderUI: function () {
                var e = this, n = e.get("el"), r = e.get("id"), i = null;
                r || (r = t.guid("menu-item"), e.set("id", r)), n.attr(a, r)
            }, handleMouseEnter: function (e) {
                var t = this;
                this.get("subMenu") && this.get("openable") && this.set("open", !0), l.superclass.handleMouseEnter.call(this, e)
            }, handleMouseLeave: function (e) {
                if (this.get("openable")) {
                    var t = this, n = t.get("subMenu"), r = e.toElement || e.relatedTarget;
                    r && n && n.containsElement(r) ? t.set("open", !0) : t.set("open", !1)
                }
                l.superclass.handleMouseLeave.call(this, e)
            }, containsElement: function (e) {
                var t = this, n, r = l.superclass.containsElement.call(t, e);
                return r || (n = t.get("subMenu"), r = n && n.containsElement(e)), r
            }, _uiSetOpen: function (e) {
                if (this.get("openable")) {
                    var t = this, n = t.get("subMenu"), r = t.get("subMenuAlign");
                    if (n) if (e) r.node = t.get("el"), n.set("align", r), n.show(); else {
                        var i = n.get("align");
                        (!i || i.node == t.get("el")) && n.hide()
                    }
                }
            }, _uiSetSubMenu: function (e) {
                if (e) {
                    var t = this, n = t.get("el"), r = t.get("parent");
                    e.get("parentMenu") || (e.set("parentMenu", r), r.get("autoHide") && (r.get("autoHideType") == "click" ? e.set("autoHide", !1) : e.set("autoHideType", "leave"))), $(t.get("arrowTpl")).appendTo(n)
                }
            }, destructor: function () {
                var e = this, t = e.get("subMenu");
                t && t.destroy()
            }
        }, {
            ATTRS: {
                elTagName: {value: "li"},
                xview: {value: f},
                open: {view: !0, value: !1},
                openable: {value: !0},
                subMenu: {view: !0},
                subMenuAlign: {
                    valueFn: function (e) {
                        return {points: ["tr", "tl"], offset: [-5, 0]}
                    }
                },
                arrowTpl: {value: '<span class="' + o + " " + o + '-left"></span>'},
                events: {value: {afterOpenChange: !0}},
                subMenuType: {value: "pop-menu"}
            }, PARSER: {
                subMenu: function (e) {
                    var n = e.find("ul"), r = this.get("subMenuType"), i;
                    return n && n.length && (i = t.Component.create({
                        srcNode: n,
                        xclass: r
                    }), r == "pop-menu" ? (n.appendTo("body"), i.setInternal({
                        autoHide: !0,
                        autoHideType: "leave"
                    })) : this.get("children").push(i)), i
                }
            }
        }, {xclass: "menu-item", priority: 0}), c = l.extend({}, {
            ATTRS: {
                focusable: {value: !1},
                selectable: {value: !1},
                handleMouseEvents: {value: !1}
            }
        }, {xclass: "menu-item-sparator"});
    return l.View = f, l.Separator = c, l
}),define("bui/menu/menu", ["bui/common"], function (e) {
    var t = e("bui/common"), n = t.Component, r = n.UIBase, i = n.Controller.extend([r.ChildList], {
        bindUI: function () {
            var e = this;
            e.on("click", function (t) {
                var n = t.target, r = e.get("multipleSelect");
                e != n && !r && e.get("clickHide") && !n.get("subMenu") && e.getTopAutoHideMenu().hide()
            }), e.on("afterOpenChange", function (n) {
                var r = n.target, i = n.newVal, s = e.get("children");
                i && t.each(s, function (e) {
                    e !== r && e.get("open") && e.set("open", !1)
                })
            }), e.on("afterVisibleChange", function (t) {
                var n = t.newVal, r = e.get("parentMenu");
                e._clearOpen()
            })
        }, getTopAutoHideMenu: function () {
            var e = this, t = e.get("parentMenu"), n;
            return t && t.get("autoHide") ? t.getTopAutoHideMenu() : e.get("autoHide") ? e : null
        }, _clearOpen: function () {
            var e = this, n = e.get("children");
            t.each(n, function (e) {
                e.set && e.set("open", !1)
            })
        }, findItemById: function (e) {
            return this.findItemByField("id", e)
        }, _uiSetSelectedItem: function (e) {
            e && _self.setSelected(e)
        }
    }, {
        ATTRS: {
            elTagName: {view: !0, value: "ul"},
            idField: {value: "id"},
            isDecorateChild: {value: !0},
            defaultChildClass: {value: "menu-item"},
            selectedItem: {},
            parentMenu: {}
        }
    }, {xclass: "menu", priority: 0});
    return i
}),define("bui/menu/popmenu", ["bui/common", "bui/menu/menu"], function (e) {
    var t = e("bui/common"), n = t.Component.UIBase, r = e("bui/menu/menu"),
        i = t.Component.View.extend([n.PositionView], {}),
        s = r.extend([n.Position, n.Align, n.AutoShow, n.AutoHide], {}, {
            ATTRS: {
                clickHide: {value: !0},
                align: {value: {points: ["bl", "tl"], offset: [0, 0]}},
                visibleMode: {value: "visibility"},
                autoHide: {value: !0},
                visible: {value: !1},
                xview: {value: i}
            }
        }, {xclass: "pop-menu"});
    return s
}),define("bui/memu/contextmenu", ["bui/common", "bui/menu/menuitem", "bui/menu/popmenu"], function (e) {
    var t = e("bui/common"), n = e("bui/menu/menuitem"), r = e("bui/menu/popmenu"), i = t.prefix,
        s = i + "menu-item-link", o = i + "menu-item-icon", u = t.Component, a = u.UIBase, f = n.extend({
            bindUI: function () {
                var e = this;
                e.get("el").delegate("." + s, "click", function (e) {
                    e.preventDefault()
                })
            }, _uiSetIconCls: function (e, t) {
                var n = this, r = t.prevVal, i = n.get("el").find("." + o);
                i.removeClass(r), i.addClass(e)
            }
        }, {
            ATTRS: {
                text: {veiw: !0, value: ""},
                iconCls: {sync: !1, value: ""},
                tpl: {value: '<a class="' + s + '" href="#">        <span class="' + o + ' {iconCls}"></span><span class="' + i + 'menu-item-text">{text}</span></a>'}
            }
        }, {xclass: "context-menu-item"}), l = r.extend({}, {
            ATTRS: {
                defaultChildClass: {value: "context-menu-item"},
                align: {value: null}
            }
        }, {xclass: "context-menu"});
    return l.Item = f, l
}),define("bui/menu/sidemenu", ["bui/common", "bui/menu/menu"], function (e) {
    var t = e("bui/common"), n = e("bui/menu/menu"), r = t.Component, i = t.prefix + "menu-title", s = "menu-leaf",
        o = n.extend({
            initializer: function () {
                var e = this, n = e.get("items"), r = e.get("children");
                t.each(n, function (t) {
                    var n = e._initMenuCfg(t);
                    r.push(n)
                })
            }, bindUI: function () {
                var e = this, n = e.get("children");
                t.each(n, function (e) {
                    var t = e.get("children")[0];
                    t && t.publish("click", {bubbles: 1})
                }), e.get("el").delegate("a", "click", function (e) {
                    e.preventDefault()
                }), e.on("itemclick", function (t) {
                    var n = t.item, r = $(t.domTarget).closest("." + e.get("collapsedCls"));
                    if (r.length) {
                        var i = n.get("collapsed");
                        n.set("collapsed", !i)
                    } else n.get("el").hasClass(s) && (e.fire("menuclick", {item: n}), e.clearSelection(), e.setSelected(n))
                })
            }, getItems: function () {
                var e = this, n = [], r = e.get("children");
                return t.each(r, function (e) {
                    var t = e.get("children")[0];
                    n = n.concat(t.get("children"))
                }), n
            }, _initMenuCfg: function (e) {
                var n = this, r = e.items, i = [], s = {selectable: !1, children: [{xclass: "menu", children: i}]};
                return t.mix(s, {xclass: "menu-item", elCls: "menu-second"}, e), t.each(r, function (e) {
                    var t = n._initSubMenuCfg(e);
                    i.push(t)
                }), s
            }, _initSubMenuCfg: function (e) {
                var n = this, r = {xclass: "menu-item", elCls: "menu-leaf", tpl: n.get("subMenuItemTpl")};
                return t.mix(r, e)
            }
        }, {
            ATTRS: {
                defaultChildCfg: {value: {subMenuType: "menu", openable: !1, arrowTpl: ""}},
                autoInitItems: {value: !1},
                itemTpl: {value: '<div class="' + i + '"><s></s><span class="' + i + '-text">{text}</span></div>'},
                subMenuItemTpl: {value: '<a href="{href}"><em>{text}</em></a>'},
                collapsedCls: {value: i},
                events: {value: {menuclick: !1}}
            }
        }, {xclass: "side-menu"});
    return o
}),define("bui/tab", ["bui/common", "bui/tab/tab", "bui/tab/tabitem", "bui/tab/navtabitem", "bui/tab/navtab", "bui/tab/tabpanel", "bui/tab/tabpanelitem"], function (e) {
    var t = e("bui/common"), n = t.namespace("Tab");
    return t.mix(n, {
        Tab: e("bui/tab/tab"),
        TabItem: e("bui/tab/tabitem"),
        NavTabItem: e("bui/tab/navtabitem"),
        NavTab: e("bui/tab/navtab"),
        TabPanel: e("bui/tab/tabpanel"),
        TabPanelItem: e("bui/tab/tabpanelitem")
    }), n
}),define("bui/tab/panelitem", function (e) {
    var t = function () {
    };
    return t.ATTRS = {
        panel: {},
        panelContent: {},
        panelVisibleStatus: {value: "selected"},
        defaultLoaderCfg: {
            valueFn: function () {
                var e = this, t = e._getVisibleEvent();
                return {property: "panelContent", autoLoad: !1, lazyLoad: {event: t}, loadMask: {el: e.get("panel")}}
            }
        },
        panelDestroyable: {value: !0}
    }, BUI.augment(t, {
        __renderUI: function () {
            this._resetPanelVisible()
        }, __bindUI: function () {
            var e = this, t = e._getVisibleEvent();
            e.on(t, function (t) {
                e._setPanelVisible(t.newVal)
            })
        }, _resetPanelVisible: function () {
            var e = this, t = e.get("panelVisibleStatus"), n = e.get(t);
            e._setPanelVisible(n)
        }, _getVisibleEvent: function () {
            var e = this, t = e.get("panelVisibleStatus");
            return "after" + BUI.ucfirst(t) + "Change"
        }, _setPanelVisible: function (e) {
            var t = this, n = t.get("panel"), r = e ? "show" : "hide";
            n && $(n)[r]()
        }, __destructor: function () {
            var e = this, t = e.get("panel");
            t && e.get("panelDestroyable") && $(t).remove()
        }, _setPanelContent: function (e, t) {
            var n = $(e);
            $(e).html(t)
        }, _uiSetPanelContent: function (e) {
            var t = this, n = t.get("panel");
            t._setPanelContent(n, e)
        }, _uiSetPanel: function (e) {
            var t = this, n = t.get("panelContent");
            n && t._setPanelContent(e, n), t._resetPanelVisible()
        }
    }), t
}),define("bui/tab/panels", function (e) {
    var t = function () {
    };
    return t.ATTRS = {panelTpl: {}, panelContainer: {}, panelCls: {}}, BUI.augment(t, {
        __renderUI: function () {
            var e = this, t = e.get("children"), n = e._initPanelContainer(), r = e.get("panelCls"),
                i = r ? n.find("." + i) : n.children();
            BUI.each(t, function (t, n) {
                var r = i[n];
                e._initPanelItem(t, r)
            })
        }, __bindUI: function () {
            var e = this;
            e.on("beforeAddChild", function (t) {
                var n = t.child;
                e._initPanelItem(n)
            })
        }, _initPanelContainer: function () {
            var e = this, t = e.get("panelContainer");
            return t && BUI.isString(t) && (t.indexOf("#") == 0 ? t = $(t) : t = e.get("el").find(t), e.setInternal("panelContainer", t)), t
        }, _initPanelItem: function (e, t) {
            var n = this;
            e.set ? e.get("panel") || (t = t || n._getPanel(e.get("userConfig")), e.set("panel", t)) : e.panel || (t = t || n._getPanel(e), e.panel = t)
        }, _getPanel: function (e) {
            var t = this, n = t.get("panelContainer"), r = BUI.substitute(t.get("panelTpl"), e);
            return $(r).appendTo(n)
        }
    }), t
}),define("bui/tab/navtabitem", ["bui/common"], function (e) {
    var t = e("bui/common"), n = t.Component, r = "tab-item-title", i = "tab-item-close", s = "tab-item-inner",
        o = "tab-nav-actived", u = "tab-content", a = n.View.extend({
            renderUI: function () {
                var e = this, t = e.get("tabContentContainer"), n = e.get("tabContentTpl");
                if (t) {
                    var r = $(n).appendTo(t);
                    e.set("tabContentEl", r)
                }
            }, _uiSetHref: function (e) {
                this._setHref(e)
            }, _setHref: function (e) {
                var t = this, n = t.get("tabContentEl");
                e = e || t.get("href"), n && $("iframe", n).attr("src", e)
            }, resetHref: function () {
                this._setHref()
            }, _uiSetTitle: function (e) {
                var t = this, n = t.get("el");
                $("." + r, n).html(e)
            }, _uiSetActived: function (e) {
                var t = this, n = t.get("el");
                t.setTabContentVisible(e), e ? n.addClass(o) : n.removeClass(o)
            }, destructor: function () {
                var e = this, t = e.get("tabContentEl");
                t && t.remove()
            }, setTabContentVisible: function (e) {
                var t = this, n = t.get("tabContentEl");
                n && (e ? n.show() : n.hide())
            }
        }, {ATTRS: {tabContentContainer: {}, tabContentEl: {}, title: {}, href: {}}}), f = n.Controller.extend({
            createDom: function () {
                var e = this, t = e.get("parent");
                t && e.set("tabContentContainer", t.getTabContentContainer())
            }, bindUI: function () {
                var e = this, t = e.get("el"), n = e.get("events");
                t.on("click", function (t) {
                    var n = $(t.target);
                    n.hasClass(i) && e.fire("closing") !== !1 && e.close()
                })
            }, handleDblClick: function (e) {
                var t = this;
                t.get("closeable") && t.fire("closing") !== !1 && t.close(), t.fire("dblclick", {
                    domTarget: e.target,
                    domEvent: e
                })
            }, handleContextMenu: function (e) {
                e.preventDefault(), this.fire("showmenu", {position: {x: e.pageX, y: e.pageY}})
            }, setTitle: function (e) {
                this.set("title", e)
            }, close: function () {
                this.fire("closed")
            }, reload: function () {
                this.get("view").resetHref()
            }, show: function () {
                var e = this;
                e.get("el").show(500, function () {
                    e.set("visible", !0)
                })
            }, hide: function (e) {
                var t = this;
                this.get("el").hide(500, function () {
                    t.set("visible", !1), e && e()
                })
            }, _uiSetActived: function (e) {
                var t = this, n = t.get("parent");
                n && e && n._setItemActived(t)
            }, _uiSetCloseable: function (e) {
                var t = this, n = t.get("el"), r = n.find("." + i);
                e ? r.show() : r.hide()
            }
        }, {
            ATTRS: {
                elTagName: {value: "li"},
                actived: {view: !0, value: !1},
                closeable: {value: !0},
                allowTextSelection: {view: !1, value: !1},
                events: {value: {click: !0, closing: !0, closed: !0, showmenu: !0, afterVisibleChange: !0}},
                tabContentContainer: {view: !0},
                tabContentTpl: {
                    view: !0,
                    value: '<div class="' + u + '" style="display:none;"><iframe src="" width="100%" height="100%" frameborder="0"></iframe></div>'
                },
                href: {view: !0, value: ""},
                visible: {view: !0, value: !0},
                title: {view: !0, value: ""},
                tpl: {
                    view: !0,
                    value: '<s class="l"></s><div class="' + s + '">{icon}<span class="' + r + '"></span><s class="' + i + '"></s></div><s class="r"></s>'
                },
                xview: {value: a}
            }
        }, {xclass: "nav-tab-item", priority: 0});
    return f.View = a, f
}),define("bui/tab/navtab", ["bui/common", "bui/menu"], function (e) {
    var t = e("bui/common"), n = e("bui/menu"), r = t.Component, i = "tab-nav-list", s = "arrow-left",
        o = "arrow-right", u = t.prefix + "tab-force", a = "m_close", f = 140, l = r.View.extend({
            renderUI: function () {
                var e = this, t = e.get("el"), n = null;
                n = t.find("." + i), e.setInternal("listEl", n)
            }, getContentElement: function () {
                return this.get("listEl")
            }, getTabContentContainer: function () {
                return this.get("el").find(".tab-content-container")
            }, _uiSetHeight: function (e) {
                var t = this, n = t.get("el"), r = n.find(".tab-nav-bar"), i = t.getTabContentContainer();
                e && i.height(e - r.height()), n.height(e)
            }, _uiSetForceFit: function (e) {
                var t = this, n = t.get("el");
                e ? n.addClass(u) : n.removeClass(u)
            }
        }, {ATTRS: {forceFit: {}}}, {xclass: "nav-tab-view", priority: 0}), c = r.Controller.extend({
            addTab: function (e, n) {
                var r = this, i = e.id || t.guid("tab-item"), s = r.get("forceFit"), o = r.getItemById(i);
                if (o) {
                    var u = !1;
                    e.href && o.get("href") != e.href && (o.set("href", e.href), u = !0), r._setItemActived(o), n && !u && o.reload()
                } else e = t.mix({
                    id: i,
                    visible: !1,
                    actived: !0,
                    xclass: "nav-tab-item"
                }, e), o = r.addChild(e), s && r.forceFit(), o.show(), r._resetItemList();
                return o
            }, getTabContentContainer: function () {
                return this.get("view").getTabContentContainer()
            }, bindUI: function () {
                var e = this, t = e.get("forceFit");
                t || (e._bindScrollEvent(), e.on("afterVisibleChange", function (t) {
                    var n = t.target;
                    n.get("actived") && e._scrollToItem(n)
                })), e.on("click", function (t) {
                    var n = t.target;
                    n != e && (e._setItemActived(n), e.fire("itemclick", {item: n}))
                }), e.on("closed", function (t) {
                    var n = t.target;
                    e._closeItem(n)
                }), e.on("showmenu", function (t) {
                    e._showMenu(t.target, t.position)
                })
            }, _bindScrollEvent: function () {
                var e = this, t = e.get("el");
                t.find(".arrow-left").on("click", function () {
                    t.hasClass(s + "-active") && e._scrollLeft()
                }), t.find(".arrow-right").on("click", function () {
                    t.hasClass(o + "-active") && e._scrllRight()
                })
            }, _showMenu: function (e, t) {
                var n = this, r = n._getMenu(), i = e.get("closeable"), s;
                n.set("showMenuItem", e), r.set("xy", [t.x, t.y]), r.show(), s = r.getItem(a), s && s.set("disabled", !i)
            }, setActived: function (e) {
                var t = this, n = t.getItemById(e);
                t._setItemActived(n)
            }, getActivedItem: function () {
                var e = this, n = e.get("children"), r = null;
                return t.each(n, function (e) {
                    if (e.get("actived")) return r = e, !1
                }), r
            }, getItemById: function (e) {
                var n = this, r = n.get("children"), i = null;
                return t.each(r, function (t) {
                    if (t.get("id") === e) return i = t, !1
                }), i
            }, _getMenu: function () {
                var e = this;
                return e.get("menu") || e._initMenu()
            }, _initMenu: function () {
                var e = this, t = new n.ContextMenu({
                    children: [{
                        xclass: "context-menu-item",
                        iconCls: "icon icon-refresh",
                        text: "\u5237\u65b0",
                        listeners: {
                            click: function () {
                                var t = e.get("showMenuItem");
                                t && t.reload()
                            }
                        }
                    }, {
                        id: a,
                        xclass: "context-menu-item",
                        iconCls: "icon icon-remove",
                        text: "\u5173\u95ed",
                        listeners: {
                            click: function () {
                                var t = e.get("showMenuItem");
                                t && t.close()
                            }
                        }
                    }, {
                        xclass: "context-menu-item",
                        iconCls: "icon icon-remove-sign",
                        text: "\u5173\u95ed\u5176\u4ed6",
                        listeners: {
                            click: function () {
                                var t = e.get("showMenuItem");
                                t && e.closeOther(t)
                            }
                        }
                    }, {
                        xclass: "context-menu-item",
                        iconCls: "icon icon-remove-sign",
                        text: "\u5173\u95ed\u6240\u6709",
                        listeners: {
                            click: function () {
                                e.closeAll()
                            }
                        }
                    }]
                });
                return e.set("menu", t), t
            }, _closeItem: function (e) {
                var t = this, n = t._getIndex(e), r = t.getActivedItem(), i = t.get("preItem") || t._getItemByIndex(n - 1),
                    s = t._getItemByIndex(n + 1);
                e.hide(function () {
                    t.removeChild(e, !0), t._resetItemList(), r === e ? i ? t._setItemActived(i) : t._setItemActived(s) : t._scrollToItem(r), t.forceFit()
                })
            }, closeAll: function () {
                var e = this, n = e.get("children");
                t.each(n, function (e) {
                    e.get("closeable") && e.close()
                })
            }, closeOther: function (e) {
                var n = this, r = n.get("children");
                t.each(r, function (t) {
                    e !== t && t.close()
                })
            }, _getItemByIndex: function (e) {
                var t = this, n = t.get("children");
                return n[e]
            }, _getIndex: function (e) {
                var n = this, r = n.get("children");
                return t.Array.indexOf(e, r)
            }, _resetItemList: function () {
                if (this.get("forceFit")) return;
                var e = this, t = e.getContentElement();
                t.width(e._getTotalWidth())
            }, _getTotalWidth: function () {
                var e = this, t = e.get("children");
                return t.length * e.get("itemWidth")
            }, _getForceItemWidth: function () {
                var e = this, t = e.getContentElement().width(), n = e.get("children"), r = e._getTotalWidth(),
                    i = e.get(i);
                return r > t && (i = t / n.length), i
            }, forceFit: function () {
                var e = this;
                e._forceItemWidth(e._getForceItemWidth())
            }, _forceItemWidth: function (e) {
                e = e || this.get("itemWidth");
                var n = this, r = n.get("children");
                t.each(r, function (t) {
                    t.set("width", e)
                })
            }, _scrollToItem: function (e) {
                if (this.get("forceFit")) return;
                var t = this, n = t.getContentElement(), r = n.position(), i = t._getDistanceToEnd(e, n, r),
                    s = t._getDistanceToBegin(e, r);
                if (n.width() < n.parent().width()) t._scrollTo(n, 0); else if (s < 0) t._scrollTo(n, r.left - s); else if (i > 0) t._scrollTo(n, r.left + i * -1); else if (r.left < 0) {
                    var o = t._getLastDistance(n, r), u = 0;
                    o < 0 && (u = r.left - o, u = u < 0 ? u : 0, t._scrollTo(n, u))
                }
            }, _getDistanceToBegin: function (e, t) {
                var n = e.get("el").position();
                return n.left + t.left
            }, _getDistanceToEnd: function (e, t, n) {
                var r = this, t = t || r.getContentElement(), i = t.parent().width(), n = n || t.position(),
                    s = r._getDistanceToBegin(e, n), o = s + r.get("itemWidth") - i;
                return o
            }, _getLastDistance: function (e, t) {
                var n = this, r = n.get("children"), i = r[r.length - 1];
                return i ? n._getDistanceToEnd(i, e, t) : 0
            }, _scrollTo: function (e, t, n) {
                var r = this;
                e.animate({left: t}, 500, function () {
                    r._setArrowStatus(e)
                })
            }, _scrollLeft: function () {
                var e = this, t = e.getContentElement(), n = t.position(), r = e._getLastDistance(t, n), i;
                r > 0 && (i = r > e.get("itemWidth") ? e.get("itemWidth") : r, e._scrollTo(t, n.left - i))
            }, _scrllRight: function () {
                var e = this, t = e.getContentElement(), n = t.position(), r;
                n.left < 0 && (r = n.left + e.get("itemWidth"), r = r < 0 ? r : 0, e._scrollTo(t, r))
            }, _setArrowStatus: function (e, t) {
                e = e || this.getContentElement();
                var n = this, r = n.get("el"), i = t || e.position(), u = n._getLastDistance(e, t);
                i.left < 0 ? r.addClass(o + "-active") : r.removeClass(o + "-active"), u > 0 ? r.addClass(s + "-active") : r.removeClass(s + "-active")
            }, _setItemActived: function (e) {
                var t = this, n = t.getActivedItem();
                if (e === n) return;
                n && n.set("actived", !1), t.set("preItem", n), e && (e.get("actived") || e.set("actived", !0), e.get("visible") && t._scrollToItem(e), t.fire("activeChange", {item: e}), t.fire("activedchange", {item: e}))
            }
        }, {
            ATTRS: {
                defaultChildClass: {value: "nav-tab-item"},
                menu: {},
                forceFit: {view: !0, value: !1},
                itemWidth: {value: f},
                tpl: {
                    view: !0,
                    value: '<div class="tab-nav-bar"><s class="tab-nav-arrow arrow-left"></s><div class="tab-nav-wrapper"><div class="tab-nav-inner"><ul class="' + i + '"></ul></div></div><s class="tab-nav-arrow arrow-right"></s>' + "</div>" + '<div class="tab-content-container"></div>'
                },
                xview: {value: l},
                events: {value: {itemclick: !1, activedchange: !1}}
            }
        }, {xclass: "nav-tab", priority: 0});
    return c
}),define("bui/tab/tabitem", ["bui/common"], function (e) {
    var t = e("bui/common"), n = t.Component, r = n.UIBase,
        i = n.View.extend([r.ListItemView], {}, {xclass: "tab-item-view"}), s = n.Controller.extend([r.ListItem], {}, {
            ATTRS: {
                elTagName: {view: !0, value: "li"},
                xview: {value: i},
                tpl: {view: !0, value: '<span class="bui-tab-item-text">{text}</span>'}
            }
        }, {xclass: "tab-item"});
    return s.View = i, s
}),define("bui/tab/tab", ["bui/common"], function (e) {
    var t = e("bui/common"), n = t.Component, r = n.UIBase, i = n.Controller.extend([r.ChildList], {}, {
        ATTRS: {
            elTagName: {view: !0, value: "ul"},
            defaultChildClass: {value: "tab-item"}
        }
    }, {xclass: "tab"});
    return i
}),define("bui/tab/tabpanelitem", ["bui/common", "bui/tab/tabitem", "bui/tab/panelitem"], function (e) {
    var t = e("bui/common"), n = e("bui/tab/tabitem"), r = e("bui/tab/panelitem"), i = "bui-tab-item-text",
        s = t.Component, o = n.View.extend([s.UIBase.Close.View], {
            _uiSetTitle: function (e) {
                var t = this, n = t.get("el"), r = n.find("." + i);
                r.text(e)
            }
        }, {xclass: "tab-panel-item-view"}), u = n.extend([r, s.UIBase.Close], {}, {
            ATTRS: {
                closeAction: {value: "remove"},
                title: {view: !0, sync: !1},
                tpl: {value: '<span class="' + i + '">{text}{title}</span>'},
                closeable: {value: !1},
                events: {value: {beforeclosed: !0}},
                xview: {value: o}
            }
        }, {xclass: "tab-panel-item"});
    return u.View = o, u
}),define("bui/tab/tabpanel", ["bui/common", "bui/tab/tab", "bui/tab/panels"], function (e) {
    var t = e("bui/common"), n = e("bui/tab/tab"), r = e("bui/tab/panels"), i = n.extend([r], {
        bindUI: function () {
            var e = this;
            e.on("beforeclosed", function (t) {
                var n = t.target;
                e._beforeClosedItem(n)
            })
        }, _beforeClosedItem: function (e) {
            if (!e.get("selected")) return;
            var t = this, n = t.indexOfItem(e), r = t.getItemCount(), i, s;
            n !== r - 1 ? (s = t.getItemAt(n + 1), t.setSelected(s)) : n !== 0 && (i = t.getItemAt(n - 1), t.setSelected(i))
        }
    }, {
        ATTRS: {
            elTagName: {value: "div"},
            childContainer: {value: "ul"},
            tpl: {value: '<div class="tab-panel-inner"><ul></ul><div class="tab-panels"></div></div>'},
            panelTpl: {value: "<div></div>"},
            panelContainer: {value: ".tab-panels"},
            defaultChildClass: {value: "tab-panel-item"}
        }
    }, {xclass: "tab-panel"});
    return i
}),define("bui/toolbar", ["bui/common", "bui/toolbar/baritem", "bui/toolbar/bar", "bui/toolbar/pagingbar", "bui/toolbar/numberpagingbar"], function (e) {
    var t = e("bui/common"), n = t.namespace("Toolbar");
    return t.mix(n, {
        BarItem: e("bui/toolbar/baritem"),
        Bar: e("bui/toolbar/bar"),
        PagingBar: e("bui/toolbar/pagingbar"),
        NumberPagingBar: e("bui/toolbar/numberpagingbar")
    }), n
}),define("bui/toolbar/baritem", function () {
    var e = BUI.prefix, t = BUI.Component, n = t.UIBase, r = t.View.extend([n.ListItemView]),
        i = t.Controller.extend([n.ListItem], {
            renderUI: function () {
                var t = this.get("el");
                t.addClass(e + "inline-block"), t.attr("id") || t.attr("id", this.get("id"))
            }
        }, {
            ATTRS: {
                elTagName: {view: !0, value: "li"},
                selectable: {value: !1},
                focusable: {value: !1},
                xview: {value: r}
            }
        }, {xclass: "bar-item", priority: 1}), s = i.extend({
            _uiSetDisabled: function (t) {
                var n = this, r = n.get("el"), i = t ? "addClass" : "removeClass";
                r.find("button").attr("disabled", t)[i](e + "button-disabled")
            }, _uiSetChecked: function (t) {
                var n = this, r = n.get("el"), i = t ? "addClass" : "removeClass";
                r.find("button")[i](e + "button-checked")
            }, _uiSetText: function (e) {
                var t = this, n = t.get("el");
                n.find("button").text(e)
            }, _uiSetbtnCls: function (e) {
                var t = this, n = t.get("el");
                n.find("button").addClass(e)
            }
        }, {
            ATTRS: {
                checked: {value: !1},
                tpl: {view: !0, value: '<button type="button" class="{btnCls}">{text}</button>'},
                btnCls: {sync: !1},
                text: {sync: !1, value: ""}
            }
        }, {xclass: "bar-item-button", priority: 2}), o = i.extend({
            renderUI: function () {
                var e = this.get("el");
                e.attr("role", "separator")
            }
        }, {xclass: "bar-item-separator", priority: 2}),
        u = i.extend({}, {ATTRS: {width: {view: !0, value: 2}}}, {xclass: "bar-item-spacer", priority: 2}),
        a = i.extend({
            _uiSetText: function (e) {
                var t = this, n = t.get("el");
                n.html(e)
            }
        }, {ATTRS: {text: {value: ""}}}, {xclass: "bar-item-text", priority: 2});
    return i.types = {button: s, separator: o, spacer: u, text: a}, i
}),define("bui/toolbar/bar", function () {
    var e = BUI.Component, t = e.UIBase, n = e.View.extend({
        renderUI: function () {
            var e = this.get("el");
            e.attr("role", "toolbar"), e.attr("id") || e.attr("id", BUI.guid("bar"))
        }
    }), r = e.Controller.extend([t.ChildList], {
        getItem: function (e) {
            return this.getChild(e)
        }
    }, {
        ATTRS: {
            elTagName: {view: !0, value: "ul"},
            defaultChildClass: {value: "bar-item"},
            focusable: {value: !1},
            xview: {value: n}
        }
    }, {xclass: "bar", priority: 1});
    return r
}),define("bui/toolbar/pagingbar", ["bui/toolbar/bar"], function (e) {
    var t = e("bui/toolbar/bar"), n = BUI.Component, r = n.UIBase.Bindable, i = BUI.prefix, s = "first", o = "prev",
        u = "next", a = "last", f = "skip", l = "refresh", c = "totalPage", h = "curPage", p = "totalCount",
        d = [s, o, u, a, f, l], v = [c, h, p], m = t.extend([r], {
            initializer: function () {
                var e = this, t = e.get("children"), n = e.get("items"), r = e.get("store");
                n ? BUI.each(n, function (n, r) {
                    BUI.isString(n) && (BUI.Array.contains(n, d) ? n = e._getButtonItem(n) : BUI.Array.contains(n, v) ? n = e._getTextItem(n) : n = {xtype: n}), t.push(n)
                }) : (n = e._getItems(), BUI.each(n, function (e) {
                    t.push(e)
                })), r && r.get("pageSize") && e.set("pageSize", r.get("pageSize"))
            }, bindUI: function () {
                var e = this;
                e._bindButtonEvent()
            }, jumpToPage: function (e) {
                if (e <= 0 || e > this.get("totalPage")) return;
                var t = this, n = t.get("store"), r = t.get("pageSize"), i = e - 1, s = i * r,
                    o = t.fire("beforepagechange", {from: t.get("curPage"), to: e});
                n && o !== !1 && n.load({start: s, limit: r, pageIndex: i})
            }, _afterStoreLoad: function (e, t) {
                var n = this, r = n.get("pageSize"), i = 0, s, o, u, a;
                i = e.get("start"), o = e.getTotalCount(), s = o - i > r ? i + e.getCount() - 1 : o, a = parseInt((o + r - 1) / r, 10), a = a > 0 ? a : 1, u = parseInt(i / r, 10) + 1, n.set("start", i), n.set("end", s), n.set("totalCount", o), n.set("curPage", u), n.set("totalPage", a), n._setAllButtonsState(), n._setNumberPages()
            }, _bindButtonEvent: function () {
                function n() {
                    var t = parseInt(e._getCurrentPageValue(), 10);
                    e._isPageAllowRedirect(t) ? e.jumpToPage(t) : e._setCurrentPageValue(e.get("curPage"))
                }

                var e = this;
                e._bindButtonItemEvent(s, function () {
                    e.jumpToPage(1)
                }), e._bindButtonItemEvent(o, function () {
                    e.jumpToPage(e.get("curPage") - 1)
                }), e._bindButtonItemEvent(u, function () {
                    e.jumpToPage(e.get("curPage") + 1)
                }), e._bindButtonItemEvent(a, function () {
                    e.jumpToPage(e.get("totalPage"))
                }), e._bindButtonItemEvent(f, function () {
                    n()
                }), e._bindButtonItemEvent(l, function () {
                    e.jumpToPage(e.get("curPage"))
                });
                var t = e.getItem(h);
                t && t.get("el").on("keyup", function (e) {
                    e.stopPropagation(), e.keyCode === 13 && n()
                })
            }, _bindButtonItemEvent: function (e, t) {
                var n = this, r = n.getItem(e);
                r && r.on("click", t)
            }, onLoad: function (e) {
                var t = this, n = t.get("store");
                t._afterStoreLoad(n, e)
            }, _getItems: function () {
                var e = this, t = e.get("items");
                return t && t.length ? t : (t = [], t.push(e._getButtonItem(s)), t.push(e._getButtonItem(o)), t.push(e._getSeparator()), t.push(e._getTextItem(c)), t.push(e._getTextItem(h)), t.push(e._getButtonItem(f)), t.push(e._getSeparator()), t.push(e._getButtonItem(u)), t.push(e._getButtonItem(a)), t.push(e._getSeparator()), t.push(e._getTextItem(p)), t)
            }, _getButtonItem: function (e) {
                var t = this;
                return {id: e, xclass: "bar-item-button", text: t.get(e + "Text"), disabled: !0, elCls: t.get(e + "Cls")}
            }, _getSeparator: function () {
                return {xclass: "bar-item-separator"}
            }, _getTextItem: function (e) {
                var t = this;
                return {id: e, xclass: "bar-item-text", text: t._getTextItemTpl(e)}
            }, _getTextItemTpl: function (e) {
                var t = this, n = t.getAttrVals();
                return BUI.substitute(this.get(e + "Tpl"), n)
            }, _isPageAllowRedirect: function (e) {
                var t = this;
                return e && e > 0 && e <= t.get("totalPage") && e !== t.get("curPage")
            }, _setAllButtonsState: function () {
                var e = this, t = e.get("store");
                t && e._setButtonsState([o, u, s, a, f], !0), e.get("curPage") === 1 && e._setButtonsState([o, s], !1), e.get("curPage") === e.get("totalPage") && e._setButtonsState([u, a], !1)
            }, _setButtonsState: function (e, t) {
                var n = this, r = n.get("children");
                BUI.each(r, function (n) {
                    BUI.Array.indexOf(n.get("id"), e) !== -1 && n.set("disabled", !t)
                })
            }, _setNumberPages: function () {
                var e = this, t = e.getItems();
                BUI.each(t, function (t) {
                    t.__xclass === "bar-item-text" && t.set("content", e._getTextItemTpl(t.get("id")))
                })
            }, _getCurrentPageValue: function (e) {
                var t = this;
                e = e || t.getItem(h);
                if (e) {
                    var n = e.get("el").find("input");
                    return n.val()
                }
            }, _setCurrentPageValue: function (e, t) {
                var n = this;
                t = t || n.getItem(h);
                if (t) {
                    var r = t.get("el").find("input");
                    r.val(e)
                }
            }
        }, {
            ATTRS: {
                firstText: {value: "\u9996 \u9875"},
                firstCls: {value: i + "pb-first"},
                prevText: {value: "\u4e0a\u4e00\u9875"},
                prevCls: {value: i + "pb-prev"},
                nextText: {value: "\u4e0b\u4e00\u9875"},
                nextCls: {value: i + "pb-next"},
                lastText: {value: "\u672b \u9875"},
                lastCls: {value: i + "pb-last"},
                skipText: {value: "\u786e\u5b9a"},
                skipCls: {value: i + "pb-skip"},
                refreshText: {value: "\u5237\u65b0"},
                refreshCls: {value: i + "pb-refresh"},
                totalPageTpl: {value: "\u5171 {totalPage} \u9875"},
                curPageTpl: {value: '\u7b2c <input type="text" autocomplete="off" class="' + i + 'pb-page" size="20" value="{curPage}" name="inputItem"> \u9875'},
                totalCountTpl: {value: "\u5171{totalCount}\u6761\u8bb0\u5f55"},
                autoInitItems: {value: !1},
                curPage: {value: 0},
                totalPage: {value: 0},
                totalCount: {value: 0},
                pageSize: {value: 30},
                store: {}
            },
            ID_FIRST: s,
            ID_PREV: o,
            ID_NEXT: u,
            ID_LAST: a,
            ID_SKIP: f,
            ID_REFRESH: l,
            ID_TOTAL_PAGE: c,
            ID_CURRENT_PAGE: h,
            ID_TOTAL_COUNT: p
        }, {xclass: "pagingbar", priority: 2});
    return m
}),define("bui/toolbar/numberpagingbar", ["bui/toolbar/pagingbar"], function (e) {
    var t = BUI.Component, n = e("bui/toolbar/pagingbar"), r = BUI.prefix, i = "numberContainer",
        s = r + "button-number", o = n.extend({
            _getItems: function () {
                var e = this, t = e.get("items");
                return t ? t : (t = [], t.push(e._getButtonItem(n.ID_PREV)), t.push(e._getButtonItem(n.ID_NEXT)), t)
            }, _getButtonItem: function (e) {
                var t = this;
                return {id: e, content: '<a href="javascript:;">' + t.get(e + "Text") + "</a>", disabled: !0}
            }, _bindButtonEvent: function () {
                var e = this, t = e.get("numberButtonCls");
                e.constructor.superclass._bindButtonEvent.call(this), e.get("el").delegate("a", "click", function (e) {
                    e.preventDefault()
                }), e.on("click", function (n) {
                    var r = n.target;
                    if (r && r.get("el").hasClass(t)) {
                        var i = r.get("id");
                        e.jumpToPage(i)
                    }
                })
            }, _setNumberPages: function () {
                var e = this;
                e._setNumberButtons()
            }, _setNumberButtons: function () {
                var e = this, t = e.get("curPage"), n = e.get("totalPage"), r = e._getNumberItems(t, n), i;
                e._clearNumberButtons(), BUI.each(r, function (t) {
                    e._appendNumberButton(t)
                }), i = e.getItem(t), i && i.set("selected", !0)
            }, _appendNumberButton: function (e) {
                var t = this, n = t.getItemCount(), r = t.addItemAt(e, n - 1)
            }, _clearNumberButtons: function () {
                var e = this, t = e.getItems(), n = e.getItemCount();
                while (n > 2) e.removeItemAt(n - 2), n = e.getItemCount()
            }, _getNumberItems: function (e, t) {
                function u(e, t) {
                    for (var i = e; i <= t; i++) r.push(n._getNumberItem(i))
                }

                function a() {
                    r.push(n._getEllipsisItem())
                }

                var n = this, r = [], i = n.get("maxLimitCount"), s = n.get("showRangeCount"), o;
                if (t < i) o = t, u(1, t); else {
                    var f = e <= i ? 1 : e - s, l = e + s, c = l < t ? l > i ? l : i : t;
                    f > 1 && (u(1, 1), f > 2 && a()), o = c, u(f, c)
                }
                return o < t && (o < t - 1 && a(), u(t, t)), r
            }, _getEllipsisItem: function () {
                var e = this;
                return {disabled: !0, content: e.get("ellipsisTpl")}
            }, _getNumberItem: function (e) {
                var t = this;
                return {id: e, elCls: t.get("numberButtonCls")}
            }
        }, {
            ATTRS: {
                itemStatusCls: {value: {selected: "active", disabled: "disabled"}},
                itemTpl: {value: '<a href="">{id}</a>'},
                prevText: {value: "<<"},
                nextText: {value: ">>"},
                maxLimitCount: {value: 4},
                showRangeCount: {value: 1},
                numberButtonCls: {value: s},
                ellipsisTpl: {value: '<a href="#">...</a>'}
            }
        }, {xclass: "pagingbar-number", priority: 3});
    return o
}),define("bui/progressbar", ["bui/common", "bui/progressbar/base", "bui/progressbar/load"], function (e) {
    var t = e("bui/common"), n = t.namespace("ProgressBar");
    return t.mix(n, {Base: e("bui/progressbar/base"), Load: e("bui/progressbar/load")}), n
}),define("bui/progressbar/base", ["bui/common"], function (e) {
    var t = e("bui/common"), n = t.Component.View.extend({
        _uiSetPercent: function (e) {
            var n = this, r = n.get("el").children();
            t.isArray(e) || (e = [e]), t.each(r, function (t, n) {
                $(t).width(e[n] + "%")
            })
        }
    }, {ATTRS: {percent: {}}}), r = t.Component.Controller.extend({}, {
        ATTRS: {
            percent: {view: !0, value: 0},
            tpl: {value: '<div class="progress-bar-inner"></div>'},
            xview: {value: n}
        }
    }, {xclass: "progress-bar"});
    return r
}),define("bui/progressbar/load", ["bui/progressbar/base"], function (e) {
    var t = e("bui/progressbar/base"), n = 0, r = 1, i = 2, s = t.extend({
        bindUI: function () {
            var e = this;
            e.on("afterPercentChange", function (t) {
                if (e.isLoading()) {
                    var n = e.get("percent");
                    n == 100 && e.onCompleted(), e.onChange()
                }
            })
        }, start: function () {
            var e = this;
            e.isLoading() || e.onstart()
        }, complete: function () {
            var e = this;
            clearTimeout(e.get("t")), e.set("percent", 100)
        }, cancel: function () {
            var e = this;
            clearTimeout(e.get("t")), e.get("percent") && e.set("percent", 0), e.set("status", n)
        }, onstart: function () {
            var e = this, t = e.get("cfg");
            e.set("percent", 0), e.set("status", r), e.fire("start", t), e._startLoad()
        }, onChange: function () {
            var e = this;
            e.fire("loadchange")
        }, onCompleted: function () {
            var e = this;
            e.set("status", i), e.fire("completed")
        }, isLoading: function () {
            return this.get("status") === r
        }, isCompleted: function () {
            return this.get("status") === i
        }, _startLoad: function () {
            var e = this, t = e.get("ajaxCfg"), n = e.get("interval"), r;
            t.success = function (i) {
                var s = i.percent;
                e.set("percent", s), s < 100 && e
                    .isLoading() && (r = setTimeout(function () {
                    $.ajax(t)
                }, n), e.set("t", r))
            }, $.ajax(t)
        }
    }, {ATTRS: {status: {value: 0}, ajaxCfg: {}, interval: {value: 500}, events: {}}}, {xclass: "progress-bar-load"});
    return s
}),define("bui/calendar", ["bui/common", "bui/calendar/calendar", "bui/calendar/monthpicker", "bui/calendar/datepicker"], function (e) {
    var t = e("bui/common"), n = t.namespace("Calendar");
    return t.mix(n, {
        Calendar: e("bui/calendar/calendar"),
        MonthPicker: e("bui/calendar/monthpicker"),
        DatePicker: e("bui/calendar/datepicker")
    }), n
}),define("bui/calendar/monthpicker", ["bui/common", "bui/overlay", "bui/list", "bui/toolbar"], function (e) {
    function v() {
        return $.map(d, function (e, t) {
            return {text: e, value: t}
        })
    }

    var t = e("bui/common"), n = t.Component, r = e("bui/overlay").Overlay, i = e("bui/list").SimpleList,
        s = e("bui/toolbar"), o = t.prefix, u = "x-monthpicker-month", a = "data-month", f = "data-year",
        l = "x-monthpicker-year", c = "x-monthpicker-yearnav", h = "x-monthpicker-selected", p = "x-monthpicker-item",
        d = ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
        m = i.extend({
            bindUI: function () {
                var e = this;
                e.get("el").delegate("a", "click", function (e) {
                    e.preventDefault()
                }).delegate("." + u, "dblclick", function () {
                    e.fire("dblclick")
                })
            }
        }, {
            ATTRS: {
                itemTpl: {
                    view: !0,
                    value: '<li class="' + p + ' x-monthpicker-month"><a href="#" hidefocus="on">{text}</a></li>'
                }, itemCls: {value: p}, items: {view: !0, value: v()}, elCls: {view: !0, value: "x-monthpicker-months"}
            }
        }, {xclass: "calendar-month-panel"}), g = i.extend({
            bindUI: function () {
                var e = this, t = e.get("el");
                t.delegate("a", "click", function (e) {
                    e.preventDefault()
                }), t.delegate("." + l, "dblclick", function () {
                    e.fire("dblclick")
                }), t.delegate(".x-icon", "click", function (t) {
                    var n = $(t.currentTarget);
                    n.hasClass(c + "-prev") ? e._prevPage() : n.hasClass(c + "-next") && e._nextPage()
                }), e.on("itemselected", function (t) {
                    t.item && e.setInternal("year", t.item.value)
                })
            }, _prevPage: function () {
                var e = this, t = e.get("start"), n = e.get("yearCount");
                e.set("start", t - n)
            }, _nextPage: function () {
                var e = this, t = e.get("start"), n = e.get("yearCount");
                e.set("start", t + n)
            }, _uiSetStart: function () {
                var e = this;
                e._setYearsContent()
            }, _uiSetYear: function (e) {
                var t = this, n = t.findItemByField("value", e);
                n ? t.setSelectedByField(e) : t.set("start", e)
            }, _setYearsContent: function () {
                var e = this, t = e.get("year"), n = e.get("start"), r = e.get("yearCount"), i = [];
                for (var s = n; s < n + r; s++) {
                    var o = s.toString();
                    i.push({text: o, value: s})
                }
                e.set("items", i), e.setSelectedByField(t)
            }
        }, {
            ATTRS: {
                items: {view: !0, value: []},
                elCls: {view: !0, value: "x-monthpicker-years"},
                itemCls: {value: p},
                year: {},
                start: {value: (new Date).getFullYear()},
                yearCount: {value: 10},
                itemTpl: {view: !0, value: '<li class="' + p + " " + l + '"><a href="#" hidefocus="on">{text}</a></li>'},
                tpl: {
                    view: !0,
                    value: '<div class="' + c + '">' + '<span class="' + c + '-prev x-icon x-icon-normal x-icon-small"><span class="icon icon-caret icon-caret-left"></span></span>' + '<span class="' + c + '-next x-icon x-icon-normal x-icon-small"><span class="icon icon-caret icon-caret-right"></span></span>' + "</div>" + "<ul></ul>"
                }
            }
        }, {xclass: "calendar-year-panel"}), y = r.extend({
            initializer: function () {
                var e = this, t = e.get("children"), n = new m, r = new g, i = e._createFooter();
                t.push(n), t.push(r), t.push(i), e.set("yearPanel", r), e.set("monthPanel", n)
            }, bindUI: function () {
                var e = this;
                e.get("monthPanel").on("itemselected", function (t) {
                    t.item && e.setInternal("month", t.item.value)
                }).on("dblclick", function () {
                    e._successCall()
                }), e.get("yearPanel").on("itemselected", function (t) {
                    t.item && e.setInternal("year", t.item.value)
                }).on("dblclick", function () {
                    e._successCall()
                })
            }, _successCall: function () {
                var e = this, t = e.get("success");
                t && t.call(e)
            }, _createFooter: function () {
                var e = this;
                return new s.Bar({
                    elCls: o + "clear x-monthpicker-footer",
                    children: [{
                        xclass: "bar-item-button",
                        text: "\u786e\u5b9a",
                        btnCls: "button button-small button-primary",
                        handler: function () {
                            e._successCall()
                        }
                    }, {
                        xclass: "bar-item-button",
                        text: "\u53d6\u6d88",
                        btnCls: "button button-small last",
                        handler: function () {
                            var t = e.get("cancel");
                            t && t.call(e)
                        }
                    }]
                })
            }, _uiSetYear: function (e) {
                this.get("yearPanel").set("year", e)
            }, _uiSetMonth: function (e) {
                this.get("monthPanel").setSelectedByField(e)
            }
        }, {
            ATTRS: {
                footer: {}, align: {value: {}}, year: {}, success: {
                    value: function () {
                    }
                }, cancel: {
                    value: function () {
                    }
                }, width: {value: 180}, month: {}, yearPanel: {}, monthPanel: {}
            }
        }, {xclass: "monthpicker"});
    return y
}),define("bui/calendar/header", ["bui/common"], function (e) {
    var t = e("bui/common"), n = t.prefix, r = t.Component, i = "year-text", s = "month-text", o = "x-datepicker-arrow",
        u = "x-datepicker-prev", a = "x-datepicker-next", f = r.Controller.extend({
            bindUI: function () {
                var e = this, t = e.get("el");
                t.delegate("." + o, "click", function (t) {
                    t.preventDefault();
                    var n = $(t.currentTarget);
                    n.hasClass(a) ? e.nextMonth() : n.hasClass(u) && e.prevMonth()
                }), t.delegate(".x-datepicker-month", "click", function () {
                    e.fire("headerclick")
                })
            }, setMonth: function (e, t) {
                var n = this, r = n.get("year"), i = n.get("month");
                if (e !== r || t !== i) n.set("year", e), n.set("month", t), n.fire("monthchange", {year: e, month: t})
            }, nextMonth: function () {
                var e = this, t = new Date(e.get("year"), e.get("month") + 1);
                e.setMonth(t.getFullYear(), t.getMonth())
            }, prevMonth: function () {
                var e = this, t = new Date(e.get("year"), e.get("month") - 1);
                e.setMonth(t.getFullYear(), t.getMonth())
            }, _uiSetYear: function (e) {
                var t = this;
                t.get("el").find("." + i).text(e)
            }, _uiSetMonth: function (e) {
                var t = this;
                t.get("el").find("." + s).text(e + 1)
            }
        }, {
            ATTRS: {
                year: {sync: !1},
                month: {
                    sync: !1, setter: function (e) {
                        this.set("monthText", e + 1)
                    }
                },
                monthText: {},
                tpl: {
                    view: !0,
                    value: '<div class="' + o + " " + u + '"><span class="icon icon-white icon-caret  icon-caret-left"></span></div>' + '<div class="x-datepicker-month">' + '<div class="month-text-container">' + '<span><span class="year-text">{year}</span>\u5e74 <span class="month-text">{monthText}</span>\u6708</span>' + '<span class="' + n + "caret " + n + 'caret-down"></span>' + "</div>" + "</div>" + '<div class="' + o + " " + a + '"><span class="icon icon-white icon-caret  icon-caret-right"></span></div>'
                },
                elCls: {view: !0, value: "x-datepicker-header"},
                events: {value: {monthchange: !0}}
            }
        }, {xclass: "calendar-header"});
    return f
}),define("bui/calendar/panel", ["bui/common"], function (e) {
    var t = e("bui/common"), n = t.Component, r = t.Date, i = "x-datepicker-date", s = "x-datepicker-today",
        o = "x-datepicker-disabled", u = "x-datepicker-active", a = "data-date", f = "isoDate",
        l = "x-datepicker-selected", c = 6, h = {deactive: "prevday", active: "active", disabled: "disabled"},
        p = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], d = n.View.extend({
            renderUI: function () {
                this.updatePanel()
            }, updatePanel: function () {
                var e = this, t = e.get("el"), n = t.find("tbody"), r = e._getPanelInnerTpl();
                n.empty(), $(r).appendTo(n)
            }, _getPanelInnerTpl: function () {
                var e = this, t = e._getFirstDate(), n = [];
                for (var i = 0; i < c; i++) {
                    var s = r.addWeek(i, t);
                    n.push(e._getWeekTpl(s))
                }
                return n.join("")
            }, _getWeekTpl: function (e) {
                var n = this, i = n.get("weekTpl"), s = [];
                for (var o = 0; o < p.length; o++) {
                    var u = r.addDay(o, e);
                    s.push(n._getDayTpl(u))
                }
                return t.substitute(i, {daysTpl: s.join("")})
            }, _getDayTpl: function (e) {
                var n = this, i = n.get("dayTpl"), o = e.getDay(), u = n._isToday(e) ? s : "", a = p[o], l = e.getDate(),
                    c = n._isInRange(e) ? n._isCurrentMonth(e) ? h.active : h.deactive : h.disabled;
                return t.substitute(i, {dayOfWeek: a, dateType: c, dateNumber: l, todayCls: u, date: r.format(e, f)})
            }, _getFirstDate: function (e, t) {
                var n = this, i = n._getMonthFirstDate(e, t), s = i.getDay();
                return r.addDay(s * -1, i)
            }, _getMonthFirstDate: function (e, t) {
                var n = this, e = e || n.get("year"), t = t || n.get("month");
                return new Date(e, t)
            }, _isCurrentMonth: function (e) {
                return e.getMonth() === this.get("month")
            }, _isToday: function (e) {
                var t = new Date;
                return t.getFullYear() === e.getFullYear() && t.getMonth() === e.getMonth() && t.getDate() === e.getDate()
            }, _isInRange: function (e) {
                var t = this, n = t.get("maxDate"), r = t.get("minDate");
                return r && e < r ? !1 : n && e > n ? !1 : !0
            }, _clearSelectedDate: function () {
                var e = this;
                e.get("el").find("." + l).removeClass(l)
            }, _findDateElement: function (e) {
                var t = this, n = r.format(e, f), s = t.get("el").find("." + i), o = null;
                return n && s.each(function (e, t) {
                    if ($(t).attr("title") === n) return o = $(t), !1
                }), o
            }, _setSelectedDate: function (e) {
                var t = this, n = t._findDateElement(e);
                t._clearSelectedDate(), n && n.addClass(l)
            }
        }, {ATTRS: {}}), v = n.Controller.extend({
            initializer: function () {
                var e = this, t = new Date;
                e.get("year") || e.set("year", t.getFullYear()), e.get("month") || e.set("month", t.getMonth())
            }, bindUI: function () {
                var e = this, t = e.get("el");
                t.delegate("." + i, "click", function (e) {
                    e.preventDefault()
                }), t.delegate("." + o, "mouseup", function (e) {
                    e.stopPropagation()
                })
            }, performActionInternal: function (e) {
                var t = this, n = $(e.target).closest("." + i);
                if (n) {
                    var s = n.attr("title");
                    s && (s = r.parse(s), t.get("view")._isInRange(s) && t.set("selected", s))
                }
            }, setMonth: function (e, t) {
                var n = this, r = n.get("year"), i = n.get("month");
                if (e !== r || t !== i) n.set("year", e), n.set("month", t), n.get("view").updatePanel()
            }, _uiSetSelected: function (e, t) {
                var n = this;
                t && t.prevVal && r.isDateEquals(e, t.prevVal) || (n.setMonth(e.getFullYear(), e.getMonth()), n.get("view")._setSelectedDate(e), n.fire("selectedchange", {date: e}))
            }, _uiSetMaxDate: function (e) {
                e && this.get("view").updatePanel()
            }, _uiSetMinDate: function (e) {
                e && this.get("view").updatePanel()
            }
        }, {
            ATTRS: {
                year: {view: !0},
                month: {view: !0},
                selected: {},
                focusable: {value: !0},
                dayTpl: {
                    view: !0,
                    value: '<td class="x-datepicker-date x-datepicker-{dateType} {todayCls} day-{dayOfWeek}" title="{date}"><a href="#" hidefocus="on" tabindex="1"><em><span>{dateNumber}</span></em></a></td>'
                },
                events: {value: {click: !1, selectedchange: !0}},
                maxDate: {
                    view: !0, setter: function (e) {
                        if (e) return t.isString(e) ? r.parse(e) : e
                    }
                },
                minDate: {
                    view: !0, setter: function (e) {
                        if (e) return t.isString(e) ? r.parse(e) : e
                    }
                },
                weekTpl: {view: !0, value: "<tr>{daysTpl}</tr>"},
                tpl: {
                    view: !0,
                    value: '<table class="x-datepicker-inner" cellspacing="0"><thead><tr><th  title="Sunday"><span>\u65e5</span></th><th  title="Monday"><span>\u4e00</span></th><th  title="Tuesday"><span>\u4e8c</span></th><th  title="Wednesday"><span>\u4e09</span></th><th  title="Thursday"><span>\u56db</span></th><th  title="Friday"><span>\u4e94</span></th><th  title="Saturday"><span>\u516d</span></th></tr></thead><tbody class="x-datepicker-body"></tbody></table>'
                },
                xview: {value: d}
            }
        }, {xclass: "calendar-panel", priority: 0});
    return v
}),define("bui/calendar/calendar", ["bui/picker", "bui/calendar/monthpicker", "bui/calendar/header", "bui/calendar/panel", "bui/toolbar"], function (e) {
    function v() {
        var e = new Date;
        return new Date(e.getFullYear(), e.getMonth(), e.getDate())
    }

    function m(e) {
        return e < 10 ? "0" + e : e.toString()
    }

    function g(e) {
        var t = [];
        for (var n = 0; n < e; n++) t.push({text: m(n), value: m(n)});
        return t
    }

    function y(e, t) {
        var n = e.get("el").find("." + t);
        return parseInt(n.val(), 10)
    }

    function b(e, n, r) {
        var i = e.get("el").find("." + n);
        t.isNumber(r) && (r = m(r)), i.val(r)
    }

    var t = e("bui/common"), n = t.prefix, r = "x-datepicker-time", i = "x-datepicker-hour", s = "x-datepicker-minute",
        o = "x-datepicker-second", u = "x-timepicker", a = e("bui/picker").ListPicker,
        f = e("bui/calendar/monthpicker"), l = e("bui/calendar/header"), c = e("bui/calendar/panel"),
        h = e("bui/toolbar"), p = t.Component, d = t.Date, w = p.Controller.extend({
            initializer: function () {
                var e = this, t = e.get("children"), n = new l, r = new c, i = e.get("footer") || e._createFooter();
                t.push(n), t.push(r), t.push(i), e.set("header", n), e.set("panel", r), e.set("footer", i)
            }, renderUI: function () {
                var e = this, t = e.get("children");
                if (e.get("showTime")) {
                    var n = e.get("timepicker") || e._initTimePicker();
                    t.push(n), e.set("timepicker", n)
                }
            }, bindUI: function () {
                var e = this, t = e.get("header"), n = e.get("panel");
                n.on("selectedchange", function (t) {
                    var n = t.date;
                    d.isDateEquals(n, e.get("selectedDate")) || e.set("selectedDate", n)
                }), e.get("showTime") ? e._initTimePickerEvent() : n.on("click", function () {
                    e.fire("accept")
                }), t.on("monthchange", function (t) {
                    e._setYearMonth(t.year, t.month)
                }), t.on("headerclick", function () {
                    var n = e.get("monthpicker") || e._createMonthPicker();
                    n.set("year", t.get("year")), n.set("month", t.get("month")), n.show()
                })
            }, _initTimePicker: function () {
                var e = this, t = e.get("lockTime"), n = {hour: i, minute: s, second: o};
                if (t) for (var f in t) {
                    var l = n[f.toLowerCase()];
                    e.set(f, t[f]), e.get("el").find("." + l).attr("disabled", "")
                }
                var c = new a({
                    elCls: u,
                    children: [{itemTpl: '<li><a href="#">{text}</a></li>'}],
                    autoAlign: !1,
                    align: {node: e.get("el"), points: ["bl", "bl"], offset: [0, -30]},
                    trigger: e.get("el").find("." + r)
                });
                return c.render(), e._initTimePickerEvent(c), c
            }, _initTimePickerEvent: function (e) {
                var t = this, e = t.get("timepicker");
                if (!e) return;
                e.get("el").delegate("a", "click", function (e) {
                    e.preventDefault()
                }), e.on("triggerchange", function (t) {
                    var n = t.curTrigger;
                    n.hasClass(i) ? e.get("list").set("items", g(24)) : e.get("list").set("items", g(60))
                }), e.on("selectedchange", function (e) {
                    var n = e.curTrigger, r = e.value;
                    n.hasClass(i) ? t.setInternal("hour", r) : n.hasClass(s) ? t.setInternal("minute", r) : t.setInternal("second", r)
                })
            }, _setYearMonth: function (e, t) {
                var n = this, r = n.get("selectedDate"), i = r.getDate();
                (e !== r.getFullYear() || t !== r.getMonth()) && n.set("selectedDate", new Date(e, t, i))
            }, _createMonthPicker: function () {
                var e = this, t;
                return t = new f({
                    render: e.get("el"),
                    effect: {effect: "slide", duration: 300},
                    visibleMode: "display",
                    success: function () {
                        var t = this;
                        e._setYearMonth(t.get("year"), t.get("month")), t.hide()
                    },
                    cancel: function () {
                        this.hide()
                    }
                }), e.set("monthpicker", t), e.get("children").push(t), t
            }, _createFooter: function () {
                var e = this, t = this.get("showTime"), r = [];
                return t ? (r.push({content: e.get("timeTpl")}), r.push({
                    xclass: "bar-item-button",
                    text: "\u786e\u5b9a",
                    btnCls: "button button-small button-primary",
                    listeners: {
                        click: function () {
                            e.fire("accept")
                        }
                    }
                })) : r.push({
                    xclass: "bar-item-button",
                    text: "\u4eca\u5929",
                    btnCls: "button button-small",
                    id: "todayBtn",
                    listeners: {
                        click: function () {
                            var t = v();
                            e.set("selectedDate", t), e.fire("accept")
                        }
                    }
                }), new h.Bar({elCls: n + "calendar-footer", children: r})
            }, _updateTodayBtnAble: function () {
                var e = this;
                if (!e.get("showTime")) {
                    var t = e.get("footer"), n = e.get("panel").get("view"), r = v(), i = t.getItem("todayBtn");
                    n._isInRange(r) ? i.enable() : i.disable()
                }
            }, _uiSetSelectedDate: function (e) {
                var t = this, n = e.getFullYear(), r = e.getMonth();
                t.get("header").setMonth(n, r), t.get("panel").set("selected", e), t.fire("datechange", {date: e})
            }, _uiSetHour: function (e) {
                b(this, i, e)
            }, _uiSetMinute: function (e) {
                b(this, s, e)
            }, _uiSetSecond: function (e) {
                b(this, o, e)
            }, _uiSetMaxDate: function (e) {
                var t = this;
                t.get("panel").set("maxDate", e), t._updateTodayBtnAble()
            }, _uiSetMinDate: function (e) {
                var t = this;
                t.get("panel").set("minDate", e), t._updateTodayBtnAble()
            }
        }, {
            ATTRS: {
                header: {},
                panel: {},
                maxDate: {},
                minDate: {},
                monthPicker: {},
                timepicker: {},
                width: {value: 180},
                events: {value: {click: !1, accept: !1, datechange: !1, monthchange: !1}},
                showTime: {value: !1},
                lockTime: {},
                timeTpl: {value: '<input type="text" readonly class="' + r + " " + i + '" />:<input type="text" readonly class="' + r + " " + s + '" />:<input type="text" readonly class="' + r + " " + o + '" />'},
                selectedDate: {value: v()},
                hour: {value: (new Date).getHours()},
                minute: {value: (new Date).getMinutes()},
                second: {value: 0}
            }
        }, {xclass: "calendar", priority: 0});
    return w
}),define("bui/calendar/datepicker", ["bui/common", "bui/picker", "bui/calendar/calendar"], function (e) {
    var t = e("bui/common"), n = e("bui/picker").Picker, r = e("bui/calendar/calendar"), i = t.Date, s = n.extend({
        initializer: function () {
        }, createControl: function () {
            var e = this, t = e.get("children"), n = new r({
                render: e.get("el"),
                showTime: e.get("showTime"),
                lockTime: e.get("lockTime"),
                minDate: e.get("minDate"),
                maxDate: e.get("maxDate"),
                autoRender: !0
            });
            return e.get("dateMask") || (e.get("showTime") ? e.set("dateMask", "yyyy-mm-dd HH:MM:ss") : e.set("dateMask", "yyyy-mm-dd")), t.push(n), e.set("calendar", n), n
        }, setSelectedValue: function (e) {
            if (!this.get("calendar")) return;
            var t = this, n = this.get("calendar"), r = i.parse(e, t.get("dateMask"));
            r = r || new Date((new Date).setSeconds(0)), n.set("selectedDate", i.getDate(r));
            if (t.get("showTime")) {
                var s = this.get("lockTime"), o = s && s.hour ? s.hour : r.getHours(),
                    u = s && s.minute ? s.minute : r.getMinutes(), a = s && s.second ? s.second : r.getSeconds();
                n.set("hour", o), n.set("minute", u), n.set("second", a)
            }
        }, getSelectedValue: function () {
            if (!this.get("calendar")) return null;
            var e = this, t = e.get("calendar"), n = i.getDate(t.get("selectedDate"));
            return e.get("showTime") && (n = i.addHour(t.get("hour"), n), n = i.addMinute(t.get("minute"), n), n = i.addSecond(t.get("second"), n)), n
        }, getSelectedText: function () {
            return this.get("calendar") ? i.format(this.getSelectedValue(), this._getFormatType()) : ""
        }, _getFormatType: function () {
            return this.get("dateMask")
        }, _uiSetMaxDate: function (e) {
            if (!this.get("calendar")) return null;
            var t = this;
            t.get("calendar").set("maxDate", e)
        }, _uiSetMinDate: function (e) {
            if (!this.get("calendar")) return null;
            var t = this;
            t.get("calendar").set("minDate", e)
        }
    }, {
        ATTRS: {
            showTime: {value: !1},
            lockTime: {},
            maxDate: {},
            minDate: {},
            dateMask: {},
            changeEvent: {value: "accept"},
            hideEvent: {value: "accept"},
            calendar: {}
        }
    }, {xclass: "datepicker", priority: 0});
    return s
}),define("bui/editor", ["bui/common", "bui/form", "bui/editor/editor", "bui/editor/record", "bui/editor/dialog"], function (e) {
    var t = e("bui/common"), n = e("bui/form"), r = t.namespace("Editor");
    return t.mix(r, {
        Editor: e("bui/editor/editor"),
        RecordEditor: e("bui/editor/record"),
        DialogEditor: e("bui/editor/dialog")
    }), r
}),define("bui/editor/mixin", function (e) {
    function t(e) {
        var t = e, n = t.get("controlCfgField"), r = t.get(n), i = t.addChild(r);
        t.setInternal(n, i)
    }

    var n = function () {
        t(this)
    };
    return n.ATTRS = {
        acceptEvent: {value: "autohide"},
        preventHide: {value: !0},
        changeSourceEvent: {value: "show triggerchange"},
        ignoreInputFields: {value: !1},
        innerValueField: {},
        emptyValue: {},
        controlCfgField: {},
        focusable: {value: !0},
        autoUpdate: {value: !0},
        events: {value: {accept: !1, cancel: !1}}
    }, n.prototype = {
        __bindUI: function () {
            var e = this, t = e.get("acceptEvent"), n = e.get("changeSourceEvent");
            t && e.on(t, function () {
                if (e.accept()) return;
                if (e.get("preventHide")) return !1;
                e.cancel()
            }), n && e.on(n, function () {
                e.setValue(e.getSourceValue()), e.get("visible") && e.focus()
            })
        }, getInnerControl: function () {
            var e = this, t = e.get("children");
            return t[0]
        }, setValue: function (e, t) {
            var n = this, r = n.getInnerControl();
            n.set("editValue", e), n.clearControlValue(), r.set(n.get("innerValueField"), e), e || n.valid(), t && n.clearErrors()
        }, getValue: function () {
            var e = this, t = e.getInnerControl();
            return t.get(e.get("innerValueField"))
        }, isValid: function () {
            var e = this, t = e.getInnerControl();
            return t.isValid ? t.isValid() : !0
        }, valid: function () {
            var e = this, t = e.getInnerControl();
            t.valid && t.valid()
        }, getErrors: function () {
            var e = this, t = e.getInnerControl();
            return t.getErrors ? t.getErrors() : []
        }, isChange: function () {
            var e = this, t = e.get("editValue"), n = e.getValue();
            return t !== n
        }, clearValue: function () {
            this.clearControlValue(), this.clearErrors()
        }, clearControlValue: function () {
            var e = this, t = e.getInnerControl();
            t.set(e.get("innerValueField"), e.get("emptyValue"))
        }, clearErrors: function () {
            var e = this, t = e.getInnerControl();
            t.clearErrors()
        }, getSourceValue: function () {
        }, updateSource: function () {
        }, handleNavEsc: function () {
            this.cancel()
        }, handleNavEnter: function (e) {
            var t = e.target;
            if (t.tagName === "TEXTAREA") return;
            t.tagName === "BUTTON" && $(t).trigger("click"), this.accept()
        }, focus: function () {
            var e = this, t = e.getInnerControl();
            t.focus && t.focus()
        }, accept: function () {
            var e = this, t;
            e.valid();
            if (!e.isValid()) return !1;
            t = e.getValue(), e.get("autoUpdate") && e.updateSource(t);
            if (e.fire("beforeaccept", {value: t}) == 0) return;
            return e.fire("accept", {value: t, editValue: e.get("editValue")}), e.hide(), !0
        }, cancel: function () {
            this.fire("cancel"), this.clearValue(), this.close()
        }
    }, n
}),define("bui/editor/editor", ["bui/common", "bui/overlay", "bui/editor/mixin"], function (e) {
    var t = e("bui/common"), n = e("bui/overlay").Overlay;
    CLS_TIPS = "x-editor-tips", Mixin = e("bui/editor/mixin");
    var r = n.extend([Mixin], {
        bindUI: function () {
            var e = this, t = e.getInnerControl();
            e.on("validchange", function (t) {
                !e.isValid() && e.get("visible") ? e._showError(e.getErrors()) : e._hideError()
            }), e.on("hide", function () {
                e._hideError()
            }), e.on("show", function () {
                e.isValid() || e._showError(e.getErrors())
            })
        }, _initOverlay: function () {
            var e = this, t = e.get("tooltip"), r = new n(t);
            return r.render(), e.set("overlay", r), r
        }, _getErrorList: function () {
            var e = this, t = e.get("overlay");
            return t && t.get("children")[0]
        }, _showError: function (e) {
            var n = this, r = n.get("overlay") || n._initOverlay(), i = n._getErrorList(), s = n.get("errorAlign"),
                o = t.Array.map(e, function (e) {
                    return {error: e}
                });
            i.set("items", o), s.node = n.get("el"), r.set("align", s), r.show()
        }, _hideError: function () {
            var e = this, t = e.get("overlay");
            t && t.hide()
        }, getSourceValue: function () {
            var e = this, t = e.get("curTrigger"), n = e.get("parser"), r = t.text();
            return n && (r = n.call(this, r, t)), r
        }, updateSource: function (e) {
            var t = this, n = t.get("curTrigger");
            n && n.length && (e = t._formatText(e), n.text(e))
        }, _formatText: function (e) {
            var t = this, n = t.get("formatter");
            return n && (e = n.call(t, e)), e
        }, _uiSetWidth: function (e) {
            var t = this;
            if (e != null) {
                var n = t.getInnerControl();
                n.set && n.set("width", e)
            }
        }
    }, {
        ATTRS: {
            innerValueField: {value: "value"},
            emptyValue: {value: ""},
            autoHide: {value: !0},
            controlCfgField: {value: "field"},
            defaultChildCfg: {value: {tpl: "", forceFit: !0, errorTpl: ""}},
            tooltip: {
                valueFn: function () {
                    return {
                        children: [{
                            xclass: "simple-list",
                            itemTpl: '<li><span class="x-icon x-icon-mini x-icon-error" title="{error}">!</span>&nbsp;<span>{error}</span></li>'
                        }], elCls: CLS_TIPS
                    }
                }
            },
            defaultChildClass: {value: "form-field"},
            align: {value: {points: ["tl", "tl"]}},
            parser: {},
            formatter: {},
            errorAlign: {value: {points: ["bl", "tl"], offset: [0, 10]}},
            overlay: {},
            field: {value: {}}
        }
    }, {xclass: "editor"});
    return r
}),define("bui/editor/record", ["bui/common", "bui/editor/editor"], function (e) {
    var t = e("bui/common"), n = e("bui/editor/editor"), r = n.extend({
        getSourceValue: function () {
            return this.get("record")
        }, updateSource: function (e) {
            var n = this, r = n.get("record");
            t.mix(r, e)
        }, _uiSetRecord: function (e) {
            this.setValue(e)
        }
    }, {
        ATTRS: {
            innerValueField: {value: "record"},
            acceptEvent: {value: ""},
            emptyValue: {value: {}},
            autoHide: {value: !1},
            record: {value: {}},
            controlCfgField: {value: "form"},
            form: {value: {}},
            errorAlign: {value: {points: ["tr", "tl"], offset: [10, 0]}},
            defaultChildCfg: {
                valueFn: function () {
                    var e = this;
                    return {
                        xclass: "form",
                        errorTpl: "",
                        showError: !0,
                        showChildError: !0,
                        defaultChildCfg: {elCls: "bui-inline-block", tpl: "", forceFit: !0},
                        buttons: [{
                            btnCls: "button button-primary", text: "\u786e\u5b9a", handler: function () {
                                e.accept()
                            }
                        }, {
                            btnCls: "button", text: "\u53d6\u6d88", handler: function () {
                                e.cancel()
                            }
                        }]
                    }
                }
            }
        }
    }, {xclass: "record-editor"});
    return r
}),define("bui/editor/dialog", ["bui/overlay", "bui/editor/mixin"], function (e) {
    var t = e("bui/overlay").Dialog, n = e("bui/editor/mixin"), r = t.extend([n], {
        getSourceValue: function () {
            return this.get("record")
        }, handleNavEnter: function (e) {
            var t = this, n = t.get("success"), r = e.target;
            if (r.tagName === "TEXTAREA") return;
            r.tagName === "BUTTON" && $(r).trigger("click"), n ? n.call(t) : this.accept()
        }, cancel: function () {
            this.fire("cancel"), this.clearValue(), this.close()
        }, updateSource: function (e) {
            var t = this, n = t.get("record");
            BUI.mix(n, e)
        }, _uiSetRecord: function (e) {
            this.setValue(e)
        }
    }, {
        ATTRS: {
            innerValueField: {value: "record"},
            acceptEvent: {value: ""},
            record: {value: {}},
            emptyValue: {shared: !1, value: {}},
            controlCfgField: {value: "form"},
            changeSourceEvent: {value: ""},
            defaultChildCfg: {value: {xclass: "form-horizontal"}},
            focusable: {value: !1},
            success: {
                value: function () {
                    this.accept()
                }
            },
            cancel: {
                value: function () {
                    this.cancel()
                }
            },
            form: {value: {}}
        }
    }, {xclass: "dialog-editor"});
    return r
}),define("bui/grid", ["bui/common", "bui/grid/simplegrid", "bui/grid/grid", "bui/grid/column", "bui/grid/header", "bui/grid/format", "bui/grid/plugins"], function (e) {
    var t = e("bui/common"), n = t.namespace("Grid");
    return t.mix(n, {
        SimpleGrid: e("bui/grid/simplegrid"),
        Grid: e("bui/grid/grid"),
        Column: e("bui/grid/column"),
        Header: e("bui/grid/header"),
        Format: e("bui/grid/format"),
        Plugins: e("bui/grid/plugins")
    }), n
}),define("bui/grid/simplegrid", ["bui/common", "bui/list"], function (e) {
    var t = e("bui/common"), n = e("bui/list"), r = t.Component, i = r.UIBase, s = t.prefix, o = s + "grid",
        u = o + "-row", a = s + "grid-row-odd", f = s + "grid-row-even", l = s + "grid-border",
        c = s + "grid-row-first", h = n.SimpleListView.extend({
            setColumns: function (e) {
                var n = this, r = n.get("headerRowEl");
                e = e || n.get("columns"), r.empty(), t.each(e, function (e) {
                    n._createColumn(e, r)
                })
            }, _createColumn: function (e, n) {
                var r = this, i = t.substitute(r.get("columnTpl"), e);
                $(i).appendTo(n)
            }, getItemTpl: function (e, n) {
                var r = this, i = r.get("columns"), s = r.get("rowTpl"), o = n % 2 === 0 ? a : f, u = [], l;
                return t.each(i, function (t) {
                    var n = t.dataIndex;
                    u.push(r._getCellTpl(t, n, e))
                }), s = t.substitute(s, {cellsTpl: u.join(""), oddCls: o}), s
            }, _getCellTpl: function (e, n, r) {
                var i = this, s = e.renderer, o = s ? s(r[n], r) : r[n], u = i.get("cellTpl");
                return t.substitute(u, {elCls: e.elCls, text: o})
            }, clearData: function () {
                var e = this, t = e.get("itemContainer");
                t.empty()
            }, showData: function (e) {
                var n = this;
                t.each(e, function (e, t) {
                    n._createRow(e, t)
                })
            }, _uiSetInnerBorder: function (e) {
                var t = this, n = t.get("el");
                e ? n.addClass(l) : n.removeClass(l)
            }, _uiSetTableCls: function (e) {
                var t = this, n = t.get("el").find("table");
                n.attr("class", e)
            }
        }, {
            ATTRS: {
                headerRowEl: {
                    valueFn: function () {
                        var e = this, t = e.get("el").find("thead");
                        return t.children("tr")
                    }
                }, itemContainer: {
                    valueFn: function () {
                        return this.get("el").find("tbody")
                    }
                }, tableCls: {}
            }
        }, {xclass: "simple-grid-veiw"}), p = t.List.SimpleList.extend({
            renderUI: function () {
                this.get("view").setColumns()
            }, bindUI: function () {
                var e = this, t = e.get("itemCls"), n = t + "-hover", r = e.get("el");
                r.delegate("." + t, "mouseover", function (e) {
                    var t = $(e.currentTarget);
                    t.addClass(n)
                }).delegate("." + t, "mouseout", function (e) {
                    var t = $(e.currentTarget);
                    t.removeClass(n)
                })
            }, showData: function (e) {
                this.clearData(), this.set("items", e)
            }, clearData: function () {
                this.get("view").clearData()
            }, _uiSetColumns: function (e) {
                var t = this;
                t.clearData(), t.get("view").setColumns(e)
            }
        }, {
            ATTRS: {
                itemCls: {view: !0, value: u},
                tableCls: {view: !0, value: o + "-table"},
                columns: {view: !0, sync: !1, value: []},
                tpl: {
                    view: !0,
                    value: '<table cellspacing="0" class="{tableCls}" cellpadding="0"><thead><tr></tr></thead><tbody></tbody></table>'
                },
                innerBorder: {view: !0, value: !0},
                rowTpl: {view: !0, value: '<tr class="' + u + ' {oddCls}">{cellsTpl}</tr>'},
                cellTpl: {
                    view: !0,
                    value: '<td class="' + o + '-cell {elCls}"><div class="' + o + '-cell-inner"><span class="' + o + '-cell-text">{text}</span></div></td>'
                },
                columnTpl: {
                    view: !0,
                    value: '<th class="' + o + '-hd {elCls}" width="{width}"><div class="' + o + '-hd-inner"><span class="' + o + '-hd-title">{title}</span></div></th>'
                },
                events: {value: {}},
                xview: {value: h}
            }
        }, {xclass: "simple-grid"});
    return p.View = h, p
}),define("bui/grid/column", ["bui/common"], function (e) {
    var t = e("bui/common"), n = t.prefix, r = n + "grid-hd-title", i = n + "grid-hd-open", s = "sort-", o = "ASC",
        u = "DESC", a = n + "grid-hd-menu-trigger", f = "grid-hd-menu-trigger", l = t.Component.View.extend({
            setTplContent: function (e) {
                var t = this, n = t.get("sortTpl"), i = t.get("triggerTpl"), s = t.get("el"), o;
                l.superclass.setTplContent.call(t, e), o = s.find("." + r), $(n).insertAfter(o), $(i).insertAfter(o)
            }, _setContent: function () {
                this.setTplContent()
            }, _uiSetShowMenu: function (e) {
                var t = this, n = t.get("triggerTpl"), i = t.get("el"), s = i.find("." + r);
                e ? $(n).insertAfter(s) : i.find("." + a).remove()
            }, _uiSetTitle: function (e) {
                if (!this.get("rendered")) return;
                this._setContent()
            }, _uiSetDraggable: function (e) {
                if (!this.get("rendered")) return;
                this._setContent()
            }, _uiSetSortable: function (e) {
                if (!this.get("rendered")) return;
                this._setContent()
            }, _uiSetTpl: function (e) {
                if (!this.get("rendered")) return;
                this._setContent()
            }, _uiSetSortState: function (e) {
                var t = this, n = t.get("el"), r = e ? "addClass" : "removeClass", i = s + "asc", o = s + "desc";
                n.removeClass(i + " " + o), e === "ASC" ? n.addClass(i) : e === "DESC" && n.addClass(o)
            }, _uiSetOpen: function (e) {
                var t = this, n = t.get("el");
                e ? n.addClass(i) : n.removeClass(i)
            }
        }, {
            ATTRS: {
                sortTpl: {
                    view: !0, getter: function () {
                        var e = this, t = e.get("sortable");
                        return t ? '<span class="' + n + 'grid-sort-icon">&nbsp;</span>' : ""
                    }
                }, tpl: {}
            }
        }), c = t.Component.Controller.extend({
            _toggleSortState: function () {
                var e = this, t = e.get("sortState"), n = t ? t === o ? u : o : o;
                e.set("sortState", n)
            }, performActionInternal: function (e) {
                var t = this, n = $(e.target), r = t.get("prefixCls");
                n.hasClass(r + f) || t.get("sortable") && t._toggleSortState()
            }, _uiSetWidth: function (e) {
                e && this.set("originWidth", e)
            }
        }, {
            ATTRS: {
                elTagName: {value: "th"},
                open: {view: !0, value: !1},
                dataIndex: {view: !0, value: ""},
                draggable: {sync: !1, view: !0, value: !0},
                editor: {},
                focusable: {value: !1},
                fixed: {value: !1},
                id: {},
                renderer: {},
                resizable: {value: !0},
                sortable: {sync: !1, view: !0, value: !0},
                sortState: {view: !0, value: null},
                title: {sync: !1, view: !0, value: "&#160;"},
                width: {value: 100},
                showMenu: {view: !0, value: !1},
                triggerTpl: {view: !0, value: '<span class="' + a + '"></span>'},
                tpl: {
                    sync: !1,
                    view: !0,
                    value: '<div class="' + n + 'grid-hd-inner">' + '<span class="' + r + '">{title}</span>' + "</div>"
                },
                cellTpl: {value: ""},
                events: {
                    value: {
                        afterWidthChange: !0,
                        afterSortStateChange: !0,
                        afterVisibleChange: !0,
                        click: !0,
                        resize: !0,
                        move: !0
                    }
                },
                xview: {value: l}
            }
        }, {xclass: "grid-hd", priority: 1});
    return c.Empty = c.extend({}, {
        ATTRS: {
            type: {value: "empty"},
            sortable: {view: !0, value: !1},
            width: {view: !0, value: null},
            tpl: {view: !0, value: '<div class="' + n + 'grid-hd-inner"></div>'}
        }
    }, {xclass: "grid-hd-empty", priority: 1}), c
}),define("bui/grid/header", ["bui/common", "bui/grid/column"], function (e) {
    var t = e("bui/common"), n = t.prefix, r = t.namespace("Grid"), i = e("bui/grid/column"), s = t.Component.View,
        o = t.Component.Controller, u = 17, a = t.UA, f = s.extend({
            getContentElement: function () {
                return this.get("el").find("tr")
            }, scrollTo: function (e) {
                var t = this, n = t.get("el");
                e.top !== undefined && n.scrollTop(e.top), e.left !== undefined && n.scrollLeft(e.left)
            }, _uiSetTableCls: function (e) {
                var t = this, n = t.get("el").find("table");
                n.attr("class", e)
            }
        }, {ATTRS: {emptyCellEl: {}, tableCls: {}}}, {xclass: "header-view"}), l = o.extend({
            addColumn: function (e, t) {
                var n = this, r = t, i = n.get("columns");
                return e = n._createColumn(e), t === undefined && (t = i.length, r = n.get("children").length - 1), i.splice(t, 0, e), n.addChild(e, r), n.fire("add", {
                    column: e,
                    index: t
                }), e
            }, removeColumn: function (e) {
                var n = this, r = n.get("columns"), i;
                return e = t.isNumber(e) ? r[e] : e, i = t.Array.indexOf(e, r), r.splice(i, 1), n.fire("remove", {
                    column: e,
                    index: i
                }), n.removeChild(e, !0)
            }, bindUI: function () {
                var e = this;
                e._bindColumnsEvent()
            }, initializer: function () {
                var e = this, t = e.get("children"), n = e.get("columns"), r;
                $.each(n, function (r, i) {
                    var s = e._createColumn(i);
                    t[r] = s, n[r] = s
                }), r = e._createEmptyColumn(), t.push(r), e.set("emptyColumn", r)
            }, getColumns: function () {
                return this.get("columns")
            }, getColumnsWidth: function () {
                var e = this, t = e.getColumns(), n = 0;
                return $.each(t, function (e, t) {
                    t.get("visible") && (n += t.get("el").outerWidth())
                }), n
            }, getColumnOriginWidth: function () {
                var e = this, t = e.getColumns(), n = 0;
                return $.each(t, function (e, t) {
                    if (t.get("visible")) {
                        var r = t.get("originWidth") || t.get("width");
                        n += r
                    }
                }), n
            }, getColumnByIndex: function (e) {
                var t = this, n = t.getColumns(), r = n[e];
                return r
            }, getColumn: function (e) {
                var t = this, n = t.getColumns(), r = null;
                return $.each(n, function (t, n) {
                    if (e(n)) return r = n, !1
                }), r
            }, getColumnById: function (e) {
                var t = this;
                return t.getColumn(function (t) {
                    return t.get("id") === e
                })
            }, getColumnIndex: function (e) {
                var n = this, r = n.getColumns();
                return t.Array.indexOf(e, r)
            }, scrollTo: function (e) {
                this.get("view").scrollTo(e)
            }, _bindColumnsEvent: function () {
                var e = this;
                e.on("afterWidthChange", function (t) {
                    var n = t.target;
                    n !== e && e.setTableWidth()
                }), e.on("afterVisibleChange", function (t) {
                    var n = t.target;
                    n !== e && e.setTableWidth()
                }), e.on("afterSortStateChange", function (t) {
                    var n = t.target, r = e.getColumns(), i = t.newVal;
                    i && $.each(r, function (e, t) {
                        t !== n && t.set("sortState", "")
                    })
                }), e.on("add", function () {
                    e.setTableWidth()
                }), e.on("remove", function () {
                    e.setTableWidth()
                })
            }, _createColumn: function (e) {
                return e instanceof i ? e : (e.id || (e.id = t.guid("col")), new i(e))
            }, _createEmptyColumn: function () {
                return new i.Empty
            }, _isAllowScrollLeft: function () {
                var e = this, t = e.get("parent");
                return t && !!t.get("height")
            }, forceFitColumns: function () {
                function l(e, t) {
                    var n = e.get("el");
                    e.set("width", t, {silent: 1}), n.width(t)
                }

                var e = this, t = e.getColumns(), n = e.get("width"), r = n, i = e.getColumnOriginWidth(), s = 0, o = 0,
                    a = null, f = e._isAllowScrollLeft();
                if (n) {
                    f && (n -= u, r = n);
                    var c = 0;
                    $.each(t, function (e, t) {
                        t.get("visible") && t.get("resizable") && c++;
                        if (t.get("visible") && !t.get("resizable")) {
                            var n = t.get("el").outerWidth();
                            r -= n, i -= n
                        }
                    });
                    var h = Math.floor(r / c), p = r / i;
                    if (p === 1) return;
                    $.each(t, function (t, n) {
                        if (n.get("visible") && n.get("resizable")) {
                            var r = e._getColumnBorderWith(n, t), i = n.get("originWidth");
                            i || (n.set("originWidth", n.get("width")), i = n.get("width")), h = Math.floor((i + r) * p), l(n, h - r), s += h, a = n
                        }
                    }), a && (o = r - s, l(a, a.get("width") + o)), e.fire("forceFitWidth")
                }
            }, _getColumnBorderWith: function (e, t) {
                var n = e.get("el"),
                    r = Math.round(parseFloat(n.css("border-left-width")) || 0) + Math.round(parseFloat(n.css("border-right-width")) || 0);
                return r = a.ie && a.ie < 8 ? t === 0 ? 1 : r : r, r
            }, setTableWidth: function () {
                var e = this, t = e.get("width"), n = 0, r = null;
                if (t == "auto") return;
                e.get("forceFit") ? e.forceFitColumns() : e._isAllowScrollLeft() && (n = e.getColumnsWidth(), r = e.get("emptyColumn"), t < n ? r.get("el").width(u) : r.get("el").width("auto"))
            }, _uiSetWidth: function () {
                var e = this;
                e.setTableWidth()
            }, _uiSetForceFit: function (e) {
                var t = this;
                e && t.setTableWidth()
            }
        }, {
            ATTRS: {
                columns: {value: []},
                emptyColumn: {},
                focusable: {value: !1},
                forceFit: {sync: !1, view: !0, value: !1},
                tpl: {
                    view: !0,
                    value: '<table cellspacing="0" class="' + n + 'grid-table" cellpadding="0">' + "<thead><tr></tr></thead>" + "</table>"
                },
                tableCls: {view: !0},
                xview: {value: f},
                events: {value: {add: !1, remove: !1}}
            }
        }, {xclass: "grid-header", priority: 1});
    return l
}),define("bui/grid/grid", ["bui/common", "bui/mask", "bui/toolbar", "bui/list", "bui/grid/header", "bui/grid/column"], function (e) {
    function f(e) {
        return t.isString(e) ? e.indexOf("%") !== -1 : !1
    }

    function P(e) {
        var n = this;
        return t.isNumber(e) && (e -= _), e
    }

    var t = e("bui/common"), n = e("bui/mask"), r = t.UA, i = t.Component, s = e("bui/toolbar"
        ), o = e("bui/list"), u = e("bui/grid/header"), a = e("bui/grid/column"), l = t.prefix,
        c = l + "grid-header-container", h = l + "grid-body", p = l + "grid-width", d = l + "grid-height",
        v = l + "grid-border", m = l + "grid-tbar", g = l + "grid-bbar", y = l + "grid-button-bar",
        b = l + "grid-strip", w = l + "grid-row", E = l + "grid-row-odd", S = l + "grid-row-even",
        x = l + "grid-row-first", T = l + "grid-cell", N = l + "grid-cell-inner", C = "grid-td-",
        k = l + "grid-cell-text", L = l + "grid-cell-empty", A = "17", O = l + "hidden", M = "data-column-field", _ = 2,
        D = 1, H = o.SimpleListView.extend({
            renderUI: function () {
                var e = this, t = e.get("el"), n = t.find("." + h);
                e.set("bodyEl", n), e._setTableTpl()
            }, getItemTpl: function (e, n) {
                var r = this, i = r._getColumns(), s = r.get("tbodyEl"), o = r.get("rowTpl"), u = n % 2 === 0 ? E : S,
                    a = [], f;
                return t.each(i, function (t) {
                    var i = t.get("dataIndex");
                    a.push(r._getCellTpl(t, i, e, n))
                }), r.get("useEmptyCell") && a.push(r._getEmptyCellTpl()), o = t.substitute(o, {
                    cellsTpl: a.join(""),
                    oddCls: u
                }), o
            }, findRow: function (e) {
                var t = this;
                return $(t.findElement(e))
            }, findCell: function (e, t) {
                var n = C + e;
                return t.find("." + n)
            }, resetHeaderRow: function () {
                if (!this.get("useHeaderRow")) return;
                var e = this, t = e.get("headerRowEl"), n = e.get("tbodyEl");
                t && t.remove(), t = e._createHeaderRow(), t.prependTo(n), e.set("headerRowEl", t)
            }, resetColumnsWidth: function (e, t) {
                var n = this, r = n.get("headerRowEl"), i = n.findCell(e.get("id"), r);
                t = t || e.get("width"), i && i.width(t), n.setTableWidth()
            }, setTableWidth: function (e) {
                if (!e && f(this.get("width"))) {
                    this.get("tableEl").width("100%");
                    return
                }
                var t = this, n = t._getInnerWidth(), i = t.get("height"), s = t.get("tableEl"), o = t.get("forceFit"),
                    u = t.get("headerRowEl");
                if (!f(e)) {
                    e = e || t._getColumnsWidth();
                    if (!n) return;
                    if (n >= e) {
                        e = n;
                        if (i) {
                            var a = r.ie == 6 || r.ie == 7 ? A + 2 : A;
                            e = n - a
                        }
                    }
                }
                s.width(e)
            }, setBodyWidth: function (e) {
                var t = this, n = t.get("bodyEl");
                e = e || t._getInnerWidth(), n.width(e)
            }, setBodyHeight: function (e) {
                var n = this, r = n.get("bodyEl"), i = e, s = r.siblings();
                t.each(s, function (e) {
                    $(e).css("display") !== "none" && (i -= $(e).outerHeight())
                }), r.height(i)
            }, setColumnVisible: function (e) {
                var t = this, n = !e.get("visible"), r = e.get("id"), i = t.get("tbodyEl"), s = $("." + C + r, i);
                n ? s.hide() : s.show()
            }, updateItem: function (e) {
                var n = this, r = n.getItems(), i = t.Array.indexOf(e, r), s = n._getColumns(), o = null, u;
                if (i >= 0) return o = n.findElement(e), t.each(s, function (t) {
                    var r = n.findCell(t.get("id"), $(o)), s = r.find("." + N), u = n._getCellText(t, e, i);
                    s.html(u)
                }), o
            }, showEmptyText: function () {
                var e = this, t = e.get("bodyEl"), n = e.get("emptyDataTpl"), r = e.get("emptyEl");
                r && r.remove();
                var r = $(n).appendTo(t);
                e.set("emptyEl", r)
            }, clearEmptyText: function () {
                var e = this, t = e.get("emptyEl");
                t && t.remove()
            }, _createHeaderRow: function () {
                var e = this, n = e._getColumns(), r = e.get("tbodyEl"), i = e.get("headerRowTpl"), s, o = [];
                return $.each(n, function (t, n) {
                    o.push(e._getHeaderCellTpl(n))
                }), e.get("useEmptyCell") && o.push(e._getEmptyCellTpl()), i = t.substitute(i, {cellsTpl: o.join("")}), s = $(i).appendTo(r), s
            }, _getColumnsWidth: function () {
                var e = this, n = e.get("columns"), r = 0;
                return t.each(n, function (e) {
                    e.get("visible") && (r += e.get("el").outerWidth())
                }), r
            }, _getColumns: function () {
                return this.get("columns")
            }, _getCellText: function (e, n, r) {
                var i = this, s = e.get("dataIndex"), o = e.get("cellTpl") || i.get("cellTextTpl"),
                    u = i._getCellInnerText(e, s, n, r);
                return t.substitute(o, {text: u, tips: i._getTips(e, s, n)})
            }, _getCellInnerText: function (e, t, n, r) {
                try {
                    var i = this, s = e.get("renderer"), o = s ? s(n[t], n, r) : n[t];
                    return o == null ? "" : o
                } catch (u) {
                    throw"column:" + e.get("title") + " fomat error!"
                }
            }, _getCellTpl: function (e, n, r, i) {
                var s = this, o = s._getCellText(e, r, i), u = s.get("cellTpl");
                return t.substitute(u, {
                    elCls: e.get("elCls"),
                    id: e.get("id"),
                    dataIndex: n,
                    cellText: o,
                    hideCls: e.get("visible") ? "" : O
                })
            }, _getEmptyCellTpl: function () {
                return '<td class="' + T + " " + L + '">&nbsp;</td>'
            }, _getHeaderCellTpl: function (e) {
                var n = this, r = n.get("headerCellTpl");
                return t.substitute(r, {id: e.get("id"), width: e.get("width"), hideCls: e.get("visible") ? "" : O})
            }, _getInnerWidth: function () {
                return P(this.get("width"))
            }, _getTips: function (e, n, r) {
                var i = e.get("showTip"), s = "";
                return i && (s = r[n], t.isFunction(i) && (s = i(s, r))), s
            }, _uiSetInnerBorder: function (e) {
                var t = this, n = t.get("el");
                e ? n.addClass(v) : n.removeClass(v)
            }, _setTableTpl: function (e) {
                var t = this, n = t.get("bodyEl");
                e = e || t.get("tableTpl"), $(e).appendTo(n);
                var r = n.find("table"), i = n.find("tbody");
                t.set("tableEl", r), t.set("tbodyEl", i), t.set("itemContainer", i), t._setTableCls(t.get("tableCls"))
            }, _uiSetTableCls: function (e) {
                this._setTableCls(e)
            }, _uiSetHeight: function (e) {
                var t = this, n = t.get("bodyEl");
                t.get("el").height(e), t.get("el").addClass(d)
            }, _uiSetWidth: function (e) {
                var t = this;
                t.get("el").width(e), t.setBodyWidth(t._getInnerWidth(e)), t.get("el").addClass(p)
            }, _uiSetStripeRows: function (e) {
                var t = this, n = e ? "addClass" : "removeClass";
                t.get("el")[n](b)
            }, _setTableCls: function (e) {
                var t = this, n = t.get("tableEl");
                n.attr("class", e)
            }
        }, {
            ATTRS: {
                tableCls: {},
                bodyEl: {},
                tbodyEl: {},
                headerRowEl: {},
                tableEl: {},
                emptyEl: {}
            }
        }, {xclass: "grid-view"}), B = o.SimpleList.extend({
            createDom: function () {
                var e = this, t = e.get("render"), n = $(t).width(), r = e.get("width");
                if (!r && n) {
                    var i = e.getAppendWidth();
                    e.set("width", n - i)
                }
                e.get("width") && e.get("el").addClass(p), e.get("height") && e.get("el").addClass(d), e.get("innerBorder") && e.get("el").addClass(v)
            }, renderUI: function () {
                var e = this;
                e._initHeader(), e._initBars(), e._initLoadMask(), e.get("view").resetHeaderRow()
            }, bindUI: function () {
                var e = this;
                e._bindHeaderEvent(), e._bindBodyEvent(), e._bindItemsEvent()
            }, addColumn: function (e, t) {
                var n = this, r = n.get("header");
                return r ? e = r.addColumn(e, t) : (e = new a(e), n.get("columns").splice(t, 0, e)), e
            }, clearData: function () {
                this.clearItems()
            }, getRecords: function () {
                return this.getItems()
            }, findColumn: function (e) {
                var n = this, r = n.get("header");
                return t.isNumber(e) ? r.getColumnByIndex(e) : r.getColumnById(e)
            }, findColumnByField: function (e) {
                var t = this, n = t.get("header");
                return n.getColumn(function (t) {
                    return t.get("dataIndex") === e
                })
            }, findCell: function (e, t) {
                var n = this, r = null;
                return t instanceof $ ? r = t : r = n.findRow(t), r ? n.get("view").findCell(e, r) : null
            }, findRow: function (e) {
                var t = this;
                return t.get("view").findRow(e)
            }, removeColumn: function (e) {
                var t = this;
                t.get("header").removeColumn(e)
            }, showData: function (e) {
                var t = this;
                t.set("items", e)
            }, resetColumns: function () {
                var e = this, t = e.get("store");
                e.get("view").resetHeaderRow(), t && e.onLoad()
            }, _bindScrollEvent: function () {
                var e = this, t = e.get("el"), n = t.find("." + h), r = e.get("header");
                n.on("scroll", function () {
                    var t = n.scrollLeft(), i = n.scrollTop();
                    r.scrollTo({left: t, top: i}), e.fire("scroll", {
                        scrollLeft: t,
                        scrollTop: i,
                        bodyWidth: n.width(),
                        bodyHeight: n.height()
                    })
                })
            }, _bindHeaderEvent: function () {
                var e = this, t = e.get("header"), n = e.get("view"), r = e.get("store");
                t.on("afterWidthChange", function (e) {
                    var r = e.target;
                    r !== t && n.resetColumnsWidth(r)
                }), t.on("afterSortStateChange", function (e) {
                    var t = e.target, n = e.newVal;
                    n && r && r.sort(t.get("dataIndex"), t.get("sortState"))
                }), t.on("afterVisibleChange", function (r) {
                    var i = r.target;
                    i !== t && (n.setColumnVisible(i), e.fire("columnvisiblechange", {column: i}))
                }), t.on("click", function (n) {
                    var r = n.target;
                    r !== t && e.fire("columnclick", {column: r, domTarget: n.domTarget})
                }), t.on("forceFitWidth", function () {
                    e.get("rendered") && e.resetColumns()
                }), t.on("add", function (t) {
                    e.get("rendered") && (e.fire("columnadd", {column: t.column, index: t.index}), e.resetColumns())
                }), t.on("remove", function (t) {
                    e.get("rendered") && (e.resetColumns(), e.fire("columnremoved", {column: t.column, index: t.index}))
                })
            }, _bindBodyEvent: function () {
                var e = this;
                e._bindScrollEvent()
            }, _bindItemsEvent: function () {
                function n(e) {
                    return {record: e.item, row: e.domTarget, domTarget: e.domTarget}
                }

                var e = this, t = e.get("store");
                e.on("itemsshow", function () {
                    e.fire("aftershow")
                }), e.on("itemsclear", function () {
                    e.fire("clear")
                }), e.on("itemclick", function (t) {
                    var n = t.domTarget, r = t.item, i = $(n).closest("." + T), s = $(n).closest("." + w), o;
                    return i.length && (o = e.fire("cellclick", {
                        record: r,
                        row: s[0],
                        cell: i[0],
                        field: i.attr(M),
                        domTarget: n,
                        domEvent: t.domEvent
                    })), o === !1 ? o : e.fire("rowclick", {record: r, row: s[0], domTarget: n})
                }), e.on("itemunselected", function (t) {
                    e.fire("rowunselected", n(t))
                }), e.on("itemselected", function (t) {
                    e.fire("rowselected", n(t))
                }), e.on("itemrendered", function (t) {
                    e.fire("rowcreated", n(t))
                }), e.on("itemremoved", function (t) {
                    e.fire("rowremoved", n(t))
                }), e.on("itemupdated", function (t) {
                    e.fire("rowupdated", n(t))
                })
            }, _getInnerWidth: function (e) {
                return e = e || this.get("width"), P(e)
            }, _initHeader: function () {
                var e = this, t = e.get("header"), n = e.get("el").find("." + c);
                t || (t = (new u({
                    columns: e.get("columns"),
                    tableCls: e.get("tableCls"),
                    forceFit: e.get("forceFit"),
                    width: e._getInnerWidth(),
                    render: n,
                    parent: e
                })).render(), e.set("header", t))
            }, _initBars: function () {
                var e = this, t = e.get("bbar"), n = e.get("tbar");
                e._initBar(t, g, "bbar"), e._initBar(n, m, "tbar")
            }, _initBar: function (e, n, r) {
                var s = this, o = null, u = null;
                if (e) {
                    !e.xclass && !(e instanceof i.Controller) && (e.xclass = "bar", e.children = e.children || [], e.items && (e.children.push({
                        xclass: "bar",
                        defaultChildClass: "bar-item-button",
                        elCls: y,
                        children: e.items
                    }), e.items = null), e.pagingBar && (o = s.get("store"), u = {
                        xclass: "pagingbar",
                        store: o,
                        pageSize: o.pageSize
                    }, e.pagingBar !== !0 && (u = t.merge(u, e.pagingBar)), e.children.push(u)));
                    if (e.xclass) {
                        var a = s.get("el").find("." + n);
                        a.show(), e.render = a, e.elTagName = "div", e.autoRender = !0, e = s.addChild(e)
                    }
                    s.set(r, e)
                }
                return e
            }, _initLoadMask: function () {
                var e = this, n = e.get("loadMask");
                n && !n.show && (n = new t.Mask.LoadMask({el: e.get("el")}), e.set("loadMask", n))
            }, _uiSetWidth: function (e) {
                var t = this;
                t.get("rendered") && (f(e) ? t.get("header").set("width", "100%") : t.get("header").set("width", t._getInnerWidth(e))), t.get("view").setTableWidth()
            }, _uiSetForceFit: function (e) {
                var t = this;
                t.get("header").set("forceFit", e)
            }, _uiSetHeight: function (e, t) {
                var n = this, r = n.get("header");
                n.get("view").setBodyHeight(e), n.get("rendered") && (n.get("forceFit") && !t.prevVal && (r.forceFitColumns(), n.get("view").setTableWidth()), r.setTableWidth())
            }, onLoad: function () {
                var e = this, t = e.get("store");
                B.superclass.onLoad.call(this), e.get("emptyDataTpl") && (t && t.getCount() == 0 ? e.get("view").showEmptyText() : e.get("view").clearEmptyText())
            }
        }, {
            ATTRS: {
                header: {},
                bbar: {},
                itemCls: {value: w},
                columns: {view: !0, value: []},
                forceFit: {sync: !1, view: !0, value: !1},
                emptyDataTpl: {view: !0},
                headerRowTpl: {view: !0, value: '<tr class="' + l + 'grid-header-row">{cellsTpl}</tr>'},
                headerCellTpl: {
                    view: !0,
                    value: '<td class="{hideCls} ' + C + '{id}" width="{width}" style="height:0"></td>'
                },
                rowTpl: {view: !0, value: '<tr class="' + w + ' {oddCls}">{cellsTpl}</tr>'},
                cellTpl: {
                    view: !0,
                    value: '<td  class="{elCls} {hideCls} ' + T + " " + C + '{id}" data-column-id="{id}" data-column-field = "{dataIndex}" >' + '<div class="' + N + '" >{cellText}</div>' + "</td>"
                },
                cellTextTpl: {view: !0, value: '<span class="' + k + ' " title = "{tips}">{text}</span>'},
                events: {
                    value: {
                        aftershow: !1,
                        clear: !1,
                        cellclick: !1,
                        columnclick: !1,
                        rowclick: !1,
                        rowcreated: !1,
                        rowremoved: !1,
                        rowselected: !1,
                        rowunselected: !1,
                        scroll: !1
                    }
                },
                stripeRows: {view: !0, value: !0},
                tbar: {},
                tableCls: {view: !0, sync: !1, value: l + "grid-table"},
                tableTpl: {view: !0, value: '<table cellspacing="0" cellpadding="0" ><tbody></tbody></table>'},
                tpl: {value: '<div class="' + m + '" style="display:none"></div><div class="' + c + '"></div><div class="' + h + '"></div><div style="display:none" class="' + g + '"></div>'},
                innerBorder: {sync: !1, value: !0},
                useEmptyCell: {view: !0, value: !0},
                useHeaderRow: {view: !0, value: !0},
                xview: {value: H}
            }
        }, {xclass: "grid"});
    return B.View = H, B
}),define("bui/grid/format", function (e) {
    function t(e) {
        return e < 10 ? "0" + e : e
    }

    var n = {
        dateRenderer: function (e) {
            if (!e) return "";
            if (BUI.isString(e)) return e;
            var n = null;
            try {
                n = new Date(e)
            } catch (r) {
                return ""
            }
            return !n || !n.getFullYear ? "" : n.getFullYear() + "-" + t(n.getMonth() + 1) + "-" + t(n.getDate())
        }, datetimeRenderer: function (e) {
            if (!e) return "";
            if (BUI.isString(e)) return e;
            var n = null;
            try {
                n = new Date(e)
            } catch (r) {
                return ""
            }
            return !n || !n.getFullYear ? "" : n.getFullYear() + "-" + t(n.getMonth() + 1) + "-" + t(n.getDate()) + " " + t(n.getHours()) + ":" + t(n.getMinutes()) + ":" + t(n.getSeconds())
        }, cutTextRenderer: function (e) {
            return function (t) {
                return t = t || "", t.toString().length > e ? t.toString().substring(0, e) + "..." : t
            }
        }, enumRenderer: function (e) {
            return function (t) {
                return e[t] || ""
            }
        }, multipleItemsRenderer: function (e) {
            var t = n.enumRenderer(e);
            return function (e) {
                var n = [];
                return e ? (BUI.isArray(e) || (e = e.toString().split(",")), $.each(e, function (e, r) {
                    n.push(t(r))
                }), n.join(",")) : ""
            }
        }, moneyCentRenderer: function (e) {
            return BUI.isString(e) && (e = parseFloat(e)), $.isNumberic(e) ? (e * .01).toFixed(2) : e
        }
    };
    return n
}),function () {
    var e = "bui/grid/plugins/";
    define("bui/grid/plugins", ["bui/common", e + "selection", e + "cascade", e + "cellediting", e + "rowediting", e + "autofit", e + "dialogediting", e + "menu", e + "summary", e + "rownumber", e + "columngroup", e + "rowgroup"], function (t) {
        var n = t("bui/common"), r = t(e + "selection"), i = {};
        return n.mix(i, {
            CheckSelection: r.CheckSelection,
            RadioSelection: r.RadioSelection,
            Cascade: t(e + "cascade"),
            CellEditing: t(e + "cellediting"),
            RowEditing: t(e + "rowediting"),
            DialogEditing: t(e + "dialogediting"),
            AutoFit: t(e + "autofit"),
            GridMenu: t(e + "menu"),
            Summary: t(e + "summary"),
            RowNumber: t(e + "rownumber"),
            ColumnGroup: t(e + "columngroup"),
            RowGroup: t(e + "rowgroup")
        }), i
    })
}(),define("bui/grid/plugins/autofit", ["bui/common"], function (e) {
    var t = e("bui/common"), n = t.UA, r = function (e) {
        r.superclass.constructor.call(this, e)
    };
    return t.extend(r, t.Base), r.ATTRS = {}, t.augment(r, {
        bindUI: function (e) {
            var t = this, n;
            $(window).on("resize", function () {
                function r() {
                    clearTimeout(n), n = setTimeout(function () {
                        t._autoFit(e)
                    }, 100), t.set("handler", n)
                }

                r()
            })
        }, _autoFit: function (e) {
            var t = this, n = $(e.get("render")), r = $(window).width(), i, s = 0, o = e.get("el").parent();
            while (o[0] && o[0] != $("body")[0]) s += o.outerWidth() - o.width(), o = o.parent();
            e.set("width", r - s)
        }
    }), r
}),define("bui/grid/plugins/menu", ["bui/common", "bui/menu"], function (e) {
    var t = e("bui/common"), n = e("bui/menu"), r = t.prefix, i = "sort-asc", s = "sort-desc", o = "column-setting",
        u = "icon-check", a = function (e) {
            a.superclass.constructor.call(this, e)
        };
    return t.extend(a, t.Base), a.ATTRS = {
        menu: {},
        activedColumn: {},
        triggerCls: {value: r + "grid-hd-menu-trigger"},
        items: {
            value: [{id: i, text: "\u5347\u5e8f", iconCls: "icon-arrow-up"}, {
                id: s,
                text: "\u964d\u5e8f",
                iconCls: "icon-arrow-down"
            }, {xclass: "menu-item-sparator"}, {id: o, text: "\u8bbe\u7f6e\u5217", iconCls: "icon-list-alt"}]
        }
    }, t.augment(a, {
        initializer: function (e) {
            var t = this;
            t.set("grid", e)
        }, renderUI: function (e) {
            var n = this, r = e.get("columns");
            t.each(r, function (e) {
                n._addShowMenu(e)
            })
        }, bindUI: function (e) {
            var t = this;
            e.on("columnadd", function (e) {
                t._addShowMenu(e.column)
            }), e.on("columnclick", function (e) {
                var n = $(e.domTarget), r = e.column, i;
                t.set("activedColumn", r), n.hasClass(t.get("triggerCls")) && (i = t.get("menu") || t._initMenu(), i.set("align", {
                    node: n,
                    points: ["bl", "tl"],
                    offset: [0, 0]
                }), i.show(), t._afterShow(r, i))
            })
        }, _addShowMenu: function (e) {
            e.get("fixed") || e.set("showMenu", !0)
        }, _afterShow: function (e, t) {
            var n = this, r = n.get("grid");
            t = t || n.get("menu"), n._resetSortMenuItems(e, t), n._resetColumnsVisible(t)
        }, _resetColumnsVisible: function (e) {
            var t = this, n = e.findItemById(o), r = n.get("subMenu") || t._initColumnsMenu(n),
                i = t.get("grid").get("columns");
            r.removeChildren(!0), $.each(i, function (e, t) {
                if (!t.get("fixed")) {
                    var n = {xclass: "context-menu-item", text: t.get("title"), column: t, iconCls: "icon"},
                        i = r.addChild(n);
                    t.get("visible") && i.set("selected", !0)
                }
            })
        }, _resetSortMenuItems: function (e, t) {
            var n = t.findItemById(i), r = t.findItemById(s);
            e.get("sortable") ? (n.set("disabled", !1), r.set("disabled", !1)) : (n.set("disabled", !0), r.set("disabled", !0))
        }, _initMenu: function () {
            var e = this, t = e.get("menu"), r;
            return t || (r = e.get("items"), $.each(r, function (e, t) {
                t.xclass || (t.xclass = "context-menu-item")
            }), t = new n.ContextMenu({children: r, elCls: "grid-menu"}), e._initMenuEvent(t), e.set("menu", t)), t
        }, _initMenuEvent: function (e) {
            var t = this;
            e.on("itemclick", function (e) {
                var n = e.item, r = n.get("id"), o = t.get("activedColumn");
                r === i ? o.set("sortState", "ASC") : r === s && o.set("sortState", "DESC")
            }), e.on("afterVisibleChange", function (e) {
                var n = e.newVal, r = t.get("activedColumn");
                n && r ? r.set("open", !0) : r.set("open", !1)
            })
        }, _initColumnsMenu: function (e) {
            var t = new n.ContextMenu({multipleSelect: !0, elCls: "grid-column-menu"});
            return e.set("subMenu", t), t.on("itemclick", function (e) {
                var t = e.item, n = t.get("column"), r = t.get("selected");
                r ? n.set("visible", !0) : n.set("visible", !1)
            }), t
        }, destructor: function () {
            var e = this, t = e.get("menu");
            t && t.destroy(), e.off(), e.clearAttrVals()
        }
    }), a
}),define("bui/grid/plugins/cascade", ["bui/common"], function (e) {
    var t = e("bui/common"), n = t.prefix, r = "", i = "data-record", s = n + "grid-cascade", o = s + "-expand",
        u = s + "-row", a = s + "-cell", f = s + "-collapse", l = function (e) {
            l.superclass.constructor.call(this, e)
        };
    return t.extend(l, t.Base), l.ATTRS = {
        width: {value: 40},
        cellInner: {value: '<span class="' + s + '"><i class="' + s + '-icon"></i></span>'},
        rowTpl: {value: '<tr class="' + u + '"><td class="' + a + '"></td></tr>'},
        renderer: {},
        events: ["expand", "collapse", "removed"]
    }, t.augment(l, {
        initializer: function (e) {
            var t = this, n = {
                title: "",
                elCls: "center",
                width: t.get("width"),
                resizable: !1,
                fixed: !0,
                sortable: !1,
                cellTpl: t.get("cellInner")
            }, r = e.addColumn(n, 0);
            e.set("innerBorder", !1), t.set("grid", e)
        }, bindUI: function (e) {
            var t = this;
            e.on("cellclick", function (e) {
                var n = $(e.domTarget), r = n.closest("." + s);
                r.length && (r.hasClass(o) ? t._onCollapse(e.record, e.row, r) : t._onExpand(e.record, e.row, r))
            }), e.on("columnvisiblechange", function () {
                t._resetColspan()
            }), e.on("rowremoved", function (e) {
                t.remove(e.record)
            }), e.on("clear", function () {
                t.removeAll()
            })
        }, expandAll: function () {
            var e = this, t = e.get("grid"), n = t.getRecords();
            $.each(n, function (t, n) {
                e.expand(n)
            })
        }, expand: function (e) {
            var t = this, n = t.get("grid"), r = n.findRow(e);
            r && t._onExpand(e, r)
        }, collapse: function (e) {
            var t = this, n = t.get("grid"), r = n.findRow(e);
            r && t._onCollapse(e, r)
        }, removeAll: function () {
            var e = this, t = e._getAllCascadeRows();
            t.each(function (t, n) {
                e._removeCascadeRow(n)
            })
        }, remove: function (e) {
            var t = this, n = t._findCascadeRow(e);
            n && t._removeCascadeRow(n)
        }, collapseAll: function () {
            var e = this, t = e.get("grid"), n = t.getRecords();
            $.each(n, function (t, n) {
                e.collapse(n)
            })
        }, _getRowRecord: function (e) {
            return $(e).data(i)
        }, _removeCascadeRow: function (e) {
            this.fire("removed", {record: $(e).data(i), row: e}), $(e).remove()
        }, _findCascadeRow: function (e) {
            var t = this, n = t._getAllCascadeRows(), r = null;
            return $.each(n, function (n, i) {
                if (t._getRowRecord(i) === e) return r = i, !1
            }), r
        }, _getAllCascadeRows: function () {
            var e = this, t = e.get("grid");
            return t.get("el").find("." + u)
        }, _getCascadeRow: function (e) {
            var t = $(e).next();
            return t.hasClass(u) ? t : null
        }, _getRowContent: function (e) {
            var t = this, n = t.get("renderer"), r = n ? n(e) : "";
            return r
        }, _createCascadeRow: function (e, t) {
            var n = this, r = n.get("rowTpl"), s = n._getRowContent(e), o = $(r).insertAfter(t);
            return o.find("." + a).append($(s)), o.data(i, e), o
        }, _onExpand: function (e, t, n) {
            var r = this, i = r._getCascadeRow(t), u = r._getColumnCount(t);
            n = n || $(t).find("." + s), n.addClass(o);
            if (!i || !i.length) i = r._createCascadeRow(e, t);
            $(i).removeClass(f), r._setColSpan(i, t), r.fire("expand", {record: e, row: i[0]})
        }, _onCollapse: function (e, t, n) {
            var r = this, i = r._getCascadeRow(t);
            n = n || $(t).find("." + s), n.removeClass(o);
            if (i || !i.length) $(i).addClass(f), r.fire("collapse", {record: e, row: i[0]})
        }, _getColumnCount: function (e) {
            return $(e).children().filter(function () {
                return $(this).css("display") !== "none"
            }).length
        }, _setColSpan: function (e, t) {
            t = t || $(e).prev();
            var n = this, r = n._getColumnCount(t);
            $(e).find("." + a).attr("colspan", r)
        }, _resetColspan: function () {
            var e = this, t = e._getAllCascadeRows();
            $.each(t, function (t, n) {
                e._setColSpan(n)
            })
        }, destructor: function () {
            var e = this;
            e.removeAll(), e.off(), e.clearAttrVals()
        }
    }), l
}),define("bui/grid/plugins/selection", ["bui/common"], function (e) {
    function o(e) {
        o.superclass.constructor.call(this, e)
    }

    var t = e("bui/common"), n = t.prefix, r = n + "grid-checkBox", i = "x-grid-checkbox", s = n + "grid-radio";
    t.extend(o, t.Base), o.ATTRS = {
        width: {value: 40},
        column: {},
        cellInner: {value: '<div class="' + r + '-container"><span class="' + i + '"></span></div>'}
    }, t.augment(o, {
        createDom: function (e) {
            var t = this, r = {
                title: "",
                width: t.get("width"),
                fixed: !0,
                resizable: !1,
                sortable: !1,
                tpl: '<div class="' + n + 'grid-hd-inner">' + t.get("cellInner") + "",
                cellTpl: t.get("cellInner")
            }, i = e.addColumn(r, 0);
            e.set("multipleSelect", !0), t.set("column", i)
        }, bindUI: function (e) {
            var t = this, n = t.get("column"), r = n.get("el"), s = r.find("." + i);
            s.on("click", function () {
                var t = r.hasClass("checked");
                t ? (e.clearSelection(), r.removeClass("checked")) : (e.setAllSelection(), r.addClass("checked"))
            }), e.on("rowunselected", function (e) {
                r.removeClass("checked")
            }), e.on("clear", function () {
                r.removeClass("checked")
            })
        }
    });
    var u = function (e) {
        u.superclass.constructor.call(this, e)
    };
    t.extend(u, t.Base), u.ATTRS = {
        width: {value: 40},
        column: {},
        cellInner: {value: '<div class="' + n + 'grid-radio-container"><input  class="' + s + '" type="radio"></div>'}
    }, t.augment(u, {
        createDom: function (e) {
            var t = this, n = {
                title: "",
                width: t.get("width"),
                resizable: !1,
                fixed: !0,
                sortable: !1,
                cellTpl: t.get("cellInner")
            }, r = e.addColumn(n, 0);
            e.set("multipleSelect", !1), t.set("column", r)
        }, bindUI: function (e) {
            var t = this;
            e.on("rowselected", function (e) {
                t._setRowChecked(e.row, !0)
            }), e.on("rowunselected", function (e) {
                t._setRowChecked(e.row, !1)
            })
        }, _setRowChecked: function (e, t) {
            var n = $(e), r = n.find("." + s);
            r.attr("checked", t)
        }
    });
    var a = {CheckSelection: o, RadioSelection: u};
    return a
}),define("bui/grid/plugins/summary", ["bui/common"], function (e) {
    function l(e) {
        return e > 0 ? '<td class="' + f + '" colspan="' + e + '">&nbsp;</td>' : ""
    }

    function c(e, t) {
        return '<td class="' + f + " " + u + t + '">' + h(e) + "</td>"
    }

    function h(e) {
        return '<div class="' + o + '" >' + '<span class="' + a + ' ">' + e + "</span>" + "</div>"
    }

    function p() {
        return '<td class="' + f + " " + f + '-empty">&nbsp;</td>'
    }

    var t = e("bui/common"), n = t.prefix, r = n + "grid-row", i = n + "grid-body", s = n + "grid-summary-row",
        o = n + "grid-cell-inner", u = "grid-td-", a = n + "grid-cell-text", f = n + "grid-cell", d = function (e) {
            d.superclass.constructor.call(this, e)
        };
    return d.ATTRS = {
        footerTpl: {value: "<tfoot></tfoot>"},
        footerEl: {},
        summaryTitle: {value: "\u67e5\u8be2\u5408\u8ba1"},
        pageSummaryTitle: {value: "\u672c\u9875\u5408\u8ba1"},
        field: {value: "summary"},
        pageSummaryField: {value: "pageSummary"},
        summaryField: {value: "summary"},
        pageSummary: {},
        summary: {}
    }, t.extend(d, t.Base), t.augment(d, {
        initializer: function (e) {
            var t = this;
            t.set("grid", e)
        }, renderUI: function (e) {
            var t = this, n = e.get("el").find("." + i), r = n.find("table"), s = $(t.get("footerTpl")).appendTo(r);
            t.set("footerEl", s)
        }, bindUI: function (e) {
            var t = this, n = e.get("store");
            n && (n.on("beforeprocessload", function (e) {
                t._processSummary(e.data)
            }), n.on("add", function () {
                t.resetPageSummary()
            }), n.on("remove", function () {
                t.resetPageSummary()
            }), n.on("update", function () {
                t.resetPageSummary()
            })), e.on("aftershow", function () {
                t.resetSummary()
            }), e.get("header").on("afterVisibleChange", function () {
                t.resetSummary()
            })
        }, _processSummary: function (e) {
            var t = this, n = t.get("footerEl");
            n.empty();
            if (!e) return;
            var r = e[t.get("pageSummaryField")], i = e[t.get("summaryField")];
            t.set("pageSummary", r), t.set("summary", i)
        }, resetPageSummary: function () {
            var e = this, n = e.get("grid"), r = n.get("columns"), i = e._calculatePageSummary(), s = e.get("pageEl");
            e.set("pageSummary", i), s && (t.each(r, function (t) {
                if (t.get("summary") && t.get("visible")) {
                    var n = t.get("id"), r = s.find("." + u + n), o = e._getSummaryCellText(t, i);
                    r.find("." + a).text(o)
                }
            }), e._updateFirstRow(s, e.get("pageSummaryTitle")))
        }, resetSummary: function (e, t) {
            var n = this, r = n.get("footerEl"), i = null;
            r.empty(), e = e || n.get("pageSummary"), e || (e = n._calculatePageSummary(), n.set("pageSummary", e)), t = t || n.get("summary"), i = n._creatSummaryRow(e, n.get("pageSummaryTitle")), n.set("pageEl", i), n._creatSummaryRow(t, n.get("summaryTitle"))
        }, _creatSummaryRow: function (e, t) {
            if (!e) return null;
            var n = this, r = n.get("footerEl"), i = n._getSummaryTpl(e), s = $(i).appendTo(r);
            return n._updateFirstRow(s, t), s
        }, _updateFirstRow: function (e, t) {
            var n = e.find("td").first(), r = n.find("." + o);
            if (r.length) {
                var i = t + ": ";
                text = r.text(), text.indexOf(i) === -1 && (text = i + text), n.html(h(text))
            } else n.html(h(t + ":"))
        }, _getSummaryTpl: function (e) {
            var t = this, n = t.get("grid"), i = n.get("columns"), o = [], u = -1, a = -1, f = null;
            return $.each(i, function (n, r) {
                if (r.get("visible")) {
                    a += 1;
                    if (r.get("summary")) {
                        o.push(l(a - u - 1));
                        var i = t._getSummaryCellText(r, e), s = c(i, r.get("id"));
                        o.push(s), u = a
                    }
                }
            }), u !== a && o.push(l(a - u)), f = ['<tr class="', s, " ", r, '">', o.join(""), p(), "</tr>"].join(""), f
        }, _getSummaryCellText: function (e, t) {
            var n = this, r = t[e.get("dataIndex")], i = r == null ? "" : r, s = e.get("renderer"), o = s ? s(i, t) : i;
            return o
        }, _calculatePageSummary: function () {
            var e = this, n = e.get("grid"), r = n.get("store"), i = n.get("columns"), s = {};
            return t.each(i, function (e) {
                if (e.get("summary")) {
                    var t = e.get("dataIndex");
                    s[t] = r.sum(t)
                }
            }), s
        }
    }), d
}),define("bui/grid/plugins/editing", function (e) {
    function r(e) {
        r.superclass.constructor.call(this, e)
    }

    var t = BUI.prefix + "grid-cell-inner", n = BUI.prefix + "grid-cell-error";
    return BUI.extend(r, BUI.Base), r.ATTRS = {
        align: {value: {points: ["cl", "cl"]}},
        showError: {value: !0},
        errorTpl: {value: '<span class="x-icon ' + n + ' x-icon-mini x-icon-error" title="{error}">!</span>'},
        isInitEditors: {value: !1},
        record: {},
        curEditor: {},
        hasValid: {},
        editors: {shared: !1, value: []},
        triggerCls: {},
        triggerSelected: {value: !0}
    }, BUI.augment(r, {
        initializer: function (e) {
            var t = this;
            t.set("grid", e), t.initEditing(e)
        }, renderUI: function () {
            var e = this, t = e.get("grid");
            BUI.use("bui/editor", function (n) {
                e.initEditors(n), e._initGridEvent(t), e.set("isInitEditors", !0), e.fire("editorready")
            })
        }, initEditing: function (e) {
        }, _getCurEditor: function () {
            return this.get("curEditor")
        }, _initGridEvent: function (e) {
            function r(e, n) {
                t.get("hasValid") && t.validRecord(e, t.getFields(), $(n))
            }

            var t = this, n = e.get("header");
            e.on("cellclick", function (e) {
                var n = null, r = e.domTarget, i = t.get("triggerCls"), s = t._getCurEditor();
                s && s.get("acceptEvent") ? (s.accept(), s.hide()) : s && s.cancel(), n = t.getEditor(e.field);
                if (n && $(r).closest("." + i).length) {
                    t.showEditor(n, e);
                    if (!t.get("triggerSelected")) return !1
                }
            }), e.on("rowcreated", function (e) {
                r(e.record, e.row)
            }), e.on("rowremoved", function (e) {
                t.get("record") == e.record && t.cancel()
            }), e.on("rowupdated", function (e) {
                r(e.record, e.row)
            }), e.on("scroll", function (e) {
                var n = t._getCurEditor();
                if (n) {
                    var r = n.get("align"), i = r.node, s = i.position();
                    s.top < 0 || s.top > e.bodyHeight ? n.hide() : (n.set("align", r), n.show())
                }
            }), n.on("afterVisibleChange", function (e) {
                if (e.target && e.target != n) {
                    var r = e.target;
                    t.onColumnVisibleChange(r)
                }
            })
        }, initEditors: function (e) {
            var t = this, n = t.get("grid"), r = [], i = n.get("columns");
            BUI.each(i, function (e) {
                var n = t.getFieldConfig(e);
                n && (n.name = e.get("dataIndex"), n.id = e.get("id"), n.validator && (n.validator = t.wrapValidator(n.validator)), r.push(n))
            });
            var s = t.getEditorCfgs(r);
            BUI.each(s, function (n) {
                t.initEidtor(n, e)
            })
        }, getFieldConfig: function (e) {
            return e.get("editor")
        }, wrapValidator: function (e) {
            var t = this;
            return function (n) {
                var r = t.get("record");
                return e(n, r)
            }
        }, onColumnVisibleChange: function (e) {
        }, getEditorCfgs: function (e) {
        }, getEditorConstructor: function (e) {
            return e.Editor
        }, initEidtor: function (e, t) {
            var n = this, r = n.getEditorConstructor(t), i = new r(e);
            return i.render(), n.get("editors").push(i), n.bindEidtor(i), i
        }, bindEidtor: function (e) {
            var t = this, n = t.get("grid"), r = n.get("store");
            e.on("accept", function () {
                var n = t.get("record");
                t.updateRecord(r, n, e), t.fire("accept", {editor: e, record: n}), t.set("curEditor", null)
            }), e.on("cancel", function () {
                t.fire("cancel", {editor: e, record: t.get("record")}), t.set("curEditor", null)
            })
        }, getEditor: function (e) {
        }, getAlignNode: function (e) {
        }, getEditValue: function (e) {
        }, showEditor: function (e, t) {
            var n = this, r = n.getEditValue(t), i = n.getAlignNode(t);
            n.beforeShowEditor(e, t), n.set("record", t.record), e.setValue(r);
            if (i) {
                var s = n.get("align");
                s.node = i, e.set("align", s)
            }
            e.show(), n.focusEditor(e, t.field), n.set("curEditor", e), n.fire("editorshow", {editor: e})
        }, focusEditor: function (e, t) {
            e.focus()
        }, beforeShowEditor: function (e, t) {
        }, _createEditOptions: function (e, t) {
            var n = this, r = n.get("grid"), i = r.findRow(e), s = r.findColumnByField(t),
                o = r.findCell(s.get("id"), i);
            return {record: e, field: t, cell: o[0], row: i[0]}
        }, valid: function () {
            var e = this, t = e.get("grid"), n = t.get("store");
            if (n) {
                var r = n.getResult();
                BUI.each(r, function (t) {
                    e.validRecord(t, e.getFields())
                })
            }
            e.set("hasValid", !0)
        }, isValid: function () {
            var e = this, t = e.get("grid");
            return e.get("hasValid") || e.valid(), !t.get("el").find("." + n).length
        }, clearErrors: function () {
            var e = this, t = e.get("grid");
            t.get("el").find("." + n).remove()
        }, getFields: function (e) {
        }, validRecord: function (e, t, n) {
            var r = this, i = [];
            r.setInternal("record", e), t = t || r.getFields(), BUI.each(t, function (t) {
                var n = t.get("name"), r = e[n] || "", s = t.getValidError(r);
                s && i.push({name: n, error: s, id: t.get("id")})
            }), r.showRecordError(e, i, n)
        }, showRecordError: function (e, t, n) {
            var r = this, i = r.get("grid");
            n = n || i.findRow(e), n && (r._clearRowError(n), BUI.each(t, function (e) {
                var t = i.findCell(e.id, n);
                r._showCellError(t, e.error)
            }))
        }, updateRecord: function (e, t, n) {
        }, _clearRowError: function (e) {
            e.find("." + n).remove()
        }, _showCellError: function (e, n) {
            var r = this, i = BUI.substitute(r.get("errorTpl"), {error: n}), s = e.find("." + t);
            $(i).appendTo(s)
        }, edit: function (e, t) {
            var n = this, r = n._createEditOptions(e, t), i = n.getEditor(t);
            n.showEditor(i, r)
        }, cancel: function () {
            var e = this, t = e.get("editors");
            BUI.each(t, function (e) {
                e.get("visible") && e.cancel()
            }), e.set("curEditor", null), e.set("record", null)
        }, destructor: function () {
            var e = this, t = e.get("editors");
            BUI.each(t, function (e) {
                e.destroy || e.destroy()
            }), e.off(), e.clearAttrVals()
        }
    }), r
}),define("bui/grid/plugins/cellediting", ["bui/grid/plugins/editing"], function (e) {
    var t = e("bui/grid/plugins/editing"), n = BUI.prefix + "grid-body", r = BUI.prefix + "grid-cell",
        i = function (e) {
            i.superclass.constructor.call(this, e)
        };
    return i.ATTRS = {triggerCls: {value: r}}, BUI.extend(i, t), BUI.augment(i, {
        getEditorCfgs: function (e) {
            var t = this, r = t.get("grid"), i = r.get("el").find("." + n), s = [];
            return BUI.each(e, function (e) {
                var t = {
                    field: e,
                    changeSourceEvent: null,
                    hideExceptNode: i,
                    autoUpdate: !1,
                    preventHide: !1,
                    editableFn: e.editableFn
                };
                e.xtype === "checkbox" && (t.innerValueField = "checked"), s.push(t)
            }), s
        }, getEditor: function (e) {
            if (!e) return null;
            var t = this, n = t.get("editors"), r = null;
            return BUI.each(n, function (t) {
                if (t.get("field").get("name") === e) return r = t, !1
            }), r
        }, beforeShowEditor: function (e, t) {
            var n = this, r = $(t.cell);
            n.resetWidth(e, r.outerWidth()), n._makeEnable(e, t)
        }, _makeEnable: function (e, t) {
            var n = e.get("editableFn"), r, i, s;
            BUI.isFunction(n) && (r = t.field, s = t.record, s && r && (i = n(s[r], s), i ? e.get("field").enable() : e.get("field").disable()))
        }, resetWidth: function (e, t) {
            e.set("width", t)
        }, updateRecord: function (e, t, n) {
            var r = this, i = n.getValue(), s = n.get("field").get("name"), o = t[s];
            i = BUI.isDate(i) ? i.getTime() : i, o !== i && e.setValue(t, s, i)
        }, getAlignNode: function (e) {
            return $(e.cell)
        }, getFields: function () {
            var e = [], t = this, n = t.get("editors");
            return BUI.each(n, function (t) {
                e.push(t.get("field"))
            }), e
        }, getEditValue: function (e) {
            if (e.record && e.field) {
                var t = e.record[e.field];
                return t == null ? "" : t
            }
            return ""
        }
    }), i
}),define("bui/grid/plugins/rowediting", ["bui/common", "bui/grid/plugins/editing"], function (e) {
    var t = e("bui/common"), n = e("bui/grid/plugins/editing"), r = t.prefix + "grid-row", i = function (e) {
        i.superclass.constructor.call(this, e)
    };
    return i.ATTRS = {
        autoSave: {value: !1},
        align: {value: {points: ["tl", "tl"], offset: [-2, 0]}},
        triggerCls: {value: r},
        editor: {}
    }, t.extend(i, n), t.augment(i, {
        getEditorCfgs: function (e) {
            var n = this, r = n.get("editor"), i = [], s = t.mix(!0, {
                changeSourceEvent: null,
                autoUpdate: !1,
                form: {children: e, buttonBar: {elCls: "centered toolbar"}}
            }, r);
            return i.push(s), i
        }, wrapValidator: function (e) {
            var t = this;
            return function (n) {
                var r = t.get("curEditor"), i = t.get("record"), s = r ? r.getValue() : i;
                if (s) return e(n, s, i)
            }
        }, focusEditor: function (e, t) {
            var n = e.get("form"), r = n.getField(t);
            r && r.focus()
        }, getFieldConfig: function (e) {
            var t = e.get("editor");
            if (t) return t.xtype === "checkbox" && (t.innerValueField = "checked"), t;
            var n = {xtype: "plain"};
            return e.get("dataIndex") && e.get("renderer") && (n.renderer = e.get("renderer")), n
        }, updateRecord: function (e, n, r) {
            var i = this, s = r.getValue();
            t.each(s, function (e, n) {
                t.isDate(e) && (s[n] = e.getTime())
            }), t.mix(n, s), e.update(n), i.get("autoSave") && e.save(n)
        }, getEditor: function (e) {
            var t = this, n = t.get("editors");
            return n[0]
        }, onColumnVisibleChange: function (e) {
            var t = this, n = e.get("id"), r = t.getEditor(), i = r.getChild(n, !0);
            i && i.set("visible", e.get("visible"))
        }, beforeShowEditor: function (e, n) {
            var r = this, i = r.get("grid"), s = i.get("columns"), o = e.get("form"), u = $(n.row);
            e.set("width", u.width()), t.each(s, function (e) {
                var t = e.get("dataIndex"), n = o.getField(t);
                if (!e.get("visible")) n && n.set("visible", !1); else {
                    var r = e.get("el").outerWidth() - n.getAppendWidth();
                    n.set("width", r)
                }
            })
        }, getEditValue: function (e) {
            return e.record
        }, getEditorConstructor: function (e) {
            return e.RecordEditor
        }, getAlignNode: function (e) {
            return $(e.row)
        }, getFields: function () {
            var e = this, t = e.get("editors");
            return t[0].get("form").get("children")
        }
    }), i
}),define("bui/grid/plugins/dialogediting", ["bui/common"], function (e) {
    function i(e) {
        i.superclass.constructor.call(this, e)
    }

    var t = e("bui/common"), n = "add", r = "edit";
    return i.ATTRS = {
        autoSave: {value: !1},
        record: {},
        curIndex: {},
        contentId: {},
        editor: {},
        form: {},
        events: {value: {recordchange: !1}},
        editType: {}
    }, t.extend(i, t.Base), t.augment(i, {
        initializer: function (e) {
            var n = this;
            n.set("grid", e), t.use("bui/editor", function (e) {
                n._initEditor(e), n.fire("editorready")
            })
        }, bindUI: function (e) {
            var t = this, n = t.get("triggerCls");
            n && e.on("cellclick", function (r) {
                var i = $(r.domTarget), s = t.get("editor");
                if (i.hasClass(n) && s) {
                    t.edit(r.record);
                    if (e.get("multipleSelect")) return !1
                }
            })
        }, _initEditor: function (e) {
            var n = this, r = n.get("contentId"), i = $("#" + r).find("form"), s = n.get("editor"), o = t.merge(s, {
                contentId: r, form: {
                    srcNode: i
                }
            });
            s = new e.DialogEditor(o), n._bindEditor(s), n.set("editor", s), n.set("form", s.get("form"))
        }, _bindEditor: function (e) {
            var t = this;
            e.on("accept", function () {
                var n = e.get("form"), r = n.serializeToObject();
                t.saveRecord(r), t.fire("accept", {editor: e, record: t.get("record"), form: n})
            }), e.on("cancel", function () {
                t.fire("cancel", {editor: e, record: t.get("record"), form: e.get("form")})
            })
        }, edit: function (e) {
            var t = this;
            t.set("editType", r), t.showEditor(e)
        }, add: function (e, t) {
            var r = this;
            r.set("editType", n), r.set("curIndex", t), r.showEditor(e)
        }, saveRecord: function (e) {
            var r = this, i = r.get("grid"), s = r.get("editType"), o = r.get("curIndex"), u = i.get("store"),
                a = r.get("record");
            t.mix(a, e), s == n ? o != null ? u.addAt(a, o) : u.add(a) : u.update(a), r.get("autoSave") && u.save(a)
        }, showEditor: function (e) {
            var t = this, n = t.get("editor");
            t.set("record", e), n.show(), n.setValue(e, !0), t.fire("recordchange", {
                record: e,
                editType: t.get("editType")
            }), t.fire("editorshow", {eidtor: n, editType: t.get("editType")})
        }, cancel: function () {
            var e = this, t = e.get("editor");
            t.cancel()
        }, destructor: function () {
            var e = this, t = e.get("editor");
            t && t.destroy(), e.off(), e.clearAttrVals()
        }
    }), i
}),define("bui/grid/plugins/rownumber", function (e) {
    function n(e) {
        n.superclass.constructor.call(this, e)
    }

    var t = "x-grid-rownumber";
    return BUI.extend(n, BUI.Base), n.ATTRS = {
        width: {value: 40},
        column: {}
    }, BUI.augment(n, {
        createDom: function (e) {
            var n = this, r = {
                title: "",
                width: n.get("width"),
                fixed: !0,
                resizable: !1,
                sortable: !1,
                renderer: function (e, t, n) {
                    return n + 1
                },
                elCls: t
            }, i = e.addColumn(r, 0);
            n.set("column", i)
        }
    }), n
}),define("bui/grid/plugins/columngroup", ["bui/common"], function (e) {
    var t = e("bui/common"), n = t.prefix, r = n + "grid-hd-title", i = n + "grid-column-group",
        s = n + "grid-group-header", o = n + "grid-db-hd", u = function (e) {
            u.superclass.constructor.call(this, e)
        };
    return u.ATTRS = {
        groups: {value: []},
        columnTpl: {value: '<th class="bui-grid-hd center" colspan="{colspan}"><div class="' + n + 'grid-hd-inner">' + '<span class="' + r + '">{title}</span>' + "</div></th>"}
    }, t.extend(u, t.Base), t.augment(u, {
        renderUI: function (e) {
            var n = this, r = n.get("groups"), u = e.get("header"), a = u.get("el"), f = u.get("children"),
                l = $('<tr class="' + i + '"></tr>').prependTo(a.find("thead"));
            a.addClass(s), t.each(r, function (e) {
                var t = n._getGroupTpl(e), r = $(t).appendTo(l);
                e.el = r;
                for (var i = e.from; i <= e.to; i++) {
                    var s = f[i];
                    s && s.set("group", e)
                }
            });
            var c;
            for (var h = f.length - 1; h >= 0; h--) {
                var p = f[h], d = p.get("group");
                if (d) c = d.el; else {
                    var v = p.get("el");
                    v.addClass(o), v.attr("rowspan", 2), c ? v.insertBefore(c) : v.appendTo(l), c = v
                }
            }
            if (r[0].from !== 0) {
                var m = f[r[0].from];
                m && m.get("el").css("border-left-width", 1)
            }
        }, _getGroupTpl: function (e) {
            var n = this, r = n.get("columnTpl"), i = e.to - e.from + 1;
            return t.substitute(r, {colspan: i, title: e.title})
        }
    }), u
}),define("bui/grid/plugins/rowgroup", ["bui/common"], function (e) {
    function u(e, t) {
        return {items: [], value: e, text: t}
    }

    var t = e("bui/common"), n = "data-group", r = t.prefix, i = r + "grid-row-group", s = r + "grid-cascade",
        o = r + "grid-cascade-expand", a = function (e) {
            a.superclass.constructor.call(this, e)
        };
    return a.ATTRS = {groups: {shared: !1, value: []}}, t.extend(a, t.Base), t.augment(a, {
        renderUI: function (e) {
            var t = this, n = e.get("el").find("tbody");
            t.set("grid", e), t.set("tbodyEl", n)
        }, bindUI: function (e) {
            var n = this, r = [];
            e.on("aftershow", function () {
                var i = e.getItems(), s = n._getSortColumn();
                n._clear();
                if (s) {
                    e.get("view").getAllElements().hide();
                    var o = s.get("dataIndex");
                    t.each(i, function (e, t) {
                        var i = r[r.length - 1], a = s.get("renderer"), f = e[o], l;
                        if (!i || f != i.value) l = a ? a(f, e) : f, i = u(f, l), i.begin = t, n._createGroup(i, e), r.push(i);
                        i && i.items.push(e)
                    }), n.set("groups", r)
                }
            }), e.on("clear", function () {
                n._clear()
            }), n.get("tbodyEl").delegate("." + s, "click", function (e) {
                var t = $(e.currentTarget), r = n._getGroupData(t);
                t.hasClass(o) ? (n._collapse(r), t.removeClass(o)) : (n._expand(r), t.addClass(o))
            })
        }, _getSortColumn: function () {
            var e = this, t = e.get("grid"), n = t.get("store"), r = n.get("sortField");
            return t.findColumnByField(r)
        }, _getGroupData: function (e) {
            var t = this, r = e.closest("." + i);
            return r.data(n)
        }, _createGroup: function (e, t) {
            var r = this, s = r.get("grid"), o = s.findElement(t), u = s.get("columns").length,
                a = '<tr class="' + i + '"><td colspan="' + u + '"><div class="bui-grid-cell-inner"><span class="bui-grid-cell-text"><span class="bui-grid-cascade"><i class="bui-grid-cascade-icon"></i></span> ' + e.text + "</span></div></td></tr>",
                f = $(a).insertBefore(o);
            f.data(n, e)
        }, _getGroupedElements: function (e) {
            var t = this, n = t.get("grid"), r = n.get("view").getAllElements(), i = e.begin, s = e.items.length + i,
                o = [];
            for (var u = i; u < s; u++) o.push(r[u]);
            return $(o)
        }, _expand: function (e) {
            var t = this, n = t._getGroupedElements(e);
            n.show()
        }, _collapse: function (e) {
            var t = this, n = t._getGroupedElements(e);
            n.hide()
        }, _clear: function () {
            var e = this, n = e.get("groups"), r = e.get("tbodyEl");
            t.Array.empty(n), r.find("." + i).remove()
        }
    }), a
}),define("bui/tree", ["bui/common", "bui/tree/treemixin", "bui/tree/treelist", "bui/tree/treemenu"], function (e) {
    var t = e("bui/common"), n = t.namespace("Tree");
    return t.mix(n, {
        TreeList: e("bui/tree/treelist"),
        Mixin: e("bui/tree/treemixin"),
        TreeMenu: e("bui/tree/treemenu")
    }), n
}),define("bui/tree/treemixin", ["bui/common", "bui/data"], function (e) {
    function t(e, t) {
        return r.isString(t) && (t = e.findNode(t)), t
    }

    function n(e, t, n) {
        setTimeout(function () {
            e()
        }, t / n)
    }

    var r = e("bui/common"), i = e("bui/data"), s = "expanded", o = "loading", u = "checked", a = "partial-checked",
        f = {NONE: "none", ALL: "all", CUSTOM: "custom", ONLY_LEAF: "onlyLeaf"}, l = "x-tree-icon", c = "x-tree-elbow",
        h = "x-tree-show-line", p = c + "-", d = l + "-wraper", v = p + "line", m = p + "end", g = p + "empty",
        y = p + "expander", b = l + "-checkbox", w = l + "-radio", E = y + "-end", S = function () {
        };
    return S.ATTRS = {
        store: {
            getter: function (e) {
                if (!e) {
                    var t = this, n = new i.TreeStore({root: t.get("root"), data: t.get("nodes")});
                    return t.setInternal("store", n), n
                }
                return e
            }
        },
        root: {},
        nodes: {sync: !1},
        iconContainer: {},
        iconWraperTpl: {value: '<span class="' + d + '">{icons}</span>'},
        showLine: {value: !1},
        showIcons: {value: !0},
        iconTpl: {value: '<span class="x-tree-icon {cls}"></span>'},
        leafCls: {value: p + "leaf"},
        dirCls: {value: p + "dir"},
        checkType: {value: "custom"},
        cascadeCheckd: {value: !0},
        accordion: {value: !1},
        multipleCheck: {value: !0},
        checkedField: {
            valueFn: function () {
                return this.getStatusField("checked")
            }
        },
        checkableField: {value: "checkable"},
        itemStatusFields: {value: {expanded: "expanded", disabled: "disabled", checked: "checked"}},
        dirSelectable: {value: !0},
        showRoot: {value: !1},
        events: {value: {expanded: !1, collapsed: !1, checkedchange: !1}},
        expandEvent: {value: "itemdblclick"},
        expandAnimate: {value: !1},
        collapseEvent: {value: "itemdblclick"},
        startLevel: {value: 1}
    }, r.augment(S, {
        collapseAll: function () {
            var e = this, t = e.get("view").getAllElements();
            r.each(t, function (t) {
                var n = e.getItemByElement(t);
                n && e._collapseNode(n, t, !0)
            })
        }, collapseNode: function (e) {
            var t = this, n;
            r.isString(e) && (e = t.findNode(e));
            if (!e) return;
            n = t.findElement(e), t._collapseNode(e, n)
        }, expandAll: function () {
            var e = this, t = e.get("view").getAllElements();
            r.each(t, function (t) {
                var n = e.getItemByElement(t);
                e._expandNode(n, t, !0)
            })
        }, expandNode: function (e, t) {
            var n = this, i;
            r.isString(e) && (e = n.findNode(e));
            if (!e) return;
            e.parent && !n.isExpanded(e.parent) && n.expandNode(e.parent), i = n.findElement(e), n._expandNode(e, i, t)
        }, expandPath: function (e, t, n) {
            if (!e) return;
            n = n || 0;
            var r = this, i = r.get("store"), s, o, u, a, f = e.split(",");
            s = r.findNode(f[n]);
            for (u = n + 1; u < f.length; u++) {
                a = f[u], o = r.findNode(a, s);
                if (s && o) r.expandNode(s), s = o; else if (s && t) {
                    i.load({id: s.id}, function () {
                        o = r.findNode(a, s), o && r.expandPath(e, t, u)
                    });
                    break
                }
            }
        }, findNode: function (e, t) {
            return this.get("store").findNode(e, t)
        }, getCheckedLeaf: function (e) {
            var t = this, n = t.get("store");
            return n.findNodesBy(function (e) {
                return e.leaf && t.isChecked(e)
            }, e)
        }, getCheckedNodes: function (e) {
            var t = this, n = t.get("store");
            return n.findNodesBy(function (e) {
                return t.isChecked(e)
            }, e)
        }, isItemSelectable: function (e) {
            var t = this, n = t.get("dirSelectable"), r = e;
            return r && !n && !r.leaf ? !1 : !0
        }, isExpanded: function (e) {
            if (!e || e.leaf) return !1;
            var t = this, n;
            return t._isRoot(e) && !t.get("showRoot") ? !0 : (r.isString(e) && (item = t.getItem(e)), n = t.findElement(e), this._isExpanded(e, n))
        }, isChecked: function (e) {
            return e ? !!e[this.get("checkedField")] : !1
        }, toggleExpand: function (e) {
            var t = this, n;
            r.isString(e) && (item = t.getItem(e)), n = t.findElement(e), t._toggleExpand(e, n)
        }, setNodeChecked: function (e, n, i) {
            i = i == null ? !0 : i;
            if (!e) return;
            var s = this, o, a = s.get("multipleCheck"), f = s.get("cascadeCheckd"), l;
            e = t(this, e);
            if (!e) return;
            o = e.parent;
            if (!s.isCheckable(e)) return;
            if (s.isChecked(e) !== n || s.hasStatus(e, "checked") !== n) {
                l = s.findElement(e), f ? (l ? (s.setItemStatus(e, u, n, l), a ? s._resetPatialChecked(e, n, n, l) : n && o && s.isChecked(o) != n && s.setNodeChecked(o, n, !1)) : s.isItemDisabled(e) || s.setStatusValue(e, u, n), o && (s.isChecked(o) != n ? s._resetParentChecked(o) : a && s._resetPatialChecked(o, null, null, null, !0))) : s.isItemDisabled(e) || (l ? s.setItemStatus(e, u, n, l) : s.setStatusValue(e, u, n));
                if (n && !a && (s.isChecked(o) || o == s.get("root") || !f)) {
                    var c = o.children;
                    r.each(c, function (t) {
                        t !== e && s.isChecked(t) && s.setNodeChecked(t, !1)
                    })
                }
                s.fire("checkedchange", {node: e, element: l, checked: n})
            }
            !e.leaf && i && f && r.each(e.children, function (e, t) {
                (a || !n || !a && t == 0) && s.setNodeChecked(e, n, i)
            })
        }, setChecked: function (e) {
            this.setNodeChecked(e, !0)
        }, clearAllChecked: function () {
            var e = this, t = e.getCheckedNodes();
            r.each(t, function (t) {
                e.setNodeChecked(t, !1)
            })
        }, _initRoot: function () {
            var e = this, t = e.get("store"), n, i = e.get("showRoot"), s;
            t && (n = t.get("root"), e.setInternal("root", n), i ? s = [n] : s = n.children, r.each(s, function (t) {
                e._initChecked(t, !0)
            }), e.clearItems(), e.addItems(s))
        }, _initChecked: function (e, t) {
            var n = this, i = n.get("checkType"), s = n.get("checkedField"), o = n.get("multipleCheck"),
                u = n.get("checkableField"), a = n.get("cascadeCheckd"), l;
            if (i === f.NONE) {
                e[u] = !1, e[s] = !1;
                return
            }
            if (i === f.ONLY_LEAF) {
                e.leaf ? e[u] = !0 : (e[u] = !1, e[s] = !1, t && r.each(e.children, function (e) {
                    n._initChecked(e, t)
                }));
                return
            }
            i === f.CUSTOM && e[u] == null && (e[u] = e[s] != null), i === f.ALL && (e[u] = !0);
            if (!e || !n.isCheckable(e)) return;
            l = e.parent, !n.isChecked(e) && a && (l && n.isChecked(l) && (o || !n._hasChildChecked(l)) && n.setStatusValue(e, "checked", !0), (e.children && e.children.length && n._isAllChildrenChecked(e) || !o && n._hasChildChecked(e)) && n.setStatusValue(e, "checked", !0)), t && r.each(e.children, function (e) {
                n._initChecked(e, t)
            })
        }, _resetPatialChecked: function (e, t, n, r, i) {
            if (!e || e.leaf) return !0;
            var s = this, n;
            t = t == null ? s.isChecked(e) : t;
            if (t) {
                s.setItemStatus(e, a, !1, r);
                return
            }
            n = n == null ? s._hasChildChecked(e) : n, s.setItemStatus(e, a, n, r), i && e.parent && s._resetPatialChecked(e.parent, !1, n ? n : null, null, i)
        }, _resetParentChecked: function (e) {
            if (!this.isCheckable(e)) return;
            var t = this, n = t.get("multipleCheck"), r = n ? t._isAllChildrenChecked(e) : t._hasChildChecked(e);
            t.setStatusValue(e, "checked", r), t.setNodeChecked(e, r, !1), n && t._resetPatialChecked(e, r, null, null, !0)
        }, __bindUI: function () {
            var e = this, t = e.get("el"), n = e.get("multipleCheck");
            e.on("itemclick", function (t) {
                var n = $(t.domTarget), r = t.element, i = t.item;
                if (n.hasClass(y)) return e._toggleExpand(i, r), !1;
                if (n.hasClass(b)) {
                    var s = e.isChecked(i);
                    e.setNodeChecked(i, !s)
                } else n.hasClass(w) && e.setNodeChecked(i, !0)
            }), e.on("itemrendered", function (t) {
                var r = t.item, i = t.domTarget;
                e._resetIcons(r, i), e.isCheckable(r) && n && e.get("cascadeCheckd") && e._resetPatialChecked(r, null, null, i), e._isExpanded(r, i) && e._showChildren(r)
            }), e._initExpandEvent()
        }, _initExpandEvent: function () {
            function i(t) {
                return function (n) {
                    var r = $(n.domTarget), i = n.element, s = n.item;
                    r.hasClass(y) || e[t](s, i)
                }
            }

            var e = this, t = e.get("el"), n = e.get("expandEvent"), r = e.get("collapseEvent");
            n == r ? e.on(n, i("_toggleExpand")) : (n && e.on(n, i("_expandNode")), r && e.on(r, i("_collapseNode")))
        }, _isForceChecked: function (e) {
            var t = this, n = t.get("multipleCheck");
            return n ? t._isAllChildrenChecked() : _isForceChecked()
        }, _isAllChildrenChecked: function (e) {
            if (!e || e.leaf) return !1;
            var t = this, n = e.children, i = !0;
            return r.each(n, function (e) {
                i = i && t.isChecked(e);
                if (!i) return !1
            }), i
        }, _hasChildChecked: function (e) {
            if (!e || e.leaf) return !1;
            var t = this;
            return t.getCheckedNodes(e).length != 0
        }, _isRoot: function (e) {
            var t = this, n = t.get("store");
            return n && n.get("root") == e ? !0 : !1
        }, _setLoadStatus: function (e, t, n) {
            var r = this;
            r.setItemStatus(e, o, n, t)
        }, _beforeLoadNode: function (e) {
            var t = this, n;
            r.isString(e) && (e = t.findNode(e)), n = t.findElement(e), n ? (t._collapseNode(e, n), t._setLoadStatus(e, n, !0)) : e && r.each(e.children, function (e) {
                t._removeNode(e)
            })
        }, onBeforeLoad: function (e) {
            var t = this, n = e.params, r = n.id, i = t.findNode(r) || t.get("root");
            t._beforeLoadNode(i)
        }, _addNode: function (e, t) {
            var n = this, r = e.parent, i, s, o, u;
            n._initChecked(e, !0), r ? (n.isExpanded(r) && (i = r.children.length, u = n._getInsetIndex(e), n.addItemAt(e, u), t == i - 1 && t > 0 && (s = r.children[t - 1], n._updateIcons(s))), n._updateIcons(r)) : (u = n._getInsetIndex(e), n.addItemAt(e, u), s = n.get("nodes")[t - 1], n._updateIcons(s))
        }, _getInsetIndex: function (e) {
            var t = this, n, r = null;
            return n = t._getNextItem(e), n ? t.indexOfItem(n) : t.getItemCount()
        }, _getNextItem: function (e) {
            var t = this, n = e.parent, i, s, o = null;
            return n ? (i = n.children, s = r.Array.indexOf(e, i), o = i[s + 1], o || t._getNextItem(n)) : null
        }, onAdd: function (e) {
            var t = this, n = e.node, r = e.index;
            t._addNode(n, r)
        }, _updateNode: function (e) {
            var t = this;
            t.updateItem(e), t._updateIcons(e)
        }, onUpdate: function (e) {
            var t = this, n = e.node;
            t._updateNode(n)
        }, _removeNode: function (e, t) {
            var n = this, r = e.parent, i, s;
            n.collapseNode(e);
            if (!r) return;
            n.removeItem(e), n.isExpanded(r) && (i = r.children.length, i == t && t !== 0 && (s = r.children[t - 1], n._updateIcons(s))), n._updateIcons(r), n._resetParentChecked(r)
        }, onRemove: function (e) {
            var t = this, n = e.node, r = e.index;
            t._removeNode(n, r)
        }, _loadNode: function (e) {
            var t = this;
            t._initChecked(e, !0), t.expandNode(e), t._updateIcons(e), t.setItemStatus(e, o, !1)
        }, __syncUI: function () {
            var e = this, t = e.get("store"), n = e.get("showRoot");
            n && !t.hasData() && e._initRoot()
        }, onLoad: function (e) {
            var t = this, n = t.get("store"), r = n.get("root"), i;
            (!e || e.node == r) && t._initRoot(), e && e.node && t._loadNode(e.node)
        }, _isExpanded: function (e, t) {
            return this.hasStatus(e, s, t)
        }, _getIconsTpl: function (e) {
            var t = this, n = e.level, i = t.get("startLevel"), s = t.get("iconWraperTpl"), o = [], u;
            for (u = i; u < n; u += 1) o.push(t._getLevelIcon(e, u));
            return o.push(t._getExpandIcon(e)), o.push(t._getCheckedIcon(e)), o.push(t._getNodeTypeIcon(e)), r.substitute(s, {icons: o.join("")})
        }, _getCheckedIcon: function (e) {
            var t = this, n = t.isCheckable(e), r;
            return n ? (r = t.get("multipleCheck") ? b : w, t._getIcon(r)) : ""
        }, isCheckable: function (e) {
            return e[this.get("checkableField")]
        }, _getExpandIcon: function (e) {
            var t = this, n = y;
            return e.leaf ? t._getLevelIcon(e) : (t._isLastNode(e) && (n = n + " " + E), t._getIcon(n))
        }, _getNodeTypeIcon: function (e) {
            var t = this, n = e.cls ? e.cls : e.leaf ? t.get("leafCls") : t.get("dirCls");
            return t._getIcon(n)
        }, _getLevelIcon: function (e, t) {
            var n = this, r = n.get("showLine"), i = g, s;
            return r && (e.level === t || t == null ? i = n._isLastNode(e) ? m : c : (s = n._getParentNode(e, t), i = n._isLastNode(s) ? g : v)), n._getIcon(i)
        }, _getParentNode: function (e, t) {
            var n = e.level, r = e.parent, i = n - 1;
            if (n <= t) return null;
            while (i > t) r = r.parent, i -= 1;
            return r
        }, _getIcon: function (e) {
            var t = this, n = t.get("iconTpl");
            return r.substitute(n, {cls: e})
        }, _isLastNode: function (e) {
            if (!e) return !1;
            if (e == this.get("root")) return !0;
            var t = this, n = e.parent, r = n ? n.children : t.get("nodes"), i;
            return i = r.length, r[i - 1] === e
        }, _initNodes: function (e, t, n) {
            var i = this;
            r.each(e, function (e) {
                e.level = t, e.leaf == null && (e.leaf = e.children ? !1 : !0), n && !e.parent && (e.parent = n), i._initChecked(e), e.children && i._initNodes(e.children, t + 1, e)
            })
        }, _collapseNode: function (e, t, n) {
            var r = this;
            if (e.leaf) return;
            r.hasStatus(e, s, t) && (r.setItemStatus(e, s, !1, t), n ? (r._collapseChildren(e, n), r.removeItems(e.children)) : r._hideChildrenNodes(e), r.fire("collapsed", {
                node: e,
                element: t
            }))
        }, _hideChildrenNodes: function (e) {
            var t = this, n = e.children, i = [];
            r.each(n, function (e) {
                var n = t.findElement(e);
                n && (i.push(n), t._hideChildrenNodes(e))
            }), t.get("expandAnimate") ? (i = $(i), i.animate({height: 0}, function () {
                t.removeItems(n)
            })) : t.removeItems(n)
        }, _collapseChildren: function (e, t) {
            var n = this, i = e.children;
            r.each(i, function (e) {
                n.collapseNode(e, t)
            })
        }, _expandNode: function (e, t, n) {
            var i = this, o = i.get("accordion"), u = i.get("store");
            if (e.leaf) return;
            if (!i.hasStatus(e, s, t)) {
                if (o && e.parent) {
                    var a = e.parent.children;
                    r.each(a, function (t) {
                        t != e && i.collapseNode(t)
                    })
                }
                u && !u.isLoaded(e) ? i._isLoading(e, t) || u.loadNode(e) : t && (i.setItemStatus(e, s, !0, t), i._showChildren(e), i.fire("expanded", {
                    node: e,
                    element: t
                }))
            }
            r.each(e.children, function (e) {
                (n || i.isExpanded(e)) && i.expandNode(e, n)
            })
        }, _showChildren: function (e) {
            if (!e || !e.children) return;
            var t = this, n = t.indexOfItem(e), r = e.children.length, i, s = r - 1, o = [];
            for (s = r - 1; s >= 0; s--) i = e.children[s], t.getItem(i) || (t.get("expandAnimate") ? (el = t._addNodeAt(i, n + 1), el.hide(), el.slideDown()) : t.addItemAt(i, n + 1))
        }, _addNodeAt: function (e, t) {
            var n = this, r = n.get("items");
            return t === undefined && (t = r.length), r.splice(t, 0, e), n.addItemToView(e, t)
        }, _isLoading: function (e, t) {
            var n = this;
            return n.hasStatus(e, o, t)
        }, _resetIcons: function (e, t) {
            if (!this.get("showIcons")) return;
            var n = this, r = n.get("iconContainer"), i, s = n._getIconsTpl(e);
            $(t).find("." + d).remove(), i = $(t).find(r).first(), r && i.length ? $(s).prependTo(i) : $(t).prepend($(s))
        }, _toggleExpand: function (e, t) {
            var n = this;
            n._isExpanded(e, t) ? n._collapseNode(e, t) : n._expandNode(e, t)
        }, _updateIcons: function (e) {
            var t = this, n = t.findElement(e);
            n && (t._resetIcons(e, n), t._isExpanded(e, n) && !e.leaf && r.each(e.children, function (e) {
                t._updateIcons(e)
            }))
        }, _uiSetShowRoot: function (e) {
            var t = this, n = this.get("showRoot") ? 0 : 1;
            t.set("startLevel", n)
        }, _uiSetNodes: function (e) {
            var t = this, n = t.get("store");
            n.setResult(e)
        }, _uiSetShowLine: function (e) {
            var t = this, n = t.get("el");
            e ? n.addClass(h) : n.removeClass(h)
        }
    }), S
}),define("bui/tree/selection", ["bui/list"], function (e) {
    var t = e("bui/common"), n = e("bui/list").SimpleList, r = function () {
    };
    return r.ATTRS = {}, t.augment(r, {
        getSelection: function () {
            var e = this, t = e.getStatusField("selected"), r;
            return t ? (r = e.get("store"), r.findNodesBy(function (e) {
                return e[t]
            })) : n.prototype.getSelection.call(this)
        }, getSelected: function () {
            var e = this, t = e.getStatusField("selected"), r;
            return t ? (r = e.get("store"), r.findNodeBy(function (e) {
                return e[t]
            })) : n.prototype.getSelected.call(this)
        }
    }), r
}),define("bui/tree/treelist", ["bui/common", "bui/list", "bui/tree/treemixin", "bui/tree/selection"], function (e) {
    var t = e("bui/common"), n = e("bui/list"), r = e("bui/tree/treemixin"), i = e("bui/tree/selection"),
        s = n.SimpleList.extend([r, i], {}, {
            ATTRS: {
                itemCls: {value: t.prefix + "tree-item"},
                itemTpl: {value: "<li>{text}</li>"},
                idField: {value: "id"}
            }
        }, {xclass: "tree-list"});
    return s
}),define("bui/tree/treemenu", ["bui/common", "bui/list", "bui/tree/treemixin", "bui/tree/selection"], function (e) {
    var t = e("bui/common"), n = e("bui/list"), r = e("bui/tree/treemixin"), i = e("bui/tree/selection"),
        s = n.SimpleList.View.extend({
            getItemTpl: function (e, n) {
                var r = this, i = r.get("itemTplRender"), s = e.leaf ? r.get("leafTpl") : r.get("dirTpl");
                return i ? i(e, n) : t.substitute(s, e)
            }
        }, {xclass: "tree-menu-view"}), o = n.SimpleList.extend([r, i], {}, {
            ATTRS: {
                itemCls: {value: t.prefix + "tree-item"},
                dirSelectable: {value: !1},
                expandEvent: {value: "itemclick"},
                itemStatusFields: {value: {selected: "selected"}},
                collapseEvent: {value: "itemclick"},
                xview: {value: s},
                dirTpl: {view: !0, value: '<li class="{cls}"><a href="#">{text}</a></li>'},
                leafTpl: {view: !0, value: '<li class="{cls}"><a href="{href}">{text}</a></li>'},
                idField: {value: "id"}
            }
        }, {xclass: "tree-menu"});
    return o.View = s, o
}),define("bui/tooltip", ["bui/common", "bui/tooltip/tip", "bui/tooltip/tips"], function (e) {
    var t = e("bui/common"), n = t.namespace("Tooltip"), r = e("bui/tooltip/tip"), i = e("bui/tooltip/tips");
    return t.mix(n, {Tip: r, Tips: i}), n
}),define("bui/tooltip/tip", ["bui/common", "bui/overlay"], function (e) {
    function s(e, t) {
        if (e === "left") return [-1 * t, -4];
        if (e === "right") return [t, -4];
        if (e.indexOf("top")) return [0, t];
        if (e.indexOf("bottom")) return [0, -1 * t]
    }

    var t = e("bui/common"), n = e("bui/overlay"), r = "x-align-", i = {
        left: ["cl", "cr"],
        right: ["cr", "cl"],
        top: ["tc", "bc"],
        bottom: ["bc", "tc"],
        "top-left": ["tl", "bl"],
        "top-right": ["tr", "br"],
        "bottom-left": ["bl", "tl"],
        "bottom-right": ["br", "tr"]
    }, o = n.OverlayView.extend({
        renderUI: function () {
        }, _getTitleContainer: function () {
            return this.get("el")
        }, _uiSetTitle: function (e) {
            var n = this, r = n.get("titleTpl"), i = n._getTitleContainer(), s = n.get("titleEl"), o;
            s && s.remove(), e = e || "", t.isString(e) && (e = {title: e}), o = t.substitute(r, e), s = $(o).appendTo(i), n.set("titleEl", s)
        }, _uiSetAlignType: function (e, t) {
            var n = this;
            t && t.prevVal && n.get("el").removeClass(r + t.prevVal), e && n.get("el").addClass(r + e)
        }
    }, {ATTRS: {title: {}, titleEl: {}, alignType: {}}}, {xclass: "tooltip-view"}), u = n.Overlay.extend({
        _uiSetAlignType: function (e) {
            var t = this, n = t.get("offset"), r = t.get("align") || {}, o = i[e];
            o && (r.points = o, n && (r.offset = s(e, n)), t.set("align", r))
        }
    }, {
        ATTRS: {
            delegateTrigger: {value: !0},
            alignType: {view: !0},
            title: {view: !0},
            showArrow: {value: !0},
            arrowContainer: {view: !0},
            autoHide: {value: !0},
            autoHideType: {value: "leave"},
            offset: {value: 0},
            triggerEvent: {value: "mouseover"},
            titleTpl: {view: !0, value: "<span>{title}</span>"},
            xview: {value: o}
        }
    }, {xclass: "tooltip"});
    return u.View = o, u
}),define("bui/tooltip/tips", ["bui/common", "bui/tooltip/tip"], function (e) {
    function t(e) {
        return /^{.*}$/.test(e)
    }

    var n = e("bui/common"), r = e("bui/tooltip/tip"), i = function (e) {
        i.superclass.constructor.call(this, e)
    };
    return i.ATTRS = {tip: {}, defaultAlignType: {}}, n.extend(i, n.Base), n.augment(i, {
        _init: function () {
            this._initDom(), this._initEvent()
        }, _initDom: function () {
            var e = this, t = e.get("tip"), n;
            t && !t.isController && (n = t.alignType, t = new r(t), t.render(), e.set("tip", t), n && e.set("defaultAlignType", n))
        }, _initEvent: function () {
            var e = this, t = e.get("tip");
            t.on("triggerchange", function (n) {
                var r = n.curTrigger;
                e._replaceTitle(r), e._setTitle(r, t)
            })
        }, _replaceTitle: function (e) {
            var t = e.attr("title");
            t && (e.attr("data-title", t), e[0].removeAttribute("title"))
        }, _setTitle: function (e, r) {
            var i = this, s = e.attr("data-title"), o = e.attr("data-align") || i.get("defaultAlignType");
            t(s) && (s = n.JSON.looseParse(s)), r.set("title", s), o && r.set("alignType", o)
        }, render: function () {
            return this._init(), this
        }
    }), i
}),function () {
    if (BUI.loaderScript.getAttribute("data-auto-use") == "false") return;
    BUI.use(["bui/common", "bui/data", "bui/list", "bui/picker", "bui/menu", "bui/toolbar", "bui/progressbar", "bui/cookie", "bui/form", "bui/mask", "bui/select", "bui/tab", "bui/calendar", "bui/overlay", "bui/editor", "bui/grid", "bui/tree", "bui/tooltip"])
}();
