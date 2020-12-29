/*
* 用来模拟服务器，接受前端小游戏的HTTP网络请求
* 通过node来模拟
* 下面是一个自执行函数也可以叫立即执行的函数
 */
(function (){
  'use strict';
  const http = require('http');
  http.createServer(function(request,response){
  let body = '';
  request.on('data',function(chunk){
    body +=chunk;
  })
  //请求结束
   request.on('end',function(){
     console.log(body);
   }).listen(8181);
  });
})();
