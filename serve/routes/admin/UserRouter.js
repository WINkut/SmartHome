var express = require('express');
var UserRouter = express.Router();
const UserController = require('../../controllers/admin/UserController.js')
// 图片上传插件 Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件。
const multer = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })

/* GET users listing. */
// UserRouter.post('adminapi/user/login', function () { })
UserRouter.post('/adminapi/user/login', UserController.login)
UserRouter.post('/adminapi/user/upload', upload.single("file"), UserController.upload)
UserRouter.post('/adminapi/user/add', upload.single("file"), UserController.add)
//实现用户列表的等删改查
UserRouter.get('/adminapi/user/list', UserController.getList)
UserRouter.get('/adminapi/user/list/:id', UserController.getList)
UserRouter.put('/adminapi/user/list/:id', UserController.putList)
UserRouter.delete('/adminapi/user/list/:id', UserController.delList)


module.exports = UserRouter;