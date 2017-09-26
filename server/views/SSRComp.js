'use strict'

import path from 'path'
import React, { Component, PropTypes } from 'react'
// import Content from '../../src/components/js/SSRComp/Content'
import Content from '../../src/components/SSRComp/Content'
import Default from './layout/Default'

class SSRComp extends Component {
  static propTypes = {
    myMsg: PropTypes.string
  }

  render() {
    let { showMsg } = this.props
    // let homeJs = `${microdata.styleDomain}/build/${microdata.styleVersion}/js/home.js`
    // let scriptUrls = [homeJs]
    return (
      <Default
        title={"demo"}>
        <div id="demoApp">
          <Content showMsg={showMsg} />
        </div>
      </Default>
    )
  }
}

module.exports = SSRComp

