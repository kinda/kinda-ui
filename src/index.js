'use strict';

let KindaObject = require('kinda-object');
let KindaLocalizer = require('kinda-localizer');
let Audio = require('./audio');
let DialogCommon = require('./dialog-common');
let DialogHelpers = require('./dialog-helpers');
let English = require('./locales/english');
let French = require('./locales/french');

let KindaAbstractUI = KindaObject.extend('KindaAbstractUI', function() {
  this.include(Audio);
  this.include(DialogHelpers);

  this.creator = function(options = {}) {
    let localizer = KindaLocalizer.create({
      locales: [
        English.create(),
        French.create()
      ]
    });
    this.customLocale = options.locale || {};
    this.locale = localizer.getLocale(this.customLocale.code);

    this.DialogCommon = DialogCommon.inject(this);
  };

  this.getLocaleValue = function(key) {
    return this.customLocale[key] || this.locale[key];
  };
});

module.exports = KindaAbstractUI;
