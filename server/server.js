var express = require('express')
const bodyParser = require("body-parser")
var app = express();
var allowCrossDomain = function(req, res, next) {//设置response头部的中间件
  res.header('Access-Control-Allow-Origin', 'http://192.168.199.239:8080');//8089是vue项目的端口，这里相当于白名单
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next();
};

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'chat'
});

connection.connect();

const userNames = new Set();
app.use(allowCrossDomain);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.post("/api/data",function (request,response) {
    const name = request.body.name;
    const data = {
        flag: 0
    }
    if (name) {
        if (userNames.has(name)) {
            data.flag = 1;
        } else {
            userNames.add(name)
        }
    }
  response.send(data);
})


app.post("/api/register",function (request,response) {
  console.log(request.body);
  const { name='匿名用户'+Math.random(), tel='', sex=0 } = request.body;

  const data = {
    name,
    tel,
    sex
  }
  
  // 向数据库中插入数据
  connection.query(`INSERT INTO user (name, sex, tel) VALUES ('${name}', '${sex}', '${tel}')`, (err, data) => {
    if (err) {
      console.error(err)
      response.send(err);
    } else {
      console.log(data)
      response.send(data);
    }
  })
})











app.listen('3000',function () {
  console.log('>listening on 3000')
});
