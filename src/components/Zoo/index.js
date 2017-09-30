'use strict'

require('es5-shim')
require('es5-shim/es5-sham')
require('console-polyfill')
require('es6-promise')

const React = require('react')
const Component = require('react').Component
const PropTypes = require('react').PropTypes
const ReactDom = require('react-dom')
const RT = require('./RT.js')

ReactDom.render(<RT isServer={false}/>, document.getElementById('demoApp'))
