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
// 学期列表
LoginRouter.get('/termlist', LoginController.termlist);
// 专业
LoginRouter.get('/majorlist', LoginController.majorlist);
// 全校课表
LoginRouter.post('/allcourse', LoginController.allCourse);
// 考试安排
LoginRouter.post('/exam_schedule', LoginController.examSchedule);


module.exports = LoginRouter; 