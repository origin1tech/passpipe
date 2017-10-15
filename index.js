const Stream = require('stream').Stream;
const spawn = require('child_process').spawn;

function thruHandler(fn) {
  const PassThrough = Stream.PassThrough;
  const thru = new PassThrough;
  let _chunk = '';
  thru.on('data', (chunk) => {
    _chunk += chunk;
  });
  thru.on('end', () => {
    fn(_chunk.trim());
  });
  return thru;
}

module.exports = function (method, args, done) {

  let proc;
  let isProc =
    typeof method === 'object' &&
    (method.constructor && method.constructor.name === 'ChildProcess');

  done = done || function () {};

  if (typeof args === 'function') {
    done = args;
    args = undefined;
  }

  // Ensure args array.
  args = args || [];

  // Allow passing args as a string.
  // supports either ' ' or ', '.
  if (typeof args === 'string') {
    let splitChar = ~args.indexOf(',') ? ',' : ' ';
    if (splitChar === ',')
      args = args.replace(/\s/g, '');
    args = args.split(splitChar);
  }

  // If string assume command set method to spawn.
  if (typeof method === 'string') {
    args = [method, args];
    method = spawn;
  }

  if (isProc)
    proc = method;

  if (!proc)
    proc = method(...args);

  const thru = thruHandler(done);
  proc.stdout.pipe(thru);

  return proc;

};