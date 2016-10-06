var gulp=require("gulp"),//gulp 具有src dest task watch 事件
    less=require("gulp-less");//加载less模块

gulp.task("less",function(){
    gulp.src("css/*.less").pipe(less()).pipe(gulp.dest("css/"));
});
gulp.task("watchless", function () {
    gulp.watch("css/*.less",["less"])//注意执行函数为数组形式
});
