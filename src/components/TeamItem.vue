<template>
	<div class="imageBackground">
		<div class="imageShow">
			<div class="title">
				<div>智能家居 · 办公环境</div>
				<p>我们是一间以策略、创意、设计、技术、服务为核心的互联网公司</p>
			</div>
			<el-row :gutter="20">
				<el-col :span="8" v-for="(item, index) in teamList" :key="index">
					<img :src="'http://localhost:3000' + item.cover" alt="">
					<!-- <div :style="{ 'backgroundImage': 'url(' + require(`@/assets/image/team/${item.imgUrl}`) + ')' }"></div> -->
				</el-col>
			</el-row>
		</div>
	</div>
	<div class="scroll">

		<div :style="{ backgroundImage: 'url(' + require(`../assets/image/team/scorll.jpg`) + ')' }" class="scroll_img ">
			<div class="scroll_text w">
				<div>
					<span>56名</span>
					<p>技术人员</p>
				</div>
				<div>
					<span>200个</span>
					<p>成功案例</p>
				</div>
				<div>
					<span>20位</span>
					<p>合作企业</p>
				</div>
			</div>
		</div>

	</div>
	<div class="imageBackground">
		<div class="imageShow">
			<div class="title">
				<div>智能家居 · 合作伙伴</div>
				<p>云市场一直与众多优秀的第三方服务供应商合作，以更多的选择满足你业务的全面需求!</p>
			</div>
			<el-row :gutter="15">
				<el-col :span="4" v-for="(item, index) in 12" :key="index">
					<img src="../assets/image/team/huoban.png" class="huobanImg" alt="">

					<!-- <div :style="{ 'backgroundImage': 'url(' + require(`@/assets/image/team/${item.imgUrl}`) + ')' }"></div> -->
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
const teamList = ref()
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
const getTeamList = async () => {
	if (store.state.TeamList.value !== undefined) {
		teamList.value = store.state.TeamList
		return
	}
	const res = await axios.get('/webapi/news/teamlist')
	teamList.value = res.data.data
	store.commit('changeTeamList', res.data.data)
	console.log(teamList.value);
}
const data = reactive({})
onBeforeMount(() => {
	//console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
	//console.log('3.-组件挂载到页面之后执行-------onMounted')
	getTeamList()
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
.imageBackground {
	background-color: #f4f4f4 !important;
	padding-bottom: 50px;

}

.imageShow {
	width: 1000px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;

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

	.el-col {
		margin-bottom: 20px;
		width: 100%;

		div,
		img {
			display: inline-block;
			// width: 320px;
			// height: 250px;
			width: 100%;
			height: 100%;
			// background-image: center;
			transition: transform 0.3s ease;
			/* 平滑过渡效果 */

			&:hover {
				transform: scale(1.1);
				/* 鼠标悬停时放大1.2倍 */
			}
		}
	}
}

.scroll {
	height: 400px;


	.scroll_img {
		height: 100%;
		position: relative;
		overflow: hidden;
		background-repeat: no-repeat;
		background-size: cover;
		background-attachment: fixed;
		background-position: top center;

		.scroll_text {
			height: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;

			div {
				font-size: 20px;
				color: white;
				display: flex;
				flex-direction: column;
				align-items: center;

				span {
					font-size: 30px;
				}

			}
		}


	}
}

.huobanImg {
	border: 1px solid #99999c;
}
</style>