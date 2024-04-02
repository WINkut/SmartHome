const UserModel = require('../../models/UserModel.js');


const UserService = {
	login: async ({ username, password }) => {
		return UserModel.find({
			username,
			password
		})
	},
	upload: async ({ _id, username, introduction, gender, avatar }) => {
		if (avatar) {
			return UserModel.updateOne({
				_id
			}, {
				username, introduction, gender, avatar
			})
		} else {
			return UserModel.updateOne({
				_id
			}, {
				username, introduction, gender
			})
		}
	},
	add: async ({ username, password, introduction, gender, avatar, role }) => {
		return UserModel.create({
			username, password, introduction, gender, avatar, role
		})
	},
	getList: async ({ id }) => {
		// 传入空，就是取出所有的数据，查询单个的传入id即可
		return id ? UserModel.find({ _id: id }, ["username", "introduction", "gender", "password", "role", "avatar"]) : UserModel.find({}, ["username", "introduction", "gender", "password", "role", "avatar"])
	},
	delList: async ({ _id }) => {
		return UserModel.deleteOne({ _id })
	},
	putList: async (body) => {
		return UserModel.updateOne({ _id: body._id }, body)
	}



}


module.exports = UserService