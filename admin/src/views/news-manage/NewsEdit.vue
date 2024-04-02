<template>
	<div>

		<el-page-header content="编辑新闻" title="新闻管理" @back="handleBack"></el-page-header>
		<el-form ref="newsFormRef" :model="newsForm" :rules="newsFormRules" label-width="80px" class="demo-ruleForm"
			status-icon>
			<el-form-item label="标题" prop="title">
				<el-input v-model="newsForm.title" />
			</el-form-item>
			<el-form-item label="简介：" prop="profile">
				<el-input v-model="newsForm.profile" type="textarea" :rows="5" />
			</el-form-item>
			<el-form-item label="内容" prop="content">
				<editor @event="handleChange" :content="newsForm.content" v-if="newsForm.content !== null"></editor>
				<!-- <editor @event="handleChange" :content="newsForm.content"></editor> -->
			</el-form-item>
			<el-form-item label="类别" prop="category">
				<el-select v-model="newsForm.category" class="m-2" placeholder="Select" style="width:100%">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
			</el-form-item>
			<el-form-item label="封面" prop="cover">
				<Upload :avatar="newsForm.cover" @fileChange="handleCoverChange"></Upload>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm">更新新闻</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue"
import editor from "@/components/editor/Editor"
import Upload from "@/components/upload/Upload.vue"
import upload from "@/util/upload"
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
// import { getNewsList_id } from '@/api/index'

const router = useRouter()
const route = useRoute()
const newsFormRef = ref()
const newsForm = reactive({
	title: "",
	content: null,
	profile: '',
	category: 1, // 1最新动态 2典型案例 3通知公告
	cover: "",
	file: null,
	isPublish: 0 // 0未发布 1已发布
})
const newsFormRules = reactive({
	title: [
		{
			required: true, message: "请输入标题", trigger: "blur"
		}
	],
	profile: [
		{
			required: true, message: "请输入简介", trigger: "blur"
		}
	],
	content: [
		{
			required: true, message: "请输入内容", trigger: "blur"
		}
	],
	category: [
		{
			required: true, message: "请选择分类", trigger: "blur"
		}
	],
	cover: [
		{
			required: true, message: "请上传图片", trigger: "blur"
		}
	]
})
const handleCoverChange = file => {
	console.log(file);
	// console.log(URL.createObjectURL(file));
	newsForm.cover = URL.createObjectURL(file)
	newsForm.file = file
}
// 每次editor内容改变回调
const handleChange = (data) => {
	// console.log(data)
	newsForm.content = data
}
// 新闻类别
const options = [
	{
		label: "最新动态",
		value: 1
	},
	{
		label: "典型案例",
		value: 2
	},
	{
		label: "通知公告",
		value: 3
	},
]
const submitForm = () => {
	newsFormRef.value.validate(async valid => {
		if (valid) {
			// console.log(newsForm)
			// 后台通信
			// await upload("/adminapi/news/add", newsForm)
			// router.push(`/news-manage/newslist`)
			await upload("/adminapi/news/list", newsForm)
			ElMessage.success('更新成功！')
			router.back()
		}
	})
}
const handleBack = () => {
	// 返回上一个页面
	router.back()
}
onMounted(async () => {
	console.log(route.params.id)
	const res = await axios.get(`/adminapi/news/list/${route.params.id}`)
	// const res = await getNewsList_id(route.params)
	console.log(res.data.data)
	Object.assign(newsForm, res.data.data[0])
})
</script>
<style lang="scss" scoped>
.demo-ruleForm {
	margin-top: 50px;
}
</style>