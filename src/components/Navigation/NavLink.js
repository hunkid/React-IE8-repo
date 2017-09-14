import React from 'react'
const Link = require('react-router').Link

class NavLink extends React.Component {
  render() {
    return (
      <Link
        { ...this.props }
        activeClassName = "active"
        onlyActiveOnIndex = { true } />
    )
  }
}

export default NavLink
