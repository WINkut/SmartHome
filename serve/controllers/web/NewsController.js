const NewsService = require('../../services/web/NewsService.js');
const JWT = require('../../util/JWT.js')

const NewsController = {

	getList: async (req, res) => {
		const result = await NewsService.getList({ _id: req.params.id });
		res.send({
			ActionType: 'OK',
			data: result
		})
	},
	getTopList: async (req, res) => {
		const result = await NewsService.getTopList({ limit: req.query.limit });
		res.send({
			ActionType: 'OK',
			data: result
		})
	},
	getCaseList: async (req, res) => {
		const result = await NewsService.getCaseList({});
		res.send({
			ActionType: 'OK',
			data: result
		})
	},
	getTeamList: async (req, res) => {
		const result = await NewsService.getTeamList({});
		res.send({
			ActionType: 'OK',
			data: result
		})
	},

}



module.exports = NewsController
