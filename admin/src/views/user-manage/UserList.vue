<template>
  <div>
    <el-card>
      <el-page-header content="用户列表" icon="" title="用户管理"></el-page-header>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column label="头像" width="180">
          <template #default="scope">
            <div v-if="scope.row.avatar">
              <el-avatar :size="50" :src="'http://localhost:3000' + scope.row.avatar"></el-avatar>
            </div>
            <div v-else>
              <el-avatar :size="50"
                :src="'http://118.126.97.155:8888/img/songListPic/19053436998325469.jpg'"></el-avatar>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template #default="scope">
            <el-tag class="ml-2" v-if="scope.row.role === 1" type="danger">管理员</el-tag>
            <el-tag class="ml-2" v-else type="success">普通用户</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-popconfirm title="你确定要删除嘛？" confirmButtonText="确定" cancelButtonText="取消"
              @confirm="handleDelete(scope.row)">
              <template #reference>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog v-model="dialogVisible" title="编辑用户" width="50%">
      <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" label-width="80px" class="demo-ruleForm"
        status-icon>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userForm.password" type="password" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role" class="m-2" placeholder="Select" style="width:100%">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="个人简介" prop="introduction">
          <el-input v-model="userForm.introduction" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEditConfirm()">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { onMounted, ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
// import { getUserList_id, putUserList_id, getUserList, deleteUserList_id } from '@/api/index'
import axios from 'axios';

const vue_app_api = ref(process.env.VUE_APP_API)
let dialogVisible = ref(false)
const userFormRef = ref()
let userForm = reactive({
  username: "",
  password: "",
  role: 2, // 1 管理员  2 编辑
  introduction: ""
})
const userFormRules = reactive({
  username: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  role: [
    { required: true, message: '请选择权限', trigger: 'blur' },
  ],
  introduction: [
    { required: true, message: '请输入介绍', trigger: 'blur' },
  ]
})
const options = [
  {
    label: "管理员",
    value: 1
  },
  {
    label: "普通用户",
    value: 2
  }
]
const tableData = ref([])
onMounted(() => {
  getTableData()
})
const getTableData = async () => {
  const res = await axios.get("/adminapi/user/list")
  // const res = await getUserList()
  console.log(res.data)
  tableData.value = res.data.data
}
// 编辑
const handleEdit = async (data) => {
  console.log(data)
  const res = await axios.get(`/adminapi/user/list/${data._id}`)
  // const res = await getUserList_id(data)
  // console.log(res.data.data, '1111111111111111111111')
  //  // userForm使用ref声名的时候可以通过该方法进行赋值
  // userForm.value = res.data.data[0]
  //  userForm 使用reactive声名的时候使用Object.assign进行赋值
  Object.assign(userForm, res.data.data[0])
  dialogVisible.value = true
}
// 编辑确认
const handleEditConfirm = () => {
  userFormRef.value.validate(async valid => {
    if (valid) {
      // console.log(userForm)
      // 更新后端
      // let res = await putUserList_id(userForm)
      let res = await axios.put(`/adminapi/user/list/${userForm._id}`, userForm)
      console.log(res)
      if (res.data.ActionType === 'OK') {
        ElMessage.success('编辑成功！')
        // dialog隐藏
        dialogVisible.value = false
        // 获取table数据
        getTableData()
      } else {
        ElMessage.error(res.data.message)
      }
    }
  })
}
const handleDelete = async (data) => {
  console.log(data)
  const res = await axios.delete(`/adminapi/user/list/${data._id}`)
  // const res = await deleteUserList_id(data)
  getTableData()
}
</script>
<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
}
</style>