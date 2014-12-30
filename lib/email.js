var nodemailer = require('nodemailer');
var q = require('q');
var _ = require('lodash');

function Email(cfg){
  if (!(this instanceof Email)) {
    return new Email(cfg);
  }

  this.cfg = cfg || {};
}

var email = {
  respondWithError: function(err, method){
    if ( typeof method === 'function' ) {
      return method(err);
    }

    return method.reject(err);
  },

  respondWithSuccess: function (data, method){
    if ( typeof method === 'function' ){
      return method(null, data);
    }

    return method.resolve(data);
  },

  send: function (opts, cb){
    var cfg = this.cfg;
    var method = !cb ? q.defer() : cb;

    opts = _.merge(this.cfg, opts);

    //use defaults from config.json if none specified
    opts.subject = opts.subject || opts.email.subject;

    //check for a message
    if ( !opts.message || !opts.message.length ) {
      return this.respondWithError({ error: 'Please provide a message', code: 'MISSING_MESSAGE' }, method);
    }

    if ( !opts.smtp ) {
      return this.respondWithError({ error: 'Please provide a smtp settings', code: 'MISSING_SMTP' }, method);
    }

    var user = opts.smtp.user;
    var pass = opts.smtp.pass;
    var host = opts.smtp.host;
    var port = opts.smtp.port;

    if ( !user || !pass || !host || !port ) {
      return this.respondWithError({ error: 'Please provide smtp.user, smtp.pass, smtp.host and smtp.port', code: 'MISSING_SMTP' }, method);
    }

    //check for email headers
    if ( !opts.email.to || !opts.subject ) {
      return this.respondWithError({ error: 'Please provide email to and subject', code: 'MISSING_HEADERS' }, method);
    }

    //from should not be overriden as it is required in email config settings by the provider
    if ( !opts.email.from ) {
      return this.respondWithError({ error: 'Please provide email.from', code: 'MISSING_HEADERS' }, method);
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
        return this.respondWithError(err, method);
      }

      return this.respondWithSuccess(data, method);
    }.bind(this));

    if ( method.promise ) {
      return method.promise;
    }
  }
};

//merge our prototype in with the default
Email.prototype = _.merge(Email.prototype, email);

module.exports = Email;
