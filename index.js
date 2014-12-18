"use strict";

var _ = require('lodash');
var React = require('react');

var ui = {};

_.assign(ui, require('./dialog-helpers'));
_.assign(ui, require('./audio'));

ui.renderString = function(input) {
  if (!input) return false;
  var output = [];
  input.split('\n').forEach(function(line, index) {
    if (output.length)
      output.push(React.DOM.br({ key: index + '-separator' }));
    output.push(React.DOM.span({ key: index }, line));
  });
  return output;
};

var UI = {
  create: function() {
    return ui;
  }
};

module.exports = UI;
