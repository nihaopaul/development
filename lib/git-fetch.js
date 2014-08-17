(function() {
  
  module.exports = function(path, callback) {
    var exec = require('child_process').exec;
    return exec('git fetch --all', {
      cwd: path
    }, function(error, stdout, stderr) {
      if (error) {
        return callback(error, stderr.trim());
      }
      return callback(null, stdout.trim());
    });
  };

}).call(this);



