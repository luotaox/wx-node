const MiniModel = require("../models/MiniModel");

const MiniService = {
  getDeclareInfo: () => {
    return MiniModel.find();
  },
  putDeclareInfo: ({ declare, notice, empty, show, startDate }) => {
    return MiniModel.updateOne({
      declare,
      notice,
      empty,
      show,
      startDate
    });
  }
}

module.exports = MiniService;