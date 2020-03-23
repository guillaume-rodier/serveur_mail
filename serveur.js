"use strict";

const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');

require('custom-env').env();

var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

async function main(){
    smtpTransport = nodemailer.createTransport(smtpTransport({
        host: 'smtp.gmail.com',
        secure: false,
        port: 587,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    }));

    readHTMLFile(__dirname + '/mails/2019-05/mail-bonpapa/index.html', function(err, html) {
        var template = handlebars.compile(html);
        var htmlToSend = template();
        var mailOptions = {
            from: '"Little martien 👻" <foo@example.fr>',
            to : 'foo@example.fr',
            subject: 'Nouvelles de Paris ✔',
            html : template()
         };
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log('Erreur lors de l\'envoie du mail !');
                console.log(error);
                callback(error);
            } else{
					      console.log('Mail envoyé avec succès !')
  					}
  					smtpTransport.close();
        });
    });
}

main().catch(console.error);
