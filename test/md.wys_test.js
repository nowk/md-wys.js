/* jshint laxcomma: true */

// stub out some browser based goodies
window = false;

CustomEvent = function() {
  //
};


var assert = require('assert')
  , sinon = require('sinon')
  , mdwys = require('../md.wys.js');

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


describe('core', function() {
  it('renders the value in the editor into the preview', function() {
    mdwys(editor, preview, 0);
    editor.dispatchEvent('keyup', {target: {value: 'Hello World!'}});

    setTimeout(function() {
      assert.equal(preview.innerHTML, '<p>Hello World!</p>');
    }, 5);
  });
});


describe('utils.surround', function() {
  it('surrounds the selected word', function() {
    editor.value = 'Hello World!';
    editor.selectionStart = 6;
    editor.selectionEnd = 11;
    mdwys.utils.surround('__').call(editor);

    assert.equal(editor.value, 'Hello __World__!');

    mdwys.utils.surround('__').call(editor, 8, 13);
    assert.equal(editor.value, 'Hello ____World____!');
  });
});


describe('utils.unsurround', function() {
  it('unsurrounds the selected word', function() {
    editor.value = 'Hello __World__!';
    editor.selectionStart = 8;
    editor.selectionEnd = 13;
    mdwys.utils.unsurround('__').call(editor);

    assert.equal(editor.value, 'Hello World!');
  });

  it('only removes the matching surrouding string', function() {
    editor.value = 'Hello World!';
    editor.selectionStart = 6;
    editor.selectionEnd = 11;
    mdwys.utils.unsurround('__').call(editor);

    assert.equal(editor.value, 'Hello World!');
  });
});

