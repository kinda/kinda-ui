"use strict";

var util = require('kinda-util').create();

var Audio = {};

Object.defineProperty(Audio, 'silentMode', {
  get: function() {
    return this._silentMode;
  },
  set: function(silentMode) {
    this._silentMode = silentMode;
  }
});

Audio.loadAudio = function(path, cb) {
  if (!this._audioContext) {
    this._audioContext = new (window.AudioContext ||
        window.webkitAudioContext);
    this._audioBuffers = [];
  }
  var buffer = this._audioBuffers[path];
  if (!buffer) {
    this._audioBuffers[path] = 'loading';
    var request = new XMLHttpRequest();
    request.open('GET', path, true);
    request.onload = function() {
      // base64 is necessary because Safari iOS doesn't allow
      // mp3 files cached in AppCache.
      var buffer = util.base64ToArrayBuffer(request.response);
      this._audioContext.decodeAudioData(buffer, function(buffer) {
        this._audioBuffers[path] = buffer;
        if (cb) cb(null, buffer);
      }.bind(this));
    }.bind(this);
    request.send();
  } else if (buffer !== 'loading')
    if (cb) cb(null, buffer);
};

Audio.playAudio = function(path) {
  if (this.silentMode) return;
  this.loadAudio(path, function(err, buffer) {
    if (err) return;
    var source = this._audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this._audioContext.destination);
    source.start(0);
  }.bind(this));
};

module.exports = Audio;
