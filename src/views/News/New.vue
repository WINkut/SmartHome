<template>
	<div class="news_content">
		<el-row :gutter="20">
			<el-col :span="17" :offset="1">
				<div>
					<h2 style="text-align:center">{{ currentNews.title }}</h2>
					<div class="time">
						{{ whichTime(currentNews.editTime) }}
					</div>
					<span class="category" v-if="currentNews.category === 1">最新动态</span>
					<span class="category" v-else-if="currentNews.category === 2">典型案例</span>
					<span class="category" v-else>通知公告</span>
					<span class="readNum">阅读量：187</span>
					<el-divider>
						<el-icon><star-filled /></el-icon>
					</el-divider>
					<div class="profile">
						<span>
							{{ currentNews.profile }}
						</span>
					</div>
					<div class="content" v-html="currentNews.content">
					</div>
				</div>
			</el-col>
			<el-col :span="4" :offset="1" :pull="1">
				<el-card class="box-card">
					<template #header>
						<div class="card-header">
							<span style="font-size: 16px;font-weight:bold;">最近新闻</span>
						</div>
					</template>
					<div v-for="item in topNews" :key="item._id" style="padding:14px;" @click="handleChange(item._id)">
						<span>{{ item.title }}</span>
						<div class="bottom">
							<time class="time">{{ whichTime(item.editTime) }}</time>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>

	</div>
</template>
<script setup>
import { StarFilled } from '@element-plus/icons-vue'
import { onMounted, ref, watchEffect, onBeforeUnmount } from 'vue'
// import { getNewsList_limit, getNewsList_id } from "@/api/index";
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import moment from 'moment'

moment.locale("zh-cn")
const route = useRoute()
const router = useRouter()
const currentNews = ref({})
const topNews = ref([])

// onMounted 换成 watchEffect
const stop = watchEffect(async () => {
	// watchEffect 函数内部的值只要发生变化就会重新执行一边
	// onMounted 从详情页面跳转到详情页面，不涉及页面的销毁所以不会执行内部的方法
	// console.log('111')
	// watchEffect 比 onBeforeUnmount 先执行 需要return避免报错
	if (!route.params.id) return
	const res = await axios.get(`/webapi/news/list/${route.params.id}`)
	const res2 = await axios.get(`/webapi/news/toplist?limit=4`)
	console.log(res);
	console.log(res2);
	currentNews.value = res.data.data[0]
	topNews.value = res2.data.data

})
// 卸载前清除副作用函数
onBeforeUnmount(() => {
	// console.log('222')
	// console.log('onBeforeUnmount')
	stop()
})
// onMounted(() => {
// 	getNewsId()
// })
const handleChange = (id) => {
	// console.log(id)
	router.push(`/news/${id}`)

}
const whichTime = time => {
	return moment(time).format("lll")
}
// const getNewsId = async () => {
// 	const res = await axios.get(`/webapi/news/list/${route.params.id}`)
// 	const res2 = await axios.get(`/webapi/news/toplist?limit=4`)
// 	console.log(res);
// 	console.log(res2);
// 	currentNews.value = res.data.data[0]
// 	topNews.value = res2.data.data
// }

</script>
<style lang="scss" scoped>
.news_content {
	min-height: 600px
}

.el-row {
	margin-top: 30px;
}

h2 {
	font-size: 24px
}

.time {
	font-size: 13px;
	color: gray;
	margin-top: 10px;
}

.profile {
	border: 1px solid #999;
	line-height: 50px;
	text-align: center;

	span {
		padding: 0 20px;
		display: block;
		width: 100%;
		font-size: 16px;
	}
}

.content {
	margin: 40px 0;
	font-size: 20px;
}

.category {
	display: inline-block;
	margin: 20px 10px 0 0;
}
</style>