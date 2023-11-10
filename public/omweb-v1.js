(function (omidGlobal) {
  "use strict";
  var n;
  function aa(a) {
    var b = 0;
    return function () {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    };
  }
  function p(a) {
    var b =
      "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    return b ? b.call(a) : { next: aa(a) };
  }
  function q(a) {
    if (!(a instanceof Array)) {
      a = p(a);
      for (var b, c = []; !(b = a.next()).done; ) c.push(b.value);
      a = c;
    }
    return a;
  }
  var ba =
      "function" == typeof Object.create
        ? Object.create
        : function (a) {
            function b() {}
            b.prototype = a;
            return new b();
          },
    ca;
  if ("function" == typeof Object.setPrototypeOf) ca = Object.setPrototypeOf;
  else {
    var da;
    a: {
      var ea = { W: !0 },
        fa = {};
      try {
        fa.__proto__ = ea;
        da = fa.W;
        break a;
      } catch (a) {}
      da = !1;
    }
    ca = da
      ? function (a, b) {
          a.__proto__ = b;
          if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
          return a;
        }
      : null;
  }
  var ha = ca;
  function r(a, b) {
    a.prototype = ba(b.prototype);
    a.prototype.constructor = a;
    if (ha) ha(a, b);
    else
      for (var c in b)
        if ("prototype" != c)
          if (Object.defineProperties) {
            var d = Object.getOwnPropertyDescriptor(b, c);
            d && Object.defineProperty(a, c, d);
          } else a[c] = b[c];
  }
  function ia(a) {
    a = [
      "object" == typeof window && window,
      "object" == typeof self && self,
      "object" == typeof global && global,
      a
    ];
    for (var b = 0; b < a.length; ++b) {
      var c = a[b];
      if (c && c.Math == Math) return c;
    }
    return globalThis;
  }
  var t = ia(this),
    v =
      "function" == typeof Object.defineProperties
        ? Object.defineProperty
        : function (a, b, c) {
            a != Array.prototype && a != Object.prototype && (a[b] = c.value);
          };
  function x(a, b) {
    if (b) {
      var c = t;
      a = a.split(".");
      for (var d = 0; d < a.length - 1; d++) {
        var e = a[d];
        e in c || (c[e] = {});
        c = c[e];
      }
      a = a[a.length - 1];
      d = c[a];
      b = b(d);
      b != d &&
        null != b &&
        v(c, a, { configurable: !0, writable: !0, value: b });
    }
  }
  x("globalThis", function (a) {
    return a || t;
  });
  function y(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  }
  var ja =
    "function" == typeof Object.assign
      ? Object.assign
      : function (a, b) {
          for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d) for (var e in d) y(d, e) && (a[e] = d[e]);
          }
          return a;
        };
  x("Object.assign", function (a) {
    return a || ja;
  });
  function la() {
    la = function () {};
    t.Symbol || (t.Symbol = ma);
  }
  function na(a, b) {
    this.a = a;
    v(this, "description", { configurable: !0, writable: !0, value: b });
  }
  na.prototype.toString = function () {
    return this.a;
  };
  var ma = (function () {
    function a(c) {
      if (this instanceof a) throw new TypeError("Symbol is not a constructor");
      return new na("jscomp_symbol_" + (c || "") + "_" + b++, c);
    }
    var b = 0;
    return a;
  })();
  function z() {
    la();
    var a = t.Symbol.iterator;
    a || (a = t.Symbol.iterator = t.Symbol("Symbol.iterator"));
    "function" != typeof Array.prototype[a] &&
      v(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function () {
          return oa(aa(this));
        }
      });
    z = function () {};
  }
  function oa(a) {
    z();
    a = { next: a };
    a[t.Symbol.iterator] = function () {
      return this;
    };
    return a;
  }
  x("WeakMap", function (a) {
    function b(h) {
      this.a = (g += Math.random() + 1).toString();
      if (h) {
        h = p(h);
        for (var k; !(k = h.next()).done; ) (k = k.value), this.set(k[0], k[1]);
      }
    }
    function c() {}
    function d(h) {
      var k = typeof h;
      return ("object" === k && null !== h) || "function" === k;
    }
    function e(h) {
      if (!y(h, l)) {
        var k = new c();
        v(h, l, { value: k });
      }
    }
    function f(h) {
      var k = Object[h];
      k &&
        (Object[h] = function (m) {
          if (m instanceof c) return m;
          e(m);
          return k(m);
        });
    }
    if (
      (function () {
        if (!a || !Object.seal) return !1;
        try {
          var h = Object.seal({}),
            k = Object.seal({}),
            m = new a([
              [h, 2],
              [k, 3]
            ]);
          if (2 != m.get(h) || 3 != m.get(k)) return !1;
          m.delete(h);
          m.set(k, 4);
          return !m.has(h) && 4 == m.get(k);
        } catch (u) {
          return !1;
        }
      })()
    )
      return a;
    var l = "$jscomp_hidden_" + Math.random();
    f("freeze");
    f("preventExtensions");
    f("seal");
    var g = 0;
    b.prototype.set = function (h, k) {
      if (!d(h)) throw Error("Invalid WeakMap key");
      e(h);
      if (!y(h, l)) throw Error("WeakMap key fail: " + h);
      h[l][this.a] = k;
      return this;
    };
    b.prototype.get = function (h) {
      return d(h) && y(h, l) ? h[l][this.a] : void 0;
    };
    b.prototype.has = function (h) {
      return d(h) && y(h, l) && y(h[l], this.a);
    };
    b.prototype.delete = function (h) {
      return d(h) && y(h, l) && y(h[l], this.a) ? delete h[l][this.a] : !1;
    };
    return b;
  });
  x("Map", function (a) {
    function b() {
      var g = {};
      return (g.D = g.next = g.head = g);
    }
    function c(g, h) {
      var k = g.a;
      return oa(function () {
        if (k) {
          for (; k.head != g.a; ) k = k.D;
          for (; k.next != k.head; )
            return (k = k.next), { done: !1, value: h(k) };
          k = null;
        }
        return { done: !0, value: void 0 };
      });
    }
    function d(g, h) {
      var k = h && typeof h;
      "object" == k || "function" == k
        ? f.has(h)
          ? (k = f.get(h))
          : ((k = "" + ++l), f.set(h, k))
        : (k = "p_" + h);
      var m = g.b[k];
      if (m && y(g.b, k))
        for (g = 0; g < m.length; g++) {
          var u = m[g];
          if ((h !== h && u.key !== u.key) || h === u.key)
            return { id: k, list: m, index: g, o: u };
        }
      return { id: k, list: m, index: -1, o: void 0 };
    }
    function e(g) {
      this.b = {};
      this.a = b();
      this.size = 0;
      if (g) {
        g = p(g);
        for (var h; !(h = g.next()).done; ) (h = h.value), this.set(h[0], h[1]);
      }
    }
    if (
      (function () {
        if (
          !a ||
          "function" != typeof a ||
          !a.prototype.entries ||
          "function" != typeof Object.seal
        )
          return !1;
        try {
          var g = Object.seal({ x: 4 }),
            h = new a(p([[g, "s"]]));
          if (
            "s" != h.get(g) ||
            1 != h.size ||
            h.get({ x: 4 }) ||
            h.set({ x: 4 }, "t") != h ||
            2 != h.size
          )
            return !1;
          var k = h.entries(),
            m = k.next();
          if (m.done || m.value[0] != g || "s" != m.value[1]) return !1;
          m = k.next();
          return m.done ||
            4 != m.value[0].x ||
            "t" != m.value[1] ||
            !k.next().done
            ? !1
            : !0;
        } catch (u) {
          return !1;
        }
      })()
    )
      return a;
    z();
    var f = new WeakMap();
    e.prototype.set = function (g, h) {
      g = 0 === g ? 0 : g;
      var k = d(this, g);
      k.list || (k.list = this.b[k.id] = []);
      k.o
        ? (k.o.value = h)
        : ((k.o = {
            next: this.a,
            D: this.a.D,
            head: this.a,
            key: g,
            value: h
          }),
          k.list.push(k.o),
          (this.a.D.next = k.o),
          (this.a.D = k.o),
          this.size++);
      return this;
    };
    e.prototype.delete = function (g) {
      g = d(this, g);
      return g.o && g.list
        ? (g.list.splice(g.index, 1),
          g.list.length || delete this.b[g.id],
          (g.o.D.next = g.o.next),
          (g.o.next.D = g.o.D),
          (g.o.head = null),
          this.size--,
          !0)
        : !1;
    };
    e.prototype.clear = function () {
      this.b = {};
      this.a = this.a.D = b();
      this.size = 0;
    };
    e.prototype.has = function (g) {
      return !!d(this, g).o;
    };
    e.prototype.get = function (g) {
      return (g = d(this, g).o) && g.value;
    };
    e.prototype.entries = function () {
      return c(this, function (g) {
        return [g.key, g.value];
      });
    };
    e.prototype.keys = function () {
      return c(this, function (g) {
        return g.key;
      });
    };
    e.prototype.values = function () {
      return c(this, function (g) {
        return g.value;
      });
    };
    e.prototype.forEach = function (g, h) {
      for (var k = this.entries(), m; !(m = k.next()).done; )
        (m = m.value), g.call(h, m[1], m[0], this);
    };
    e.prototype[Symbol.iterator] = e.prototype.entries;
    var l = 0;
    return e;
  });
  x("Object.values", function (a) {
    return a
      ? a
      : function (b) {
          var c = [],
            d;
          for (d in b) y(b, d) && c.push(b[d]);
          return c;
        };
  });
  x("Set", function (a) {
    function b(c) {
      this.a = new Map();
      if (c) {
        c = p(c);
        for (var d; !(d = c.next()).done; ) this.add(d.value);
      }
      this.size = this.a.size;
    }
    if (
      (function () {
        if (
          !a ||
          "function" != typeof a ||
          !a.prototype.entries ||
          "function" != typeof Object.seal
        )
          return !1;
        try {
          var c = Object.seal({ x: 4 }),
            d = new a(p([c]));
          if (
            !d.has(c) ||
            1 != d.size ||
            d.add(c) != d ||
            1 != d.size ||
            d.add({ x: 4 }) != d ||
            2 != d.size
          )
            return !1;
          var e = d.entries(),
            f = e.next();
          if (f.done || f.value[0] != c || f.value[1] != c) return !1;
          f = e.next();
          return f.done ||
            f.value[0] == c ||
            4 != f.value[0].x ||
            f.value[1] != f.value[0]
            ? !1
            : e.next().done;
        } catch (l) {
          return !1;
        }
      })()
    )
      return a;
    z();
    b.prototype.add = function (c) {
      c = 0 === c ? 0 : c;
      this.a.set(c, c);
      this.size = this.a.size;
      return this;
    };
    b.prototype.delete = function (c) {
      c = this.a.delete(c);
      this.size = this.a.size;
      return c;
    };
    b.prototype.clear = function () {
      this.a.clear();
      this.size = 0;
    };
    b.prototype.has = function (c) {
      return this.a.has(c);
    };
    b.prototype.entries = function () {
      return this.a.entries();
    };
    b.prototype.values = function () {
      return this.a.values();
    };
    b.prototype.keys = b.prototype.values;
    b.prototype[Symbol.iterator] = b.prototype.values;
    b.prototype.forEach = function (c, d) {
      var e = this;
      this.a.forEach(function (f) {
        return c.call(d, f, f, e);
      });
    };
    return b;
  });
  x("Object.is", function (a) {
    return a
      ? a
      : function (b, c) {
          return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
        };
  });
  x("Array.prototype.includes", function (a) {
    return a
      ? a
      : function (b, c) {
          var d = this;
          d instanceof String && (d = String(d));
          var e = d.length;
          c = c || 0;
          for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
            var f = d[c];
            if (f === b || Object.is(f, b)) return !0;
          }
          return !1;
        };
  });
  var A = {
      ga: "loaded",
      ma: "start",
      da: "firstQuartile",
      ha: "midpoint",
      na: "thirdQuartile",
      ba: "complete",
      ia: "pause",
      ka: "resume",
      aa: "bufferStart",
      $: "bufferFinish",
      la: "skipped",
      oa: "volumeChange",
      ja: "playerStateChange",
      Z: "adUserInteraction"
    },
    pa = { ea: "full", ca: "domain", fa: "limited" };
  function B(a, b) {
    this.x = null != a.x ? a.x : a.left;
    this.y = null != a.y ? a.y : a.top;
    this.width = a.width;
    this.height = a.height;
    this.B = this.x + this.width;
    this.C = this.y + this.height;
    this.u = a.u || void 0;
    this.S = a.S || [];
    this.b = a.friendlyObstructionClass || void 0;
    this.c = a.friendlyObstructionPurpose || void 0;
    this.f = a.friendlyObstructionReason || void 0;
    this.L = void 0 !== a.L ? !0 === a.L : !0;
    this.g = void 0 !== a.hasWindowFocus ? !0 === a.hasWindowFocus : !0;
    this.v = a.v || void 0;
    this.J = a.J || [];
    this.M = a.M || !1;
    this.a = b;
  }
  function qa(a) {
    var b = {};
    return (b.width = a.width), (b.height = a.height), b;
  }
  function E(a) {
    var b = {};
    return Object.assign({}, qa(a), ((b.x = a.x), (b.y = a.y), b));
  }
  function F(a) {
    var b = E(a),
      c = {};
    return Object.assign({}, b, ((c.endX = a.B), (c.endY = a.C), c));
  }
  B.prototype.O = function (a) {
    if (null == a) return !1;
    a = E(a);
    var b = a.y,
      c = a.width,
      d = a.height;
    return (
      this.x === a.x && this.y === b && this.width === c && this.height === d
    );
  };
  function G(a) {
    return a.width * a.height;
  }
  function I(a) {
    return 0 === a.width || 0 === a.height;
  }
  function ra(a, b) {
    var c = 0;
    if (0 < b.length) {
      var d = sa(a, b);
      a = d.X;
      d = d.Y;
      for (var e = 0; e < a.length - 1; e++)
        for (
          var f = (a[e] + (a[e] + 1)) / 2, l = a[e + 1] - a[e], g = 0;
          g < d.length - 1;
          g++
        ) {
          for (
            var h = (d[g] + (d[g] + 1)) / 2, k = d[g + 1] - d[g], m = !1, u = 0;
            u < b.length;
            u++
          ) {
            var w = E(b[u]);
            if (w.x < f && w.x + w.width > f && w.y < h && w.y + w.height > h) {
              m = !0;
              break;
            }
          }
          m && (c += Math.round(l) * Math.round(k));
        }
    }
    return c;
  }
  function sa(a, b) {
    a = E(a);
    for (var c = [], d = [], e = 0; e < b.length; e++) {
      var f = E(b[e]);
      f = ta(a, f);
      J(c, f.x);
      J(c, f.B);
      J(d, f.y);
      J(d, f.C);
    }
    c = c.sort(function (l, g) {
      return l - g;
    });
    d = d.sort(function (l, g) {
      return l - g;
    });
    return { X: c, Y: d };
  }
  function ta(a, b) {
    return {
      x: Math.max(a.x, b.x),
      y: Math.max(a.y, b.y),
      B: Math.min(a.x + a.width, b.x + b.width),
      C: Math.min(a.y + a.height, b.y + b.height)
    };
  }
  function J(a, b) {
    -1 === a.indexOf(b) && a.push(b);
  }
  function ua() {
    this.b = this.a = this.c = this.i = void 0;
    this.l = 0;
    this.h = [];
    this.s = [];
    this.m = 0;
    this.j = [];
    this.f = [];
    this.g = [];
  }
  ua.prototype.O = function (a) {
    return null == a ? !1 : JSON.stringify(va(this)) === JSON.stringify(va(a));
  };
  function va(a) {
    var b = [],
      c = [],
      d = {
        viewport: a.i,
        adView: { percentageInView: a.l, pixelsInView: a.m, reasons: a.g },
        declaredFriendlyObstructions: a.h.length
      };
    if (void 0 !== a.a) {
      d.adView.geometry = E(a.a);
      d.adView.geometry.pixels = G(a.a);
      d.adView.onScreenGeometry = E(a.b);
      d.adView.onScreenGeometry.pixels = Math.max(0, G(a.b) - ra(a.b, a.f));
      for (var e = 0; e < a.f.length; e++) b.push(E(a.f[e]));
      for (e = 0; e < a.s.length; e++) {
        var f = a.s[e],
          l = f,
          g = {};
        l.b && (g.obstructionClass = l.b);
        l.c && (g.obstructionPurpose = l.c);
        l.f && (g.obstructionReason = l.f);
        f = ta(a.a, f);
        c.push(
          Object.assign(
            {},
            { x: f.x, y: f.y, width: f.B - f.x, height: f.C - f.y },
            g
          )
        );
      }
      d.adView.onScreenGeometry.obstructions = b;
      d.adView.onScreenGeometry.friendlyObstructions = c;
    }
    return d;
  }
  function wa(a, b) {
    b = qa(b);
    a.i = {};
    a.i.width = b.width;
    a.i.height = b.height;
    a.c = {};
    a.c.x = 0;
    a.c.y = 0;
    a.c.width = b.width;
    a.c.height = b.height;
    a.c.endX = b.width;
    a.c.endY = b.height;
  }
  function xa() {
    return { x: 0, y: 0, endX: 0, endY: 0, width: 0, height: 0 };
  }
  function ya(a, b) {
    var c = {};
    c.x = Math.max(a.x, b.x);
    c.y = Math.max(a.y, b.y);
    c.endX = Math.min(a.endX, b.endX);
    c.endY = Math.min(a.endY, b.endY);
    c.width = Math.max(0, c.endX - c.x);
    c.height = Math.max(0, c.endY - c.y);
    return c;
  }
  function za(a, b) {
    return 0.01 < b.width - a.width || 0.01 < b.height - a.height;
  }
  function Aa(a) {
    if (-1 !== a.g.indexOf("backgrounded")) (a.l = 0), (a.m = 0);
    else {
      var b = G(a.a);
      if (0 !== b) {
        var c = Math.max(0, G(a.b) - ra(a.b, a.f));
        a.l = Math.round((c / b) * 100);
        a.m = c;
      }
    }
  }
  function Ba(a, b) {
    if (I(b) || !a.b) b = !1;
    else {
      var c = F(a.b),
        d = c.y,
        e = c.endX;
      a = c.endY;
      var f = b.B;
      c = c.x;
      (f = f < c || 0.01 > Math.abs(f - c)) ||
        ((f = b.x), (f = f > e || 0.01 > Math.abs(f - e)));
      (e = f) || ((e = b.C), (e = e < d || 0.01 > Math.abs(e - d)));
      (d = e) || ((b = b.y), (d = b > a || 0.01 > Math.abs(b - a)));
      b = !d;
    }
    return b;
  }
  function K(a, b) {
    for (var c = !1, d = 0; d < a.g.length; d++) a.g[d] === b && (c = !0);
    c || a.g.push(b);
  }
  function Ca(a, b, c, d) {
    var e = b.M ? !0 : b.u === d;
    if (e) {
      c.a = b;
      var f = F(c.a);
      a = ya(c.c, f);
      var l = c.a;
      "notAttached" === l.v || "noWindowFocus" === l.v || "noAdView" === l.v
        ? (K(c, "notFound"), (c.b = new B(xa(), !1)))
        : ((l = c.a),
          "viewInvisible" === l.v ||
          "viewGone" === l.v ||
          "viewNotVisible" === l.v ||
          "viewAlphaZero" === l.v ||
          "viewHidden" === l.v ||
          void 0 !== c.a.v ||
          I(c.a)
            ? (K(c, "hidden"), (c.b = new B(xa(), !1)))
            : (c.a.g || (K(c, "backgrounded"), K(c, "noWindowFocus")),
              za(a, f) && K(c, "clipped"),
              (c.b = new B(a, !1))));
    } else if (
      ((f = !0), b.a && (f = -1 !== b.S.indexOf(d) ? !1 : !1 === b.L), f)
    ) {
      l = b.J;
      for (var g = 0; g < l.length; g++)
        (f = void 0 !== c.a), Ca(a, new B(l[g], f), c, d);
    }
    e ||
      void 0 === c.a ||
      (b.a
        ? -1 !== b.S.indexOf(d)
          ? c.h.push(b)
          : c.j.push(b)
        : ((e = F(b)),
          (d = F(c.b)),
          E(c.b),
          !I(c.b) &&
            b.L &&
            ((b = ya(d, e)),
            za(b, d) && (K(c, "clipped"), (c.b = new B(b, !1))))));
  }
  function Da(a, b) {
    this.y = this.x = 0;
    this.width = a;
    this.height = b;
  }
  function Ea() {
    return {
      apiVersion: "1.0",
      accessMode: "limited",
      environment: "web",
      omidJsInfo: {
        omidImplementer: "omsdk",
        serviceVersion: "1.3.27-iab3260"
      },
      adSessionType: "html",
      supports: ["clid", "vlid"]
    };
  }
  function Fa() {
    this.u = null;
    this.c = Ea();
    this.m = null;
    this.l = "foregrounded";
    this.i = this.j = "none";
    this.h = this.g = this.f = this.s = this.b = this.a = this.H = this.N = null;
    this.G = !0;
    this.F = new Map();
  }
  var L;
  function M() {
    L || (L = new Fa());
    return L;
  }
  var N = (function () {
    if ("undefined" !== typeof omidGlobal && omidGlobal) return omidGlobal;
    if ("undefined" !== typeof global && global) return global;
    if ("undefined" !== typeof window && window) return window;
    if ("undefined" !== typeof globalThis && globalThis) return globalThis;
    var a = Function("return this")();
    if (a) return a;
    throw Error("Could not determine global object context.");
  })();
  function Ga(a) {
    if (a === N) return !1;
    try {
      if ("undefined" === typeof a.location.hostname) return !0;
    } catch (b) {
      return !0;
    }
    return !1;
  }
  function Ha() {
    var a = omidGlobal;
    if (null == a || "undefined" === typeof a.top || null == a.top) return null;
    try {
      var b = a.top;
      return Ga(b) ? null : b.location.href;
    } catch (c) {
      return null;
    }
  }
  function Ia(a, b) {
    this.a = a;
    this.b = b;
  }
  t.Object.defineProperties(Ia.prototype, {
    event: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.a;
      }
    },
    origin: {
      configurable: !0,
      enumerable: !0,
      get: function () {
        return this.b;
      }
    }
  });
  function O(a) {
    for (var b = [], c = 0; c < arguments.length; ++c) b[c] = arguments[c];
    Ja(
      function () {
        throw new (Function.prototype.bind.apply(
          Error,
          [null, "Could not complete the test successfully - "].concat(q(b))
        ))();
      },
      function () {
        return console.error.apply(console, q(b));
      }
    );
  }
  function Ka(a) {
    for (var b = [], c = 0; c < arguments.length; ++c) b[c] = arguments[c];
    Ja(
      function () {},
      function () {
        return console.error.apply(console, q(b));
      }
    );
  }
  function Ja(a, b) {
    "undefined" !== typeof jasmine && jasmine
      ? a()
      : "undefined" !== typeof console && console && console.error && b();
  }
  function La() {
    this.f = [];
    this.b = [];
    this.c = [];
    this.g = [];
    this.i = {};
    this.a = M();
  }
  function Ma(a) {
    a.f = [];
    a.b = [];
    a.c = [];
    a.g = [];
    a.i = {};
    L.u = null;
    L.c = Ea();
    L.m = null;
    L.R = void 0;
    L.T = void 0;
    L.P = null;
    L.K = null;
    L.w = null;
    L.l = "foregrounded";
    L.j = "none";
    L.i = "none";
    L.N = null;
    L.H = null;
    L.a = null;
    L.b = null;
    L.s = null;
    L.f = null;
    L.g = null;
    L.h = null;
    L.G = !0;
    L.F = new Map();
  }
  function Na(a, b) {
    void 0 !== a.a &&
      a.a.u &&
      !1 !== Oa(a, b) &&
      a.c
        .filter(function (c) {
          return c.type === b.event.type;
        })
        .forEach(function (c) {
          return a.h(c.I, b.event);
        });
  }
  function Pa(a, b) {
    a.f.push(b);
    Na(a, b);
  }
  function Qa(a, b, c) {
    void 0 !== a.a &&
      a.a.u &&
      a.f
        .filter(function (d) {
          return d.event.type === b && Oa(a, d);
        })
        .map(function (d) {
          return d.event;
        })
        .forEach(c);
  }
  function Oa(a, b) {
    var c = b.event.type,
      d = -1 !== Object.values(A).indexOf(c) && "volumeChange" !== c;
    return "impression" === c || ("loaded" === c && a.a.b)
      ? b.origin === M().i
      : d
      ? b.origin === M().j
      : !0;
  }
  function Ra(a, b, c) {
    "media" === b || "video" === b
      ? Sa(a, c)
      : (a.c.push({ type: b, I: c }), Qa(a, b, c));
  }
  function Sa(a, b) {
    Object.keys(A).forEach(function (c) {
      c = A[c];
      a.c.push({ type: c, I: b });
      Qa(a, c, b);
    });
  }
  function Ta(a, b, c, d) {
    var e = { V: c, U: d, I: b };
    a.g.push(e);
    a.b.forEach(function (f) {
      var l = Ua(f);
      "sessionStart" === f.event.type && Va(a, l, e);
      a.h(b, l);
    });
  }
  function Wa(a, b, c) {
    var d = P(a, "sessionError", "native", { errorType: b, message: c });
    a.b.push(d);
    a.g.forEach(function (e) {
      a.h(e.I, d.event);
    });
  }
  function Xa(a, b) {
    a.i = Object.assign(a.i, b);
    b = a.a.c;
    if (void 0 !== b) {
      b = Object.assign({}, Ya(a, Za(a, { context: b }), !0), {
        supportsLoadedEvent: !!a.a.b || "video" == a.a.a
      });
      Object.assign(b, { pageUrl: Ha(), contentUrl: a.a.m });
      var c = P(a, "sessionStart", "native", b);
      a.b.push(c);
      a.g.forEach(function (d) {
        var e = d.I,
          f = Ua(c);
        Va(a, f, d);
        a.h(e, f);
      }, a);
      $a(a);
    }
  }
  function Va(a, b, c) {
    c.V && (b.data.verificationParameters = a.i[c.V]);
    c.U &&
      (c = a.a.F.get(c.U)) &&
      ((b.data.verificationParameters = c.verificationParameters),
      (b.data.context.accessMode = c.accessMode),
      "full" === c.accessMode &&
        (a.a.g && (b.data.context.videoElement = a.a.g),
        a.a.f && (b.data.context.slotElement = a.a.f)));
  }
  function ab(a) {
    var b = a.g,
      c = P(a, "sessionFinish", "native");
    a.b.push(c);
    var d = a.a.c;
    (d && "native" == d.adSessionType) || Ma(a);
    b.forEach(function (e) {
      return a.h(e.I, c.event);
    });
  }
  La.prototype.h = function (a, b) {
    for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
    try {
      a.apply(null, q(c));
    } catch (e) {
      Ka(e);
    }
  };
  function $a(a) {
    var b = a.f
        .filter(function (f) {
          return (Object.values(A).includes(f.event.type) &&
            "video" == a.a.a &&
            f.origin === a.a.j) ||
            ("loaded" == f.event.type &&
              "display" == a.a.a &&
              f.origin === a.a.i)
            ? !0
            : !1;
        })
        .map(function (f) {
          return f.event;
        }),
      c = a.a.u || "",
      d = {};
    b = p(b);
    for (var e = b.next(); !e.done; d = { A: d.A }, e = b.next()) {
      d.A = e.value;
      d.A.adSessionId || (d.A.adSessionId = c);
      if ("loaded" == d.A.type) {
        if (!a.a.b && "display" == a.a.a) continue;
        d.A.data = Ya(a, Za(a, d.A.data));
      }
      a.c
        .filter(
          (function (f) {
            return function (l) {
              return l.type === f.A.type;
            };
          })(d)
        )
        .forEach(
          (function (f) {
            return function (l) {
              return l.I(f.A);
            };
          })(d)
        );
    }
  }
  function bb(a, b) {
    a: {
      b = new Set(b);
      a = p(a.f.concat(a.b));
      for (var c = a.next(); !c.done; c = a.next())
        if (((c = c.value), b.has(c.event.type) && "javascript" != c.origin)) {
          b = !0;
          break a;
        }
      b = !1;
    }
    return b
      ? (O(
          "Event owner cannot be registered after its events have already been published."
        ),
        !1)
      : !0;
  }
  function cb(a) {
    var b = a.a.i;
    return "none" != b && "javascript" != b
      ? (O("Impression event is owned by " + (a.a.i + ", not javascript.")), !1)
      : !0;
  }
  function db(a) {
    var b = a.a.j;
    return "none" != b && "javascript" != b
      ? (O("Media events are owned by " + (a.a.j + ", not javascript.")), !1)
      : !0;
  }
  function Ya(a, b, c) {
    c = void 0 === c ? !1 : c;
    b = Object.assign({}, b);
    a.a.a && Object.assign(b, { mediaType: a.a.a });
    a.a.b &&
      (c || "definedByJavaScript" !== a.a.b) &&
      Object.assign(b, { creativeType: a.a.b });
    return b;
  }
  function Za(a, b) {
    return a.a.s ? Object.assign({}, b, { impressionType: a.a.s }) : b;
  }
  function P(a, b, c, d) {
    return new Ia(
      {
        adSessionId: a.a.u || "",
        timestamp: new Date().getTime(),
        type: b,
        data: d
      },
      c
    );
  }
  function Ua(a) {
    a = a.event;
    return {
      adSessionId: a.adSessionId,
      timestamp: a.timestamp,
      type: a.type,
      data: a.data
    };
  }
  function eb(a) {
    return !(!a || !a.tagName || "iframe" !== a.tagName.toLowerCase());
  }
  function Q(a, b, c) {
    this.f = a;
    this.T = b;
    this.N = c;
    this.c = M();
    this.b = null;
    this.a = this.g = this.F = void 0;
    this.R = !0;
    this.l = void 0;
    fb(this);
  }
  function fb(a) {
    if (!a.b) {
      var b;
      a: {
        if (
          (b = a.f.document) &&
          b.getElementsByClassName &&
          (b = b.getElementsByClassName("omid-element"))
        ) {
          if (1 == b.length) {
            b = b[0];
            break a;
          }
          1 < b.length &&
            a.R &&
            (Wa(
              a.N,
              "generic",
              "More than one element with 'omid-element' class name."
            ),
            (a.R = !1));
        }
        b = null;
      }
      if (b && b.tagName && "video" === b.tagName.toLowerCase()) a.c.g = b;
      else if (b && b.tagName) a.c.f = b;
      else return;
      gb(a);
    }
  }
  function gb(a) {
    a.c.g
      ? ((a.b = a.c.g), a.i())
      : a.c.f && ((a.b = a.c.f), eb(a.b) ? a.c.h && a.i() : a.i());
  }
  function hb(a) {
    a.a && (eb(a.b) ? a.c.h && (a.K(), ib(a)) : (a.K(), ib(a)));
  }
  Q.prototype.s = function () {
    this.l &&
      (this.f.document.removeEventListener("visibilitychange", this.l),
      (this.l = void 0));
  };
  Q.prototype.i = function () {
    var a = this;
    this.l ||
      ((this.l = function () {
        a.c.l = a.f.document.hidden ? "backgrounded" : "foregrounded";
        hb(a);
      }),
      this.f.document.addEventListener("visibilitychange", this.l));
  };
  function ib(a) {
    if (a.F) {
      a.c.K = a.F;
      a = a.T;
      var b = a.a.K,
        c = a.a.w;
      if (b && !b.O(c)) {
        c = va(b);
        var d = a.b;
        "audio" != d.a.b && Pa(d, P(d, "geometryChange", "native", c));
        a.a.w = b;
      }
    }
  }
  function jb(a) {
    if (a.a && a.c.h) {
      var b = new B(a.c.h, !1),
        c = a.a.x;
      a = a.a.y;
      b.x += c;
      b.y += a;
      b.B += c;
      b.C += a;
      b.L = !0;
      return b;
    }
  }
  function kb(a, b, c) {
    return lb(a, "setInterval")(b, c);
  }
  function mb(a, b) {
    lb(a, "clearInterval")(b);
  }
  function nb(a, b) {
    lb(a, "clearTimeout")(b);
  }
  function lb(a, b) {
    return a.a && a.a[b] ? a.a[b] : ob(a, b);
  }
  function pb(a, b, c, d) {
    if (a.a.document && a.a.document.body) {
      var e = a.a.document.createElement("img");
      e.width = 1;
      e.height = 1;
      e.style.display = "none";
      e.src = b;
      c &&
        e.addEventListener("load", function () {
          return c();
        });
      d &&
        e.addEventListener("error", function () {
          return d();
        });
      a.a.document.body.appendChild(e);
    } else ob(a, "sendUrl")(b, c, d);
  }
  function ob(a, b) {
    if (a.a && a.a.omidNative && a.a.omidNative[b])
      return a.a.omidNative[b].bind(a.a.omidNative);
    throw Error('Native interface method "' + b + '" not found.');
  }
  function T(a, b, c, d, e) {
    Q.call(this, a, c, e);
    this.m = b;
    this.h = void 0;
    this.j = d;
  }
  r(T, Q);
  T.prototype.s = function () {
    void 0 !== this.h && (mb(this.j, this.h), (this.h = void 0));
    Q.prototype.s.call(this);
  };
  T.prototype.i = function () {
    var a = this;
    Q.prototype.i.call(this);
    null == this.b
      ? (this.h = void 0)
      : void 0 === this.h &&
        ((this.h = kb(
          this.j,
          function () {
            return qb(a);
          },
          200
        )),
        qb(this));
  };
  T.prototype.K = function () {
    if (this.g) {
      var a = jb(this);
      if (a) {
        this.a.M = !1;
        a.M = !0;
        for (var b = !1, c = 0; c < this.a.J.length; c++)
          if (this.a.J[c].M) {
            this.a.J[c] = a;
            b = !0;
            break;
          }
        b || this.a.J.push(a);
      } else this.a.M = !0;
      b = this.m;
      c = this.c.l;
      var d = this.c.u,
        e = this.H();
      a = new ua();
      var f = new B(this.g, !1);
      wa(a, f);
      Ca(b, f, a, d);
      if (e)
        if ("backgrounded" === c) K(a, "backgrounded");
        else if (void 0 !== a.a) {
          for (b = 0; b < a.h.length; b++) Ba(a, a.h[b]) && a.s.push(a.h[b]);
          for (b = 0; b < a.j.length; b++) {
            if ((c = Ba(a, a.j[b]))) {
              b: {
                c = a.j[b];
                for (d = 0; d < a.f.length; d++)
                  if (a.f[d].O(c)) {
                    c = !0;
                    break b;
                  }
                c = !1;
              }
              c = !c;
            }
            c && (K(a, "obstructed"), a.f.push(a.j[b]));
          }
          Aa(a);
        } else K(a, "notFound");
      else
        (a.g = ["unmeasurable"]),
          (a.i = void 0),
          (a.l = 0),
          (a.f = []),
          a.a &&
            ((b = a.a),
            (c = {}),
            (b = new B(
              ((c.x = 0),
              (c.y = 0),
              (c.width = b.width),
              (c.height = b.height),
              c),
              b.a
            )),
            (a.a = b)),
          (a.b = xa());
      this.F = a;
    }
  };
  T.prototype.H = function () {
    return rb(this);
  };
  function qb(a) {
    if (void 0 !== a.h) {
      if (rb(a)) {
        var b = a.f.top;
        b = new B(new Da(b.innerWidth, b.innerHeight), !1);
      } else b = new B(new Da(0, 0), !1);
      var c = a.b.getBoundingClientRect();
      if (null == c.x || isNaN(c.x)) c.x = c.left;
      if (null == c.y || isNaN(c.y)) c.y = c.top;
      c = new B(c, !1);
      (b.O(a.g) && c.O(a.a)) ||
        ((a.a = c), (a.a.L = !0), (a.g = b), a.g.J.push(a.a), hb(a));
    }
  }
  function rb(a) {
    try {
      var b = a.f.top;
      return 0 <= b.innerHeight && 0 <= b.innerWidth;
    } catch (c) {}
    return !1;
  }
  function U(a, b, c, d) {
    Q.call(this, a, c, d);
    this.w = this.j = this.m = this.h = void 0;
    this.P = !1;
    this.G = void 0;
  }
  r(U, Q);
  U.prototype.s = function () {
    this.h && this.h.disconnect();
    sb(this);
    Q.prototype.s.call(this);
  };
  U.prototype.i = function () {
    Q.prototype.i.call(this);
    this.b && (this.h || (this.h = tb(this)), ub(this), vb(this.b) && wb(this));
  };
  U.prototype.K = function () {
    if (this.a && this.G) {
      var a = jb(this);
      if (a) {
        var b = a;
        var c = this.G;
        var d = Math.max(a.x, c.x);
        var e = Math.max(a.y, c.y),
          f = Math.min(a.B, c.B);
        a = Math.min(a.C, c.C);
        f <= d || a <= e
          ? (d = null)
          : ((c = {}),
            (d = new B(
              ((c.x = d),
              (c.y = e),
              (c.width = Math.abs(f - d)),
              (c.height = Math.abs(a - e)),
              c),
              !1
            )));
        d || (d = new B({ x: 0, y: 0, width: 0, height: 0 }, !1));
      } else (b = this.a), (d = this.G);
      e = new ua();
      this.g && wa(e, this.g);
      (f = "backgrounded" == this.c.l) && K(e, "backgrounded");
      e.a = b;
      e.b = d;
      Aa(e);
      this.P
        ? !f && I(e.a)
          ? K(e, "hidden")
          : f || 100 === e.l || K(e, "clipped")
        : K(e, "viewport");
      this.F = e;
    }
  };
  U.prototype.H = function () {
    return !0;
  };
  function sb(a) {
    a.m && (a.m.disconnect(), (a.m = void 0));
    a.j && (a.j.disconnect(), (a.j = void 0));
    a.w && ((0, a.f.removeEventListener)("resize", a.w), (a.w = void 0));
  }
  function ub(a) {
    a.h && a.b && (a.h.unobserve(a.b), a.h.observe(a.b));
  }
  function vb(a) {
    a = a.getBoundingClientRect();
    return 0 == a.width || 0 == a.height;
  }
  function tb(a) {
    return new a.f.IntersectionObserver(
      function (b) {
        try {
          if (b.length) {
            for (var c, d = b[0], e = 1; e < b.length; e++)
              b[e].time > d.time && (d = b[e]);
            c = d;
            a.g = xb(c.rootBounds);
            a.a = xb(c.boundingClientRect);
            a.G = xb(c.intersectionRect);
            a.P = !!c.isIntersecting;
            hb(a);
          }
        } catch (f) {
          a.s(),
            Wa(
              a.N,
              "generic",
              "Problem handling IntersectionObserver callback: " + f.message
            );
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      }
    );
  }
  function wb(a) {
    a.f.ResizeObserver
      ? a.m ||
        ((a.m = yb(a, function () {
          return zb(a);
        })),
        a.m.observe(a.b))
      : (a.w ||
          ((a.w = function () {
            return zb(a);
          }),
          (0, a.f.addEventListener)("resize", a.w)),
        a.j ||
          ((a.j = new MutationObserver(function () {
            return zb(a);
          })),
          a.j.observe(a.b, { childList: !1, attributes: !0, subtree: !1 })));
  }
  function zb(a) {
    a.b && !vb(a.b) && (ub(a), sb(a));
  }
  function yb(a, b) {
    return new a.f.ResizeObserver(b);
  }
  function xb(a) {
    if (
      a &&
      null !== a.x &&
      null !== a.y &&
      null !== a.width &&
      null !== a.height
    )
      return new B(a, !1);
  }
  function V(a, b, c, d) {
    this.b = a;
    this.method = b;
    this.version = c;
    this.a = d;
  }
  function Bb(a) {
    return (
      !!a &&
      void 0 !== a.omid_message_guid &&
      void 0 !== a.omid_message_method &&
      void 0 !== a.omid_message_version &&
      "string" === typeof a.omid_message_guid &&
      "string" === typeof a.omid_message_method &&
      "string" === typeof a.omid_message_version &&
      (void 0 === a.omid_message_args || void 0 !== a.omid_message_args)
    );
  }
  function Cb(a) {
    return new V(
      a.omid_message_guid,
      a.omid_message_method,
      a.omid_message_version,
      a.omid_message_args
    );
  }
  function Db(a) {
    var b = {};
    b =
      ((b.omid_message_guid = a.b),
      (b.omid_message_method = a.method),
      (b.omid_message_version = a.version),
      b);
    void 0 !== a.a && (b.omid_message_args = a.a);
    return b;
  }
  function Eb(a) {
    this.c = a;
  }
  function W(a) {
    this.c = a;
    this.handleExportedMessage = W.prototype.f.bind(this);
  }
  r(W, Eb);
  W.prototype.b = function (a, b) {
    b = void 0 === b ? this.c : b;
    if (!b)
      throw Error(
        "Message destination must be defined at construction time or when sending the message."
      );
    b.handleExportedMessage(Db(a), this);
  };
  W.prototype.f = function (a, b) {
    Bb(a) && this.a && this.a(Cb(a), b);
  };
  function Fb(a) {
    this.b = a;
  }
  Fb.prototype.a = function (a, b) {
    for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
    return this.b("SessionService." + a, this.c.bind(this, a, c), c);
  };
  Fb.prototype.c = function (a, b, c) {
    switch (a) {
      case "registerSessionObserver":
        (a = p(b).next().value), a(c);
    }
  };
  function X(a, b) {
    return a.a.bind(a, b);
  }
  function Gb(a) {
    var b = void 0 === b ? N : b;
    null == b.omidSessionInterface &&
      ((a = {
        setClientInfo: X(a, "setClientInfo"),
        registerSessionObserver: X(a, "registerSessionObserver"),
        startAdSession: X(a, "startSession"),
        finishAdSession: X(a, "finishSession"),
        reportError: X(a, "sessionError"),
        registerAdEvents: X(a, "registerAdEvents"),
        registerMediaEvents: X(a, "registerMediaEvents"),
        injectVerificationScriptResources: X(
          a,
          "injectVerificationScriptResources"
        ),
        setSlotElement: X(a, "setSlotElement"),
        setVideoElement: X(a, "setVideoElement"),
        setElementBounds: X(a, "setElementBounds"),
        setCreativeType: X(a, "setCreativeType"),
        setImpressionType: X(a, "setImpressionType"),
        setContentUrl: X(a, "setContentUrl"),
        adEvents: {
          impressionOccurred: X(a, "impressionOccurred"),
          loaded: X(a, "loaded")
        },
        mediaEvents: {
          start: X(a, "start"),
          firstQuartile: X(a, "firstQuartile"),
          midpoint: X(a, "midpoint"),
          thirdQuartile: X(a, "thirdQuartile"),
          complete: X(a, "complete"),
          pause: X(a, "pause"),
          resume: X(a, "resume"),
          bufferStart: X(a, "bufferStart"),
          bufferFinish: X(a, "bufferFinish"),
          skipped: X(a, "skipped"),
          volumeChange: X(a, "volumeChange"),
          playerStateChange: X(a, "playerStateChange"),
          adUserInteraction: X(a, "adUserInteraction")
        }
      }),
      (a.mediaEvents.loaded = a.adEvents.loaded),
      (a.videoEvents = a.mediaEvents),
      Object.freeze(a),
      Object.defineProperty(b, "omidSessionInterface", {
        value: a,
        writable: !1
      }));
  }
  function Hb(a, b) {
    this.c = b = void 0 === b ? N : b;
    var c = this;
    a.addEventListener("message", function (d) {
      if ("object" === typeof d.data) {
        var e = d.data;
        Bb(e) && d.source && c.a && c.a(Cb(e), d.source);
      }
    });
  }
  r(Hb, Eb);
  Hb.prototype.b = function (a, b) {
    b = void 0 === b ? this.c : b;
    if (!b)
      throw Error(
        "Message destination must be defined at construction time or when sending the message."
      );
    b.postMessage(Db(a), "*");
  };
  function Ib() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      a
    ) {
      var b = (16 * Math.random()) | 0;
      return "y" === a ? ((b & 3) | 8).toString(16) : b.toString(16);
    });
  }
  function Jb(a) {
    if (!a.a || !a.a.document)
      throw Error("OMID Service Script is not running within a window.");
    var b = a.b;
    a.b = [];
    b.forEach(function (c) {
      try {
        var d = a.c.G ? "limited" : "full",
          e = c.accessMode,
          f =
            "string" === typeof e && -1 !== Object.values(pa).indexOf(e)
              ? c.accessMode
              : null;
        var l = f ? f : d;
        c.accessMode = l;
        a: {
          var g = c.resourceUrl,
            h = a.a.location.origin;
          try {
            var k = new URL(g, h);
            break a;
          } catch (R) {}
          try {
            k = new URL(g);
            break a;
          } catch (R) {}
          k = null;
        }
        if ((d = k)) {
          var m = Ib(),
            u = a.a.document,
            w = u.createElement("iframe");
          w.id = "omid-verification-script-frame-" + m;
          w.style.display = "none";
          ["full", "limited"].includes(l)
            ? (w.srcdoc =
                "<html><head>\n<script type=\"text/javascript\">window['omidVerificationProperties'] = {\n'serviceWindow': window.parent,\n'injectionSource': 'web',\n'injectionId': '" +
                (m +
                  '\',\n};\x3c/script>\n<script type="text/javascript" src="') +
                d.href +
                '">\x3c/script>\n</head><body></body></html>')
            : "domain" == l && (w.src = Kb(a, m, d).href);
          ["domain", "limited"].includes(l) && (w.sandbox = "allow-scripts");
          u.body.appendChild(w);
          var C = c.vendorKey,
            H = c.verificationParameters;
          C = void 0 === C ? "" : C;
          H = void 0 === H ? "" : H;
          C &&
            "string" === typeof C &&
            "" !== C &&
            H &&
            "string" === typeof H &&
            "" !== H &&
            (a.f.i[C] = H);
          a.c.F.set(m, c);
        }
      } catch (R) {
        Ka(
          "OMID verification script " + c.resourceUrl + " failed to load: " + R
        );
      }
    });
  }
  function Kb(a, b, c) {
    var d = "/.well-known/omid/omloader-v1.html#";
    new Map([
      ["verificationScriptUrl", c.href],
      ["injectionId", b]
    ]).forEach(function (e, f) {
      d += encodeURIComponent(f) + "=" + encodeURIComponent(e) + "&";
    });
    b = null;
    try {
      b = new URL(d, a.a.parent.location.origin);
    } catch (e) {
      throw Error("OMID Service Script cannot access the parent window.");
    }
    return b;
  }
  function Lb() {
    var a = Mb,
      b = Nb,
      c = this;
    this.c = Y;
    this.b = a;
    this.a = M();
    this.g = b;
    this.f = !1;
    this.registerSessionObserver(function (d) {
      return Ob(c, d);
    });
  }
  n = Lb.prototype;
  n.registerSessionObserver = function (a) {
    Ta(this.c, a);
  };
  n.setSlotElement = function (a) {
    a && a.tagName
      ? ((this.a.f = a), this.b && gb(this.b))
      : O("setSlotElement called with a non-HTMLElement.  It will be ignored.");
  };
  n.setElementBounds = function (a) {
    this.a.h = a;
    this.b && gb(this.b);
    this.b && hb(this.b);
  };
  n.error = function (a, b) {
    Wa(this.c, a, b);
  };
  n.registerAdEvents = function () {
    var a = this.c;
    bb(a, ["impression"]) && cb(a) && (a.a.i = "javascript");
  };
  n.registerMediaEvents = function () {
    var a = this.c;
    bb(a, Object.values(A)) && db(a) && (a.a.j = "javascript");
  };
  function Z(a, b, c) {
    if ("impression" == b)
      cb(a.c) &&
        ((b = a.c),
        (c = (c = M().w) ? va(c) : void 0),
        (c = Ya(b, Za(b, c))),
        Pa(b, P(b, "impression", "javascript", c)),
        a.b && fb(a.b));
    else {
      if ("loaded" == b) {
        var d = c;
        d = void 0 === d ? null : d;
        db(a.c) &&
          ((c = a.c), c.a.b || "display" != c.a.a) &&
          ((d = P(
            c,
            "loaded",
            "javascript",
            Ya(c, Za(c, void 0 === d ? null : d))
          )),
          Pa(c, d));
      } else if (db(a.c)) {
        d = a.c;
        ("start" !== b && "volumeChange" !== b) ||
          null != (c && c.deviceVolume) ||
          (c.deviceVolume = d.a.N);
        if (c && ("start" === b || "volumeChange" === b)) {
          var e = c.videoPlayerVolume,
            f = c.mediaPlayerVolume;
          null != e
            ? (Object.assign(c, { mediaPlayerVolume: e }), (d.a.H = e))
            : null != f &&
              (Object.assign(c, { videoPlayerVolume: f }), (d.a.H = f));
        }
        Pa(d, P(d, b, "javascript", c));
      }
      ["loaded", "start"].includes(b) && a.b && fb(a.b);
    }
  }
  n.injectVerificationScriptResources = function (a) {
    var b = this.g;
    b.b.push.apply(b.b, q(a));
    if (this.f)
      try {
        Jb(this.g);
      } catch (c) {
        O(c.message);
      }
  };
  n.setCreativeType = function (a, b) {
    b = void 0 === b ? null : b;
    if (!this.a.a || this.a.b)
      (this.a.b = a),
        "video" == a || "audio" == a
          ? (this.a.a = "video")
          : "htmlDisplay" == a || "nativeDisplay" == a
          ? (this.a.a = "display")
          : "definedByJavaScript" == a &&
            b &&
            (this.a.a = "none" == b ? "display" : "video");
  };
  n.setImpressionType = function (a) {
    if (!this.a.a || this.a.b) this.a.s = a;
  };
  function Ob(a, b) {
    if ("sessionStart" === b.type) {
      a.f = !0;
      try {
        Jb(a.g);
      } catch (c) {
        O(c.message);
      }
    }
    "sessionFinish" === b.type &&
      ((a.f = !1),
      ((b = M().c) && "native" == b.adSessionType) ||
        a.registerSessionObserver(function (c) {
          return Ob(a, c);
        }));
  }
  n.setClientInfo = function (a, b, c) {
    var d = this.a.c || {};
    d.omidJsInfo = Object.assign({}, d.omidJsInfo, {
      sessionClientVersion: a,
      partnerName: b,
      partnerVersion: c
    });
    this.a.c = d;
    return this.a.c.omidJsInfo.serviceVersion;
  };
  function Pb(a) {
    return /\d+\.\d+\.\d+(-.*)?/.test(a);
  }
  function Qb(a) {
    a = a.split("-")[0].split(".");
    for (var b = ["1", "0", "3"], c = 0; 3 > c; c++) {
      var d = parseInt(a[c], 10),
        e = parseInt(b[c], 10);
      if (d > e) break;
      else if (d < e) return !1;
    }
    return !0;
  }
  function Rb(a, b) {
    return Pb(a) && Qb(a)
      ? b
        ? b
        : []
      : b && "string" === typeof b
      ? JSON.parse(b)
      : [];
  }
  function Sb() {
    var a = Tb,
      b = this;
    var c = void 0 === c ? omidGlobal : c;
    this.a = a;
    this.f = c;
    this.b = new W();
    this.f.omid = this.f.omid || {};
    this.f.omid.v1_SessionServiceCommunication = this.b;
    this.c = c && c.addEventListener && c.postMessage ? new Hb(c) : null;
    this.g = null;
    this.b.a = this.h.bind(this);
    this.c && (this.c.a = this.i.bind(this));
    this.j = new Fb(function (d, e, f) {
      try {
        Ub(b, d, e, f);
      } catch (l) {
        O(Vb(l));
      }
    });
    Gb(this.j);
  }
  Sb.prototype.h = function (a, b) {
    Wb(this, a, b, this.b);
  };
  Sb.prototype.i = function (a, b) {
    this.g || (this.g = b);
    this.g != b
      ? O(
          "The source window of session client post messages cannot be changed from the source of the first message."
        )
      : Wb(this, a, b, this.c);
  };
  function Wb(a, b, c, d) {
    function e(h) {
      for (var k = [], m = 0; m < arguments.length; ++m) k[m] = arguments[m];
      k = new V(f, "response", g, Pb(g) && Qb(g) ? k : JSON.stringify(k));
      d.b(k, c);
    }
    var f = b.b,
      l = b.method,
      g = b.version;
    b = Rb(g, b.a);
    try {
      Ub(a, l, e, b);
    } catch (h) {
      d.b(new V(f, "error", g, Vb(h)), c);
    }
  }
  function Ub(a, b, c, d) {
    switch (b) {
      case "SessionService.registerAdEvents":
        a.a.registerAdEvents();
        break;
      case "SessionService.registerMediaEvents":
        a.a.registerMediaEvents();
        break;
      case "SessionService.registerSessionObserver":
        a.a.registerSessionObserver(c);
        break;
      case "SessionService.setSlotElement":
        var e = p(d).next().value;
        a.a.setSlotElement(e);
        break;
      case "SessionService.setVideoElement":
        e = p(d).next().value;
        a = a.a;
        e && e.tagName && "video" === e.tagName.toLowerCase()
          ? ((a.a.g = e), a.b && gb(a.b))
          : O(
              "setVideoElement called with a non-HTMLVideoElement. It will be ignored."
            );
        break;
      case "SessionService.setElementBounds":
        e = p(d).next().value;
        a.a.setElementBounds(e);
        break;
      case "SessionService.startSession":
        c = p(d).next().value;
        null != c && "object" === typeof c
          ? ((b = c.customReferenceData),
            (c = c.underEvaluation),
            "string" === typeof b || (b = void 0),
            "boolean" === typeof c || (c = !1),
            (c = { customReferenceData: b, underEvaluation: c }))
          : (c = null);
        if (null == c) break;
        a = a.a;
        b = c;
        var f;
        e = void 0 === e ? null : e;
        null == f && (f = Ib());
        b.canMeasureVisibility = a.b.H();
        a.a.u = f;
        c = a.a;
        b = f = b;
        void 0 !== b.contentUrl &&
          ((c.m = b.contentUrl), (b.contentUrl = void 0));
        b = c.c || {};
        f.omidJsInfo = Object.assign(
          {},
          b.omidJsInfo || {},
          f.omidJsInfo || {}
        );
        b = f = Object.assign({}, b, f);
        c.G ||
          (null != c.g
            ? ((b.videoElement = c.g), (b.accessMode = "full"))
            : null != c.f && ((b.slotElement = c.f), (b.accessMode = "full")));
        c.c = f;
        Xa(a.c, e);
        a.b && fb(a.b);
        break;
      case "SessionService.finishSession":
        a = a.a;
        ab(a.c);
        a.b.s();
        break;
      case "SessionService.impressionOccurred":
        Z(a.a, "impression");
        break;
      case "SessionService.loaded":
        (e = p(d).next().value)
          ? ((c = {
              skippable: e.isSkippable,
              autoPlay: e.isAutoPlay,
              position: e.position
            }),
            e.isSkippable && (c.skipOffset = e.skipOffset),
            Z(a.a, "loaded", c))
          : Z(a.a, "loaded");
        break;
      case "SessionService.start":
        c = p(d);
        e = c.next().value;
        c = c.next().value;
        Z(a.a, "start", { duration: e, mediaPlayerVolume: c });
        break;
      case "SessionService.firstQuartile":
        Z(a.a, "firstQuartile");
        break;
      case "SessionService.midpoint":
        Z(a.a, "midpoint");
        break;
      case "SessionService.thirdQuartile":
        Z(a.a, "thirdQuartile");
        break;
      case "SessionService.complete":
        Z(a.a, "complete");
        break;
      case "SessionService.pause":
        Z(a.a, "pause");
        break;
      case "SessionService.resume":
        Z(a.a, "resume");
        break;
      case "SessionService.bufferStart":
        Z(a.a, "bufferStart");
        break;
      case "SessionService.bufferFinish":
        Z(a.a, "bufferFinish");
        break;
      case "SessionService.skipped":
        Z(a.a, "skipped");
        break;
      case "SessionService.volumeChange":
        e = { mediaPlayerVolume: p(d).next().value };
        Z(a.a, "volumeChange", e);
        break;
      case "SessionService.playerStateChange":
        e = { state: p(d).next().value };
        Z(a.a, "playerStateChange", e);
        break;
      case "SessionService.adUserInteraction":
        e = { interactionType: p(d).next().value };
        Z(a.a, "adUserInteraction", e);
        break;
      case "SessionService.setClientInfo":
        b = p(d);
        e = b.next().value;
        f = b.next().value;
        b = b.next().value;
        a = a.a.setClientInfo(e, f, b);
        c(a);
        break;
      case "SessionService.injectVerificationScriptResources":
        e = p(d).next().value;
        a.a.injectVerificationScriptResources(e);
        break;
      case "SessionService.setCreativeType":
        e = p(d).next().value;
        a.a.setCreativeType(e);
        break;
      case "SessionService.setImpressionType":
        e = p(d).next().value;
        a.a.setImpressionType(e);
        break;
      case "SessionService.setContentUrl":
        e = p(d).next().value;
        a.a.a.m = e;
        break;
      case "SessionService.sessionError":
        (c = p(d)), (e = c.next().value), (c = c.next().value), a.a.error(e, c);
    }
  }
  function Vb(a) {
    return (
      "\n        name: " +
      a.name +
      "\n        message: " +
      a.message +
      "\n        filename: " +
      a.filename +
      "\n        lineNumber: " +
      a.lineNumber +
      "\n        columnNumber: " +
      a.columnNumber +
      "\n        stack: " +
      a.stack +
      "\n        toString(): " +
      a.toString()
    );
  }
  function Xb() {
    var a = Y,
      b = Yb;
    var c = void 0 === c ? N : c;
    this.g = a;
    this.a = b;
    this.h = {};
    this.f = {};
    this.c = new W();
    c.omid = c.omid || {};
    c.omid.v1_VerificationServiceCommunication = this.c;
    this.b = null;
    c && c.addEventListener && c.postMessage && (this.b = new Hb(c));
    this.c.a = this.i.bind(this);
    this.b && (this.b.a = this.j.bind(this));
  }
  function Zb(a, b, c, d) {
    pb(a.a, b, c, d);
  }
  function $b(a, b, c, d) {
    ob(a.a, "downloadJavaScriptResource")(b, c, d);
  }
  Xb.prototype.j = function (a, b) {
    this.b && ac(this, a, b, this.b);
  };
  Xb.prototype.i = function (a, b) {
    ac(this, a, b, this.c);
  };
  function ac(a, b, c, d) {
    function e(D) {
      for (var S = [], ka = 0; ka < arguments.length; ++ka)
        S[ka] = arguments[ka];
      S = new V(f, "response", g, Pb(g) && Qb(g) ? S : JSON.stringify(S));
      d.b(S, c);
    }
    var f = b.b,
      l = b.method,
      g = b.version;
    b = Rb(g, b.a);
    try {
      switch (l) {
        case "VerificationService.addEventListener":
          var h = p(b).next().value;
          Ra(a.g, h, e);
          break;
        case "VerificationService.addSessionListener":
          var k = p(b),
            m = k.next().value,
            u = k.next().value;
          Ta(a.g, e, m, u);
          break;
        case "VerificationService.sendUrl":
          var w = p(b).next().value;
          Zb(
            a,
            w,
            function () {
              return e(!0);
            },
            function () {
              return e(!1);
            }
          );
          break;
        case "VerificationService.setTimeout":
          var C = p(b),
            H = C.next().value,
            R = C.next().value;
          a.h[H] = lb(a.a, "setTimeout")(e, R);
          break;
        case "VerificationService.clearTimeout":
          var fc = p(b).next().value;
          nb(a.a, a.h[fc]);
          break;
        case "VerificationService.setInterval":
          var Ab = p(b),
            gc = Ab.next().value,
            hc = Ab.next().value;
          a.f[gc] = kb(a.a, e, hc);
          break;
        case "VerificationService.clearInterval":
          var ic = p(b).next().value;
          mb(a.a, a.f[ic]);
          break;
        case "VerificationService.injectJavaScriptResource":
          var jc = p(b).next().value;
          $b(
            a,
            jc,
            function (D) {
              return e(!0, D);
            },
            function () {
              return e(!1);
            }
          );
          break;
        case "VerificationService.getVersion":
          p(b).next();
          var kc = M().c.omidJsInfo;
          e(kc.serviceVersion);
      }
    } catch (D) {
      d.b(
        new V(
          f,
          "error",
          g,
          "\n              name: " +
            D.name +
            "\n              message: " +
            D.message +
            "\n              filename: " +
            D.filename +
            "\n              lineNumber: " +
            D.lineNumber +
            "\n              columnNumber: " +
            D.columnNumber +
            "\n              stack: " +
            D.stack +
            "\n              toString(): " +
            D.toString() +
            "\n          "
        ),
        c
      );
    }
  }
  function bc() {
    var a = N.document.createElement("iframe");
    a.id = "omid_v1_present";
    a.name = "omid_v1_present";
    a.style.display = "none";
    N.document.body.appendChild(a);
  }
  function cc() {
    var a = new MutationObserver(function (b) {
      b.forEach(function (c) {
        "BODY" === c.addedNodes[0].nodeName && (bc(), a.disconnect());
      });
    });
    a.observe(N.document.documentElement, { childList: !0 });
  }
  var Y = new La(),
    Yb = new (function () {
      var a;
      this.a = a = void 0 === a ? omidGlobal : a;
    })();
  new Xb();
  var dc = new (function () {})(),
    ec = new (function () {})(),
    lc = new (function () {
      this.b = Y;
      this.a = M();
    })(),
    mc;
  N
    ? (mc =
        N.IntersectionObserver && (N.MutationObserver || N.ResizeObserver)
          ? new U(N, dc, lc, Y)
          : new T(N, ec, lc, Yb, Y))
    : (mc = null);
  var Mb = mc,
    Nb = new (function () {
      var a = Y;
      var b = void 0 === b ? N : b;
      this.f = a;
      this.a = b;
      this.c = M();
      this.b = [];
    })(),
    Tb = new Lb();
  M();
  new Sb();
  if (N.frames && N.document && !("omid_v1_present" in N.frames)) {
    var nc;
    if ((nc = null == N.document.body)) nc = "MutationObserver" in N;
    nc
      ? cc()
      : N.document.body
      ? bc()
      : N.document.write(
          '<iframe style="display:none" id="omid_v1_present" name="omid_v1_present"></iframe>'
        );
  }
}.call(this, this));
