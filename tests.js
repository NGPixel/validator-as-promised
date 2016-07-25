"use strict";

const _ = require('lodash');
const chai = require('chai'),
		chaiAsPromised = require("chai-as-promised"),
		expect = chai.expect;

const validator = require('./index.js');

chai.use(chaiAsPromised);

describe('Basic', function () {

	it('should be an object containing methods', function() {
		return expect(_.isPlainObject(validator)).to.be.true;
	});

});

describe('Validator.js', function () {

	it('#isAlpha should return true (valid value)', function() {
		return expect(validator.isAlpha('abcdef')).to.be.true;
	});

	it('#isAlpha should return false (invalid value)', function() {
		return expect(validator.isAlpha('abc245def')).to.be.false;
	});

	it('#isAlphaAsync should return a fulfilled promise (valid value)', function() {
		return expect(validator.isAlphaAsync('Should be alpha', 'abcdef')).to.be.fulfilled;
	});

	it('#isAlphaAsync should return a rejected promise (invalid value)', function() {
		return expect(validator.isAlphaAsync('Should be alpha', 'abc245def')).to.be.rejectedWith(Error);
	});

});

describe('Custom validator', function () {
	
	it('#custom should return a fulfilled promise (valid value)', function() {
		return expect(validator.custom('Should starts with abc', (val, target) => { return _.startsWith(val, target); } ,'abcdef', 'abc')).to.be.fulfilled;
	});

	it('#custom should return a rejected promise (invalid value)', function() {
		return expect(validator.custom('Should starts with abc', (val, target) => { return _.startsWith(val, target); } ,'notabc', 'abc')).to.be.rejectedWith(Error);
	});

});