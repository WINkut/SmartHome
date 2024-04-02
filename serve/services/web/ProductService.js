const ProductModel = require('../../models/ProductModel.js');

const ProductService = {

	getList: async ({ limit }) => {
		return ProductModel.find({}).sort({ editTime: -1 }).limit(limit)
	},

}

module.exports = ProductService