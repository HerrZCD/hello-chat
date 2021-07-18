import Vue from 'vue'

import Router from 'vue-router'
import login from '../pages/login/index.vue'
import chat from '../pages/chat/index.vue'
import register from '../pages/register/index.vue'


Vue.use(Router)
const routes = [
  {
    path: '/',
    redirect: '/login',
    component: login,
    meta: {
      title: 'Dome1'
    }
  },
  {
    path: '/login',
    component: login,
    meta: {
      title: 'Dome1'
    }
  },
  {
    path: '/chat',
    component: chat,
    meta: {
      title: 'Dome1'
    }
  },
  {
    path: '/register',
    component: register,
    meta: {
      title: '用户注册'
    }
  }
]
export default new Router({routes})
