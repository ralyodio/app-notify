var q = require('q');
var _ = require('lodash');

function Sms(cfg){
  if (!(this instanceof Sms)) {
    return new Sms(cfg);
  }

  this.cfg = cfg || {};
}

var sms = {
  respondWithError: function respondWithError(err, method){
    if ( typeof method === 'function' ) {
      return method(err);
    }

    return method.reject(err);
  },

  respondWithSuccess: function respondWithSuccess(data, method){
    if ( typeof method === 'function' ){
      return method(null, data);
    }

    return method.resolve(data);
  },

  send: function send(opts, cb){
    var cfg = this.cfg;
    var method = !cb ? q.defer() : cb;

    opts = _.merge(this.cfg, opts);

    //check for a message
    if ( !opts.message || !opts.message.length ) {
      return this.respondWithError({ error: 'Please provide a message', code: 'MISSING_MESSAGE' }, method);
    }

    var sid = opts.sms.sid;
    var auth = opts.sms.auth;

    //check for required auth
    if ( !sid || !auth ) {
      return this.respondWithError({ error: 'Please provide sms.sid and sms.auth.', code: 'MISSING_AUTH' }, method);
    }

    //check for sms headers
    if ( !opts.sms.from || !opts.sms.to ) {
      return this.respondWithError({ error: 'Please provide sms.from and sms.to', code: 'MISSING_HEADERS' }, method);
    }

    var client = require('twilio')(sid, auth);

    client.sendMessage({
      to: opts.sms.to, // Any number Twilio can deliver to
      from: opts.sms.from, // A number you bought from Twilio and can use for outbound communication
      body: opts.message // body of the SMS message

    }, function(err, data) { //this function is executed when a response is received from Twilio

      if ( err ) {
        return this.respondWithError(err, method);
      }

      // "responseData" is a JavaScript object containing data received from Twilio.
      // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
      // http://www.twilio.com/docs/api/rest/sending-sms#example-1

      //console.log(data.body); // outputs "word to your mother."
      return this.respondWithSuccess(data, method);
    }.bind(this));

    //return promise if no callback
    if ( method.promise ) {
      return method.promise;
    }
  }
};


//merge our prototype in with the default
Sms.prototype = _.merge(Sms.prototype, sms);

module.exports = Sms;
