const Router = require('koa-router')
const router = new Router()

router.get('/userinfo', async (ctx, next) => {
    if (ctx.request.query.token === 'admin-token') {
        ctx.body = {
            code: 20000,
            data: {
                roles: ["ADMIN_USER"],
                name: 'Super Admin'
            }
        }
    } else {
        ctx.body = {
            code: 20000,
            data: {
                roles: ['GENERAL_USER'],
                name: 'Normal Editor'
            }
        }
    }
})

router.post('/login', async (ctx, next) => {
    if (ctx.request.body.username === 'admin') {
        ctx.body = {
            code: 20000,
            data: {
                token: 'admin-token'
            }
        }
    } else {
        ctx.body = {
            code: 20000,
            data: {
                token: 'general-token'
            }
        }
    }
})

router.post('/logout', async (ctx, next) => {
    ctx.body = {
        code: 20000,
        data: 'success'
    }
})

module.exports = router