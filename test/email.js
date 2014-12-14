var notify = require('../');
var expect = require('chai').expect;

describe('Email', function(){
	describe('email', function(){
		it('should be defined', function(){
			expect(notify.email).to.be.defined;
		});
	});
});
