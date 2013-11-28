/* jshint laxcomma: true */

(function() {
  /* language utilities for markdown string manipulation
   *
   */

  var utils = {}
    , padsize = 3;


  /* removes markdown surrounding syntax
   */

  utils.unsurround = function(text, str, start, end) {
    var surstring = utils.surrounded(text, str, start, end);

    if ('string' === typeof surstring) {
      return rebuild_string.call(text, surstring, start-padsize, end+padsize);
    }

    var st = surstring[0]
      , r = new RegExp('('+str+'{1})(.+)('+str+'{1})')
      , uns_string = surstring[2].match(r);

    if (uns_string) {
      st = surstring[1] + uns_string[2] + surstring[3];
    }

    return rebuild_string.call(text, st, start-padsize, end+padsize);
  };


  /* wrap text range with string (pree/append)
   */

  utils.surround = function(text, str, start, end) {
    if (!text || !str || start === end) {
      return;
    }

    var t = text.substring(start, end)
      , st = str+t+str;

    return rebuild_string.call(text, st, start, end);
  };


  /* return markdown surrounding expression within range
   * returns the unaltered ranged string otherwise
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
    this.mdwys.lang = {utils: utils};
  }

}).call(this);

