// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/anim.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.introAnimation = introAnimation;
exports.drawLogo = drawLogo;
exports.eraseLogo = eraseLogo;
exports.darkenBlocks = darkenBlocks;
exports.lightenBlocks = lightenBlocks;

function introAnimation() {
  setTimeout(function () {
    anime({
      targets: ['#NE', '#SW'],
      easing: 'easeInOutSine',
      opacity: [0, 1],
      duration: 2000
    });
  }, 1000);
  setTimeout(function () {
    anime({
      targets: ['#NW', '#SE'],
      easing: 'easeInOutSine',
      opacity: [0, 1],
      duration: 2000,
      complete: function complete() {// $('body').attr('style', 'background: black url("images/marble-bg1.jpg") no-repeat fixed center;');
        // $('.bw').css('opacity', 1);
      }
    });
    anime({
      targets: ['.fa', '#contactate'],
      opacity: 1,
      easing: 'easeInOutSine',
      delay: anime.stagger(400),
      duration: 1000
    });
  }, 1500);
  setTimeout(function () {
    $('#title').attr('style', 'display: block;');
    drawLogo();
  }, 500);
}

function drawLogo() {
  var titleTimeline = anime.timeline({
    easing: 'easeInOutSine' // Default: easeInSine

  });
  titleTimeline.add({
    targets: ['#ateret path', '#cocinas path'],
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 3500
  }).add({
    targets: '#lines line',
    strokeDashoffset: [anime.setDashoffset, 0],
    duration: 1200
  }, '-=3500').add({
    targets: '#ateret path',
    fill: ['rgba(21, 141, 165, 0)', '#158DA5'],
    duration: 800
  }, '-=1200').add({
    targets: '#cocinas path',
    fill: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)'],
    duration: 800
  }, '-=1500');
}

function eraseLogo() {
  var titleTimeline = anime.timeline({
    easing: 'easeInOutSine' // Default: easeInSine

  });
  titleTimeline.add({
    targets: ['#ateret path', '#cocinas path'],
    strokeDashoffset: [0, anime.setDashoffset],
    duration: 875
  }).add({
    targets: '#lines line',
    strokeDashoffset: [0, anime.setDashoffset],
    duration: 300
  }, '-=875').add({
    targets: '#ateret path',
    fill: ['#158DA5', 'rgba(21, 141, 165, 0)'],
    duration: 200
  }, '-=300').add({
    targets: '#cocinas path',
    fill: ['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0)'],
    duration: 200
  }, '-=375');
}

function darkenBlocks(exceptionBlock) {
  var blocks = $('.nav-block').not(exceptionBlock).toArray();
  anime({
    targets: blocks,
    easing: 'easeInOutCirc',
    duration: 300,
    filter: ['brightness(100%) grayscale(0%)', 'brightness(50%) grayscale(0%)'] // Change grayscale to turn gray

  });
  anime({
    targets: exceptionBlock.getElementsByTagName('video')[0],
    easing: 'easeInOutCirc',
    duration: 300,
    filter: ['brightness(70%)', 'brightness(100%)']
  });
}

function lightenBlocks(exceptionBlock) {
  var blocks = $('.nav-block').not(exceptionBlock).toArray();
  anime({
    targets: blocks,
    easing: 'easeInOutCirc',
    duration: 300,
    filter: ['brightness(50%)', 'brightness(100%)']
  });
  anime({
    targets: exceptionBlock.getElementsByTagName('video')[0],
    easing: 'easeInOutCirc',
    duration: 300,
    filter: ['brightness(100%)', 'brightness(70%)']
  });
}
},{}],"../node_modules/@dogstudio/highway/build/highway.module.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function t() {}

t.prototype = {
  on: function (t, e, r) {
    var i = this.e || (this.e = {});
    return (i[t] || (i[t] = [])).push({
      fn: e,
      ctx: r
    }), this;
  },
  once: function (t, e, r) {
    var i = this;

    function n() {
      i.off(t, n), e.apply(r, arguments);
    }

    return n._ = e, this.on(t, n, r);
  },
  emit: function (t) {
    for (var e = [].slice.call(arguments, 1), r = ((this.e || (this.e = {}))[t] || []).slice(), i = 0, n = r.length; i < n; i++) r[i].fn.apply(r[i].ctx, e);

    return this;
  },
  off: function (t, e) {
    var r = this.e || (this.e = {}),
        i = r[t],
        n = [];
    if (i && e) for (var o = 0, s = i.length; o < s; o++) i[o].fn !== e && i[o].fn._ !== e && n.push(i[o]);
    return n.length ? r[t] = n : delete r[t], this;
  }
};
var e = t;
e.TinyEmitter = t;

