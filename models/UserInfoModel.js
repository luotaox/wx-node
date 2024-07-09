const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserInfoType = {
  xueyuan: String,
  userClass: String,
  createTime: Date,
}

const UserInfoModel = mongoose.model('userinfo', new Schema(UserInfoType));

module.exports = UserInfoModel