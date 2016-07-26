"use strict";

var Promise = require('bluebird');
var Validator = require('validator');
var _ = require('lodash');

var validators = Promise.promisifyAll(Validator, {
	suffix: 'Async',
	filter(name, func, target, passesDefaultFilter) {
		return passesDefaultFilter && (_.startsWith(name, 'is') || _.includes(['contains', 'equals', 'matches']));
	},
	promisifier(originalMethod, defaultPromisifier) {
		return function(errorMsg) {
			let args = Array.from(arguments).slice(1);
			let self = this;
			return new Promise(function(resolve, reject) {
				let result = originalMethod.apply(self, args);
				return (result) ? resolve(result) : reject(new Error(errorMsg));
			});
		};
	}
});
validators.custom = function(errorMsg, func) {
	let args = Array.from(arguments).slice(2);
	let self = this;
	return new Promise((resolve, reject) => {
		let result = func.apply(self, args);
		return (result) ? resolve(result) : reject(new Error(errorMsg));
	});
}

module.exports = validators;