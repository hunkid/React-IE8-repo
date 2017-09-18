import React from 'react'
var bgImgTest = require('../../assets/image/bg.jpg')
const bgStyle = {
  height: '200px',
  backgroundRepeat: 'no-repeat',
  color: '#f00',
  backgroundImage: `url(${bgImgTest})`
}
class A extends React.Component {
  state = {}
  render() {
    return (
      <div>
        <h1 style={bgStyle}>这里是A</h1>
      </div>
    )
  }
}

export default A