var r = function (t) {
  this.wrap = document.querySelector("[data-router-wrapper]"), this.properties = t, this.Transition = t.transition ? new t.transition.class(this.wrap, t.transition.name) : null;
};

r.prototype.setup = function () {
  this.onEnter && this.onEnter(), this.onEnterCompleted && this.onEnterCompleted();
}, r.prototype.add = function () {
  this.wrap.insertAdjacentHTML("beforeend", this.properties.view.outerHTML);
}, r.prototype.update = function () {
  document.title = this.properties.page.title;
}, r.prototype.show = function (t) {
  var e = this;
  return new Promise(function (r) {
    try {
      function i(t) {
        e.onEnterCompleted && e.onEnterCompleted(), r();
      }

      return e.update(), e.onEnter && e.onEnter(), Promise.resolve(e.Transition ? Promise.resolve(e.Transition.show(t)).then(i) : i());
    } catch (t) {
      return Promise.reject(t);
    }
  });
}, r.prototype.hide = function (t) {
  var e = this;
  return new Promise(function (r) {
    try {
      function i(t) {
        e.onLeaveCompleted && e.onLeaveCompleted(), r();
      }

      return e.onLeave && e.onLeave(), Promise.resolve(e.Transition ? Promise.resolve(e.Transition.hide(t)).then(i) : i());
    } catch (t) {
      return Promise.reject(t);
    }
  });
};

var i = new window.DOMParser(),
    n = function (t, e) {
  this.renderers = t, this.transitions = e;
};

