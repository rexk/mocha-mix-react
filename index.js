var React = require('react');
var ReactDOM = require('react-dom');
var createStubReactClass = require('./lib/createStubReactClass');

function ReactClassGenerator(options) {
  options = options || {};
  var mockName = options.mockName;
  var tagName = options.tagName || 'DIV';
  return createStubReactClass(tagName, mockName);
}

module.exports = function reactPlugin(mochaMix) {
  mochaMix.setDefaultMockGenerator(ReactClassGenerator);

  mochaMix.afterEach(function cleanUp() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      var testDivs = document.body.childNodes;
      var result = Array.prototype.slice.call(testDivs).every(function (div) {
        return ReactDOM.unmountComponentAtNode(div);
      });
      document.body.innerHTML = '';
    }
  });
};
