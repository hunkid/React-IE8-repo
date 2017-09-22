/**
 * CANNOT use `import` to import `es5-shim`,
 * because `import` will be transformed to `Object.defineProperty` by babel,
 * `Object.defineProperty` doesn't exists in IE8,
 * (but will be polyfilled after `require('es5-shim')` executed).
 */

require('es5-shim')
require('es5-shim/es5-sham')
require('console-polyfill')
require('es6-promise')
require('fetch-ie8')

/**
 * CANNOT use `import` to import `react` or `react-dom`,
 * because `import` will run `react` before `require('es5-shim')`.
 */
// import React from 'react';
// import ReactDOM from 'react-dom';

const React = require('react')
const ReactDOM = require('react-dom')
const App = require('./components/App')
const A = require('./components/A')
const B = require('./components/B')
const Route = require('react-router').Route
const IndexRoute = require('react-router').IndexRoute
const Router = require('react-router').Router
// const hashHistory = require('react-router').hashHistory
const browserHistory = require('react-router').browserHistory

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={App} /> 
      <Route path="/a" component={A} />
      <Route path="/b" component={B} />
    </Route>
  </Router>,
  document.getElementById('app')
)
