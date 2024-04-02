const NewsService = require('../../services/admin/NewsService.js');
const JWT = require('../../util/JWT.js')

const NewsController = {
	add: async (req, res) => {
		console.log(req.body);
		const cover = req.file ? `/newsuploads/${req.file.filename}` : ''
		const { title, content, profile, category, isPublish, author } = req.body
		await NewsService.add({
			title,
			content,
			profile,
			category: Number(category),
			isPublish: Number(isPublish),
			author,
			cover,
			editTime: new Date()
		});
		res.send({
			ActionType: 'OK',
		})
	},
	getList: async (req, res) => {
		const result = await NewsService.getList({ _id: req.params.id });
		res.send({
			ActionType: 'OK',
			data: result
		})
	},
	delList: async (req, res) => {
		console.log(req.params.id);
		await NewsService.delList({ _id: req.params.id });
		res.send({
			ActionType: 'OK',
		})
	},
	postList: async (req, res) => {
		const cover = req.file ? `/newsuploads/${req.file.filename}` : ''
		const { _id, title, content, profile, category, isPublish, author } = req.body
		await NewsService.postList({
			_id,
			title,
			content,
			profile,
			category: Number(category),
			isPublish: Number(isPublish),
			author,
			cover,
			editTime: new Date()
		});
		res.send({
			ActionType: 'OK',
		})
	},
	publish: async (req, res) => {
		await NewsService.publish({
			...req.body,
			editTime: new Date()
		});
		res.send({
			ActionType: 'OK',
		})
	}
}



module.exports = NewsController
