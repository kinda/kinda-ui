'use strict';

let KindaLocalizer = require('kinda-localizer');

let English = KindaLocalizer.English.extend('KindaLocalizer', {
  alertDialogTitle: 'Alert',
  confirmDialogTitle: 'Confirmation',
  promptDialogTitle: 'Prompt',
  okButton: 'OK',
  cancelButton: 'Cancel',
  unknownErrorMessage: 'An error occured.',
  missingOrInvalidInformationMessage: 'Some information is missing or invalid.',
  datePickerFormat: 'mm/dd/yyyy'
});

module.exports = English;
