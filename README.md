##### vue + ElementUI + Vue-socket + nodejs实现的简单聊天室

##### 运行项目 

###### 前端

    cd chatroon2
    npm install
    npm run dev

###### 后端

    cd server
    node server.js
    node socket.js

###### 注意事项

使用之前配置后端代码里的跨域配置

*server.js*

    res.header('Access-Control-Allow-Origin', 'http://192.168.199.239:8080')
这里换成你前端代码跑的地址

*socket.js*

    cors: {
        origin: "http://192.168.199.239:8080",
        methods: ["GET", "POST"],
        // allowedHeaders: ["my-custom-header"],
        credentials: true
        }

这里的origin也是一样换成前端代码跑的地址


###### 与我联系
352273172@qq.comss
