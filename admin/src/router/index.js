import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import RoutesConfig from '@/router/config.js'
import store from '@/store'
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/mainbox',
    name: 'mainbox',
    component: () => import('@/views/MainBox.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})



//路由拦截
//每次路由跳转之前都会执行这个函数，next才可以跳转
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    //如果授权 next（）
    //如果没有受授权，重定向到login页面
    if (!localStorage.getItem('token')) {
      next({
        path: '/login',
      })
    } else {
      //如果第一次创建路由需要根据这个值来判断，如果是第一次添加动态路由，并跳转到指定页面中
      if (!store.state.isGetterRouter) {
        // 删除所有嵌套路由
        router.removeRoute("mainbox")

        ConfigRouter()
        next({
          path: to.fullPath
        })
      } else {
        next()
      }


    }

  }
})



//动态添加路由
//动态将home页面添加到mainbox页面中
// router.addRoute('mainbox', {
//   path: '/index',
//   component: Home,
// })
const ConfigRouter = () => {
  if (!router.hasRoute("mainbox")) {
    router.addRoute({
      path: "/mainbox",
      name: "mainbox",
      component: () => import('@/views/MainBox.vue'),
    })
  }
  RoutesConfig.forEach((item) => {
    checkPermission(item) && router.addRoute('mainbox', item)
  })
  //第一次执行结束后改变isGetterRouter的值
  store.commit('changeGetterRoute', true)
}
const checkPermission = item => {
  if (item.requireAdmin) {
    return store.state.userInfo.role === 1
  }
  return true
}

export default router
