module.exports =
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	var Koa = __webpack_require__(1);
	var koaRouter = __webpack_require__(2);
	var path = __webpack_require__(3);
	var test = __webpack_require__(4);
	var reactview = __webpack_require__(7);
	var Static = __webpack_require__(10);
	var serve = __webpack_require__(13);
	__webpack_require__(14);
	var port = 8888;
	
	var App = function App() {
	  var app = new Koa();
	  var viewpath = './views/';
	  var SSRComp = __webpack_require__(15)(viewpath + 'SSRComp');
	  app.config = {
	    reactview: {
	      viewpath: viewpath, // the root directory of view files
	      doctype: '<!DOCTYPE html>',
	      extname: '.js' // view层直接渲染文件名后缀
	    }
	    // 配置render
	  };reactview(app);
	
	  // 静态资源托管
	  app.use(serve('dist'));
	  console.log(__dirname + '/dist');
	  var router = koaRouter();
	  router.get('/', function () {
	    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
	      return regeneratorRuntime.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              app.render(ctx, {
	                module: SSRComp,
	                _locals: {
	                  "showMsg": "ServerSide Render"
	                }
	              });
	
	            case 1:
	            case 'end':
	              return _context.stop();
	          }
	        }
	      }, _callee, undefined);
	    }));
	
	    return function (_x, _x2) {
	      return _ref.apply(this, arguments);
	    };
	  }());
	  app.use(router.routes());
	  return app;
	};
	
	var createApp = function createApp() {
	  var app = App();
	  app.listen(port, function () {
	    console.log('Listening on port %d', port);
	  });
	};
	createApp();
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("koa");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = require("koa-router");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(5);
	var ReactDom = __webpack_require__(6);
	
	module.exports = function (req, scriptFilename) {
	  return ReactDom.renderToString(React.createElement(
	    'div',
	    { id: 'title' },
	    '\u8FD9\u91CC\u662F\u6765\u81EASSR\u7684\u95EE\u5019\u3002',
	    React.createElement(
	      'ul',
	      null,
	      React.createElement(
	        'li',
	        null,
	        'a'
	      ),
	      React.createElement(
	        'li',
	        null,
	        'b'
	      ),
	      React.createElement(
	        'li',
	        null,
	        'c'
	      )
	    )
	  ));
	};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("react");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("react-dom/server");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var ReactDOMServer = __webpack_require__(6);
	var React = __webpack_require__(5);
	
	var util = __webpack_require__(8);
	var assert = __webpack_require__(9);
	var path = __webpack_require__(3);
	var defaultOpts = {
	  doctype: '<!DOCTYPE html>',
	  extname: '.js', // view层直接渲染文件名后缀
	  beautify: false, // 是否需要对dom结构进行格式化
	  writeResp: false // 是否需要在view层直接输出
	
	
	  /**
	   * 需要给ctx添加config
	   *            -viewpath: 视图路径
	   * @param {Object} ctx Koa实例
	   */
	};module.exports = function (app) {
	  var opts = app.config.reactview || {};
	  assert(opts && opts.viewpath && util.isString(opts.viewpath), '[reactview] viewpath is required, please check config!');
	  var options = Object.assign({}, defaultOpts, opts);
	
	  app.render = function (ctx) {
	    var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    var defaultCfg = { module: '', _locals: {}, children: null };
	    cfg = _extends({}, defaultCfg, cfg);
	    var render = ReactDOMServer.renderToString;
	    var props = Object.assign({}, cfg._locals);
	    var markup = options.doctype;
	    try {
	      var component = cfg.module;
	      var children = cfg.children;
	      // Transpiled ES6 may export components as { default: Component }
	      // component = component.default || component
	      markup += render(React.createElement(component, props, children));
	    } catch (err) {
	      err.code = 'REACT';
	      throw err;
	    }
	    ctx.response.type = 'html';
	    ctx.response.body = markup;
	    return markup;
	  };
	};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = require("util");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = require("assert");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	
	'use strict';
	
	var mount = __webpack_require__(11);
	var staticCache = __webpack_require__(12);
	
	module.exports = function (opts, app) {
	  var options = opts.staticOpts;
	
	  return mount(options.router, staticCache(options.dir, {
	    maxAge: options.maxage,
	    buffer: true
	  }));
	};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = require("koa-mount");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = require("koa-static-cache");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = require("koa-static");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = require("regenerator-runtime/runtime");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./views/SSRComp": 16
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 15;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _path = __webpack_require__(3);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Content = __webpack_require__(17);
	
	var _Content2 = _interopRequireDefault(_Content);
	
	var _Default = __webpack_require__(18);
	
	var _Default2 = _interopRequireDefault(_Default);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	// import Content from '../../src/components/js/SSRComp/Content'
	
	
	var SSRComp = function (_Component) {
	  _inherits(SSRComp, _Component);
	
	  function SSRComp() {
	    _classCallCheck(this, SSRComp);
	
	    return _possibleConstructorReturn(this, (SSRComp.__proto__ || Object.getPrototypeOf(SSRComp)).apply(this, arguments));
	  }
	
	  _createClass(SSRComp, [{
	    key: 'render',
	    value: function render() {
	      var showMsg = this.props.showMsg;
	      // let homeJs = `${microdata.styleDomain}/build/${microdata.styleVersion}/js/home.js`
	      // let scriptUrls = [homeJs]
	
	      return _react2["default"].createElement(
	        _Default2["default"],
	        {
	          title: "demo" },
	        _react2["default"].createElement(
	          'div',
	          { id: 'demoApp' },
	          _react2["default"].createElement(_Content2["default"], { showMsg: showMsg })
	        )
	      );
	    }
	  }]);
	
	  return SSRComp;
	}(_react.Component);
	
	SSRComp.propTypes = {
	  myMsg: _react.PropTypes.string
	};
	
	
	module.exports = SSRComp;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(5);
	var PropTypes = __webpack_require__(5).PropTypes;
	
	var Content = function (_React$Component) {
	  _inherits(Content, _React$Component);
	
	  function Content(props) {
	    _classCallCheck(this, Content);
	
	    return _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));
	  }
	
	  _createClass(Content, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'span',
	          { id: 'showMsgSp' },
	          this.props.showMsg
	        ),
	        React.createElement(
	          'h4',
	          null,
	          'Content showed\uFF01\uFF01'
	        )
	      );
	    }
	  }]);
	
	  return Content;
	}(React.Component);
	
	Content.propTypes = {
	  showMsg: PropTypes.string
	};
	
	module.exports = Content;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	
	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(5);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Default = function (_Component) {
	  _inherits(Default, _Component);
	
	  function Default() {
	    _classCallCheck(this, Default);
	
	    return _possibleConstructorReturn(this, (Default.__proto__ || Object.getPrototypeOf(Default)).apply(this, arguments));
	  }
	
	  _createClass(Default, [{
	    key: 'renderScripts',
	    value: function renderScripts() {
	      var scriptUrls = this.props.scriptUrls;
	
	      var items = [];
	      scriptUrls && scriptUrls.map(function (url, i) {
	        items.push(_react2["default"].createElement('script', { key: i, src: url }));
	      });
	      return items;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          title = _props.title,
	          children = _props.children;
	      // let vendorsJs = `${microdata.domain}/build/${microdata.version}/js/vendors.js`
	      // <script src={vendorsJs} />
	
	      var src = 'http://localhost:8888/bundle.js';
	      return _react2["default"].createElement(
	        'html',
	        null,
	        _react2["default"].createElement(
	          'div',
	          null,
	          'layouts'
	        ),
	        _react2["default"].createElement(
	          'head',
	          null,
	          _react2["default"].createElement('meta', { charSet: 'utf-8' }),
	          _react2["default"].createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge,chrome=1' }),
	          _react2["default"].createElement('meta', { httpEquiv: 'Cache-Control', content: 'no-siteapp' }),
	          _react2["default"].createElement('meta', { name: 'renderer', content: 'webkit' }),
	          _react2["default"].createElement('meta', { name: 'keywords', content: 'demo' }),
	          _react2["default"].createElement('meta', { name: 'description', content: 'demo' }),
	          _react2["default"].createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
	          _react2["default"].createElement(
	            'title',
	            null,
	            title
	          )
	        ),
	        _react2["default"].createElement(
	          'body',
	          null,
	          children,
	          this.renderScripts(),
	          _react2["default"].createElement('script', { src: src })
	        )
	      );
	    }
	  }]);
	
	  return Default;
	}(_react.Component);
	
	Default.propTypes = {
	  children: _react.PropTypes.object,
	  title: _react.PropTypes.string,
	  scriptUrls: _react.PropTypes.array,
	  showMsg: _react.PropTypes.string
	};
	
	module.exports = Default;

/***/ })
/******/ ]);
//# sourceMappingURL=run-app.js.map