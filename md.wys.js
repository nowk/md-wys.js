/* jshint laxcomma: true */

(function() {
  var Showdown
    , keyupevent = new CustomEvent('keyup');

  if (window.Showdown) {
    Showdown = window.Showdown;
  } else if ('function' === typeof require) {
    Showdown = require('showdown');
  } else {
    throw new Error('showdown.js is required to run md.wys.js');
  }


  var showdown = new Showdown.converter();


  /* keyup event + render initial value (if)
   */

  function mdwys(editor, preview, speed) {
    var throttle
      , throttlespeed = speed || 250;

    if (speed === 0) {
      throttlespeed = 0;
    }

    editor.addEventListener('keyup', function(evt) {
      if (throttle) {
        clearTimeout(throttle);
      }

      throttle = setTimeout(render.bind(preview, evt.target.value), throttlespeed);
    });

    if (editor.value.trim()) {
      render.call(preview, editor.value);
    }
  }


  /* render html to <preview>
   */

  function render(text) {
    this.innerHTML = showdown.makeHtml(text);
  }


  /* utilities
   */

  var utils = {};

  /* unsurround selected text
   */

  utils.unsurround = function(str) {
    return function(a, b) {
      if (!utils.is_surrounded.call(this, str)) {
        return;
      }

      var start = ('number' === typeof a && a) || this.selectionStart
        , end = b || this.selectionEnd
        , length = str.length
        , ln = l.bind(this);

      /* ___|matching outers|___
       * FIXME unsurround may need inner search |___matching outers___|
       * dblclick text selection seems to select all between || in textareas
       */

      this.value = ln(0, start-length) + ln(start, end) + ln(end+length, this.value.length);

      return true;
    };
 };


  /* surround selected text
   */

  utils.surround = function(str) {
    return function(a, b) {
      var start = ('number' === typeof a && a) || this.selectionStart
        , end = (b || this.selectionEnd)
        , length = str.length
        , ln = l.bind(this);

      if (start === end) {
        return;
      }

      this.value = ln(0, start) + str + ln(start, end) + str + ln(end, this.value.length);
    };
  };


  /* checks for already set styles and undo them
   */

  utils.is_surrounded = function (str) {
    var length = str.length
      , start = this.selectionStart
      , end = this.selectionEnd
      , sl = l.call(this, start-length, start)
      , er = l.call(this, end, end+length);

      // , sr = l.call(this, start, start+length)
      // , el = l.call(this, end, end-length)

    return (sl === str && er === str);
  };


  /* substring shortcut
   */

  function l(start, end) {
    return this.value.substring(start, end);
  }


  /* mdwys
   */

  mdwys.init = function(opts, speed, enable_editor_tool) {
    var editor = document.querySelector(opts.editor)
      , preview = document.querySelector(opts.preview);

    mdwys(editor, preview, speed);

    if (enable_editor_tool) {
      editortools.call(editor);
    }
  };

  mdwys.utils = utils;
  mdwys.editortools = editortools;


  /* editor tools
   */

  function editortools() {
    var bold = document.querySelector('[data-md-wys-fmt-bold]')
      , italic = document.querySelector('[data-md-wys-fmt-italic]');

    bold.addEventListener('click', editortools.fmt.bind(this, '__'));
    italic.addEventListener('click', editortools.fmt.bind(this, '_'));
  }

  editortools.fmt = function(str, evt) {
    if (!mdwys.utils.unsurround(str).call(this)) {
      mdwys.utils.surround(str).call(this);
    }

    this.dispatchEvent(keyupevent);
  };



  //\/\
  if ('object' === typeof module) {
    module.exports = exports = mdwys;
  } else {
    this.mdwys = mdwys;
  }

}).call(this);

