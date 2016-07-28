var gulp = require('gulp');
var plumber = require('gulp-plumber'); // какой-то обработчик ошибок
var postcss = require('gulp-postcss'); // несколько действий в трубе
var concat = require('gulp-concat'); // обьединение и записб файлов в один
var uglify = require('gulp-uglify'); // сжатие js
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var csso = require('gulp-csso');
var inlineCss = require('gulp-inline-css');
var path = {
    build: {//Тут мы укажем куда складывать готовые после сборки файлы
        js: 'templates/shop/build',
        css: 'templates/shop/build'
    },
    src: {//Пути откуда брать исходники
        js_plugins: [],
        js_custom: [],
        css: []
    },
    build_file: {
        js_plugins: 'app.min.plug.js',
        js_custom: 'app.min.custom.js',
        css: 'app.min.css'
    },
    watch: {//Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        js: 'templates/shop/js/*.js',
        css: 'templates/shop/css/*.css'
    }
};

gulp.task('jsp', function () {
    return gulp.src(path.src.js_plugins)
        .pipe(uglify())
        .pipe(concat(path.build_file.js_plugins))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('jsc', function () {
    return gulp.src(path.src.js_custom)
        .pipe(uglify())
        .pipe(concat(path.build_file.js_custom))
        .pipe(gulp.dest(path.build.js));
});

gulp.task('css', function () {
    return gulp.src(path.src.css)
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer()]))
        .pipe(concat(path.build_file.css))
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.css));
});

gulp.task('email', function () {
    return gulp.src('templates/shop/mail.html')
        .pipe(plumber())
        .pipe(inlineCss({
            preserveMediaQueries: true
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('watcher', function () {
    gulp.watch(path.src.css, ['css']);
    gulp.watch(path.src.js_custom, ['jsc']);
    gulp.watch('templates/shop/mail.html', ['email']);
});

gulp.task('default', ['watcher']);


