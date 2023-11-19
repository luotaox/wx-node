const EssayService = require("../services/EssayService");

const EssayController = {
  getList: async (req, res) => {
    const { category, is } = req.query;
    const result = await EssayService.getList({
      category,
      is
    });

    res.status(201).send({
      ActiveType: "OK",
      data: result
    })
  },
  putIshot: async (req, res) => {
    const { isHot, _id } = req.body;
    const result = await EssayService.putIshot({
      _id,
      isHot
    })

    res.status(201).send({
      ActiveType: "OK",
    })
  },
  putIstop: async (req, res) => {
    const { isTop, _id } = req.body;
    const result = await EssayService.putIstop({
      _id,
      isTop
    })

    res.status(201).send({
      ActiveType: "OK",
    })
  },
  addImg: async (req, res) => {
    const img = req.file ? `/essayimg/${req.file.filename}` : '';
    const result = await EssayService.addImg({
      img
    });
    console.log(result);
    res.status(201).send({
      ActiveType: "OK",
      data: result
    })
  },
  add: async (req, res) => {
    const cover = req.file ? `/essayimg/${req.file.filename}` : '';
    const { title, summary, content } = req.body;
    const result = await EssayService.add({
      title,
      summary,
      content,
      pubTime: new Date(),
      cover
    });

    res.status(201).send({
      ActiveType: "OK",
      message: "添加成功"
    })
  },
  delEssay: async (req, res) => {
    const result = await EssayService.delEssay({
      _id: req.params.id
    });

    res.status(201).send({
      ActiveType: "OK",
      message: '删除成功'
    })
  },
  getOneEssay: async (req, res) => {
    const result = await EssayService.getOneEssay({
      _id: req.params.id,
      isAdmin: req.query.isAdmin
    });
    res.status(201).send({
      ActiveType: "OK",
      data: result
    })
  },
  putOneEssay: async (req, res) => {
    const cover = req.file ? `/essayimg/${req.file.filename}` : '';
    const { title, summary, content } = req.body;
    const result = await EssayService.putOneEssay({
      _id: req.params.id,
      title,
      summary,
      content,
      pubTime: new Date(),
      cover
    });
    res.status(201).send({
      ActiveType: "OK",
      data: result
    })
  },
  putIsPublish: async (req, res) => {
    const { isPublish, _id } = req.body;
    const result = await EssayService.putIsPublish({
      _id,
      isPublish
    })

    res.status(201).send({
      ActiveType: "OK",
    })
  },
  search: async (req, res) => {
    const { query } = req.body;
    console.log(query);
    const result = await EssayService.search({
      query
    });
    res.status(201).send({
      ActiveType: "OK",
      data: result
    })
  },
}

module.exports = EssayController;