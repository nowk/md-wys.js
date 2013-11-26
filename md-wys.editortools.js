/* jshint laxcomma: true */

(function() {
  var keyupevent = new CustomEvent('keyup');

  /* editor tools
   */

  function editortools(editor) {
    var bold = document.querySelector('[data-md-wys-fmt-bold]')
      , italic = document.querySelector('[data-md-wys-fmt-italic]');

    bold.addEventListener('click', surround.bind(editor, '__'));
    italic.addEventListener('click', surround.bind(editor, '_'));
  }


  /* wrapper to toggle utils.surround
   */

  function surround(str, evt) {
    var start = this.selectionStart
      , end = this.selectionEnd
      , args = [str, start, end];

    if (mdwys.utils.is_surrounded.apply(this, args)) {
      mdwys.utils.unsurround.apply(this, args);
    } else {
      mdwys.utils.surround.apply(this, args);
    }

    this.dispatchEvent(keyupevent);
  }



  //\/\
  if ('object' === typeof module) {
    module.exports = editortools;
  } else {
    this.mdwys.editortools = editortools;
  }

}).call(this);

