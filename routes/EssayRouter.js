const express = require('express');
const EssayRouter = express.Router();

const EssayController = require("../controllers/EssayController");
// 图片上传包
const multer = require('multer');
const upload = multer({ dest: 'public/essayimg/' });

// 获取文章列表
EssayRouter.get("/mini/essay/list", EssayController.getList);
// 更新文章置顶热门
EssayRouter.put("/mini/essay/ishot", EssayController.putIshot);
EssayRouter.put("/mini/essay/istop", EssayController.putIstop);
// 上传图片
EssayRouter.post("/mini/essay/img", upload.single('file'), EssayController.addImg);
// 添加文章
EssayRouter.post("/mini/essay/add", upload.single("file"), EssayController.add);
// 删除文章
EssayRouter.delete("/mini/essay/:id", EssayController.delEssay);
// 获取单个文章
EssayRouter.get("/mini/essay/list/:id", EssayController.getOneEssay);
// 更新文章
EssayRouter.post("/mini/essay/list/:id", upload.single("file"), EssayController.putOneEssay);
// 修改发布状态
EssayRouter.put("/mini/essay/ispublish", EssayController.putIsPublish);
// 搜索文章 标题 && 简要
EssayRouter.post("/mini/essay/search", EssayController.search);


module.exports = EssayRouter;