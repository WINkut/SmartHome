<template>
	<Background :centerTitle="team"></Background>
	<div class="w">
		<div class="view_contents">
			<h1>开启互联网+ 从我们开始</h1>
			<div>
				<p>互联网指的是是网络与网络之间所串连成的庞大网络，这些网络以一组通用的协议相连，形成逻辑上的单一巨大国际网络。</p>
				<p>互联网始于1969年美国的阿帕网。这种将计算机网络互相联接在一起的方法可称作“网络互联”，在这基础上发展出覆盖全世界的全球性互联网络称互联网，即是互相连接一起的网络结构。</p>
				<p>互联网并不等同万维网，万维网只是一建基于超文本相互链接而成的全球性系统，且是互联网所能提供的服务其中之一。</p>
			</div>
		</div>
	</div>
	<TeamItem></TeamItem>



</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Background from '@/components/Background'
import TeamItem from '@/components/TeamItem'
const team = ref('Team')

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

.view_contents {
	height: 360px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	text-align: center;


	h1 {
		font-size: 32px;
		font-weight: 400;
		color: #000;
		line-height: 120px;
	}

	p {
		font-size: 14px;
		height: 70px;
		color: #999;
	}
}
</style>