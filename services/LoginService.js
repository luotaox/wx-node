const axios = require("axios");
const fs = require('fs');
const cheerio = require("cheerio");
const { courseParser } = require('../uilts/Week');
const TermModel = require("../models/TermModel")

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
  scores: async ({ token, term }) => {
    const res = await axios.post('http://jwxt.sanyau.edu.cn/syxy_jsxsd/kscj/cjcx_list', {
      xsfs: 'all',
      kksj: term
    },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // 设置Content-Type
          'Cookie': token
        }
      });

    const $ = cheerio.load(res.data);
    const table = $('table#dataList');

    // 创建一个空数组用于存储表格数据
    const data = [];

    // 获取表格的标题行
    const headers = [];
    table.find('tr:first-child th').each((index, element) => {
      const headerText = $(element).text().trim().replace(/[\r\n\s]+/g, '');
      headers.push(headerText);
    });

    // 遍历表格的每一行（跳过标题行）
    table.find('tr:not(:first-child)').each((index, element) => {
      const row = $(element);
      const rowData = {};

      // 遍历行中的每一列
      row.find('td').each((index, element) => {
        const cellData = $(element).text().trim().replace(/[\r\n\s]+/g, '');
        rowData[headers[index]] = cellData;
      });

      // 将每行数据添加到数组中
      data.push(rowData);
    });

    // 将表格数据转换为JSON字符串
    const jsonData = JSON.stringify(data);
    const List = JSON.parse(jsonData);
    // 打印JSON数据
    return List;
  },
  syllabus: async ({ token }) => {
    const res = await axios.post('http://jwxt.sanyau.edu.cn/syxy_jsxsd/xskb/xskb_list.do', {
      // xnxq01id: '2023-2024-1',
      xnxq01id: '2023-2024-2',
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
  },
  termlist: async () => {
    return TermModel.find();
  },
  majorlist: async ({ skyx, sknj, token }) => {
    const res = await axios.get('http://jwxt.sanyau.edu.cn/syxy_jsxsd/kbcx/getZyByAjax', {
      params: {
        skyx,
        sknj
      },
      headers: {
        'Content-Type': 'text/html;charset=utf-8',
        'Cookie': token
      }
    })
    return res.data;
  },
  allCourse: async ({ xnxqh, skyx, sknj, skzy, skbj, token }) => {
    const res = await axios.post('http://jwxt.sanyau.edu.cn/syxy_jsxsd/kbcx/kbxx_xzb_ifr', {
      xnxqh,
      skyx,
      sknj,
      skzy,
      skbj
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': token
      }
    })
    const $ = cheerio.load(res.data);

    const html = $('#timetable');
    // html.css('transform', 'scale(0.8)');
    const table = html.prop('outerHTML');
    return table;

  },
  // 考试安排 
  examSchedule: async ({ term, token }) => {
    const res = await axios.post('http://jwxt.sanyau.edu.cn/syxy_jsxsd/xsks/xsksap_list', {
      xnxqid: term
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': token
      }
    })
    const $ = cheerio.load(res.data);
    // 选择表格行
    const rows = $('#dataList tr');
    // 初始化结果数组
    const result = [];
    // 遍历表格行（跳过标题行）
    rows.each((index, element) => {
      if (index === 0) return; // 跳过表头
      const cols = $(element).find('td');
      if (cols.length === 0) return; // 跳过没有数据的行
      // 提取所需数据
      const course = {
        examCampus: $(cols[2]).text().trim(),
        examSession: $(cols[3]).text().trim(),
        examCode: $(cols[4]).text().trim(),
        courseName: $(cols[5]).text().trim(),
        teacher: $(cols[6]).text().trim(),
        examTime: $(cols[7]).text().trim(),
        examRoom: $(cols[8]).text().trim()
      };

      result.push(course);
    });
    return result;
  }
}

module.exports = LoginService;