<a href="http://promisesaplus.com/">
    <img src="http://promisesaplus.com/assets/logo-small.png" alt="Promises/A+ logo" title="Promises/A+ 1.1 compliant" align="right" />
</a>

# Validator.js for Promises

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Downloads][downloads-image]][npm-url] [![License][license-image]][license-url]

String validation ([validator.js](https://github.com/chriso/validator.js)) and custom validators using promises

### Usage

All standard [validator.js](https://github.com/chriso/validator.js) methods are available.

Simply add the `Async` suffix to use the promise-based version. The first parameter is always the error message string which will be thrown as an error if the promise is rejected.

Method `isAlphanumeric(value)` becomes `isAlphanumericAsync(errorMsg, value)`

Example:

```js
const validator = require('validator-as-promised');

// Synchronous method
if( validator.isAlphanumeric('abcdef') ) {
	console.log('String contains alphanumeric characters.');
}

// Asynchronous method (Promise)
validator.isAlphanumericAsync('String should contain alphanumeric characters!', 'abcdef').then((result) => {
	console.log('Success!');
}).catch((ex) => {
	console.log(ex);
});
```

### Custom Validators

You can define your own validation functions using the built-in `.custom(errorMsg, func [, args...])` method:

```js
// Example 1
validator.custom('Should be true!', (val) => { return val === true; }, true).then((result) => {
	console.log('Value is true!');
}).catch((ex) => {
	console.log('Value was not true!');
});

// Example 2
validator.custom('First number should be lower than second number!', (num1, num2) => { return num1 < num2; }, 34, 87).then((result) => {
	console.log('Validation succeeded!');
}).catch((ex) => {
	console.log('Validation failed!');
});
```

The custom function should return a truthy value or a promise. Synchronous functions will be promisified automatically.

Unlike validator.js methods which only accepts string inputs, the custom validators can accept values of any type.

### Tests

```sh
$ npm test
```

### License

MIT

[downloads-image]: http://img.shields.io/npm/dm/validator-as-promised.svg

[npm-url]: https://npmjs.org/package/validator-as-promised
[npm-image]: http://img.shields.io/npm/v/validator-as-promised.svg

[travis-url]: https://travis-ci.org/NGPixel/validator-as-promised.js
[travis-image]: https://travis-ci.org/NGPixel/validator-as-promised.svg?branch=master

[license-url]: https://github.com/NGPixel/validator-as-promised/blob/master/LICENSE
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg