var Notify = require('../../index');
var expect = require('chai').expect;
var config = require('../config');
var _ = require('lodash');

describe('All', function(){
  var notify;

  describe('send', function(){
    beforeEach(function() {
      var cfg = _.cloneDeep(config);
      notify = new Notify(cfg);
    });

    it('should be defined', function(){
      expect(notify.send).to.be.defined;
    });

    it('should send all methods', function(done){
      notify.send({
        subject: 'Sent from all',
        message: 'This is a send from all test'
      }, function(err, data){
        expect(err).to.be.null;
        expect(data).to.be.defined;
        expect(data).to.have.length(2);
        done();
      });
    });

    it('should send only email', function(done){
      delete notify.cfg.sms;

      notify.send({
        subject: 'Sent from email',
        message: 'This is a send from email test'
      }, function(err, data){
        expect(err).to.be.null;
        expect(data).to.be.defined;
        expect(data).to.have.length(1);
        done();
      });
    });

    it('should send only sms', function(done){
      delete notify.cfg.email;
      delete notify.cfg.smtp;

      notify.send({
        subject: 'Sent from sms',
        message: 'This is a send from sms test'
      }, function(err, data){
        expect(err).to.be.null;
        expect(data).to.be.defined;
        expect(data).to.have.length(1);
        done();
      });
    });

    //todo test disabled flags
  });
});
