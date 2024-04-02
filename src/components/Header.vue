<template>
	<div class=" header">
		<!-- <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true"
			:mode="horizontal">
			<el-menu-item index="/">首页</el-menu-item>

			<el-menu-item index="/product">全部商品</el-menu-item>
		</el-menu> -->
		<div class="w headerBox">
			<div class="flex-grow ">
				<img style="width: 50px;height: 50px;" src="../assets/logo.png" alt="Home logo" />
				<h3 class="title">智能家居</h3>
			</div>
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" router="true">
				<el-menu-item index="/">首页</el-menu-item>
				<el-menu-item index="/product">全部商品</el-menu-item>
				<el-menu-item index="/case">成功案例</el-menu-item>
				<el-menu-item index="/news">咨询动态</el-menu-item>
				<el-menu-item index="/team">关于我们</el-menu-item>
			</el-menu>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
const activeIndex = ref('/')
// const handleSelect = (key: String, keyPath: string[]) => {
// 	console.log(key, keyPath)
// }
/**
* 仓库
*/
const store = useStore();
/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();
//console.log('1-开始创建组件-setup')
/**
* 数据部分
*/
const data = reactive({})
onBeforeMount(() => {
	//console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
	//console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {
	// console.log('路由地址变化了:', route.path);
	activeIndex.value = route.path
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
	...toRefs(data)
})

</script>
<style scoped lang='scss'>
.header {

	border-bottom: 1px solid var(--el-menu-border-color);

	.headerBox {
		display: flex;
		justify-content: space-between;
	}
}

.flex-grow {
	display: flex;
	align-items: center;

	h3 {
		font-size: 20px
	}
}

.title {
	margin-left: 15px;
}

.w {
	width: 1000px;
	margin: 0 auto;
}

.el-menu--horizontal.el-menu {
	border-bottom: 0px;
}
</style>