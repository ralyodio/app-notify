var nodemailer = require('nodemailer');
var _ = require('lodash');


function respondWithError(err, method){
  if ( typeof method === 'function' ) {
    return method(err);
  }

  return method.reject(err);
}

function respondWithSuccess(data, method){
  if ( typeof method === 'function' ){
    return method(null, data);
  }

  return method.resolve(data);
}

function send(opts, cb){
  var cfg = module.parent.exports.cfg;
  var method = !cb ? q.defer() : cb;

  opts = _.extend(cfg, opts);

  //use defaults from config.json if none specified
  opts.subject = opts.subject || opts.email.subject;

  //check for a message
  if ( !opts.message || !opts.message.length ) {
    return respondWithError({ error: 'Please provide a message', code: 'MISSING_MESSAGE' }, method);
  }

  if ( !opts.smtp ) {
    return respondWithError({ error: 'Please provide a smtp settings', code: 'MISSING_SMTP' }, method);
  }

  var user = opts.smtp.user;
  var pass = opts.smtp.pass;
  var host = opts.smtp.host;
  var port = opts.smtp.port;

  if ( !user || !pass || !host || !port ) {
    return respondWithError({ error: 'Please provide smtp.user, smtp.pass, smtp.host and smtp.port', code: 'MISSING_SMTP' }, method);
  }

  //check for email headers
  if ( !opts.email.to || !opts.subject ) {
    return respondWithError({ error: 'Please provide email to and subject', code: 'MISSING_HEADERS' }, method);
  }

  //from should not be overriden as it is required in email config settings by the provider
  if ( !opts.email.from ) {
    return respondWithError({ error: 'Please provide email.from', code: 'MISSING_HEADERS' }, method);
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
    subject: opts.subject,
    text: opts.message
  };

  transporter.sendMail(mailOptions, function(err, data){
    if ( err ) {
      return respondWithError(err, method);
    }

    return respondWithSuccess(data, method);
  });

  if ( method.promise ) {
    return method.promise;
  }
}

exports.send = send;
