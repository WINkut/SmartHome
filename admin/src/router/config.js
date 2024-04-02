import Home from '../views/home/Home.vue'
import Center from '../views/center/Center1.vue'
import UserAdd from '../views/user-manage/UserAdd.vue'
import UserList from '../views/user-manage/UserList.vue'
import NewsAdd from '../views/news-manage/NewsAdd.vue'
import NewsList from '../views/news-manage/NewsList.vue'
import ProductAdd from '../views/product-manage/ProductAdd.vue'
import ProductList from '../views/product-manage/ProductList.vue'
import NotFound from '../views/notfound/NotFound.vue'
import NewsEdit from '@/views/news-manage/NewsEdit.vue'
import ProductEdit from '@/views/product-manage/ProductEdit.vue'

//添加需要动态添加的路由页面

const routes = [
  {
    path: '/index',
    component: Home,
  },
  {
    path: '/center',
    component: Center,
  },
  {
    path: '/user-manage/useradd',
    component: UserAdd,
    requireAdmin: true
  },
  {
    path: '/user-manage/userlist',
    component: UserList,
    requireAdmin: true
  },
  {
    path: '/news-manage/newslist',
    component: NewsList,

  },
  {
    path: '/news-manage/newsadd',
    component: NewsAdd,
  }, {
    path: '/news-manage/newsedit/:id',
    component: NewsEdit,
  },
  {
    path: '/product-manage/productadd',
    component: ProductAdd,
  },
  {
    path: '/product-manage/productlist',
    component: ProductList,

  },
  {
    path: '/product-manage/editproduct/:id',
    component: ProductEdit,
  },
  {
    path: '/',
    redirect: '/index'
  },
  {
    // 匹配没有的路由地址，如果没有跳转到404页面
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default routes
