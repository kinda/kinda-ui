'use strict';

let KindaLocalizer = require('kinda-localizer');

let French = KindaLocalizer.French.extend('KindaLocalizer', {
  alertDialogTitle: 'Alerte',
  confirmDialogTitle: 'Confirmation',
  promptDialogTitle: 'Demande',
  okButton: 'OK',
  cancelButton: 'Annuler',
  unknownErrorMessage: 'Une erreur est survenue.',
  missingOrInvalidInformationMessage: 'Certaines informations sont manquantes ou invalides.',
  datePickerFormat: 'dd/mm/yyyy'
});

module.exports = French;
