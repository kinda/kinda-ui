'use strict';

let _ = require('lodash');
let KindaObject = require('kinda-object');
let KindaLocalizer = require('kinda-localizer');
let Audio = require('./audio');
let DialogCommon = require('./dialog-common');
let DialogHelpers = require('./dialog-helpers');
let EnGB = require('./locales/en-gb');
let EnUS = require('./locales/en-us');
let FrFR = require('./locales/fr-fr');

let KindaAbstractUI = KindaObject.extend('KindaAbstractUI', function() {
  this.include(Audio);
  this.include(DialogHelpers);

  this.creator = function(options = {}) {
    let localizer = KindaLocalizer.create({
      locales: [
        EnGB.create(),
        EnUS.create(),
        FrFR.create()
      ]
    });
    this.customLocale = options.locale || {};
    this.locale = localizer.getLocale(this.customLocale.code);

    this.DialogCommon = DialogCommon.inject(this);
  };

  this.getLocaleValue = _.memoize(function(key) {
    return (
      this._getLocaleValue(this.customLocale, key) ||
      this._getLocaleValue(this.locale, key)
    );
  });

  this._getLocaleValue = function(locale, key) {
    let value = locale[key];
    if (_.isFunction(value)) value = value.bind(locale);
    return value;
  };
});

module.exports = KindaAbstractUI;
