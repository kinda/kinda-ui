'use strict';

let KindaLocalizer = require('kinda-localizer');

let EnGB = KindaLocalizer.EnGB.extend('EnGB', {
  alertDialogTitle: 'Alert',
  confirmDialogTitle: 'Confirmation',
  promptDialogTitle: 'Prompt',
  okButton: 'OK',
  cancelButton: 'Cancel',
  unknownErrorMessage: 'An error occured.',
  missingOrInvalidInformationMessage: 'Some information is missing or invalid.',
  datePickerFormat: 'dd/mm/yyyy'
});

module.exports = EnGB;
