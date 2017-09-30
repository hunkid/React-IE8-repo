
'use strict'

const React = require('react')
const Component = require('react').Component
const PropTypes = require('react').PropTypes
const cloneElement = require('react').cloneElement

const Link = require('react-router').Link
const IndexLink = require('react').IndexLink

const ACTIVE = { color: 'red'}
class LayoutView extends Component {
  static propTypes = {
    zoo: PropTypes.string
  }

  renderChildren() {
    let { zoo, children } = this.props
    let items = []
    React.Children.map(children, function(child, i){
      items.push(cloneElement(child, {
        key: i,
        zoo: zoo
      }))
    })
    return items
  }

  render() {
    return (
      <div>
        <h1>APP zoos!</h1>
        <ul>
          <li><Link to="/zoo/pig" activeStyle={ACTIVE}>pig</Link></li>
          <li><Link to="/zoo/duck" activeStyle={ACTIVE}>/zoo/duck</Link></li>
          <li><Link to="/zoo/chicken" activeStyle={ACTIVE}>/zoo/chicken</Link></li>
        </ul>
        <hr />
        {/* {this.renderChildren()} */}
        {this.props.children}
      </div>
    )
  }
}

export default LayoutView
