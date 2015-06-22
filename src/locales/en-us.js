'use strict';

let KindaLocalizer = require('kinda-localizer');

let EnUS = KindaLocalizer.EnUS.extend('EnUS', {
  alertDialogTitle: 'Alert',
  confirmDialogTitle: 'Confirmation',
  promptDialogTitle: 'Prompt',
  okButton: 'OK',
  cancelButton: 'Cancel',
  unknownErrorMessage: 'An error occured.',
  missingOrInvalidInformationMessage: 'Some information is missing or invalid.',
  datePickerFormat: 'mm/dd/yyyy'
});

module.exports = EnUS;
