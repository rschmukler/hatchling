var spawn = require('child_process').spawn;

module.exports = function hatchling() {
  var arg = Array.prototype.slice.call(arguments),
      args = [],
      options = {},
      cmd, callback;

  arg.forEach(function(a) {
    if(Array.isArray(a)) {
      return args = a;
    }
    switch(typeof a) {
      case 'string':
        return cmd = a;
      case 'object':
        return options = a;
      case 'function':
        return callback = a;
    }
  });
  var command = spawn(cmd, args, options);
  if(callback) {
    var stdout = '',
        stderr = '';

    command.stdout.on('data', function(data) {
      stdout += data.toString();
    });

    command.stderr.on('data', function(data) {
      stderr += data.toString();
    });

    command.on('error', function(err) {
      cb(err, null);
    });

    command.on('close', function(code) {
      if(code !== 0) {
        var err = new Error("Process exited with non-zero status code: " + code);
        return callback(err, stderr);
      }
      if(callback.length == 1) {
        return callback(stdout);
      } else {
        return callback(null, stdout);
      }
    });
  }

  return command;
};
