/* jshint laxcomma: true */

var assert = require('assert')
  , soda = require('soda')
  , steps = require('./support/soda.pop')
  , step = steps.step
  , serc = require('serc.js')
  , app = require('./app/app');

var Browser = soda.createClient({
  host: 'localhost',
  port: 4444,
  url: 'http://localhost:7331',
  browser: 'chrome'
});



describe('md.wys.js', function() {
  this._timeout = 9999;

  var selenium
    , browser;

  before(function(done) {
    selenium = serc(function() {
      app.listen(7331, done);
    });
  });

  after(function() {
    selenium.kill();
  });


  beforeEach(function() {
    browser = Browser.chain.session();
  });

  it.only('renders the typed in markdown text to html', function(done) {
    browser
      .open('/')
      .when('I type "# hello world!" in the editor')
      .then('the preview should render "h1" with "hello world!"')
      .end(done);
  });
});


/* steps
 */

step('I type "# hello world!" in the editor', function() {
  var str = '# hello world!';

  this
    .type('css=[data-md-wys-editor]', str)
    .typeKeys('css=[data-md-wys-editor]', str);
});

step('the preview should render "h1" with "hello world!"', function() {
  this
    .waitForVisible('css=[data-md-wys-preview] h1')
    .assertText('css=[data-md-wys-preview] h1', 'hello world!');
});

