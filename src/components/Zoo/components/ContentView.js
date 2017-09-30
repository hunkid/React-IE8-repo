
'use strict'

const React = require('react')
const Component = require('react').Component
const PropTypes = require('react').PropTypes

class ContentView extends Component {
  static propTypes = {
    zoo: PropTypes.string,
  }

  static state = {
    text: `please fetch zoo of data from server!`
  }

  getText(zoo) {
    return `this data is fetch from zoo of ${zoo}`
  }

  componentWillMount() {
    let { zoo } = this.props
    this.setState({
      text: this.getText(zoo)
    })
  }

  componentWillReceiveProps(nextProps) {
    let { zoo } = nextProps
    this.setState({
      text: this.getText(zoo)
    })
  }

  render() {
    let { text } = this.state
    return (
      <div>
        <span>{text}</span>
      </div>
    )
  }
}

module.exports = ContentView
