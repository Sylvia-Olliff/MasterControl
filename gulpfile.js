/* File: gulpfile.js */

const PROD = '/www/master_control/';
const SUB_PROD = '/www/master_control/app/subApps/';
const DEV = '/www/master_control_Dev/';
const SUB_DEV = '/www/master_control_Dev/app/subApps/';

// grab our packages
var gulp   		= require('gulp'),
    clean  		= require('gulp-clean'),
    uglify  	= require('gulp-uglify'),
    concat  	= require('gulp-concat'),
    cssnano 	= require('gulp-cssnano'),
    del     	= require('del'),
    ext_replace = require('gulp-ext-replace'),
    shell       = require('gulp-shell');

/*** Deploy to Production Tasks  ***/
gulp.task('EntryAudit-scripts', EA_Script);
gulp.task('EntryAudit-styles', EA_Styles);
gulp.task('EntryAudit-views', EA_Views);
gulp.task('EntryAudit-deploy', EA_Deploy);

gulp.task('ProgDocs-styles', PD_Styles);
gulp.task('ProgDocs-views', PD_Views);
gulp.task('ProgDocs-scripts', PD_Script);
gulp.task('ProgDocs-routing', PD_Routing);

gulp.task('Master-deploy', Master_Deploy);


/***  Clean up tasks   ***/
gulp.task('clear-logs', function(){
	del.sync([ DEV + 'logs/**', "!" + DEV + "logs"], {force: true});
});


/*** Task Components ***/
function EA_Script() {
	del.sync([ SUB_PROD + 'EntryAudit/views/dist/js/**', '!' + SUB_PROD + 'EntryAudit/views/dist/js'], {force: true})
	gulp.src( SUB_DEV + 'EntryAudit/views/dist/js/**')
				.pipe(gulp.dest( SUB_PROD + 'EntryAudit/views/dist/js/', {overwrite: true}));
}

function EA_Styles() {
	del.sync(['/www/master_control/app/subApps/EntryAudit/views/dist/css/**', '!/www/master_control/app/subApps/EntryAudit/views/dist/css'], {force: true});
	gulp.src('/www/master_control_Dev/app/subApps/EntryAudit/views/dist/css/**')
				.pipe(cssnano())
				.pipe(concat('main.min.css'))
				.pipe(gulp.dest('/www/master_control/app/subApps/EntryAudit/views/dist/css/', {overwrite: true}));	
}

function EA_Routing() {
	del.sync(['/www/master_control/app/subApps/EntryAudit/index.js'], {force: true});
	gulp.src('/www/master_control_Dev/app/subApps/EntryAudit/index.js').pipe(gulp.dest("/www/master_control/app/subApps/EntryAudit/", {overwrite: true}));
}

function EA_Views() {
	del.sync(['/www/master_control/app/subApps/EntryAudit/views/index.ejs', '/www/master_control/app/subApps/EntryAudit/views/snippets/**', '!/www/master_control/app/subApps/EntryAudit/views/snippets', '/www/master_control/app/subApps/EntryAudit/views/dist/img/**', '!/www/master_control/app/subApps/EntryAudit/views/dist/img'], {force: true});
	gulp.src('/www/master_control_Dev/app/subApps/EntryAudit/views/index.ejs').pipe(gulp.dest("/www/master_control/app/subApps/EntryAudit/views/", {overwrite: true}));	
	gulp.src('/www/master_control_Dev/app/subApps/EntryAudit/views/snippets/**').pipe(gulp.dest("/www/master_control/app/subApps/EntryAudit/views/snippets/", {overwrite: true}));
	gulp.src('/www/master_control_Dev/app/subApps/EntryAudit/views/dist/img/**').pipe(gulp.dest("/www/master_control/app/subApps/EntryAudit/views/dist/img/", {overwrite: true}));
}

function EA_Deploy() {
	del.sync(['/www/master_control/app/subApps/EntryAudit/controllers/**', '!/www/master_control/app/subApps/EntryAudit/controllers', '/www/master_control/app/subApps/EntryAudit/models/**', '!/www/master_control/app/subApps/EntryAudit/models'], {force: true});
	gulp.src('/www/master_control_Dev/app/subApps/EntryAudit/controllers/**').pipe(gulp.dest("/www/master_control/app/subApps/EntryAudit/controllers/", {overwrite: true}));
	gulp.src('/www/master_control_Dev/app/subApps/EntryAudit/models/**').pipe(gulp.dest("/www/master_control/app/subApps/EntryAudit/models/", {overwrite: true}));

	EA_Script();
	EA_Styles();
	EA_Routing();
	EA_Views();
}

