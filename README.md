# Passpipe

Pipes node [Child Process](https://nodejs.org/api/child_process.html) stdout to simple handler which builds chunks using [PassThru](https://nodejs.org/api/stream.html#stream_class_stream_passthrough) then callsback on "end". Useful for executing spawn in your testing frameworks then using assertion before continuing tests.

## Install

```js
$ npm install passpipe --save
```

## Import

Import or require Passpipe.

#### TypeScript

```ts
import { spawn } from 'child_process';
import * as passpipe from 'passpipe';
```

#### Require

```js
const spawn = require('child-process').spawn;
const pipeto = require('passpipe');
```

#### Usage

Passpipe accepts method which returns a node ChildProcess, the args you want to pass to the process and a callback to be called on [PassThru] end. You can also pass a command as the method that is known to your system in which case Passpipe will create spawn.

```ts
const proc = passpipe(spawn, /* spawn args */, (chunk) => {
  // do something with chunk.
});
```

## Example

Example using Mocha/Chai testing frameworks.

```js
const mocha = require('mocha');
const chai = require('chai');
const passpipe = require('../');

const assert = chai.assert;

it('should spawn and output.', (done) => {
  passpipe('npm', ['prefix', '-g'], (chunk) => {
    assert.equal(chunk, '/usr/local');
    done();
  });
});
```

## Change

See [CHANGE.md](CHANGE.md)

## License

See [LICENSE.md](LICENSE.md)