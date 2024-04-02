<template>
	<div class="Footer">
		<div class="w footerCounter">
			<div class="smartInfo">
				<div class="imgInfo">
					<img src="../assets/logo.png" alt="">
					<span>智能家居</span>
				</div>
				<div class="text">
					始终遵循“每走一步，首先想到的是顾客”的服务理念，通过科学的人力资源管理机制和学习型组织的建立，培养了一支具有丰富专...
				</div>
				<div class="time">
					<p>周一至周五：8:00—20:00</p>
					<p>周六、周日：9:00—18:00</p>
				</div>
			</div>
			<div class="product">
				<div class="productTitle">智能产品</div>
				<div class="type">
					<p>智能系统</p>
					<p>家居辅助</p>
					<p>家电控制</p>
					<p>家居安全</p>
					<p>家居娱乐</p>
					<p>成功案例</p>
				</div>
			</div>
			<div class="contact">
				<div class="contactTitle">联系我们</div>
				<div class="adder">
					<p>地址：苏州市xx区xxx大道 </p>
					<p>电话：400-000-0000 </p>
					<p>手机：138000XXX00 </p>
					<p>邮箱：admin@yourdomain.com </p>
					<p>网址：http://www.XXXXX.com</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
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
.Footer {
	height: 350px;
	background-color: #333333;
	color: #999999;
}

.w {
	width: 1000px;
	margin: 0 auto;
}

.footerCounter {
	padding-top: 40px;
	display: flex;
	justify-content: space-between;

	.smartInfo {
		.imgInfo {
			display: flex;
			align-items: center;
		}

		img {
			display: inline-block;
			width: 50px;
			height: 50px;

		}

		span {
			display: inline-block;
			font-size: 23px;
			color: white;
			margin-left: 15px;

		}
	}

	.text {
		width: 400px;
		margin-top: 20px;
		line-height: 2;
		font-size: 16px;
	}

	.time {
		margin-top: 40px;
		font-size: 14px;
		line-height: 2;
	}
}

.product,
.contact {
	display: flex;
	flex-direction: column;
	justify-content: space-between;


	.productTitle,
	.contactTitle {
		font-size: 20px;
		color: white;
	}

	.type,
	.adder {
		margin-top: 20px;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		font-size: 16px;
	}
}
</style>