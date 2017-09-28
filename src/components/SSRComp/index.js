'use strict'

require('es5-shim')
require('es5-shim/es5-sham')
require('console-polyfill')
require('es6-promise')

const React = require('react')
const Content = require('./Content')
const ReactDom = require('react-dom')

const appEle = document.getElementById('demoApp')
const txt = document.getElementById('showMsgSp').innerHTML
// console.log(txt)
ReactDom.render(<Content showMsg={txt + ',ClientRerender'} />, appEle)
