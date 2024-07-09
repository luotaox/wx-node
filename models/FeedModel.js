const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedType = {
  // 联系方式
  contact: String,
  // 描述问题
  comment: String,
  // 状态
  settle: Number,
  createTime: Date,
  note: String,
  feedbackName: String
}

const FeedModel = mongoose.model('message', new Schema(FeedType));

module.exports = FeedModel;