<template>
  <div class="MainBox">
    <el-container>
      <SideMenu></SideMenu>
      <el-container direction="vertical">
        <TopHeaders></TopHeaders>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import TopHeaders from '@/components/MainBox/TopHeader.vue'
import SideMenu from '@/components/MainBox/SideMenu.vue'

</script>
<style scoped lang="scss">
.el-main {
  overflow: auto;
  height: calc(100vh - 64px)
}
</style>
