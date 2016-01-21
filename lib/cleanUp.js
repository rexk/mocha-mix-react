var ReactDOM = require('react-dom');

function cleanUp () {
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    var testDivs = document.body.childNodes;
    Array.prototype.slice.call(testDivs).every(function (div) {
      return ReactDOM.unmountComponentAtNode(div);
    });
    document.body.innerHTML = '';
  }
}

module.exports = cleanUp;
