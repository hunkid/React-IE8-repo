'use strict'

import path from 'path'
import React, { Component, PropTypes } from 'react'
import RT from '../../src/components/Zoo/RT'
import Default from './layout/Default'

class Zoo extends Component {
    static propTypes = {
      myMsg: PropTypes.string
    }
  
    render() {
      let { showMsg } = this.props
      let homeJs = `http://localhost:8888/zoo.js`
      let scriptUrls = [homeJs]
      return (
        <Default
          title={"demo"}
          scriptUrls={scriptUrls}>
          <div id="demoApp">
            {/* <RT isServer={this.props.isServer} /> */}
            asdasdas
          </div>
        </Default>
      )
    }
  }
  
  module.exports = Zoo
