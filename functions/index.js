const functions = require('firebase-functions');
const email = require("emailjs/email");
const moment = require('moment');
const cors = require('cors')({origin: true});

// Start writing Firebase Functions
// https://firebase.google.com/functions/write-firebase-functions

exports.sendMeMail = functions.https.onRequest((request, response) => {

    if (request.method === 'PUT') {
        response.status(403).send('Forbidden!');
    }

    cors(request, response, () => {

        let format = request.query.format;

        if (!format) {
            format = request.body.format;
        }

        const formattedDate = moment().format(format);
        sendMail(request, response, formattedDate);
    });
});

function sendMail(request, response, formattedDate) {
    const server = email.server.connect({
        user: "hhalningg@gmail.com",
        password: "80983522900ah",
        host: "smtp.gmail.com",
        ssl: true
    });

    server.send({
        text: request.body.message,
        from: 'Mi Portfolio <hhalningg@gmail.com>',
        to: 'Halning <halningus@gmail.com>',
        cc: '',
        subject: request.body.subject
    }, (err) => {
        if (err) {
            // return response.json({status: '', msg: 'sent'});
            response.send(`${err} Fuck`);
        } else {
            response.status(200).send(formattedDate);
            // response.send(request.body.message);
        }
    });
}
