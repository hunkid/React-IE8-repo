import React from 'react'
import './app.scss'
import Navigation from './Navigation'
class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className="test">IE8填坑之旅</h1>
        <span>这是主页，以后这里要添加props</span>
        <Navigation />
        {this.props.children}
      </div>
    )
  }
}

export default App
