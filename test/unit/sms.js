var Notify = require('../../index');
var expect = require('chai').expect;
var config = require('./../config');
var _ = require('lodash');

describe('SMS', function(){
  var notify;

  beforeEach(function() {
    var cfg = _.cloneDeep(config);
    notify = new Notify(cfg);
  });

  it('should be defined', function(){
    expect(notify.sms).to.be.defined;
  });

  describe('config', function(){

    it('should set config', function(){
      expect(JSON.stringify(notify.cfg)).to.be.equal(JSON.stringify(config));
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
    it('should fail on empty message', function(done){
      notify.sms.send({}, function(err, data){
        expect(err).to.be.defined;
        expect(data).to.be.undefined;
        done();
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
