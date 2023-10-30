var Et = Object.defineProperty,
  St = Object.defineProperties;
var Ct = Object.getOwnPropertyDescriptors;
var st = Object.getOwnPropertySymbols;
var kt = Object.prototype.hasOwnProperty,
  Ot = Object.prototype.propertyIsEnumerable;
var rt = (r, t, e) =>
    t in r
      ? Et(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
      : (r[t] = e),
  k = (r, t) => {
    for (var e in t || (t = {})) kt.call(t, e) && rt(r, e, t[e]);
    if (st) for (var e of st(t)) Ot.call(t, e) && rt(r, e, t[e]);
    return r;
  },
  O = (r, t) => St(r, Ct(t));
const F =
    window.ShadowRoot &&
    (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) &&
    "adoptedStyleSheets" in Document.prototype &&
    "replace" in CSSStyleSheet.prototype,
  W = Symbol(),
  nt = new Map();
class ot {
  constructor(t, e) {
    if (((this._$cssResult$ = !0), e !== W))
      throw Error(
        "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
      );
    this.cssText = t;
  }
  get styleSheet() {
    let t = nt.get(this.cssText);
    return (
      F &&
        t === void 0 &&
        (nt.set(this.cssText, (t = new CSSStyleSheet())),
        t.replaceSync(this.cssText)),
      t
    );
  }
  toString() {
    return this.cssText;
  }
}
const Pt = (r) => new ot(typeof r == "string" ? r : r + "", W),
  w = (r, ...t) => {
    const e =
      r.length === 1
        ? r[0]
        : t.reduce(
            (i, s, n) =>
              i +
              ((o) => {
                if (o._$cssResult$ === !0) return o.cssText;
                if (typeof o == "number") return o;
                throw Error("use css function " + o + ". Use unsafeCSS");
              })(s) +
              r[n + 1],
            r[0]
          );
    return new ot(e, W);
  },
  Ut = (r, t) => {
    F
      ? (r.adoptedStyleSheets = t.map((e) =>
          e instanceof CSSStyleSheet ? e : e.styleSheet
        ))
      : t.forEach((e) => {
          const i = document.createElement("style"),
            s = window.litNonce;
          s !== void 0 && i.setAttribute("nonce", s),
            (i.textContent = e.cssText),
            r.appendChild(i);
        });
  },
  lt = F
    ? (r) => r
    : (r) =>
        r instanceof CSSStyleSheet
          ? ((t) => {
              let e = "";
              for (const i of t.cssRules) e += i.cssText;
              return Pt(e);
            })(r)
          : r;
var J;
const at = window.reactiveElementPolyfillSupport,
  K = {
    toAttribute(r, t) {
      switch (t) {
        case Boolean:
          r = r ? "" : null;
          break;
        case Object:
        case Array:
          r = r == null ? r : JSON.stringify(r);
      }
      return r;
    },
    fromAttribute(r, t) {
      let e = r;
      switch (t) {
        case Boolean:
          e = r !== null;
          break;
        case Number:
          e = r === null ? null : Number(r);
          break;
        case Object:
        case Array:
          try {
            e = JSON.parse(r);
          } catch {
            e = null;
          }
      }
      return e;
    },
  },
  ht = (r, t) => t !== r && (t == t || r == r),
  Q = {
    attribute: !0,
    type: String,
    converter: K,
    reflect: !1,
    hasChanged: ht,
  };
class x extends HTMLElement {
  constructor() {
    super(),
      (this._$Et = new Map()),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$Ei = null),
      this.o();
  }
  static addInitializer(t) {
    var e;
    ((e = this.l) !== null && e !== void 0) || (this.l = []), this.l.push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return (
      this.elementProperties.forEach((e, i) => {
        const s = this._$Eh(i, e);
        s !== void 0 && (this._$Eu.set(s, i), t.push(s));
      }),
      t
    );
  }
  static createProperty(t, e = Q) {
    if (
      (e.state && (e.attribute = !1),
      this.finalize(),
      this.elementProperties.set(t, e),
      !e.noAccessor && !this.prototype.hasOwnProperty(t))
    ) {
      const i = typeof t == "symbol" ? Symbol() : "__" + t,
        s = this.getPropertyDescriptor(t, i, e);
      s !== void 0 && Object.defineProperty(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    return {
      get() {
        return this[e];
      },
      set(s) {
        const n = this[t];
        (this[e] = s), this.requestUpdate(t, n, i);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || Q;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized")) return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (
      (t.finalize(),
      (this.elementProperties = new Map(t.elementProperties)),
      (this._$Eu = new Map()),
      this.hasOwnProperty("properties"))
    ) {
      const e = this.properties,
        i = [
          ...Object.getOwnPropertyNames(e),
          ...Object.getOwnPropertySymbols(e),
        ];
      for (const s of i) this.createProperty(s, e[s]);
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const s of i) e.unshift(lt(s));
    } else t !== void 0 && e.push(lt(t));
    return e;
  }
  static _$Eh(t, e) {
    const i = e.attribute;
    return i === !1
      ? void 0
      : typeof i == "string"
      ? i
      : typeof t == "string"
      ? t.toLowerCase()
      : void 0;
  }
  o() {
    var t;
    (this._$Ev = new Promise((e) => (this.enableUpdating = e))),
      (this._$AL = new Map()),
      this._$Ep(),
      this.requestUpdate(),
      (t = this.constructor.l) === null ||
        t === void 0 ||
        t.forEach((e) => e(this));
  }
  addController(t) {
    var e, i;
    ((e = this._$Em) !== null && e !== void 0 ? e : (this._$Em = [])).push(t),
      this.renderRoot !== void 0 &&
        this.isConnected &&
        ((i = t.hostConnected) === null || i === void 0 || i.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$Em) === null ||
      e === void 0 ||
      e.splice(this._$Em.indexOf(t) >>> 0, 1);
  }
  _$Ep() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Et.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var t;
    const e =
      (t = this.shadowRoot) !== null && t !== void 0
        ? t
        : this.attachShadow(this.constructor.shadowRootOptions);
    return Ut(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      (t = this._$Em) === null ||
        t === void 0 ||
        t.forEach((e) => {
          var i;
          return (i = e.hostConnected) === null || i === void 0
            ? void 0
            : i.call(e);
        });
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t;
    (t = this._$Em) === null ||
      t === void 0 ||
      t.forEach((e) => {
        var i;
        return (i = e.hostDisconnected) === null || i === void 0
          ? void 0
          : i.call(e);
      });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$Eg(t, e, i = Q) {
    var s, n;
    const o = this.constructor._$Eh(t, i);
    if (o !== void 0 && i.reflect === !0) {
      const h = (
        (n =
          (s = i.converter) === null || s === void 0
            ? void 0
            : s.toAttribute) !== null && n !== void 0
          ? n
          : K.toAttribute
      )(e, i.type);
      (this._$Ei = t),
        h == null ? this.removeAttribute(o) : this.setAttribute(o, h),
        (this._$Ei = null);
    }
  }
  _$AK(t, e) {
    var i, s, n;
    const o = this.constructor,
      h = o._$Eu.get(t);
    if (h !== void 0 && this._$Ei !== h) {
      const l = o.getPropertyOptions(h),
        a = l.converter,
        g =
          (n =
            (s =
              (i = a) === null || i === void 0 ? void 0 : i.fromAttribute) !==
              null && s !== void 0
              ? s
              : typeof a == "function"
              ? a
              : null) !== null && n !== void 0
            ? n
            : K.fromAttribute;
      (this._$Ei = h), (this[h] = g(e, l.type)), (this._$Ei = null);
    }
  }
  requestUpdate(t, e, i) {
    let s = !0;
    t !== void 0 &&
      (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || ht)(
        this[t],
        e
      )
        ? (this._$AL.has(t) || this._$AL.set(t, e),
          i.reflect === !0 &&
            this._$Ei !== t &&
            (this._$ES === void 0 && (this._$ES = new Map()),
            this._$ES.set(t, i)))
        : (s = !1)),
      !this.isUpdatePending && s && (this._$Ev = this._$EC());
  }
  async _$EC() {
    this.isUpdatePending = !0;
    try {
      await this._$Ev;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated,
      this._$Et &&
        (this._$Et.forEach((s, n) => (this[n] = s)), (this._$Et = void 0));
    let e = !1;
    const i = this._$AL;
    try {
      (e = this.shouldUpdate(i)),
        e
          ? (this.willUpdate(i),
            (t = this._$Em) === null ||
              t === void 0 ||
              t.forEach((s) => {
                var n;
                return (n = s.hostUpdate) === null || n === void 0
                  ? void 0
                  : n.call(s);
              }),
            this.update(i))
          : this._$EU();
    } catch (s) {
      throw ((e = !1), this._$EU(), s);
    }
    e && this._$AE(i);
  }
  willUpdate(t) {}
  _$AE(t) {
    var e;
    (e = this._$Em) === null ||
      e === void 0 ||
      e.forEach((i) => {
        var s;
        return (s = i.hostUpdated) === null || s === void 0
          ? void 0
          : s.call(i);
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t);
  }
  _$EU() {
    (this._$AL = new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Ev;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$ES !== void 0 &&
      (this._$ES.forEach((e, i) => this._$Eg(i, this[i], e)),
      (this._$ES = void 0)),
      this._$EU();
  }
  updated(t) {}
  firstUpdated(t) {}
}
(x.finalized = !0),
  (x.elementProperties = new Map()),
  (x.elementStyles = []),
  (x.shadowRootOptions = { mode: "open" }),
  at == null || at({ ReactiveElement: x }),
  ((J = globalThis.reactiveElementVersions) !== null && J !== void 0
    ? J
    : (globalThis.reactiveElementVersions = [])
  ).push("1.0.1");
var Z;
const j = globalThis.trustedTypes,
  ct = j ? j.createPolicy("lit-html", { createHTML: (r) => r }) : void 0,
  _ = `lit$${(Math.random() + "").slice(9)}$`,
  dt = "?" + _,
  Tt = `<${dt}>`,
  A = document,
  P = (r = "") => A.createComment(r),
  U = (r) => r === null || (typeof r != "object" && typeof r != "function"),
  ut = Array.isArray,
  Ht = (r) => {
    var t;
    return (
      ut(r) ||
      typeof ((t = r) === null || t === void 0 ? void 0 : t[Symbol.iterator]) ==
        "function"
    );
  },
  T = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  pt = /-->/g,
  gt = />/g,
  b =
    />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
  vt = /'/g,
  ft = /"/g,
  $t = /^(?:script|style|textarea)$/i,
  mt =
    (r) =>
    (t, ...e) => ({ _$litType$: r, strings: t, values: e }),
  d = mt(1),
  Mt = mt(2),
  E = Symbol.for("lit-noChange"),
  p = Symbol.for("lit-nothing"),
  _t = new WeakMap(),
  Rt = (r, t, e) => {
    var i, s;
    const n =
      (i = e == null ? void 0 : e.renderBefore) !== null && i !== void 0
        ? i
        : t;
    let o = n._$litPart$;
    if (o === void 0) {
      const h =
        (s = e == null ? void 0 : e.renderBefore) !== null && s !== void 0
          ? s
          : null;
      n._$litPart$ = o = new M(
        t.insertBefore(P(), h),
        h,
        void 0,
        e != null ? e : {}
      );
    }
    return o._$AI(r), o;
  },
  S = A.createTreeWalker(A, 129, null, !1),
  Nt = (r, t) => {
    const e = r.length - 1,
      i = [];
    let s,
      n = t === 2 ? "<svg>" : "",
      o = T;
    for (let l = 0; l < e; l++) {
      const a = r[l];
      let g,
        c,
        u = -1,
        v = 0;
      for (; v < a.length && ((o.lastIndex = v), (c = o.exec(a)), c !== null); )
        (v = o.lastIndex),
          o === T
            ? c[1] === "!--"
              ? (o = pt)
              : c[1] !== void 0
              ? (o = gt)
              : c[2] !== void 0
              ? ($t.test(c[2]) && (s = RegExp("</" + c[2], "g")), (o = b))
              : c[3] !== void 0 && (o = b)
            : o === b
            ? c[0] === ">"
              ? ((o = s != null ? s : T), (u = -1))
              : c[1] === void 0
              ? (u = -2)
              : ((u = o.lastIndex - c[2].length),
                (g = c[1]),
                (o = c[3] === void 0 ? b : c[3] === '"' ? ft : vt))
            : o === ft || o === vt
            ? (o = b)
            : o === pt || o === gt
            ? (o = T)
            : ((o = b), (s = void 0));
      const D = o === b && r[l + 1].startsWith("/>") ? " " : "";
      n +=
        o === T
          ? a + Tt
          : u >= 0
          ? (i.push(g), a.slice(0, u) + "$lit$" + a.slice(u) + _ + D)
          : a + _ + (u === -2 ? (i.push(void 0), l) : D);
    }
    const h = n + (r[e] || "<?>") + (t === 2 ? "</svg>" : "");
    return [ct !== void 0 ? ct.createHTML(h) : h, i];
  };
class H {
  constructor({ strings: t, _$litType$: e }, i) {
    let s;
    this.parts = [];
    let n = 0,
      o = 0;
    const h = t.length - 1,
      l = this.parts,
      [a, g] = Nt(t, e);
    if (
      ((this.el = H.createElement(a, i)),
      (S.currentNode = this.el.content),
      e === 2)
    ) {
      const c = this.el.content,
        u = c.firstChild;
      u.remove(), c.append(...u.childNodes);
    }
    for (; (s = S.nextNode()) !== null && l.length < h; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const c = [];
          for (const u of s.getAttributeNames())
            if (u.endsWith("$lit$") || u.startsWith(_)) {
              const v = g[o++];
              if ((c.push(u), v !== void 0)) {
                const D = s.getAttribute(v.toLowerCase() + "$lit$").split(_),
                  L = /([.?@])?(.*)/.exec(v);
                l.push({
                  type: 1,
                  index: n,
                  name: L[2],
                  strings: D,
                  ctor:
                    L[1] === "."
                      ? Dt
                      : L[1] === "?"
                      ? Lt
                      : L[1] === "@"
                      ? jt
                      : z,
                });
              } else l.push({ type: 6, index: n });
            }
          for (const u of c) s.removeAttribute(u);
        }
        if ($t.test(s.tagName)) {
          const c = s.textContent.split(_),
            u = c.length - 1;
          if (u > 0) {
            s.textContent = j ? j.emptyScript : "";
            for (let v = 0; v < u; v++)
              s.append(c[v], P()),
                S.nextNode(),
                l.push({ type: 2, index: ++n });
            s.append(c[u], P());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === dt) l.push({ type: 2, index: n });
        else {
          let c = -1;
          for (; (c = s.data.indexOf(_, c + 1)) !== -1; )
            l.push({ type: 7, index: n }), (c += _.length - 1);
        }
      n++;
    }
  }
  static createElement(t, e) {
    const i = A.createElement("template");
    return (i.innerHTML = t), i;
  }
}
function C(r, t, e = r, i) {
  var s, n, o, h;
  if (t === E) return t;
  let l =
    i !== void 0
      ? (s = e._$Cl) === null || s === void 0
        ? void 0
        : s[i]
      : e._$Cu;
  const a = U(t) ? void 0 : t._$litDirective$;
  return (
    (l == null ? void 0 : l.constructor) !== a &&
      ((n = l == null ? void 0 : l._$AO) === null ||
        n === void 0 ||
        n.call(l, !1),
      a === void 0 ? (l = void 0) : ((l = new a(r)), l._$AT(r, e, i)),
      i !== void 0
        ? (((o = (h = e)._$Cl) !== null && o !== void 0 ? o : (h._$Cl = []))[
            i
          ] = l)
        : (e._$Cu = l)),
    l !== void 0 && (t = C(r, l._$AS(r, t.values), l, i)),
    t
  );
}
class Bt {
  constructor(t, e) {
    (this.v = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = e);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t) {
    var e;
    const {
        el: { content: i },
        parts: s,
      } = this._$AD,
      n = (
        (e = t == null ? void 0 : t.creationScope) !== null && e !== void 0
          ? e
          : A
      ).importNode(i, !0);
    S.currentNode = n;
    let o = S.nextNode(),
      h = 0,
      l = 0,
      a = s[0];
    for (; a !== void 0; ) {
      if (h === a.index) {
        let g;
        a.type === 2
          ? (g = new M(o, o.nextSibling, this, t))
          : a.type === 1
          ? (g = new a.ctor(o, a.name, a.strings, this, t))
          : a.type === 6 && (g = new zt(o, this, t)),
          this.v.push(g),
          (a = s[++l]);
      }
      h !== (a == null ? void 0 : a.index) && ((o = S.nextNode()), h++);
    }
    return n;
  }
  m(t) {
    let e = 0;
    for (const i of this.v)
      i !== void 0 &&
        (i.strings !== void 0
          ? (i._$AI(t, i, e), (e += i.strings.length - 2))
          : i._$AI(t[e])),
        e++;
  }
}
class M {
  constructor(t, e, i, s) {
    var n;
    (this.type = 2),
      (this._$AH = p),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = e),
      (this._$AM = i),
      (this.options = s),
      (this._$Cg =
        (n = s == null ? void 0 : s.isConnected) === null || n === void 0 || n);
  }
  get _$AU() {
    var t, e;
    return (e = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !==
      null && e !== void 0
      ? e
      : this._$Cg;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    (t = C(this, t, e)),
      U(t)
        ? t === p || t == null || t === ""
          ? (this._$AH !== p && this._$AR(), (this._$AH = p))
          : t !== this._$AH && t !== E && this.$(t)
        : t._$litType$ !== void 0
        ? this.T(t)
        : t.nodeType !== void 0
        ? this.S(t)
        : Ht(t)
        ? this.M(t)
        : this.$(t);
  }
  A(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  S(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.A(t)));
  }
  $(t) {
    this._$AH !== p && U(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.S(A.createTextNode(t)),
      (this._$AH = t);
  }
  T(t) {
    var e;
    const { values: i, _$litType$: s } = t,
      n =
        typeof s == "number"
          ? this._$AC(t)
          : (s.el === void 0 && (s.el = H.createElement(s.h, this.options)), s);
    if (((e = this._$AH) === null || e === void 0 ? void 0 : e._$AD) === n)
      this._$AH.m(i);
    else {
      const o = new Bt(n, this),
        h = o.p(this.options);
      o.m(i), this.S(h), (this._$AH = o);
    }
  }
  _$AC(t) {
    let e = _t.get(t.strings);
    return e === void 0 && _t.set(t.strings, (e = new H(t))), e;
  }
  M(t) {
    ut(this._$AH) || ((this._$AH = []), this._$AR());
    const e = this._$AH;
    let i,
      s = 0;
    for (const n of t)
      s === e.length
        ? e.push((i = new M(this.A(P()), this.A(P()), this, this.options)))
        : (i = e[s]),
        i._$AI(n),
        s++;
    s < e.length && (this._$AR(i && i._$AB.nextSibling, s), (e.length = s));
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for (
      (i = this._$AP) === null || i === void 0 || i.call(this, !1, !0, e);
      t && t !== this._$AB;

    ) {
      const s = t.nextSibling;
      t.remove(), (t = s);
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 &&
      ((this._$Cg = t),
      (e = this._$AP) === null || e === void 0 || e.call(this, t));
  }
}
class z {
  constructor(t, e, i, s, n) {
    (this.type = 1),
      (this._$AH = p),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = e),
      (this._$AM = s),
      (this.options = n),
      i.length > 2 || i[0] !== "" || i[1] !== ""
        ? ((this._$AH = Array(i.length - 1).fill(new String())),
          (this.strings = i))
        : (this._$AH = p);
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, i, s) {
    const n = this.strings;
    let o = !1;
    if (n === void 0)
      (t = C(this, t, e, 0)),
        (o = !U(t) || (t !== this._$AH && t !== E)),
        o && (this._$AH = t);
    else {
      const h = t;
      let l, a;
      for (t = n[0], l = 0; l < n.length - 1; l++)
        (a = C(this, h[i + l], e, l)),
          a === E && (a = this._$AH[l]),
          o || (o = !U(a) || a !== this._$AH[l]),
          a === p ? (t = p) : t !== p && (t += (a != null ? a : "") + n[l + 1]),
          (this._$AH[l] = a);
    }
    o && !s && this.k(t);
  }
  k(t) {
    t === p
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class Dt extends z {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  k(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class Lt extends z {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  k(t) {
    t && t !== p
      ? this.element.setAttribute(this.name, "")
      : this.element.removeAttribute(this.name);
  }
}
class jt extends z {
  constructor(t, e, i, s, n) {
    super(t, e, i, s, n), (this.type = 5);
  }
  _$AI(t, e = this) {
    var i;
    if ((t = (i = C(this, t, e, 0)) !== null && i !== void 0 ? i : p) === E)
      return;
    const s = this._$AH,
      n =
        (t === p && s !== p) ||
        t.capture !== s.capture ||
        t.once !== s.once ||
        t.passive !== s.passive,
      o = t !== p && (s === p || n);
    n && this.element.removeEventListener(this.name, this, s),
      o && this.element.addEventListener(this.name, this, t),
      (this._$AH = t);
  }
  handleEvent(t) {
    var e, i;
    typeof this._$AH == "function"
      ? this._$AH.call(
          (i =
            (e = this.options) === null || e === void 0 ? void 0 : e.host) !==
            null && i !== void 0
            ? i
            : this.element,
          t
        )
      : this._$AH.handleEvent(t);
  }
}
class zt {
  constructor(t, e, i) {
    (this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = e),
      (this.options = i);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
}
const yt = window.litHtmlPolyfillSupport;
yt == null || yt(H, M),
  ((Z = globalThis.litHtmlVersions) !== null && Z !== void 0
    ? Z
    : (globalThis.litHtmlVersions = [])
  ).push("2.0.1");
var Y, G;
class f extends x {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this._$Dt = void 0);
  }
  createRenderRoot() {
    var t, e;
    const i = super.createRenderRoot();
    return (
      ((t = (e = this.renderOptions).renderBefore) !== null && t !== void 0) ||
        (e.renderBefore = i.firstChild),
      i
    );
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this._$Dt = Rt(e, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    var t;
    super.connectedCallback(),
      (t = this._$Dt) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(),
      (t = this._$Dt) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return E;
  }
}
(f.finalized = !0),
  (f._$litElement$ = !0),
  (Y = globalThis.litElementHydrateSupport) === null ||
    Y === void 0 ||
    Y.call(globalThis, { LitElement: f });
const bt = globalThis.litElementPolyfillSupport;
bt == null || bt({ LitElement: f });
((G = globalThis.litElementVersions) !== null && G !== void 0
  ? G
  : (globalThis.litElementVersions = [])
).push("3.0.1");
const R = (r) => (t) =>
    typeof t == "function"
      ? ((e, i) => (window.customElements.define(e, i), i))(r, t)
      : ((e, i) => {
          const { kind: s, elements: n } = i;
          return {
            kind: s,
            elements: n,
            finisher(o) {
              window.customElements.define(e, o);
            },
          };
        })(r, t),
  It = (r, t) =>
    t.kind === "method" && t.descriptor && !("value" in t.descriptor)
      ? O(k({}, t), {
          finisher(e) {
            e.createProperty(t.key, r);
          },
        })
      : {
          kind: "field",
          key: Symbol(),
          placement: "own",
          descriptor: {},
          originalKey: t.key,
          initializer() {
            typeof t.initializer == "function" &&
              (this[t.key] = t.initializer.call(this));
          },
          finisher(e) {
            e.createProperty(t.key, r);
          },
        };
function $(r) {
  return (t, e) =>
    e !== void 0
      ? ((i, s, n) => {
          s.constructor.createProperty(n, i);
        })(r, t, e)
      : It(r, t);
}
function N(r) {
  return $(O(k({}, r), { state: !0 }));
}
const qt =
  ({ finisher: r, descriptor: t }) =>
  (e, i) => {
    var s;
    if (i === void 0) {
      const n = (s = e.originalKey) !== null && s !== void 0 ? s : e.key,
        o =
          t != null
            ? {
                kind: "method",
                placement: "prototype",
                key: n,
                descriptor: t(e.key),
              }
            : O(k({}, e), { key: n });
      return (
        r != null &&
          (o.finisher = function (h) {
            r(h, n);
          }),
        o
      );
    }
    {
      const n = e.constructor;
      t !== void 0 && Object.defineProperty(e, i, t(i)), r == null || r(n, i);
    }
  };
function Vt(r, t) {
  return qt({
    descriptor: (e) => {
      const i = {
        get() {
          var s, n;
          return (n =
            (s = this.renderRoot) === null || s === void 0
              ? void 0
              : s.querySelector(r)) !== null && n !== void 0
            ? n
            : null;
        },
        enumerable: !0,
        configurable: !0,
      };
      if (t) {
        const s = typeof e == "symbol" ? Symbol() : "__" + e;
        i.get = function () {
          var n, o;
          return (
            this[s] === void 0 &&
              (this[s] =
                (o =
                  (n = this.renderRoot) === null || n === void 0
                    ? void 0
                    : n.querySelector(r)) !== null && o !== void 0
                  ? o
                  : null),
            this[s]
          );
        };
      }
      return i;
    },
  });
}
var X = w`:host{font-family:ui-monospace,system-ui,Helvetica,"Arial Narrow",Roboto,Oxygen,Ubuntu,sans-serif;color-scheme:light dark;--primary-color:#03a9f4;transition:all 350ms!important}`,
  wt = w`.btn,button{cursor:pointer;border-radius:4px;background-color:inherit;background-image:linear-gradient(0deg,rgba(127,127,127,.5) 0,rgba(127,127,127,.5) 100%);color:inherit;border:1px solid rgba(127,127,127,.5);padding:2px}.btn:active,button:active{background-image:linear-gradient(0deg,rgba(127,127,127,.8) 0,rgba(127,127,127,.2) 100%);transition-duration:1s}.btn:hover,button:hover{background-image:linear-gradient(0deg,rgba(127,127,127,.2) 0,rgba(127,127,127,.8) 100%);transition-duration:1s}.rnd{border-radius:1rem;height:2rem;width:2rem;font-weight:500;font-size:1.2rem}`,
  Ft = Object.defineProperty,
  Wt = Object.getOwnPropertyDescriptor,
  tt = (r, t, e, i) => {
    for (
      var s = i > 1 ? void 0 : i ? Wt(t, e) : t, n = r.length - 1, o;
      n >= 0;
      n--
    )
      (o = r[n]) && (s = (i ? o(t, e, s) : o(s)) || s);
    return i && s && Ft(t, e, s), s;
  };
function et() {
  let r = window.location.pathname;
  return r.endsWith("/") ? r.slice(0, -1) : r;
}
let Jt = et(),
  I = class extends f {
    constructor() {
      super(...arguments);
      (this.entities = []),
        (this.has_controls = !1),
        (this._actionRenderer = new Kt());
    }
    connectedCallback() {
      var r;
      super.connectedCallback(),
        (r = window.source) == null ||
          r.addEventListener("state", (t) => {
            const e = t,
              i = JSON.parse(e.data);
            let s = this.entities.findIndex((n) => n.unique_id === i.id);
            if (s === -1 && i.id) {
              let n = i.id.split("-"),
                o = O(k({}, i), {
                  domain: n[0],
                  unique_id: i.id,
                  id: n.slice(1).join("-"),
                });
              (o.has_action = this.hasAction(o)),
                o.has_action && (this.has_controls = !0),
                this.entities.push(o),
                this.entities.sort((h, l) => (h.name < l.name ? -1 : 1)),
                this.requestUpdate();
            } else
              delete i.id,
                delete i.domain,
                delete i.unique_id,
                Object.assign(this.entities[s], i),
                this.requestUpdate();
          });
    }
    hasAction(r) {
      return `render_${r.domain}` in this._actionRenderer;
    }
    control(r) {
      return (
        (this._actionRenderer.entity = r),
        (this._actionRenderer.actioner = this),
        this._actionRenderer.exec(`render_${r.domain}`)
      );
    }
    restAction(r, t) {
      fetch(`${Jt}/${r.domain}/${r.id}/${t}`, {
        method: "POST",
        body: "true",
      }).then((e) => {
        console.log(e);
      });
    }
    render() {
      return d`<table><thead><tr><th>Name</th><th>State</th>${
        this.has_controls ? d`<th>Actions</th>` : d``
      }</tr></thead><tbody>${this.entities.map(
        (r) =>
          d`<tr><td>${r.name}</td><td>${r.state}</td>${
            this.has_controls
              ? d`<td>${r.has_action ? this.control(r) : d``}</td>`
              : d``
          }</tr>`
      )}</tbody></table>`;
    }
    static get styles() {
      return [
        X,
        wt,
        w`table{border-spacing:0;border-collapse:collapse;width:100%;border:1px solid currentColor;background-color:var(--c-bg)}th{font-weight:600;text-align:left}td,th{padding:.25rem .5rem;border:1px solid currentColor}td:nth-child(2),th:nth-child(2){text-align:center}tr th,tr:nth-child(2n){background-color:rgba(127,127,127,.3)}select{background-color:inherit;color:inherit;width:100%;border-radius:4px}option{color:currentColor;background-color:var(--primary-color,currentColor)}input[type=range],input[type=text]{width:calc(100% - 8rem);height:.75rem}.range,.text{text-align:center}`,
      ];
    }
  };
tt([N()], I.prototype, "entities", 2);
tt([N()], I.prototype, "has_controls", 2);
I = tt([R("esp-entity-table")], I);
class Kt {
  exec(t) {
    if (!this[t] || typeof this[t] != "function") {
      console.log(`ActionRenderer.${t} is not callable`);
      return;
    }
    return this[t]();
  }
  _actionButton(t, e, i) {
    if (!t) return;
    let s = i || e.toLowerCase();
    return d`<button class="rnd" @click="${() => {
      var n;
      return (n = this.actioner) == null ? void 0 : n.restAction(t, s);
    }}">${e}</button>`;
  }
  _switch(t) {
    return d`<esp-switch color="var(--primary-color,currentColor)" .state="${
      t.state
    }" @state="${(e) => {
      var s;
      let i = "turn_" + e.detail.state;
      (s = this.actioner) == null || s.restAction(t, i.toLowerCase());
    }}"></esp-switch>`;
  }
  _select(t, e, i, s, n) {
    return d`<select @change="${(o) => {
      var l, a;
      let h = (l = o.target) == null ? void 0 : l.value;
      (a = this.actioner) == null ||
        a.restAction(t, `${e}?${i}=${encodeURIComponent(h)}`);
    }}">${s.map(
      (o) => d`<option value="${o}" ?selected="${o == n}">${o}</option>`
    )}</select>`;
  }
  _range(t, e, i, s, n, o, h) {
    return d`<div class="range"><label>${n || 0}</label> <input type="${
      t.mode == 1 ? "number" : "range"
    }" name="${t.unique_id}" id="${t.unique_id}" step="${h || 1}" min="${
      n || Math.min(0, s)
    }" max="${o || Math.max(10, s)}" value="${s}" @change="${(l) => {
      var g, c;
      let a = (g = l.target) == null ? void 0 : g.value;
      (c = this.actioner) == null || c.restAction(t, `${e}?${i}=${a}`);
    }}"> <label>${o || 100}</label></div>`;
  }
  _textinput(t, e, i, s, n, o, h) {
    return d`<div class="text"><input type="${
      t.mode == 1 ? "password" : "text"
    }" name="${t.unique_id}" id="${t.unique_id}" minlength="${
      n || Math.min(0, s)
    }" maxlength="${o || Math.max(255, s)}" pattern="${
      h || ""
    }" value="${s}" @change="${(l) => {
      var g, c;
      let a = (g = l.target) == null ? void 0 : g.value;
      (c = this.actioner) == null || c.restAction(t, `${e}?${i}=${a}`);
    }}"></div>`;
  }
  render_switch() {
    if (!!this.entity)
      return this.entity.assumed_state
        ? d`${this._actionButton(
            this.entity,
            "\u274C",
            "turn_off"
          )} ${this._actionButton(this.entity, "\u2714\uFE0F", "turn_on")}`
        : this._switch(this.entity);
  }
  render_fan() {
    if (!!this.entity)
      return [
        this.entity.speed,
        " ",
        this.entity.speed_level,
        this._switch(this.entity),
        this.entity.speed_count
          ? this._range(
              this.entity,
              `turn_${this.entity.state.toLowerCase()}`,
              "speed_level",
              this.entity.speed_level ? this.entity.speed_level : 0,
              0,
              this.entity.speed_count,
              1
            )
          : "",
      ];
  }
  render_light() {
    var t;
    if (!!this.entity)
      return [
        this._switch(this.entity),
        this.entity.brightness
          ? this._range(
              this.entity,
              "turn_on",
              "brightness",
              this.entity.brightness,
              0,
              255,
              1
            )
          : "",
        (
          (t = this.entity.effects) == null
            ? void 0
            : t.filter((e) => e != "None").length
        )
          ? this._select(
              this.entity,
              "turn_on",
              "effect",
              this.entity.effects || [],
              this.entity.effect
            )
          : "",
      ];
  }
  render_lock() {
    if (!!this.entity)
      return d`${this._actionButton(
        this.entity,
        "\u{1F510}",
        "lock"
      )} ${this._actionButton(
        this.entity,
        "\u{1F513}",
        "unlock"
      )} ${this._actionButton(this.entity, "\u2191", "open")}`;
  }
  render_cover() {
    if (!!this.entity)
      return d`${this._actionButton(
        this.entity,
        "\u2191",
        "open"
      )} ${this._actionButton(
        this.entity,
        "\u2610",
        "stop"
      )} ${this._actionButton(this.entity, "\u2193", "close")}`;
  }
  render_button() {
    if (!!this.entity)
      return d`${this._actionButton(this.entity, "\u2610", "press ")}`;
  }
  render_select() {
    if (!!this.entity)
      return this._select(
        this.entity,
        "set",
        "option",
        this.entity.option || [],
        this.entity.value
      );
  }
  render_number() {
    if (!!this.entity)
      return this._range(
        this.entity,
        "set",
        "value",
        this.entity.value,
        this.entity.min_value,
        this.entity.max_value,
        this.entity.step
      );
  }
  render_text() {
    if (!!this.entity)
      return this._textinput(
        this.entity,
        "set",
        "value",
        this.entity.value,
        this.entity.min_length,
        this.entity.max_length,
        this.entity.pattern
      );
  }
  render_climate() {
    if (!this.entity) return;
    let t, e;
    this.entity.target_temperature_low !== void 0 &&
    this.entity.target_temperature_high !== void 0
      ? ((e = d`${this.entity.target_temperature_low} .. ${this.entity.target_temperature_high}`),
        (t = d`${this._range(
          this.entity,
          "set",
          "target_temperature_low",
          this.entity.target_temperature_low,
          this.entity.min_temp,
          this.entity.max_temp,
          this.entity.step
        )} ${this._range(
          this.entity,
          "set",
          "target_temperature_high",
          this.entity.target_temperature_high,
          this.entity.min_temp,
          this.entity.max_temp,
          this.entity.step
        )}`))
      : ((e = d`${this.entity.target_temperature}`),
        (t = d`${this._range(
          this.entity,
          "set",
          "target_temperature",
          this.entity.target_temperature,
          this.entity.min_temp,
          this.entity.max_temp,
          this.entity.step
        )}`));
    let i = d``;
    return (
      (this.entity.modes ? this.entity.modes.length : 0) > 0 &&
        (i = d`Mode:<br>${this._select(
          this.entity,
          "set",
          "mode",
          this.entity.modes || [],
          this.entity.mode || ""
        )}`),
      d`<label>Current: ${this.entity.current_temperature}, Target: ${e}</label> ${t} ${i}`
    );
  }
}
var Qt = Object.defineProperty,
  Zt = Object.getOwnPropertyDescriptor,
  it = (r, t, e, i) => {
    for (
      var s = i > 1 ? void 0 : i ? Zt(t, e) : t, n = r.length - 1, o;
      n >= 0;
      n--
    )
      (o = r[n]) && (s = (i ? o(t, e, s) : o(s)) || s);
    return i && s && Qt(t, e, s), s;
  };
let q = class extends f {
  constructor() {
    super();
    (this.rows = 10), (this.logs = []);
  }
  connectedCallback() {
    var r;
    super.connectedCallback(),
      (r = window.source) == null ||
        r.addEventListener("log", (t) => {
          const i = t.data;
          let n = i
              .slice(10, i.length - 4)
              .split(":")
              .slice(0, 2)
              .join(":"),
            o = i.slice(12 + n.length, i.length - 4);
          const l = {
            type: { "[1;31m": "e", "[0;33m": "w", "[0;32m": "i", "[0;35m": "c", "[0;36m": "d", "[0;37m": "v" }[
              i.slice(0, 7)
            ],
            level: i.slice(7, 10),
            tag: n,
            detail: o,
            when: new Date().toTimeString().split(" ")[0],
          };
          this.logs.push(l), (this.logs = this.logs.slice(-this.rows));
        });
  }
  render() {
    return d`<div class="flow-x"><table><thead><tr><th>Time</th><th>level</th><th>Tag</th><th>Message</th></tr></thead><tbody>${this.logs.map(
      (r) =>
        d`<tr class="${r.type}"><td>${r.when}</td><td>${r.level}</td><td>${r.tag}</td><td><pre>${r.detail}</pre></td></tr>`
    )}</tbody></table></div>`;
  }
  static get styles() {
    return w`table{font-family:monospace;background-color:#1c1c1c;color:#fff;width:100%;border:1px solid #dfe2e5;line-height:1}thead{border:1px solid #dfe2e5;line-height:1rem}th{text-align:left}td,th{padding:.25rem .5rem}pre{margin:0}.v{color:#888}.d{color:#0dd}.c{color:#ff00ff}.i{color:#32cd32}.w{color:#ff0}.e{color:red;font-weight:700}.flow-x{overflow-x:auto}`;
  }
};
it([$({ type: Number })], q.prototype, "rows", 2);
it([N()], q.prototype, "logs", 2);
q = it([R("esp-log")], q);
var Yt = Object.defineProperty,
  Gt = Object.getOwnPropertyDescriptor,
  y = (r, t, e, i) => {
    for (
      var s = i > 1 ? void 0 : i ? Gt(t, e) : t, n = r.length - 1, o;
      n >= 0;
      n--
    )
      (o = r[n]) && (s = (i ? o(t, e, s) : o(s)) || s);
    return i && s && Yt(t, e, s), s;
  };
const xt = "checkbox-lever";
let m = class extends f {
  constructor() {
    super(...arguments);
    (this.checkbox = null),
      (this.labelOn = "On"),
      (this.labelOff = "Off"),
      (this.stateOn = "ON"),
      (this.stateOff = "OFF"),
      (this.state = "OFF"),
      (this.color = "currentColor"),
      (this.disabled = !1);
  }
  firstUpdated(r) {
    var t;
    this.checkbox =
      (t = this.shadowRoot) == null ? void 0 : t.getElementById(xt);
  }
  isOn() {
    return this.state === this.stateOn;
  }
  toggle(r) {
    const t = this.isOn() ? this.stateOff : this.stateOn;
    let e = new CustomEvent("state", { detail: { state: t, id: this.id } });
    this.dispatchEvent(e);
  }
  render() {
    return d`<div class="sw"><label>${
      this.labelOff
    } <input id="${xt}" type="checkbox" .checked="${this.isOn()}" .disabled="${
      this.disabled
    }" @click="${this.toggle}"> <span style="color:${
      this.color
    }" class="lever"></span> ${this.labelOn}</label></div>`;
  }
  static get styles() {
    return [
      X,
      w`.sw,.sw *{-webkit-tap-highlight-color:transparent;user-select:none;cursor:pointer}input[type=checkbox]{opacity:0;width:0;height:0}input[type=checkbox]:checked+.lever{background-color:currentColor;background-image:linear-gradient(0deg,rgba(255,255,255,.5) 0,rgba(255,255,255,.5) 100%)}input[type=checkbox]:checked+.lever:after,input[type=checkbox]:checked+.lever:before{left:18px}input[type=checkbox]:checked+.lever:after{background-color:currentColor}.lever{content:"";display:inline-block;position:relative;width:36px;height:14px;background-image:linear-gradient(0deg,rgba(127,127,127,.5) 0,rgba(127,127,127,.5) 100%);background-color:inherit;border-radius:15px;margin-right:10px;transition:background .3s ease;vertical-align:middle;margin:0 16px}.lever:after,.lever:before{content:"";position:absolute;display:inline-block;width:20px;height:20px;border-radius:50%;left:0;top:-3px;transition:left .3s ease,background .3s ease,box-shadow .1s ease,transform .1s ease}.lever:before{background-color:currentColor;background-image:linear-gradient(0deg,rgba(255,255,255,.9) 0,rgba(255,255,255,.9) 100%)}.lever:after{background-color:#f1f1f1;box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)}input[type=checkbox]:checked:not(:disabled).tabbed:focus~.lever::before,input[type=checkbox]:checked:not(:disabled)~.lever:active::before{transform:scale(2.4);background-color:currentColor;background-image:linear-gradient(0deg,rgba(255,255,255,.9) 0,rgba(255,255,255,.9) 100%)}input[type=checkbox]:not(:disabled).tabbed:focus~.lever::before,input[type=checkbox]:not(:disabled)~.lever:active:before{transform:scale(2.4);background-color:rgba(0,0,0,.08)}input[type=checkbox][disabled]+.lever{cursor:default;background-color:rgba(0,0,0,.12)}input[type=checkbox][disabled]+.lever:after,input[type=checkbox][disabled]:checked+.lever:after{background-color:#949494}`,
    ];
  }
};
y([$({ type: String })], m.prototype, "labelOn", 2);
y([$({ type: String })], m.prototype, "labelOff", 2);
y([$({ type: String })], m.prototype, "stateOn", 2);
y([$({ type: String })], m.prototype, "stateOff", 2);
y([$({ type: String })], m.prototype, "state", 2);
y([$({ type: String })], m.prototype, "color", 2);
y([$({ type: Boolean })], m.prototype, "disabled", 2);
m = y([R("esp-switch")], m);
var Xt =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="7 8 73 56" width="73" height="56"><g style="fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><g id="b"><path d="M27 16v-4c0-1 1-2.7 2-2.7 2 0 3 1.7 3 2.7v4" id="a"/><use x="9" href="#a"/><use x="18" href="#a"/><use x="27" href="#a"/><use x="36" href="#a"/><use x="45" href="#a"/></g><use transform="matrix(1 0 0 -1 0 72)" href="#b"/><path d="M78 16H26c-1 0-1 1-1 1v38c0 1 0 1 1 1h52c1 0 1 0 1-1V17s0-1-1-1z" class="box"/><path d="M40 38h2.9v7.8h17V38h2.9l-2.9-2.9V30h-1.8v3.3l-6.8-6.8z" class="home" fill="currentColor"/><path d="M24 54H8v-4h12v-4H8v-4h12v-4H8v-4h12v-4H8V18" class="aerial"/></g></svg>',
  te = Object.defineProperty,
  ee = Object.getOwnPropertyDescriptor,
  ie = (r, t, e, i) => {
    for (
      var s = i > 1 ? void 0 : i ? ee(t, e) : t, n = r.length - 1, o;
      n >= 0;
      n--
    )
      (o = r[n]) && (s = (i ? o(t, e, s) : o(s)) || s);
    return i && s && te(t, e, s), s;
  };
let At = class extends f {
  render() {
    return Mt([Xt]);
  }
};
At = ie([R("esp-logo")], At);
var se = Object.defineProperty,
  re = Object.getOwnPropertyDescriptor,
  V = (r, t, e, i) => {
    for (
      var s = i > 1 ? void 0 : i ? re(t, e) : t, n = r.length - 1, o;
      n >= 0;
      n--
    )
      (o = r[n]) && (s = (i ? o(t, e, s) : o(s)) || s);
    return i && s && se(t, e, s), s;
  };
window.source = new EventSource(et() + "/events");
let B = class extends f {
  constructor() {
    super();
    (this.scheme = ""),
      (this.ping = ""),
      (this.version = "2.0.5"),
      (this.config = { ota: !1, log: !0, title: "", comment: "" }),
      (this.darkQuery = window.matchMedia("(prefers-color-scheme: dark)")),
      (this.frames = [
        { color: "inherit" },
        { color: "red", transform: "scale(1.25) translateY(-30%)" },
        { color: "inherit" },
      ]);
    const r = document.querySelector("script#config");
    r && this.setConfig(JSON.parse(r.innerText));
  }
  setConfig(r) {
    "log" in r || (r.log = this.config.log),
      (this.config = r),
      (document.title = r.title),
      (document.documentElement.lang = r.lang);
  }
  firstUpdated(r) {
    super.firstUpdated(r),
      (document.getElementsByTagName("head")[0].innerHTML +=
        '<meta name=viewport content="width=device-width, initial-scale=1,user-scalable=no">');
    const t = document.querySelector("link[rel~='icon']");
    (t.href =
      'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"><path d="M1 12.5h2.9v7.8h17v-7.8h2.9l-2.9-2.9V4.5h-1.8v3.3L12.3 1 1 12.5Z"/></svg>'),
      this.darkQuery.addEventListener("change", () => {
        this.scheme = this.isDark();
      }),
      (this.scheme = this.isDark()),
      window.source.addEventListener("ping", (e) => {
        const i = e;
        i.data.length && this.setConfig(JSON.parse(i.data)),
          (this.ping = i.lastEventId);
      }),
      (window.source.onerror = function (e) {
        console.dir(e);
      });
  }
  isDark() {
    return this.darkQuery.matches ? "dark" : "light";
  }
  updated(r) {
    super.updated(r),
      r.has("scheme") &&
        document.documentElement.style.setProperty("color-scheme", this.scheme),
      r.has("ping") && this.beat.animate(this.frames, 1e3);
  }
  ota() {
    if (this.config.ota) {
      let r = et();
      return d`<h2>OTA Update</h2><form method="POST" action="${r}/update" enctype="multipart/form-data"><input class="btn" type="file" name="update"> <input class="btn" type="submit" value="Update"></form>`;
    }
  }
  renderComment() {
    return this.config.comment ? d`<h3>${this.config.comment}</h3>` : p;
  }
  renderLog() {
    return this.config.log
      ? d`<section class="col"><esp-log rows="50"></esp-log></section>`
      : p;
  }
  render() {
    return d`<h1><a href="https://esphome.io/web-api" class="logo"><esp-logo></esp-logo></a>${
      this.config.title
    } <span id="beat" title="${
      this.version
    }">❤</span></h1>${this.renderComment()}<main class="flex-grid-half"><section class="col"><esp-entity-table></esp-entity-table><h2><esp-switch color="var(--primary-color,currentColor)" class="right" .state="${
      this.scheme
    }" @state="${(r) =>
      (this.scheme =
        r.detail.state)}" labelOn="🌒" labelOff="☀️" stateOn="dark" stateOff="light" optimistic></esp-switch>Scheme</h2>${this.ota()}</section>${this.renderLog()}</main>`;
  }
  static get styles() {
    return [
      X,
      wt,
      w`.flex-grid{display:flex}.flex-grid .col{flex:2}.flex-grid-half{display:flex;justify-content:space-evenly}.col{width:48%}@media (max-width:600px){.flex-grid,.flex-grid-half{display:block}.col{width:100%;margin:0 0 10px 0}}*{box-sizing:border-box}.flex-grid{margin:0 0 20px 0}h1{text-align:center;width:100%;line-height:4rem}h1,h2{border-bottom:1px solid #eaecef;margin-bottom:.25rem}h3{text-align:center;margin:.5rem 0}#beat{float:right;height:1rem}a.logo{height:4rem;float:left;color:inherit}.right{float:right}`,
    ];
  }
};
V([N()], B.prototype, "scheme", 2);
V([N()], B.prototype, "ping", 2);
V([Vt("#beat")], B.prototype, "beat", 2);
B = V([R("esp-app")], B);
