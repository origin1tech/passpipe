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

/**
 * Pipe
 * : Common method for handling pass through pipe.
 *
 * @param {string|object|function} method the command, method or ChildProcess to run.
 * @param {string|array} args the arguments to pass to command or method.
 * @param {function} done a callback on completed.
 */
function _pipe(method, args, done) {

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

/**
 * Command
 * : A command that should be spawned and then piped.
 *
 * @param {string} command the command to spawn and run.
 * @param {string|array} args the arguments to pass to command process.
 * @param {function} done a callback on completed.
 */
function _command(command, args, done) {
  return _pipe(command, args, done);
};

/**
 * Method
 * : Calls a method passing arguments which this returns a ChildProcess.
 *
 * @param {string} method the method which returns a ChildProcess to be run.
 * @param {string|array} args the arguments to pass to command process.
 * @param {function} done a callback on completed.
 */
function _method(method, args, done) {
  return _pipe(method, args, done);
};

/**
 * Process
 * : Pipes an existing ChildProcess.
 *
 * @param {string} proc the already created ChildProcess to be piped.
 * @param {function} done a callback on completed.
 */
function _proc(proc, done) {
  return _pipe(proc, [], done);
};

module.exports = {
  command: _command,
  method: _method,
  proc: _proc
};