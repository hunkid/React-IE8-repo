
'use strict'

import React, { Component, PropTypes } from 'react'

class Default extends Component {
  static propTypes = {
    children: PropTypes.object,
    title: PropTypes.string,
    scriptUrls: PropTypes.array,
    showMsg: PropTypes.string
  }

  renderScripts() {
    const {scriptUrls} = this.props
    let items = []
    scriptUrls && scriptUrls.map((url, i)=>{
      items.push(<script key={i} src={url} />)
    })
    return items
  }

  render() {
    const { title, children } = this.props
    // let vendorsJs = `${microdata.domain}/build/${microdata.version}/js/vendors.js`
    // <script src={vendorsJs} />
    return (
      <html>
        <div>layouts</div>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta httpEquiv="Cache-Control" content="no-siteapp" />
          <meta name="renderer" content="webkit" />
          <meta name="keywords" content="demo" />
          <meta name="description" content="demo" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{title}</title>
        </head>
        <body>
          {children}
          {this.renderScripts()}
        </body>
      </html>
    )
  }
}
module.exports = Default
