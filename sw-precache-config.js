module.exports = {
    staticFileGlobs: [
        'dist/**.html',
        'dist/**.js',
        'dist/**.css',
        'dist/**.png',
        'dist/**.jpg',
        'dist/**.ico',
        'dist/assets/img/*',
        'dist/manifest.json',
        'dist/assets/i18n/*',
        'dist/assets/icons/*',
        'dist/**.woff2',
        'dist/**.woff',
        'dist/**.eot',
        'dist/**.svg',
        'dist/**.ttf'
    ],
    root: 'dist',
    stripPrefix: 'dist/',
    navigateFallback: '/index.html',
    runtimeCaching: [{
        urlPattern: /portfolio-2a12b\.firebaseapp\.com/,
        handler: 'cacheFirst'
    }]
};