app-notify
==========

Send SMS and email notifications from within your node.js app

# usage (promises)

Send an email message:

    //setup smtp server
    var smtp = {
        host: xxx,
        user: user,
        pass: pass,
        port: port
    };
    
    //setup email headers
    var email = {
        to: user@example.com,
        from: sender@example.com'
    };

    var notify = require('app-notify');

    //set your configuration
    notify.cfg.email = email;
    notify.cfg.smtp = smtp;
    
    //send an email
    notify.email({
        subject: 'This is a test',
        message: 'Hello world!'
    })
    .then(function(data){
        console.log(data);
    })
    .catch(function(err){
        console.error(err);
    });

Send an SMS message    

    //setup sms configuration
    var sms = {
        sid: twilio-sid-id,
        auth: twilio-auth-id,
        to: xxx-xxx-xxxx, //recipient
        from: yyy-yyy-yyyy //your twilio assigned phone number
    };
    
    var notify = require('app-notify');

    //set your configuration
    notify.cfg.sms = sms;

    notify.sms({
        message: 'Hello world'
    })
    .then(function(data){
        console.log(data);
    })
    .catch(function(err){
        console.error(err);
    });

Send to whichever services we have enabled (both sms and email):

    var notify = require('app-notify');

    //set your configuration
    notify.cfg.email = email;
    notify.cfg.smtp = smtp;
    notify.cfg.sms = sms;

    //sends both
    notify.send({
        subject: 'This is a test',
        message: 'Hello world'
    });

    notify.cfg.email.disabled = true;
    
    //sends only sms
    notify.send({
        message: 'Hello world',
    });

# usage (callbacks)

app-notify can be used with callbacks too!

# run tests

    gulp test
