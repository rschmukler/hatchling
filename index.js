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
    var result = '';
    command.stdout.on('data', function(data) {
      result += data.toString();
    });
    command.on('close', function(code) {
      return callback(result);
    });
  }
};