function PD_Styles() {
	del.sync(['/www/master_control/app/subApps/ProgDocs/views/dist/css/**', '!/www/master_control/app/subApps/ProgDocs/views/dist/css'], {force: true});
	gulp.src('/www/master_control_Dev/app/subApps/ProgDocs/views/dist/css/**')
				.pipe(cssnano())
				.pipe(concat('main.min.css'))
				.pipe(gulp.dest('/www/master_control/app/subApps/ProgDocs/views/dist/css/', {overwrite: true}));	
}

function PD_Views() {
	del.sync(['/www/master_control/app/subApps/ProgDocs/views/index.ejs', '/www/master_control/app/subApps/ProgDocs/views/snippets/**', '!/www/master_control/app/subApps/ProgDocs/views/snippets', '/www/master_control/app/subApps/ProgDocs/views/dist/img/**', '!/www/master_control/app/subApps/ProgDocs/views/dist/img'], {force: true});
	gulp.src('/www/master_control_Dev/app/subApps/ProgDocs/views/index.ejs').pipe(gulp.dest("/www/master_control/app/subApps/ProgDocs/views/", {overwrite: true}));	
	gulp.src('/www/master_control_Dev/app/subApps/ProgDocs/views/snippets/**').pipe(gulp.dest("/www/master_control/app/subApps/ProgDocs/views/snippets/", {overwrite: true}));
	gulp.src('/www/master_control_Dev/app/subApps/ProgDocs/views/dist/img/**').pipe(gulp.dest("/www/master_control/app/subApps/ProgDocs/views/dist/img/", {overwrite: true}));
}

function PD_Script() {
	del.sync([ SUB_PROD + 'ProgDocs/views/dist/js/**', '!' + SUB_PROD + 'ProgDocs/views/dist/js'], {force: true})
	gulp.src( SUB_DEV + 'ProgDocs/views/dist/js/**')
				.pipe(gulp.dest( SUB_PROD + 'ProgDocs/views/dist/js/', {overwrite: true}));
}

function PD_Routing() {
	del.sync(['/www/master_control/app/subApps/ProgDocs/index.js'], {force: true});
	del.sync(['/www/master_control/app/subApps/ProgDocs/controllers/**', '!/www/master_control/app/subApps/ProgDocs/controllers', '/www/master_control/app/subApps/ProgDocs/models/**', '!/www/master_control/app/subApps/ProgDocs/models'], {force: true});
	gulp.src('/www/master_control_Dev/app/subApps/ProgDocs/index.js').pipe(gulp.dest("/www/master_control/app/subApps/ProgDocs/", {overwrite: true}));
	gulp.src('/www/master_control_Dev/app/subApps/ProgDocs/controllers/**').pipe(gulp.dest("/www/master_control/app/subApps/ProgDocs/controllers/", {overwrite: true}));
	gulp.src('/www/master_control_Dev/app/subApps/ProgDocs/models/**').pipe(gulp.dest("/www/master_control/app/subApps/ProgDocs/models/", {overwrite: true}));
}

function Master_Deploy() {
	del.sync([PROD], {force: true});
	del.sync([ DEV + 'logs/**', "!" + DEV + "logs"], {force: true});

	gulp.src(DEV + 'server.js').pipe(gulp.dest(PROD));
	gulp.src(DEV + 'logger.js').pipe(gulp.dest(PROD));
	gulp.src(DEV + 'package.json').pipe(gulp.dest(PROD));
	gulp.src(DEV + 'logs/**').pipe(gulp.dest(PROD + 'logs/'));
	gulp.src(DEV + 'config/**').pipe(gulp.dest(PROD + 'config/'));
	gulp.src(DEV + 'views/**').pipe(gulp.dest(PROD + 'views/'));
	gulp.src(DEV + 'app/**').pipe(gulp.dest(PROD + 'app/'));
	gulp.src(DEV + 'node_modules/**').pipe(gulp.dest(PROD + 'node_modules/'));

}

