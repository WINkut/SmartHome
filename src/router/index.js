import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Home/index.vue'

import NProgress from "nprogress"
import "nprogress/nprogress.css"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/News/index.vue')
  }, {
    path: '/news/:id',
    name: 'new',
    component: () => import('../views/News/New.vue')
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('../views/Product/index.vue')
  },
  {
    path: '/case',
    name: 'case',
    component: () => import('../views/Case/index.vue')
  },
  {
    path: '/team',
    name: 'team',
    component: () => import('../views/Team/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 路由开始前
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
// 路由结束后
router.afterEach((to, from, next) => {
  NProgress.done()
  // next()
})
// 在路由守卫中处理页面刷新的情况
router.beforeEach((to, from, next) => {
  if (from.name === null) {
    next('/'); // 如果从非Vue页面刷新，重定向到首页
  } else {
    next(); // 否则，正常导航
  }
});

export default router
