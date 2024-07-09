const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TermType = {
  // 学期
  termlist: [{
    termName: String,
    termValue: String
  }],
  // 年级
  grades: [{
    name: Number,
    value: Number,
  }],
  // 学院
  academyList: [{
    name: String,
    value: String
  }]
}

const TermModel = mongoose.model('term', new Schema(TermType));

module.exports = TermModel