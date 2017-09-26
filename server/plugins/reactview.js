'use strict'

const ReactDOMServer = require('react-dom/server')
const React = require('react')

const util = require('util')
const assert = require('assert')
const path = require('path')
const defaultOpts = {
  doctype: '<!DOCTYPE html>',
  extname: '.js',      // view层直接渲染文件名后缀
  beautify: false,     // 是否需要对dom结构进行格式化
  writeResp: false     // 是否需要在view层直接输出
}

/**
 * 需要给ctx添加config
 *            -viewpath: 视图路径
 * @param {Object} ctx Koa实例
 */
module.exports = function(app) {
  const opts = app.config.reactview || {}
  assert(opts && opts.viewpath && util.isString(opts.viewpath), '[reactview] viewpath is required, please check config!')
  const options = Object.assign({}, defaultOpts, opts)

  app.render = function(ctx, cfg = {}) {
    let defaultCfg = {module: '', _locals: {}, children: null}
    cfg = {...defaultCfg, ...cfg}
    let render = ReactDOMServer.renderToString
    let props = Object.assign({}, cfg._locals)
    let markup = options.doctype
    try {
      let component = cfg.module
      let children = cfg.children
      // Transpiled ES6 may export components as { default: Component }
      // component = component.default || component
      markup += render(React.createElement(component, props, children))
    } catch (err) {
      err.code = 'REACT'
      throw err
    }
    ctx.response.type = 'html'
    ctx.response.body = markup
    return markup
  }
}