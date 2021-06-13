var app = require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http, {
    allowEIO3: true,
    cors: {
      origin: "http://192.168.199.239:8080",
      methods: ["GET", "POST"],
      // allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

// app.get('/socket/client/index.html',function (req,res) {
//     res.send('<h1>welcome</h1>');
// })
//在线用户




var onlineUser={};
var onlineCount=0;

io.on('connection',function (socket) {
    console.log('新用户登录');

    //监听新用户加入
    socket.on('login',function (obj) {
        socket.name=obj.userid;
        //检查用户在线列表
        if(!onlineUser.hasOwnProperty(obj.userid)){
            onlineUser[obj.userid]=obj.username;
            //在线人数+1
            onlineCount++;
        }
        //广播消息
        io.emit('login',{onlineUser:onlineUser,onlineCount:onlineCount,user:obj});
        console.log(obj.username+"加入了聊天室");
    })
    //监听用户退出
    socket.on('disconnect',function () {
        //将退出用户在在线列表删除
        if(onlineUser.hasOwnProperty(socket.name)){
            //退出用户信息
            var obj={userid:socket.name, username:onlineUser[socket.name]};
            //删除
            delete onlineUser[socket.name];
            //在线人数-1
            onlineCount--;
            //广播消息
            io.emit('logout',{onlineUser:onlineUser,onlineCount:onlineCount,user:obj});
            console.log(obj.username+"退出了聊天室");
        }
    })

    //监听用户发布聊天内容
    socket.on('message', function(obj){
        //向所有客户端广播发布的消息
        io.emit('message', obj);
        console.log(obj.name+'说：'+obj.msg);
    });
})
http.listen(4000, function(){
    console.log('listening on *:4000');
});