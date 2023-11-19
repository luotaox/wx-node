const express = require('express');
const LoginRouter = express.Router();
const LoginController = require("../controllers/LoginController")

// 验证码
LoginRouter.get('/verify', LoginController.verify);
// 登录
LoginRouter.post('/login', LoginController.login);
// 成绩
LoginRouter.get('/scores', LoginController.scores);
// 课表
LoginRouter.get('/syllabus', LoginController.syllabus);

module.exports = LoginRouter; 