/* jshint laxcomma: true */

(function() {
  var keyupevent = new CustomEvent('keyup');


  /* __bold__
   */

  function onbold(editor) {
    return toggle_surround.bind(editor, '__');
  }


  /* _italic_
   */

  function onitalic(editor) {
    return toggle_surround.bind(editor, '_');
  }



  /* editor tools
   */

  function editortools(editor) {
    var bold = document.querySelector('[data-mdwys-bold]')
      , italic = document.querySelector('[data-mdwys-italic]');

    bold
      .addEventListener('click', onbold(editor));

    italic
      .addEventListener('click', onitalic(editor));
  }


  /* surround toggler
   */

  function toggle_surround(str, evt) {
    var start = this.selectionStart
      , end = this.selectionEnd;

    var surrounded = mdwys.lang.surrounded(this.value, str, start, end)
      , surr_type = ('string' === typeof surrounded) ? 'surround' : 'unsurround';

    this.value = mdwys.lang[surr_type](this.value, str, start, end);
    this.dispatchEvent(keyupevent);
  }


  //\/\
  if ('object' === typeof module) {
    module.exports = editortools;
  } else {
    this.mdwys.editortools = editortools;
  }

}).call(this);

