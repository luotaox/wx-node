const FeedModel = require("../models/FeedModel");

const FeedService = {
  getList: () => {
    return FeedModel.find();
  },
  putList: ({ _id, settle, note }) => {
    return FeedModel.updateOne({
      _id
    }, {
      settle,
      note
    })
  },
  add: ({ contact, comment, feedbackName }) => {
    return FeedModel.create({
      contact,
      comment,
      settle: 0,
      note: '',
      feedbackName,
      createTime: new Date()
    })
  },
  delList: ({ _id }) => {
    return FeedModel.deleteOne({
      _id
    })
  }
}

module.exports = FeedService;