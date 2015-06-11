'use strict';

let KindaObject = require('kinda-object');

let DialogHelpers = KindaObject.extend('DialogHelpers', {
  dialog() {
    return this.Dialog.dialog.apply(this.Dialog, arguments);
  },

  alert() {
    return this.Dialog.alert.apply(this.Dialog, arguments);
  },

  confirm() {
    return this.Dialog.confirm.apply(this.Dialog, arguments);
  },

  prompt() {
    return this.Dialog.prompt.apply(this.Dialog, arguments);
  }
});

module.exports = DialogHelpers;
