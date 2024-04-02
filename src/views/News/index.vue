<template>
	<div class="newsCounter">
		<Background :centerTitle="news"></Background>
		<div class="search">
			<el-popover placement="bottom" title="检索结果" width="50%" :visible="visible">
				<template #reference>
					<el-input v-model="searchText" placeholder="请输入新闻关键字" :prefix-icon="Search" type="search" size="large"
						@input="visible = true" @blur="visible = false"></el-input>
				</template>
				<div v-if="searchnewsList.length">
					<div v-for="data in searchnewsList" :key="data._id" class="search-item" @click="handleChangepage(data._id)">
						{{ data.title }}
					</div>
				</div>
				<div v-else>
					<el-empty description="暂无新闻" :image-size="50"></el-empty>
				</div>
			</el-popover>
		</div>
		<div class="type">
			<div class="w">
				<span @click="selectNews(1)">最新动态</span>
				<span @click="selectNews(2)">典型案例</span>
				<span @click="selectNews(3)">通知公告</span>
			</div>
		</div>
		<div class="newsList w">
			<div class="timeNews">
				<el-timeline style="max-width: 100%">
					<el-timeline-item v-for="(item, index) in newList" :key="item._id" @click="handleChangepage(item._id)">
						<div class="time">
							<span class="nDate">
								{{ formatTime.getTime(item.editTime) }}
							</span>
							<div>
								<img :src="'http://localhost:3000' + item.cover" alt="">
							</div>
						</div>
						<div class="info">
							<h2>{{ item.title }}</h2>
							<span class="line"></span>
							<div class="author">
								<span v-if="item.category === 1">最新动态</span>
								<span v-else-if="item.category === 2">典型案例</span>
								<span v-else>通知公告</span>
								<span>阅读量：1</span>
							</div>
							<div class="neirong">
								<div v-html="item.profile">

								</div>
							</div>
							<el-button plain>查看全文</el-button>
						</div>
					</el-timeline-item>
				</el-timeline>
			</div>
		</div>
	</div>

</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, nextTick } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Background from '@/components/Background'
import { Search } from '@element-plus/icons-vue'
import axios from "axios";
import formatTime from "@/util/formatTime"
const news = ref('News')
const searchText = ref('')
const visible = ref('false')
const newList = ref()
const idnum = ref('false')





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
	getNewsList()
})
watchEffect(() => {
})
// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
	...toRefs(data)
})
const getNewsList = async () => {
	const res = await axios.get('/webapi/news/list')
	newList.value = res.data.data
	console.log(newList.value);
}
//搜索结果计算
const searchnewsList = computed(() => searchText.value ? newList.value.filter(item => item.title.includes(searchText.value)) : [])
//新闻类型选择方法
const selectNews = async (id) => {
	await getNewsList()
	newList.value = newList.value.filter(item => item.category == id)
	// nextTick(() => {
	// })
}
const handleChangepage = (id) => {
	// console.log(id)
	router.push(`/news/${id}`)
}


</script>
<style scoped lang='scss'>
.w {
	width: 1000px;
	margin: 0 auto;
}

.newsCounter {
	background-color: #eeeeee;
	padding-bottom: 30px;
}

.search {
	position: absolute;
	top: 40%;
	width: 100%;
	min-width: 1000px;
	text-align: center;

	.el-input {
		width: 50%;

	}


}

.search-item {
	height: 50px;
	line-height: 50px;
	padding-left: 20px;

	&:hover {
		background-color: #ecf5ff;
		border-radius: 20px;
		color: #409eff;
		cursor: pointer;
	}
}

.type>.w {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 90px;
	width: 100%;
	background-color: white;

	span {
		height: 70px;
		line-height: 70px;
		padding: 0 20px;
		font-size: 16px;

		&:hover {
			background-color: #ecf5ff;
			color: #4aa3ff;
			cursor: pointer;
		}
	}
}

.newsList {
	margin-top: 20px;
	background-color: white;

}

.timeNews {
	padding: 40px 10px 10px;
}

.el-timeline-item {
	height: 270px;
	// display: flex;
	// justify-content: center;
	// flex-direction: column;
	width: 100%;

	::v-deep .el-timeline-item__content {
		display: flex;
		justify-content: space-between;
		flex-direction: row;

	}

	::v-deep .el-timeline-item__tail {
		left: 30% !important;
	}

	::v-deep .el-timeline-item__node--normal {
		left: calc(29% + 5px) !important;
	}

	&:hover {


		h2 {
			color: #005beb;
		}

		.line {
			background: #005beb;
		}

		.neirong {


			div {
				color: #666666;

			}
		}
	}



	.line {
		display: block;
		width: 40px;
		height: 4px !important;
		background-color: #e5e5e5;
		margin: 10px 0 12px 0 !important;


	}

	.author {
		span {
			font-size: 14px;
		}

		span:first-child {
			margin-right: 20px;
		}
	}
}

::v-deep .el-timeline .el-timeline-item:last-child .el-timeline-item__tail {
	display: block
}

.info {
	width: 100%;

	padding-left: 30px;

	h2 {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		/* 设置宽度和高度 */
	}
}

.neirong {
	padding-right: 20px;
	width: 100%;
	height: 40px;
	margin-top: 30px;

	div {
		color: #999999;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;

	}
}

.el-button {
	padding: 20px 30px;
	margin-top: 55px;
}

::v-deep .time {
	display: flex;
	width: calc(237px + 30px);
	text-align: right;
	padding-right: 30px;
	flex-direction: column;
	// justify-content: space-between;

	span {
		display: block;
		width: 100%;
		font-size: 20px;
		font-weight: 600;
		color: #005beb;
	}

	div {
		margin: 30px 0;
		width: 237px;
		overflow: hidden;

		img {
			display: block;
			width: 100%;
			height: 150px;
			transition: transform 0.3s ease;
			/* 平滑过渡效果 */

		}

		&:hover img {
			transform: scale(1.4);
			/* 鼠标悬停时放大1.2倍 */
		}
	}


}
</style>