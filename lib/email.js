var cfg = require('../config');
var nodemailer = require('nodemailer');

function send(opts, cb){
  var def = !cb ? q.defer() : null;

  //check for a message
  if ( !opts.message.length ) {
    var err = { error: 'Please provide a message' };
    if ( cb) return cb(err);
    return def.reject(err);
  }

  var user = opts.smtp.user;
  var pass = opts.smtp.pass;
  var host = opts.smtp.host;
  var port = opts.smtp.port;

  if ( !user || !pass || !host || !port ) {
    var err = { error: 'Please provide smtp.user, smtp.pass, smtp.host and smtp.port' };

    if ( cb ) return cb(err);
    return def.reject(err);
  }

  //check for email headers
  if ( !opts.email.to || !opts.email.from || !opts.email.subject ) {
    var err = { error: 'Please provide email.from, email.to and email.subject' };

    if ( cb ) return cb(err);
    return def.reject(err);
  }

  var transporter = nodemailer.createTransport({
    host: host,
    port: port,
//		service: 'Gmail', //see https://github.com/andris9/nodemailer-wellknown#supported-services
    auth: {
      user: user,
      pass: pass
    }
  });

  var mailOptions = {
    from: opts.email.from,
    to: opts.email.to,
    subject: opts.email.subject,
    text: opts.message
  };

  transporter.sendMail(mailOptions, function(err, data){
    if ( err ) {
      if ( cb ) return cb(err);
      return def.reject(err);
    }

    if ( cb ) return cb(null, data);
    return def.resolve(data);
  });

  if ( def ) {
    return def.promise;
  }
}
