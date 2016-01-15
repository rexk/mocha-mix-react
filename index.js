var React = require('react');

function getDisplayName(tagName, name) {
  if (name) {
    return 'MixStub(' + name + '.' + tagName.toLowerCase() +')';
  }

  return 'MixStub(' + tagName.toLowerCase() + ')';
}

/**
 * createSubReactclass
 *
 * @param  {string}           name    name to be a displayName
 * @return {ReactComponent}
 */
function createStubReactClass(tagName, name) {
  tagName = tagName || 'DIV';
  return React.createClass({
    displayName: getDisplayName(tagName, name),
    render: function () {
      return React.createElement(
        tagName,
        this.props,
        this.props.children
      );
    }
  });
}

module.exports = function reactPlugin(manager) {
  var reactGenerator = manager.createMockGenerator(function (options) {
    var mockName = options.mockName;
    return createStubReactClass('DIV', mockName);
  });

  manager.setDefaultMock(reactGenerator);
};
