var sms = require('./lib/sms');
var email = require('./lib/email');
var _ = require('lodash');
var async = require('async');
var q = require('q');

var cfg = {};

function send(opts, callback){
  opts = _.extend(cfg, opts);

  var def = !cb ? q.defer() : null;

  async.parallel([
    //sms
    function(cb){
      sms.send(opts)
        .then(function(data){
          cb(null, data);
        })
        .catch(function(err){
          cb(err);
        });
    },
    //email
    function(){
      email.send(opts)
        .then(function(data){
          cb(null, data);
        })
        .catch(function(err){
          cb(err);
        });
    }
  ], function(err, data){
    if ( err ) {
      if ( callback ) return callback(err);
      return def.reject(err);
    }

    if ( callback ) return callback(null, data);
    return def.resolve(data);
  });

  if ( def ) {
    return def.promise;
  }
}


exports.cfg;
exports.sms;
exports.email;
exports.send;
