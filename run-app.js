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

	'use strict';
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	var Koa = __webpack_require__(1);
	var koaRouter = __webpack_require__(2);
	var path = __webpack_require__(3);
	var reactview = __webpack_require__(4);
	var Static = __webpack_require__(9);
	var serve = __webpack_require__(12);
	__webpack_require__(13);
	var port = 8888;
	
	var App = function App() {
	  var app = new Koa();
	  var viewpath = './views/';
	  var SSRComp = __webpack_require__(14)(viewpath + 'SSRComp');
	  var Zoo = __webpack_require__(18)(viewpath + 'Zoo');
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
	
	  router.get('/zoo/:animal', function () {
	    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(ctx, next) {
	      var animal;
	      return regeneratorRuntime.wrap(function _callee2$(_context2) {
	        while (1) {
	          switch (_context2.prev = _context2.next) {
	            case 0:
	              animal = ctx.params.animal;
	
	              app.render(ctx, {
	                module: Zoo,
	                _locals: {
	                  isServer: true
	                }
	              });
	
	            case 2:
	            case 'end':
	              return _context2.stop();
	          }
	        }
	      }, _callee2, undefined);
	    }));
	
	    return function (_x3, _x4) {
	      return _ref2.apply(this, arguments);
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
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var ReactDOMServer = __webpack_require__(5);
	var React = __webpack_require__(6);
	
	var util = __webpack_require__(7);
	var assert = __webpack_require__(8);
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
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("react-dom/server");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("react");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = require("util");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = require("assert");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	
	'use strict';
	
	var mount = __webpack_require__(10);
	var staticCache = __webpack_require__(11);
	
	module.exports = function (opts, app) {
	  var options = opts.staticOpts;
	
	  return mount(options.router, staticCache(options.dir, {
	    maxAge: options.maxage,
	    buffer: true
	  }));
	};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = require("koa-mount");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = require("koa-static-cache");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = require("koa-static");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = require("regenerator-runtime/runtime");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./views/SSRComp": 15
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
	webpackContext.id = 14;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _path = __webpack_require__(3);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Content = __webpack_require__(16);
	
	var _Content2 = _interopRequireDefault(_Content);
	
	var _Default = __webpack_require__(17);
	
	var _Default2 = _interopRequireDefault(_Default);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
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
	
	      var homeJs = 'http://localhost:8888/ssrComp.js';
	      var scriptUrls = [homeJs];
	      return _react2["default"].createElement(
	        _Default2["default"],
	        {
	          title: "demo",
	          scriptUrls: scriptUrls },
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(6);
	var PropTypes = __webpack_require__(6).PropTypes;
	
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	
	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(6);
	
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
	      // let src = 'http://localhost:8888/bundle.js'
	
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
	          this.renderScripts()
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

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./views/Zoo": 19
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
	webpackContext.id = 18;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _path = __webpack_require__(3);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _RT = __webpack_require__(20);
	
	var _RT2 = _interopRequireDefault(_RT);
	
	var _Default = __webpack_require__(17);
	
	var _Default2 = _interopRequireDefault(_Default);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Zoo = function (_Component) {
	  _inherits(Zoo, _Component);
	
	  function Zoo() {
	    _classCallCheck(this, Zoo);
	
	    return _possibleConstructorReturn(this, (Zoo.__proto__ || Object.getPrototypeOf(Zoo)).apply(this, arguments));
	  }
	
	  _createClass(Zoo, [{
	    key: 'render',
	    value: function render() {
	      var showMsg = this.props.showMsg;
	
	      var homeJs = 'http://localhost:8888/zoo.js';
	      var scriptUrls = [homeJs];
	      return _react2["default"].createElement(
	        _Default2["default"],
	        {
	          title: "demo",
	          scriptUrls: scriptUrls },
	        _react2["default"].createElement(
	          'div',
	          { id: 'demoApp' },
	          'asdasdas'
	        )
	      );
	    }
	  }]);
	
	  return Zoo;
	}(_react.Component);
	
	Zoo.propTypes = {
	  myMsg: _react.PropTypes.string
	};
	
	
	module.exports = Zoo;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(6);
	var Component = __webpack_require__(6).Component;
	var PropTypes = __webpack_require__(6).PropTypes;
	var Router = __webpack_require__(21).Router;
	var Route = __webpack_require__(21).Route;
	var IndexRoute = __webpack_require__(21).IndexRoute;
	var IndexRedirect = __webpack_require__(21).IndexRedirect;
	var browserHistory = __webpack_require__(21).browserHistory;
	var createMemoryHistory = __webpack_require__(21).createMemoryHistory;
	
	var LayoutView = __webpack_require__(22);
	var ZooView = __webpack_require__(23);
	// const ContentView = require('./components/ContentView.js')
	
	var RT = function (_Component) {
	  _inherits(RT, _Component);
	
	  function RT() {
	    _classCallCheck(this, RT);
	
	    return _possibleConstructorReturn(this, (RT.__proto__ || Object.getPrototypeOf(RT)).apply(this, arguments));
	  }
	
	  _createClass(RT, [{
	    key: 'render',
	
	
	    //  wrapComponent(Component) {
	    //   return React.createClass({
	    //     render() {
	    //       return React.createElement(Component, {
	    //       }, this.props.children)
	    //     }
	    //   })
	    // }
	    value: function render() {
	      var isServer = this.props.isServer;
	
	      return React.createElement(
	        Router,
	        { history: isServer ? createMemoryHistory('/zoo') : browserHistory },
	        React.createElement(
	          Route,
	          { path: '/', component: LayoutView },
	          React.createElement(IndexRoute, { component: ZooView }),
	          React.createElement(Route, { path: '/zoo/:animal', component: ZooView })
	        )
	      );
	    }
	  }]);
	
	  return RT;
	}(Component);
	
	RT.propTypes = {
	  isServer: PropTypes.bool };
	exports["default"] = RT;
	module.exports = exports['default'];

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	module.exports = require("react-router");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	
	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(6);
	var Component = __webpack_require__(6).Component;
	var PropTypes = __webpack_require__(6).PropTypes;
	var cloneElement = __webpack_require__(6).cloneElement;
	
	var Link = __webpack_require__(21).Link;
	var IndexLink = __webpack_require__(6).IndexLink;
	
	var ACTIVE = { color: 'red' };
	
	var LayoutView = function (_Component) {
	  _inherits(LayoutView, _Component);
	
	  function LayoutView() {
	    _classCallCheck(this, LayoutView);
	
	    return _possibleConstructorReturn(this, (LayoutView.__proto__ || Object.getPrototypeOf(LayoutView)).apply(this, arguments));
	  }
	
	  _createClass(LayoutView, [{
	    key: 'renderChildren',
	    value: function renderChildren() {
	      var _props = this.props,
	          zoo = _props.zoo,
	          children = _props.children;
	
	      var items = [];
	      React.Children.map(children, function (child, i) {
	        items.push(cloneElement(child, {
	          key: i,
	          zoo: zoo
	        }));
	      });
	      return items;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'h1',
	          null,
	          'APP zoos!'
	        ),
	        React.createElement(
	          'ul',
	          null,
	          React.createElement(
	            'li',
	            null,
	            React.createElement(
	              Link,
	              { to: '/zoo/pig', activeStyle: ACTIVE },
	              'pig'
	            )
	          ),
	          React.createElement(
	            'li',
	            null,
	            React.createElement(
	              Link,
	              { to: '/zoo/duck', activeStyle: ACTIVE },
	              '/zoo/duck'
	            )
	          ),
	          React.createElement(
	            'li',
	            null,
	            React.createElement(
	              Link,
	              { to: '/zoo/chicken', activeStyle: ACTIVE },
	              '/zoo/chicken'
	            )
	          )
	        ),
	        React.createElement('hr', null),
	        this.props.children
	      );
	    }
	  }]);
	
	  return LayoutView;
	}(Component);
	
	LayoutView.propTypes = {
	  zoo: PropTypes.string
	};
	exports["default"] = LayoutView;
	module.exports = exports['default'];

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	
	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(6);
	var Component = __webpack_require__(6).Component;
	var PropTypes = __webpack_require__(6).PropTypes;
	var ContentView = __webpack_require__(24);
	
	var ZooView = function (_Component) {
	  _inherits(ZooView, _Component);
	
	  function ZooView() {
	    _classCallCheck(this, ZooView);
	
	    return _possibleConstructorReturn(this, (ZooView.__proto__ || Object.getPrototypeOf(ZooView)).apply(this, arguments));
	  }
	
	  _createClass(ZooView, [{
	    key: 'render',
	    value: function render() {
	      var params = this.props.params;
	
	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'h3',
	          null,
	          'Animal in zoo name: ',
	          params.animal
	        ),
	        React.createElement(ContentView, { zoo: params.animal })
	      );
	    }
	  }]);
	
	  return ZooView;
	}(Component);
	
	ZooView.propTypes = {
	  params: PropTypes.object
	};
	
	
	module.exports = ZooView;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	
	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(6);
	var Component = __webpack_require__(6).Component;
	var PropTypes = __webpack_require__(6).PropTypes;
	
	var ContentView = function (_Component) {
	  _inherits(ContentView, _Component);
	
	  function ContentView() {
	    _classCallCheck(this, ContentView);
	
	    return _possibleConstructorReturn(this, (ContentView.__proto__ || Object.getPrototypeOf(ContentView)).apply(this, arguments));
	  }
	
	  _createClass(ContentView, [{
	    key: 'getText',
	    value: function getText(zoo) {
	      return 'this data is fetch from zoo of ' + zoo;
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var zoo = this.props.zoo;
	
	      this.setState({
	        text: this.getText(zoo)
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var zoo = nextProps.zoo;
	
	      this.setState({
	        text: this.getText(zoo)
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var text = this.state.text;
	
	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'span',
	          null,
	          text
	        )
	      );
	    }
	  }]);
	
	  return ContentView;
	}(Component);
	
	ContentView.propTypes = {
	  zoo: PropTypes.string
	};
	ContentView.state = {
	  text: 'please fetch zoo of data from server!'
	};
	
	
	module.exports = ContentView;

/***/ })
/******/ ]);
//# sourceMappingURL=run-app.js.map