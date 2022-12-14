! function(e, t) {
    e.I18n = t(e)
}(this, function(e) {
    "use strict";
    var t = e && e.I18n || {},
        r = Array.prototype.slice,
        n = function(e) {
            return ("0" + e.toString()).substr(-2)
        },
        a = function(e, t) {
            return f("round", e, -t).toFixed(t)
        },
        i = function(e) {
            var t = typeof e;
            return "function" === t || "object" === t
        },
        o = function(e) {
            var t = typeof e;
            return "function" === t
        },
        l = function(e) {
            return "undefined" != typeof e && null !== e
        },
        s = function(e) {
            return Array.isArray ? Array.isArray(e) : "[object Array]" === Object.prototype.toString.call(e)
        },
        u = function(e) {
            return "string" == typeof value || "[object String]" === Object.prototype.toString.call(e)
        },
        c = function(e) {
            return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e)
        },
        p = function(e) {
            return e === !0 || e === !1
        },
        f = function(e, t, r) {
            return "undefined" == typeof r || 0 === +r ? Math[e](t) : (t = +t, r = +r, isNaN(t) || "number" != typeof r || r % 1 !== 0 ? NaN : (t = t.toString().split("e"), t = Math[e](+(t[0] + "e" + (t[1] ? +t[1] - r : -r))), t = t.toString().split("e"), +(t[0] + "e" + (t[1] ? +t[1] + r : r))))
        },
        h = function(e, t) {
            return o(e) ? e(t) : e
        },
        d = function(e, t) {
            var r, n;
            for (r in t) t.hasOwnProperty(r) && (n = t[r], u(n) || c(n) || p(n) ? e[r] = n : (null == e[r] && (e[r] = {}), d(e[r], n)));
            return e
        },
        m = {
            day_names: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            abbr_day_names: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            month_names: [null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            abbr_month_names: [null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            meridian: ["AM", "PM"]
        },
        g = {
            precision: 3,
            separator: ".",
            delimiter: ",",
            strip_insignificant_zeros: !1
        },
        b = {
            unit: "$",
            precision: 2,
            format: "%u%n",
            sign_first: !0,
            delimiter: ",",
            separator: "."
        },
        y = {
            unit: "%",
            precision: 3,
            format: "%n%u",
            separator: ".",
            delimiter: ""
        },
        v = [null, "kb", "mb", "gb", "tb"],
        S = {
            defaultLocale: "en",
            locale: "en",
            defaultSeparator: ".",
            placeholder: /(?:\{\{|%\{)(.*?)(?:\}\}?)/gm,
            fallbacks: !1,
            translations: {},
            missingBehaviour: "message",
            missingTranslationPrefix: ""
        };
    return t.reset = function() {
        var e;
        for (e in S) this[e] = S[e]
    }, t.initializeOptions = function() {
        var e;
        for (e in S) l(this[e]) || (this[e] = S[e])
    }, t.initializeOptions(), t.locales = {}, t.locales.get = function(e) {
        var r = this[e] || this[t.locale] || this.default;
        return o(r) && (r = r(e)), s(r) === !1 && (r = [r]), r
    }, t.locales.default = function(e) {
        var r = [],
            n = [];
        return e && r.push(e), !e && t.locale && r.push(t.locale), t.fallbacks && t.defaultLocale && r.push(t.defaultLocale), r.forEach(function(e) {
            var r = e.split("-"),
                a = null,
                i = null;
            3 === r.length ? (a = [r[0], r[1]].join("-"), i = r[0]) : 2 === r.length && (a = r[0]), n.indexOf(e) === -1 && n.push(e), t.fallbacks && [a, i].forEach(function(t) {
                "undefined" != typeof t && null !== t && t !== e && n.indexOf(t) === -1 && n.push(t)
            })
        }), r.length || r.push("en"), n
    }, t.pluralization = {}, t.pluralization.get = function(e) {
        return this[e] || this[t.locale] || this.default
    }, t.pluralization.default = function(e) {
        switch (e) {
            case 0:
                return ["zero", "other"];
            case 1:
                return ["one"];
            default:
                return ["other"]
        }
    }, t.currentLocale = function() {
        return this.locale || this.defaultLocale
    }, t.isSet = l, t.lookup = function(e, t) {
        t = t || {};
        var r, n, a, i, o = this.locales.get(t.locale).slice();
        o[0];
        for (a = this.getFullScope(e, t); o.length;)
            if (r = o.shift(), n = a.split(this.defaultSeparator), i = this.translations[r]) {
                for (; n.length && (i = i[n.shift()], void 0 !== i && null !== i););
                if (void 0 !== i && null !== i) return i
            }
        if (l(t.defaultValue)) return h(t.defaultValue, e)
    }, t.pluralizationLookupWithoutFallback = function(e, t, r) {
        var n, a, o = this.pluralization.get(t),
            s = o(e);
        if (i(r))
            for (; s.length;)
                if (n = s.shift(), l(r[n])) {
                    a = r[n];
                    break
                }
        return a
    }, t.pluralizationLookup = function(e, t, r) {
        r = r || {};
        var n, a, o, s, u = this.locales.get(r.locale).slice();
        u[0];
        for (t = this.getFullScope(t, r); u.length;)
            if (n = u.shift(), a = t.split(this.defaultSeparator), o = this.translations[n]) {
                for (; a.length && (o = o[a.shift()], i(o));) 0 == a.length && (s = this.pluralizationLookupWithoutFallback(e, n, o));
                if (null != s && void 0 != s) break
            }
        return null != s && void 0 != s || l(r.defaultValue) && (s = i(r.defaultValue) ? this.pluralizationLookupWithoutFallback(e, r.locale, r.defaultValue) : r.defaultValue, o = r.defaultValue), {
            message: s,
            translations: o
        }
    }, t.meridian = function() {
        var e = this.lookup("time"),
            t = this.lookup("date");
        return e && e.am && e.pm ? [e.am, e.pm] : t && t.meridian ? t.meridian : m.meridian
    }, t.prepareOptions = function() {
        for (var e, t = r.call(arguments), n = {}; t.length;)
            if (e = t.shift(), "object" == typeof e)
                for (var a in e) e.hasOwnProperty(a) && (l(n[a]) || (n[a] = e[a]));
        return n
    }, t.createTranslationOptions = function(e, t) {
        var r = [{
            scope: e
        }];
        return l(t.defaults) && (r = r.concat(t.defaults)), l(t.defaultValue) && r.push({
            message: t.defaultValue
        }), r
    }, t.translate = function(e, t) {
        t = t || {};
        var r, n = this.createTranslationOptions(e, t),
            a = this.prepareOptions(t);
        delete a.defaultValue;
        var o = n.some(function(t) {
            if (l(t.scope) ? r = this.lookup(t.scope, a) : l(t.message) && (r = h(t.message, e)), void 0 !== r && null !== r) return !0
        }, this);
        return o ? ("string" == typeof r ? r = this.interpolate(r, t) : i(r) && l(t.count) && (r = this.pluralize(t.count, e, t)), r) : this.missingTranslation(e, t)
    }, t.interpolate = function(e, t) {
        t = t || {};
        var r, n, a, i, o = e.match(this.placeholder);
        if (!o) return e;
        for (var n; o.length;) r = o.shift(), a = r.replace(this.placeholder, "$1"), n = l(t[a]) ? t[a].toString().replace(/\$/gm, "_#$#_") : a in t ? this.nullPlaceholder(r, e, t) : this.missingPlaceholder(r, e, t), i = new RegExp(r.replace(/\{/gm, "\\{").replace(/\}/gm, "\\}")), e = e.replace(i, n);
        return e.replace(/_#\$#_/g, "$")
    }, t.pluralize = function(e, t, r) {
        r = this.prepareOptions({
            count: String(e)
        }, r);
        var n, a;
        return a = this.pluralizationLookup(e, t, r), void 0 == a.translations || null == a.translations ? this.missingTranslation(t, r) : void 0 != a.message && null != a.message ? this.interpolate(a.message, r) : (n = this.pluralization.get(r.locale), this.missingTranslation(t + "." + n(e)[0], r))
    }, t.missingTranslation = function(e, t) {
        if ("guess" == this.missingBehaviour) {
            var r = e.split(".").slice(-1)[0];
            return (this.missingTranslationPrefix.length > 0 ? this.missingTranslationPrefix : "") + r.replace("_", " ").replace(/([a-z])([A-Z])/g, function(e, t, r) {
                return t + " " + r.toLowerCase()
            })
        }
        var n = null != t && null != t.locale ? t.locale : this.currentLocale(),
            a = this.getFullScope(e, t),
            i = [n, a].join(this.defaultSeparator);
        return '[missing "' + i + '" translation]'
    }, t.missingPlaceholder = function(e, t, r) {
        return "[missing " + e + " value]"
    }, t.nullPlaceholder = function() {
        return t.missingPlaceholder.apply(t, arguments)
    }, t.toNumber = function(e, t) {
        t = this.prepareOptions(t, this.lookup("number.format"), g);
        var r, n, i = e < 0,
            o = a(Math.abs(e), t.precision).toString(),
            l = o.split("."),
            s = [],
            u = t.format || "%n",
            c = i ? "-" : "";
        for (e = l[0], r = l[1]; e.length > 0;) s.unshift(e.substr(Math.max(0, e.length - 3), 3)), e = e.substr(0, e.length - 3);
        return n = s.join(t.delimiter), t.strip_insignificant_zeros && r && (r = r.replace(/0+$/, "")), t.precision > 0 && r && (n += t.separator + r), u = t.sign_first ? "%s" + u : u.replace("%n", "%s%n"), n = u.replace("%u", t.unit).replace("%n", n).replace("%s", c)
    }, t.toCurrency = function(e, t) {
        return t = this.prepareOptions(t, this.lookup("number.currency.format"), this.lookup("number.format"), b), this.toNumber(e, t)
    }, t.localize = function(e, t, r) {
        switch (r || (r = {}), e) {
            case "currency":
                return this.toCurrency(t);
            case "number":
                return e = this.lookup("number.format"), this.toNumber(t, e);
            case "percentage":
                return this.toPercentage(t);
            default:
                var n;
                return n = e.match(/^(date|time)/) ? this.toTime(e, t) : t.toString(), this.interpolate(n, r)
        }
    }, t.parseDate = function(e) {
        var t, r, n;
        if ("object" == typeof e) return e;
        if (t = e.toString().match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2})([\.,]\d{1,3})?)?(Z|\+00:?00)?/)) {
            for (var a = 1; a <= 6; a++) t[a] = parseInt(t[a], 10) || 0;
            t[2] -= 1, n = t[7] ? 1e3 * ("0" + t[7]) : null, r = t[8] ? new Date(Date.UTC(t[1], t[2], t[3], t[4], t[5], t[6], n)) : new Date(t[1], t[2], t[3], t[4], t[5], t[6], n)
        } else "number" == typeof e ? (r = new Date, r.setTime(e)) : e.match(/([A-Z][a-z]{2}) ([A-Z][a-z]{2}) (\d+) (\d+:\d+:\d+) ([+-]\d+) (\d+)/) ? (r = new Date, r.setTime(Date.parse([RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$6, RegExp.$4, RegExp.$5].join(" ")))) : e.match(/\d+ \d+:\d+:\d+ [+-]\d+ \d+/) ? (r = new Date, r.setTime(Date.parse(e))) : (r = new Date, r.setTime(Date.parse(e)));
        return r
    }, t.strftime = function(e, r) {
        var a = this.lookup("date"),
            i = t.meridian();
        if (a || (a = {}), a = this.prepareOptions(a, m), isNaN(e.getTime())) throw new Error("I18n.strftime() requires a valid date object, but received an invalid date.");
        var o = e.getDay(),
            l = e.getDate(),
            s = e.getFullYear(),
            u = e.getMonth() + 1,
            c = e.getHours(),
            p = c,
            f = c > 11 ? 1 : 0,
            h = e.getSeconds(),
            d = e.getMinutes(),
            g = e.getTimezoneOffset(),
            b = Math.floor(Math.abs(g / 60)),
            y = Math.abs(g) - 60 * b,
            v = (g > 0 ? "-" : "+") + (b.toString().length < 2 ? "0" + b : b) + (y.toString().length < 2 ? "0" + y : y);
        return p > 12 ? p -= 12 : 0 === p && (p = 12), r = r.replace("%a", a.abbr_day_names[o]), r = r.replace("%A", a.day_names[o]), r = r.replace("%b", a.abbr_month_names[u]), r = r.replace("%B", a.month_names[u]), r = r.replace("%d", n(l)), r = r.replace("%e", l), r = r.replace("%-d", l), r = r.replace("%H", n(c)), r = r.replace("%-H", c), r = r.replace("%I", n(p)), r = r.replace("%-I", p), r = r.replace("%m", n(u)), r = r.replace("%-m", u), r = r.replace("%M", n(d)), r = r.replace("%-M", d), r = r.replace("%p", i[f]), r = r.replace("%S", n(h)), r = r.replace("%-S", h), r = r.replace("%w", o), r = r.replace("%y", n(s)), r = r.replace("%-y", n(s).replace(/^0+/, "")), r = r.replace("%Y", s), r = r.replace("%z", v)
    }, t.toTime = function(e, t) {
        var r = this.parseDate(t),
            n = this.lookup(e);
        return r.toString().match(/invalid/i) ? r.toString() : n ? this.strftime(r, n) : r.toString()
    }, t.toPercentage = function(e, t) {
        return t = this.prepareOptions(t, this.lookup("number.percentage.format"), this.lookup("number.format"), y), this.toNumber(e, t)
    }, t.toHumanSize = function(e, t) {
        for (var r, n, a = 1024, i = e, o = 0; i >= a && o < 4;) i /= a, o += 1;
        return 0 === o ? (r = this.t("number.human.storage_units.units.byte", {
            count: i
        }), n = 0) : (r = this.t("number.human.storage_units.units." + v[o]), n = i - Math.floor(i) === 0 ? 0 : 1), t = this.prepareOptions(t, {
            unit: r,
            precision: n,
            format: "%n%u",
            delimiter: ""
        }), this.toNumber(i, t)
    }, t.getFullScope = function(e, t) {
        return t = t || {}, s(e) && (e = e.join(this.defaultSeparator)), t.scope && (e = [t.scope, e].join(this.defaultSeparator)), e
    }, t.extend = function(e, t) {
        return "undefined" == typeof e && "undefined" == typeof t ? {} : d(e, t)
    }, t.t = t.translate, t.l = t.localize, t.p = t.pluralize, t
});