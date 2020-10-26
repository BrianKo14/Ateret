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

// Intro
function introAnimation() {
  setTimeout(function () {
    anime({
      targets: ['#NE', '#SW'],
      easing: 'easeInOutSine',
      opacity: [0, 1],
      duration: 2000
    });
  }, 3000);
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
      targets: '.fa',
      opacity: 1,
      easing: 'easeInOutSine',
      delay: anime.stagger(400),
      duration: 1000
    });
  }, 2500);
  setTimeout(function () {
    $('#svg-margin').css('opacity', 1);
    anime({
      targets: '#svg-margin rect',
      easing: 'easeInOutSine',
      // strokeDashoffset: [anime.setDashoffset, 0],
      opacity: [0, 1],
      duration: 2000 // Default: 3500

    });
    anime({
      targets: ['#contactate', '#nosotros', '#visitanos'],
      opacity: 1,
      easing: 'easeInOutSine',
      duration: 1000
    });
  }, 4000);
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
    opacity: [0, 1],
    duration: 1200
  }, '-=3500').add({
    targets: '#ateret path',
    fill: ['rgba(21, 141, 165, 0)', '#158DA5'],
    duration: 800
  }, '-=1200').add({
    targets: '#cocinas path',
    fill: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
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
    fill: ['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)'],
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
    filter: ['brightness(80%)', 'brightness(100%)']
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
    filter: ['brightness(100%)', 'brightness(80%)']
  });
}
},{}],"js/list.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startSite = startSite;
var currentSite = "home";
var pos, selected;
var dlNames, dsNames;
var length, height, width;

function startSite(name) {
  // Set query name for this site
  currentSite = name;
  dlNames = "#".concat(currentSite, "-bg .dynamic-list .dl-row");
  dsNames = "#".concat(currentSite, "-bg .dynamic-slideshow .ds-row"); // Get number of rows

  length = $(dlNames).length; // Get rows' size

  $(dlNames).each(function () {
    height = parseInt($(this).css('height').replace('%', ''));
    width = parseInt($(this).css('width').replace('%', ''));
  });
  pos = selected = 0;
  slide();
}

function slide() {
  $(dlNames).each(function (indx) {
    // Math functions: https://www.desmos.com/calculator/zn2tmgp3k5
    // Position
    var x = pos - indx - 0;
    var w = -1,
        a = -10,
        h = -15.2;
    var part = Math.tanh(a * x / w - a * Math.floor(x / w) - a / 2) / (2 * Math.tanh(a / 2));
    var offset = h * (part + 0.5 + Math.floor(x / w));
    $(this).css('top', 50 - height / 2 - offset + '%'); // Size

    var sigma = 0.9;
    var size = 1 / (sigma * Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * Math.pow((indx - pos) / sigma, 2)) + 0.8;
    size *= 0.8;
    $(this).css('transform', "scale(".concat(size, ")")); // Z-index

    $(this).css('z-index', Math.round(20 + size * 10)); // Opacity

    $(this).css('opacity', "".concat(Math.pow(size, 7))); // Selected

    if (Math.abs(pos - indx) < 0.5) {
      selected = indx;
      $(dsNames).each(function (dsIndx) {
        if (dsIndx == selected) {
          $(dsNames).eq(dsIndx).css('display', 'block');
        } else {
          $(dsNames).eq(dsIndx).css('display', 'none');
        }
      });
    }
  });
}

$(document).bind('mousewheel', function (e) {
  var delta = e.originalEvent.wheelDelta;
  delta *= -0.01;

  if (pos + delta >= 0 && pos + delta <= length - 1) {
    pos += delta;
    slide();
  }
});
},{}],"js/main.js":[function(require,module,exports) {
"use strict";

var Anim = _interopRequireWildcard(require("./anim.js"));

var List = _interopRequireWildcard(require("./list.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var isMobile = false;

if (/Android|webOS|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  console.log('[Mobile mode]'); // Prevent dragging

  document.addEventListener("touchmove", function (e) {
    e.preventDefault();
  }, {
    passive: false
  });
  changeOrientation();
  $(window).on("orientationchange", function (e) {
    changeOrientation();
  });
}

function changeOrientation() {
  if (window.innerHeight > window.innerWidth) {
    // Portrait
    $('#svg-margin rect').css('height', window.innerHeight - 70 + 'px');
  } else {
    // Landscape
    $('#svg-margin rect').css('height', window.innerWidth - 20 + 'px');
  }
}

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
});
var toHLColor = '#000';
var fromHLColor = '#FFF'; // Highlight animation

$('.black-highlight').hover(function (e) {
  anime({
    targets: e.target,
    easing: 'easeInSine',
    duration: 200,
    color: toHLColor,
    borderColor: toHLColor,
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
    color: fromHLColor,
    borderColor: fromHLColor,
    backgroundSize: ['100% 1.4rem', '0% 1.4rem'],
    complete: function complete() {
      e.target.style.backgroundPosition = 'right bottom';
    }
  });
});

function changeToSite(name) {
  List.startSite(name);
  $("#".concat(name, "-bg")).css('display', 'block');
  anime({
    targets: "#".concat(name, "-bg"),
    easing: 'easeInOutSine',
    opacity: [0, 1],
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    duration: 1000
  });
  anime({
    targets: ['#contactate', '#visitanos', '#nosotros', '#svg-margin rect', '#social a'],
    color: ['#FFF', '#000'],
    easing: 'easeInOutSine',
    stroke: ['#FFF', '#000'],
    borderColor: ['#FFF', '#000'],
    duration: 1000
  });
  $('.black-highlight').css('background-image', 'linear-gradient(black, black)');
  toHLColor = '#FFF';
  fromHLColor = '#000';
}

function changeFromSite(name) {
  anime({
    targets: "#".concat(name, "-bg"),
    easing: 'easeInOutSine',
    opacity: [1, 0],
    backgroundColor: 'rgba(255, 255, 255, 0)',
    duration: 1000,
    complete: function complete() {
      $("#".concat(name, "-bg")).css('display', 'none');
    }
  });
  anime({
    targets: ['#contactate', '#visitanos', '#nosotros', '#svg-margin rect', '#social a'],
    color: ['#000', '#FFF'],
    easing: 'easeInOutSine',
    stroke: ['#000', '#FFF'],
    borderColor: ['#000', '#FFF'],
    duration: 1000
  });
  $('.black-highlight').css('background-image', 'linear-gradient(white, white)');
  toHLColor = '#000';
  fromHLColor = '#FFF';
}

var sites = ['cocinas', 'mesadas', 'electrodomesticos', 'placard'];
sites.forEach(function (site) {
  $("#".concat(site, "-button")).click(function () {
    changeToSite(site);
    console.log('hey');
  });
  $("#".concat(site, "-back-button")).click(function () {
    changeFromSite(site);
  });
});
},{"./anim.js":"js/anim.js","./list.js":"js/list.js"}],"../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59197" + '/');

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