const LoginService = require('../services/LoginService');
const UserController = require('../controllers/UserController');
const fs = require("fs");
// 并发处理
let queue = [];
// 姓名
let name = '';
const LoginController = {
  login: async (req, res) => {
    const { username, password, RANDOMCODE, cookie } = req.body;
    const usernameBase = Buffer.from(username).toString('base64');
    const passwordBase = Buffer.from(password).toString('base64');
    const encoded = usernameBase + "%%%" + passwordBase;
    const result = await LoginService.login({
      encoded,
      RANDOMCODE,
      cookie
    });
    // 判断验证码是否错误
    let codes;
    result == 201 ? codes = 0 : codes = 1;
    if (result == 201) {
      name = await UserController.addUser(username, cookie);
    }
    res.status(201).send({
      ActionType: 'OK',
      codes,
      code: 0,
      name,
      cookie,
    })
  },

  verify: async (req, res) => {
    queue.push(req);
    while (queue.length > 0) {
      const currentReq = queue.shift();
      const result = await LoginService.verify();
      res.setHeader('cookie', result)
      res.setHeader('Content-Type', 'image/jpg');

      const imagePath = 'public/images/image.jpg';
      const image = fs.readFileSync(imagePath);
      res.end(image);
    }
  },
  scores: async (req, res) => {
    const { token } = req.headers;
    const { term } = req.query;
    const result = await LoginService.scores({ token, term });
    if (result.length == 0) {
      res.status(201).send({
        ActionType: "ERROR",
        code: 403
      })
      return;
    }
    res.status(201).send({
      ActionType: "OK",
      data: result,
      code: 0
    })
  },
  syllabus: async (req, res) => {
    const { token } = req.headers;
    const result = await LoginService.syllabus({ token });
    if (result.length == 0) {
      res.status(201).send({
        ActionType: "ERROR",
        code: 403
      })
      return;
    }
    res.status(201).send({
      ActionType: "OK",
      data: result,
      code: 0
    })
  },
  // 学期列表 
  termlist: async (req, res) => {
    const result = await LoginService.termlist();
    res.status(201).send({
      ActionType: "OK",
      data: result,
      code: 0
    })
  },
  // 专业 
  majorlist: async (req, res) => {
    const { token } = req.headers;
    const { skyx, sknj } = req.query;
    const result = await LoginService.majorlist({ skyx, sknj, token });
    if (!Array.isArray(result)) {
      res.status(201).send({
        ActionType: "ERROR",
        code: 403
      })
      return;
    }
    res.status(201).send({
      ActionType: "OK",
      data: result,
      code: 0
    })
  },
  // 全校课表 
  allCourse: async (req, res) => {
    const { token } = req.headers;
    const { xnxqh, skyx, sknj, skzy, skbj } = req.body;
    const result = await LoginService.allCourse({ xnxqh, skyx, sknj, skzy, skbj, token });
    res.status(201).send({
      ActionType: "OK",
      data: result,
      code: 0
    })
  },
  // 考试安排
  examSchedule: async (req, res) => {
    const { token } = req.headers;
    const { term } = req.body;
    const result = await LoginService.examSchedule({ term, token });
    res.status(201).send({
      ActionType: "OK",
      data: result,
      code: 0
    })
  }
}

module.exports = LoginController;