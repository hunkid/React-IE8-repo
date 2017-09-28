const React = require('react')
const PropTypes = require('react').PropTypes

class Content extends React.Component {
  constructor(props) {
    super(props)
  }
  static propTypes = {
    showMsg: PropTypes.string
  }
  render() {
    return (
      <div>
        <span id="showMsgSp">{this.props.showMsg}</span>
        <h4>Content showed！！</h4>
      </div>
    )
  }
}
module.exports = Content
