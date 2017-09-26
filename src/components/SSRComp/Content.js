const React = require('react')
const PropTypes = require('react').PropTypes

class Content extends React.Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    showMsg: PropTypes.string
  }
  componentWillMount() {
    console.log('生命周期')
    console.log(this.props)
  }
  render() {
    return (
      <div>
        {this.props.showMsg}
        <h4>Content showed！！</h4>
      </div>
    )
  }
}
module.exports = Content
