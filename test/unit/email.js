var notify = require('../../index');
var expect = require('chai').expect;
var cfg = require('./../config.js');

describe('Email', function(){
	describe('email', function(){
		it('should be defined', function(){
			expect(notify.email).to.be.defined;
		});
	});
});
