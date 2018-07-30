var gulp = require('gulp');
var del = require('del');
var plug = require('gulp-load-plugins')();

var jsLibraries = [
    './App/JavaScript/Libraries/Angular/angular.js',
    './App/JavaScript/Libraries/Angular/angular-route.js',
    './App/JavaScript/Libraries/Angular/angular-animate.js',
    './App/JavaScript/Libraries/Angular/paging.min.js'
];

var jsSource = [
    './App/JavaScript/Src/**/*.js'
];

var sassSource = [
    './App/Content/Sass/**/*.scss'
];

var templatesSource = [
    './App/Templates/**/*.html'
];

var compiledTemplates = [
    './Build/Templates/templates.js'
];

gulp.task('template', function() {
    return gulp.src(templatesSource)
        .pipe(plug.angularTemplatecache())
        .pipe(gulp.dest('Build/Templates'));
});

gulp.task('css', function() {
    return gulp
        .src(sassSource)
        .pipe(plug.rubySass({ style: 'expanded' })).on('error', catchError)
        .pipe(plug.autoprefixer('last 2 version', 'ie8', 'ie9'))
        .pipe(gulp.dest('./Build/Css'))
        .pipe(plug.rename({ suffix: '.min' }))
        .pipe(plug.minifyCss())
        .pipe(gulp.dest('./Build/Css'));
});

gulp.task('js', function() {
    return gulp
        .src(jsLibraries.concat(jsSource).concat(compiledTemplates))
        .pipe(plug.concat('all.js'))
        .pipe(gulp.dest('./Build/Js'))
        .pipe(plug.rename({ suffix: '.min' }))
        .pipe(plug.uglify({ mangle: true }))
        .pipe(gulp.dest('./Build/Js'));
});

gulp.task('hint', function() {
    return gulp
        .src(jsSource)
        .pipe(plug.jscs()).on('error', catchError)
        .pipe(plug.jshint())
        .pipe(plug.jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function(cb) {
    del([
    './Build/Css/**',
    './Build/Js/**',
    ], cb);
});

gulp.task('watch', function() {
    gulp.watch(templatesSource, ['template', 'js']);
    gulp.watch(sassSource, ['css']);
    gulp.watch(jsSource, ['hint', 'js']);
});

gulp.task('build', ['clean', 'template', 'hint', 'js', 'css']);

var catchError = function(err) {
    console.log(err);
    this.emit('end');
};