/** @jsx React.DOM */

// TODO For webpack, requires font-awesome

var Icon = React.createClass({
  displayName: 'Icon',

  render: function() {
    var iconClassName = "fa-" + this.props.icon
    var cs = React.addons.classSet('fa', iconClassName)
    return <span className={cs}></span>
  }
})

window.Icon = module.exports = Icon
