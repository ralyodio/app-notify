var notify = require('../../index');
var expect = require('chai').expect;
var cfg = require('./../config');

describe('Email', function(){
	describe('email', function(){
		it('should be defined', function(){
			expect(notify.email).to.be.defined;
		});

    describe('config', function(){
      beforeEach(function() {
        notify.cfg = cfg;
      });

      it('should set config', function(){
        notify.cfg = cfg;

        expect(notify.cfg).to.be.equal(cfg);
      });

      it('should disable email', function(){
        notify.cfg.email.enabled = false;

        expect(notify.cfg.email.enabled).to.be.false;
      });

      it('should enabled email', function(){
        notify.cfg.email.enabled = true;

        expect(notify.cfg.email.enabled).to.be.true;
      });
    });

    describe('send email', function() {
      beforeEach(function() {
        notify.cfg = cfg;
      });

      it('should fail on empty message', function(){
        notify.email.send({}, function(err, data){
          expect(err).to.be.defined;
          expect(data).to.be.undefined;
        });
      });

      it('should fail on no smtp', function(){
        var smtp = notify.cfg.smtp;

        delete notify.cfg.smtp;

        notify.email.send({
          message: 'hello world'
        }, function(err, data){
          expect(err).to.be.defined;
          expect(data).to.be.undefined;

          //repopulate for next test (may cause race condition?)
          notify.cfg.smtp = smtp;
        });
      });

      it('should send an email', function(done){
        notify.email.send({
          subject: 'this is a test',
          message: 'hello world'
        }, function(err, data){
          expect(err).to.be.null;
          expect(data).to.be.defined;
          done();
        });
      });
    });
  });
});
