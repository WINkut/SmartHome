const ProductService = require('../../services/admin/ProductService.js');
const JWT = require('../../util/JWT.js')

const ProductController = {
	add: async (req, res) => {
		console.log(req.body);
		const cover = req.file ? `/productuploads/${req.file.filename}` : ''
		const { title, introduction, detail, author } = req.body
		await ProductService.add({
			title,
			introduction,
			detail,
			author,
			cover,
			editTime: new Date()
		});
		res.send({
			ActionType: 'OK',
		})
	},
	getList: async (req, res) => {
		const result = await ProductService.getList({ _id: req.params.id });
		res.send({
			ActionType: 'OK',
			data: result
		})
	},
	delList: async (req, res) => {
		console.log(req.params.id);
		await ProductService.delList({ _id: req.params.id });
		res.send({
			ActionType: 'OK',
		})
	},
	postList: async (req, res) => {
		const cover = req.file ? `/productuploads/${req.file.filename}` : ''
		const { _id, title, introduction, detail, author } = req.body
		await ProductService.postList({
			_id,
			title,
			introduction,
			detail,
			author,
			cover,
			editTime: new Date()
		});
		res.send({
			ActionType: 'OK',
		})
	},
}

module.exports = ProductController
