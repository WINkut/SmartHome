<template>

  <Header></Header>
  <router-view />
  <Footer></Footer>
  <el-backtop :visibility-height="100" />

</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

</script>
<style lang="scss">
@import './assets/scss/reset.scss';

* {
  padding: 0;
  margin: 0;
}

/* 修改横向滚动条的宽度和高度 */
::-webkit-scrollbar {
  height: 8px;
  /* 修改高度，对于横向滚动条 */
  width: auto;
  /* 宽度设置为自动 */
}


/* 修改垂直滚动条 */
::-webkit-scrollbar {
  width: 8px;
  /* 修改宽度 */
}

/* 修改滚动条轨道背景色 */
::-webkit-scrollbar-track,
::-webkit-scrollbar-track-horizontal {
  background-color: #f1f1f1;
}

/* 修改滚动条滑块颜色 */
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-thumb-horizontal {
  background-color: #999;
}

/* 修改滚动条滑块悬停时的颜色 */
::-webkit-scrollbar-thumb:hover,
::-webkit-scrollbar-thumb-horizontal {
  background-color: #999;
}

/* 修改滚动条滑块的圆角 */
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-thumb-horizontal {
  border-radius: 5px;
}
</style>
