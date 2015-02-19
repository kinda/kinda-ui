"use strict";

var _ = require('lodash');
var tr = require('kinda-translator').create();

var DialogCommon = {
  statics: {
    dialog: function(options) {
      if (!options) options = {};
      _.defaults(options, {
        animation: true,
        primaryButton: {
          label: tr('kinda-ui.okButton'),
          value: true
        }
      });
      return this._dialog(options);
    },

    alert: function(message, options) {
      if (!message) message = tr('errors.unknown') + '.';
      if (!options) options = {};
      _.defaults(options, {
        title: tr('kinda-ui.alertDialogTitle'),
        message: message
      });
      return this.dialog(options);
    },

    confirm: function(message, options) {
      if (!message) throw new Error("'message' is missing");
      if (!options) options = {};
      _.defaults(options, {
        title: tr('kinda-ui.confirmDialogTitle'),
        message: message,
        secondaryButton: {
          label: tr('kinda-ui.cancelButton'),
          value: false
        }
      });
      return this.dialog(options);
    },

    prompt: function(inputLabel, inputValue, options) {
      if (!inputLabel) throw new Error("'inputLabel' is missing");
      if (!options) options = {};
      _.defaults(options, {
        // title: tr('kinda-ui.promptDialogTitle'),
        input: {
          label: inputLabel,
          value: inputValue
        },
        secondaryButton: {
          label: tr('kinda-ui.cancelButton'),
          value: false
        }
      });
      return this.dialog(options);
    },

    _dialog: function(options) {
      return function(callback) {
        if (window.DEVICE_TYPE === 'cordova')
          this._cordovaDialog(options, callback);
        else
          this._browserDialog(options, callback);
      }.bind(this);
    },

    _browserDialog: function(options, callback) {
      if (!this.instance)
        throw new Error('Dialog component has no instance');
      this.instance.open(options, callback);
    },

    _cordovaDialog: function(options, callback) {
      if (options.secondaryButton) {
        navigator.notification.confirm(
          options.message,
          function(buttonNumber) {
            var result;
            if (buttonNumber === 1)
              result = options.secondaryButton.value;
            else if (buttonNumber === 2)
              result = options.primaryButton.value;
            callback(null, result);
          },
          options.title,
          [options.secondaryButton.label, options.primaryButton.label]
        );
      } else {
        navigator.notification.alert(
          options.message,
          function() { callback(); },
          options.title,
          options.primaryButton.label
        );
      }
    }
  },

  getInitialState: function() {
    return {
      isOpen: false,
      options: {},
      callback: undefined,
      inputValue: '',
      resultValue: undefined
    };
  },

  componentDidMount: function() {
    this.constructor.instance = this;
  },

  componentWillUnmount: function() {
    this.constructor.instance = undefined;
  },

  open: function(options, callback) {
    this.setState({
      isOpen: true,
      options: options,
      callback: callback,
      inputValue: (options.input && options.input.value) || ''
    }, function() {
      if (options.input)
        $(this.getDialogDOMNode()).find('#input').select();
    }.bind(this));
  },

  close: function(result) {
    var callback = this.state.callback;
    this.setState({
      isOpen: false,
      callback: undefined
    }, function() {
      if (callback)
        callback(null, result);
    }.bind(this));
  },

  onPrimaryButton: function() {
    var onClick = this.state.options.primaryButton.onClick;
    if (onClick) {
      onClick(this);
    } else {
      var result;
      if (this.state.options.input)
        result = this.state.inputValue;
      else
        result = this.state.options.primaryButton.value;
      this.close(result);
    }
  },

  onSecondaryButton: function() {
    var onClick = this.state.options.secondaryButton.onClick;
    if (onClick) {
      onClick(this);
    } else {
      this.close(this.state.options.secondaryButton.value);
    }
  },

  onHide: function() {
    this.close();
  },

  onChange: function(e) {
    var value = e.target.value || '';
    this.setState({ inputValue: value });
  },

  onKeyPress: function(e) {
    if (e.key === 'Enter') this.onPrimaryButton();
  }
};

module.exports = DialogCommon;
