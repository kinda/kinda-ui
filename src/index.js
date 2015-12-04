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
    this.locale = options.locale;

    let localizer = KindaLocalizer.create([EnGB, EnUS, FrFR]);
    let localCode = options.localeCode || (this.locale && this.locale.class.code);
    this.defaultLocale = localizer.createLocale(localCode);

    this.DialogCommon = DialogCommon.inject(this);
  };

  this.getLocaleValue = function(key) {
    return (
      this._getLocaleValue(this.locale, key) ||
      this._getLocaleValue(this.defaultLocale, key)
    );
  };

  this._getLocaleValue = function(locale, key) {
    if (!locale) return undefined;
    let value = locale[key];
    if (_.isFunction(value)) value = value.bind(locale);
    return value;
  };
});

module.exports = KindaAbstractUI;
