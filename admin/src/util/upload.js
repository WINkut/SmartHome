import axios from "axios"
//封装上传接口的方法
function upload(path, userForm) {
	// 使用`new FormData()`可以方便地将表单数据和文件进行封装，并通过异步请求发送到后端服务器。FormData是一个JavaScript对象，它提供了一种简单的方式来构建key/value对，这些key/value对可以作为HTTP请求体的一部分发送给服务器
	const params = new FormData()
	for (let i in userForm) {
		params.append(i, userForm[i])
	}
	return axios.post(path, params, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	}).then(res => res.data)
}

export default upload 