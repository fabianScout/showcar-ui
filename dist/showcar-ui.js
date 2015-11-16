/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var polyfills = __webpack_require__(1);
	polyfills();
	
	var collapse = __webpack_require__(4);
	collapse();
	
	__webpack_require__(5);
	
	window.Storage = __webpack_require__(6);
	
	var local = new window.Storage('local');
	console.log(local);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function (callback) {
	    'use strict';
	
	    var polyfills = [];
	
	    var sjs = __webpack_require__(2);
	
	    function getPolyfillPath() {
	        var src = document.querySelector('script[src*="showcar-ui.min.js"]').src;
	        src = src.split('?')[0];
	        return src.substr(0, src.lastIndexOf('/')) + '/polyfills/';
	    }
	
	    var needsPlaceholderPolyfill = !('placeholder' in document.createElement('input'));
	
	    var isDom4Browser = document.head && 'matches' in document.head && 'classList' in document.head && 'CustomEvent' in window;
	
	    var isEs5Browser = 'map' in Array.prototype && 'isArray' in Array && 'bind' in Function.prototype && 'keys' in Object && 'trim' in String.prototype;
	
	    if (!isDom4Browser) {
	        polyfills.push(getPolyfillPath() + 'dom4.js');
	    }
	
	    if (!isEs5Browser) {
	        polyfills.push(getPolyfillPath() + 'es5-shim.min.js');
	    }
	
	    if (needsPlaceholderPolyfill) {
	        polyfills.push(getPolyfillPath() + 'placeholders.min.js');
	    }
	
	    if (polyfills.length) {
	        sjs(polyfills, start);
	    } else {
	        start();
	    }
	
	    function start() {
	        __webpack_require__(3);
	        if (callback && typeof callback === 'function') {
	            callback();
	        }
	    }
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	/*!
	  * $script.js JS loader & dependency manager
	  * https://github.com/ded/script.js
	  * (c) Dustin Diaz 2014 | License MIT
	  */
	
	(function (name, definition) {
	  if (typeof module != 'undefined' && module.exports) module.exports = definition();else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else this[name] = definition();
	})('$script', function () {
	  var doc = document,
	      head = doc.getElementsByTagName('head')[0],
	      s = 'string',
	      f = false,
	      push = 'push',
	      readyState = 'readyState',
	      onreadystatechange = 'onreadystatechange',
	      list = {},
	      ids = {},
	      delay = {},
	      scripts = {},
	      scriptpath,
	      urlArgs;
	
	  function every(ar, fn) {
	    for (var i = 0, j = ar.length; i < j; ++i) if (!fn(ar[i])) return f;
	    return 1;
	  }
	  function each(ar, fn) {
	    every(ar, function (el) {
	      return !fn(el);
	    });
	  }
	
	  function $script(paths, idOrDone, optDone) {
	    paths = paths[push] ? paths : [paths];
	    var idOrDoneIsDone = idOrDone && idOrDone.call,
	        done = idOrDoneIsDone ? idOrDone : optDone,
	        id = idOrDoneIsDone ? paths.join('') : idOrDone,
	        queue = paths.length;
	    function loopFn(item) {
	      return item.call ? item() : list[item];
	    }
	    function callback() {
	      if (! --queue) {
	        list[id] = 1;
	        done && done();
	        for (var dset in delay) {
	          every(dset.split('|'), loopFn) && !each(delay[dset], loopFn) && (delay[dset] = []);
	        }
	      }
	    }
	    setTimeout(function () {
	      each(paths, function loading(path, force) {
	        if (path === null) return callback();
	
	        if (!force && !/^https?:\/\//.test(path) && scriptpath) {
	          path = path.indexOf('.js') === -1 ? scriptpath + path + '.js' : scriptpath + path;
	        }
	
	        if (scripts[path]) {
	          if (id) ids[id] = 1;
	          return scripts[path] == 2 ? callback() : setTimeout(function () {
	            loading(path, true);
	          }, 0);
	        }
	
	        scripts[path] = 1;
	        if (id) ids[id] = 1;
	        create(path, callback);
	      });
	    }, 0);
	    return $script;
	  }
	
	  function create(path, fn) {
	    var el = doc.createElement('script'),
	        loaded;
	    el.onload = el.onerror = el[onreadystatechange] = function () {
	      if (el[readyState] && !/^c|loade/.test(el[readyState]) || loaded) return;
	      el.onload = el[onreadystatechange] = null;
	      loaded = 1;
	      scripts[path] = 2;
	      fn();
	    };
	    el.async = 1;
	    el.src = urlArgs ? path + (path.indexOf('?') === -1 ? '?' : '&') + urlArgs : path;
	    head.insertBefore(el, head.lastChild);
	  }
	
	  $script.get = create;
	
	  $script.order = function (scripts, id, done) {
	    (function callback(s) {
	      s = scripts.shift();
	      !scripts.length ? $script(s, id, done) : $script(s, callback);
	    })();
	  };
	
	  $script.path = function (p) {
	    scriptpath = p;
	  };
	  $script.urlArgs = function (str) {
	    urlArgs = str;
	  };
	  $script.ready = function (deps, ready, req) {
	    deps = deps[push] ? deps : [deps];
	    var missing = [];
	    !each(deps, function (dep) {
	      list[dep] || missing[push](dep);
	    }) && every(deps, function (dep) {
	      return list[dep];
	    }) ? ready() : !(function (key) {
	      delay[key] = delay[key] || [];
	      delay[key][push](ready);
	      req && req(missing);
	    })(deps.join('|'));
	    return $script;
	  };
	
	  $script.done = function (idOrDone) {
	    $script([null], idOrDone);
	  };
	
	  return $script;
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	/*! (C) WebReflection Mit Style License */
	(function (e, t, n, r) {
	  "use strict";
	  function rt(e, t) {
	    for (var n = 0, r = e.length; n < r; n++) dt(e[n], t);
	  }function it(e) {
	    for (var t = 0, n = e.length, r; t < n; t++) r = e[t], nt(r, b[ot(r)]);
	  }function st(e) {
	    return function (t) {
	      j(t) && (dt(t, e), rt(t.querySelectorAll(w), e));
	    };
	  }function ot(e) {
	    var t = e.getAttribute("is"),
	        n = e.nodeName.toUpperCase(),
	        r = S.call(y, t ? v + t.toUpperCase() : d + n);return t && -1 < r && !ut(n, t) ? -1 : r;
	  }function ut(e, t) {
	    return -1 < w.indexOf(e + '[is="' + t + '"]');
	  }function at(e) {
	    var t = e.currentTarget,
	        n = e.attrChange,
	        r = e.attrName,
	        i = e.target;Q && (!i || i === t) && t.attributeChangedCallback && r !== "style" && t.attributeChangedCallback(r, n === e[a] ? null : e.prevValue, n === e[l] ? null : e.newValue);
	  }function ft(e) {
	    var t = st(e);return function (e) {
	      X.push(t, e.target);
	    };
	  }function lt(e) {
	    K && (K = !1, e.currentTarget.removeEventListener(h, lt)), rt((e.target || t).querySelectorAll(w), e.detail === o ? o : s), B && pt();
	  }function ct(e, t) {
	    var n = this;q.call(n, e, t), G.call(n, { target: n });
	  }function ht(e, t) {
	    D(e, t), et ? et.observe(e, z) : (J && (e.setAttribute = ct, e[i] = Z(e), e.addEventListener(p, G)), e.addEventListener(c, at)), e.createdCallback && Q && (e.created = !0, e.createdCallback(), e.created = !1);
	  }function pt() {
	    for (var e, t = 0, n = F.length; t < n; t++) e = F[t], E.contains(e) || (F.splice(t, 1), dt(e, o));
	  }function dt(e, t) {
	    var n,
	        r = ot(e);-1 < r && (tt(e, b[r]), r = 0, t === s && !e[s] ? (e[o] = !1, e[s] = !0, r = 1, B && S.call(F, e) < 0 && F.push(e)) : t === o && !e[o] && (e[s] = !1, e[o] = !0, r = 1), r && (n = e[t + "Callback"]) && n.call(e));
	  }if (r in t) return;var i = "__" + r + (Math.random() * 1e5 >> 0),
	      s = "attached",
	      o = "detached",
	      u = "extends",
	      a = "ADDITION",
	      f = "MODIFICATION",
	      l = "REMOVAL",
	      c = "DOMAttrModified",
	      h = "DOMContentLoaded",
	      p = "DOMSubtreeModified",
	      d = "<",
	      v = "=",
	      m = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,
	      g = ["ANNOTATION-XML", "COLOR-PROFILE", "FONT-FACE", "FONT-FACE-SRC", "FONT-FACE-URI", "FONT-FACE-FORMAT", "FONT-FACE-NAME", "MISSING-GLYPH"],
	      y = [],
	      b = [],
	      w = "",
	      E = t.documentElement,
	      S = y.indexOf || function (e) {
	    for (var t = this.length; t-- && this[t] !== e;);return t;
	  },
	      x = n.prototype,
	      T = x.hasOwnProperty,
	      N = x.isPrototypeOf,
	      C = n.defineProperty,
	      k = n.getOwnPropertyDescriptor,
	      L = n.getOwnPropertyNames,
	      A = n.getPrototypeOf,
	      O = n.setPrototypeOf,
	      M = !!n.__proto__,
	      _ = n.create || function vt(e) {
	    return e ? (vt.prototype = e, new vt()) : this;
	  },
	      D = O || (M ? function (e, t) {
	    return e.__proto__ = t, e;
	  } : L && k ? (function () {
	    function e(e, t) {
	      for (var n, r = L(t), i = 0, s = r.length; i < s; i++) n = r[i], T.call(e, n) || C(e, n, k(t, n));
	    }return function (t, n) {
	      do e(t, n); while ((n = A(n)) && !N.call(n, t));return t;
	    };
	  })() : function (e, t) {
	    for (var n in t) e[n] = t[n];return e;
	  }),
	      P = e.MutationObserver || e.WebKitMutationObserver,
	      H = (e.HTMLElement || e.Element || e.Node).prototype,
	      B = !N.call(H, E),
	      j = B ? function (e) {
	    return e.nodeType === 1;
	  } : function (e) {
	    return N.call(H, e);
	  },
	      F = B && [],
	      I = H.cloneNode,
	      q = H.setAttribute,
	      R = H.removeAttribute,
	      U = t.createElement,
	      z = P && { attributes: !0, characterData: !0, attributeOldValue: !0 },
	      W = P || function (e) {
	    J = !1, E.removeEventListener(c, W);
	  },
	      X,
	      V = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.msRequestAnimationFrame || function (e) {
	    setTimeout(e, 10);
	  },
	      $ = !1,
	      J = !0,
	      K = !0,
	      Q = !0,
	      G,
	      Y,
	      Z,
	      et,
	      tt,
	      nt;O || M ? (tt = function (e, t) {
	    N.call(t, e) || ht(e, t);
	  }, nt = ht) : (tt = function (e, t) {
	    e[i] || (e[i] = n(!0), ht(e, t));
	  }, nt = tt), B ? (J = !1, (function () {
	    var e = k(H, "addEventListener"),
	        t = e.value,
	        n = function n(e) {
	      var t = new CustomEvent(c, { bubbles: !0 });t.attrName = e, t.prevValue = this.getAttribute(e), t.newValue = null, t[l] = t.attrChange = 2, R.call(this, e), this.dispatchEvent(t);
	    },
	        r = function r(e, t) {
	      var n = this.hasAttribute(e),
	          r = n && this.getAttribute(e),
	          i = new CustomEvent(c, { bubbles: !0 });q.call(this, e, t), i.attrName = e, i.prevValue = n ? r : null, i.newValue = t, n ? i[f] = i.attrChange = 1 : i[a] = i.attrChange = 0, this.dispatchEvent(i);
	    },
	        s = function s(e) {
	      var t = e.currentTarget,
	          n = t[i],
	          r = e.propertyName,
	          s;n.hasOwnProperty(r) && (n = n[r], s = new CustomEvent(c, { bubbles: !0 }), s.attrName = n.name, s.prevValue = n.value || null, s.newValue = n.value = t[r] || null, s.prevValue == null ? s[a] = s.attrChange = 0 : s[f] = s.attrChange = 1, t.dispatchEvent(s));
	    };e.value = function (e, o, u) {
	      e === c && this.attributeChangedCallback && this.setAttribute !== r && (this[i] = { className: { name: "class", value: this.className } }, this.setAttribute = r, this.removeAttribute = n, t.call(this, "propertychange", s)), t.call(this, e, o, u);
	    }, C(H, "addEventListener", e);
	  })()) : P || (E.addEventListener(c, W), E.setAttribute(i, 1), E.removeAttribute(i), J && (G = function (e) {
	    var t = this,
	        n,
	        r,
	        s;if (t === e.target) {
	      n = t[i], t[i] = r = Z(t);for (s in r) {
	        if (!(s in n)) return Y(0, t, s, n[s], r[s], a);if (r[s] !== n[s]) return Y(1, t, s, n[s], r[s], f);
	      }for (s in n) if (!(s in r)) return Y(2, t, s, n[s], r[s], l);
	    }
	  }, Y = function (e, t, n, r, i, s) {
	    var o = { attrChange: e, currentTarget: t, attrName: n, prevValue: r, newValue: i };o[s] = e, at(o);
	  }, Z = function (e) {
	    for (var t, n, r = {}, i = e.attributes, s = 0, o = i.length; s < o; s++) t = i[s], n = t.name, n !== "setAttribute" && (r[n] = t.value);return r;
	  })), t[r] = function (n, r) {
	    p = n.toUpperCase(), $ || ($ = !0, P ? (et = (function (e, t) {
	      function n(e, t) {
	        for (var n = 0, r = e.length; n < r; t(e[n++]));
	      }return new P(function (r) {
	        for (var i, s, o = 0, u = r.length; o < u; o++) i = r[o], i.type === "childList" ? (n(i.addedNodes, e), n(i.removedNodes, t)) : (s = i.target, Q && s.attributeChangedCallback && i.attributeName !== "style" && s.attributeChangedCallback(i.attributeName, i.oldValue, s.getAttribute(i.attributeName)));
	      });
	    })(st(s), st(o)), et.observe(t, { childList: !0, subtree: !0 })) : (X = [], V(function E() {
	      while (X.length) X.shift().call(null, X.shift());V(E);
	    }), t.addEventListener("DOMNodeInserted", ft(s)), t.addEventListener("DOMNodeRemoved", ft(o))), t.addEventListener(h, lt), t.addEventListener("readystatechange", lt), t.createElement = function (e, n) {
	      var r = U.apply(t, arguments),
	          i = "" + e,
	          s = S.call(y, (n ? v : d) + (n || i).toUpperCase()),
	          o = -1 < s;return n && (r.setAttribute("is", n = n.toLowerCase()), o && (o = ut(i.toUpperCase(), n))), Q = !t.createElement.innerHTMLHelper, o && nt(r, b[s]), r;
	    }, H.cloneNode = function (e) {
	      var t = I.call(this, !!e),
	          n = ot(t);return -1 < n && nt(t, b[n]), e && it(t.querySelectorAll(w)), t;
	    });if (-2 < S.call(y, v + p) + S.call(y, d + p)) throw new Error("A " + n + " type is already registered");if (!m.test(p) || -1 < S.call(g, p)) throw new Error("The type " + n + " is invalid");var i = function i() {
	      return f ? t.createElement(l, p) : t.createElement(l);
	    },
	        a = r || x,
	        f = T.call(a, u),
	        l = f ? r[u].toUpperCase() : p,
	        c = y.push((f ? v : d) + p) - 1,
	        p;return w = w.concat(w.length ? "," : "", f ? l + '[is="' + n.toLowerCase() + '"]' : l), i.prototype = b[c] = T.call(a, "prototype") ? a.prototype : _(H), rt(t.querySelectorAll(w), s), i;
	  };
	})(window, document, Object, "registerElement");

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
	    Array.prototype.forEach.call(document.querySelectorAll('[data-toggle="collapse"]'), function (collapsable) {
	        collapsable.onclick = function () {
	            var targetAttr = collapsable.getAttribute('data-target');
	            var targets = document.querySelectorAll(targetAttr);
	
	            Array.prototype.forEach.call(targets, function (target) {
	                target.classList.toggle('in');
	            });
	        };
	    });
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	!(function (c) {
	  function s(v) {
	    if (l[v]) return l[v].exports;var t = l[v] = { exports: {}, id: v, loaded: !1 };return c[v].call(t.exports, t, t.exports, s), t.loaded = !0, t.exports;
	  }var l = {};return s.m = c, s.c = l, s.p = "", s(0);
	})([function (c, s, l) {
	  var v = ["android", "appIcon", "arrow", "attention", "auto24", "bodytypes/compact", "bodytypes/delivery", "bodytypes/limousine", "bodytypes/moto-chopper", "bodytypes/moto-classic", "bodytypes/moto-enduro", "bodytypes/moto-naked", "bodytypes/moto-quad", "bodytypes/moto-scooter", "bodytypes/moto-sports", "bodytypes/moto-tourer", "bodytypes/moto-touring_enduro", "bodytypes/offroad", "bodytypes/oldtimer", "bodytypes/roadster", "bodytypes/sports", "bodytypes/station", "bodytypes/van", "bubble", "bubbles", "close", "delete", "edit", "facebook", "finance24", "flag/at", "flag/be", "flag/de", "flag/es", "flag/fr", "flag/it", "flag/lu", "flag/nl", "flag/pl", "googleplus", "heart", "hook", "immo24", "info", "ios", "lifestyle/familycar", "lifestyle/firstcar", "lifestyle/fourxfour", "lifestyle/fuelsaver", "lifestyle/luxury", "lifestyle/roadster-l", "location", "mail", "phone", "pin", "pinCar", "pinMoto", "pinterest", "search", "sharing", "star-half", "star", "t-online", "tip", "twitter", "whatsapp", "youtube"],
	      t = {};v.forEach(function (c) {
	    t[c.toLowerCase()] = l(1)("./" + c + ".svg");
	  });var h = Object.create(HTMLElement.prototype);h.createdCallback = function () {
	    this.innerHTML = t[("" + this.getAttribute("type")).toLowerCase()];
	  }, h.attributeChangedCallback = function (c, s, l) {
	    "type" === c && (this.innerHTML = t[("" + this.getAttribute("type")).toLowerCase()]);
	  }, document.registerElement("as24-icon", { prototype: h }), window.showcarIconNames = v;
	}, function (c, s, l) {
	  function v(c) {
	    return l(t(c));
	  }function t(c) {
	    return h[c] || (function () {
	      throw new Error("Cannot find module '" + c + "'.");
	    })();
	  }var h = { "./android.svg": 2, "./appIcon.svg": 3, "./arrow.svg": 4, "./attention.svg": 5, "./auto24.svg": 6, "./bodytypes/compact.svg": 7, "./bodytypes/delivery.svg": 8, "./bodytypes/limousine.svg": 9, "./bodytypes/moto-chopper.svg": 10, "./bodytypes/moto-classic.svg": 11, "./bodytypes/moto-enduro.svg": 12, "./bodytypes/moto-naked.svg": 13, "./bodytypes/moto-quad.svg": 14, "./bodytypes/moto-scooter.svg": 15, "./bodytypes/moto-sports.svg": 16, "./bodytypes/moto-tourer.svg": 17, "./bodytypes/moto-touring_enduro.svg": 18, "./bodytypes/offroad.svg": 19, "./bodytypes/oldtimer.svg": 20, "./bodytypes/roadster.svg": 21, "./bodytypes/sports.svg": 22, "./bodytypes/station.svg": 23, "./bodytypes/van.svg": 24, "./bubble.svg": 25, "./bubbles.svg": 26, "./close.svg": 27, "./delete.svg": 28, "./edit.svg": 29, "./facebook.svg": 30, "./finance24.svg": 31, "./flag/at.svg": 32, "./flag/be.svg": 33, "./flag/de.svg": 34, "./flag/es.svg": 35, "./flag/fr.svg": 36, "./flag/it.svg": 37, "./flag/lu.svg": 38, "./flag/nl.svg": 39, "./flag/pl.svg": 40, "./googleplus.svg": 41, "./heart.svg": 42, "./hook.svg": 43, "./immo24.svg": 44, "./info.svg": 45, "./ios.svg": 46, "./lifestyle/familycar.svg": 47, "./lifestyle/firstcar.svg": 48, "./lifestyle/fourxfour.svg": 49, "./lifestyle/fuelsaver.svg": 50, "./lifestyle/luxury.svg": 51, "./lifestyle/roadster-l.svg": 52, "./location.svg": 53, "./mail.svg": 54, "./phone.svg": 55, "./pin.svg": 56, "./pinCar.svg": 57, "./pinMoto.svg": 58, "./pinterest.svg": 59, "./search.svg": 60, "./sharing.svg": 61, "./star-half.svg": 62, "./star.svg": 63, "./t-online.svg": 64, "./tip.svg": 65, "./twitter.svg": 66, "./whatsapp.svg": 67, "./youtube.svg": 68 };v.keys = function () {
	    return Object.keys(h);
	  }, v.resolve = t, c.exports = v, v.id = 1;
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 22"><path d="M6.2 1.7h.1c.1 0 .1-.1.1-.1L5.4 0h-.1c-.1 0-.1.1-.1.1l1 1.6zM11.7 1.7h-.1c-.1 0-.1-.1-.1-.1L12.6 0h.1c.1 0 .1.1.1.1l-1.1 1.6zM9 2.7C3.3 2.7 3 8 3 8h12s-.4-5.3-6-5.3zM6.4 6.4c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7zm5.1 0c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7.4 0 .7.3.7.7 0 .4-.3.7-.7.7zM2 15c0 .6-.4 1-1 1s-1-.4-1-1V9c0-.6.4-1 1-1s1 .4 1 1v6zM18 15c0 .6-.4 1-1 1s-1-.4-1-1V9c0-.6.4-1 1-1s1 .4 1 1v6zM7 21c0 .6-.4 1-1 1s-1-.4-1-1v-6c0-.6.4-1 1-1s1 .4 1 1v6zM12 21c0 .6-.4 1-1 1s-1-.4-1-1v-6c0-.6.4-1 1-1s1 .4 1 1v6z"/><path d="M15 17c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1v-7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v7z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54 54"><path d="M42 0H12C5.4 0 0 5.4 0 12v14h54V12c0-6.6-5.4-12-12-12z" fill="#003468"/><path d="M12 54h30c6.6 0 12-5.4 12-12V28H0v14c0 6.6 5.4 12 12 12z" fill="#FF7500"/><g fill="#003468"><path d="M6.9 42.3h-.1c-1.5 0-2.7-1-2.7-2.7 0-1 1.6-1 1.6 0 0 .7.5 1.1 1.1 1.1h.1c.7 0 1.2-.3 1.2-1 0-1.7-3.9-1.8-3.9-4.3v-.3c0-1.4 1.4-2.3 2.6-2.3h.1c1.4 0 2.6.9 2.6 2.2 0 1-1.5 1-1.5 0 0-.4-.4-.6-1.1-.6h-.1c-.6 0-1 .3-1 .8v.2c0 1.1 3.9 1.5 3.9 4.3-.1 1.6-1.3 2.6-2.8 2.6zM13.6 42.3h-.1c-1.5 0-2.7-1.1-2.7-2.6v-4.2c0-1.5 1.2-2.6 2.7-2.6h.1c1.4 0 2.5.9 2.7 2.2v.1c0 .5-.4.8-.8.8-.3 0-.7-.2-.8-.7-.1-.6-.6-.9-1.1-.9h-.1c-.6 0-1.1.5-1.1 1.1v4.2c0 .6.5 1.1 1.1 1.1h.1c.6 0 1-.4 1.1-.9.1-.5.4-.7.8-.7s.8.3.8.8v.1c-.2 1.3-1.3 2.2-2.7 2.2zM20.2 42.3h-.1c-1.5 0-2.7-1.2-2.7-2.6v-4.2c0-1.5 1.2-2.6 2.7-2.6h.1c1.5 0 2.7 1.1 2.7 2.6v4.2c0 1.4-1.2 2.6-2.7 2.6zm1.2-6.8c0-.6-.5-1.1-1.1-1.1h-.1c-.6 0-1.1.5-1.1 1.1v4.2c0 .6.5 1.1 1.1 1.1h.1c.6 0 1.1-.5 1.1-1.1v-4.2zM27.3 42.3h-.1c-1.5 0-2.7-1.2-2.7-2.7v-6c0-.5.4-.8.8-.8s.8.3.8.8v6c0 .6.5 1.1 1.1 1.1h.1c.6 0 1.1-.5 1.1-1.1v-6c0-.5.4-.8.8-.8s.8.3.8.8v6c0 1.5-1.2 2.7-2.7 2.7zM35.5 34.5h-1.1v7c0 .5-.4.8-.8.8s-.8-.3-.8-.8v-7h-1.1c-.5 0-.8-.4-.8-.8s.3-.8.8-.8h3.7c.5 0 .8.4.8.8.1.4-.1.8-.7.8zM42.8 42.2h-3.5c-.5 0-.8-.5-.8-.9 0-.2 0-.3.1-.5l3.1-4.9c.2-.3.2-.4.2-.6v-.1c0-.4-.3-.8-.8-.8-.4 0-.8.3-.8.8v.1c0 .5-.4.8-.8.8s-.8-.3-.8-.8v-.2c0-1.3 1.1-2.3 2.3-2.3 1.3 0 2.4.9 2.4 2.3v.1c0 .5-.2.9-.5 1.4l-2.5 4h2.3c.5 0 .8.4.8.8.1.4-.2.8-.7.8zM48.9 40.4h-.3v1.1c0 .5-.4.8-.8.8s-.8-.3-.8-.8v-1.1h-2c-.5 0-.9-.3-.9-.8 0-.1 0-.3.1-.4l2.5-5.8c.1-.3.4-.5.7-.5.4 0 .8.3.8.8 0 .1 0 .2-.1.3l-2.2 4.9h1.2v-.8c0-.5.4-.8.8-.8s.8.3.8.8v.8h.3c.5 0 .8.4.8.8-.1.3-.3.7-.9.7z"/></g><g fill="#FFF"><path d="M9.2 21.1c-.3 0-.6-.2-.7-.5L8 19.1H5.5L5 20.6c-.1.4-.4.5-.7.5-.4 0-.8-.3-.8-.7v-.2L6 12.8c.2-.6.5-.6.8-.6.3 0 .6.1.8.6l2.3 7.4v.2c.1.5-.3.7-.7.7zm-2.4-6.2L6 17.6h1.6l-.8-2.7zM13.7 21.1h-.1c-1.4 0-2.6-1.2-2.6-2.6v-5.7c0-.5.4-.7.7-.7s.7.2.7.7v5.7c0 .6.5 1.1 1.1 1.1h.1c.6 0 1.1-.5 1.1-1.1v-5.7c0-.5.4-.7.7-.7.4 0 .7.2.7.7v5.7c.2 1.5-1 2.6-2.4 2.6zM21.7 13.7h-1v6.7c0 .5-.4.7-.7.7-.4 0-.7-.2-.7-.7v-6.7h-1c-.5 0-.7-.4-.7-.7 0-.4.3-.7.7-.7h3.5c.5 0 .7.4.7.7-.1.3-.4.7-.8.7zM26 21.1h-.1c-1.4 0-2.6-1.1-2.6-2.5v-4c0-1.4 1.2-2.5 2.6-2.5h.1c1.4 0 2.6 1.1 2.6 2.5v4c-.1 1.4-1.2 2.5-2.6 2.5zm1-6.4c0-.6-.5-1-1.1-1h-.1c-.6 0-1.1.4-1.1 1v4c0 .6.5 1.1 1.1 1.1h.2c.6 0 1.1-.4 1.1-1v-4.1H27z"/></g></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 7"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 7L0 .5.5 0l6 6 5.9-6 .6.5"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><circle cx="10" cy="17.5" r="2.5"/><path d="M11.5 12h-3l-1-11 1-1h2.9l1.1 1.1"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74 35"><path fill="#003468" d="M0 0v17h74V0H0"/><path d="M0 35h65.3c4.9 0 8.7-3.9 8.7-8.5V18H0v17z" fill="#FF7500"/><g fill="#003468"><path d="M6.7 31.7h-.1c-1.5 0-2.8-1.1-2.8-2.8 0-1.1 1.6-1.1 1.6 0 0 .8.5 1.2 1.2 1.2h.1c.7 0 1.3-.4 1.3-1.1 0-1.8-4-1.9-4-4.5v-.3c0-1.5 1.5-2.4 2.7-2.4h.1c1.4 0 2.7.9 2.7 2.2 0 1-1.6 1.1-1.6 0 0-.4-.4-.7-1.1-.7h-.2c-.6 0-1.1.3-1.1.9v.2c0 1.1 4 1.6 4 4.5.1 1.7-1.2 2.8-2.8 2.8zM13.7 31.7h-.1c-1.5 0-2.8-1.2-2.8-2.7v-4.4c0-1.6 1.3-2.7 2.8-2.7h.1c1.4 0 2.6 1 2.8 2.3v.1c0 .5-.4.8-.8.8s-.7-.2-.8-.7c-.1-.6-.6-1-1.2-1h-.1c-.7 0-1.2.5-1.2 1.1V29c0 .7.5 1.1 1.2 1.1h.1c.6 0 1.1-.4 1.2-1 .1-.5.4-.7.8-.7s.8.3.8.8v.2c-.2 1.3-1.4 2.3-2.8 2.3zM20.6 31.7h-.1c-1.5 0-2.8-1.2-2.8-2.7v-4.4c0-1.6 1.3-2.7 2.8-2.7h.1c1.5 0 2.8 1.2 2.8 2.7V29c0 1.5-1.3 2.7-2.8 2.7zm1.1-7.1c0-.7-.5-1.1-1.2-1.1h-.1c-.7 0-1.2.5-1.2 1.1V29c0 .7.5 1.1 1.2 1.1h.1c.7 0 1.2-.5 1.2-1.1v-4.4zM27.9 31.7h-.1c-1.5 0-2.8-1.3-2.8-2.8v-6.2c0-.5.4-.8.8-.8s.8.3.8.8v6.2c0 .6.5 1.2 1.2 1.2h.1c.7 0 1.2-.5 1.2-1.2v-6.2c0-.5.4-.8.8-.8s.8.3.8.8v6.2c0 1.6-1.2 2.8-2.8 2.8zM36.4 23.6h-1.1v7.3c0 .5-.4.8-.8.8s-.8-.3-.8-.8v-7.3h-1.1c-.5 0-.8-.4-.8-.8s.3-.8.8-.8h3.8c.5 0 .8.4.8.8s-.2.8-.8.8zM43.9 31.6h-3.6c-.5 0-.8-.5-.8-1 0-.2 0-.4.1-.5l3.2-5.1c.2-.3.2-.4.2-.6v-.1c0-.4-.4-.8-.8-.8-.5 0-.8.4-.8.8v.2c0 .5-.4.8-.8.8s-.8-.3-.8-.8v-.2c0-1.4 1.1-2.4 2.4-2.4 1.3 0 2.4 1 2.4 2.4v.2c0 .5-.2 1-.5 1.5l-2.6 4h2.4c.5 0 .8.4.8.8s-.2.8-.8.8zM50.3 29.7H50v1.2c0 .5-.4.8-.8.8s-.8-.3-.8-.8v-1.2h-2.2c-.6 0-.9-.3-.9-.9 0-.1 0-.3.1-.4l2.6-6.1c.2-.4.4-.5.7-.5.4 0 .8.3.8.8 0 .1 0 .2-.1.3L47.1 28h1.2v-.8c0-.5.4-.8.8-.8s.8.3.8.8v.8h.3c.5 0 .8.4.8.8.1.5-.2.9-.7.9z"/></g><path d="M10.2 13.8c-.3 0-.6-.2-.7-.6L9 11.5H6.2l-.5 1.7c-.1.4-.4.6-.8.6s-.8-.3-.8-.8v-.3l2.5-8.1c.3-.6.6-.7 1-.7.3 0 .7.1.9.7l2.5 8.1v.3c0 .5-.4.8-.8.8zM7.6 6.9l-.9 3h1.8l-.9-3zM15.1 13.8H15c-1.5 0-2.8-1.3-2.8-2.8V4.7c0-.5.4-.8.8-.8s.8.3.8.8V11c0 .6.5 1.2 1.2 1.2h.1c.7 0 1.2-.5 1.2-1.2V4.7c0-.5.4-.8.8-.8s.8.3.8.8V11c0 1.5-1.3 2.8-2.8 2.8zM23.7 5.6h-1.1V13c0 .5-.4.8-.8.8s-.8-.3-.8-.8V5.6h-1.1c-.5 0-.8-.4-.8-.8s.3-.8.8-.8h3.8c.5 0 .8.4.8.8s-.3.8-.8.8zM28.4 13.8h-.1c-1.5 0-2.8-1.2-2.8-2.7V6.7c0-1.6 1.3-2.7 2.8-2.7h.1c1.5 0 2.8 1.2 2.8 2.7V11c0 1.6-1.3 2.8-2.8 2.8zm1.2-7.1c0-.7-.5-1.1-1.2-1.1h-.1c-.7 0-1.2.5-1.2 1.1V11c0 .7.5 1.1 1.2 1.1h.1c.7 0 1.2-.5 1.2-1.1V6.7z" fill="#FFF"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 26"><path d="M7.2 15C4.9 15 3 16.8 3 19s1.9 4 4.2 4 4.2-1.8 4.2-4-1.8-4-4.2-4zm0 6.5c-1.4 0-2.6-1.1-2.6-2.5s1.2-2.5 2.6-2.5 2.6 1.1 2.6 2.5-1.1 2.5-2.6 2.5zM33.8 15c-2.3 0-4.2 1.8-4.2 4s1.9 4 4.2 4 4.2-1.8 4.2-4-1.9-4-4.2-4zm0 6.5c-1.4 0-2.6-1.1-2.6-2.5s1.2-2.5 2.6-2.5 2.6 1.1 2.6 2.5-1.2 2.5-2.6 2.5z"/><path d="M18.1 10L17 5h.8c1.1 0 4.4.6 6.2 1.3 2.4.9 7.1 2.7 8.4 3.7H18.1zm-9.3 0c-.7 0-1.6-.6-1.8-1.6C7.8 6.5 9.6 5 12.5 5h2.2l1.1 5h-7zm28.9.7c-1.5-.4-4.1-1.6-4.1-1.6s-6.1-2.9-9.1-4c-2-.7-5.4-1.2-6.8-1.2h-6C9.4 4 7.1 5.3 5.4 6.7 2.3 9.3 0 14.1 0 17c0 .8.3 2.3.5 3H2v-1.1c0-3.1 2.4-5.6 5.5-5.6s5.5 2.5 5.5 5.6V20h15v-1.1c0-3.1 2.4-5.6 5.5-5.6s5.5 2.5 5.5 5.6V20h1.6c.3-1.1.4-2.4.4-3.4 0-1.5-1-5.2-3.3-5.9z" fill-rule="evenodd" clip-rule="evenodd"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 26"><path d="M16.4 21.5c0 1.5-1.3 2.8-2.8 2.8s-2.8-1.2-2.8-2.8 1.3-2.8 2.8-2.8 2.8 1.3 2.8 2.8zm37.8 0c0 1.5-1.3 2.8-2.8 2.8s-2.8-1.2-2.8-2.8 1.3-2.8 2.8-2.8 2.8 1.3 2.8 2.8zm6.4-10L53 2.2C52 .8 50.3 0 48.4 0h-46C1 .7 0 2.5 0 4.6V18s0-.1 0 0c0 2.1 1.1 4.1 2.5 5h5.1v-1.5c0-3.3 2.7-5.9 6-5.9s6 2.7 6 5.9V23h25.7v-1.5c0-3.3 2.7-5.9 6-5.9s6 2.7 6 5.9V23h3.2c.8-.9 1.3-2.2 1.3-3.7v-3.2c.2-1.4-.2-3.3-1.2-4.6zm-13-1.5c-1.9 0-2.6-.9-2.6-3V2h4c1.1 0 2.5.8 3.2 1.7L57 10h-9.4zm-34 7.1c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5zm37.8 0c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5c.1-2.5-2-4.5-4.5-4.5z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 26"><path d="M13.6 15.9c-1.6 0-2.8 1.2-2.8 2.7s1.3 2.7 2.8 2.7c1.6 0 2.8-1.2 2.8-2.7s-1.2-2.7-2.8-2.7zm37.8 0c-1.6 0-2.8 1.2-2.8 2.7s1.3 2.7 2.8 2.7 2.8-1.2 2.8-2.7-1.2-2.7-2.8-2.7zm7.3-4.4L45.2 9.8l-7.6-4.4c-1.7-1-2.8-1.5-5.3-1.5h-9.1c-2.5 0-3.6.5-5.3 1.5l-5.2 3.4-8.9 1C1.8 10.6 0 12.2 0 15c0 2.1 1.1 4.2 2.5 5h5.1v-1.4c0-3.2 2.7-5.8 6-5.8s6 2.6 6 5.8V20h25.7v-1.4c0-3.2 2.7-5.8 6-5.8s6 2.6 6 5.8V20h3.2c.8-.9 1.3-2.1 1.3-3.6.2-2.5-1.2-4.6-3.1-4.9zM17 10l2.2-2.9c1.1-1.2 2.5-1.6 4.8-1.6h1.7L27 10H17zm12 0l-1-4.5h4.3c2.2 0 3 .4 4.5 1.3L42 10H29zm-10.9 8.6c0 2.4-2 4.4-4.5 4.4s-4.5-2-4.5-4.4 2-4.4 4.5-4.4 4.5 2 4.5 4.4zm37.9 0c0 2.4-2 4.4-4.5 4.4S47 21 47 18.6s2-4.4 4.5-4.4c2.4 0 4.5 2 4.5 4.4z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 54"><style><![CDATA[\n	.st0{fill:#8C91A0;}\n]]></style><path class="st0" d="M36 22.4c.8-.7 1.7-1.4 2.5-1.4 1.6 0 3.2 1.2 3.8 1.7.6.6 1.6.5 2.1-.1.6-.6.5-1.6-.1-2.1-.3-.3-2.8-2.5-5.8-2.5-1.8 0-3.3 1.1-4.5 2.2L15.4 37.1c-1.6-1.3-3.7-2.1-5.9-2.1C4.3 35 0 39.3 0 44.5S4.3 54 9.5 54s9.5-4.3 9.5-9.5c0-1.9-.6-3.7-1.6-5.2L36 22.4zM16 44.5c0 3.6-2.9 6.5-6.5 6.5S3 48.1 3 44.5 5.9 38 9.5 38c1.4 0 2.6.4 3.7 1.1l-4.7 4.3c-.6.6-.7 1.5-.1 2.1.3.3.7.5 1.1.5.4 0 .7-.1 1-.4l4.7-4.3c.5 1 .8 2.1.8 3.2z"/><path class="st0" d="M66.5 35c-5.2 0-9.5 4.3-9.5 9.5 0 .5.1 1 .1 1.5h-2.5c-.1-.5-.1-1-.1-1.5 0-6.6 5.4-12 12-12 2 0 3.9.5 5.5 1.4l1-1.9c-2.1-1.1-4.5-2-7-2-4.4 0-6.6 1.4-8.6 2.9C54.2 35 50 38 46 35c-2.8-7-9.9-7.7-13-7l-4 4 5.2 9.7c1.7 2.8 4.6 7.3 8.3 7.3h15.7c1.6 3 4.7 5 8.4 5 5.2 0 9.5-4.3 9.5-9.5S71.7 35 66.5 35zm-6.3 11c-.1-.5-.2-1-.2-1.5 0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5c-1.8 0-3.5-.8-4.7-2h5.7c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5h-7.3z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 54"><style><![CDATA[\n	.st0{fill:#8C91A0;}\n]]></style><path class="st0" d="M45.5 31l-4.9 2.5c-.7-.2-1.1-.4-1.1-.5 0-3-6.1-5-9-5-4 0-5 1-6 2h-2.3c.5-1.2.9-2 1.1-2.3.6-1.1 2.6-1.7 6.2-1.7.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5c-3.6 0-7.4.4-8.9 3.3 0 .1-.1.2-.2.4 0 0-4.3-1.5-4.5-1.6-.1-.1-.2-.1-.4-.1-1.1 0-2 1.3-2 3s.9 3 2 3c.2 0 .3 0 .5-.1.1 0 3-1.1 3-1.1-.7 1.6-1.6 3.6-2.4 5.5-.8-.2-1.7-.3-2.6-.3-5.2 0-9.5 4.3-9.5 9.5S8.8 54 14 54s9.5-4.3 9.5-9.5c0-3.3-1.7-6.2-4.2-7.9.6-1.3 1.1-2.6 1.7-3.8 1.1 1.9 3.9 6.8 5.5 9.2 2 3 6 6 10 6h14.7c1.4 3.5 4.8 6 8.8 6 5.1 0 9.2-4 9.5-9h2c0-7-5.2-11.8-11.5-11.8-3.5 0-6.6 1.4-8.7 3.8-.6-.2-2.6-.9-4.8-1.6V34H50c.8 0 1.5-.7 1.5-1.5S50.8 31 50 31h-4.5zm-25 13.5c0 3.6-2.9 6.5-6.5 6.5s-6.5-2.9-6.5-6.5S10.4 38 14 38c.5 0 .9.1 1.4.1-1.2 2.8-2.2 5-2.3 5.3-.3.8 0 1.6.8 2 .2.1.4.1.6.1.6 0 1.1-.3 1.4-.9.6-1.4 1.4-3.2 2.2-5.1 1.5 1.1 2.4 3 2.4 5zm14-6.5h-3l-2 2h-1l-3-5 9 2v1zM62 48c.8 0 1.5-.7 1.5-1.5S62.8 45 62 45h-8.5v-.5c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5S63.6 51 60 51c-2.3 0-4.3-1.2-5.5-3H62z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 54"><style><![CDATA[\n	.st0{fill:#8C91A0;}\n]]></style><path class="st0" d="M58.5 35c-3.3 0-6.2 1.7-7.9 4.3L45.5 37c.9-2.9 3.2-5.1 5.9-6.2l7.4-2.9c3.2-1.4 4.8-.6 6.8 1.2l2.3-1.2c-1.8-3.4-5.1-5-8.3-4.3L43 27c-3.2 0-8.1-2.2-11.2-6H35c.8 0 1.5-.7 1.5-1.5S35.8 18 35 18h-4c-.8 0-1.6.3-2.3.7-2.6 1.7-4.8 4.2-5.4 6.9-4.9-.9-10.2.3-13.2 2.6-.7.5-.8 1.4-.3 2.1.5.7 1.4.8 2.1.3 2.8-2.1 8.2-3.1 12.7-1.5l-3.7 6.5c-1.1-.4-2.2-.6-3.4-.6-5.2 0-9.5 4.3-9.5 9.5s4.3 9.5 9.5 9.5 9.5-4.3 9.5-9.5c0-3-1.4-5.6-3.5-7.4l3.8-6.6c2.5 1.8 3.8 4.5 4 8.1 0 .7.6 1.3 1.2 1.4l6.5 3c3.8 1.3 6-.1 6-3l4.3 2c-.2.8-.3 1.6-.3 2.5 0 5.2 4.3 9.5 9.5 9.5s9.5-4.3 9.5-9.5-4.3-9.5-9.5-9.5zM24 44.5c0 3.6-2.9 6.5-6.5 6.5S11 48.1 11 44.5s2.9-6.5 6.5-6.5c.6 0 1.3.1 1.9.3l-3.2 5.5c-.4.7-.2 1.6.6 2 .2.1.5.2.7.2.5 0 1-.3 1.3-.8l3.2-5.5c1.2 1.3 2 2.9 2 4.8zM58.5 51c-3.6 0-6.5-2.9-6.5-6.5 0-.4 0-.8.1-1.3l5.8 2.6c.2.1.4.1.6.1.6 0 1.1-.3 1.4-.9.3-.8 0-1.6-.7-2l-5.8-2.6c1.2-1.5 3-2.5 5.1-2.5 3.6 0 6.5 2.9 6.5 6.5S62.1 51 58.5 51z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 54"><style><![CDATA[\n	.st0{fill:#8C91A0;}\n]]></style><path class="st0" d="M71 44.5c0 5.2-4.3 9.5-9.5 9.5-4.9 0-8.9-3.7-9.4-8.5L55 44v.4c0 3.6 2.9 6.5 6.5 6.5S68 48 68 44.4c0-2.3-1.1-4.2-2.9-5.4l2.9-1.5c1.9 1.9 3 4.3 3 7zM31 34c0-.3 0-.6.1-.9L26.2 32c1.8 3.6 5.2 11.7 8.8 12v-6c-2.2 0-4-1.8-4-4zm32.3 11.8c-.3.5-.8.7-1.3.7-.3 0-.5-.1-.8-.2L54 41.9l-2.7 1.4c-1.4.6-7.3 3.7-13.4 3.7h-1.2c-3.3 0-7.3-2.7-8.7-5.6l-5.4-10.2-2.6 5.5c2.4 1.7 4 4.5 4 7.8 0 5.2-4.3 9.5-9.5 9.5S5 49.7 5 44.5 9.3 35 14.5 35c.9 0 1.7.1 2.5.3l3.5-7.4c-1.4-.2-2.5-1.5-2.5-3 0-1.7 1.3-3 3-3h2.3l1.4-3c.4-.8 1.4-1.2 2.2-.8.8.4 1.2 1.4.8 2.2l-2.5 5.4C30.2 23 31.3 23 36 23c0 0 6 .2 9 7 7.5-2 18.2-6 20-6 2 0 2.7 2.4 1.2 3.4-1.6 1-10.6 6-10.6 6-1.9 1-3.1 2.3-3.8 3.6l2.2 1.3 14.1-7.2 1.5 2.9-12.3 6.3 5.6 3.4c.6.5.8 1.4.4 2.1zm-44.6-6.3L16 45.2c-.3.6-.9.9-1.5.9-.2 0-.5-.1-.7-.2-.8-.4-1.2-1.4-.8-2.2l2.7-5.7h-1.2C10.9 38 8 40.9 8 44.5s2.9 6.5 6.5 6.5 6.5-2.9 6.5-6.5c0-2-.9-3.8-2.3-5zM39 34v1l4 4 1-4-5-1z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 54"><style><![CDATA[\n	.st0{fill:#8C91A0;}\n]]></style><path class="st0" d="M17.8 54H17c-4.7 0-8.5-3.9-8.5-8.6s3.8-8.6 8.5-8.6h.8c-2.6 1.9-4.3 5.1-4.3 8.6s1.7 6.6 4.3 8.6zm15-32.8c.4-.8.1-1.7-.7-2-.7-.4-1.6-.1-2 .7L27.6 25c-5.1 1.1-8.4 2.9-10.1 4.6-2.2 2.2 1 3.1 4 3 7 0 13 4.1 13 12.2v1h9c.3 4.5 3.9 8.1 8.5 8.1h.8c-2.6-1.9-4.3-5.1-4.3-8.6 0-5.7 2.9-12.2 16-15.7 0-1.1-.9-2-2-2-7.8.4-15.3 5.1-21 5.1-5 0-6.3-3.5-11-5.1v-.8c0-.5.2-1.2.4-1.7l1.9-3.9zM59 36.8c-4.7 0-8.5 3.9-8.5 8.6S54.3 54 59 54s8.5-3.9 8.5-8.6-3.8-8.6-8.5-8.6zm4.5 8.6c0 2.5-2 4.6-4.5 4.6s-4.5-2-4.5-4.6 2-4.6 4.5-4.6 4.5 2.1 4.5 4.6zM24 36.8c-4.7 0-8.5 3.9-8.5 8.6S19.3 54 24 54s8.5-3.9 8.5-8.6-3.8-8.6-8.5-8.6zm4.5 8.6c0 2.5-2 4.6-4.5 4.6s-4.5-2-4.5-4.6 2-4.6 4.5-4.6 4.5 2.1 4.5 4.6z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 54"><style><![CDATA[\n	.st0{fill:#8C91A0;}\n]]></style><path class="st0" d="M18 36c1.2.1 2.4.3 3.5.8L20 39.4c-.8-.3-1.6-.4-2.5-.4-4.1 0-7.5 3.4-7.5 7.5s3.4 7.5 7.5 7.5 7.5-3.4 7.5-7.5c0-2.2-.9-4.2-2.4-5.5l1.5-2.6c2.4 1.9 3.9 4.9 3.9 8.2v.2c0 .7-.1 1.3-.2 1.9l23.4-.9c.6 3.5 3.7 6.2 7.4 6.2 4.1 0 7.5-3.4 7.5-7.5S62.6 39 58.5 39c-3.6 0-6.7 2.6-7.4 6h-3c.4-3.3 2.4-6.1 5.1-7.7 0 0 4.3-2.7 5.8-3.6 1.5-.9 2-1.5 2-2.8 0-1.7-1.3-3-3-3-.3 0-14.4 2-14.6 2.1-1.9.4-3.4 2-3.4 4 0 1.7 1 3.1 2.4 3.7C40.2 40.2 35.7 41 32 41c-7-5-6-12 0-19h2.5c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5H30c-2.3.9-9.1 7.3-12 12.6-.4.8-1.2 2.8 0 4.4zm4.2 10.5c0 2.6-2.1 4.8-4.8 4.8s-4.8-2.1-4.8-4.8 2.1-4.8 4.8-4.8c.4 0 .7.1 1.1.1L16.2 46c-.4.7-.2 1.6.6 2 .2.1.5.2.7.2.5 0 1-.3 1.3-.8l2.3-4c.7.9 1.1 1.9 1.1 3.1zm36.3 4.7c-2.2 0-4-1.5-4.6-3.5h4.6c.8 0 1.5-.5 1.5-1.3s-.7-1.5-1.5-1.5L54 45c.6-1.9 2.4-3.3 4.5-3.3 2.6 0 4.8 2.1 4.8 4.8s-2.2 4.7-4.8 4.7z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 54"><style><![CDATA[\n	.st0{fill:#8C91A0;}\n]]></style><path class="st0" d="M46.1 37.7s18-8.8 18.3-8.9c.7-.3 1.1-1 1.1-1.8 0-1.1-.8-2-2-2-.9 0-14 5-14 5h-7c-1.5-3.5-5.7-5-9-5h-7v3l15 7c1.4.7 3.1 1.6 4.6 2.7z"/><path class="st0" d="M61 35c-4.7 0-8.7 3.5-9.4 8h-4.4c-1.1-3.6-5-5.4-7.7-6.7l-15-7V18c-11.9 4.2-14.4 8.5-13.7 12.1 0 0 6.7 2.1 7.4 2.3.5.1 1 .3 1.5.5l-1.5 2.6c-1-.4-2.1-.6-3.2-.6-5.2 0-9.5 4.3-9.5 9.5S9.8 54 15 54s9.5-4.3 9.5-9.5c0-3-1.4-5.7-3.7-7.5l1.5-2.6c3.1 2.3 5.2 5.9 5.2 10.1 0 2-.5 3.8-1.3 5.5h16.3c2.6 0 4.5-1.4 4.9-4h4.2c.7 4.5 4.6 8 9.4 8 5.2 0 9.5-4.3 9.5-9.5S66.2 35 61 35zm-39.5 9.5c0 3.6-2.9 6.5-6.5 6.5s-6.5-2.9-6.5-6.5S11.4 38 15 38c.6 0 1.1.1 1.7.2l-3.5 6c-.4.7-.2 1.6.6 2 .2.1.5.2.7.2.5 0 1-.3 1.3-.8l3.5-6.1c1.4 1.3 2.2 3.1 2.2 5zM61 51c-3.1 0-5.6-2.1-6.3-5h6.8c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5h-6.8c.7-2.9 3.2-5 6.3-5 3.6 0 6.5 2.9 6.5 6.5S64.6 51 61 51z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 54"><style><![CDATA[\n	.st0{fill:#8C91A0;}\n]]></style><path class="st0" d="M69.9 43h-3.1c.1.5.2 1 .2 1.5 0 3.6-2.9 6.5-6.5 6.5-2.3 0-4.3-1.2-5.5-3h6c.8 0 1.5-.7 1.5-1.5S61.8 45 61 45h-7v-.5c0-1.5.5-2.8 1.3-3.9-.2-.5-.3-1-.3-1.6v-2.2c-2.4 1.7-4 4.5-4 7.7v.5h-2.5v-.5c0-4.6 2.6-8.7 6.5-10.7V33c0-2.2 1.8-4 4-4h9v-2c0-1.1-.9-2-2-2h-1.8C61.5 25 47 30 43 30s-5-6-12-6c-2.1 0-4.6.7-6.3 1.3L23 24c3.9-4.9 4-9 3-11-9.9 3.9-14.2 14.5-14.2 16.6 0 1 .3 2.1.9 2.9h.8c1.6 0 3.2.3 4.6.9l-1.3 2.2c-1.1-.4-2.2-.6-3.4-.6C8.3 35 4 39.3 4 44.5S8.3 54 13.5 54s9.5-4.3 9.5-9.5c0-3-1.4-5.6-3.5-7.4l1.3-2.2c2.9 2.2 4.8 5.7 4.8 9.6 0 1.2-.2 2.4-.5 3.5h26.7c1.4 3.5 4.8 6 8.8 6 5.2 0 9.5-4.3 9.5-9.5-.1-.5-.2-1-.2-1.5zM20 44.5c0 3.6-2.9 6.5-6.5 6.5S7 48.1 7 44.5 9.9 38 13.5 38c.6 0 1.3.1 1.9.3l-3.2 5.5c-.4.7-.2 1.6.6 2 .2.1.5.2.7.2.5 0 1-.3 1.3-.8l3.2-5.5c1.2 1.3 2 2.9 2 4.8z"/><path class="st0" d="M59 31c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2H59z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 54"><style><![CDATA[\n	.st0{fill:#8C91A0;}\n]]></style><path class="st0" d="M66 27.7c-.2 0-.3 0-.5.1l-10.6 2.8c-1.1.3-1.7 1.4-1.4 2.4l1.6 5.8c.3 1 1.4 1.7 2.5 1.4l10.6-2.8c1.1-.3 1.7-1.4 1.4-2.5L68 29.2c-.3-.9-1.1-1.5-2-1.5z"/><path class="st0" d="M26.8 21c1.6-4 1-8.4.2-10-9.9 3.9-10.2 8.5-10.2 10.6 0 1.6 1.3 3.7 3.1 5-4.8-.8-9.8.5-12.8 2.7-.7.5-.8 1.4-.3 2.1.5.7 1.4.8 2.1.3 2.8-2.1 8.5-3.2 13.1-1.4l-3.1 5.4c-1.1-.4-2.2-.6-3.4-.6C10.3 35 6 39.3 6 44.5s4.3 9.5 9.5 9.5 9.5-4.3 9.5-9.5c0-3-1.4-5.6-3.5-7.4l3.1-5.4c.7.5 1.3 1.1 1.8 1.8L30 43c.6 1.8 2.3 3 4 3h17.1c.7 4.5 4.6 8 9.4 8 5.2 0 9.5-4.3 9.5-9.5 0-1.9-.6-3.6-1.5-5.1l-3.1.8c1 1.1 1.6 2.6 1.6 4.3 0 3.6-2.9 6.5-6.5 6.5-3.1 0-5.6-2.1-6.3-5H62c.8 0 1.5-.7 1.5-1.5S62.8 43 62 43h-7.8c.1-.5.3-1 .5-1.4-.8-.5-1.3-1.3-1.6-2.2l-.2-.6c-.9 1.2-1.5 2.6-1.8 4.2H48c0-3.3 1.5-6.5 3.8-8.6l-.2-.9c-.6-2.1.7-4.3 2.8-4.9L65 25.8c.3-.1.7-.1 1-.1.5 0 1.1.1 1.5.3h.5c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2h-5c-1.1 0-2 .9-2 2v4l-19.1 3.8c-1.8-5.2-6.4-5.7-15.1-5.8zM22 44.5c0 3.6-2.9 6.5-6.5 6.5S9 48.1 9 44.5s2.9-6.5 6.5-6.5c.6 0 1.3.1 1.9.3l-3.2 5.5c-.4.7-.2 1.6.6 2 .2.1.5.2.7.2.5 0 1-.3 1.3-.8l3.2-5.5c1.2 1.3 2 2.9 2 4.8z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 26"><path d="M58.6 9.6L45 7.7l-7.6-5C35.8 1.6 34.7 1 32.1 1H13.3c-2.6 0-4.7.9-6.3 2.6L1.8 9l-.1.1-.2.2C.6 10.4 0 12 0 14v3.5c0 1.2.6 2.4 1.3 2.9L3 21h3v-1.6c0-4.2 3.2-7.1 7.2-7.1s7.2 2.9 7.2 7.1V21h23.4v-1.6c0-4.2 3.2-7.1 7.2-7.1s7.2 2.9 7.2 7.1V21H61c.6-.9 1-2.5 1-3.7v-2.1c0-2.9-1.5-5.2-3.4-5.6zM16 8H9l2.4-3.3c1-1.4 2.5-1.7 4.5-1.7h1.5L16 8zm2 0l1.7-5h6l.8 5H18zm11 0l-1-5h4.5c1.5 0 2.7.1 4.1 1.1L42 8H29zm-15.8 9.1c-1.7 0-3 1.3-3 3s1.4 3 3 3c1.7 0 3-1.3 3-3s-1.3-3-3-3zm37.8 0c-1.7 0-3 1.3-3 3s1.4 3 3 3c1.7 0 3-1.3 3-3s-1.3-3-3-3zm-32.9 3c0 2.7-2.2 4.9-4.9 4.9s-4.9-2.2-4.9-4.9 2.2-4.9 4.9-4.9 4.9 2.2 4.9 4.9zm37.9 0c0 2.7-2.2 4.9-4.9 4.9s-4.9-2.2-4.9-4.9 2.2-4.9 4.9-4.9 4.9 2.2 4.9 4.9z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 26"><path d="M53 18.6v.7c0 .4-.3.7-.8.7h-.8v-1.4c0-3.3-2.7-5.9-6.1-5.9-2.5 0-4.2 1.4-6 3.6-1.9 2.3-7.7 3.7-9.9 3.7H15.1v-1.4c0-3.3-2.7-5.9-6.1-5.9-3.3 0-6.1 2.7-6.1 5.9.1.8-.5 1.4-1.4 1.4-.8 0-1.5-.6-1.5-1.4v-5.9c0-.8.7-1.5 1.5-1.5H3V9.7C3 5.2 4.5 3 10.6 3H25c2.3 0 2.9.6 3 1.5L29.2 9H46c1.5 0 2.5.7 2.5 2.1v.6c2.6 1.2 4.5 3.8 4.5 6.9zM14 5h-4S6 6.8 6 9h8V5zm13 4l-1-4h-9v4h10zm-15.1 9.6c0 1.5-1.3 2.8-2.8 2.8s-2.8-1.2-2.8-2.8 1.3-2.8 2.8-2.8 2.8 1.2 2.8 2.8zm36.4 0c0 1.5-1.3 2.8-2.8 2.8s-2.8-1.2-2.8-2.8 1.3-2.8 2.8-2.8 2.8 1.2 2.8 2.8zM9.1 14.1c-2.5 0-4.5 2-4.5 4.4s2 4.4 4.5 4.4 4.5-2 4.5-4.4-2-4.4-4.5-4.4zm36.3 0c-2.5 0-4.5 2-4.5 4.4s2 4.4 4.5 4.4 4.5-2 4.5-4.4-2-4.4-4.5-4.4z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 26"><path d="M24.3 9.1c-.4-.6-.2-1.4.5-1.7s1.4-.1 1.8.5l1.4 2.3h-3l-.7-1.1zm34.4 3.4l-13.5-1.7L35.3 5h-.4c-.3 0-.6.2-.6.5 0 .2 0 .3.2.4l6.5 5H17.6c-2.6 0-3.4-1.5-3.4-1.5L3.9 10.8C1.8 11.6 0 13.2 0 16c0 2.1 1.1 4.2 2.5 5h5.1v-1.4c0-3.2 2.7-5.8 6-5.8s6 2.6 6 5.8V21h25.7v-1.4c0-3.2 2.7-5.8 6-5.8s6 2.6 6 5.8V21h3.2c.8-.9 1.3-2.1 1.3-3.6.2-2.5-1.2-4.6-3.1-4.9zm-42.3 7.1c0 1.5-1.3 2.7-2.8 2.7s-2.8-1.2-2.8-2.7 1.3-2.7 2.8-2.7 2.8 1.2 2.8 2.7zm37.8 0c0 1.5-1.3 2.7-2.8 2.7s-2.8-1.2-2.8-2.7 1.3-2.7 2.8-2.7 2.8 1.2 2.8 2.7zm-40.6-4.4c-2.5 0-4.5 2-4.5 4.4s2 4.4 4.5 4.4 4.5-2 4.5-4.4-2-4.4-4.5-4.4zm37.8 0c-2.5 0-4.5 2-4.5 4.4s2 4.4 4.5 4.4 4.5-2 4.5-4.4-2-4.4-4.5-4.4z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 26"><path d="M13.4 15.6c-1.5 0-2.8 1.3-2.8 2.8 0 1.6 1.2 2.9 2.8 2.9s2.8-1.3 2.8-2.9c0-1.5-1.3-2.8-2.8-2.8zm36.4 0c-1.5 0-2.8 1.3-2.8 2.8 0 1.6 1.2 2.9 2.8 2.9 1.5 0 2.8-1.3 2.8-2.9 0-1.5-1.2-2.8-2.8-2.8zm6-4c-4.7-1.9-12.6-1.5-12.6-1.5S36 5.7 32.6 4.9c-1.7-.4-4.8-.9-8-.9-2.3 0-4.7.2-6.9.9-2.6.8-7 2.2-10.9 4.3L2.2 7.8l-.7.8 1.9 2.6c-2.2 1.3-3.4 3.4-3.4 5C0 20 3.5 21 5.2 21h2.2v-2.6c0-3.4 2.7-6.1 6-6.1s6 2.7 6 6.1V21h24.5v-2.6c0-3.4 2.7-6.1 6-6.1s6 2.7 6 6.1V21l3.7-.3c1-1 1.5-1.8 1.5-3-.1-1.6-1.3-4.5-5.3-6.1zm-37.2-1.5c-1.5 0-4.2-.4-4.2-1.5 0-1.3 3-2.1 3.7-2.3 1.2-.3 2.6-.6 4.3-.7l1.5 4.5h-5.3zm7.4 0l-1.5-4.6h.7c3.5 0 5.4.4 6.9.8 1.9.5 6.5 2.6 8 3.7H26zm-8.1 8.3c0 2.5-2 4.6-4.5 4.6s-4.5-2-4.5-4.6c0-2.5 2-4.6 4.5-4.6s4.5 2.1 4.5 4.6zm36.4 0c0 2.5-2 4.6-4.5 4.6s-4.5-2-4.5-4.6c0-2.5 2-4.6 4.5-4.6s4.5 2.1 4.5 4.6z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 26"><path d="M58.7 11.5L45.2 9.8l-7.6-4.4c-1.7-1-2.8-1.5-5.3-1.5H13.5c-2.5 0-4.6.8-6.2 2.2l-5 4.5C1 11.7 0 13 0 15c0 2.1 1.1 4.2 2.5 5h5.1v-1.4c0-3.2 2.7-5.8 6-5.8s6 2.6 6 5.8V20h25.7v-1.4c0-3.2 2.7-5.8 6-5.8s6 2.6 6 5.8V20h3.2c.8-.9 1.3-2.1 1.3-3.6.2-2.5-1.2-4.6-3.1-4.9zm-45-1.5H7l2.3-2.7c1.1-1.2 3.1-1.8 5.1-1.8h1.5L13.7 10zm2.4 0l2-4.5h7.6l.8 4.5H16.1zm12.6 0L28 5.5h4.4c2.2 0 2.9.4 4.4 1.3l5.4 3.3H28.7zm-15.1 5.9c-1.6 0-2.8 1.2-2.8 2.7s1.3 2.7 2.8 2.7c1.6 0 2.8-1.2 2.8-2.7s-1.2-2.7-2.8-2.7zm37.8 0c-1.6 0-2.8 1.2-2.8 2.7s1.3 2.7 2.8 2.7 2.8-1.2 2.8-2.7-1.2-2.7-2.8-2.7zm-33.3 2.7c0 2.4-2 4.4-4.5 4.4s-4.5-2-4.5-4.4 2-4.4 4.5-4.4 4.5 2 4.5 4.4zm37.9 0c0 2.4-2 4.4-4.5 4.4S47 21 47 18.6s2-4.4 4.5-4.4c2.4 0 4.5 2 4.5 4.4z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62 26"><path d="M11.3 17.7c-1.6 0-2.8 1.3-2.8 2.8s1.3 2.8 2.8 2.8c1.6 0 2.8-1.3 2.8-2.8s-1.2-2.8-2.8-2.8zm40.9 0c-1.6 0-2.8 1.3-2.8 2.8s1.3 2.8 2.8 2.8S55 22 55 20.5s-1.3-2.8-2.8-2.8zm6.5-6.3L46.6 4c-2.6-1.4-5-3-10.3-3H15.7C6.5 1 4.2 4.3 3 7.2c0 0-3 6-3 8v2.2c0 2.1 1.1 3.6 2.5 4.5h2.8v-1.5c0-3.3 2.7-6 6-6s6 2.7 6 6V22H46v-1.5c0-3.3 2.7-6 6-6s6 2.7 6 6V22h2.5c.8-.9 1.3-2.2 1.3-3.8.2-2.5-.6-5.4-3.1-6.8zM14.1 9H5.6c.4-1 .6-1.5 1.1-2.8.9-2.1 3.8-3.2 8.8-3.2l-1.4 6zm2.1 0l1.4-6h11.2l1 6H16.2zM32 9l-1-6h5.3c4.3 0 6.9 1 9 2.2L52.1 9H32zM15.9 20.5c0 2.5-2 4.5-4.5 4.5s-4.5-2-4.5-4.5 2-4.5 4.5-4.5c2.4 0 4.5 2 4.5 4.5zm40.8 0c0 2.5-2 4.5-4.5 4.5s-4.5-2-4.5-4.5 2-4.5 4.5-4.5 4.5 2 4.5 4.5z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M3.5 16h-.2c-.2-.1-.3-.3-.3-.5v-2.7l-.7-.8H2c-.1 0-.2 0-.2-.1l-1-.5c-.1 0-.2-.1-.2-.2l-.5-1c-.1 0-.1-.1-.1-.2V2c0-.1 0-.2.1-.2l.5-1C.6.7.7.6.8.6l1-.5c0-.1.1-.1.2-.1h12c.1 0 .2 0 .2.1l1 .5c.1 0 .2.1.2.2l.5 1c.1 0 .1.1.1.2v8c0 .1 0 .2-.1.2l-.5 1c0 .1-.1.2-.2.2l-1 .5c0 .1-.1.1-.2.1H7.7l-3.9 3.9s-.2.1-.3.1zm-1.4-5h.4c.1 0 .3.1.4.2l1 1.1c.1 0 .1.1.1.3v1.7l3.1-3.1c.1-.1.3-.2.4-.2h6.4l.7-.4.4-.7V2.1l-.4-.7-.7-.4H2.1l-.7.4-.4.7v7.8l.4.7.7.4z"/><path d="M3 7h10v1H3zM3 4h10v1H3z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 60"><path d="M69.2 27c1.1 0 2.8 1.6 2.8 2.7v15.2c0 1-1.9 3.2-3 3.2h-3.5c-1 0-2.5 1-2.5 2v4l-5.7-5c-.4-.4-.8-1-1.3-1H43c-1 0-2-3-2-4h-4c0 3.1 2.6 7 5.7 7H55l9.5 8.4c.4.4.8.6 1.3.6.2 0 .2.1.2-.1v-8.9h3c3.1 0 6-3 6-6.2V29.7c0-3.1-2.6-5.7-5.7-5.7H59v3h10.2z" fill-rule="evenodd" clip-rule="evenodd" fill="#C4C4C4"/><path d="M48.2 37H26l-1.2.9L13 50V39l-2-2H7.5C5.4 37 4 35.8 4 33.7V7.5C4 5.4 5.4 4 7.5 4h41.1c2 0 3.4 1.4 3.4 3.5v26.1c0 2.1-1.4 3.4-3.5 3.4h-.3zm0-37H7.5C3.4 0 0 3.3 0 7.5v26.1c0 4.1 3.4 7.5 7.5 7.5L9 41v13l3.3 2 14.4-15h21.8c4.1 0 7.5-3.3 7.5-7.4V7.5C56 3.3 52.6 0 48.5 0h-.3z" fill-rule="evenodd" clip-rule="evenodd" fill="#C4C4C4"/><path fill="#FF7500" d="M10 9h34v4H10z"/><path fill="#C4C4C4" d="M10 27h22v4H10zM10 18h34v4H10z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M.03 14.142L14.174 0l1.414 1.414L1.445 15.556z"/><path d="M1.415.03l14.142 14.143-1.415 1.414L0 1.445z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 21"><path d="M6 18c.5 0 1-.5 1-1V6c0-.5-.5-1-1-1s-1 .5-1 1v11c0 .5.5 1 1 1zM10 18c.5 0 1-.5 1-1V6c0-.5-.5-1-1-1s-1 .5-1 1v11c0 .5.5 1 1 1z"/><path d="M15 2h-4V0H5v2H1c-.5 0-1 .5-1 1v1h1v15c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4h1V3s-.5-1-1-1zm-2 17H3V4h10v15z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><path d="M6.6 17.6l4.4-1.1-3.3-3.3"/><path d="M16 19.3l-1.1.7H2.7l-.7-.7V2.7l.7-.7H15l1 .7v.6l1.6-1.9L15.9 0H1.8C1.1 0 0 1.1 0 1.7v18.5c0 .7 1.1 1.8 1.7 1.8h14.1c.6 0 2.1-1.2 2.1-1.7v-8.2l-2 2.2v5z"/><path d="M12.075 15.375L8.753 12.05l9.902-9.896 3.323 3.325z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M7 18v-8H4V7h3V4.5C7.1 2.9 8 1 10 1h3v3h-3v3h3v3h-3v8H7z" fill-rule="evenodd" clip-rule="evenodd"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74 35"><path fill="#FFF" d="M0 15v4.5h74V15H0"/><path fill="#003468" d="M0 0v16.9h74V0H0"/><path d="M0 35h65.3c4.9 0 8.7-3.9 8.7-8.5v-8.4H0V35z" fill="#FF7500"/><path d="M6.7 31.4h-.1c-1.5 0-2.8-1-2.8-2.7 0-1 1.6-1 1.6 0 0 .7.5 1.2 1.2 1.2h.1c.7 0 1.2-.4 1.2-1 0-1.7-4-1.9-4-4.4v-.3c0-1.5 1.5-2.3 2.7-2.3h.1c1.4 0 2.7.9 2.7 2.2 0 1-1.6 1-1.6 0 0-.4-.4-.7-1.1-.7h-.1c-.6 0-1.1.3-1.1.8v.2c0 1.1 4 1.6 4 4.4.1 1.6-1.2 2.6-2.8 2.6zM13.7 31.4h-.1c-1.5 0-2.8-1.2-2.8-2.7v-4.3c0-1.5 1.3-2.7 2.8-2.7h.1c1.4 0 2.6.9 2.8 2.3v.1c0 .5-.4.8-.8.8s-.7-.2-.8-.7c-.1-.6-.6-.9-1.2-.9h-.1c-.7 0-1.2.5-1.2 1.1v4.3c0 .6.5 1.1 1.2 1.1h.1c.6 0 1.1-.4 1.2-.9.1-.5.4-.7.8-.7s.8.3.8.8v.2c-.2 1.3-1.4 2.2-2.8 2.2zM21.7 24.5c0-.6-.5-1.1-1.2-1.1h-.1c-.7 0-1.2.5-1.2 1.1v4.2c0 .6.5 1.1 1.2 1.1h.1c.7 0 1.2-.5 1.2-1.1v-4.2zm-1.1 6.9h-.1c-1.5 0-2.8-1.2-2.8-2.7v-4.2c0-1.5 1.3-2.7 2.8-2.7h.1c1.5 0 2.8 1.2 2.8 2.7v4.2c0 1.5-1.3 2.7-2.8 2.7zM27.9 31.4h-.1c-1.5 0-2.8-1.2-2.8-2.7v-6.1c0-.5.4-.8.8-.8s.8.3.8.8v6.1c0 .6.5 1.2 1.2 1.2h.1c.7 0 1.2-.5 1.2-1.2v-6.1c0-.5.4-.8.8-.8s.8.3.8.8v6.1c0 1.5-1.2 2.7-2.8 2.7zM36.4 23.5h-1.1v7.1c0 .5-.4.8-.8.8s-.8-.3-.8-.8v-7.1h-1.1c-.5 0-.8-.4-.8-.8s.3-.8.8-.8h3.8c.5 0 .8.4.8.8s-.2.8-.8.8zM43.9 31.3h-3.6c-.5 0-.8-.5-.8-.9 0-.2 0-.3.1-.5l3.2-5c.2-.3.2-.4.2-.6v-.1c0-.4-.4-.8-.8-.8-.5 0-.8.4-.8.8v.2c0 .5-.4.8-.8.8s-.8-.3-.8-.8v-.2c0-1.3 1.1-2.3 2.4-2.3 1.3 0 2.4 1 2.4 2.3v.2c0 .5-.2.9-.5 1.4l-2.5 4.1H44c.5 0 .8.4.8.8-.1.2-.3.6-.9.6zM50.3 29.5H50v1.2c0 .5-.4.8-.8.8s-.8-.3-.8-.8v-1.2h-2.2c-.6 0-.9-.3-.9-.8 0-.1 0-.3.1-.4l2.6-5.9c.2-.3.4-.5.7-.5.4 0 .8.3.8.8 0 .1 0 .2-.1.3l-2.3 5h1.2v-.8c0-.5.4-.8.8-.8s.8.3.8.8v.8h.3c.5 0 .8.4.8.8s-.2.7-.7.7z" fill="#003468"/><path d="M9.1 5.5H5.8v2.2H8c.5 0 .8.4.8.8s-.3.8-.8.8H5.8v3.4c0 .5-.4.8-.8.8s-.8-.3-.8-.8v-8c0-.4.4-.8.8-.8h4.1c.5 0 .8.4.8.8s-.3.8-.8.8zM11.9 13.4c-.4 0-.8-.3-.8-.8v-8c0-.5.4-.8.8-.8s.8.3.8.8v8c0 .5-.4.8-.8.8zM20 13.4h-.2c-.5 0-.7-.3-.9-.7l-2.2-5.1v5c0 .5-.4.8-.8.8s-.8-.3-.8-.8v-8c0-.4.4-.8.8-.8h.2c.5 0 .7.3.9.7l2.2 4.9V4.6c0-.5.4-.8.8-.8s.8.3.8.8v8c0 .4-.4.8-.8.8zM25.7 6.7l-.9 2.9h1.8l-.9-2.9zm2.7 6.7c-.3 0-.6-.2-.7-.6l-.5-1.6h-2.8l-.5 1.6c-.1.4-.4.6-.8.6s-.8-.3-.8-.8v-.3l2.5-7.9c.2-.6.5-.7.9-.7.3 0 .7.1.9.7l2.5 7.9v.3c.1.5-.3.8-.7.8zM35.5 13.4h-.2c-.5 0-.7-.3-.9-.7l-2.2-5.1v5c0 .5-.4.8-.8.8s-.8-.3-.8-.8v-8c0-.4.4-.8.8-.8h.2c.5 0 .7.3.9.7l2.2 4.9V4.6c0-.5.4-.8.8-.8s.8.3.8.8v8c0 .4-.3.8-.8.8zM41.3 13.4h-.1c-1.5 0-2.8-1.2-2.8-2.7V6.5c0-1.5 1.2-2.7 2.8-2.7h.1c1.4 0 2.6.9 2.8 2.3v.1c-.1.5-.5.8-.9.8s-.7-.2-.8-.7c-.1-.6-.6-.9-1.2-.9h-.1c-.7 0-1.2.5-1.2 1.1v4.2c0 .6.5 1.1 1.2 1.1h.1c.6 0 1.1-.4 1.2-.9.1-.5.4-.7.8-.7s.8.3.8.8v.2c-.2 1.2-1.3 2.2-2.7 2.2zM50.8 13.3h-4.1c-.4 0-.8-.4-.8-.8V4.7c0-.4.4-.8.8-.8h4.1c.5 0 .8.4.8.8s-.3.8-.8.8h-3.3v2.2h2.2c.5 0 .8.4.8.8s-.3.8-.8.8h-2.2v2.5h3.3c.5 0 .8.4.8.8 0 .3-.3.7-.8.7z" fill="#FFF"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" height="512" width="512" version="1"><g fill-rule="evenodd"><path fill="#fff" d="M512 512H0V0h512z"/><path fill="#df0000" d="M512 512H0V341.33h512zM512 170.8H0V.13h512z"/></g></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" height="512" width="512"><g fill-rule="evenodd" stroke-width="1pt"><path d="M0 0h170.664v512.01H0z"/><path fill="#ffd90c" d="M170.664 0h170.664v512.01H170.664z"/><path fill="#f31830" d="M341.328 0h170.665v512.01H341.328z"/></g></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" height="512" width="512" version="1"><g fill-rule="evenodd" stroke-width="1pt"><path fill="#ffe600" d="M0 341.338h512.005v170.67H0z"/><path d="M0 0h512.005v170.67H0z"/><path fill="red" d="M0 170.67h512.005v170.668H0z"/></g></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" height="512" width="512" version="1"><g fill-rule="evenodd" stroke-width="1pt"><path fill="#c00" d="M.04 0h511.92v512.015H.04z"/><path fill="#ff3" d="M0 127.996h512.024V384.01H0z"/></g></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" height="512" width="512" version="1"><g fill-rule="evenodd" stroke-width="1pt"><path fill="#fff" d="M0 0h512.005v512H0z"/><path fill="#00267f" d="M0 0h170.667v512H0z"/><path fill="#f31830" d="M341.333 0H512v512H341.333z"/></g></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" height="512" width="512" version="1"><g fill-rule="evenodd" stroke-width="1pt"><path fill="#fff" d="M0 0h512.005v512H0z"/><path fill="#005700" d="M0 0h170.667v512H0z"/><path fill="#fc0000" d="M341.333 0H512v512H341.333z"/></g></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" height="512" width="512"><g fill-rule="evenodd"><path fill="red" d="M0 0h511.993v171.39H0z"/><path fill="#fff" d="M0 171.39h511.993v171.587H0z"/><path fill="#0098ff" d="M0 342.977h511.993v169.007H0z"/></g></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" height="512" width="512" version="1"><g fill-rule="evenodd" stroke-width="1pt" transform="matrix(.48166 0 0 .71932 0 0)"><rect rx="0" ry="0" height="708.66" width="1063" fill="#fff"/><rect rx="0" ry="0" height="236.22" width="1063" y="475.56" fill="#21468b"/><path fill="#ae1c28" d="M0 0h1063v236.22H0z"/></g></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" height="512" width="512" version="1"><g fill-rule="evenodd"><path fill="#fff" d="M512 512H0V0h512z"/><path stroke-width="1pt" fill="#df0000" d="M512 512H0V256h512z"/></g></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M7.2 8.9c0-1.1 2.4-1.4 2.4-4 0-1.6-.1-2.5-1.3-3.1 0-.4 2.1-.1 2.1-.9-.5.1-4.7.1-4.7.1S1 1.1 1 5.2c0 4.1 4.1 3.6 4.1 3.6v1c0 .4.5.3.6 1.1-.3 0-5.7-.1-5.7 3.5C0 18.2 4.8 18 4.8 18s5.5.3 5.5-4.3c0-2.8-3.1-3.7-3.1-4.8zM3.1 5.4c-.4-1.6.2-3.2 1.3-3.5 1.1-.3 2.4.8 2.8 2.4S7.1 7.5 6 7.8c-1.1.3-2.4-.7-2.9-2.4zm2.4 11.4c-1.9.2-3.5-.9-3.6-2.3-.1-1.4 1.4-2.7 3.3-2.8 1.9-.1 3.5.9 3.6 2.3.1 1.4-1.4 2.7-3.3 2.8zM18 4.1V5h-3.1v3H14V5h-3v-.9h3V1h.9v3.1"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.98 4.888c.568-.586 1.095-1.173 1.667-1.713 1.034-.978 2.29-1.436 3.702-1.523 1.203-.074 2.37.06 3.46.587 1.687.813 2.666 2.187 3.035 4 .428 2.09-.06 4.014-1.135 5.82-.61 1.03-1.422 1.89-2.26 2.734-1.506 1.517-3.006 3.04-4.507 4.563-1.15 1.167-2.295 2.338-3.445 3.506-.367.373-.626.374-.99.004-2.144-2.172-4.287-4.344-6.425-6.52-.887-.9-1.79-1.79-2.634-2.728C1.27 12.312.434 10.805.13 9.052-.195 7.165.058 5.38 1.24 3.813c.932-1.237 2.22-1.88 3.73-2.106.957-.143 1.912-.102 2.857.11 1.274.288 2.28 1.01 3.15 1.952.342.37.675.75 1.004 1.117z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M6.8 19L20 5.7 18.4 4 6.8 15.7l-5.2-5.3L0 12.1"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74 35"><path fill="#FFF" d="M0 15v4.5h74V15H0"/><path fill="#003468" d="M0 0v16.9h74V0H0"/><path d="M0 35h65.3c4.9 0 8.7-3.9 8.7-8.5v-8.4H0V35z" fill="#FF7500"/><path d="M6.7 31.4h-.1c-1.5 0-2.8-1-2.8-2.7 0-1 1.6-1 1.6 0 0 .7.5 1.2 1.2 1.2h.1c.7 0 1.2-.4 1.2-1 0-1.7-4-1.9-4-4.4v-.3c0-1.5 1.5-2.3 2.7-2.3h.1c1.4 0 2.7.9 2.7 2.2 0 1-1.6 1-1.6 0 0-.4-.4-.7-1.1-.7h-.1c-.6 0-1.1.3-1.1.8v.2c0 1.1 4 1.6 4 4.4.1 1.6-1.2 2.6-2.8 2.6zM13.7 31.4h-.1c-1.5 0-2.8-1.2-2.8-2.7v-4.2c0-1.5 1.3-2.7 2.8-2.7h.1c1.4 0 2.6.9 2.8 2.3v.1c0 .5-.4.8-.8.8s-.7-.2-.8-.7c-.1-.6-.6-.9-1.2-.9h-.1c-.7 0-1.2.5-1.2 1.1v4.2c0 .6.5 1.1 1.2 1.1h.1c.6 0 1.1-.4 1.2-.9.1-.5.4-.7.8-.7s.8.3.8.8v.1c-.2 1.4-1.4 2.3-2.8 2.3zM20.6 31.4h-.1c-1.5 0-2.8-1.2-2.8-2.7v-4.2c0-1.5 1.3-2.7 2.8-2.7h.1c1.5 0 2.8 1.2 2.8 2.7v4.2c0 1.5-1.3 2.7-2.8 2.7zm1.1-6.9c0-.6-.5-1.1-1.2-1.1h-.1c-.7 0-1.2.5-1.2 1.1v4.2c0 .6.5 1.1 1.2 1.1h.1c.7 0 1.2-.5 1.2-1.1v-4.2zM27.9 31.4h-.1c-1.5 0-2.8-1.2-2.8-2.7v-6.1c0-.5.4-.8.8-.8s.8.3.8.8v6.1c0 .6.5 1.2 1.2 1.2h.1c.7 0 1.2-.5 1.2-1.2v-6.1c0-.5.4-.8.8-.8s.8.3.8.8v6.1c0 1.5-1.2 2.7-2.8 2.7zM36.4 23.5h-1.1v7.1c0 .5-.4.8-.8.8s-.8-.3-.8-.8v-7.1h-1.1c-.5 0-.8-.4-.8-.8s.3-.8.8-.8h3.8c.5 0 .8.4.8.8s-.2.8-.8.8zM43.9 31.3h-3.6c-.5 0-.8-.5-.8-.9 0-.2 0-.3.1-.5l3.2-5c.2-.3.2-.4.2-.6v-.1c0-.4-.4-.8-.8-.8-.5 0-.8.4-.8.8v.2c0 .5-.4.8-.8.8s-.8-.3-.8-.8v-.2c0-1.3 1.1-2.3 2.4-2.3 1.3 0 2.4 1 2.4 2.3v.1c0 .5-.2.9-.5 1.4l-2.5 4.1H44c.5 0 .8.4.8.8-.1.3-.3.7-.9.7zM50.3 29.5H50v1.2c0 .5-.4.8-.8.8s-.8-.3-.8-.8v-1.2h-2.2c-.6 0-.9-.3-.9-.8 0-.1 0-.3.1-.4l2.6-5.9c.2-.3.4-.5.7-.5.4 0 .8.3.8.8 0 .1 0 .2-.1.3l-2.3 5h1.2v-.8c0-.5.4-.8.8-.8s.8.3.8.8v.8h.3c.5 0 .8.4.8.8s-.2.7-.7.7z" fill="#003468"/><path d="M5 13.4c-.4 0-.8-.3-.8-.8v-8c0-.5.4-.8.8-.8s.8.3.8.8v8c0 .5-.4.8-.8.8zM14.5 13.4c-.4 0-.8-.3-.8-.8v-5l-1.2 2.7c-.2.4-.6.5-.8.5-.3 0-.6-.1-.8-.5L9.7 7.6v5c0 .5-.4.8-.8.8s-.8-.3-.8-.8v-8c0-.4.4-.8.8-.8h.2c.5 0 .7.3.9.7l1.7 3.8 1.7-3.8c.2-.4.4-.7.9-.7h.2c.4 0 .8.4.8.8v8c0 .5-.4.8-.8.8zM23.9 13.4c-.4 0-.8-.3-.8-.8v-5l-1.2 2.7c-.2.4-.6.5-.8.5-.3 0-.6-.1-.8-.5l-1.2-2.7v5c0 .5-.4.8-.8.8s-.8-.3-.8-.8v-8c0-.4.4-.8.8-.8h.2c.5 0 .7.3.9.7l1.7 3.8 1.7-3.8c.2-.4.4-.7.9-.7h.2c.4 0 .8.4.8.8v8c0 .5-.4.8-.8.8zM29.6 13.4h-.1c-1.5 0-2.8-1.2-2.8-2.7V6.5c0-1.5 1.3-2.7 2.8-2.7h.1c1.5 0 2.8 1.2 2.8 2.7v4.2c0 1.5-1.3 2.7-2.8 2.7zm1.2-6.9c0-.6-.5-1.1-1.2-1.1h-.1c-.7 0-1.2.5-1.2 1.1v4.2c0 .6.5 1.1 1.2 1.1h.1c.7 0 1.2-.5 1.2-1.1V6.5zM37.2 13.3h-2c-.4 0-.8-.4-.8-.8V4.7c0-.4.4-.8.8-.8h2c1.6 0 2.7 1.1 2.7 2.6 0 .9-.4 1.4-.9 1.9.6.5 1 1.2 1 2v.1c0 1.6-1.3 2.8-2.8 2.8zm0-7.8H36v2.2h1.2c.6 0 1.1-.5 1.1-1.2s-.5-1-1.1-1zm1.2 5c0-.7-.6-1.2-1.2-1.2H36v2.5h1.2c.7 0 1.2-.5 1.2-1.2v-.1zM42.4 13.4c-.4 0-.8-.3-.8-.8v-8c0-.5.4-.8.8-.8s.8.3.8.8v8c.1.5-.3.8-.8.8zM49.8 13.3h-3.5c-.4 0-.8-.4-.8-.8V4.6c0-.5.4-.8.8-.8s.7.3.7.8v7.1h2.7c.5 0 .8.4.8.8.1.4-.2.8-.7.8zM52.2 13.4c-.4 0-.8-.3-.8-.8v-8c0-.5.4-.8.8-.8s.8.3.8.8v8c0 .5-.4.8-.8.8zM60 13.3h-4.1c-.4 0-.8-.4-.8-.8V4.7c0-.4.4-.8.8-.8H60c.5 0 .8.4.8.8s-.3.8-.8.8h-3.3v2.2h2.2c.5 0 .8.4.8.8s-.3.8-.8.8h-2.2v2.5H60c.5 0 .8.4.8.8 0 .3-.3.7-.8.7zM67.3 13.4h-.2c-.5 0-.7-.3-.9-.7L64 7.6v5c0 .5-.4.8-.8.8s-.8-.3-.8-.8v-8c0-.4.4-.8.8-.8h.2c.5 0 .7.3.9.7l2.2 4.9V4.6c0-.5.4-.8.8-.8s.8.3.8.8v8c0 .4-.4.8-.8.8z" fill="#FFF"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M8 1c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.14-7-7 3.14-7 7-7m0-1C3.588 0 0 3.588 0 8s3.588 8 8 8 8-3.588 8-8-3.588-8-8-8z"/><path d="M9.333 11.667c0 .458-.238 1-.762 1H7.43c-.524 0-.763-.542-.763-1V8.333c0-.458.238-1 .762-1H8.57c.523 0 .762.542.762 1v3.334z"/><circle cx="8" cy="4.667" r="1.333"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 22"><path d="M18 15.4c-.5 1.1-.7 1.6-1.4 2.5-.9 1.4-2.1 3-3.7 3-1.4 0-1.7-.9-3.6-.9-1.9 0-2.2.9-3.6.9-1.5 0-2.7-1.5-3.6-2.9C-.4 14.2-.6 9.8.9 7.5 2 5.9 3.7 4.9 5.3 4.9c1.6 0 2.7.9 4 .9 1.3 0 2.1-.9 4-.9 1.4 0 2.9.8 4 2.1-3.4 2-2.9 7.1.7 8.4z" fill-rule="evenodd" clip-rule="evenodd"/><path d="M11.9 3.4c.7-.9 1.2-2.1 1-3.4-1.1.1-2.4.8-3.2 1.7-.7.8-1.3 2.1-1 3.3 1.2.1 2.5-.6 3.2-1.6z" fill-rule="evenodd" clip-rule="evenodd"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><ellipse cx="32" cy="22.1" rx="2" ry="2"/><ellipse cx="23.9" cy="3.2" rx="2.5" ry="3.2"/><path d="M42.7 7h4.6c.6 0 1-.3 1-.9v-.2l-1-3.8c-.2-1-1.1-1.7-2.2-1.7s-2 .8-2.2 1.8l-1 3.8v.1c-.2.6.2.9.8.9zM37.4 20.9c-.5-.3-1.1-.1-1.4.4l-2.4 4.6-.3.1h-2.9L28 24.1c-.4-.3-1.1-.3-1.4.1-.3.4-.1 1 .4 1.4l2.8 2V40h4.4l1.2-13.4 2.4-4.4c.3-.4.1-1-.4-1.3zM27.8 11.8v-.3c0-1.6-1.3-3-2.9-3.2l-5-.4h-.3c-1.7 0-3 1.2-3.2 2.9l-.7 7.7v.3c0 1 .4 1.9 1.2 2.5l.6 8.7c.9 0 1.8.3 2.5.8l1-1c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-.8 1c.5.8 1.1 1.7 1.1 2.8v5h1.6l1.1-18c.9-.5 1.5-1.4 1.6-2.5l.8-7.7z"/><path d="M17.3 32H15c-.9 0-1.7-.6-1.9-1.4l-.4-1.3c-.1-.3-.2-.6-.5-.6-.4 0-.5.3-.5.8v1l-2.9.7c-.2.1-.5.2-.6.5-.2.3-.2.5-.1.7l.5 1c.2.2.4.6.6.6h1.5s1.3-.1 1.3 1v5h2v-3h2.3c1.1 0 2.7.9 2.7 2v1h2v-5c0-1.7-2.1-3-3.7-3zM41.1 10.8l-3.8 8.1c-.2.5 0 1 .4 1.3.2.1.3.1.5.1.3 0 .7-.2.9-.5l1.9-3 .1 3.1c0 .1 0 .1-.1.2l-3 7.5c0 .1-.1.3-.1.4 0 .6.5 1 1 1h3l1.6 11h2.8l1.6-11h2.8c.6 0 1.1-.5 1.1-1 0-.1.1-.3 0-.4l-2.9-7.5.2-8c0-.8-.3-1.6-.9-2.2-.4-.6-1.2-.9-2.1-.9h-2.3c-.8 0-1.6.3-2.2.9-.2.3-.4.6-.5.9"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><circle cx="32.5" cy="4.5" r="4.5"/><path d="M49 18.5c0-1.4-1.1-2.5-2.5-2.5-1 0-1.8.6-2.2 1.3C41.6 14.1 37.1 12 32 12c-4.3 0-8.2 1.5-10.9 4-.8-1-1.4-2.1-2-2.6-.5-.5-1.1-.4-1.1-.4v6.4c-1.1.6-1.6 1.3-2 2.6h-3c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h3c1 2.1 3.3 3.7 6 4.3V38c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-1.3c1 .2 2 .3 3 .3s2-.1 3-.3V38c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-4.2h.1c3.1-2.3 4.9-5.6 4.9-9.3 0-1.2-.2-2.4-.6-3.5h.1c1.4 0 2.5-1.1 2.5-2.5zm-29 6.7c-1 0-1.8-.6-2-1.5 0-.1 0-.2-.1-.3V23c0-1.2 1-2.2 2.2-2.2 1.2 0 2.2 1 2.2 2.2s-1.1 2.2-2.3 2.2z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><path d="M3.7 36l13-7 5 1 4-5 8-2 5 3 9-8 9 4v18h-53v-4zM7 15.4l-.7-8S25.4.5 26.2.2c1-.4 1.6.2 1.6.2l6.7 5.1 12.8-3.2c.8-.2 1.6.2 1.8.8s2.4 6.6 2.4 6.6l-1.7 1.4-.2-.7C48.5 7.5 45.3 6 42.4 7c-2.9 1.1-4.4 4.3-3.4 7.2l.2.7-2 .7-13.3 4.8-.2-.7c-1.1-2.9-4.3-4.4-7.2-3.4-2.9 1.1-4.4 4.3-3.4 7.2l.2.4-2.8.5-3.5-9zm13.9-5.1l-2.2-6L8.1 8.2l.9 6.5 11.9-4.4zm11.3-4.1l-5.5-4.8-6 2.2 2.2 6 9.3-3.4z"/><path d="M48.8 13.1c0 2.3-1.9 4.2-4.2 4.2-2.3 0-4.2-1.9-4.2-4.2 0-2.3 1.9-4.2 4.2-4.2 2.3-.1 4.2 1.8 4.2 4.2zm-4.3-2.5c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5zM22.9 22.1c0 2.3-1.9 4.2-4.2 4.2-2.3 0-4.2-1.9-4.2-4.2 0-2.3 1.9-4.2 4.2-4.2 2.3-.1 4.2 1.8 4.2 4.2zm-4.3-2.5c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5zM8.8 23.3c.2.5-.1 1.1-.6 1.3l-.9.3c-.5.2-1.1-.1-1.3-.6l-2.4-6.6c-.2-.5.1-1.1.6-1.3l.9-.3c.5-.2 1.1.1 1.3.6l2.4 6.6z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><path d="M28.5 4.7c1.1 2.6.7 5.4-.7 7.3-2.4-.3-4.6-2-5.7-4.7-1.1-2.6-.7-5.4.7-7.3 2.4.3 4.6 2 5.7 4.7zm7.1 15.2c.3 2.4 2 4.6 4.7 5.7 2.6 1.1 5.3.9 7.2-.6-.3-2.4-1.9-4.8-4.6-5.9-2.6-1.1-5.4-.7-7.3.8zM12.5 25c1.9 1.5 4.7 1.7 7.3.6 2.6-1.1 4.4-3.3 4.7-5.7-1.9-1.5-4.7-1.8-7.3-.7-2.7 1-4.4 3.4-4.7 5.8zm23.1-9.7c1.9 1.5 4.7 1.8 7.3.7 2.6-1.1 4.2-3.6 4.6-6-1.9-1.5-4.6-1.6-7.2-.5-2.7 1.1-4.4 3.4-4.7 5.8zM32.3 12c2.4-.3 4.6-2 5.7-4.7 1.1-2.6.7-5.4-.7-7.3-2.4.3-4.6 2-5.7 4.7-1.1 2.6-.7 5.4.7 7.3zm8.2 25c-3-2-8-2.4-8-8v-6c0-2.1 1.5-3.8 2.6-5 .5-.5.4-1.3-.1-1.8s-1.3-.4-1.8.1c-.7.8-1.5 1.7-2.1 2.9-.2-1.9-.6-3.9-1.4-6-.2-.6-1-1-1.6-.7-.6.2-1 1-.7 1.6.8 2 1.1 4 1.3 5.8-.6-.5-1.3-.9-2.2-1.3-.6-.3-1.4 0-1.6.6s0 1.4.6 1.6c.8.4 2 .8 2 1.3V29c0 5.6-5 6-8 8 3.1 1 8 0 9-2l1 5h1l1-5c1 2 6.1 3 9 2zM12.5 10c.3 2.4 2 4.9 4.7 6 2.6 1.1 5.4.7 7.3-.7-.3-2.4-2-4.6-4.7-5.7-2.6-1.2-5.4-1.1-7.3.4z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><style><![CDATA[\r\n	.st0{fill-rule:evenodd;clip-rule:evenodd;}\r\n]]></style><circle cx="30" cy="25" r="1.5"/><path class="st0" d="M27.6 27.4l-.7-4.4H31c2.1 0 2.9.3 4.3 1.1l5.4 3.3H27.6zm-11.7 0l2.6-3c1.1-1.2 2.4-1.5 4.6-1.5h1.6l.7 4.4h-9.5zm40.4 1.2l-13-1.7-7.3-4.1c-1.6-.9-2.6-1.2-5.1-1.2h-8.7c-2.4 0-3.5.3-5.1 1.2l-5 3.5-8.5 1.1c-2 0-3.7 2.1-3.7 4.8 0 2.1 1.2 4 2.5 4.8h4.3v-1.5c0-3.2 2.6-5.8 5.8-5.8s5.8 2.6 5.8 5.8V37h25.1v-1.5c0-3.2 2.6-5.8 5.8-5.8 3.2 0 5.8 2.6 5.8 5.8V37h3.1c1-.9 1.8-2.4 1.8-3.9.1-2.4-1.8-4.2-3.6-4.5zm-7 4.3c-1.5 0-2.7 1.2-2.7 2.7 0 1.5 1.2 2.7 2.7 2.7 1.5 0 2.7-1.2 2.7-2.7.1-1.5-1.2-2.7-2.7-2.7zm0 7.1l-2.2-.6-1.6-1.6-.5-2.2.6-2.2 1.6-1.6 2.2-.6 2.2.6 1.6 1.6.6 2.2-.6 2.2-1.6 1.6-2.3.6zm-36.7-7.1c-1.5 0-2.7 1.2-2.7 2.7 0 1.5 1.2 2.7 2.7 2.7 1.5 0 2.7-1.2 2.7-2.7 0-1.5-1.2-2.7-2.7-2.7zm0 7.1l-2.2-.6-1.6-1.6-.6-2.2.6-2.2 1.6-1.6 2.2-.6 2.2.6 1.6 1.6.6 2.2-.6 2.2-1.6 1.6-2.2.6z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40"><style><![CDATA[\r\n	.st0{fill:#010202;}\r\n]]></style><path class="st0" d="M2.5 18c7 2.6 8.1-5.6 14-5l-1 2c-3.5-.2-3 7-8 7-2 0-3.7-1.1-5-4zM39.5 34h4.8c1.1 0 1.7-.8 1.3-1.9l-2-5.2-1.7 2.3 1.3 2.8h-2.8l-.9 2zM22.2 31.2l1.5.8c1.4.8 2 1.6 2.3 2.4.3.8.5 1.5.5 1.5h2l-.5-2c-.3-1.2-1.4-2.9-2.9-3.6L19.9 28l2.3 3.2z"/><path class="st0" d="M16.2 22.1l-3.5 2.6c-.9.7-.9 1.8-.1 2.5l5 4.5c.8.7 1.9 2.2 2.3 3.2l.9 2.1h2.5l-1.5-3.4c-.4-1-1.4-2.5-2.1-3.3l-2.7-3 7.5-4.3h3s5.1 1.4 9.6 2.4L32.5 40h1.7l7.2-14c4 0 6-15 8-15s3.3.6 5 1.4c1.7.8 3-.4 3-1.4s-.4-1.4-.8-1.7c-1-.7-7.2-5.8-7.2-5.8V0C48 0 41.2 12 37.2 12h-1.8v3.8c0 2-2.2 4.2-4.2 4.2h-2.6c-2 0-4.2-2.2-4.2-4.2V12h-2c-3.7 0-7 4-7 7 .1 1.2.4 2.3.8 3.1z"/><path class="st0" d="M32.5 11h-5c-.6 0-1 .4-1 1v3c0 1.7 1.3 3 3 3h1c1.7 0 3-1.3 3-3v-3c0-.6-.4-1-1-1z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 6c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/><path d="M17.7 11H20V9h-2.3c-.2-3.1-2.4-5.2-5.2-6.2-.2 0-.4-.1-.5-.2-.5-.1-.5-.2-1-.2V0H9v2.4c-2.8.2-4.8 1.9-6 4.4-.3.8-.5 1.2-.7 2.2H0v2h2.3c.1.7.2 1 .5 1.7.2.3.3.7.5 1 .2.3.3.5.5.8 1.3 1.8 2.9 3 5.2 3.2V20h2v-2.3c3.8-.4 6.3-2.9 6.7-6.7zM10 16.5c-2 0-3.8-.9-5-2.3-.2-.3-.5-.7-.7-1-.5-.9-.8-2-.8-3.1 0-.7.1-1.3.3-2 .2-.6.4-1.3.9-1.9.4-.6 1-1.2 1.6-1.6 1-.8 2.3-1.2 3.7-1.2h.8c1.9.2 3.5 1.3 4.6 2.8l.3.6c.3.4.4.9.5 1.2.2.6.3 1.2.3 2v.7c0 .4-.1.8-.2 1.2-.8 2.6-3.3 4.6-6.3 4.6z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M9 11.9l-9-6v7.5c0 .9.7 1.6 1.6 1.6h14.7c.9 0 1.6-.7 1.6-1.6V6v-.2L9 11.9zm0-1.6l8.5-5.9c-.3-.2-.9-.4-1.3-.4H1.8c-.4 0-1 .2-1.3.4L9 10.3z" fill-rule="evenodd" clip-rule="evenodd"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 27 27"><path d="M6.8 1l1.9.5s1 .3.7 1.3l.4 5.3s0 .8-.8 1.1l-1.3.5s-.9.6-.3 1.4c.5.9 4.1 6.5 4.1 6.5s.3.4.8.4c.2 0 .4-.1.6-.2l1-.7s.3-.2.6-.2c.1 0 .2 0 .3.1.4.2 3.7 1.9 3.7 1.9s.8.4.5 1.4c-.3 1-.7 2.5-.7 2.5S16.9 24 15.8 24h-.3c-1.1-.3-14.2-4.4-11-21.1C4.7 1.8 6.8 1 6.8 1"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 43"><path d="M27 7.2c-2-3.4-5.1-5.8-8.8-6.7C17 .2 15.7 0 14.5 0 7.7 0 1.9 4.6.4 11.2c-1 4.3.3 8.3 1.7 11.5C5 29.4 9 35.3 12.6 40.2c.3.4.6.8 1 1.3l1 1.2.4-.6c.5-.7 1.1-1.5 1.6-2.2 1.1-1.6 2.2-3.1 3.3-4.6 3.4-5.1 6.9-10.7 8.7-17 .9-3.8.4-7.7-1.6-11.1zM14.5 21.5c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 44"><path d="M14.1 42c-.4-.5-.7-.9-1-1.3-3.6-4.9-7.6-10.8-10.5-17.5C1.2 19.9-.2 16 .9 11.7 2.4 5.1 8.2.5 15 .5c1.2 0 2.5.2 3.7.5 3.7 1 6.9 3.3 8.8 6.7 2 3.4 2.5 7.3 1.4 11.1-1.8 6.3-5.2 11.9-8.7 17-1 1.6-2.1 3-3.3 4.6-.5.7-1.1 1.5-1.6 2.2l-.4.6-.8-1.2z" fill="#FF7500"/><path d="M15 1c1.2 0 2.4.1 3.6.5 7.5 1.9 12 9.7 9.9 17.2-1.7 6.2-5.1 11.6-8.6 16.9-1.5 2.3-3.2 4.4-4.8 6.8-.6-.7-1.1-1.3-1.5-1.9C9.5 34.9 5.7 29.3 3 23 1.4 19.4.4 15.8 1.3 11.8 2.9 5.3 8.6 1 15 1m0-1C8 0 2 4.8.4 11.6c-1.1 4.5.3 8.5 1.7 11.8C5 30.1 9.1 36.1 12.7 41c.3.4.7.9 1 1.3.2.2.3.4.5.7l.8 1.1.8-1.1c.5-.7 1.1-1.5 1.6-2.2 1.1-1.6 2.2-3.1 3.3-4.6 3.4-5.2 6.9-10.7 8.7-17.2 1.1-4 .6-8-1.4-11.5s-5.3-6-9.2-7C17.6.2 16.3 0 15 0z" fill="#FFF"/><path d="M24.5 13.4c0-.9-1.1-.7-1.5-.7h-1c-.1-.6-.4-1-.5-1.1-.7-1.2-1.5-2-2.9-2h-7.3c-1.4 0-2.1 1.1-2.8 2.3-.2.1-.3.1-.4.7h-1c-.5 0-1.6-.2-1.6.7 0 .5 1.2.7 2 .8-.3 1.1-.2 2-.2 3.5V21c0 .5.7.7 1.2.7s1.2-.2 1.2-.7v-1h10.5v.9c0 .5.6.8 1.1.8h.1c.5 0 1.3-.2 1.3-.8v-3.2c0-1.4 0-2.4-.3-3.5.9-.1 2.1-.3 2.1-.8zM9.5 12c.8-1.3 1.3-1.1 1.8-1.1H18.5c.7 0 1.1 0 1.7 1.1.1.1.5.7.8 1.9H8.9c.3-1.2.5-1.8.6-1.9zm-.1 5.2c-.5 0-1-.4-1-1 0-.5.4-1 1-1s1 .4 1 1c-.1.5-.5 1-1 1zm8.2 1.9h-5.2v-1.7h5.2v1.7zm3-1.9c-.5 0-1-.4-1-1 0-.5.4-1 1-1 .5 0 1 .4 1 1 0 .5-.4 1-1 1z" fill="#FFF"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 44"><path d="M14.1 42c-.4-.5-.7-.9-1-1.3-3.6-4.9-7.6-10.8-10.5-17.5C1.2 19.9-.2 16 .9 11.7 2.4 5.1 8.2.5 15 .5c1.2 0 2.5.2 3.7.5 3.7 1 6.9 3.3 8.8 6.7 2 3.4 2.5 7.3 1.4 11.1-1.8 6.3-5.2 11.9-8.7 17-1 1.6-2.1 3-3.3 4.6-.5.7-1.1 1.5-1.6 2.2l-.4.6-.8-1.2z" fill="#FF7500"/><path d="M15 1c1.2 0 2.4.1 3.6.5 7.5 1.9 12 9.7 9.9 17.2-1.7 6.2-5.1 11.6-8.6 16.9-1.5 2.3-3.2 4.4-4.8 6.8-.6-.7-1.1-1.3-1.5-1.9C9.5 34.9 5.7 29.3 3 23 1.4 19.4.4 15.8 1.3 11.8 2.9 5.3 8.6 1 15 1m0-1C8 0 2 4.8.4 11.6c-1.1 4.5.3 8.5 1.7 11.8C5 30.1 9.1 36.1 12.7 41c.3.4.7.9 1 1.3.2.2.3.4.5.7l.8 1.1.8-1.1c.5-.7 1.1-1.5 1.6-2.2 1.1-1.6 2.2-3.1 3.3-4.6 3.4-5.2 6.9-10.7 8.7-17.2 1.1-4 .6-8-1.4-11.5s-5.3-6-9.2-7C17.6.2 16.3 0 15 0z" fill="#FFF"/><g fill="#FFF"><path d="M16.6 19.9c0-.8-.6-1.4-1.4-1.4h-.7c-.8 0-1.4.6-1.4 1.4v6.4c0 .8.6 1.4 1.4 1.4h.7c.8 0 1.4-.6 1.4-1.4v-6.4z"/><path d="M21.5 8.8h-.7c-.6 0-1.3.6-1.3 1.2v.7c-.7 0-1 .1-1 .1-.8-1.8-3-2.8-3-2.8h-1.2s-2.1 1-3 2.8c0 0-.3-.1-1-.1V10c0-.6-.7-1.2-1.3-1.2h-.8s-.8.7-.8 1.2v.7s.8.7 1.5.7l2.1.7c-.4.7-.7 1.9-.7 2.9v2.9c0 2.4.7 3.6 2.1 5v-3.6c0-.7.8-2 2.2-2h.4c1.4 0 2.3 1.2 2.3 2v3.6c1.4-1.4 2.1-2.6 2.1-5V15c0-.9-.4-2.1-.7-2.9l2.1-.7c.7 0 1.5-.7 1.5-.7V10c0-.5-.8-1.2-.8-1.2zm-6.8 5.9c-.9 0-1.7-.8-1.7-1.7 0-.9.8-1.7 1.7-1.7.9 0 1.7.8 1.7 1.7 0 1-.7 1.7-1.7 1.7z"/></g></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M9 1C4.6 1 1 4.6 1 9c0 3.3 2 6.1 4.8 7.3 0-.6 0-1.2.1-1.8l1-4.4s-.3-.5-.3-1.3c0-1.2.7-2.1 1.5-2.1.9.1 1.2.6 1.2 1.3 0 .7-.5 1.8-.7 2.8-.2.9.4 1.5 1.3 1.5 1.5 0 2.5-1.9 2.5-4.3 0-1.7-1.2-3.1-3.3-3.1-2.4 0-3.9 1.8-3.9 3.8 0 .7.2 1.2.5 1.6.2.2.2.2.1.5l-.2.6c-.1.2-.2.3-.4.2-1.1-.5-1.6-1.7-1.6-3.1 0-2.3 1.9-5 5.7-5 3.1 0 5.1 2.2 5.1 4.6 0 3.1-1.7 5.5-4.3 5.5-.9 0-1.7-.5-2-1 0 0-.5 1.8-.6 2.2-.2.6-.5 1.2-.8 1.7.8.4 1.5.5 2.3.5 4.4 0 8-3.6 8-8s-3.6-8-8-8z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.2 20.8l-3.9-5.7c-.8.8-1.6 1.2-2.7 1.6l4.2 6.5s.3.8 1.2.8c.9 0 2-.7 2-1.6 0-.3-.8-1.6-.8-1.6zM18.2 8c0-4.4-3.6-8-8.1-8S2 3.6 2 8s3.6 8 8.1 8 8.1-3.6 8.1-8zm-8.1 6.5c-3.6 0-6.6-2.9-6.6-6.5s2.9-6.5 6.6-6.5 6.6 2.9 6.6 6.5-3 6.5-6.6 6.5z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.5 16c-1.1 0-2 .5-2.7 1.3l-8.9-4.1c.1-.3.1-.5.1-.7 0-.2 0-.4-.1-.6l8.9-4.2c.7.8 1.6 1.3 2.7 1.3C21.4 9 23 7.4 23 5.5S21.4 2 19.5 2 16 3.6 16 5.5c0 .2 0 .4.1.6l-8.9 4.1C6.5 9.5 5.6 9 4.5 9 2.6 9 1 10.6 1 12.5S2.6 16 4.5 16c1.1 0 2-.5 2.7-1.3l8.9 4.2c0 .2-.1.4-.1.6 0 1.9 1.6 3.5 3.5 3.5s3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 26 26"><path d="M11.906 19.063V.03c-.466.06-.906.503-1 .97l-2.5 7.688H1.312c-.6 0-1.312.2-1.312 1 0 .4.1 1.018.5 1.218l6 3.594-2.406 8c-.1.5.193 1.113.593 1.313.2.1.425.187.625.187.3 0 .482.012.782-.188l5.812-4.75z"/><path d="M12 0c-.033 0-.06.027-.094.03v19.032L12 19l5.906 4.813c.2.2.382.187.782.187.2 0 .418-.087.718-.188.4-.2.7-.812.5-1.312l-2.406-8 6-3.594c.4-.2.5-.82.5-1.22s-.188-.63-.438-.78c-.25-.15-.575-.22-.875-.22l-7.093.002L13.094 1C12.994.5 12.5 0 12 0z" fill="#fff"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 27 27"><path d="M22.7 8.7h-7.1L13.1 1c-.1-.5-.6-1-1.1-1s-1 .5-1.1 1L8.4 8.7H1.3c-.6 0-1.3.2-1.3 1 0 .4.1 1 .5 1.2l6 3.6-2.4 8c-.1.5.2 1.1.6 1.3.2.1.4.2.6.2.3 0 .5 0 .8-.2L12 19l5.9 4.8c.2.2.4.2.8.2.2 0 .4-.1.7-.2.4-.2.7-.8.5-1.3l-2.4-8 6-3.6c.4-.2.5-.8.5-1.2 0-.8-.7-1-1.3-1z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 22"><path fill="#FFF" d="M51 0h78v22H51z"/><path d="M0 16.3V9.8h.7v.6c.3-.5.8-.7 1.4-.7.6 0 1.1.2 1.4.6.4.5.6 1.1.6 1.9 0 .8-.2 1.4-.5 1.8-.4.4-.8.7-1.4.7-.6 0-1-.2-1.4-.7v2.3H0m2-6c-.2 0-.3 0-.5.1s-.3.2-.4.4c-.2.3-.3.8-.3 1.4 0 .6.1 1.1.4 1.4.2.3.5.4.9.4s.7-.2.9-.5c.2-.4.4-.8.4-1.4 0-.6-.1-1-.4-1.4-.3-.2-.6-.4-1-.4M7.2 9.7c.6 0 1.1.2 1.5.7.4.4.6 1 .6 1.8s-.2 1.5-.7 1.9c-.4.4-.8.5-1.4.5-.7 0-1.2-.2-1.6-.7-.4-.4-.6-1-.6-1.7s.2-1.3.5-1.7c.4-.6 1-.8 1.7-.8m-.1.6c-.4 0-.7.2-.9.5-.3.4-.4.8-.4 1.4 0 .6.1 1.1.4 1.4.2.3.6.4 1 .4s.6-.1.9-.4c.3-.4.4-.8.4-1.5 0-.6-.1-1.1-.4-1.4-.3-.3-.6-.4-1-.4M11.1 14.5L9.8 9.8h.8l1 3.7.9-3.7h.8l.9 3.7.9-3.7h.8l-1.4 4.7h-.8l-.9-3.6-.8 3.6h-.9M20.3 12.4h-3.2c0 .3.1.6.1.8.2.6.6.8 1.1.8.4 0 .7-.2.9-.5.1-.1.1-.3.2-.5h.8c-.1.4-.2.7-.4.9-.4.5-.8.7-1.5.7s-1.2-.3-1.6-.8c-.3-.5-.5-1-.5-1.7s.2-1.3.6-1.8c.4-.5.9-.7 1.5-.7.5 0 .9.2 1.3.5s.6.8.7 1.5v.8m-.8-.6c0-.3-.1-.6-.2-.8-.2-.4-.5-.6-1-.6-.4 0-.8.2-1 .6-.1.2-.2.5-.3.9h2.5M21.5 14.5V9.8h.7v.9c.3-.7.8-1 1.6-1v.8h-.3c-.4 0-.7.1-.9.4-.2.2-.3.6-.4 1v2.6h-.7M28.4 12.4h-3.2c0 .3.1.6.1.8.2.6.6.8 1.1.8.4 0 .7-.2.9-.5.1-.1.1-.3.2-.5h.8c-.1.4-.2.7-.4.9-.4.5-.8.7-1.5.7s-1.2-.3-1.6-.8c-.3-.5-.5-1-.5-1.7s.2-1.3.6-1.8c.4-.5.9-.7 1.5-.7.5 0 .9.2 1.3.5s.6.8.7 1.5v.8m-.8-.6c0-.3-.1-.6-.2-.8-.2-.4-.5-.6-1-.6-.4 0-.8.2-1 .6-.1.2-.2.5-.3.9h2.5M33.4 14.5h-.7v-.6c-.3.5-.8.7-1.4.7-.6 0-1.1-.2-1.4-.6-.4-.5-.6-1.1-.6-1.9 0-.8.2-1.4.6-1.8.4-.4.8-.7 1.4-.7.6 0 1 .2 1.4.7V7.7h.8v6.8m-2.1-4.2c-.2 0-.3 0-.5.1s-.3.2-.4.3c-.2.4-.4.8-.4 1.4 0 .6.1 1 .4 1.4.2.3.5.5.9.5.2 0 .4 0 .5-.1.2-.1.3-.2.4-.4.2-.3.3-.8.3-1.4 0-.6-.1-1.1-.4-1.4-.2-.3-.5-.4-.8-.4M37 14.5V7.7h.8v2.6c.3-.5.8-.7 1.4-.7s1.1.2 1.4.7c.4.4.5 1 .5 1.8s-.2 1.4-.6 1.9c-.4.4-.8.6-1.4.6-.6 0-1.1-.2-1.4-.7v.6H37m2-4.2c-.4 0-.7.2-.9.5-.3.3-.4.8-.4 1.4 0 .6.1 1 .3 1.4.2.3.5.5.9.5s.7-.2.9-.5c.2-.4.4-.8.4-1.4 0-.6-.1-1-.4-1.4-.1-.3-.4-.5-.8-.5M41.9 16.2v-.7h.1c.1 0 .2.1.3.1.2 0 .3-.1.4-.2.1-.1.2-.5.4-1.1l-1.7-4.6h.9l1.2 3.6 1.2-3.6h.8L44 14.3c-.3.8-.5 1.3-.6 1.5-.2.3-.5.5-1 .5-.1 0-.3-.1-.5-.1" fill="#999"/><path d="M64.4 18v.9h-7.8V18c.3 0 .6 0 .9-.1 1.1-.1 1.6-.6 1.7-1.8v-.8V3.9v-.3c-.6 0-1.2.1-1.8.3-1.2.5-1.9 1.5-2.3 2.7-.2.6-.3 1.3-.4 1.9-.2 0-.5-.1-.8-.1.1-1.9.1-3.7.2-5.6h12.7c.1 2.1.2 3.9.2 5.8-.3 0-.6.1-.8.1-.1-.6-.2-1.1-.3-1.6-.3-1-.7-1.9-1.6-2.6-.7-.5-1.6-.7-2.5-.8V15.4c0 .4 0 .8.1 1.2.1.9.5 1.3 1.5 1.4h1z" fill-rule="evenodd" clip-rule="evenodd" fill="#E1027B"/><path d="M98.3 14.7c0 .6-.1 1.3-.3 1.9-.5 1.4-1.8 2.3-3.3 2.4-.8 0-1.6-.1-2.4-.5-1.1-.6-1.7-1.7-1.8-2.9-.1-.8-.1-1.7.1-2.5.4-1.6 1.7-2.6 3.3-2.7.9-.1 1.7 0 2.5.5 1.1.6 1.6 1.6 1.8 2.8 0 .3 0 .7.1 1zm-1.6.2c0-.4-.1-.8-.1-1.2-.2-1.1-1-1.8-2-1.9-1.3-.1-2.1.5-2.4 1.7-.2.8-.2 1.6 0 2.4.3 1 1.1 1.6 2.2 1.6 1 0 1.9-.6 2.2-1.6 0-.3 0-.7.1-1z" fill-rule="evenodd" clip-rule="evenodd" fill="#7B7C7C"/><path d="M125.2 16.3h-4c0 .7.4 1.3 1 1.5.6.1 1-.1 1.3-.8.5.1 1 .1 1.6.2-.3.9-.8 1.5-1.7 1.7-.7.2-1.3.2-2-.1-.9-.3-1.4-1-1.7-1.9-.2-.8-.2-1.7.1-2.5.4-1.2 1.4-1.8 2.8-1.8 1.2.1 2.1.8 2.4 2 .1.5.1 1.1.2 1.7zm-1.7-1c0-.6-.1-1.1-.7-1.4-.4-.2-.8-.2-1.1.1-.4.3-.5.8-.5 1.3h2.3zM105 18.8h-1.6v-.3-3-.9c-.1-.7-.7-1-1.3-.8-.6.2-.8.8-.8 1.4v3.5h-1.6v-6h1.6v.8l.2-.2c.6-.7 1.3-.9 2.2-.7.8.2 1.3.7 1.3 1.6v4.6z" fill-rule="evenodd" clip-rule="evenodd" fill="#7C7D7D"/><path d="M114.7 18.8h-1.6v-6h1.6v.9l.2-.2c.7-.8 1.7-1 2.6-.6.6.3.9.8 1 1.5v4.5h-1.6v-.3V15c0-.7-.3-1-.8-1.1-.6 0-1.1.3-1.2.9-.1.4-.1.7-.1 1.1v2.8c-.1 0-.1 0-.1.1z" fill-rule="evenodd" clip-rule="evenodd" fill="#7B7C7C"/><path d="M108.2 10.6v8.2h-1.5l-.1-.1v-.1-7.8-.2h1.6z" fill-rule="evenodd" clip-rule="evenodd" fill="#7C7D7D"/><path d="M54 13.5v-3.2h3.2v3.2H54zM67 10.3v3.2h-3.2v-3.2H67z" fill-rule="evenodd" clip-rule="evenodd" fill="#E1027B"/><path d="M76.8 10.3v3.2h-3.2v-3.2h3.2z" fill-rule="evenodd" clip-rule="evenodd" fill="#E1037B"/><path d="M83.3 13.5v-3.2h3.2v3.2h-3.2z" fill-rule="evenodd" clip-rule="evenodd" fill="#E1027B"/><path d="M111.4 18.8h-1.6v-6h1.6v6z" fill-rule="evenodd" clip-rule="evenodd" fill="#7C7D7D"/><path d="M109.8 12v-1.4h1.6V12h-1.6z" fill-rule="evenodd" clip-rule="evenodd" fill="#7B7C7C"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 16v1.2L8 19l1.3 1h1.4l1.3-1 1-1.8V16l-1-1H8"/><path d="M8.6 12h2.9l.1-.1c.1-1.2.8-2.2 1.7-3.6l.3-.5c.2-.5.4-1.1.4-1.8 0-2.2-1.8-4-4-4S6 3.8 6 6c0 .7.2 1.4.5 2l.4.5c.9 1.3 1.5 2.2 1.7 3.5zm3.3 2H8.1c-.3 0-.6-.1-.8-.3l-.6-.7c-.2-.2-.2-.4-.2-.7 0-.7-.4-1.3-1.3-2.7L4.8 9C4.3 8.1 4 7.1 4 6c0-3.3 2.7-6 6-6s6 2.7 6 6c0 1-.2 2-.7 2.9l-.4.5c-1 1.5-1.4 2.1-1.4 2.9 0 .2-.1.5-.2.7l-.6.7c-.2.2-.5.3-.8.3z" fill-rule="evenodd" clip-rule="evenodd"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M12 12.9c1.3 0 1.8 1.4 1.8 2.6 0 1.2-.8 2.5-2.1 2.5h-4C5.1 18 3 16 3 13.6V2.9C3 1.7 4.5 1 5.8 1c1.3 0 2.3.7 2.3 1.9v3h4.2c1.3 0 1.5.8 1.5 2S13 10 11.7 10H8.1v3H12z" fill-rule="evenodd" clip-rule="evenodd"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M9.2 0C4.2 0 .3 3.9.3 8.7c0 1.7.4 3.3 1.3 4.5L0 18l4.8-1.6c1.3.7 2.7 1.1 4.2 1.1 4.8 0 8.7-3.9 8.7-8.7C17.9 3.9 14 0 9.2 0zm0 15.8c-1.4 0-2.7-.4-3.8-1.1l-2.7.9.8-2.7c-.8-1.1-1.3-2.6-1.3-4.1 0-3.8 3.1-7 7-7 3.8 0 7 3.1 7 7-.1 3.9-3.2 7-7 7zm4.1-5.1c-.2-.1-1.3-.7-1.5-.7-.2-.1-.3-.1-.5.1s-.6.7-.7.8c-.1.1-.3.1-.5 0s-.9-.4-1.8-1.2c-.7-.5-1.1-1.3-1.2-1.5-.2-.2 0-.3.1-.4.1-.2.2-.3.3-.4.1-.1.1-.2.2-.3.1-.1 0-.3 0-.4s-.4-1.3-.6-1.8c-.2-.5-.4-.4-.5-.4-.1 0-.3-.1-.4-.1-.1 0-.4 0-.6.2-.2.3-.9.9-.9 1.9 0 1.1.7 2.2.8 2.3.1.1 1.5 2.5 3.7 3.6 2.2.9 2.2.6 2.6.6s1.4-.5 1.6-1.1c.2-.5.2-.9.2-1.1 0 .1-.1 0-.3-.1z"/></svg>';
	}, function (c, s) {
	  c.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18"><path d="M8 12V6l4.4 3.1L8 12zm10-6.4C18 4.2 16.8 3 15.3 3H2.7C1.2 3 0 4.2 0 5.6v6.9C0 13.9 1.2 15 2.7 15h12.5c1.5 0 2.7-1.1 2.7-2.6V5.6z" fill-rule="evenodd" clip-rule="evenodd"/></svg>';
	}]);
	//# sourceMappingURL=showcar-icons.min.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var stores = {
	    local: __webpack_require__(7),
	    session: __webpack_require__(8),
	    cookie: __webpack_require__(9)
	};
	
	module.exports = (function () {
	    function Storage(type) {
	        _classCallCheck(this, Storage);
	
	        if (!(type in stores)) {
	            throw new Error('Unsupported type ' + type);
	        }
	
	        this.store = new stores[type]();
	    }
	
	    _createClass(Storage, [{
	        key: 'get',
	        value: function get(key) {
	            var defaultValue = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
	            var result = this.store.get(key);
	
	            if (null === result) {
	                return defaultValue;
	            }
	            return result;
	        }
	    }, {
	        key: 'set',
	        value: function set(key, value) {
	            this.store.set(key, value);
	            return this;
	        }
	    }, {
	        key: 'has',
	        value: function has(key) {
	            return this.store.has(key);
	        }
	    }, {
	        key: 'remove',
	        value: function remove(key) {
	            this.store.remove(key);
	            return this;
	        }
	    }]);
	
	    return Storage;
	})();

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	module.exports = (function () {
	    function LocalStore() {
	        _classCallCheck(this, LocalStore);
	    }
	
	    _createClass(LocalStore, [{
	        key: "get",
	        value: function get(key) {
	            return localStorage.getItem(key);
	        }
	    }, {
	        key: "set",
	        value: function set(key, value) {
	            localStorage.setItem(key, value);
	        }
	    }, {
	        key: "has",
	        value: function has(key) {
	            return null !== localStorage.getItem(key);
	        }
	    }, {
	        key: "remove",
	        value: function remove(key) {
	            localStorage.removeItem(key);
	        }
	    }]);
	
	    return LocalStore;
	})();

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	module.exports = (function () {
	    function SessionStore() {
	        _classCallCheck(this, SessionStore);
	    }
	
	    _createClass(SessionStore, [{
	        key: "get",
	        value: function get(key) {
	            return sessionStorage.getItem(key);
	        }
	    }, {
	        key: "set",
	        value: function set(key, value) {
	            sessionStorage.setItem(key, value);
	        }
	    }, {
	        key: "has",
	        value: function has(key) {
	            return null !== sessionStorage.getItem(key);
	        }
	    }, {
	        key: "remove",
	        value: function remove(key) {
	            sessionStorage.removeItem(key);
	        }
	    }]);
	
	    return SessionStore;
	})();

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	module.exports = (function () {
	    function CookieStore() {
	        _classCallCheck(this, CookieStore);
	    }
	
	    _createClass(CookieStore, [{
	        key: "get",
	        value: function get(key) {
	            var matchedCookie = this.matchSingleCookie(document.cookie, key);
	
	            if (matchedCookie instanceof Array && matchedCookie[1] !== undefined) {
	                try {
	                    return decodeURIComponent(matchedCookie[1]);
	                } catch (e) {
	                    return matchedCookie[1];
	                }
	            }
	
	            return null;
	        }
	    }, {
	        key: "set",
	        value: function set(key, value) {
	            var expires = arguments.length <= 2 || arguments[2] === undefined ? "Fri, 31 Dec 9999 23:59:59 GMT" : arguments[2];
	
	            document.cookie = [encodeURIComponent(key) + "=" + encodeURIComponent(value), "expires=" + expires, "path=/"].join("; ");
	        }
	    }, {
	        key: "has",
	        value: function has(key) {
	            return null !== this.get(key);
	        }
	    }, {
	        key: "remove",
	        value: function remove(key) {
	            this.set(key, "", "Thu, 01 Jan 1970 00:00:00 GMT");
	        }
	    }, {
	        key: "matchSingleCookie",
	        value: function matchSingleCookie(cookies, key) {
	            var saneKey = encodeURIComponent(key).replace(/[-\.+\*]/g, "$&");
	            var regExp = new RegExp("(?:(?:^|.*;)s*" + saneKey + "s*=s*([^;]*).*$)|^.*$");
	            return cookies.match(regExp);
	        }
	    }]);
	
	    return CookieStore;
	})();

/***/ }
/******/ ]);
//# sourceMappingURL=showcar-ui.js.map