<template>
  <div>
    <div class="home">
      <span>首页</span>
    </div>
    <el-card style=" max-width: 100%">
      <el-row>
        <el-col :span="4">
          <el-avatar :size="60" :src="avatarUrl" />
        </el-col>
        <el-col :span="20">
          <h3 style="line-height: 60px;text-align: center;">欢迎 {{ store.state.userInfo.username }} 回来,{{ welcomeText }}
          </h3>
        </el-col>
      </el-row>
    </el-card>
    <el-card style=" max-width: 100%">
      <template #header>
        <div class="card-header">
          <span>热门产品</span>
        </div>
      </template>
      <el-carousel :interval="4000" type="card" height="400px">
        <el-carousel-item v-for="item in loopList" :key="item._id">
          <div class="carousel_img" :style="{ backgroundImage: `url(http://localhost:3000${item.cover})` }">
            <h3 text="2xl" justify="center">{{ item.title }}</h3>
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-card>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import { useStore } from 'vuex';
import axios from 'axios';
const loopList = ref([])
const store = useStore()
// computed 计算属性
const avatarUrl = computed(() => store.state.userInfo.avatar ? 'http://localhost:3000' + store.state.userInfo.avatar : `http://118.126.97.155:8888/img/songListPic/19053436998325469.jpg`)

const welcomeText = computed(() => new Date().getHours() < 12 ? '要开心每一天哦！' : '喝杯咖啡提提神！')

onMounted(() => {
  getData()
})
const getData = async () => {
  const res = await axios.get(`/adminapi/product/list`)
  // const res = await getProductList_author(store.state.userInfo)
  console.log(res.data.data)
  loopList.value = res.data.data
}
</script>
<style scoped lang="less">
.home {

  font-size: 20px;
  font-weight: 600;
}

.el-card {
  margin-top: 40px;
}

::v-deep .carousel_img {
  background-color: #9e9e9e;
  background-position: 50% 50%;
  /* 水平垂直居中 */
  // background-size: contain;
  background-size: 100% 100%;
  /* 宽度 200px, 高度 150px */
  /* 覆盖整个元素 */
  background-repeat: no-repeat;
  /* 防止背景图片重复 */


  h3 {
    color: white;
    opacity: 0.75;
    line-height: 400px;
    margin: 0;
    text-align: center;
  }
}
</style>
