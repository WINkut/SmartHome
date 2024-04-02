const jsonwebtoken = require('jsonwebtoken')
// 创建密钥
const sercet = 'kerwin'
const JWT = {
	// 生成token  exprires 指的是密钥的过期时间 value指的是加密的内容
	generate(value, exprires) {
		return jsonwebtoken.sign(value, sercet, { expiresIn: exprires })
	},
	// 验证token
	verify(token) {
		try {
			return jsonwebtoken.verify(token, sercet)
		} catch (e) {
			//如果过时返回false
			return false
		}
	}
}
//传入内容，再10s内获取到token正常获取，超过时间后获取返回false
// const token = JWT.generate({ name: 'kerwin' }, '10s')
// console.log(JWT.verify(token));
// setTimeout(() => {
// 	console.log(JWT.verify(token));
// }, 3000)
module.exports = JWT