/* jshint laxcomma: true */

var assert = require('assert')
  , mdutils = require('../md-wys.utils');

var editor = {
  value: ''
};


describe('utils.surrounded', function() {
  describe('when no match', function() {
    it('returns the original text range used to run the match against', function() {
      editor.value = 'Hello _World_!';
      var surrounded = mdutils.surrounded.call(editor, '__', 6, 15);
      assert('string' === typeof surrounded);
      assert.equal(surrounded, 'o _World_!');
    });
  });

  describe('when has matching end points', function() {
    it('returns a match payload', function() {
      editor.value = 'Hello __World__!';
      var s1 = mdutils.surrounded.call(editor, '__', 6, 15);
      assert('object' === typeof s1);
      assert.equal(s1[1], 'o ');
      assert.equal(s1[2], '__World__');
      assert.equal(s1[3], '!');

      editor.value = 'Hello ___World___!';
      var s2 = mdutils.surrounded.call(editor, '_', 6, 17);
      assert.equal(s2[1], ' ');
      assert.equal(s2[2], '___World___');
      assert.equal(s2[3], '!');
    });
  });

  it('works with nested expressions', function() {
    editor.value = 'Hello _World __foo___!';
    var s1 = mdutils.surrounded.call(editor, '__', 6, 21);
    assert.equal(s1, 'o _World __foo___!');

    var s2 = mdutils.surrounded.call(editor, '_', 6, 21);
    assert.equal(s2[1], ' ');
    assert.equal(s2[2], '_World __foo___');
    assert.equal(s2[3], '!');

    editor.value = 'Hello ___World___!';
    var s3 = mdutils.surrounded.call(editor, '__', 6, 16);
    assert.equal(s3[1], 'o ');
    assert.equal(s3[2], '___World___');
    assert.equal(s3[3], '!');
  });

  it.skip('works with inner selection', function() {
    editor.value = 'Hello ___World___!';
    var s1 = mdutils.surrounded.call(editor, '__', 9, 14);
    assert.equal(s1[1], 'o ');
    assert.equal(s1[2], '___World___');
    assert.equal(s1[3], '!');
  });
});

describe('utils.unsurround', function() {
  it.skip('unsurrounds the selected word', function() {
    editor.value = 'Hello __World__!';
    mdutils.unsurround.call(editor, '__', 8, 13);

    assert.equal(editor.value, 'Hello World!');
  });

  it('only removes the matching surrouding string', function() {
    editor.value = 'Hello World!';
    mdutils.unsurround.call(editor, '__', 6, 11);

    assert.equal(editor.value, 'Hello World!');
  });

  it('unbolds __expression__', function() {
    editor.value = 'Hello __World__!';
    mdutils.unsurround.call(editor, '__', 6, 15);

    assert.equal(editor.value, 'Hello World!');
  });

  it.skip('surroundings must match the pattern', function() {
    editor.value = 'Hello __World__!';
    mdutils.unsurround.call(editor, '_', 6, 15, true);

    assert.equal(editor.value, 'Hello __World__!');
  });

  it('removes bold', function() {
    editor.value = 'Hello ___World___!';
    mdutils.unsurround.call(editor, '__', 6, 17, true);

    assert.equal(editor.value, 'Hello _World_!');
  });

  it('removes italic', function() {
    editor.value = 'Hello ___World___!';
    mdutils.unsurround.call(editor, '_', 6, 17, true);

    assert.equal(editor.value, 'Hello __World__!');
  });
});

