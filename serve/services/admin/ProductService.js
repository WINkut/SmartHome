const ProductModel = require('../../models/ProductModel.js');

const ProductService = {
	add: async ({ title,
		introduction,
		detail,
		author,
		cover,
		editTime }) => {
		return ProductModel.create({
			title,
			introduction,
			detail,
			author,
			cover,
			editTime
		})

	},
	getList: async ({ _id }) => {
		return _id ? ProductModel.find({ _id }) : ProductModel.find({})
	},
	delList: async ({ _id }) => {
		return ProductModel.deleteOne({ _id })
	},
	postList: async ({ _id, title, introduction, detail, author, cover, editTime }) => {
		if (cover) {
			return ProductModel.updateOne({ _id }, {
				title, introduction, detail, author, cover, editTime
			})
		} else {
			return ProductModel.updateOne({ _id }, {
				title, introduction, detail, author, editTime
			})
		}

	},
}

module.exports = ProductService