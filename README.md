app-notify
==========

Send Twilio SMS and SMTP email notifications from within your node.js app

# install

```shell
npm install app-notify
```

```javascript
const Notify = require('app-notify');
const cfg = {...};
const notify = new Notify(cfg);
```

# usage (promises)

### Send an email message:

```javascript
const cfg = {};

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

const Notify = require('app-notify');
const notify = new Notify(cfg);

//send an email
notify.email.send({
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
const cfg = {};

//setup sms configuration
cfg.sms = {
    sid: 'twilio-sid-id',
    auth: 'twilio-auth-id',
    to: 'xxx-xxx-xxxx', //recipient
    from: 'yyy-yyy-yyyy' //your twilio assigned phone number
};

const Notify = require('app-notify');
const notify = new Notify(cfg);

notify.sms.send({
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
const cfg = {};

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

const Notify = require('app-notify');
const notify = new Notify(cfg);

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
