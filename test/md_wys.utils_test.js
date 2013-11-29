/* jshint laxcomma: true */

var assert = require('assert')
  , mdutils = require('../md-wys.utils');

var editor = {
  value: ''
};


describe('utils.surrounded', function() {
  describe('when no surrounds match', function() {
    it('returns the original text range + padsize |..,...,..|', function() {
      var so = mdutils.surrounded('Hello _World_!', '__', 6, 15);
      assert('string' === typeof so);
      assert.equal(so, 'lo _World_!');
    });

    it('returns the original text range + padsize ..|...|..', function() {
      var so = mdutils.surrounded('Hello _World_!', '__', 7, 12);
      assert('string' === typeof so);
      assert.equal(so, 'o _World_!');
    });
  });

  it('returns the match payload |..,...,..|', function() {
    var s1 = mdutils.surrounded('Hello __World__!', '__', 6, 15);
    assert('object' === typeof s1);
    assert.deepEqual(s1.slice(1, 4), ['lo ', '__World__', '!']);

    var s2 = mdutils.surrounded('Hello ___World___!', '_', 6, 17);
    assert.deepEqual(s2.slice(1, 4), ['lo ', '___World___', '!']);
  });

  it('returns the match payload ..|...|..', function() {
    var so = mdutils.surrounded('Hello ___World___!', '__', 9, 14);
    assert.deepEqual(so.slice(1, 4), ['', '___World___', '']);
  });

  it('works with nested expressions', function() {
    var s1 = mdutils.surrounded('Hello _World __foo___!', '__', 6, 21);
    assert.equal(s1, 'lo _World __foo___!');

    var s2 = mdutils.surrounded('Hello _World __foo___!', '_', 6, 21);
    assert.deepEqual(s2.slice(1, 4), ['lo ', '_World __foo___', '!']);

    var s3 = mdutils.surrounded('Hello ___World___!', '__', 6, 16);
    assert.deepEqual(s3.slice(1, 4), ['lo ', '___World___', '!']);
  });
});


describe('utils.surround', function() {
  it('surrounds the selected word |...|', function() {
    var so = mdutils.surround('Hello World!', '__', 6, 11);
    assert.equal(so, 'Hello __World__!');
  });

  it('continues to surround the word |..,...,..|', function() {
    var so = mdutils.surround('Hello __World__!', '__', 6, 15);
    assert.equal(so, 'Hello ____World____!');
  });
});


describe('utils.unsurround', function() {
  it('unsurrounds the selected word inner selection ..|...|..', function() {
    var un = mdutils.unsurround('Hello __World__!', '__', 8, 13);
    assert.equal(un, 'Hello World!');
  });

  it('unsurrounds the selected word outer selection |..,...,..|', function() {
    var un = mdutils.unsurround('Hello _World_!', '_', 6, 14);
    assert.equal(un, 'Hello World!');
  });

  it('only removes the matching surrouding string', function() {
    var u1 = mdutils.unsurround('Hello World!', '__', 6, 11);
    assert.equal(u1, 'Hello World!');

    var u2 = mdutils.unsurround('Hello ___World___!', '__', 6, 18);
    assert.equal(u2, 'Hello _World_!');
  });

  it.skip('removes the single instance in a multiple match', function() {
    var un = mdutils.unsurround('Hello __World__!', '_', 6, 15, true);
    assert.equal(un, 'Hello __World__!');
  });
});

