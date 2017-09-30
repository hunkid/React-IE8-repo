'use strict'

import path from 'path'
import React, { Component, PropTypes } from 'react'
import Content from '../../src/components/SSRComp/Content'
import Default from './layout/Default'

class SSRComp extends Component {
  static propTypes = {
    myMsg: PropTypes.string
  }
  scriptUrls
  render() {
    let { showMsg } = this.props
    let homeJs = `http://localhost:8888/ssrComp.js`
    let scriptUrls = [homeJs]
    return (
      <Default
        title={"demo"}
        scriptUrls={scriptUrls}>
        <div id="demoApp">
          <Content showMsg={showMsg} />
        </div>
      </Default>
    )
  }
}

module.exports = SSRComp

