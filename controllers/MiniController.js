const MiniService = require('../services/MiniService');

const MiniController = {
  getDeclareInfo: async (req, res) => {
    const result = await MiniService.getDeclareInfo();

    res.status(201).send({
      code: 0,
      ActionType: "OK",
      data: result
    })
  },

  putDeclareInfo: async (req, res) => {
    const { declare, notice, empty, show, startDate } = req.body;
    const result = await MiniService.putDeclareInfo({
      declare,
      notice,
      empty,
      show,
      startDate
    })
    res.status(201).send({
      ActionType: "OK",
      data: result
    })
  }
}

module.exports = MiniController;