const UserService = require('../../services/admin/UserService.js');
const JWT = require('../../util/JWT.js')


const UserController = {
	login: async (req, res) => {
		//req.body
		// 返回的是数组
		const result = await UserService.login(req.body)
		console.log(result, 'result-------------');
		if (result.length === 0) {
			res.send({
				code: '-1',
				error: '用户名或密码不匹配'
			})
		} else {
			// //生成token 1d 代指1天
			const token = JWT.generate({
				_id: result[0]._id,
				username: result[0].username
			}, '1d')
			res.header('Authorization', token)
			res.send({
				ActionType: 'OK',
				data: {
					username: result[0].username,
					gender: result[0].gender ? result[0].gender : 0,//性别
					introduction: result[0].introduction,//简介
					avatar: result[0].avatar,//头像
					role: result[0].role,//权限 管理员1，编辑2
				},
			})
		}

	},
	upload: async (req, res) => {
		console.log(req.body, req.file, 'file----------');
		const { username, introduction, gender } = req.body
		const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''
		// 调用service 模块更新 数据
		const token = req.headers["authorization"].split(" ")[1]
		var payload = JWT.verify(token)
		console.log(payload._id);
		await UserService.upload({ _id: payload._id, username, introduction, gender: Number(gender), avatar })
		if (avatar) {
			res.send({
				ActionType: 'OK',
				data: {
					username, introduction, gender: Number(gender), avatar
				}
			})
		} else {
			res.send({
				ActionType: 'OK',
				data: {
					username, introduction, gender: Number(gender)
				}
			})
		}
	},
	add: async (req, res) => {

		const { username, password, introduction, gender, role } = req.body
		const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''
		// 调用service 模块更新 数据
		await UserService.add({ username, password, introduction, gender: Number(gender), avatar, role: Number(role) })

		res.send({
			ActionType: 'OK',
			// data: {
			// 	username, introduction, gender: Number(gender), avatar
			// }
		})

	},
	getList: async (req, res) => {
		const result = await UserService.getList(req.params)
		res.send({
			ActionType: 'OK',
			data: result
		})
	},
	putList: async (req, res) => {
		const result = await UserService.putList(req.body)
		res.send({
			ActionType: 'OK',
			data: result
		})
	},
	delList: async (req, res) => {
		console.log(req.params.id);
		const result = await UserService.delList({ _id: req.params.id })
		res.send({
			ActionType: 'OK',
		})
	}
}


module.exports = UserController