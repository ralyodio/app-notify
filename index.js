var Sms = require('./lib/sms');
var Email = require('./lib/email');
var _ = require('lodash');
var async = require('async');
var q = require('q');

function Notify(cfg){
  if (!(this instanceof Notify)) {
    return new Notify(cfg);
  }

  this.cfg = cfg || {};
  this.email = new Email(this.cfg);
  this.sms = new Sms(this.cfg);
}

var notify = {
  respondWithError: function(err, method){
    if ( typeof method === 'function' ) {
      return method(err);
    }

    return method.reject(err);
  },

  respondWithSuccess: function(data, method){
    if ( typeof method === 'function' ){
      return method(null, data);
    }

    return method.resolve(data);
  },

  send: function send(opts, callback){
    opts = _.extend(this.cfg, opts);

    var method = !callback ? q.defer() : callback;

    async.parallel([
      //sms
      function(cb){
        if ( !this.cfg.sms || !this.cfg.sms.enabled ) {
          return cb();
        }

        this.sms.send(opts)
          .then(function(data){
            cb(null, data);
          })
          .catch(function(err){
            cb(err);
          });
      }.bind(this),
      //email
      function(cb){
        if ( !this.cfg.email || !this.cfg.email.enabled ) {
          return cb();
        }

        this.email.send(opts)
          .then(function(data){
            cb(null, data);
          })
          .catch(function(err){
            cb(err);
          });
      }.bind(this)
    ], function(err, data){
      if ( err ) {
        return this.respondWithError(err, method);
      }

      //remove undefined items in data array from response
      data = data.filter(function(d){
        return typeof d !== 'undefined';
      });

      return this.respondWithSuccess(data, method);
    }.bind(this));

    if ( method.promise ) {
      return method.promise;
    }
  }
};

//merge our prototype in with the default
Notify.prototype = _.merge(Notify.prototype, notify);

module.exports = Notify;
