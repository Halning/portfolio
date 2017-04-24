import * as sm from 'sitemap';
import * as fs from 'fs';
import * as path from 'path';


const sitemapPath = path.join(__dirname, '../dist/assets', 'sitemap.xml');


function getStaticPageSitemapLinks(): any {
    return [
        {
            changefreq: 'monthly',
            priority: 0.9,
            url: '/'
        },
        {
            changefreq: 'monthly',
            priority: 0.9,
            url: '/about'
        },
        {
            changefreq: 'monthly',
            priority: 0.9,
            url: '/articles'
        },
        {
            changefreq: 'monthly',
            priority: 0.9,
            url: '/contacts'
        },
        {
            changefreq: 'monthly',
            priority: 0.9,
            url: '/request'
        },
        {
            changefreq: 'monthly',
            priority: 0.9,
            url: '/calculation'
        },
    ]
}

function sitemapIsOld(): boolean {
    const sitemapStats = fs.statSync(sitemapPath);
    const lastModDate = new Date(sitemapStats.mtime);
    const lastModTime = lastModDate.getTime();
    const timeToUpdate = 1000 * 60 * 60 * 24; // 24 hours
    const timeInMs = Date.now();
    return timeInMs - lastModTime > timeToUpdate;
}


function updateSitemapFile() {
    let sitemapLinksArray = [];
    sitemapLinksArray = sitemapLinksArray.concat(getStaticPageSitemapLinks());
    const sitemap = sm.createSitemap({
        hostname: 'http://example.com',
        cacheTime: 600000,  // 600 sec cache period
        urls: sitemapLinksArray
    });
    fs.writeFileSync(sitemapPath, sitemap.toString());
}

export function getSitemap(req, res) {

    if (!fs.existsSync(sitemapPath) || sitemapIsOld()) {
        updateSitemapFile();
    }
    const data = fs.readFileSync(sitemapPath, 'utf8');
    res.header('Content-Type', 'application/xml');
    res.send(data);
}

export function updateSitemap(req, res) {
    updateSitemapFile();
    const data = fs.readFileSync(sitemapPath, 'utf8');
    res.header('Content-Type', 'application/xml');
    res.send(data);
}