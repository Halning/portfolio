const functions = require('firebase-functions');
const email = require("emailjs/email");
const moment = require('moment');
const cors = require('cors')({origin: true});
const sm = require('sitemap');

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
        from: 'Me Portfolio <hhalningg@gmail.com>',
        to: 'Halning <halningus@gmail.com>',
        cc: '',
        subject: request.body.subject
    }, (err) => {
        if (err) {
            response.status(500).send('Can send mail emailjs error');
        } else {
            response.status(200).send(formattedDate);
        }
    });
}

/* sitemap generation */
exports.getSiteMap = functions.https.onRequest((request, response) => {
    const data = updateSitemapFile();

    response.header('Content-Type', 'application/xml');
    response.send(data);
});

function getStaticPageSitemapLinks() {
    return [
        {
            changefreq: 'monthly',
            priority: 0.9,
            url: '/'
        },
        {
            changefreq: 'monthly',
            priority: 0.9,
            url: '/home'
        },
        {
            changefreq: 'monthly',
            priority: 0.9,
            url: '/about'
        },
        {
            changefreq: 'monthly',
            priority: 0.9,
            url: '/skills'
        },
        {
            changefreq: 'monthly',
            priority: 0.9,
            url: '/projects'
        },
        {
            changefreq: 'monthly',
            priority: 0.9,
            url: '/contacts'
        }
    ]
}

function updateSitemapFile() {
    let sitemapLinksArray = [];
    sitemapLinksArray = sitemapLinksArray.concat(getStaticPageSitemapLinks());
    let sitemap = sm.createSitemap({
        hostname: 'https://halning.com.ua',
        cacheTime: 600000,  // 600 sec cache period
        urls: sitemapLinksArray
    });
    return sitemap.toString();
}
