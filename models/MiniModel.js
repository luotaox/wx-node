const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MiniType = {
  // 声明
  declare: String,
  // 公告
  notice: String,
  empty: String,
  show: Boolean,
  // 开学日期
  startDate: String,
  // 地图
  map: [String],
  // 校历
  calendar: [String]
}

const MiniModel = mongoose.model('course', new Schema(MiniType));

module.exports = MiniModel;