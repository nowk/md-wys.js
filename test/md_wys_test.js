/* jshint laxcomma: true */

// stub out some browser based goodies
window = false;


var assert = require('assert')
  , mdwys = require('../md-wys.js');

var editor = {
  value: '',
  mockeventstack: {},
  dispatchEvent: function(type, args) {
    this.mockeventstack[type](args);
  },
  addEventListener: function(type, fn) {
    this.mockeventstack[type] = fn;
  }
};

var preview = {
  innerHTML: ''
};


describe('mdwys', function() {
  it('renders the value in the editor into the preview', function() {
    var e1 = Object.create(editor)
      , p1 = Object.create(preview);

    mdwys(e1, p1, 0);
    e1.dispatchEvent('keyup', {target: {value: 'Hello World!'}});

    setTimeout(function() {
      assert.equal(p1.innerHTML, '<p>Hello World!</p>');
    }, 5);
  });


  it('renders to the proper preview object', function() {
    var e1 = Object.create(editor)
      , e2 = Object.create(editor)
      , p1 = Object.create(preview)
      , p2 = Object.create(preview);

    mdwys(e1, p1, 0);
    mdwys(e2, p2, 0);

    e1.dispatchEvent('keyup', {target: {value: 'Hello World!'}});
    e2.dispatchEvent('keyup', {target: {value: 'Foo Bar!'}});

    setTimeout(function() {
      assert.equal(p2.innerHTML, '<p>Foo Bar!</p>');
      assert.equal(p1.innerHTML, '<p>Hello World!</p>');
    }, 5);
  });
});

