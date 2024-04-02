import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Particles from "@tsparticles/vue3";

import { loadFull } from "tsparticles";
// 导入axios拦截器文件
import '@/util/axios.config'

createApp(App)
	.use(Particles, {
		init: async engine => {
			await loadFull(engine); // you can load the full tsParticles library from "tsparticles" if you need it
			// await loadSlim(engine); // or you can load the slim version from "tsparticles-slim" if don't need Shapes or Animations
		},
	})
	.use(store)
	.use(router)
	.mount('#app')

