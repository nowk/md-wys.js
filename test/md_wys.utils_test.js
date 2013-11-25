/* jshint laxcomma: true */

var assert = require('assert')
  , mdutils = require('../md-wys.utils');

var editor = {
  value: ''
};


describe('utils.surround', function() {
  it('surrounds the selected word', function() {
    editor.value = 'Hello World!';
    mdutils.surround.call(editor, '__', 6, 11);

    assert.equal(editor.value, 'Hello __World__!');
  });

  it('continues to surround the word', function() {
    editor.value = 'Hello __World__!';
    mdutils.surround.call(editor, '__', 8, 13);

    assert.equal(editor.value, 'Hello ____World____!');
  });
});


describe('utils.unsurround', function() {
  it('unsurrounds the selected word', function() {
    editor.value = 'Hello __World__!';
    mdutils.unsurround.call(editor, '__', 8, 13);

    assert.equal(editor.value, 'Hello World!');
  });

  it('only removes the matching surrouding string', function() {
    editor.value = 'Hello World!';
    mdutils.unsurround.call(editor, '__', 6, 11);

    assert.equal(editor.value, 'Hello World!');
  });
});

