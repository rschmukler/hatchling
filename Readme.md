# Hatchling

Buffered spawn for node.

## Example

```js
var spawn = require('hatchling');

spawn('ps', ['aux'], function(stdout) {
  console.log('stdout');
});
```

## Reasoning

Spawn is awesome but sometimes you need a quick way to just get the output and go. 
Hatcling lets you pass in as many or as few options as you want. The structure is:

```
spawn(cmd, args, options, cb)
```

- `cmd` is a string of the command to execute
- `args` is an array of arguments passed
- `opts` is an option which is standard `process.spawn` options
- `cb` is a function that takes stdout
