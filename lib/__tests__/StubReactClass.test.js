var expect = require('expect');
var expectJSX = require('expect-jsx');
var React = require('react');
var MochaMix = require('mocha-mix');
var TestUtils = require('react/lib/ReactTestUtils');

expect.extend(expectJSX);

describe('StubReactClass', function () {
  var mixer = MochaMix.mix({
    rootDir: __dirname,
    import: '../StubReactClass',
    mocks: {
      getDisplayName: {
        import: './getDisplayName',
        mock: function () {
          return 'AlwaysSameName';
        }
      }
    }
  });
  var ShallowRenderer;
  var StubReactClass;
  beforeEach(function () {
    StubReactClass = mixer.require();
    ShallowRenderer = TestUtils.createRenderer();
  });

  it('should create <div>', function () {
    var StubDiv = StubReactClass();
    ShallowRenderer.render(<StubDiv />);
    var actual = ShallowRenderer.getRenderOutput();
    expect(actual).toEqualJSX(<div></div>);
  });

  it('should create <${tag}>', function () {
    var StubInput = StubReactClass('input');
    ShallowRenderer.render(<StubInput />);
    var actual = ShallowRenderer.getRenderOutput();
    expect(actual).toEqualJSX(<input />);
  });

  it('should render with given props', function () {
    var StubClass = StubReactClass('div', 'MyComponent');
    var props = { a: 1, b: 'name' };
    ShallowRenderer.render(<StubClass {...props}/>);
    var actual = ShallowRenderer.getRenderOutput();
    expect(actual).toEqualJSX(<div {...props}></div>);
  });

  it('should render with given children', function () {
    var StubClass = StubReactClass('ul', 'MyComponent');
    var props = { a: 1, b: 'name' };
    ShallowRenderer.render(
      <StubClass {...props}>
        <li>one</li>
        <li>two</li>
      </StubClass>
    );
    var actual = ShallowRenderer.getRenderOutput();
    expect(actual).toEqualJSX(
      <ul {...props}>
        <li>one</li>
        <li>two</li>
      </ul>
    );
  });
});
