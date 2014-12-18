"use strict";

var _ = require('lodash');
var tr = require('kinda-translator').create();

var DialogHelpers = {
  dialog: function() { return this.Dialog.dialog.apply(this.Dialog, arguments); },
  alert: function() { return this.Dialog.alert.apply(this.Dialog, arguments); },
  confirm: function() { return this.Dialog.confirm.apply(this.Dialog, arguments); },
  prompt: function() { return this.Dialog.prompt.apply(this.Dialog, arguments); }
};

module.exports = DialogHelpers;
