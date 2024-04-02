var express = require('express');
var NewsRouter = express.Router();
const NewsController = require('../../controllers/admin/NewsController.js')
// 图片上传插件 Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件。
const multer = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })

NewsRouter.post('/adminapi/news/add', upload.single("file"), NewsController.add)
NewsRouter.get('/adminapi/news/list', NewsController.getList)
NewsRouter.get('/adminapi/news/list/:id', NewsController.getList)
NewsRouter.post('/adminapi/news/list', upload.single("file"), NewsController.postList)
NewsRouter.delete('/adminapi/news/list/:id', NewsController.delList)
NewsRouter.put('/adminapi/news/publish', NewsController.publish)


module.exports = NewsRouter;