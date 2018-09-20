'use strict';

const gulp           = require('gulp');
const sass           = require('gulp-sass');
const plumber        = require('gulp-plumber');
const postcss        = require('gulp-postcss');
const autoprefixer   = require('autoprefixer');
const server         = require('browser-sync').create();
const mqpacker       = require('css-mqpacker');
const minifycss      = require('gulp-csso');
const cncat          = require('gulp-concat');
const uglify         = require('gulp-uglify');
const rename         = require('gulp-rename');
const imagemin       = require('gulp-imagemin');
const webp           = require('gulp-webp');
const svgmin         = require('gulp-svgmin');
const svgstore       = require('gulp-svgstore');
const concat         = require('gulp-concat');
const inject         = require('gulp-inject');
const injectPartials = require('gulp-inject-partials');
const run            = require('run-sequence');
const del            = require('del');
const ghPages        = require('gulp-gh-pages');
const babel          = require('gulp-babel');

// CLEAN BUILD

gulp.task('clean', () => {
  return del('build');
});

// HTML

function fileContents (filePath, file) {
  return file.contents.toString('utf8');
}

gulp.task('html', () => {
  return gulp.src('src/*.html')
    .pipe(injectPartials({
      removeTags: true
    }))
    .pipe(gulp.dest('./build'));
});

// CSS

gulp.task('style', () => {
  gulp.src('src/scss/main.scss')
    .pipe(plumber())
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    }))
    .pipe(postcss([
      autoprefixer(),
      mqpacker({
        sort: true
      })
    ]))
  // .pipe(gulp.dest('build/css'))
    .pipe(minifycss())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

// JS
gulp.task('js:del', () => {
  return del('build/js');
});

gulp.task('js', ['js:del'], () => {
  gulp.src([
    'src/libs/slick/slick/slick.min.js',
    'src/libs/highcharts/highcharts.js',
    'src/js/*.js' // At the end
  ])
    .pipe(plumber())
    .pipe(cncat('index.min.js'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(server.stream());
});

// FONTS

gulp.task('fonts:del', () => {
  return del('build/fonts');
});

gulp.task('fonts', ['fonts:del'], () => {
  return gulp.src('src/fonts/**/*.{woff,woff2}')
    .pipe(gulp.dest('build/fonts/'));
});

// FAVICON

gulp.task('favicons:del', () => {
  return del('build/img/favicons');
});

gulp.task('favicon', ['favicons:del'], () => {
  return gulp.src('src/img/favicons/**')
    .pipe(gulp.dest('build/img/favicons/'));
});

// IMAGES

gulp.task('img:del', () => {
  return del('build/img/**/*.*');
});

gulp.task('img:copy', ['img:del'], () => {
  return gulp.src('src/img/**/*.*')
    .pipe(gulp.dest('build/img/'));
});

gulp.task('img:minify', ['img:copy'], () => {
  return gulp.src('build/img/**/*.{png,jpg,gif,svg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'));
});

// WEBP

gulp.task('webp:del', () => {
  return del('build/img/content');
});

gulp.task('webp:copy', ['webp:del'], () => {
  return gulp.src('src/img/content/*.{png,jpg}')
    .pipe(gulp.dest('build/img/content'));
});

gulp.task('webp:convert', ['webp:copy'], () => {
  return gulp.src('src/build/img/content/*.{png,jpg}')
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest('build/img/content'));
});

// SVG-SPRITE

gulp.task('svg-sprite:del', () => {
  return del('build/img/svg-sprite');
});

gulp.task('svg-sprite', ['svg-sprite:del'], () => {
  var svgs = gulp.src('src/img/svg/*.svg')
  // .pipe(gulp.dest('build/img/svg-sprite'))
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }));
  
  gulp.src('build/index.html')
    .pipe(inject(svgs, {transform: fileContents}))
    .pipe(gulp.dest('build/'));
    
    svgs.pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
  
});

//GH-PAGES

gulp.task('deploy', () => {
  return gulp.src('build/**/*')
    .pipe(ghPages());
});

// LIVE SERVER

gulp.task('serve', () => {
  server.init({
    server: 'build',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  
  gulp.watch('src/scss/**/*.scss', ['style']);
  gulp.watch('src/**/*.html', ['html', server.reload]);
  gulp.watch('src/js/*.js', ['js', server.reload]);
  // gulp.watch('src/img/favicons/**', ['favicon', server.reload]);
  gulp.watch('src/img/*.*', ['img:minify', server.reload]);
  gulp.watch('src/img/content/*.{png,jpg}', ['webp:convert', server.reload]);
  // gulp.watch('src/fonts/*.*', ['fonts', server.reload]);
  // gulp.watch('src/img/svg-sprite/**', ['svg-sprite', server.reload]);
});

// BUILD

gulp.task('build', (done) => {
  run(
    'clean',
    'fonts',
    'favicon',
    'img:minify',
    'webp:convert',
    'html',
    'style',
    'svg-sprite',
    'js',
    done
  );
});

// DEFAULT

gulp.task('default', ['serve']);