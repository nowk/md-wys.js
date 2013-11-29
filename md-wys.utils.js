/* jshint laxcomma: true */

(function() {
  /* language utilities for markdown string manipulation
   *
   */

  var utils = {}
    , padsize = 3;


  /* removes surrounding string from text range (start+end)
   */

  utils.unsurround = function(text, str, start, end) {
    var surstring = utils.surrounded(text, str, start, end);

    if ('string' === typeof surstring) {
      return text;
    }

    var st = surstring[0]
      , r = new RegExp('('+str+'{1})(.+)('+str+'{1})')
      , unsstring = surstring[2].match(r);

    if (unsstring) {
      st = surstring[1] + unsstring[2] + surstring[3];
    }

    return rebuild_string.call(text, st, start-padsize, end+padsize);
  };


  /* wrap text range with string (pref/append)
   */

  utils.surround = function(text, str, start, end) {
    if (!text || !str || start === end) {
      return;
    }

    var t = text.substring(start, end)
      , st = str+t+str;

    return rebuild_string.call(text, st, start, end);
  };


  /* returns surrounded by str of text from range with padding
   *
   * //----------------1234567890123456
   *
   * utils.surrounded('Hello _World_!', __, 6, 13);   // no match
   * => 'lo _World_!'
   *
   * utils.surrounded('Hello __World__!', __, 6, 14); // match
   * => ['lo __World__!', 'lo ', '__World__', '!', ...]
   */

  utils.surrounded = function(text, str, start, end) {
    var t = text.substring(start-padsize, end+padsize); // look surround 3

    return t.match('^([^'+str+']*)('+str+'{1}.+'+str+'{1})([^'+str+']*)$') || t;
  };


  /* rebuild string
   */

  function rebuild_string(text, start, end) {
    return this.substring(0, start) + text + this.substring(end, this.length);
  }



  //\/\
  if ('object' === typeof module) {
    module.exports = utils;
  } else {
    this.mdwys.lang = utils;
  }

}).call(this);

