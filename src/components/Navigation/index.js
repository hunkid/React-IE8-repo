import React from 'react'
import NavLink from './NavLink'

class Navigation extends React.Component {
  render () {
    return (
      <div>
        <ul className="nav">
          <li>
            <NavLink to="/">
              首页
            </NavLink>
          </li>
          <li>
            <NavLink to="/a">
              A
            </NavLink>
          </li>
          <li>
            <NavLink to="/b">
              B
            </NavLink>
          </li>
        </ul>
      </div>
    )
  }
}

export default Navigation
