const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EssayType = {
  // 内容
  content: String,
  // 观看量
  viewsCount: Number,
  // 发布时间
  pubTime: Date,
  // 概括
  summary: String,
  // 文章置顶
  isTop: Boolean,
  // 文章热门
  isHot: Boolean,
  title: String,
  cover: String,
  // 是否发布
  isPublish: Number
}

const EssayModel = mongoose.model('essay', new Schema(EssayType));

module.exports = EssayModel;