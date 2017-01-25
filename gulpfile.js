"use strict";

var fs = require("fs");
var del = require("del");
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var ts = require("gulp-typescript");
var sass = require("gulp-sass");
var pleeease = require("gulp-pleeease");
var concat = require("gulp-concat");
var webserver = require("gulp-webserver");
var run = require("run-sequence");
var watch = require("gulp-watch");
var mock = require("gulp-mock-server");

var path = {
  root: "./dist",
  src: "./src",
  mockData: "./mock_data",
  ts: "scripts",
  sass: "scss",
  js: "javascripts",
  css: "stylesheets",
  img: "images"
}

gulp.task("create_root", () => {
  if (!fs.existsSync(path.root)) {
    fs.mkdirSync(path.root);
  }
});

gulp.task("clean", ["create_root"], del.bind(null, [path.root]));

gulp.task("ts", ["create_root"], () => {
  let project = ts.createProject("tsconfig.json", { declaration: false });
  return project.src()
    .pipe(plumber())
    .pipe(project())
    .pipe(gulp.dest([path.root, path.js].join("/")));
});

gulp.task("sass", ["create_root"], () => {
  return gulp.src([path.src, path.sass, "**/*.scss"].join("/"))
    .pipe(plumber())
    .pipe(sass())
    .pipe(pleeease())
    .pipe(concat("main.css"))
    .pipe(gulp.dest([path.root, path.css].join("/")));
});

gulp.task("image", ["create_root"], () => {
  return gulp.src([path.src, path.img, "**/*"].join("/"))
    .pipe(plumber())
    .pipe(gulp.dest([path.root, path.img].join("/")));
});

gulp.task("html", ["create_root"], () => {
  return gulp.src([path.src, "**/*.html"].join("/"))
    .pipe(plumber())
    .pipe(gulp.dest(path.root));
});

gulp.task("build", (callback) => {
  return run("clean", ["sass", "ts", "image", "html"], callback);
});

gulp.task("watch", ["build"], () => {
  watch([path.src, path.sass, "**/*"].join("/"), () => gulp.start("sass"));
  watch([path.src, path.ts, "**/*"].join("/"), () => gulp.start("ts"));
  watch([path.src, path.img, "**/*"].join("/"), () => gulp.start("image"));
  watch([path.src, "**/*.html"].join("/"), () => gulp.start("html"));
  gulp.watch("tsconfig.json", ["ts"]);
});

gulp.task("web", ["watch"], () => {
  gulp.src(path.mockData)
    .pipe(mock({
      port: 9000,
      mockDir: path.mockData
    }));

  gulp.src(path.root)
    .pipe(webserver({
      livereload: true,
      open: true,
      port: 8000,
      proxies: [
        {
          source: "/api",
          target: "http://localhost:9000"
        }
      ]
    }));
});

gulp.task("default", ["build"]);
