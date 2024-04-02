const NewsModel = require('../../models/NewsModel.js');

const NewsService = {

	getList: async ({ _id }) => {
		// sort 排序方法 -1指从最近的开始排序
		return _id ? NewsModel.find({ _id, isPublish: 1 }) : NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 })
	},
	getTopList: async ({ limit }) => {
		// sort 排序方法 -1指从最近的开始排序
		return NewsModel.find({ isPublish: 1 }).sort({ editTime: -1 }).limit(limit)
	},
	getCaseList: async ({ }) => {
		// sort 排序方法 -1指从最近的开始排序
		return NewsModel.find({ isPublish: 1, category: 2 }).sort({ editTime: -1 })
	},
	getTeamList: async ({ }) => {
		// sort 排序方法 -1指从最近的开始排序
		return NewsModel.find({ isPublish: 1, category: 3 }).sort({ editTime: -1 })
	},

}


module.exports = NewsService