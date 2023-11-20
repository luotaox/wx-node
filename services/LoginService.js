const axios = require("axios");
const fs = require('fs');
const cheerio = require("cheerio");
const { courseParser } = require('../uilts/Week')

const LoginService = {
  login: async ({ encoded, RANDOMCODE, cookie }) => {
    axios.defaults.withCredentials = true;
    const res = await axios.post('http://jwxt.sanyau.edu.cn/syxy_jsxsd/xk/LoginToXk', {
      RANDOMCODE: RANDOMCODE,
      encoded: encoded
    }, {
      headers: {
        'Content-Type': 'multipart/form-data', // 设置Content-Type
        'Cookie': cookie
      }
    });
    let status;
    res.request.method == 'GET' ? status = 201 : status = 404;
    return status;
  },

  verify: async () => {
    const response = await axios({
      url: 'http://jwxt.sanyau.edu.cn/syxy_jsxsd/verifycode.servlet',
      method: 'GET',
      responseType: 'stream'
    })

    const cookie = response.headers['set-cookie']; // 获取响应头中的cookie信息
    let result = '';

    cookie.forEach(item => {
      const regex = /([^=]*)=(.*?)(?:;|$)/g;
      const [, key, value] = regex.exec(item);
      result += key + '=' + value + ';';
    });
    const Cookies = result.slice(0, -1);

    const writer = fs.createWriteStream((__dirname, 'public/images/image.jpg'));

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);  // 等待写入操作完成
      writer.on('error', reject);
      response.data.pipe(writer);
    });

    return Cookies;

  },
  scores: async ({ token }) => {
    '--------------------------'
  },
  syllabus: async ({ token }) => {
    const res = await axios.post('http://jwxt.sanyau.edu.cn/syxy_jsxsd/xskb/xskb_list.do', {
      xnxq01id: '2023-2024-1',
      sfFD: 1,
      wkbkc: 1,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': token
      }
    })
    const html = res.data
    const $ = cheerio.load(html)
    const data = courseParser($);
    return data;
  }

}

module.exports = LoginService;
