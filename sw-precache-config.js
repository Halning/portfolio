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
        'dist/assets/i18n/*'
    ],
    root: 'dist',
    stripPrefix: 'dist/',
    navigateFallback: '/index.html',
    runtimeCaching: [{
        urlPattern: /portfolio-2a12b\.firebaseapp\.com/,
        handler: 'cacheFirst'
    }]
};