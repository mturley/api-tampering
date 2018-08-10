#!/usr/bin/env node

import { transformFile } from 'babel-core';

console.log('Transpiling your api-tampering.js with babel...');

transformFile('api-tampering.js', {}, (err, result) => {
  console.log('Running transpiled api-tampering.js...');
  eval(result.code); // eslint-disable-line no-eval
});
