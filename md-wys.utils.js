/* jshint laxcomma: true */

(function() {
  var utils = {};

  /* unsurround selected text
   *
   * ___|matching outers|___
   * TODO unsurround may need inner search |___matching outers___|
   * dblclick text selection seems to select all between || in textareas
   */

  utils.unsurround = function(str, start, end) {
    if (!utils.is_surrounded.call(this, str, start, end)) {
      return;
    }

    var strl = str.length
      , ln = l.bind(this);

    this.value = ln(0, start-strl)+ln(start, end)+ln(end+strl, this.value.length);
  };


  /* surround selected text
   */

  utils.surround = function(str, start, end) {
    if (!str || start === end) {
      return;
    }

    var ln = l.bind(this); // TODO do we need to bind?

    this.value = ln(0, start)+str+ln(start, end)+str+ln(end, this.value.length);
  };


  /* checks for already existing surrounding
   */

  utils.is_surrounded = function(str, start, end) {
    var strl = str.length
      , sl = l.call(this, start-strl, start)
      , er = l.call(this, end, end+strl);

    return (sl === str && er === str);
   };


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

