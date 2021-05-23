import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue';

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('../views/login.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    hidden: true,
    component: () => import('../views/notFound.vue')
  }
]

export const asyncRoutes = [
  {
    path: '/',
    name: 'home',
    redirect: '/main',
    component: Home,
    meta: {
      title: "home",
      icon: "el-icon-s-home"
    },
    children: [
      {
        path: 'main',
        name: 'main',
        component: () => import('../views/main.vue'),
        meta: { title: 'main', icon: 'el-icon-s-platform' }
      }, {
        path: 'shop',
        name: 'shop',
        component: () => import('../views/shop.vue'),
        meta: { title: 'shop', icon: 'el-icon-s-shop' }
      }
    ]
  }, {
    path: '/user',
    name: 'user',
    component: Home,
    redirect: '/user/page',
    meta: {
      roles: 'ADMIN_USER'
    },
    children: [
      {
        path: 'page',
        component: () => import('../views/user.vue'),
        name: 'userPage',
        meta: {
          title: 'userPage',
          roles: 'ADMIN_USER',
          icon: 'el-icon-s-custom'
        }
      }
    ]
  }
]

const createRouter = () => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
