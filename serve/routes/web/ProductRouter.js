var express = require('express');
var ProductRouter = express.Router();
const ProductController = require('../../controllers/web/ProductController.js')




ProductRouter.get('/webapi/product/list', ProductController.getList)
ProductRouter.get('/webapi/product/list/:id', ProductController.getList)




module.exports = ProductRouter;