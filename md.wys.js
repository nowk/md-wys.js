/* jshint laxcomma: true */

(function() {
  var Showdown;
  try {
    Showdown = window.Showdown || require('showdown');
  } catch(e) {
    throw new Error('error loading showdown.js');
  }


  var showdown = new Showdown.converter();


  /* mdwys
   */

  function mdwys(editor, preview, throspeed) {
    editor.addEventListener('keyup', keyup.call(preview, throspeed)); 

    if (editor.value.trim()) {
      render.call(preview, editor.value);
    }
  }


  /* keyup handler
   */

  function keyup(throspeed) {
    var self = this
      , throttle;

    if ('number' !== typeof throspeed) {
      throspeed = 250;
    }

    return function(evt) {
      if (throttle) {
        clearTimeout(throttle);
      }

      throttle = setTimeout(render.bind(self, evt.target.value), throspeed);
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

