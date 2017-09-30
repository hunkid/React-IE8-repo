
'use strict'

const React = require('react')
const Component = require('react').Component
const PropTypes = require('react').PropTypes
const ContentView = require('./ContentView')

class ZooView extends Component {
  static propTypes = {
    params: PropTypes.object,
  }

  render() {
    let { params } = this.props
    return (
      <div>
        <h3>Animal in zoo name: {params.animal}</h3>
        <ContentView zoo={params.animal} />
      </div>
    )
  }
}

module.exports = ZooView
