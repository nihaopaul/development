(function() {

  module.exports = function(params, callback) {

    var path = params.path || ".";

    var spawn = require('child_process').spawn,
        util = require('util');
    var options = [];
    options.push('install');

    var bowerinstall =  spawn('bower', options, {
      cwd: path,
      detached: false,
    });

    bowerinstall.stdout.on('data', function (buffer) {
      callback(false, buffer.toString('utf8'));
    });

    bowerinstall.stderr.on('data', function (data) {
      calback(true, data);
    });

    bowerinstall.on('close', function (code) {
      if (code == 0 ) {
        console.log('npmInstall ended successfully. ');
      } else {
        console.log('npmInstall ended with error:', code);
      }
      
    });
    return bowerinstall;

  };

}).call(this);
