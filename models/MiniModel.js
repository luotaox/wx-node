const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MiniType = {

  // 首页轮播
  swiperList: [{
    cate: String,
    url: String
  }],
  // 首页menu
  homeMenu: [{
    title: String,
    icon: String,
    path: String
  }],
  // 开学日期
  startDate: String,
  // 没课图片和文字
  empty: {
    text: String,
    img: String
  },
  // 轮播图切换时间
  swiperTime: Number,
  // 公告显示与隐藏
  noticeShow: Boolean,
  avatar: String,
  notice: String,
  problem: String,
  aboutus: String,
  // 登录提示
  loginTips: [{
    title: String
  }]
}

const MiniModel = mongoose.model('course', new Schema(MiniType));

module.exports = MiniModel;