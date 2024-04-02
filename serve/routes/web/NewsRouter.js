var express = require('express');
var NewsRouter = express.Router();
const NewsController = require('../../controllers/web/NewsController.js')
// 图片上传插件 Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件。


NewsRouter.get('/webapi/news/list', NewsController.getList)
NewsRouter.get('/webapi/news/list/:id', NewsController.getList)
NewsRouter.get('/webapi/news/toplist', NewsController.getTopList)
NewsRouter.get('/webapi/news/caselist', NewsController.getCaseList)
NewsRouter.get('/webapi/news/teamlist', NewsController.getTeamList)


module.exports = NewsRouter;