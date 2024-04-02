<template>
  <div>
    <el-page-header content="添加产品" icon="" title="产品管理"></el-page-header>
    <el-form ref="productFormRef" :model="productForm" :rules="productFormRules" label-width="140px"
      class="demo-ruleForm" status-icon>
      <el-form-item label="产品名称：" prop="title">
        <el-input v-model="productForm.title" />
      </el-form-item>
      <el-form-item label="产品简要描述：" prop="introduction">
        <el-input v-model="productForm.introduction" type="textarea" />
      </el-form-item>
      <el-form-item label="产品详细描述：" prop="detail">
        <el-input v-model="productForm.detail" type="textarea" />
      </el-form-item>
      <el-form-item label="产品图片：" prop="cover">
        <Upload :avatar="productForm.cover" @fileChange="handleChange"></Upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">添加产品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import Upload from "@/components/upload/Upload.vue"
import upload from "@/util/upload"
import { useRouter } from "vue-router"
import { useStore } from "vuex";

const store = useStore()
const router = useRouter()
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
      console.log(productForm)
      let res = await upload('/adminapi/product/add', productForm)
      if (res.ActionType === 'OK') {
        ElMessage.success('添加成功！')
        router.push('/product-manage/productlist')
      } else {
        ElMessage.error(res.data.message)
      }
    }
  })
}
</script>
<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 50px;
}
</style>