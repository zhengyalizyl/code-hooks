/**
 * 生成ESM
 * 生成CSS
 * DTS->lib
 * readme.md copy
 */

const gulp = require('gulp');
const ts = require('gulp-typescript');
const babel = require('gulp-babel');
const del = require('del');

// 针对每次build时都执行delete操作
gulp.task('clean', async () => {
  await del('lib/**');
  await del('es/**');
  await del('dist/**');
});

// 生成cjs
gulp.task('cjs', () => {
  //
  return gulp
    .src(['./es/**/*.js'])
    .pipe(
      babel({
        configFile: '../../.babelrc',
      }),
    )
    .pipe(gulp.dest('lib/'));
});

// 生成ESM
gulp.task('es', () => {
  // tsc modules esnext
  const tsProject = ts.createProject('tsconfig.pro.json', {
    module: 'ESNext',
  });
  // gulp的链式调用
  return tsProject.src().pipe(tsProject()).pipe(babel()).pipe(gulp.dest('es/'));
});

// 生成声明文件
gulp.task('declaration', () => {
  const tsProject = ts.createProject('tsconfig.pro.json', {
    declaration: true, // 生成声明文件
    emitDeclarationOnly: true, // 只生成DTS文件
  });
  return tsProject.src().pipe(tsProject()).pipe(gulp.dest('es/')).pipe(gulp.dest('lib/'));
});

gulp.task('copyReadme', async () => {
  await gulp.src('../../README.md').pipe(gulp.dest('../../packages/hooks'));
});

exports.default = gulp.series('clean', 'es', 'cjs', 'declaration', 'copyReadme');
