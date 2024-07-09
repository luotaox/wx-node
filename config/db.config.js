const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/mini");



mongoose.connection.on('connected', function () {
  console.log('连接成功');
})
