/* jshint laxcomma: true */

(function() {
  var showdown;

  if (!window.Showdown) {
    throw new Error('showdown.js is required to run md.wys.js');
  } else {
    showdown = new Showdown.converter();
  }


  function core(editor, preview, speed) {
    var throttle
      , throttlespeed = (speed || 250);

    editor.addEventListener('keyup', function(evt) {
      if (throttle) {
        clearTimeout(throttle);
      }

      throttle = setTimeout(render(evt.target.value).bind(preview), throttlespeed);
    });
  }

  function render(text) {
    return function() {
      var html = showdown.makeHtml(text);
      this.innerHTML = html;
    };
  }


  /* mdwys
   */

  var mdwys = {};

  // TODO validate editor and preview
  mdwys.init = function(opts, speed) {
    var editor = document.querySelector(opts.editor)
      , preview = document.querySelector(opts.preview);

    core(editor, preview, speed);
  };


  //\/\
  this.mdwys = mdwys;

}).call(this);

