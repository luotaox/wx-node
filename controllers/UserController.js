const UserInfoModel = require('../models/UserInfoModel');
const axios = require('axios');
const cheerio = require('cheerio');

const UserController = {
  // 添加用户，已有用户更新登录时间
  addUser: async (username, cookie) => {
    const res = await axios.get('http://jwxt.sanyau.edu.cn/syxy_jsxsd/grxx/xsxx', {
      headers: {
        'Cookie': cookie
      }
    })

    const $ = cheerio.load(res.data);
    const table = $('#xjkpTable');

    let name = table.find('tr').eq(3).find('td').eq(1).text();
    let xueyuan = table.find('tr').eq(2).find('td').eq(0).text();
    let userClass = table.find('tr').eq(2).find('td').eq(3).text();

    UserInfoModel.create({
      xueyuan,
      userClass,
      createTime: new Date()
    })

    return name;
  },
  putLoginTime: () => {

  }
}

module.exports = UserController;