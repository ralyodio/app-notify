var cfg = require('../config');
var q = require('q');

function send(opts, cb){
  var def = !cb ? q.defer() : null;

  //check for a message
  if ( !opts.message.length ) {
    var err = { error: 'Please provide a message' };
    if ( cb) return cb(err);
    return def.reject(err);
  }

  var sid = opts.sms.sid;
  var auth = opts.sms.auth;

  //check for required auth
  if ( !sid || !auth ) {
    var err = { error: 'Please provide sms.sid and sms.auth.' };

    if ( cb ) return cb(err);
    return def.reject(err);
  }

  var client = require('twilio')(sid, auth);

  client.sendMessage({
    to: cfg.sms.to, // Any number Twilio can deliver to
    from: cfg.sms.from, // A number you bought from Twilio and can use for outbound communication
    body: opts.message // body of the SMS message

  }, function(err, data) { //this function is executed when a response is received from Twilio

    if ( err ) {
      if ( cb ) return cb(err);
      return def.reject(err);
    }

    // "responseData" is a JavaScript object containing data received from Twilio.
    // A sample response from sending an SMS message is here (click "JSON" to see how the data appears in JavaScript):
    // http://www.twilio.com/docs/api/rest/sending-sms#example-1

    //console.log(data.body); // outputs "word to your mother."
    if ( cb ) return cb(null, data);
    return def.resolve(data);
  });

  //return promise if no callback
  if ( def ) {
    return def.promise;
  }
}

exports.send;
