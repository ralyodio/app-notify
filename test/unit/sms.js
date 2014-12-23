var notify = require('../../index');
var expect = require('chai').expect;
var cfg = require('./../config');

describe('SMS', function(){
  it('should be defined', function(){
    expect(notify.sms).to.be.defined;
  });

  describe('config', function(){
    beforeEach(function() {
      notify.cfg = cfg;
    });

    it('should set config', function(){
      notify.cfg = cfg;

      expect(notify.cfg).to.be.equal(cfg);
    });

    it('should disable sms', function(){
      notify.cfg.sms.enabled = false;

      expect(notify.cfg.sms.enabled).to.be.false;
    });

    it('should enabled sms', function(){
      notify.cfg.sms.enabled = true;

      expect(notify.cfg.sms.enabled).to.be.true;
    });
	});

  describe('send sms', function() {
    beforeEach(function() {
      notify.cfg = cfg;
    });

    it('should fail on empty message', function(){
      notify.sms.send({}, function(err, data){
        expect(err).to.be.defined;
        expect(data).to.be.undefined;
      });
    });

    it('should send an sms', function(done){
      notify.sms.send({
        message: 'hello world'
      }, function(err, data){
        expect(err).to.be.null;
        expect(data).to.be.defined;
        done();
      });
    });
  });
});
