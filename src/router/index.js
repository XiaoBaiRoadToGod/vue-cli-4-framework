import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
// 自动注册路由
const routerContext = require.context('./', true, /\.js$/)
routerContext.keys().forEach(route => {
  console.log(route)
  // 如果是根目录的 index.js 不处理
  if(route.startsWith('./index')) {
    return 
  }
  const routerModule = routerContext(route)
  console.log(routerModule)
  /***
   * 兼容import export 和 require module.export 两种规范 
   */
  routes = routes.concat(routerModule.default || routerModule)
})

console.log(routes)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
