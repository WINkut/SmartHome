<template>
	<div class="w case">
		<el-row :gutter="20">
			<el-col :span="8" v-for="(item, index) in caseList" :key="item._id">
				<el-card style="max-width: 480px" shadow="hover" @click="handleChangepage(item._id)">
					<img :src="'http://localhost:3000' + item.cover" alt="">
					<span>{{ item.title }}</span>
					<p>{{ item.profile }}</p>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const caseList = ref()
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
const getCaseList = async () => {
	if (store.state.CaseList.value !== undefined) {
		caseList.value = store.state.CaseList
		return
	}
	const res = await axios.get('/webapi/news/caselist')
	caseList.value = res.data.data
	store.commit('changeNewListInfo', res.data.data)
	console.log(caseList.value);
}
const handleChangepage = (id) => {
	// console.log(id)
	router.push(`/news/${id}`)
}
const data = reactive({})
onBeforeMount(() => {
	//console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
	//console.log('3.-组件挂载到页面之后执行-------onMounted')
	getCaseList()
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
.w {
	width: 1000px;
	margin: 0 auto;
}

.case {
	margin-top: 30px;
	margin-bottom: 30px;
}

.el-card {
	--el-card-border-color: none;
	margin-bottom: 20px;

	&:hover {
		transform: scale(1.1);
		/* 鼠标悬停时放大1.2倍 */
	}

	img {
		width: 100%;
		height: 100%;
		transition: transform 0.3s ease;

		/* 平滑过渡效果 */

	}

	span {
		display: inline-block;
		padding: 10px 0 0 0;
		font-size: 16px;
	}

	p {
		margin-top: 5px;
		color: #999;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		/* 设置宽度和高度 */
	}
}
</style>