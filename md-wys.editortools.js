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


  /* surround toggler
   */

  function surround(str, evt) {
    var args = [str, this.selectionStart, this.selectionEnd]
      , surrounded = mdwys.utils.surrounded.apply(this, args);

    if ('string' === typeof surrounded) {
      mdwys.utils.surround.apply(this, args);
    } else {
      mdwys.utils.unsurround.apply(this, args);
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

