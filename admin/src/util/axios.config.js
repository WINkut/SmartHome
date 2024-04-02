
import axios from "axios";
// Add a request interceptor
// 添加一个拦截器
// 请求之前的拦截
axios.interceptors.request.use(function (config) {
	// Do something before request is sent
	// 再请求先需要将存储的token取出来传给后端
	const token = localStorage.getItem('token');
	config.headers.Authorization = `Bearer ${token}`
	return config;
}, function (error) {
	// Do something with request error
	return Promise.reject(error);
});

// Add a response interceptor
// 请求响应后的拦截
axios.interceptors.response.use(function (response) {
	// Any status code that lie within the range of 2xx cause this function to trigger
	// Do something with response data
	// console.log(response.headers);
	const { authorization } = response.headers;
	// 判断authorization 是否存在，存在则向localStorage存储token
	authorization && localStorage.setItem('token', authorization)
	return response;
}, function (error) {
	// Any status codes that falls outside the range of 2xx cause this function to trigger
	// Do something with response error
	// 获取token过期返回401，路由直接跳转到登陆页面
	const { status } = error.response
	if (status === 401) {
		// 删除之前存的token值
		localStorage.removeItem('token')
		window.location.href = '#/login'
	}
	return Promise.reject(error);
});