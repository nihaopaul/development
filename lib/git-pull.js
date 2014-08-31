(function() {

  module.exports = function(path, callback) {
    var spawn = require('child_process').spawn;
    var options = [];
    options.push('pull');
    return spawn('git', options, {
      cwd: path,
      detached: false,
    }, function(error, stdout, stderr) {
      if (error) {
        return callback(error, stderr.trim());
      }
      return callback(null, stdout.trim());
    });

  };

}).call(this);


