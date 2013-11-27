/* jshint laxcomma: true */

(function() {
  var utils = {};

  /* removes markdown surrounding syntax
   */

  utils.unsurround = function(str, start, end) {
    var surrounded = utils.surrounded.call(this, str, start, end);

    // no match since we got a string back
    if ('string' === typeof surrounded) {
      return surrounded;
    }

    var strl = str.length
      , st = surrounded[2] // .slice(1, 4)
      , r = new RegExp('(_{'+strl+'})(.+)(_{'+strl+'})')
      , unsurrounded = surrounded[2].match(r);

    if (unsurrounded) {
      st = unsurrounded[2];
    }

    this.value = rebuild_markdown.call(this, st, start, end);
  };


  /* wrap text range with string (pree/append)
   */

  utils.surround = function(str, start, end) {
    if (!str || start === end) {
      return;
    }

    var t = l.call(this, start, end)
      , st = str+t+str;

    this.value = rebuild_markdown.call(this, st, start, end);
  };


  /* return markdown surrounding expression within range
   * returns the unaltered ranged string otherwise
   */

  utils.surrounded = function(str, start, end) {
    var strl = str.length
      , t = l.call(this, start-strl, end+strl);

    return t.match('^([^_]*)(_{'+strl+'}.+_{'+strl+'})([^_]*)$') || t;
  };


  /* rebuild markdown
   */

  function rebuild_markdown(text, start, end) {
    return l.call(this, 0, start) + text + l.call(this, end, this.value.length);
  }


  /* substring shortcut
   */

  function l(start, end) {
    return this.value.substring(start, end);
  }



  //\/\
  if ('object' === typeof module) {
    module.exports = utils;
  } else {
    this.mdwys.utils = utils;
  }

}).call(this);

