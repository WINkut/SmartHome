const ProductService = require('../../services/web/ProductService.js');
const JWT = require('../../util/JWT.js')

const ProductController = {

	getList: async (req, res) => {
		const result = await ProductService.getList({ limit: req.query.limit });
		res.send({
			ActionType: 'OK',
			data: result
		})
	},
	
}

module.exports = ProductController
