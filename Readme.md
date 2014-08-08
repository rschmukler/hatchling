# Hatchling

Buffered spawn for node.

## Example

```js
var spawn = require('hatchling'),
    timeout;

var child = spawn('ps', ['aux'], function(err, stdout) {
  console.log(stdout);
  clearTimeout(timeout);
});

timeout = setTimeout(child.kill, 1000); // kill it after a second if we dont hear back

// Example with invalid command options
spawn('ls', ['-aslkj'], function(err, stderr) {
  console.log(err);
  console.log(stderr);
});

```

## Reasoning

Spawn is awesome but sometimes you need a quick way to just get the output and go. 
Hatcling lets you pass in as many or as few arguments as you want. The structure is:

```
spawn(cmd, [args], [options], [cb])
```

- `cmd` is a string of the command to execute
- `args` is an array of arguments passed
- `opts` is an option which is standard `process.spawn` options
- `cb` is a function that takes `fn(err, stderr/stdout)`. If `err` is not null,
  `stderr` will be given. Otherwise it is `stdout`. If a process exits with a
  non-zero status code, an error will be thrown.
