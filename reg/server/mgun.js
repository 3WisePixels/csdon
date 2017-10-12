Meteor.startup(function(){
    // Meteor.Mailgun.config({
    //   username: 'postmaster@3wp.io',
    //   password: 'Rule#M4Car81n3'
    // });
    smtp = {
        username: 'contact@csdon.org',
        password: 'Rule#M4Car81n3',
        server: 'smtp-mail.outlook.com',
        port: 587
    }

    process.env.MAIL_URL = 'smtps://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

    //process.env.MAIL_URL = 'smtp://postmaster@3wp.io:Rule#M4Car81n3@smtp.mailgun.org:465';

});

  // In your server code: define a method that the client can call
  Meteor.methods({
    sendEmail: function (mailFields) {
        console.log("about to send email...");
        check([mailFields.to, mailFields.from, mailFields.subject, mailFields.text, mailFields.html], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Email.send({
            to: mailFields.to,
            from: mailFields.from,
            subject: mailFields.subject,
            text: mailFields.text,
            html: mailFields.html
        });
        console.log("email sent!");
    }
  });


// Meteor.call('sendEmail',{to:'sean@3wp.io',from:'donotreply@csdon.org',subject:'Registration',text:'Success. You have been registered',html:''})
