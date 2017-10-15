const mocha = require('mocha');
const chai = require('chai');
const spawn = require('child_process').spawn;
const passpipe = require('../');
const assert = chai.assert;

const exp = /^(\/usr\/local|\\users\\.+\\AppData)/;

describe('Passpipe', () => {

  it('should ensure npm prefix by passing command.', (done) => {
    passpipe.command('npm', ['prefix', '-g'], (chunk) => {
      assert.equal(exp.test(chunk), true);
      done();
    })
  });

  // NOTE: looks a bit convoluted here but this is
  // useful when you have a custom method that returns
  // a child process.
  it('should ensure npm prefix passwing spawn.', (done) => {
    passpipe.method(spawn, ['npm', ['prefix', '-g']], (chunk) => {
      assert.equal(exp.test(chunk), true);
      done();
    })
  });

  it('should ensure npm prefix passing args as space separated string.', (done) => {
    passpipe.command('npm', 'prefix -g', (chunk) => {
      assert.equal(exp.test(chunk), true);
      done();
    })
  });

  it('should ensure npm prefix passing args as csv separated string.', (done) => {
    passpipe.command('npm', 'prefix, -g', (chunk) => {
      assert.equal(exp.test(chunk), true);
      done();
    })
  });

  it('should ensure npm prefix passing existing ChildProcess.', (done) => {
    let proc = spawn('npm', ['prefix', '-g']);
    passpipe.proc(proc, (chunk) => {
      assert.equal(exp.test(chunk), true);
      done();
    })
  });

});