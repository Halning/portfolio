var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber'); // какой-то обработчик ошибок
var concat = require('gulp-concat'); // обьединение и записб файлов в один
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({browsers: ['last 2 versions']}); // automatic add prefixes
var sourcemaps = require('gulp-sourcemaps'); // create source map file
var csso = require('gulp-csso'); //минимизатор
var spritesmith = require('gulp.spritesmith'); // создание спрайтов
var imagemin = require('gulp-imagemin'); // минимизация изображений
var buffer = require('vinyl-buffer'); // для минимизации картинок
var del = require('del'); // удаление папок и файлов

var path = {
    build: {//Тут мы укажем куда складывать готовые после сборки файлы
        js: 'public/dist/js',
        css: 'public/dist/css'
    },
    src: {//Пути откуда брать исходники
        js_plugins: [],
        js_angular: [
            'public/js/**/*.js'
        ],
        js_custom: [],
        css: ['public/dist/css/main.css'],
        less: 'public/css/less/*.less'
    },
    build_file: {
        js_plugins: '',
        js_custom: '',
        js_angular: 'app.js',
        css: 'app.min.css'
    },
    watch: {//Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        js: 'public/js/**/*.js',
        less: 'public/css/less/**/*'
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

gulp.task('angular', function(){
    return gulp.src(path.src.js_angular)
        .pipe(sourcemaps.init())
        .pipe(concat(path.build_file.js_angular))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
});

// Удаление старых файлов
gulp.task('sprite-clean', function () {
    del(['public/img/sprite-*.png']);
});

// Создание спрайтов
gulp.task('sprite-create', ['sprite-clean'], function () {
    var fileName = 'sprite-' + Math.random().toString().replace(/[^0-9]/g, '') + '.png';

    var spriteData = gulp.src('public/img/sprite/*.png')
        .pipe(spritesmith({
            imgName: fileName,
            cssName: 'sprite.less',
            cssFormat: 'less',
            cssVarMap: function (sprite) {
                sprite.name = 'icon-' + sprite.name;
            },
            imgPath: '../../img/' + fileName
        }));

    spriteData.img
 .pipe(buffer())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest('public/img/'));

    spriteData.css
        .pipe(gulp.dest('public/css/less/helpers/'));

    return spriteData;
});

gulp.task('watcher', function () {
    gulp.watch(path.watch.less, ['less']);
    gulp.watch(path.watch.js, ['angular']);
});

gulp.task('default', ['watcher']);


