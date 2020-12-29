(function(){
  'use strict';
  const WebSocketServer = require('ws').Server;
  //创建一个实例
  const ws = new WebSocketServer({
    port: 8282
  })
  ws.on('connection',function(ws){
   console.log('客户端已经链接了');
   //接受小游戏发送的数据所调用的方法
   ws.on('message',function(message){
     console.log(message);
     ws.send('1234556')
   })
 
  })
})()