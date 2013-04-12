/**
 * Module dependencies.
 */
var dom = require('dom')
  , type = require('type')
  , object = require('object')
  , template = require("./template");

/**
 * Default options
 */

var defaults = {
  direction: 'horizontal'
}

/**
 * Module exports.
 */

module.exports = Totals;

/**
 * Creates an `Totals` instance.
 *
 * @api public
 */

function Totals (el, totals, options) {
  if (!(this instanceof Totals)) return new Totals(el, totals, options);

  this.el = dom(el);

  this.set(totals);

  options = options || {};
  this.option(options);
}

/**
 * Gets the current `totals` array
 *
 * @return {Array} the array of totals or `undefined` if none is set.
 * @api public
 */

Totals.prototype.get = function () {
  return this.totals;
}

/**
 * Sets the current `totals` array to `v`
 *
 * @param {Array} v array of objects with `id`, `title`, `value` keys.
 * @api public
 */

Totals.prototype.set = function(v) {
  this.totals = v;
  return this;
}


/**
 * Set options `setting` to `val` or get `prop` value.
 * Also accepts an object (`setting`: `val`)
 *
 * @param {String} setting
 * @param {Mixed} val
 * @return {Totals}
 * @api public
 */

Totals.prototype.option = function(setting, value) {
  if (2 == arguments.length) {
    var obj = {};
    obj[setting] = value;
    return this.setOption(obj);
  }

  if ('object' == type(setting)) {
    return this.setOption(setting);
  }

  return this.getOption(setting);
} 

/**
 * Set options `settings`.
 *
 * @param {Object} settings
 * @return {Totals} self
 * @api private
 */

Totals.prototype.setOption = function(settings) {
  this.opts = object.merge(this.opts || defaults, settings);
  return this;
};

/**
 * Get options `setting` value.
 *
 * @param {String} prop
 * @return {String}
 * @api private
 */

Totals.prototype.getOption = function(setting){
  return this.opts[setting];
};

/**
 * Renders the Totals view to `el`
 * 
 * @return {Graph}
 * @api public
 */

Totals.prototype.render = function () {
  var _self = this
    , titles = this.getOption("titles") || {}
    , order = this.getOption("order") || object.keys(this.totals);

  _self.el
    .toggleClass('metrics', true)
    .toggleClass('metrics-' + this.opts.direction, true)

  for(var i=0,len=order.length; i<len; i++) {
    var key = order[i];
    var val = this.totals[key];

    (function(key, val) {
      var total = dom(template);

      if(_self.opts.direction == "vertical") {
        total
        .get()
        .insertBefore(
            total.get().children[1]
          , total.get().children[0]
        );
      };
      total.attr('data-id', key);
      total.find('.metric-title').html(titles[key] || key);
      total.find('.metric-value').html(val);
      total.appendTo(_self.el);

    })(key, val);
  }

  return this;
}
