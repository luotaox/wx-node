const express = require("express");
const FeedRouter = express.Router();
const FeedController = require("../controllers/FeedController");

FeedRouter.get('/mini/feedback', FeedController.getList);
FeedRouter.put('/mini/feedback', FeedController.putList);
FeedRouter.delete('/mini/feedback/:id', FeedController.delList);
FeedRouter.post('/feedback', FeedController.add);


module.exports = FeedRouter;
