var express = require('express');
var ProductRouter = express.Router();
const ProductController = require('../../controllers/admin/ProductController.js')
// 图片上传插件 Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件。
const multer = require('multer')
const upload = multer({ dest: 'public/productuploads/' })

ProductRouter.post('/adminapi/product/add', upload.single("file"), ProductController.add)
ProductRouter.get('/adminapi/product/list', ProductController.getList)
ProductRouter.get('/adminapi/product/list/:id', ProductController.getList)
ProductRouter.post('/adminapi/product/list', upload.single("file"), ProductController.postList)
ProductRouter.delete('/adminapi/product/list/:id', ProductController.delList)



module.exports = ProductRouter;