const FeedService = require('../services/FeedService');

const FeedController = {
  getList: async (req, res) => {
    const result = await FeedService.getList();
    res.status(201).send({
      code: 0,
      ActionType: "OK",
      data: result
    })
  },
  putList: async (req, res) => {
    const { settle, _id, note } = req.body;
    const result = await FeedService.putList({
      _id,
      settle: Number(settle),
      note
    });
    res.status(201).send({
      ActionType: "OK",
    })
  },
  add: async (req, res) => {
    const { contact, comment, feedbackName } = req.body;
    const result = await FeedService.add({
      contact,
      comment,
      feedbackName
    });
    res.status(201).send({
      code: 0,
      ActionType: "OK",
    })
  },
  delList: async (req, res) => {
    const result = await FeedService.delList({
      _id: req.params.id
    });
    res.status(201).send({
      ActionType: "OK",
    })
  }
}

module.exports = FeedController;