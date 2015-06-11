'use strict';

let KindaObject = require('kinda-object');
let util = require('kinda-util').create();

let Audio = KindaObject.extend('Audio', function() {
  Object.defineProperty(this, 'silentMode', {
    get() {
      return this._silentMode;
    },
    set(silentMode) {
      this._silentMode = silentMode;
    }
  });

  this.loadAudio = function(path, cb) {
    if (!this._audioContext) {
      this._audioContext = new (window.AudioContext ||
          window.webkitAudioContext);
      this._audioBuffers = [];
    }
    let buffer = this._audioBuffers[path];
    if (!buffer) {
      this._audioBuffers[path] = 'loading';
      let request = new XMLHttpRequest();
      request.open('GET', path, true);
      request.onload = function() {
        // base64 is necessary because Safari iOS doesn't allow
        // mp3 files cached in AppCache.
        let buffer2 = util.base64ToArrayBuffer(request.response);
        this._audioContext.decodeAudioData(buffer2, function(buffer3) {
          this._audioBuffers[path] = buffer3;
          if (cb) cb(null, buffer3);
        }.bind(this));
      }.bind(this);
      request.send();
    } else if (buffer !== 'loading') {
      if (cb) cb(null, buffer);
    }
  };

  this.playAudio = function(path) {
    if (this.silentMode) return;
    this.loadAudio(path, function(err, buffer) {
      if (err) return;
      let source = this._audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(this._audioContext.destination);
      source.start(0);
    }.bind(this));
  };
});

module.exports = Audio;
