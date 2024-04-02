<template>
	<div id="myeditor">

	</div>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, defineEmits, defineProps } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import E from "wangeditor"

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
// 定义子穿父方法名称
const emit = defineEmits(['event']);
const props = defineProps({
	content: String
})
//console.log('1-开始创建组件-setup')
/**
* 数据部分
*/
const data = reactive({})
onBeforeMount(() => {
	//console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
	const editor = new E("#myeditor")
	editor.create()
	// 设置内容初始值  如果 props.content 为空时undefined 如果有值执行后面的
	props.content && editor.txt.html(props.content)
	// 配置 onchange 回调函数
	editor.config.onchange = function (newHtml) {
		// console.log("change 之后最新的 html", newHtml);
		// 子穿父
		emit('event', newHtml)
	};

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
<style scoped lang='less'></style>