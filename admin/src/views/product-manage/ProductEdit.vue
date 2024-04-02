<template>
	<div>
		<el-page-header content="编辑产品" @back="handleBack" title="产品管理"></el-page-header>
		<el-form ref="productFormRef" :model="productForm" :rules="productFormRules" label-width="120px"
			class="demo-ruleForm" status-icon>
			<el-form-item label="产品名称:" prop="title">
				<el-input v-model="productForm.title" />
			</el-form-item>
			<el-form-item label="产品简要描述:" prop="introduction">
				<el-input v-model="productForm.introduction" type="textarea" />
			</el-form-item>
			<el-form-item label="产品详细描述:" prop="detail">
				<el-input v-model="productForm.detail" type="textarea" />
			</el-form-item>
			<el-form-item label="产品图片:" prop="cover">
				<Upload :avatar="productForm.cover" @fileChange="handleChange"></Upload>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm">更新产品</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import Upload from "@/components/upload/Upload.vue"
import upload from "@/util/upload"
import { useRouter, useRoute } from "vue-router"
import { useStore } from "vuex";
// import { getProductList_id } from '@/api/index'
import axios from 'axios';

const store = useStore()
const router = useRouter()
const route = useRoute()
const productFormRef = ref()
const productForm = reactive({
	title: "",
	introduction: "",
	detail: "",
	cover: "",
	author: store.state.userInfo.username,
	file: null
})
const productFormRules = reactive({
	title: [
		{ required: true, message: '请输入名字', trigger: 'blur' },
	],
	introduction: [
		{ required: true, message: '请输入简要描述', trigger: 'blur' },
	],
	detail: [
		{ required: true, message: '请输入详细描述', trigger: 'blur' },
	],
	cover: [
		{ required: true, message: '请上传产品图片', trigger: 'blur' },
	]
})
// 每次选择完图片之后的回调
const handleChange = (file) => {
	// console.log(file.raw)
	productForm.cover = URL.createObjectURL(file)
	productForm.file = file
}
const submitForm = () => {
	productFormRef.value.validate(async (valid) => {
		if (valid) {
			// 提交数据到后端
			// console.log(userForm)
			await upload("/adminapi/product/list", productForm)
			router.back()
		}
	})
}
const handleBack = () => {
	router.back()
}
onMounted(() => {
	getData()
})
const getData = async () => {
	const res = await axios.get(`/adminapi/product/list/${route.params.id}`)
	// const res = await getProductList_id(route.params)
	console.log(res.data.data)
	Object.assign(productForm, res.data.data[0])
}
</script>
<style lang="scss" scoped>
.demo-ruleForm {
	margin-top: 50px;
}
</style>