var React = require('react')
var ReactDom = require('react-dom/server')

module.exports = function(req, scriptFilename) {
  return ReactDom.renderToString(
    <div id="title">
        这里是来自SSR的问候。
        <ul>
          <li>a</li>
          <li>b</li>
          <li>c</li>
        </ul>
    </div>
  )
}
