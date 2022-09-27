const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const del = require('del');
const browserSync = require('browser-sync').create();
// const req = require('requirejs');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/',
        }

    })
}

function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 versions'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
};

function scripts() {
    // return src([
    //     'node_modules/requirejs/require.js',
    //     'node_modules/requirejs-text/text.js',
    //     'node_modules/jquery/dist/jquery.js',
    //     'node_modules/knockout/build/output/knockout-latest.js'
    // ])  
    //     .pipe(rename({
    //         suffix: '.min'
    //       }))
    //     .pipe(uglify())
    //     .pipe(dest('app/js/libs'))
}

function scriptsTest() {
    return src('app/js/**/*.js')  
        .pipe(uglify())
        .pipe(dest('dist/js/'))
}

function images() {
    return src('app/images/**/*.*')
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(dest('dist/images'))
}

function build() {
    return src([
        'app/**/*.html',
        'app/css/style.min.css',
    ], { base: 'app' })
        .pipe(dest('dist'))
}

function cleanDist() {
    return del('dist')
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/js/**/*.js', '!app/js/libs/**/*.js']).on('change', browserSync.reload);
    watch(['app/**/*.html']).on('change', browserSync.reload);
};

exports.styles = styles;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;
exports.scriptsTest = scriptsTest;

exports.build = series(cleanDist, images, build, scriptsTest);
exports.default = parallel(styles, scripts, browsersync, watching);