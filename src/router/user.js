export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/user/login.vue'),
    meta: {
      title: '登录',
      // auth: true,
      // keepAlive: true
    }
  }
]