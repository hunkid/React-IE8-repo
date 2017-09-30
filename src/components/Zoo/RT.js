
'use strict'

const React = require('react')
const Component = require('react').Component
const PropTypes = require('react').PropTypes
const Router = require('react-router').Router
const Route = require('react-router').Route
const IndexRoute = require('react-router').IndexRoute
const IndexRedirect = require('react-router').IndexRedirect
const browserHistory = require('react-router').browserHistory
const createMemoryHistory = require('react-router').createMemoryHistory

const LayoutView = require('./components/LayoutView.js')
const ZooView = require('./components/ZooView.js')
// const ContentView = require('./components/ContentView.js')

class RT extends Component {
  static propTypes = {
    isServer: PropTypes.bool
  }

  //  wrapComponent(Component) {
  //   return React.createClass({
  //     render() {
  //       return React.createElement(Component, {
  //       }, this.props.children)
  //     }
  //   })
  // }
  render() {
    let { isServer } = this.props
    return (
      <Router history={isServer ? createMemoryHistory('/') : browserHistory}>
        <Route path="/" component={LayoutView}>
          <IndexRoute component={ZooView} />
          <Route path="/zoo/:animal" component={ZooView} />
        </Route>
      </Router>
    )
  }
}

export default RT
