<template>
	<div class="TopHeader">
		<div class="left">
			<el-icon @click="change">
				<Menu />
			</el-icon>
			<span>网站后台管理系统</span>
		</div>
		<div class="right">
			<span>{{ store.state.userInfo.username }} | {{ store.state.userInfo.role == 1 ? '管理员' : '普通用户' }}</span>
			<el-dropdown>
				<span class="el-dropdown-link">

					<el-icon :size="30">
						<user />
					</el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item @click="handleCenter">个人中心</el-dropdown-item>
						<el-dropdown-item @click="handleLogin">退出登录</el-dropdown-item>

					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>

	</div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { Menu, User } from '@element-plus/icons-vue'
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
const change = () => {
	store.commit('changeCollapse')
}
const handleCenter = () => {
	router.push('/center')
}
const handleLogin = () => {
	localStorage.removeItem('token')
	// 清空用户信息
	store.commit('clearUserInfo')
	router.push('/login')
}



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
.TopHeader {
	background-color: #2d3a4b;
	height: 64px;
	width: 100%;
	line-height: 64px;
	color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;

}

.left,
.right {
	display: flex;
}



.left i {
	margin: auto 20px;
	cursor: pointer;
}

.el-dropdown {
	margin: auto 20px;
	color: white;
	cursor: pointer;


}

//去除dropdown鼠标经过显示的边框
:deep(.el-tooltip__trigger:focus-visible) {
	outline: none;
}
</style>