'use strict';

let KindaLocalizer = require('kinda-localizer');

let FrFR = KindaLocalizer.FrFR.extend('FrFR', {
  alertDialogTitle: 'Alerte',
  confirmDialogTitle: 'Confirmation',
  promptDialogTitle: 'Demande',
  okButton: 'OK',
  cancelButton: 'Annuler',
  unknownErrorMessage: 'Une erreur est survenue.',
  missingOrInvalidInformationMessage: 'Certaines informations sont manquantes ou invalides.',
  datePickerFormat: 'dd/mm/yyyy'
});

module.exports = FrFR;
