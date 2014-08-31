'use strict';

/*development - under development */

var npm = require('npm')
  , fs = require('fs')
  , path = require('path');

var gitfetch = require('./git-fetch'),
    gitcheckout = require('./git-checkout'),
    gitpull = require('./git-pull');


var Development = module.exports = function(config) {
  this.config = util.extend({}, Development.defaults, config);
}

Development.defaults = {
  packageFile: path.join(__dirname,'../','./package.json'),
}


Development.prototype = {};

Development.fetch = function(callback) {
  gitfetch('.', function(err, output) {
    if (err) { 
      return callback(true, err);
    } else {
      return callback(false, output);
    }
  });
};

Development.checkout = function(params, callback) {
  var params = {
    tags: params.tag,
    branch: params.branch,
    path: params.path,
  }
  gitcheckout(params, function(err, output) {
    if (err) { 
      return callback(true, err);
    } else {
      return callback(false, output);
    }
  });
};

Development.pull = function(callback) {
  gitpull('.', function (err, consoleOutput) {
    if (err) {
      return callback(true, consoleOutput);
    } else {

      var npm = this.npmInstall(function(err, value){
        if (err) return callback(true, value);
        return callback(false, data);
      });


    }
  });
};


Development.npmInstall = function(callback) {

  fs.readFile(this.config.packageFile, function(err, contents){
    if (err) return callback(true, err);

    var config = JSON.parse(contents);

    npm.load(config, function (er) {
      if (er) return callback(true, er)
      npm.commands.install(function (er, data) {
        if (er) return callback(true, er);
        callback(false, data);
      })

    });
  });

}