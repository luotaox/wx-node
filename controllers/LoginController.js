const LoginService = require('../services/LoginService')
const fs = require("fs");
// 并发处理
let queue = [];

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
    let code;
    result == 201 ? code = 0 : code = 1;
    res.status(201).send({
      ActionType: 'OK',
      code,
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
    const result = await LoginService.scores({ token });
    res.status(201).send({
      ActionType: "OK",
      data: result,
      code: 0
    })
  },
  syllabus: async (req, res) => {
    const { token } = req.headers;
    const result = await LoginService.syllabus({ token });
    res.status(201).send({
      ActionType: "OK",
      data: result,
      code: 0
    })
  }
}

module.exports = LoginController;