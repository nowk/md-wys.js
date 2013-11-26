/* jshint laxcomma: true */

// mock browser
window = false;

CustomEvent = function(name) {
  this.name = name;
};


var assert = require('assert')
  , sinon = require('sinon')
  , mdutils = require('../md-wys.utils')
  , mdeditor = require('../md-wys.editortools');


var selectors = {}
  , preview = {innerHTML: ''};

var editor = {
  value: '', 
  mockeventstack: {},
  dispatchEvent: function(type, args) {
    this.mockeventstack[type.name]({target: {value: this.value}});
  },
  addEventListener: function(type, fn) {
    this.mockeventstack[type] = fn;
  }
};


// FIXME a better way?
mdwys = require('../md-wys');
mdwys.utils = mdutils;

document = {
  querySelector: function(selector) {
    selectors[selector] = {addEventListener: mockAddEventListener};
    return selectors[selector];
  }
};

function mockAddEventListener(type, fn) {
  this.evt = fn;
}


describe('editortools', function() {
  beforeEach(function() {
    sinon.stub(editor, 'dispatchEvent');
  });

  afterEach(function() {
    editor.dispatchEvent.restore();
  });

  describe('bold', function() {
    it('bolds', function() {
      editor.value = 'Hello World!';
      editor.selectionStart = 6;
      editor.selectionEnd = 11;
      mdeditor(editor);
      selectors['[data-md-wys-fmt-bold]'].evt();

      assert.equal(editor.value, 'Hello __World__!');
      assert(editor.dispatchEvent.calledOnce);
    });

    it('unbolds', function() {
      editor.value = 'Hello __World__!';
      editor.selectionStart = 8;
      editor.selectionEnd = 13;
      mdeditor(editor);
      selectors['[data-md-wys-fmt-bold]'].evt();

      assert.equal(editor.value, 'Hello World!');
      assert(editor.dispatchEvent.calledOnce);
    });
  });

  describe('italic', function() {
    it('italisizes', function() {
      editor.value = 'Hello World!';
      editor.selectionStart = 6;
      editor.selectionEnd = 11;
      mdeditor(editor);
      selectors['[data-md-wys-fmt-italic]'].evt();

      assert.equal(editor.value, 'Hello _World_!');
      assert(editor.dispatchEvent.calledOnce);
    });

    it('unitalisizes', function() {
      editor.value = 'Hello _World_!';
      editor.selectionStart = 7;
      editor.selectionEnd = 12;
      mdeditor(editor);
      selectors['[data-md-wys-fmt-italic]'].evt();

      assert.equal(editor.value, 'Hello World!');
      assert(editor.dispatchEvent.calledOnce);
    });
  });
});

