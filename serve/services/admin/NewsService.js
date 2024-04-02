const NewsModel = require('../../models/NewsModel.js');

const NewsService = {
	add: async ({ title, content, profile, category, isPublish, cover, editTime }) => {
		return NewsModel.create({
			title, content, category, profile, isPublish, cover, editTime
		})
	},
	getList: async ({ _id }) => {
		return _id ? NewsModel.find({ _id }).sort({ editTime: -1 }) : NewsModel.find({}).sort({ editTime: -1 })
	},
	delList: async ({ _id }) => {
		return NewsModel.deleteOne({ _id })

	},
	postList: async ({ _id, title, content, profile, category, isPublish, cover, editTime }) => {
		if (cover) {
			return NewsModel.updateOne({ _id }, {
				title, content, profile, category, isPublish, cover, editTime
			})
		} else {
			return NewsModel.updateOne({ _id }, {
				title, content, profile, category, isPublish, editTime
			})
		}

	},
	publish: async ({ _id, isPublish, editTime }) => {
		return NewsModel.updateOne(
			{
				_id
			},
			{
				isPublish,
				editTime
			})
	}
}


module.exports = NewsService