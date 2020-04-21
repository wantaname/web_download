import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import Home from '../components/home/home.vue'
import wenku from '../components/download/wenku'
import account from '../components/account/account.vue'
import login from '../components/account/login'
import jifen from '../components/account/jifen'
import csdn from '../components/download/csdn'
import qq from '../components/account/qq'
import feedback from '../components/account/feedback'

/**
 * 重写路由的push方法
 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/wenku',
    children: [
      { path: '/wenku', component: wenku },
  
      {
        path: '/account', component: account, children: [
          { path: '/jifen', component: jifen },
          { path: '/qq', component: qq },
          { path: '/feedback', component: feedback }
        ],
        redirect: '/jifen'
      },
      { path: '/csdn', component: csdn },

      // {path:'/administrators',component:administrators},
      // {path:'/lists',component:lists},
      // {path:'/access',component:access},
      // 测试用

    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})



// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    window.localStorage.clear()
    return next()
  } else {
    return next()
  }
})
export default router
