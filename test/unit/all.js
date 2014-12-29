var notify = require('../../index');
var expect = require('chai').expect;
var cfg = require('./../config');

describe('All', function(){
  describe('send', function(){
    beforeEach(function() {
      notify.cfg = cfg;
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
      var sms = notify.cfg.sms;

      delete notify.cfg.sms;

      notify.send({
        subject: 'Sent from email',
        message: 'This is a send from email test'
      }, function(err, data){
        expect(err).to.be.null;
        expect(data).to.be.defined;
        expect(data).to.have.length(1);
        notify.cfg.sms = sms; //re-apply original config

        done();
      });
    });

    it('should send only sms', function(done){
      var email = notify.cfg.email;
      var smtp = notify.cfg.smtp;

      delete notify.cfg.email;
      delete notify.cfg.smtp;

      notify.send({
        subject: 'Sent from sms',
        message: 'This is a send from sms test'
      }, function(err, data){
        expect(err).to.be.null;
        expect(data).to.be.defined;
        expect(data).to.have.length(1);
        //re-apply original config
        notify.cfg.email = email;
        notify.cfg.smtp = smtp;

        done();
      });
    })

    //todo test disabled flag
  });
});
