var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber'); // какой-то обработчик ошибок
var postcss = require('gulp-postcss'); // несколько действий в трубе
var concat = require('gulp-concat'); // обьединение и записб файлов в один
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({browsers: ['last 2 versions']}); // automatic add prefixes
var sourcemaps = require('gulp-sourcemaps'); // create source map file
var csso = require('gulp-csso'); //минимизатор
var path = {
    build: {//Тут мы укажем куда складывать готовые после сборки файлы
        js: '',
        css: 'public/dist/css'
    },
    src: {//Пути откуда брать исходники
        js_plugins: [],
        js_custom: [],
        css: ['public/dist/css/main.css'],
        less: ['public/css/less/main.less']
    },
    build_file: {
        js_plugins: '',
        js_custom: '',
        css: 'app.min.css'
    },
    watch: {//Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        js: '',
        css: 'public/css/*.less'
    }
};

gulp.task('less', function () {
    return gulp.src(path.src.less)
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest(path.build.css))
        .pipe(concat(path.build_file.css))
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.css));
});


gulp.task('watcher', function () {
    gulp.watch(path.src.less, ['less']);
});

gulp.task('default', ['watcher']);


