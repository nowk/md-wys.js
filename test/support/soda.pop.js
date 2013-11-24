/* jshint laxcomma: true */

var soda = require('soda')
  ;


/*
 * add then, when, given methods to soda
 *
 * @api public
 */

['then', 'when', 'given'].forEach(function(meth) {
  soda.prototype[meth] = function(step, args) {
    then(step, args).call(this, this);
    return this;
  };
});


/*
 * call steps on browser
 *
 * @api private
 */

function then(step, args) {
  return function(browser) {
    which(step).call(browser, args);
  };
}


/*
 * returns matched step
 *
 * @api private
 */

function which(step) {
  return Soda.Pop.steps[step];
}


/*
 * step stack
 */

var Soda = {};
Soda.Pop = {steps: {}};


/*
 * build steps stack
 *
 * @api public
 */

Soda.Pop.for = function(key, steps) {
  for(var step in steps) {
    if (steps.hasOwnProperty(step)) {
      Soda.Pop.step(step, steps[step]);
    }
  }
};


/*
 * load specific steps from file
 *
 * @api public
 */

Soda.Pop.use = function(filename) {
  var steps = require(__dirname+'/../steps/'+filename);
  if (steps && steps.length === 2) {
    Soda.Pop.for(steps[0], steps[1]);
  }
};


/*
 * add indvidual step
 *
 *    step('I login with password', function(password) {
 *      this
 *        .type('login[password]', password)
 *        .typeKeys('login[password]', password)
 *    });
 *
 * @api public
 */

Soda.Pop.step = function(stepname, fn) {
  Soda.Pop.steps[stepname] = fn;
};


module.exports = Soda.Pop;

