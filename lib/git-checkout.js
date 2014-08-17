(function() {
  
  module.exports = function(params, callback) {
    var path = params.path || ".";
    var ref = params.ref || params.branch || "master";
    var exec = require('child_process').exec,
        util = require('util');

    var cmd = util.format('git checkout %s -f -- . ', ref);
    return exec(cmd, {
      cwd: path
    }, function(error, stdout, stderr) {
      if (error) {
        return callback(error, stderr.trim());
      }
      return callback(null, stdout.trim());
    });
  };

}).call(this);



