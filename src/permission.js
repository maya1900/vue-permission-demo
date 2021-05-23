import router from "./router";
import store from "./store";
import { Message } from 'element-ui'
import { getToken } from "./until/auth";
router.beforeEach(async(to, from, next) => {
  if (getToken()) {
    const hasRoles = store.getters.roles && store.getters.roles.length > 0
    if (hasRoles) {
      next()
    } else {
      try {
        // 获取user信息
        const { roles } = await store.dispatch('user/getInfo')
        // 获取更新后的路由
        const accessedRoutes = await store.dispatch('permission/generateRoutes', roles)
        // 添加到路由表
        router.addRoutes(accessedRoutes)
        next({ ...to, replace: true })
      } catch (err) {
        // 错误
        await store.dispatch('user/resetToken')
        Message.error(err || 'Has Error')
        next('/login')
      }
    }
  } else {
    // 这里要避免login无限循环！！
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
