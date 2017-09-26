'use strict'
const React = require('react')
const Content = require('./Content')
const ReactDom = require('react-dom')

const appEle = document.getElementById('demoApp')
ReactDom.render(<Content showMsg="ClientSide Render" />, appEle)
