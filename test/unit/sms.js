var notify = require('../../index');
var expect = require('chai').expect;
var cfg = require('./../config');

describe('SMS', function(){
	describe('sms', function(){
		it('should be defined', function(){
			expect(notify.sms).to.be.defined;
		});

    //it('should set config', function(){
    //
    //});
	});
});
