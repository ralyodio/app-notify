var Notify = require('../../index');
var expect = require('chai').expect;
var config = require('./../config');
var _ = require('lodash');

describe('Email', function(){
	describe('email', function(){
    var notify;

    beforeEach(function() {
      var cfg = _.cloneDeep(config);
      notify = new Notify(cfg);
    });

		it('should be defined', function(){
			expect(notify.email).to.be.defined;
		});

    describe('config', function(){
      it('should set config', function(){
        expect(JSON.stringify(notify.cfg)).to.be.equal(JSON.stringify(config));
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
      it('should fail on empty message', function(done){
        notify.email.send({}, function(err, data){
          expect(err).to.be.defined;
          expect(data).to.be.undefined;
          done();
        });
      });

      it('should fail on no smtp', function(done){
        delete notify.cfg.smtp;

        notify.email.send({
          message: 'hello world'
        }, function(err, data){
          expect(err).to.be.defined;
          expect(data).to.be.undefined;
          done();
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
