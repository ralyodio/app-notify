app-notify
==========

Send SMS and email notifications from within your node.js app

# install

```shell
npm install app-notify
```

```javascript
var Notify = require('app-notify');
var cfg = {...};
var notify = new Notify(cfg);
```

# usage (promises)

### Send an email message:

```javascript
var cfg = {};

//setup smtp server
cfg.smtp = {
    host: xxx,
    user: user,
    pass: pass,
    port: port
};

//setup email headers
cfg.email = {
    to: 'user@example.com',
    from: 'sender@example.com'
};

var Notify = require('app-notify');
var notify = new Notify(cfg);

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
```

### Send an SMS message    

```javascript
var cfg = {};

//setup sms configuration
cfg.sms = {
    sid: 'twilio-sid-id',
    auth: 'twilio-auth-id',
    to: 'xxx-xxx-xxxx', //recipient
    from: 'yyy-yyy-yyyy' //your twilio assigned phone number
};

var Notify = require('app-notify');
var notify = new Notify(cfg);

notify.sms({
    message: 'Hello world'
})
.then(function(data){
    console.log(data);
})
.catch(function(err){
    console.error(err);
});
```

### Send to whichever services we have enabled (both sms and email):

```javascript
var cfg = {};

//setup smtp server
cfg.smtp = {
    host: xxx,
    user: user,
    pass: pass,
    port: port
};

//setup email headers
cfg.email = {
    to: 'user@example.com',
    from: 'sender@example.com'
};

var Notify = require('app-notify');
var notify = new Notify(cfg);

//sends both
notify.send({
    subject: 'This is a test',
    message: 'Hello world'
});

//disable email
notify.cfg.email.disabled = true;

//sends only sms
notify.send({
    message: 'Hello world',
});
```

# usage (callbacks)

app-notify can be used with callbacks too!

# run tests

```shell
gulp test
```