n.prototype.getOrigin = function (t) {
  var e = t.match(/(https?:\/\/[\w\-.]+)/);
  return e ? e[1].replace(/https?:\/\//, "") : null;
}, n.prototype.getPathname = function (t) {
  var e = t.match(/https?:\/\/.*?(\/[\w_\-./]+)/);
  return e ? e[1] : "/";
}, n.prototype.getAnchor = function (t) {
  var e = t.match(/(#.*)$/);
  return e ? e[1] : null;
}, n.prototype.getParams = function (t) {
  var e = t.match(/\?([\w_\-.=&]+)/);
  if (!e) return null;

  for (var r = e[1].split("&"), i = {}, n = 0; n < r.length; n++) {
    var o = r[n].split("=");
    i[o[0]] = o[1];
  }

  return i;
}, n.prototype.getDOM = function (t) {
  return "string" == typeof t ? i.parseFromString(t, "text/html") : t;
}, n.prototype.getView = function (t) {
  return t.querySelector("[data-router-view]");
}, n.prototype.getSlug = function (t) {
  return t.getAttribute("data-router-view");
}, n.prototype.getRenderer = function (t) {
  if (!this.renderers) return Promise.resolve(r);

  if (t in this.renderers) {
    var e = this.renderers[t];
    return "function" != typeof e || r.isPrototypeOf(e) ? "function" == typeof e.then ? Promise.resolve(e).then(function (t) {
      return t.default;
    }) : Promise.resolve(e) : Promise.resolve(e()).then(function (t) {
      return t.default;
    });
  }

  return Promise.resolve(r);
}, n.prototype.getTransition = function (t) {
  return this.transitions ? t in this.transitions ? {
    class: this.transitions[t],
    name: t
  } : "default" in this.transitions ? {
    class: this.transitions.default,
    name: "default"
  } : null : null;
}, n.prototype.getProperties = function (t) {
  var e = this.getDOM(t),
      r = this.getView(e),
      i = this.getSlug(r);
  return {
    page: e,
    view: r,
    slug: i,
    renderer: this.getRenderer(i, this.renderers),
    transition: this.getTransition(i, this.transitions)
  };
}, n.prototype.getLocation = function (t) {
  return {
    href: t,
    anchor: this.getAnchor(t),
    origin: this.getOrigin(t),
    params: this.getParams(t),
    pathname: this.getPathname(t)
  };
};

var o = function (t) {
  function e(e) {
    var r = this;
    void 0 === e && (e = {});
    var i = e.renderers,
        o = e.transitions;
    t.call(this), this.Helpers = new n(i, o), this.Transitions = o, this.Contextual = !1, this.location = this.Helpers.getLocation(window.location.href), this.properties = this.Helpers.getProperties(document.cloneNode(!0)), this.popping = !1, this.running = !1, this.trigger = null, this.cache = new Map(), this.cache.set(this.location.href, this.properties), this.properties.renderer.then(function (t) {
      r.From = new t(r.properties), r.From.setup();
    }), this._navigate = this.navigate.bind(this), window.addEventListener("popstate", this.popState.bind(this)), this.links = document.querySelectorAll("a:not([target]):not([data-router-disabled])"), this.attach(this.links);
  }

  return t && (e.__proto__ = t), (e.prototype = Object.create(t && t.prototype)).constructor = e, e.prototype.attach = function (t) {
    for (var e = 0, r = t; e < r.length; e += 1) r[e].addEventListener("click", this._navigate);
  }, e.prototype.detach = function (t) {
    for (var e = 0, r = t; e < r.length; e += 1) r[e].removeEventListener("click", this._navigate);
  }, e.prototype.navigate = function (t) {
    if (!t.metaKey && !t.ctrlKey) {
      t.preventDefault();
      var e = !!t.currentTarget.hasAttribute("data-transition") && t.currentTarget.dataset.transition;
      this.redirect(t.currentTarget.href, e, t.currentTarget);
    }
  }, e.prototype.redirect = function (t, e, r) {
    if (void 0 === e && (e = !1), void 0 === r && (r = "script"), this.trigger = r, !this.running && t !== this.location.href) {
      var i = this.Helpers.getLocation(t);
      this.Contextual = !1, e && (this.Contextual = this.Transitions.contextual[e].prototype, this.Contextual.name = e), i.origin !== this.location.origin || i.anchor && i.pathname === this.location.pathname ? window.location.href = t : (this.location = i, this.beforeFetch());
    }
  }, e.prototype.popState = function () {
    this.trigger = "popstate", this.Contextual = !1;
    var t = this.Helpers.getLocation(window.location.href);
    this.location.pathname !== t.pathname || !this.location.anchor && !t.anchor ? (this.popping = !0, this.location = t, this.beforeFetch()) : this.location = t;
  }, e.prototype.pushState = function () {
    this.popping || window.history.pushState(this.location, "", this.location.href);
  }, e.prototype.fetch = function () {
    try {
      var t = this;
      return Promise.resolve(fetch(t.location.href, {
        mode: "same-origin",
        method: "GET",
        headers: {
          "X-Requested-With": "Highway"
        },
        credentials: "same-origin"
      })).then(function (e) {
        if (e.status >= 200 && e.status < 300) return e.text();
        window.location.href = t.location.href;
      });
    } catch (t) {
      return Promise.reject(t);
    }
  }, e.prototype.beforeFetch = function () {
    try {
      var t = this;

      function e() {
        t.afterFetch();
      }

      t.pushState(), t.running = !0, t.emit("NAVIGATE_OUT", {
        from: {
          page: t.From.properties.page,
          view: t.From.properties.view
        },
        trigger: t.trigger,
        location: t.location
      });
      var r = {
        trigger: t.trigger,
        contextual: t.Contextual
      },
          i = t.cache.has(t.location.href) ? Promise.resolve(t.From.hide(r)).then(function () {
        t.properties = t.cache.get(t.location.href);
      }) : Promise.resolve(Promise.all([t.fetch(), t.From.hide(r)])).then(function (e) {
        t.properties = t.Helpers.getProperties(e[0]), t.cache.set(t.location.href, t.properties);
      });
      return Promise.resolve(i && i.then ? i.then(e) : e());
    } catch (t) {
      return Promise.reject(t);
    }
  }, e.prototype.afterFetch = function () {
    try {
      var t = this;
      return Promise.resolve(t.properties.renderer).then(function (e) {
        return t.To = new e(t.properties), t.To.add(), t.emit("NAVIGATE_IN", {
          to: {
            page: t.To.properties.page,
            view: t.To.wrap.lastElementChild
          },
          trigger: t.trigger,
          location: t.location
        }), Promise.resolve(t.To.show({
          trigger: t.trigger,
          contextual: t.Contextual
        })).then(function () {
          t.popping = !1, t.running = !1, t.detach(t.links), t.links = document.querySelectorAll("a:not([target]):not([data-router-disabled])"), t.attach(t.links), t.emit("NAVIGATE_END", {
            to: {
              page: t.To.properties.page,
              view: t.To.wrap.lastElementChild
            },
            from: {
              page: t.From.properties.page,
              view: t.From.properties.view
            },
            trigger: t.trigger,
            location: t.location
          }), t.From = t.To, t.trigger = null;
        });
      });
    } catch (t) {
      return Promise.reject(t);
    }
  }, e;
}(e),
    s = function (t, e) {
  this.wrap = t, this.name = e;
};

s.prototype.show = function (t) {
  var e = this,
      r = t.trigger,
      i = t.contextual,
      n = this.wrap.lastElementChild,
      o = this.wrap.firstElementChild;
  return new Promise(function (t) {
    i ? (n.setAttribute("data-transition-in", i.name), n.removeAttribute("data-transition-out", i.name), i.in && i.in({
      to: n,
      from: o,
      trigger: r,
      done: t
    })) : (n.setAttribute("data-transition-in", e.name), n.removeAttribute("data-transition-out", e.name), e.in && e.in({
      to: n,
      from: o,
      trigger: r,
      done: t
    }));
  });
}, s.prototype.hide = function (t) {
  var e = this,
      r = t.trigger,
      i = t.contextual,
      n = this.wrap.firstElementChild;
  return new Promise(function (t) {
    i ? (n.setAttribute("data-transition-out", i.name), n.removeAttribute("data-transition-in", i.name), i.out && i.out({
      from: n,
      trigger: r,
      done: t
    })) : (n.setAttribute("data-transition-out", e.name), n.removeAttribute("data-transition-in", e.name), e.out && e.out({
      from: n,
      trigger: r,
      done: t
    }));
  });
}, console.log("Highway v2.2.0");
var _default = {
  Core: o,
  Helpers: n,
  Renderer: r,
  Transition: s
};
exports.default = _default;
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

var Anim = _interopRequireWildcard(require("./anim.js"));

var _highway = _interopRequireDefault(require("@dogstudio/highway"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var H = new _highway.default.Core(); // Intro

Anim.introAnimation(); // Button animation

$('.nav-button div').hover(function (e) {
  // White highlight
  var svg = e.target.parentElement.querySelector('.svg-button');
  anime({
    targets: svg,
    width: '100%',
    easing: 'easeInOutCirc',
    duration: 200,
    complete: function complete() {
      svg.setAttribute('style', 'left: 0; width: 100%;');
    }
  });
  Anim.darkenBlocks(e.target.parentElement.parentElement);
}, function (e) {
  // White highlight
  var svg = e.target.parentElement.querySelector('.svg-button');
  anime({
    targets: svg,
    width: '0%',
    easing: 'easeInOutCirc',
    duration: 200,
    complete: function complete() {
      svg.setAttribute('style', 'right: 0; width: 0%;');
    }
  });
  Anim.lightenBlocks(e.target.parentElement.parentElement);
}); // Highlight animation

$('.black-highlight').hover(function (e) {
  anime({
    targets: e.target,
    easing: 'easeInSine',
    duration: 200,
    backgroundSize: ['0% 1.4rem', '100% 1.4rem'],
    complete: function complete() {
      e.target.style.backgroundPosition = 'left bottom';
    }
  });
}, function (e) {
  anime({
    targets: e.target,
    easing: 'easeInSine',
    duration: 200,
    backgroundSize: ['100% 1.4rem', '0% 1.4rem'],
    complete: function complete() {
      e.target.style.backgroundPosition = 'right bottom';
    }
  });
}); // Menu reorganization

function moveOut() {
  anime({
    targets: ['#NE', '#SE'],
    easing: 'easeInOutQuad',
    delay: anime.stagger(100),
    translateX: ['0', '100vw']
  });
  anime({
    targets: ['#NW', '#SW'],
    easing: 'easeInOutQuad',
    delay: anime.stagger(100),
    translateX: ['0', '-100vw']
  });
}

function moveIn() {
  $('.nav-block').css({
    'transform': 'translateX(0)',
    'opacity': 0
  });
  Anim.introAnimation();
} // Cocinas


$('#cocinas-button').click(function () {
  moveOut();
  Anim.eraseLogo();
});
$('#contactate').click(function () {
  moveIn();
});
},{"./anim.js":"js/anim.js","@dogstudio/highway":"../node_modules/@dogstudio/highway/build/highway.module.js"}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61428" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map