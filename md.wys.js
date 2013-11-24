/* jshint laxcomma: true */

(function() {
  var Showdown;

  if (window.Showdown) {
    Showdown = window.Showdown;
  } else if ('function' === typeof require) {
    Showdown = require('showdown');
  } else {
    throw new Error('showdown.js is required to run md.wys.js');
  }


  var showdown = new Showdown.converter();


  /* mdwys
   */

  function mdwys(editor, preview, throspeed) {
    editor.addEventListener('keyup', keyup(throspeed).bind(preview)); 

    if (editor.value.trim()) {
      render.call(preview, editor.value);
    }
  }


  /* keyup handler
   */

  function keyup(throspeed) {
    var throttle;

    if ('number' !== typeof throspeed) {
      throspeed = 250;
    }

    return function(evt) {
      if (throttle) {
        clearTimeout(throttle);
      }

      throttle = setTimeout(render.bind(this, evt.target.value), throspeed);
    };
  }


  /* render html to <preview>
   */

  function render(text) {
    this.innerHTML = showdown.makeHtml(text);
  }


  /* helper to init from selector string
   */

  mdwys.init = function(opts, speed) {
    var editor = document.querySelector(opts.editor)
      , preview = document.querySelector(opts.preview);

    mdwys(editor, preview, speed);
  };


  //\/\
  if ('object' === typeof module) {
    module.exports = exports = mdwys;
  } else {
    this.mdwys = mdwys;
  }

}).call(this);

