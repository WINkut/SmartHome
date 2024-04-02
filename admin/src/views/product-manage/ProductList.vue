<template>
  <div>
    <el-card>
      <el-page-header content="产品列表" icon="" title="产品管理"></el-page-header>
      <el-table :data="tableData">
        <el-table-column prop="title" label="产品名称" width="180" />
        <el-table-column prop="introduction" label="简要描述" width="180" />
        <el-table-column label="更新时间">
          <template #default="scope">
            {{ formatTime.getTime(scope.row.editTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button circle :icon="Edit" @click="handleEdit(scope.row)"></el-button>
            <el-popconfirm title="你确定要删除嘛？" confirmButtonText="确定" cancelButtonText="取消"
              @confirm="handleDelete(scope.row)">
              <template #reference>
                <el-button circle :icon="Delete" type="danger"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup>
import { Edit, Delete } from "@element-plus/icons-vue"
import { ref, onMounted } from "vue"
// import { getProductList_author, deleteProductList_id } from '@/api/index'
import formatTime from "@/util/formatTime"
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";

const store = useStore()
const router = useRouter()
const tableData = ref([])

onMounted(() => {
  getTableData()
})
const getTableData = async () => {
  const res = await axios.get(`/adminapi/product/list`)
  // const res = await getProductList_author(store.state.userInfo)
  console.log(res.data.data)
  tableData.value = res.data.data
}
// 删除
const handleDelete = async (item) => {
  console.log(item)
  await axios.delete(`/adminapi/product/list/${item._id}`)
  // await deleteProductList_id(item)
  ElMessage.success('删除成功！')
  getTableData()
}
// 编辑
const handleEdit = (item) => {
  router.push(`/product-manage/editproduct/${item._id}`)
}
</script>
<style lang="scss" scoped>
.el-table {
  margin-top: 50px;
  width: 100%;
  height: calc(100vh - 200px);
}

:deep(.htmlcontent) {
  img {
    width: 100%;
  }
}

::v-deep .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* 设置宽度和高度 */
}
</style>