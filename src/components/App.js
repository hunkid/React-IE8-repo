import React from 'react';
import './app.scss'
import Navigation from './Navigation'
class App extends React.Component {
  render() {
    return (
      <div>
        <h1 className="test">IE8填坑之旅</h1>
        <Navigation />
        {this.props.children}
      </div>
    )
  }
}

export default App
