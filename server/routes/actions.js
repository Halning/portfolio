// var User = require('../model/user');
// var config = require('../config/database');
// var jwt = require('jwt-simple');
const email = require("emailjs/email");

function sendMail(req, res) {

    const server = email.server.connect({
        user: "hhalningg@gmail.com",
        password: "80983522900ah",
        host: "smtp.gmail.com",
        ssl: true
    });

// send the message and get a callback with an error or details of the message that was sent
    server.send({
        text: 'Hey howdy',
        from: 'NodeJS',
        to: 'Wilson <halningus@gmail.com>',
        cc: '',
        subject: 'Greetings'
    }, function (err, message) {
        if (err)
            console.log(err);
        else
            return res.json({success: true, msg: 'sent'});
    });
}

module.exports = sendMail;