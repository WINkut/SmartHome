<template>
  <div>
    <div class="center">
      <span>个人信息</span>
    </div>
    <el-row :gutter="20" class="row-userinfo">
      <el-col :span="8">
        <el-card class="box-card" style="min-width:250px">
          <el-avatar :size="100" :src="avatarUrl" />
          <h3>{{ store.state.userInfo.username }}</h3>
          <h4>{{ store.state.userInfo.role == 1 ? '管理员' : '普通用户' }}</h4>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card style="max-width: 95%;min-width: 500px">
          <template #header>
            <div class="card-header">
              <span>个人信息</span>
            </div>
          </template>
          <el-form ref="userFormRef" style="max-width: 600px" :model="userForm" :rules="userRules" label-width="auto"
            class="demo-ruleForm" status-icon>
            <el-form-item label="用户名：" prop="username">
              <el-input v-model="userForm.username" />
            </el-form-item>
            <el-form-item label="性别：" prop="gender">
              <el-radio-group v-model="userForm.gender">
                <el-radio :value="1">男</el-radio>
                <el-radio :value="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="角色：">
              <el-input disabled placeholder="Please input" />
            </el-form-item>
            <el-form-item label="个人介绍：" prop="introduction">
              <el-input v-model="userForm.introduction" type="textarea" />
            </el-form-item>

            <el-form-item label="头像：" prop="avatar">
              <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                :show-file-list="false" :auto-upload="false" :on-change="handleChange">
                <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus />
                </el-icon>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(userFormRef)">更新</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  watchEffect,
  computed,
} from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import axios from 'axios';
/**
 * 仓库
 */
const store = useStore()
/**
 * 路由对象
 */
const route = useRoute()
/**
 * 路由实例
 */
const router = useRouter()
//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const data = reactive({})

const avatarUrl = computed(() =>
  store.state.userInfo.avatar
    ? store.state.userInfo.avatar
    : `https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png`
)

const { username, gender, introduction, avatar, role } = store.state.userInfo
const userFormRef = ref()
const userForm = reactive({
  username,
  gender,
  introduction,
  avatar,
  role,
  file: null,
})
const userRules = reactive({
  username: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  gender: [{ required: true, message: '性选择性别', trigger: 'blur' }],
  introduction: [
    { required: true, message: '请输入个人介绍', trigger: 'blur' },
  ],
  avatar: [{ required: true, message: '请上传照片', trigger: 'blur' }],
})
// const userFormRole = computed(() => userForm.role == 1 ? '管理员' : '普通用户'
// )
// 每次选择图片后的回调方法
const handleChange = (file) => {
  // console.log(file);
  // 创建图片的url对象
  userForm.avatar = URL.createObjectURL(file.raw)
  // 保存图片信息
  userForm.file = file.raw

}
//提交按钮
const submitForm = () => {
  userFormRef.value.validate(valid => {
    if (valid) {
      console.log('submit', userForm);
      // 使用`new FormData()`可以方便地将表单数据和文件进行封装，并通过异步请求发送到后端服务器。FormData是一个JavaScript对象，它提供了一种简单的方式来构建key/value对，这些key/value对可以作为HTTP请求体的一部分发送给服务器
      const params = new FormData()
      for (let i in userForm) {
        params.append(i, userForm[i])
      }
      console.log(params);
      axios.post('/adminapi/user/upload', params, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        console.log(res.data);
      })


    }
  })
}
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => { })
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data),
})
</script>
<style scoped lang="scss">
.center {
  font-size: 20px;
  font-weight: 600;
}

.row-userinfo {
  margin-top: 30px;

  .box-card {
    text-align: center;

    h3 {
      margin-top: 10px;
    }
  }
}

::v-deep .avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

::v-deep .avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

::v-deep.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
}

.el-button {
  margin-left: 10%
}
</style>
