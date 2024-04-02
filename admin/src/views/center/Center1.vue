<template>
	<div>
		<el-page-header content="个人中心" icon="" title="企业门户网站管理系统"></el-page-header>
		<el-row :gutter="20" class="el-row">
			<el-col :span="8">
				<el-card class="box-card">
					<el-avatar :size="100" :src="avatarUrl"></el-avatar>
					<h3>{{ store.state.userInfo.username }}</h3>
					<h5>{{ store.state.userInfo.role === 1 ? '管理员' : '编辑' }}</h5>
				</el-card>
			</el-col>
			<el-col :span="16">
				<el-card>
					<template #header>
						<div class="card-header">
							<span>个人信息</span>
						</div>
					</template>
					<el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="120px" class="demo-ruleForm"
						status-icon>
						<el-form-item label="用户名" prop="username">
							<el-input v-model="userForm.username" />
						</el-form-item>
						<el-form-item label="性别" prop="gender">
							<el-select v-model="userForm.gender" class="m-2" placeholder="Select" style="width:100%">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</el-form-item>
						<el-form-item label="个人简介" prop="introduction">
							<el-input v-model="userForm.introduction" type="textarea" />
						</el-form-item>
						<el-form-item label="头像" prop="avatar">
							<Upload :avatar='userForm.avatar' @fileChange="handleChange"></Upload>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="submitForm">更新</el-button>
						</el-form-item>
					</el-form>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>
<script setup>
import { useStore } from "vuex";
import { computed, ref, reactive } from 'vue'
import { ElMessage } from "element-plus";

import axios from "axios";
import upload from "@/util/upload"
import Upload from "@/components/upload/Upload"

const store = useStore()
const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar : `http://118.126.97.155:8888/img/songListPic/19053436998325469.jpg`)


const { username, gender, introduction, avatar } = store.state.userInfo
const userFormRef = ref()
const userForm = reactive({
	username,
	gender,
	introduction,
	avatar,
	file: '',
})
const userFormRules = reactive({
	username: [
		{ required: true, message: '请输入昵称', trigger: 'blur' },
	],
	gender: [
		{ required: true, message: '请选择性别', trigger: 'blur' },
	],
	introduction: [
		{ required: true, message: '请输入介绍', trigger: 'blur' },
	],
	avatar: [
		{ required: true, message: '请上传头像', trigger: 'blur' },
	],
})
// 性别选择
const options = [
	{
		label: '保密',
		value: 0
	},
	{
		label: '男',
		value: 1
	},
	{
		label: '女',
		value: 2
	},
]

// 每次选择完图片之后的回调
const handleChange = (file) => {
	// console.log(file);
	// 创建图片的url对象
	userForm.avatar = URL.createObjectURL(file)
	// 保存图片信息
	userForm.file = file


}

// 更新提交
// const submitForm = () => {
// 	userFormRef.value.validate(async (valid) => {
// 			if (valid) {
// 					// console.log('submit', userForm)

// 					let res = await upload("/adminapi/user/upload", userForm)
// 					if (res.ActionType === "OK") {
// 							store.commit("changeUserInfo", res.data)
// 							ElMessage.success('更新成功')
// 					}
// 			}
// 	})
// }
//提交按钮
const submitForm = () => {
	userFormRef.value.validate(async valid => {
		if (valid) {
			console.log('submit', userForm);
			// 使用`new FormData()`可以方便地将表单数据和文件进行封装，并通过异步请求发送到后端服务器。FormData是一个JavaScript对象，它提供了一种简单的方式来构建key/value对，这些key/value对可以作为HTTP请求体的一部分发送给服务器
			const res = await upload('/adminapi/user/upload', userForm)
			if (res.ActionType == 'OK') {
				store.commit('changeUserInfo', res.data)
				console.log(store.state.userInfo);
				ElMessage.success('更新成功')
			}


		}
	})
}
</script>
<style lang="scss" scoped>
.el-row {
	margin-top: 20px;

	.box-card {
		text-align: center;
	}
}



.el-button {
	margin-left: 10%
}
</style>