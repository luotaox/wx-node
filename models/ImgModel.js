const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImgType = {
  img: String
}

const ImgModel = mongoose.model('img', new Schema(ImgType));

module.exports = ImgModel