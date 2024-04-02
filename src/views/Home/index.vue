<template>
	<div class="container">
		<el-carousel height="calc(100vh - 60px)">
			<el-carousel-item v-for="item in imgUrl" :key="1">
				<!-- <div :style="{
				backgroundImage: `url(${require('../assets/image/product.jpeg')})`
			}"></div> -->
				<div :style="{ 'backgroundImage': 'url(' + require(`@/assets/image/home/${item.imgUrl}`) + ')' }"></div>
				<div class="center">
					<h4>智能家居 · 开启智能生活新篇章</h4>
					<div>
						智能家居是以住宅为平台，利用综合布线技术、网络通信技术、安全防范技术、自动控制技术、音视频技术将家居生活有关的设施集成，构建高效的住宅设施与家庭日程事务的管理系统，提升家居安全性、便利性、舒适性、艺术性，并实现环保节能的居住环境。
					</div>
				</div>
			</el-carousel-item>
		</el-carousel>
		<div class="title w">
			<div>智能家居 · 成功案例</div>
			<p>科技创造未来•中国智能家居新标准！智能生活立方系统控制软件！界面新颖时尚</p>
		</div>
		<CaseItem></CaseItem>
		<TeamItem></TeamItem>

	</div>

</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import CaseItem from '@/components/CaseItem'
import TeamItem from '@/components/TeamItem'

const imgUrl = ref([
	{
		name: 'product',
		imgUrl: 'image1.jpeg'
	},
	{
		name: 'product',
		imgUrl: 'image2.jpeg'
	},
	{
		name: 'product',
		imgUrl: 'image3.jpeg'
	},
	{
		name: 'product',
		imgUrl: 'team1.jpg'
	},
	{
		name: 'product',
		imgUrl: 'team2.jpg'
	},
	{
		name: 'product',
		imgUrl: 'team3.jpg'
	},
	{
		name: 'product',
		imgUrl: 'team4.jpg'
	},
	{
		name: 'product',
		imgUrl: 'team5.jpg'
	},
])
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

.el-carousel div {
	width: 100%;
	height: 100%;
	background-size: cover;
	background-position: center 50%;
}

.container {
	position: relative;

	.center {
		position: absolute;
		left: 50%;
		top: 40%;
		transform: translate(-50%, -50%);
		height: 100px;
		line-height: 60px;
		// font-size: 50px;
		color: #fff;
		text-align: center;
		display: flex;
		align-items: center;
		flex-direction: column;

		h4 {
			font-size: 50px
		}

		div {
			width: 80%;
			font-size: 18px;
			white-space: inherit;
			/* 保持文本在一行内显示 */
			text-align: center;
		}
	}
}

.title {
	display: flex;
	justify-content: center;
	flex-direction: column;
	height: 160px;
	width: 720px;
	text-align: center;


	div {
		font-size: 24px;
		color: #333333;
	}

	p {
		font-size: 14px;
		color: #999999;
	}
}
</style>