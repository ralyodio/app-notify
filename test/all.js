var notify = require('../');
var expect = require('chai').expect;

describe('All', function(){
  describe('send', function(){
    it('should be defined', function(){
      expect(notify.send).to.be.defined;
    });
  });
});
