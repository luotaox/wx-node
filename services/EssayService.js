const EssayModel = require("../models/EssayModel")
const ImgModel = require("../models/ImgModel")
const fs = require('fs')

const EssayService = {
  getList: async ({ category, is }) => {
    let isTopList = [];
    if (is) {
      isTopList = await EssayModel.find();
      if (category == 'new') {
        isTopList = await EssayModel.find().sort({ pubTime: -1 }).exec();
      } else if (category == 'hot') {
        isTopList = await EssayModel.find().sort({ viewsCount: -1 }).exec();
      } else {
        isTopList = await EssayModel.find().sort({ isTop: 1 }).exec();
      }
    } else {
      if (category == 'new') {
        // 查询满足条件且isPublish:1
        isTopList = await EssayModel.find({ isPublish: 1 }).sort({ pubTime: -1 }).exec();
      } else if (category == 'hot') {
        isTopList = await EssayModel.find({ isPublish: 1 }).sort({ viewsCount: -1 }).exec();
      } else {
        isTopList = await EssayModel.find({ isPublish: 1 }).sort({ isTop: -1 }).exec();
      }
    }
    return isTopList;
  },
  putIshot: ({ _id, isHot }) => {
    return EssayModel.updateOne({
      _id
    }, {
      isHot
    })
  },
  putIstop: ({ _id, isTop }) => {
    return EssayModel.updateOne({
      _id
    }, {
      isTop
    })
  },
  addImg: ({ img }) => {
    return ImgModel.create({
      img
    });
  },
  add: ({ title, summary, content, pubTime, cover }) => {
    return EssayModel.create({
      title,
      summary,
      content,
      pubTime,
      isHot: false,
      isTop: false,
      viewsCount: 0,
      cover,
      isPublish: 0
    })
  },
  delEssay: async ({ _id }) => {
    const data = await EssayModel.find({ _id });
    console.log(data);
    fs.unlink('public' + data[0].cover, (err) => {
      if (err) {
        console.error('删除图片失败：', err);
      } else {
        // console.log('图片删除成功');
      }
    })

    return EssayModel.deleteOne({
      _id
    })
  },
  getOneEssay: async ({ _id, isAdmin }) => {
    let result = [];
    if (isAdmin) {
      result = await EssayModel.find({
        _id
      })
    } else {
      result = await EssayModel.findOneAndUpdate({
        _id
      }, {
        $inc: { viewsCount: 1 }
      });
    }
    return result;
  },
  putOneEssay: ({ title, summary, content, pubTime, cover, _id }) => {
    if (cover) {
      return EssayModel.updateOne({
        _id
      }, {
        title,
        summary,
        content,
        pubTime,
        cover
      })
    } else {
      return EssayModel.updateOne({
        _id
      }, {
        title,
        summary,
        content,
        pubTime,
      })
    }
  },
  putIsPublish: ({ _id, isPublish }) => {
    return EssayModel.updateOne({
      _id
    }, {
      isPublish
    })
  },
  search: ({ query }) => {
    const regex = new RegExp(query, "i");
    return EssayModel.find({
      $or: [
        { title: { $regex: new RegExp(regex, 'i') } },
        { summary: { $regex: new RegExp(regex, 'i') } }
      ]

    })
  }
}

module.exports = EssayService;