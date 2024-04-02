<template>
	<el-aside :width="$store.state.isCollapse ? '64px' : '200px'">
		<el-menu :collapse="$store.state.isCollapse" :collapse-transition="false" :router="true"
			:default-active="route.fullPath">
			<el-menu-item index="/index">
				<el-icon><home-filled /></el-icon>
				<span>首页</span>
			</el-menu-item>
			<el-menu-item index="/center">
				<el-icon>
					<avatar />
				</el-icon>
				<span>个人中心</span>
			</el-menu-item>

			<el-sub-menu index="/user-manage" v-admin>
				<template #title>
					<el-icon>
						<user-filled />
					</el-icon>
					<span>用户管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/user-manage/useradd">添加用户</el-menu-item>
					<el-menu-item index="/user-manage/userlist">用户列表</el-menu-item>
				</el-menu-item-group>
			</el-sub-menu>
			<el-sub-menu index="/news-manage">
				<template #title>
					<el-icon>
						<message-box />
					</el-icon>
					<span>新闻管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/news-manage/newsadd">添加新闻</el-menu-item>
					<el-menu-item index="/news-manage/newslist">新闻列表</el-menu-item>
				</el-menu-item-group>
			</el-sub-menu>
			<el-sub-menu index="/product-manage">
				<template #title>
					<el-icon>
						<reading />
					</el-icon>
					<span>产品管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/product-manage/productadd">添加产品</el-menu-item>
					<el-menu-item index="/product-manage/productlist">产品列表</el-menu-item>
				</el-menu-item-group>
			</el-sub-menu>
		</el-menu>
	</el-aside>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { HomeFilled, Avatar, UserFilled, MessageBox, Reading, Pointer } from '@element-plus/icons-vue'

/**
* 仓库
*/
const store = useStore();
/**
* 路由对象
*/
const route = useRoute();
const vAdmin = {
	mounted(el) {
		// console.log(el);
		if (store.state.userInfo.role !== 1) {
			el.parentNode.removeChild(el)
		}
	},
}

//显示当前页面路径
// console.log(route.fullPath);
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
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
	...toRefs(data)
})

</script>
<style scoped lang='scss'>
.el-aside {
	height: 100vh;
	border-right: 1px solid #ccc;
	// 取消横向滚动条显示
	overflow-x: hidden;
}

.el-menu {
	border-right: 0px;
}

::v-deep .el-menu-item-group__title {
	padding: 0
}
</style>