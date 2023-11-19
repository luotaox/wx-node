const express = require("express");
const MiniRouter = express.Router();
const MiniController = require("../controllers/MiniController");


// 获取声明 公告 空状态
MiniRouter.get('/mini/declare', MiniController.getDeclareInfo);
// 修改 声明 公告 空状态
MiniRouter.post('/mini/declare', MiniController.putDeclareInfo);


module.exports = MiniRouter;