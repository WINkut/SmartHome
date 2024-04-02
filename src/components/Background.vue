<template>
	<div class="container">
		<el-carousel height="calc(50vh - 59px)">
			<el-carousel-item v-for="item in imgUrl" :key="1">
				<!-- <div :style="{
				backgroundImage: `url(${require('../assets/image/product.jpeg')})`
			}"></div> -->
				<div :style="{ 'backgroundImage': 'url(' + require(`@/assets/image/${item.imgUrl}`) + ')' }"></div>
				<h3 class="center" text="2xl">{{ props.centerTitle }}</h3>
			</el-carousel-item>
		</el-carousel>
	</div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, defineProps } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
const imgUrl = ref([
	{
		name: 'product',
		imgUrl: 'product.jpeg'
	},
	{
		name: 'product1',
		imgUrl: 'product1.jpeg'
	}
])
const props = defineProps({
	centerTitle: String
})
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
		top: 50%;
		transform: translate(-50%, -50%);
		height: 100px;
		line-height: 100px;
		font-size: 60px;
		color: #fff;
		text-align: center;
	}
}
</style>