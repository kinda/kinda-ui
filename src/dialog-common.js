'use strict';

let _ = require('lodash');

let DialogCommon = {
  inject(ui) {
    return {
      statics: {
        dialog(options = {}) {
          _.defaults(options, {
            animation: true,
            primaryButton: {
              label: ui.getLocaleValue('okButton'),
              value: true
            }
          });
          return this._dialog(options);
        },

        alert(message = ui.getLocaleValue('unknownErrorMessage'), options = {}) {
          _.defaults(options, {
            title: ui.getLocaleValue('alertDialogTitle'),
            message
          });
          return this.dialog(options);
        },

        confirm(message, options = {}) {
          if (!message) throw new Error('\'message\' is missing');
          _.defaults(options, {
            title: ui.getLocaleValue('confirmDialogTitle'),
            message,
            secondaryButton: {
              label: ui.getLocaleValue('cancelButton'),
              value: false
            }
          });
          return this.dialog(options);
        },

        prompt(inputLabel, inputValue, options = {}) {
          if (!inputLabel) throw new Error('\'inputLabel\' is missing');
          _.defaults(options, {
            // title: ui.getLocaleValue('promptDialogTitle'),
            input: {
              label: inputLabel,
              value: inputValue
            },
            secondaryButton: {
              label: ui.getLocaleValue('cancelButton'),
              value: false
            }
          });
          return this.dialog(options);
        },

        _dialog(options) {
          return callback => {
            if (window.DEVICE_TYPE === 'cordova') {
              this._cordovaDialog(options, callback);
            } else {
              this._browserDialog(options, callback);
            }
          };
        },

        _browserDialog(options, callback) {
          if (!this.instance) {
            throw new Error('Dialog component has no instance');
          }
          this.instance.open(options, callback);
        },

        _cordovaDialog(options, callback) {
          if (options.secondaryButton) {
            navigator.notification.confirm(
              options.message,
              buttonNumber => {
                let result;
                if (buttonNumber === 1) {
                  result = options.secondaryButton.value;
                } else if (buttonNumber === 2) {
                  result = options.primaryButton.value;
                }
                callback(null, result);
              },
              options.title,
              [options.secondaryButton.label, options.primaryButton.label]
            );
          } else {
            navigator.notification.alert(
              options.message,
              () => {
                callback();
              },
              options.title,
              options.primaryButton.label
            );
          }
        }
      },

      getInitialState() {
        return {
          isOpen: false,
          options: {},
          callback: undefined,
          inputValue: '',
          resultValue: undefined
        };
      },

      componentDidMount() {
        this.constructor.instance = this;
      },

      componentWillUnmount() {
        this.constructor.instance = undefined;
      },

      open(options, callback) {
        this.setState({
          isOpen: true,
          options,
          callback,
          inputValue: (options.input && options.input.value) || ''
        }, () => {
          if (options.input) {
            $(this.getDialogDOMNode()).find('#input').select();
          }
        });
      },

      close(result) {
        let callback = this.state.callback;
        this.setState({
          isOpen: false,
          callback: undefined
        }, () => {
          if (callback) callback(null, result);
        });
      },

      onPrimaryButton() {
        let onClick = this.state.options.primaryButton.onClick;
        if (onClick) {
          onClick(this);
        } else {
          let result;
          if (this.state.options.input) {
            result = this.state.inputValue;
          } else {
            result = this.state.options.primaryButton.value;
          }
          this.close(result);
        }
      },

      onSecondaryButton() {
        let onClick = this.state.options.secondaryButton.onClick;
        if (onClick) {
          onClick(this);
        } else {
          this.close(this.state.options.secondaryButton.value);
        }
      },

      onHide() {
        this.close();
      },

      onChange(e) {
        let value = e.target.value || '';
        this.setState({ inputValue: value });
      },

      onKeyPress(e) {
        if (e.key === 'Enter') this.onPrimaryButton();
      }
    };
  }
};

module.exports = DialogCommon;
